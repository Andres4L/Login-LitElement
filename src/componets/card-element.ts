import { LitElement, html, css, property } from 'lit-element';

class CardElement extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: String }) content = '';

  render() {
    return html`
      <div class="card">
        <div class="card-header">${this.title}</div>
        <div class="card-body">${this.content}</div>
      </div>
    `;
  }

  static styles = css`
    .card {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 16px;
      margin: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      background-color: #fff;
    }

    .card-header {
      font-size: 20px;
      font-weight: bold;
    }

    .card-body {
      margin-top: 10px;
    }
  `;
}

customElements.define('card-element', CardElement);
