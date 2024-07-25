import React from "react";

// Import objects
import { Form } from "src/objects/Form";

// Import components
import Input from "src/components/input";
import Select from "src/components/select";

// Import types
import { FormDataProps } from "./FormLayoutData.props";
import {
  GroupInputsProps,
  GroupChipInputsProps,
  GroupSelectProps,
} from "src/types/form";

/**
 * Render a group of input.
 * @param param0
 * @returns
 */
function FormGroupInput({ group }: { group: GroupInputsProps }) {
  return (
    <div className="flex mb-4">
      {group.inputs.map((input) => (
        <Input key={input.elementAttributes?.name} {...input} />
      ))}
    </div>
  );
}

/**
 * Render a group of chip
 * @param param0
 * @returns
 */
function FormGroupChipInput({ group }: { group: GroupChipInputsProps }) {
  return (
    <div className="mb-4">
      <p className="font-bold mb-1">{group.groupChipLabel}</p>
      <div className="chips-container">
        {group.chips.map((chip) => (
          <Input
            {...chip}
            labelInputClassName="me-1"
            key={chip.value}
            value={chip.value}
          />
        ))}
      </div>
    </div>
  );
}

function FormGroupSelect({ group }: { group: GroupSelectProps }) {
  const selects = group.selects;
  return (
    <div className="selects-container justify-between mb-4">
      {selects.map((select) => {
        const options = select.options;
        const selectContainerClassName = select.containerClassName
          ? "select-container " + select.containerClassName
          : "select-container";

        return (
          <div
            className={selectContainerClassName}
            key={select.elementAttributes?.name}
          >
            <Select {...select} options={options} />
          </div>
        );
      })}
    </div>
  );
}

/**
 * Render a form element from an object
 * @param props
 * @returns
 */
export default function FormLayoutData(props: FormDataProps) {
  const formPromptData = React.useMemo(() => props.data, []);
  const formPromptKeys = React.useMemo(
    () => Object.keys(formPromptData),
    [formPromptData]
  );

  const formPromptRef = React.useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formPromptRef}
      id="prompt-form"
      onSubmit={function (e) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const keys = Object.keys(form.elements).filter((key) => {
          const isString = Number.isNaN(parseInt(key));
          return isString;
        });
        const formData: { [K: string]: any } = {};

        for (const key of keys) {
          const formEle: HTMLInputElement | RadioNodeList | HTMLSelectElement =
            form[key];
          const data = Form.getValuesOfFormElement(formEle);
          const promptKey = data.elementName;
          if (promptKey) formData[promptKey] = data.values;
        }

        props.handleOnSubmit(formData);
      }}
      className={"formprompt" + (props.className ? " " + props.className : "")}
    >
      <div className="formprompt-content">
        {Form.renderForm(
          formPromptData,
          function (input) {
            return <Input key={input.elementAttributes.name} {...input} />;
          },
          function (group) {
            return <FormGroupInput key={group.baseName} group={group} />;
          },
          function (group) {
            return <FormGroupChipInput key={group.baseName} group={group} />;
          },
          function (select) {
            return <Select key={select.elementAttributes.name} {...select} />;
          },
          function (group) {
            return <FormGroupSelect key={group.baseName} group={group} />;
          },
          formPromptKeys
        )}
      </div>
      {props.actionElements && (
        <div className="flex justify-end w-full">{props.actionElements}</div>
      )}
    </form>
  );
}
