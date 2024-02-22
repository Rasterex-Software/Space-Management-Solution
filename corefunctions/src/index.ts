
declare var RxConfig:any;
declare var THREE:any;

import { // utils
    Globals,
} from './internal';

import { // models
    FontObject,
} from './internal';


    // var globalscope = this; // JS->TS:INFO commented out
    /* Andriy: aliases from old names */
    /* I simply do not want to change this in the code, just make aliases */
    Globals.xmlurl = RxConfig.xmlurl;
    Globals.xmlurldirect = RxConfig.xmlurldirect;
    Globals.xmlurlmarkup = RxConfig.xmlurlmarkup;
    // TODO:JS->TS:INFO opensessionurl and openMsessionurl do not appear to be used
    // Globals.opensessionurl = RxConfig.opensessionurl; // JS->TS:INFO not used
    // Globals.openMsessionurl = RxConfig.openMsessionurl; // JS->TS:INFO not used
    Globals.openUsessionurl = RxConfig.openUsessionurl;
    Globals.closesessionurl = RxConfig.closesessionurl;
    Globals.xmlurlmarkupsave = RxConfig.xmlurlmarkupsave;
    Globals.FileuploadURL = RxConfig.FileuploadURL;
    Globals.PDFExportURL = RxConfig.PDFExportURL;
    Globals.CanvasSaveUrl = RxConfig.CanvasSaveUrl;
    Globals.UploadServerfolder = RxConfig.UploadServerfolder;
    Globals.UploadServerfolderd = RxConfig.UploadServerfolderd;
    Globals.xmlurlrel = RxConfig.xmlurlrel;
    Globals.xmlurlrelmarkup = RxConfig.xmlurlrelmarkup;
    // Globals.uploadfolderURL = RxConfig.uploadfolderURL; // JS->TS:INFO not used
    Globals.htmlviewerurl = RxConfig.htmlviewerurl;
    Globals.splashscreen = RxConfig.splashscreen;
    Globals.noteImgSrc = RxConfig.noteImgSrc;
    Globals.bGetconfig = RxConfig.bGetconfig;
    Globals.bUseID = RxConfig.bUseID;
    Globals.configurationLocation = RxConfig.configurationLocation;

    /* Andriy: aliases from old names: end */

    Globals.userInfoURL = '';
    Globals.bUseCustomrelpath = false;
    Globals.bUsecustomConfig = false;
    Globals.xmlurlrelcustom = "";

    /* Andriy: added init state */

    Globals.initialized = false;

    /* Andriy: end */

    Globals.rxcoreversion = 21.8;
    Globals.rxcontainer, Globals.canvas, Globals.context, Globals.canvaso, Globals.contexto, Globals.canvimg, Globals.cntximg, Globals.canvas3D, Globals.magcanvas,Globals.magctx;
    // Globals.scene, Globals.camera; // JS->TS:INFO not used
    Globals.renderer;
    /* JS->TS:INFO commented out the next 3 lines in JS->TS update
    Globals.globalPlaneX = new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 0 );
    Globals.globalPlaneY = new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), 0 );
    Globals.globalPlaneZ = new THREE.Plane( new THREE.Vector3( 0, 0, -1 ), 0 );
    // Globals.globalPlanes = [ Globals.globalPlaneX,Globals.globalPlaneY,Globals.globalPlaneZ ]; // JS->TS:INFO not used
    */
    Globals.Empty = Object.freeze( [] );

    // JS->TS:INFO the following 3 vars are not used
    // var geometry, material, mesh;

    /* default offset for canvas */

    Globals.defaultLayout = {
        offsetWidth:0,
        offsetHeight:0
    };

    Globals.magnifysize = {
        width : 225,
        height : 150
    };

    Globals.fixedScaleSize = {
        width : 1920,
        height : 1080
    };

    // JS->TS:INFO RxCore_GUI ... was here

    Globals.canvasowidth = 0;
    Globals.canvasoheight = 0;

    Globals.dragdropfilename = "";

    Globals.bIsMSIE = false;
    Globals.szdispvalue = "initial";
    Globals.szLicenCompanyFeature = "";


    Globals.imagewidth = 0;
    Globals.imageheight = 0;
    Globals.drotation = 0;
    Globals.imageswitchfactor = 1.5;
    Globals.imageloaded = false;
    Globals.documentopen = false;
    Globals.documentcompare = false;
    Globals.doCompare = false;
    Globals.compareMode = 0;
    // JS->TS:INFO commented out in the original code
    // var markuploaded = false;
    // var bMarkupchanged = false;
    Globals.bLicenseAquired = false;
    Globals.bUseCompanyFeature = false;
    Globals.bPDFExportfullPath = false;
    Globals.bMarkupSavecheck = true;
    Globals.bUseFixedScale = true;
    // JS->TS:INFO commented out in the original code
    // var bUsemouseinput = true;
    Globals.bPrintpageloaded = false;
    Globals.bAbortPageload = false;
    Globals.bLimMarkupExtent = true;
    Globals.bKeepVectorColor = false;
    Globals.bMarkupPostOnly = false;
    Globals.bSingleDocmode = false;
    Globals.bDoReScaleOnSize = true;
    Globals.bPDFZoomAllinit = false;
    Globals.bSuspendDraw = false;
    Globals.bRestrictPan = true;
    Globals.bLimitZoomOut = true;
    Globals.bAnimatePDFrender = false;
    Globals.bDisableMSIE11Eventcheck = false;
    Globals.bAutoloadThumbnails = true;
    Globals.bLabelsOff = false;
    Globals.printWin = 0;
    // var PDFExpWin = 0; // JS->TS:INFO not used
    Globals.DocXMLPrint;
    Globals.PaperWidth = 0;
    Globals.PaperHeight = 0;
    Globals.Paper;
    // var PDFExportFileURL = ""; // JS->TS:INFO not used
    Globals.PrintPageURL = "printcanvas.htm";
    Globals.LicenseID = "";
    Globals.OEMFlag = RxConfig.OemFlag||''; // JS->TS:INFO RxConfig.OemFlag added during JS to TS conversion

    Globals.backgroundColor = "#FFFFFF";

    Globals.backgroundCustomColor = "#FF0000";
    Globals.bCustomColor = false;

    Globals.bMultiselect = false;

    Globals.displayBGColor = "rgb(62,62,62)";
    Globals.nScrollKeyNum = '17';
    Globals.nMaximageArea = 64000000;
    Globals.nMaximageAreaIPad = 5000000;
    Globals.nLargePDF = 50;
    Globals.bIsmobile = false;

    Globals.overlayBGColor = '#0000ff';
    Globals.overlayFGColor = '#ff8000';

    Globals.bOpeninitialdoc = false;
    Globals.OpeninitialdocURL = "";

    Globals.initialDoc = {
        open : Globals.bOpeninitialdoc,
        url : Globals.OpeninitialdocURL,
        custom : false
    };

    Globals.bMarkupcrated = false;
    Globals.bNoteFocus = false;
    Globals.bUseScrollKey = false;
    Globals.bOrthoOn = false;
    Globals.nOrthoDegree = 90;
    Globals.nMarkupcreated = -1;
    Globals.bMultimarkupadd = false;
    Globals.bAnimateready = false;
    Globals.bPDFtemprender = false;
    // var bPDFtemprendermag = false; // JS->TS:INFO not used

    // var lastTouchdata = -1; // JS->TS:INFO not used
    // var Canvasheight = 0; // JS->TS:INFO not used
    // var Canvaswidth = 0; // JS->TS:INFO not used

    // 1 = metric, 2 = Imperial, 3 = System, 4=Custom
    Globals.Unitofmeasure = 1;
    Globals.Unitlabel = "mm";
    Globals.AreaUnitlabel = "mm\u00B2";
    Globals.MeasureScale = 1.0;
    Globals.nCalibrateScale = 1.0;
    Globals.nCalibrateMeasured = 0.0;
    Globals.nCalibrateSet = 0.0;
    Globals.nArrowSize = 20;
    Globals.nPanlimit = 15;
    Globals.nLabelTextsize = 12;
    Globals.bUsemarkupbyref = false;
    Globals.bUsemarkupbyrefEx = false;
    // mm = 1 meter = 1000 for metric units.
    Globals.unitscale = 1;
    // 1 = Millimeter, 2 = Centimeter, 3 = Decimeter, 4=Meter,5=Kilometer,6=Nautical Miles
    // 1 = Inch,2=Feet,3=Yard,4=Mile,5=Nautical Miles
    Globals.SubmeasureUnit = 1;

    // 0 = large 1=small
    Globals.imagesize = 0;
    // array to hold markup objects
    Globals.byrefmarkupfiles = [];

    //var markuplist = [];
    //var markupundolist = [];
    Globals.markupprintlist = [];
    //var markupfiles = [];
    Globals.Userlist = [];
    Globals.Stamplist = [];
    // var rotatepagearrs = []; // JS->TS:INFO not used
    Globals.numUsers = 0;
    Globals.Layerlist = [];
    // var numLayers = 0; // JS->TS:INFO not used
    Globals.configJSON = {};
    //var nummarkups = 0;
    //var curcontrol3D = 'orbitControl';

    //var SzNoteText = "";

    /* Andriy: start, reason: unused variables */
    /*
     //tool state flags
     var bZoomWindow = false;
     var bPan = false;
     var bMarkupEdit = false;
     var bCalibrate = false;
     var bMarkupHide = false;
     var bMarkuperase = false;
     var bMarkupText = false;
     var bMarkupNote = false;
     var bMarkupStamp = false;
     var bMarkupLine = false;
     var bMarkupArrow = false;
     var bMarkupShape = false;
     var bMarkupDimension = false;
     var bMarkupArea = false;
     var bMarkupMarker = false;
     var bMarkupOutline = true;
     var bMarkupEdged = false;
     var bMarkupFilled = false;
     var bMarkupHatched = false;
     var bMeasure = false;
     */
    /* Andriy: end, reason: unused variables */


    //global configuration variables
    Globals.markuplayer = 1;
    Globals.markupcolor = "#FF0000";
    Globals.markupfillcolor = "#FF0000";
    Globals.markuplinecolor = "#FF0000";
    Globals.markuptextcolor = "#FF0000";

    Globals.globaltransparency = 100;
    Globals.signature = "Default";
    Globals.DisplayName = "Default";
    Globals.fontstylevalue = "Arial";

    Globals.linewidthvalue = 4;
    // var Linestylevalue = "_______";
    Globals.HatchStyle = 0;
    Globals.fillstyle = 0;
    Globals.nlinestyle = 0;

    Globals.bCanChangeLayer = true;
    Globals.bCanChangeSignature = false;
    Globals.bCanConsolidate = false;
    Globals.bSetGlobal = false;
    Globals.readonlymode = false;

    // var bGetconfig = true;
    Globals.bRefreshmarkup = false;
    Globals.bReverseScale = false;
    // var bMarkupLocked = false;
    Globals.bMarkupNoLabel = false;
    // var bConsolidate = false; // JS->TS:INFO not used


    Globals.locationSearchSet = false;
    Globals.szLocationSearch = "";
    // this.szBlockLoadMask = "*";

    // global configuration variables

