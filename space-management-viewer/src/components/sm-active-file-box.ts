
import { html, LitElement, property, css } from 'lit-element';

class SmActiveFileBox extends LitElement {

    @property({ type: String, reflect: true })
    private path = '';

    @property({ type: String, reflect: true })
    private fileName = '';

    static styles = [
        css`
          :host {
            display: block;
            position: relative;
            padding-top: 5px;
            color: var(--active-file-box-text-color, #EAEAEA);
          }

          :host([active]) {
          }

          .path {
            padding-left: 10px;
          }
          .file-name:before{
            content:"( ";
            color: #454545;
          }
          .file-name:after {
            content:" )";
            color: #454545;
          }
          .file-name {
            color: #888;
          }
        `
    ];

    protected render() {
        return html`
            <div class="active-file-box">
                <!-- <b>Active Selection:</b> -->
                <span class="path">${this.path}</span>
                <span class="file-name">${this.fileName}</span>
            </div>
        `;
    }
}

window.customElements.define('sm-active-file-box', SmActiveFileBox);