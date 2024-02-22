// TODO extract/convert the sm-tree component ( from space-management-viewer ) to a reusable one
// this is not currenlty functional
import {
    customElement, property, html, css, svg, TemplateResult, query
} from 'lit-element';

import { RasterexElement } from '../rasterex-element';

/**
 * `RasterexTree`
 */
@customElement('rasterex-tree')
export class RasterexTree extends RasterexElement {
    // internal properties

    private svgSpritePath = '/src/assets/sprites/font-awesome/regular.svg#'
    // '/assets/feather-sprite.svg#'

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

    static get styles() {
        return [
            css`
                :host(.selected) > .node-container > .node-row {
                    background-color: var(--rasterex-tree-view-selected-background-color, rgba(200, 200, 200, 0.5));
                    color: var(--rasterex-tree-view-selected-color, inherit);
                }

                .node-container {
                    white-space: nowrap;
                }

                .node-row {
                    padding-left: 4px;
                    padding-right: 4px;
                }
                .node-preicon.collapsed,
                .node-preicon.expanded {
                    padding-left: 0px;
                }

                .node-preicon {
                    padding-left: 18px;
                }

                .node-preicon:before {
                    margin-right: 5px;
                }

                .node-preicon.collapsed:before {
                    content: '\\002B';
                }

                .node-preicon.expanded:before {
                    content: '\\2212';
                }

                .node-preicon, .node-name {
                    cursor: pointer;
                }

                .node-icon {
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    position: relative;
                    vertical-align: middle;
                    width: var(--rasterex-tree-view-icon-size, 24px);
                    height: var(--rasterex-tree-view-icon-size, 24px);
                }

                .node-icon svg {
                    fill: currentcolor;
                    stroke: none;
                    width: var(--rasterex-tree-view-icon-size, 24px);
                    height: var(--rasterex-tree-view-icon-size, 24px);
                }

                ul {
                    margin: 0;
                    padding-left: 20px;
                }

                li {
                    list-style-type: none;
                }

                [hidden] {
                    display: none;
                }
            `
        ];
    }


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

    protected renderNode(nodeData:any) {
        return nodeData
            ? html`
                <div class="node-container">
                    <div class="node-row">
                        <span class="${this.computeClass()}" @click=${this.toggleChildren}></span>
                        ${this.computeIcon(nodeData.icon)}
                        <span class="node-name" @click=${this.selectNode}>${nodeData.name}</span>

                    </div>
                    ${nodeData.open
                    ? html`
                        <ul>
                            ${nodeData.children.map((childNodeData) => this.renderNode(childNodeData))}
                        </ul>
                        `
                    : ''
                }
                </div>
            `
            : html``;
    }

    /**
     * Called when the `select` event is fired from an internal node.
     *
     * @param {object} e An event object.
     */
    public selectNode(e: CustomEvent) {
        // TODO add this as a configuration option
        // Do not fire the select event if the node is not a leaf
        if ( this.data.children && this.data.children.length>0) {
            return;
        }
        const selectEvent = new CustomEvent('select', { bubbles: true, composed: true, detail: this });
        this.dispatchEvent(selectEvent);

        // deselect node if same is selected
        if (this.selected !== null && this.selected === e.detail) {
            this.selected.classList.toggle('selected');
            this.selected = null;
            return;
        }

        if (this.selected) {
            this.selected.classList.toggle('selected');
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


    private computeClass(): string {
        const open = this.data && this.data.open;
        const children = this.data && this.data.children;
        return 'node-preicon ' + ((open && children && children.length) ? 'expanded' : children && children.length ? 'collapsed' : '');
    }

    private async computeID() {
        await this.updateComplete;

        if (this.data !== null && this.data.cssID !== null) {
            this.id = this.data.cssID;
        }
    }


    private computeIcon(icon: string): TemplateResult | string {
        return icon
            ? html`
                <span class="node-icon" @click=${this.selectNode}>
                    ${svg`<svg class="icon">
                        <use href="${this.svgSpritePath + icon}"></use>
                    </svg>`}
                </span>
                `
            : '';
    }

    private toggleChildren() {
        this.data.open = !this.data.open && this.data.children && this.data.children.length;
        this.requestUpdate();

        const toggleEvent = new CustomEvent('toggle', { bubbles: true, composed: true, detail: this });
        this.dispatchEvent(toggleEvent);
    }
}
