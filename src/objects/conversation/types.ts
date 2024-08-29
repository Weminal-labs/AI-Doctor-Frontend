export type Dialog = {
  id: string | number;
  content: any;
  sender: USenders;
};

export type USenders = "bot" | "human";

export type Conversation = {
  id: string | number;
  dialogs: Array<Dialog> | null;
};
