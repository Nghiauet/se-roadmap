'use client';

import { Children, isValidElement, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Lang = 'ts' | 'python';

const STORAGE_KEY = 'se-roadmap:code-lang';
const EVENT = 'se-roadmap:code-lang-change';

const LABEL: Record<Lang, string> = {
  ts: 'TypeScript',
  python: 'Python',
};

// localStorage access throws (SecurityError) when the browser blocks site data.
// Uncaught in the effect below, that replaced the whole lesson with Next's
// "Application error" screen on the 16 pages that use <CodeTabs>.
function readLang(): Lang {
  if (typeof window === 'undefined') return 'ts';
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'python' ? 'python' : 'ts';
  } catch {
    return 'ts';
  }
}

function useSharedLang(): [Lang, (next: Lang) => void] {
  const [lang, setLang] = useState<Lang>('ts');

  useEffect(() => {
    setLang(readLang());
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<Lang>).detail;
      if (detail === 'ts' || detail === 'python') setLang(detail);
    };
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
  }, []);

  const update = (next: Lang) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // not remembered across visits, but the switch still works on this page
    }
    window.dispatchEvent(new CustomEvent<Lang>(EVENT, { detail: next }));
  };

  return [lang, update];
}

export function CodeTabs({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useSharedLang();
  const tabs = Children.toArray(children).filter(
    (child): child is React.ReactElement<{ lang: Lang; children: React.ReactNode }> =>
      isValidElement(child),
  );

  if (tabs.length === 0) return null;

  const available = tabs.map((tab) => tab.props.lang);
  const active = available.includes(lang) ? lang : available[0];

  return (
    <div className="mt-4 overflow-hidden rounded-lg border bg-muted/40">
      <div role="tablist" className="flex border-b bg-muted/60 text-xs font-medium">
        {tabs.map((tab) => {
          const tabLang = tab.props.lang;
          const isActive = tabLang === active;
          return (
            <button
              key={tabLang}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setLang(tabLang)}
              className={cn(
                'px-3 py-1.5 transition-colors',
                isActive
                  ? 'bg-background text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {LABEL[tabLang]}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.props.lang}
          role="tabpanel"
          hidden={tab.props.lang !== active}
          className="[&>pre]:mt-0 [&>pre]:rounded-none [&>pre]:border-0"
        >
          {tab.props.children}
        </div>
      ))}
    </div>
  );
}

export function CodeTab({ children }: { lang: Lang; children: React.ReactNode }) {
  return <>{children}</>;
}
