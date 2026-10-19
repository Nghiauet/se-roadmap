import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md space-y-4 py-16 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        404
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">Topic not found</h1>
      <p className="text-muted-foreground">
        The URL doesn’t match any topic in the roadmap. It may have been renamed.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-primary underline-offset-4 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to the roadmap
      </Link>
    </div>
  );
}
