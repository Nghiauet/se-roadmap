import { cn } from '@/lib/utils';

export function Lead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'mt-2 text-pretty text-lg leading-relaxed text-foreground/90',
        'rounded-lg border-l-2 border-primary/60 bg-primary/[0.04] py-3 pl-4 pr-2',
        className,
      )}
    >
      {children}
    </p>
  );
}
