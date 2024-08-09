import type {
  InputHTMLAttributes,
  HTMLInputTypeAttribute,
  SelectHTMLAttributes,
} from "react";

type _Content = (() => JSX.Element) | JSX.Element | string;
type _CustomHTMLInputAttributes = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  type: HTMLInputTypeAttribute | "chip" | "radio-chip";
};

export type FormElementProps = {
  elementType:
    | "input"
    | "chip"
    | "select"
    | "group-input"
    | "group-chip-input"
    | "group-select";
};

export type InputProps<Attrs> = FormElementProps & {
  label?: _Content;
  labelInputClassName?: string;
  elementAttributes: Attrs;
};

export type ChipInputProps = InputProps<_CustomHTMLInputAttributes> & {
  nonPadding?: boolean;
  shape?: string;
  value: string;
};

export type TextInputProps = InputProps<_CustomHTMLInputAttributes> & {
  left?: _Content;
  right?: _Content;
  containerClassName?: string;
  validate?: {
    pattern?: RegExp;
    errorMessage?: string;
  };
  isLabelInset?: boolean;
};

export type SelectOptionProps = {
  label: string;
  value: string;
};

export type SelectProps = InputProps<
  SelectHTMLAttributes<HTMLSelectElement>
> & {
  options: Array<SelectOptionProps>;
  containerClassName?: string;
};

//
// Group Type
//
export type GroupInputsProps = FormElementProps & {
  groupName: string;
  baseName: string;
  inputs: Array<TextInputProps>;
};

export type GroupChipInputsProps = FormElementProps & {
  groupName: string;
  chips: Array<ChipInputProps>;
};

export type GroupSelectProps = FormElementProps & {
  groupName: string;
  baseName: string;
  selects: Array<SelectProps>;
};

//
// General Type
//
export type FormPromptDataProps = {
  [key: string]:
    | TextInputProps
    | ChipInputProps
    | SelectProps
    | GroupInputsProps
    | GroupChipInputsProps
    | GroupSelectProps;
};
