import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function KeyTakeaways({
  items,
  className,
}: {
  items: React.ReactNode[];
  className?: string;
}) {
  return (
    <section
      aria-labelledby="key-takeaways-heading"
      className={cn('mt-10 rounded-xl border bg-card/60 p-6 shadow-sm', className)}
    >
      <h2
        id="key-takeaways-heading"
        className="text-xs font-semibold uppercase tracking-[0.18em] text-primary"
      >
        Key takeaways
      </h2>
      <ul className="mt-3 space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground/90">
            <span
              className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary"
              aria-hidden="true"
            >
              <Check className="h-3 w-3" />
            </span>
            <span className="min-w-0 flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
