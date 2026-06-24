import { CountryStatsGrid } from "@/components/countries/CountryStatsGrid";
import { Match, countries } from "@/lib/countries";

type CountryDuelCardProps = {
  match: Match;
};

export function CountryDuelCard({ match }: CountryDuelCardProps) {
  const home = countries[match.homeCode];
  const away = countries[match.awayCode];

  return (
    <section className="overflow-hidden rounded-[1.8rem] border-[3px] border-[#12243a] bg-white shadow-[0_8px_0_rgba(18,36,58,0.08)]">
      <div className="h-2 bg-[#0d6b35]" />
      <div className="p-5">
        <h2 className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-lg tracking-[0.12em] text-[#12243a]">COUNTRY DUEL</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {[home, away].map((country) => (
            <article key={country.fifaCode} className="rounded-[1.2rem] border-[2px] border-[#12243a] bg-[#f4efe2] p-4">
              <p className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-xl tracking-[0.08em] text-[#12243a]">
                {country.flagEmoji} {country.fifaCode}
              </p>
              <p className="text-sm font-semibold text-[#6f6a5d]">{country.name}</p>
              <div className="mt-3">
                <CountryStatsGrid country={country} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
