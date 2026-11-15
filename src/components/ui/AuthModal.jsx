"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { LoginForm } from "@/components/login-form";

export function AuthModal({ onAuthSuccess, trigger }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div onClick={() => setOpen(true)} className="inline-block">
        {trigger || (
          <button
            type="button"
            className="cursor-pointer rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90"
          >
            Login
          </button>
        )}
      </div>

      {open &&
        mounted &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Authentication dialog"
            className="fixed inset-0 z-[9999] flex min-h-screen w-screen items-center justify-center overflow-y-auto p-4 sm:p-6"
          >
            {/* Backdrop with click-outside to close */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-200"
              onClick={() => setOpen(false)}
            />

            {/* Modal Container perfectly centered */}
            <div
              ref={modalRef}
              className="relative z-10 m-auto w-full max-w-sm md:max-w-4xl animate-in fade-in zoom-in-95 duration-200"
            >
              <LoginForm
                isModal={true}
                onClose={() => setOpen(false)}
                onSuccess={(userName) => {
                  onAuthSuccess?.(userName);
                  setOpen(false);
                }}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default AuthModal;
