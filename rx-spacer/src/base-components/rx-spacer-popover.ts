// Import LitElement base class and html helper function
import { css, html, LitElement, property, query } from 'lit-element';

export class RasterexSpacerPopover extends LitElement {

    private ignore = false;

    @query('#handle')
    private handle: HTMLElement;

    @query('#expandable')
    private expandable: HTMLElement;

    @query('#container')
    private container: HTMLElement;

    /**
     * Determines whether it's expanded.
     */
    @property({ type: Boolean, reflect: true })
    public expanded = false;

    /**
     * Positions: `top, beforetop, bottom, beforebotom, beforebotom, beforeleft, right, beforeright, middle`
     *
     * Position of the expandable after the handler is pressed.
     * If multiple positions are provided (separated by comma),
     * the first position that fits within the viewport will be used.
     */
    @property({ type: String, reflect: true })
    public position = 'bottom left, bottom beforeright, beforetop left, beforetop beforeright';

    /**
     * If true, element won't expand. If already expanded, it will collapse once set to true
     */
    @property({ type: Boolean, reflect: true })
    public disabled = false;

    public static get styles() {
        return [
            css`
            :host {
                display: block;
            }
            :host([disabled]) {
                opacity: 0.35;
            }
            #container {
                position: relative;
            }
            #handle {
                display:  var(--popover-handle-display, inline-block);
                visibility:  var(--popover-handle-visibility, visible);
                cursor: pointer;
                background-color: var(--popover-handle-background, #EAEAEA);
                padding: 5px;
            }
            #expandable {
                display: none;
                position: absolute;
                top: 0;
                left: 0;
                z-index: var(--popover-z-index, 999);
                background-color: var(--popover-expandable-background, #fff);
                border-width: var(--popover-expandable-border-width, 1px);
                border-style: solid;
                border-color: var(--popover-expandable-border-color, rgba(0, 0, 0, .2));
                padding: var(--popover-expandable-padding, 5px);
                border-radius: var(--popover-expandable-radius, 6px);
                box-shadow: 0 5px 10px rgba(0,0,0,.2);
            }
            #expandable.expanded {
                display: inline-block;
            }
            #expandable:before {
                content: "";
                position: absolute;
                bottom: -11px;
                left: 50%;
                margin-left: -10px;
                width: 0;
                height: 0;
                border-left: 11px solid transparent;
                border-right: 11px solid transparent;
                border-top: 11px solid var(--popover-expandable-border-color, rgba(0, 0, 0, .2));
            }
            #expandable:after {
                content: "";
                position: absolute;
                bottom: -10px;
                left: 50%;
                margin-left: -9px;
                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-top: 10px solid var(--popover-expandable-background, #fff);
            }
            `,
        ];
    }

    protected render() {
        return html`
        <div id="container">
            <div id="handle" @click=${this.toggle}>
                <slot name="handle"></slot>
            </div>
            <div id="expandable">
                <slot name="expandable"></slot>
            </div>
        </div>
        `;
    }

    constructor() {
        super();

        this.clickOutsideHandler = this.clickOutsideHandler.bind(this);
        this.windowResizeHandler = this.windowResizeHandler.bind(this);
    }

    public connectedCallback() {
        super.connectedCallback();

        // window.addEventListener("click", this.clickOutsideHandler);
        window.addEventListener('resize', this.windowResizeHandler);
    }

    public disconnectedCallback() {
        super.disconnectedCallback();

        /// window.removeEventListener("click", this.clickOutsideHandler);
        window.removeEventListener('resize', this.windowResizeHandler);
    }

    /**
     * Toggles expanded state
     */
    public toggle() {
        if (!this.expandable.classList.contains('expanded')) {
            this.expand();
            this.ignore = true;
        } else {
            this.collapse();
            this.ignore = false;
        }
    }

