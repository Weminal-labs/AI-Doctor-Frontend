type ChatAvatarProps = {
  src: string;
  className: string;
};

export default function ChatAvatar(props: ChatAvatarProps) {
  return (
    <img 
      src={props.src} 
      alt="chat_avatar" 
      loading="lazy" 
      className={"w-16 h-16 object-cover rounded-lg border-4 border-background " + props.className}
    />
  );
}
