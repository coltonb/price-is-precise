"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTimeoutFn } from "react-use";
import IconButton from "./iconButton";

interface DeleteButtonProps {
  className?: string;
  tooltipText: string;
  onDelete: () => any;
}

export default function DeleteButton(props: DeleteButtonProps) {
  const [confirm, setConfirm] = useState(false);
  const [, cancelConfirm, resetConfirm] = useTimeoutFn(() => {
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
    >
      <XCircleIcon className={"icon " + props.className ?? ""} />
    </IconButton>
  );
}
