
// TODO avoid using this
// declare var axiosInstance: any;

import { html, property, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store, RootState } from '../redux/store.js';
import { initRxCore } from '../redux/actions/rxcore/index';

import './views/sm-mode-prepare';
import './views/sm-mode-assign';
import './views/sm-mode-view';

import RxEvents from 'rx-events';
import * as RxHelpers from '../rx-helpers/index';
import { receiveFileAreas, addFileAreaTenants } from '../redux/actions/files/sync.js';
import { getAllTenants } from '../redux/actions/tenants/async.js';
import { DEMO_TENANTS_LIST } from '../redux/actions/tenants/demo_data';
import { DEMO_FILES_LIST } from '../redux/actions/files/demo_data';

class SmRxcontainer extends connect(store)(LitElement) {

    // TODO check if this is still needed
    @property({ type: Boolean, reflect: false })
    public showToolbar = false;

    @property({ type: String, reflect: false })
    private mode = '';

    protected vectorLayers: any[] = [];

    // @property({ type: Object, reflect: false })
    // private activeFile:any;

    protected createRenderRoot() {
        return this;
    }

    protected render() {
        return html`
            <div id="rxcontainer">
                <sm-tools
                    class="tools text-left"
                    ?active=${this.showToolbar}>
                </sm-tools>
                <sm-mode-prepare class="sm-mode" ?active="${this.mode === 'prepare'}"></sm-mode-prepare>
                <sm-mode-assign class="sm-mode" ?active="${this.mode === 'assign'}"></sm-mode-assign>
                <sm-mode-view class="sm-mode" ?active="${this.mode === 'view'}"></sm-mode-view>
            </div>
        `;
    }

    public firstUpdated() {
        this.init();
        RxEvents.subscribe('vector-layers', async (layers) => {
            this.vectorLayers = layers;
        });
        // RxEvents.subscribe('file-load-complete', this.initVectorLayersState.bind(this));
        RxEvents.subscribe('markup-load-complete', this.loadAreas.bind(this));

        // for demo purpose to assign tenants to areas
        store.dispatch(getAllTenants());
    }

    // TODO check if this is still needed
    public stateChanged(state: RootState) {
        this.showToolbar = !!(state.app.activeFile && state.app.activeFile !=='');
        // this.activeFile = state.rxcore.activeFile;

        this.mode = state.rxcore.smMode;
    }

    private init() {
        const layout = {
            offsetWidth: 0,
            offsetHeight: 64, // the height of the header
        }

        store.dispatch(initRxCore(layout));


        // since window resize events fire multiple times we limit the actual execution
        // time in ms to wait before executing the resize code
        const throttleTimeout = 500;

        let resizeTaskId: any = null;
        window.addEventListener('resize', () => {
            if (resizeTaskId !== null) {
                clearTimeout(resizeTaskId);
            }

            resizeTaskId = setTimeout(() => {
                RxHelpers.zoomFit();
            }, throttleTimeout);
        });
    }

    // TODO: review, check if it's possible to init vector layer state before show the file
    // private async initVectorLayersState(fileName: string) {
        // const response = await axiosInstance.get('files/?filter=name||eq||' + fileName);
        // let layerState;

        // if (response.status === 200 && response.data.length > 0) {
            // layerState = response.data[0].layerState;

            // if (layerState !== "") {
            //     const layerStateArr: {index: number, state: number}[] = JSON.parse(layerState);

            //     layerStateArr.map((layer) => {
            //         const vectorLayer = this.vectorLayers.find(x => x.index === layer.index);

            //         if (vectorLayer && vectorLayer.state !== layer.state) {
            //             RxHelpers.changeVectorLayer(layer.index);
            //         }

            //         // TODO: review, maybe add an event in order to detect when vector state is changed
            //         const smLayerComp = document.querySelectorAll('sm-layers');
            //         if (smLayerComp.length > 0) {
            //             smLayerComp.forEach(element => {
            //                 (element as any).requestUpdate();
            //             });
            //         }
            //     })
            // }
        // }
    // }

    private loadAreas(markuplist: any[]) {
        if (Array.isArray(markuplist) && markuplist.length > 0) {
            const areas: any[] = [];
            markuplist.forEach((markup: any) => {
                // deal only with space markup
                const spaceID = markup.GetAttributes().find((element: any) => element.name === 'SpaceID');
                if (spaceID === undefined) {
                    return;
                }

                areas.push(markup.getUniqueID());

                // add default surface label
                if (markup.dimtext) {
                    markup.customlabeltext = markup.dimtext;
                    markup.busecustomlabel = true;
                }
            });

            const fileInfo = RxHelpers.getFileInfo();
            if (fileInfo) {
                store.dispatch(receiveFileAreas(fileInfo.FileName, areas));

                // assign demo tenants for demo files
                this.assignTenantsForDemoFile(fileInfo.FileName, areas);
            }
        }
    }

    private assignTenantsForDemoFile(fileName: string, areaIds: string[]) {
        // check to see if the file is in demo list
        if (DEMO_FILES_LIST.hasOwnProperty(fileName)) {
            let counter = 0;
            const areaTenants: {[areaId: string]: number} = {}

            areaIds.forEach((id, index) => {
                if (index % 2 == 0 ) {
                    areaTenants[id] = DEMO_TENANTS_LIST[counter].id;

                    // reset counter when has the length of demo tenants list
                    if (counter === Object.keys(DEMO_TENANTS_LIST).length - 1) {
                        counter = 0;
                    } else {
                        counter++;
                    }
                }
            });

            store.dispatch(addFileAreaTenants(fileName, areaTenants));
        }
    }
}
window.customElements.define('sm-rxcontainer', SmRxcontainer);