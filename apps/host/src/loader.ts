type Entry = { version:string; entry:string };
type Manifest = Record<string, { channels: Record<'stable'|'beta'|'canary', Entry> }>;
export async function loadRemote(slug: string) {
  const url = new URL(location.href);
  const channel = (url.searchParams.get('channel') ?? 'stable') as 'stable'|'beta'|'canary';
  const v = url.searchParams.get('v');
  const res = await fetch('/_mf/manifest.json', { cache: 'no-cache' });
  if(!res.ok) throw new Error('manifest_load_failed');
  const mf = (await res.json()) as Manifest;
  const entry = v
    ? `/remotes/${slug}/${v}/remote.js`
    : mf[slug]?.channels?.[channel]?.entry;
  if(!entry) throw new Error(`entry_not_found:${slug}:${channel}`);
  const mod = await import(entry);
  if(typeof (mod as any).register !== 'function') throw new Error('register_missing');
  (mod as any).register();
}
