import { html, query, property, LitElement, PropertyValues } from "lit-element";
import '../sm-layers';
import { dragIcon, closeIcon, collapseIcon, expandIcon } from '../generic/sm-icons';
import { connect } from "pwa-helpers/connect-mixin";
import { store, RootState } from "../../redux/store";
import { startConvert, endConvert,
    closeFile,
} from "../../redux/actions/rxcore";
import RxEvents from "rx-events";
import { SmLayers } from "../sm-layers";
import Draggable from "../../utils/draggable";
import * as RxHelpers from '../../rx-helpers/index';
import '../../../libs/rx-spacer/src/rx-spacer-scale';
import { navigate, setActiveFile } from '../../redux/actions/app';
import '@material/mwc-switch/';
import Collapsible from "../../utils/collapsible";
import { activeFileSelector, RxFileAreaLabel, RxFileState } from "../../redux/reducers/files";
import { receiveFileAreas, receiveFileArea, removeFileArea } from "../../redux/actions/files";
import '../sm-label-config';
import { activeArea } from "../../redux/actions/rxcore/sync";
import { SmLabelConfig } from "../sm-label-config";
// import { selectArea } from "../../redux/actions/rxcore";
import { getMarkupbyGUID } from "../../rx-helpers/index";

export class SmModePrepare extends connect(store)(LitElement) {

    @query('sm-layers')
    private layersComp: SmLayers;

    @query('#area-actions-container')
    private areasContainer: HTMLElement;

    @query('.notifications')
    private notificationsContainer: HTMLElement;

    @query('#sm-prep-highlight-all')
    private swHighlightAll: HTMLElement;

    @query('sm-label-config')
    private labelConfig: SmLabelConfig;

    // @query('.close-file')
    // private closeContainer: HTMLElement;

    // @property({ type: Array })
    // private files: any[] = [];

    @property({ type: String })
    private fileName: string;

    @property({ type: Array, reflect: false})
    public activeFileAreas: string[] = [];

    @property({ type: Object, reflect: false })
    public activeFile: RxFileState= {};

    @query('#sm-prep-space-list')
    private rxSpacerAreaList: HTMLElement;

    @property({ type: String, reflect: false })
    private mode = '';

    @property({ type: String, reflect: false })
    private selectedArea: string;

    @property({ type: Boolean, reflect: false })
    private showSnap = false;

    @property({ type: Boolean, reflect: false })
    private hideLabels: boolean;

    private isCloseScheduled:boolean = false;

    private isSaveScheduled:boolean = false;

    private areaLabels: RxFileAreaLabel = {};
    // private saveConfirmationMessage:string =  `Save changes?`;

    protected createRenderRoot() {
        return this;
    }

    protected render() {
        return html`
            <div class="close-file zindex-level1 d-none" ?hidden=${!this.activeFile}>
                <span @click="${this.confirmSaveAndClose}">${closeIcon}</span>
            </div>

            <sm-layers ?hidden=${!this.activeFile}
                mode=${this.mode}
                @collapse=${() => this.repositionAreasContainer()}>
            </sm-layers>

            <div id="area-actions-container" ?hidden=${!this.activeFile}>
                <span class="collapse-item collapse-icon" @click=${this.onClickCollapse}>${collapseIcon}</span>
                <span class="drag-item">${dragIcon}</span>
                <h2>Spacing</h2>
                <div class="collapse-wrapper">
                    <hr>
                    <rx-spacer-scale></rx-spacer-scale>
                    <rx-spacer
                        id="spacer"
                        ignore-conversion='["110_01.dwg", "1500_001.dwg", "110_02.dwg", "1500_002.dwg"]'
                        auto-convert>
                    </rx-spacer>

                    <div class="snap-container" ?hidden=${!this.showSnap}>
                        <br>
                        <span class="switch-label">Snap </span>
                        <mwc-switch
                            id="sm-prep-snap-toggle"
                            class="overview-switch"
                            .checked=${RxHelpers.getSnapState()}
                            @click=${this.toggleSnap}>
                        </mwc-switch>
                    </div>

                    <hr>
                    <p>
                        <span class="switch-label">Highlight All </span>
                        <mwc-switch
                            id="sm-prep-highlight-all"
                            class="overview-switch"
                            @click=${this.toggleSpaces}>
                        </mwc-switch>
                    </p>

                    <rx-spacer-area-list
                        id="sm-prep-space-list"
                        excludeFields='["name", "description", "type"]'>
                    </rx-spacer-area-list>
                </div>
            </div>

            <rx-spacer-area-actions
                excludeActions='["edit-area"]'>
            </rx-spacer-area-actions>

            <sm-label-config
                id="labels-config"
                draggable
                collapsible
                .areas=${this.activeFileAreas}
                .selectedArea=${this.selectedArea}
                ?show="${this.selectedArea !== ''}">
            </sm-label-config>

            <div class="notifications">
                <div class="alert alert-success" role="alert">
                    File save success!
                </div>

                <div class="alert alert-danger" role="alert">
                    File save failed!
                </div>
            </div>
        `;
    }

