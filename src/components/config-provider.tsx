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

  const [token, setToken] = useState<string>("");

  const [safety, setSafety] = useState<string>("Safe");

  console.log("token", token);

  console.log("safety", safety);

  function saveSettings() {
    // Use Local Storage to save the settings and retrieve them in the Home Page , later change it to useContext

    if (token !== undefined && token !== null && token !== "") {
      localStorage.setItem("token", token);
      localStorage.setItem("safety", safety);
      toast.success("Changes saved successfully!");
    }
  }

  // Clear the local storage when the page is loaded , one time use only
  useEffect(() => {
    if (localStorage.getItem("token") || localStorage.getItem("safety")) {
      localStorage.clear();
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
              <strong>Work on Progress 🚧</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tokens" className="text-right">
                Max Output Tokens
              </Label>
              <Input
                id="tokens"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
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
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => saveSettings()}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
