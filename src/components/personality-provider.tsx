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

import { UserSwitch } from "@phosphor-icons/react";
import toast from "react-hot-toast";

export function Personality() {
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

  function clearSettings() {
    if (localStorage.getItem("token") || localStorage.getItem("safety")) {
      localStorage?.removeItem("token");
      localStorage?.removeItem("safety");
    }
  }

  // Clear the local storage when the page is loaded , one time use only

  return (
    <div className="relative mr-4 top-1">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-10">
            <UserSwitch size={36} color="#22b995" weight="duotone" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Personality Configuration </DialogTitle>
            <DialogDescription>
              Make changes to the model here and save them to best suited for
              your need <br />
              <strong>Work on Progress 🚧</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Personality Name
              </Label>
              <Input
                id="name"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="col-span-3 ml-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                placeholder="Description"
                className="col-span-3 ml-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Prompt" className="text-right">
                Prompt
              </Label>
              <Input
                id="prompt"
                placeholder="How should the model behave?"
                className="col-span-3 ml-3"
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
