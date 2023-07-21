"use client";

import { useEffect, useState } from "react";
import { getPusherClient } from "@/lib/client/pusher";
import { CHANNEL, Events } from "@/lib/shared/notifications";
import * as ClientApi from "@/lib/client/client-api";
import { PriceQuestion } from "@prisma/client";
import CurrencyInput from "react-currency-input-field";
import GameState from "@/lib/shared/game-state";

interface GameProps {
  activeQuestionId: GameState["activeQuestionId"];
}

export default function Game(props: GameProps) {
  const [activeQuestionId, setActiveQuestionId] = useState<
    GameState["activeQuestionId"]
  >(props.activeQuestionId);
  const [question, setQuestion] = useState<PriceQuestion | null>(null);
  const [guess, setGuess] = useState<string | undefined>("0");

  const pusher = getPusherClient();
  const channel = pusher.subscribe(CHANNEL);

  channel.bind(Events.UPDATE, (data: GameState) => {
    setActiveQuestionId(data.activeQuestionId);
  });

  const loadQuestion = async (id: number) => {
    setQuestion(await ClientApi.getQuestion({ path: { id } }));
  };

  useEffect(() => {
    if (activeQuestionId) {
      loadQuestion(activeQuestionId);
    } else {
      setQuestion(null);
    }
  }, [activeQuestionId]);

  const handleGuessChange = (value: string | undefined) => {
    setGuess(value ?? "0");
  };

  return (
    <div className="m-5 flex flex-col gap-5">
      <div className="text-3xl grid gap-2 text-center">
        <h1>Guess the Price</h1>
        <h1 className="font-bold uppercase">{question?.name}</h1>
      </div>
      <div className="w-full flex place-items-center">
        <div className="card w-full bg-neutral-focus">
          <div className="card-body">
            <CurrencyInput
              id="guess"
              className="input"
              allowNegativeValue={false}
              decimalScale={2}
              prefix="$"
              value={guess}
              onValueChange={handleGuessChange}
            />
            <button className="btn btn-accent">Submit</button>
          </div>
        </div>
      </div>
      <div className="card bg-neutral-focus w-full">
        <div className="card-body">
          <table className="table table-zebra table-lg">
            <tbody>
              <tr>
                <td>Your Guess</td>
                <td>$10.99</td>
              </tr>
              <tr>
                <td>Your Team&apos;s Guess</td>
                <td>$1599.99</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
