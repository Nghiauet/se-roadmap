import { cn } from '@/lib/utils';

export type Layer = {
  name: string;
  detail?: string;
  hint?: string;
};

export function LayerStack({
  layers,
  caption,
  className,
}: {
  layers: Layer[];
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={cn('mt-6 rounded-xl border bg-card/40 p-5 shadow-sm', className)}>
      <div className="space-y-1.5">
        {layers.map((l, i) => {
          const hueStep = 100 - (i * 70) / Math.max(1, layers.length - 1);
          return (
            <div
              key={l.name}
              className="grid grid-cols-[80px_1fr_auto] items-center gap-3 rounded-md border bg-background/60 px-3 py-2"
              style={{
                borderColor: `hsl(var(--primary) / ${Math.max(0.2, hueStep / 200)})`,
              }}
            >
              <span className="text-xs font-medium text-muted-foreground">L{layers.length - i}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{l.name}</p>
                {l.detail && <p className="text-xs text-muted-foreground">{l.detail}</p>}
              </div>
              {l.hint && (
                <span className="rounded bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                  {l.hint}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}
