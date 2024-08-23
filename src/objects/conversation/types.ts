export type Dialog = {
  id: string | number;
  content: any;
};

export type USenders = "bot" | "human";

export type Conversation = {
  id: string | number;
  dialogs: Array<Dialog> | null;
  sender: USenders;
};
