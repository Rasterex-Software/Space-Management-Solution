import { PublishSubscribe } from './publish-subscribe';
var RxEvents = /** @class */ (function () {
    function RxEvents() {
        this.EVENTS = {
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
        };
        this.publishSubscribe = new PublishSubscribe();
        this.dispatchRxEvents();
    }
    Object.defineProperty(RxEvents, "Instance", {
        get: function () {
            return this.instance || (this.instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    RxEvents.prototype.dispatchEvent = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a;
        (_a = this.publishSubscribe).publish.apply(_a, [name].concat(args));
    };
    RxEvents.prototype.subscribe = function (topic, subscriber) {
        return this.publishSubscribe.subscribe(topic, subscriber);
    };
    RxEvents.prototype.unsubscribe = function (topic, key) {
        this.publishSubscribe.unsubscribe(topic, key);
    };
    RxEvents.prototype.unsubscribeAll = function () {
        this.publishSubscribe.unsubscribeAll();
    };
    RxEvents.prototype.dispatchRxEvents = function () {
        var _this = this;
        RxCore.GUI_Markup.connect(function (markup, operation) {
            _this.dispatchEvent(_this.EVENTS.MARKUP, markup, operation);
        });
        RxCore.GUI_MarkupUnselect.connect(function (markup) {
            _this.dispatchEvent(_this.EVENTS.MARKUP_UNSELECT, markup);
        });
        RxCore.GUI_FileLoadComplete.connect(function (fileName) {
            _this.dispatchEvent(_this.EVENTS.FILE_LOAD_COMPLETE, fileName);
        });
        RxCore.GUI_MarkupLoadComplete.connect(function (markuplist) {
            _this.dispatchEvent(_this.EVENTS.MARKUP_LOAD_COMPLETE, markuplist);
        });
        RxCore.GUI_2DBlockID.connect(function (blockarray) {
            _this.dispatchEvent(_this.EVENTS.BLOCk_2D_ID, blockarray);
        });
        RxCore.GUI_2DBlockInfo.connect(function (info) {
            _this.dispatchEvent(_this.EVENTS.BLOCk_2D_INFO, info);
        });
        RxCore.GUI_Resize.connect(function (size) {
            _this.dispatchEvent(_this.EVENTS.CANVAS_RESIZE, size);
        });
        RxCore.GUI_VectorBlocks.connect(function (blocks) {
            _this.dispatchEvent(_this.EVENTS.VECTOR_BLOCKS, blocks);
        });
        RxCore.GUI_VectorBlocksLoaded.connect(function (blocks) {
            _this.dispatchEvent(_this.EVENTS.VECTOR_BLOCKS_LOADED, blocks);
        });
        RxCore.GUI_Calibratediag.connect(function (data) {
            _this.dispatchEvent(_this.EVENTS.CALIBRATE_DIAG, data);
        });
        RxCore.GUI_CalibrateComplete.connect(function (data) {
            _this.dispatchEvent(_this.EVENTS.CALIBRATE_COMPLETE, data);
        });
        RxCore.GUI_Markuplist.connect(function (markuplist) {
            _this.dispatchEvent(_this.EVENTS.MARKUP_LIST, markuplist);
        });
        RxCore.GUI_Page.connect(function (page) {
            _this.dispatchEvent(_this.EVENTS.PAGE, page);
        });
        RxCore.GUI_ZoomUpdated.connect(function (data) {
            _this.dispatchEvent(_this.EVENTS.ZOOM_UPDATED, data);
        });
        RxCore.GUI_Download.connect(function (info) {
            _this.dispatchEvent(_this.EVENTS.DOWNLOAD, info);
        });
        RxCore.GUI_Upload.connect(function (info) {
            _this.dispatchEvent(_this.EVENTS.UPLOAD, info);
        });
        RxCore.GUI_VectorLayers.connect(function (layers) {
            _this.dispatchEvent(_this.EVENTS.VECTOR_LAYERS, layers);
        });
        RxCore.GUI_State.connect(function (state) {
            _this.dispatchEvent(_this.EVENTS.STATE, state);
        });
        RxCore.GUI_MarkupAreaEdit.connect(function (area) {
            _this.dispatchEvent(_this.EVENTS.MARKUP_AREA_EDIT, area);
        });
    };
    return RxEvents;
}());
export default RxEvents.Instance;
