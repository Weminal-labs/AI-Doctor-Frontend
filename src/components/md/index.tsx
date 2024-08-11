import React from "react";
import ReactMarkdown from "react-markdown";

// Import local components
import { getHeaderComponent } from "./components/Headers";
import { getListComponent } from "./components/Lists";
import Break from "./components/Break";
import Paragraph from "./components/Paragraph";
import Pre from "./components/Pre";
import CodeBlock from "./components/CodeBlock";

// Import types
import type { MDContentProps } from "./type";
import type { Components } from "react-markdown";

const _components: Components = {
  h1: getHeaderComponent("h1"),
  h2: getHeaderComponent("h2"),
  h3: getHeaderComponent("h3"),
  h4: getHeaderComponent("h4"),
  h5: getHeaderComponent("h5"),
  h6: getHeaderComponent("h6"),
  ul: getListComponent("ul"),
  ol: getListComponent("ol"),
  br: Break,
  p: Paragraph as any,
  pre: Pre as any,
  code: CodeBlock as any,
};

export default function MDContent(props: MDContentProps) {
  // const [content, setContent] = React.useState("");

  // Detect change of content
  React.useEffect(function () {}, [props.children]);

  if (typeof props.children !== "string") {
    return (
      <p className="text-red-700">
        Content of <span className="bg-outline rounded px-2 py-1">Remark</span>{" "}
        must be a string!
      </p>
    );
  }

  return (
    <ReactMarkdown components={_components}>{props.children}</ReactMarkdown>
  );
}
