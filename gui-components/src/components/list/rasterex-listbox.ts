import {
    html, css, customElement, property, PropertyValues,
} from 'lit-element';

import { RasterexElement } from '../rasterex-element';
import { RasterexItem } from './rasterex-item';

/**
 * `RasterexList` implements an accessible listbox control.
 */
@customElement('rasterex-listbox')
export class RasterexListbox extends RasterexElement {

    private readonly LIST_ITEM_NAME = 'rasterex-item';

    // internal properties
    private itemNodes: RasterexItem[] = [];
    private lastSelectedItem: HTMLElement;
    private keyboardAttached: boolean;

    // observed properties
    @property({ type: Object })
    value = {};

    @property({ type: String, reflect: true })
    selected = '';

    @property({ type: Boolean, reflect: true })
    horizontal = false;

    protected createRenderRoot() {
        const root = super.createRenderRoot();
        this.classList.add('pending');
        return root;
    }

    static get styles() {
        return [
            css`
                :host {
                    display: inline-block;
                    font-family: inherit;
                    position: relative;
                    padding: var(--rasterex-listbox-padding, 5px);
                    outline: none;
                }

                :host(.pending) {
                    opacity: 0;
                }
                :host(:focus) path {
                    stroke-width: 1.5;
                }

                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                    border: var(--rasterex-listbox-ovelay-border, 1px solid #d3d3d3);
                    display: var(--rasterex-listbox-overlay-display, none);
                }

                ::slotted(.selected-item) {
                    background: var(--rasterex-item-selected-bg, #f1f1f1);
                }

                ::slotted(rasterex-item) {
                    cursor: pointer;
                    white-space: nowrap;
                    display: block;
                }

                :host(.horizontal) ::slotted(rasterex-item) {
                    display: inline-block;
                }

                ::slotted(rasterex-item:hover) {
                    background: var(--rasterex-item-hover-bg, #f1f1f1);
                }
            `
        ];
    }

    protected render() {
        if (this.horizontal) {
            this.classList.add('horizontal');
        } else {
            this.classList.remove('horizontal');
        }

        return html`
            <slot id="slot" @slotchange="${this.refreshItems}"></slot>
            <div class="overlay"></div>
        `;
    }

    protected firstUpdated() {
        this.tabIndex = (Number(this.getAttribute('tabindex')) || 0);
        this.classList.remove('pending');
        this.setAttribute('role', 'listbox');

        this.addEventListener('item-click', this);

        if (!this.keyboardAttached) {
            this.addEventListener('keydown', this)
            this.keyboardAttached = true;
        }

        Promise.all([
            customElements.whenDefined('rasterex-item'),
        ])
            .then(() => this.refreshItems())
    }

    protected updated(changedProperties: PropertyValues) {
        if (changedProperties.has('selected') && changedProperties.get('selected') !== undefined) {
            this.refreshSelection();
        }
    }

    public disconnectedCallback() {
        super.disconnectedCallback();

        this.removeEventListener('item-click', this)

        if (this.keyboardAttached === true) {
            this.removeEventListener('keydown', this);
            this.keyboardAttached = false;
        }
    }

    /**
     * Defining handleEvent allows to pass `this` as the callback to every
     * `addEventListener` and `removeEventListener`. This avoids the need of
     * binding every function. See
     * https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
     *
     * @param {Event} e Any event.
     * @public
     */
    public handleEvent(e: Event) {
        if (e.type === 'item-click') {
            this.onItemClick(e as CustomEvent);
        } else if (e.type === 'keydown') {
            this.onKeyDown(e as KeyboardEvent);
        }
    }

