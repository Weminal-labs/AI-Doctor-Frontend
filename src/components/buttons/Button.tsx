// import React from 'react'

// Import from local
// Import utils
import { ButtonUtils } from "./utils";

// Import types
// import type { ThemeNames } from 'src/classes/Theme';
import type { ButtonProps } from "./Button.props";

export default function Button({
  buttonType = "rounded",
  colorType = "first",
  hasFocusOutline = true,
  ...props
}: ButtonProps) {
  let className = ButtonUtils.mayAppendBorderRadius("", buttonType);
  className = ButtonUtils.mayAppendColor(className, colorType, props.disabled);
  className = ButtonUtils.mayAppendFocusedOutline(className, hasFocusOutline);

  className += " " + props.className;

  return (
    <button {...props} className={className}>
      {props.children}
    </button>
  );
}
