import type { LucideIcon } from 'lucide-react';
import {
  Terminal,
  Network,
  Boxes,
  Database,
  Activity,
  Share2,
  Wrench,
} from 'lucide-react';

export type CategoryId =
  | 'foundations'
  | 'api'
  | 'patterns'
  | 'databases'
  | 'scalability'
  | 'distributed'
  | 'production';

export type Category = {
  id: CategoryId;
  label: string;
  short: string;
  description: string;
  icon: LucideIcon;
  colorVar: string;
  order: number;
};

export const CATEGORIES: Category[] = [
  {
    id: 'foundations',
    label: 'Engineering Foundations',
    short: 'Found.',
    description:
      'The everyday base layer: Git, Linux, debugging, complexity, runtimes, and dependency hygiene.',
    icon: Terminal,
    colorVar: 'var(--cat-foundations)',
    order: 1,
  },
  {
    id: 'api',
    label: 'API & Networking',
    short: 'APIs',
    description:
      'The contract between services and the protocols that carry them — HTTP, REST, auth, networking primitives.',
    icon: Network,
    colorVar: 'var(--cat-api)',
    order: 2,
  },
  {
    id: 'patterns',
    label: 'Design Patterns & Principles',
    short: 'Patterns',
    description:
      'Reusable shapes for organising code: creational, structural, behavioural, and the SOLID principles.',
    icon: Boxes,
    colorVar: 'var(--cat-patterns)',
    order: 3,
  },
  {
    id: 'databases',
    label: 'Databases',
    short: 'Data',
    description:
      'How data is modelled, stored, indexed, cached and kept consistent under pressure.',
    icon: Database,
    colorVar: 'var(--cat-databases)',
    order: 4,
  },
  {
    id: 'scalability',
    label: 'Scalability & Resilience',
    short: 'Scale',
    description:
      'Keeping systems fast and standing under load: scaling, queues, fault tolerance, the CAP triangle.',
    icon: Activity,
    colorVar: 'var(--cat-scalability)',
    order: 5,
  },
  {
    id: 'distributed',
    label: 'Distributed Systems',
    short: 'Distrib.',
    description:
      'Shapes of large architectures: monoliths, microservices, events, gateways, and classic design exercises.',
    icon: Share2,
    colorVar: 'var(--cat-distributed)',
    order: 6,
  },
  {
    id: 'production',
    label: 'Production & Operations',
    short: 'Ops',
    description:
      'Everything that surrounds the code in real life: observability, deploys, containers, migrations, docs.',
    icon: Wrench,
    colorVar: 'var(--cat-production)',
    order: 7,
  },
];

export function getCategory(id: CategoryId): Category {
  const cat = CATEGORIES.find((c) => c.id === id);
  if (!cat) throw new Error(`Unknown category: ${id}`);
  return cat;
}
