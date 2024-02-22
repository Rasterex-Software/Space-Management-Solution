import { css, html, LitElement, property } from 'lit-element';

export class RasterexSpacerLoader extends LitElement {

    @property({ type: Boolean, reflect: true })
    public active = false;

    public static get styles() {
        return [
            css`
            :host {
                position: fixed;
                display: none;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                z-index: 2147483647;
                -moz-osx-font-smoothing: grayscale;
                    -webkit-font-smoothing: antialiased;
                            font-smoothing: antialiased;
            }

            :host([active]) {
                display: flex;
            }

            #overlay{
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                cursor: pointer;
                background: var(--rx-spacer-loader-overlay, rgba(0,0,0, 0.4));
            }

            #loader {
                position: absolute;
                left: 50%;
                top: 50%;
                z-index: 1;
                width: 150px;
                height: 150px;
                margin: -75px 0 0 -75px;
                border: 16px solid #f3f3f3;
                border-radius: 50%;
                border-top: 16px solid var(--rx-spacer-loader-color, #12903D);
                width: 120px;
                height: 120px;
                -webkit-animation: spin 2s linear infinite;
                animation: spin 2s linear infinite;
            }

            /* Safari */
            @-webkit-keyframes spin {
                0% { -webkit-transform: rotate(0deg); }
                100% { -webkit-transform: rotate(360deg); }
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            `,
        ];
    }

    protected render() {
        return html`<div id="overlay">
            <div id="loader"></div>
        </div>
        `;
    }
}

// Register the element with the browser
customElements.define('rx-spacer-loader', RasterexSpacerLoader);
