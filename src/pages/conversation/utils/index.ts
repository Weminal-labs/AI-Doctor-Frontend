// Import from objects
import { SocketClient } from "src/objects/socket";

// Import types
import type { AddDialogFn, UpdateSessionStatusFn } from "../state";

const socket = new SocketClient();

export type USocketEventEmitterTypes =
  | "receive_question"
  | "receive_follow_up_question"
  | "get_context_ids"
  | "user_selected_context_ids"
  | "handle_answer";

export type USocketEventListenerTypes =
  | "answer_available"
  | "follow_up"
  | "final_question"
  | "relevant_docs"
  | "answer";

export class ConversationUtils {
  /**
   * Ask chat bot about something
   * @param content
   * @param add
   * @param updateIsResponding
   */
  static ask(
    content: string,
    addDialog: AddDialogFn,
    updateSessionStatus: UpdateSessionStatusFn
  ) {
    addDialog(content, "human");
    updateSessionStatus("generating");
    socket.emit("receive_question", content);
  }

  /**
   * Response to user
   * @param content
   * @param addDialog
   * @param updateSessionStatus
   */
  static response(
    content: string,
    addDialog: AddDialogFn,
    updateSessionStatus: UpdateSessionStatusFn
  ) {
    addDialog(content, "bot");
    updateSessionStatus("wait_for_question");
  }
}
