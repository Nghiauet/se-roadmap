import { ImageResponse } from 'next/og';
import { ALL_SLUGS, getTopic } from '@/lib/curriculum';
import { getCategory } from '@/lib/categories';

export const runtime = 'nodejs';
export const alt = 'SE Roadmap topic';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

const DIFFICULTY = { 1: 'Beginner', 2: 'Intermediate', 3: 'Advanced' } as const;
const TYPE_LABEL = { core: 'Concept', practice: 'Project', read: 'Reading' } as const;

export default function TopicOg({ params }: { params: { slug: string } }) {
  const topic = getTopic(params.slug);
  if (!topic) {
    return new ImageResponse(<div>Not found</div>, { ...size });
  }
  const category = getCategory(topic.category);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background: 'linear-gradient(135deg, #0b0e14 0%, #161b22 100%)',
          color: '#e6edf3',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              color: '#7d8590',
              textTransform: 'uppercase',
            }}
          >
            {`SE Roadmap · ${category.label}`}
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1050,
            }}
          >
            {topic.title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#c9d1d9',
              lineHeight: 1.4,
              maxWidth: 1050,
            }}
          >
            {topic.summary}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                border: '1px solid #30363d',
                fontSize: 20,
                color: '#c9d1d9',
              }}
            >
              {TYPE_LABEL[topic.type]}
            </div>
            <div
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                border: '1px solid #30363d',
                fontSize: 20,
                color: '#c9d1d9',
              }}
            >
              {DIFFICULTY[topic.difficulty]}
            </div>
            <div
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                border: '1px solid #30363d',
                fontSize: 20,
                color: '#c9d1d9',
              }}
            >
              {`~${topic.estMinutes} min`}
            </div>
          </div>
          <div style={{ fontSize: 22, color: '#58a6ff', fontWeight: 600 }}>
            roadmap.wakeuplate.io.vn
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