//global configuration variables

    Globals.consolidateObj = {
        isactive : false,
        consolidatelist : [],
        add : function(markup:any,settings:any,last:any){
            var listobj = {markup : markup, settings : settings};
            this.consolidatelist.push(listobj);
            if(last){
                while(this.consolidatelist.length > 0){
                    var consitem = this.consolidatelist.pop();
                    consitem.markup.Consolidate(consitem.settings);

                }
            }

        }
    };

    //note image
    Globals.noteimage = new Image();
    /* ANDRIY: start */
    //noteimage.src = 'images/note.png';
    if (Globals.noteImgSrc){
        Globals.noteimage.src = Globals.noteImgSrc;
    }

    // noteimage.src = '';
    /* ANDRIY: end */
    // var TempID; //placeholder for notemarkup so that we can assign text from note dialog. // JS->TS:INFO not used

    Globals.markupimage = new Image();
    Globals.markupimage.src = '';


    //hatch patterns
    //var hatchdiagforw = new Image();
    //hatchdiagforw.src = 'images/hatchdiagonalforward.png';


    Globals.pattern = document.createElement('canvas');

    //hatch patterns

    //var display images;
    Globals.splashimage = document.createElement('img'); //new Image();
    //var myimage = document.createElement('img');//new Image();
    //var myimagesmall = document.createElement('img');//new Image();
    //var myimagethumb = document.createElement('img');//new Image();
    //var Thumbnailpopup = "<p>No images loaded";
    //var Layerspopup = "<table><tr><td>Name</td><td>Color</td>State</td></tr></table>";

    //Document index.
    Globals.nCurdocindex = 0;

    // The active tool instance.
    Globals.tool;
    // var tool_default = 'default'; // JS->TS:INFO not used
    // var szcurTool = 'default'; // JS->TS:INFO not used
    // This object holds the implementation of each drawing tool.
    Globals.tools = {};

    //var clock = new THREE.Clock();

    Globals.DocObj;
    Globals.CompareObj;
    //var SzMainImageSRC;
    //var SzSmallImageSRC;
    //var SzThumbImageSRC;

    // var DocumentObject = {}; //Document object
    // var PageObject = {}; //Document object

    // TODO:JS->TS:INFO var point = {} temporarly disabled do refactoring into class
    // var point = {}; //point object

    //var lineangle = {}; //line object
    /*Andriy: it's already declared below, var MarkupObject = {}; //General markup object
     var MarkupUndoObject = {}; //object for undo tracking */
    Globals.OpenFiles = [];

    Globals.CompareFiles = [];
    Globals.OpenfileNames = [];

    // JS->TS:INFO moved to models/FontObject.ts
    Globals.defaultFont = new FontObject(Globals.fontstylevalue, 18, false, false);





