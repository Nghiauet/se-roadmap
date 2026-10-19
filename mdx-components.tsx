import type { MDXComponents } from 'mdx/types';
import { cn } from '@/lib/utils';

import { Lead } from '@/components/content/lead';
import { Callout } from '@/components/content/callout';
import { KeyTakeaways } from '@/components/content/key-takeaways';
import { Definition, DefinitionList } from '@/components/content/definition';
import { Steps, Step } from '@/components/content/steps';
import { Compare, Do, Dont } from '@/components/content/compare';
import { CodeTabs, CodeTab } from '@/components/content/code-tabs';

import { RequestResponse } from '@/components/diagrams/request-response';
import { SequenceDiagram } from '@/components/diagrams/sequence-diagram';
import { BoxFlow } from '@/components/diagrams/box-flow';
import { LayerStack } from '@/components/diagrams/layer-stack';
import { StatusGrid } from '@/components/diagrams/status-grid';
import { Comparison } from '@/components/diagrams/comparison';
import { Timeline } from '@/components/diagrams/timeline';
import { Tree } from '@/components/diagrams/tree';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          'group mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight first:mt-0',
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          'group mt-8 scroll-mt-24 text-lg font-semibold tracking-tight',
          className,
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={cn('mt-4 leading-7 text-foreground/90 [&:first-child]:mt-0', className)}
        {...props}
      />
    ),
    a: ({ className, ...props }) => (
      <a
        className={cn(
          'font-medium text-primary underline underline-offset-4 hover:no-underline',
          className,
        )}
        target={props.href?.startsWith('http') ? '_blank' : undefined}
        rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      />
    ),
    ul: ({ className, ...props }) => (
      <ul className={cn('mt-4 ml-6 list-disc space-y-2 marker:text-muted-foreground', className)} {...props} />
    ),
    ol: ({ className, ...props }) => (
      <ol className={cn('mt-4 ml-6 list-decimal space-y-2 marker:text-muted-foreground', className)} {...props} />
    ),
    li: ({ className, ...props }) => (
      <li className={cn('leading-7 text-foreground/90', className)} {...props} />
    ),
    strong: ({ className, ...props }) => (
      <strong className={cn('font-semibold text-foreground', className)} {...props} />
    ),
    em: ({ className, ...props }) => (
      <em className={cn('italic', className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          'mt-6 border-l-2 border-primary/40 pl-4 italic text-muted-foreground',
          className,
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn(
          'rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground',
          className,
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          'mt-4 overflow-x-auto rounded-lg border bg-muted/40 p-4 text-sm leading-relaxed',
          className,
        )}
        {...props}
      />
    ),
    hr: ({ className, ...props }) => (
      <hr className={cn('my-10 border-border', className)} {...props} />
    ),
    table: ({ className, ...props }) => (
      <div className="mt-6 w-full overflow-x-auto">
        <table className={cn('w-full text-sm', className)} {...props} />
      </div>
    ),
    thead: (props) => <thead {...props} />,
    th: ({ className, ...props }) => (
      <th
        className={cn(
          'border-b px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground',
          className,
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td className={cn('border-b px-3 py-2 align-top', className)} {...props} />
    ),

    // Global custom components — MDX files use these without importing.
    Lead,
    Callout,
    KeyTakeaways,
    Definition,
    DefinitionList,
    Steps,
    Step,
    Compare,
    Do,
    Dont,
    CodeTabs,
    CodeTab,
    RequestResponse,
    SequenceDiagram,
    BoxFlow,
    LayerStack,
    StatusGrid,
    Comparison,
    Timeline,
    Tree,

    ...components,
  };
}
