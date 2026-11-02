'use client';

import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

/*
 * One localStorage-backed store per key, shared by every hook instance in the tab.
 *
 * The previous version kept a private useState copy per instance and wrote it back
 * from an effect guarded by an `initialised` ref. The ref flipped to true in the same
 * effect pass, so each instance's first write stored its INITIAL value ({} / []), and
 * every instance that mounted after it read that empty value back. One visit to the
 * homepage (about 50 instances) wiped saved progress and bookmarks. Instances also
 * never saw each other's updates, so the last writer won.
 *
 * Now every instance reads the stored string through useSyncExternalStore; writes go
 * straight to localStorage, are computed from the latest stored value, and notify all
 * instances. Other tabs are covered by the `storage` event. During hydration the
 * server snapshot (nothing stored) is used, so the markup still matches the server
 * HTML and the stored value arrives in the re-render right after hydration.
 */

const listeners = new Map<string, Set<() => void>>();
// Fallback when localStorage throws (privacy mode, quota): keep the value in memory
// so the UI still works for this page, as the old per-instance state did.
const memory = new Map<string, string>();

function readRaw(key: string): string | null {
  if (memory.has(key)) return memory.get(key) ?? null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeRaw(key: string, raw: string): void {
  try {
    window.localStorage.setItem(key, raw);
    memory.delete(key);
  } catch {
    memory.set(key, raw);
  }
  listeners.get(key)?.forEach((notify) => notify());
}

function subscribe(key: string, notify: () => void): () => void {
  let keyListeners = listeners.get(key);
  if (!keyListeners) {
    keyListeners = new Set();
    listeners.set(key, keyListeners);
  }
  keyListeners.add(notify);
  const onStorage = (event: StorageEvent) => {
    // Another tab changed this key (event.key === null: storage was cleared).
    if (event.key === key || event.key === null) notify();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    keyListeners?.delete(notify);
    window.removeEventListener('storage', onStorage);
  };
}

function parse<T>(raw: string | null, fallback: T): T {
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback; // corrupt value: behave as if nothing was stored
  }
}

export function useLocalStorage<T>(key: string, initial: T): [T, SetValue<T>] {
  // Callers pass a fresh literal ({} / []) on every render; keep the first one.
  const [fallback] = useState(initial);
  const subscribeToKey = useCallback((notify: () => void) => subscribe(key, notify), [key]);
  const raw = useSyncExternalStore(
    subscribeToKey,
    () => readRaw(key),
    () => null,
  );
  const value = useMemo(() => parse(raw, fallback), [raw, fallback]);

  const update = useCallback<SetValue<T>>(
    (next) => {
      const prev = parse(readRaw(key), fallback);
      const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
      if (Object.is(resolved, prev)) return;
      writeRaw(key, JSON.stringify(resolved));
    },
    [key, fallback],
  );

  return [value, update];
}
