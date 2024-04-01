'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { Key } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function APIKEY() {
    const [key, setKey] = useState<string>('');

    function saveSettings() {
        // Use Local Storage to save the settings and retrieve them in the Home Page , later change it to useContext

        if (key !== undefined && key !== null && key !== '') {
            localStorage.setItem('apikey', key);
            toast.success('KEY saved successfully!');
        }
    }

    function clearSettings() {
        if (localStorage.getItem('apikey')) {
            setKey('');
            localStorage?.removeItem('apikey');
            toast.success('KEY cleared successfully!');
        }
    }

    useEffect(() => {
        if (localStorage.getItem('apikey')) {
            setKey(localStorage.getItem('apikey') || '');
        }
    }, []);

    return (
        <div className="relative top-1 mr-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="h-10">
                        <Key size={36} color="#22b995" weight="duotone" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>API KEY TESTING </DialogTitle>
                        <DialogDescription>
                            This option is used for testing your api key. By
                            default there is a default key for testing but you
                            can use your own key to see if it works.
                            <br />
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="apikey" className="text-right">
                                    API-KEY
                                </Label>
                                <Input
                                    id="name"
                                    type="password"
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                    className="col-span-3 ml-3"
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <div className="flex flex-row">
                                <Button
                                    type="button"
                                    className="mr-1"
                                    onClick={() => clearSettings()}
                                >
                                    Clear changes
                                </Button>
                                <Button
                                    type="submit"
                                    className="ml-1"
                                    onClick={() => saveSettings()}
                                >
                                    Save changes
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
