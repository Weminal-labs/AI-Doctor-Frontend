import React from "react";

export type ChatBoxOuterProps = {
  className: string;
} & React.PropsWithChildren;

export default function ChatBoxOuter(props: ChatBoxOuterProps) {
  return (
    <div className={"w-full inline-block pb-4 pt-10 px-6 rounded-lg relative z-0 " + props.className}>
      {props.children}
    </div>
  );
}