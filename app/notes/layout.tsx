import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Notes you have taken on roadmap topics. Stored locally in your browser.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/notes' },
};

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
