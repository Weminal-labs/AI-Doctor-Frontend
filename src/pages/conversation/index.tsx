import React from "react";

// Import from hooks
import { useConversation } from "src/hooks/useConversation";
import { useStateManager } from "src/hooks/useStateManager";

// Import from utils
import { OtherUtils } from "src/utils/other";

// Import from local
// Import components
import AnwserBox from "./components/AnwserBox";
import AskBox from "./components/AskBox";
import ConversationHeader from "./components/ConversationHeader";
import DialogScrollBox from "./components/DialogScrollBox";
import QuestionBox from "./components/QuestionBox";
import ConversationWelcome from "./components/ConversationWelcome";

// Import state manager
import { ConversationStateManager } from "./state";

// Import utils
import { ConversationUtils } from "./utils";

// Import mock data
import DialogsData from "src/assets/mock/dialogs.json";

export default function ConversationPage() {
  const { conversation, conversationDispatchers } = useConversation();

  const [state, stateFns] = useStateManager(
    ConversationStateManager.getInitialState(
      conversation.archivedLatestDialogs
        ? conversation.archivedLatestDialogs
        : DialogsData
    ),
    ConversationStateManager.getStateFns
  );

  const hasDialog = state.sessionStatus !== "new";

  // The bi-direction communication will be handled
  // here with WebSocket
  React.useEffect(() => {
    if (state.sessionStatus === "generating") {
      OtherUtils.wait(2000).then(() => {
        ConversationUtils.response(
          "Your question is answered. Please, ask another question!",
          stateFns.addDialog,
          stateFns.updateSessionStatus
        );
      });
    }

    // Save dialogs to archived
    return function () {
      if (state.dialogs)
        conversationDispatchers.saveCurrentDialogs(state.dialogs);
    };
  }, [state.sessionStatus]);

  return (
    <div className="flex w-full h-full border border-on-background-10/50 rounded-bl-xl rounded-tl-xl bg-background">
      {/* Conversation Section */}
      <section className="relative flex flex-col justify-between w-[52%] min-w-[620px] h-full max-[1280px]:w-full">
        {hasDialog && <ConversationHeader title={state.headerTitle} />}
        {hasDialog ? (
          <DialogScrollBox
            dialogs={state.dialogs}
            renderAnswer={AnwserBox}
            renderQuestion={QuestionBox}
          />
        ) : (
          <ConversationWelcome />
        )}
        <AskBox
          sessionStatus={state.sessionStatus}
          updateSessionStatus={stateFns.updateSessionStatus}
          addDialog={stateFns.addDialog}
        />
      </section>

      {/* Another Section, that use to build some future feature: History of Chat, Organize Chats */}
      <div className="w-[48%] border-l border-on-background-10/50 max-[1280px]:hidden p-6">
        <div className="w-full h-full bg-background-10 rounded-xl p-6">
          <header className="rounded-xl p-6 bg-background">
            <p className="font-bold text">Processing logs</p>
          </header>
        </div>
      </div>
    </div>
  );
}
