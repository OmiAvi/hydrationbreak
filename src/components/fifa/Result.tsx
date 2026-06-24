'use client';

import { CountryFlag } from "@/components/fifa/CountryFlag";
import { ProjectedWorldMap } from "@/components/map/ProjectedWorldMap";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { countries } from "@/lib/countries";
import {
  GUESS_STORAGE_PREFIX,
  getResultLabel,
  haversineDistanceKm,
  latLonToPoint,
  pointToLatLon,
  scoreGuess,
  type ProjectedPoint,
} from "@/lib/map";

interface ResultPageProps {
  countryCode: string;
}

export function ResultContent({ countryCode }: ResultPageProps) {
  const country = countries[countryCode];
  const [guessPoint, setGuessPoint] = useState<ProjectedPoint | null>(null);

  useEffect(() => {
    const storedGuess = sessionStorage.getItem(`${GUESS_STORAGE_PREFIX}-${countryCode}`);
    let nextGuess: ProjectedPoint | null = null;

    if (storedGuess) {
      try {
        const parsed = JSON.parse(storedGuess) as { guessPoint?: ProjectedPoint };
        if (parsed.guessPoint) {
          nextGuess = parsed.guessPoint;
        }
      } catch {
        nextGuess = null;
      }
    }

    const frame = window.requestAnimationFrame(() => {
      setGuessPoint(nextGuess);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [countryCode]);

  const actualPoint = useMemo(
    () =>
      country
        ? latLonToPoint({ lat: country.coordinates[0], lon: country.coordinates[1] })
        : null,
    [country],
  );

  const metrics = useMemo(() => {
    if (!guessPoint || !country) {
      return null;
    }

    const guessedLatLon = pointToLatLon(guessPoint);
    const actualLatLon = { lat: country.coordinates[0], lon: country.coordinates[1] };
    const distanceKm = haversineDistanceKm(guessedLatLon, actualLatLon);
    const points = scoreGuess(distanceKm);
    const label = getResultLabel(distanceKm);

    return {
      distanceKm,
      points,
      totalScore: points,
      ...label,
    };
  }, [country, guessPoint]);

  if (!country) {
    return <div className="text-center py-12">Country not found</div>;
  }

  const randomFact = country.funFacts[1] ?? country.funFacts[0];
  const feedback = metrics?.title ?? "PLACE YOUR GUESS FIRST";
  const resultEmoji = metrics?.emoji ?? "🧭";
  const points = metrics?.points ?? 0;
  const totalScore = metrics?.totalScore ?? 0;
  const distance = metrics ? Math.round(metrics.distanceKm) : 0;
  const resultColor = points > 1200 ? "bg-[#0d6b35]" : "bg-[#c9272f]";

  return (
    <div className="px-4 py-4 pb-10">
      <div className={`relative overflow-hidden px-6 pb-9 pt-8 text-white ${resultColor}`}>
            <div className="absolute -left-3 top-2 h-14 w-14 rotate-12 rounded-xl border-4 border-white/16 opacity-80" />
            <div className="absolute right-6 top-8 h-16 w-16 rounded-full border-4 border-white/20" />
            <div className="absolute right-18 top-20 h-12 w-12 rotate-45 bg-white/10" />
            <div className="absolute left-8 top-34 h-22 w-4 rounded-full bg-white/10" />
            <div className="absolute right-9 top-28 h-7 w-7 rounded-full bg-white/24" />

            <p className="relative z-10 mb-3 text-base text-white/82">Result for</p>
            <div className="relative z-10 flex items-center gap-4">
              <CountryFlag
                countryName={country.name}
                flagEmoji={country.flagEmoji}
                flagImageUrl={country.flagImageUrl}
                className="h-14 w-20 drop-shadow-sm"
                emojiClassName="text-5xl drop-shadow-sm"
              />
              <h1 className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-4xl tracking-[0.06em] sm:text-5xl">
                {country.name.toUpperCase()}
              </h1>
            </div>
      </div>

      <div className="px-4 py-5">
            <div className="relative mb-5 overflow-hidden rounded-[1.6rem] border-[3px] border-[#12243a] bg-white px-6 py-7 text-center shadow-[0_8px_0_rgba(18,36,58,0.08)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,36,58,0.05),transparent_52%)]" />
              <div className="relative z-10 text-6xl">{resultEmoji}</div>
              <h2 className="relative z-10 mt-3 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-4xl tracking-[0.05em] text-[#6f6a5d] sm:text-5xl">
                {feedback}
              </h2>
              <p className="relative z-10 mt-3 text-xl text-[#5f5a50]">
                {metrics ? `You were ${distance.toLocaleString()} km away!` : "Make a guess on the map to see your result."}
              </p>

              <div className="relative z-10 mt-5 flex items-baseline justify-center gap-3">
                <span className="text-[4.5rem] font-black leading-none text-[#6f6a5d]">+{points}</span>
                <span className="text-3xl font-semibold text-[#6f6a5d]">pts</span>
              </div>

              <div className="relative z-10 my-6 border-t border-[#d8d2c5]" />

              <div className="relative z-10 flex items-center justify-center gap-3 text-[#5f5a50]">
                <span className="text-2xl">🏆</span>
                <span className="text-2xl">Total score:</span>
                <span className="text-3xl font-black text-[#12243a]">{totalScore}</span>
                <span className="text-2xl">pts</span>
              </div>
            </div>

            <div className="mb-4 flex items-center gap-5 px-2 text-base text-[#5f5a50]">
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-[#ef3b2d]" />
                <span>Your guess</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-[#12243a] bg-[#ffd211]" />
                <span>Actual location</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-10 border-t-[3px] border-dashed border-[#facc15]" />
                <span>Distance</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.45rem] border-[3px] border-[#12243a] bg-[#8ec7e6] shadow-[0_8px_0_rgba(18,36,58,0.1)]">
              <ProjectedWorldMap className="aspect-[1.7/1] w-full" guess={guessPoint} actual={actualPoint} />
            </div>

            <div className="mt-6 rounded-[1.45rem] border-[3px] border-[#12243a] bg-white p-5 shadow-[0_8px_0_rgba(18,36,58,0.08)]">
              <p className="mb-3 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-lg tracking-[0.16em] text-[#6f6a5d]">
                DID YOU KNOW?
              </p>
              <div className="flex gap-3">
                <div className="text-3xl">🏔️</div>
                <p className="text-xl leading-8 text-[#12243a]">{randomFact}</p>
              </div>
            </div>

            <Link
              href={`/matches/${countryCode}/learn`}
              className="mt-6 flex w-full items-center justify-center rounded-[1.45rem] bg-[#0d6b35] px-5 py-5 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-3xl tracking-[0.05em] text-white shadow-[0_8px_0_rgba(18,36,58,0.1)] transition hover:bg-[#0b5c2d]"
            >
              🌍 LEARN ABOUT {country.name.toUpperCase()}
            </Link>
      </div>
      </div>
  );
}
