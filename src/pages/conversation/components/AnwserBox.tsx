// Import from components
import Button from "src/components/buttons/Button";
import MDContent from "src/components/md";

// Import from local
// Import components
import ConversationBoxOuter from "./ConversationBoxOuter";
import ConversationAvatar from "./ConversationAvatar";

export default function AnwserBox(message: any) {
  return (
    <div>
      <ConversationBoxOuter className="bg-first-10/10 mt-16 mb-3">
        <div>
          <ConversationAvatar
            src="https://th.bing.com/th/id/OIP.HNtNQPGaihircRCA63VPeAHaHa?pid=ImgDet&w=178&h=178&c=7"
            className="absolute -top-8"
          />
          <MDContent>{message.value}</MDContent>
        </div>
      </ConversationBoxOuter>
      <div className="flex flex-row items-center">
        <Button
          colorType="none"
          buttonType="non_padding"
          className="flex flex-row items-center cursor-pointer px-3 py-2 hover:bg-on-background-10/10"
        >
          <span className="material-symbols-outlined">flag</span>
          <div className="text-sm ms-2">Report</div>
        </Button>
        <Button
          colorType="none"
          buttonType="non_padding"
          className="flex flex-row items-center cursor-pointer ms-3 px-3 py-2 hover:bg-on-background-10/10"
        >
          <span className="material-symbols-outlined">autorenew</span>
          <div className="text-sm ms-2">Re-anwser</div>
        </Button>
      </div>
    </div>
  );
}
