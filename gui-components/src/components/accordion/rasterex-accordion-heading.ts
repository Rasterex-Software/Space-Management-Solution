import {
    html, customElement, property,
} from 'lit-element';

import { RasterexElement } from '../rasterex-element';

// `headingIdCounter` counts the number of IDs generated and is used to
// generated new, unique IDs.
let headingIdCounter = 0;

/**
 * `RasterexAccordionHeading` is the element for the headings in the accordion.
 * According to the WAI ARIA Best Practices, each heading needs to wrap a
 * `<button>`. This element puts that element in the ShadowDOM, as it is more
 * convenient to use and doesn’t make server-side rendering or styling more
 * problematic. This element dispatches a `rasterex-accordion-change` event when
 * it is supposed to expand.
 *
 * The WAI ARIA Best Practices also recommend setting `aria-level` depending
 * on what level the headings are. It is hard to determine the level of a
 * heading algorithmically and is not strictly necessary to have an accessible
 * accordion. To keep the code more accessible, this element does not set
 * `aria-level` but leaves that to the developer.
 *
 * Clicking the button or pressing space or enter while the button has focus
 * will expand the heading. Changing the `expanded` attribute or property will
 * also cause the heading to expand.
 */
@customElement('rasterex-accordion-heading')
export class RasterexAccordionHeading extends RasterexElement {
    @property({ type: String, reflect: true })
    role = 'heading';

    @property({ type: String, reflect: true })
    id = `rasterex-accordion-heading-generated-${headingIdCounter++}`;

    @property({ type: Boolean, reflect: true })
    expanded = false;

    @property({ type: String })
    private shadowButton: HTMLButtonElement | null = null;

    protected createRenderRoot(): Element | ShadowRoot {
        return this.attachShadow({
            mode: 'open',
            delegatesFocus: true,
        });
    }

    protected render() {
        return html`
        <style>
            :host {
                contain: content;
                --heading-color: black;
                --heading-padding: 10px;
                --rx-acc-heading-text-align: inherit;
                --rx-acc-heading-font: inherit;
                --rx-acc-heading-bg: inherit;
            }
            button {
                display: block;
                background: var(--rx-acc-heading-bg);
                border: initial;
                padding: var(--heading-padding);
                width: 100%;
                cursor:pointer;
                color: var(--heading-color);
                text-align: var(--rx-acc-heading-text-align);
                font: var(--rx-acc-heading-font);
            }
        </style>
        <button @click="${this.onClick}"><slot></slot></button>
        `;
    }

    protected firstUpdated() {
        this.shadowButton = (this.shadowRoot as ShadowRoot).querySelector('button');

        if (this.shadowButton) {
            this.shadowButton.setAttribute('aria-expanded', 'false');
        }
    }

    protected updated() {
        // `expanded` is a boolean attribute it is either set or not set. The
        // actual value is irrelevant.
        const value = this.hasAttribute('expanded');
        if (this.shadowButton) {
            this.shadowButton.setAttribute('aria-expanded', '' + value);
        }
    }

    /**
     * `onClick` is the event handler for a click. A click toggles the expanded
     * and the collapsed state.
     *
     * @private
     * @memberof RasterexAccordionHeading
     */
    private onClick() {
        this.expanded = !this.expanded;

        // Dispatch an event that signals a request to expand to the
        // `<rasterex-accordion>` element.
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: { isExpandedNow: this.expanded },
                bubbles: true,
            }),
        );
    }
}
