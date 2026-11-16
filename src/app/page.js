"use client";

import { useEffect, useState } from "react";
import "./app.css";
import { Navbar } from "@/components/Navbar";
import {
  HeroSection,
  BrandSlider,
  defaultAvatarList,
  defaultBrandList,
} from "@/components/ui/hero-01";

export default function Home() {
  const [avatars, setAvatars] = useState(defaultAvatarList);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("avatar_seed");
      if (stored) {
        setAvatars([{ name: stored }, ...defaultAvatarList.slice(1)]);
      }
    } catch {}
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="w-full flex-1">
        <HeroSection avatarList={avatars} />
        <BrandSlider brandList={defaultBrandList} />
      </main>
    </div>
  );
}
