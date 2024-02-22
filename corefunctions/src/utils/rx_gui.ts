// TODO:JS->TS:CHECK review the methods/objects exported and decide if they should be organised some other way, in other files
import {
    Globals,
    GetTempID,
    GetDisplayName,
    getSignState,
    getMarkupLayerColor,
    getMarkupLayerState,
    drawmarkupAll,
    DrawMarkupSelected,
    RxCore_helper,
    regEvents
} from '../internal';

    /* GUI Connector object variables*/
/* JS->TS:INFO commented out
    var RxCore_GUI_Users = undefined;
    var RxCore_GUI_MarkupLayers = undefined;
    var Rxcore_GUI_exportComplete = undefined;
    var RxCore_GUI_FileInfo = undefined;
    var Rxcore_GUI_fileLoadComplete = undefined;
    var Rxcore_GUI_pagedimLoadComplete = undefined;
    var Rxcore_GUI_markupLoadComplete = undefined;
    var Rxcore_GUI_pageLoadComplete = undefined;
    var Rxcore_GUI_PDFRenderComplete = undefined;
    var RxCore_GUI_pagethumbs = undefined;
    var RxCore_GUI_VectorLayers = undefined;
    var RxCore_GUI_VectorBlocks = undefined;
    var RxCore_GUI_3DParts = undefined;
    var RxCore_GUI_Read3DComplete = undefined;
    var Rxcore_GUI_3DPartInfo = undefined;
    var RxCore_GUI_2DBlockID = undefined;
    var RxCore_GUI_2DBlockInfo = undefined;
    var RxCore_GUI_Markuplist = undefined;
    var RxCore_GUI_Stamps = undefined;
    var RxCore_GUI_CustomStamps = undefined;
    var RxCore_GUI_Symbols = undefined;
    var RxCore_GUI_Measurediag = undefined;
    var RxCore_GUI_Calibratediag = undefined;
    var RxCore_GUI_CalibrateComplete = undefined;
    var RxCore_GUI_Textdiag = undefined;
    var RxCore_GUI_TextInput = undefined;
    var RxCore_GUI_Notediag = undefined;
    var RxCore_GUI_State = undefined;
    var RxCore_GUI_Page = undefined;
    var RxCore_GUI_Markup = undefined;
    var RxCore_GUI_MarkupLink = undefined;
    var RxCore_GUI_MarkupUnselect = undefined;
    var RxCore_GUI_Upload = undefined;
    var RxCore_GUI_Download = undefined;
    // var RxCore_GUI_Birdseye = undefined; // JS->TS:INFO not used
    // var RxCore_GUI_Magnify = undefined; // JS->TS:INFO not used
    var RxCore_GUI_Resize = undefined;
    var RxCore_GUI_3DWalkthrough = undefined;
    var RxCore_GUI_CompareDiag = undefined;
    var RxCore_GUI_CompareAlign = undefined;
    var RxCore_GUI_Consolidate = undefined;
    var RxCore_GUI_Permissions = undefined;
    var RxCore_GUI_PDFBookmarks = undefined;
    var RxCore_GUI_PagePosition = undefined;
    var RxCore_GUI_PanUpdate = undefined;
    var RxCore_GUI_PanUpdated = undefined;
    var RxCore_GUI_ZoomUpdate = undefined;
    var RxCore_GUI_ZoomUpdated = undefined;
    var RxCore_GUI_MarkupSave = undefined;
    var RxCore_GUI_Ready = undefined;
    var RxCore_GUI_RotatePage = undefined;
    var RxCore_GUI_HasText = undefined;
    var RxCore_GUI_NumMathces = undefined;
    var RxCore_GUI_printpage = undefined;
    var RxCore_GUI_printCompare = undefined;
    var RxCore_GUI_CompareMeasure = undefined;
    var RxCore_GUI_markupdrawParams = undefined;
    var RxCore_GUI_markupParamsError = undefined;
// JS->TS:INFO commented out
*/

