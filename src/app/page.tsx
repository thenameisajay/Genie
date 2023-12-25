"use client";
import React from "react";
import { ModeToggle } from "@/components/ui/theme-toggle";
import HomePage from "@/components/ui/home/home-page";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="flex min-h-dvh w-dvw  flex-col">
      <Toaster />
      <div
        className="relative justify-end items-end flex flex-col w-full h-full text-center top-4 right-4 "
        id="theme-toggle"
      >
        <ModeToggle />
      </div>
      <HomePage />
    </main>
  );
}
