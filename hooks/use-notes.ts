'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';
import { STORAGE_KEYS } from '@/lib/storage-keys';

export type NotesMap = Record<string, string>;

export function useNotes() {
  const [notes, setNotes] = useLocalStorage<NotesMap>(STORAGE_KEYS.notes, {});

  const get = useCallback((slug: string) => notes[slug] ?? '', [notes]);

  const set = useCallback(
    (slug: string, text: string) => {
      setNotes((prev) => {
        if (text.trim() === '') {
          if (!(slug in prev)) return prev;
          const next = { ...prev };
          delete next[slug];
          return next;
        }
        return { ...prev, [slug]: text };
      });
    },
    [setNotes],
  );

  const entries = useCallback(
    () =>
      Object.entries(notes)
        .filter(([, text]) => text.trim() !== '')
        .map(([slug, text]) => ({ slug, text })),
    [notes],
  );

  return { notes, get, set, entries };
}
