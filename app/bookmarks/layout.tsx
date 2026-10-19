import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bookmarks',
  description: 'Topics you have bookmarked. Stored locally in your browser.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/bookmarks' },
};

export default function BookmarksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
