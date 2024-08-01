// import React from "react";

// Import from local
// Import components
import AnwserBox from "./components/AnwserBox";
import AskBox from "./components/AskBox";
import MessageScrollBox from "./components/MessageScrollBox";
import QuestionBox from "./components/QuestionBox";

export default function ChatPage() {
  return (
    <div className="flex w-full h-full border border-on-background-10/50 rounded-bl-xl rounded-tl-xl bg-background">
      {/* Chat Section */}
      <section className="relative flex flex-col w-[65%] min-w-[620px] max-[1280px]:w-full">
        <MessageScrollBox
          renderAnswer={AnwserBox}
          renderQuestion={QuestionBox}
        />
        <AskBox />
      </section>

      {/* Another Section, that use to build some future feature: History of Chat, Organize Chats */}
      <div className="w-[35%] border-l border-on-background-10/50 max-[1280px]:hidden"></div>
    </div>
  );
}
