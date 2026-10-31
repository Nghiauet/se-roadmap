import { cn } from '@/lib/utils';

// A <div>, not a <p>: MDX wraps multi-line <Lead> text in its own <p>, and a
// <p> inside a <p> is invalid HTML. The browser split them apart while parsing
// the server HTML, so React's hydration failed (errors #418/#423) on every
// topic page and the whole page was re-rendered on the client.
export function Lead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mt-2 text-pretty text-lg leading-relaxed text-foreground/90',
        'rounded-lg border-l-2 border-primary/60 bg-primary/[0.04] py-3 pl-4 pr-2',
        className,
      )}
    >
      {children}
    </div>
  );
}
