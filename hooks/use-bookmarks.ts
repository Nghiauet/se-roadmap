'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';
import { STORAGE_KEYS } from '@/lib/storage-keys';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>(STORAGE_KEYS.bookmarks, []);

  const isBookmarked = useCallback(
    (slug: string) => bookmarks.includes(slug),
    [bookmarks],
  );

  const toggle = useCallback(
    (slug: string) => {
      setBookmarks((prev) =>
        prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
      );
    },
    [setBookmarks],
  );

  const remove = useCallback(
    (slug: string) => {
      setBookmarks((prev) => prev.filter((s) => s !== slug));
    },
    [setBookmarks],
  );

  return { bookmarks, isBookmarked, toggle, remove };
}
