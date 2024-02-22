
import { html, LitElement, property, query } from 'lit-element';
import { store, RootState } from '../redux/store';
import { updateSmMode } from '../redux/actions/rxcore/index';
// import { closeAllFiles } from '../actions/rxcore/async';
import { navigate } from '../redux/actions/app';
import { connect } from 'pwa-helpers/connect-mixin';


class SmModeChanger extends connect(store)(LitElement) {

    @property({ type: Boolean, reflect: false })
    public isDrawerOpen:boolean = false;

    @query('.mode-options-drawer')
    public modeOptionsDrawer: HTMLElement;

    protected modeLabels:{[key:string]:string} = {
        '':'',
        'prepare':'Drawing Preparation',
        'assign':'Space Assignment',
        'view':'View'
    }

    @property({ type: String, reflect: false })
    private mode = '';

    // static styles = [
    //     css`
    //       :host {
    //         display: block;
    //         position: relative;
    //         }

    //       :host([active]) {
    //       }
    //       .mode-options-drawer {
    //           position: fixed;
    //           top: 0;
    //           left: 0;
    //           height: 100%;
    //           width: 410px;
    //           z-index: 10000;
    //           background: rgba(150,150,150,0.9);
    //       }
    //       .hidden {
    //           display:none !important;
    //       }
    //     `
    // ];

    protected createRenderRoot() {
        return this;
    }

    protected render() {
        return html`
        <button type="button"
            class="btn btn-outline-light ${!this.isDrawerOpen?`highlight-mode-changer-btn`:``}"
            @click=${this.openDrawer}>
            <b>Mode:</b>
            ${this.modeLabels[this.mode]}
        </button>

        <div class="mode-options-drawer" ?inactive=${!this.isDrawerOpen}>
            <div
                class="mode-options-drawer-overlay"
                @click="${this.closeDrawer}">
            </div>
            <div class="container-fluid">
                <div class="row justify-content-center mb-3 mt-3">
                    <div class="col">
                        <div @click=${() => this.goToLanding()}
                            class="btn-mode card">
                            <div class="card-body">
                                <h5 class="card-title">Home</h5>
                                <p class="card-text text-secondary">Select a Floor/drawing. Upload a new drawing. </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center mb-3 mt-3">
                    <div class="col">
                        <div @click=${() => this.changeMode('prepare')}
                            class="btn-mode card">
                            <div class="card-body">
                                <h5 class="card-title">Drawing Preparation</h5>
                                <p class="card-text text-secondary">Convert existing CAD polygons into FM spaces, draw new FM spaces where CAD polygons are missing,
                                    show/hide CAD layers and drawing details, calibrate the drawing and save the chosen setup
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center mb-3">
                    <div class="col-sm">
                        <div
                            @click=${() => this.changeMode('assign')}
                            class="btn-mode card">
                            <div class="card-body">
                                <h5 class="card-title">Assign area attributes, tenants and labels</h5>
                                <p class="card-text text-secondary">Assign attributes to each room, space or region.
                                            <br> Assign tenants to each room, space.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center mb-3">
                    <div class="col">
                        <div
                            @click=${() => this.changeMode('view')}
                            class="btn-mode card">
                            <div class="card-body">
                                <h5 class="card-title">Property Overview</h5>
                                <p class="card-text text-secondary">Get a complete overview of each plan of the building.
                                            Control the view by an active Legend, sorted by tenant or area type.
                                            You can see all room info, tenant occupancy, common space, allocated space and free space.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    private openDrawer() {
        this.isDrawerOpen = true;
    }

    private closeDrawer() {
        this.isDrawerOpen = false;
    }

    private changeMode(mode: string) {
        if (this.mode !== mode ) {
            store.dispatch(updateSmMode(mode));
            // TODO Check if we need to save changes
            // store.dispatch(closeAllFiles());
        }
        this.isDrawerOpen = false;
    }

    private goToLanding() {
        store.dispatch(updateSmMode('landing'));
        // TODO Check if we need to save changes
        // store.dispatch(closeAllFiles());
        store.dispatch(navigate('/sm-landing'));
        this.isDrawerOpen = false;
    }

    public stateChanged(state: RootState) {
        this.mode = state.rxcore.smMode;
    }
}

window.customElements.define('sm-mode-changer', SmModeChanger);