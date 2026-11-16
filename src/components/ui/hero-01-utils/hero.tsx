"use client";

import { Instrument_Serif } from "next/font/google";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Blobatar } from "@blobatar/react";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

export type AvatarList = {
  image?: string;
  name?: string;
};

type HeroSectionProps = {
  avatarList?: AvatarList[];
  heroImage?: string;
};

function HeroSection({
  avatarList = [
    { name: "Vikas" },
    { name: "Sarah" },
    { name: "Alexander" },
    { name: "Elena" },
  ],
  heroImage = "/images/hero-consulting.svg",
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="w-full h-full relative">
        {/* Soft background ambient gradient */}
        <div className="relative w-full pt-3 md:pt-6 pb-6 md:pb-10 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-sky-100 before:via-white before:to-amber-100 before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-slate-800 dark:before:via-black dark:before:to-stone-700 dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center max-w-7xl mx-auto">
              
              {/* Left Column: Text & CTAs */}
              <div className="lg:col-span-7 flex flex-col items-start text-left gap-5">

                {/* Main Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground leading-[1.1]"
                >
                  Building bold brands with{" "}
                  <span
                    className={`${instrumentSerif.className} italic font-normal tracking-normal text-primary`}
                  >
                    thoughtful design
                  </span>
                </motion.h1>

                {/* Subtitle / Description */}
                <motion.p
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
                  className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl"
                >
                  We help startups and enterprises tackle complex cloud challenges
                  with tailored solutions, high-converting digital products, and
                  production-grade Appwrite backends.
                </motion.p>

                {/* CTA Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                  className="flex flex-wrap items-center gap-4 pt-1"
                >
                  <Button className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer shadow-lg shadow-primary/20">
                    <span className="relative z-10 transition-all duration-500 font-semibold">
                      Get Started
                    </span>
                    <span className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                      <ArrowUpRight size={16} />
                    </span>
                  </Button>

                  <a
                    href="#pricing"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background/80 px-6 text-sm font-medium text-foreground transition-all hover:bg-secondary hover:border-foreground/20"
                  >
                    Explore Pricing
                  </a>
                </motion.div>

                {/* Social Proof / Blobatar Avatars Cluster */}
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
                          className="h-4 w-4"
                        />
                      ))}
                    </div>
                    <p className="sm:text-sm text-xs font-normal text-muted-foreground">
                      Trusted by 1000+ clients &amp; founders
                    </p>
                  </div>
                </motion.div>

              </div>

              {/* Right Column: Hero Visual Image / Showcase */}
              <div className="lg:col-span-5 relative flex items-center justify-center w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 32 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: "easeInOut" }}
                  className="relative w-full max-w-lg lg:max-w-none"
                >
                  {/* Ambient Glow */}
                  <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#FF6D1B]/30 via-[#E11D48]/30 to-[#6B5FFF]/30 opacity-70 blur-2xl -z-10 dark:opacity-50" />

                  {/* Visual container */}
                  <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:shadow-primary/10">
                    <img
                      src={heroImage}
                      alt="Agency Consulting & Cloud Architecture"
                      className="w-full h-auto max-h-[480px] object-cover rounded-2xl"
                    />

                    {/* Floating Stat Badge 1 (Bottom Left) */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="absolute bottom-4 left-4 rounded-xl border border-border/80 bg-background/90 p-2.5 sm:p-3 shadow-lg backdrop-blur-md flex items-center gap-3"
                    >
                      <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-sm">
                        99.9%
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">Cloud Reliability</p>
                        <p className="text-[11px] text-muted-foreground">Production ready</p>
                      </div>
                    </motion.div>

                    {/* Floating Stat Badge 2 (Top Right) */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="absolute top-4 right-4 rounded-xl border border-border/80 bg-background/90 p-2 px-3 sm:px-3.5 shadow-lg backdrop-blur-md flex items-center gap-2"
                    >
                      <span className="flex size-2 rounded-full bg-primary animate-ping" />
                      <span className="text-xs font-semibold text-foreground">Appwrite Powered</span>
                    </motion.div>
                  </div>
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
