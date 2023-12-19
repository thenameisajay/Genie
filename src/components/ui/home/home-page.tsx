"use client";
import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowCircleUp, ArrowBendDownLeft } from "@phosphor-icons/react";

export default function HomePage() {
  const [textValue, setTextValue] = useState<string>("");

  const handleButtonClick = () => {
    const fileInput = document.getElementById("picture");
    fileInput?.click();
  };

  return (
    <>
      <div className="flex flex-col  items-center text-center h-screen w-screen  absolute top-36 ">
        <h1 className="">Genie</h1>
        <h3>I know All , I see All</h3>
        <div className=" relative top-20 w-auto h-auto ">
          <Card className="flex flex-col justify-center items-center h-32  w-screen ">
            <form>
              <div className="flex flex-col  justify-center items-center  p-2 ">
                <Input
                  placeholder=" Ask me anything"
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  className=" w-72 h-16 px-2 relative  "
                />
                <div className="flex flex-row justify-end items-end mt-2  w-64 mr-2">
                  <Button
                    className="rounded-full p-2  w-10 h-10   bg-amber-900"
                    type="button"
                    onClick={handleButtonClick}
                  >
                    <ArrowCircleUp size={25} weight="fill" />
                    <Input
                      id="picture"
                      type="file"
                      className="mr-2 ml-2  "
                      style={{ display: "none" }}
                    />
                  </Button>
                  <Button
                    type="submit"
                    disabled={textValue.length === 0}
                    className="ml-2 rounded-full p-2  w-10 h-10 bg-black dark:bg-white"
                  >
                    <ArrowBendDownLeft size={25} weight="fill" className="" />
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>
        <p>{textValue}</p>
      </div>
    </>
  );
}
