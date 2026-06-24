'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import { CountryFlag } from "@/components/fifa/CountryFlag";
import { TriviaQuestionCard } from "@/components/trivia/TriviaQuestionCard";
import { countries } from "@/lib/countries";

interface CountryQuizContentProps {
  countryCode: string;
}

export function CountryQuizContent({ countryCode }: CountryQuizContentProps) {
  const country = countries[countryCode];
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const questions = useMemo(() => country?.trivia.slice(0, 4) ?? [], [country]);
  const currentQuestion = questions[index];
  const finished = index >= questions.length;
  const score = questions.filter((question) => answers[question.id] === question.answer).length;
  const selectedChoice = currentQuestion ? answers[currentQuestion.id] : undefined;
  const revealed = currentQuestion ? Boolean(revealedAnswers[currentQuestion.id]) : false;

  if (!country) {
    return <div className="py-12 text-center">Country not found</div>;
  }

  return (
    <div className="px-4 py-4 pb-10">
      <div className="relative overflow-hidden bg-[#0d6b35] px-6 pb-9 pt-16 text-white">
        <div className="absolute -left-3 top-12 h-14 w-14 rotate-12 rounded-xl border-4 border-[#a6a43a] opacity-70" />
        <div className="absolute right-6 top-7 h-16 w-16 rounded-full border-4 border-[#a6a43a] opacity-70" />
        <div className="absolute right-16 top-20 h-12 w-12 rotate-45 bg-[#a6a43a] opacity-55" />
        <div className="absolute right-8 top-34 h-7 w-7 rounded-full bg-[#a6a43a] opacity-85" />
        <div className="absolute left-8 top-28 h-22 w-4 rounded-full bg-[#a6a43a] opacity-35" />

        <div className="relative z-10">
          <Link
            href="/matches"
            className="mb-8 flex w-fit items-center gap-2 text-lg font-semibold text-white/95 transition hover:opacity-80"
          >
            <span aria-hidden="true">←</span>
            <span>Matches</span>
          </Link>

          <p className="text-sm font-medium uppercase tracking-[0.16em] text-white/72">Country Quiz</p>
          <div className="mt-3 flex items-center gap-4">
            <CountryFlag
              countryName={country.name}
              flagEmoji={country.flagEmoji}
              flagImageUrl={country.flagImageUrl}
              className="h-14 w-20 drop-shadow-sm"
              emojiClassName="text-5xl drop-shadow-sm"
            />
            <div>
              <h1 className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-4xl tracking-[0.06em] sm:text-5xl">
                {country.name.toUpperCase()}
              </h1>
              <p className="mt-1 text-lg text-white/72">Test the language, currency, and geography before the map guess.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-5">
        {!finished && currentQuestion ? (
          <>
            <div className="mb-4 rounded-[1.35rem] border-[3px] border-[#12243a] bg-[#ffd211] px-5 py-4 text-[#12243a] shadow-[0_6px_0_rgba(18,36,58,0.08)]">
              <p className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-xl tracking-[0.04em]">
                QUESTION {index + 1} OF {questions.length}
              </p>
              <p className="mt-2 text-lg">Pick the best answer, then move to the next clue.</p>
            </div>

            <div className="rounded-[1.45rem] border-[3px] border-[#12243a] bg-white p-5 shadow-[0_8px_0_rgba(18,36,58,0.08)]">
              <TriviaQuestionCard
                question={currentQuestion}
                selectedChoice={selectedChoice}
                revealed={revealed}
                onSelect={(choice) => setAnswers((value) => ({ ...value, [currentQuestion.id]: choice }))}
              />
              <button
                type="button"
                disabled={!selectedChoice}
                onClick={() => {
                  if (!revealed) {
                    setRevealedAnswers((value) => ({ ...value, [currentQuestion.id]: true }));
                    return;
                  }

                  setIndex((value) => value + 1);
                }}
                className="mt-4 w-full rounded-[1.2rem] bg-[#ef3b2d] px-4 py-4 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-2xl tracking-[0.04em] text-white transition hover:bg-[#d92f22] disabled:cursor-not-allowed disabled:bg-[#d5cec0] disabled:text-white/70"
              >
                {!revealed ? "SUBMIT ANSWER" : index === questions.length - 1 ? "START MAP GUESS" : "NEXT QUESTION"}
              </button>
            </div>
          </>
        ) : (
          <div className="rounded-[1.45rem] border-[3px] border-[#12243a] bg-white p-6 text-center shadow-[0_8px_0_rgba(18,36,58,0.08)]">
            <p className="text-5xl">{score >= questions.length - 1 ? "🏆" : "🧠"}</p>
            <h2 className="mt-4 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-4xl tracking-[0.05em] text-[#12243a]">
              {score}/{questions.length} CORRECT
            </h2>
            <p className="mt-3 text-xl leading-8 text-[#5f5a50]">
              Nice work. Now place {country.name} on the real world map to finish the challenge.
            </p>
            <Link
              href={`/matches/${countryCode}/map-game`}
              className="mt-5 flex w-full items-center justify-center rounded-[1.35rem] bg-[#0d6b35] px-5 py-5 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-3xl tracking-[0.05em] text-white shadow-[0_8px_0_rgba(18,36,58,0.1)] transition hover:bg-[#0b5c2d]"
            >
              📍 GUESS ON THE MAP
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
