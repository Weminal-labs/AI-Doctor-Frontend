import React from "react";

export default function DialogScrollBox(props: any) {
  const scrollBoxElementRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (scrollBoxElementRef.current) {
      setTimeout(() => {
        scrollBoxElementRef.current!.scroll(
          0,
          scrollBoxElementRef.current!.scrollHeight
        );
      }, 10);
    }
  }, [scrollBoxElementRef.current, scrollBoxElementRef.current?.scrollHeight]);

  return (
    <section ref={scrollBoxElementRef} className="grow overflow-y-scroll pb-3">
      <div className="flex flex-col-reverse min-h-full px-6 pt-6">
        {props.dialogs.reduceRight((dialogs: Array<any>, dialog: any) => {
          let _dialog = props.renderQuestion(dialog);
          if (dialog.sender === "bot") _dialog = props.renderAnswer(dialog);
          dialogs.push(_dialog);
          return dialogs;
        }, [])}
      </div>
    </section>
  );
}
