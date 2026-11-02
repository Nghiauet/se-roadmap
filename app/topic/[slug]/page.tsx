import fs from 'node:fs';
import path from 'node:path';

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { ALL_SLUGS, CURRICULUM, getTopic, type Topic } from '@/lib/curriculum';
import { getCategory } from '@/lib/categories';
import { getCheckpointQuestions } from '@/lib/checkpoint-questions';
import { TOPIC_CONTENT } from '@/content/topics';
import { TopicHeader } from '@/components/topic/topic-header';
import { ResourceList } from '@/components/topic/resource-list';
import { CheckpointQuestions } from '@/components/topic/checkpoint-questions';
import { BookmarkButton } from '@/components/topic/bookmark-button';
import { CompleteToggle } from '@/components/topic/complete-toggle';
import { CopyContentButton } from '@/components/topic/copy-content-button';
import { NoteEditor } from '@/components/topic/note-editor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

// Every topic is pre-rendered. Without this, any /topic/<random> request was
// rendered on demand and its 404 page cached to disk (.html + .rsc + .meta,
// ~23 KB per unique URL, in a directory the container user can write), so a
// crawler or attacker could grow the container's disk without limit.
export const dynamicParams = false;

const SITE_URL = 'https://roadmap.wakeuplate.io.vn';

const DIFFICULTY_LABEL = { 1: 'Beginner', 2: 'Intermediate', 3: 'Advanced' } as const;

const TYPE_LABEL = { core: 'Core lesson', practice: 'Practice', read: 'Reading' } as const;

function readRawMdx(slug: string): string | null {
  const filePath = path.join(process.cwd(), 'content', 'topics', `${slug}.mdx`);
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

function buildCopyPayload(topic: Topic, categoryLabel: string, rawMdx: string | null): string {
  const lines: string[] = [];
  lines.push(`# ${topic.title}`);
  lines.push('');
  lines.push(`> ${topic.summary}`);
  lines.push('');
  lines.push(`- Category: ${categoryLabel}`);
  lines.push(`- Type: ${TYPE_LABEL[topic.type]}`);
  lines.push(`- Difficulty: ${DIFFICULTY_LABEL[topic.difficulty]}`);
  lines.push(`- Estimated time: ${topic.estMinutes} minutes`);
  lines.push(`- Source: ${SITE_URL}/topic/${topic.slug}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  if (rawMdx && rawMdx.trim().length > 0) {
    lines.push('## Lesson');
    lines.push('');
    lines.push(rawMdx.trim());
    lines.push('');
  } else {
    lines.push('## Lesson');
    lines.push('');
    lines.push('_(Long-form lesson not yet written for this topic. See references below.)_');
    lines.push('');
  }
  if (topic.resources.length > 0) {
    lines.push('---');
    lines.push('');
    lines.push('## References');
    lines.push('');
    for (const r of topic.resources) {
      lines.push(`- [${r.label}](${r.url})`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const topic = getTopic(params.slug);
  if (!topic) return {};

  const category = getCategory(topic.category);
  const canonical = `/topic/${topic.slug}`;
  const title = `${topic.title}`;
  const description = topic.summary;

  const keywords = [
    topic.title.toLowerCase(),
    category.label.toLowerCase(),
    'backend',
    'software engineering',
    'learning path',
    'roadmap',
    DIFFICULTY_LABEL[topic.difficulty].toLowerCase(),
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}${canonical}`,
      title: `${topic.title} — SE Roadmap`,
      description,
      siteName: 'SE Roadmap',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${topic.title} — SE Roadmap`,
      description,
    },
  };
}

export default async function TopicPage(props: Params) {
  const params = await props.params;
  const topic = getTopic(params.slug);
  if (!topic) notFound();

  const Content = TOPIC_CONTENT[topic.slug];
  const checkpointQuestions = getCheckpointQuestions(topic.slug);
  const category = getCategory(topic.category);
  const copyPayload = buildCopyPayload(topic, category.label, readRawMdx(topic.slug));

  const index = CURRICULUM.findIndex((t) => t.slug === topic.slug);
  const prev = index > 0 ? CURRICULUM[index - 1] : undefined;
  const next = index >= 0 && index < CURRICULUM.length - 1 ? CURRICULUM[index + 1] : undefined;

  const topicUrl = `${SITE_URL}/topic/${topic.slug}`;

  const learningResourceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    '@id': `${topicUrl}#learning-resource`,
    name: topic.title,
    description: topic.summary,
    url: topicUrl,
    inLanguage: 'en',
    learningResourceType:
      topic.type === 'practice'
        ? 'Project'
        : topic.type === 'read'
          ? 'Reading'
          : 'Lesson',
    educationalLevel: DIFFICULTY_LABEL[topic.difficulty],
    timeRequired: `PT${topic.estMinutes}M`,
    about: {
      '@type': 'Thing',
      name: category.label,
    },
    isPartOf: {
      '@type': 'Course',
      name: 'SE Roadmap — Backend software engineering learning path',
      url: SITE_URL,
    },
    author: {
      '@type': 'Person',
      name: 'nghiaph',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category.label,
        item: `${SITE_URL}/#${category.id}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: topic.title,
        item: topicUrl,
      },
    ],
  };

  return (
    <article className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="space-y-10">
        <TopicHeader topic={topic} />

        <div className="topic-prose max-w-3xl">
          {Content ? (
            <Content />
          ) : (
            <p className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
              Content for this topic is being written. The references below are a good starting
              point in the meantime.
            </p>
          )}
        </div>

        <CheckpointQuestions questions={checkpointQuestions} />

        <section aria-labelledby="topic-references" className="max-w-3xl space-y-3">
          <h2
            id="topic-references"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            References
          </h2>
          <p className="text-sm text-muted-foreground">
            External resources for going deeper after the lesson above.
          </p>
          <ResourceList resources={topic.resources} />
        </section>

        <nav
          aria-label="Topic navigation"
          className="flex flex-col items-stretch gap-3 border-t pt-6 sm:flex-row sm:justify-between"
        >
          {prev ? (
            <Link
              href={`/topic/${prev.slug}`}
              className="group flex flex-1 items-center gap-3 rounded-lg border p-3 text-sm hover:bg-accent"
            >
              <ArrowLeft
                className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              <span className="flex flex-col text-left">
                <span className="text-xs text-muted-foreground">Previous</span>
                <span className="font-medium">{prev.title}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/topic/${next.slug}`}
              className="group flex flex-1 items-center justify-end gap-3 rounded-lg border p-3 text-sm hover:bg-accent"
            >
              <span className="flex flex-col text-right">
                <span className="text-xs text-muted-foreground">Next</span>
                <span className="font-medium">{next.title}</span>
              </span>
              <ArrowRight
                className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <CompleteToggle slug={topic.slug} />
            <BookmarkButton slug={topic.slug} />
            <CopyContentButton payload={copyPayload} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NoteEditor slug={topic.slug} />
          </CardContent>
        </Card>
      </aside>
    </article>
  );
}
