"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { PriceQuestion } from "@prisma/client";
import { useState } from "react";
import * as ClientApi from "@/lib/client/client-api";
import { useDebounce } from "react-use";
import { useDeferredTimeoutFn } from "@/lib/client/hooks";
import QuestionRow, { NewQuestion } from "./questionRow";
import { deepCopy } from "@/lib/utils";
import GameState from "@/lib/shared/game-state";

interface QuestionsProps {
  questions: PriceQuestion[];
  activeQuestionId: GameState["activeQuestionId"];
}

export default function Questions(props: QuestionsProps) {
  const [questions, setQuestions] = useState(deepCopy(props.questions));
  const [activeQuestionId, setActiveQuestionId] = useState<
    GameState["activeQuestionId"]
  >(props.activeQuestionId);
  const [createMode, setCreateMode] = useState(false);
  const [debouncedActiveQuestionId, setDebouncedActiveQuestionId] = useState<
    GameState["activeQuestionId"]
  >(props.activeQuestionId);
  const [, , persistQuestionRanks] = useDeferredTimeoutFn(() => {
    ClientApi.setQuestionRanks({
      body: questions.map((question) => question.id),
    });
  }, 2000);

  useDebounce(
    () => {
      if (activeQuestionId == debouncedActiveQuestionId) {
        return;
      }

      setDebouncedActiveQuestionId(activeQuestionId);
      setActiveQuestionId(activeQuestionId);
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
    ClientApi.deleteQuestion({ path: { id: questionToDelete.id } });

    if (activeQuestionId === questionToDelete.id) {
      setActiveQuestionId(null);
    }
  };

  const moveItem = (array: unknown[], from: number, to: number) => {
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

  const handleSaveQuestion = async (question: PriceQuestion) => {
    const newQuestions = [...questions];
    const newQuestion = await ClientApi.updateQuestion({
      path: { id: question.id },
      body: question,
    });
    const questionIndex = newQuestions.findIndex(
      (question) => question.id === newQuestion.id
    );
    newQuestions.splice(questionIndex, 1, newQuestion);
    setQuestions(newQuestions);
  };

  const handleCreateQuestion = async (question: NewQuestion) => {
    const newQuestions = [...questions];

    const newQuestion = await ClientApi.createQuestion({ body: question });
    setCreateMode(false);
    newQuestions.push(newQuestion);
    setQuestions(newQuestions);
  };

  return (
    <div className="card bg-neutral-focus">
      <div className="card-body">
        <div className="flex card-title">
          <h1 className="flex-1">Questions</h1>
          <button onClick={handleNextQuestion} className="btn btn-sm">
            Next Question
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-fixed min-w-[32rem] table-zebra">
            <thead>
              <tr>
                <th className="w-[100px]" />
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
              {createMode ? (
                <QuestionRow
                  onCancelCreate={() => setCreateMode(false)}
                  onCreate={handleCreateQuestion}
                />
              ) : (
                <tr>
                  <td colSpan={5} className="p-0">
                    <button
                      className="btn hover:bg-transparent bg-transparent border-none w-full"
                      onClick={() => setCreateMode(true)}
                    >
                      <PlusIcon className="icon" /> Create New Question
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
