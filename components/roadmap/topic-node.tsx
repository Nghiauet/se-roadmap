'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Bookmark, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { useProgress } from '@/hooks/use-progress';
import { useHasMounted } from '@/hooks/use-has-mounted';
import type { Topic } from '@/lib/curriculum';
import type { Category } from '@/lib/categories';

const TYPE_LABEL: Record<Topic['type'], string> = {
  core: 'Concept',
  practice: 'Build',
  read: 'Read',
};

const TYPE_DOT: Record<Topic['type'], string> = {
  core: 'bg-primary',
  practice: 'bg-emerald-500',
  read: 'bg-amber-500',
};

type Props = {
  topic: Topic;
  category: Category;
  nodeId: string;
  index: number;
};

export function TopicNode({ topic, category, nodeId, index }: Props) {
  const mounted = useHasMounted();
  const reduce = useReducedMotion();
  const { isBookmarked } = useBookmarks();
  const { isComplete } = useProgress();

  const bookmarked = mounted && isBookmarked(topic.slug);
  const done = mounted && isComplete(topic.slug);

  return (
    <motion.div
      data-node-id={nodeId}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: 'easeOut' }}
      className="relative"
    >
      <Link
        href={`/topic/${topic.slug}`}
        className={cn(
          'group relative flex h-full flex-col gap-2 rounded-xl border bg-card/80 p-4 shadow-sm backdrop-blur transition-all',
          'hover:-translate-y-0.5 hover:border-[color:var(--node-accent)] hover:shadow-md',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--node-accent)]',
          done && 'border-[color:var(--node-accent)]/60 bg-[color:var(--node-accent)]/5',
        )}
        style={{ ['--node-accent' as string]: category.colorVar }}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            <span
              className={cn('h-1.5 w-1.5 rounded-full', TYPE_DOT[topic.type])}
              aria-hidden="true"
            />
            <span>{TYPE_LABEL[topic.type]}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {bookmarked && (
              <Bookmark
                className="h-3.5 w-3.5 fill-amber-500 text-amber-500"
                aria-label="Bookmarked"
              />
            )}
            {done && (
              <span
                className="grid h-5 w-5 place-items-center rounded-full"
                style={{ backgroundColor: 'var(--node-accent)' }}
                aria-label="Completed"
              >
                <Check className="h-3 w-3 text-background" aria-hidden="true" />
              </span>
            )}
          </div>
        </div>
        <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-foreground">
          {topic.title}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {topic.summary}
        </p>
      </Link>
    </motion.div>
  );
}