    protected firstUpdated() {
        RxEvents.subscribe('file-load-complete', () => {
            this.fileName = RxHelpers.getFileInfo().FileName;
        });
        RxEvents.subscribe('rx-spacer-toggle-calibration', (active: boolean) => {
            if (!active) {
                RxHelpers.restoreDefault('edit');
                (document.querySelector('#imageTemp') as HTMLElement).setAttribute('style', 'cursor: default');
            }

            // hide snap point
            this.showSnap = false;
        });
        RxEvents.subscribe('rx-spacer-toggle-spacer', (active: boolean) => {
            if (!active) {
                RxHelpers.restoreDefault('edit');
                (document.querySelector('#imageTemp') as HTMLElement).setAttribute('style', 'cursor: default');
            }

            // show/hide snap point
            this.showSnap = active;
        });
        RxEvents.subscribe('rx-spacer-start-convert', () => this.startConvertHandler());
        RxEvents.subscribe('rx-spacer-end-convert', () => this.endConvertHandler());
        RxEvents.subscribe('rx-spacer-new-area-bulk', (data) => this.saveBulkAreaHandler(data));
        RxEvents.subscribe('rx-spacer-new-area', (data) => this.saveAreaHandler(data));
        RxEvents.subscribe('rx-spacer-delete-area', (data) => this.deleteAreaHandler(data));
        RxEvents.subscribe('rx-spacer-scale', () => this.showSnap = false);
        RxEvents.subscribe('markup', this.onMarkupChange.bind(this));

        RxEvents.subscribe('calibrate-complete', () => this.updateAllLabels());
        RxEvents.subscribe('rx-spacer-scale', () => this.updateAllLabels());
        RxEvents.subscribe('markup-area-edit', () => this.updateActiveAreaLabel());

        new Draggable(
            this.areasContainer,
            this.areasContainer.querySelector('.drag-item') as HTMLElement
        );
        new Collapsible(
            this.areasContainer.querySelector('.collapse-wrapper') as HTMLElement,
            this.areasContainer.querySelector('.collapse-item') as HTMLElement
        )

        window.addEventListener("beforeunload",()=>{
            if (this.mode ==='prepare') {
                this.saveAllChanges();
                // debugger;
            }
        });
    }

    protected updated(changedProps: PropertyValues) {
        if (changedProps.has('mode') && this.mode === 'prepare') {
            this.repositionAreasContainer();
            (this.swHighlightAll as any).checked = false;
            RxHelpers.enableSpaceEdit();
            RxHelpers.hideMarkupLabels();
        }

        if (this.selectedArea !== '' && changedProps.has('hideLabels')) {
            this.labelConfig.show = !this.hideLabels;
        }
    }

    public stateChanged(state: RootState) {
        const mode = state.rxcore.smMode;

        this.activeFile = activeFileSelector(state);
        if (this.activeFile) {
            this.activeFileAreas = this.activeFile.areaIds || [];
            this.areaLabels = this.activeFile.areaLabels || {};
        }

        if (this.isCloseScheduled !== state.rxcore.scheduledClose) {
            this.isCloseScheduled = state.rxcore.scheduledClose;
        }
        if (this.isSaveScheduled !== state.rxcore.scheduledSave) {
            this.isSaveScheduled = state.rxcore.scheduledSave;
        }

        if ( (this.mode !== mode) && (mode !=='prepare')) {
            if (this.fileName && this.activeFile!==null) {
                if (this.isSaveScheduled && this.isCloseScheduled) {
                    this.confirmSaveAndClose();
                } else if (this.isSaveScheduled) {
                    this.confirmSave();
                } else if (this.isCloseScheduled) {
                    this.closeFile();
                }
            }
        }
        this.mode = mode;
        this.selectedArea = state.rxcore.selectedArea;
        this.hideLabels = state.rxcore.hideLabels;
    }

    private confirmSave() {
        let hasConfirmed = true; // confirm(this.saveConfirmationMessage);

        if (hasConfirmed) {
            this.saveAllChanges();
        }
    }

    private confirmSaveAndClose() {
        let hasConfirmed = true; // confirm(this.saveConfirmationMessage);

        if (hasConfirmed) {
            this.saveAllChanges();
        }
        this.closeFile();
        store.dispatch(navigate('/sm-landing'));
    }

