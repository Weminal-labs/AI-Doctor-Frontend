// Import types
import type { AddDialogFn, UpdateSessionStatusFn } from "../state";

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
