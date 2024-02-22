import { LitElement, html, property, query, PropertyValues } from 'lit-element';
import * as RxCore from '../../rx-helpers/index';
import '@material/mwc-switch/';
import '../../../libs/gui-components/components/color-picker/rasterex-color-picker';
import '../../../libs/gui-components/components/legend/rasterex-legend';
import { connect } from 'pwa-helpers/connect-mixin';
import { store, RootState } from '../../redux/store';
import { updateFreeSpaceColor, updateCommonSpaceColor } from '../../redux/actions/rxcore/index';
import { RxFileAreaTenants, freeSpaceSelector, activeFileSelector } from '../../redux/reducers/files';
import { RxTenantState } from '../../redux/reducers/tenants';

export class SmFloorTenants extends connect(store)(LitElement) {

    // ELEMENTS
    @query('.overview-switch')
    public overviewSwitch: any;

    @query('.tenant-list')
    private tenantList: HTMLElement;

    // PROPERTIES
    @property({ type: Object, reflect: false })
    public areaTenants: RxFileAreaTenants ;

    @property({ type: Array, reflect: false })
    public floorTenants: RxTenantState[] = [];

    @property({ type: Array, reflect: false })
    public freeSpaces: string[] = [];

    @property({ type: String, reflect: true })
    public commonSpaceColor: string;

    @property({ type: String, reflect: true })
    public freeSpaceColor: string;

    @property({ type: Boolean, reflect: true })
    public active: boolean;

    protected createRenderRoot() {
        return this;
    }

    protected render() {
        return html`
            <rasterex-legend title="Floor Tenants" .show=${this.active}>
                <p>
                    <span class="switch-label">Select All</span>
                    <mwc-switch
                        class="overview-switch"
                        @click=${this.onOverviewSwitch}>
                    </mwc-switch>
                </p>

                <hr>

                <ul class="list-unstyled general-list">
                    <li class="general-item free-item prevent-text-selection"
                        @click=${this.toggleFreeSpace}>
                        <rasterex-color-picker
                            position="left"
                            color="${this.freeSpaceColor}"
                            @color-selected=${this.freeSpaceColorChanged}>
                        </rasterex-color-picker>
                        <span>Free Space </span>
                    </li>
                    <li class="general-item common-item prevent-text-selection"
                        @click=${this.toggleCommonSpace}>
                        <rasterex-color-picker
                            position="left"
                            color="${this.commonSpaceColor}"
                            @color-selected=${this.commonSpaceColorChanged}>
                        </rasterex-color-picker>
                        <span>Common Space </span>
                    </li>
                </ul>

                ${this.floorTenants.length === 0 || (this.floorTenants.length === 1 && this.floorTenants[0].firstName === 'Common') 
                    ? html `No tenants assigned`
                    : html `
                        <span>Tenants</span>
                        <ul class="list-unstyled tenant-list">
                            ${this.floorTenants.filter(tenant => tenant.label !== "Common Space").map((tenant) => {
                                return html`
                                    <li .tenantId=${tenant.id}
                                        @click=${this.highlightTenant}
                                        class="tenant prevent-text-selection">
                                        <rasterex-color-picker
                                            position="left"
                                            color="${tenant.color}"
                                            @color-selected=${this.tenantColorChanged}>
                                        </rasterex-color-picker>
                                        ${tenant.firstName} ${tenant.lastName}
                                    </li>`;
                            })}
                        </ul>
                    `
                }
            </rasterex-legend>
        `;
    }

    public stateChanged(state: RootState) {
        this.freeSpaceColor = state.rxcore.freeSpaceColor;
        this.commonSpaceColor = state.rxcore.commonSpaceColor;
        const file = activeFileSelector(state);
        if (file) {
            this.freeSpaces = freeSpaceSelector(state) || [];
        }
    }

    public updated(changedProps: PropertyValues) {
        if (!this.active) {
            return;
        }

        if (changedProps.has('freeSpaceColor') && this.freeSpaceColor !== undefined) {
            this.highlightFreeSpace();
        }

        if (changedProps.has('commonSpaceColor') && this.commonSpaceColor !== undefined) {
            this.highlightCommonTenant();
        }
    }

    public async overviewHighlight(highlight: boolean = true) {
        await this.updateComplete;

        if (!this.active) {
            return;
        }

        this.overviewSwitch.checked = highlight;

        // deselect all areas
        if (!highlight) {
            RxCore.resetAreasState();
            this.selectAllTenants(false);
            this.selectFreeItem(false);
            this.selectCommonItem(false);
            return;
        }

        // TODO: review this, maybe should be called earlier because is creating a flicker on the canvas
        // RxCore.resetAreasState();

        // highlight
        this.highlightFreeSpace(true)
        this.highlightAllTenants(true);
        this.highlightCommonTenant(true);
    }

