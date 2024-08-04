import AnwserBox from "./AnwserBox";
import ChatBoxOuter from "./ChatBoxOuter";
import QuestionBox from "./QuestionBox";

export default function MessageScrollBox(props: any) {
  return (
    <section className="flex flex-col items-center h-full">
      <div className="h-full overflow-y-auto px-6 pt-6 pb-[124px]">
        {props.messages.map((message: any) => {
          if (message.sender === "bot")
            return (
              <ChatBoxOuter key={message.id} className="bg-background-10 mt-14 mb-10">
                <AnwserBox {...message} />
              </ChatBoxOuter>
            )
          return (
            <ChatBoxOuter key={message.id} className="bg-first-10/20 mt-16">
              <QuestionBox {...message} />
            </ChatBoxOuter>
          );
        })}
      </div>
    </section>
  );
}
