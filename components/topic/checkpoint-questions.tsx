import { HelpCircle } from 'lucide-react';

type Props = {
  questions: string[];
};

export function CheckpointQuestions({ questions }: Props) {
  if (questions.length === 0) return null;

  return (
    <section
      aria-labelledby="checkpoint-questions"
      className="max-w-3xl rounded-xl border bg-card/60 p-5 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          <HelpCircle className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="checkpoint-questions" className="text-lg font-semibold tracking-tight">
            Checkpoint questions
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Use these to test whether the lesson is clear enough to explain without rereading.
          </p>
        </div>
      </div>

      <ol className="mt-4 space-y-3">
        {questions.map((question, index) => (
          <li key={question} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background text-xs font-medium text-muted-foreground">
              {index + 1}
            </span>
            <span>{question}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
