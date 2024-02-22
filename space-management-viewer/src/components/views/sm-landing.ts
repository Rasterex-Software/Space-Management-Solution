
import { html, query, property } from 'lit-element';
import { PageViewElement } from '../generic/page-view-element';
import { navigate, setActiveFile } from '../../redux/actions/app.js';
import { store, RootState } from '../../redux/store.js';

import { updateSmMode } from '../../redux/actions/rxcore/index';
import { uploadFile } from '../../rx-helpers/index';
import { setHierarchyPathStringForSelectedNode } from '../../redux/actions/rxcore';

import '../../../libs/gui-components/components/tree-view/rasterex-tree-view-node.js';
import '../../../libs/gui-components/components/tree-view/rasterex-tree-view.js';

import '../sm-tree/sm-tree';
import '../generic/sm-panel';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { querySelectorDeep } from '../../utils/querySelectorDeep';
import { TreeNodeData, SmTree } from '../sm-tree/sm-tree';
import { activeFileSelector } from '../../redux/reducers/files.js';
import { requestFile } from '../../redux/actions/files/sync.js';
import { selectFile } from '../../redux/actions/files/async.js';

class SmLanding extends connect(store)(PageViewElement) {

    // @query('#upload-file-container')
    // private uploadContainer: HTMLElement;

    @property({ type: Object, reflect: false })
    public activeFile:any=null;


    @query('#sm-tree')
    public treeView: SmTree;

    public msgPleaseSelectFloor:string = 'Please select a floor first.';

    public excludedFileNames = ['110_01.dwg','110_02.dwg','1500_001.dwg','1500_002.dwg'];

    public msgFileExists:string = 'A drawing with the same name already exists in the system. Please rename the file and try again.';

    @property({type:Boolean, reflect: false})
    public actionInProgress:boolean = false;

    @property({ type: String, reflect: false })
    private hierarchyPathStringForSelectedNode = '';

    @property({ type: Object })
    public treeData: TreeNodeData = {
        "name": "Properties",
        "isOpen": true,
        "children": [{
            "name": "UK",
            "isOpen": true,
            "children": [{
                "name": "London",
                "isOpen": true,
                "children": [{
                    "name": "London-01",
                    "isOpen": true,
                    "children": [{
                        "name": "Floor01",
                        "fileData": {
                            "id": 1,
                            "name": "1500_001.dwg",
                        }
                    },
                    {
                        "name": "Floor02",
                        "fileData": {
                            "id": 2,
                            "name": "1500_002.dwg",
                        }
                    }]
                },
                ]
            }
            ]
        },
        {
            "name": "Norway",
            "isOpen": true,
            "children": [
            {
                "name": "Oslo",
                "isOpen": true,
                "children": [
                    {
                        "name": "OSL-01",
                        "isOpen": true,
                        "children": [{
                            "name": "Floor-01",
                            "fileData": {
                                "id": 3,
                                "name": "110_01.dwg",
                            }
                        },
                        ]
                    },
                    {
                        "name": "OSL-02",
                        "isOpen": true,
                        "children": [{
                            "name": "Floor-02",
                            "fileData": {
                                "id": 4,
                                "name": "110_02.dwg",
                            }
                        }]
                    },
                ]
            }
            ]
        }
        ],
    };

    protected createRenderRoot() {
        return this;
    }

