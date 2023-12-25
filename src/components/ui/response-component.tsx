"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon, LightningBoltIcon } from "@radix-ui/react-icons";

export default function ResponseComponent(props: { response: string }) {
  return (
    <>
      <Alert className=" w-64 sm:w-auto  h-auto mb-2 sm:mx-2">
        <RocketIcon className="h-4 w-4 " />
        <AlertTitle>Response!</AlertTitle>
        <AlertDescription className="text-balance">
          {props.response}
        </AlertDescription>
      </Alert>
    </>
  );
}
