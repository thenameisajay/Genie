"use client";
import React from "react";
import { ModeToggle } from "@/components/ui/theme-toggle";
import HomePage from "@/components/ui/home/home-page";

export default function Home() {
  return (
    <main className="flex min-h-dvh w-dvw  flex-col">
      <div
        className="relative justify-end items-end flex flex-col w-full h-full text-center top-4 right-4 "
        id="theme-toggle"
      >
        <ModeToggle />
      </div>
      <HomePage />
      <footer className=" absolute w-dvw bottom-0  text-center mx-auto">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Crafted with ❤️ by{" "}
          <a
            className=" text-blue-500 font-sans font-semibold"
            href="https://github.com/thenameisajay"
          >
            @thenameisajay
          </a>
        </p>
      </footer>
    </main>
  );
}
