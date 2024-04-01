import React from 'react';

import { Lamp } from '@phosphor-icons/react';

export default function Header() {
    return (
        <div className=" flex flex-col items-center justify-center">
            <Lamp size={70} weight="fill" className="mb-5" />
            <h1 className="flex items-center justify-center text-center text-7xl font-extrabold tracking-tight lg:text-9xl">
                Genie
            </h1>
            <p className="mt-2 text-xl text-muted-foreground">
                A lite version to test Google&apos;s Gemini model.
            </p>
        </div>
    );
}