// TODO:JS->TS:CHECK refactor; remove redundant code. Maube split into multiple files.

// JS->TS:INFO added base GUI class
class Rx_GUI_Base {
    callback: any;

    constructor(callback?:any){  // TODO:JS->TS:CHECK recheck usage and maybe consider either removing the param or convert it from optional to required
        this.callback = callback;
    }

    public connect(callback:any) {
        this.callback = callback;
    }

    protected executeCallback(...args:any[]) {
        if (typeof this.callback === "function") {
            this.callback(...args);
        }
    }
}

class Rx_CustStampGUI extends Rx_GUI_Base {
    public onStampReceived(stampinfo:any) {
        this.executeCallback(stampinfo);
    }
}

class Rx_SymbolGUI extends Rx_GUI_Base{
    public onSymbolReceived(symbolinfo:any) {
        this.executeCallback(symbolinfo);
    }
}

class Rx_CanvasResize extends Rx_GUI_Base {
    public onResize(canvassize:any) {
        this.executeCallback(canvassize);
    }
}

class Rx_TextInputConn extends Rx_GUI_Base {
    public operation:any;

    constructor (callback?:any) {
        super(callback);

        this.operation = {
            start : false,
            create : false,
            edit : false,
            save : false
        }
    }
    public getText(text:any) {
        if (Globals.DocObj.markuplist[GetTempID().id] != undefined) {
             return Globals.DocObj.markuplist[GetTempID().id];
        }else{
            return null;
        }
    }
    public setText(text:any) {
        if (Globals.DocObj.markuplist[GetTempID().id] != undefined) {
            this.operation.edit = false;
            this.operation.start = false;
            this.operation.create = false;
            this.operation.save = false;
            Globals.DocObj.markuplist[GetTempID().id].text = text;
            //DocObj.markuplist[GetTempID().id].AdjustForRotation();
            //drawmarkupAll(cntximg);
            //DrawMarkupSelected(context);
        }
    }

    public setTextInput(textrect:any) {
        this.executeCallback(textrect, this.operation);
    }
}


class Rx_TextdiagConn extends Rx_GUI_Base {
    public setText(text:any) {
        if (Globals.DocObj.markuplist[GetTempID().id] != undefined) {
            Globals.DocObj.markuplist[GetTempID().id].text = text;
            Globals.DocObj.markuplist[GetTempID().id].AdjustForRotation(false);
            drawmarkupAll(Globals.cntximg);
            DrawMarkupSelected(Globals.context);
        }
    }
    public setTextdiag(textdata:any) {
        if (typeof this.callback === "function") {
            if (textdata == "" || ".") {
                Globals.DocObj.markuplist[GetTempID().id].text = this.callback("");

                Globals.DocObj.markuplist[GetTempID().id].AdjustForRotation(false);
                drawmarkupAll(Globals.cntximg);
                DrawMarkupSelected(Globals.context);
            } else {
                this.callback(textdata);
            }
        }
    }
}

class Rx_NotediagConn extends Rx_GUI_Base{
    public isAvailable() {
        if (GetTempID() == undefined || GetTempID().id == -1){
            return false;
        }
        return (Globals.DocObj.markuplist[GetTempID().id].type == 10);

    }

    public getText() {
        // if (this.isAvailable) { // JS->TS:INFO added () to make it a function call, otherwise it will always evaluate to true
        if (this.isAvailable()){
            return Globals.DocObj.markuplist[GetTempID().id];
        }else{
            return null;
        }
    }

    public setText(text:any) {
        // if (this.isAvailable) { // JS->TS:INFO added () to make it a function call, otherwise it will always evaluate to true
        if (this.isAvailable()) {
            Globals.DocObj.markuplist[GetTempID().id].text = text;
            drawmarkupAll(Globals.cntximg);
            DrawMarkupSelected(Globals.context);
        }
    }

