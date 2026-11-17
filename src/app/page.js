"use client";

import { useEffect, useState } from "react";
import "./app.css";
import {
  HeroSection,
  BrandSlider,
  defaultAvatarList,
  defaultBrandList,
} from "@/components/ui/hero-01";
import { ChatBubble } from "@/components/ChatBubble";

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
    <main className="w-full flex-1 relative">
      <HeroSection avatarList={avatars} />
      <BrandSlider brandList={defaultBrandList} />
      {/* Floating Chat Bubble (Home page only) */}
      <ChatBubble />
    </main>
  );
}
