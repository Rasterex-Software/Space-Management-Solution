import { html, query, property, PropertyValues, LitElement } from "lit-element";
import { PageViewElement } from "../generic/page-view-element";
import { RasterexLegend } from '../../../libs/gui-components/components/legend/rasterex-legend';
import '../overviews/sm-floor-tenants';
import '../tenants/sm-tenants-list';
import '../overviews/sm-space-type';
import '../tenants/sm-tenant-assign';
import '../tenants/sm-tenant-spaces';

import { connect } from 'pwa-helpers/connect-mixin';
import { store, RootState } from '../../redux/store.js';
import { selectArea } from "../../redux/actions/rxcore";

import { dragIcon } from '../generic/sm-icons';
import * as RxHelpers from '../../rx-helpers/index';
import Draggable from '../../utils/draggable';
import RxEvents from "rx-events";
import { SmFloorTenants } from "../overviews/sm-floor-tenants";
import { SmTenantsList } from "../tenants/sm-tenants-list";
import { activeFileSelector, selectedAreaTenant, selectedAreaTenantSpaces, activeFileTenantsSelector, RxFileAreaTenants } from "../../redux/reducers/files";
import { getAllTenants } from "../../redux/actions/tenants/async";
import { RxTenantState } from "../../redux/reducers/tenants";
import { updateAreaCustomLabel, removeAreaCustomLabel } from "../../redux/actions/files";
import { getMarkupbyGUID } from "../../rx-helpers/index";
import { SmLegendDesigner } from "../legend-designer/sm-legend-designer";

export class SmModeAssign extends connect(store)(PageViewElement) {

    // private spaceConverted = false;

    // ELEMENTS
    @query('#tenants-list')
    private tenantsList: SmTenantsList;

    @query('#tenants-legend')
    private tenantsLegend: SmFloorTenants;

    @query('#area-legend-a')
    private areaLegend: RasterexLegend;

    @query('#tenant-info')
    private tenantInfo: RasterexLegend;

    @query('.legend-designer-view')
    private legendDesignerView: LitElement;

    // PROPERTIES
    @property({ type: Array, reflect: false })
    private floorTenants: any[] = [];

    @property({ type: Array, reflect: false })
    private selectedAreaTenantSpaces: string[] = [];

    @property({ type: Array, reflect: false })
    private availableTenants: any[] = [];

    @property({ type: String, reflect: false })
    private fileName: string | undefined = '';

    @property({ type: String, reflect: false })
    public selectedArea: string = '';

    @property({ type: String, reflect: false })
    public activeLegendKey: string = '';

    @property({ type: Boolean, reflect: false })
    private tenantsLegendOpened = false;

    @property({ type: Boolean, reflect: false })
    private tenantsListOpened = false;

    @property({ type: Boolean, reflect: false })
    private areaEditing = false;

    @property({ type: Object, reflect: false })
    private selectedAreaTenant: RxTenantState | undefined;

    @property({ type: Object, reflect: false })
    private areaTenants: RxFileAreaTenants | undefined;

    protected createRenderRoot() {
        return this;
    }

    protected render() {
        const selectedAreaTenant = this.selectedAreaTenant;
        // TODO: review if possible another way to pas this dependency
        const legendDesigner = document.querySelector('sm-legend-designer') as SmLegendDesigner;
        const legendDesignerView = legendDesigner ? legendDesigner.getLegendView(this.activeLegendKey) : ``;

        return html`
            ${legendDesignerView}

            <sm-floor-tenants
                id="tenants-legend"
                ?active=${this.tenantsLegendOpened}
                .areaTenants=${this.areaTenants}
                .floorTenants=${this.floorTenants}>
            </sm-floor-tenants>

            <sm-tenants-list id="tenants-list" .tenants=${this.availableTenants}></sm-tenants-list>

            <rasterex-legend id="area-legend-a" class="area-legend" title="Area ${this.areaEditing ? `Edit` : `Info`}">
                <span class="area-legend-drag">${dragIcon}</span>
                
                <rx-spacer-area-edit ?hidden=${!this.areaEditing}></rx-spacer-area-edit>
                <rx-spacer-area-info ?hidden=${this.areaEditing} .area=${this.selectedArea}></rx-spacer-area-info>
                
                <button class="btn btn-sm btn-secondary"
                    ?hidden=${this.areaEditing}
                    @click=${() => { this.areaEditing = true }}>
                    Edit
                </button>
            </rasterex-legend>

            <rasterex-legend id="tenant-info" class="tenant-legend" title="Tenant Info">
                <span class="tenant-legend-drag">${dragIcon}</span>
                
                <p><b>Assign tenant</b></p>
                <sm-tenant-assign 
                    .fileName=${this.fileName} 
                    .selectedArea=${this.selectedArea}
                    .selectedAreaTenant=${selectedAreaTenant}
                    .tenants=${this.availableTenants}>
                </sm-tenant-assign>
               
                <p><b>Spaces:</b>
                <sm-tenant-spaces
                    .selectedArea=${this.selectedArea}
                    .selectedAreaTenantSpaces=${this.selectedAreaTenantSpaces}>
                </sm-tenant-spaces>
            </rasterex-legend>
        `;
    }

