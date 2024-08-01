import React from "react";

// Import from local
// Import components
import ChatWelcome from "./ChatWelcome";
import ChatHeader from "./ChatHeader";

// Import mock data
import MessagesData from "src/assets/mock/messages.json";

export default function MessageScrollBox(props: any) {
  const messages = MessagesData;
  const BotMessage = (message: any) => (
    <div className="bg-background-10 w-full inline-block py-3 px-6 mb-6">
      <p>{message.value}</p>
    </div>
  );
  const HumanMessage = (message: any) => (
    <div className="bg-first-10/20 w-full inline-block py-3 px-6 mb-6">
      <p>{message.value}</p>
    </div>
  );

  return (
    <section className="flex flex-col items-center h-full">
      {messages && messages.length > 0 ? (
        <div className="relative h-full">
          <ChatHeader />
          <div className="max-h-[calc(100dvh-77px-calc(2*24px))] overflow-y-auto px-6 pt-6 pb-[124px]">
            {messages.map((message) => {
              if (message.sender === "bot")
                return <BotMessage key={message.id} {...message} />;
              return <HumanMessage key={message.id} {...message} />;
            })}
          </div>
          <div className="absolute w-full bottom-0 bg-background"></div>
        </div>
      ) : (
        <ChatWelcome />
      )}
    </section>
  );
}
