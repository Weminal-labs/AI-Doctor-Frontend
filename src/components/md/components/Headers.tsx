import React from "react";

// Import from utils
import { BooleanUtils } from "src/utils/boolean";

export type TextHeaderType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const _headerClassNames: { [key in TextHeaderType]: string } = {
  h1: "font-bold text-4xl mb-5",
  h2: "font-bold text-3xl mb-4",
  h3: "font-bold text-2xl mb-3",
  h4: "font-bold text-xl mb-2",
  h5: "font-bold text-lg mb-1",
  h6: "font-bold text-sm",
};

/**
 * Receive type of HTML Header text and return the coressponding element. Used to
 * setup components of Markdown
 * @param textHeaderType
 * @returns
 */
export function getHeaderComponent(textHeaderType: TextHeaderType): any {
  if (BooleanUtils.isEmpty(_headerClassNames[textHeaderType])) {
    throw new Error(`The type \`${textHeaderType}\` isn't supported`);
  }

  return function Header({ children }: { children: React.ReactNode | string }) {
    return React.createElement(textHeaderType, {
      children,
      className: _headerClassNames[textHeaderType],
    });
  };
}
