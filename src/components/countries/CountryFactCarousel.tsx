"use client";

import { CountryFactCard } from "@/components/countries/CountryFactCard";
import { Country } from "@/lib/countries";
import { useState } from "react";

type CountryFactCarouselProps = {
  country: Country;
};

export function CountryFactCarousel({ country }: CountryFactCarouselProps) {
  const [index, setIndex] = useState(0);
  const fact = country.funFacts[index];

  return (
    <div className="space-y-3">
      <CountryFactCard country={country} fact={fact} />
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded-xl border border-[var(--card-border)] bg-white px-3 py-2 text-sm disabled:opacity-50"
          onClick={() => setIndex((value) => Math.max(value - 1, 0))}
          disabled={index === 0}
        >
          Previous
        </button>
        <button
          type="button"
          className="rounded-xl border border-[var(--card-border)] bg-white px-3 py-2 text-sm disabled:opacity-50"
          onClick={() => setIndex((value) => Math.min(value + 1, country.funFacts.length - 1))}
          disabled={index === country.funFacts.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
