"use client";

import { Marquee } from "@/components/ui/hero-01-utils/marquee";
import { motion } from "motion/react";

export interface BrandList {
  image: string;
  name: string;
  lightimg: string;
}

function BrandSlider({ brandList }: { brandList: BrandList[] }) {
  return (
    <section className="relative w-full overflow-hidden py-4 sm:py-6">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex flex-col gap-3 w-full"
        >
          {/* Centered Section Header with Subtitle */}
          <div className="flex justify-center text-center px-4 relative">
            <div className="flex items-center justify-center gap-3 sm:gap-4 max-w-3xl w-full">
              <div className="hidden sm:block h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
              <p className="text-xs sm:text-sm font-medium text-muted-foreground text-center tracking-tight">
                Loved by 1000+ big and small brands around the worlds
              </p>
              <div className="hidden sm:block h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
            </div>
          </div>

          {/* Full Screen Edge-to-Edge Ticker with Gradient Fades */}
          {brandList && brandList.length > 0 && (
            <div className="relative w-full overflow-hidden py-2 sm:py-3">
              {/* Left & Right Edge Gradient Fades */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 md:w-36 bg-gradient-to-r from-background to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 md:w-36 bg-gradient-to-l from-background to-transparent z-10" />

              <Marquee
                pauseOnHover
                repeat={6}
                className="[--duration:28s] [--gap:1.5rem] p-0 w-full"
              >
                {brandList.map((brand, index) => (
                  <div
                    key={index}
                    className="flex shrink-0 items-center justify-center mx-3 sm:mx-5"
                  >
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-24 sm:w-28 md:w-32 h-6 sm:h-7 md:h-8 object-contain dark:hidden opacity-75 hover:opacity-100 transition-opacity"
                    />
                    <img
                      src={brand.lightimg}
                      alt={brand.name}
                      className="hidden dark:block w-24 sm:w-28 md:w-32 h-6 sm:h-7 md:h-8 object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default BrandSlider;
