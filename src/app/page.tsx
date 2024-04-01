import React from 'react';
import { Toaster } from 'react-hot-toast';

import { APIKEY } from '@/components/apikey-component';
import { Configuration } from '@/components/config-component';
import HomeComponent from '@/components/home/home';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
    const HeaderComponent = () => {
        return (
            <div
                className="relative right-4 top-4 flex h-full w-full flex-row items-end justify-end text-center "
                id="components-deck"
            >
                <APIKEY />
                <Configuration />
                <ThemeToggle />
            </div>
        );
    };

    return (
        <>
            <Toaster />
            <main className="flex flex-col">
                <HeaderComponent />
                <HomeComponent />
            </main>
        </>
    );
}
