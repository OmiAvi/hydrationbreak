'use client';

import Link from "next/link";
import { countries } from "@/lib/countries";
import { CountryFlag } from "@/components/fifa/CountryFlag";

interface FIFAMatchCardProps {
  homeCode: string;
  awayCode: string;
  score: [number, number];
  minute: string;
  stadium: string;
  location: string;
  homeName?: string;
  awayName?: string;
  homeFlagEmoji?: string;
  awayFlagEmoji?: string;
  status?: 'live' | 'upcoming' | 'halftime';
  final?: boolean;
  badgeLabel?: string;
  homeHref?: string | null;
  awayHref?: string | null;
}

export function FIFAMatchCard({
  homeCode,
  awayCode,
  score,
  minute,
  stadium,
  location,
  homeName,
  awayName,
  homeFlagEmoji,
  awayFlagEmoji,
  status = 'live',
  final = false,
  badgeLabel,
  homeHref,
  awayHref,
}: FIFAMatchCardProps) {
  const homeCountry = countries[homeCode];
  const awayCountry = countries[awayCode];
  const homeDisplayName = homeName ?? homeCountry?.name ?? homeCode;
  const awayDisplayName = awayName ?? awayCountry?.name ?? awayCode;
  const homeDisplayFlag = homeFlagEmoji ?? homeCountry?.flagEmoji;
  const awayDisplayFlag = awayFlagEmoji ?? awayCountry?.flagEmoji;

  const getStatusBadge = () => {
    if (badgeLabel) {
      return (
        <div className="rounded-full bg-[#ffd211] px-4 py-2 text-sm font-black text-[#12243a]">
          {badgeLabel}
        </div>
      );
    }

    if (status === 'halftime') {
      return (
        <div className="rounded-full bg-[#ffd211] px-4 py-2 text-sm font-black text-[#12243a]">
          HT
        </div>
      );
    }
    if (status === 'live') {
      const timeMatch = minute.match(/\d+/);
      const mins = timeMatch ? timeMatch[0] : '45';
      return (
        <div className="rounded-full bg-[#ef3b2d] px-4 py-2 text-sm font-black text-white">
          {mins}&apos;
        </div>
      );
    }
    if (final) {
      return (
        <div className="rounded-full border border-[#d1ccc0] bg-[#f4efe2] px-4 py-2 text-sm font-bold text-[#6f6a5d]">
          FT
        </div>
      );
    }
    return (
      <div className="rounded-full border border-[#d1ccc0] bg-white px-4 py-2 text-sm font-bold text-[#6f6a5d]">
        Upcoming
      </div>
    );
  };

  const topStripe = status === "upcoming" && !final ? "bg-[#d6d2ca]" : "bg-[#ef3b2d]";
  const showCenterBadge = status === "halftime" || badgeLabel;
  const teamCardClassName =
    "block rounded-[1.3rem] px-3 py-3 transition duration-150 hover:-translate-y-1 hover:bg-[#f7f2e5] hover:shadow-[0_6px_0_rgba(18,36,58,0.08)]";

  const homeTeamContent = (
    <>
      <div className="mb-2 flex min-h-12 items-center justify-center text-4xl sm:text-5xl">
        {homeDisplayFlag ? (
          <CountryFlag
            countryName={homeDisplayName}
            flagEmoji={homeDisplayFlag}
            flagImageUrl={homeCountry?.flagImageUrl}
            className="h-12 w-18 sm:h-14 sm:w-20"
            emojiClassName="text-4xl sm:text-5xl"
          />
        ) : (
          <span className="rounded-xl bg-[#f4efe2] px-3 py-2 text-base font-black text-[#6f6a5d]">
            {homeCode}
          </span>
        )}
      </div>
      <p className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-2xl tracking-[0.12em] text-[#12243a]">
        {homeCode}
      </p>
      <p className="mt-2 text-sm font-semibold text-[#6f6a5d]">{homeDisplayName}</p>
    </>
  );

  const awayTeamContent = (
    <>
      <div className="mb-2 flex min-h-12 items-center justify-center text-4xl sm:text-5xl">
        {awayDisplayFlag ? (
          <CountryFlag
            countryName={awayDisplayName}
            flagEmoji={awayDisplayFlag}
            flagImageUrl={awayCountry?.flagImageUrl}
            className="h-12 w-18 sm:h-14 sm:w-20"
            emojiClassName="text-4xl sm:text-5xl"
          />
        ) : (
          <span className="rounded-xl bg-[#f4efe2] px-3 py-2 text-base font-black text-[#6f6a5d]">
            {awayCode}
          </span>
        )}
      </div>
      <p className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-2xl tracking-[0.12em] text-[#12243a]">
        {awayCode}
      </p>
      <p className="mt-2 text-sm font-semibold text-[#6f6a5d]">{awayDisplayName}</p>
    </>
  );

  return (
    <div className="overflow-hidden rounded-[1.8rem] border-[3px] border-[#12243a] bg-white shadow-[0_8px_0_rgba(18,36,58,0.08)]">
      <div className={`h-2 ${topStripe}`} />

      <div className="p-5 sm:p-6">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex-1">
            <p className="text-[0.95rem] font-medium text-[#6f6a5d]">{stadium}</p>
            <p className="text-[0.95rem] text-[#6f6a5d]">{location}</p>
          </div>
          <div className="ml-3">{getStatusBadge()}</div>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex-1 text-center">
            {homeHref ? (
              <Link
                href={homeHref}
                className={teamCardClassName}
              >
                {homeTeamContent}
              </Link>
            ) : (
              <div className="rounded-[1.3rem] px-3 py-3">{homeTeamContent}</div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-5xl tracking-[0.04em] text-[#12243a] sm:text-6xl">
              {score[0]}-{score[1]}
            </div>
            {showCenterBadge ? (
              <div className="rounded-full bg-[#ffd211] px-4 py-2 text-sm font-black text-[#12243a]">
                {badgeLabel ?? "HT"}
              </div>
            ) : null}
          </div>

          <div className="flex-1 text-center">
            {awayHref ? (
              <Link
                href={awayHref}
                className={teamCardClassName}
              >
                {awayTeamContent}
              </Link>
            ) : (
              <div className="rounded-[1.3rem] px-3 py-3">{awayTeamContent}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