    private saveAllChanges() {
        // temporally disable because file label is no more editable
        // this.updateFileLabel();
        // if (this.rxSpacerAreaList && typeof (this.rxSpacerAreaList as any).saveAreas !== undefined) {
            // (this.rxSpacerAreaList as any).saveAreas();
        // }
        // this.saveFile();
    }

    private closeFile() {
        if (!this.activeFile) {
            return;
        }
        // const fileName = this.activeFile.name;
        const fileName = this.fileName;
        if (RxHelpers.closeFile(fileName)) {
            store.dispatch(closeFile(fileName));
            store.dispatch(setActiveFile(null));
            this.activeFile = {};
            this.fileName = '';
        }
    }

    private async saveBulkAreaHandler(data: any) {
        await this.updateComplete;

        const areas = data.areas;
        const fileName = data.fileName;

        if (areas && areas.length > 0 ) {
            store.dispatch(receiveFileAreas(fileName, areas));
        }
    }

    protected async saveAreaHandler(data: any) {
        await this.updateComplete;
        this.showSnap = false;
        const areaId = data.areaId;
        const fileName = data.fileName;
        // TODO: should be edit area??
        if (areaId) {
            store.dispatch(receiveFileArea(fileName, areaId));
            store.dispatch(activeArea(areaId));
        }
    }

    private deleteAreaHandler(id: any) {
        const areaId = id;

        if(areaId) {
            store.dispatch(removeFileArea(this.fileName, areaId));
        }
    }

    private startConvertHandler() {
        store.dispatch(startConvert())
    }

    private endConvertHandler() {
        store.dispatch(endConvert())
    }

    protected async repositionAreasContainer() {
        if (this.mode !== 'prepare' || this.areasContainer.hasAttribute('dragged')) {
            return;
        }
        await this.layersComp.updateComplete;
        const layerList = this.layersComp.querySelector('.vector-layers-list') as HTMLElement;
        this.areasContainer.style.top = (layerList.clientHeight + 20) + 'px';
        this.areasContainer.style.display = 'block';
    }

    private toggleSpaces(e: any) {
        const checked = !e.target.checked;

        RxHelpers.highlightSpaces((this.rxSpacerAreaList as any).areas, checked)
    }

    protected showSuccessNotification() {
        const successAlert = this.notificationsContainer.querySelector('.alert-success') as HTMLElement;

        this.notificationsContainer.style.display = 'block';
        successAlert.style.display  = 'block';
        setTimeout(() => {
            this.notificationsContainer.style.display = 'none';
            successAlert.style.display  = 'none';
        }, 1500);
    }

    protected showFailNotification() {
        const failAlert = this.notificationsContainer.querySelector('.alert-danger') as HTMLElement;

        this.notificationsContainer.style.display = 'block';
        failAlert.style.display  = 'block';
        setTimeout(() => {
            this.notificationsContainer.style.display = 'none';
            failAlert.style.display  = 'none';
        }, 1500);
    }

    private onClickCollapse(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;

        // collapse icon
        if (target.classList.contains('collapse-icon')) {
            target.innerHTML = expandIcon.getHTML();
            target.classList.remove('collapse-icon');
            return;
        }

        // expand icon
        target.innerHTML = collapseIcon.getHTML();
        target.classList.add('collapse-icon');
    }

    private toggleSnap(e: any) {
        const checked = !e.target.checked;

        RxHelpers.changeSnapState(checked);
    }

    private onMarkupChange(markup: any, operation: any) {
        if (markup === undefined) {
            return;
        }

        // unselect operation
        if (markup === -1) {
            store.dispatch(activeArea(''));
        }
        // on create operation add default surface label
        else if (operation.created) {
            if (markup.dimtext) {
                markup.customlabeltext = markup.dimtext;
                markup.busecustomlabel = true;
            }
        }
        // select area
        else if (operation.modified) {
            store.dispatch(activeArea(markup.uniqueID));
        }
    }

    private updateAllLabels() {
        if (this.activeFileAreas) {
            this.activeFileAreas.forEach(areaId => {
                const markup = getMarkupbyGUID(areaId);
                if (markup !== -1 && !this.areaLabels.hasOwnProperty(areaId)) {
                    markup.customlabeltext = markup.dimtext;
                }
            })
        }
    }

    private updateActiveAreaLabel() {
        const markup = getMarkupbyGUID(this.selectedArea);
        if (markup !== -1 && markup !== undefined && !this.areaLabels.hasOwnProperty(this.selectedArea)) {
            markup.customlabeltext = markup.dimtext;
        }
    }

    // private requestExistingFiles(fileName: string, id: string) {
    //     store.dispatch(selectFloor(fileName));
    //     this.fileId = id;
    //     this.uploadContainer.style.display = 'none';
    // }
}

window.customElements.define('sm-mode-prepare', SmModePrepare);