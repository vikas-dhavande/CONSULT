"use client";

import React from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  FileCheck2,
  ShieldCheck,
  Award,
  ArrowRight,
  Cpu,
} from "lucide-react";

type Props = {
  /** Path to the video in /public, e.g. "/videos/background.mp4" */
  src?: string;
  /** Optional still image shown while the video loads */
  poster?: string;
  /** Content shown inside the section */
  children?: React.ReactNode;
  className?: string;
};

const DEFAULT_METRIC_CARDS = [
  {
    metric: "99.8%",
    title: "First-Pass Yield",
    desc: "Optimized SMT component placement, reflow thermal profiles, and AOI/AXI defect containment.",
    icon: TrendingUp,
    badge: "SMT Excellence",
  },
  {
    metric: "50+",
    title: "DFM Audits Completed",
    desc: "Rigorous Gerber, component BOM, and panelization readiness reviews before volume manufacturing ramp.",
    icon: FileCheck2,
    badge: "NPI-to-MP",
  },
  {
    metric: "-28%",
    title: "Scrap & Rework Reduction",
    desc: "Six Sigma DMAIC root-cause analysis eliminating recurring solder bridging, voids, and tombstoning.",
    icon: ShieldCheck,
    badge: "Cost Optimization",
  },
  {
    metric: "ISO Class 5",
    title: "Cleanroom Certified",
    desc: "ISO 14644 particulate and ESD control engineering for OSAT/ATMP semiconductor facilities.",
    icon: Award,
    badge: "Semiconductor Ready",
  },
];

export default function VideoBackgroundCard({
  src = "/videos/background.mp4",
  poster,
  children,
  className = "",
}: Props) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative flex min-h-[580px] lg:min-h-[640px] w-full items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      {/* 1. Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted // required for browser autoplay
        loop
        playsInline // required for iOS
        preload="auto"
        aria-hidden="true"
      />

      {/* 2. Deep Tint Overlay for Contrast & Readability */}
      <div
        className="absolute inset-0 bg-neutral-950/60 backdrop-blur-[2px] transition-colors"
        aria-hidden="true"
      />

      {/* 3. Foreground Content Container */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center ${className}`}>
        {children ? (
          children
        ) : (
          <div className="w-full flex flex-col items-center">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white text-[11px] font-mono uppercase tracking-wider mb-4 backdrop-blur-md">
                <Cpu className="size-3 text-white" />
                <span>Operational Benchmarks &amp; Proven Results</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Engineering Precision at Scale
              </h2>
              <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
                Audited performance metrics across electronics manufacturing (EMS),
                OSAT semiconductor packaging, and precision cleanrooms.
              </p>
            </motion.div>

            {/* 4 Individual Apple-Style Glassmorphic Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
              {DEFAULT_METRIC_CARDS.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="relative flex flex-col justify-between rounded-2xl border border-white/20 bg-white/10 dark:bg-black/30 p-6 sm:p-7 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-white/15 dark:hover:bg-black/40 group"
                  >
                    <div>
                      {/* Top Row: Icon & Badge */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="size-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
                          <Icon className="size-5" />
                        </div>
                        <span className="text-[10.5px] font-mono uppercase tracking-wider text-neutral-300 bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
                          {card.badge}
                        </span>
                      </div>

                      {/* Main Metric Value */}
                      <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white mb-2">
                        {card.metric}
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    {/* Subtle bottom indicator */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center text-[11px] font-medium text-neutral-300 group-hover:text-white transition-colors">
                      <span>View Case Study Audit</span>
                      <ArrowRight className="size-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
