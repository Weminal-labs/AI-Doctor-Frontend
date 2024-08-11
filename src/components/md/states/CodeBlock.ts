// Import types
import type { ChangeStateFn } from "src/hooks/useStateManager";
import type { LocalStateManager } from "src/types/general";

export type CodeBlockState = ReturnType<typeof getInitialState>;

function getInitialState() {
  return {
    isExecuting: false,
    hasResult: false,
    result: null as string | null,
  };
}

function getStateFns(changeState: ChangeStateFn<CodeBlockState>) {
  return {
    setIsExecuting(status?: boolean) {
      changeState("isExecuting", function () {
        return Boolean(status);
      });
    },

    setHasResult(status?: boolean) {
      changeState("hasResult", function () {
        return Boolean(status);
      });
    },

    setResult(result: string | null) {
      changeState("result", function () {
        return result;
      });
    },
  };
}

export const CodeBlockStateManager: LocalStateManager<
  typeof getInitialState,
  typeof getStateFns
> = {
  getInitialState,
  getStateFns,
};
