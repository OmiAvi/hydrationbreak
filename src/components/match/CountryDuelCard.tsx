import { CountryStatsGrid } from "@/components/countries/CountryStatsGrid";
import { Match, countries } from "@/lib/countries";

type CountryDuelCardProps = {
  match: Match;
};

export function CountryDuelCard({ match }: CountryDuelCardProps) {
  const home = countries[match.homeCode];
  const away = countries[match.awayCode];

  return (
    <section className="rounded-2xl border border-[var(--card-border)] bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold">Country Duel</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {[home, away].map((country) => (
          <article key={country.fifaCode} className="rounded-2xl border border-[var(--card-border)] p-3">
            <p className="text-lg font-bold">
              {country.flagEmoji} {country.name}
            </p>
            <div className="mt-3">
              <CountryStatsGrid country={country} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
