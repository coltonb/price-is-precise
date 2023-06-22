"use client";

import React, { ComponentType } from "react";

interface IconButton {
  className?: string;
  tooltipText: string;
  icon: ComponentType<{ className?: string }>;
  onClick: () => any;
  onMouseEnter?: () => any;
  onMouseLeave?: () => any;
}

export default function IconButton(props: IconButton) {
  const Icon = props.icon;

  return (
    <div className="tooltip" data-tip={props.tooltipText}>
      <button
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        className={props.className}
      >
        <Icon className="icon" />
      </button>
    </div>
  );
}
