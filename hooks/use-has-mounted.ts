'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * false on the server and while the server HTML is being hydrated, true after.
 *
 * Built on useSyncExternalStore, like useLocalStorage: right after hydration React
 * re-renders every such hook in one pass, so `mounted` turns true in the same render
 * in which the stored values arrive (the old useState + useEffect version turned true
 * one render apart from them). On client-side navigation it is true from the start.
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
