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

  // null until the visitor types. Until then the box shows the stored note itself, so
  // it is right whichever render the saved note arrives in after hydration. (Copying
  // it into the draft from an effect relied on that timing: had the copy run before
  // the note arrived, the box would show empty and the next keystroke would replace
  // the saved note.) Only typing saves.
  const [draft, setDraft] = useState<string | null>(null);
  const [status, setStatus] = useState<SaveStatus>('idle');
  const savedTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (draft === null) return;
    const t = setTimeout(() => {
      set(slug, draft);
      setStatus('saved');
      if (savedTimer.current) clearTimeout(savedTimer.current);
      savedTimer.current = setTimeout(() => setStatus('idle'), 1200);
    }, 500);
    return () => clearTimeout(t);
  }, [draft, slug, set]);

  return (
    <div className="space-y-2">
      <Textarea
        id={`note-${slug}`}
        placeholder="Anything you want to remember about this topic — open questions, useful links, your own examples."
        value={draft ?? stored}
        onChange={(e) => {
          setDraft(e.target.value);
          setStatus('saving');
        }}
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
