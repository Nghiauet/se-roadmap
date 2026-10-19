'use client';

import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './use-local-storage';
import { STORAGE_KEYS } from '@/lib/storage-keys';
import { CURRICULUM } from '@/lib/curriculum';
import type { CategoryId } from '@/lib/categories';

export type ProgressMap = Record<string, boolean>;

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<ProgressMap>(STORAGE_KEYS.progress, {});

  const isComplete = useCallback(
    (slug: string) => Boolean(progress[slug]),
    [progress],
  );

  const toggle = useCallback(
    (slug: string) => {
      setProgress((prev) => ({ ...prev, [slug]: !prev[slug] }));
    },
    [setProgress],
  );

  const set = useCallback(
    (slug: string, value: boolean) => {
      setProgress((prev) => ({ ...prev, [slug]: value }));
    },
    [setProgress],
  );

  const stats = useMemo(() => {
    const total = CURRICULUM.length;
    const done = CURRICULUM.filter((t) => progress[t.slug]).length;
    return { total, done, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
  }, [progress]);

  const categoryStats = useCallback(
    (category: CategoryId) => {
      const topics = CURRICULUM.filter((t) => t.category === category);
      const done = topics.filter((t) => progress[t.slug]).length;
      const total = topics.length;
      return { total, done, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
    },
    [progress],
  );

  return { progress, isComplete, toggle, set, stats, categoryStats };
}
