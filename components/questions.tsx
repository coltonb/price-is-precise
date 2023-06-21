"use client";

import DeleteButton from "@/components/deleteButton";
import IconButton from "@/components/iconButton";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PencilIcon,
  PauseCircleIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { PriceQuestion } from "@prisma/client";
import { useState } from "react";

interface QuestionsProps {
  questions: PriceQuestion[];
}

export default function Questions(props: QuestionsProps) {
  const [questions, setQuestions] = useState(props.questions);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<
    number | undefined
  >(undefined);

  const handleNextQuestion = () => {
    if ((activeQuestionIndex ?? 0) >= questions.length - 1) {
      setActiveQuestionIndex(undefined);
    } else {
      setActiveQuestionIndex((activeQuestionIndex ?? -1) + 1);
    }
  };

  const handleDeselectQuestion = () => {
    setActiveQuestionIndex(undefined);
  };

  const handleSelectQuestion = (index: number) => {
    return () => {
      setActiveQuestionIndex(index);
    };
  };

  const handleDeleteQuestion = (questionToDelete: PriceQuestion) => {
    return () => {
      setQuestions(
        questions.filter((question) => question.id !== questionToDelete.id)
      );
    };
  };

  const moveItem = (array: any[], from: number, to: number) => {
    array.splice(to, 0, array.splice(from, 1)[0]);
  };

  const handleMoveUp = (index: number) => {
    return () => {
      moveItem(questions, index, index - 1);
      setQuestions([...questions]);
    };
  };

  const handleMoveDown = (index: number) => {
    return () => {
      moveItem(questions, index, index + 1);
      setQuestions([...questions]);
    };
  };

  return (
    <div className="card bg-neutral-focus">
      <div className="card-body">
        <div className="flex card-title">
          <h1 className="flex-1">Price Questions</h1>
          <button onClick={handleNextQuestion} className="btn btn-sm">
            Next Question
          </button>
        </div>
        <table className="table table-zebra">
          <thead>
            <tr>
              <th className="w-px" />
              <th>Name</th>
              <th>Price</th>
              <th>Points</th>
              <th className="w-px" />
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={question.id}>
                <td className="flex gap-x-2">
                  {index === activeQuestionIndex ? (
                    <button onClick={handleDeselectQuestion}>
                      <CheckCircleIcon className="icon fill-accent" />
                    </button>
                  ) : (
                    <button onClick={handleSelectQuestion(index)}>
                      <PauseCircleIcon className="icon" />
                    </button>
                  )}
                  <button
                    className={index === 0 ? "invisible" : ""}
                    onClick={handleMoveUp(index)}
                  >
                    <ArrowUpIcon className="icon" />
                  </button>
                  <button
                    className={
                      index === questions.length - 1 ? "invisible" : ""
                    }
                    onClick={handleMoveDown(index)}
                  >
                    <ArrowDownIcon className="icon" />
                  </button>
                </td>
                <td>{question.name}</td>
                <td>{"$" + question.price.toFixed(2)}</td>
                <td>{question.points.join(", ")}</td>
                <td className="flex gap-x-2">
                  <IconButton tooltipText="Edit Question">
                    <PencilIcon className="icon" />
                  </IconButton>
                  <DeleteButton
                    onDelete={handleDeleteQuestion(question)}
                    tooltipText="Delete Question"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
