import {
    customElement, property, html,
} from 'lit-element';

import { RasterexElement } from '../rasterex-element';
import { RasterexTabs } from './rasterex-tabs';
import { RasterexTabpanel } from './rasterex-tabpanel';
import { removeIcon } from '../icons';

// `rasterexTabCounter` counts the number of `<rasterex-tab>` instances created. The
// number is used to generated new, unique IDs.
let rasterexTabCounter = 0;
/**
 * `RasterexTab` is a tab for a `<rasterex-tabs>` tab panel. `<rasterex-tab>`
 * should always be used with `role=heading` in the markup so that the
 * semantics remain useable when JavaScript is failing.
 *
 * A `<rasterex-tab>` declares which `<rasterex-tabpanel>` it belongs to by
 * using that panel’s ID as the value for the `aria-controls` attribute.
 *
 * A `<rasterex-tab>` will automatically generate a unique ID if none
 * is specified.
 */
@customElement('rasterex-tab')
export class RasterexTab extends RasterexElement {
    @property({ type: String, reflect: true })
    id = `rasterex-tab-generated-${rasterexTabCounter++}`;

    @property({ type: String, reflect: true })
    role = 'tab';

    @property({ type: String, reflect: true })
    slot = 'tab';

    @property({ type: Boolean, reflect: true })
    selected = false;

    @property({ type: String, reflect: true, attribute: 'aria-selected' })
    ariaSelected = false;

    @property({ type: String, reflect: true })
    tabindex = -1;

    @property({ type: Boolean, reflect: true })
    dismiss = false;

    protected render() {
        return html`
            <slot></slot>
            ${this.dismiss ? html`<span class="dismissItem" @click="${this.dismissHandler}">${removeIcon}</span>` :``}
        `;
    }

    protected firstUpdated() {
        if (!(this.parentElement instanceof RasterexTabs)) {
            throw new Error(`Invalid parent element for rasterex-tab. Required rasterex-tabs as parent`);
        }
    }

    protected updated() {
        const value = this.hasAttribute('selected');
        this.setAttribute('aria-selected', value.toString());
        this.setAttribute('tabindex', value ? '0' : '-1');
    }

    /**
     * `dismissHandler` removes the object and related panel from the tree it belongs to.
     *
     * @private
     * @memberof RasterexTab
     */
    private dismissHandler(e: Event) {
        // since this object is removed from DOM we want to stop event propagation 
        // to parent component `<rasterex-tabs>` because will trigger an click event 
        // with a removed target
        e.stopPropagation();
        
        const relatedPanel = this.relatedPanel();

        if (relatedPanel) {
            relatedPanel.remove();
        }

        this.remove();
    }

    /**
     * `relatedPanel` returns the panel that this tab controls.
     *
     * @private
     * @returns {(RasterexTabpanel | null)}
     * @memberof RasterexTab
     */
    private relatedPanel(): RasterexTabpanel | null {
        return document.querySelector('[aria-labelledby="' + this.id + '"]');
    }
}
