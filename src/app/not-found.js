"use client";

import "./app.css";
import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Home, Layers, Calculator, Users } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative overflow-hidden">
      {/* Subtle Edge-to-Edge Hairline Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-[0.22] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-4xl mx-auto flex flex-col items-center text-center relative z-10"
      >
        {/* Subtle Status Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-border/80 bg-secondary/40 text-[11px] font-mono tracking-widest uppercase text-muted-foreground mb-6"
        >
          <span className="size-1.5 rounded-full bg-amber-500 animate-ping" />
          <span>HTTP 404 • ROUTE UNREACHABLE</span>
        </motion.div>

        {/* Expansive Full-Screen Hairline 404 */}
        <h1 className="text-8xl sm:text-9xl md:text-[11rem] lg:text-[13rem] font-extralight tracking-widest text-foreground font-mono leading-none select-none my-2">
          404
        </h1>

        {/* Thin Hairline Accent Rule */}
        <div className="w-20 sm:w-28 h-px bg-border my-6 sm:my-8" />

        {/* Centered Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-foreground mb-3">
          Station or Page Not Found
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed mb-10">
          The requested address does not correspond to an active assembly route, service
          pillar, or engineering toolkit. It may have been relocated or decommissioned.
        </p>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-foreground text-background font-medium text-xs sm:text-sm hover:opacity-90 transition-all shadow-md group cursor-pointer"
          >
            <Home className="size-4" />
            <span>Return to Home</span>
            <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined" && window.history.length > 1) {
                window.history.back();
              } else {
                window.location.href = "/";
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-border hover:border-foreground/30 bg-background/80 hover:bg-secondary text-foreground text-xs sm:text-sm font-medium transition-all cursor-pointer"
          >
            <ArrowLeft className="size-3.5" />
            <span>Previous Station</span>
          </button>
        </div>

        {/* Minimal Quick Links */}
        <div className="mt-14 sm:mt-16 pt-6 border-t border-border/60 w-full max-w-xl">
          <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-3">
            Direct Route Navigation:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
            <Link
              href="/#services"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border/80 hover:border-foreground/40 bg-secondary/30 text-muted-foreground hover:text-foreground transition"
            >
              <Layers className="size-3.5 text-primary" />
              <span>Services</span>
            </Link>
            <Link
              href="/#calculators"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border/80 hover:border-foreground/40 bg-secondary/30 text-muted-foreground hover:text-foreground transition"
            >
              <Calculator className="size-3.5 text-primary" />
              <span>Calculators</span>
            </Link>
            <Link
              href="/join-bench"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border/80 hover:border-foreground/40 bg-secondary/30 text-muted-foreground hover:text-foreground transition"
            >
              <Users className="size-3.5 text-primary" />
              <span>Join Expert Bench</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
