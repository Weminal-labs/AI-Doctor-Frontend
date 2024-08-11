// Import utils
import { BooleanUtils } from "src/utils/boolean";

// Import types
// import type { ThemeNames } from 'src/classes/Theme';
import type { Button_Types, Button_ColorTypes } from "./Button.props";

export class ButtonUtils {
  static BorderRadiusTypes: { [key in Button_Types]: string } = {
    normal: "",
    rounded: "px-4 py-3 rounded-lg",
    full_rounded: "p-4 rounded-[100%]",
    non_padding: "rounded-lg",
  };

  static Colors: Partial<{
    [N in Button_ColorTypes]: { bg: string; text: string };
  }> = {
    background: {
      bg: "bg-background focus:non-outline",
      text: "text-on-background",
    },
    onBackground: {
      bg: "bg-on-background focus:non-outline",
      text: "text-background",
    },
    success: {
      bg: "bg-success focus:non-outline",
      text: "text-on-success",
    },
    error: {
      bg: "bg-error focus:non-outline",
      text: "text-on-error",
    },
    warning: {
      bg: "bg-warning focus:non-outline",
      text: "text-on-warning",
    },
    info: {
      bg: "bg-info focus:non-outline",
      text: "text-on-info",
    },
    first: {
      bg: "bg-first focus:non-outline",
      text: "text-on-first",
    },
    onFirst: {
      bg: "bg-on-first focus:non-outline",
      text: "text-first",
    },
    second: {
      bg: "bg-second focus:non-outline",
      text: "text-on-second",
    },
    onSecond: {
      bg: "bg-on-second focus:non-outline",
      text: "text-second",
    },
    third: {
      bg: "bg-third focus:non-outline",
      text: "text-on-third",
    },
    onThird: {
      bg: "bg-on-third focus:non-outline",
      text: "text-third",
    },
  };

  static mayAppendBorderRadius(
    className: string,
    type: Button_Types | undefined
  ) {
    if (!type) return className;
    return className + " " + ButtonUtils.BorderRadiusTypes[type];
  }

  static mayAppendColor(
    className: string,
    type: Button_ColorTypes,
    isDisable?: boolean
  ) {
    if (BooleanUtils.isTruthy(isDisable))
      return (
        className +
        " cursor-default bg-on-background/90 focus:non-on-background text-on-background/50"
      );

    if (type === "none") return className;
    return (
      className +
      " " +
      ButtonUtils.Colors[type]!.bg +
      " " +
      ButtonUtils.Colors[type]!.text
    );
  }

  static mayAppendFocusedOutline(className: string, hasFocusOutline: boolean) {
    return hasFocusOutline
      ? className + " focus:ring focus:ring-outline"
      : className;
  }
}
