import { useDispatch, useSelector } from "react-redux";

// Import actions
import { ConversationActions } from "src/states/redux/conversation";

// Import selectors
import { conversationSelector } from "src/states/redux/conversation";

// Import types
import type { AppDispatch } from "src/states/redux";

export const { useConversation, useConversationActions, useConversationState } =
  (function () {
    const createDispatchers = function (dispatch: AppDispatch) {
      return {
        getConversation() {
          dispatch(ConversationActions.getConversation(""));
        },
        getCurrentConversation() {
          dispatch(ConversationActions.getCurrentConversation(""));
        },
        saveConversation() {
          dispatch(ConversationActions.saveConversation(""));
        },
        deleteConversation() {
          dispatch(ConversationActions.deleteConversation(""));
        },
      };
    };

    return {
      useConversation() {
        const conversation = useSelector(conversationSelector);
        const conversationDispatchers = createDispatchers(useDispatch());
        return { conversation, conversationDispatchers };
      },

      useConversationActions() {
        return createDispatchers(useDispatch());
      },

      useConversationState() {
        return useSelector(conversationSelector);
      },
    };
  })();
