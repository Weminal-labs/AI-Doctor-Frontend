import React from "react";

// Import types
import type { ThemePropertyNames } from "src/objects/Theme";

export type Button_Types =
  | "normal"
  | "rounded"
  | "full_rounded"
  | "non_padding";
export type Button_ColorTypes = ThemePropertyNames | "none";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType?: Button_Types;
  colorType?: Button_ColorTypes;
  hasFocusOutline?: boolean;
  // hasPadding?: boolean;
};
