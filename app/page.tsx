import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { OverallProgress } from '@/components/layout/overall-progress';
import { RoadmapCanvas } from '@/components/roadmap/roadmap-canvas';
import { CATEGORIES } from '@/lib/categories';
import { CURRICULUM } from '@/lib/curriculum';

const SITE_URL = 'https://roadmap.wakeuplate.io.vn';

const TYPE_COUNTS = {
  core: CURRICULUM.filter((t) => t.type === 'core').length,
  practice: CURRICULUM.filter((t) => t.type === 'practice').length,
  read: CURRICULUM.filter((t) => t.type === 'read').length,
};

const courseJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  '@id': `${SITE_URL}/#course`,
  name: 'SE Roadmap — Backend software engineering learning path',
  description:
    'An opinionated, interactive roadmap for learning backend software engineering: foundations, APIs, design patterns, databases, scalability, distributed systems, and operations.',
  url: SITE_URL,
  inLanguage: 'en',
  educationalLevel: 'Beginner to Advanced',
  learningResourceType: 'Curriculum',
  provider: {
    '@type': 'Person',
    name: 'nghiaph',
    url: SITE_URL,
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: `PT${CURRICULUM.reduce((acc, t) => acc + t.estMinutes, 0)}M`,
  },
  hasPart: CURRICULUM.map((topic, i) => ({
    '@type': 'LearningResource',
    position: i + 1,
    name: topic.title,
    description: topic.summary,
    url: `${SITE_URL}/topic/${topic.slug}`,
    timeRequired: `PT${topic.estMinutes}M`,
  })),
};

export default function HomePage() {
  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <section className="space-y-5">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Software engineering · learning path
        </p>
        <h1 className="text-balance text-[2.25rem] font-semibold leading-[1.05] tracking-tight md:text-[3.25rem]">
          A backend roadmap you can actually finish.
        </h1>
        <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {CURRICULUM.length} curated topics, {CATEGORIES.length} categories, three flavours —
          <span className="font-medium text-foreground"> {TYPE_COUNTS.core} concepts</span> to
          understand,
          <span className="font-medium text-foreground"> {TYPE_COUNTS.practice} projects</span> to
          build, and
          <span className="font-medium text-foreground"> {TYPE_COUNTS.read} books</span> worth
          reading. Bookmark, take notes, and tick things off — your progress lives in your
          browser, no account needed.
        </p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`#${cat.id}`}
              className="group inline-flex items-center gap-1.5 rounded-full border bg-card/60 px-3 py-1 text-xs font-medium text-foreground/80 transition-colors hover:border-[color:var(--chip)] hover:text-foreground"
              style={{ ['--chip' as string]: cat.colorVar }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: cat.colorVar }}
                aria-hidden="true"
              />
              {cat.short}
              <ArrowRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <OverallProgress />

      <RoadmapCanvas />
    </div>
  );
}
