"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Blobatar } from "@blobatar/react";
import CostLeversChart from "@/components/CostLeversChart";

export type AvatarList = {
  image?: string;
  name?: string;
};

type HeroSectionProps = {
  avatarList?: AvatarList[];
};

function HeroSection({
  avatarList = [
    { name: "Vikas" },
    { name: "Sarah" },
    { name: "Alexander" },
    { name: "Elena" },
  ],
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="w-full h-full relative">
        <div className="relative w-full pt-3 md:pt-6 pb-6 md:pb-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center max-w-7xl mx-auto">
              
              {/* Left Column: Text & CTAs */}
              <div className="lg:col-span-6 flex flex-col items-start text-left gap-5">

                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/80 bg-secondary/50 text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold"
                >
                  YOUR PARTNER IN PROGRESS
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground leading-[1.1]"
                >
                  Building better businesses with{" "}
                  <span
                    className="font-serif italic font-normal tracking-normal text-primary"
                  >
                    expert guidance.
                  </span>
                </motion.h1>

                {/* Subtitle / Description */}
                <motion.p
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
                  className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl"
                >
                  We help ambitious businesses navigate complex challenges through
                  strategic consulting, engineering expertise, and technology-driven
                  solutions. We bring clarity to your ideas and turn your goals into
                  practical results.
                </motion.p>

                {/* CTA Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                  className="flex flex-wrap items-center gap-4 pt-1"
                >
                  <a href="#contact" className="inline-block">
                    <Button className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer shadow-lg shadow-primary/20">
                      <span className="relative z-10 transition-all duration-500 font-semibold">
                        Let&apos;s Work Together
                      </span>
                      <span className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                        <ArrowUpRight size={16} />
                      </span>
                    </Button>
                  </a>

                  <a
                    href="#services"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background/80 px-6 text-sm font-medium text-foreground transition-all hover:bg-secondary hover:border-foreground/20"
                  >
                    Explore Our Services
                  </a>
                </motion.div>

                {/* Social Proof / Blobatar Avatars Cluster with Trust Text */}
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
                  className="flex items-center sm:gap-6 gap-4 pt-4 border-t border-border/50 w-full"
                >
                  <ul className="avatar flex flex-row items-center">
                    {avatarList.map((avatar, index) => (
                      <li
                        key={index}
                        className="-mr-2.5 z-10 transition-transform duration-200 hover:z-20 hover:scale-110"
                      >
                        <div className="size-10 rounded-full border-2 border-background overflow-hidden shadow-sm bg-card flex items-center justify-center">
                          {avatar.image ? (
                            <img
                              src={avatar.image}
                              alt={avatar.name || `Avatar ${index + 1}`}
                              width={40}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Blobatar
                              name={avatar.name || `User ${index + 1}`}
                              animate="hover"
                              style={{
                                width: "100%",
                                height: "100%",
                                display: "block",
                              }}
                            />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="gap-1 flex flex-col items-start">
                    <div className="flex gap-1 items-center">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <img
                          key={index}
                          src="/icons/icon-star.svg"
                          alt="star"
                          className="h-3.5 w-3.5"
                        />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground leading-tight">
                      Expertise you can rely on. Solutions built around your goals.
                    </p>
                    <p className="text-[11px] sm:text-xs text-muted-foreground leading-tight">
                      Helping businesses move forward with confidence.
                    </p>
                  </div>
                </motion.div>

              </div>

              {/* Right Column: Hero Visual / Cost Levers Chart (No border, no box) */}
              <div className="lg:col-span-6 relative flex items-center justify-center w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 32 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: "easeInOut" }}
                  className="w-full max-w-2xl flex items-center justify-center"
                >
                  <CostLeversChart />
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
