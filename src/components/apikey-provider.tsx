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

import { UserSwitch, Key } from "@phosphor-icons/react";
import toast from "react-hot-toast";

export function APIKEY() {
  const [key, setKey] = useState<string>("");

  function saveSettings() {
    // Use Local Storage to save the settings and retrieve them in the Home Page , later change it to useContext

    if (key !== undefined && key !== null && key !== "") {
      localStorage.setItem("apikey", key);
      toast.success("KEY saved successfully!");
    }
  }

  // Clear the local storage when the page is loaded , one time use only
  useEffect(() => {
    if (localStorage.getItem("apikey")) {
      localStorage?.removeItem("apikey");
    }
  }, []);

  return (
    <div className="relative mr-4 top-1">
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
              This option is used for testing your api key , while there is a
              default key for testing , you can use your own key to test the api
              <br />
              <strong>Work on Progress 🚧</strong>
            </DialogDescription>
          </DialogHeader>
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
              />
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
