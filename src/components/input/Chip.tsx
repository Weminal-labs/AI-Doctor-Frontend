import React from "react";

// Import types
import type { ChipInputProps } from "src/types/form";

export default function Chip(
  props: ChipInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  let { label, labelInputClassName, className, nonPadding, shape, type } =
    props;
  type =
    props.type === "chip"
      ? "checkbox"
      : props.type === "radio-chip"
      ? "radio"
      : "";

  if (type === "") {
    console.warn("Chip must be have specific type: chip or radio-chip");
    return null;
  }

  let checkClassName = "input-chip-check";

  // Extended Props
  if (nonPadding) checkClassName += " " + "non-padding";
  if (shape) checkClassName += " " + shape;
  else checkClassName += " " + "rounded";

  className = "input-chip";

  return (
    <label
      className={`label-input-chip${
        labelInputClassName ? " " + labelInputClassName : ""
      }`}
    >
      <input ref={ref} {...props} className={className} type={type} />
      <span className={checkClassName}>
        {label && typeof label === "function" && label()}
        {label &&
          typeof (label === "string" || React.isValidElement(label)) &&
          (label as JSX.Element | string)}
      </span>
    </label>
  );
}
