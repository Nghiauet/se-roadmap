import { cn } from '@/lib/utils';

export function DefinitionList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <dl className={cn('mt-4 grid gap-3 rounded-lg border bg-card/40 p-4 sm:grid-cols-[160px_1fr]', className)}>
      {children}
    </dl>
  );
}

export function Definition({
  term,
  children,
}: {
  term: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <dt className="text-sm font-semibold text-foreground">{term}</dt>
      <dd className="text-sm leading-relaxed text-muted-foreground">{children}</dd>
    </>
  );
}
