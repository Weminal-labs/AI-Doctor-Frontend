// import React from "react";

// Import from components
import Button from "src/components/buttons/Button";
import LoadingIndicator from "src/components/loading_indicator";

const _buttonContents = {
  normal: (
    <>
      <span className="font-bold ms-1">RUN</span>
      <span className="material-symbols-outlined ms-1">play_circle</span>
    </>
  ),
  executing: (
    <LoadingIndicator
      isTextPlaceBeforeIndicator
      text={<span className="text-gray-800 font-bold ms-1">RUN</span>}
    />
  ),
};

export type CodeExecBox = {
  isExecuting: boolean;
  hasResult: boolean;
  runCode: () => any;
};

export default function CodeExecBox(props: CodeExecBox) {
  return (
    <div className="bg-background py-2 ps-6 pe-2.5 flex flex-row items-center justify-between rounded-lg border-on-background-10/50 border-2">
      <p>
        {props.hasResult
          ? "The result is showed below, you can get more results"
          : "Do you want to get the example result?"}
      </p>
      <Button
        disabled={props.isExecuting}
        onClick={() => {
          props.runCode();
        }}
        className="flex flex-row justify-center items-center w-[100px] h-[40px] rounded-lg cursor-pointer"
      >
        {
          _buttonContents[
            (props.isExecuting
              ? "executing"
              : "normal") as keyof typeof _buttonContents
          ]
        }
      </Button>
    </div>
  );
}
