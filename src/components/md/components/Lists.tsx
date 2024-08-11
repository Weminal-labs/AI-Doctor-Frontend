import React from "react";

// Import from utils
import { BooleanUtils } from "src/utils/boolean";

export type ListType = "ul" | "ol";

const _listClassNames: { [key in ListType]: string } = {
  ul: "list-[initial] list-inside ps-3",
  ol: "list-[initial] list-inside ps-3",
};

/**
 * Receive type of HTML list and return the coressponding element. Used to
 * setup components of Markdown
 * @param textHeaderType
 * @returns
 */
export function getListComponent(textHeaderType: ListType): any {
  if (BooleanUtils.isEmpty(_listClassNames[textHeaderType])) {
    throw new Error(`The list \`${textHeaderType}\` isn't supported`);
  }

  return function List({ children }: { children: React.ReactNode | string }) {
    return React.createElement(textHeaderType, {
      children,
      className: _listClassNames[textHeaderType],
    });
  };
}
