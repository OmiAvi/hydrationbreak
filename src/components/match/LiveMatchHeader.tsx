import { Match, countries } from "@/lib/countries";

type LiveMatchHeaderProps = {
  match: Match;
};

export function LiveMatchHeader({ match }: LiveMatchHeaderProps) {
  const home = countries[match.homeCode];
  const away = countries[match.awayCode];

  return (
    <header className="relative overflow-hidden rounded-[1.8rem] border-[3px] border-[#12243a] bg-[#0d6b35] px-6 py-5 text-white shadow-[0_8px_0_rgba(18,36,58,0.12)]">
      <div className="absolute -left-3 top-6 h-10 w-10 rotate-12 rounded-xl border-4 border-[#a6a43a] opacity-50" />
      <div className="absolute right-6 top-4 h-12 w-12 rounded-full border-4 border-[#a6a43a] opacity-50" />
      <div className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">FIFA World Cup 2026™ · Live</p>
        <h1 className="mt-1 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-3xl tracking-[0.06em]">
          {home.fifaCode} {match.score[0]}–{match.score[1]} {away.fifaCode}
          <span className="ml-3 text-xl text-white/70">{match.minute}</span>
        </h1>
      </div>
    </header>
  );
}
