import DeleteButton from "@/components/deleteButton";
import IconButton from "@/components/iconButton";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PauseCircleIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { PriceQuestion } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import CurrencyInput from "react-currency-input-field";
import QuestionRowPointEditor from "./questionRowPointEditor";
import { deepCopy } from "@/lib/utils";

export type NewQuestion = Pick<PriceQuestion, "price" | "name" | "points">;

interface QuestionRowProps {
  question?: PriceQuestion;
  active?: boolean;
  moveUpDisabled?: boolean;
  moveDownDisabled?: boolean;
  onDeselect?: (question: PriceQuestion) => any;
  onSelect?: (question: PriceQuestion) => any;
  onMoveUp?: () => any;
  onMoveDown?: () => any;
  onDelete?: (question: PriceQuestion) => any;
  onSave?: (question: PriceQuestion) => any;
  onCreate?: (question: NewQuestion) => any;
  onCancelCreate?: () => any;
}

export default function QuestionRow(props: QuestionRowProps) {
  const question = useMemo<PriceQuestion | NewQuestion>(
    () => deepCopy(props.question ?? { price: 0, name: "", points: [3, 2, 1] }),
    [props.question]
  );
  const isNewQuestion = useMemo(
    () => props.question === undefined,
    [props.question]
  );

  const [editMode, setEditMode] = useState(isNewQuestion);
  const [price, setPrice] = useState(question.price.toFixed(2));
  const [name, setName] = useState(question.name);
  const [points, setPoints] = useState([...question.points]);

  useEffect(() => {
    setName(question.name);
    setPrice(question.price.toFixed(2));
    setPoints([...question.points]);
  }, [question]);

  const enableEditMode = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    question.name = name;
    question.price = z.coerce.number().parse(price);
    question.points = points;
    setEditMode(false);

    if (isNewQuestion) {
      props.onCreate ? props.onCreate(question) : null;
      return;
    }

    props.onSave ? props.onSave(question as PriceQuestion) : null;
  };

  const handleCancel = () => {
    setEditMode(false);

    if (isNewQuestion) {
      props.onCancelCreate ? props.onCancelCreate() : null;
      return;
    }

    setName(question.name);
    setPrice(question.price.toFixed(2));
    setPoints([...question.points]);
  };

  const handlePriceChange = (value?: string) => {
    setPrice(value ?? "0");
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value ?? "");
  };

  const handlePointChange = (points: number[]) => {
    setPoints(points);
  };

  const handleDelete = (question: PriceQuestion) => {
    return () => {
      props.onDelete ? props.onDelete(question) : null;
    };
  };

  const emitDeselect = () => {
    props.onDeselect ? props.onDeselect(question as PriceQuestion) : null;
  };

  const emitSelect = () => {
    props.onSelect ? props.onSelect(question as PriceQuestion) : null;
  };

  const emitMoveUp = () => {
    props.onMoveUp ? props.onMoveUp() : null;
  };

  const emitMoveDown = () => {
    props.onMoveDown ? props.onMoveDown() : null;
  };

  return (
    <tr>
      <td className="flex gap-x-2">
        {isNewQuestion ? null : props.active ? (
          <IconButton
            tooltipText="Deactivate Question"
            onClick={emitDeselect}
            icon={CheckCircleIcon}
            iconClassName="fill-accent"
          />
        ) : (
          <IconButton
            tooltipText="Activate Question"
            onClick={emitSelect}
            icon={PauseCircleIcon}
          />
        )}
        <IconButton
          className={props.moveUpDisabled || isNewQuestion ? "invisible" : ""}
          tooltipText="Move Question Up"
          onClick={emitMoveUp}
          icon={ArrowUpIcon}
        />
        <IconButton
          className={props.moveDownDisabled || isNewQuestion ? "invisible" : ""}
          tooltipText="Move Question Down"
          onClick={emitMoveDown}
          icon={ArrowDownIcon}
        />
      </td>
      <td>
        {editMode ? (
          <input
            className="bg-base-300 rounded focus:outline-none m-[-1ch] p-[1ch]"
            value={name}
            placeholder="Name"
            onChange={handleNameChange}
          />
        ) : (
          name
        )}
      </td>
      <td>
        {editMode ? (
          <CurrencyInput
            className="bg-base-300 rounded focus:outline-none m-[-1ch] p-[1ch]"
            style={{ width: `${price.length + 3}ch` }}
            disableGroupSeparators
            allowNegativeValue={false}
            decimalScale={2}
            prefix="$"
            value={price}
            onValueChange={handlePriceChange}
          />
        ) : (
          "$" + price
        )}
      </td>
      <td>
        {editMode ? (
          <QuestionRowPointEditor
            points={points}
            onChange={handlePointChange}
          />
        ) : (
          points.join(", ")
        )}
      </td>
      <td className="flex gap-x-2">
        {editMode ? (
          <>
            <IconButton
              onClick={handleSave}
              tooltipText="Save Question"
              icon={CheckIcon}
            />
            <IconButton
              onClick={handleCancel}
              tooltipText="Cancel"
              icon={XMarkIcon}
            />
          </>
        ) : isNewQuestion ? null : (
          <>
            <IconButton
              onClick={enableEditMode}
              tooltipText="Edit Question"
              icon={PencilIcon}
            />
            <DeleteButton
              onDelete={handleDelete(question as PriceQuestion)}
              tooltipText="Delete Question"
            />
          </>
        )}
      </td>
    </tr>
  );
}
