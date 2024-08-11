import React from "react";

export default function MessageScrollBox(props: any) {
  const scrollBoxElementRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (scrollBoxElementRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        // It works for the first time
        // I'll find another way
        scrollBoxElementRef.current?.scroll({
          top: entries[0].target.scrollHeight,
        });
      });
      // start observing a DOM node
      resizeObserver.observe(scrollBoxElementRef.current);
    }
  }, [scrollBoxElementRef.current]);

  return (
    <section className="flex flex-col items-center h-full">
      <div
        ref={scrollBoxElementRef}
        className="min-h-full overflow-y-auto px-6 pt-6 pb-[124px]"
      >
        {props.messages.map((message: any) => {
          if (message.sender === "bot") return props.renderAnswer(message);
          return props.renderQuestion(message);
        })}
      </div>
    </section>
  );
}
