import { css, html, LitElement, property, PropertyValues, query } from 'lit-element';

import RxEvents from 'rx-events';
import { closeIcon } from '../icons';

export class RasterexSpacerModal extends LitElement {

    @query('#modal')
    public modal: HTMLElement;

    @property({ type: Boolean })
    public active = false;

    @property({ type: Boolean, reflect: true })
    public visible = false;

    @property({ type: Boolean, reflect: true })
    public hidden = true;

    @property({ type: String })
    public title = '';

    @property({ type: Boolean })
    public noExit = false;

    @property({ type: Boolean })
    public hideTitlebar = false;

    public static get styles() {
        return [
            css`
            :host, *, *::before, *::after {
                box-sizing: border-box;
            }
            :host {
                position: fixed;
                display: flex;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                overflow: scroll;
                padding: 1rem;
                z-index: 2147483647;
                -moz-osx-font-smoothing: grayscale;
                    -webkit-font-smoothing: antialiased;
                            font-smoothing: antialiased;
            }
            :host([hidden]) {
                display: none;
            }
            /* Click-to-escape target */
            .overlay {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                cursor: pointer;
                background: var(--rx-spacer-modal-overlay, rgba(0,0,0, 0.2));
            }
            :host(:not([visible])) .overlay {
                opacity: 0;
                transition: opacity 200ms ease;
                transition-delay: 100ms;
            }
            :host([visible]) .overlay {
                opacity: 1;
                transition: opacity 300ms ease;
            }
            .modal {
                display: inline-block;
                max-width: 600px;
                min-width: 300px;
                position: relative;
                background: white;
                margin: auto;
                z-index: 1;
                box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
                            0 1px 18px 0 rgba(0, 0, 0, 0.12),
                            0 3px 5px -1px rgba(0, 0, 0, 0.4);
            }
            :host(:not([visible])) .modal {
                opacity: 0;
                transform: translateZ(0) scale(0.8, 0.95);
                transition: transform 175ms cubic-bezier(0.4, 0.0, 1, 1),
                            opacity 120ms ease;
            }
            :host([visible]) .modal {
                opacity: 1;
                transform: translateZ(0) scale(1);
                transition: transform 140ms cubic-bezier(0.0, 0.0, 0.2, 1),
                            opacity 100ms ease;
                transition-delay: 150ms
            }
            .titlebar {
                margin-top: 0;
                padding: 0px 16px;
                display: flex;
                position: relative
                align-items: center;
                text-align: center;
                justify-content: space-between;
                color: var(--rx-spacer-modal-titlebar-color, #444);
                background-color: var(--rx-spacer-modal-titlebar-background, #ddd);
                border-radius: 3px 3px 0 0;
            }
            .titlebar[hidden] {
                display: none;
            }
            .modal__title {
                margin-right: 8px;
                padding: 0;
                flex: auto;
                font-size: 18px;
                line-height: 18px;
            }
            .modal__content {
                padding: var(--rx-spacer-modal-padding, 20px);
            }
            .modal__close {
                position: absolute;
                top: 15px;
                right: 13px;
                color: var(--rx-spacer-modal-close-color, rgba(40,40,40, 0.8));
                opacity: 0.5;
                cursor: pointer;
            }
            .modal__close:hover {
                opacity: 1;
            }
            /* Patch [hidden] on IE*/
            [hidden] {
                display: none !important;
            }
            `,
        ];
    }

    protected render() {
        return html`
        <div id="overlay"
            class="overlay"
            @click="${this.close}"
            @transitionend="${this.hideAfterInactiveTransition}">
        </div>

        <div class="modal" id="modal">
            <div class="titlebar" ?hidden=${this.hideTitlebar}>
                <span
                    class="modal__close"
                    @click="${this.close}"
                    ?hidden="${this.noExit}">
                    ${closeIcon}
                </span>

                <h3 class="modal__title" ?hidden="${!this.title}">${this.title}</h3>
            </div>

            <div class="modal__content">
                <slot name="content"></slot>
            </div>
        </div>
        `;
    }

    /**
     * Called whenever the element is updated.
     * Setting properties inside this method will trigger the element to update.
     */
    protected updated(changedProperties: PropertyValues) {
        if (changedProperties.has('active')) {
            this.toggleVisibility(this.active);
            this.lockBodyWhenActive(this.active);
            this.closeOnEscape(this.active);
        }
    }

    /**
     * Toggle visibility of modal based on active state
     * @param  {Boolean} active Value of the active property
     */
    // TODO: maybe refactor this in order to not trigger update again
    private toggleVisibility(active: boolean) {
        if (active) {
            this.hidden = false;
            this.visible = true;
        } else {
            this.visible = false;
        }
    }

    /**
     * Set hidden if visible false at end of transitions
     */
    private hideAfterInactiveTransition() {
        if (!this.active) {
            this.hidden = true;
        }
    }

    /**
     * Disable scrolling while modal is open
     * @param  {Boolean} active Value of the active property
     */
    private lockBodyWhenActive(active: boolean) {
        document.body.style.overflow = active ? 'hidden' : '';
    }

    private close() {
        if (!this.noExit) {
            this.active = false;
            RxEvents.dispatchEvent('rx-spacer-modal-close');
        }
    }

    /**
     * Close the modal on escape key press when active
     * @param {Boolean} active Value of the active property
     */
    private closeOnEscape(active: boolean) {
        const closeIfEscape = (e: KeyboardEvent) => {
            if (e.keyCode === 27) {
                this.close();
            }
        };
        if (active) {
            document.addEventListener('keydown', closeIfEscape);
        } else {
            document.removeEventListener('keydown', closeIfEscape);
        }
    }
}

// Register the element with the browser
customElements.define('rx-spacer-modal', RasterexSpacerModal);
