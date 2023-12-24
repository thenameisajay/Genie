"use client";

export default function ResponseComponent(props: { response: string }) {
  return (
    <>
      <p className=" font-sans font-bold"> Response:</p>
      <br />
      <p>{props.response}</p>
    </>
  );
}
