import { LitElement, property, html, queryAll, PropertyValues, query } from "lit-element";
import { LegendDesignerView } from "../legend-designer-view";
import { LegendOption } from "../legend-designer-type";
import { RxTenantState } from "../../../redux/reducers/tenants";
import { connect } from "pwa-helpers/connect-mixin";
import { store, RootState } from "../../../redux/store";

import '../../../../libs/gui-components/components/color-picker/rasterex-color-picker';
import '../../../../libs/gui-components/components/legend/rasterex-legend';
import { highlightSpaces, resetAreasState } from "../../../rx-helpers/spaces";
import { RxFileAreaTenants, activeFileSelector, freeSpaceSelector } from "../../../redux/reducers/files";
import { updateFreeSpaceColor } from "../../../redux/actions/rxcore/sync";
import { updateTenantColor } from "../../../redux/actions/tenants/sync";

export class SmLegendTenantView extends connect(store)(LitElement) implements LegendDesignerView {

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

    @property({ type: Object, reflect: false })
    private tenants: RxTenantState[];

    @property({ type: Object, reflect: false })
    private areaTenants: RxFileAreaTenants | undefined;

    @property({ type: Array, reflect: false })
    private freeSpaces: string[] = [];

    @property({ type: String, reflect: false })
    private freeSpaceColor: string;

    protected createRenderRoot() {
        return this;
    }

    public render() {
        return html`
            <rasterex-legend title=${this.name} .show=${this.active}>
                ${this.options.length > 1
                    ? html`
                        <p>
                            <span class="switch-label">Select All</span>
                            <mwc-switch
                                class="overview-switch"
                                @click=${this.onOverviewSwitch}>
                            </mwc-switch>
                        </p>

                        <hr>
                    `
                    : ``
                }

                <ul class="list-unstyled general-list">
                    ${this.options.map((option) => {
                        return html`
                            <li class="general-item prevent-text-selection"
                                .tenantid="${option.value}"
                                @click=${this.onOptionClick}>
                                ${option.value === "Free Space" 
                                    ? html`
                                        <rasterex-color-picker
                                            position="left"
                                            color="${this.freeSpaceColor}"
                                            @color-selected=${this.freeSpaceColorChanged}>
                                        </rasterex-color-picker>
                                        Free Space
                                    `
                                    : html`
                                        <rasterex-color-picker
                                            position="left"
                                            color="${this.getTenantColor(option.value)}"
                                            @color-selected=${this.tenantColorChanged}>
                                        </rasterex-color-picker>
                                        ${this.getTenantName(option.value)}
                                    `
                                }
                            </li>`
                        })
                    }
                </ul>
            </rasterex-legend>
        `;
    }

    protected firstUpdated() {
        this.classList.add('legend-designer-view');
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

    public highlightOption(option: string, highlight: boolean) {
        if (option === "Free Space") {
            highlightSpaces(this.freeSpaces, highlight, this.freeSpaceColor);
            return;
        }

        const tenant = this.getTenantById(option);
        if (tenant) {
            if (this.areaTenants !== undefined) {
                const areaIds = Object.keys(this.areaTenants).filter((key) => this.areaTenants![key] === tenant.id)
                highlightSpaces(areaIds, highlight, tenant.color);
            }
        }
    }

    public highlightAll(highlight: boolean) {
        // select/deselect all areas
        if (highlight) {
            this.options.forEach(option => {
                this.highlightOption(option.value, true);
            })
        } else {
            resetAreasState();
        }
    }

    public stateChanged(state: RootState) {
        this.tenants = state.tenants.items;
        this.freeSpaceColor = state.rxcore.freeSpaceColor;

        const file = activeFileSelector(state);
        if (file) {
            this.areaTenants = file.areaTenants;
            this.freeSpaces = freeSpaceSelector(state) || [];
        }
    }

    private onOptionClick(e:any) {
        const elem = e.target as any;
        if (elem.tagName !== 'LI') {
            return;
        }

        elem.classList.toggle('selected');
        const selected = elem.classList.contains('selected');

        this.highlightOption(elem.tenantid, selected);
    }

    private onOverviewSwitch(e: any) {
        const highlight = !e.target.checked;

        this.selectAll(highlight)
        this.highlightAll(highlight);
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

    private freeSpaceColorChanged(e: CustomEvent) {
        const color = e.detail.color;
        if (color) {
            store.dispatch(updateFreeSpaceColor(color));
            this.highlightOption('Free Space', true);
        }
    }

    private tenantColorChanged(e: CustomEvent) {
        const color = e.detail.color;
        if (color) {
            const tenant = this.tenants.find((tenant: any) => tenant.id === +(e.target as any).parentElement.tenantid);
            if (tenant) {
                store.dispatch(updateTenantColor(tenant.id, color));

                if (this.areaTenants) {
                    const areaIds = Object.keys(this.areaTenants).filter((key) => this.areaTenants![key] === tenant.id)
                    highlightSpaces(areaIds, true, tenant.color);
                }
            }
        }
    }
    
    private getTenantById(id: string) {
        return this.tenants.find(tenant => tenant.id === +id);
    }

    private getTenantName(id: string) {
        const tenant = this.tenants.find(tenant => tenant.id === +id);

        if (tenant) {
            return tenant.firstName + ' ' + tenant.lastName;
        }

        return '';
    }

    private getTenantColor(id: string) {
        const tenant = this.tenants.find(tenant => tenant.id === +id);

        if (tenant) {
            return tenant.color;
        }

        return this.freeSpaceColor;
    }
}

window.customElements.define('sm-legend-tenant-view', SmLegendTenantView);