import React from "react";

// Import from utils
import { BooleanUtils } from "src/utils/boolean";

export type ListType = "ul" | "ol";

const _listClassNames: { [key in ListType]: string } = {
  ul: "list-[initial] list-inside ps-3 [&>li]:mb-2 [&>li>p]:inline mb-2",
  ol: "list-decimal list-inside ps-3  [&>li]:mb-2 [&>li>p]:inline mb-2",
};

/**
 * Receive type of HTML list and return the coressponding element. Used to
 * setup components of Markdown
 * @param listType
 * @returns
 */
export function getListComponent(listType: ListType): any {
  if (BooleanUtils.isEmpty(_listClassNames[listType])) {
    throw new Error(`The list \`${listType}\` isn't supported`);
  }

  return function List({ children }: { children: React.ReactNode | string }) {
    return React.createElement(listType, {
      children,
      className: _listClassNames[listType],
    });
  };
}
