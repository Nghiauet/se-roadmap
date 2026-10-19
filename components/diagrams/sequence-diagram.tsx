import { cn } from '@/lib/utils';

export type SequenceStep = {
  from: string;
  to: string;
  label: string;
  detail?: string;
  note?: boolean;
};

export function SequenceDiagram({
  actors,
  steps,
  caption,
  className,
}: {
  actors: string[];
  steps: SequenceStep[];
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={cn('mt-6 overflow-x-auto rounded-xl border bg-card/40 p-5 shadow-sm', className)}>
      <div className="min-w-[480px]">
        {/* Actor row */}
        <div
          className="grid items-center gap-3"
          style={{ gridTemplateColumns: `repeat(${actors.length}, minmax(0,1fr))` }}
        >
          {actors.map((a) => (
            <div
              key={a}
              className="grid place-items-center rounded-lg border bg-background px-2 py-2 text-center text-xs font-medium"
            >
              {a}
            </div>
          ))}
        </div>

        {/* Steps */}
        <ol className="mt-2">
          {steps.map((step, i) => {
            const fromIdx = actors.indexOf(step.from);
            const toIdx = actors.indexOf(step.to);
            if (fromIdx === -1 || toIdx === -1) return null;
            const left = Math.min(fromIdx, toIdx);
            const span = Math.abs(toIdx - fromIdx) + 1;
            const dirRight = toIdx >= fromIdx;
            return (
              <li
                key={i}
                className="grid items-center gap-3 py-2"
                style={{ gridTemplateColumns: `repeat(${actors.length}, minmax(0,1fr))` }}
              >
                <div
                  className="relative flex items-center"
                  style={{ gridColumn: `${left + 1} / span ${span}` }}
                >
                  <span
                    className={cn(
                      'absolute inset-x-2 top-1/2 h-px',
                      step.note ? 'bg-amber-500/30' : 'bg-primary/40',
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      'absolute top-1/2 -translate-y-1/2',
                      dirRight ? 'right-1.5' : 'left-1.5',
                      step.note ? 'text-amber-500' : 'text-primary',
                    )}
                    aria-hidden="true"
                  >
                    {dirRight ? '▶' : '◀'}
                  </span>
                  <span
                    className={cn(
                      'relative z-10 mx-auto rounded-md border px-2 py-0.5 text-[11px] font-medium shadow-sm',
                      step.note
                        ? 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                        : 'border-primary/30 bg-primary/10 text-primary',
                    )}
                  >
                    {i + 1}. {step.label}
                  </span>
                </div>
                {step.detail && (
                  <div
                    className="col-span-full mt-0.5 pl-1 text-[11px] text-muted-foreground"
                    style={{ gridColumn: '1 / -1' }}
                  >
                    {step.detail}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}
