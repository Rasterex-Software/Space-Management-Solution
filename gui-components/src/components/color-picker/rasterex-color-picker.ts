import {
    html, css, customElement, property, query, PropertyValues
} from 'lit-element';

import { RasterexElement } from '../rasterex-element';
import { RasterexItem } from '../list/rasterex-item';
import { RasterexListbox } from '../list/rasterex-listbox';
import { RasterexToggleButton } from '../toggle-button/rasterex-toggle-button';
import '../list/rasterex-item';
import '../list/rasterex-listbox';
import '../toggle-button/rasterex-toggle-button';

// TODO: Add aria attributes, keyboard events

// IMPORTANT colors are defined in rgba format
@customElement('rasterex-color-picker')
export class RasterexColorPicker extends RasterexElement {

    // internal properties
    // private renderedColors: boolean = false;

    @query('#container')
    private container: RasterexListbox;

    @query('#trigger')
    private button: RasterexToggleButton;

    // observed properties

    /**
     * The selected color, as rgba.
     */
    @property({ type: String, reflect: true })
    color = '';

    @property({ type: String, reflect: true })
    position = 'right';

    // @property({ type: Number, reflect: true })
    // opacity = 1;

    @property({ type: Boolean, reflect: true })
    disabled = false;

    /**
     * An array of strings representing the colors to be displayed.
     * IMPORTANT colors are defined in rgba format
     */
    @property({ type: Array, attribute: 'color-list' })
    colorList = this.defaultColors();

    /*
    * The number of columns to display in the picker.
    */
    @property({ type: Number, attribute: 'column-count' })
    columnCount = 19;

    static get styles() {
        return [
            css`
            :host {
                display: inline-block;
                position: relative;
            }
            :host(:focus) {
                outline: none;
            }
            :host([disabled]) rasterex-toggle-button:hover, :host([disabled]) rasterex-toggle-button:focus{
                cursor: default;
                outline: none;
            }

            #container{
                padding: 0;
                background: #fff;
                border: 2px solid #000;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                visibility: hidden;
                opacity: 0;
                top: var(--rasterex-color-picker-item-size, 20px);
                position: absolute;
                z-index: 999;
            }
            #container.opened {
                visibility: visible;
                opacity: 1;
            }
            .color {
                box-sizing: border-box;
                width: var(--rasterex-color-picker-item-size, 20px);
                height: var(--rasterex-color-picker-item-size, 20px);
                display: inline-block;
                padding: 0;
                margin: 0;
                cursor: pointer;
                font-size: 0;
                position: relative;
            }
            /* If we just scale the paper-item when hovering, this will end up
            * adding scrollbars to the paper-listbox that are hard to get rid of.
            * An easy workaround is to use an :after pseudo element instead. */
            .color:after {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background: currentColor;
                content: '';
                -webkit-transition: -webkit-transform 0.2s;
                transition: transform .2s;
                z-index: 0;
            }
            .color:hover:after, .color.selected-item:after {
                -webkit-transform: scale(1.3, 1.3);
                transform: scale(1.3, 1.3);
                outline: none;
                z-index: 1;
            }

            `
        ];
    }

    /*
     * only the css color attribute needs to be set on the elements of class .color
     * there is no need to set also the background-color attribute
     */
    protected render() {
        return html`
            <rasterex-toggle-button id="trigger"></rasterex-toggle-button>
            <div id="container">
                ${this.colorList.map((color) => html`
                    <span class="color"
                        style="color:${color}"
                        >
                        ${color}
                    </span>`
                )}
            </div>
        `;
    }

    public constructor () {
        super();

        this.clickOutsideHandler = this.clickOutsideHandler.bind(this);
    }

    public connectedCallback() {
        super.connectedCallback();
    }

    public disconnectedCallback() {
        super.disconnectedCallback();

        window.removeEventListener('click', this.clickOutsideHandler);
    }

    protected firstUpdated() {
        this.updateSize();
        this.updatePosition();
        this.container.addEventListener('click', this);
        this.button.addEventListener('change', this);
        this.updateTriggerStyle();
        window.addEventListener('click', this.clickOutsideHandler);
        // this.renderColors();
    }