    public setNotediag(notedata:any, readonly:any) {
        if (typeof this.callback === "function") {
            if (notedata == "" || notedata == ".") {
                if (GetTempID() == undefined){
                    return;
                }
                Globals.DocObj.markuplist[GetTempID().id].text = this.callback("");
            } else {
                this.callback(notedata, readonly);
            }
        }
    }
}

/*Rx_GUITextdialog = function(callback){

 var scope = this;
 this.callback = callback;



 this.getText = function(text){
 if (typeof scope.callback === "function") {
 callback(text);
 }

 };

 };*/

class Rx_ZoomUpdate extends Rx_GUI_Base {
    public zoomUpdate(factor:any, center:any, type:any = undefined) { // JS->TS:INFO added default value for the third param since zoomUpdate calls do not always specify the 'type'
        this.executeCallback(factor, center, type);
    }
}

class Rx_PanUpdate extends Rx_GUI_Base {
    public panUpdate(x:any, y:any, pagerect:any) {
        this.executeCallback(x,y, pagerect);
    }
}

class Rx_MarkupSave extends Rx_GUI_Base {
    public markupSaved() {
        this.executeCallback();
    }
}

class Rx_Ready extends Rx_GUI_Base {
    public setupComplete(openInitDoc: any) {
        this.executeCallback(openInitDoc);
    }
}

class Rx_RotateEvent extends Rx_GUI_Base {
    public onRotate(angle: any) {
        this.executeCallback(angle);
    }
}

class Rx_GUIUpload extends Rx_GUI_Base {
    public progress:number=0;

    public setUpload(upload:any) {
        this.executeCallback(upload);
    }
}

// TODO:JS->TS:CHECK hastext property
class Rx_GUIhasText extends Rx_GUI_Base {
    //Set to true if a page in document has text. Do not set back to false
    public hastext:boolean = false;

    public hasText(hastext:boolean) {
        if(hastext && Globals.DocObj){
            Globals.DocObj.hastext = true;
        }
        this.executeCallback(hastext);
    }
}
// TODO:JS->TS:CHECK hastext property
class Rx_GUITextFound extends Rx_GUI_Base {
    //Set to true if a page in document has text. Do not set back to false
    public hastext = false;

    public numTextFound(nummatches:any) {
        this.executeCallback(nummatches);
    }
}

class Rx_GUIDownload extends Rx_GUI_Base {
    public setDownload(download: any) {
        this.executeCallback(download);
    }
}

class Rx_GUIMarkupUnselectConn extends Rx_GUI_Base {
    public setMarkupunSelected(markup: any) {
        this.executeCallback(markup);
    }
}

class Rx_GUIMarkupLinkConn extends Rx_GUI_Base {
    public showContext:boolean = false; // TODO:JS->TS:CHECK is this used?

    public markupLink(markup: any){
        this.executeCallback(markup);
    }
}

class Rx_GUIMarkupConn extends Rx_GUI_Base {
    public showContext:boolean = false; // TODO:JS->TS:CHECK is this used?

    public setMarkupSelected(markup: any, operation: any) {
        this.executeCallback(markup, operation);
    }
}

class Rx_GUIPDFBookmarsConn extends Rx_GUI_Base {
    public _pagesRefCache = Object.create(null);

    /*this.createPageRefCache = function(outline){

     for(var i= 0;i<outline.length;i++){
     if(outline[i].count > 0){
     var destRef = outline[i].dest[0];

     if(DocObj.pages[DocObj.currentpage].usepdfjs){
     DocObj.getPDF_PageRef(scope._pagesRefCache,destRef);
     }
     //RxCore_GUI_PDFBookmarks.getPageRef(scope._pagesRefCache,destRef);

     /*for (var j=0;j<outline[i].count;j++){
     //ulstring += '<li>' + outline[i].items[j].title + '</li>\n';
     }
     }

     }

     };*/
    public getPageRef(destRef: any) {
        let pagenum = -1;
        if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
            const cacheKey = destRef.num + ' ' + destRef.gen + ' R';
            if (this._pagesRefCache[cacheKey] != undefined) {
                pagenum = this._pagesRefCache[cacheKey];
            }
        }
        return pagenum;
    }

    public setPageRef(object:any) {
        this._pagesRefCache = object;
    }

    public setPDFBookmarks(outline:any) {
        this.executeCallback(outline);
    }
}

