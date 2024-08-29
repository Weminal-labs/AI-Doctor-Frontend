// Import types
import type { ChangeStateFn } from "src/hooks/useStateManager";
import type { LocalStateManager } from "src/types/general";
import type { Dialog } from "src/objects/conversation/types";
import type { USenders } from "src/objects/conversation/types";

export type CodeBlockState = ReturnType<typeof getInitialState>;
export type USessionStatus = "new" | "generating" | "wait_for_question";
export type UpdateSessionStatusFn = (status: USessionStatus) => void;
export type AddDialogFn = (content: string, sender: USenders) => void;

function getInitialState(dialogs: Array<Dialog> | null) {
  return {
    headerTitle: "New conversation",
    dialogs: dialogs as Array<Dialog> | null,
    sessionStatus: (dialogs != null
      ? "wait_for_question"
      : "new") as USessionStatus,
  };
}

function getStateFns(changeState: ChangeStateFn<CodeBlockState>) {
  return {
    updateSessionStatus(status: USessionStatus) {
      changeState("sessionStatus", function () {
        return status;
      });
    },

    addDialog(content: string, sender: USenders) {
      changeState("dialogs", function (data) {
        if (data === null) return [{ id: 0, content, sender }];
        return [...data, { id: data.length, content, sender }];
      });
    },

    appendChunkToLastDialog(chunk: string, sender: USenders) {
      changeState("dialogs", function (data) {
        if (data === null) return [{ id: 0, content: chunk, sender }];

        let lastDialog = data[data.length - 1];

        if (sender === lastDialog.sender) {
          lastDialog.content += chunk;
        } else {
          data.push({ id: data.length, content: chunk, sender });
        }

        return data;
      });
    },
  };
}

export const ConversationStateManager: LocalStateManager<
  typeof getInitialState,
  typeof getStateFns
> = {
  getInitialState,
  getStateFns,
};
