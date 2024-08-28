// Import from components
import Button from "src/components/buttons/Button";

type ChatHeaderProps = {
  title?: string;
};

export default function ChatHeader(props: ChatHeaderProps) {
  return (
    <header className="sticky top-0 flex justify-between items-center p-6 border-b rounded-tl-xl bg-background border-on-background-10/50">
      <h1 className="font-bold text-xl">{props.title || "ChatHeader"}</h1>
      <div className="flex">
        <Button
          colorType="none"
          buttonType="non_padding"
          className="flex flex-row items-center cursor-pointer px-3 py-2 hover:bg-on-background-10/10"
        >
          <span className="material-symbols-outlined">flag</span>
        </Button>
        <Button
          colorType="none"
          buttonType="non_padding"
          className="flex flex-row items-center cursor-pointer px-3 py-2 hover:bg-on-background-10/10"
        >
          <span className="material-symbols-outlined">help</span>
        </Button>
      </div>
    </header>
  );
}
