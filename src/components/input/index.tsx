import React from "react";

// Import from local
// Import componets
import TextInput from "./TextInput";
import Chip from "./Chip";
import SelectBox from "./SelectBox";

// Import styles
import "./style.css";

// Import types
import type { ChipInputProps, TextInputProps } from "src/types/form";

const _TextInput = React.forwardRef(TextInput);
const _SelectBox = React.forwardRef(SelectBox);
const _ChipInput = React.forwardRef(Chip);

function _Input(
  props: ChipInputProps | TextInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  switch (props.elementAttributes ? props.elementAttributes.type : "") {
    case "chip":
    case "radio-chip": {
      return <_ChipInput {...(props as ChipInputProps)} ref={ref} />;
    }

    case "checkbox":
    case "radio": {
      return <_SelectBox {...(props as any)} ref={ref} />;
    }

    case "button":
    case "reset":
    case "submit":
    case "range":
    case "color":
    case "image":
    case "hidden": {
      return <input ref={ref} {...props} />;
    }

    case "text":
    case "number":
    case "password":
    case "email":
    case "search":
    case "tel":
    case "url":
    default:
      return <_TextInput {...(props as TextInputProps)} ref={ref} />;
  }
}

const Input = React.forwardRef(_Input);

export default Input;
