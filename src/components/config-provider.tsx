"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Sliders, GearSix } from "@phosphor-icons/react";
import toast from "react-hot-toast";

export function Configuration() {
  const options = ["Safe", "Moderate", "Risky"];

  const [maxToken, setMaxToken] = useState<number>(0);

  // const [safety, setSafety] = useState<string>("Safe");

  console.log("token", maxToken);

  // console.log("safety", safety);

  function saveSettings() {
    // Use Local Storage to save the settings and retrieve them in the Home Page , later change it to useContext
    if (localStorage !== undefined) {
      localStorage.setItem("token", maxToken.toString());
      // localStorage.setItem("safety", safety);
      toast.success("Changes saved successfully!");
    }
  }

  function clearSettings() {
    if (localStorage.getItem("token") || localStorage.getItem("safety")) {
      localStorage?.removeItem("token");
      localStorage?.removeItem("safety");
      // setSafety("Safe");
      setMaxToken(0);
      toast.success("Changes cleared successfully!");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setMaxToken(parseInt(localStorage.getItem("token") ?? ""));
    }
  }, []);

  return (
    <div className="relative mr-4 top-1">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-10">
            {/* <Sliders size={32} weight="fill" /> */}
            <GearSix size={36} color="#22b995" weight="duotone" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Model Configuration </DialogTitle>
            <DialogDescription>
              Make changes to the model here and save them to test the variation
              best suited for your needs.
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
                onChange={(e) => setMaxToken(parseInt(e.target.value))}
                className="col-span-3"
              />
            </div>
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Safety
              </Label>
              <select
                id="safety"
                className="col-span-3"
                value={safety}
                onChange={(e) => setSafety(e.target.value)}
              >
                {options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div> */}
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
