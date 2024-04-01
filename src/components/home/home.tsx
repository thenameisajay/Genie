'use client';

import Body from '@/components/home/body';
import Header from '@/components/home/header';

export default function HomeComponent() {
    return (
        <>
            <div className="absolute top-20  flex w-dvw flex-col items-center text-center ">
                <Header />
                <Body />
            </div>
        </>
    );
}
