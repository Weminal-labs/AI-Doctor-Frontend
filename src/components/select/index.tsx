import React from "react";

// Import from hooks
import { useStateManager } from "src/hooks/useStateManager";

// Import from local
// Import local state
import { SelectStateManager } from "./state";

// Import styles
import "./style.css";

// Import types
import { SelectProps, SelectOptionProps } from "src/types/form";

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function (
  props: SelectProps,
  ref
) {
  const { label, labelInputClassName, containerClassName, options } = props;

  const [state, stateFns] = useStateManager(
    SelectStateManager.getInitialState(),
    SelectStateManager.getStateFns
  );
  let Label;

  if (typeof label === "function") Label = label();
  else
    Label = (
      <label
        className={"px-6 pt-3 " + (labelInputClassName || "")}
        htmlFor={props.elementAttributes?.id}
      >
        {label}
      </label>
    );

  return (
    <div
      className={
        "flex flex-col relative w-full text-on-background rounded-lg outline outline-on-background-50 outline-1 focus-within:outline-first focus-within:outline-2" +
        (containerClassName ? ` ${containerClassName}` : "")
      }
    >
      {Label}
      <select
        hidden
        value={state.selectedValue.value}
        onChange={() => {}}
        ref={ref}
        {...props.elementAttributes}
        className="select"
      >
        {(options as Array<SelectOptionProps>).map((option) => (
          <option hidden key={option.value} value={option.value} />
        ))}
      </select>
      <button
        type="button"
        className="flex justify-between bg-transparent cursor-pointer px-6 py-3 text-on-background-50 focus:outline-none"
        onClick={() => stateFns.toggleIsOpen()}
      >
        {state.selectedValue.label}{" "}
        <span className="material-symbols-outlined">
          {state.isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
        </span>
      </button>
      <div
        className={
          "w-full outline outline-2 outline-first rounded-lg absolute z-2 top-[calc(100%+1rem)] bg-background " +
          (state.isOpen ? "block" : "hidden")
        }
      >
        {options.map((option) => (
          <button
            type="button"
            key={option.value}
            onClick={() => {
              stateFns.toggleIsOpen();
              stateFns.setSelectedValue(option);
            }}
            className="w-full flex justify-between bg-transparent cursor-pointer px-6 py-3 text-on-first hover:bg-first"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
});

export default Select;