export { RxCore_AbortPDFload as abortPDFload } from './internal';
export { addMarkup as addMarkup } from './internal';
export { RxCore_AppendCustomBlockAttribute as appendCustomBlockAttribute } from './internal';
export { RxCore_applyAngleLength as applyAngleLength } from './internal';
export { RxCore_applyAngleLengthSelected as applyAngleLengthSelected } from './internal';
export { RxCore_applyArrowMarkup as applyArrowMarkup } from './internal';
export { RxCore_applyAreaMarkup as applyAreaMarkup} from './internal';
export { RxCore_applyCircleMarkup as applyCircleMarkup } from './internal';
export { RxCore_applyRadiusSelected as applyRadiusSelected } from './internal';
export { RxCore_applyPolygonMarkup as applyPolygonMarkup } from './internal';
export { RxCore_applyPolyLineMarkup as applyPolyLineMarkup } from './internal';
export { RxCore_applyMeasurePathMarkup as applyMeasurePathMarkup } from './internal';
export { RxCore_AutoLoadThumbnails as autoLoadThumbnails } from './internal';
export { Rxcore_BackgroundColor as backgroundColor } from './internal';
export { RxCore_BackgroundCustomColor as backgroundCustomColor } from './internal';
export { RxCore_BlockLoadMask as blockLoadMask } from './internal';
export { RxCore_Calibrate as calibrate } from './internal';
export { RxCore_canvToImage as canvToImage } from './internal';
export { RxCore_Change3DVectorBlock as change3DVectorBlock } from './internal';
export { RxCore_changeFillColor as changeFillColor } from './internal';
export { RxCore_changeFillColorByIndex as changeFillColorByIndex } from './internal';
export { RxCore_ChangeMarkupLayer as changeMarkupLayer } from './internal';
export { RxCore_changeSnapState as changeSnapState } from './internal';
export { RxCore_changeStrokeColor as changeStrokeColor } from './internal';
export { RxCore_changeTextColor as changeTextColor } from './internal';
export { RxCore_ChangeColor as changeColor } from './internal';
export { RxCore_ChangeTransp as changeTransp } from './internal';
export { RxCore_ChangeVectorBlock as changeVectorBlock } from './internal';
export { RxCore_ChangeVectorLayer as changeVectorLayer } from './internal';
export { RxCore_ClearMarkup as clearMarkup } from './internal';
export { RxCore_3dClipping as clipping3D } from './internal';
export { RxCore_CloseAll as closeAll } from './internal';
export { RxCore_Closedocument as closeDocument } from './internal';
export { RxCore_Compare as compare } from './internal';
export { RxCore_Comparediag as compareDialog } from './internal';
export { RxCore_CompareFiles as compareFiles } from './internal';
export { RxCore_CompareMesure as compareMeasure } from './internal';
export { RxCore_CompareNudgeOffset as compareNudgeOffset } from './internal';
export { RxCore_CompareNudgeRotate as compareNudgeRotate } from './internal';
export { RxCore_CompareNudgeScale as compareNudgeScale } from './internal';
export { RxCore_consolidate as consolidate } from './internal';
export { RxCore_ConsolidatedOnly as consolidatedOnly } from './internal';
//getConsolidateObj : RxCore_consolidateObj,
export { RxCore_compareScale as compareScale } from './internal';
export { RxCore_CopyMarkup as copyMarkUp } from './internal';
export { createCustomStamps as createCustomStamps } from './internal';
export { RxCore_CreateTextRect as createTextRect } from './internal';
export { RxCore_DeleteMarkup as deleteMarkUp } from './internal';
export { deleteMarkupbyGUID as deleteMarkupbyGUID } from './internal';
export { RxCore_documentOpened as documentOpened } from './internal';
export { doResize as doResize } from './internal';
export { RxCore_DrawPoints as drawPoints } from './internal';
export { RxCore_endTextSearch as endTextSearch } from './internal';
export { RxCore_exicompareMeasure as exicompareMeasure } from './internal';
export { RxCore_3DExplode as explode3D } from './internal';
export { RxCore_3DExplodedistance as explode3DDistance } from './internal';
export { RxCore_ExportFile as exportFile } from './internal';
export { RxCore_PDFExport as exportPDF } from './internal';
export { RxCore_FileInfodialog as fileInfoDialog } from './internal';
export { fileSelected as fileSelected } from './internal';
export { RxCore_FindBlockByAttr as findBlockByAttr } from './internal';
export { RxCore_FindMarkup as findMarkUp } from './internal';
export { FreeLicense as freeLicense } from './internal';
//get3DBlocks:RxCore_get3DBlocks,
//get3DInfo:RxCore_get3DInfo,
//getAnnotations:RxCore_getAnnotations,
export { RxCore_get2DVectorBlocks as get2DVectorBlocks } from './internal';
export { RxCore_getBlockAttributes as getBlockAttributes } from './internal';
export { RxCore_getBookMarkPage as getBookMarkPage } from './internal';
export { RxCore_getCacheURL as getCacheURL } from './internal';
export { RxCore_GetCanvasSize as getCanvasSize } from './internal';
export { RxCore_GetColor as getColor } from './internal';
export { RxCore_GetCompareColors as getCompareColors } from './internal';
export { RxCore_GetcurPage as getcurPage } from './internal';
export { GetDisplayName as getDisplayName } from './internal';
export { RxCore_GetdocInfo as getdocInfo } from './internal';
export { RxCore_GetfillColor as getFillColor } from './internal';
export { RxCore_GetFillstyle as getFillStyle } from './internal';
export { RxCore_GetFixedScale as getFixedScale } from './internal';
export { RxCore_GetFont as getFont } from './internal';
export { RxCore_getFileInfo as getFileInfo } from './internal';
export { RxCore_GetlineColor as getLineColor } from './internal';
export { RxCore_GetLineWidth as getLineWidth } from './internal';
export { RxCore_GetMarkupLayers as getMarkupLayers } from './internal';
export { RxCore_getMarkupXMLData as getMarkupXMLData } from './internal';
export { RxCore_getmarkupobjByGUID as getmarkupobjByGUID } from './internal';
export { RxCore_getMarkupXMLByGUID as getMarkupXMLByGUID } from './internal';
export { RxCore_getNoteDiag as getNoteDiag } from './internal';
export { RxCore_GetOpenFiles as getOpenFiles } from './internal';
export { RxCore_getOpenFilesList as getOpenFilesList } from './internal';
export { RxCore_getAllPageDimensions as getAllPageDimensions } from './internal';
export { RxCore_getPageDimensions as getPageDimensions } from './internal';
export { RxCore_getPageRotation as getPageRotation } from './internal';
export { RxCore_getReadOnly as getReadOnly } from './internal';
export { RxCore_getSelectedMarkup as getSelectedMarkup } from './internal';
export { RxCore_getSnapState as getSnapState } from './internal';
export { RxCore_getSymbolLibNum as getSymbolLibNum } from './internal';
export { RxCore_getSymbolLibPNGData as getSymbolLibPNGData } from './internal';
export { RxCore_getSymbolName as getSymbolName } from './internal';
export { RxCore_getnumSymbols as getnumSymbols } from './internal';
export { RxCore_GetTextColor as getTextColor } from './internal';
export { RxCore_getUser as getUser } from './internal';
export { RxCore_GetUsers as getUsers } from './internal';
export { RxCore_gotoPage as gotoPage } from './internal';
// getGUIState:RxCore_getGUIState,
export { RxCore_GetHatchStyle as getHatchStyle } from './internal';
// getThumbnails:RxCore_getThumbnails,
export { RxCore_getTextInput as getTextInput } from './internal';
export { RxCore_helper as helper } from './internal';
export { RxCore_HideMarkup as hideMarkUp } from './internal';
export { RxCore_hideLabels as hideLabels } from './internal';
export { RxCore_hideTextInput as hideTextInput } from './internal';
export { RxCore_ImperialUnit as imperialUnit } from './internal';
export { initialize as initialize } from './internal';
export { instanceReset as instanceReset } from './internal';
export { RxCore_KeepvectorColor as keepvectorColor } from './internal';
export { RxCore_LoadThumbnails as loadThumbnails } from './internal';
export { RxCore_LockMarkupbyGUID as lockMarkupbyGUID } from './internal';
export { RxCore_lockMarkup as lockMarkup } from './internal';
export { RxCore_MagnifyGlass as magnifyGlass } from './internal';
export { RxCore_MarkupAddBlockText as markupAddBlockText } from './internal';
export { RxCore_MarkupArea as markUpArea } from './internal';
export { RxCore_MarkupArrow as markUpArrow } from './internal';
export { RxCore_MarkupChanged as markupChanged } from './internal';
export { RxCore_MarkupCircle as markupCircle } from './internal';
export { RxCore_MarkupDimension as markUpDimension } from './internal';
export { RxCore_MarkupEdged as markUpEdged } from './internal';
export { RxCore_MarkupErase as markUpErase } from './internal';
export { RxCore_MarkupFilled as markUpFilled } from './internal';
export { RxCore_MarkupFreepen as markUpFreePen } from './internal';
export { RxCore_MarkupHatched as markUpHatched } from './internal';
export { RxCore_MarkupHighlight as markUpHighlight } from './internal';
export { RxCore_MarkupLayerdialog as markUpLayerDialog } from './internal';
export { RxCore_MarkupLine as markupLine } from './internal';
export { RxCore_MarkupMeasurePath as markupMeasurePath } from './internal';
export { RxCore_MarkupMultiselect as markupMultiselect } from './internal';
export { RxCore_MarkupNote as markUpNote } from './internal';
export { RxCore_MarkupOutlined as markUpOutlined } from './internal';
export { RxCore_MarkupPolycurve as markUpPolycurve } from './internal';
export { RxCore_MarkupPolyline as markUpPolyline } from './internal';
export { RxCore_MarkupRedraw as markUpRedraw } from './internal';
export { RxCore_MarkupRotate as markUpRotate } from './internal';
export { RxCore_MarkupSave as markUpSave } from './internal';
export { RxCore_MarkupSaveCheck as markupSaveCheck } from './internal';
export { RxCore_markUpSelected as markUpSelected } from './internal';
export { RxCore_MarkupShape as markUpShape } from './internal';
export { RxCore_StampMarkup as markUpStamp } from './internal';
export { Rxcore_MarkupSymbol as markupSymbol } from './internal';
export { RxCore_MarkupSubtype as markUpSubType } from './internal';
export { RxCore_MarkupText as markUpText } from './internal';
export { RxCore_TextRect as markUpTextRect } from './internal';
export { RxCore_MarkupUndo as markUpUndo } from './internal';
export { RxCore_MarkupUserdialog as markUpUserDialog } from './internal';
export { RxCore_Measure as measure } from './internal';
export { RxCore_MetricUnit as metricUnit } from './internal';
export { modifyMarkup as modifyMarkup } from './internal';
export { RxCore_MoveTo3DPart as moveTo3DPart } from './internal';
export { RxCore_MSIEeventCheck as mSIEeventCheck } from './internal';
export { RxCore_NextMarkup as nextMarkup } from './internal';
export { RxCore_NextPage as nextPage } from './internal';
export { RxCore_NoteFocus as noteFocus } from './internal';
//onCalibrateFinished:RxCore_onCalibrateFinished,
//onMeasureFinished:RxCore_onMeasureFinished,
export { RxCore_onNotePlaced as onNotePlaced } from './internal';
export { RxCore_onTextPlaced as onTextPlaced } from './internal';
export { RxCore_OpenFile as openFile } from './internal';
export { RxCore_OpenFileCustom as openFileCustom } from './internal';
export { RxCore_OpenFilePages as openFilePages } from './internal';
export { RxCore_OpenMarkup as openMarkup } from './internal';
export { RxCore_OpenRecent as openRecent } from './internal';
export { RxCore_3DOrbit as orbit3D } from './internal';
export { RxCore_OverlayFiles as overlayFiles } from './internal';
export { RxCore_Overlay as overlay } from './internal';
export { RxCore_PageonlyMarkup as pageOnlyMarkup } from './internal';
export { RxCore_PageLock as pageLock } from './internal';
export { RxCore_PagePos as pagePos } from './internal';
export { RxCore_PanWindow as panWindow } from './internal';
export { RxCore_PanPage as panPage } from './internal';
export { RxCore_PasteMarkup as pasteMarkUp } from './internal';
export { RxCore_PickPolygon as pickPolygon } from './internal';
export { RxCore_PrevPage as prevPage } from './internal';
export { RxCore_Printdocument as print } from './internal';
export { getDocObj as printDoc } from './internal';
export { RXCore_PrintdocOptions as printEx } from './internal';
export { RxCore_PrintOptionsSize as printSizeEx } from './internal';
export { RxCore_printhelper as printhelper } from './internal';
export { RxCore_redrawPage as redrawPage } from './internal';
export { RxCore_Reset3DModel as reset3DModel } from './internal';
export { RxCore_RestoreBlockStates as restoreBlockStates } from './internal';
export { RxCore_resetBlocks as resetBlocks } from './internal';
export { RxCore_resetLayers as resetLayers } from './internal';
export { RxCore_default as restoreDefault } from './internal';
export { RxCore_RotateDrawing as rotate } from './internal';
export { RxCore_RotatePage as rotatePage } from './internal';
export { RxCore_scale as scale } from './internal';
export { RxCore_ScaleonResize as scaleOnResize } from './internal';
export { RxCore_3DSelect as select3D } from './internal';
export { RxCore_Search3dAttribute as search3dAttribute } from './internal';
export { RxCore_Select3DVectorBlock as select3DVectorBlock } from './internal';
export { RxCore_selectSymbName as selectSymbName } from './internal';
export { RxCore_selectSymblib as selectSymblib } from './internal';
export { RxCore_SelectVectorBlock as selectVectorBlock } from './internal';
export { RxCore_MarkupSelect as selectMarkUp } from './internal';
export { RxCore_SelectMarkupbyIndex as selectMarkUpByIndex } from './internal';
export { RxCore_SelectMarkupbyGUID as selectMarkupbyGUID } from './internal';
export { RxCore_setArrowSize as setArrowSize } from './internal';
export { RxCore_setActiveFile as setActiveFile } from './internal';
export { RxCore_setBlockColor as setBlockColor } from './internal';
export { RxCore_setCalibration as setCalibration } from './internal';
export { RxCore_SetCompareFiles as setCompareFiles } from './internal';
export { RxCore_setCompareColors as setCompareColors } from './internal';
export { RxCore_setCompareScale as setCompareScale } from './internal';
export { RxCore_setConfiguration as setConfiguration } from './internal';
export { RxCore_SetDimOffset as setDimOffset } from './internal';
export { RxCore_setdisplayBackground as setdisplayBackground } from './internal';
export { RxCore_SetFont as setFont } from './internal';
export { RxCore_SetFontBold as setFontBold } from './internal';
export { RxCore_SetFontHeight as setFontHeight } from './internal';
export { RxCore_SetFontItalic as setFontItalic } from './internal';
export { RxCore_SetGlobalStyle as setGlobalStyle } from './internal';
export { RxCore_SetGUIDMarkupSelected as setGUIDMarkupSelected } from './internal';
export { RxCore_setLabelSize as setLabelSize } from './internal';
export { RxCore_setLayout as setLayout } from './internal';
export { RxCore_SetLineStyle as setLineStyle } from './internal';
export { RxCore_SetLineWidth as setLineWidth } from './internal';
export { RxCore_SetLineWidthUnits as setLineWidthUnits } from './internal';
export { RxCore_SetMarkupLayer as setMarkupLayer } from './internal';
export { RxCore_setMarkupXMLData as setMarkupXMLData } from './internal';
export { RxCore_setPageDimensions as setPageDimensions } from './internal';
export { RxCore_setPDFAnimateRender as setPDFAnimateRender } from './internal';
export { RxCore_setPDFinitalZoomAll as setPDFinitalZoomAll } from './internal';
export { RxCore_SetScrollZoomKey as setscrollZoomKey } from './internal';
export { RxCore_SetSingleDocument as setSingleDocument } from './internal';
export { RxCore_setText as setText } from './internal';
export { RxCore_SetUnit as setUnit } from './internal';
export { RxCore_suspendDraw as suspendDraw } from './internal';
export { RxCore_textSearch as textSearch } from './internal';
export { RxCore_TextSelect as textSelect } from './internal';
export { RxCore_3DToggleVisible as toggle3DVisible } from './internal';
export { RxCore_togglebackground as toggleBackground } from './internal';
export { RxCore_3DTransparency as transparency3D } from './internal';
export { RxCore_unSelectAllMarkup as unSelectAllMarkup } from './internal';
export { RxCore_unSelectMarkupbyGUID as unSelectMarkupbyGUID } from './internal';
export { RxCore_UseFixedScale as useFixedScale } from './internal';
export { RxCore_UseOrtho as useOrtho } from './internal';
export { RxCore_BlocksAll as vectorBlocksAll } from './internal';
export { RxCore_LayersAll as vectorLayersAll } from './internal';
export { RxCore_SetViewMode as viewMode } from './internal';
export { RxCore_3DWalkthrough as walkThrough3D } from './internal';
export { RxCore_xmlurl as xmlurl } from './internal';
export { RxCore_xmlurlEx as xmlurlEx } from './internal';
export { RxCore_ZoomToBlock as zoomToBlock } from './internal';
export { RxCore_ZoomFit as zoomFit } from './internal';
export { RxCore_ZoomHeight as zoomHeight } from './internal';
export { RxCore_ZoomWidth as zoomWidth } from './internal';
export { RxCore_ZoomIn as zoomIn } from './internal';
export { RxCore_ZoomOut as zoomOut } from './internal';
export { RxCore_ZoomPageUpdate as zoomPageUpdate } from './internal';
export { RxCore_ZoomWindow as zoomWindow } from './internal';
export { RxCore_setEndPoints as setEndPoints } from './internal';
export { RxCore_MarkupHatch as setMarkUpHatch } from './internal';
export { RxCore_setNoteText as setNoteText } from './internal';
export { RxCore_setTextInputText as setTextInputText } from './internal';
export { RxCore_getTextInputText as getTextInputText } from './internal';
export { RxCore_SetThumbnailctx as setThumbnailctx } from './internal';
//setUser : RxCore_SetUser,
export { RxCore_3DTransparentOn as transparent3DOn } from './internal';
export { RxCore_ZoomMarkup as zoomMarkup } from './internal';

