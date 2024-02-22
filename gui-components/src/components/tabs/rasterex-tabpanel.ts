import {
    customElement, property,
} from 'lit-element';

import { RasterexElement } from '../rasterex-element';

// `rasterexPanelCounter` counts the number of `<rasterex-tabpanel>` instances created. The
// number is used to generated new, unique IDs.
let rasterexPanelCounter = 0;
/**
 * `RasterexPanel` is a panel for a `<rasterex-tabs>` tab panel.
 */
@customElement('rasterex-tabpanel')
export class RasterexTabpanel extends RasterexElement {
    @property({ type: String, reflect: true })
    role = 'tabpanel';

    @property({ type: String, reflect: true })
    slot = 'panel';

    @property({ type: String, reflect: true})
    id = `rasterex-tabpanel-generated-${rasterexPanelCounter++}`;

    protected createRenderRoot() {
        return this;
    }
}
