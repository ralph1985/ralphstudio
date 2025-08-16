import { configure, ensure, t, getLocale, setLocale } from '@ralphstudio/i18n';

const hostMsgs = import.meta.glob('../locales/*/host.json', { eager: true });
const uiMsgs = import.meta.glob('../../../packages/ui/locales/*/ui.json', { eager: true });

configure(async (ns, locale) => {
  const key =
    ns === 'ui'
      ? `../../../packages/ui/locales/${locale}/ui.json`
      : `../locales/${locale}/host.json`;
  const mod = (ns === 'ui' ? uiMsgs : hostMsgs)[key] as any;
  return mod?.default ?? {};
});

export { ensure, t, getLocale, setLocale };
