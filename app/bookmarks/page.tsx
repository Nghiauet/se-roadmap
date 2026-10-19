'use client';

import Link from 'next/link';
import { Bookmark, ArrowRight } from 'lucide-react';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { useHasMounted } from '@/hooks/use-has-mounted';
import { CURRICULUM } from '@/lib/curriculum';
import { getCategory } from '@/lib/categories';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, typeBadgeClass } from '@/lib/utils';

export default function BookmarksPage() {
  const mounted = useHasMounted();
  const { bookmarks } = useBookmarks();

  const topics = mounted
    ? CURRICULUM.filter((t) => bookmarks.includes(t.slug))
    : [];

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Your collection
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Bookmarks</h1>
        <p className="max-w-2xl text-muted-foreground">
          Topics you have saved to come back to. Click any bookmark icon on a topic to add or
          remove it here.
        </p>
      </header>

      {!mounted ? (
        <Card>
          <CardContent className="p-8 text-sm text-muted-foreground">Loading…</CardContent>
        </Card>
      ) : topics.length === 0 ? (
        <Card>
          <CardContent className="space-y-3 p-10 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
              <Bookmark className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="font-medium">No bookmarks yet</p>
            <p className="text-sm text-muted-foreground">
              Open any topic and click the bookmark button to save it for later.
            </p>
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-sm text-primary underline-offset-4 hover:underline"
              >
                Back to the roadmap <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {topics.map((t) => {
            const category = getCategory(t.category);
            return (
              <li key={t.slug}>
                <Link
                  href={`/topic/${t.slug}`}
                  className="group flex h-full flex-col gap-2 rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{ ['--accent' as string]: category.colorVar }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: 'var(--accent)' }}
                        aria-hidden="true"
                      />
                      {category.label}
                    </span>
                    <Badge variant="outline" className={cn('border', typeBadgeClass(t.type))}>
                      {t.type}
                    </Badge>
                  </div>
                  <h2 className="text-sm font-semibold leading-snug">{t.title}</h2>
                  <p className="line-clamp-2 text-xs text-muted-foreground">{t.summary}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
