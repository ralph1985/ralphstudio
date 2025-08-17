import { css, html, LitElement } from 'lit';

import { ensure, t } from '@ralphstudio/i18n';
import { LOCALE_CHANGED, type MicroAppElement } from '@ralphstudio/mf-contracts';

class DlvShell extends LitElement implements MicroAppElement {
  static styles = css`
    :host {
      display: block;
      padding: 8px;
    }
  `;
  basepath = '/apps/delivery-manager';
  route = '/';
  env;
  async connectedCallback() {
    super.connectedCallback();
    await ensure('delivery');
    this.env?.bus?.addEventListener(LOCALE_CHANGED, () => this.requestUpdate());
  }
  render() {
    return html`<h2>${t('delivery', 'title')}</h2>
      <p>${t('delivery', 'intro')}</p>`;
  }
}
customElements.define('dlv-shell', DlvShell);
