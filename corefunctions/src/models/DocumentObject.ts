declare var RxConfig: any;
declare var PDFJS: any;

import {
    Globals,
    getFileName,
    getPath,
    getURLPath,
    RxCore_GUI_NumMathces,
    RxCore_GUI_PDFBookmarks,
    RxCore_GUI_Page,
    RxCore_GUI_3DParts,
    RxCore_GUI_3DWalkthrough,
    RxCore_GUI_Markuplist,
    RxCore_GUI_pagethumbs,
    RxCore_GUI_State,
    RxCore_GUI_HasText,
    RxCore_GUI_VectorLayers,
    RxCore_GUI_VectorBlocks,
    RxCore_default,

    setSmoothingEnabled,
    drawmarkupAll,
    set_tool,
    createxmlmarkupentity,
    ev_canvas,
    isObjectEqual
} from '../internal';
// TODO:JS->TS:INFO continue conversion
export class DocumentObject {
    usepagesload: boolean;
    fileindex: number;
    relativepath: undefined;
    bActive: boolean;
    textselect: boolean;
    hastext: boolean;
    markuploaded: boolean;
    pagelocked: boolean;
    lockedpage: any;
    currentpage: any;
    restorecurpage: number;
    backgroundColor: string;
    bMarkupchanged: boolean;
    curcontrol3D: string;
    bMarkupLocked: boolean;
    bDoPrint: boolean;
    bLargePDF: boolean;
    largePDFPagerange: number;
    endpagerange: number;
    startpagerange: number;
    pagerangelimit: number;
    pdfLoadingTask: any;
    PDFpagescale: any;
    xrefs: any[];
    fonts: any[];
    searchobj: any; // { matcharray: never[]; active: boolean; forward: boolean; casesens: boolean; expr: string; indx: number; page: number; next: () => void; previous: () => void; start: () => void; };
    Version: any;
    NumPages: any;
    NumLayouts: any;
    FileName: any;
    CachePath: any;
    OriginalURL: any;
    Format: any;
    Filter: any;
    FileSizeLow: any;
    FileSizeHigh: any;
    Type: any;
    CadMeasurement: any; // number;
    FileNameSRC: any; // string;
    CacheURL: any;
    thumbnails: any[];
    Drawmarkup: boolean;
    thumbnailhtmlsource: string;
    layerhtmlsource: string;
    layouts: any[];
    pages: any[];
    markuplist: any[];
    selectedmarkup: any; // { id: number; selected: boolean; edit: boolean; };
    rangeupdated: any; // { start: number; end: number; operation: string; };
    markupdraworder: any[];
    markupundolist: any[];
    documentproperties: any[];
    nummarkups: number;
    pdfDoc: any;
    pdfURL: string;
    pageNum: number;
    pageRendering: boolean;
    pageNumPending: any;
    scale: number;
    pdftimervar: any;
    _pagesRefCache: any;
    pdfoutline: undefined;
    setnummarkupfiles: any; // (num: any) => void;
    getnummarkupfiles: any; // () => number;
    setmarkupfilesreceived: any; // () => void;
    getmarkupfilesreceived: any; // () => number;
    textsearchend: any; // () => void;
    enableTextSelect: any;
    textsearch: any; // (text: any, forward: any, casesens: any) => void;
    GotoPage: any;
    getcurPage: any; // () => any;
    getAllPageDim: any; // () => any[];
    getPageDim: any; // (pagenumber: any) => any;
    getPageObject: any;
    setPageDim: any; // (pagenumber: any, height: any, width: any, x: any, y: any) => void;
    addProperties: any; //  (properties: any) => void;
    inpagerange: any; //  (pagenum: any) => boolean;
    pagerange: any; //
    draw_mpagepdf: any; //
    pagelock: any; //  (onOff: any) => void;
    mpzoom: any; //  (dx: any, dy: any, dscale: any) => void;
    zoom_update: any; // (sx: any, sy: any, sWide: any, sHi: any) => void;
    zoomall: any; // () => void;
    pan_position: any; // (sx: any, sy: any) => void;
    pan_update: any; // (sx: any, sy: any) => void;
    ZoomIn: any; // (factor: any, center: any) => void;
    zoomheight: any; // () => void;
    zoomwidth: any; // () => void;
    ZoomOut: any; // (factor: any, center: any) => void;
    recalcPages: any; // (factor: any, zoomin: any, xdiff: any) => void;
    renderPDFscale: any; // () => void;
    get_bookmark_pageref: any; // (destRef: any) => any;
    getPDF_PageRef: any; // (destRef: any, last: any) => void;
    addpage: any; // (PageObject: any, loadimage: any) => void;
    SetActive: any; //
    addlayout: any; // (Name: any) => void;
    loadpage: any; // (pagenum: any) => void;
    PageDown: any; // () => void;
    checkprintready: any; // () => boolean;
    loadAllPages: any; // () => void;
    printDocument: any; // (paper: any) => void;
    PageUp: any; // () => void;
    getpage: any; // (pagenum: any) => any;
    lockMarkupbyGUID: any; // (GUID: any, onOff: any) => void;
    getmarkupbyGUIDXML: any; // (GUID: any) => string;
    getmarkupobjbyGUID: any; // (GUID: any) => number;
    getmarkupbyGUID: any; // (GUID: any) => number;
    getmarkupbynumber: any; // (markupnumber: any) => number;
    draw_mpage: any; // () => void;
    updateadjpages: any; // () => void;
    Suspend: any; // () => void;
    disableMenu: any; // boolean;
    setactive: any; // boolean;
    Close: any; // () => void;
    setDocumentPageScale: any; // (width: any, height: any, scale: any) => void;
    pagerangearray: any; // () => any[];
    moveselected: any; // (xdiff: any, ydiff: any) => void;

