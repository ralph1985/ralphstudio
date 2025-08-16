import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

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
  build: { outDir: '../../dist', emptyOutDir: true, sourcemap: true },
  define: {
    __HOST_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
