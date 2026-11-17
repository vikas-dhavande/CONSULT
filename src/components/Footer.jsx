"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

export function Footer() {
  const siteName =
    process.env.NEXT_PUBLIC_SITE_NAME ||
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME ||
    "Vikas";
  const siteLogoText =
    process.env.NEXT_PUBLIC_SITE_LOGO_TEXT ||
    (siteName ? siteName.charAt(0).toUpperCase() : "V");

  return (
    <footer className="w-full border-t border-border bg-card/40 backdrop-blur-md py-12 lg:py-16 text-xs text-muted-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 text-foreground font-bold text-sm">
              <span className="size-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-mono text-xs">
                {siteLogoText}
              </span>
              <span>{siteName} Consulting</span>
            </Link>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Full-stack engineering advisory for electronics manufacturing (EMS), OSAT/ATMP silicon
              packaging, and precision hardware scaling across India and global supply chains.
            </p>
            <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 pt-1">
              <ShieldCheck className="size-3.5 text-primary" />
              <span>GST Registered • SAC: 998313 / 998349</span>
            </div>
          </div>

          {/* Pillars */}
          <div>
            <h4 className="font-bold text-foreground uppercase tracking-wider mb-3 text-[11px]">
              Engineering Pillars
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#services" className="hover:text-foreground transition">
                  NPI-to-MP Readiness &amp; DFM
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-foreground transition">
                  Six Sigma DMAIC &amp; Yield Ramp
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-foreground transition">
                  Industry 4.5, AI &amp; Robotics
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-foreground transition">
                  Cleanrooms ISO 14644 &amp; ESD
                </Link>
              </li>
            </ul>
          </div>

          {/* Calculators */}
          <div>
            <h4 className="font-bold text-foreground uppercase tracking-wider mb-3 text-[11px]">
              Calculators &amp; Benchmarks
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#calculators" className="hover:text-foreground transition">
                  SMT Line OEE Calculator
                </Link>
              </li>
              <li>
                <Link href="/#calculators" className="hover:text-foreground transition">
                  Six Sigma DPMO &amp; Yield Estimator
                </Link>
              </li>
              <li>
                <Link href="/#calculators" className="hover:text-foreground transition">
                  50-Point MP Scorecard
                </Link>
              </li>
              <li>
                <Link href="/#templates" className="hover:text-foreground transition">
                  PFMEA &amp; Control Plan Toolkits
                </Link>
              </li>
            </ul>
          </div>

          {/* Associate Network */}
          <div>
            <h4 className="font-bold text-foreground uppercase tracking-wider mb-3 text-[11px]">
              Associate Network &amp; Portal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/join-bench"
                  className="text-primary font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Join Our Expert Bench</span>
                  <ArrowUpRight className="size-3" />
                </Link>
              </li>
              <li>
                <Link href="/#case-studies" className="hover:text-foreground transition">
                  Audited Case Studies
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground/80">
                  Industrial Hubs: Bengaluru • Chennai • Pune • Gujarat
                </span>
              </li>
              <li className="pt-2 text-[10px] text-muted-foreground/60">
                Built with Next.js App Router &amp; Appwrite RBAC
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} {siteName} Consulting Agency. All rights reserved. Mutual
            NDAs strictly enforced.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/#services" className="hover:text-foreground">
              Terms of SOW
            </Link>
            <span>•</span>
            <Link href="/#services" className="hover:text-foreground">
              NDA &amp; Confidentiality
            </Link>
            <span>•</span>
            <Link href="/#services" className="hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