    constructor(xmlDoc:any) {
        //File Information section
        var thisdocument = this;
        var relpath = Globals.xmlurlrel;
        var nummarkupfiles = 0;
        var markupfilesreceived = 0;
        if (Globals.bUseCustomrelpath) {
            relpath = Globals.xmlurlrelcustom;
        }
        this.usepagesload = false;
        this.fileindex = 0;
        this.relativepath = undefined;
        this.bActive = true;
        this.textselect = false;
        this.hastext = false;
        this.markuploaded = false;
        this.pagelocked = false;
        this.lockedpage = thisdocument.currentpage;
        this.currentpage = 0;
        this.restorecurpage = 0;
        this.backgroundColor = Globals.backgroundColor;
        this.bMarkupchanged = false;
        this.curcontrol3D = 'orbitControl';
        this.bMarkupLocked = false;
        this.bDoPrint = false;
        this.bLargePDF = false;
        this.largePDFPagerange = 10;
        this.endpagerange = 10;
        this.startpagerange = 0;
        this.pagerangelimit = 3;
        this.pdfLoadingTask = null;
        this.PDFpagescale = {width : 1, height: 1, scale : 1};
        this.xrefs = [];
        this.fonts = [];
        this.searchobj = {
            matcharray: [],
            active: false,
            forward: true,
            casesens: false,
            expr: "",
            indx: 0,
            page: 0,
            next: function () {
                if (this.matcharray.length == 0) {
                    return;
                }
                this.indx++;
                if (this.indx > this.matcharray.length - 1) {
                    this.indx = 0;
                }
                this.page = this.matcharray[this.indx].page;
            },
            previous: function () {
                if (this.matcharray.length == 0) {
                    return;
                }
                this.indx--;
                if (this.indx < 0) {
                    this.indx = this.matcharray.length - 1;
                }
                this.page = this.matcharray[this.indx].page;
            },
            start: function () {
                if (this.matcharray.length == 0) {
                    return;
                }
                this.page = this.matcharray[this.indx].page;
            }
        };
        this.Version = xmlDoc.getElementsByTagName('Version')[0].firstChild.nodeValue;
        this.NumPages = xmlDoc.getElementsByTagName('NumPages')[0].firstChild.nodeValue;
        this.NumLayouts = xmlDoc.getElementsByTagName('NumLayouts')[0].firstChild.nodeValue;
        this.FileName = xmlDoc.getElementsByTagName('FileName')[0].firstChild.nodeValue;
        var szFileName = getFileName(this.FileName);
        this.CachePath = getPath(this.FileName);
        if (Globals.bUseCustomrelpath) {
            this.FileName = szFileName;
        }
        this.OriginalURL = xmlDoc.getElementsByTagName('OriginalURL')[0].firstChild.nodeValue;
        this.Format = xmlDoc.getElementsByTagName('Format')[0].firstChild.nodeValue;
        this.Filter = xmlDoc.getElementsByTagName('Filter')[0].firstChild.nodeValue;
        this.FileSizeLow = xmlDoc.getElementsByTagName('FileSizeLow')[0].firstChild.nodeValue;
        this.FileSizeHigh = xmlDoc.getElementsByTagName('FileSizeHigh')[0].firstChild.nodeValue;
        this.Type = xmlDoc.getElementsByTagName('Type')[0].firstChild.nodeValue;
        if (xmlDoc.getElementsByTagName('XREFS') != undefined) {
            var xmlxrefs = xmlDoc.getElementsByTagName('XREF');
            for (var i = 0; i < xmlxrefs.length; i++) {
                if (xmlxrefs[i].getElementsByTagName('FileName')[0].firstChild != null) {
                    var szpath = xmlxrefs[i].getElementsByTagName('FileName')[0].firstChild.nodeValue;
                    var bfound = (xmlxrefs[i].getElementsByTagName('Found')[0].firstChild.nodeValue == 'true');
                    var xrefobject = {
                        path: szpath,
                        found: bfound
                    };
                    this.xrefs.push(xrefobject);
                }
            }
        }
        if (xmlDoc.getElementsByTagName('Fonts') != undefined) {
            var xmlfonts = xmlDoc.getElementsByTagName('Font');
            for (i = 0; i < xmlfonts.length; i++) {
                var szfontpath = xmlfonts[i].getElementsByTagName('FileName')[0].firstChild.nodeValue;
                var bffound = (xmlfonts[i].getElementsByTagName('Found')[0].firstChild.nodeValue == 'true');
                var fontobject = {
                    path: szfontpath,
                    found: bffound
                };
                this.fonts.push(fontobject);
            }
        }
        if (xmlDoc.getElementsByTagName('Summary') != undefined) {
            var summaryprops = xmlDoc.getElementsByTagName('Property');
            for (i = 0; i < summaryprops.length; i++) {
                if (summaryprops[i].getElementsByTagName('Name') != undefined && summaryprops[i].getElementsByTagName('Name')[0].firstChild != null) {
                    var szname = summaryprops[i].getElementsByTagName('Name')[0].firstChild.nodeValue;
                }
                else {
                    szname = "";
                }
                if (summaryprops[i].getElementsByTagName('Value') != undefined && summaryprops[i].getElementsByTagName('Value')[0].firstChild != null) {
                    var szvalue = summaryprops[i].getElementsByTagName('Value')[0].firstChild.nodeValue;
                }
                else {
                    szvalue = "";
                }
                if (szname == "ACAD_MEASUREMENT") {
                    this.CadMeasurement = parseInt(szvalue);
                    //0 = inch
                    //1 = metric
                }
            }
        }
        if (xmlDoc.getElementsByTagName('FileNameSRC')[0] != undefined) {
            this.FileNameSRC = encodeURI(relpath + xmlDoc.getElementsByTagName('FileNameSRC')[0].firstChild.nodeValue);
            this.CacheURL = getURLPath(this.FileNameSRC);
        }
        this.thumbnails = [];
        this.Drawmarkup = true;
        this.thumbnailhtmlsource = "";
        this.layerhtmlsource = "";
        //Arrays for layouts and pages
        this.layouts = [];
        this.pages = [];
        this.markuplist = [];
        //this.selectedmarkup = [];
        this.selectedmarkup = {
            id: -1,
            selected: false,
            edit: false
        };
        this.rangeupdated = {
            start: 0,
            end: 0,
            operation: 'none'
        };
        this.markupdraworder = [];
        this.markupundolist = [];
        this.documentproperties = [];
        this.nummarkups = 0;
        this.pdfDoc = null;
        this.pdfURL = "";
        this.pageNum = 1;
        this.pageRendering = false;
        this.pageNumPending = null;
        this.scale = 0.8;
        this.pdftimervar = null;
        this._pagesRefCache = Object.create(null);
        this.pdfoutline = undefined;
        this.setnummarkupfiles = function (num:any) {
            nummarkupfiles = num;
        };
        this.getnummarkupfiles = function () {
            return nummarkupfiles;
        };
        this.setmarkupfilesreceived = function () {
            markupfilesreceived++;
        };
        this.getmarkupfilesreceived = function () {
            return markupfilesreceived;
        };
        this.textsearchend = function () {
            if (thisdocument.searchobj.active) {
                thisdocument.pages[thisdocument.currentpage].clearSearch();
            }
            thisdocument.searchobj.matcharray = [];
            thisdocument.searchobj.expr = "";
            thisdocument.searchobj.forward = true;
            thisdocument.searchobj.casesens = false;
            thisdocument.searchobj.active = false;
            thisdocument.searchobj.indx = 0;
            thisdocument.searchobj.page = 0;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                thisdocument.enableTextSelect(false);
            }
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                thisdocument.enableTextSelect(false);
            }
            if (RxCore_GUI_NumMathces != undefined) {
                RxCore_GUI_NumMathces.numTextFound(thisdocument.searchobj.matcharray.length);
            }
        };
        this.textsearch = function (text:any, forward:any, casesens:any) {
            if (text == thisdocument.searchobj.expr && thisdocument.searchobj.active) {
                if (forward) {
                    thisdocument.pages[thisdocument.currentpage].clearSearch();
                    thisdocument.searchobj.next();
                    if (thisdocument.searchobj.page != thisdocument.currentpage) {
                        thisdocument.GotoPage(thisdocument.searchobj.page);
                    }
                    //thisdocument.pages[thisdocument.currentpage].clearSearch();
                    thisdocument.pages[thisdocument.currentpage].showSearch();
                }
                if (!forward) {
                    thisdocument.pages[thisdocument.currentpage].clearSearch();
                    thisdocument.searchobj.previous();
                    if (thisdocument.searchobj.page != thisdocument.currentpage) {
                        thisdocument.GotoPage(thisdocument.searchobj.page);
                    }
                    thisdocument.pages[thisdocument.currentpage].showSearch();
                }
            }
            else {
                if (thisdocument.searchobj.active) {
                    thisdocument.pages[thisdocument.currentpage].clearSearch();
                }
                thisdocument.searchobj.matcharray = [];
                thisdocument.searchobj.expr = text;
                thisdocument.searchobj.forward = forward;
                thisdocument.searchobj.casesens = casesens;
                thisdocument.searchobj.active = false;
                thisdocument.searchobj.indx = 0;
                thisdocument.searchobj.page = 0;
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                    if (!thisdocument.textselect) {
                        thisdocument.enableTextSelect(true);
                    }
                    for (var pagecnt = 0; pagecnt < thisdocument.pages.length; pagecnt++) {
                        thisdocument.pages[pagecnt].getPDFSearchList();
                    }
                    if (RxCore_GUI_NumMathces != undefined) {
                        RxCore_GUI_NumMathces.numTextFound(thisdocument.searchobj.matcharray.length);
                    }
                    //thisdocument.searchobj.matcharray
                }
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                    if (!thisdocument.textselect) {
                        thisdocument.enableTextSelect(true);
                    }
                    for (var vpagecnt = 0; vpagecnt < thisdocument.pages.length; vpagecnt++) {
                        thisdocument.pages[vpagecnt].getVectorSearchList();
                    }
                    if (RxCore_GUI_NumMathces != undefined) {
                        RxCore_GUI_NumMathces.numTextFound(thisdocument.searchobj.matcharray.length);
                    }
                }
                if (thisdocument.searchobj.matcharray.length > 0) {
                    thisdocument.searchobj.active = true;
                    thisdocument.searchobj.start();
                    if (thisdocument.searchobj.page != thisdocument.currentpage) {
                        thisdocument.GotoPage(thisdocument.searchobj.page);
                    }
                    thisdocument.pages[thisdocument.currentpage].showSearch();
                }
            }
        };
        this.getcurPage = function () {
            var curpage = thisdocument.currentpage;
            if (thisdocument.usepagesload) {
                curpage = thisdocument.pages[thisdocument.currentpage].pagenumber;
            }
            else {
                curpage = thisdocument.currentpage;
            }
            return curpage;
        };
        this.setDocumentPageScale = function(width:any, height:any, scale:any){
            //this.PDFpagescale = {width : 1, height: 1, pdfscale : 1};
            this.PDFpagescale.width = width;
            this.PDFpagescale.height = height;
            this.PDFpagescale.scale = scale;
            //thispage.offscreenwidth, thispage.offscreenheight, thispage.dscalepdf
        };
        this.getAllPageDim = function () {
            var pagedims = [];
            for (var i = 0; i < thisdocument.pages.length; i++) {
                pagedims.push(thisdocument.pages[i].getpagedim());
            }
            return pagedims;
        };
        this.getPageDim = function (pagenumber:any) {
            var pgobj = thisdocument.getPageObject(pagenumber);
            if (pgobj != undefined) {
                var pgdim = pgobj.getpagedim();
            }
            else {
                pgdim = undefined;
            }
            return pgdim;
        };
        this.setPageDim = function (pagenumber:any, height:any, width:any, x:any, y:any) {
            var pgobj = thisdocument.getPageObject(pagenumber);
            if (pgobj != undefined) {
                var pgdim = pgobj.setpagedim(height, width, x, y);
            }
        };
        this.getPageObject = function (pagenumber:any) {
            var curpageobj = undefined;
            if (!thisdocument.usepagesload) {
                curpageobj = thisdocument.pages[pagenumber];
            }
            else {
                for (var i = 0; i < thisdocument.pages.length; i++) {
                    if (thisdocument.pages[i].pagenumber == pagenumber) {
                        curpageobj = thisdocument.pages[i];
                    }
                }
            }
            return curpageobj;
        };
        this.addProperties = function (properties:any) {
            var format = thisdocument.Format.substring(0, 9);
            if (format == 'Adobe PDF') {
                for (var k in properties.info) {
                    if (typeof properties.info[k] !== 'function') {
                        thisdocument.documentproperties.push({ name: k, value: properties.info[k] });
                    }
                }
            }
        };
        this.inpagerange = function (pagenum:any) {
            var pagerange = thisdocument.pagerange();
            return (pagenum > pagerange.start && pagenum < pagerange.end);
        };
        /* function shortpgupdateloop(){

            var pagesstate = {
                pagenum : thisdocument.currentpage,
                pagerange : thisdocument.pagerange(),
                bpageshort : true,
                pagearray : thisdocument.pagerangearray()
            };

            yieldingLoop(pagesstate, 10, function() {
                pagesstate = pagechangeloop(pagesstate);

            }, function() {
                pageupdatecomplete();
            });
        } */
        function pgupdateloop() {
            // var parr  = pagechangeloopshort();
            let pagesstate = {
                pagenum : 0,
                pagerange : thisdocument.pagerange(),
                bpageshort : false,
                //exludedpages : parr
            };

            yieldingLoop(pagesstate, 10, function () {
                pagesstate = pagechangeloop(pagesstate);
            }, function () {
                pageupdatecomplete();
            });
        }
        function pageupdatecomplete() {
            //console.log('page range update complete');
            thisdocument.draw_mpagepdf();
        }

        // TODO:JS->TS:ADJUST refactor and remove dependency on 'thisdocument'
        function pagechangeloopshort(){
            const curpage = thisdocument.currentpage;
            let parr:any=[];
            if(thisdocument.bLargePDF){
                if (curpage == 0){
                    parr = [curpage, curpage+1,curpage+2];
                }else if (curpage == (thisdocument.pages.length - 1)){
                    parr = [curpage, curpage-1,curpage-2];
                }else if (curpage > 0 && curpage < (thisdocument.pages.length - 1)){
                    parr = [curpage, curpage+1,curpage-1];
                }
            }else{
                parr = [thisdocument.currentpage];
            }

            for (let pc = 0; pc < parr.length; pc++){
                if (thisdocument.pages[pc] == undefined){
                    continue;
                }
                if(!thisdocument.pages[pc].pdfisfirstrendered){
                    //thisdocument.pages[i].queueRenderPage(i + 1);
                    thisdocument.pages[pc].queueRenderPage(pc + 1);
                    //thisdocument.pages[pc].queRenderPageScaled();

                }else{
                    if(thisdocument.pages[pc].iscollapsed){
                        thisdocument.pages[pc].pdfisrendered = false;
                        thisdocument.pages[pc].queRenderPageScaled();
                    }
                    //thisdocument.pages[i].pdfisrendered = false;
                }
            }

            return parr;
        }

        function pagechangeloop(pagestate:any) {
            /* if (pagestate.exludedpages.indexOf(pagestate.pagenum) >= 0){
                pagestate.pagenum ++;
                return pagestate;
            } */

            if (pagestate.pagenum >= pagestate.pagerange.start && pagestate.pagenum <= pagestate.pagerange.end) {
                if (!thisdocument.pages[pagestate.pagenum].pdfisfirstrendered) {
                    //thisdocument.pages[i].queueRenderPage(i + 1);
                    thisdocument.pages[pagestate.pagenum].queueRenderPage(pagestate.pagenum + 1);
                    //thisdocument.pages[pagestate.pagenum].queRenderPageScaled();
                }
                else {
                    if (thisdocument.pages[pagestate.pagenum].iscollapsed) {
                        thisdocument.pages[pagestate.pagenum].pdfisrendered = false;
                        //thisdocument.pages[pagestate.pagenum].queRenderPageScaled();
                    }
                    //thisdocument.pages[i].pdfisrendered = false;
                }
            }
            else {
                if (pagestate.pagenum < thisdocument.pages.length) {
                    thisdocument.pages[pagestate.pagenum].collapsepage();
                }
            }
            if (pagestate.bpageshort){
                pagestate.pagearray.shift();
                pagestate.pagenum = pagestate.pagearray[0];

            }else{
                pagestate.pagenum ++;
            }

            return pagestate;
        }

        this.pagerangearray = function(){
            const curpage = this.currentpage;
            const halfrange = thisdocument.largePDFPagerange / 2;
            const endtrigger = thisdocument.endpagerange - thisdocument.pagerangelimit;
            const starttrigger = thisdocument.startpagerange + thisdocument.pagerangelimit;

            if (thisdocument.bLargePDF){
                if (curpage <= halfrange){
                    thisdocument.startpagerange = 0;
                    thisdocument.endpagerange = thisdocument.largePDFPagerange;

                }else if(curpage >= (thisdocument.pages.length - halfrange)){
                    thisdocument.startpagerange = thisdocument.pages.length - thisdocument.largePDFPagerange;
                    thisdocument.endpagerange = thisdocument.pages.length;
                }else if (curpage == endtrigger){
                    thisdocument.startpagerange = endtrigger - halfrange;
                    thisdocument.endpagerange = endtrigger + halfrange;
                }else if (curpage == starttrigger){
                    thisdocument.startpagerange = starttrigger - halfrange;
                    thisdocument.endpagerange = starttrigger + halfrange;
                }else if (curpage > thisdocument.endpagerange){
                    thisdocument.startpagerange = curpage - halfrange;
                    thisdocument.endpagerange = curpage + halfrange;
                }else if (curpage < thisdocument.startpagerange){
                    thisdocument.startpagerange = curpage - halfrange;
                    thisdocument.endpagerange = curpage + halfrange;
                }
            }else{
                thisdocument.startpagerange = 0;
                thisdocument.endpagerange = thisdocument.pages.length;
            }

            const pagearray = [thisdocument.currentpage];
            for(let pc = 1; pc < halfrange; pc++ ){

                pagearray.push(thisdocument.currentpage + pc);
                if ((thisdocument.currentpage - pc) >= 0){
                    pagearray.push(thisdocument.currentpage - pc);
                }

            }

            return pagearray;
        };

        this.pagerange = function () {
            var curpage = this.currentpage;
            //this.largePDFPagerange = 30;
            //this.endpagerange = 30;
            //this.startpagerange = 0;
            //this.pagerangelimit = 2;
            var halfrange = thisdocument.largePDFPagerange / 2;
            var endtrigger = thisdocument.endpagerange - thisdocument.pagerangelimit;
            var starttrigger = thisdocument.startpagerange + thisdocument.pagerangelimit;
            if (thisdocument.bLargePDF) {
                if (curpage <= halfrange) {
                    thisdocument.startpagerange = 0;
                    thisdocument.endpagerange = thisdocument.largePDFPagerange;
                }
                else if (curpage >= (thisdocument.pages.length - halfrange)) {
                    thisdocument.startpagerange = thisdocument.pages.length - thisdocument.largePDFPagerange;
                    thisdocument.endpagerange = thisdocument.pages.length;
                }
                else if (curpage == endtrigger) {
                    thisdocument.startpagerange = endtrigger - halfrange;
                    thisdocument.endpagerange = endtrigger + halfrange;
                }
                else if (curpage == starttrigger) {
                    thisdocument.startpagerange = starttrigger - halfrange;
                    thisdocument.endpagerange = starttrigger + halfrange;
                }
                else if (curpage > thisdocument.endpagerange) {
                    thisdocument.startpagerange = curpage - halfrange;
                    thisdocument.endpagerange = curpage + halfrange;
                }
                else if (curpage < thisdocument.startpagerange) {
                    thisdocument.startpagerange = curpage - halfrange;
                    thisdocument.endpagerange = curpage + halfrange;
                }
            }
            else {
                thisdocument.startpagerange = 0;
                thisdocument.endpagerange = thisdocument.pages.length;
            }
            //console.log(thisdocument.startpagerange,'-' ,thisdocument.endpagerange);
            return {
                start: thisdocument.startpagerange,
                end: thisdocument.endpagerange,
                nextstart: thisdocument.endpagerange + 1,
                nextend: thisdocument.endpagerange + thisdocument.largePDFPagerange + 1
            };
        };
        this.pagelock = function (onOff:any) {
            thisdocument.pagelocked = onOff;
            thisdocument.lockedpage = thisdocument.currentpage;
        };
        this.mpzoom = function (dx:any, dy:any, dscale:any) {
            if (thisdocument.pagelocked) {
                return;
            }
            for (var i = 0; i < this.pages.length; i++) {
                this.pages[i].dypdf = dy;
                this.pages[i].dxpdf = dx;
                this.pages[i].dscalepdf = dscale;
                this.pages[i].pdfisrendered = false;
            }
        };
        this.zoom_update = function (sx:any, sy:any, sWide:any, sHi:any) {
            if (thisdocument.pagelocked) {
                return;
            }
            for (var i = 0; i < this.pages.length; i++) {
                if (i != this.currentpage) {
                    this.pages[i].zoom_update(sx, sy, sWide, sHi);
                }
            }
        };
        this.zoomall = function () {
            if (thisdocument.pagelocked) {
                return;
            }
            for (var i = 0; i < this.pages.length; i++) {
                if (i != this.currentpage) {
                    this.pages[i].zoomall();
                }
            }
        };
        this.pan_position = function (sx:any, sy:any) {
            if (thisdocument.pagelocked) {
                return;
            }
            if (this.currentpage == 0) {
                var startrange = 0;
            }
            else {
                startrange = this.currentpage - 1;
            }
            if (this.currentpage == this.pages.length - 1) {
                var endrange = this.pages.length - 1;
            }
            else {
                endrange = this.currentpage + 1;
            }
            for (var i = startrange; i < endrange; i++) {
                if (i != this.currentpage) {
                    this.pages[i].pan_position(sx, sy);
                    if (this.pages[i].usepdfjs) {
                        if (this.textselect) {
                            this.pages[i].PDFTextArea.style.display = "none";
                        }
                    }
                }
            }
        };
        this.pan_update = function (sx:any, sy:any) {
            if (thisdocument.pagelocked) {
                return;
            }
            //var pagerange = thisdocument.pagerange();
            if (this.currentpage == 0) {
                var startrange = 0;
            }
            else {
                startrange = this.currentpage - 1;
            }
            if (this.currentpage == this.pages.length - 1) {
                var endrange = this.pages.length - 1;
            }
            else {
                endrange = this.currentpage + 1;
            }
            for (var i = startrange; i < endrange; i++) {
                if (i != this.currentpage) {
                    this.pages[i].pan_update(sx, sy);
                    if (this.pages[i].usepdfjs) {
                        if (this.textselect) {
                            this.pages[i].PDFTextArea.style.display = "none";
                        }
                    }
                }
            }
            //for (var i = 0; i < this.pages.length; i++) {
            /*for (var i = pagerange.start; i < pagerange.end; i++) {
                if (i != this.currentpage) {
                    this.pages[i].pan_update(sx, sy);
                    if (this.pages[i].usepdfjs) {
                        if(this.textselect){
                            this.pages[i].PDFTextArea.style.display = "none";
                        }

                    }

                }
            }*/
        };
        this.ZoomIn = function (factor:any, center:any) {
            if (thisdocument.pagelocked) {
                return;
            }
            for (var i = 0; i < this.pages.length; i++) {
                if (i != this.currentpage) {
                    this.pages[i].ZoomIn(factor, center, false);
                }
            }
        };
        this.zoomheight = function () {
            if (thisdocument.pagelocked) {
                return;
            }
            for (var i = 0; i < this.pages.length; i++) {
                if (i != this.currentpage) {
                    this.pages[i].zoomheight();
                }
            }
        };
        this.zoomwidth = function () {
            if (thisdocument.pagelocked) {
                return;
            }
            for (var i = 0; i < this.pages.length; i++) {
                if (i != this.currentpage) {
                    this.pages[i].zoomwidth();
                }
            }
        };
        this.ZoomOut = function (factor:any, center:any) {
            if (thisdocument.pagelocked) {
                return;
            }
            for (var i = 0; i < this.pages.length; i++) {
                if (i != this.currentpage) {
                    this.pages[i].ZoomOut(factor, center, false);
                }
            }
        };
        this.recalcPages = function (factor:any, zoomin:any, xdiff:any) {
            if (thisdocument.pagelocked) {
                return;
            }
            var dscale = this.pages[this.currentpage].dscalepdf;
            var dx = this.pages[this.currentpage].dxpdf;
            var dy = this.pages[this.currentpage].dypdf;
            for (var i = 0; i < this.pages.length; i++) {
                if (i != this.currentpage) {
                    //this.pages[i].dscalepdf = (this.pages[this.currentpage].pagecanvas.width * dscale) / this.pages[i].pagecanvas.width;
                    if (zoomin) {
                        this.pages[i].dscalepdf = this.pages[i].dscalepdf * factor;
                    }
                    else {
                        this.pages[i].dscalepdf = this.pages[i].dscalepdf / factor;
                    }
                    this.pages[i].dxpdf = this.pages[i].dxpdf - xdiff;
                    this.pages[i].pdfisrendered = false;
                    //this.dscalepdf = this.dscalepdf / factor;
                    /*if(this.pages[i].pagecanvas.width * this.pages[i].dscalepdf != this.pages[this.currentpage].pagecanvas.width * dscale){
                     if(this.pages[i].pagecanvas.width != this.pages[this.currentpage].pagecanvas.width){
                     console.log(this.pages[i].dscalepdf);
                     }
                     }*/
                    //this.pages[i].dscalepdf = dscale;
                    //this.pages[i].dxpdf = dx;
                    //var wscale = (this.pages[this.currentpage].pagecanvas.width * this.pages[this.currentpage].dscalepdf) / Math.abs(page.view[2]);
                    //var hscale = (this.pages[this.currentpage].pagecanvas.height * this.pages[this.currentpage].dscalepdf) / Math.abs(page.view[3]);
                }
            }
        };
        this.renderPDFscale = function () {
            var pagerange = thisdocument.pagerange();
            var dscale = this.pages[this.currentpage].dscalepdf;
            var dx = this.pages[this.currentpage].dxpdf;
            var dy = this.pages[this.currentpage].dypdf;
            /*for(var i=0;i<this.pages.length;i++){
             if (i != this.currentpage){
             this.pages[i].dscalepdf = dscale;
             this.pages[i].dxpdf = dx;*/
            /*if((this.pages[i].dxpdf < canvasowidth && this.pages[i].dxpdf > 0) || (this.pages[i].endx > 0 && this.pages[i].endx < canvasowidth) ){
             if((this.pages[i].dypdf < canvasoheight && this.pages[i].dypdf > 0) || (this.pages[i].endy > 0 && this.pages[i].endy < canvasoheight)){
             //thispage.visible = true;
             console.log('visible ' + this.pages[i].pagenumber);
             }else{
             //thispage.visible = false;
             }
             }*/
            //this.pages[i].queRenderPageScaled();
            //this.pages[i].renderPDFpagescale(false);
            /*}
             }*/
            if (thisdocument.pages.length > 1 && !thisdocument.pagelocked) {
                if (thisdocument.bLargePDF) {
                    for (var i = pagerange.start; i < pagerange.end; i++) {
                        if (!thisdocument.pages[i].pdfisrendered) {
                            thisdocument.pages[i].queRenderPageScaled();
                        }
                    }
                }
                else {
                    if (this.currentpage == 0) {
                        this.pages[this.currentpage].queRenderPageScaled();
                        this.pages[this.currentpage + 1].queRenderPageScaled();
                    }
                    else if (this.currentpage == this.pages.length - 1) {
                        this.pages[this.currentpage].queRenderPageScaled();
                        this.pages[this.currentpage - 1].queRenderPageScaled();
                    }
                    else if (this.currentpage > 0 && this.currentpage < this.pages.length - 1) {
                        this.pages[this.currentpage].queRenderPageScaled();
                        this.pages[this.currentpage + 1].queRenderPageScaled();
                        this.pages[this.currentpage - 1].queRenderPageScaled();
                    }
                }
            }
            else {
                this.pages[this.currentpage].queRenderPageScaled();
            }
            //this.draw_mpagepdf();
        };
        //this.returbookmarknpage = function()
        this.get_bookmark_pageref = function (destRef:any) {
            var pageidx = null;
            var destrefpage = destRef[0];
            for (var i = 0; i < thisdocument.pages.length; i++) {
                var pageref = thisdocument.pages[i].getpageRef();
                if (isObjectEqual(destrefpage, pageref)) {
                    pageidx = thisdocument.pages[i].pagenumber;
                }
                //thisdocument.pages[i].getPDF_PageRef(destRef)
                //thisdocument.pages[i].queueGetPageDim(thisdocument.pages[i].pagenumber + 1);
            }
            /*var cacheKey = destRef.num + ' ' + destRef.gen + ' R';
            thisdocument.pdfDoc.getPageIndex(cacheKey).then(function (pageIndex) {
                return pageIndex;
            });*/
            return pageidx;
        };
        this.getPDF_PageRef = function (destRef:any, last:any) {
            thisdocument.pdfDoc.getPageIndex(destRef).then(function (pageIndex:any) {
                //var pageNum = pageIndex;
                var cacheKey = destRef.num + ' ' + destRef.gen + ' R';
                thisdocument._pagesRefCache[cacheKey] = pageIndex;
                if (RxCore_GUI_PDFBookmarks != undefined) {
                    RxCore_GUI_PDFBookmarks.setPageRef(thisdocument._pagesRefCache);
                }
                //pdfoutline
                if (last) {
                    if (RxCore_GUI_PDFBookmarks != undefined) {
                        RxCore_GUI_PDFBookmarks.setPDFBookmarks(thisdocument.pdfoutline);
                    }
                }
                //goToDestination(destRef);
            });
        };
        this.addpage = function (PageObject:any, loadimage:any) {
            PageObject.DocRef = thisdocument;
            thisdocument.pages.push(PageObject);
            var pagnum = thisdocument.pages.length - 1;
            var displaypage = pagnum + 1;
            //this.thumbnailhtmlsource += "<img src='" + PageObject.ThumbnailImageSRC + "'" + " alt='"+ this.PageName + "' onclick='getpage(" + pagnum + ")'>" + "<p style='text-indent: 80px;color:white'>"  + displaypage + "</p>";
            //ThumbnailpagesContainer.Addpage(PageObject.ThumbnailImageSRC,this.PageName, pagnum, displaypage);
            thisdocument.thumbnails.push(PageObject.getThumbnail);
            //PageObject.loadvector();
            /*if (PageObject.usevectorxml){
             loadimage = false;
             PageObject.loadvectors();


             }*/
            if (loadimage) {
                if (PageObject.usevector3Dbinary) {
                    PageObject.loadvectors3DBinary();
                    /*if(PageObject.has3Dnav){
                     PageObject.load3dnavigator();
                     }*/
                }
                else if (PageObject.usevector3Dxml) {
                    //PageObject.loadvectors3D();
                }
                else if (PageObject.usevectorbinary) {
                    setSmoothingEnabled(false);
                    // contexto.imageSmoothingEnabled = false;
                    // contexto.mozImageSmoothingEnabled = false;
                    // contexto.msImageSmoothingEnabled = false;
                    PageObject.loadbinvectors();
                    //PageObject.loadbinvectors();
                }
                else if (PageObject.usevectorxml) {
                    setSmoothingEnabled(false);
                    // contexto.imageSmoothingEnabled = false;
                    // contexto.mozImageSmoothingEnabled = false;
                    // //contexto.webkitImageSmoothingEnabled = false;
                    // contexto.msImageSmoothingEnabled = false;
                    PageObject.loadbinvectors();
                    if (PageObject.VectorPageObj.height == 0 || PageObject.VectorPageObj.width == 0) {
                        thisdocument.pages.pop();
                        //return;
                    }
                    //PageObject.loadvectors();
                }
                else if (PageObject.usepdfjs) {
                    setSmoothingEnabled(false);
                    // contexto.imageSmoothingEnabled = false;
                    // contexto.mozImageSmoothingEnabled = false;
                    // //contexto.webkitImageSmoothingEnabled = false;
                    // contexto.msImageSmoothingEnabled = false;
                    //backgroundColor = "#FFFFFF";
                    //this.backgroundColor = backgroundColor;
                    thisdocument.backgroundColor = "#FFFFFF";
                    var file = getFileName(thisdocument.FileName);
                    let cachfolder: any = getURLPath(PageObject.ThumbnailImageSRC);
                    if (thisdocument.relativepath != undefined) {
                        cachfolder = thisdocument.relativepath;
                    }
                    var noCachFolder = RxConfig.noCachFolder;
                    if (noCachFolder) {
                        thisdocument.pdfURL = RxConfig.xmlurlrel + thisdocument.FileNameSRC;
                    }
                    else {
                        thisdocument.pdfURL = cachfolder + file;
                    }
                    if (PageObject.firstpage) {
                        //PDFJS.cMapUrl = '/pdfjs/web/cmaps/';
                        PDFJS.cMapUrl = RxConfig.PDFcmap;
                        PDFJS.cMapPacked = true;
                        //PDFJS.disableWorker = true;
                        /*if (RxCore_GUI_Download != undefined) {
                            RxCore_GUI_Download.setDownload("show");
                        }*/
                        //this.pdfLoadingTask = PDFJS.getDocument({url:thisdocument.pdfURL,worker:docworker});
                        PDFJS.getDocument(thisdocument.pdfURL).then(function (pdfDoc_:any) {
                            thisdocument.pdfDoc = pdfDoc_;
                            //thisdocument.pdfFindController = new PDFJS.PDFFindController();
                            // Initial/first page rendering
                            if (thisdocument.pages.length > Globals.nLargePDF) {
                                thisdocument.bLargePDF = true;
                                for (var i = 0; i < thisdocument.pages.length; i++) {
                                    thisdocument.pages[i].queueGetPageDim(thisdocument.pages[i].pagenumber + 1);
                                    if (Globals.bAbortPageload) {
                                        console.log('page load terminated', i);
                                        Globals.bAbortPageload = false;
                                        break;
                                    }
                                }
                                for (i = 0; i < thisdocument.largePDFPagerange + 1; i++) {
                                    //thisdocument.pages[i].queueRenderPage(i);
                                    thisdocument.pages[i].queueRenderPage(thisdocument.pages[i].pagenumber + 1);
                                    if (Globals.bAbortPageload) {
                                        console.log('page load terminated', i);
                                        Globals.bAbortPageload = false;
                                        break;
                                    }
                                }
                            }
                            else {
                                for (var i = 0; i < thisdocument.pages.length; i++) {
                                    thisdocument.pages[i].queueGetPageDim(thisdocument.pages[i].pagenumber + 1);
                                    if (Globals.bAbortPageload) {
                                        console.log('page load terminated', i);
                                        Globals.bAbortPageload = false;
                                        break;
                                    }
                                }
                                for (i = 0; i < thisdocument.pages.length; i++) {
                                    thisdocument.pages[i].queueRenderPage(thisdocument.pages[i].pagenumber + 1);
                                    if (Globals.bAbortPageload) {
                                        console.log('page load terminated', i);
                                        Globals.bAbortPageload = false;
                                        break;
                                    }
                                    //thisdocument.queueRenderPage(i);
                                }
                            }
                            /*for ( i = 0; i < thisdocument.pages.length; i++) {
                                thisdocument.pages[i].queueRenderPage(i + 1);

                            }*/
                            /*if (RxCore_GUI_Download != undefined) {
                                RxCore_GUI_Download.setDownload("hide");
                            }*/
                            thisdocument.pdfDoc.getMetadata().then(function (properties:any) {
                                //console.log(properties);
                                thisdocument.addProperties(properties);
                            });
                            thisdocument.pdfDoc.getOutline().then(function (outline:any) {
                                if (outline) {
                                    thisdocument.pdfoutline = outline;
                                    /*var last = false;
                                    for (var i = 0; i < outline.length; i++) {
                                        if (i == outline.length - 1) {
                                            last = true;
                                        }
                                        if(outline[i] && outline[i].dest) {
                                            var destRef = outline[i].dest[0];

                                            if (thisdocument.pages[DocObj.currentpage].usepdfjs) {
                                                thisdocument.getPDF_PageRef(destRef, last);
                                            }
                                            if(RxCore_GUI_PDFBookmarks != undefined){
                                                RxCore_GUI_PDFBookmarks.getPageRef(scope._pagesRefCache,destRef);
                                            }


                                            if (outline[i].count > 0) {
                                                //for (var j=0;j<outline[i].count;j++){
                                                 //ulstring += '<li>' + outline[i].items[j].title + '</li>\n';
                                                 //}
                                            }
                                        }


                                    }*/
                                    if (RxCore_GUI_PDFBookmarks != undefined) {
                                        RxCore_GUI_PDFBookmarks.setPDFBookmarks(thisdocument.pdfoutline);
                                    }
                                    /*if(RxCore_GUI_PDFBookmarks != undefined){
                                        RxCore_GUI_PDFBookmarks.createPageRefCache(outline);
                                    }*/
                                }
                                //var outlineView = document.getElementById('outlineView');
                                /*self.outline = new DocumentOutlineView({
                                 outline: outline,
                                 outlineView: outlineView,
                                 linkService: self
                                 });*/
                                //document.getElementById('viewOutline').disabled = !outline;
                                /*if (!outline && !outlineView.classList.contains('hidden')) {
                                 self.switchSidebarView('thumbs');
                                 }
                                 if (outline &&
                                 self.preferenceSidebarViewOnLoad === SidebarView.OUTLINE) {
                                 self.switchSidebarView('outline', true);
                                 }*/
                            });
                            thisdocument.SetActive();
                            //console.log(PageObject.pagenumber);
                        });
                    }
                }
                else {
                    if (thisdocument.Type == 0) {
                        PageObject.initialzoom = 2;
                    }
                    //backgroundColor = "#FFFFFF";
                    //this.backgroundColor = backgroundColor;
                    thisdocument.backgroundColor = "#FFFFFF";
                    setSmoothingEnabled(true);
                    // contexto.imageSmoothingEnabled = true;
                    // contexto.mozImageSmoothingEnabled = true;
                    // //contexto.webkitImageSmoothingEnabled = true;
                    // contexto.msImageSmoothingEnabled = true;
                    //PageObject.loadimages(thisdocument.pageNum);
                    PageObject.loadimages(thisdocument.pageNum);
                    //PageObject.loadimages();
                }
            }
            /*if (PageObject.usepdfjs &&  thisdocument.pdfDoc != null){
             PageObject.loadimages();
             }*/
            if (PageObject.usepdfjs && thisdocument.pdfDoc != null) {
                PageObject.loadimages(thisdocument.pageNum);
            }
            if (PageObject.usevectorbinary) {
                PageObject.usevectorxml = true;
            }
            if (PageObject.usevector3Dbinary) {
                PageObject.usevector3Dxml = true;
            }
        };
        this.addlayout = function (Name:any) {
            thisdocument.layouts.push(Name);
        };
        this.loadpage = function (pagenum:any) {
            if (!this.pages[this.currentpage].usevectorxml && !this.pages[this.currentpage].usevectorbinary) {
                if (pagenum != 0) {
                    if (this.pages[this.currentpage].usepdfjs) {
                        this.pages[pagenum].queueRenderPage(pagenum + 1);
                    }
                    else {
                        if (!this.pages[pagenum].largeimageloaded || !this.pages[pagenum].smallimageloaded) {
                            if (this.Type == 0) {
                                this.pages[pagenum].initialzoom = 2;
                            }
                            this.pages[pagenum].loadimages();
                        }
                    }
                    //this.pages[pagenum].dscale = this.pages[0].dscale;
                    //this.pages[pagenum].dx = this.pages[0].dx;
                    //this.pages[pagenum].dy = this.pages[0].dy;
                    //this.pages[pagenum].dscaleextent = this.pages[0].dscaleextent;
                    //this.pages[pagenum].dxextent = this.pages[0].dxextent;
                    //this.pages[pagenum].dyextent = this.pages[0].dyextent;
                    //this.pages[pagenum].checkimageswitch();
                    //this.pages[this.currentpage].currentimage = this.pages[this.currentpage-1].currentimage;
                }
                //this.pages[this.currentpage].draw_image(true);
                /*if (this.Type == 0){
                 this.draw_allpages();
                 }else{
                 this.pages[this.currentpage].draw_image();
                 }*/
            }
            else {
                if (!this.pages[this.currentpage].vectorloaded) {
                    this.pages[this.currentpage].loadbinvectors();
                }
                else {
                    if (this.pages[this.currentpage].VectorPageObj.width == 0 || this.pages[this.currentpage].VectorPageObj.height == 0) {
                        //this.currentpage = prevpage;
                        return;
                    }
                    this.pages[this.currentpage].draw_vector(true);
                }
                //this.pages[this.currentpage].draw_vector(true);
            }
            //drawmarkupAll(cntximg);
        };
        this.PageDown = function () {
            /*if (thisdocument.pagelocked){
                return;
            }*/
            var prevpage = this.currentpage;
            if (this.pages[this.currentpage].usepdfjs) {
                if (this.textselect) {
                    this.pages[this.currentpage].PDFTextArea.style.display = "none";
                }
            }
            if (this.currentpage + 1 <= this.pages.length - 1) {
                this.currentpage++;
                if (this.pages[this.currentpage].usevector3Dxml) {
                    if (this.pages[this.currentpage].Vector3DPageObj == undefined) {
                        this.pages[this.currentpage].loadvectors3DBinary();
                    }
                    else {
                        /*if (this.pages[this.currentpage].VectorPageObj.width == 0 || this.pages[this.currentpage].VectorPageObj.height == 0) {
                         this.currentpage = prevpage;
                         return;
                         }*/
                        this.restorecurpage = this.currentpage;
                        this.SetActive();
                    }
                }
                else if (this.pages[this.currentpage].usevectorxml || this.pages[this.currentpage].usevectorbinary) {
                    if (!this.pages[this.currentpage].vectorloaded) {
                        this.pages[this.currentpage].loadbinvectors();
                    }
                    else {
                        if (this.pages[this.currentpage].VectorPageObj.width == 0 || this.pages[this.currentpage].VectorPageObj.height == 0) {
                            this.currentpage = prevpage;
                            return;
                        }
                        this.restorecurpage = this.currentpage;
                        this.SetActive();
                        //this.pages[this.currentpage].draw_vector(true);
                    }
                    //this.pages[this.currentpage].draw_vector(true);
                }
                else if (this.pages[this.currentpage].usepdfjs) {
                    if (!thisdocument.pagelocked) {
                        this.pages[this.currentpage].dxpdf = this.pages[prevpage].dxpdf;
                        this.pages[this.currentpage].dypdf = 0;
                    }
                    this.pages[this.currentpage].draw_canvas(true);
                    // shortpgupdateloop();
                    pgupdateloop();
                    if (this.textselect) {
                        this.pages[this.currentpage].PDFTextArea.style.display = Globals.szdispvalue;
                    }
                }
                else {
                    //if (!this.pages[this.currentpage].usevectorxml){
                    if (this.currentpage != 0) {
                        if (!this.pages[this.currentpage].largeimageloaded || !this.pages[this.currentpage].smallimageloaded) {
                            if (this.Type == 0) {
                                this.pages[this.currentpage].initialzoom = 2;
                            }
                            this.pages[this.currentpage].loadimages();
                        }
                        this.pages[this.currentpage].dscale = this.pages[this.currentpage - 1].dscale;
                        this.pages[this.currentpage].dx = this.pages[this.currentpage - 1].dx;
                        this.pages[this.currentpage].dy = this.pages[this.currentpage - 1].dy;
                        this.pages[this.currentpage].checkimageswitch();
                        //this.pages[this.currentpage].currentimage = this.pages[this.currentpage-1].currentimage;
                    }
                    this.pages[this.currentpage].draw_image(true);
                }
                /*else{
                 if (!this.pages[this.currentpage].vectorloaded){
                 this.pages[this.currentpage].loadvectors();
                 }

                 this.pages[this.currentpage].draw_vector(true);
                 }*/
                drawmarkupAll(Globals.cntximg);
                var stateobj = {
                    iscompare: Globals.documentcompare,
                    numOpenFiles: Globals.OpenFiles.length,
                    isPDF: this.pages[Globals.DocObj.currentpage].usepdfjs,
                    is3D: this.pages[Globals.DocObj.currentpage].usevector3Dxml,
                    is2D: this.pages[Globals.DocObj.currentpage].usevectorxml,
                    numpages: this.pages.length,
                    currentpage: this.currentpage
                };
                /*if (RxCore_GUI_State != undefined) {
                    RxCore_GUI_State.setGUIState(stateobj);
                }*/
                var pagingobject = {
                    numpages: this.pages.length,
                    currentpage: this.currentpage
                };
                if (RxCore_GUI_Page != undefined) {
                    RxCore_GUI_Page.pageEvent(pagingobject);
                }
            }
            this.restorecurpage = this.currentpage;
        };
        this.checkprintready = function () {
            var allpagesloaded = true;
            for (var i = 0; i < this.pages.length; i++) {
                if (this.pages[i].usevector3Dxml) {
                    allpagesloaded = true;
                }
                else if (this.pages[i].usevectorxml) {
                    if (!this.pages[i].vectorloaded) {
                        allpagesloaded = false;
                    }
                }
                else if (this.pages[i].usepdfjs) {
                    allpagesloaded = true;
                }
                else {
                    if (!this.pages[i].largeimageloaded || !this.pages[i].smallimageloaded) {
                        allpagesloaded = false;
                    }
                }
            }
            return allpagesloaded;
        };
        this.loadAllPages = function () {
            //var allpagesloaded = true;
            this.bDoPrint = true;
            for (var i = 0; i < this.pages.length; i++) {
                if (this.pages[i].usevectorxml) {
                    if (!this.pages[i].vectorloaded) {
                        this.GotoPage(i);
                        //allpagesloaded = false;
                    }
                }
                else if (this.pages[i].usepdfjs) {
                }
                else {
                    if (!this.pages[i].largeimageloaded || !this.pages[i].smallimageloaded) {
                        this.GotoPage(i);
                    }
                }
            }
            this.GotoPage(0);
            //return allpagesloaded;
        };
        this.printDocument = function (paper:any) {
            var i = 0;
            do {
                this.pages[i].printobj.setRes(300);
                this.pages[i].printobj.setPaperSize(paper.width, paper.height);
                this.pages[i].printobj.setScale();
                this.pages[i].printobj.print();
                i++;
            } while (i < this.pages.length);
            this.bDoPrint = false;
            /*for (var i = 0; i < this.pages.length-1; i++) {
             this.pages[i].printobj.setRes(300);
             this.pages[i].printobj.setPaperSize(paper.width,paper.height);
             this.pages[i].printobj.setScale();
             this.pages[i].printobj.print();
             }*/
        };
        this.GotoPage = function (pagenum:any) {
            /*if (thisdocument.pagelocked){
                return;
            }*/
            if (pagenum > this.pages.length - 1 || pagenum < 0) {
                return;
            }
            var prevpage = this.currentpage;
            if (this.pages[this.currentpage].usepdfjs) {
                if (this.textselect) {
                    this.pages[this.currentpage].PDFTextArea.style.display = "none";
                }
            }
            this.currentpage = pagenum;
            if (this.pages[this.currentpage].usevector3Dxml) {
                if (this.pages[this.currentpage].Vector3DPageObj == undefined) {
                    this.pages[this.currentpage].loadvectors3DBinary();
                }
                else {
                    /*if (this.pages[this.currentpage].VectorPageObj.width == 0 || this.pages[this.currentpage].VectorPageObj.height == 0) {
                     this.currentpage = prevpage;
                     return;
                     }*/
                    this.restorecurpage = this.currentpage;
                    this.SetActive();
                }
            }
            else if (this.pages[this.currentpage].usevectorxml) {
                if (!this.pages[this.currentpage].vectorloaded) {
                    this.pages[this.currentpage].loadbinvectors();
                }
                else {
                    if (this.pages[this.currentpage].VectorPageObj.width == 0 || this.pages[this.currentpage].VectorPageObj.height == 0) {
                        this.currentpage = prevpage;
                        return;
                    }
                    this.restorecurpage = this.currentpage;
                    this.SetActive();
                }
                //this.pages[this.currentpage].draw_vector(true);
            }
            else if (this.pages[this.currentpage].usepdfjs) {
                //this.pages[this.currentpage].dscalepdf = this.pages[prevpage].dscalepdf;
                if (thisdocument.bLargePDF) {
                    //this.pages[this.currentpage].dxpdf = this.pages[prevpage].dxpdf;
                    //this.pages[this.currentpage].dypdf = 0;
                    if (!thisdocument.pagelocked) {
                        this.pages[this.currentpage].setPFDdimnodraw(this.pages[prevpage].dxpdf, 0, 1, false);
                    }
                }
                else {
                    if (!thisdocument.pagelocked) {
                        this.pages[this.currentpage].setPFDdimnodraw(this.pages[prevpage].dxpdf, 0, 1, true);
                    }
                }
                this.pages[this.currentpage].draw_canvas(true);
                // shortpgupdateloop();
                pgupdateloop();
                if (thisdocument.bLargePDF) {
                    thisdocument.pages[thisdocument.currentpage].pdfisrendered = false;
                }
                if (this.textselect) {
                    this.pages[this.currentpage].PDFTextArea.style.display = Globals.szdispvalue;
                }
            }
            else {
                if (!this.pages[this.currentpage].largeimageloaded || !this.pages[this.currentpage].smallimageloaded) {
                    if (this.Type == 0) {
                        this.pages[this.currentpage].initialzoom = 2;
                    }
                    this.pages[this.currentpage].loadimages();
                }
                if (this.currentpage != 0) {
                    this.pages[this.currentpage].dscale = this.pages[0].dscale;
                    this.pages[this.currentpage].dx = this.pages[0].dx;
                    this.pages[this.currentpage].dy = this.pages[0].dy;
                    this.pages[this.currentpage].checkimageswitch();
                    //this.pages[this.currentpage].currentimage = this.pages[this.currentpage-1].currentimage;
                }
                this.pages[this.currentpage].draw_image(true);
            }
            /*if (!this.pages[this.currentpage].usevectorxml){



             }else{
             if (!this.pages[this.currentpage].vectorloaded){
             this.pages[this.currentpage].loadvectors();
             }

             this.pages[this.currentpage].draw_vector(true);
             }*/
            drawmarkupAll(Globals.cntximg);
            var stateobj = {
                iscompare: Globals.documentcompare,
                numOpenFiles: Globals.OpenFiles.length,
                isPDF: this.pages[Globals.DocObj.currentpage].usepdfjs,
                is3D: this.pages[Globals.DocObj.currentpage].usevector3Dxml,
                is2D: this.pages[Globals.DocObj.currentpage].usevectorxml,
                numpages: this.pages.length,
                currentpage: this.currentpage
            };
            /*if (RxCore_GUI_State != undefined) {
                RxCore_GUI_State.setGUIState(stateobj);
            }*/
            var pagingobject = {
                numpages: this.pages.length,
                currentpage: this.currentpage
            };
            if (RxCore_GUI_Page != undefined) {
                RxCore_GUI_Page.pageEvent(pagingobject);
            }
            this.restorecurpage = this.currentpage;
        };
        /*this.GotoPage = function(pagenum){
         var prevpage = this.currentpage;
         this.currentpage = pagenum;
         if (!this.pages[this.currentpage].usevectorxml){
         //this.checkimageswitch();
         if (!this.pages[this.currentpage].largeimageloaded || !this.pages[this.currentpage].smallimageloaded){
         if (this.Type == 0){
         this.pages[this.currentpage].initialzoom = 2;
         }
         this.pages[this.currentpage].loadimages();

         }

         if (this.currentpage != 0){
         this.pages[this.currentpage].dscale = this.pages[0].dscale;
         this.pages[this.currentpage].dx = this.pages[0].dx;
         this.pages[this.currentpage].dy = this.pages[0].dy;
         this.pages[this.currentpage].dscaleextent = this.pages[0].dscaleextent;
         this.pages[this.currentpage].dxextent = this.pages[0].dxextent;
         this.pages[this.currentpage].dyextent = this.pages[0].dyextent;
         this.pages[this.currentpage].checkimageswitch();
         //this.pages[this.currentpage].currentimage = this.pages[this.currentpage-1].currentimage;
         }

         this.pages[this.currentpage].draw_image();
         }else{
         if (!this.pages[this.currentpage].vectorloaded){
         this.pages[this.currentpage].loadvectors();
         }

         this.pages[this.currentpage].draw_vector(true);
         }

         drawmarkupAll(cntximg);


         };*/
        this.PageUp = function () {
            /*if (thisdocument.pagelocked){
                return;
            }*/
            var prevpage = this.currentpage;
            if (this.pages[this.currentpage].usepdfjs) {
                if (this.textselect) {
                    this.pages[this.currentpage].PDFTextArea.style.display = "none";
                }
            }
            if (this.currentpage - 1 >= 0) {
                this.currentpage--;
                if (this.pages[this.currentpage].usevector3Dxml) {
                    if (this.pages[this.currentpage].Vector3DPageObj == undefined) {
                        this.pages[this.currentpage].loadvectors3DBinary();
                    }
                    else {
                        /*if (this.pages[this.currentpage].VectorPageObj.width == 0 || this.pages[this.currentpage].VectorPageObj.height == 0) {
                         this.currentpage = prevpage;
                         return;
                         }*/
                        //this.pages[this.currentpage].SetActive();
                        this.restorecurpage = this.currentpage;
                        this.SetActive();
                    }
                }
                else if (this.pages[this.currentpage].usevectorxml) {
                    if (!this.pages[this.currentpage].vectorloaded) {
                        this.pages[this.currentpage].loadbinvectors();
                    }
                    else {
                        if (this.pages[this.currentpage].VectorPageObj.width == 0 || this.pages[this.currentpage].VectorPageObj.height == 0) {
                            this.currentpage = prevpage;
                            return;
                        }
                        this.restorecurpage = this.currentpage;
                        this.SetActive();
                        //this.pages[this.currentpage].draw_vector(true);
                    }
                    //this.pages[this.currentpage].draw_vector(true);
                }
                else if (this.pages[this.currentpage].usepdfjs) {
                    //this.pages[this.currentpage].dscalepdf = this.pages[prevpage].dscalepdf;
                    if (!thisdocument.pagelocked) {
                        this.pages[this.currentpage].dxpdf = this.pages[prevpage].dxpdf;
                        this.pages[this.currentpage].dypdf = 0;
                    }
                    this.pages[this.currentpage].draw_canvas(true);
                    // shortpgupdateloop();
                    pgupdateloop();
                    if (this.textselect) {
                        this.pages[this.currentpage].PDFTextArea.style.display = Globals.szdispvalue;
                    }
                }
                else {
                    if (!this.pages[this.currentpage].largeimageloaded || !this.pages[this.currentpage].smallimageloaded) {
                        if (this.Type == 0) {
                            this.pages[this.currentpage].initialzoom = 2;
                        }
                        this.pages[this.currentpage].loadimages();
                    }
                    this.pages[this.currentpage].checkimageswitch();
                    //this.checkimageswitch();
                    this.pages[this.currentpage].draw_image(true);
                }
                //this.pages[this.currentpage].draw_image();
                drawmarkupAll(Globals.cntximg);
                var stateobj = {
                    iscompare: Globals.documentcompare,
                    numOpenFiles: Globals.OpenFiles.length,
                    isPDF: this.pages[Globals.DocObj.currentpage].usepdfjs,
                    is3D: this.pages[Globals.DocObj.currentpage].usevector3Dxml,
                    is2D: this.pages[Globals.DocObj.currentpage].usevectorxml,
                    numpages: this.pages.length,
                    currentpage: this.currentpage
                };
                /*if (RxCore_GUI_State != undefined) {
                    RxCore_GUI_State.setGUIState(stateobj);
                }*/
                var pagingobject = {
                    numpages: this.pages.length,
                    currentpage: this.currentpage
                };
                if (RxCore_GUI_Page != undefined) {
                    RxCore_GUI_Page.pageEvent(pagingobject);
                }
            }
            this.restorecurpage = this.currentpage;
        };
        this.getpage = function (pagenum:any) {
            return this.pages[pagenum];
        };
        this.lockMarkupbyGUID = function (GUID:any, onOff:any) {
            var i = 0;
            for (i = 0; i < this.markuplist.length; i++) {
                if (this.markuplist[i].uniqueID == GUID) {
                    this.markuplist[i].locked = onOff;
                }
            }
            //return markupobj;
        };
        this.getmarkupbyGUIDXML = function (GUID:any) {
            var i = 0;
            //var markupobj = -1;
            var xmlmarkup = "";
            for (i = 0; i < this.markuplist.length; i++) {
                if (this.markuplist[i].uniqueID == GUID) {
                    xmlmarkup = createxmlmarkupentity(this.markuplist[i], thisdocument);
                }
            }
            return xmlmarkup;
        };
        this.getmarkupobjbyGUID = function (GUID:any) {
            var i = 0;
            var markupobj = -1;
            for (i = 0; i < this.markuplist.length; i++) {
                if (this.markuplist[i].uniqueID == GUID) {
                    markupobj = this.markuplist[i];
                }
            }
            return markupobj;
        };
        this.getmarkupbyGUID = function (GUID:any) {
            var i = 0;
            var markupobj = -1;
            for (i = 0; i < this.markuplist.length; i++) {
                if (this.markuplist[i].uniqueID == GUID) {
                    markupobj = i;
                }
            }
            return markupobj;
        };
        this.getmarkupbynumber = function (markupnumber:any) {
            var i = 0;
            var markupobj = -1;
            for (i = 0; i < this.markuplist.length; i++) {
                if (this.markuplist[i].markupnumber == markupnumber) {
                    markupobj = i;
                }
            }
            return markupobj;
        };
        this.moveselected = function(xdiff:any, ydiff:any){
            for (let i = 0; i < this.markuplist.length; i++) {
                if (this.markuplist[i].selected && this.markuplist[i].pagenumber == this.currentpage) {
                    this.markuplist[i].move(xdiff, ydiff);
                }
            }
        };
        this.draw_mpage = function () {
            var ty = (Globals.canvasoheight / 2);
            switch (this.pages[this.currentpage].currentimage) {
                case 0:
                    if (this.pages[this.currentpage].dy > ty && this.currentpage > 0) {
                        this.currentpage -= 1;
                    }
                    else if (this.pages[this.currentpage].endy < ty && this.currentpage < this.NumPages - 1) {
                        this.currentpage += 1;
                    }
                    this.pages[this.currentpage].draw_image(true);
                    if (this.pages[this.currentpage].endy < Globals.canvasoheight && this.currentpage < this.NumPages - 1) {
                        if (this.pages[this.currentpage + 1].largeimageloaded) {
                            this.pages[this.currentpage + 1].dy = this.pages[this.currentpage].endy + 10;
                            this.pages[this.currentpage + 1].dx = this.pages[this.currentpage].dx;
                            this.pages[this.currentpage + 1].dscale = this.pages[this.currentpage].dscale;
                            this.pages[this.currentpage + 1].draw_image(false);
                        }
                        else {
                            this.loadpage(this.currentpage + 1);
                            this.currentpage += 1;
                        }
                    }
                    else if (this.pages[this.currentpage].dy > 10 && this.currentpage > 0) {
                        if (this.pages[this.currentpage - 1].largeimageloaded) {
                            this.pages[this.currentpage - 1].dy = this.pages[this.currentpage].dy - (this.pages[this.currentpage].MainImageHeight * this.pages[this.currentpage].dscale) - 10;
                            this.pages[this.currentpage - 1].dx = this.pages[this.currentpage].dx;
                            this.pages[this.currentpage - 1].dscale = this.pages[this.currentpage].dscale;
                            this.pages[this.currentpage - 1].draw_image(false);
                        }
                        else {
                            this.loadpage(this.currentpage - 1);
                            this.currentpage -= 1;
                        }
                    }
                    /*else if(thispage.dy > ty && thispage.pagenumber > 0){
                     DocObj.currentpage = thispage.pagenumber - 1;
                     }else if(thispage.dy < ty && thispage.pagenumber < DocObj.NumPages){
                     DocObj.currentpage = thispage.pagenumber + 1;
                     }*/
                    break;
                case 1:
                    //this.pages[this.currentpage].draw_image(true);
                    if (this.pages[this.currentpage].dyextent > ty && this.currentpage > 0) {
                        this.currentpage -= 1;
                    }
                    else if (this.pages[this.currentpage].endy < ty && this.currentpage < this.NumPages - 1) {
                        this.currentpage += 1;
                    }
                    this.pages[this.currentpage].draw_image(true);
                    if (this.pages[this.currentpage].endy < Globals.canvasoheight && this.currentpage < this.NumPages - 1) {
                        if (this.pages[this.currentpage + 1].smallimageloaded) {
                            this.pages[this.currentpage + 1].dy = this.pages[this.currentpage].endy + 10;
                            this.pages[this.currentpage + 1].dx = this.pages[this.currentpage].dx;
                            this.pages[this.currentpage + 1].dscale = this.pages[this.currentpage].dscale;
                            this.pages[this.currentpage + 1].draw_image(false);
                        }
                        else {
                            this.loadpage(this.currentpage + 1);
                            this.currentpage += 1;
                        }
                    }
                    else if (this.pages[this.currentpage].dyextent > 10 && this.currentpage > 0) {
                        if (this.pages[this.currentpage - 1].smallimageloaded) {
                            this.pages[this.currentpage - 1].dy = this.pages[this.currentpage].dy - (this.pages[this.currentpage].MainImageHeight * this.pages[this.currentpage].dscale) - 10;
                            this.pages[this.currentpage - 1].dx = this.pages[this.currentpage].dx;
                            this.pages[this.currentpage - 1].dscale = this.pages[this.currentpage].dscale;
                            this.pages[this.currentpage - 1].draw_image(false);
                        }
                        else {
                            this.loadpage(this.currentpage - 1);
                            this.currentpage -= 1;
                        }
                    }
                    break;
            }
            var stateobj = {
                iscompare: Globals.documentcompare,
                numOpenFiles: Globals.OpenFiles.length,
                isPDF: this.pages[this.currentpage].usepdfjs,
                is3D: this.pages[this.currentpage].usevector3Dxml,
                is2D: this.pages[this.currentpage].usevectorxml,
                numpages: this.pages.length,
                currentpage: this.currentpage
            };
            this.restorecurpage = this.currentpage;
            /*if (RxCore_GUI_State != undefined) {
                RxCore_GUI_State.setGUIState(stateobj);
            }*/
            var pagingobject = {
                numpages: this.pages.length,
                currentpage: this.currentpage
            };
            if (RxCore_GUI_Page != undefined) {
                RxCore_GUI_Page.pageEvent(pagingobject);
            }
        };
        this.updateadjpages = function () {
            if (this.currentpage == 0) {
                if (!this.pages[this.currentpage + 1].pdfisrendered) {
                    this.pages[this.currentpage + 1].queRenderPageScaled();
                }
            }
            if (this.currentpage == this.NumPages - 1) {
                if (!this.pages[this.currentpage - 1].pdfisrendered) {
                    this.pages[this.currentpage - 1].queRenderPageScaled();
                }
            }
            if (this.currentpage > 0 && this.currentpage < this.NumPages - 1) {
                if (!this.pages[this.currentpage + 1].pdfisrendered) {
                    this.pages[this.currentpage + 1].queRenderPageScaled();
                }
                if (!this.pages[this.currentpage - 1].pdfisrendered) {
                    this.pages[this.currentpage - 1].queRenderPageScaled();
                }
            }
        };
        this.draw_mpagepdf = function () {
            var ty = (Globals.canvasoheight / 2);
            var curpage = this.currentpage;
            if (this.pages.length > 1 && !thisdocument.pagelocked) {
                if (this.pages[this.currentpage].dypdf - 10 > ty && this.currentpage > 0) {
                    this.currentpage -= 1;
                    if (this.pages[this.currentpage].pdfisrendered) {
                        //this.updateadjpages();
                    }
                }
                else if (this.pages[this.currentpage].endy + 10 < ty && this.currentpage < this.pages.length - 1) {
                    this.currentpage += 1;
                    if (this.pages[this.currentpage].pdfisrendered) {
                        //this.updateadjpages();
                    }
                }
                /*if(this.pages[this.currentpage].ispagevisible && this.pages[this.currentpage].dscalepdf != 1){
                 this.pages[this.currentpage].queRenderPageScaled();
                 }*/
                this.pages[this.currentpage].draw_canvas(true);
                if (this.pages[this.currentpage].endy < Globals.canvasoheight && this.currentpage < this.pages.length - 1) {
                    if (this.pages[this.currentpage + 1].pageloaded) {
                        this.pages[this.currentpage + 1].dypdf = this.pages[this.currentpage].endy + 10;
                        //this.pages[this.currentpage + 1].dxpdf = this.pages[this.currentpage].dxpdf;
                        //this.pages[this.currentpage + 1].dscalepdf = this.pages[this.currentpage].dscalepdf;
                        /*if(this.pages[this.currentpage + 1].ispagevisible && this.pages[this.currentpage + 1].dscalepdf != 1){
                         this.pages[this.currentpage + 1].queRenderPageScaled();
                         }*/
                        //this.pages[this.currentpage + 1].renderPDFpagescale();
                        //this.pages[this.currentpage + 1].pagecanvas.height = this.pages[this.currentpage].pagecanvas.height;
                        //this.pages[this.currentpage + 1].pagecanvas.width = this.pages[this.currentpage].pagecanvas.width;
                        this.pages[this.currentpage + 1].draw_canvas(false);
                    }
                    else {
                        var dytemppdf = this.pages[this.currentpage].endy + 10;
                        Globals.contexto.fillStyle = "rgb(255,255,255)"; //contexto.fillStyle = "rgb(238,243,250)";
                        Globals.contexto.fillRect(this.pages[0].dxpdf, dytemppdf, this.pages[0].offscreenwidth * this.pages[0].dscalepdf, this.pages[0].offscreenheight * this.pages[0].dscalepdf);
                        this.loadpage(this.currentpage + 1);
                        this.currentpage += 1;
                    }
                }
                else if (this.pages[this.currentpage].dypdf > 10 && this.currentpage > 0) {
                    if (this.pages[this.currentpage - 1].pageloaded) {
                        /*if (this.pages[this.currentpage - 1].dscalepdf != 1){
                         this.pages[this.currentpage - 1].queRenderPageScaled();
                         }*/
                        this.pages[this.currentpage - 1].dypdf = this.pages[this.currentpage].dypdf - (this.pages[this.currentpage - 1].offscreenheight * this.pages[this.currentpage - 1].dscalepdf) - 10;
                        //this.pages[this.currentpage - 1].dxpdf = this.pages[this.currentpage].dxpdf;
                        //this.pages[this.currentpage - 1].dscalepdf = this.pages[this.currentpage].dscalepdf;
                        //this.pages[this.currentpage - 1].renderPDFpagescale();
                        //this.pages[this.currentpage - 1].pagecanvas.height = this.pages[this.currentpage].pagecanvas.height;
                        //this.pages[this.currentpage - 1].pagecanvas.width = this.pages[this.currentpage].pagecanvas.width;
                        /*if(this.pages[this.currentpage - 1].ispagevisible && this.pages[this.currentpage - 1].dscalepdf != 1){
                         this.pages[this.currentpage - 1].queRenderPageScaled();
                         }*/
                        this.pages[this.currentpage - 1].draw_canvas(false);
                    }
                    else {
                        dytemppdf = this.pages[this.currentpage].dypdf - (this.pages[this.currentpage - 1].offscreenheight * this.pages[this.currentpage - 1].dscalepdf) - 10;
                        Globals.contexto.fillStyle = "rgb(255,255,255)"; //contexto.fillStyle = "rgb(238,243,250)";
                        Globals.contexto.fillRect(this.pages[0].dxpdf, dytemppdf, this.pages[0].offscreenwidth * this.pages[0].dscalepdf, this.pages[0].offscreenheight * this.pages[0].dscalepdf);
                        this.loadpage(this.currentpage - 1);
                        this.currentpage -= 1;
                    }
                }
                if (curpage != this.currentpage) {
                    //this.pagechange();
                    // shortpgupdateloop();
                    pgupdateloop();
                }
            }
            else {
                this.pages[this.currentpage].draw_canvas(true);
            }
            if (this.textselect) {
                this.pages[this.currentpage].PDFTextArea.style.display = Globals.szdispvalue;
            }
            var stateobj = {
                iscompare: Globals.documentcompare,
                numOpenFiles: Globals.OpenFiles.length,
                isPDF: this.pages[this.currentpage].usepdfjs,
                is3D: this.pages[this.currentpage].usevector3Dxml,
                is2D: this.pages[this.currentpage].usevectorxml,
                numpages: this.pages.length,
                currentpage: this.currentpage
            };
            this.restorecurpage = this.currentpage;
            /*if (RxCore_GUI_State != undefined) {
                RxCore_GUI_State.setGUIState(stateobj);
            }*/
            var pagingobject = {
                numpages: this.pages.length,
                currentpage: this.currentpage
            };
            if (RxCore_GUI_Page != undefined) {
                if (curpage != this.currentpage) {
                    RxCore_GUI_Page.pageEvent(pagingobject);
                }
            }
        };
        this.Suspend = function () {
            if (thisdocument.pages[thisdocument.currentpage].usevector3Dxml) {
                thisdocument.pages[thisdocument.currentpage].clock.stop();
                Globals.renderer.clippingPlanes = Globals.Empty;
                Globals.renderer.domElement.style.visibility = 'hidden';
                Globals.bAnimateready = false;
                if (RxCore_GUI_3DParts != undefined) {
                    RxCore_GUI_3DParts.isupdate = false;
                    RxCore_GUI_3DParts.set3DParts([]);
                }
            }
        };
        this.SetActive = function (ref:any) {
            var compare = false;
            thisdocument.currentpage = thisdocument.restorecurpage;
            if (thisdocument.pages.length == 0) {
                return false;
            }
            if (ref) {
                if (ref.Type == 'Compare') {
                    compare = true;
                    this.disableMenu = true;
                    this.Drawmarkup = false;
                    thisdocument.restorecurpage = thisdocument.currentpage;
                    thisdocument.currentpage = ref.currentpage;
                }
            }
            //backgroundColor = this.backgroundColor;
            this.bActive = true;
            Globals.renderer.clippingPlanes = Globals.Empty;
            Globals.renderer.domElement.style.visibility = 'hidden';
            Globals.bAnimateready = false;
            Globals.documentcompare = compare;
            if (thisdocument.pages[thisdocument.currentpage].usevectorxml) {
                setSmoothingEnabled(false);
                if (!compare) {
                    thisdocument.pages[thisdocument.currentpage].restoreScaleAndOffset();
                    thisdocument.pages[thisdocument.currentpage].VectorPageObj.setActive();
                    /*if (RxCore_GUI_VectorLayers != undefined) {
                        RxCore_GUI_VectorLayers.setVectorLayers(thisdocument.pages[thisdocument.currentpage].VectorPageObj.layerlist);
                    }
                    if (RxCore_GUI_VectorBlocks != undefined) {
                        RxCore_GUI_VectorBlocks.setVectorBlocks(thisdocument.pages[thisdocument.currentpage].VectorPageObj.blocklist);
                    }*/
                    for (var p = 0; p < thisdocument.pages.length; p++) {
                        thisdocument.pages[p].usedincomposite = false;
                        if (thisdocument.pages[p].VectorPageObj) {
                            thisdocument.pages[p].VectorPageObj.docompare = false;
                        }
                    }
                    this.disableMenu = false;
                    this.setactive = false;
                    this.Drawmarkup = true;
                    thisdocument.pages[thisdocument.currentpage].draw_vector(true);
                }
                // contexto.imageSmoothingEnabled = false;
                // contexto.mozImageSmoothingEnabled = false;
                // //contexto.webkitImageSmoothingEnabled = false;
                // contexto.msImageSmoothingEnabled = false;
                drawmarkupAll(Globals.cntximg);
                RxCore_default();
            }
            else if (thisdocument.pages[thisdocument.currentpage].usevector3Dxml) {
                thisdocument.pages[thisdocument.currentpage].clock.start();
                Globals.renderer.domElement.style.visibility = 'visible';
                //check if this is needed.
                Globals.documentcompare = false;
                if (thisdocument.pages[thisdocument.currentpage].Vector3DPageObj.clippingOn) {
                    Globals.renderer.clippingPlanes = thisdocument.pages[thisdocument.currentpage].Vector3DPageObj.globalPlanes;
                }
                else {
                    Globals.renderer.clippingPlanes = Globals.Empty;
                }
                Globals.bAnimateready = true;
                if (RxCore_GUI_3DParts != undefined) {
                    RxCore_GUI_3DParts.isupdate = false;
                    RxCore_GUI_3DParts.set3DParts(thisdocument.pages[thisdocument.currentpage].Vector3DPageObj.blocklist);
                }
                switch (thisdocument.curcontrol3D) {
                    case 'orbitControl':
                        //RxCore_3DOrbit();
                        if (Globals.tool == undefined) {
                            set_tool('orbitControl', {});
                            //tool = new tools['orbitControl']();
                            thisdocument.curcontrol3D = 'orbitControl';
                        }
                        else {
                            set_tool('orbitControl', {});
                            //tool = new tools['orbitControl']();
                            thisdocument.curcontrol3D = 'orbitControl';
                        }
                        if (RxCore_GUI_3DWalkthrough != undefined) {
                            RxCore_GUI_3DWalkthrough.setWalkthroughGUI(false);
                        }
                        break;
                    case 'Walkthrough3D':
                        if (Globals.tool == undefined) {
                        }
                        set_tool('Walkthrough3D', {});
                        //tool = new tools['Walkthrough3D']();
                        thisdocument.curcontrol3D = 'Walkthrough3D';
                        if (RxCore_GUI_3DWalkthrough != undefined) {
                            RxCore_GUI_3DWalkthrough.setWalkthroughGUI(true);
                        }
                        //RxCore_3DWalkThrough(true);
                        break;
                }
                //var toolType = thisdocument.curcontrol3D;
                //tool = new tools[toolType]();
            }
            else if (thisdocument.pages[thisdocument.currentpage].usepdfjs) {
                setSmoothingEnabled(false);
                // contexto.imageSmoothingEnabled = false;
                // contexto.mozImageSmoothingEnabled = false;
                // //contexto.webkitImageSmoothingEnabled = false;
                // contexto.msImageSmoothingEnabled = false;
                if (!compare) {
                    thisdocument.pages[thisdocument.currentpage].restoreScaleAndOffset();
                    thisdocument.pages[thisdocument.currentpage].draw_canvas(true);
                    this.disableMenu = false;
                    this.Drawmarkup = true;
                    drawmarkupAll(Globals.cntximg);
                }
                //thisdocument.pages[thisdocument.currentpage].draw_canvas(true);
                //drawmarkupAll(cntximg);
                RxCore_default();
            }
            else {
                setSmoothingEnabled(true);
                if (!compare) {
                    thisdocument.pages[thisdocument.currentpage].restoreScaleAndOffset();
                    thisdocument.pages[thisdocument.currentpage].resetimage();
                    this.disableMenu = false;
                    this.Drawmarkup = true;
                    drawmarkupAll(Globals.cntximg);
                }
                thisdocument.pages[thisdocument.currentpage].draw_image(true);
                RxCore_default();
            }
            if (RxCore_GUI_Markuplist != undefined) {
                RxCore_GUI_Markuplist.setMarkupList(thisdocument.markuplist);
            }
            if (RxCore_GUI_pagethumbs != undefined) {
                RxCore_GUI_pagethumbs.setThumbnails(thisdocument.thumbnails);
            }
            var stateobj = {
                iscompare: Globals.documentcompare,
                numOpenFiles: Globals.OpenFiles.length,
                isPDF: this.pages[this.currentpage].usepdfjs,
                is3D: this.pages[this.currentpage].usevector3Dxml,
                is2D: this.pages[this.currentpage].usevectorxml,
                numpages: this.pages.length,
                currentpage: this.currentpage,
                disableMenu: this.disableMenu || false
            };
            if (RxCore_GUI_State != undefined) {
                RxCore_GUI_State.setGUIState(stateobj);
            }
            if (RxCore_GUI_HasText != undefined) {
                RxCore_GUI_HasText.hastext = thisdocument.hastext;
                RxCore_GUI_HasText.hasText(RxCore_GUI_HasText.hastext);
            }
            var pagingobject = {
                numpages: this.pages.length,
                currentpage: this.currentpage
            };
            if (RxCore_GUI_Page != undefined) {
                RxCore_GUI_Page.pageEvent(pagingobject);
            }
            return true;
        };
        this.enableTextSelect = function (onoff:any) {
            thisdocument.textselect = onoff;
            var curpage = 0;
            while (curpage < thisdocument.pages.length) {
                if (thisdocument.pages[curpage].usepdfjs) {
                    if (!onoff) {
                        //turn visibilty off for all page text divs.
                        thisdocument.pages[curpage].PDFTextArea.style.display = "none";
                    }
                }
                if (thisdocument.pages[curpage].usevectorxml) {
                    if (!onoff) {
                        thisdocument.pages[curpage].TextSelectArea.style.display = "none";
                    }
                }
                curpage++;
            }
            if (onoff) {
                if (thisdocument.pages[thisdocument.currentpage].usepdfjs) {
                    thisdocument.pages[thisdocument.currentpage].PDFTextArea.style.display = Globals.szdispvalue;
                }
                if (thisdocument.pages[thisdocument.currentpage].usevectorxml) {
                    thisdocument.pages[thisdocument.currentpage].cleartextdivs();
                    thisdocument.pages[thisdocument.currentpage].settextdivs();
                    thisdocument.pages[thisdocument.currentpage].TextSelectArea.style.display = Globals.szdispvalue;
                }
            }
        };
        this.Close = function () {
            //console.log('Close');
            thisdocument.bActive = false;
            while (thisdocument.pages.length != 0) {
                if (thisdocument.pages[thisdocument.pages.length - 1].usepdfjs) {
                    if (thisdocument.pages[thisdocument.pages.length - 1].pdfisfirstrendered) {
                        clearInterval(thisdocument.pages[thisdocument.pages.length - 1].pdftimervar);
                        //this.pages[this.currentpage].PDFTextArea.style.display = "initial";
                        thisdocument.pages[thisdocument.pages.length - 1].PDFTextArea.removeEventListener('wheel', ev_canvas, true);
                        Globals.rxcontainer.removeChild(thisdocument.pages[thisdocument.pages.length - 1].PDFTextArea);
                    }
                }
                if (thisdocument.pages[thisdocument.pages.length - 1].usevectorxml) {
                    clearInterval(thisdocument.pages[thisdocument.pages.length - 1].vectortimervar);
                    thisdocument.textselect = false;
                    //thisdocument.pages[thisdocument.pages.length - 1].selecttext();
                    Globals.rxcontainer.appendChild(thisdocument.pages[thisdocument.pages.length - 1].TextSelectArea);
                    Globals.rxcontainer.removeChild(thisdocument.pages[thisdocument.pages.length - 1].TextSelectArea);
                    //thisdocument.pages[thisdocument.pages.length - 1].removetext();
                    if (thisdocument.pages[thisdocument.pages.length - 1].VectorPageObj != undefined) {
                        thisdocument.pages[thisdocument.pages.length - 1].VectorPageObj.Close();
                    }
                    var emptylist:any = [];
                    if (RxCore_GUI_VectorLayers != undefined) {
                        RxCore_GUI_VectorLayers.setVectorLayers(emptylist);
                    }
                    if (RxCore_GUI_VectorBlocks != undefined) {
                        RxCore_GUI_VectorBlocks.setVectorBlocks(emptylist);
                    }
                }
                if (thisdocument.pages[thisdocument.pages.length - 1].usevector3Dxml) {
                    //renderer.clear();
                    Globals.renderer.domElement.style.visibility = 'hidden';
                    if (RxCore_GUI_3DWalkthrough != undefined) {
                        RxCore_GUI_3DWalkthrough.setWalkthroughGUI(false);
                    }
                    Globals.bAnimateready = false;
                    if (thisdocument.pages[thisdocument.pages.length - 1].Vector3DPageObj != undefined) {
                        thisdocument.pages[thisdocument.pages.length - 1].Vector3DPageObj.Close();
                        thisdocument.pages[thisdocument.pages.length - 1].Vector3DPageObj = null;
                    }
                    var empty3dpartlist:any = [];
                    if (RxCore_GUI_3DParts != undefined) {
                        RxCore_GUI_3DParts.isupdate = false;
                        RxCore_GUI_3DParts.set3DParts(empty3dpartlist);
                    }
                }
                thisdocument.pages.pop();
            }
            if (thisdocument.pdfDoc != null) {
                thisdocument.pdfDoc.destroy();
            }
            thisdocument.pdfDoc = null;
            while (this.markupundolist.length != 0) {
                this.markupundolist.pop();
            }
            while (this.markuplist.length != 0) {
                this.markuplist.pop();
            }
            while (this.layouts.length != 0) {
                this.layouts.pop();
            }
            while (this.thumbnails.length != 0) {
                this.thumbnails.pop();
            }
            if (RxCore_GUI_Markuplist != undefined) {
                RxCore_GUI_Markuplist.setMarkupList(this.markuplist);
                // RxCore_GUI_Markuplist.notify();
            }
            if (RxCore_GUI_pagethumbs != undefined) {
                RxCore_GUI_pagethumbs.setThumbnails(this.thumbnails);
            }
        };
        function yieldingLoop(state:any, chunksize:any, callback:any, finished:any) {
            (function chunk() {
                var i = 0;
                var endloop = false;
                //var end = Math.min(i + chunksize, count);
                var end = (i < chunksize );
                for (; i < chunksize; ++i) {
                    callback.call(null, state);
                    if (state.bpageshort){
                        if (state.pagearray.length == 0){
                            endloop = true;
                            break;
                        }
                    }else{
                        if(state.pagenum == thisdocument.pages.length - 1){
                            endloop = true;
                            break;
                        }

                    }

                }
                if (state.pagenum != (thisdocument.pages.length - 1) || !endloop) {

                    setTimeout(chunk, 10);
                } else {

                    finished.call(null);
                }
            })();
        }
    }
}
