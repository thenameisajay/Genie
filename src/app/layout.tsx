import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from '@/providers/providers';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Genie, by thenameisajay',
    description:
        'This is an lite version of Gemini API Models - where you can chat and query images with the Gemini models, Built with Privacy in mind.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className="min-h-dvh  w-screen "
            suppressHydrationWarning
        >
            <head>
                <link
                    rel="icon"
                    href="/icon?<generated>"
                    type="image/<generated>"
                    sizes="<generated>"
                />
                <link
                    rel="apple-touch-icon"
                    href="/apple-icon?<generated>"
                    type="image/<generated>"
                    sizes="<generated>"
                />
            </head>
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
