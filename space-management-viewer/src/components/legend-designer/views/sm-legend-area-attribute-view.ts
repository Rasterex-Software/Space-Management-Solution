import { property, html, queryAll, query, LitElement, PropertyValues } from "lit-element";
import { LegendOption } from "../legend-designer-type";
import { LegendDesignerView } from "../legend-designer-view";
import { connect } from "pwa-helpers/connect-mixin";
import { store, RootState } from "../../../redux/store";
import { activeFileSelector } from "../../../redux/reducers/files";
import { getAttributeValue, highlightSpaces } from "../../../rx-helpers/spaces";
import '../../../../libs/gui-components/components/color-picker/rasterex-color-picker';
import '../../../../libs/gui-components/components/legend/rasterex-legend';

export class SmLegendAreaAttributeView extends connect(store)(LitElement) implements LegendDesignerView {

    private readonly SELECT_COLOR_RGBA = 'rgba(191,58,209,0.3)';

    @queryAll('.general-item')
    private optionElems: NodeListOf<HTMLElement>;

    @query('.overview-switch')
    public overviewSwitch: any;

    // PROPERTIES
    @property({ type: String })
    public name: string;

    @property({ type: Array })
    public options: LegendOption[] = [];

    @property({ type: Boolean, reflect: true })
    public active: boolean;

    @property({ type: Array, reflect: false })
    private floorAreas: any[] = [];

    protected createRenderRoot() {
        return this;
    }

    public render() {
        const attributeValues = this.getAttributeValues();

        return html`
            <rasterex-legend title=${this.name} .show=${this.active}>
                <p>
                    <span class="switch-label">Select All</span>
                    <mwc-switch
                        class="overview-switch"
                        @click=${this.onOverviewSwitch}>
                    </mwc-switch>
                </p>
                <hr>

                <ul class="list-unstyled general-list">
                    ${this.options.map((option) => {
                        return html`
                            <p style="font-weight:bold">${option.label}</p>
                            ${ attributeValues[option.value].length > 0
                                ? attributeValues[option.value].map((value: string) => {
                                        return html`
                                            <li class="general-item prevent-text-selection"
                                                .attributeValue="${value}"
                                                .attributeName="${option.value}"
                                                @click=${this.onOptionClick}>
                                                <rasterex-color-picker
                                                    color=${this.SELECT_COLOR_RGBA}
                                                    @color-selected=${this.onColorChange}
                                                    position="left">
                                                </rasterex-color-picker>
                                                ${value}
                                            </li>`
                                    })
                                : 'No values assigned'
                            }`
                        })
                    }
                </ul>
            </rasterex-legend>
        `;
    }

    protected firstUpdated() {
        this.classList.add('legend-designer-view');
    }

    public highlightOption(option: {attributeName: string, attributeValue: string, color?: string}, highlight: boolean) {
        const areasByAttributeValue: any[] = [];
        
        this.floorAreas.forEach(area => {
            let value = getAttributeValue(option.attributeName, {id: area});

            if (value && value === option.attributeValue) {
                areasByAttributeValue.push(area);
            }
        });

        highlightSpaces(areasByAttributeValue, highlight, option.color);
    }

    public highlightAll(highlight: boolean) {
        this.optionElems.forEach((item: any) => {
            const color = (item.firstElementChild as any).color || this.SELECT_COLOR_RGBA;
            const attributeName = item.attributeName;
            const attributeValue = item.attributeValue;

            this.highlightOption({attributeName, attributeValue, color}, highlight)
        });
    }

    public updated(changedProps: PropertyValues) {
        if (changedProps.has('active')) {
            let highlight = false;
            if (this.active) {
                highlight = true
            } 
            if (this.overviewSwitch) {
                this.overviewSwitch.checked = highlight;
            }
            this.selectAll(highlight);
            this.highlightAll(highlight);
        }
    }
    
    public disconnectedCallback(){
        super.disconnectedCallback();

        this.highlightAll(false);
    }

    public stateChanged(state: RootState) {
        const file = activeFileSelector(state);
        if (file && this.floorAreas !== file.areaIds) {
            this.floorAreas = file.areaIds || [];
        }
    }

    private getAttributeValues() {
        const values: {[attributeName:string]: string[]} = {};
        this.options.forEach((option) => {
            const attributeName = option.value;
            values[attributeName] = [];
            this.floorAreas.forEach(area => {
                const value = getAttributeValue(attributeName, {id: area});

                if (value !== null && value !== '' && !values[attributeName].includes(value)) {
                    values[attributeName].push(value);
                }
            })
        });

        return values;
    }

    private onOverviewSwitch(e: any) {
        const highlight = !e.target.checked;

        this.selectAll(highlight)
        this.highlightAll(highlight);
    }

    private onOptionClick(e: any) {
        const elem = e.target as any;
        if (elem.tagName !== 'LI') {
            return;
        }

        elem.classList.toggle('selected');
        const selected = elem.classList.contains('selected');
        const color = (elem.firstElementChild as any).color || this.SELECT_COLOR_RGBA;

        this.highlightOption(
            {attributeValue: elem.attributeValue, attributeName: elem.attributeName, color}, 
            selected
        );
    }

    private selectAll(selected: boolean) {
        // select/unselect all options
        if (this.optionElems && this.optionElems.length > 0) {
            this.optionElems.forEach(elem => {
                if (selected) {
                    elem.classList.add('selected');
                } else {
                    elem.classList.remove('selected');
                }
            })
        }
    }

    private onColorChange(e: CustomEvent) {
        const color = e.detail.color;
        if (color) {
            const attributeValue = (e.target as any).parentElement.attributeValue;
            const attributeName = (e.target as any).parentElement.attributeName;
            this.highlightOption({attributeName, attributeValue, color}, true);
        }
    }
}

window.customElements.define('sm-legend-area-attribute-view', SmLegendAreaAttributeView);