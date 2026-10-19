'use client';

import Link from 'next/link';
import { NotebookPen, ArrowRight } from 'lucide-react';
import { useNotes } from '@/hooks/use-notes';
import { useHasMounted } from '@/hooks/use-has-mounted';
import { getTopic } from '@/lib/curriculum';
import { getCategory } from '@/lib/categories';
import { Card, CardContent } from '@/components/ui/card';

export default function NotesPage() {
  const mounted = useHasMounted();
  const { entries } = useNotes();
  const list = mounted ? entries() : [];

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Your notes
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Notes</h1>
        <p className="max-w-2xl text-muted-foreground">
          Everything you have written so far, in one place. Notes live in your browser only —
          clearing browser data will remove them.
        </p>
      </header>

      {!mounted ? (
        <Card>
          <CardContent className="p-8 text-sm text-muted-foreground">Loading…</CardContent>
        </Card>
      ) : list.length === 0 ? (
        <Card>
          <CardContent className="space-y-3 p-10 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
              <NotebookPen className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="font-medium">No notes yet</p>
            <p className="text-sm text-muted-foreground">
              Each topic page has a notes area. Anything you write there shows up here.
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
        <ul className="space-y-3">
          {list.map(({ slug, text }) => {
            const topic = getTopic(slug);
            if (!topic) return null;
            const category = getCategory(topic.category);
            return (
              <li key={slug}>
                <Link
                  href={`/topic/${slug}`}
                  className="group block rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: category.colorVar }}
                      aria-hidden="true"
                    />
                    {category.label}
                  </div>
                  <h2 className="text-base font-semibold leading-snug">{topic.title}</h2>
                  <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-sm text-muted-foreground">
                    {text}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
