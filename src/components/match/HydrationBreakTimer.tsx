"use client";

import { Match } from "@/lib/countries";
import { useMemo } from "react";

type HydrationBreakTimerProps = {
  match: Match;
};

const toSeconds = (minute: string) => {
  const [mins, secs] = minute.split(":").map(Number);
  return mins * 60 + secs;
};

export function HydrationBreakTimer({ match }: HydrationBreakTimerProps) {
  const { nextBreak, remainingLabel } = useMemo(() => {
    const total = toSeconds(match.minute);
    const nextBreak = match.breakWindows.find((windowMinute) => windowMinute * 60 > total) ?? match.breakWindows[1];
    const remaining = Math.max(nextBreak * 60 - total, 0);
    const mins = String(Math.floor(remaining / 60)).padStart(2, "0");
    const secs = String(remaining % 60).padStart(2, "0");

    return {
      nextBreak,
      remainingLabel: `${mins}:${secs}`,
    };
  }, [match]);

  return (
    <section className="rounded-2xl border border-[var(--card-border)] bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Hydration Break soon</p>
      <p className="mt-2 text-xl font-bold text-[var(--water)]">Next: {nextBreak}&apos;</p>
      <p className="text-sm text-[var(--muted)]">Estimated in {remainingLabel}</p>
      <div className="mt-4 h-2 rounded-full bg-[color-mix(in_oklab,var(--water)_16%,white)]">
        <div className="h-2 w-2/3 rounded-full bg-[var(--water)]" />
      </div>
    </section>
  );
}
