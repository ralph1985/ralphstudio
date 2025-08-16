import { configure, ensure, t, getLocale, setLocale } from '@ralphstudio/i18n';
configure(async (ns, locale)=>{
  // ns "host" y "ui" por ahora
  const base = ns === 'ui' ? '/packages/ui' : '/apps/host';
  const resp = await fetch(`${base}/locales/${locale}/${ns}.json`);
  return resp.ok ? resp.json() : {};
});
export { ensure, t, getLocale, setLocale };
