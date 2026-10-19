import { ExternalLink } from 'lucide-react';
import type { Resource } from '@/lib/curriculum';

export function ResourceList({ resources }: { resources: Resource[] }) {
  if (resources.length === 0) return null;
  return (
    <ul className="space-y-2">
      {resources.map((r) => (
        <li key={r.url}>
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-primary underline-offset-4 hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5 opacity-70 transition-opacity group-hover:opacity-100" aria-hidden="true" />
            {r.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
