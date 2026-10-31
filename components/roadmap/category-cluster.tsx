'use client';

import { useRef } from 'react';
import { Progress } from '@/components/ui/progress';
import { TopicNode } from './topic-node';
import { ConnectorSVG } from './connector-svg';
import { useProgress } from '@/hooks/use-progress';
import { useHasMounted } from '@/hooks/use-has-mounted';
import { topicsByCategory } from '@/lib/curriculum';
import { getCategory, type CategoryId } from '@/lib/categories';

export function CategoryCluster({ categoryId }: { categoryId: CategoryId }) {
  const category = getCategory(categoryId);
  const containerRef = useRef<HTMLDivElement>(null);
  const mounted = useHasMounted();
  const { categoryStats } = useProgress();
  const topics = topicsByCategory(category.id);
  const stats = mounted
    ? categoryStats(category.id)
    : { total: topics.length, done: 0, percent: 0 };

  const pairs: [string, string][] = [];
  for (let i = 0; i < topics.length - 1; i++) {
    pairs.push([`${category.id}-${i}`, `${category.id}-${i + 1}`]);
  }
  // Extra "branch" connectors to make it feel less linear.
  if (topics.length >= 4) pairs.push([`${category.id}-0`, `${category.id}-3`]);
  if (topics.length >= 6) pairs.push([`${category.id}-2`, `${category.id}-5`]);

  const Icon = category.icon;

  return (
    <section
      id={category.id}
      aria-labelledby={`cat-${category.id}-heading`}
      className="relative scroll-mt-24"
    >
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border"
            style={{
              backgroundColor: `color-mix(in oklab, ${category.colorVar} 12%, transparent)`,
              borderColor: `color-mix(in oklab, ${category.colorVar} 35%, transparent)`,
              color: category.colorVar,
            }}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2
              id={`cat-${category.id}-heading`}
              className="text-xl font-semibold tracking-tight"
            >
              {category.label}
            </h2>
            <p className="mt-0.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {category.description}
            </p>
          </div>
        </div>
        <div className="flex w-full max-w-[220px] flex-col gap-1.5 sm:items-end">
          <div className="flex items-center gap-2 text-xs tabular-nums text-muted-foreground">
            <span className="font-medium text-foreground">{stats.done}</span>
            <span>/{stats.total}</span>
            <span className="opacity-50">·</span>
            <span>{stats.percent}%</span>
          </div>
          <Progress
            value={stats.percent}
            aria-label={`${category.label} progress`}
            className="h-1.5 w-full"
            indicatorClassName="transition-all"
            style={{
              ['--indicator-color' as string]: category.colorVar,
            }}
          />
        </div>
      </header>

      <div
        ref={containerRef}
        className="relative grid gap-4 sm:grid-cols-2 md:grid-cols-3"
      >
        <ConnectorSVG containerRef={containerRef} pairs={pairs} colorVar={category.colorVar} />
        {topics.map((topic, idx) => (
          <TopicNode
            key={topic.slug}
            topic={topic}
            category={category}
            nodeId={`${category.id}-${idx}`}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
}
