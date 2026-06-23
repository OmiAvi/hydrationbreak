import { Country } from "@/lib/countries";

type CountryFactCardProps = {
  country: Country;
  fact: string;
};

export function CountryFactCard({ country, fact }: CountryFactCardProps) {
  return (
    <article className="rounded-2xl border border-[var(--card-border)] bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Quick fact</p>
      <h3 className="mt-1 text-sm font-semibold">
        {country.flagEmoji} {country.name}
      </h3>
      <p className="mt-3 text-sm text-[var(--foreground)]">{fact}</p>
    </article>
  );
}
