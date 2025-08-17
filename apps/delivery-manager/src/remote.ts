import Bugsnag from '@bugsnag/js';

import type { Monitoring } from '@ralphstudio/monitoring';

import './dlv-shell';

type Env = {
  monitoring?: Monitoring;
  app: { slug: string; version: string };
  origin?: 'host' | 'standalone';
  // ...resto de props que ya tengas
};

export function register(env: Env) {
  const mon: Monitoring =
    env.monitoring ??
    (() => {
      const c = Bugsnag.start({
        apiKey: import.meta.env.VITE_BUGSNAG_KEY,
        releaseStage: import.meta.env.VITE_RELEASE_STAGE,
        appVersion: env.app?.version ?? '0.0.0',
        appType: `microapp:${env.app?.slug ?? 'unknown'}`,
        enabledReleaseStages: ['staging', 'production'],
      });

      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        notify: (e, cb) => c.notify(e as any, cb),
        breadcrumb: (m, meta, type) => c.leaveBreadcrumb(m, meta, type),
        setUser: (id, email, name) => c.setUser(id, email, name),
        addMeta: (section, data) => c.addMetadata(section, data),
        setContext: (ctx) => {
          c.context = ctx;
        },
      };
    })();

  mon.addMeta('microapp', env.app);
  mon.breadcrumb('microapp:mounted', { ...env.app }, 'state');

  // customElements ya registrado en dlv-shell
}
