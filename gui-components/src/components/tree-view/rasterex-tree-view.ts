import {
    customElement, property, html, query
} from 'lit-element';

import { RasterexElement } from '../rasterex-element';

// TODO: Add aria attributes, keyboard events

/**
 * `RasterexTreeView`
 */
@customElement('rasterex-tree-view')
export class RasterexTreeView extends RasterexElement {

    // internal properties
    @query('#root')
    private root: HTMLElement;

    // observed properties

    /**
     * Data hold by the root node (contains the children).
     *
     * Specific data:
     *
     * - `data.name`: string representing the node name.
     * - `data.icon`: string telling which icon to use (default to 'folder' icon).
     * - `data.open`: boolean telling whether the node is expanded or not.
     * - `data.children` array containing the children of the node.
     */
    @property({ type: Object })
    data = null;

    selected = null;

    protected render() {
        return html`
            <div>
                <rasterex-tree-view-node
                    id="root"
                    .data=${this.data}
                    @select=${this.selectNode}>
                </rasterex-tree-view-node>
            </div>
        `
    }

    /**
     * Called when the `select` event is fired from an internal node.
     *
     * @param {object} e An event object.
     */
    public selectNode(e: CustomEvent) {
        // deselect node if same is selected
        if (this.selected !== null && this.selected === e.detail) {
            this.selected.classList.toggle('selected');
            this.selected = null;
            return;
        }

        if (this.selected) {
            this.selected.classList.toggle('selected');
        }

        // Only selects `<rasterex-tree-view-node>`.
        if (e.detail && e.detail.tagName === 'RASTEREX-TREE-VIEW-NODE') {
            this.selected = e.detail;
            this.selected.classList.toggle('selected');
        } else {
            this.selected = null;
        }
    }

    public deselectNode() {
        if (this.selected !== null) {
            if (this.selected.classList.contains('selected')) {
                this.selected.classList.remove('selected');
            }
            this.selected = null;
        }
    }
}
