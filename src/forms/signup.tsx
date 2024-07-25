// Import types
import {
  FormPromptDataProps,
  TextInputProps,
  SelectProps,
} from "src/types/form";

export const SignupForm: FormPromptDataProps = {
  USERNAME: {
    elementType: "input",
    label: "Tai khoan",
    labelInputClassName: "text-on-background",
    containerClassName: "mb-4",
    elementAttributes: {
      id: "username",
      type: "text",
      name: "username",
      placeholder: "Tài khoản của bạn",
      required: true,
    },
  } as TextInputProps,
  EMAIL: {
    elementType: "input",
    label: "Email",
    labelInputClassName: "text-on-background",
    isLabelInset: true,
    containerClassName: "mb-4",
    left: (
      <span className="material-symbols-outlined me-2 font-thin">mail</span>
    ),
    elementAttributes: {
      id: "email",
      type: "email",
      name: "email",
      placeholder: "Enter you email here...",
      required: true,
    },
  } as TextInputProps,
  PASSWORD: {
    elementType: "input",
    containerClassName: "mb-4",
    elementAttributes: {
      placeholder: "Mật khẩu của bạn",
      type: "password",
      name: "password",
      required: true,
      pattern: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
    },
  } as TextInputProps,
  CONFIRM_PASSWORD: {
    elementType: "input",
    containerClassName: "mb-4",
    elementAttributes: {
      type: "password",
      name: "confirmedPassword",
      placeholder: "Xác nhận lại mật khẩu",
      required: true,
    },
  } as TextInputProps,
  ROLE_SELECT: {
    elementType: "select",
    label: "Role",
    containerClassName: "mb-4",
    options: [
      {
        label: "FrontEnd Developer",
        value: "fronend-developer",
      },
      {
        label: "BackEnd Developer",
        value: "backend-developer",
      },
    ],
    elementAttributes: {
      name: "role",
    },
  } as SelectProps,
};
