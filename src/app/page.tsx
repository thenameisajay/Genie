"use client";
import React from "react";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { Configuration } from "@/components/config-provider";
import HomePage from "@/components/ui/home/home-page";

export default function Home() {
  return (
    <main className="flex min-h-dvh w-dvw  flex-col">
      <div
        className="relative justify-end items-end flex flex-row w-full h-full text-center top-4 right-4 "
        id="theme-toggle"
      >
        <Configuration />
        <ModeToggle />
      </div>
      <HomePage />
    </main>
  );
}
