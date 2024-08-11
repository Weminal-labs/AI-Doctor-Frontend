// Import from components
import MDContent from "src/components/md";

// Import from local
// Import components
import ConversationAvatar from "./ConversationAvatar";
import ConversationBoxOuter from "./ConversationBoxOuter";

export default function QuestionBox(message: any) {
  return (
    <ConversationBoxOuter className="bg-background-10 mt-14 mb-10">
      <div>
        <ConversationAvatar
          src="https://anhgaixinh.vn/wp-content/uploads/2022/08/7_hinh-gai-xinh-cute-de-thuong-nhat-viet-nam.jpg"
          className="absolute -top-8 border-background"
        />
        <MDContent>{message.value}</MDContent>
      </div>
    </ConversationBoxOuter>
  );
}