export { RxCore_GUI_2DBlockID as GUI_2DBlockID } from './internal';
export { RxCore_GUI_2DBlockInfo as GUI_2DBlockInfo } from './internal';
export { Rxcore_GUI_3DPartInfo as GUI_3DPartInfo } from './internal';
export { RxCore_GUI_3DParts as GUI_3DParts } from './internal';
export { RxCore_GUI_3DWalkthrough as GUI_3DWalkthrough } from './internal';
export { RxCore_GUI_Calibratediag as GUI_Calibratediag } from './internal';
export { RxCore_GUI_CalibrateComplete as GUI_CalibrateComplete } from './internal';
export { RxCore_GUI_CompareDiag as GUI_CompareDiag } from './internal';
export { RxCore_GUI_CompareMeasure as GUI_CompareMeasure } from './internal';
export { RxCore_GUI_CompareAlign as GUI_CompareAlign } from './internal';
export { RxCore_GUI_Consolidate as GUI_Consolidate } from './internal';
export { RxCore_GUI_Download as GUI_Download } from './internal';
export { Rxcore_GUI_exportComplete as GUI_exportComplete } from './internal';
export { RxCore_GUI_FileInfo as GUI_FileInfo } from './internal';
export { Rxcore_GUI_fileLoadComplete as GUI_FileLoadComplete } from './internal';
export { Rxcore_GUI_markupLoadComplete as GUI_MarkupLoadComplete } from './internal';
export { RxCore_GUI_HasText as GUI_HasText } from './internal';
export { RxCore_GUI_Markup as GUI_Markup } from './internal';
export { RxCore_GUI_markupdrawParams as GUI_markupdrawParams } from './internal';
export { RxCore_GUI_markupParamsError as GUI_markupParamsError } from './internal';
export { RxCore_GUI_MarkupLayers as GUI_MarkupLayers } from './internal';
export { RxCore_GUI_MarkupLink as GUI_MarkupLink } from './internal';
export { RxCore_GUI_Markuplist as GUI_Markuplist } from './internal';
export { RxCore_GUI_MarkupSave as GUI_MarkupSave } from './internal';
export { RxCore_GUI_MarkupUnselect as GUI_MarkupUnselect } from './internal';
export { RxCore_GUI_Measurediag as GUI_Measurediag } from './internal';
export { RxCore_GUI_Notediag as GUI_Notediag } from './internal';
export { RxCore_GUI_NumMathces as GUI_NumMathces } from './internal';
export { Rxcore_GUI_pageLoadComplete as GUI_pageLoadComplete } from './internal';
export { Rxcore_GUI_pagedimLoadComplete as GUI_pagedimLoadComplete } from './internal';
export { RxCore_GUI_pagethumbs as GUI_pagethumbs } from './internal';
export { RxCore_GUI_PagePosition as GUI_PagePosition } from './internal';
export { RxCore_GUI_Page as GUI_Page } from './internal';
export { RxCore_GUI_PanUpdate as GUI_PanUpdate } from './internal';
export { RxCore_GUI_PanUpdated as GUI_PanUpdated } from './internal';
export { RxCore_GUI_PDFBookmarks as GUI_PDFBookmarks } from './internal';
export { Rxcore_GUI_PDFRenderComplete as GUI_PDFRenderComplete } from './internal';
export { RxCore_GUI_Permissions as GUI_Permissions } from './internal';
export { RxCore_GUI_Read3DComplete as GUI_Read3DComplete } from './internal';
export { RxCore_GUI_Ready as GUI_Ready } from './internal';
export { RxCore_GUI_RotatePage as GUI_RotatePage } from './internal';
export { RxCore_GUI_Resize as GUI_Resize } from './internal';
export { RxCore_GUI_Stamps as GUI_Stamps } from './internal';
export { RxCore_GUI_CustomStamps as GUI_CustomStamps } from './internal';
export { RxCore_GUI_Symbols as GUI_Symbols } from './internal';
export { RxCore_GUI_State as GUI_State } from './internal';
export { RxCore_GUI_Textdiag as GUI_Textdiag } from './internal';
export { RxCore_GUI_TextInput as GUI_TextInput } from './internal';
export { RxCore_GUI_Upload as GUI_Upload } from './internal';
export { RxCore_GUI_Users as GUI_Users } from './internal';
export { RxCore_GUI_VectorBlocks as GUI_VectorBlocks } from './internal';
export { RxCore_GUI_VectorLayers as GUI_VectorLayers } from './internal';
export { RxCore_GUI_ZoomUpdate as GUI_ZoomUpdate } from './internal';
export { RxCore_GUI_ZoomUpdated as GUI_ZoomUpdated } from './internal';
