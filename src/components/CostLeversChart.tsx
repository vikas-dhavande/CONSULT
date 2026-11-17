"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import NumberFlow from "@number-flow/react";
import { animate } from "animejs";
import PieChart from "@/components/charts/pie-chart";
import PieSlice from "@/components/charts/pie-slice";

export interface CostLever {
  id: string;
  name: string;
  shortName: string;
  defaultValue: number;
  lightFill: string;
  darkFill: string;
  lightStroke: string;
  darkStroke: string;
  swatchClass: string;
}

export const DEFAULT_LEVERS: CostLever[] = [
  {
    id: "material",
    name: "Material",
    shortName: "Material",
    defaultValue: 37,
    lightFill: "#ffffff",
    darkFill: "#f8fafc",
    lightStroke: "#000000",
    darkStroke: "#64748b",
    swatchClass: "bg-white border-2 border-neutral-800 dark:bg-slate-100 dark:border-slate-500",
  },
  {
    id: "labor",
    name: "Labor",
    shortName: "Labor",
    defaultValue: 8,
    lightFill: "#4d4d4d",
    darkFill: "#64748b",
    lightStroke: "#000000",
    darkStroke: "#94a3b8",
    swatchClass: "bg-[#4d4d4d] border border-neutral-700 dark:bg-slate-500",
  },
  {
    id: "mfg_overhead",
    name: "Manufacturing Overhead & Quality",
    shortName: "Overhead & Quality",
    defaultValue: 26,
    lightFill: "#d9d9d9",
    darkFill: "#475569",
    lightStroke: "#000000",
    darkStroke: "#94a3b8",
    swatchClass: "bg-[#d9d9d9] border border-neutral-400 dark:bg-slate-600",
  },
  {
    id: "operating_expense",
    name: "Operating Expense",
    shortName: "OpEx",
    defaultValue: 21,
    lightFill: "#111111",
    darkFill: "#090d16",
    lightStroke: "#000000",
    darkStroke: "#334155",
    swatchClass: "bg-[#111111] border border-neutral-900 dark:bg-slate-950 dark:border-slate-800",
  },
  {
    id: "operating_profit",
    name: "Operating Profit",
    shortName: "Operating Profit",
    defaultValue: 8,
    lightFill: "#999999",
    darkFill: "#94a3b8",
    lightStroke: "#000000",
    darkStroke: "#cbd5e1",
    swatchClass: "bg-[#999999] border border-neutral-500 dark:bg-slate-400",
  },
];

const CHART_SIZE = 310;
const TAG_RADIUS = 192; // distance from chart center to the tag anchor point (px)

