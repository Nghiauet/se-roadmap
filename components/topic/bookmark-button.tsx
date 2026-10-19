'use client';

import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { useHasMounted } from '@/hooks/use-has-mounted';

export function BookmarkButton({ slug }: { slug: string }) {
  const mounted = useHasMounted();
  const { isBookmarked, toggle } = useBookmarks();
  const active = mounted && isBookmarked(slug);

  return (
    <Button
      variant={active ? 'default' : 'outline'}
      size="sm"
      onClick={() => toggle(slug)}
      aria-pressed={active}
      aria-label={active ? 'Remove bookmark' : 'Add bookmark'}
    >
      {active ? (
        <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Bookmark className="h-4 w-4" aria-hidden="true" />
      )}
      {active ? 'Bookmarked' : 'Bookmark'}
    </Button>
  );
}
