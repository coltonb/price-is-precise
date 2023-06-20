"use client";

import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useCopyToClipboard, useTimeoutFn } from "react-use";

interface CopyToClipboardButtonProps {
  className?: string;
  tooltipText?: string;
  value: string;
}

export default function CopyToClipboardButton(
  props: CopyToClipboardButtonProps
) {
  const [copied, setCopied] = useState(false);
  const [, , resetCopied] = useTimeoutFn(() => {
    setCopied(false);
  }, 2000);
  const [, copyToClipboard] = useCopyToClipboard();

  const handleClick = () => {
    resetCopied();
    setCopied(true);
    copyToClipboard(props.value);
  };

  return (
    <div
      className="tooltip"
      data-tip={copied ? "Copied!" : props.tooltipText ?? "Copy to Clipboard"}
    >
      <button className={props.className ?? ""} onClick={handleClick}>
        <ClipboardDocumentIcon className="inline w-5" />
      </button>
    </div>
  );
}
