import {
    html, css, customElement, property, PropertyValues,
} from 'lit-element';

import { addListener, removeListener } from '@polymer/polymer/lib/utils/gestures.js';
import { RasterexElement } from '../rasterex-element';

@customElement('rasterex-slider')
export class RasterexSlider extends RasterexElement {

    // internal properties
    private overlay: HTMLElement;
    private bar: HTMLElement;
    private knob: HTMLElement;
    private fill: HTMLElement;
    private knobAttached: boolean;
    private pct: number;
    private intermediateValue: number;
    private barWidth: number;
    private keyboardAttached: boolean;
    private startx: number;
    private dragging: boolean;

    // observed properties
    @property({ type: Number, reflect: true })
    min = 0;

    @property({ type: Number, reflect: true })
    max = 100;

    @property({ type: Number, reflect: true })
    step = 1;

    @property({ type: Number, reflect: true })
    size = 1;

    @property({ type: Number, reflect: true })
    knobsize = 15;

    @property({ type: Number, reflect: true })
    knobradius = 50;

    // maybe this can be moved to parent class
    @property({ type: Boolean, reflect: true })
    disabled = false;

    // @property({ type: Number, reflect: true, attribute: 'value' })
    private currentValue = 0;

    static get properties() {
        return { value: { type: Number, reflect: true } };
    }

    get value() {
        return Number(this.currentValue);
    }

    set value(v: number) {
        this.setValue(v, true);
    }

    static get styles() {
        return [
            css`
                :host {
                    display: inline-block;
                    position: relative;
                    width: 300px;
                    height: 40px;
                    outline: none;
                    box-sizing: border-box;
                    --rasterex-slider-bar-color: #d3d3d3;
                    --rasterex-slider-knob-color: #2196F3;
                    --rasterex-slider-fill-color: #2196F3;
                }

                :host(.disabled) {
                    opacity: 0.45 !important;
                    cursor: default;
                    pointer-events: none;
                }

                :host(.disabled) .knob {
                    pointer-events: none !important;
                }

                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                }

                .knob {
                    pointer-events: auto;
                    background-color: var(--rasterex-slider-knob-color);
                    display: inline-block;
                    cursor: pointer;
                }

                .hasValue {
                }

                .bar {
                    box-sizing: border-box;
                    border-color: var(--rasterex-slider-bar-color);
                    border-style: solid;
                }

                .slider__fill {
                    box-sizing: border-box;
                    border-color: var(--rasterex-slider-fill-color);
                    border-style: solid;
                    z-index:2;
                }

                :host(.pending) {
                    opacity: 0;
                }
            `
        ];
    }

    protected createRenderRoot() {
        const root = super.createRenderRoot();
        this.classList.add('pending');
        return root;
    }

    protected render() {
        this.onDisableChange();
        return html`
            <div class="overlay">
                <div class="slider__fill"></div>
                <div class="slider__handle">
                    <div class="bar"></div>
                    <div class="knob"></div>
                </div>
            </div>
        `
    }

    protected firstUpdated() {
        this.setAttribute('value', String(this.currentValue));

        this.applyInternalCss();

        this.onValueChange();
        this.classList.remove('pending');
        this.knobAttached = false;

        this.setAria();
        this.attachEvents();
    }

    protected updated(changedProps: PropertyValues) {
        if (changedProps.has('value')) {
            // this will prevent setting invalid attribute value
            // known issue: will prevent only once
            this.setAttribute('value', String(this.currentValue));
        }

        // apply css again if any of these were changed
        if (changedProps.has('size')
            || changedProps.has('knobsize')
            || changedProps.has('knobradius')
        ) {
            this.applyInternalCss();
        }
    }

    public disconnectedCallback() {
        super.disconnectedCallback();

        this.removeEvents();
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
        if (e.type === 'keydown') {
            this.onKeyDown(e as KeyboardEvent);
        }
    }

