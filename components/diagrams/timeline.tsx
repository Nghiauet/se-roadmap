import { cn } from '@/lib/utils';

export type TimelineEvent = {
  at: string;
  label: string;
  detail?: string;
  tone?: 'default' | 'success' | 'warn' | 'error';
};

const DOT: Record<NonNullable<TimelineEvent['tone']>, string> = {
  default: 'bg-primary',
  success: 'bg-emerald-500',
  warn: 'bg-amber-500',
  error: 'bg-rose-500',
};

export function Timeline({
  events,
  caption,
  className,
}: {
  events: TimelineEvent[];
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={cn('mt-6 rounded-xl border bg-card/40 p-5 shadow-sm', className)}>
      <ol className="relative ml-3 space-y-5 border-l border-border pl-6">
        {events.map((e, i) => (
          <li key={i} className="relative">
            <span
              className={cn(
                'absolute -left-[31px] top-1 grid h-4 w-4 place-items-center rounded-full ring-4 ring-background',
                DOT[e.tone ?? 'default'],
              )}
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                {e.at}
              </span>
              <span className="text-sm font-semibold text-foreground">{e.label}</span>
            </div>
            {e.detail && (
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{e.detail}</p>
            )}
          </li>
        ))}
      </ol>
      {caption && (
        <figcaption className="mt-3 text-xs text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}
