import { LitElement, html, property, query, PropertyValues } from "lit-element";
import './generic/sm-panel';
import '../../libs/gui-components/components/slider/rasterex-slider';
import { RasterexSlider } from  '../../libs/gui-components/components/slider/rasterex-slider';
import { changeLabelSize, moveLabelEnable, changeLabelTransp, markUpRedraw } from "../rx-helpers/spaces";
import { getMarkupbyGUID } from "../rx-helpers";
import '@material/mwc-switch/';

export class SmLabelConfig extends LitElement {

    public rendered = false;
    private globalSize: number;

    @query('#size-slider')
    private slider: RasterexSlider;

    @query('#global-size-slider')
    private globalSlider: RasterexSlider;

    @query('#transparency-slider')
    private transSlider: RasterexSlider;

    @query('#global-size-input')
    private globalSizeInput: HTMLInputElement;

    @query('#size-input')
    private sizeInput: HTMLInputElement;

    @query('mwc-switch')
    private repositionSwitch: HTMLInputElement;

    // observed properties
    @property({ type: Boolean, reflect: true })
    public show: boolean = false;

    @property({ type: Array, reflect: true })
    public areas: string[] = [];

    @property({ type: String, reflect: true })
    public selectedArea: string;

    @property({ type: Number, reflect: true })
    public defaultSize = 12;

    @property({ type: Number, reflect: true })
    public minSize = 1;

    @property({ type: Number, reflect: true })
    public maxSize = 100;

    @property({ type: Boolean, reflect: true })
    draggable = false;

    @property({ type: Boolean, reflect: true })
    collapsible = false;

    protected createRenderRoot() {
        return this;
    }

    protected render() {
        if (!this.show) {
            return html``;
        }
        
        return html`
            <sm-panel .show=${this.show} 
                .draggable=${this.draggable}
                .collapsible=${this.collapsible}>
                <h3 slot="title">Label Configuration</h3>
                <div slot=content>
                    <div>
                        <span>Global Size: </span>
                        <input 
                            type="number"
                            min="${this.minSize}" max="${this.maxSize}" 
                            id="global-size-input" 
                            class="form-control"
                            value=${this.globalSize}
                            @change=${this.onGlobalInputSizeChanged}
                        />
                        <button type="button"
                            class="btn btn-outline-info"
                            @click=${this.restoreGlobalDefaultSize}
                            title="Restore global default size">
                            <svg class="icon">
                                    <use href="assets/feather-sprite.svg#rotate-ccw"></use>
                            </svg>
                        </button>
                    </div>

                    <rasterex-slider
                        id="global-size-slider"
                        min="${this.minSize}"
                        max="${this.maxSize}"
                        value=${this.globalSize}
                        size="2"
                        @change=${this.onGlobalSizeChanged}>
                    </rasterex-slider>

                    <div>
                        <span>Size: </span>
                        <input 
                            type="number"
                            min="${this.minSize}" max="${this.maxSize}" 
                            id="size-input" 
                            class="form-control"
                            @change=${this.onInputSizeChanged}
                        />
                        <button type="button"
                            class="btn btn-outline-info"
                            @click=${this.restoreDefaultSize}
                            title="Restore default size">
                            <svg class="icon">
                                    <use href="assets/feather-sprite.svg#rotate-ccw"></use>
                            </svg>
                        </button>
                    </div>

                    <rasterex-slider
                        id="size-slider"
                        min="${this.minSize}"
                        max="${this.maxSize}"
                        size="2"
                        @change=${this.onSizeChanged}>
                    </rasterex-slider>

                    <div>
                        <span>Transparency </span>
                        <button type="button"
                            class="btn btn-outline-info"
                            @click=${this.restoreDefaultTransparency}
                            title="Restore default transparency">
                            <svg class="icon">
                                    <use href="assets/feather-sprite.svg#rotate-ccw"></use>
                            </svg>
                        </button>
                    </div>

                    <rasterex-slider
                        id="transparency-slider"
                        min="0"
                        max="100"
                        size="2"
                        @change=${this.onTransparencyChanged}>
                    </rasterex-slider>

                    <p>
                        <span class="switch-label">Enable Reposition: </span>
                        <mwc-switch
                            class="overview-switch"
                            @click=${this.onClickSwitch}>
                        </mwc-switch>
                    </p>
                </div>
            </sm-panel>
        `;
    }

