'use client';

import React from 'react';
import toast from 'react-hot-toast';

import { GearSix } from '@phosphor-icons/react';
import { useLocalStorage } from 'usehooks-ts';

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

export function Configuration() {
    const [maxToken, setMaxToken] = useLocalStorage<number>('token', 0);

    function saveSettings() {
        setMaxToken(maxToken);

        toast.success('Changes saved successfully!');
    }

    function clearSettings() {
        if (maxToken) {
            setMaxToken(0);
            toast.success('Changes cleared successfully!');
        }
    }

    return (
        <div className="relative top-1 mr-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="h-10">
                        <GearSix size={36} color="#22b995" weight="duotone" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Model Parameters </DialogTitle>
                        <DialogDescription>
                            Make changes to the model here and save them to test
                            the variation best suited for your needs.
                            <br />
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="tokens" className="text-right">
                                Max Output Tokens
                            </Label>
                            <Input
                                id="tokens"
                                type="number"
                                value={maxToken}
                                onChange={(e) =>
                                    setMaxToken(
                                        e.target.value !== ''
                                            ? parseInt(e.target.value)
                                            : 0,
                                    )
                                }
                                className="col-span-3"
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
                </DialogContent>
            </Dialog>
        </div>
    );
}
