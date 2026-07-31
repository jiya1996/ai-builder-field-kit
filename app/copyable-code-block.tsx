"use client";

import {useRef, useState, type ReactNode} from "react";
import {copyText} from "./copy-text";

type CopyableCodeBlockProps = {
  children?: ReactNode;
};

export function CopyableCodeBlock({children}: CopyableCodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    const text = preRef.current?.innerText ?? "";
    if (!text) return;

    setCopied(await copyText(text));
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="copyable-code-block">
      <button
        type="button"
        className="code-copy-button"
        onClick={copyCode}
        aria-label="复制这段提示词或代码"
      >
        {copied ? "已复制 ✓" : "⧉ 一键复制"}
      </button>
      <pre ref={preRef}>{children}</pre>
    </div>
  );
}
