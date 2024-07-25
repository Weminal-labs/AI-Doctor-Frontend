import React from "react";

// Import from utils
import { BooleanUtils } from "src/utils/boolean";

// Import types
import type { TextInputProps } from "src/types/form";

/**
 * Render all inputs that have text field.
 * @param props
 * @param ref
 * @returns
 */
export default function TextInput(
  props: TextInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const {
    label,
    labelInputClassName,
    containerClassName,
    elementAttributes,
    isLabelInset,
    left,
    right,
  } = props;
  const _containerClassName =
    "px-6 py-3 rounded-lg text-on-background outline outline-on-background-50 outline-1 focus-within:outline-first focus-within:outline-2";
  let Label;

  if (typeof label === "function") Label = label();
  if (typeof label === "string")
    Label = (
      <label
        className={labelInputClassName + " w-full inline-block"}
        htmlFor={elementAttributes?.id}
      >
        {label}
      </label>
    );

  // If `isLabelInset` is true, that means the input will have another layout
  if (BooleanUtils.isTruthy(isLabelInset) && BooleanUtils.isTruthy(label)) {
    // If `left` or `right` is set, that mease the input will have another layout
    // I write it here because I want to optimize the invocation
    if (BooleanUtils.isTruthy(left) || BooleanUtils.isTruthy(right)) {
      return (
        <div className={_containerClassName + " " + (containerClassName || "")}>
          {Label}
          <div className="flex">
            {left && typeof left === "function" ? left() : left}
            <input
              ref={ref}
              {...elementAttributes}
              className={
                "bg-transparent focus:outline-none w-full " +
                ((elementAttributes && elementAttributes.className) || "")
              }
            />
            {right && typeof right === "function" ? right() : right}
          </div>
        </div>
      );
    }

    return (
      <div className={_containerClassName + " " + (containerClassName || "")}>
        {Label}
        <input
          ref={ref}
          {...elementAttributes}
          className={
            "bg-transparent focus:outline-none w-full " +
            ((elementAttributes && elementAttributes.className) || "")
          }
        />
      </div>
    );
  }

  // Render normal (default) layout of input
  return (
    <div className={containerClassName}>
      {Label}
      <div className={_containerClassName + " flex mt-2"}>
        {left && typeof left === "function" ? left() : left}
        <input
          ref={ref}
          {...elementAttributes}
          className={
            "bg-transparent focus:outline-none w-full " +
            ((elementAttributes && elementAttributes.className) || "")
          }
        />
        {right && typeof right === "function" ? right() : right}
      </div>
    </div>
  );
}
