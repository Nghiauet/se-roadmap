'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

export function useLocalStorage<T>(key: string, initial: T): [T, SetValue<T>] {
  const [value, setValue] = useState<T>(initial);
  const initialised = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        setValue(JSON.parse(raw) as T);
      }
    } catch {
      // Corrupt or unavailable localStorage — keep the in-memory initial value.
    } finally {
      initialised.current = true;
    }
  }, [key]);

  useEffect(() => {
    if (!initialised.current) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Quota or privacy mode — silently ignore.
    }
  }, [key, value]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key || event.newValue === null) return;
      try {
        setValue(JSON.parse(event.newValue) as T);
      } catch {
        // Ignore malformed cross-tab updates.
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key]);

  const update = useCallback<SetValue<T>>(
    (next) => {
      setValue((prev) => (typeof next === 'function' ? (next as (p: T) => T)(prev) : next));
    },
    [],
  );

  return [value, update];
}
