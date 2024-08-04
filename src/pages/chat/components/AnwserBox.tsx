import ChatAvatar from "./ChatAvatar";
import MDContent from "src/components/md";

export default function AnwserBox(message: any) {
  return (
    <div>
      <ChatAvatar
        src="https://th.bing.com/th/id/OIP.HNtNQPGaihircRCA63VPeAHaHa?pid=ImgDet&w=178&h=178&c=7"
        className="absolute -top-8"
      />
      <MDContent>{message.value}</MDContent>
      <div className="flex flex-row items-center gap-x-2 absolute -bottom-9">
        <div className="flex flex-row items-center cursor-pointer">
          <span className="material-symbols-outlined">flag</span>
          <div className="text-sm ms-2">Report</div>
        </div>
        <div className="flex flex-row items-center cursor-pointer ms-4">
          <span className="material-symbols-outlined">autorenew</span>
          <div className="text-sm ms-2">Re-anwser</div>
        </div>
      </div>
    </div>
  );
}
