import { html, query, property, PropertyValues, LitElement } from "lit-element";
import { PageViewElement } from "../generic/page-view-element";
import { SmTenantsList } from '../tenants/sm-tenants-list';
import { RasterexLegend } from '../../../libs/gui-components/components/legend/rasterex-legend';
import '../overviews/sm-floor-tenants';
import '../tenants/sm-tenants-list';
import '../overviews/sm-space-type';
import '../tenants/sm-tenant-spaces';

import { connect } from 'pwa-helpers/connect-mixin';
import { store, RootState } from '../../redux/store';
import { activeArea, selectArea } from "../../redux/actions/rxcore";

import { dragIcon } from '../generic/sm-icons';
import * as RxHelpers from '../../rx-helpers/index';
import Draggable from '../../utils/draggable';
import { SmFloorTenants } from "../overviews/sm-floor-tenants";
import { activeFileSelector, selectedAreaTenant, selectedAreaTenantSpaces, activeFileTenantsSelector, RxFileAreaTenants } from "../../redux/reducers/files";
import { getAllTenants } from "../../redux/actions/tenants/async";
import { RxTenantState } from "../../redux/reducers/tenants";
import { SmLegendDesigner } from "../legend-designer/sm-legend-designer";
export class SmModeView extends connect(store)(PageViewElement) {

    // private spaceConverted = false;

    private selectedAreaTenant: RxTenantState | undefined;

    @query('#tenants-list')
    private tenantsList: SmTenantsList;

    @query('#tenants-legend')
    private tenantsLegend: SmFloorTenants;

    @query('#area-legend-v')
    private areaLegend: RasterexLegend;

    @query('#tenant-info')
    private tenantInfo: RasterexLegend;

    @query('.legend-designer-view')
    private legendDesignerView: LitElement;


    // Properties
    @property({ type: Array, reflect: false })
    private selectedAreaTenantSpaces: string[] | null = [];

    @property({ type: Array, reflect: false })
    private floorTenants: any[] = [];

    @property({ type: Array, reflect: false })
    private availableTenants: any[] = [];

    @property({ type: String, reflect: false })
    public selectedArea: string;

    @property({ type: String, reflect: false })
    public activeLegendKey: string = '';

    @property({ type: Boolean, reflect: false })
    private tenantsLegendOpened = false;

    @property({ type: Boolean, reflect: false })
    private tenantsListOpened = false;

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

            <rasterex-legend id="area-legend-v" class="area-legend" title="Area Info">
                <span class="area-legend-drag">${dragIcon}</span>
                <rx-spacer-area-info .area=${this.selectedArea}></rx-spacer-area-info>
            </rasterex-legend>

            <rasterex-legend id="tenant-info" class="tenant-legend" title="Tenant Info">
                <span class="tenant-legend-drag">${dragIcon}</span>
                ${selectedAreaTenant
                ? html`
                    <p><b>Name:</b> <br> ${selectedAreaTenant.firstName} ${selectedAreaTenant.lastName} </p>
                    <p><b>Spaces:</b>
                    <sm-tenant-spaces
                        .selectedArea=${this.selectedArea}
                        .selectedAreaTenantSpaces=${this.selectedAreaTenantSpaces}>
                    </sm-tenant-spaces>
                    `
                : html`No tenant assigned`
            }
            </rasterex-legend>
        `;

    }

    public connectedCallback() {
        super.connectedCallback();
    }

    protected firstUpdated() {
        new Draggable(this.areaLegend, this.areaLegend.querySelector('.area-legend-drag') as HTMLElement);
        new Draggable(this.tenantInfo, this.tenantInfo.querySelector('.tenant-legend-drag') as HTMLElement);
        store.dispatch(getAllTenants());
    }

    protected updated(changedProperties: PropertyValues) {
        // when assign mode becomes active
        if (changedProperties.has('active')) {
            RxHelpers.hideMarkupLabels();
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
            } else {
                this.areaLegend.show = false;
                this.tenantInfo.show = false;
            }
        }

        // adjust area info position
        // TODO: review, sometimes there are some conflicts with Draggable instance
        this.repositionLegends();
    }

    public stateChanged(state: RootState) {
        // this.spaceConverted = state.rxcore.spaceConverted;
        const file = activeFileSelector(state);

        if (file) {
            this.floorTenants = activeFileTenantsSelector(state) || [];
            this.tenantsLegendOpened = state.app.tenantsOverview;
            this.tenantsListOpened = state.app.tenantListLegend;
            this.areaTenants = file.areaTenants;
            
            if ( this.selectedArea !== state.rxcore.selectedArea) {
                this.selectedArea = state.rxcore.selectedArea;
                this.selectedAreaTenant = selectedAreaTenant(state);
            }

            this.selectedAreaTenantSpaces = selectedAreaTenantSpaces(state);
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

    protected selectArea(areaId: string) {
        // deselect if same area
        if (this.selectedArea === areaId) {
            store.dispatch(activeArea());
        }

        store.dispatch(selectArea(areaId));
    }
}

window.customElements.define('sm-mode-view', SmModeView);