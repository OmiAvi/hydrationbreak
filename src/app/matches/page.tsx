import Link from "next/link";
import { countries, matches } from "@/lib/countries";

export default function MatchesPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 pb-8">
      <header className="rounded-2xl border border-[var(--card-border)] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Hydration Break</p>
        <h1 className="mt-2 text-2xl font-bold">Choose a live match</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">Three minutes. Two countries. One quick challenge.</p>
      </header>

      <section className="grid gap-3">
        {matches.map((match) => {
          const home = countries[match.homeCode];
          const away = countries[match.awayCode];

          return (
            <Link
              key={match.id}
              href={`/matches/${match.id}`}
              className="rounded-2xl border border-[var(--card-border)] bg-white p-4 shadow-sm transition hover:border-[var(--water)]"
            >
              <p className="text-sm font-semibold">
                {home.flagEmoji} {home.name} vs {away.name} {away.flagEmoji}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {match.score[0]} — {match.score[1]} · {match.minute}
              </p>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
