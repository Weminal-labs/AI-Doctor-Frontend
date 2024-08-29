// import React from "react";

// Import from components
import Button from "src/components/buttons/Button";

// Import mock data
import ExampleQuestionsData from "src/assets/mock/example_questions.json";

export type ConversationWelcomeProps = {
  ask(content: string): any;
};

export default function ConversationWelcome(props: ConversationWelcomeProps) {
  return (
    <div className="w-full flex flex-col items-center mt-[98px]">
      <h1 className="text-5xl font-bold max-w-[376px]">
        Ask me to write <span className="text-gradient-1">smart</span> contracts
      </h1>
      <div className="w-full max-w-[520px] flex flex-col mt-6">
        {ExampleQuestionsData.map((question) => (
          <Button
            colorType="none"
            className="flex py-6 mb-3 w-full border border-1 border-on-background-10/50 justify-between items-center"
            key={question.value}
            onClick={() => {
              props.ask(question.value);
            }}
          >
            <div className="flex items-center">
              <span className="material-symbols-outlined me-2 text-first">
                help
              </span>
              {question.value}
            </div>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
