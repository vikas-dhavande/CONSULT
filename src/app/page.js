"use client";

import "./app.css";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="w-full flex-1"></main>
    </div>
  );
}