class RxPrintCompareConn extends Rx_GUI_Base {
    public printCompareComplete(printobj:any){
        this.executeCallback(printobj);
    }
}

class Rx_PrintPageConn extends Rx_GUI_Base {
    public printpageComplete(printobj:any){
        this.executeCallback(printobj);
    }
}

class Rx_GUIPageConn extends Rx_GUI_Base {
    public pageEvent(pageobject:any){
        this.executeCallback(pageobject);
    }
}

class Rx_GUIStateConn extends Rx_GUI_Base {
    public state:any;
    public setGUIState(stateojb:any) {
        this.state = stateojb; // TODO:JS->TS:CHECK is state still used?
        this.executeCallback(stateojb);
    }
}

class Rx_UserlistConn extends Rx_GUI_Base {

    public getSignature() {
        return Globals.signature;
    }

    public setSignature(sign:any) {
        Globals.signature = sign;
    }

    public getCanChangeSign() {
        return Globals.bCanChangeSignature;
    }

    public SetUserMarkupdisplay(numuser:any, state:any) {
        let curmarkup = 0;

        Globals.Userlist[numuser].display = state;

        for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {

            const layerdisplay = getMarkupLayerState(Globals.DocObj.markuplist[curmarkup].layer);

            if (Globals.DocObj.markuplist[curmarkup].signature == Globals.Userlist[numuser].Signature && layerdisplay) {
                Globals.DocObj.markuplist[curmarkup].display = Globals.Userlist[numuser].display;
            }

        }
        drawmarkupAll(Globals.cntximg);
        DrawMarkupSelected(Globals.context);
    }

    public setUserlist(userlist:any) {
        this.executeCallback(userlist);
    }
}

class Rx_MarkupLayerConn extends Rx_GUI_Base {
    public getCurMarkupLayer() {
        return Globals.markuplayer;
    }

    public getCanChangelayer() {
        return Globals.bCanChangeLayer;
    }

    public SetLayerMarkupdisplay(numlayer:any, state:any) {
        let curmarkup = 0;
        Globals.Layerlist[numlayer].display = state;

        for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
            const signdisplay = getSignState(Globals.DocObj.markuplist[curmarkup].signature);

            if (Globals.DocObj.markuplist[curmarkup].layer == Globals.Layerlist[numlayer].Layer && signdisplay) {
                Globals.DocObj.markuplist[curmarkup].display = Globals.Layerlist[numlayer].display;
            }
        }
        drawmarkupAll(Globals.cntximg);
        DrawMarkupSelected(Globals.context);
    }

    public setMarkupLayers(markuplayers:any) {
        this.executeCallback(markuplayers);
    }
}

class Rx_FileInfoConn extends Rx_GUI_Base {
    public fileinfo:any;
    public getUnitlabel() {
        return Globals.Unitlabel;
    }

    public setFileInfo(fileinfo:any) {
        this.fileinfo = fileinfo; // TDOD:JS->TS:CHECK is this used?
        this.executeCallback(fileinfo);
    }
}

class Rx_PageThumbnailsConn extends Rx_GUI_Base {
    public thumbnails:any;
    public getHeight() {
        return Globals.canvasoheight;
    };

    public getCurrentPage() {
        return Globals.DocObj.getcurPage();
    };

    public hasmarkup(page:any) {
        let hasmarkup = false;
        for (let i = 0; i < Globals.DocObj.markuplist.length; i++) {
            if (Globals.DocObj.markuplist[i].pagenumber == page) {
                hasmarkup = true;
            }
        }
        return hasmarkup;
    };

    public notify() {
        this.executeCallback(this.thumbnails);
    }

    public setThumbnails(thumbnails:any) {
        this.thumbnails = thumbnails;
        this.notify();
    }
}

