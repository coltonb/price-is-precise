import { useState } from "react";
import { z } from "zod";

interface QuestionRowPointInputProps {
  point: number;
  onChange: (point: number | null) => any;
  onEnter: () => any;
  onDelete: () => any;
  inputRef?: (element: HTMLInputElement | null) => any;
  onMoveLeft: () => any;
  onMoveRight: () => any;
}

export default function QuestionRowPointInput(
  props: QuestionRowPointInputProps
) {
  const [point, setPoint] = useState<number | null>(props.point);

  const handleChange = (e: any) => {
    if (e.target.value === "") {
      setPoint(null);
      props.onChange(null);
      return;
    }

    let value: number;

    try {
      value = z.coerce.number().int().nonnegative().parse(e.target.value);
    } catch {
      return;
    }

    setPoint(value);
    props.onChange(value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      props.onEnter();
      return;
    }

    if (e.key === "Backspace" && point === null) {
      e.preventDefault();
      props.onDelete();
      return;
    }

    if (
      e.key === "ArrowRight" &&
      e.target.selectionEnd === String(point ?? "").length
    ) {
      e.preventDefault();
      props.onMoveRight();
      return;
    }

    if (e.key === "ArrowLeft" && e.target.selectionEnd === 0) {
      e.preventDefault();
      props.onMoveLeft();
      return;
    }
  };

  return (
    <input
      ref={(input) => (props.inputRef ? props.inputRef(input) : null)}
      className="btn-accent rounded mr-1 px-2 text-center"
      maxLength={3}
      size={String(point ?? "0").length}
      value={point ?? ""}
      onChange={handleChange}
      onBlur={() => setPoint(point ?? 0)}
      onKeyDown={handleKeyDown}
    />
  );
}
