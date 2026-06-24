import { TriviaQuestion } from "@/lib/countries";

type TriviaQuestionCardProps = {
  question: TriviaQuestion;
  selectedChoice?: string;
  revealed?: boolean;
  onSelect: (choice: string) => void;
};

export function TriviaQuestionCard({
  question,
  selectedChoice,
  revealed = false,
  onSelect,
}: TriviaQuestionCardProps) {
  const answeredCorrectly = selectedChoice === question.answer;

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
              revealed
                ? choice === question.answer
                  ? "border-[#0d6b35] bg-[#e8f6ec] text-[#0d6b35]"
                  : choice === selectedChoice
                    ? "border-[#c9272f] bg-[#fdeceb] text-[#7a1d23]"
                    : "border-[var(--card-border)] bg-white text-[#6f6a5d]"
                : selectedChoice === choice
                  ? "border-[var(--water)] bg-[color-mix(in_oklab,var(--water)_14%,white)]"
                  : "border-[var(--card-border)] bg-white"
            }`}
            disabled={revealed}
            onClick={() => onSelect(choice)}
          >
            {choice}
          </button>
        ))}
      </div>

      {revealed && selectedChoice ? (
        <div
          className={`mt-4 rounded-2xl border px-4 py-4 ${
            answeredCorrectly
              ? "border-[#0d6b35] bg-[#e8f6ec] text-[#0d6b35]"
              : "border-[#c9272f] bg-[#fdeceb] text-[#7a1d23]"
          }`}
        >
          <p className="text-sm font-black uppercase tracking-[0.12em]">
            {answeredCorrectly ? "Correct" : `Correct answer: ${question.answer}`}
          </p>
          <p className="mt-2 text-base leading-7">{question.explanation}</p>
        </div>
      ) : null}
    </article>
  );
}
