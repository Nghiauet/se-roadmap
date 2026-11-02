'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Point = { x: number; y: number };

type Props = {
  containerRef: React.RefObject<HTMLElement | null>;
  pairs: [string, string][];
  colorVar: string;
};

export function ConnectorSVG({ containerRef, pairs, colorVar }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();
  const [paths, setPaths] = useState<string[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const compute = () => {
      const rootRect = root.getBoundingClientRect();
      const newPaths: string[] = [];
      for (const [aId, bId] of pairs) {
        const a = root.querySelector<HTMLElement>(`[data-node-id="${aId}"]`);
        const b = root.querySelector<HTMLElement>(`[data-node-id="${bId}"]`);
        if (!a || !b) continue;
        const ra = a.getBoundingClientRect();
        const rb = b.getBoundingClientRect();
        const start: Point = {
          x: ra.left - rootRect.left + ra.width / 2,
          y: ra.top - rootRect.top + ra.height / 2,
        };
        const end: Point = {
          x: rb.left - rootRect.left + rb.width / 2,
          y: rb.top - rootRect.top + rb.height / 2,
        };
        // Cubic bezier with horizontal control points for an organic curve.
        const dx = end.x - start.x;
        const cx1 = start.x + dx * 0.4;
        const cy1 = start.y;
        const cx2 = end.x - dx * 0.4;
        const cy2 = end.y;
        newPaths.push(
          `M ${start.x} ${start.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${end.x} ${end.y}`,
        );
      }
      setPaths(newPaths);
      setSize({ w: rootRect.width, h: rootRect.height });
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(root);
    window.addEventListener('resize', compute);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', compute);
    };
  }, [containerRef, pairs]);

  if (size.w === 0 || size.h === 0) return null;

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      role="presentation"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${size.w} ${size.h}`}
      preserveAspectRatio="none"
      style={{ color: colorVar }}
    >
      <defs>
        <linearGradient id={`stroke-${colorVar}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.65" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <motion.path
          key={`${d}-${i}`}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.45}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray="4 6"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.15 + i * 0.05, ease: 'easeOut' }}
        />
      ))}
    </svg>
  );
}