    protected render() {
        return html`
            <div class="container-fluid">
                <div class="row justify-content-center mb-3">
                    <div class="col">
                        <div class="row justify-content-center mb-3">
                            <div class="col-sm-10">
                                <div>
                                    <div class="card-body">
                                        <h5 class="card-title">Rx Facility Management System</h5>
                                        <p class="card-text text-secondary">This is a showcase application to demonstrate
                                            some of the capabilities that Rasterex’ FM SDK can provide to developers of
                                            Property Management Systems. The SDK can run on any server or in the cloud,
                                            and interface, functions and features can be customized to fit seamlessly
                                            into the look and feel of the FM system</p>
                                        <p class="card-text text-secondary">
                                            <svg class="icon">
                                                <use href="/assets/feather-sprite.svg#file"></use>
                                            </svg> -> a node <b>without</b> a file/drawing attached
                                            <br/>
                                            <svg class="icon">
                                                <use href="/assets/feather-sprite.svg#file-text"></use>
                                            </svg> -> a node <b>with</b> a file/drawing attached
                                        </p>
                                        <p class="card-text text-secondary">
                                            Files can be assigned only to nodes on level 5 or greater
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center mb-3 mt-3">
                            <div class="col-sm-10">
                                <div class="card-body">
                                    <h5 class="card-title">Select Floor</h5>
                                    <sm-tree
                                        id="sm-tree"
                                        .data=${this.treeData}
                                        @select=${this.onTreeNodeSelectHandler}
                                        .uploadInputId="fileToUpload"
                                    ></sm-tree>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div hidden class="row justify-content-left mb-3 mt-3">
                            <div class="col-sm-10">
                                <div class="upload-file-container zindex-level1">
                                        <form method="post" action="#" id="#">
                                            <div class="form-group files file-upload-box">
                                                <label>Upload Your File </label>
                                                <input
                                                    type="file"
                                                    class="form-control"
                                                    id="fileToUpload"
                                                    @click="${this.onUploadClick}"
                                                    @change="${this.onUploadChange}"
                                                    >
                                                <div ?hidden=${this.allowUpload()} class="disable-click-overlay"></div>
                                            </div>
                                        </form>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-left mb-3 mt-3">
                            <div class="col-sm-10">
                                <div @click=${() => this.changeMode('prepare')}
                                    class="btn-mode card border-dark">
                                    <div class="card-body">
                                        <h5 class="card-title">Prepare the Drawing</h5>
                                        <p class="card-text text-secondary">Convert existing CAD polygons into FM spaces,
                                            draw new FM spaces where CAD polygons are missing, show/hide CAD layers and
                                            drawing details, calibrate the drawing and save the chosen setup.</p>
                                    </div>
                                    <div ?hidden=${this.allowModeChange()} class="disable-click-overlay"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-left mb-3">
                            <div class="col-sm-10">
                                <div
                                    @click=${() => this.changeMode('assign')}
                                    class="btn-mode card border-dark">
                                    <div class="card-body">
                                        <h5 class="card-title">Assign area attributes, tenants and labels</h5>
                                        <p class="card-text text-secondary">Assign attributes to each room, space or region.
                                            <br> Assign tenants to each room, space.</p>
                                    </div>
                                    <div ?hidden=${this.allowModeChange()} class="disable-click-overlay"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-left mb-3">
                            <div class="col-sm-10">
                                <div
                                    @click=${() => this.changeMode('view')}
                                    class="btn-mode card border-dark">
                                    <div class="card-body">
                                        <h5 class="card-title">Property Overview</h5>
                                        <p class="card-text text-secondary">Get a complete overview of each plan of the building.
                                            Control the view by an active Legend, sorted by tenant or area type.
                                            You can see all room info, tenant occupancy, common space, allocated space and free space.</p>
                                    </div>
                                    <div ?hidden=${this.allowModeChange()} class="disable-click-overlay"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="loading-overlay" ?hidden=${!this.actionInProgress}></div>
        `;
    }

    public stateChanged(state: RootState) {
        // if (this.activeFile!==state.rxcore.activeFile && null===state.rxcore.activeFile) {
        //     (this.treeView as any).deselectNode(this.treeView.selectedNodeEl);
        // }

        // TODO review/rewrite this
        if (this.activeFile ===null && state.app.activeFile!==null) {
            this.actionInProgress = false;
        }
       this.activeFile = activeFileSelector(state);
       this.hierarchyPathStringForSelectedNode = state.rxcore.hierarchyPathStringForSelectedNode;
    }

    private changeMode(mode: string) {
        if (this.allowModeChange()) {
            store.dispatch(navigate('/sm-rxcontainer'));
            store.dispatch(updateSmMode(mode));
        } else {
            alert(this.msgPleaseSelectFloor);
        }
    }

