"use client";

import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useCopyToClipboard } from "react-use";
import IconButton from "./iconButton";
import { useDeferredTimeoutFn } from "@/lib/hooks";

interface CopyToClipboardButtonProps {
  className?: string;
  tooltipText?: string;
  value: string;
}

export default function CopyToClipboardButton(
  props: CopyToClipboardButtonProps
) {
  const [copied, setCopied] = useState(false);
  const [, copyToClipboard] = useCopyToClipboard();
  const [, , resetCopied] = useDeferredTimeoutFn(() => {
    setCopied(false);
  }, 2000);

  const handleClick = () => {
    setCopied(true);
    resetCopied();
    copyToClipboard(props.value);
  };

  return (
    <IconButton
      className={props.className}
      onClick={handleClick}
      tooltipText={
        copied ? "Copied!" : props.tooltipText ?? "Copy to Clipboard"
      }
      icon={ClipboardDocumentIcon}
    />
  );
}
