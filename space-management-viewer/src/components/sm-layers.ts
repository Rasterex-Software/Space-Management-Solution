import { html, property, query, LitElement, queryAll } from "lit-element";
import RxEvents from "rx-events";
import * as RxHelpers from '../rx-helpers/index';
import { dragIcon, collapseIcon, expandIcon } from './generic/sm-icons.js';
import Draggable from "../utils/draggable";
import Resizable from "../utils/resizable";
import { getFileInfo } from "../rx-helpers/index";

export type TLayerState = {index: number, state: number };
export class SmLayers extends LitElement {

    @query('.vector-layers-list')
    private wrapper: HTMLElement;

    @query('.layers-container')
    private layersContainer: HTMLElement;

    @queryAll('.layer-list-item')
    private layerListItems: NodeListOf<HTMLInputElement>;

    @property({ type: Array, reflect: false })
    public layers: {[fileName:string]: any[]} = {}

    @property({ type: String, reflect: false })
    public mode: string;
    
    private resized = false;
    private widthBeforeResize: string;
    private heightBeforeResize: string;
    private activeFile: string;
    private skipLayersCallback = false;
    private savedLayersState: { [fileName:string]: TLayerState[] } = {};
    private defaultLayersState:{ [fileName:string]: TLayerState[] } = {};

    protected createRenderRoot() {
        return this;
    }

    protected render() {
        return html`
            <div class="vector-layers-list"
                @resize-start=${this.resizeStartHandler}
                >
                <div class='resizers'>
                    <div class='resizer top-left'></div>
                    <div class='resizer top-right'></div>
                    <div class='resizer bottom-left'></div>
                    <div class='resizer bottom-right'></div>
                </div>

                <div class="layers-header">
                    <span class="collapse-item collapse-icon" @click=${this.onClickCollapse}>${collapseIcon}</span>
                    <span class="drag-item">${dragIcon}</span>
                    <h2>Layers</h2>
                    <hr>
                </div>

                <div class="layers-container">
                    <div class="all-layers-controls">
                        <div class="btn-group" role="group" aria-label="Layer controls">
                            <button type="button"
                                class="btn btn-outline-dark"
                                title="All On"
                                @click=${this.toggleAllLayersOn}>
                                <svg class="icon">
                                        <use href="assets/feather-sprite.svg#eye"></use>
                                </svg>
                            </button>
                            <button type="button"
                                class="btn btn-outline-success"
                                title="Save Layer State"
                                @click=${this.saveLayersState}>
                                <svg class="icon">
                                        <use href="assets/feather-sprite.svg#save"></use>
                                </svg>
                            </button>
                            <button type="button"
                                class="btn btn-outline-info"
                                @click=${this.restoreSavedLayersState}
                                title="Restore Layer State"
                                ?disabled=${this.isRestoreLayersBtnDisabled()}>
                                <svg class="icon">
                                        <use href="assets/feather-sprite.svg#rotate-ccw"></use>
                                </svg>
                            </button>
                            <button type="button"
                                class="btn btn-outline-info"
                                @click=${this.restoreDefaultLayersState}
                                title="Restore Default Layer State">
                                <svg class="icon">
                                        <use href="assets/feather-sprite.svg#refresh-ccw"></use>
                                </svg>
                            </button>
                            <button type="button"
                                class="btn btn-outline-dark"
                                title="All Off"
                                @click=${this.toggleAllLayersOff}>
                                <svg class="icon">
                                    <use href="assets/feather-sprite.svg#eye-off"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                    ${this.layers[this.activeFile]  !== undefined
                        ? html`
                            <div class="layers-list">
                                ${this.layers[this.activeFile].map((layer) =>
                                    html`
                                        <label>
                                            <input
                                                class="layer-list-item"
                                                type="checkbox"
                                                name="${layer.name}"
                                                value="${layer.index}"
                                                .checked=${layer.state === 1 ? true : false}
                                                @change=${this.toggleLayer}/>
                                            <span class="color" style="background-color: ${layer.color}"></span>
                                            ${layer.name}
                                        </label><br>`
                                )}
                            </div>`
                        : `No layers`
                    }
                </div>
            </div>
        `;
    }

    public connectedCallback() {
        super.connectedCallback();

        RxEvents.subscribe('vector-layers', this.onVectorLayersReceived.bind(this));
        
        RxEvents.subscribe('page', () => {
            const file = getFileInfo();
            if (file && file.FileName !== this.activeFile) {
                this.activeFile = file.FileName;
                this.requestUpdate();
            }
        });
    }

    protected shouldUpdate() {
        return this.activeFile !== undefined;
    }

    protected firstUpdated() {
        new Draggable(this.wrapper, this.querySelector('.drag-item') as HTMLElement);
        new Resizable(this.wrapper, 250);
    }

