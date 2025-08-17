import '@ralphstudio/ui/components/Button';

import { css, html, LitElement } from 'lit';

import { ensure, getLocale, setLocale, t } from './i18n';
import { loadRemote } from './loader';

interface ShellElement extends HTMLElement {
  basepath: string;
  route: string;
  env: {
    bus: EventTarget;
    locale: string;
    i18n: { t: typeof t };
  };
}

export class HostApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-width: 1200px;
      margin: 0 auto;
      padding: 16px;
    }
  `;
  private bus = new EventTarget();

  async connectedCallback() {
    super.connectedCallback();
    await ensure('ui');
    await ensure('host');
    document.documentElement.lang = getLocale();
  }

  private changeLocale(l: 'es' | 'en') {
    setLocale(l, this.bus);
    this.requestUpdate();
  }

  private async mount(slug: string) {
    try {
      await loadRemote(slug);
      const tag =
        slug === 'buybuddies' ? 'bb-shell' : slug === 'bar-manager' ? 'bar-shell' : 'dlv-shell';
      const el = document.createElement(tag) as ShellElement;

      el.basepath = `/apps/${slug}`;
      el.route = location.pathname.replace(`/apps/${slug}`, '') || '/';
      el.env = { bus: this.bus, locale: getLocale(), i18n: { t } };
      this.renderRoot.querySelector('#outlet')!.replaceChildren(el);
    } catch {
      this.renderRoot.querySelector('#outlet')!.textContent = 'Error cargando app.';
    }
  }

  render() {
    return html`
      <header style="display:flex;gap:8px;justify-content:space-between;align-items:center">
        <h1>${t('host', 'title')}</h1>
        <div role="group" aria-label="Idioma">
          <button @click=${() => this.changeLocale('es')} aria-pressed=${getLocale() === 'es'}>
            ES
          </button>
          <button @click=${() => this.changeLocale('en')} aria-pressed=${getLocale() === 'en'}>
            EN
          </button>
        </div>
      </header>

      <nav style="display:flex;gap:8px;margin:8px 0">
        <bb-button @click=${() => this.mount('buybuddies')}>BuyBuddies</bb-button>
        <bb-button @click=${() => this.mount('bar-manager')}>Bar</bb-button>
        <bb-button @click=${() => this.mount('delivery-manager')}>Delivery</bb-button>
      </nav>

      <main id="outlet" aria-live="polite">${t('host', 'welcome')}</main>
    `;
  }
}
customElements.define('host-app', HostApp);
