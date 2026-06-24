'use client';

import { CountryFlag } from "@/components/fifa/CountryFlag";
import { ProjectedWorldMap } from "@/components/map/ProjectedWorldMap";
import {
  GUESS_STORAGE_PREFIX,
  pointToLatLon,
  pointToPercent,
  type ProjectedPoint,
} from "@/lib/map";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { countries } from "@/lib/countries";

interface MapGameProps {
  countryCode: string;
}

export function MapGameContent({ countryCode }: MapGameProps) {
  const country = countries[countryCode];
  const router = useRouter();
  const [guessPoint, setGuessPoint] = useState<ProjectedPoint | null>(null);

  if (!country) {
    return <div className="text-center py-12">Country not found</div>;
  }

  const handleSubmit = () => {
    if (!guessPoint) return;

    const guessLatLon = pointToLatLon(guessPoint);
    const guessPercent = pointToPercent(guessPoint);

    sessionStorage.setItem(
      `${GUESS_STORAGE_PREFIX}-${countryCode}`,
      JSON.stringify({
        guessPoint,
        guessLatLon,
        guessPercent,
        createdAt: Date.now(),
      }),
    );

    router.push(`/matches/${countryCode}/result`);
  };

  const handleReset = () => {
    setGuessPoint(null);
  };

  return (
    <div className="px-4 py-4 pb-10">
      <div className="mb-6">
          <div className="relative overflow-hidden bg-[#0d6b35] px-6 pb-9 pt-16 text-white">
            <div className="absolute -left-3 top-12 h-14 w-14 rotate-12 rounded-xl border-4 border-[#a6a43a] opacity-70" />
            <div className="absolute right-6 top-7 h-16 w-16 rounded-full border-4 border-[#a6a43a] opacity-70" />
            <div className="absolute right-16 top-20 h-12 w-12 rotate-45 bg-[#a6a43a] opacity-55" />
            <div className="absolute right-8 top-34 h-7 w-7 rounded-full bg-[#a6a43a] opacity-85" />
            <div className="absolute left-8 top-28 h-22 w-4 rounded-full bg-[#a6a43a] opacity-35" />

            <div className="relative z-10">
              <Link
                href={`/matches/${countryCode}`}
                className="mb-8 flex w-fit items-center gap-2 text-lg font-semibold text-white/95 transition hover:opacity-80"
              >
                <span aria-hidden="true">←</span>
                <span>Back</span>
              </Link>

              <p className="text-sm font-medium text-white/75 sm:text-[1.05rem]">
                Where in the world is...
              </p>
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
                  <p className="mt-1 text-lg text-white/72">{country.region}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-5">
            <div className="mb-4 flex items-center gap-3 rounded-[1.35rem] border-[3px] border-[#12243a] bg-[#ffd211] px-5 py-4 text-[#12243a] shadow-[0_6px_0_rgba(18,36,58,0.08)]">
              <span className="text-2xl">📍</span>
              <p className="text-lg font-semibold">Tap again to reposition, then submit!</p>
            </div>

            <div className="overflow-hidden rounded-[1.45rem] border-[3px] border-[#12243a] bg-[#8ec7e6] shadow-[0_8px_0_rgba(18,36,58,0.1)]">
              <ProjectedWorldMap
                className="aspect-[1.7/1] w-full cursor-crosshair"
                guess={guessPoint}
                interactive
                onSelect={setGuessPoint}
              />
            </div>

            <div className="mt-4 flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 rounded-[1.35rem] border-[3px] border-[#12243a] bg-white px-4 py-4 text-lg font-semibold text-[#12243a] transition hover:bg-[#f7f2e5]"
              >
                ⟲ Reset
              </button>
              <button
                onClick={handleSubmit}
                disabled={!guessPoint}
                className="flex-1 rounded-[1.35rem] bg-[#ef3b2d] px-4 py-4 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-2xl tracking-[0.04em] text-white shadow-[0_8px_0_rgba(18,36,58,0.1)] transition hover:bg-[#d92f22] disabled:cursor-not-allowed disabled:bg-[#d5cec0] disabled:text-white/70"
              >
                ⚡ SUBMIT GUESS!
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}
