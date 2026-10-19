import { cn } from '@/lib/utils';
import { Children } from 'react';

export function Steps({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const items = Children.toArray(children);
  return (
    <ol className={cn('mt-6 space-y-4', className)}>
      {items.map((child, i) => (
        <li
          key={i}
          className="relative flex gap-4 rounded-lg border bg-card/60 p-4 shadow-sm"
        >
          <span
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <div className="min-w-0 flex-1 [&>*:first-child]:mt-0">{child}</div>
        </li>
      ))}
    </ol>
  );
}

export function Step({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {title && <p className="font-semibold text-foreground">{title}</p>}
      <div className="text-sm leading-relaxed text-foreground/90">{children}</div>
    </div>
  );
}
