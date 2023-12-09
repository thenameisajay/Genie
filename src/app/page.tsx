"use client";
import React from "react";
import { ModeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <div
        className="relative justify-end items-end flex flex-col w-full h-full text-center top-4 right-4 "
        id="theme-toggle"
      >
        <ModeToggle />
      </div>
    </main>
  );
}
