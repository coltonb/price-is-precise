"use client";

import React from "react";

interface IconButton {
  tooltipText: string;
  children: React.ReactNode;
  onClick: () => any;
  onMouseEnter?: () => any;
  onMouseLeave?: () => any;
}

export default function IconButton(props: IconButton) {
  return (
    <div className="tooltip" data-tip={props.tooltipText}>
      <button
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        {props.children}
      </button>
    </div>
  );
}
