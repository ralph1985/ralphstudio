import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const r = (...p: string[]) => resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', ...p);

export default defineConfig({
  build: {
    lib: { entry: 'src/remote.ts', formats: ['es'], fileName: () => 'remote.js' },
    outDir: r('public/remotes/buybuddies/1.0.0'),
    rollupOptions: { external: [] },
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@ralphstudio/ui': r('packages/ui/src'),
      '@ralphstudio/mf-contracts': r('packages/mf-contracts/src'),
      '@ralphstudio/i18n': r('packages/i18n/src'),
    },
  },
});
