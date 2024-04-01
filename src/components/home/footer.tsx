import React from 'react';

export default function Footer() {
    return (
        <footer className=" relative mx-auto text-center">
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                Crafted with ❤️ by{' '}
                <a
                    className=" font-sans font-semibold text-blue-500"
                    href="https://github.com/thenameisajay"
                >
                    @thenameisajay
                </a>
            </p>
        </footer>
    );
}
