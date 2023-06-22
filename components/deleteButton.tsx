"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import IconButton from "./iconButton";
import { useDeferredTimeoutFn } from "@/lib/hooks";

interface DeleteButtonProps {
  tooltipText: string;
  className?: string;
  onDelete: () => any;
}

export default function DeleteButton(props: DeleteButtonProps) {
  const [confirm, setConfirm] = useState(false);
  const [, cancelConfirm, resetConfirm] = useDeferredTimeoutFn(() => {
    setConfirm(false);
  }, 500);

  const handleDelete = () => {
    if (confirm) {
      props.onDelete();
    } else {
      setConfirm(true);
    }
  };

  return (
    <IconButton
      onClick={handleDelete}
      onMouseEnter={cancelConfirm}
      onMouseLeave={resetConfirm}
      tooltipText={confirm ? "Are you sure?" : props.tooltipText}
      className={props.className}
      icon={XCircleIcon}
    />
  );
}
