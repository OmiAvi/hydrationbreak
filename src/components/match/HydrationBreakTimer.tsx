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
    <section className="overflow-hidden rounded-[1.8rem] border-[3px] border-[#12243a] bg-[#ffd211] shadow-[0_8px_0_rgba(18,36,58,0.08)]">
      <div className="h-2 bg-[#12243a]" />
      <div className="p-5">
        <p className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-sm tracking-[0.18em] text-[#463f34]">HYDRATION BREAK</p>
        <p className="mt-1 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-4xl tracking-[0.04em] text-[#12243a]">{remainingLabel}</p>
        <p className="mt-1 text-sm font-semibold text-[#463f34]">until minute {nextBreak}&apos;</p>
        <div className="mt-4 h-2.5 rounded-full bg-[#12243a]/15">
          <div className="h-2.5 w-2/3 rounded-full bg-[#12243a]" />
        </div>
      </div>
    </section>
  );
}