    /**
     * Apply css style on internal elements
     *
     * @private
     * @memberof RasterexSlider
     */
    private applyInternalCss() {
        const s = this.getBoundingClientRect();
        const radius = this.knobradius || 10;
        const knobsize = this.knobsize || 15;
        const barsize = this.size || 1;

        this.barWidth = s.width - knobsize;

        // overlay
        this.overlay = this.shadowRoot.querySelector('.overlay');
        this.overlay.style.width = s.width + 'px';
        this.overlay.style.height = s.height + 'px';

        // fill
        this.fill = this.shadowRoot.querySelector('.slider__fill');
        this.fill.style.position = 'absolute';
        this.fill.style.top = (s.height - barsize) / 2 + 'px';
        this.fill.style.left = '0';
        this.fill.style.borderWidth = this.size + 'px';

        // bar
        this.bar = this.shadowRoot.querySelector('.bar');
        this.bar.style.position = 'absolute';
        this.bar.style.width = '100%';
        this.bar.style.top = (s.height - barsize) / 2 + 'px';
        this.bar.style.left = '0';
        this.bar.style.borderWidth = this.size + 'px';

        // knob
        this.knob = this.shadowRoot.querySelector('.knob');
        this.knob.style.borderRadius = radius + 'px';
        this.knob.style.width = knobsize + 'px';
        this.knob.style.height = knobsize + 'px';
        this.knob.style.marginTop = (s.height - knobsize) / 2 + 'px';
    }

    /**
     * `onDisableChange` toggle `disabled` css class and sets `aria-disabled`.
     *
     * @private
     * @memberof RasterexSlider
     */
    private onDisableChange() {
        if (this.disabled) {
            this.classList.add('disabled');
            this.setAttribute('aria-disabled', 'true');
        } else {
            this.classList.remove('disabled');
            this.setAttribute('aria-disabled', 'false');
        }
        this.refreshTabIndex();
    }

    /**
     * The element serving as the focusable slider control has `role` slider.
     * 
     * The slider element has the `aria-valuemin` property set to a decimal value 
     * representing the minimum allowed value of the slider.
     * 
     * The slider element has the `aria-valuemin` property set to a decimal value 
     * representing the minimum allowed value of the slider.
     * 
     * The slider element has the `aria-valuenow` property set to a decimal 
     * value representing the current value of the slider.
     *
     * @private
     * @memberof RasterexSlider
     */
    private setAria() {
        this.setAttribute('role', 'slider');
        this.setAttribute('aria-valuemax', this.max.toString());
        this.setAttribute('aria-valuemin', this.min.toString());
        this.setAriaValueNow();
        this.refreshTabIndex();
    }

    /**
     * This method refreshes tabIndex property according to disabled state
     *
     * @private
     * @memberof RasterexSlider
     */
    private refreshTabIndex() {
        this.tabIndex = this.disabled ? -1 : Number(this.getAttribute('tabindex') || 0);
    }

    /**
     * Sets `aria-valuenow` attribute with current value
     *
     * @private
     * @memberof RasterexSlider
     */
    private setAriaValueNow() {
        this.setAttribute('aria-valuenow', this.value.toString());
    }

    /**
     * Sets `currentValue` and fires `change` event. Also is taking care of
     * knob position on the slider by calling `onValueChange` method
     *
     * @private
     * @param {number} value
     * @param {boolean} [skipEvent=false]
     * @memberof RasterexSlider
     */
    private setValue(value: number, skipEvent: boolean = false) {
        if (value > this.max) {
            value = this.max
        }

        if (value < this.min) {
            value = this.min
        }

        const oldValue = this.currentValue;
        this.currentValue = value;
        this.requestUpdate('value', oldValue)

        this.setAriaValueNow();
        this.onValueChange();

        if (!skipEvent) {
            const event = new CustomEvent('change', { bubbles: true, composed: true, detail: { value } });
            this.dispatchEvent(event);
        }
    }

    /**
     * Increases value by step.
     *
     * @private
     * @memberof RasterexSlider
     */
    private increment() {
        const newValue = Math.min(this.max, Math.round(this.value + this.step));
        if (newValue !== this.value) {
            this.setValue(newValue);
        }
    }

    /**
     * Decreases value by step. 
     *
     * @private
     * @memberof RasterexSlider
     */
    private decrement() {
        const newValue = Math.max(this.min, Math.round(this.value - this.step));
        if (newValue !== this.value) {
            this.setValue(newValue);
        }
    }

    /**
     * Attach events
     *
     * @private
     * @memberof RasterexSlider
     */
    private attachEvents() {
        if (!this.knobAttached) {
            addListener(this.knob, 'down', this.knobDown.bind(this));
            addListener(this.knob, 'up', this.resetKnob.bind(this));
            addListener(this.knob, 'track', this.onTrack.bind(this));

            this.knobAttached = true;
        }

        if (!this.keyboardAttached) {
            this.addEventListener('keydown', this)
            this.keyboardAttached = true;
        }
    }

