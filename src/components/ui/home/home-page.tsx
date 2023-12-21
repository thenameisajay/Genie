"use client";
import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowCircleUp, ArrowBendDownLeft, Lamp } from "@phosphor-icons/react";
import { run } from "@/lib/gemini";

export default function HomePage() {
  const [textValue, setTextValue] = useState<string>("");

  const handleButtonClick = () => {
    const fileInput = document.getElementById("picture");
    fileInput?.click();
    // const geminiTalk = run();
    // console.log(geminiTalk);
  };

  return (
    <>
      <div className="flex flex-col  items-center text-center h-screen w-screen  absolute top-36 ">
        <div className=" flex flex-col justify-center items-center">
          <Lamp size={70} weight="fill" className="mb-5" />
          <h1 className="text-7xl text-center flex items-center justify-center font-extrabold tracking-tight lg:text-9xl">
            Genie
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            A lite version to test Google&apos;s Gemini model.
          </p>
        </div>
        <div className=" relative top-10 w-auto h-auto">
          <Card className="flex flex-col justify-center items-center h-32 w-screen ">
            <form>
              <div className="flex flex-col  justify-center items-center  w-auto ">
                <Textarea
                  placeholder=" Ask anything"
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  className="  h-16 relative placeholder:text-base placeholder:font-semibold border-none top-2 mb-2 focus:border-none  "
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
      {/* <footer className="flex justify-end  items-center w-full h-24 border-t">
        Crafted with ❤️ by <a href="">@thenameisajay</a>
      </footer> */}
    </>
  );
}
