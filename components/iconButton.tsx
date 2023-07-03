"use client";

import React, { ComponentType, HTMLAttributes } from "react";

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  iconClassName?: string;
  tooltipText: string;
  icon: ComponentType<{ className?: string }>;
}

export default function IconButton(props: IconButtonProps) {
  const { iconClassName, tooltipText, icon, ...buttonProps } = props;

  const Icon = icon;

  return (
    <div className="tooltip" data-tip={tooltipText}>
      <button {...buttonProps}>
        <Icon className={"icon " + iconClassName} />
      </button>
    </div>
  );
}
