'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useHasMounted } from '@/hooks/use-has-mounted';

export function ThemeToggle() {
  const mounted = useHasMounted();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const current = mounted ? resolvedTheme ?? theme : undefined;

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
    >
      {mounted && current === 'dark' ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </Button>
  );
}
