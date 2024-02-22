import { css, html, LitElement, property } from 'lit-element';

export class RasterexSpacerSwitch extends LitElement {

    @property({ type: Boolean, reflect: true})
    public checked = false;

    public static get styles() {
        return [
            css`
            .switch {
                position: relative;
                display: inline-block;
                width: 44px;
                height: 24px;
            }

            .switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                -webkit-transition: .4s;
                transition: .4s;
                border-radius: 24px;
            }

            .slider:before {
                position: absolute;
                content: "";
                height: 17px;
                width: 17px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                -webkit-transition: .4s;
                transition: .4s;
                border-radius: 50%;
            }

            input:checked + .slider {
                background-color: rgb(76, 175, 80);
            }

            input:focus + .slider {
                box-shadow: 0 0 1px rgb(76, 175, 80);
            }

            input:checked + .slider:before {
                -webkit-transform: translateX(17px);
                -ms-transform: translateX(17px);
                transform: translateX(17px);
            }
            `,
        ];
    }

    protected render() {
        return html`
            <label class="switch">
                <input type="checkbox" ?checked=${this.checked} @change=${this.toggleChecked}>
                <span class="slider"></span>
            </label>
        `;
    }

    private toggleChecked() {
        this.checked = !this.checked;

        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                checked: this.checked,
            },
            bubbles: true,
        }));
    }
}

// Register the element with the browser
customElements.define('rx-spacer-switch', RasterexSpacerSwitch);
