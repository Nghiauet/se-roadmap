'use client';

import { Progress } from '@/components/ui/progress';
import { useProgress } from '@/hooks/use-progress';
import { useHasMounted } from '@/hooks/use-has-mounted';
import { CATEGORIES } from '@/lib/categories';

export function OverallProgress() {
  const mounted = useHasMounted();
  const { stats, categoryStats } = useProgress();
  const percent = mounted ? stats.percent : 0;
  const done = mounted ? stats.done : 0;

  return (
    <section
      aria-labelledby="overall-progress-heading"
      className="rounded-2xl border bg-card/60 p-5 shadow-sm backdrop-blur md:p-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2
            id="overall-progress-heading"
            className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
          >
            Overall progress
          </h2>
          <p className="mt-1 flex items-baseline gap-2 text-3xl font-semibold tracking-tight tabular-nums">
            {percent}
            <span className="text-base font-normal text-muted-foreground">%</span>
          </p>
        </div>
        <p className="text-sm text-muted-foreground tabular-nums">
          <span className="font-medium text-foreground">{done}</span> of {stats.total} topics done
        </p>
      </div>
      <Progress
        className="mt-4 h-2"
        value={percent}
        aria-label="Overall progress"
      />
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3 lg:grid-cols-6">
        {CATEGORIES.map((cat) => {
          const cs = mounted
            ? categoryStats(cat.id)
            : { total: 0, done: 0, percent: 0 };
          return (
            <div key={cat.id} className="flex items-center gap-2 text-xs">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: cat.colorVar }}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1 truncate text-muted-foreground">{cat.short}</span>
              <span className="tabular-nums text-foreground/80">
                {cs.done}/{cs.total}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
