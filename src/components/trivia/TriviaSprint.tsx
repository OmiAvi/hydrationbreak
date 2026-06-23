"use client";

import { TriviaQuestionCard } from "@/components/trivia/TriviaQuestionCard";
import { TriviaResultDialog } from "@/components/trivia/TriviaResultDialog";
import { Country } from "@/lib/countries";
import { useMemo, useState } from "react";

type TriviaSprintProps = {
  country: Country;
  onFinish?: (score: number, total: number) => void;
};

export function TriviaSprint({ country, onFinish }: TriviaSprintProps) {
  const questions = useMemo(() => country.trivia.slice(0, 3), [country]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const current = questions[index];
  const finished = index >= questions.length;

  const score = useMemo(
    () => questions.filter((question) => answers[question.id] === question.answer).length,
    [answers, questions],
  );

  if (!current && finished) {
    return <TriviaResultDialog open score={score} total={questions.length} />;
  }

  if (!current) {
    return null;
  }

  const submitAnswer = () => {
    if (index === questions.length - 1) {
      onFinish?.(score, questions.length);
    }
    setIndex((value) => value + 1);
  };

  return (
    <div className="space-y-3">
      <TriviaQuestionCard
        question={current}
        selectedChoice={answers[current.id]}
        onSelect={(choice) => setAnswers((value) => ({ ...value, [current.id]: choice }))}
      />
      <button
        type="button"
        className="rounded-xl bg-[var(--pitch)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        disabled={!answers[current.id]}
        onClick={submitAnswer}
      >
        {index === questions.length - 1 ? "Finish sprint" : "Next question"}
      </button>
      {finished ? <TriviaResultDialog open score={score} total={questions.length} /> : null}
    </div>
  );
}
