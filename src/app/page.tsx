"use client";
import React from "react";

import HomePage from "@/components/ui/home/home-page";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import { Configuration } from "@/components/config-component";
import { Personality } from "@/components/personality-component";
import { APIKEY } from "@/components/apikey-component";

export default function Home() {
  return (
    <main className="flex min-h-dvh w-dvw  flex-col">
      <div
        className="relative justify-end items-end flex flex-row w-full h-full text-center top-4 right-4 "
        id="components-deck"
      >
        <APIKEY />
        {/* <Personality /> */}
        <Configuration />
        <ThemeToggle />
      </div>
      <HomePage />
    </main>
  );
}
