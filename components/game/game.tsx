"use client";

import { useEffect, useState } from "react";
import { ActiveQuestionId } from "@/lib/shared/game-state";
import { getPusherClient } from "@/lib/client/pusher";
import { CHANNEL, Events } from "@/lib/shared/notifications";
import ClientApi from "@/lib/client/client-api";
import { PriceQuestion } from "@prisma/client";
import CurrencyInput from "react-currency-input-field";

export default function Game() {
  const [activeQuestionId, setActiveQuestionId] =
    useState<ActiveQuestionId>(null);
  const [question, setQuestion] = useState<PriceQuestion | null>(null);

  const pusher = getPusherClient();
  const channel = pusher.subscribe(CHANNEL);

  channel.bind(Events.ACTIVE_QUESTION_ID, (data: ActiveQuestionId) => {
    setActiveQuestionId(data);
  });

  const loadQuestion = async (questionId: number) => {
    setQuestion(await ClientApi.getQuestion(questionId));
  };

  useEffect(() => {
    if (activeQuestionId) {
      loadQuestion(activeQuestionId);
    }
  }, [activeQuestionId]);

  return (
    <div className="grid h-screen place-items-center">
      <div className="card bg-neutral-focus">
        <div className="card-body">
          <h1 className="text-xl">
            Guess the price of <b>{question?.name}</b>
          </h1>
          <CurrencyInput
            className="input"
            allowNegativeValue={false}
            decimalScale={2}
            prefix="$"
          />
          <button className="btn btn-accent">Submit</button>
        </div>
      </div>
    </div>
  );
}
