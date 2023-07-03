import { useRef, useState } from "react";
import QuestionRowPointInput from "./questionRowPointInput";
import { useUpdateEffect } from "react-use";

interface QuestionRowPointEditorProps {
  points: number[];
  onChange: (points: number[]) => unknown;
}

export default function QuestionRowPointEditor(
  props: QuestionRowPointEditorProps
) {
  const [points, setPoints] = useState(
    props.points.map((point) => ({ id: Math.random(), value: point }))
  );
  const elements = useRef<(HTMLInputElement | null)[]>([]);

  useUpdateEffect(() => {
    props.onChange(points.map((point) => point.value ?? 0));
  }, [points]);

  const moveCursorLeft = (currentIndex: number) => {
    elements.current[Math.max(currentIndex - 1, 0)]?.focus();
  };

  const moveCursorRight = (currentIndex: number) => {
    elements.current[currentIndex + 1]?.focus();
  };

  const handleChange = (id: number, index: number) => {
    return async (point: number | null) => {
      const newPoints = [...points];
      newPoints[index] = { id: id, value: point ?? 0 };
      setPoints(newPoints);
    };
  };

  const handleEnter = (index: number) => {
    return async () => {
      if (index == points.length - 1) {
        const newPoints = [...points];
        newPoints.splice(index + 1, 0, { id: Math.random(), value: 0 });
        await setPoints(newPoints);
      }
      moveCursorRight(index);
    };
  };

  const handleDelete = (index: number) => {
    return async () => {
      if (points.length <= 1) {
        return;
      }

      const newPoints = [...points];
      newPoints.splice(index, 1);
      await setPoints(newPoints);
      moveCursorLeft(index);
    };
  };

  return points.map((point, index) => {
    return (
      <QuestionRowPointInput
        key={point.id}
        point={point.value}
        inputRef={(element) => (elements.current[index] = element)}
        onChange={handleChange(point.id, index)}
        onEnter={handleEnter(index)}
        onDelete={handleDelete(index)}
        onMoveLeft={() => moveCursorLeft(index)}
        onMoveRight={() => moveCursorRight(index)}
      />
    );
  });
}
