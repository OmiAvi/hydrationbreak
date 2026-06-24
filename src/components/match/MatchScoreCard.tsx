import { Match, countries } from "@/lib/countries";

type MatchScoreCardProps = {
  match: Match;
};

export function MatchScoreCard({ match }: MatchScoreCardProps) {
  const home = countries[match.homeCode];
  const away = countries[match.awayCode];

  return (
    <section className="overflow-hidden rounded-[1.8rem] border-[3px] border-[#12243a] bg-white shadow-[0_8px_0_rgba(18,36,58,0.08)]">
      <div className="h-2 bg-[#ef3b2d]" />
      <div className="p-5">
        <p className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-sm tracking-[0.18em] text-[#6f6a5d]">LIVE MATCH</p>
        <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
          <div>
            <p className="text-4xl">{home.flagEmoji}</p>
            <p className="mt-1 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-lg tracking-[0.08em] text-[#12243a]">{home.fifaCode}</p>
            <p className="text-xs font-semibold text-[#6f6a5d]">{home.name}</p>
          </div>
          <p className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-5xl tracking-[0.04em] text-[#12243a]">
            {match.score[0]}–{match.score[1]}
          </p>
          <div>
            <p className="text-4xl">{away.flagEmoji}</p>
            <p className="mt-1 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-lg tracking-[0.08em] text-[#12243a]">{away.fifaCode}</p>
            <p className="text-xs font-semibold text-[#6f6a5d]">{away.name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
