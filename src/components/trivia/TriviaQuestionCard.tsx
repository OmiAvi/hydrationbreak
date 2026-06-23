import { TriviaQuestion } from "@/lib/countries";

type TriviaQuestionCardProps = {
  question: TriviaQuestion;
  selectedChoice?: string;
  onSelect: (choice: string) => void;
};

export function TriviaQuestionCard({ question, selectedChoice, onSelect }: TriviaQuestionCardProps) {
  return (
    <article className="rounded-2xl border border-[var(--card-border)] bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Trivia sprint</p>
      <h3 className="mt-2 text-base font-semibold">{question.question}</h3>
      <div className="mt-4 grid gap-2">
        {question.choices.map((choice) => (
          <button
            key={choice}
            type="button"
            className={`rounded-xl border px-3 py-2 text-left text-sm ${
              selectedChoice === choice
                ? "border-[var(--water)] bg-[color-mix(in_oklab,var(--water)_14%,white)]"
                : "border-[var(--card-border)] bg-white"
            }`}
            onClick={() => onSelect(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
    </article>
  );
}
