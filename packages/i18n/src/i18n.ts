import { LOCALE_CHANGED, type Locale } from "@ralphstudio/mf-contracts";
type Messages = Record<string, string>;
type Cache = Record<string, Messages>;
type Loader = (ns: string, locale: Locale) => Promise<Messages>;
let current: Locale = (localStorage.getItem("locale") as Locale) || "es";
const cache: Record<string, Cache> = {};
let loader: Loader = async () => ({});
export function configure(l: Loader) {
  loader = l;
}
export function getLocale(): Locale {
  return current;
}
export async function ensure(ns: string) {
  cache[ns] ??= {};
  if (!cache[ns][current]) cache[ns][current] = await loader(ns, current);
}
export function t(ns: string, key: string, params?: Record<string, unknown>) {
  const msg = cache[ns]?.[current]?.[key] ?? `${ns}.${key}?`;
  return msg.replace(/\{\{(\w+)\}\}/g, (_, k) => String(params?.[k] ?? ""));
}
export function setLocale(locale: Locale, bus?: EventTarget) {
  current = locale;
  localStorage.setItem("locale", locale);
  document.documentElement.lang = locale;
  bus?.dispatchEvent(new CustomEvent(LOCALE_CHANGED, { detail: { locale } }));
}
