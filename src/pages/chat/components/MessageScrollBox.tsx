export default function MessageScrollBox(props: any) {
  return (
    <section className="flex flex-col items-center h-full">
      <div className="h-full overflow-y-auto px-6 pt-6 pb-[124px]">
        {props.messages.map((message: any) => {
          if (message.sender === "bot") return props.renderAnswer(message);
          return props.renderQuestion(message);
        })}
      </div>
    </section>
  );
}