class Rx_VectorLayersConn extends Rx_GUI_Base {
    public getHeight() {
        return Globals.canvasoheight;
    }

    public setVectorLayers(vectorlayers:any) {
        this.executeCallback(vectorlayers);
    }
}

class Rx_VectorBlocksConn extends Rx_GUI_Base {
    public getHeight() {
        return Globals.canvasoheight;
    }

    public setVectorBlocks(vectorblocks:any) {
        this.executeCallback(vectorblocks);
    }
}

class Rx_3DPartsReadComplete extends Rx_GUI_Base {
    public readComplete() {
        this.executeCallback();
    }
}


class Rx_3DPartsConn extends Rx_GUI_Base {

    public listheight = 0;
    public isupdate:boolean = false;
    public scrollto = 0;
    public parts:any;

    public getHeight() {
        return Globals.canvasoheight;
    }

    public setlistHeight(height:any) {
        this.listheight = height;
    }

    public set3DParts(Parts:any) {
        this.parts = Parts; // TODO:JS->TS:CHECK if this is still used/needed
        this.executeCallback(Parts);
    }
}

class Rx_2DBlockConn extends Rx_GUI_Base{
    public set2DBlockID(blockid:any) {
        this.executeCallback(blockid);
    }
}


class Rx_2DBlockAttributeConn extends Rx_GUI_Base {
    public info:any;
    public set2DBlockInfo(PartInfo:any) {
        this.info = PartInfo; // TODO:JS->TS:CHECK if this is still used/needed
        this.executeCallback(PartInfo);
    }
}

class Rx_3DPartInfoConn extends Rx_GUI_Base {
    public info:any;
    public set3DPartInfo(PartInfo:any) {
        this.info = PartInfo; // TODO:JS->TS:CHECK if this is still used/needed
        this.executeCallback(PartInfo);
    }
}

class Rx_PDFRenderComplete extends Rx_GUI_Base {
    public RenderComplete(pagedata:any) {
        this.executeCallback(pagedata);
    }
}

class Rx_PageLoadComplete extends Rx_GUI_Base{
    public loadComplete(pagenumber:any) {
        this.executeCallback(pagenumber);
    }
}

class Rx_MarkupLoadComplete extends Rx_GUI_Base {
    public loadComplete(markups:any, fileindex:any) {
        this.executeCallback(markups, fileindex);
    }
}

class Rx_FileLoadComplete extends Rx_GUI_Base {
    public loadComplete(fileurl:any) {
        this.executeCallback(fileurl);
    }
}

class Rx_MarkupDrawErrorEvt extends Rx_GUI_Base {
    public onDrawError(error:any){
        this.executeCallback(error);
    }
}

class Rx_MarkupDrawEvent extends Rx_GUI_Base {
    public onDrawEvent(distAngle:any){
        this.executeCallback(distAngle);
    }
}

class Rx_MarkupListConn extends Rx_GUI_Base {
    public pageonly:boolean = false;
    public markupList:any;

    public getDisplayName(sign:any) {
        return GetDisplayName(sign);
    };

    // TODO:JS->TS:CHECK the getDisplayDate method does not appear to be used,
    // public getDisplayDate(date:any) {
    //     return GetDateTime(date);  // TODO:JS->TS:CHECK The GetDateTime function seems to be tied to the markupObject and cannot be called directly
    // };

    /* Andriy notify listeners */
    public notify() {
        this.executeCallback(this.markupList);
    }

    public setMarkupList(markupList:any, preventNotification:any = false) { // JS->TS:INFO adds false default
        /* Andriy */
        this.markupList = markupList;

        if (!preventNotification) {
            this.notify();
        }
    }
}

class Rx_MarkupStampsConn extends Rx_GUI_Base {
    public setMarkupStamps(stamps:any) {
        this.executeCallback(stamps);
    }
}

class Rx_MeasureConn extends Rx_GUI_Base {
    public getLength(length:any) {
        // Andriy: moved to a separate function
        return RxCore_helper.getLength(length);
    }

