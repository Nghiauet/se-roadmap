'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useNotes } from '@/hooks/use-notes';
import { useHasMounted } from '@/hooks/use-has-mounted';

type SaveStatus = 'idle' | 'saving' | 'saved';

export function NoteEditor({ slug }: { slug: string }) {
  const mounted = useHasMounted();
  const { get, set } = useNotes();
  const stored = mounted ? get(slug) : '';

  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState<SaveStatus>('idle');
  const hydrated = useRef(false);
  const savedTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!mounted || hydrated.current) return;
    setDraft(stored);
    hydrated.current = true;
  }, [mounted, stored]);

  useEffect(() => {
    if (!hydrated.current) return;
    if (draft === stored) return;
    setStatus('saving');
    const t = setTimeout(() => {
      set(slug, draft);
      setStatus('saved');
      if (savedTimer.current) clearTimeout(savedTimer.current);
      savedTimer.current = setTimeout(() => setStatus('idle'), 1200);
    }, 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft, slug]);

  return (
    <div className="space-y-2">
      <Textarea
        id={`note-${slug}`}
        placeholder="Anything you want to remember about this topic — open questions, useful links, your own examples."
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={7}
        disabled={!mounted}
        className="min-h-[150px] resize-y bg-background/60"
      />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Saved locally in your browser.</span>
        <span className="flex h-4 items-center gap-1" aria-live="polite">
          {status === 'saving' && (
            <>
              <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" /> Saving…
            </>
          )}
          {status === 'saved' && (
            <>
              <Check className="h-3 w-3 text-emerald-500" aria-hidden="true" /> Saved
            </>
          )}
        </span>
      </div>
    </div>
  );
}
