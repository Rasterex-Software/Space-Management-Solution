import {
    customElement, property, html, css, svg, PropertyValues
} from 'lit-element';

import { RasterexElement } from '../rasterex-element';
import { RasterexId } from '../../utils/rasterex-id';
import { KEYCODE } from '../../utils/keycode';
// import { library, dom } from '@fortawesome/fontawesome-svg-core';
// import { fa} from '@fortawesome/free-solid-svg-icons';
// import { fa} from '@fortawesome/free-regular-svg-icons';
// import '../../assets/sprites/font-awesome/regular.svg';

/**
 * `RasterexToggleButton`
 */
@customElement('rasterex-toggle-button')
export class RasterexToggleButton extends RasterexElement {
    @property({ type: String, reflect: true })
    role = 'button';

    @property({ type: Number, reflect: true })
    tabindex = 0;

    @property({ type: Boolean, reflect: true})
    pressed = false;

    @property({ type: Boolean, reflect: true})
    disabled = false;

    @property({ type: Boolean, reflect: true, attribute:'has-icon'})
    hasIcon = false;

    // @property({ type: String, reflect: true, attribute:'icon-class'})
    // iconClass = 'icon'; // css class or classes ( space separated )

    @property({ type: String, reflect: true, attribute:'svg-sprite-id'})
    svgSpriteId = 'assets/sprites/font-awesome/regular.svg#clock'; // css class or classes ( space separated )

    @property({ type: String, reflect: true })
    rstxType = `toggle-button`;

    @property({ type: String, reflect: true })
    rstxId = RasterexId.getUid();

    public static get styles(){
        return [
            css`:host {
                    display: inline-block;
                    user-select: none;
                    transition: var(--rstxToggleButtonTransition, background-color .2s ease);
                    cursor: var(--rstxToggleButtonCursor, pointer);
                    background-color: var(--rstxToggleButtonBgColor, #eee);
                    border: var(--rstxToggleButtonBorder, 1px solid #333);
                    border-radius: var(--rstxToggleButtonBorderRadius, 3px);
                    padding: var(--rstxToggleButtonPadding, 3px);
                }

                :host([hidden]) {
                    display: none;
                }

                :host([pressed]) {
                    background-color: var(--rstxToggleButtonPressedBgColor, #999);
                }

                :host([disabled]) {
                    opacity: 0.35;
                }
                .label {
                    padding: var(--rstxToggleButtonLabelPadding, 3px);
                    font-size: var(--rstxToggleButtonLabelFontSize, 14px);
                    text-align:center;
                }
                .icon {
                    width: var(--rstxToggleButtonIconWidth, 64px);
                    height: var(--rstxToggleButtonLabelHeight, 64px);
                }
              `,
        ];
    }

    protected render() {

        return html`
                ${ (this.hasIcon && ''!==this.svgSpriteId)
                    ? this.getSvgIcon(this.svgSpriteId)
                     :``
                }
                <div class="label">
                    <slot></slot>
                </div>
        `;
    }

    protected getSvgIcon(svgSymbolId:string) {
        // const a = document.createElement('svg');
        // a.classList.add('icon');
        // const u = document.createElement('use');
        // // u.setAttribute('xlink:href',svgSymbolId);
        // u.setAttribute('href',svgSymbolId);
        // a.appendChild(u);

        // return a;
        return svg`<svg class="icon">
            <use href="${svgSymbolId}"></use>
        </svg>`;
    }
    /**
     * Can have a parameter -> changedProperties: PropertyValues
     *
     */
    public connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this);
        this.addEventListener('keydown', this);
    }

    /**
     * Called whenever the element is updated.
     * Setting properties inside this method will trigger the element to update.
     */
    protected updated(changedProperties: PropertyValues) {
        changedProperties.forEach((oldValue, propName: any) => {
            // TODO deal with tabindex when the element receives 'disabled'

            if (propName === 'pressed' && undefined !== oldValue) {
                this.setAttribute('aria-pressed', this.pressed.toString());
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
        this.dispatchEvent(new CustomEvent('change',{
            detail: {
                pressed: this.pressed,
            },
            bubbles: true
        }))

    }
}
