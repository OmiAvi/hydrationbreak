"use client";

import { Country } from "@/lib/countries";
import { useState } from "react";

type MapGuessGameProps = {
  country: Country;
  onComplete: () => void;
};

export function MapGuessGame({ country, onComplete }: MapGuessGameProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="rounded-2xl border border-[var(--card-border)] bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Round 1 · Map tap</p>
      <h3 className="mt-2 text-base font-semibold">Tap where {country.name} is.</h3>
      <button
        type="button"
        className="mt-4 w-full rounded-xl bg-[var(--water)] px-4 py-3 text-sm font-semibold text-white"
        onClick={() => setRevealed(true)}
      >
        {revealed ? "Continue" : `Locate ${country.name}`}
      </button>
      {revealed ? (
        <>
          <p className="mt-3 text-sm text-[var(--pitch)]">Nice — {country.funFacts[0]}</p>
          <button
            type="button"
            className="mt-3 rounded-xl border border-[var(--card-border)] px-3 py-2 text-sm"
            onClick={onComplete}
          >
            Go to facts
          </button>
        </>
      ) : null}
    </section>
  );
}
