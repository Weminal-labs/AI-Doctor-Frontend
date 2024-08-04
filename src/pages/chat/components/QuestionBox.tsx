import ChatAvatar from "./ChatAvatar";
import MDContent from "src/components/md";

export default function QuestionBox(message: any) {
  return (
    <div>
      <ChatAvatar 
        src="https://anhgaixinh.vn/wp-content/uploads/2022/08/7_hinh-gai-xinh-cute-de-thuong-nhat-viet-nam.jpg" 
        className="absolute -top-8"
      />
      <MDContent>{message.value}</MDContent>
    </div>
  );
}
