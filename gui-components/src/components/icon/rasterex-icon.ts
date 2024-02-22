import {
    customElement, property, html
} from 'lit-element';

import { RasterexElement } from '../rasterex-element';

/**
 * TODO see if we really need a separate label for the icon. This is probably needed only if the icon needs to have
 * contents. For example a svg icon.
 * `RasterexIcon`
 */
@customElement('rasterex-icon')
export class RasterexIcon extends RasterexElement {

    @property({ type: String, reflect: true })
    subtype = ``; // svg or css

    @property({ type: String, reflect: false})
    contents = ``;

    protected createRenderRoot() {
        return this;
    }

    protected render() {
        return html`${this.contents}`;
    }
}
