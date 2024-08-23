import React from "react";

// Import from components
import Button from "src/components/buttons/Button";
import Input from "src/components/input";
import LoadingIndicator from "src/components/loading_indicator";

// Import from utils
import { BooleanUtils } from "src/utils/boolean";

// Import from locals
// Import utils
import { ConversationUtils } from "../utils";

// Import types
import type { TextInputProps } from "src/types/form";
import type {
  USessionStatus,
  AddDialogFn,
  UpdateSessionStatusFn,
} from "../state";

type AskBoxProps = {
  sessionStatus: USessionStatus;
  addDialog: AddDialogFn;
  updateSessionStatus: UpdateSessionStatusFn;
};

const _buttonContents = {
  normal: <span className="material-symbols-outlined ms-2">send</span>,
  executing: (
    <LoadingIndicator
      isTextPlaceBeforeIndicator
      text={<span className="text-gray-800 font-bold ms-1">Wait</span>}
    />
  ),
};

const askBoxConfig: TextInputProps = {
  elementType: "input",
  containerClassName:
    "[&>div]:flex [&>div]:items-end w-full [&>div]:outline-0 [&>div]:max-h-[15dvh] [&>div]:focus-within:outline-none [&>div]:mt-0 [&>div]:rounded-xl [&>div]:bg-background-50 [&>div>input]:py-2 px-6",
  elementAttributes: {
    name: "question",
    type: "text-area",
    placeholder: "Type your question here...",
    className: "resize-none max-h-[calc(15dvh-3rem)] my-2",
    onKeyUp(e) {
      const target = e.target as HTMLTextAreaElement;
      const reg = /^(\d+)(?:px|pt)/;
      const lineHeightMatchResult = window
        .getComputedStyle(target)
        .lineHeight.match(reg);
      const lineHeight = parseInt(
        lineHeightMatchResult ? lineHeightMatchResult[1] : "0"
      );

      target.style.height = lineHeight + "px";
      target.style.height = target.scrollHeight + "px";
    },
  },
};

export default function AskBox(props: AskBoxProps) {
  const inputElementRef = React.useRef<HTMLTextAreaElement | null>(null);

  if (props.sessionStatus === "generating") {
    askBoxConfig.elementAttributes.disabled = true;
  } else if (props.sessionStatus === "wait_for_question") {
    askBoxConfig.elementAttributes.disabled = false;
  }

  React.useEffect(() => {
    if (inputElementRef.current) {
      inputElementRef.current.style.height = window.getComputedStyle(
        inputElementRef.current
      ).lineHeight;
    }
  }, [inputElementRef.current]);

  return (
    <div className="flex flex-row-reverse relative z-10 bg-background items-end rounded-bl-xl">
      <form
        className="flex w-full mb-6 pt-6"
        id="ask"
        onSubmit={(e) => {
          // Prevent reload when submit
          e.preventDefault();

          const content = (e.target as HTMLFormElement)["question"].value;
          if (BooleanUtils.isEmpty(content)) return;

          // Clear value of input
          (e.target as HTMLFormElement)["question"].value = "";

          // Send message to server
          // Socket message emitter will be used
          ConversationUtils.ask(
            content,
            props.addDialog,
            props.updateSessionStatus
          );
        }}
      >
        <Input
          ref={inputElementRef as React.LegacyRef<HTMLInputElement>}
          right={
            <Button
              className="flex w-fit px-4 ms-6"
              disabled={props.sessionStatus === "generating"}
            >
              {
                _buttonContents[
                  props.sessionStatus === "generating" ? "executing" : "normal"
                ]
              }
            </Button>
          }
          {...askBoxConfig}
        />
      </form>
    </div>
  );
}
