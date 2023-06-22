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
import { useRef, useState } from "react";
import { ActiveQuestionId } from "@/lib/store";
import ClientApi from "@/lib/clientApi";
import { useDebounce } from "react-use";
import { useDeferredTimeoutFn } from "@/lib/hooks";
import QuestionRow from "./questionRow";

interface QuestionsProps {
  questions: PriceQuestion[];
  activeQuestionId: ActiveQuestionId;
}

export default function Questions(props: QuestionsProps) {
  const [questions, setQuestions] = useState(props.questions);
  const [activeQuestionId, setActiveQuestionId] = useState<ActiveQuestionId>(
    props.activeQuestionId
  );
  const [debouncedActiveQuestionId, setDebouncedActiveQuestionId] =
    useState<ActiveQuestionId>(props.activeQuestionId);
  const [, , persistQuestionRanks] = useDeferredTimeoutFn(() => {
    ClientApi.setQuestionRanks(questions.map((question) => question.id));
  }, 2000);

  useDebounce(
    () => {
      if (activeQuestionId == debouncedActiveQuestionId) {
        return;
      }

      setDebouncedActiveQuestionId(activeQuestionId);
      ClientApi.setActiveQuestionId(activeQuestionId);
    },
    500,
    [activeQuestionId]
  );

  const handleNextQuestion = () => {
    const activeQuestionIndex = questions.findIndex(
      (question) => question.id === activeQuestionId
    );

    if (activeQuestionIndex >= questions.length - 1) {
      setActiveQuestionId(null);
    } else {
      setActiveQuestionId(questions[activeQuestionIndex + 1].id);
    }
  };

  const handleDeselectQuestion = () => {
    setActiveQuestionId(null);
  };

  const handleSelectQuestion = (question: PriceQuestion) => {
    setActiveQuestionId(question.id);
  };

  const handleDeleteQuestion = (questionToDelete: PriceQuestion) => {
    setQuestions(
      questions.filter((question) => question.id !== questionToDelete.id)
    );
  };

  const moveItem = (array: any[], from: number, to: number) => {
    array.splice(to, 0, array.splice(from, 1)[0]);
  };

  const moveQuestion = (
    questions: PriceQuestion[],
    from: number,
    to: number
  ) => {
    moveItem(questions, from, to);
    setQuestions([...questions]);
    persistQuestionRanks();
  };

  const handleMoveUp = (index: number) => {
    return () => {
      moveQuestion(questions, index, index - 1);
    };
  };

  const handleMoveDown = (index: number) => {
    return () => {
      moveQuestion(questions, index, index + 1);
    };
  };

  const handleSaveQuestion = (question: PriceQuestion) => {
    console.log(question);
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
        <table className="table table-fixed table-zebra">
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Price</th>
              <th>Points</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <QuestionRow
                key={question.id}
                question={question}
                active={question.id === activeQuestionId}
                moveUpDisabled={index === 0}
                moveDownDisabled={index === questions.length - 1}
                onDeselect={handleDeselectQuestion}
                onSelect={handleSelectQuestion}
                onMoveUp={handleMoveUp(index)}
                onMoveDown={handleMoveDown(index)}
                onDelete={handleDeleteQuestion}
                onSave={handleSaveQuestion}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
