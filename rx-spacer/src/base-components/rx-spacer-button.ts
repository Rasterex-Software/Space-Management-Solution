import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import { addListener } from '@polymer/polymer/lib/utils/gestures';
import { css, html, LitElement, property } from 'lit-element';

export class RasterexSpacerButton extends GestureEventListeners(LitElement) {

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    static get styles() {
        return [
            css`
            :host {
                display: inline-block;
                position: relative;
                outline: none;
                white-space: nowrap;
                cursor: pointer;
            }
            :host([hidden]) {
                display: none !important;
            }
            :host([disabled]) {
                opacity: 0.35;
            }
            /* Ensure the button is always aligned on the baseline */
            .button-container::before {
                content: '\\2003';
                display: inline-block;
                width: 0;
            }
            .button-container {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                width: 100%;
                height: 100%;
                min-height: inherit;
                border: 1px solid #333;
                border-radius: 3px;
                padding: var(--rx-spacer-button-padding, 3px);
                transition: background-color .2s ease;
                background-color: var(--rx-spacer-button-background,#eee);
                text-shadow: inherit;
                -webkit-user-select: none;
                -moz-user-select: none;
                user-select: none;
            }
            :host(:hover) .button-container {
                background-color: var(--rx-spacer-button-hover-background,#999);
            }
            [part='prefix'],
            [part='suffix'] {
                flex: none;
            }
            [part='label'] {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            button {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: inherit;
            }
            `,
        ];
    }

    protected render() {
        return html`
        <div class="button-container">
          <div part="prefix"><slot name="prefix"></slot></div>
          <div part="label"><slot></slot></div>
          <div part="suffix"><slot name="suffix"></slot></div>
        </div>
        <button type="button" role="presentation"></button>
      `;
    }

    protected firstUpdated() {
        // Leaving default role in the native button, makes navigation announcement
        // being different when using focus navigation (tab) versus using normal
        // navigation (arrows). The first way announces the label on a button
        // since the focus is moved programmatically, and the second on a group.
        this.setAttribute('role', 'button');

        this.addActiveListeners();
    }

    public disconnectedCallback() {
        super.disconnectedCallback();

        // `active` state is preserved when the element is disconnected between keydown and keyup events.
        if (this.hasAttribute('active')) {
            this.removeAttribute('active');
        }
    }

    private addActiveListeners() {
        addListener(this, 'down', () => !this.disabled && this.setAttribute('active', ''));
        addListener(this, 'up', () => this.removeAttribute('active'));
        this.addEventListener(
            'keydown',
            (e) => !this.disabled && [13, 32].indexOf(e.keyCode) >= 0 && this.setAttribute('active', ''),
        );
        this.addEventListener('keyup', () => this.removeAttribute('active'));
        this.addEventListener('blur', () => this.removeAttribute('active'));
    }

    get focusElement() {
        return this.shadowRoot!.querySelector('button');
    }
}

// Register the element with the browser
customElements.define('rx-spacer-button', RasterexSpacerButton);
