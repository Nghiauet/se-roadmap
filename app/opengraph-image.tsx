import { ImageResponse } from 'next/og';
import { CATEGORIES } from '@/lib/categories';
import { CURRICULUM } from '@/lib/curriculum';

export const runtime = 'nodejs';
export const alt = 'SE Roadmap — Backend software engineering learning path';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              color: '#7d8590',
              textTransform: 'uppercase',
            }}
          >
            Software engineering · learning path
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            A backend roadmap you can actually finish.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 16px',
                  borderRadius: 999,
                  border: '1px solid #30363d',
                  fontSize: 18,
                  color: '#c9d1d9',
                }}
              >
                {cat.label}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 22, color: '#7d8590' }}>
              {`${CURRICULUM.length} curated topics · ${CATEGORIES.length} categories`}
            </div>
            <div style={{ fontSize: 22, color: '#58a6ff', fontWeight: 600 }}>
              roadmap.wakeuplate.io.vn
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
