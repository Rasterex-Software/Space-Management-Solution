import {
    html, css, customElement, property, PropertyValues,
} from 'lit-element';

import { RasterexElement } from '../rasterex-element';

/**
 * `RasterexItem` is an interactive list item for `<rasterex-listbox>`.
 */
@customElement('rasterex-item')
export class RasterexItem extends RasterexElement {

    @property({ type: String, reflect: true })
    value = '';

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    protected render() {
        return html`
        <style>
            :host {
                display: block;
                padding: 8px;
                font-family: inherit;
            }
        </style>
        <slot></slot>
        `;
    }

    protected firstUpdated() {
        this.addEventListener('click', this.onClick);
    }

    public disconnectedCallback() {
        this.removeEventListener('click', this.onClick);
    }

    /**
     * `item-click` event handler
     *
     * @private
     * @memberof RasterexListItem
     */
    private onClick() {
        const event = new CustomEvent('item-click', { bubbles: true, composed: true, detail: { text: this.innerText, value: this.value } });
        this.dispatchEvent(event);
    }
}