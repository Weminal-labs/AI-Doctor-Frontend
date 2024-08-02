// import React from "react";

export default function MessageScrollBox(props: any) {
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
      <div className="h-full overflow-y-auto px-6 pt-6 pb-[124px]">
        {props.messages.map((message: any) => {
          if (message.sender === "bot")
            return <BotMessage key={message.id} {...message} />;
          return <HumanMessage key={message.id} {...message} />;
        })}
      </div>
    </section>
  );
}
