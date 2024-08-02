import React from "react";

export default function ChatHeader(props: any) {
  return (
    <header className="p-6 border-b border-on-background-10/50">
      <h1 className="font-bold text-xl">{props.title || "ChatHeader"}</h1>
    </header>
  );
}
