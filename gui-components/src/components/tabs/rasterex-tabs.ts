import {
    html, customElement, property, PropertyValues,
} from 'lit-element';

import { RasterexElement } from '../rasterex-element';
import { RasterexTab } from './rasterex-tab';
import { RasterexTabpanel } from './rasterex-tabpanel';
import { dragIcon, collapseIcon, expandIcon } from '../icons';
import { getEvtListenerOptions } from '../../utils/passive-event-listeners';
import { KEYCODE } from '../../utils/keycode';

/**
 * `RasterexTabs` is a container element for tabs and panels.
 *
 * All children of `<rasterex-tabs>` should be either `<rasterex-tab>` or
 * `<rasterex-tabpanel>`. This element is stateless, meaning that no values are
 * cached and therefore, changes during runtime work.
 */
@customElement('rasterex-tabs')
export class RasterexTabs extends RasterexElement {

    // html internal properties
    private tabSlot: HTMLSlotElement | null = null;
    private panelSlot: HTMLSlotElement | null = null;
    private collapseToggle: HTMLElement | null = null;
    private main: HTMLElement | null = null;
    
    // drag internal properties
    private dragging = false;
    private currentX = 0;
    private currentY = 0;
    private initialX = 0;
    private initialY = 0;
    private xOffset = 0;
    private yOffset = 0;

    // collapse internal properties
    private expanded = true;

    // observed properties
    @property({ type: Boolean, reflect: true })
    draggable = false;

    @property({ type: Boolean, reflect: true })
    collapsible = false;

    @property({ type: String, reflect: true })
    role = 'tablist';

    /**
     * Implement to describe the element's DOM using lit-html.
     * Ideally, the render implementation is a pure function using only the element's
     * current properties to describe the element template
     *
     * @protected
     */
    protected render() {
        return html`
        <style>
            :host {
                display: flex;
                flex-wrap: wrap;
            }
            ::slotted(rasterex-tab) {
                cursor: pointer;
            }
            ::slotted(rasterex-tabpanel) {
                flex-basis: 100%;
            }
            #main {
                width: 100%;
            }
            #tabs {
                display: flex;
                flex-basis: 100%;
            }
            #panels {
                display: flex;
                flex-basis: 100%;
            }
            #dragItem {
                cursor: move;
            }
            #collapseToggle {
                cursor: pointer;
            }
            #main.collapsed {
                display: none;
            }
        </style>
        <div id="menu-actions">
            ${this.collapsible ? html`<div id="collapseToggle"
                                           title="collapse"
                                           @click="${this.collapse}">${collapseIcon}</div>` : ``}
            ${this.draggable ? html`<div id="dragItem" title="drag">${dragIcon}</div>` : ``}
        </div>
        <div id="main">
            <div id="tabs"><slot name="tab"></slot></div>
            <div id="panels"><slot name="panel"></slot></div>
        </div>
      `;
    }

    /**
     * Called after the element's DOM has been updated the first time, immediately before updated() is called.
     * This method can be useful for capturing references to rendered static nodes that must be directly acted upon,
     * for example in updated(). Setting properties inside this method will trigger the element to update.
     *
     * @protected
     */
    protected firstUpdated() {
        this.tabSlot = (this.shadowRoot as ShadowRoot).querySelector('slot[name=tab]') as HTMLSlotElement;
        this.panelSlot = (this.shadowRoot as ShadowRoot).querySelector('slot[name=panel]') as HTMLSlotElement;

        // This element needs to react to new children as it links up tabs and
        // panel semantically using `aria-labelledby` and `aria-controls`.
        // New children will get slotted automatically and cause `slotchange`
        // to fire, so not `MutationObserver` is needed.
        this.tabSlot.addEventListener('slotchange', this.onSlotChange);
        this.panelSlot.addEventListener('slotchange', this.onSlotChange);

        this.addEventListener('click', this);
        this.addEventListener('keydown', this);

        // attach draggable events
        if (this.draggable) {
            this.addDraggableEvents();
        }

        // collapse
        if (this.collapsible) {
            this.collapseToggle = (this.shadowRoot as ShadowRoot).querySelector('#collapseToggle');
            this.main = (this.shadowRoot as ShadowRoot).querySelector('#main');
        }

        // Up until recently, `slotchange` events did not fire when an element was
        // upgraded by the parser. For this reason, the element invokes the
        // handler manually. Once the new behavior lands in all browsers, the code
        // below can be removed.
        Promise.all([
            customElements.whenDefined('rasterex-tabpanel'),
            customElements.whenDefined('rasterex-tab'),
        ])
            .then( () => this.linkPanels());
    }