    /**
     * `refreshItems()` sets attribute role `option` to each item and takes care of selected item.
     *
     * TODO: known issue is that selected item is cleared
     *
     * If this function becomes a bottleneck, it can be easily optimized by
     * only handling the new elements instead of iterating over all of the
     * element’s children.
     *
     * @private
     * @memberof RasterexListbox
     */
    private refreshItems() {
        this.itemNodes = [];

        const nodes = (this.shadowRoot.getElementById('slot') as HTMLSlotElement).assignedNodes() as RasterexItem[];
        if (nodes && nodes.length) {
            for (const node of nodes) {
                if (node.tagName === this.LIST_ITEM_NAME.toUpperCase()) {
                    node.setAttribute('role', 'option');
                    this.itemNodes.push(node);
                }
            }
        }

        this.refreshSelection()
    }

    /**
     * `refreshSelection()` refresh selected item. Adds `aria-selected` to selected item
     *
     * @private
     * @memberof RasterexListbox
     */
    private refreshSelection() {
        if (this.lastSelectedItem) {
            this.lastSelectedItem.classList.remove('selected-item');
            this.lastSelectedItem.removeAttribute('aria-selected');
        }

        const nodes = this.itemNodes;

        if (nodes) {
            let selectedItem = null;

            for (const node of nodes) {
                if (node.tagName === this.LIST_ITEM_NAME.toUpperCase()) {
                    const value = node.value || '';
                    if (this.selected && (value === this.selected)) {
                        selectedItem = node;
                        break;
                    }
                }
            }
            this.lastSelectedItem = selectedItem;

            if (this.lastSelectedItem) {
                this.lastSelectedItem.setAttribute('aria-selected', 'true');
            }

            if (selectedItem) {
                this.lastSelectedItem.classList.add('selected-item');
                this.value = {
                    value: selectedItem.value,
                    text: selectedItem.innerText
                };
            } else {
                this.value = null;
            }
        }
    }

    /**
     * Fires `selected` event
     *
     * @private
     * @memberof RasterexListbox
     */
    private fireSelected() {
        const selectedEvent = new CustomEvent('selected', { bubbles: true, composed: true, detail: { selected: this.selected } });
        this.dispatchEvent(selectedEvent);
    }

    /**
     * `item-click` event handler. Selects clicked item and fires `selected` event
     *
     * @private
     * @param {CustomEvent} event
     * @memberof RasterexListbox
     */
    private onItemClick(event: CustomEvent) {
        event.stopPropagation();
        this.selected = event.detail.value;
        this.refreshSelection();
        this.fireSelected();
    }

    /**
     * `keydown` event handler
     *
     * @private
     * @param {KeyboardEvent} event
     * @memberof RasterexListbox
     */
    private onKeyDown(event: KeyboardEvent) {
        switch (event.keyCode) {
            case 37:
            case 38:
                event.preventDefault();
                this.selectPrevious();
                break;
            case 39:
            case 40:
                event.preventDefault();
                this.selectNext();
                break;
        }
    }

    /**
     * Selects previous item. Used in `keydown` event handler
     *
     * @private
     * @memberof RasterexListbox
     */
    private selectPrevious() {
        const list = this.itemNodes;
        if (list.length) {
            let index = -1;
            for (let i = 0; i < list.length; i++) {
                if (list[i] === this.lastSelectedItem) {
                    index = i;
                    break;
                }
            }
            if (index < 0) {
                index = 0
            } else if (index === 0) {
                index = list.length - 1;
            } else {
                index--;
            }
            this.selected = list[index].value || '';
            this.refreshSelection();
            this.fireSelected();
        }
    }

    /**
     * Selects next item. Used in `keydown` event handler
     *
     * @private
     * @memberof RasterexListbox
     */
    private selectNext() {
        const list = this.itemNodes;
        if (list.length) {
            let index = -1;
            for (let i = 0; i < list.length; i++) {
                if (list[i] === this.lastSelectedItem) {
                    index = i;
                    break;
                }
            }
            if (index < 0) {
                index = 0
            } else if (index >= (list.length - 1)) {
                index = 0;
            } else {
                index++;
            }
            this.selected = list[index].value || '';
            this.refreshSelection();
            this.fireSelected();
        }
    }
}