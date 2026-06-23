"use client";

import { CountryFactCarousel } from "@/components/countries/CountryFactCarousel";
import { CountryMapPanel } from "@/components/countries/CountryMapPanel";
import { CountryDuelCard } from "@/components/match/CountryDuelCard";
import { HydrationBreakTimer } from "@/components/match/HydrationBreakTimer";
import { LiveMatchHeader } from "@/components/match/LiveMatchHeader";
import { MatchScoreCard } from "@/components/match/MatchScoreCard";
import { MapGuessGame } from "@/components/map/MapGuessGame";
import { BadgeEarnedCard } from "@/components/trivia/BadgeEarnedCard";
import { TriviaSprint } from "@/components/trivia/TriviaSprint";
import { Match, countries } from "@/lib/countries";
import { useEffect, useMemo, useState } from "react";

type LiveMatchExperienceProps = {
  match: Match;
};

type TabKey = "overview" | "map" | "facts" | "trivia" | "leaderboard";

const tabOrder: TabKey[] = ["overview", "map", "facts", "trivia", "leaderboard"];

export function LiveMatchExperience({ match }: LiveMatchExperienceProps) {
  const [tab, setTab] = useState<TabKey>("overview");
  const [breakMode, setBreakMode] = useState(false);
  const [breakSeconds, setBreakSeconds] = useState(180);
  const [breakStep, setBreakStep] = useState(0);
  const [triviaScore, setTriviaScore] = useState(0);

  const away = countries[match.awayCode];

  useEffect(() => {
    if (!breakMode || breakSeconds <= 0) {
      return;
    }

    const timeout = setTimeout(() => {
      setBreakSeconds((value) => value - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [breakMode, breakSeconds]);

  const breakLabel = useMemo(() => {
    const mins = String(Math.floor(breakSeconds / 60)).padStart(1, "0");
    const secs = String(breakSeconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }, [breakSeconds]);

  const learned = [
    away.funFacts[0],
    `${away.capital} is ${away.name}'s capital.`,
    `${away.name}'s flag is called ${away.flagName ?? "its national flag"}.`,
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 pb-8">
      <LiveMatchHeader match={match} />
      {!breakMode ? (
        <>
          <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
            <MatchScoreCard match={match} />
            <HydrationBreakTimer match={match} />
          </div>
          <div className="flex flex-wrap gap-2">
            {tabOrder.map((key) => (
              <button
                key={key}
                type="button"
                className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
                  tab === key ? "bg-[var(--water)] text-white" : "border border-[var(--card-border)] bg-white"
                }`}
                onClick={() => setTab(key)}
              >
                {key}
              </button>
            ))}
          </div>

          {tab === "overview" ? (
            <>
              <CountryDuelCard match={match} />
              <button
                type="button"
                className="rounded-2xl bg-[var(--pitch)] px-4 py-3 text-sm font-semibold text-white"
                onClick={() => {
                  setBreakMode(true);
                  setBreakStep(0);
                  setBreakSeconds(180);
                  setTriviaScore(0);
                }}
              >
                Start Practice Mode
              </button>
            </>
          ) : null}

          {tab === "map" ? <CountryMapPanel match={match} /> : null}
          {tab === "facts" ? <CountryFactCarousel country={away} /> : null}
          {tab === "trivia" ? <TriviaSprint country={away} /> : null}
          {tab === "leaderboard" ? (
            <div className="rounded-2xl border border-[var(--card-border)] bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold">Leaderboard</p>
              <p className="mt-2 text-sm text-[var(--muted)]">Group challenge coming soon.</p>
            </div>
          ) : null}
        </>
      ) : (
        <section className="space-y-4 rounded-2xl border border-[var(--card-border)] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Hydration Break</p>
              <h2 className="text-xl font-bold text-[var(--water)]">{breakLabel} remaining</h2>
            </div>
            <button
              type="button"
              className="rounded-xl border border-[var(--card-border)] px-3 py-2 text-sm"
              onClick={() => setBreakMode(false)}
            >
              Follow match
            </button>
          </div>

          {breakStep === 0 ? (
            <div className="space-y-3">
              <MapGuessGame country={away} onComplete={() => setBreakStep(1)} />
            </div>
          ) : null}

          {breakStep === 1 ? (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Round 2 · Country facts</p>
              <CountryFactCarousel country={away} />
              <button
                type="button"
                className="rounded-xl bg-[var(--water)] px-4 py-2 text-sm font-semibold text-white"
                onClick={() => setBreakStep(2)}
              >
                Start trivia sprint
              </button>
            </div>
          ) : null}

          {breakStep === 2 ? (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Round 3 · Trivia sprint</p>
              <TriviaSprint
                country={away}
                onFinish={(score) => {
                  setTriviaScore(score);
                  setBreakStep(3);
                }}
              />
            </div>
          ) : null}

          {breakStep === 3 ? (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Round 4 · Recap</p>
              <div className="rounded-2xl border border-[var(--card-border)] p-4">
                <p className="font-semibold">You learned:</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--muted)]">
                  {learned.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-semibold">Score: {triviaScore}/3</p>
              </div>
              <BadgeEarnedCard badge={triviaScore >= 2 ? "Map Scout" : "Capital Captain"} />
            </div>
          ) : null}
        </section>
      )}
    </div>
  );
}
