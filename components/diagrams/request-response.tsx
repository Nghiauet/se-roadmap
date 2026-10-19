import { cn } from '@/lib/utils';

type Line = { label: string; detail?: string };

export function RequestResponse({
  client = 'Client',
  server = 'Server',
  request,
  response,
  className,
}: {
  client?: string;
  server?: string;
  request: Line | Line[];
  response: Line | Line[];
  className?: string;
}) {
  const reqLines = Array.isArray(request) ? request : [request];
  const resLines = Array.isArray(response) ? response : [response];
  return (
    <figure
      className={cn(
        'mt-6 rounded-xl border bg-card/40 p-5 shadow-sm',
        className,
      )}
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-stretch gap-4">
        <Endpoint label={client} />
        <div className="flex flex-col justify-center gap-4 py-2">
          {reqLines.map((l, i) => (
            <Arrow key={`req-${i}`} dir="right" label={l.label} detail={l.detail} tone="primary" />
          ))}
          {resLines.map((l, i) => (
            <Arrow key={`res-${i}`} dir="left" label={l.label} detail={l.detail} tone="muted" />
          ))}
        </div>
        <Endpoint label={server} />
      </div>
    </figure>
  );
}

function Endpoint({ label }: { label: string }) {
  return (
    <div className="grid w-24 place-items-center rounded-lg border bg-background px-3 py-4 text-center text-xs font-medium text-foreground sm:w-28">
      <span className="break-words leading-snug">{label}</span>
    </div>
  );
}

function Arrow({
  dir,
  label,
  detail,
  tone,
}: {
  dir: 'left' | 'right';
  label: string;
  detail?: string;
  tone: 'primary' | 'muted';
}) {
  const lineColor =
    tone === 'primary' ? 'bg-primary/55' : 'bg-muted-foreground/40';
  const triColor =
    tone === 'primary' ? 'text-primary' : 'text-muted-foreground/70';
  const labelClass =
    tone === 'primary'
      ? 'border-primary/30 bg-primary/10 text-primary'
      : 'border-border bg-muted text-muted-foreground';

  return (
    <div className="relative flex h-9 items-center">
      {/* full-width line behind the label */}
      <span
        className={cn('absolute left-0 right-0 top-1/2 h-px -translate-y-1/2', lineColor)}
        aria-hidden="true"
      />
      {/* arrow head */}
      <span
        className={cn(
          'absolute top-1/2 -translate-y-1/2 text-[10px] leading-none',
          triColor,
          dir === 'right' ? 'right-0' : 'left-0',
        )}
        aria-hidden="true"
      >
        {dir === 'right' ? '▶' : '◀'}
      </span>
      {/* centered label pill, sitting on the line */}
      <div className="relative z-10 mx-auto flex max-w-[80%] flex-col items-center">
        <span
          className={cn(
            'rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium tracking-tight shadow-sm',
            labelClass,
          )}
        >
          {label}
        </span>
        {detail && (
          <span className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
            {detail}
          </span>
        )}
      </div>
    </div>
  );
}
