import { Country } from "@/lib/countries";

type CountryStatsGridProps = {
  country: Country;
};

export function CountryStatsGrid({ country }: CountryStatsGridProps) {
  return (
    <dl className="grid grid-cols-2 gap-2 text-xs">
      <div className="rounded-xl border border-[var(--card-border)] p-2">
        <dt className="text-[var(--muted)]">Capital</dt>
        <dd className="font-semibold">{country.capital}</dd>
      </div>
      <div className="rounded-xl border border-[var(--card-border)] p-2">
        <dt className="text-[var(--muted)]">Region</dt>
        <dd className="font-semibold">{country.region}</dd>
      </div>
      <div className="rounded-xl border border-[var(--card-border)] p-2">
        <dt className="text-[var(--muted)]">Language</dt>
        <dd className="font-semibold">{country.languages.join(", ")}</dd>
      </div>
      <div className="rounded-xl border border-[var(--card-border)] p-2">
        <dt className="text-[var(--muted)]">Currency</dt>
        <dd className="font-semibold">{country.currency}</dd>
      </div>
    </dl>
  );
}
