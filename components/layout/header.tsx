'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bookmark, NotebookPen, Map, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';

const NAV = [
  { href: '/', label: 'Roadmap', icon: Map },
  { href: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { href: '/notes', label: 'Notes', icon: NotebookPen },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/75 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between gap-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-semibold tracking-tight"
        >
          <Compass className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="hidden sm:inline">SE Roadmap</span>
          <span className="sm:hidden">SE</span>
        </Link>
        <nav className="flex items-center gap-1" aria-label="Primary">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active =
              href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors',
                  'hover:bg-accent hover:text-accent-foreground',
                  active && 'bg-accent text-accent-foreground',
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
