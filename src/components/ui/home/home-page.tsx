"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowCircleUp, ArrowBendDownLeft } from "@phosphor-icons/react";

export default function HomePage() {
  const [textValue, setTextValue] = useState<string>("");

  return (
    <>
      <div className="flex flex-col  items-center text-center h-screen w-screen  absolute top-36 ">
        <h1>Genie</h1>
        <h3>I know All , I see All</h3>
        <div className=" relative top-20 w-auto h-auto ">
          <Card className="flex flex-col justify-center items-center h-32  w-screen ">
            <form>
              <div className="flex flex-col  justify-center items-center  p-2 ">
                <Input
                  placeholder=" Ask me anything"
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  className=" w-72 h-16 px-2 "
                />
                <div className="flex flex-row justify-center items-center mt-2">
                  <Button
                    className="rounded-full p-2  border-b-orange-900"
                    type="button"
                    onClick={() => {
                      console.log("upload");
                    }}
                  >
                    <ArrowCircleUp size={20} weight="fill" />
                    <Input
                      id="picture"
                      type="file"
                      className="mr-2 ml-2 hidden"
                    />
                  </Button>
                  <Button
                    type="submit"
                    disabled={textValue.length === 0}
                    className="ml-2 rounded-full p-2"
                  >
                    <ArrowBendDownLeft size={20} weight="fill" />
                  </Button>
                </div>
              </div>
            </form>
            <p>{textValue}</p>
          </Card>
        </div>
      </div>
    </>
  );
}
