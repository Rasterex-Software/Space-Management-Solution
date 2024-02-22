import {
    customElement, property, html, css, svg, TemplateResult, PropertyValues
} from 'lit-element';

import { RasterexElement } from '../rasterex-element';

/**
 * `RasterexTreeViewNode`
 */
@customElement('rasterex-tree-view-node')
export class RasterexTreeViewNode extends RasterexElement {

    // internal properties

    private svgSpritePath = '/src/assets/sprites/font-awesome/regular.svg#'

    // observed properties

    /**
     * Data hold by this node (contains the children).
     *
     * Specific data:
     *
     * - `data.cssID`: string representing the node css id.
     * - `data.name`: string representing the node name.
     * - `data.icon`: string telling which icon to use (default to 'folder' icon).
     * - `data.open`: boolean telling whether the node is expanded or not.
     * - `data.children` array containing the children of the node.
     */
    @property({ type: Object })
    data = null;

    @property({ type: String, reflect: true })
    id = undefined;

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
        return this.data
            ? html`
                <div class="node-container">
                    <div class="node-row">
                        <span class="${this.computeClass()}" @click=${this.toggleChildren}></span>
                        ${this.computeIcon(this.data.icon)}
                        <span class="node-name" @click=${this.select}>${this.data.name}</span>
                    </div>
                    ${this.data.open
                    ? html`
                        <ul>
                            ${this.data.children.map((item) => html`
                                <rasterex-tree-view-node .data="${item}"></rasterex-tree-view-node>
                            `)}
                        </ul>
                        `
                    : ''
                }
                </div>
            `
            : html``;
    }

    protected firstUpdated() {
        this.computeID();
    }

    protected updated(changedProps: PropertyValues) {
        if (changedProps.has('data') && this.data !== undefined) {
            this.computeID();
        }
    }

    /**
     * Returns the necessary classes.
     *
     * @param {object} change An object containing the property that changed and its value.
     * @return {string} The class name indicating whether the node is open or closed
     */
    private computeClass(): string {
        const open = this.data && this.data.open;
        const children = this.data && this.data.children;
        return 'node-preicon ' + ((open && children && children.length) ? 'expanded' : children && children.length ? 'collapsed' : '');
    }

    /**
     * Sets the node css ID if this is provided in node data
     *
     * @private
     */
    private async computeID() {
        await this.updateComplete;

        if (this.data !== null && this.data.cssID !== null) {
            this.id = this.data.cssID;
        }
    }

    /**
     * Compute the necessary node icon.
     *
     * @param {string=folder} an icon name.
     * @return {TemplateResult | string} the computed icon name.
     */
    private computeIcon(icon: string): TemplateResult | string {
        return icon
            ? html`
                <span class="node-icon" @click=${this.select}>
                    ${svg`<svg class="icon">
                        <use href="${this.svgSpritePath + icon}"></use>
                    </svg>`}
                </span>
                `
            : '';
    }


    /**
     * Highlights node as the selected node. Fires `select` event
     */
    private select() {
        // TODO add this as a configuration option
        // Do not fire the select event if the node is not a leaf
        if ( this.data.children && this.data.children.length>0) {
            return;
        }
        const selectEvent = new CustomEvent('select', { bubbles: true, composed: true, detail: this });
        this.dispatchEvent(selectEvent);
    }

    /**
     * Display/Hide the children nodes. Fires `toggle` event
     */
    private toggleChildren() {
        this.data.open = !this.data.open && this.data.children && this.data.children.length;
        this.requestUpdate();

        const toggleEvent = new CustomEvent('toggle', { bubbles: true, composed: true, detail: this });
        this.dispatchEvent(toggleEvent);
    }
}
