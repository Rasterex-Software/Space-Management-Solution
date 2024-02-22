import {
    css, html, LitElement, property, PropertyValues,
} from 'lit-element';

const KEYCODE = {
    SPACE: 32,
    ENTER: 13,
};

export class RasterexSpacerToggle extends LitElement {
    @property({ type: String, reflect: true })
    public role = 'button';

    @property({ type: Number, reflect: true })
    public tabindex = 0;

    @property({ type: Boolean, reflect: true })
    public pressed = false;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    public static get styles() {
        return [
            css`
              :host {
                display: inline-block;
                user-select: none;
                transition: background-color .2s ease;
                cursor: pointer;
                background-color: #eee;
                border: 1px solid #333;
                border-radius: 3px;
                padding: 3px;
              }
              :host([hidden]) {
                display: none;
              }
              :host([pressed]) {
                background-color: #999;
              }
              :host([disabled]) {
                opacity: 0.35;
              }
            `,
        ];
    }

    protected render() {
        return html`<slot></slot>`;
    }

    /**
     * Can have a parameter -> changedProperties: PropertyValues
     *
     */
    protected firstUpdated() {
        this.addEventListener('click', this);
        this.addEventListener('keydown', this);
    }

    /**
     * Called whenever the element is updated.
     * Setting properties inside this method will trigger the element to update.
     */
    protected updated(changedProperties: PropertyValues) {
        changedProperties.forEach((oldValue, propName: any) => {
            if (propName === 'pressed' && undefined !== oldValue) {
                this.setAttribute('aria-pressed', this.pressed.toString());
            }
            if (propName === 'disabled' && undefined !== oldValue) {
                this.setAttribute('aria-disabled', this.disabled.toString());
                // The `tabindex` attribute does not provide a way to fully remove
                // focusability from an element.
                // Elements with `tabindex=-1` can still be focused with
                // a mouse or by calling `focus()`.
                // To make sure an element is disabled and not focusable, remove the
                // `tabindex` attribute.
                if (this.disabled) {
                    this.removeAttribute('tabindex');
                    // If the focus is currently on this element, unfocus it by
                    // calling the `HTMLElement.blur()` method.
                    this.blur();
                } else {
                    this.setAttribute('tabindex', '0');
                }
            }
        });
    }

    /**
     * Defining handleEvent allows to pass `this` as the callback to every
     * `addEventListener` and `removeEventListener`. This avoids the need of
     * binding every function. See
     * https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
     *
     * @param {Event} e Any event.
     */
    public handleEvent(e: Event) {
        if (e.type === 'click') {
            this.onClick();
        } else if (e.type === 'keydown') {
            this.onKeyDown(e as KeyboardEvent);
        }
    }

    /**
     * `disconnectedCallback()` removes the event listeners that
     * `firstUpdated` added.
     *
     */
    public disconnectedCallback() {
        super.disconnectedCallback();

        this.removeEventListener('click', this);
        this.removeEventListener('keydown', this);
    }

    /**
     * `onClick()` handles clicks inside the toggle button.
     *
     * @param {MouseEvent} event - optional
     */
    protected onClick() {
        this.togglePressed();
    }

    /**
     * `onKeyDown()` handles key presses when the element has focus.
     *
     */
    protected onKeyDown(event: KeyboardEvent) {
        // Don’t handle modifier shortcuts typically used by assistive technology.
        if (event.altKey) {
            return;
        }

        switch (event.keyCode) {
            case KEYCODE.SPACE:
            case KEYCODE.ENTER:
                event.preventDefault();
                this.togglePressed();
                break;

            // Any other key press is ignored and passed back to the browser.
            default:
                return;
        }
    }

    /**
     * Triggers a custom event named 'change'
     */
    protected togglePressed() {
        // ignore changes ( clicks, keypresses) if the button is already disabled
        if (this.disabled) {
            return;
        }

        this.pressed = !this.pressed;
        // triggers a customEvent to allow other code to subscribe/attach to it
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                pressed: this.pressed,
            },
            bubbles: true,
        }));
    }
}

// Register the element with the browser
customElements.define('rx-spacer-toggle', RasterexSpacerToggle);
