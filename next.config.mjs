import createMDX from '@next/mdx';

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: { dark: 'github-dark-dimmed', light: 'github-light' },
  keepBackground: false,
  defaultLang: 'plaintext',
};

// Plugins are given by package name, not imported: Next 16 builds with Turbopack,
// which can only pass plain, serializable loader options to the MDX loader
// (imported plugin functions fail the build with "does not have serializable options").
const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [
      'rehype-slug',
      [
        'rehype-autolink-headings',
        {
          behavior: 'append',
          properties: {
            className: ['heading-anchor'],
            ariaLabel: 'Link to section',
            tabIndex: -1,
          },
        },
      ],
      ['rehype-pretty-code', prettyCodeOptions],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
  },
};

export default withMDX(nextConfig);
