import { LitElement, html, property, PropertyValues, query, svg} from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// These are the elements needed by this element.;
import './sm-mode-changer';
import './sm-tools';
import './sm-active-file-box';
import './legend-designer/sm-legend-designer';
// This element is connected to the Redux store.
import { store, RootState } from '../redux/store.js';

import '@material/mwc-switch/';
import { activeFileSelector } from '../redux/reducers/files';
import { toggleTenantsOverview, toggleTenantsListLegend, activeLegend } from '../redux/actions/app';
import { toggleLabels } from '../redux/actions/rxcore/index';
import { SmLegendDesigner } from './legend-designer/sm-legend-designer';
import { RxLegendsState } from '../redux/reducers/legends';
import { removeLegend } from '../redux/actions/legends';

class SmHeader extends connect(store)(LitElement) {

    @query('sm-legend-designer')
    private legendDesigner: SmLegendDesigner;

    @property({ type: String })
    appTitle = '';

    @property({ type: String })
    private page = '';

    @property({ type: String })
    private smMode = '';

    @property({ type: Boolean })
    private tenantsOverview = false;

    @property({ type: Boolean })
    private hideLabels = false;

    @property({ type: String, reflect: false })
    private hierarchyPathStringForSelectedNode = '';

    @property({ type: Object, reflect: false })
    private activeFile = {};

    @property({ type: Object, reflect: false })
    private legends: RxLegendsState = {};

    @property({ type: String, reflect: false })
    private activeLegendKey: string;

    protected createRenderRoot() {
        return this;
    }

    protected render() {
        const keys = Object.keys(this.legends) || [];
        // Anything that's related to rendering should be done in here.
        return html`
        <!-- Header -->
        <header>
            <div class="container-fluid">
                <div class="row">
                    <div class="col logo-and-mode">
                        <div class="logo-wrap">
                            <img class="logo" src="images/rasterex_logo.png" alt="Rasterex Logo">
                            <span class="logo-postfix">Facility Management Showcase</span>
                        </div>
                        <sm-mode-changer ?hidden=${this.page !== 'sm-rxcontainer'}></sm-mode-changer>
                    </div>
                    <div class="col text-center">
                        <sm-active-file-box
                            .path=${this.hierarchyPathStringForSelectedNode}
                            .fileName=${this.activeFile && (this.activeFile as {name:string}).name}
                            ?hidden=${this.isActiveFileBoxHidden()}
                            ></sm-active-file-box>
                    </div>
                    <div class="col header-buttons-wrap">
                        <div class="header-buttons">
                            <button class="btn-settings btn-icon dropdown-toggle"
                                ?hidden="${this.page === 'sm-landing' || this.smMode === 'prepare' }"
                                title="Legend Designer"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                <svg class="icon">
                                    <use href="assets/feather-sprite.svg#calendar"></use>
                                </svg>
                            </button>

                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" 
                                ?hidden="${this.page === 'sm-landing' || this.smMode === 'prepare' }">
                                <h6 class="dropdown-header">Legend designer</h6>
                                <a class="dropdown-item" data-toggle="modal" data-target="#legend-designer-modal">Create new legend</a>
                                <div class="dropdown-divider"></div>
                                <h6 class="dropdown-header">Available legends</h6>
                                <a class="dropdown-item ${this.tenantsOverview ? 'active': ''}"
                                    @click=${() => store.dispatch(toggleTenantsOverview())}>
                                    Floor Tenants
                                </a>

                                ${keys.map(key => html`
                                    <a class="dropdown-item ${this.activeLegendKey === key ? 'active': ''}" 
                                        @click=${() => store.dispatch(activeLegend(key))}>
                                        <span>${this.legends[key].name}</span>
                                        <span class="delete-action-icon"
                                            .key=${key}
                                            @click=${(e:MouseEvent) => {e.stopPropagation(); this.deleteLegend(key)}} 
                                            title="Delete legend">
                                            ${svg`<svg class="icon">
                                                <use href="assets/feather-sprite.svg#trash-2"></use>
                                            </svg>`}
                                        </span>
                                    </a>
                                `)}
                            </div>

                            <button class="btn-user btn-icon" 
                                ?hidden="${this.page === 'sm-landing' || this.smMode === 'prepare' }"
                                title="Show All Tenants"
                                @click=${() => store.dispatch(toggleTenantsListLegend())}>
                                <svg class="icon">
                                    <use href="assets/feather-sprite.svg#users"></use>
                                </svg>
                            </button>

                            <button class="btn-user btn-icon" ?hidden="${this.page === 'sm-landing'}"
                                @click=${() => store.dispatch(toggleLabels())}
                                title="${this.hideLabels ? `Show` : `Hide`} Labels">
                                <svg class="icon">
                                    <use href="assets/feather-sprite.svg#tag"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Modal -->
        <div class="modal fade" id="legend-designer-modal" tabindex="-1" role="dialog" aria-labelledby="legend-designer-modal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="legend-designer-modal">Legend Designer</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <sm-legend-designer></sm-legend-designer>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click=${this.closeLegendModal}>Close</button>
                        <button type="button" class="btn btn-primary" @click=${this.createLegend}>Create Legend</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    constructor() {
        super();
        // To force all event listeners for gestures to be passive.
        // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
        setPassiveTouchGestures(true);
    }

    protected updated(changedProps: PropertyValues) {
        if (changedProps.has('_page')) {
            const pageTitle = this.appTitle + ' - ' + this.page;
            updateMetadata({
                title: pageTitle,
                description: pageTitle
                // This object also takes an image property, that points to an img src.
            });
        }
    }

    public stateChanged(state: RootState) {
        this.page = state.app!.page;
        this.smMode = state.rxcore.smMode;
        this.tenantsOverview = state.app.tenantsOverview;
        this.hierarchyPathStringForSelectedNode = state.rxcore.hierarchyPathStringForSelectedNode;
        this.activeFile = activeFileSelector(state);
        this.hideLabels = state.rxcore.hideLabels;
        this.legends = state.legends;
        this.activeLegendKey = state.app.activeLegend || '';
    }

    protected isActiveFileBoxHidden() {
        return !(this.hierarchyPathStringForSelectedNode !== '' && this.activeFile && (this.activeFile as any)!.name);
    }

    private createLegend() {
        if (this.legendDesigner.createLegend()) {
            $('#legend-designer-modal').modal('hide');
        }
    }

    private closeLegendModal() {
        $('#legend-designer-modal').modal('hide');
        this.legendDesigner.reset();
    }

    private deleteLegend(key: string) {
        const result = confirm('Are you sure you want to delete this legend?');

        if (result && key) {
            store.dispatch(removeLegend(key));
        }
    }
}

window.customElements.define('sm-header', SmHeader);
