import { cn } from '@/lib/utils';

export type StatusItem = {
  code: string;
  label: string;
  detail?: string;
  tone?: 'info' | 'success' | 'warn' | 'error' | 'muted';
};

const TONES: Record<NonNullable<StatusItem['tone']>, string> = {
  info: 'border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300',
  success: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  warn: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  error: 'border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300',
  muted: 'border-border bg-muted text-muted-foreground',
};

export function StatusGrid({
  items,
  caption,
  className,
}: {
  items: StatusItem[];
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={cn('mt-6', className)}>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <li
            key={it.code}
            className={cn(
              'rounded-lg border p-3 text-sm shadow-sm',
              TONES[it.tone ?? 'muted'],
            )}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-base font-semibold">{it.code}</span>
              <span className="text-xs font-medium uppercase tracking-wide opacity-80">
                {it.label}
              </span>
            </div>
            {it.detail && <p className="mt-1 text-xs leading-relaxed opacity-90">{it.detail}</p>}
          </li>
        ))}
      </ul>
      {caption && (
        <figcaption className="mt-3 text-xs text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}
