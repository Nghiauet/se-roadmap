import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Compare({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mt-6 grid gap-3 sm:grid-cols-2', className)}>{children}</div>
  );
}

export function Do({
  title = 'Do',
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/[0.06] p-4">
      <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
        {title}
      </div>
      <div className="text-sm leading-relaxed text-foreground/90 [&>*:first-child]:mt-0">{children}</div>
    </div>
  );
}

export function Dont({
  title = "Don't",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-rose-500/30 bg-rose-500/[0.06] p-4">
      <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-rose-600 dark:text-rose-400">
        <X className="h-3.5 w-3.5" aria-hidden="true" />
        {title}
      </div>
      <div className="text-sm leading-relaxed text-foreground/90 [&>*:first-child]:mt-0">{children}</div>
    </div>
  );
}