export default function CostLeversChart({ className = "" }: { className?: string }) {
  const [values, setValues] = useState<number[]>(() =>
    DEFAULT_LEVERS.map((l) => l.defaultValue)
  );
  const [isDark, setIsDark] = useState(false);
  const chartWrapperRef = useRef<HTMLDivElement>(null);

  // Detect dark/light mode
  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Proportional Rebalancing Algorithm
  const handleSliderChange = useCallback((changedIndex: number, rawVal: number) => {
    const targetVal = Math.min(80, Math.max(2, Math.round(rawVal)));
    const remaining = 100 - targetVal;

    setValues((prev) => {
      const otherIndices = prev
        .map((_, i) => i)
        .filter((i) => i !== changedIndex);

      const oldOtherSum = otherIndices.reduce((sum, i) => sum + prev[i], 0);
      const next = [...prev];
      next[changedIndex] = targetVal;

      if (oldOtherSum > 0) {
        let distributed = 0;
        otherIndices.forEach((idx, i) => {
          if (i === otherIndices.length - 1) {
            // Guarantee sum equals 100
            next[idx] = Math.max(1, remaining - distributed);
          } else {
            const proportional = Math.max(
              1,
              Math.round((prev[idx] / oldOtherSum) * remaining)
            );
            next[idx] = proportional;
            distributed += proportional;
          }
        });
      }

      return next;
    });

    // Subtle Anime.js reaction micro-pulse on the chart wrapper
    if (chartWrapperRef.current) {
      animate(chartWrapperRef.current, {
        scale: [1, 1.018, 1],
        duration: 350,
        ease: "outQuad",
      });
    }
  }, []);

  // Draft state for the percentage the user is typing in a tag.
  // The other slices only rebalance when the user leaves the tag (mouse out, blur or Enter).
  const [draft, setDraft] = useState<{ index: number; text: string } | null>(null);

  const commitDraft = () => {
    if (!draft) return;
    const n = Number(draft.text);
    if (draft.text !== "" && !Number.isNaN(n)) {
      handleSliderChange(draft.index, n);
    }
    setDraft(null);
  };

  // Build PieChart data format for @bklit/pie-chart
  const chartData = DEFAULT_LEVERS.map((lever, index) => {
    const val = values[index];
    const fill = isDark ? lever.darkFill : lever.lightFill;
    const stroke = isDark ? lever.darkStroke : lever.lightStroke;
    return {
      label: lever.name,
      shortLabel: lever.shortName,
      value: val,
      fill,
      stroke,
      color: fill,
    };
  });

  // Tag positions: one tag per slice, placed outside the pie at the slice's mid-angle.
  // 0deg = 12 o'clock, clockwise (same direction the pie draws).
  const tags = useMemo(() => {
    const total = values.reduce((a, b) => a + b, 0) || 1;
    let acc = 0;
    return DEFAULT_LEVERS.map((lever, i) => {
      const mid = ((acc + values[i] / 2) / total) * Math.PI * 2;
      acc += values[i];
      const x = Math.sin(mid) * TAG_RADIUS;
      const y = -Math.cos(mid) * TAG_RADIUS;

      let translate = "translate(0, -50%)"; // right side
      if (Math.abs(x) < 36) {
        translate = y < 0 ? "translate(-50%, -100%)" : "translate(-50%, 0)"; // top / bottom
      } else if (x < 0) {
        translate = "translate(-100%, -50%)"; // left side
      }

      return { lever, index: i, value: values[i], x, y, translate };
    });
  }, [values]);

  return (
    <figure
      className={`w-full max-w-2xl mx-auto select-none font-sans ${className}`}
      role="region"
      aria-label="Interactive Cost Levers Chart"
    >
      {/* 1. Chart Headline */}
      <div className="text-center mb-1 sm:mb-2 px-2">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground tracking-tight leading-tight">
          Material, Manufacturing Overhead and
        </h3>
        <p className="text-xs sm:text-sm md:text-base font-semibold text-muted-foreground tracking-tight leading-tight mt-0.5">
          Quality Cost Are the Biggest Levers of Cost Reduction
        </p>
      </div>

      {/* 2. Interactive Animated Pie Chart with tags */}
      <div
        ref={chartWrapperRef}
        className="relative mx-auto my-1 sm:my-2"
        style={{ width: "100%", height: CHART_SIZE + 100 }}
      >
        {/* Chart centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <PieChart
            data={chartData}
            size={CHART_SIZE}
            innerRadius={98}
            padAngle={0.02}
            cornerRadius={4}
            hoverOffset={10}
            className="mx-auto"
          >
            {chartData.map((slice, i) => (
              <PieSlice
                key={slice.label}
                index={i}
                fill={slice.fill}
                stroke={slice.stroke}
                strokeWidth={1.5}
                color={slice.color}
                hoverEffect="translate"
              />
            ))}
          </PieChart>
        </div>

        {/* Center total */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center justify-center text-center">
          <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground leading-none">
            <NumberFlow value={values.reduce((a, b) => a + b, 0)} suffix="%" />
          </div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground font-semibold mt-1">
            Cost Levers
          </span>
        </div>

        {/* Tags (percentages are editable) */}
        {tags.map(({ lever, index, value, x, y, translate }) => (
          <div
            key={lever.id}
            onMouseLeave={commitDraft}
            className="absolute flex flex-col items-center rounded-md border border-border bg-background/90 px-2 py-1 shadow-sm"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: translate,
              transition: "left 300ms ease, top 300ms ease",
            }}
          >
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground whitespace-nowrap">
              <span className={`size-2 rounded-full shrink-0 ${lever.swatchClass}`} />
              {lever.shortName}
            </span>
            <span className="flex items-center text-[12px] font-bold font-mono text-foreground">
              <input
                type="number"
                inputMode="numeric"
                min={2}
                max={80}
                value={draft?.index === index ? draft.text : String(value)}
                onChange={(e) => setDraft({ index, text: e.target.value })}
                onBlur={commitDraft}
                onKeyDown={(e) => {
                  if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                }}
                aria-label={`${lever.name} percentage`}
                className="w-9 bg-transparent text-right outline-none focus:underline [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              %
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
}