    protected shouldUpdate(changedProps: PropertyValues) {
        return changedProps.has('selectedArea') || changedProps.has('show');
    }

    protected firstUpdated() {
        this.rendered = true;
        this.globalSize = this.defaultSize;
    }

    protected updated() {
        if (this.slider !== null && this.selectedArea !== '') {
            const fontSize = this.getMarkupFontSize();
            this.slider.value = fontSize;
            this.sizeInput.value = fontSize.toString();

            if (this.repositionSwitch !== null) {
                moveLabelEnable(this.repositionSwitch.checked);
            }
        }
    }

    private onGlobalSizeChanged(e: CustomEvent) {
        const value = e.detail.value;

        if (value) {
            this.changeLabelSizeForAllSpaces(value);
            this.globalSizeInput.value = Math.round(value).toString();
            this.sizeInput.value = Math.round(value).toString();
        }
    }

    private onGlobalInputSizeChanged(e: any) {
        const value = e.target.value;

        if (value < this.minSize || value > this.maxSize ) {
            if (value > this.maxSize) {
                alert('Maximum allowed size is ' + this.maxSize + '.');
                this.globalSizeInput.value = this.maxSize+'';
                this.globalSlider.value = this.maxSize;
                this.changeLabelSizeForAllSpaces(this.maxSize);
            }

            if(value < this.minSize) {
                alert('Minimum allowed size is ' + this.minSize + '.');
                this.globalSizeInput.value = this.minSize+'';
                this.globalSlider.value = this.minSize;
                this.changeLabelSizeForAllSpaces(this.minSize);
            }
            return;
        }

        this.changeLabelSizeForAllSpaces(value);

        this.globalSlider.value = value;
        this.globalSize = value;
        this.globalSizeInput.value = Math.round(value).toString();
        this.sizeInput.value = Math.round(value).toString();
    }

    private restoreGlobalDefaultSize() {
        this.changeLabelSizeForAllSpaces(this.defaultSize);
        this.globalSlider.value = this.defaultSize;
        this.globalSizeInput.value = this.defaultSize + '';
        this.globalSize = this.defaultSize;
    }

    private onSizeChanged(e: CustomEvent) {
        const value = e.detail.value;

        if (value) {
            changeLabelSize(value);
            this.sizeInput.value = Math.round(value).toString();
        }
    }

    private onInputSizeChanged(e: any) {
        const value = e.target.value;

        if (value < this.minSize || value > this.maxSize ) {
            if (value > this.maxSize) {
                alert('Maximum allowed size is ' + this.maxSize + '.');
                this.sizeInput.value = this.maxSize+'';
                this.slider.value = this.maxSize;
                changeLabelSize(this.maxSize);
            }

            if(value < this.minSize) {
                alert('Minimum allowed size is ' + this.minSize + '.');
                this.sizeInput.value = this.minSize+'';
                this.slider.value = this.minSize;
                changeLabelSize(this.minSize);
            }
            return;
        }

        this.slider.value = value;
        changeLabelSize(value);
    }

    private restoreDefaultSize() {
        changeLabelSize(this.defaultSize);
        this.slider.value = this.defaultSize;
        this.sizeInput.value = this.defaultSize + '';
    }

    private onClickSwitch(e: any) {
        const checked = !e.target.checked;

        moveLabelEnable(checked);
    }

    private restoreDefaultTransparency() {
        // 100 means no transparency
        changeLabelTransp(100);
        this.transSlider.value = 0;
    }

    private onTransparencyChanged(e: CustomEvent) {
        // since 100 means full transparency we need to reverse calculation
        const value = 100 - Math.round(e.detail.value);

        changeLabelTransp(value);
    }

    private changeLabelSizeForAllSpaces(value: number) {
        if (this.areas && this.areas.length > 0 ) {
            this.areas.forEach(areaId => {
                const markup = getMarkupbyGUID(areaId);
                if (markup && markup !== -1) {
                    markup.font.height = value;
                }
            });

            markUpRedraw();
            this.slider.value = value;
            this.sizeInput.value = Math.round(value).toString();
        }
    }

    private getMarkupFontSize() {
        if (this.selectedArea !== undefined && this.selectedArea !== '') {
            const markup = getMarkupbyGUID(this.selectedArea);

            if (markup) {
                return Math.round(markup.font.height);
            }
        }

        // return default size
        return this.defaultSize;
    }
}

window.customElements.define('sm-label-config', SmLabelConfig);