import { defineConfig } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  {
    extends: [...nextCoreWebVitals],
  },
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'playwright/**'],
  },
]);