    /**
     * Called whenever the element is updated.
     * Setting properties inside this method will trigger the element to update.
     *
     * @protected
     * @param {PropertyValues} changedProperties
     */
    protected updated(changedProperties: PropertyValues) {
        changedProperties.forEach((oldValue, propName: any) => {
            // add/remove drag event handlers
            if (propName === 'draggable' && undefined !== oldValue) {
                if (oldValue) {
                    this.removeDraggableEvents();
                } else {
                    this.addDraggableEvents();
                }
            }

            // init internal collapse properties
            if (propName === 'collapsible' && undefined !== oldValue) {
                if (!oldValue) {
                    this.collapseToggle = (this.shadowRoot as ShadowRoot).querySelector('#collapseToggle');
                    this.main = (this.shadowRoot as ShadowRoot).querySelector('#main');
                }
            }
        });
    }

    constructor() {
        super();

        // Event handlers that are not attached to this element need to be bound
        // if they need access to `this`.
        this.onSlotChange = this.onSlotChange.bind(this);
    }

    /**
     * `disconnectedCallback()` removes the event listeners that
     * `firstUpdated` added.
     */
    public disconnectedCallback() {
        super.disconnectedCallback();

        this.removeEventListener('click', this);
        this.removeEventListener('keydown', this);

        if (this.draggable) {
            this.removeDraggableEvents();
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
        if (e.type === 'click') {
            this.onClick(e as MouseEvent);
        } else if (e.type === 'keydown') {
            this.onKeyDown(e as KeyboardEvent);

            // Slot change
        } else if (e.type === 'slotchange') {
            this.onSlotChange();

            // Touch / drag
        } else if (e.type === 'mousedown' || e.type === 'touchstart') {
            this.dragStart(e);
        } else if (e.type === 'mousemove' || e.type === 'touchmove') {
            this.drag(e);
        } else if (e.type === 'mouseup' || e.type === 'touchend' || e.type === 'touchcancel') {
            this.dragEnd();
        }
    }

    /**
     * `dragItem()` returns draggable item. This function
     * could memoize the result if the DOM queries ever become a performance
     * issue. 
     *
     * This is a method and not a getter, because a getter implies that it is
     * cheap to read.
     *
     * @private
     * @returns {(HTMLElement | null)}
     * @memberof RasterexTabs
     */
    private draggableItem(): HTMLElement | null {
        return (this.shadowRoot as ShadowRoot).querySelector('#dragItem');
    }

    /**
     * `onSlotChange()` is called whenever an element is added or removed from
     * one of the shadow DOM slots.
     *
     * @private
     * @memberof RasterexTabs
     */
    private onSlotChange() {
        this.linkPanels();
    }

    /**
     * `linkPanels()` links up tabs with their adjacent panels using
     * `aria-controls` and `aria-labelledby`. Additionally, the method makes
     * sure only one tab is active.
     *
     * If this function becomes a bottleneck, it can be easily optimized by
     * only handling the new elements instead of iterating over all of the
     * element’s children.
     *
     * @private
     * @memberof RasterexTabs
     */
    private linkPanels(): void {
        const tabs = this.allTabs();

        if (tabs.length === 0 ) {
            return;
        }

        // Give each existing panel a `aria-labelledby` attribute that refers to the tab
        // that controls it.
        tabs.forEach((tab) => {
            const panel = tab.nextElementSibling as RasterexTabpanel;
            if (null === panel || panel.nodeName.toLowerCase() !== 'rasterex-tabpanel') {
                return;
                // console.error(`Tab #${tab.id} is not a` +
                   // `sibling of a <rasterex-tabpanel>`);
            }

            tab.setAttribute('aria-controls', panel.id);
            panel.setAttribute('aria-labelledby', tab.id);
        });

        // The element checks if any of the tabs have been marked as selected.
        // If not, the first tab is now selected.
        const selectedTab =
            tabs.find((tab) => tab.selected) || tabs[0];

        // // Next, switch to the selected tab. `selectTab()` takes care of
        // // marking all other tabs as deselected and hiding all other panels.
        this.selectTab(selectedTab);
    }

    /**
     *
     * `allPanels()` returns all the panels in the tab panel. This function
     * could memoize the result if the DOM queries ever become a performance
     * issue. The downside of memoization is that dynamically added tabs and
     * panels will not be handled.
     *
     * This is a method and not a getter, because a getter implies that it is
     * cheap to read.
     *
     * @private
     * @returns {RasterexTabpanel[]}
     * @memberof RasterexTabs
     */
    private allPanels(): RasterexTabpanel[] {
        return Array.from(this.querySelectorAll('rasterex-tabpanel'));
    }

    /**
     * `allTabs()` returns all the tabs in the tab panel.
     *
     * @private
     * @returns {RasterexTab[]}
     * @memberof RasterexTabs
     */
    private allTabs(): RasterexTab[] {
        return Array.from(this.querySelectorAll('rasterex-tab'));
    }

    /**
     * `panelForTab()` returns the panel that the given tab controls.
     *
     * @private
     * @param {RasterexTab} tab
     * @returns {(RasterexTabpanel | null)}
     * @memberof RasterexTabs
     */
    private panelForTab(tab: RasterexTab): RasterexTabpanel | null {
        return this.querySelector('[aria-labelledby="' + tab.id + '"]');
    }

    /**
     * `prevTab()` returns the tab that comes before the currently selected
     * one, wrapping around when reaching the first one.
     *
     * @private
     * @memberof RasterexTabs
     */
    private prevTab() {
        const tabs = this.allTabs();
        // Use `findIndex()` to find the index of the currently
        // selected element and subtracts one to get the index of the previous
        // element.
        const newIdx =
            tabs.findIndex((tab) => tab.selected) - 1;
        // Add `tabs.length` to make sure the index is a positive number
        // and get the modulus to wrap around if necessary.
        return tabs[(newIdx + tabs.length) % tabs.length];
    }

    /**
     * `firstTab()` returns the first tab.
     *
     * @private
     * @memberof RasterexTabs
     */
    private firstTab() {
        const tabs = this.allTabs();
        return tabs[0];
    }

    /**
     * `lastTab()` returns the last tab.
     *
     * @private
     * @memberof RasterexTabs
     */
    private lastTab() {
        const tabs = this.allTabs();
        return tabs[tabs.length - 1];
    }

    /**
     * `nextTab()` gets the tab that comes after the currently selected one,
     * wrapping around when reaching the last tab.
     *
     * @private
     * @memberof RasterexTabs
     */
    private nextTab() {
        const tabs = this.allTabs();
        const newIdx = tabs.findIndex((tab) => tab.selected) + 1;
        return tabs[newIdx % tabs.length];
    }

    /**
     * `reset()` marks all tabs as deselected and hides all the panels.
     *
     * @private
     * @memberof RasterexTabs
     */
    private reset(): void {
        const tabs = this.allTabs();
        const panels = this.allPanels();

        tabs.forEach((tab) => tab.selected = false);
        panels.forEach((panel) => panel.hidden = true);
    }

    /**
     * `selectTab()` marks the given tab as selected.
     * Additionally, it unhides the panel corresponding to the given tab.
     *
     * @private
     * @param {RasterexTab} newTab
     * @memberof RasterexTabs
     */
    private selectTab(newTab: RasterexTab): void {
        // Deselect all tabs and hide all panels.
        this.reset();

        newTab.selected = true;
        newTab.focus();

        this.dispatchEvent(new CustomEvent('tab-selected', {bubbles: true, composed: true, detail:{newTab}}));

        // Get the panel that the `newTab` is associated with.
        const newPanel = this.panelForTab(newTab);
        // If that panel doesn’t exist, abort.
        if (newPanel) {
            newPanel.hidden = false;
        }
    }

    /**
     * `onClick()` handles clicks inside the tab panel.
     *
     * @private
     * @param {MouseEvent} event
     * @returns
     * @memberof RasterexTabs
     */
    private onClick(event: MouseEvent) {
        // If the click was not targeted on a tab element itself,
        // it was a click inside the a panel or on empty space. Nothing to do.
        if ((event.target as HTMLElement).getAttribute('role') !== 'tab') {
            return;
        }
        // If it was on a tab element, though, select that tab.
        this.selectTab((event.target as RasterexTab));
    }

    /**
     * `onKeyDown()` handles key presses inside the tab panel.
     *
     * @private
     * @param {KeyboardEvent} event
     * @returns
     * @memberof RasterexTabs
     */
    private onKeyDown(event: KeyboardEvent) {
        // If the keypress did not originate from a tab element itself,
        // it was a keypress inside the a panel or on empty space. Nothing to do.
        if ((event.target as HTMLElement).getAttribute('role') !== 'tab') {
            return;
        }
        // Don’t handle modifier shortcuts typically used by assistive technology.
        if (event.altKey) {
            return;
        }

        // The switch-case will determine which tab should be marked as active
        // depending on the key that was pressed.
        let newTab;
        switch (event.keyCode) {
            case KEYCODE.LEFT:
            case KEYCODE.UP:
                newTab = this.prevTab();
                break;

            case KEYCODE.RIGHT:
            case KEYCODE.DOWN:
                newTab = this.nextTab();
                break;

            case KEYCODE.HOME:
                newTab = this.firstTab();
                break;

            case KEYCODE.END:
                newTab = this.lastTab();
                break;
            // Any other key press is ignored and passed back to the browser.
            default:
                return;
        }

        // The browser might have some native functionality bound to the arrow
        // keys, home or end. The element calls `preventDefault()` to prevent the
        // browser from taking any actions.
        event.preventDefault();
        // Select the new tab, that has been determined in the switch-case.
        this.selectTab(newTab);
    }

    // ===========================================================================
    // Pointer events + drag
    // ===========================================================================

    /**
     * Add events listeners for draggable feature
     *
     * @private
     * @memberof RasterexTabs
     */
    private addDraggableEvents() {
        const dragItem = this.draggableItem();
        if (dragItem) {
            dragItem.addEventListener('touchstart', this, false);
            dragItem.addEventListener('mousedown', this, false);

            // fixes weird safari 10 bug where preventDefault is prevented
            // @see https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356
            window.addEventListener('touchmove', () => { return; });
        }
    }

    /**
     * Remove events listeners for draggable feature
     *
     * @private
     * @memberof RasterexTabs
     */
    private removeDraggableEvents() {
        const dragItem = this.draggableItem();
        if (dragItem) {
            dragItem.removeEventListener('touchstart', this);
            dragItem.removeEventListener('mousedown', this);
        }
    }

    /**
     * Event handler for drag start(touchstart|mousedown)
     *
     * @param {Event} e
     * @memberof RasterexTabs
     */
    private dragStart(e: Event) {
        if (e.type === 'touchstart') {
            this.initialX = ((e as TouchEvent).touches)[0].clientX - this.xOffset;
            this.initialY = ((e as TouchEvent).touches)[0].clientY - this.yOffset;
        } else {
            this.initialX = (e as MouseEvent).clientX - this.xOffset;
            this.initialY = (e as MouseEvent).clientY - this.yOffset;
        }

        this.dragging = true;

        window.addEventListener('touchmove', this, getEvtListenerOptions(false));
        window.addEventListener('mousemove', this, getEvtListenerOptions(false));
        window.addEventListener('mouseup', this, false);
        window.addEventListener('touchend', this, false);
        window.addEventListener('touchcancel', this, false);
    }

    /**
     * Event handler for drag move(touchmove|mousemove)
     * TODO: drag feature for responsive layout
     * @param {Event} e
     * @memberof RasterexTabs
     */
    private drag(e: Event) {
        if (this.dragging) {
            e.preventDefault();

            if (e.type === 'touchmove') {
                this.currentX = ((e as TouchEvent).touches)[0].clientX - this.initialX;
                this.currentY = ((e as TouchEvent).touches)[0].clientY - this.initialY;
            } else {
                this.currentX = (e as MouseEvent).clientX - this.initialX;
                this.currentY = (e as MouseEvent).clientY - this.initialY;
            }

            this.xOffset = this.currentX;
            this.yOffset = this.currentY;

            this.setTranslate(this.currentX, this.currentY);
        }
    }

    /**
     * Event handler for drag end(touchend|mouseup)
     *
     * @memberof RasterexTabs
     */
    private dragEnd() {
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.dragging = false;

        window.removeEventListener('touchmove', this);
        window.removeEventListener('mousemove', this);
        window.removeEventListener('touchend', this);
        window.removeEventListener('mouseup', this);
        window.removeEventListener('touchcancel', this);
    }

    /**
     * Updates the component translate3d property
     *
     * @private
     * @param {number} xPos
     * @param {number} yPos
     * @memberof RasterexTabs
     */
    private setTranslate(xPos: number, yPos: number) {
        this.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)';
    }

    /**
     * Basic collapse handler
     *
     * @private
     * @returns
     * @memberof RasterexTabs
     */
    private collapse() {
        if (this.collapsible && this.main && this.collapseToggle) {
            // collapse
            if (this.expanded) {
                this.main.classList.add('collapsed');
                this.collapseToggle.title = 'expand';
                this.collapseToggle.innerHTML = expandIcon.getHTML();
                this.expanded = false;
                return;
            }

            // expand
            this.main.classList.remove('collapsed');
            this.collapseToggle.title = 'collapse';
            this.collapseToggle.innerHTML = collapseIcon.getHTML();
            this.expanded = true;
        }
    }
}
