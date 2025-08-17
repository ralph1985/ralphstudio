import Bugsnag from '@bugsnag/js';

export type Monitoring = {
  notify: (err: unknown, cb?: Parameters<(typeof Bugsnag)['notify']>[1]) => void;
  breadcrumb: (msg: string, meta?: Record<string, unknown>, type?: Bugsnag.BreadcrumbType) => void;
  setUser: (id?: string, email?: string, name?: string) => void;
  addMeta: (section: string, data: Record<string, unknown>) => void;
  setContext: (ctx: string) => void;
};

export function startMonitoring(opts: {
  apiKey: string;
  appVersion: string;
  releaseStage: 'development' | 'staging' | 'production';
  appType?: string;
}): Monitoring {
  const client = Bugsnag.start({
    apiKey: opts.apiKey,
    appVersion: opts.appVersion,
    releaseStage: opts.releaseStage,
    appType: opts.appType ?? 'host',
    enabledReleaseStages: ['development', 'staging', 'production'],
  });

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    notify: (err, cb) => client.notify(err as any, cb),
    breadcrumb: (msg, meta, type) => client.leaveBreadcrumb(msg, meta, type),
    setUser: (id, email, name) => client.setUser(id, email, name),
    addMeta: (section, data) => client.addMetadata(section, data),
    setContext: (ctx) => {
      client.context = ctx;
    },
  };
}