    protected updated(changedProperties: PropertyValues) {
        if (changedProperties.has('color')) {
            this.colorChanged();
        }

        if (changedProperties.has('colorList')) {
            this.colorListChanged();
        }

        if (changedProperties.has('columnCount')) {
            this.columnCountChanged();
        }

        if (changedProperties.has('position')) {
            this.updatePosition();
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
        if (this.disabled) {
            return;
        }

        // color tapped
        if (e.type === 'click') {
            this.onColorClick(e as CustomEvent);

        // trigger button tapped
        } else if (e.type === 'change') {
            this.container.classList.toggle('opened')
        }
    }

    // /**
    //  * Render colors
    //  *
    //  * TODO:  improvement -> render these color boxes only if the trigger is tapped.
    //  *
    //  * @private
    //  * @returns
    //  * @memberof RasterexColorPicker
    //  */
    // private renderColors() {
    //     // Fill in the colors if we haven't already.
    //     if (this.renderedColors) {
    //         return;
    //     }

    //     const colorBoxes = this.allColors();
    //     for (const color of colorBoxes) {
    //             color.style.color = color.innerText;
    //             color.style.backgroundColor = color.innerText;
    //     }

    //     this.renderedColors = true;
    // }

    /**
     * Returns the default colors.
     *
     * @private
     * @returns {string[]}
     * @memberof RasterexColorPicker
     */
    private defaultColors(): string[] {

        return [
            'rgba(244,67,54,0.3)','rgba(233,30,99,0.3)','rgba(156,39,176,0.3)','rgba(103,58,183,0.3)','rgba(63,81,181,0.3)',
            'rgba(33,150,243,0.3)','rgba(3,169,244,0.3)','rgba(0,188,212,0.3)','rgba(0,150,136,0.3)','rgba(76,175,80,0.3)',
            'rgba(139,195,74,0.3)','rgba(205,220,57,0.3)','rgba(255,235,59,0.3)','rgba(255,193,7,0.3)','rgba(255,152,0,0.3)',
            'rgba(255,87,34,0.3)','rgba(121,85,72,0.3)','rgba(158,158,158,0.3)','rgba(96,125,139,0.3)','rgba(255,235,238,0.3)',
            'rgba(252,228,236,0.3)','rgba(243,229,245,0.3)','rgba(237,231,246,0.3)','rgba(232,234,246,0.3)','rgba(227,242,253,0.3)',
            'rgba(225,245,254,0.3)','rgba(224,247,250,0.3)','rgba(224,242,241,0.3)','rgba(232,245,233,0.3)','rgba(241,248,233,0.3)',
            'rgba(249,251,231,0.3)','rgba(255,253,231,0.3)','rgba(255,248,225,0.3)','rgba(255,243,224,0.3)','rgba(251,233,231,0.3)',
            'rgba(239,235,233,0.3)','rgba(250,250,250,0.3)','rgba(236,239,241,0.3)','rgba(255,205,210,0.3)','rgba(248,187,208,0.3)',
            'rgba(225,190,231,0.3)','rgba(209,196,233,0.3)','rgba(197,202,233,0.3)','rgba(187,222,251,0.3)','rgba(179,229,252,0.3)',
            'rgba(178,235,242,0.3)','rgba(178,223,219,0.3)','rgba(200,230,201,0.3)','rgba(220,237,200,0.3)','rgba(240,244,195,0.3)',
            'rgba(255,249,196,0.3)','rgba(255,236,179,0.3)','rgba(255,224,178,0.3)','rgba(255,204,188,0.3)','rgba(215,204,200,0.3)',
            'rgba(245,245,245,0.3)','rgba(207,216,220,0.3)','rgba(239,154,154,0.3)','rgba(244,143,177,0.3)','rgba(206,147,216,0.3)',
            'rgba(179,157,219,0.3)','rgba(159,168,218,0.3)','rgba(144,202,249,0.3)','rgba(129,212,250,0.3)','rgba(128,222,234,0.3)',
            'rgba(128,203,196,0.3)','rgba(165,214,167,0.3)','rgba(197,225,165,0.3)','rgba(230,238,156,0.3)','rgba(255,245,157,0.3)',
            'rgba(255,224,130,0.3)','rgba(255,204,128,0.3)','rgba(255,171,145,0.3)','rgba(188,170,164,0.3)','rgba(238,238,238,0.3)',
            'rgba(176,190,197,0.3)','rgba(229,115,115,0.3)','rgba(240,98,146,0.3)','rgba(186,104,200,0.3)','rgba(149,117,205,0.3)',
            'rgba(121,134,203,0.3)','rgba(100,181,246,0.3)','rgba(79,195,247,0.3)','rgba(77,208,225,0.3)','rgba(77,182,172,0.3)',
            'rgba(129,199,132,0.3)','rgba(174,213,129,0.3)','rgba(220,231,117,0.3)','rgba(255,241,118,0.3)','rgba(255,213,79,0.3)',
            'rgba(255,183,77,0.3)','rgba(255,138,101,0.3)','rgba(161,136,127,0.3)','rgba(224,224,224,0.3)','rgba(144,164,174,0.3)',
            'rgba(239,83,80,0.3)','rgba(236,64,122,0.3)','rgba(171,71,188,0.3)','rgba(126,87,194,0.3)','rgba(92,107,192,0.3)',
            'rgba(66,165,245,0.3)','rgba(41,182,246,0.3)','rgba(38,198,218,0.3)','rgba(38,166,154,0.3)','rgba(102,187,106,0.3)',
            'rgba(156,204,101,0.3)','rgba(212,225,87,0.3)','rgba(255,238,88,0.3)','rgba(255,202,40,0.3)','rgba(255,167,38,0.3)',
            'rgba(255,112,67,0.3)','rgba(141,110,99,0.3)','rgba(189,189,189,0.3)','rgba(120,144,156,0.3)','rgba(244,67,54,0.3)',
            'rgba(233,30,99,0.3)','rgba(156,39,176,0.3)','rgba(103,58,183,0.3)','rgba(63,81,181,0.3)','rgba(33,150,243,0.3)',
            'rgba(3,169,244,0.3)','rgba(0,188,212,0.3)','rgba(0,150,136,0.3)','rgba(76,175,80,0.3)','rgba(139,195,74,0.3)',
            'rgba(205,220,57,0.3)','rgba(255,235,59,0.3)','rgba(255,193,7,0.3)','rgba(255,152,0,0.3)','rgba(255,87,34,0.3)',
            'rgba(121,85,72,0.3)','rgba(158,158,158,0.3)','rgba(96,125,139,0.3)','rgba(229,57,53,0.3)','rgba(216,27,96,0.3)',
            'rgba(142,36,170,0.3)','rgba(94,53,177,0.3)','rgba(57,73,171,0.3)','rgba(30,136,229,0.3)','rgba(3,155,229,0.3)',
            'rgba(0,172,193,0.3)','rgba(0,137,123,0.3)','rgba(67,160,71,0.3)','rgba(124,179,66,0.3)','rgba(192,202,51,0.3)',
            'rgba(253,216,53,0.3)','rgba(255,179,0,0.3)','rgba(251,140,0,0.3)','rgba(244,81,30,0.3)','rgba(109,76,65,0.3)',
            'rgba(117,117,117,0.3)','rgba(84,110,122,0.3)','rgba(211,47,47,0.3)','rgba(194,24,91,0.3)','rgba(123,31,162,0.3)',
            'rgba(81,45,168,0.3)','rgba(48,63,159,0.3)','rgba(25,118,210,0.3)','rgba(2,136,209,0.3)','rgba(0,151,167,0.3)',
            'rgba(0,121,107,0.3)','rgba(56,142,60,0.3)','rgba(104,159,56,0.3)','rgba(175,180,43,0.3)','rgba(251,192,45,0.3)',
            'rgba(255,160,0,0.3)','rgba(245,124,0,0.3)','rgba(230,74,25,0.3)','rgba(93,64,55,0.3)','rgba(97,97,97,0.3)',
            'rgba(69,90,100,0.3)','rgba(198,40,40,0.3)','rgba(173,20,87,0.3)','rgba(106,27,154,0.3)','rgba(69,39,160,0.3)',
            'rgba(40,53,147,0.3)','rgba(21,101,192,0.3)','rgba(2,119,189,0.3)','rgba(0,131,143,0.3)','rgba(0,105,92,0.3)',
            'rgba(46,125,50,0.3)','rgba(85,139,47,0.3)','rgba(158,157,36,0.3)','rgba(249,168,37,0.3)','rgba(255,143,0,0.3)',
            'rgba(239,108,0,0.3)','rgba(216,67,21,0.3)','rgba(78,52,46,0.3)','rgba(66,66,66,0.3)','rgba(55,71,79,0.3)',
            'rgba(183,28,28,0.3)','rgba(136,14,79,0.3)','rgba(74,20,140,0.3)','rgba(49,27,146,0.3)','rgba(26,35,126,0.3)',
            'rgba(13,71,161,0.3)','rgba(1,87,155,0.3)','rgba(0,96,100,0.3)','rgba(0,77,64,0.3)','rgba(27,94,32,0.3)',
            'rgba(51,105,30,0.3)','rgba(130,119,23,0.3)','rgba(245,127,23,0.3)','rgba(255,111,0,0.3)','rgba(230,81,0,0.3)',
            'rgba(191,54,12,0.3)','rgba(62,39,35,0.3)','rgba(33,33,33,0.3)','rgba(38,50,56,0.3)',
        ];
    }

    /**
     * Returns all current colors
     *
     * @private
     * @returns {HTMLElement[]}
     * @memberof RasterexColorPicker
     */
    private allColors(): HTMLElement[] {
        return Array.from(this.shadowRoot.querySelectorAll('.color'));
    }


    /**
     * `click` color clicked handler
     *
     * @private
     * @param {CustomEvent} event
     * @memberof RasterexColorPicker
     */
    private onColorClick(event: CustomEvent) {
        const item = event.target as HTMLElement;
        // The inner `span` element has the background color;
        const color = (item as any).innerText;

        this.color = color;

        // close container after color is selected
        this.button.pressed = false;
        this.container.classList.toggle('opened');

        // dispatch color selected event
        this.fireColorSelected();
    }

    /**
     * Color attribute changed handler
     *
     * @private
     * @memberof RasterexColorPicker
     */
    private colorChanged() {
        if (this.color !== this.container.selected) {
            this.container.selected = this.color;
        }

        this.updateTriggerStyle();
    }

    private updateTriggerStyle() {
        this.button.style.color = this.color;
        this.button.style.backgroundColor = this.color;
    }

    /**
     * Color list attribute changed handler
     *
     * @private
     * @memberof RasterexColorPicker
     */
    private colorListChanged() {
        // this.renderedColors = false;

        const color = this.color.replace(' ','');
        if (color && color !== '' &&
            this.colorList.indexOf(color) === -1 &&
            this.colorList.indexOf(String(color).toLowerCase()) === -1) {
            // this.color = this.colorList[0];
            this.colorList.push(color); // If not found then add it to the list
        }
        this.updateSize();
    }

    /**
     * Column count attribute changed handler
     *
     * @private
     * @memberof RasterexColorPicker
     */
    private columnCountChanged() {
        this.updateSize();
    }

    /**
     * Fires `selected` event
     *
     * @private
     * @memberof RasterexListbox
     */
    private fireColorSelected() {
        const selectedEvent = new CustomEvent('color-selected', { bubbles: true, composed: true, detail: { color: this.color } });
        this.dispatchEvent(selectedEvent);
    }

    /**
     * Fit the color boxes in columns.
     *
     * @private
     * @memberof RasterexColorPicker
     */
    private updateSize() {
        // We first need to get the width of a color box (which is customizable),
        // and then change the box's width to fit all the columns.
        let sizeOfAColorDiv =
            getComputedStyle(this).getPropertyValue('--rasterex-color-picker-item-size').trim();
        if (!sizeOfAColorDiv || sizeOfAColorDiv === '') {  // Default value case
            sizeOfAColorDiv = '20';
        } else {
            sizeOfAColorDiv = sizeOfAColorDiv.replace('px', '');
        }

        // const rowCount = Math.ceil(this.colorList.length / this.columnCount);
        // this.container.style.height = rowCount * Number(sizeOfAColorDiv) + 'px';
        this.container.style.width = this.columnCount * Number(sizeOfAColorDiv) + 'px';
        // this.renderedColors = false;
    }

    private updatePosition() {
        switch (this.position) {
            case 'left':
                this.container.style.left = 'auto';
                this.container.style.right = '0';
                break;
            case 'right':
                this.container.style.left = '0';
                this.container.style.right = 'auto';
                break;
            default:
                break;
        }
    }

    /**
     * Clicking outside handler
     *
     * @param {MouseEvent} e
     */
    private clickOutsideHandler(e: MouseEvent) {
        if (!this.container.classList.contains('opened')) {
            return;
        }

        if (!this.contains(e.target as HTMLElement)){
            this.container.classList.remove('opened');
        }
    }
}