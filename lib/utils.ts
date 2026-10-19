import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function typeLabel(type: 'core' | 'practice' | 'read'): string {
  switch (type) {
    case 'core':
      return 'Must-know concept';
    case 'practice':
      return 'Build something';
    case 'read':
      return 'Recommended resource';
  }
}

export function typeBadgeClass(type: 'core' | 'practice' | 'read'): string {
  switch (type) {
    case 'core':
      return 'bg-primary/10 text-primary border-primary/30';
    case 'practice':
      return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
    case 'read':
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
  }
}
