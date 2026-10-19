import { cn } from '@/lib/utils';

export type ComparisonRow = {
  attribute: string;
  left: React.ReactNode;
  right: React.ReactNode;
};

export function Comparison({
  leftTitle,
  rightTitle,
  rows,
  caption,
  className,
}: {
  leftTitle: string;
  rightTitle: string;
  rows: ComparisonRow[];
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={cn('mt-6 overflow-x-auto rounded-xl border bg-card/40 shadow-sm', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="bg-muted/50 px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Attribute
            </th>
            <th className="bg-muted/30 px-3 py-2 text-left text-sm font-semibold text-foreground">
              {leftTitle}
            </th>
            <th className="bg-muted/30 px-3 py-2 text-left text-sm font-semibold text-foreground">
              {rightTitle}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={cn(i !== rows.length - 1 && 'border-b')}>
              <th
                scope="row"
                className="bg-muted/30 px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
              >
                {r.attribute}
              </th>
              <td className="px-3 py-2 align-top text-sm text-foreground/90">{r.left}</td>
              <td className="px-3 py-2 align-top text-sm text-foreground/90">{r.right}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {caption && (
        <figcaption className="border-t px-3 py-2 text-xs text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}
