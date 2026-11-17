"use client";

import React, { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function AuthCallbackPage() {
  const [status, setStatus] = useState("verifying"); // "verifying" | "success" | "error"
  const [message, setMessage] = useState("Verifying your authentication…");

  useEffect(() => {
    let mounted = true;

    async function handleCallback() {
      try {
        if (typeof window !== "undefined") {
          const urlParams = new URLSearchParams(window.location.search);
          const errorParam = urlParams.get("error");
          const errorMsg = urlParams.get("message");
          if (errorParam) {
            throw new Error(errorMsg || `Authentication error: ${errorParam}`);
          }

          const userId = urlParams.get("userId");
          const secret = urlParams.get("secret");

          // If token-based OAuth parameters are present, exchange for session
          if (userId && secret) {
            await account.createSession(userId, secret);
          }
        }

        const user = await account.get();
        if (!mounted) return;

        const userName = user.name || user.email?.split("@")[0] || "User";

        if (typeof window !== "undefined") {
          localStorage.setItem("auth_user", "true");
          localStorage.setItem("avatar_seed", userName);
          document.cookie = "auth_user=true; Path=/; SameSite=Lax;";
          document.cookie = `avatar_seed=${encodeURIComponent(userName)}; Path=/; SameSite=Lax;`;
          window.dispatchEvent(new Event("appwrite-auth-changed"));
        }

        setStatus("success");
        setMessage("Authentication successful! Redirecting to home…");

        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
        }, 800);
      } catch (err) {
        if (!mounted) return;
        setStatus("error");
        setMessage(
          err?.message ||
            "Unable to retrieve OAuth session. Please try logging in again."
        );
      }
    }

    handleCallback();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-xl">
        {status === "verifying" && (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-[#FD366E]" />
            <h2 className="text-lg font-semibold text-foreground">
              Connecting with Appwrite
            </h2>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            <h2 className="text-lg font-semibold text-foreground">
              Welcome back!
            </h2>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h2 className="text-lg font-semibold text-foreground">
              Authentication Error
            </h2>
            <p className="text-sm text-muted-foreground">{message}</p>
            <a
              href="/login"
              className="inline-flex rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90"
            >
              Back to Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
