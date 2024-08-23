// Import from components
import MDContent from "src/components/md";

// Import from local
// Import components
import ConversationAvatar from "./ConversationAvatar";
import ConversationBoxOuter from "./ConversationBoxOuter";

export default function QuestionBox(message: any) {
  return (
    <ConversationBoxOuter key={message.id} className="bg-background-10 mt-16">
      <div>
        <ConversationAvatar
          src="https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/FPGDGYJXM56KI5CTHHDX3DN2WQ.jpg&w=1440"
          className="absolute -top-8 border-background"
        />
        <MDContent>{message.content}</MDContent>
      </div>
    </ConversationBoxOuter>
  );
}
