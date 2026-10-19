import { Info, AlertTriangle, Lightbulb, FlaskConical } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tone = 'info' | 'warn' | 'tip' | 'example';

const TONES: Record<
  Tone,
  { icon: LucideIcon; label: string; ring: string; bg: string; iconClass: string }
> = {
  info: {
    icon: Info,
    label: 'Note',
    ring: 'border-sky-500/30',
    bg: 'bg-sky-500/[0.06]',
    iconClass: 'text-sky-500',
  },
  warn: {
    icon: AlertTriangle,
    label: 'Watch out',
    ring: 'border-amber-500/30',
    bg: 'bg-amber-500/[0.06]',
    iconClass: 'text-amber-500',
  },
  tip: {
    icon: Lightbulb,
    label: 'Tip',
    ring: 'border-emerald-500/30',
    bg: 'bg-emerald-500/[0.06]',
    iconClass: 'text-emerald-500',
  },
  example: {
    icon: FlaskConical,
    label: 'Example',
    ring: 'border-violet-500/30',
    bg: 'bg-violet-500/[0.06]',
    iconClass: 'text-violet-500',
  },
};

export function Callout({
  tone = 'info',
  title,
  children,
  className,
}: {
  tone?: Tone;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const t = TONES[tone];
  const Icon = t.icon;
  return (
    <aside
      className={cn(
        'mt-6 flex gap-3 rounded-lg border p-4',
        t.ring,
        t.bg,
        className,
      )}
    >
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', t.iconClass)} aria-hidden="true" />
      <div className="min-w-0 flex-1 [&>*:first-child]:mt-0">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {title ?? t.label}
        </p>
        {children}
      </div>
    </aside>
  );
}
