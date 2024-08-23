type ChatHeaderProps = {
  title?: string;
};

export default function ChatHeader(props: ChatHeaderProps) {
  return (
    <header className="sticky top-0 p-6 border-b rounded-tl-xl bg-background border-on-background-10/50">
      <h1 className="font-bold text-xl">{props.title || "ChatHeader"}</h1>
    </header>
  );
}
