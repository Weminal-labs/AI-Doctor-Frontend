// import React from "react";

// Import from local
// Import components
import AnwserBox from "./components/AnwserBox";
import AskBox from "./components/AskBox";
import ChatHeader from "./components/ChatHeader";
import MessageScrollBox from "./components/MessageScrollBox";
import QuestionBox from "./components/QuestionBox";
import ChatWelcome from "./components/ChatWelcome";

// Import mock data
import MessagesData from "src/assets/mock/messages.json";

export default function ChatPage() {
  const messages = MessagesData;

  return (
    <div className="flex w-full h-full border border-on-background-10/50 rounded-bl-xl rounded-tl-xl bg-background">
      {/* Chat Section */}
      <section className="relative flex flex-col w-[65%] min-w-[620px] h-full max-[1280px]:w-full">
        {messages && messages.length > 0 ? (
          <div className="h-[85%]">
            <ChatHeader />
            <MessageScrollBox
              messages={messages}
              renderAnswer={AnwserBox}
              renderQuestion={QuestionBox}
            />
          </div>
        ) : (
          <ChatWelcome />
        )}
        <AskBox />
      </section>

      {/* Another Section, that use to build some future feature: History of Chat, Organize Chats */}
      <div className="w-[35%] border-l border-on-background-10/50 max-[1280px]:hidden"></div>
    </div>
  );
}
