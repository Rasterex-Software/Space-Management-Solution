import {
    customElement, property, html
} from 'lit-element';

import { RasterexElement } from '../rasterex-element';

/**
 * `RasterexButton`
 */
@customElement('rasterex-tooltip')
export class RasterexTooltip extends RasterexElement {
    @property({ type: String, reflect: true })
    position = ''; // top, bottom, left, right

    @property({ type: String, reflect: true })
    contents = ``;

    protected createRenderRoot() {
        return this;
    }

    protected render() {
        return html`${this.contents}`;
    }
}