    protected updated() {
        if (this.layersContainer.clientHeight > 380) {
            this.layersContainer.style.maxHeight = '380px';
            this.layersContainer.style.overflowY = 'scroll';
        }
    }

    public getLayersState():TLayerState[] {
        let layersState:  TLayerState[] = [];
        this.layers[this.activeFile].map((layer:any) => {
            const clonedLayer = JSON.parse(JSON.stringify(layer));
            layersState.push({
                index: clonedLayer.index as number,
                state: clonedLayer.state as number
            })
        })

        return layersState;
    }

    private async onVectorLayersReceived(layers: any) {
        if(this.skipLayersCallback) {
            this.skipLayersCallback = false;
            return;
        }

        const file = getFileInfo()
        if (this.layers !== layers && file !== undefined) {
            this.activeFile = getFileInfo().FileName;
            this.layers[this.activeFile] = layers;

            // set default layers state only once when the file is first loaded
            if (this.defaultLayersState[this.activeFile] === undefined) {
                const clonedLayers = JSON.parse(JSON.stringify(layers));
                this.defaultLayersState[this.activeFile] = clonedLayers.map((layer:any) => {
                    return{
                        index: layer.index as number,
                        state: layer.state as number
                    }
                })
            }
        }
    }

    private toggleLayer(e: any) {
        const index = e.target.value;

        RxHelpers.changeVectorLayer(index);
    }

    private isRestoreLayersBtnDisabled(){
        return (this.savedLayersState[this.activeFile] === undefined && this.savedLayersState[this.activeFile] === undefined);
    }
    private toggleLayers(onOff:boolean) {
        // since RxHelpers.toggleLayers triggers again vector-layers event we need to set a flag 
        // in order to skip processing again vector layers
        this.skipLayersCallback = true;
        
        RxHelpers.toggleLayers(onOff);
        // checked/unchecked vector layer list
        this.layerListItems.forEach((item) => item.checked = onOff);
    }

    private toggleAllLayersOn() {
        this.toggleLayers(true);
    }

    private toggleAllLayersOff() {
        this.toggleLayers(false);
    }

    private saveLayersState() {
        this.savedLayersState[this.activeFile] = this.getLayersState();
        this.requestUpdate();
    }

    // TODO find a better way to implement layer state restore
    private restoreLayersState(layersState:TLayerState[]) {
        // this.toggleLayers(false);
        // this.layerListItems.forEach((item:any) => {
        //     if ()
        // });
        layersState.forEach((layerState:TLayerState)=>{
            // HTML input checkbox element
            // const layerListItem = this.layersContainer.querySelector(`input[value="${layerState.index}"]`);
            const layerListItem = Array.from(this.layerListItems).find((element)=>{
                return element.value === ''+layerState.index; // converts to string
            });
            if (layerListItem) {
                const isInSync = ((layerListItem.checked && layerState.state === 1)
                    || (!layerListItem.checked && layerState.state === 0));
                if (!isInSync) {
                    layerListItem.click();
                }
            }
        });
    }

    // TODO find a better way to implement layer state restore
    private restoreSavedLayersState() {
        this.restoreLayersState(this.savedLayersState[this.activeFile]);
    }

    // TODO find a better way to implement layer state restore
    private restoreDefaultLayersState() {
        this.restoreLayersState(this.defaultLayersState[this.activeFile]);
    }

    private resizeStartHandler() {
        if (!this.resized) {

            this.layersContainer.style.position = 'absolute';
            this.layersContainer.style.top = '0px';
            this.layersContainer.style.overflowY = 'scroll';
            this.layersContainer.style.maxHeight = '100%';

            this.resized = true;
        }
    }

    private onClickCollapse(e: any) {
        const target = e.currentTarget as HTMLElement;

        // collapse
        if (target.classList.contains('collapse-icon')) {
            // fix using with resize
            this.widthBeforeResize = (this.wrapper.clientWidth + 4) + 'px';
            this.heightBeforeResize = (this.wrapper.clientHeight + 4) + 'px';

            this.wrapper.style.width = '305px';
            this.wrapper.style.height = '50px';

            target.innerHTML = expandIcon.getHTML();
            target.classList.remove('collapse-icon');

            this.dispatchEvent(new CustomEvent('collapse', {
                detail: {
                    width: this.clientWidth,
                    height: this.clientHeight
                },
                bubbles: true,
            }));
            return;
        }

        // expand
        target.innerHTML = collapseIcon.getHTML();
        target.classList.add('collapse-icon');
        this.wrapper.style.width = this.widthBeforeResize;
        this.wrapper.style.height = this.heightBeforeResize;

        this.layersContainer.style.position = 'absolute';
        this.layersContainer.style.top = '0px';

        this.dispatchEvent(new CustomEvent('collapse', {
            detail: {
                width: this.clientWidth,
                height: this.clientHeight
            },
            bubbles: true,
        }));
    }
}

window.customElements.define('sm-layers', SmLayers);