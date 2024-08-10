import { createSlice } from "@reduxjs/toolkit";

// Import types
import type { AppState } from "..";

type ConversationState = {
  history: Map<string, Conversation>;
  current: Conversation;
};

type Conversation = {
  id: string;
  content: Array<any>;
};

export const ConversationSlice = createSlice({
  name: "conversation",
  initialState: {
    history: new Map(),
    current: { id: "", content: [] },
  } as ConversationState,
  reducers: {
    getConversation(state, action) {},

    getCurrentConversation(state, action) {},

    saveConversation(state, action) {},

    deleteConversation(state, action) {},
  },
});

export const ConversationActions = ConversationSlice.actions;

export function conversationSelector(state: AppState) {
  return state.conversation;
}