    public getUnitlabel() {
        return Globals.Unitlabel;
    }

    public getAreaUnitlabel() {
        return Globals.AreaUnitlabel;
    }


    public setMeasureresult(measureresult:any) {
        this.executeCallback(measureresult);
    }
}

class Rx_CalibrateComplete extends Rx_GUI_Base {
    public onCalibrate(calibratedata:any) {
        this.executeCallback(calibratedata);
    }
}

class Rx_CalibrateConn extends Rx_GUI_Base {
    public getUnitlabel() {
        return Globals.Unitlabel;
    }

    public setCalibration(val:any) {
        let pagenumber = -1;
        if(Globals.documentopen){
            Globals.nCalibrateScale = Globals.DocObj.pages[Globals.DocObj.currentpage].setCalibration(val);
            pagenumber = Globals.DocObj.pages[Globals.DocObj.currentpage].pagenumber;
        }else{
            if (val) {
                if (Globals.nCalibrateSet != 0) {
                    Globals.nCalibrateScale = Globals.nCalibrateMeasured / Globals.nCalibrateSet;
                    Globals.nCalibrateScale = 1 / Globals.nCalibrateScale;
                    //setCalibratebtn();
                    Globals.MeasureScale = Globals.nCalibrateScale;
                }
            } else {
                Globals.nCalibrateScale = 1;
            }
        }
        const calibratedata = {
            calibratescale : Globals.nCalibrateScale,
            pagenumber : pagenumber
        };

        if(RxCore_GUI_CalibrateComplete != undefined){
            RxCore_GUI_CalibrateComplete.onCalibrate(calibratedata);
        }
    }

    public SetTempCal(value:any) {
        Globals.nCalibrateSet = value;
    }

    public setCalibrate(calibratedata:any) {
        this.executeCallback(calibratedata);
    }
}

class Rx_StateGUIConn extends Rx_GUI_Base {
    public setStateGUI(RxCorestate:any) {
        this.executeCallback(RxCorestate);
    }
}

class Rx_Walkthrough3DConn extends Rx_GUI_Base {
    public elementSet:boolean = false;
    public _wheelImg:any = undefined as any;

    public setDivElement(HTMLElement:any) {
        regEvents(HTMLElement);
        this.elementSet = true;
    }

    public setWalkthroughGUI(setvisible:any) {
        this.executeCallback(setvisible);
    }
}

class Rx_CompareMeasureConn extends Rx_GUI_Base {
    public AlignMeasure(distance:any, angle:any, offset:any, pagewidth:any) {
        this.executeCallback(distance,angle, offset, pagewidth);
    }
}

class Rx_CompareAlignConn extends Rx_GUI_Base {
    public AlignComplete(pageobject:any) {
        this.executeCallback(pageobject);
    }
}

class Rx_ConsolidateConn extends Rx_GUI_Base {
    public Consolidatevt() {
        this.executeCallback(Globals.consolidateObj);
    }
}

class Rx_PermissionsConn extends Rx_GUI_Base{
    public UserPermissions(permissions:any) {
        this.executeCallback(permissions);
    }
}

class Rx_CompareDialogConn extends Rx_GUI_Base {
    public CompareDialog() {
        this.executeCallback(Globals.OpenfileNames);
    }
}