    private allowModeChange() {
        // return !!(this.activeFile && this.activeFile.name && this.selectedFloor);
        return !!(this.activeFile && this.activeFile.name);
    }

    private allowUpload() {
        // return !!(this.treeView && this.treeView.selectedNodeEl);
        return (this.hierarchyPathStringForSelectedNode!=='');
    }

    private onUploadClick() {
        (this as any).value = null;
        store.dispatch(setActiveFile(null));
    }

    private async onUploadChange(e: any) {
        const fileName = e.target.value.split("\\").pop();

        // if no file chosen return
        if (fileName === '') {
            return;
        }

        if (this.excludedFileNames.indexOf(fileName)>=0) {
            alert('Please upload a file with a different name than '+this.excludedFileNames.join(', '));
            e.target.value = '';
            return;
        }

        this.actionInProgress = true;
        uploadFile();

        let newData:any = {
            'name': fileName,
            // 'hierarchyPath': 'Norway / Saltdal / OSL-03 / New ' + Date.now()
            'hierarchyPath': this.treeView.getHierarchyPathStringForSelectedNode()
        }
        this.updateTreeData(newData);

        this.treeView.requestUpdate();
        store.dispatch(requestFile(newData.name));
        // store.dispatch(setActiveFile(newData));
        // await this.treeView.updateComplete;
        // TODO find a better way
        window.setTimeout(()=>{
            try {
                (this.treeView as any).deselectNode();
                this.selectTreeNodeByFileName(newData.name);
            } catch(err){
                //
            }
        },0);
        // clearing target value it's causing problems because there are some xhr callbacks which are using this values
        // and this clearing sometimes happens before those callbacks
        // e.target.value = '';

    }

    public updateTreeData(uploadedData:any) {
        // let newTreeData:any = Object.assign({},this.treeData);

        // ((newTreeData as any).children[0] as any).children[2] = {
        //     "name": "OSL-03",
        //     "open": true,
        //     "children": [{
        //         "name": "Uploaded file",
        //         "cssID": btoa(uploadedData!.name).replace(/=/g,''),
        //         "fileData": uploadedData
        //     }]
        // }

        // this.treeData = JSON.parse(JSON.stringify(newTreeData)); // deep clone

        if ( this.treeView.selectedNodeEl && (this.treeView.selectedNodeEl as any).nodeData) {
            (this.treeView.selectedNodeEl as any).nodeData.fileData = uploadedData;
        }
        // let newTreeData:any = Object.assign({},this.treeData);

        // this.treeData = newTreeData;
        // this.treeData = JSON.parse(JSON.stringify(this.treeData)); // deep clone
        // this.requestUpdate();
    }

    /**
     * `select` rasterex-tree-view-node handler
     *
     * @param e CustomEvent
     */
    public onTreeNodeSelectHandler(e: CustomEvent) {
        console.log('landing -> node select', e);
        store.dispatch(setActiveFile(null));
        if (e.detail === undefined || e.detail.nodeData === undefined) {
            return;
        }

        const data = e.detail.nodeData as TreeNodeData; // SpacesTreeData;

        // select floor
        if (data.fileData && data.fileData.name) {
            // TODO check/adjust for the uploaded file
            store.dispatch(selectFile(data.fileData.name));
            // store.dispatch(setActiveFile(data.fileData));
        } else {
            // store.dispatch(closeAllFiles());
            store.dispatch(setActiveFile(null));
            this.requestUpdate();
        }
        store.dispatch(setHierarchyPathStringForSelectedNode(this.treeView.getHierarchyPathStringForSelectedNode()));
    }

    public selectTreeNodeByFileName(fName:string) {
        const id = btoa(fName).replace(/=/g,'');
        this.selectTreeNodeById(id);
    }

    public selectTreeNodeById(id:string) {
        const tNode = querySelectorDeep(`#${id}`,this.treeView);
        const e:CustomEvent = new CustomEvent("select", {"detail":tNode});
        this.treeView.selectNode(e);
    }

}
window.customElements.define('sm-landing', SmLanding);