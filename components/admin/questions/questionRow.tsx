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
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { PriceQuestion } from "@prisma/client";
import { useMemo, useState } from "react";
import { z } from "zod";
import CurrencyInput from "react-currency-input-field";

interface QuestionRowProps {
  question: PriceQuestion;
  active: boolean;
  moveUpDisabled: boolean;
  moveDownDisabled: boolean;
  onDeselect: (question: PriceQuestion) => any;
  onSelect: (question: PriceQuestion) => any;
  onMoveUp: () => any;
  onMoveDown: () => any;
  onDelete: (question: PriceQuestion) => any;
  onSave: (question: PriceQuestion) => any;
}

export default function QuestionRow(props: QuestionRowProps) {
  const [question, setQuestion] = useState(props.question);
  const [editMode, setEditMode] = useState(false);
  const [price, setPrice] = useState(question.price.toFixed(2));
  const [name, setName] = useState(question.name);

  const enableEditMode = () => {
    setEditMode(true);
  };

  const saveEdits = () => {
    setEditMode(false);

    question.name = name;
    question.price = z.coerce.number().parse(price);

    props.onSave(question);
  };

  const cancelEdits = () => {
    setEditMode(false);
    setPrice(question.price.toFixed(2));
  };

  const handlePriceChange = (value?: string) => {
    setPrice(value ?? "0");
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  //   const displayPrice = useMemo(() => "$" + price.toFixed(2), [price]);

  return (
    <tr key={question.id}>
      <td className="flex gap-x-2">
        {props.active ? (
          <button onClick={() => props.onDeselect(question)}>
            <CheckCircleIcon className="icon fill-accent" />
          </button>
        ) : (
          <button onClick={() => props.onSelect(question)}>
            <PauseCircleIcon className="icon" />
          </button>
        )}
        <button
          className={props.moveUpDisabled ? "invisible" : ""}
          onClick={props.onMoveUp}
        >
          <ArrowUpIcon className="icon" />
        </button>
        <button
          className={props.moveDownDisabled ? "invisible" : ""}
          onClick={props.onMoveDown}
        >
          <ArrowDownIcon className="icon" />
        </button>
      </td>
      <td>
        {editMode ? (
          <input
            className="bg-base-300 rounded focus:outline-none mx-[-1ch] px-[1ch]"
            value={name}
            onChange={handleNameChange}
          />
        ) : (
          question.name
        )}
      </td>
      <td>
        {editMode ? (
          <CurrencyInput
            className="bg-base-300 rounded focus:outline-none mx-[-1ch] px-[1ch]"
            style={{ width: `${price.length + 3}ch` }}
            disableGroupSeparators
            allowNegativeValue={false}
            decimalScale={2}
            prefix="$"
            value={price}
            onValueChange={handlePriceChange}
          />
        ) : (
          "$" + question.price.toFixed(2)
        )}
      </td>
      <td>{question.points.join(", ")}</td>
      <td className="flex gap-x-2">
        {editMode ? (
          <>
            <IconButton
              onClick={saveEdits}
              tooltipText="Save Question"
              icon={CheckIcon}
            />
            <IconButton
              onClick={cancelEdits}
              tooltipText="Cancel"
              icon={XMarkIcon}
            />
          </>
        ) : (
          <>
            <IconButton
              onClick={enableEditMode}
              tooltipText="Edit Question"
              icon={PencilIcon}
            />
            <DeleteButton
              onDelete={() => props.onDelete(question)}
              tooltipText="Delete Question"
            />
          </>
        )}
      </td>
    </tr>
  );
}
