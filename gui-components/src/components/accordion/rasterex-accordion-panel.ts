import {
    html, customElement, property,
} from 'lit-element';

import { RasterexElement } from '../rasterex-element';

// `panelIdCounter` counts the number of IDs generated for panels and is used
// to generated new, unique IDs.
let panelIdCounter = 0;

/**
 * `RasterexAccordionPanel` is the element for the expandable and collapsible
 * content. Accordion to the WAI ARIA Best Practices, each panel should be
 * set the `aria-hidden` attribute to `true` if it is collapsed. This element
 * relies on CSS styles to apply `display: none` to hide it from the
 * accessibility tree instead.
 */
@customElement('rasterex-accordion-panel')
export class RasterexAccordionPanel extends RasterexElement {
    @property({ type: String, reflect: true })
    role = 'region';

    @property({ type: String, reflect: true })
    id = `rasterex-accordion-panel-generated-${panelIdCounter++}`;

    @property({ type: Boolean, reflect: true })
    expanded = false;

    protected render() {
        return html`
        <style>
            :host(:not([expanded])) {
                display: none;
            }
        </style>
        <slot></slot>
        `;
    }
}
