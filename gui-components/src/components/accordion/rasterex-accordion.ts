import {
    html, customElement,
} from 'lit-element';

import { RasterexElement } from '../rasterex-element';
import { KEYCODE } from '../../utils/keycode';
import { RasterexAccordionHeading } from './rasterex-accordion-heading';
import { RasterexAccordionPanel } from './rasterex-accordion-panel';

/**
 * `RasterexAccordion` is a container element for headings and panels.
 *
 * Each heading must be a `<rasterex-accordion-heading>`. Each panel must be a
 * `<rasterex-accordion-panel>` and must be adjacent to a heading.
 */
@customElement('rasterex-accordion')
export class RasterexAccordion extends RasterexElement {

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
                flex-direction: column;
                align-items: stretch;
                --accordion-animation: transform 0.3s ease-in-out;
            }
            ::slotted(.animating) {
                transition: var(--accordion-animation)
            }
        </style>
        <slot></slot>
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
        // `<rasterex-accordion-header>` emit a custom event when the heading is
        // instructed to expand.
        this.addEventListener('change', this);
        this.addEventListener('keydown', this);

        // Up until recently, `slotchange` events did not fire when an element was
        // upgraded by the parser. For this reason, the element invokes the
        // handler manually. Once the new behavior lands in all browsers, the code
        // below can be removed.
        Promise.all([
            customElements.whenDefined('rasterex-accordion-heading'),
            customElements.whenDefined('rasterex-accordion-panel'),
        ])
            .then(() => this.linkPanels());
    }

    /**
     * `disconnectedCallback()` removes the event listeners that
     * `firstUpdated` added.
     */
    public disconnectedCallback() {
        super.disconnectedCallback();

        this.removeEventListener('change', this);
        this.removeEventListener('keydown', this);
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
        if (e.type === 'change') {
            this.onChange(e as CustomEvent);
        } else if (e.type === 'keydown') {
            this.onKeyDown(e as KeyboardEvent);
        }
    }

    /**
     * `allHeadings` returns all the headings in the accordion.
     *
     * @public
     * @returns {RasterexAccordionHeading[]}
     * @memberof RasterexAccordion
     */
    public allHeadings(): RasterexAccordionHeading[] {
        return Array.from(this.querySelectorAll('rasterex-accordion-heading'));
    }

    /**
     * `allPanels` returns all the panels in the accordion. This function could
     * memoize the result if the DOM queries ever become a performance issue.
     * The downside of memoization is that dynamically added headings and panels
     * will not be handled.
     *
     * This is a method and not a getter, because a getter implies that it is
     * cheap to read while this method queries the DOM on every call.
     *
     * @public
     * @returns {RasterexAccordionHeading[]}
     * @memberof RasterexAccordion
     */
    public allPanels(): RasterexAccordionHeading[] {
        return Array.from(this.querySelectorAll('rasterex-accordion-panel'));
    }

    /**
     * `linkPanels()` links up headings with their adjacent panels using
     * `aria-controls` and `aria-labelledby`.
     *
     * If this function becomes a bottleneck, it can be easily optimized by
     * only handling the new elements instead of iterating over all of the
     * element’s children.
     *
     * @private
     * @memberof RasterexAccordion
     */
    private linkPanels(): void {
        // Acquire all headings inside the element that need to be set up.
        const headings = this.allHeadings();

        // Give all headings and panels a unique ID. Set up `aria-controls` and
        // `aria-labelledby` attributes on headings and panels using those IDs.
        headings.forEach((heading) => {
            // All buttons inside the `RasterexAccordionHeadings` are made
            // unfocusable here. Only the first heading will be made focusable
            // afterwards. This is necessary to implement roving tabindex.
            heading.setAttribute('tabindex', '-1');
            const panel = this.panelForHeading(heading);

            if (!panel) {
                return;
            }

            // Make headings and panels reference each other
            // with the `aria-labelledby` and `aria-controls` attributes.
            heading.setAttribute('aria-controls', panel.id);
            panel.setAttribute('aria-labelledby', heading.id);
        });

        if (headings.length>0) {
            // Make the first heading focusable.
            headings[0].setAttribute('tabindex', '0');
        }

        // Set all the panels to the collapsed state to have a well-defined
        // initial state.

        // Check if any of the headings have been marked as
        // expanded using the `expanded` attribute. If so, all the associated
        // panels get expanded as well.
        headings
            .forEach((heading) => {
                const panel = this.panelForHeading(heading);
                if (!panel) {
                    return;
                }

                if (!heading.expanded) {
                    this.collapseHeading(heading);
                    this.collapsePanel(panel);
                } else {
                    this.expandHeading(heading);
                    this.expandPanel(panel);
                }
            });
    }

    /**
     * `isHeading` returns true if the given element
     * is a `<rasterex-accordion-heading>`.
     *
     * @private
     * @param {Element} elem
     * @returns {boolean}
     * @memberof RasterexAccordion
     */
    private isHeading(elem: Element): boolean {
        return elem.tagName.toLowerCase() === 'rasterex-accordion-heading';
    }

    /**
     * `onChange` handles the `change` event. The event’s
     * target is the heading that has been instructed to expand by click,
     * keyboard input.
     */
    private onChange(event: CustomEvent) {
        this.animatePanelForHeading(event.target as RasterexAccordionHeading, event.detail.isExpandedNow);
    }

    /**
     * `animatePanelForHeading` animates the expansion of a panel, provided
     * there is no other animation running.
     *
     * @private
     * @param {RasterexAccordionHeading} heading
     * @param {boolean} expand
     * @returns
     * @memberof RasterexAccordion
     */
    private animatePanelForHeading(heading: RasterexAccordionHeading, expand: boolean) {
        // If there’s an animation running, ignore the event.
        if (this.classList.contains('animating')) {
            return;
        }

        const panel = this.panelForHeading(heading);

        if (!panel) {
            return;
        }

        if (expand) {
            this.expandPanel(panel).then(() => {
                this.animateIn(panel);
            });
        } else {
            this.animateOut(panel)
                .then(() => this.collapsePanel(panel));
        }
    }

    /**
     * `onKeyDown` handles key presses inside the accordion.
     *
     * @private
     * @param {KeyboardEvent} event
     * @returns
     * @memberof RasterexAccordion
     */
    // TODO: fix expand when press enter
    private onKeyDown(event: KeyboardEvent) {
        // If the currently focused element is not a heading, the keypress
        // originated from inside a panel or empty space. Nothing to do.
        const currentHeading = event.target as Element;
        if (!this.isHeading(currentHeading)) {
            return;
        }

        // Don’t handle modifier shortcuts typically used by assistive technology.
        if (event.altKey) {
            return;
        }

        // The switch-case will determine which heading should be focused next
        // depending on the key that was pressed.
        let newHeading;
        switch (event.keyCode) {
            case KEYCODE.LEFT:
            case KEYCODE.UP:
                newHeading = this.prevHeading();
                break;

            case KEYCODE.RIGHT:
            case KEYCODE.DOWN:
                newHeading = this.nextHeading();
                break;

            case KEYCODE.HOME:
                newHeading = this.firstHeading();
                break;

            case KEYCODE.END:
                newHeading = this.lastHeading();
                break;
            // Any other key press is ignored and passed back to the browser.
            default:
                return;
        }

        // The browser might have some native functionality bound to the arrow
        // keys, home or end. The element calls `preventDefault` to prevent the
        // browser from taking any actions.
        event.preventDefault();
        // Make the currently focused heading unfocusable, then make the new
        // heading focusable and give focus to it.
        currentHeading.setAttribute('tabindex', '-1');
        newHeading.setAttribute('tabindex', '0');
        newHeading.focus();
    }

    /**
     * `panelForHeading` returns the panel that the given heading controls.
     *
     * @private
     * @param {RasterexAccordionHeading} heading
     * @returns {(RasterexAccordionPanel | undefined)}
     * @memberof RasterexAccordion
     */
    private panelForHeading(heading: RasterexAccordionHeading): RasterexAccordionPanel | undefined {
        const next = heading.nextElementSibling as RasterexAccordionPanel;
        if (next.tagName.toLowerCase() !== 'rasterex-accordion-panel') {
            console.error('Sibling element to a heading need to be a panel.');
            return undefined;
        }
        return next;
    }

    /**
     * `prevHeading` returns the heading that comes before the currently
     * selected one, wrapping around when reaching the first one.
     *
     * @private
     * @returns
     * @memberof RasterexAccordion
     */
    private prevHeading() {
        const headings = this.allHeadings();
        // Use `findIndex` to find the index of the currently
        // selected element and subtracts one to get the index of the previous
        // element.
        const newIdx =
            headings.findIndex((headingEl) =>
                headingEl === document.activeElement) - 1;
        // Add `headings.length` to make sure the index is a positive number
        // and get the modulus to wrap around if necessary.
        return headings[(newIdx + headings.length) % headings.length];
    }

    /**
     * `nextHeading` gets the heading that comes after the currently selected
     * one, wrapping around when reaching the last heading.
     *
     * @private
     * @returns
     * @memberof RasterexAccordion
     */
    private nextHeading() {
        const headings = this.allHeadings();
        const newIdx =
            headings.findIndex((heading) =>
                heading === document.activeElement) + 1;
        return headings[newIdx % headings.length];
    }

    /**
     * `firstHeading` returns the first heading.
     *
     * @private
     * @returns
     * @memberof RasterexAccordion
     */
    private firstHeading() {
        const headings = this.allHeadings();
        return headings[0];
    }

    /**
     * `lastHeading` returns the last heading.
     */
    private lastHeading() {
        const headings = this.allHeadings();
        return headings[headings.length - 1];
    }

    /**
     * `expandPanel` puts the given panel in the expanded state.
     *
     * @private
     * @param {RasterexAccordionPanel} panel
     * @returns {Promise<unknown>}
     * @memberof RasterexAccordion
     */
    private expandPanel(panel: RasterexAccordionPanel): Promise<unknown> {
        panel.expanded = true;
        return panel.updateComplete;
    }

    /**
     * `collapsePanel` puts the given panel in the collapsed state.
     *
     * @private
     * @param {RasterexAccordionPanel} panel
     * @memberof RasterexAccordion
     */
    private collapsePanel(panel: RasterexAccordionPanel) {
        panel.expanded = false;
    }

    /**
     * `expandHeading` puts the given heading in the expanded state.
     *
     * @private
     * @param {RasterexAccordionHeading} heading
     * @memberof RasterexAccordion
     */
    private expandHeading(heading: RasterexAccordionHeading) {
        heading.expanded = true;
    }

    /**
     * `collapseHeading` puts the given heading in the collapsed state.
     *
     * @private
     * @param {RasterexAccordionHeading} heading
     * @memberof RasterexAccordion
     */
    private collapseHeading(heading: RasterexAccordionHeading) {
        heading.expanded = false;
    }

    /**
     * `animateIn` determines the height of the panel and uses that value for
     * an expanding animation.
     *
     * @private
     * @param {RasterexAccordionPanel} panel
     * @returns
     * @memberof RasterexAccordion
     */
    private animateIn(panel: RasterexAccordionPanel) {
        const height = panel.getBoundingClientRect().height;
        return this.animatePanels(panel, -height, 0);
    }

    /**
     * Same as `animateIn` but in the other direction.
     *
     * @private
     * @param {RasterexAccordionPanel} panel
     * @returns
     * @memberof RasterexAccordion
     */
    private animateOut(panel: RasterexAccordionPanel) {
        const height = panel.getBoundingClientRect().height;
        return this.animatePanels(panel, 0, -height);
    }

    /**
     * `animatePanels` animates a translation on the Y axis from one offset to
     * another. It takes care of promoting all the elements, making sure they
     * will be painted in the right order during animation and cleans up
     * afterwards.
     *
     * @private
     * @param {RasterexAccordionPanel} panel
     * @param {number} startOffset
     * @param {number} endOffset
     * @returns
     * @memberof RasterexAccordion
     */
    private async animatePanels(panel: RasterexAccordionPanel, startOffset: number, endOffset: number) {
        // If start and end are the same there is nothing to do. The reason for
        // explicitly handling this case is that this method waits for an
        // `transitionend` event which won’t fire if there is no animation.
        if (startOffset === endOffset) {
            return Promise.resolve();
        }

        // Set the `animating` class on the `<rasterex-accordion>` element. This
        // discards all further `change` events until the animation is done.
        this.classList.add('animating');
        // Turn the list of children into a proper array with all the helper
        // functions defined on it.
        const children = Array.from(this.children) as HTMLElement[];
        // Find the index of the panel that is being animated.
        const idx = children.indexOf(panel);
        // Only that panel and all the headings and panels _after_ the given panel
        // need to be animated.
        const animatedChildren = children.slice(idx);

        // Some children will be translated
        // beyond the top of the element and might end up being visible above the
        // element. Switch the `<rasterex-accordion>` element to `overflow: hidden`
        // to prevent that.
        this.style.overflow = 'hidden';
        // Switch all children to `position: relative` so that the element
        // has full control over paint order using `z-index`.
        children.forEach((child) => {
            child.style.position = 'relative';
            // All children _before_ the animated ones need to be painted _over_
            // all the animated children. Therefore, set all children to
            // `z-index: 2` and set all the animated children to `z-index: 1` next.
            child.style.zIndex = '2';
        });

        // Set `z-index: 1` on all animated children translate them to the
        // start position. Because this function uses a CSS transition we don’t
        // need to use `will-change`.
        animatedChildren.forEach((child) => {
            child.style.position = 'relative';
            child.style.zIndex = '1';
            child.style.transform = `translateY(${startOffset}px)`;
        });

        // Wait two frames for all the styles to take effect.
        return await this.requestAnimationFramePromise()
            .then(() => this.requestAnimationFramePromise())
            .then(() => {
                // Set up the CSS transition on all the children and set them to
                // their end position.
                animatedChildren.forEach((child) => {
                    child.style.transform = `translateY(${endOffset}px)`;
                    child.classList.add('animating');
                });
                // Wait for the transition to end.
                return this.transitionEndPromise(panel);
            })
            .then(() => {
                // Clean up all the temporary styles
                animatedChildren.forEach((child) => {
                    child.style.transform = '';
                    child.classList.remove('animating');
                });
                children.forEach((child) => {
                    child.style.position = '';
                    child.style.zIndex = '';
                });
                this.style.overflow = '';
                this.classList.remove('animating');
            });
    }

    // These methods help make animations easier.
    // Read https://dassur.ma/things/raf-promise/ for more details.
    private transitionEndPromise(element: Element) {
        return new Promise((resolve) => {
            element.addEventListener('transitionend', function f() {
                element.removeEventListener('transitionend', f);
                resolve();
            });
        });
    }

    private requestAnimationFramePromise() {
        return new Promise((resolve) => requestAnimationFrame(resolve));
    }
}
