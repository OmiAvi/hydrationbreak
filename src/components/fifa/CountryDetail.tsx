'use client';

import Link from "next/link";
import { useState } from "react";
import { countries } from "@/lib/countries";
import { CountryFlag } from "@/components/fifa/CountryFlag";

interface CountryDetailPageProps {
  countryCode: string;
}

export function CountryDetailContent({ countryCode }: CountryDetailPageProps) {
  const country = countries[countryCode];
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  if (!country) {
    return (
      <div className="text-center py-12">
        <p>Country not found</p>
      </div>
    );
  }

  const allFacts = [...country.funFacts, ...country.footballFacts];
  const currentFact = allFacts[currentFactIndex];
  const legends = country.legends ?? [];

  return (
    <div className="px-4 py-4 pb-10">
      <div className="relative overflow-hidden bg-[#c9272f] px-6 pb-9 pt-16 text-white">
            <div className="absolute -left-3 top-4 h-14 w-14 rotate-12 rounded-xl border-4 border-white/14 opacity-80" />
            <div className="absolute right-6 top-7 h-16 w-16 rounded-full border-4 border-white/18" />
            <div className="absolute right-18 top-20 h-12 w-12 rotate-45 bg-white/10" />
            <div className="absolute left-8 top-28 h-22 w-4 rounded-full bg-white/10" />
            <div className="absolute right-9 top-28 h-7 w-7 rounded-full bg-white/24" />

            <div className="relative z-10">
              <Link
                href="/matches"
                className="mb-8 flex w-fit items-center gap-2 text-lg font-semibold text-white/95 transition hover:opacity-80"
              >
                <span aria-hidden="true">←</span>
                <span>Matches</span>
              </Link>
              <div className="flex items-center gap-4">
                <CountryFlag
                  countryName={country.name}
                  flagEmoji={country.flagEmoji}
                  flagImageUrl={country.flagImageUrl}
                  className="h-14 w-20 drop-shadow-sm"
                  emojiClassName="text-5xl drop-shadow-sm"
                />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/75">
                    {country.region}
                  </p>
                  <h1 className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-4xl tracking-[0.06em] sm:text-5xl">
                    {country.name.toUpperCase()}
                  </h1>
                  <p className="mt-2 text-[1.2rem] text-white/66">
                    {country.population ? `${Math.round(country.population / 1_000_000)}M people` : country.subregion}
                  </p>
                </div>
              </div>
            </div>
      </div>

      <div className="px-4 py-5">
            <div className="mb-6 grid grid-cols-2 gap-4">
              {[
                { label: "Capital", value: country.capital, icon: "🏛️" },
                { label: "Language", value: country.languages.join(" & "), icon: "🗣️" },
                { label: "Currency", value: country.currency || "N/A", icon: "💰" },
                { label: "Continent", value: country.region, icon: "🌍" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.35rem] border-[3px] border-[#12243a] bg-white p-4 shadow-[0_6px_0_rgba(18,36,58,0.08)]"
                >
                  <div className="text-3xl">{item.icon}</div>
                  <p className="mt-2 text-sm uppercase tracking-[0.14em] text-[#6f6a5d]">{item.label}</p>
                  <p className="mt-1 text-[1.45rem] font-semibold leading-7 text-[#12243a]">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="mb-4 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-lg tracking-[0.18em] text-[#6f6a5d]">
                FUN FACTS
              </h2>
              <div className="rounded-[1.45rem] border-[3px] border-[#12243a] bg-white p-5 shadow-[0_8px_0_rgba(18,36,58,0.08)]">
                <div className="text-4xl">🏔️</div>
                <p className="mt-4 text-[1.15rem] leading-9 text-[#12243a]">{currentFact}</p>
                {allFacts.length > 1 && (
                  <div className="mt-5 flex items-center justify-between gap-3 text-[#6f6a5d]">
                    <button
                      onClick={() => setCurrentFactIndex((prev) => (prev === 0 ? allFacts.length - 1 : prev - 1))}
                      className="text-lg font-semibold transition hover:text-[#12243a]"
                    >
                      ← Prev
                    </button>
                    <div className="flex gap-2">
                      {allFacts.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-3 rounded-full transition-all ${
                            idx === currentFactIndex ? "w-7 bg-[#0d6b35]" : "w-3 bg-[#e2dccf]"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentFactIndex((prev) => (prev === allFacts.length - 1 ? 0 : prev + 1))}
                      className="text-lg font-semibold transition hover:text-[#12243a]"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="mb-4 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-lg tracking-[0.18em] text-[#6f6a5d]">
                LEGENDS
              </h2>
              <div className="space-y-4">
                {legends.map((legend) => (
                  <div
                    key={legend.name}
                    className="rounded-[1.35rem] border-[3px] border-[#12243a] bg-white p-5 shadow-[0_6px_0_rgba(18,36,58,0.08)]"
                  >
                    <p className="text-sm uppercase tracking-[0.14em] text-[#6f6a5d]">{legend.role}</p>
                    <p className="mt-1 text-[1.5rem] font-semibold text-[#12243a]">{legend.name}</p>
                    <p className="mt-2 text-lg leading-8 text-[#4f4a40]">{legend.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={`/matches/${countryCode}/map-game`}
              className="flex w-full items-center justify-center rounded-[1.45rem] bg-[#0d6b35] px-5 py-5 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-3xl tracking-[0.05em] text-white shadow-[0_8px_0_rgba(18,36,58,0.1)] transition hover:bg-[#0b5c2d]"
            >
              📍 PLAY THE MAP CHALLENGE
            </Link>
      </div>
      </div>
  );
}
