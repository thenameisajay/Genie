"use client";
import React, { useState } from "react";

import toast from "react-hot-toast";
import { ArrowCircleUp, ArrowBendDownLeft, Lamp } from "@phosphor-icons/react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { fileToGenerativePart } from "@/lib/actions";
import { run } from "@/lib/gemini";
import ResponseComponent from "@/components/ui/response-component";

export default function HomePage() {
  const [textValue, setTextValue] = useState<string>("");
  const [imageParts, setImageParts] = useState<Array<Object>>([]);
  const [response, setResponse] = useState<string>("");

  const handleButtonClick = () => {
    const fileInput = document.getElementById("picture");
    fileInput?.click();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // Pack text and images into an object called message and send it to the api
    try {
      if (imageParts === undefined || imageParts.length == 0) {
        const message = {
          text: textValue.trim(),
        };

        const data = run(message).then((response) => {
          setResponse(response);
        });
      } else {
        const message = {
          text: textValue.trim(),
          imageParts: imageParts,
        };

        run(message)
          .then((response) => {
            setResponse(response);
          })
          .catch((error) => {
            console.log("Error", error);
          });
      }
      setImageParts([]);
      setTextValue("");
    } catch (error) {
      console.log("Failed to send message");
    }
  };

  const handleImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Add multiple images at once
    let files = event.target.files;
    console.log(files);
    if (files && files.length > 0) {
      toast.success(` ${files.length} Files selected`);

      // Convert to generative parts and store in an array of objects

      const generativePart: Array<Object> = [];
      for (let i = 0; i < files.length; i++) {
        fileToGenerativePart(files[i]).then((base64Image) => {
          generativePart.push(base64Image);
          setImageParts(generativePart);
        });
      }
    } else {
      toast.error("No files selected");
    }
  };

  return (
    <>
      <div className="flex flex-col  items-center text-center w-dvw absolute top-20 ">
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
          <Card className="flex flex-col justify-center items-center h-auto px-2  sm:w-96">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col  justify-center items-center  w-auto ">
                <Textarea
                  placeholder=" Ask anything"
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  className="  h-16 relative placeholder:text-base placeholder:font-semibold border-none top-2 mb-5 focus:border-none w-full "
                />

                <div className="flex flex-row justify-end items-end mt-2  w-64 mr-2 mb-3">
                  <Button
                    className="rounded-full p-2  w-10 h-10   bg-amber-900"
                    type="button"
                    onClick={handleButtonClick}
                  >
                    <ArrowCircleUp size={25} weight="fill" />
                    <Input
                      className="mr-2 ml-2"
                      id="picture"
                      type="file"
                      accept="image/jpeg, image/png , image/jpg"
                      onChange={handleImages}
                      style={{ display: "none" }}
                      multiple
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
          <div className="flex flex-col justify-center items-center  relative mt-10 mx-3">
            {/* <ResponseComponent response={response} /> */}
            {response.length > 0 ? (
              <>
                <ResponseComponent response={response} />
              </>
            ) : null}
          </div>
          <footer className=" relative    text-center mx-auto">
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Crafted with ❤️ by{" "}
              <a
                className=" text-blue-500 font-sans font-semibold"
                href="https://github.com/thenameisajay"
              >
                @thenameisajay
              </a>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
