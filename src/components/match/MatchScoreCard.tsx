import { Match, countries } from "@/lib/countries";

type MatchScoreCardProps = {
  match: Match;
};

export function MatchScoreCard({ match }: MatchScoreCardProps) {
  const home = countries[match.homeCode];
  const away = countries[match.awayCode];

  return (
    <section className="rounded-2xl border border-[var(--card-border)] bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Live Match</p>
      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
        <div>
          <p className="text-3xl">{home.flagEmoji}</p>
          <p className="mt-1 text-sm font-semibold">{home.name}</p>
        </div>
        <p className="text-2xl font-bold text-[var(--pitch)]">
          {match.score[0]} — {match.score[1]}
        </p>
        <div>
          <p className="text-3xl">{away.flagEmoji}</p>
          <p className="mt-1 text-sm font-semibold">{away.name}</p>
        </div>
      </div>
    </section>
  );
}
