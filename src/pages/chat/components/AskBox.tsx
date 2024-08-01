import React from "react";

// Import from components
import Button from "src/components/buttons/Button";
import Input from "src/components/input";

// Import types
import type { TextInputProps } from "src/types/form";

const askBoxConfig: TextInputProps = {
  elementType: "input",
  containerClassName:
    "[&>div]:outline-0 [&>div]:focus-within:outline-none [&>div]:mt-0 [&>div]:rounded-xl [&>div]:bg-background-50 [&>div>input]:py-2 px-6",
  right: (
    <Button className="flex w-fit px-8 ms-6">
      <span className="material-symbols-outlined ms-2">send</span>
    </Button>
  ),
  elementAttributes: {
    type: "text",
    placeholder: "Type your question here...",
  },
};

export default function AskBox() {
  return (
    <form className="absolute bottom-6 w-full" id="ask">
      <Input {...askBoxConfig} />
    </form>
  );
}
