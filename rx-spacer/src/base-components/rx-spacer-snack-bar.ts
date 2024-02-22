import { css, html, LitElement, property } from 'lit-element';
import './rx-spacer-button';

export class RasterexSpacerSnackBar extends LitElement {

    private promiseResolve: any;
    private promiseReject: any;

    @property({ type: Boolean, reflect: true })
    public active = false;

    public static get styles() {
        return [
            css`
            :host {
                display: block;
                position: fixed;
                top: 100%;
                left: 0;
                right: 0;
                padding: 12px;
                background-color: #293237;
                color: white;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                text-align: center;
                will-change: transform;
                transform: translate3d(0, 0, 0);
                transition-property: visibility, transform;
                transition-duration: 0.2s;
                visibility: hidden;
                z-index: 99999;
            }

            :host([active]) {
                visibility: visible;
                transform: translate3d(0, -100%, 0);
            }

            .button {
                width: 50px;
                color: #000;
                --rx-spacer-button-padding: 3px;
                margin-top: 5px;
            }

            .button:first-child {
                margin-right: 10px;
            }

            @media (min-width: 460px) {
                :host {
                    width: 320px;
                    margin: auto;
                }
            }
            `,
        ];
    }

    protected render() {
        return html`
            <div class="wrapper">
                <slot name="content"></slot>
                <div class="actions">
                    <rx-spacer-button
                        @click=${() => this.promiseResolve()}
                        class="button"
                        title="Yes">
                        Yes
                    </rx-spacer-button>

                    <rx-spacer-button
                        @click=${() => this.promiseReject()}
                        class="button"
                        title="No">
                        No
                    </rx-spacer-button>
              </div>
            </div>
        `;
    }

    public async show() {
        this.active = true;
        await this.updateComplete;

        return new Promise((resolve, reject) => {
            this.promiseResolve = resolve;
            this.promiseReject = reject;
        });
    }

    public hide() {
        this.active = false;
    }
}

window.customElements.define('rx-spacer-snack-bar', RasterexSpacerSnackBar);
