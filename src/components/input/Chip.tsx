import React from "react";

// Import types
import type { ChipInputProps } from "src/types/form";

export default function Chip(
  props: ChipInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { label, labelInputClassName, nonPadding, shape } = props;
  const className =
    "input-chip" +
    (props.elementAttributes.className
      ? " " + props.elementAttributes.className
      : "");
  let type = "checkbox";

  if (
    props.elementAttributes &&
    props.elementAttributes.type === "radio-chip"
  ) {
    type = "radio";
  }

  if (type === "") {
    console.warn("Chip must be have specific type: chip or radio-chip");
    return null;
  }

  let checkClassName = "input-chip-check";

  // Extended Props
  if (nonPadding) checkClassName += " " + "non-padding";
  if (shape) checkClassName += " " + shape;
  else checkClassName += " " + "rounded";

  return (
    <label
      className={`label-input-chip${
        labelInputClassName ? " " + labelInputClassName : ""
      }`}
    >
      <input
        ref={ref}
        {...props.elementAttributes}
        className={className}
        type={type}
      />
      <span className={checkClassName}>
        {label && typeof label === "function" && label()}
        {label &&
          typeof (label === "string" || React.isValidElement(label)) &&
          (label as JSX.Element | string)}
      </span>
    </label>
  );
}
