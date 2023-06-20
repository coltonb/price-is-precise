"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTimeoutFn } from "react-use";

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
    <div
      className="tooltip"
      data-tip={confirm ? "Are you sure?" : props.tooltipText}
    >
      <button
        className={props.className ?? ""}
        onClick={handleDelete}
        onMouseEnter={cancelConfirm}
        onMouseLeave={resetConfirm}
      >
        <XCircleIcon className="inline w-5" />
      </button>
    </div>
  );
}
