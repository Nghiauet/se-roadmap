import { ArrowRight, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FlowNode = {
  label: string;
  detail?: string;
  tone?: 'default' | 'primary' | 'success' | 'warn' | 'muted';
};

const TONES: Record<NonNullable<FlowNode['tone']>, string> = {
  default: 'border-border bg-background text-foreground',
  primary: 'border-primary/40 bg-primary/10 text-primary',
  success: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  warn: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  muted: 'border-border bg-muted text-muted-foreground',
};

export function BoxFlow({
  nodes,
  direction = 'horizontal',
  caption,
  className,
}: {
  nodes: FlowNode[];
  direction?: 'horizontal' | 'vertical';
  caption?: string;
  className?: string;
}) {
  const Arrow = direction === 'horizontal' ? ArrowRight : ArrowDown;
  return (
    <figure className={cn('mt-6 rounded-xl border bg-card/40 p-5 shadow-sm', className)}>
      <div
        className={cn(
          'flex items-stretch gap-2',
          direction === 'horizontal'
            ? 'flex-col sm:flex-row sm:items-center sm:overflow-x-auto'
            : 'flex-col items-stretch',
        )}
      >
        {nodes.map((n, i) => (
          <div key={i} className="flex items-center justify-center gap-2">
            <div
              className={cn(
                'flex min-w-[110px] flex-1 flex-col rounded-lg border px-3 py-2 text-center text-xs shadow-sm',
                TONES[n.tone ?? 'default'],
                direction === 'horizontal' ? 'sm:min-w-[140px]' : 'min-w-full',
              )}
            >
              <span className="font-semibold leading-snug">{n.label}</span>
              {n.detail && <span className="mt-0.5 text-[10px] opacity-80">{n.detail}</span>}
            </div>
            {i < nodes.length - 1 && (
              <Arrow
                className={cn(
                  'h-4 w-4 shrink-0 text-muted-foreground',
                  direction === 'horizontal'
                    ? 'hidden sm:inline-block'
                    : 'mx-auto rotate-0',
                )}
                aria-hidden="true"
              />
            )}
            {i < nodes.length - 1 && direction === 'horizontal' && (
              <ArrowDown
                className="mx-auto h-4 w-4 shrink-0 text-muted-foreground sm:hidden"
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}
