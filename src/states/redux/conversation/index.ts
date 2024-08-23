import { createSlice } from "@reduxjs/toolkit";

// Import types
import type { AppState } from "..";
import type { Conversation, Dialog } from "src/objects/conversation/types";

type ConversationState = {
  history: Map<string, Conversation>;
  archivedLatestDialogs: Array<Dialog> | null;
};

export const ConversationSlice = createSlice({
  name: "conversation",
  initialState: {
    history: new Map(),
    archivedLatestDialogs: null,
  } as ConversationState,
  reducers: {
    saveCurrentDialogs(state, action) {
      state.archivedLatestDialogs = action.payload;
    },
  },
});

export const ConversationActions = ConversationSlice.actions;

export function conversationSelector(state: AppState) {
  return state.conversation;
}