    private highlightAllTenants(highlight = true) {
        RxCore.highlightAllTenantsSpace(this.areaTenants, this.floorTenants, highlight)
        this.selectAllTenants(highlight);
    }

    private highlightFreeSpace(highlight = true) {
        RxCore.highlightSpaces(this.freeSpaces, highlight, this.freeSpaceColor);
        this.selectFreeItem(highlight);
    }


    private highlightTenant(e: any) {
        const tenant = this.floorTenants.find((tenant: any) => tenant.id === e.target.tenantId);

        if (tenant) {
            // TODO: review if it's ok to set the flag here because tenant array may change also from other sources
            if (tenant.hasOwnProperty('highlighted') && tenant.highlighted) {
                tenant.highlighted = false;
            } else {
                tenant.highlighted = true;
            }

            (e.target as HTMLElement).classList.toggle('selected');
            const areaIds = Object.keys(this.areaTenants).filter((key) => this.areaTenants[key] === tenant.id)
            RxCore.highlightSpaces(areaIds, tenant.highlighted, tenant.color);
        }
    }

    private highlightCommonTenant(highlight = true) {
        const tenant = this.floorTenants.find((tenant: any) => tenant.label === "Common Space");

        if (tenant) {
            const areaIds = Object.keys(this.areaTenants).filter((key) => this.areaTenants[key] === tenant.id)
            RxCore.highlightSpaces(areaIds, highlight, this.commonSpaceColor);
            this.selectCommonItem(highlight);
        }
    }

    private selectFreeItem(select:boolean) {
        const freeItem =  this.querySelector('.free-item') as HTMLElement;
        if (select) {
            freeItem.classList.add('selected');
            return;
        }

        freeItem.classList.remove('selected');
    }

    private selectCommonItem(select:boolean) {
        const freeItem =  this.querySelector('.common-item') as HTMLElement;
        if (select) {
            freeItem.classList.add('selected');
            return;
        }

        freeItem.classList.remove('selected');
    }

    private selectAllTenants(select: boolean) {
        if (this.floorTenants.length > 0 ) {
            this.floorTenants.forEach(tenant => {
                tenant.highlighted = select;
            });

            if (this.tenantList) {
                Array.from(this.tenantList.children).forEach((child) => {
                    if (select) {
                        child.classList.add('selected');
                        return;
                    }
    
                    child.classList.remove('selected');
                });
            }
        }
    }

    private toggleFreeSpace(e: any) {
        if (e.target.nodeName !== 'RASTEREX-COLOR-PICKER') {
            const freeItem =  this.querySelector('.free-item') as HTMLElement;
            if (freeItem.classList.contains('selected')) {
                this.highlightFreeSpace(false)
                freeItem.classList.remove('selected');
                return;
            }

            this.highlightFreeSpace(true)
            freeItem.classList.add('selected');
        }
    }

    private toggleCommonSpace(e: any) {
        if (e.target.nodeName !== 'RASTEREX-COLOR-PICKER') {
            const commonItem =  this.querySelector('.common-item') as HTMLElement;
            if (commonItem.classList.contains('selected')) {
                this.highlightCommonTenant(false);
                return;
            }

            this.highlightCommonTenant(true);
        }
    }

    private onOverviewSwitch(e: any) {
        const checked = !e.target.checked;

        this.overviewHighlight(checked);
    }

    private freeSpaceColorChanged(e: CustomEvent) {
        const color = e.detail.color;
        if (color) {
            store.dispatch(updateFreeSpaceColor(color));
        }
    }

    private commonSpaceColorChanged(e: CustomEvent) {
        const color = e.detail.color;
        if (color) {
            const tenant = this.floorTenants.find((tenant: any) => tenant.label === "Common Space");
            if (tenant) {
                store.dispatch(updateCommonSpaceColor(color));
            }
        }
    }

    private tenantColorChanged(e: CustomEvent) {
        const color = e.detail.color;
        if (color) {
            const tenant = this.floorTenants.find((tenant: any) => tenant.id === (e.target as any).parentElement.tenantId);
            if (tenant) {
                tenant.color = color;
                const areaIds = Object.keys(this.areaTenants).filter((key) => this.areaTenants[key] === tenant.id)
                RxCore.highlightSpaces(areaIds, true, tenant.color);
                // TODO: review, added to render again legend with rgba colors
                this.requestUpdate();
            }
        }
    }
}

window.customElements.define('sm-floor-tenants', SmFloorTenants);