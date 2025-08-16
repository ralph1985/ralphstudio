import { LitElement, html, css, unsafeCSS } from 'lit';
import tokens from '../styles/tokens.scss?inline';
export class BbButton extends LitElement {
  static styles = [unsafeCSS(tokens), css`
    .bb-btn{border:1px solid var(--color-primary); border-radius:var(--radius);
      padding:var(--space-2) var(--space-3); background:var(--color-primary); color:#fff; cursor:pointer;}
  `];
  render(){ return html`<button class="bb-btn"><slot></slot></button>`; }
}
customElements.define('bb-button', BbButton);