    /**
     * Remove events
     *
     * @private
     * @memberof RasterexSlider
     */
    private removeEvents() {
        if (this.knobAttached) {
            removeListener(this.knob, 'down', this.knobDown.bind(this));
            removeListener(this.knob, 'up', this.resetKnob.bind(this));
            removeListener(this.knob, 'track', this.onTrack.bind(this));

            this.knobAttached = false;
        }

        if (this.keyboardAttached === true) {
            this.removeEventListener('keydown', this);
            this.keyboardAttached = false;
        }
    }

    private onKeyDown(event: KeyboardEvent) {
        switch (event.keyCode) {
            case 38:
            case 39:
                this.increment();
                break;
            case 37:
            case 40:
                this.decrement();
                break;
            case 36:
                this.setValue(this.min);
                break;
            case 35:
                this.setValue(this.max);
                break;
        }
    }

    /**
     * Sets the knob position on the slider according to its value
     *
     * @private
     * @returns
     * @memberof RasterexSlider
     */
    private onValueChange() {
        if (!this.knob) {
            return;
        }
        let pct = 0;
        if (this.max > this.min) {
            pct = Math.min(1, Math.max((this.value - this.min) / (this.max - this.min), 0));
        }
        this.pct = pct;
        if (pct) {
            this.knob.classList.add('hasValue');
        } else {
            this.knob.classList.remove('hasValue')
        }
        const knobOffset = pct * this.barWidth;
        this.fill.style.width = Math.round(knobOffset + (this.knobsize / 2)) + 'px';
        this.knob.style.transform = 'translateX(' + Math.round(knobOffset) + 'px)';
    }

    /**
     * `down` event handler for knob (mousedown|touchdown)
     *
     * @private
     * @param {Event} event
     * @memberof RasterexSlider
     */
    private knobDown(event: Event) {
        if (!this.disabled) {
            this.knobExpand(true);
            event.preventDefault();
            this.focus();
        }
    }

    /**
     * `up` event handler for knob (mouseup|touchend)
     *
     * @private
     * @memberof RasterexSlider
     */
    private resetKnob() {
        if (!this.disabled) {
            this.knobExpand(false);
        }
    }

    /**
     * Toggles knob `expanded` css class
     *
     * @private
     * @param {boolean} expand
     * @memberof RasterexSlider
     */
    private knobExpand(expand: boolean) {
        if (this.knob) {
            if (expand) {
                this.knob.classList.add('expanded');
            } else {
                this.knob.classList.remove('expanded');
            }
        }
    }

    /**
     * `track` events handler 
     *
     * @private
     * @param {CustomEvent} event
     * @memberof RasterexSlider
     */
    private onTrack(event: CustomEvent) {
        if (!this.disabled) {
            event.stopPropagation();
            switch (event.detail.state) {
                case 'start':
                    this.trackStart();
                    break;
                case 'track':
                    this.trackX(event);
                    break;
                case 'end':
                    this.trackEnd();
                    break;
            }
        }
    }

    /**
     * track `start` event handler
     *
     * @private
     * @memberof RasterexSlider
     */
    private trackStart() {
        this.intermediateValue = this.value;
        this.startx = this.pct * this.barWidth;
        this.dragging = true;
    }

    /**
     * `track` event handler
     *
     * @private
     * @memberof RasterexSlider
     */
    private trackX(event: CustomEvent) {
        if (!this.dragging) {
            this.trackStart();
        }
        const dx = event.detail.dx || 0;
        const newX = Math.max(Math.min(this.startx + dx, this.barWidth), 0);
        this.fill.style.width = Math.round(newX + (this.knobsize / 2)) + 'px';
        this.knob.style.transform = 'translateX(' + Math.round(newX) + 'px)';
        const newPct = newX / this.barWidth;
        this.intermediateValue = this.min + newPct * (this.max - this.min);
    }

    /**
     * track `end` event handler
     *
     * @private
     * @memberof RasterexSlider
     */
    private trackEnd() {
        this.dragging = false;
        this.resetKnob();

        this.setValue(this.intermediateValue);
        this.pct = (this.value - this.min) / (this.max - this.min);
    }

    /**
     * Helper function to check if a property was changed in changedProps param of `updated` method 
     *
     * @private
     * @param {string} name
     * @param {PropertyValues} changedProps
     * @returns {boolean}
     * @memberof RasterexSlider
     */
    private propertyChanged(name: string, changedProps: PropertyValues): boolean {
        if (changedProps.has(name)
            && changedProps.get(name) !== undefined
        ) {
            return true;
        }

        return false;
    }
}