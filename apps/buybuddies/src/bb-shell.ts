import { ensure, t } from '@ralphstudio/i18n';
import { LOCALE_CHANGED, type MicroAppElement, NAV_EVENT } from '@ralphstudio/mf-contracts';
import { css, html, LitElement } from 'lit';
class BbShell extends LitElement implements MicroAppElement {
  static styles = css`
    :host {
      display: block;
      padding: 8px;
    }
  `;
  basepath = '/apps/buybuddies';
  route = '/';
  env;
  async connectedCallback() {
    super.connectedCallback();
    await ensure('buybuddies');
    this.env?.bus?.addEventListener(LOCALE_CHANGED, () => this.requestUpdate());
  }
  private nav(to: string) {
    this.dispatchEvent(
      new CustomEvent(NAV_EVENT, { detail: { to }, bubbles: true, composed: true }),
    );
  }
  render() {
    return html`<h2>${t('buybuddies', 'title')}</h2>
      <p>${t('buybuddies', 'intro')}</p>
      <button @click=${() => this.nav(`${this.basepath}/list`)}>
        ${t('buybuddies', 'goList')}
      </button>`;
  }
}
customElements.define('bb-shell', BbShell);
