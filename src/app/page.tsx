'use client';

import React from 'react';

import { APIKEY } from '@/components/apikey-component';
import { Configuration } from '@/components/config-component';
// import { Personality } from '@/components/personality-component';
import HomePage from '@/components/ui/home/home-page';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function Home() {
    return (
        <main className="flex flex-col">
            <div
                className="relative right-4 top-4 flex h-full w-full flex-row items-end justify-end text-center "
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
