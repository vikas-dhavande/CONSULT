"use client";

import React, { useState } from "react";
import { cn } from "cn";
import { account } from "@/lib/appwrite";
import { OAuthProvider, ID } from "appwrite";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2, X } from "lucide-react";

export function LoginForm({
  className,
  onSuccess,
  onClose,
  isModal = false,
  ...props
}) {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null); // 'google' | 'github' | 'linkedin'
  const [error, setError] = useState(null);

  const handleOAuthLogin = async (provider) => {
    setError(null);
    setOauthLoading(provider);

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
        (typeof window !== "undefined" ? window.location.origin : "");

      const successUrl = `${baseUrl}/auth/callback`;
      const failureUrl = `${baseUrl}/login?error=oauth_failed`;

      // Appwrite Web SDK OAuth Session redirect
      account.createOAuth2Session(provider, successUrl, failureUrl);
    } catch (err) {
      setError(err?.message || `Failed to initialize ${provider} login.`);
      setOauthLoading(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "signup") {
        // 1. Create Appwrite user account
        await account.create(ID.unique(), email, password, name);
      }

      // 2. Create session with email & password
      if (typeof account.createEmailPasswordSession === "function") {
        await account.createEmailPasswordSession(email, password);
      } else if (typeof account.createSession === "function") {
        await account.createSession(email, password);
      }

      // 3. Retrieve user profile
      const user = await account.get();
      const userName = user.name || name || "User";

      // 4. Set local session cache
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_user", "true");
        localStorage.setItem("avatar_seed", userName);
        document.cookie = "auth_user=true; Path=/; SameSite=Lax;";
        document.cookie = `avatar_seed=${encodeURIComponent(userName)}; Path=/; SameSite=Lax;`;
        window.dispatchEvent(new Event("appwrite-auth-changed"));
      }

      if (onSuccess) {
        onSuccess(userName);
      } else if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } catch (err) {
      setError(
        err?.message || "Authentication failed. Please verify your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Card className="relative overflow-hidden p-0 border border-border bg-card shadow-2xl rounded-2xl">
        {isModal && onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute right-4 top-4 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-background/80 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col justify-center">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  {mode === "login" ? "Welcome back" : "Create an account"}
                </h1>
                <p className="text-balance text-sm text-muted-foreground">
                  {mode === "login"
                    ? "Login to your Vikas Consulting account"
                    : "Get started with Vikas Consulting platform"}
                </p>
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {mode === "signup" && (
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Vikas"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Field>
              )}

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  {mode === "login" && (
                    <a
                      href="#forgot-password"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Password reset instructions have been dispatched.");
                      }}
                      className="ml-auto text-xs text-muted-foreground underline-offset-2 hover:underline hover:text-foreground"
                    >
                      Forgot your password?
                    </a>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
              </Field>

              <Field>
                <Button
                  type="submit"
                  disabled={loading || !!oauthLoading}
                  className="w-full cursor-pointer h-9 font-semibold"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading
                    ? "Authenticating…"
                    : mode === "login"
                      ? "Login"
                      : "Create Account"}
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              {/* OAuth Providers: Google, GitHub, LinkedIn */}
              <Field className="grid grid-cols-3 gap-3">
                {/* Google */}
                <Button
                  variant="outline"
                  type="button"
                  disabled={loading || !!oauthLoading}
                  onClick={() => handleOAuthLogin(OAuthProvider.Google)}
                  className="cursor-pointer h-9 w-full flex items-center justify-center hover:bg-secondary transition-colors"
                  title="Sign in with Google"
                >
                  {oauthLoading === "google" ? (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  ) : (
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  )}
                  <span className="sr-only">Login with Google</span>
                </Button>

                {/* GitHub */}
                <Button
                  variant="outline"
                  type="button"
                  disabled={loading || !!oauthLoading}
                  onClick={() => handleOAuthLogin(OAuthProvider.Github)}
                  className="cursor-pointer h-9 w-full flex items-center justify-center hover:bg-secondary transition-colors"
                  title="Sign in with GitHub"
                >
                  {oauthLoading === "github" ? (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  ) : (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                  )}
                  <span className="sr-only">Login with GitHub</span>
                </Button>

                {/* LinkedIn */}
                <Button
                  variant="outline"
                  type="button"
                  disabled={loading || !!oauthLoading}
                  onClick={() => handleOAuthLogin(OAuthProvider.Linkedin)}
                  className="cursor-pointer h-9 w-full flex items-center justify-center hover:bg-secondary transition-colors"
                  title="Sign in with LinkedIn"
                >
                  {oauthLoading === "linkedin" ? (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  ) : (
                    <svg className="h-4 w-4" fill="#0A66C2" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46V10.9M7.86 6.54a1.63 1.63 0 1 0 0 3.25 1.63 1.63 0 0 0 0-3.25Z" />
                    </svg>
                  )}
                  <span className="sr-only">Login with LinkedIn</span>
                </Button>
              </Field>

              <FieldDescription className="text-center pt-2">
                {mode === "login" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("signup");
                        setError(null);
                      }}
                      className="font-medium text-foreground underline underline-offset-4 cursor-pointer hover:text-primary"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setError(null);
                      }}
                      className="font-medium text-foreground underline underline-offset-4 cursor-pointer hover:text-primary"
                    >
                      Login
                    </button>
                  </>
                )}
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* Right Image/Banner */}
          <div className="relative hidden md:block min-h-[420px] bg-muted overflow-hidden">
            <img
              src="/placeholder.svg"
              alt="Vikas Consulting Cloud"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.4]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs uppercase tracking-widest text-[#FD366E] font-semibold">
                Enterprise Cloud
              </span>
              <h3 className="text-lg font-bold leading-snug mt-1">
                Unified Appwrite Backend &amp; Architecture
              </h3>
              <p className="text-xs text-zinc-300 mt-1">
                Fast, secure, and resilient identity management.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center text-xs">
        By clicking continue, you agree to our{" "}
        <a href="#terms" className="underline underline-offset-2 hover:text-foreground">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#privacy" className="underline underline-offset-2 hover:text-foreground">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}

export default LoginForm;
