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
import { CompletionModal } from "@/components/duolingo/CompletionModal";
import { Match, countries } from "@/lib/countries";
import Link from "next/link";
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
  const [showCompletion, setShowCompletion] = useState(false);

  const away = countries[match.awayCode];
  const home = countries[match.homeCode];

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
    <>
      <div className="min-h-screen bg-[#f4efe2]">
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 pb-8">
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
                    className={`rounded-full border-[2px] px-4 py-2 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-sm tracking-[0.1em] transition-all ${
                      tab === key
                        ? "border-[#12243a] bg-[#12243a] text-white shadow-[0_4px_0_rgba(18,36,58,0.2)]"
                        : "border-[#12243a] bg-white text-[#12243a] hover:bg-[#f4efe2]"
                    }`}
                    onClick={() => setTab(key)}
                  >
                    {key.toUpperCase()}
                  </button>
                ))}
              </div>

              {tab === "overview" ? (
                <>
                  <CountryDuelCard match={match} />
                  <button
                    type="button"
                    className="rounded-[1.2rem] border-[3px] border-[#12243a] bg-[#ffd211] px-5 py-3 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-base tracking-[0.08em] text-[#12243a] shadow-[0_6px_0_rgba(18,36,58,0.15)] transition-all hover:translate-y-1 hover:shadow-[0_3px_0_rgba(18,36,58,0.15)]"
                    onClick={() => {
                      setBreakMode(true);
                      setBreakStep(0);
                      setBreakSeconds(180);
                      setTriviaScore(0);
                    }}
                  >
                    START PRACTICE MODE
                  </button>
                </>
              ) : null}

              {tab === "map" ? <CountryMapPanel match={match} /> : null}
              {tab === "facts" ? <CountryFactCarousel country={away} /> : null}
              {tab === "trivia" ? <TriviaSprint country={away} /> : null}
              {tab === "leaderboard" ? (
                <div className="overflow-hidden rounded-[1.8rem] border-[3px] border-[#12243a] bg-white shadow-[0_8px_0_rgba(18,36,58,0.08)]">
                  <div className="h-2 bg-[#2055a8]" />
                  <div className="p-5">
                    <p className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-lg tracking-[0.12em] text-[#12243a]">LEADERBOARD</p>
                    <p className="mt-2 text-sm font-semibold text-[#6f6a5d]">Group challenge coming soon.</p>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <section className="space-y-4 overflow-hidden rounded-[1.8rem] border-[3px] border-[#12243a] bg-white shadow-[0_8px_0_rgba(18,36,58,0.08)]">
              <div className="h-2 bg-[#ffd211]" />
              <div className="flex items-center justify-between px-5">
                <div>
                  <p className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-sm tracking-[0.18em] text-[#6f6a5d]">HYDRATION BREAK</p>
                  <h2 className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-3xl tracking-[0.04em] text-[#12243a]">{breakLabel}</h2>
                </div>
                <button
                  type="button"
                  className="rounded-full border-[2px] border-[#12243a] bg-white px-4 py-2 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-sm tracking-[0.08em] text-[#12243a] transition-all hover:bg-[#f4efe2]"
                  onClick={() => setBreakMode(false)}
                >
                  FOLLOW MATCH
                </button>
              </div>

              <div className="space-y-3 px-5 pb-5">
                {breakStep === 0 ? (
                  <div className="space-y-3">
                    <p className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-sm tracking-[0.12em] text-[#6f6a5d]">ROUND 1 · MAP GAME</p>
                    <MapGuessGame country={away} onComplete={() => setBreakStep(1)} />
                  </div>
                ) : null}

                {breakStep === 1 ? (
                  <div className="space-y-3">
                    <p className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-sm tracking-[0.12em] text-[#6f6a5d]">ROUND 2 · COUNTRY FACTS</p>
                    <CountryFactCarousel country={away} />
                    <button
                      type="button"
                      className="rounded-[1.2rem] border-[3px] border-[#12243a] bg-[#0d6b35] px-5 py-3 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-sm tracking-[0.08em] text-white shadow-[0_6px_0_rgba(18,36,58,0.15)] transition-all hover:translate-y-1 hover:shadow-[0_3px_0_rgba(18,36,58,0.15)]"
                      onClick={() => setBreakStep(2)}
                    >
                      START TRIVIA SPRINT
                    </button>
                  </div>
                ) : null}

                {breakStep === 2 ? (
                  <div className="space-y-3">
                    <p className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-sm tracking-[0.12em] text-[#6f6a5d]">ROUND 3 · TRIVIA SPRINT</p>
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
                  <div className="space-y-4">
                    <p className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-sm tracking-[0.12em] text-[#6f6a5d]">ROUND 4 · RECAP</p>
                    <div className="rounded-[1.2rem] border-[2px] border-[#12243a] bg-[#f4efe2] p-4">
                      <p className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-base tracking-[0.06em] text-[#12243a]">YOU LEARNED:</p>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[#463f34]">
                        {learned.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                      <p className="mt-4 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-2xl tracking-[0.04em] text-[#0d6b35]">
                        SCORE: {triviaScore}/3 {triviaScore === 3 ? "🎉" : triviaScore === 2 ? "😄" : "👍"}
                      </p>
                    </div>
                    <BadgeEarnedCard
                      badge={triviaScore >= 2 ? "Map Scout" : "Capital Captain"}
                    />
                    <button
                      type="button"
                      className="w-full rounded-[1.2rem] border-[3px] border-[#12243a] bg-[#ffd211] px-5 py-3 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-base tracking-[0.08em] text-[#12243a] shadow-[0_6px_0_rgba(18,36,58,0.15)] transition-all hover:translate-y-1 hover:shadow-[0_3px_0_rgba(18,36,58,0.15)]"
                      onClick={() => setShowCompletion(true)}
                    >
                      COMPLETE MATCH
                    </button>
                  </div>
                ) : null}
              </div>
            </section>
          )}
        </div>
      </div>

      <CompletionModal
        isOpen={showCompletion}
        matchName={`${home.name} vs ${away.name}`}
        pointsEarned={100 + triviaScore * 20}
        streakContinued={true}
        onContinue={() => {
          setShowCompletion(false);
          // Could redirect to matches page here
        }}
      />
    </>
  );
}
