'use client';

import { Check, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/hooks/use-progress';
import { useHasMounted } from '@/hooks/use-has-mounted';

export function CompleteToggle({ slug }: { slug: string }) {
  const mounted = useHasMounted();
  const { isComplete, toggle } = useProgress();
  const done = mounted && isComplete(slug);

  return (
    <Button
      variant={done ? 'default' : 'outline'}
      size="sm"
      onClick={() => toggle(slug)}
      aria-pressed={done}
    >
      {done ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Circle className="h-4 w-4" aria-hidden="true" />
      )}
      {done ? 'Completed' : 'Mark complete'}
    </Button>
  );
}
