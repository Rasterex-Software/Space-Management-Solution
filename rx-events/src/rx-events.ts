declare var RxCore: any;

import { IPublishSubscribe, PublishSubscribe } from './publish-subscribe';

class RxEvents {
    private static instance: RxEvents;

    private readonly EVENTS = {
        MARKUP: 'markup',
        MARKUP_UNSELECT: 'markup-unselect',
        FILE_LOAD_COMPLETE: 'file-load-complete',
        MARKUP_LOAD_COMPLETE: 'markup-load-complete',
        MARKUP_LIST: 'markup-list',
        BLOCk_2D_ID: '2d-block-id',
        BLOCk_2D_INFO: '2d-block-info',
        CANVAS_RESIZE: 'canvas-resize',
        VECTOR_BLOCKS: 'vector-blocks',
        VECTOR_BLOCKS_LOADED: 'vector-blocks-loaded',
        VECTOR_LAYERS: 'vector-layers',
        CALIBRATE_DIAG: 'calibrate-diag',
        CALIBRATE_COMPLETE: 'calibrate-complete',
        PAGE: 'page',
        ZOOM_UPDATED: 'zoom-updated',
        DOWNLOAD: 'download',
        UPLOAD: 'upload',
        STATE: 'state',
        MARKUP_AREA_EDIT: 'markup-area-edit',
    }

    private publishSubscribe: IPublishSubscribe;

    private constructor() {
        this.publishSubscribe = new PublishSubscribe();
        this.dispatchRxEvents();
    }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public dispatchEvent(name: string, ...args: any) {
        this.publishSubscribe.publish(name, ...args);
    }

    public subscribe(topic: string, subscriber: (...args: any) => void): number {
        return this.publishSubscribe.subscribe(topic, subscriber);
    }

    public unsubscribe(topic: string, key: number) {
        this.publishSubscribe.unsubscribe(topic, key);
    }

    public unsubscribeAll() {
        this.publishSubscribe.unsubscribeAll();
    }

    private dispatchRxEvents() {
        RxCore.GUI_Markup.connect((markup: any, operation: any) => {
            this.dispatchEvent(this.EVENTS.MARKUP, markup, operation);
        });
        RxCore.GUI_MarkupUnselect.connect((markup: any) => {
            this.dispatchEvent(this.EVENTS.MARKUP_UNSELECT, markup);
        });
        RxCore.GUI_FileLoadComplete.connect((fileName: string) => {
            this.dispatchEvent(this.EVENTS.FILE_LOAD_COMPLETE, fileName);
        });
        RxCore.GUI_MarkupLoadComplete.connect((markuplist: any) => {
            this.dispatchEvent(this.EVENTS.MARKUP_LOAD_COMPLETE, markuplist);
        });
        RxCore.GUI_2DBlockID.connect((blockarray: Number[]) => {
            this.dispatchEvent(this.EVENTS.BLOCk_2D_ID, blockarray);
        });
        RxCore.GUI_2DBlockInfo.connect((info: any) => {
            this.dispatchEvent(this.EVENTS.BLOCk_2D_INFO, info);
        });
        RxCore.GUI_Resize.connect((size:object) => {
            this.dispatchEvent(this.EVENTS.CANVAS_RESIZE, size);
        });
        RxCore.GUI_VectorBlocks.connect((blocks: any) => {
            this.dispatchEvent(this.EVENTS.VECTOR_BLOCKS, blocks);
        });
        RxCore.GUI_VectorBlocksLoaded.connect((blocks: any) => {
            this.dispatchEvent(this.EVENTS.VECTOR_BLOCKS_LOADED, blocks);
        });
        RxCore.GUI_Calibratediag.connect((data: any) => {
            this.dispatchEvent(this.EVENTS.CALIBRATE_DIAG, data);
        });
        RxCore.GUI_CalibrateComplete.connect((data: any) => {
            this.dispatchEvent(this.EVENTS.CALIBRATE_COMPLETE, data);
        });
        RxCore.GUI_Markuplist.connect((markuplist: any) =>{ 
            this.dispatchEvent(this.EVENTS.MARKUP_LIST, markuplist)
        });
        RxCore.GUI_Page.connect((page: any) => {
            this.dispatchEvent(this.EVENTS.PAGE, page);
        });
        RxCore.GUI_ZoomUpdated.connect((data: any) => {
            this.dispatchEvent(this.EVENTS.ZOOM_UPDATED, data);
        });
        RxCore.GUI_Download.connect((info: any) => {
            this.dispatchEvent(this.EVENTS.DOWNLOAD, info);
        });
        RxCore.GUI_Upload.connect((info: any) => {
            this.dispatchEvent(this.EVENTS.UPLOAD, info);
        });
        RxCore.GUI_VectorLayers.connect((layers: any) => {
            this.dispatchEvent(this.EVENTS.VECTOR_LAYERS, layers);
        });
        RxCore.GUI_State.connect((state: any) => {
            this.dispatchEvent(this.EVENTS.STATE, state);
        });
        RxCore.GUI_MarkupAreaEdit.connect((area: any) => {
            this.dispatchEvent(this.EVENTS.MARKUP_AREA_EDIT, area);
        });
    }
}

export default RxEvents.Instance;