type BadgeEarnedCardProps = {
  badge: string;
};

export function BadgeEarnedCard({ badge }: BadgeEarnedCardProps) {
  return (
    <article className="rounded-2xl border border-[var(--card-border)] bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Badge earned</p>
      <p className="mt-2 text-base font-semibold text-[var(--pitch)]">🏅 {badge}</p>
    </article>
  );
}
