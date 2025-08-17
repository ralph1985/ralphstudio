import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';

const r = (...p: string[]) => resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', ...p);

export default defineConfig({
  root: 'apps/host',
  publicDir: '../../public',
  server: { port: 5173 },
  resolve: {
    alias: {
      '@ralphstudio/ui': r('packages/ui/src'),
      '@ralphstudio/mf-contracts': r('packages/mf-contracts/src'),
      '@ralphstudio/i18n': r('packages/i18n/src'),
    },
  },
  build: { outDir: '../../dist', emptyOutDir: true },
});
