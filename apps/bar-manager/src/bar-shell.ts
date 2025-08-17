import { css, html, LitElement } from 'lit';

import { ensure, t } from '@ralphstudio/i18n';
import { LOCALE_CHANGED, type MicroAppElement } from '@ralphstudio/mf-contracts';

class BarShell extends LitElement implements MicroAppElement {
  static styles = css`
    :host {
      display: block;
      padding: 8px;
    }
  `;
  basepath = '/apps/bar-manager';
  route = '/';
  env;
  async connectedCallback() {
    super.connectedCallback();
    await ensure('bar');
    this.env?.bus?.addEventListener(LOCALE_CHANGED, () => this.requestUpdate());
  }
  render() {
    return html`<h2>${t('bar', 'title')}</h2>
      <p>${t('bar', 'intro')}</p>`;
  }
}
customElements.define('bar-shell', BarShell);
