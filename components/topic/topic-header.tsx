import Link from 'next/link';
import { ChevronRight, Clock, BarChart2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getCategory } from '@/lib/categories';
import type { Topic } from '@/lib/curriculum';
import { cn, typeBadgeClass, typeLabel } from '@/lib/utils';

function difficultyLabel(d: 1 | 2 | 3) {
  return d === 1 ? 'Beginner' : d === 2 ? 'Intermediate' : 'Advanced';
}

function formatMinutes(m: number) {
  if (m < 60) return `${m} min`;
  const hours = Math.round((m / 60) * 10) / 10;
  return `${hours} h`;
}

export function TopicHeader({ topic }: { topic: Topic }) {
  const category = getCategory(topic.category);
  const CatIcon = category.icon;
  return (
    <div className="space-y-4">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Roadmap
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link
          href={`/#${category.id}`}
          className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <CatIcon className="h-3 w-3" aria-hidden="true" />
          {category.label}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-foreground">{topic.title}</span>
      </nav>

      <h1 className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-tight md:text-[2.5rem]">
        {topic.title}
      </h1>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className={cn('border', typeBadgeClass(topic.type))}>
          {typeLabel(topic.type)}
        </Badge>
        <Badge variant="muted" className="inline-flex items-center gap-1">
          <Clock className="h-3 w-3" aria-hidden="true" />
          {formatMinutes(topic.estMinutes)}
        </Badge>
        <Badge variant="muted" className="inline-flex items-center gap-1">
          <BarChart2 className="h-3 w-3" aria-hidden="true" />
          {difficultyLabel(topic.difficulty)}
        </Badge>
      </div>

      <p className="max-w-3xl text-balance text-lg text-muted-foreground">{topic.summary}</p>
    </div>
  );
}
