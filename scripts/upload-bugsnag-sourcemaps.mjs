/* eslint-env node */
/* eslint-disable no-undef */
import { execFileSync } from 'node:child_process';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const API_KEY = process.env.BUGSNAG_KEY;
const BASE_URL = process.env.PUBLIC_BASE_URL; // ej: https://tu-dominio.vercel.app
if (!API_KEY || !BASE_URL) {
  console.error('Faltan BUGSNAG_KEY o PUBLIC_BASE_URL');
  process.exit(1);
}

function upload({ minifiedFile, sourceMap, minifiedUrl, appVersion }) {
  execFileSync(
    'npx',
    [
      'bugsnag-source-maps',
      'upload',
      '--api-key',
      API_KEY,
      '--app-version',
      appVersion,
      '--minified-file',
      minifiedFile,
      '--source-map',
      sourceMap,
      '--minified-url',
      minifiedUrl,
      '--overwrite',
      '--upload-sources'
    ],
    { stdio: 'inherit' }
  );
}

const hostDist = resolve('apps/host/dist');

// 1) Host bundles (assets/*.js)
const assetsDir = join(hostDist, 'assets');
if (existsSync(assetsDir)) {
  for (const f of readdirSync(assetsDir)) {
    if (f.endsWith('.js') && existsSync(join(assetsDir, f + '.map')) === false) continue;
    if (f.endsWith('.js')) {
      const js = join(assetsDir, f);
      const map = js + '.map';
      if (!existsSync(map)) continue;
      const version = process.env.npm_package_version || '0.0.0';
      const url = `${BASE_URL}/assets/${f}`;
      upload({ minifiedFile: js, sourceMap: map, minifiedUrl: url, appVersion: version });
    }
  }
}

// 2) Remotes: /remotes/<slug>/<version>/remote.js
const remotesRoot = join(hostDist, 'remotes');
if (existsSync(remotesRoot)) {
  for (const slug of readdirSync(remotesRoot)) {
    const slugDir = join(remotesRoot, slug);
    if (!statSync(slugDir).isDirectory()) continue;
    for (const ver of readdirSync(slugDir)) {
      const dir = join(slugDir, ver);
      const js = join(dir, 'remote.js');
      const map = join(dir, 'remote.js.map');
      if (!existsSync(js) || !existsSync(map)) continue;
      const url = `${BASE_URL}/remotes/${slug}/${ver}/remote.js`;
      upload({ minifiedFile: js, sourceMap: map, minifiedUrl: url, appVersion: ver });
    }
  }
}
