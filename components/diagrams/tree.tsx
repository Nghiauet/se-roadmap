import { cn } from '@/lib/utils';

export type TreeNode = {
  label: string;
  detail?: string;
  children?: TreeNode[];
};

export function Tree({
  nodes,
  caption,
  className,
}: {
  nodes: TreeNode[];
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={cn('mt-6 rounded-xl border bg-card/40 p-5 shadow-sm', className)}>
      <ul className="space-y-1 font-mono text-sm">
        {nodes.map((n, i) => (
          <TreeItem key={i} node={n} depth={0} />
        ))}
      </ul>
      {caption && (
        <figcaption className="mt-3 font-sans text-xs text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}

function TreeItem({ node, depth }: { node: TreeNode; depth: number }) {
  return (
    <li>
      <div
        className="grid grid-cols-[auto_1fr] items-baseline gap-2 rounded px-2 py-1 hover:bg-muted/40"
        style={{ paddingLeft: `${depth * 1.25 + 0.5}rem` }}
      >
        <span className="text-muted-foreground" aria-hidden="true">
          {depth > 0 ? '└─' : '▸'}
        </span>
        <span>
          <span className="font-semibold text-foreground">{node.label}</span>
          {node.detail && (
            <span className="ml-2 font-sans text-xs text-muted-foreground">{node.detail}</span>
          )}
        </span>
      </div>
      {node.children && node.children.length > 0 && (
        <ul className="space-y-1">
          {node.children.map((c, i) => (
            <TreeItem key={i} node={c} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}
