// Import types
import { FormPromptDataProps } from "src/types/form";

export const ActiveAccountForm: FormPromptDataProps = {
  CODE: {
    elementType: "input",
    elementAttributes: {
      placeholder: "Mã kích hoạt",
      required: true,
      type: "text",
      name: "code",
    },
  },
};
