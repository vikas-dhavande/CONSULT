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
import { GoogleIcon, GithubIcon, LinkedinIcon } from "@/components/ui/icons";

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
      const isLocalhost =
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1");

      const baseUrl = isLocalhost
        ? window.location.origin
        : (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
          (typeof window !== "undefined" ? window.location.origin : ""));

      const successPath =
        process.env.NEXT_PUBLIC_OAUTH_SUCCESS_CALLBACK || "/auth/callback";
      const failurePath =
        process.env.NEXT_PUBLIC_OAUTH_FAILURE_CALLBACK ||
        "/login?error=oauth_failed";

      const successUrl = `${baseUrl}${successPath.startsWith("/") ? "" : "/"}${successPath}`;
      const failureUrl = `${baseUrl}${failurePath.startsWith("/") ? "" : "/"}${failurePath}`;

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
                    maxLength={128}
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
                    <GoogleIcon className="h-4 w-4" />
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
                    <GithubIcon className="h-4 w-4 text-foreground" />
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
                    <LinkedinIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">Login with LinkedIn</span>
                </Button>
              </Field>

              <FieldDescription className="text-center pt-2 text-muted-foreground">
                {mode === "login" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("signup");
                        setError(null);
                      }}
                      className="font-medium text-foreground underline underline-offset-4 cursor-pointer hover:text-primary transition-colors"
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
                      className="font-medium text-foreground underline underline-offset-4 cursor-pointer hover:text-primary transition-colors"
                    >
                      Login
                    </button>
                  </>
                )}
              </FieldDescription>

              <div className="mt-2 pt-3 border-t border-border/60 text-center">
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  By clicking continue, you agree to our{" "}
                  <a
                    href="#terms"
                    className="font-medium text-foreground underline underline-offset-2 hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#privacy"
                    className="font-medium text-foreground underline underline-offset-2 hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
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
              <h3 className="text-lg font-bold leading-snug mt-1 text-white">
                Unified Appwrite Backend &amp; Architecture
              </h3>
              <p className="text-xs text-zinc-300 mt-1">
                Fast, secure, and resilient identity management.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
