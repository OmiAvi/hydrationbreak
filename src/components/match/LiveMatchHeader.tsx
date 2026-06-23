import { Match, countries } from "@/lib/countries";

type LiveMatchHeaderProps = {
  match: Match;
};

export function LiveMatchHeader({ match }: LiveMatchHeaderProps) {
  const home = countries[match.homeCode];
  const away = countries[match.awayCode];

  return (
    <header className="rounded-2xl border border-[var(--card-border)] bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Hydration Break</p>
      <h1 className="mt-1 text-lg font-bold text-[var(--foreground)]">
        {home.fifaCode} {match.score[0]} — {match.score[1]} {away.fifaCode} · {match.minute}
      </h1>
      <p className="mt-2 text-sm text-[var(--muted)]">Live World Cup companion</p>
    </header>
  );
}