    /**
     * Repositions popover
     */
    public reposition() {
        const positions = this.position.split(',');

        if (this.expandable.classList.contains('expanded')) {
            this.hideExpandable();
        }

        const containerRect = this.container.getBoundingClientRect();
        const handleRect = this.handle.getBoundingClientRect();

        this.showExpandable();

        const expandableRect = this.expandable.getBoundingClientRect();

        positions.some((position: string, index: number) => {
            const newExpandableRect = this.proposeRect(position, handleRect, expandableRect);
            const isLastIndex = (index + 1 === positions.length);

            if (isLastIndex || this.doesItFit(newExpandableRect)) {
                const top = newExpandableRect.top - containerRect.top;
                const left = newExpandableRect.left - containerRect.left;
                this.expandable.style.top = `${top}px`;
                this.expandable.style.left = `${left}px`;
                return true;
            }

            return false;
        });
    }

    /**
     * Expand the expandable
     */
    public expand() {
        if (this.hasAttribute('disabled')) {
            return;
        }

        this.expanded = true;

        this.reposition();
        this.fireExpandedChange();
    }

    /**
     * 	Collapse the expandable
     */
    public collapse() {
        this.expanded = false;

        this.hideExpandable();
        this.fireExpandedChange();
    }

    /**
     * 	Adds `expanded` css class
     */
    private showExpandable() {
        this.expandable.classList.add('expanded');
        this.classList.add('expanded');
    }

    /**
     * 	Removes `expanded` css class
     */
    private hideExpandable() {
        this.expandable.classList.remove('expanded');
        this.classList.remove('expanded');
    }

    /**
     * Fires `expanded-changed` event
     */
    private fireExpandedChange() {
        const expandedChange = new CustomEvent(
            'expanded-changed',
            { bubbles: true, composed: true, detail: {expanded: this.expanded} },
        );
        this.dispatchEvent(expandedChange);
    }

    /**
     * Check if fits bounding
     *
     * @param {{ top: number; left: number; bottom: number; right: number; }} bounding
     * @returns
     */
    private doesItFit(bounding: { top: number; left: number; bottom: number; right: number; }) {
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= document.body.clientHeight &&
            bounding.right <= document.body.clientWidth
        );
    }

    /**
     * Determines he position of the expandable.
     *
     * @param {string} position
     * @param {ClientRect} handleRect
     * @param {ClientRect} expandableRect
     * @returns
     */
    private proposeRect(position: string, handleRect: ClientRect, expandableRect: ClientRect) {
        const newExpandableRect = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        };

        if (position.includes('beforetop')) {
            newExpandableRect.top = handleRect.top - expandableRect.height;
        } else if (position.includes('beforebottom')) {
            newExpandableRect.top = handleRect.top + handleRect.height - expandableRect.height;
        } else if (position.includes('top')) {
            newExpandableRect.top = handleRect.top;
        } else if (position.includes('middle')) {
            newExpandableRect.top = Math.round(handleRect.top + handleRect.height / 2 - expandableRect.height / 2);
        } else {
            newExpandableRect.top = handleRect.top + handleRect.height;
        }

        newExpandableRect.bottom = newExpandableRect.top + expandableRect.height;
        if (position.includes('beforeleft')) {
            newExpandableRect.left = handleRect.left - expandableRect.width;
        } else if (position.includes('beforeright')) {
            newExpandableRect.left = handleRect.left + handleRect.width - expandableRect.width;
        } else if (position.includes('right')) {
            newExpandableRect.left = handleRect.left + handleRect.width;
        } else if (position.includes('center')) {
            newExpandableRect.left = Math.round(handleRect.left + handleRect.width / 2 - expandableRect.width / 2);
        } else {
            newExpandableRect.left = handleRect.left;
        }

        newExpandableRect.right = newExpandableRect.left + expandableRect.width;
        return newExpandableRect;
    }

    /**
     * Clicking outside handler
     *
     * @param {MouseEvent} e
     */
    private clickOutsideHandler(e: MouseEvent) {
        if (!this.expanded) {
            return;
        }

        // find if target is this.expandable
        const expandableTarget = e.composedPath().find((element) => element === this.expandable);

        if (!this.ignore && expandableTarget === undefined && this.expandable.classList.contains('expanded')) {
            this.collapse();
        }

        this.ignore = false;
    }

    /**
     * Window resize handler
     */
    private windowResizeHandler() {
        if (this.expandable.classList.contains('expanded')) {
            this.reposition();
        }
    }
}

// Register the element with the browser
customElements.define('rx-spacer-popover', RasterexSpacerPopover);
