import { CategoryCluster } from './category-cluster';
import { CATEGORIES } from '@/lib/categories';

export function RoadmapCanvas() {
  return (
    <div className="space-y-16">
      {CATEGORIES.map((cat) => (
        <CategoryCluster key={cat.id} categoryId={cat.id} />
      ))}
    </div>
  );
}
