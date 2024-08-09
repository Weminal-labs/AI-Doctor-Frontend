import React from "react";

// Import types
import type { InputProps } from "src/types/form";

/**
 * Render `radio` or `check` box in form.
 * @param param0
 * @param ref
 * @returns
 */
export default function SelectBox(
  props: InputProps<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { label, labelInputClassName } = props;
  return (
    <label
      className={`label-input-option${
        labelInputClassName ? " " + labelInputClassName : ""
      }`}
    >
      <input ref={ref} {...props} />
      {label && typeof label === "function" && label()}
      {label && typeof (label === "string" || React.isValidElement(label)) && (
        <span className="ms-1">{label as JSX.Element | string}</span>
      )}
    </label>
  );
}
