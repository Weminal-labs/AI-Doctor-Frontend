// Import types
import type { ChangeStateFn } from "src/hooks/useStateManager";

export type ExploreScreenState = ReturnType<typeof getInitialState>;

function getInitialState() {
  return {
    isOpen: false,
    selectedValue: { value: "", label: "No selected" },
  };
}

function getStateFns(changeState: ChangeStateFn<ExploreScreenState>) {
  return {
    toggleIsOpen() {
      changeState("isOpen", function (status) {
        return !status;
      });
    },

    setSelectedValue(value: any) {
      changeState("selectedValue", function () {
        return value;
      });
    },
  };
}

export const SelectStateManager = {
  getInitialState,
  getStateFns,
};