    protected firstUpdated() {
        RxEvents.subscribe('rx-spacer-edit-area', (data) => this.editAreaHandler(data));
        RxEvents.subscribe('rx-spacer-label-set', (data) => {
            store.dispatch(updateAreaCustomLabel(this.fileName, data.label, data.areaId));
        });
        RxEvents.subscribe('rx-spacer-label-unset', (data) => {
            store.dispatch(removeAreaCustomLabel(this.fileName, data.areaId));

            // if custom label is unset then restore default surface label
            const markup = getMarkupbyGUID(data.areaId);
            if (markup && markup !== -1) {
                markup.customlabeltext = markup.dimtext;
                markup.busecustomlabel = true;
            }
        });
        new Draggable(this.areaLegend, this.areaLegend.querySelector('.area-legend-drag') as HTMLElement);
        new Draggable(this.tenantInfo, this.tenantInfo.querySelector('.tenant-legend-drag') as HTMLElement);
        store.dispatch(getAllTenants());
    }

    protected updated(changedProperties: PropertyValues) {
        // when assign mode becomes active
        if (changedProperties.has('active')) {
            this.activeLegendHighlight();
        }

        // when legend/overview is changed
        if ((changedProperties.has('tenantsLegendOpened') && this.tenantsLegendOpened !== undefined)) {
            this.activeLegendHighlight();
        }

        // show/hide area info legend
        if (changedProperties.has('selectedArea')) {
            if (this.selectedArea !== undefined && this.selectedArea !== '') {
                this.areaLegend.show = true;
                this.tenantInfo.show = true;
                this.areaEditing = false;
            } else {
                this.areaLegend.show = false;
                this.tenantInfo.show = false;
                this.areaEditing = false;
            }
        }

        if (changedProperties.has('areaTenants') && this.tenantsLegend.overviewSwitch.checked) {
            this.tenantsLegend.overviewHighlight(true)
        }
        // TODO: review, sometimes there are some conflicts with Draggable instance
        this.repositionLegends();
    }

    public stateChanged(state: RootState) {
        const file = activeFileSelector(state);

        if (file) {
            this.floorTenants = activeFileTenantsSelector(state) || [];
            this.tenantsLegendOpened = state.app.tenantsOverview;
            this.tenantsListOpened = state.app.tenantListLegend;
            this.fileName = file.name;
            this.areaTenants = file.areaTenants;

            if ( this.selectedArea !== state.rxcore.selectedArea) {
                this.selectedArea = state.rxcore.selectedArea;
                
            }

            this.selectedAreaTenant = selectedAreaTenant(state);
            this.selectedAreaTenantSpaces = selectedAreaTenantSpaces(state) || [];
            this.activeLegendKey = state.app.activeLegend || '';
        }

        this.availableTenants = state.tenants.items || [];
    }

    private async repositionLegends() {
        await this.tenantsLegend.updateComplete;

        let topPosition: number = this.tenantsLegend.clientHeight;
        this.tenantsLegend.style.right = '10px';

        // tenants list opened
        if (this.tenantsListOpened) {
            await this.tenantsList.updateComplete;

            if (this.tenantsList.clientHeight > this.tenantsLegend.clientHeight) {
                topPosition = this.tenantsList.clientHeight
            }

            this.tenantsLegend.style.right = (this.tenantsList.clientWidth + 10) + 'px';
        }

        // legend designer view opened
        if (this.legendDesignerView) {
            await this.legendDesignerView.updateComplete;

            
            if (this.tenantsList.clientHeight > this.legendDesignerView.clientHeight) {
                topPosition = this.tenantsList.clientHeight
            } else {
                topPosition = this.legendDesignerView.clientHeight;
            }

            this.legendDesignerView.style.right = (this.tenantsList.clientWidth + 10) + 'px';
        }

        if (!this.areaLegend.hasAttribute('dragged')) {
            this.areaLegend.style.top = (topPosition + 20) + 'px';
        }

        if (!this.tenantInfo.hasAttribute('dragged')) {
            this.tenantInfo.style.top = (topPosition + this.areaLegend.clientHeight + 40) + 'px';
        }
    }

    private activeLegendHighlight() {
        RxHelpers.resetAreasState();

        if (this.tenantsLegendOpened) {
            this.tenantsLegend.overviewHighlight(true);
        }
    }

    private editAreaHandler(data: any) {
        this.areaEditing = false;

        const detail = data;
        if (detail.hasOwnProperty('fields') && detail.fields.length > 0) {
            // TODO: for the demo purpose there in no save
            // RxHelpers.saveAllMarkups();
        }
        // TODO: if type is updated should trigger requestUpdate for all sm-space-type components
    }

    protected selectArea(areaId: string) {
        if (this.selectedArea !== areaId) {
            store.dispatch(selectArea(areaId));
        }
    }
}

window.customElements.define('sm-mode-assign', SmModeAssign);