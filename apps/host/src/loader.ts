/* eslint-disable */
import { startMonitoring } from '@ralphstudio/monitoring';

type Entry = { version: string; entry: string };
type Manifest = Record<string, { channels: Record<'stable' | 'beta' | 'canary', Entry> }>;

const monitoring = startMonitoring({
  apiKey: import.meta.env.VITE_BUGSNAG_KEY,
  releaseStage: import.meta.env.VITE_RELEASE_STAGE,
  appVersion: __HOST_VERSION__,
  appType: 'host',
});

export async function loadRemote(slug: string) {
  const url = new URL(location.href);
  const channel = (url.searchParams.get('channel') ?? 'stable') as 'stable' | 'beta' | 'canary';
  const v = url.searchParams.get('v');
  const res = await fetch('/_mf/manifest.json', { cache: 'no-cache' });
  if (!res.ok) throw new Error('manifest_load_failed');
  const mf = (await res.json()) as Manifest;
  const entryObj = v
    ? { version: v, entry: `/remotes/${slug}/${v}/remote.js` }
    : mf[slug]?.channels?.[channel];
  if (!entryObj?.entry) throw new Error(`entry_not_found:${slug}:${channel}`);
  const mod = await import(entryObj.entry);
  if (typeof (mod as any).register !== 'function') throw new Error('register_missing');
  (mod as any).register({
    monitoring,
    app: { slug, version: entryObj.version },
    origin: 'host',
  });
}
