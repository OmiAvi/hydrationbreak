import { Country } from "@/lib/countries";

type WorldMapProps = {
  countriesToHighlight: Country[];
};

export function WorldMap({ countriesToHighlight }: WorldMapProps) {
  return (
    <div className="relative h-52 w-full overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[radial-gradient(circle_at_top,#d9f5ff,#f6fbf7)] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Map preview</p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {countriesToHighlight.map((country) => (
          <div key={country.fifaCode} className="rounded-xl border border-[var(--card-border)] bg-white/80 p-3">
            <p className="text-sm font-semibold">
              {country.flagEmoji} {country.name}
            </p>
            <p className="text-xs text-[var(--muted)]">{country.region}</p>
            <p className="mt-2 text-xs text-[var(--muted)]">
              Coords: {country.coordinates[0].toFixed(1)}, {country.coordinates[1].toFixed(1)}
            </p>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#28a9e022_1px,transparent_1px)] [background-size:12px_12px]" />
    </div>
  );
}
