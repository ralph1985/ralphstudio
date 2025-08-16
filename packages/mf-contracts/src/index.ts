export type Locale = 'es' | 'en';
export interface MicroAppEnv {
  bus?: EventTarget;
  locale?: Locale;
  i18n?: { t(ns: string, key: string, params?: Record<string, unknown>): string };
  flags?: Record<string, boolean>;
  public?: Record<string, string>;
}
export interface MicroAppElement extends HTMLElement {
  basepath: string;
  route: string;
  env?: MicroAppEnv;
}
export const NAV_EVENT = 'mf:navigate';
export const LOCALE_CHANGED = 'bb.locale.changed.v1';
