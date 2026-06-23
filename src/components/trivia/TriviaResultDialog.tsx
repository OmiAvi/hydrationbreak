type TriviaResultDialogProps = {
  open: boolean;
  score: number;
  total: number;
};

export function TriviaResultDialog({ open, score, total }: TriviaResultDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-[var(--card-border)] bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Result</p>
      <p className="mt-2 text-xl font-bold text-[var(--pitch)]">
        You scored {score}/{total}
      </p>
    </div>
  );
}
