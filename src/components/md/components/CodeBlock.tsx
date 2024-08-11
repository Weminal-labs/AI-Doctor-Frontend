import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Import from hooks
import { useStateManager } from "src/hooks/useStateManager";

// Import from utils
import { OtherUtils } from "src/utils/other";

// Import from local
import CopyCodeButton from "./CopyCodeButton";
import CodeExecBox from "./CodeExecBox";

// Imort local state manager
import { CodeBlockStateManager } from "../states/CodeBlock";

type CodeResultProps = {
  result: string | null;
};

function Result(props: CodeResultProps) {
  return (
    <div className="mt-6">
      <p>Result: </p>
      <SyntaxHighlighter
        showLineNumbers
        language={"json"}
        style={atomDark}
        customStyle={{
          borderRadius: "8px",
          background: "rgb(var(--color-background))",
          marginTop: "1rem",
          marginBottom: "1rem",
          borderColor: "rgb(var(--color-on-background-10) / 0.5)",
          borderWidth: "2px",
        }}
        children={props.result || ""}
      />
    </div>
  );
}

/**
 * Receive type of HTML code and return the coressponding element. Used to
 * setup components of Markdown
 * @param param0
 * @returns
 */
export default function CodeBlock({
  children,
  className,
}: {
  children: string | Array<string>;
  className: string;
}) {
  const [state, stateFns] = useStateManager(
    CodeBlockStateManager.getInitialState(),
    CodeBlockStateManager.getStateFns
  );

  const match = /language-(\w+)/.exec(className || "");
  const lang = match![1];
  return (
    <div className="relative w-full">
      <div className="flex flex-row items-center justify-between h-10 rounded-t-lg bg-on-background-10/50 w-full absolute top-0 px-6 ">
        <div className="flex flex-row items-center gap-x-2">
          {["#27C93F", "#FF5F56", "#FFBD2E"].map(function (color: string) {
            return (
              <div
                className={"h-3 w-3 rounded-full"}
                style={{ backgroundColor: `${color}` }}
              />
            );
          })}
        </div>

        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center ms-4 cursor-pointer">
            <span className="material-symbols-outlined">terminal</span>
            <div className="text-sm ms-2">{lang}</div>
          </div>
          <CopyCodeButton text={children as string} />
        </div>
      </div>

      <SyntaxHighlighter
        showLineNumbers
        language={lang}
        style={atomDark}
        customStyle={{
          borderRadius: "8px",
          background: "rgb(var(--color-background))",
          marginTop: "1rem",
          marginBottom: "1rem",
          padding: "1.5rem",
          paddingTop: "4rem",
          // border-on-background-10/50
          borderColor: "rgb(var(--color-on-background-10) / 0.5)",
          borderWidth: "2px",
        }}
        children={children}
      />

      <CodeExecBox
        isExecuting={state.isExecuting}
        hasResult={state.hasResult}
        runCode={() => {
          stateFns.setIsExecuting(true);
          OtherUtils.wait(2000).then(() => {
            stateFns.setIsExecuting(false);
            stateFns.setHasResult(true);
            stateFns.setResult(
              `{\n  "coin_type": "bitcoin",\n  "amount": "0.00002",\n  "__typename": "coin"\n  "timestamp": "${Date.now()}"\n}`
            );
          });
        }}
      />

      {state.hasResult && state.result && <Result result={state.result} />}
    </div>
  );
}
