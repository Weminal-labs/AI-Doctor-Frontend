export type UAnswerTypes = "normal" | "code";

export type Question = {
  prompt: string;
};

export type Answer = {
  content: string;
  type: UAnswerTypes;
};