export var RxCore_GUI_2DBlockID = new Rx_2DBlockConn();
export var RxCore_GUI_2DBlockInfo = new Rx_2DBlockAttributeConn();
export var Rxcore_GUI_3DPartInfo = new Rx_3DPartInfoConn();
export var RxCore_GUI_3DParts = new Rx_3DPartsConn();
export var RxCore_GUI_Read3DComplete = new Rx_3DPartsReadComplete();
export var RxCore_GUI_3DWalkthrough = new Rx_Walkthrough3DConn();
export var RxCore_GUI_Calibratediag = new Rx_CalibrateConn();
export var RxCore_GUI_CalibrateComplete = new Rx_CalibrateComplete();
export var RxCore_GUI_CompareDiag = new Rx_CompareDialogConn();
export var RxCore_GUI_CompareAlign = new Rx_CompareAlignConn();
export var RxCore_GUI_CompareMeasure = new Rx_CompareMeasureConn();
export var RxCore_GUI_Consolidate = new Rx_ConsolidateConn();
export var RxCore_GUI_Permissions = new Rx_PermissionsConn();
export var RxCore_GUI_PDFBookmarks = new Rx_GUIPDFBookmarsConn();
export var RxCore_GUI_Download = new Rx_GUIDownload();
export var Rxcore_GUI_exportComplete = new Rx_FileLoadComplete();
export var RxCore_GUI_FileInfo = new Rx_FileInfoConn();
export var Rxcore_GUI_fileLoadComplete = new Rx_FileLoadComplete();
export var Rxcore_GUI_pagedimLoadComplete = new Rx_FileLoadComplete();
export var Rxcore_GUI_markupLoadComplete = new Rx_MarkupLoadComplete();
export var RxCore_GUI_Markup = new Rx_GUIMarkupConn();
export var RxCore_GUI_MarkupLayers = new Rx_MarkupLayerConn();
export var RxCore_GUI_Markuplist = new Rx_MarkupListConn();
export var RxCore_GUI_MarkupLink = new Rx_GUIMarkupLinkConn();
export var RxCore_GUI_MarkupUnselect = new Rx_GUIMarkupUnselectConn();
export var RxCore_GUI_Measurediag = new Rx_MeasureConn();
export var RxCore_GUI_Notediag = new Rx_NotediagConn();
export var Rxcore_GUI_pageLoadComplete = new Rx_PageLoadComplete();
export var Rxcore_GUI_PDFRenderComplete = new Rx_PDFRenderComplete();
export var RxCore_GUI_pagethumbs = new Rx_PageThumbnailsConn();
export var RxCore_GUI_Resize = new Rx_CanvasResize();
export var RxCore_GUI_Stamps = new Rx_MarkupStampsConn();
export var RxCore_GUI_CustomStamps = new Rx_CustStampGUI();
export var RxCore_GUI_Symbols = new Rx_SymbolGUI();
export var RxCore_GUI_State = new Rx_GUIStateConn();
export var RxCore_GUI_Page = new Rx_GUIPageConn();
export var RxCore_GUI_PagePosition = new Rx_PanUpdate();
export var RxCore_GUI_PanUpdate = new Rx_PanUpdate();
export var RxCore_GUI_PanUpdated = new Rx_PanUpdate();
export var RxCore_GUI_Textdiag = new Rx_TextdiagConn();
export var RxCore_GUI_TextInput = new Rx_TextInputConn();
export var RxCore_GUI_Upload = new Rx_GUIUpload();
export var RxCore_GUI_Users = new Rx_UserlistConn();
export var RxCore_GUI_VectorBlocks = new Rx_VectorBlocksConn();
export var RxCore_GUI_VectorLayers = new Rx_VectorLayersConn();
export var RxCore_GUI_ZoomUpdate = new Rx_ZoomUpdate();
export var RxCore_GUI_ZoomUpdated = new Rx_ZoomUpdate();
export var RxCore_GUI_MarkupSave = new Rx_MarkupSave();
export var RxCore_GUI_Ready = new Rx_Ready();
export var RxCore_GUI_RotatePage = new Rx_RotateEvent();
export var RxCore_GUI_HasText = new Rx_GUIhasText();
export var RxCore_GUI_NumMathces = new Rx_GUITextFound();
export var RxCore_GUI_printpage = new Rx_PrintPageConn();
export var RxCore_GUI_printCompare = new RxPrintCompareConn();
export var RxCore_GUI_markupdrawParams = new Rx_MarkupDrawEvent();
export var RxCore_GUI_markupParamsError = new Rx_MarkupDrawErrorEvt();