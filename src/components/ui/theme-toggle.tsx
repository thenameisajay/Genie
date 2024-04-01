'use client';

import React, { useState } from 'react';

import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
    const { setTheme } = useTheme();
    const [position, setPosition] = useState('system');

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 p-5 px-7 "
                >
                    <Sun
                        size={36}
                        color="#22b995"
                        weight="duotone"
                        className=" absolute h-7 w-7 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                    />
                    <Moon
                        size={36}
                        color="#22b995"
                        weight="duotone"
                        className="absolute h-7 w-7 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                    />

                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                >
                    <DropdownMenuRadioItem
                        value="light"
                        onClick={() => setTheme('light')}
                    >
                        Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                        value="dark"
                        onClick={() => setTheme('dark')}
                    >
                        Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                        value="system"
                        onClick={() => setTheme('system')}
                    >
                        System
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
