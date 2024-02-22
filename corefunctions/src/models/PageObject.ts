import * as THREE from 'three';

// TODO:JS->TS:FIX fix dependency. Find out where is this defined
declare var pdfjsWebLibs:any;

import {
    Globals,

    point,

    DeactivateAll,
    printCanvas,
    ev_canvas,
    drawpoints,
    doResize,
    RxCore_default,
    RxCore_3DOrbit,
    comparecheck,
    RxCore_GetOpenFiles,
    RxCore_Closedocument,
    getMarkup,
    getMarkupFilelist,
    getMarkupbyReference,
    getMarkupxmlurl,
    drawmarkupMagnify,
    drawmarkupAll,
    DrawMarkupSelected,
    drawmarkupPrint,
    convertHexrgb,
    rect_rotated,
    mouse_rotated,
    rotate_point,
    // RxCore_GUI_2DBlockID,
    // RxCore_GUI_2DBlockInfo,
    Rxcore_GUI_3DPartInfo,
    // RxCore_GUI_3DParts,
    // RxCore_GUI_Read3DComplete,
    // RxCore_GUI_3DWalkthrough,
    // RxCore_GUI_Calibratediag,
    // RxCore_GUI_CalibrateComplete,
    // RxCore_GUI_CompareDiag,
    // RxCore_GUI_CompareAlign,
    // RxCore_GUI_CompareMeasure,
    // RxCore_GUI_Consolidate,
    // RxCore_GUI_Permissions,
    // RxCore_GUI_PDFBookmarks,
    RxCore_GUI_Download,
    // Rxcore_GUI_exportComplete,
    // RxCore_GUI_FileInfo,
    Rxcore_GUI_fileLoadComplete,
    // Rxcore_GUI_markupLoadComplete,
    // RxCore_GUI_Markup,
    // RxCore_GUI_MarkupLayers,
    // RxCore_GUI_Markuplist,
    // RxCore_GUI_MarkupLink,
    // RxCore_GUI_MarkupUnselect,
    // RxCore_GUI_Measurediag,
    // RxCore_GUI_Notediag,
    Rxcore_GUI_pageLoadComplete,
    Rxcore_GUI_pagedimLoadComplete,
    Rxcore_GUI_PDFRenderComplete,
    // RxCore_GUI_pagethumbs,
    // RxCore_GUI_Resize,
    // RxCore_GUI_Stamps,
    // RxCore_GUI_CustomStamps,
    // RxCore_GUI_Symbols,
    // RxCore_GUI_State,
    // RxCore_GUI_Page,
    // RxCore_GUI_PagePosition,
    RxCore_GUI_PanUpdate,
    RxCore_GUI_PanUpdated,
    // RxCore_GUI_Textdiag,
    // RxCore_GUI_TextInput,
    // RxCore_GUI_Upload,
    // RxCore_GUI_Users,
    // RxCore_GUI_VectorBlocks,
    // RxCore_GUI_VectorLayers,
    RxCore_GUI_ZoomUpdate,
    RxCore_GUI_ZoomUpdated,
    // RxCore_GUI_MarkupSave,
    // RxCore_GUI_Ready,
    RxCore_GUI_RotatePage,
    RxCore_GUI_HasText,
    // RxCore_GUI_NumMathces,
    // RxCore_GUI_printpage,
    // RxCore_GUI_printCompare,
    // RxCore_GUI_markupdrawParams,
    // RxCore_GUI_markupParamsError
    VectorPageObject,
    Vector3DPageObject,
    FirstPersonControl
} from '../internal';

/*

TODO:JS->TS:FIX
TODO:JS->TS:CHECK
TODO:JS->TS:ADJUST
TODO:JS->TS:PERFORMANCE

variable names
property names
property initialisations
recheck/add proper types
extract XMLHttpRequests
try to avoid dependency on Globals
remove unused/commented out code
recheck/add proper accessors ( public, private, protected)
extract utility methods that are unrelated to the PageObject
extract/try to reduce duplicate code
*/


export class PageObject {
    pagexml:any = {};
    LayoutName:string='';
    firstpage:any;
    path:string='';
    pagenumber:number=0;
    relpath:string='';
    DocRef:any = null;
    camera:any = null;
    walkthroughcontrol:any = {};
    currentimage: number = 1;
    dx: number;
    dy: number;
    dscale: number;
    initialscale: number;
    measurescale: number;
    dxvector: number;
    dyvector: number;
    dxpdf: number;
    dypdf: number;
    dscalepdf: number;
    dscalebackup: number;
    pdfpageref: null;
    magnifyrestscale: number;
    dscalepdfabs: number;
    dxbackup: number;
    dybackup: number;
    curpagescale: number;
    curpagescalebackup: number;
    pdfpageheight: number;
    pdfpagewidth: number;
    bMaxzoom: boolean;
    bMinzoom: boolean;
    nPDFMaxFactor: number;
    pdfisrendered: boolean;
    pdfrenderopque: number;
    pdfisfirstrendered: boolean;
    iscollapsed: boolean;
    offscreenwidth: number;
    offscreenheight: number;
    pdfstartrender: number;
    pdfendrender: number;
    pdfpagetime: number;
    pdftimervar: any = undefined;
    PDFTextArea: any = undefined;
    PDFPointArray: any = [] as any[];
    PDFinternalScale: any;
    PDFpageRotate: number;
    pdfSnapScale: number;
    TextSelectArea: any = undefined;
    snapEnabled: boolean;
    dscalevector: number;
    fixedScale: number;
    vectorisrendered: boolean;
    vectorischanged: boolean;
    vectorstartrender: number;
    vectorendrender: number;
    vectorpagetime: number;
    vectortimervar: any;
    bDorescaleonsizeChange: boolean;
    width: number;
    height: number;
    originalwidth: number;
    originalheight: number;
    initialzoom: number;
    visible: boolean;
    usedincomposite: boolean;
    compositereference: any = undefined;
    compositePrintreference: any = undefined;
    isbackground: boolean;
    isoverlay: boolean;
    dxextent: number = 0;
    dyextent: number = 0;
    startx: number;
    starty: number;
    endx: number;
    endy: number;
    dscaleextent: number;
    bitmapratio: number;
    dxprint: number;
    dyprint: number;
    dscaleprint: number;
    dxthumb: number;
    dythumb: number;
    dxthumbtemp: number;
    dythumbtemp: number;
    dscalethumb: number;
    pdftempthumbscale: number;
    drotation: number;
    pagelockrotation: number;
    textsearchindx: number;
    usevectorxml: boolean;
    usevectorbinary: boolean;
    usepdfjs: boolean;
    usevector3Dxml: boolean;
    usevector3Dbinary: boolean;
    has3Dnav: boolean;
    pageloaded: boolean;
    pdfdiminitset: boolean;
    VectorPageObj: any = {};
    Vector3DPageObj: any = {};
    VectorPartfilelist: any[] = [];
    VectorBPartfilelist: any[] = [];
    largeimage: HTMLImageElement;
    smallimage: HTMLImageElement;
    smallimageloaded: boolean;
    largeimageloaded: boolean;
    vectorloaded: boolean;
    thumbnnailloaded: boolean;
    CurrentMarkup: number;
    PageName: any;
    Compression: any;
    DPI: any;
    OffsetX: any;
    OffsetY: any;
    OriginalScale: any;
    Vector2DBinarySRC: string = '';
    Vector2DSRC: string = '';
    Vector3DBinarySRC: string = '';
    Navigator3DSRC: string = '';
    Vector3DSRC: string = '';
    pagedrawCanvas: HTMLCanvasElement = {} as HTMLCanvasElement;
    pagedrawctx: CanvasRenderingContext2D | null = null;
    pagecanvas: HTMLCanvasElement = {} as HTMLCanvasElement;
    pagectx: CanvasRenderingContext2D | null = null;
    magnifycanvas: HTMLCanvasElement = {} as HTMLCanvasElement;
    magnifypagectx: CanvasRenderingContext2D | null=null;
    pageRendering: boolean=false;
    pagePrinting: boolean=false;
    pageNumPending: number|null=null;
    pagescale: number=1;
    markupscaleadjust: number=0;
    pdfdxtemp: number=0;
    pdfdytemp: number=0;
    pdfdscaletemp: number=0;
    MainImageSRC: string = '';
    SmallImageSRC: string ='';
    SmallImageWidth: any;
    SmallImageHeight: any;
    SmallImageScaling: any;
    ThumbnailImageSRC: any;
    MainImageWidth: any;
    MainImageHeight: any;
    MainImageScaling: any;
    MainImageOffsetX: any;
    MainImageOffsetY: any;
    largeimagecnv: HTMLCanvasElement;
    largeimagectx: any; // CanvasRenderingContext2D | null;
    smallimagecnv: HTMLCanvasElement;
    smallimagectx: any; // CanvasRenderingContext2D | null;
    ThumbnailWidth: any;
    ThumbnailHeight: any;
    thumbcanvas: HTMLCanvasElement;
    thumbctx: CanvasRenderingContext2D | null;
    thumbloaded: boolean;
    thumbnailobj: any = {} as any; // { thumbnail: HTMLCanvasElement; image: HTMLImageElement; canvasSource: HTMLImageElement; source: any; name: any; number: number; displaynum: number; draw: (ctx: any) => void; };
    printcanvas: HTMLCanvasElement;
    printctx: CanvasRenderingContext2D | null;
    print3Dimage: HTMLImageElement;
    printobj: any = {} as any;

    textLayer: any = undefined as any; // TODO:JS->TS:INFO added this property since it was used in renderPDFpagescale ...
    bisLastPart: boolean = false; // TODO:JS->TS:CHECK this does not appear to be used
    nPartfilesLoaded: number = 0; // TODO:JS->TS:CHECK this does not appear to be used
    getThumbnail: () => any;
    cleanupAfterRender: boolean = false; // TODO:JS->TS:CHECK this property seems to be written in 4 places but does not appear to be read, checked or used

    constructor (pagexml:any, LayoutName:string, firstpage:any, path:string, pagenum:number) {
        // var thispage = this; // JS->TS:INFO commented out. References have been replaced with 'this'.

        this.relpath = Globals.xmlurlrel;
        if(Globals.bUseCustomrelpath){
            this.relpath = Globals.xmlurlrelcustom;
        }

        this.DocRef = null;
        this.pagenumber = pagenum;
        this.firstpage = firstpage;
        // 0 = large 1=small
        this.camera = null;
        this.walkthroughcontrol = {};

        this.currentimage = 1;

        //large image scale and offset
        this.dx = 0.0;
        this.dy = 0.0;
        this.dscale = 1.0;
        this.initialscale = 1.0;
        this.measurescale = Globals.MeasureScale;

        //vector image scale and offset
        this.dxvector = 0.0;
        this.dyvector = 0.0;

        this.dxpdf = 0.0;
        this.dypdf = 0.0;
        this.dscalepdf = 1.0;
        this.dscalebackup = 1.0;
        this.pdfpageref = null;

        this.magnifyrestscale = 1.0;
        this.dscalepdfabs = 1.0;

        this.dxbackup = 0.0;
        this.dybackup = 0.0;

        this.curpagescale = 1.0;
        this.curpagescalebackup = 1.0;
        this.pdfpageheight = 0.0;
        this.pdfpagewidth = 0.0;
        this.bMaxzoom = false;
        this.bMinzoom = false;
        this.nPDFMaxFactor = 4.0;

        this.pdfisrendered = false;
        this.pdfrenderopque = 0;
        this.pdfisfirstrendered = false;

        this.iscollapsed = true;
        this.offscreenwidth = 0.0;
        this.offscreenheight = 0.0;

        this.pdfstartrender = -1;
        this.pdfendrender = -1;
        this.pdfpagetime = -1;
        this.pdftimervar = null;
        this.PDFTextArea = undefined;
        this.PDFPointArray = [];
        this.PDFinternalScale = 1.0;
        this.PDFpageRotate = 0;
        this.pdfSnapScale = 1.0;
        this.TextSelectArea = undefined;

        this.snapEnabled = false;

        this.dscalevector = 1.0;
        this.fixedScale = 1.0;
        this.vectorisrendered = false;
        this.vectorischanged = false;
        this.vectorstartrender = -1;
        this.vectorendrender = -1;
        this.vectorpagetime = -1;
        this.vectortimervar = null;
        this.bDorescaleonsizeChange = Globals.bDoReScaleOnSize;
        this.width = 0;
        this.height = 0;
        // universal page original width and height
        this.originalwidth = 0;
        this.originalheight = 0;

        // this.dscalevector = 1.0;
        this.initialzoom = 1;
        this.visible = false;

        //composite properties and reference.
        this.usedincomposite = false;
        this.compositereference = undefined;
        this.compositePrintreference = undefined;
        this.isbackground = false;
        this.isoverlay = false;

        //small image scale and offset
        this.dxextent = 0.0;
        this.dyextent = 0.0;
        this.startx = 0.0;
        this.starty = 0.0;
        this.endx = 0.0;
        this.endy = 0.0;
        this.dscaleextent = 1.0;
        this.bitmapratio = 1.0;

        //print scale and offset factors.
        this.dxprint = 0.0;
        this.dyprint = 0.0;
        this.dscaleprint = 1.0;

        //canvas thumbnail scale and offset.
        this.dxthumb=0.0;
        this.dythumb=0.0;
        this.dxthumbtemp=0.0;
        this.dythumbtemp=0.0;


        this.dscalethumb=1.0;
        this.pdftempthumbscale=1.0;

        this.drotation = 0;
        this.pagelockrotation = 0;
        this.textsearchindx = 0;
        this.usevectorxml = false;
        this.usevectorbinary = false;
        this.usepdfjs = false;
        this.usevector3Dxml = false;
        this.usevector3Dbinary = false;
        this.has3Dnav = false;
        this.pageloaded = false;
        this.pdfdiminitset = false;
        this.VectorPageObj = undefined;
        this.Vector3DPageObj = undefined;
        this.VectorPartfilelist = [];
        this.VectorBPartfilelist = [];

        this.largeimage = document.createElement('img'); //new Image();
        this.smallimage = document.createElement('img'); //new Image();
        this.smallimageloaded = false;
        this.largeimageloaded = false;
        this.vectorloaded = false;
        this.thumbnnailloaded = false;
        //this.imagethumb = document.createElement('img');//new Image();

        this.CurrentMarkup = 0;
        //MarkupZoom

        this.LayoutName = LayoutName;
        let arrayBuffer = null;
        if (pagexml.getElementsByTagName("PageName")[0] != undefined) {
            this.PageName = pagexml.getElementsByTagName("PageName")[0].firstChild.nodeValue;
        } else {
            this.PageName = LayoutName;
        }
        if (pagexml.getElementsByTagName("Compression")[0] != undefined) {
            this.Compression = pagexml.getElementsByTagName("Compression")[0].firstChild.nodeValue;
        }
        if (pagexml.getElementsByTagName("DPI")[0] != undefined) {
            this.DPI = pagexml.getElementsByTagName("DPI")[0].firstChild.nodeValue;
        }

        if (pagexml.getElementsByTagName("OffsetX")[0] != undefined) {
            this.OffsetX = pagexml.getElementsByTagName("OffsetX")[0].firstChild.nodeValue;
        }
        if (pagexml.getElementsByTagName("OffsetY")[0] != undefined) {
            this.OffsetY = pagexml.getElementsByTagName("OffsetY")[0].firstChild.nodeValue;
        }

        if (pagexml.getElementsByTagName("OriginalScale")[0] != undefined) {
            this.OriginalScale = pagexml.getElementsByTagName("OriginalScale")[0].firstChild.nodeValue;
        }

        if (pagexml.getElementsByTagName("VectorBinary2DSRC")[0] != undefined) {
            this.Vector2DBinarySRC = encodeURI(this.relpath + pagexml.getElementsByTagName("VectorBinary2DSRC")[0].firstChild.nodeValue);
            this.usevectorbinary = true;


        }
        if (pagexml.getElementsByTagName("Vector2DSRC")[0] != undefined) {
            this.Vector2DSRC = encodeURI(this.relpath + pagexml.getElementsByTagName("Vector2DSRC")[0].firstChild.nodeValue);
            if (!this.usevectorbinary) {
                this.usevectorxml = true;
            }

            //this.VectorDisplaylist = new VectorDisplaylist(this.Vector2DSRC);
        }
        //VectorBinary3DSRC
        if (pagexml.getElementsByTagName("VectorBinary3DSRC")[0] != undefined) {
            this.Vector3DBinarySRC = encodeURI(this.relpath + pagexml.getElementsByTagName("VectorBinary3DSRC")[0].firstChild.nodeValue);
            this.usevector3Dbinary = true;
            if (pagexml.getElementsByTagName("Navigator3DSRC")[0] != undefined) {
                this.Navigator3DSRC = encodeURI(this.relpath + pagexml.getElementsByTagName("Navigator3DSRC")[0].firstChild.nodeValue);
                this.has3Dnav = true;
            }

            /*if(pagexml.getElementsByTagName("Parts3D")[0] != undefined){
            var part3Dbinaryobj = pagexml.getElementsByTagName("SRC");
            for(j=0;j<part3Dbinaryobj.length;j++){
            this.VectorBPartfilelist[j] = encodeURI(xmlurlrel + part3Dxmlobj[j].firstChild.nodeValue);
            }
            }*/
            //this.VectorDisplaylist = new VectorDisplaylist(this.Vector2DSRC);
        }
        if (pagexml.getElementsByTagName("Vector3DSRC")[0] != undefined) {
            this.Vector3DSRC = encodeURI(this.relpath + pagexml.getElementsByTagName("Vector3DSRC")[0].firstChild.nodeValue);
            if (!this.usevector3Dbinary) {
                this.usevector3Dxml = true;
            }


            if (pagexml.getElementsByTagName("Parts3D")[0] != undefined) {
                const part3Dxmlobj = pagexml.getElementsByTagName("SRC");
                for (let j = 0; j < part3Dxmlobj.length; j++) {
                    this.VectorPartfilelist[j] = encodeURI(this.relpath + part3Dxmlobj[j].firstChild.nodeValue);
                }
            }
            //this.VectorDisplaylist = new VectorDisplaylist(this.Vector2DSRC);
        }

        if(Globals.DocObj.Type == "3" || Globals.DocObj.Type == "7"){
            this.TextSelectArea = document.createElement('div');
            this.TextSelectArea.className = "textLayer";
            //this.TextSelectArea.id = "Page" + this.pagenumber;
            this.TextSelectArea.addEventListener('wheel', ev_canvas, true);
            this.TextSelectArea.style.display = "none";

        }

        const szformatshort = Globals.DocObj.Format.substring(0, 9);
        if (szformatshort == "Adobe PDF") {
            this.usepdfjs = true;
            this.pagedrawCanvas = document.createElement('canvas');
            this.pagedrawctx = this.pagedrawCanvas.getContext('2d');
            this.pagecanvas = document.createElement('canvas');
            this.pagectx = this.pagecanvas.getContext('2d');
            this.magnifycanvas = document.createElement('canvas');
            this.magnifypagectx = this.magnifycanvas.getContext('2d');

            this.pageRendering = false;
            this.pagePrinting = false;
            this.pageNumPending = null;
            this.pagescale = 1.5;
            this.markupscaleadjust = 1.0;
            this.pdfdxtemp = 0.0;
            this.pdfdytemp = 0.0;
            this.pdfdscaletemp = 0.0;
            this.PDFTextArea = document.createElement('div');
            this.PDFTextArea.className = "textLayer";
            this.PDFTextArea.addEventListener('wheel', ev_canvas, true);
        } else {
            if (pagexml.getElementsByTagName("MainImageSRC")[0] != undefined) {
                this.MainImageSRC = encodeURI(this.relpath + pagexml.getElementsByTagName("MainImageSRC")[0].firstChild.nodeValue);
            }
            if (pagexml.getElementsByTagName("SmallImageSRC")[0] != undefined) {
                this.SmallImageSRC = encodeURI(this.relpath + pagexml.getElementsByTagName("SmallImageSRC")[0].firstChild.nodeValue);
            }
            if (pagexml.getElementsByTagName("SmallImageWidth")[0] != undefined) {
                this.SmallImageWidth = pagexml.getElementsByTagName("SmallImageWidth")[0].firstChild.nodeValue;
            }
            if (pagexml.getElementsByTagName("SmallImageHeight")[0] != undefined) {
                this.SmallImageHeight = pagexml.getElementsByTagName("SmallImageHeight")[0].firstChild.nodeValue;
            }
            if (pagexml.getElementsByTagName("SmallImageScaling")[0] != undefined) {
                this.SmallImageScaling = pagexml.getElementsByTagName("SmallImageScaling")[0].firstChild.nodeValue;
            }
        }


        //this.MainImageSRC = encodeURI(relpath  + pagexml.getElementsByTagName("MainImageSRC")[0].firstChild.nodeValue);
        //this.SmallImageSRC = encodeURI(relpath + pagexml.getElementsByTagName("SmallImageSRC")[0].firstChild.nodeValue);
        if (pagexml.getElementsByTagName("ThumbnailImageSRC")[0] != undefined) {

            if(pagexml.getElementsByTagName("ThumbnailImageSRC")[0].firstChild != undefined){
                this.ThumbnailImageSRC = this.relpath + pagexml.getElementsByTagName("ThumbnailImageSRC")[0].firstChild.nodeValue;
            }
        }
        if (pagexml.getElementsByTagName("MainImageWidth")[0] != undefined) {
            this.MainImageWidth = pagexml.getElementsByTagName("MainImageWidth")[0].firstChild.nodeValue;
        }

        if (pagexml.getElementsByTagName("MainImageHeight")[0] != undefined) {
            this.MainImageHeight = pagexml.getElementsByTagName("MainImageHeight")[0].firstChild.nodeValue;
        }

        if (pagexml.getElementsByTagName("MainImageScaling")[0] != undefined) {
            this.MainImageScaling = pagexml.getElementsByTagName("MainImageScaling")[0].firstChild.nodeValue;
        }
        if (pagexml.getElementsByTagName("MainImageOffsetX")[0] != undefined) {
            this.MainImageOffsetX = pagexml.getElementsByTagName("MainImageOffsetX")[0].firstChild.nodeValue;
        }
        if (pagexml.getElementsByTagName("MainImageOffsetY")[0] != undefined) {
            this.MainImageOffsetY = pagexml.getElementsByTagName("MainImageOffsetY")[0].firstChild.nodeValue;
        }

        //this.SmallImageWidth = pagexml.getElementsByTagName("SmallImageWidth")[0].firstChild.nodeValue;
        //this.SmallImageHeight = pagexml.getElementsByTagName("SmallImageHeight")[0].firstChild.nodeValue;
        //this.SmallImageScaling = pagexml.getElementsByTagName("SmallImageScaling")[0].firstChild.nodeValue;

        this.largeimagecnv = document.createElement('canvas');
        this.largeimagectx = this.largeimagecnv.getContext('2d');
        this.smallimagecnv = document.createElement('canvas');
        this.smallimagectx = this.smallimagecnv.getContext('2d');

        if (pagexml.getElementsByTagName("ThumbnailWidth")[0] != undefined) {
            this.ThumbnailWidth = pagexml.getElementsByTagName("ThumbnailWidth")[0].firstChild.nodeValue;
        }
        if (pagexml.getElementsByTagName("ThumbnailWidth")[0] != undefined) {
            this.ThumbnailHeight = pagexml.getElementsByTagName("ThumbnailHeight")[0].firstChild.nodeValue;
        }

        this.thumbcanvas = document.createElement('canvas');
        this.thumbcanvas.width = parseInt(this.ThumbnailWidth);
        this.thumbcanvas.height = parseInt(this.ThumbnailHeight);
        this.thumbctx = this.thumbcanvas.getContext('2d');

        this.thumbloaded = Globals.bAutoloadThumbnails;

        this.thumbnailobj = {
            thumbnail : document.createElement('canvas'),
            image : document.createElement('img'),
            canvasSource : document.createElement('img'),
            source : Globals.bAutoloadThumbnails ? this.ThumbnailImageSRC : null,
            name : this.PageName,
            number :pagenum,
            displaynum :  pagenum + 1,
            draw: (ctx: any)=>{
                this.thumbctx = ctx;
            }
        };

        this.printcanvas = document.createElement('canvas');
        this.printctx = this.printcanvas.getContext('2d');
        this.print3Dimage = document.createElement('img');

        this.printobj = {
            pagenumber : this.pagenumber,
            paperimage : this.printcanvas,
            paperwidth : 297,
            paperheight : 210,
            docwidth : 1,
            docheight : 1,
            inchtomm : 25.4,
            DPI : 300,
            scrDPI : 96,
            scaleSet : false,
            pdx : 0,
            pdy : 0,
            pscale : 1,
            printctx : this.printctx,
            setRes : (dpi: any)=>{
                this.printobj.DPI = dpi;
            },
            setPaperSize : (width: number,height:number)=>{
                this.printobj.paperwidth = width;
                this.printobj.paperheight = height;
                this.printobj.paperimage.width = (width / this.printobj.inchtomm)* this.printobj.DPI;
                this.printobj.paperimage.height = (height / this.printobj.inchtomm)* this.printobj.DPI;
            },
            setDocSize : (width:number, height:number)=>{
                this.printobj.docwidth = width;
                this.printobj.docheight = height;
            },
            setScale : ()=>{
                const xscale = this.printobj.paperimage.width / this.printobj.docwidth; //thispage.MainImageWidth;
                const yscale = this.printobj.paperimage.height / this.printobj.docheight; // thispage.MainImageHeight;

                this.printobj.pscale = Math.min(xscale, yscale);
                this.printobj.pdx = (this.printobj.paperimage.width - (this.printobj.docwidth * this.printobj.pscale)) / 2;
                this.printobj.pdy = (this.printobj.paperimage.height - (this.printobj.docheight * this.printobj.pscale)) / 2;
                this.printobj.scaleSet = true;
            },
            print : ()=>{
                if(!this.printobj.scaleSet){
                    return;
                }
                if(this.usepdfjs){
                    //thispage.renderPDFpagePrint();
                }else if (this.usevectorxml){
                    this.draw_vectorPrint();
                }else if(this.usevector3Dxml){
                    //get imageurl.
                    this.print3Dimage.addEventListener('load', this.load3Dimage.bind(this), false);   // JS->TS:INFO added bind
                    this.print3Dimage.src = Globals.renderer.domElement.toDataURL();

                }else{
                    this.draw_imagePrint();
                }

            }

        };
        this.thumbnailobj.thumbnail.width = parseInt(this.ThumbnailWidth);
        this.thumbnailobj.thumbnail.height = parseInt(this.ThumbnailHeight);
        this.thumbctx = this.thumbnailobj.thumbnail.getContext('2d');

        //this.thumbnailobj.image.addEventListener('load',this.thumbload,false);
        //this.thumbnailobj.image.src = this.thumbnailobj.source;

        this.bisLastPart = false; // TODO:JS->TS:CHECK this does not appear to be used
        this.nPartfilesLoaded = 0; // TODO:JS->TS:CHECK this does not appear to be used

        //prevent automatic loading of thumbnails SO175
        if (Globals.bAutoloadThumbnails){
            this.thumbload();
        }

        this.getThumbnail = () => {
            return this.thumbnailobj;
        }
    }

    // TODO:JS->TS:INFO this was moved to the contructor since it needs to return a function reference
    // public getThumbnail(){
    //     console.log(this);
    //   return this.thumbnailobj;
    // }

    public setMeasureScaledirect(value: number){
        this.measurescale = value;
    }

    public getMeasureScale(){
        return this.measurescale;
    }

    public setCalibration(val: any){

        if (val) {

            if (Globals.nCalibrateSet != 0) {
                Globals.nCalibrateScale = Globals.nCalibrateMeasured / Globals.nCalibrateSet;
                Globals.nCalibrateScale = 1 / Globals.nCalibrateScale;
                //setCalibratebtn();
                this.measurescale = Globals.nCalibrateScale;
            }

        } else {
            Globals.nCalibrateScale = 1;
        }


        drawmarkupAll(Globals.cntximg);
        DrawMarkupSelected(Globals.context);

        return Globals.nCalibrateScale;

    }


    public setCalibrateScale(scale:any){
        this.measurescale = scale;
        drawmarkupAll(Globals.cntximg);
        DrawMarkupSelected(Globals.context);
    }

    public setMeasureScale(scale: string){
        let numerator = 0;
        let denomintaor = 0;


        if (scale != 'Calibration') {
            const numarr = scale.split(":");
            numerator = +numarr[0]; // JS->TS:INFO + is used to convert string to number
            denomintaor = +numarr[1]; // JS->TS:INFO + is used to convert string to number
            if (Globals.bReverseScale) {
                this.measurescale = denomintaor / numerator;
            } else {
                this.measurescale = numerator / denomintaor;
            }

        } else {
            this.measurescale = Globals.nCalibrateScale;
        }
        drawmarkupAll(Globals.cntximg);
        DrawMarkupSelected(Globals.context);
    }

    public rotatedRect(){

        const origx = this.startx;
        const origy = this.starty;
        const origw = this.endx;
        const origh = this.endy;

        const CanvRotRad = this.drotation * (Math.PI / 180);

        const cosangle = Math.cos(CanvRotRad);
        const sinangle = Math.sin(CanvRotRad);

        const centercanvX = (Globals.canvasowidth / 2);
        const centercanvY = (Globals.canvasoheight / 2);


        let hw = origx - centercanvX;
        let hh = origy - centercanvY;

        let newx = (hw * cosangle) - (hh * sinangle);
        let newy = (hw * sinangle) + (hh * cosangle);

        newx = centercanvX + newx;
        newy = centercanvY + newy;

        hw = origw - centercanvX;
        hh = origh - centercanvY;

        let neww = (hw * cosangle) - (hh * sinangle);
        let newh = (hw * sinangle) + (hh * cosangle);

        neww = centercanvX + neww;
        newh = centercanvY + newh;



        return {
            x:Math.min(newx,neww),
            y:Math.min(newy,newh),
            w:Math.max(neww,newx),
            h:Math.max(newh,newy)
        };

    };

    /*this.smallimageprogress = function (ev) {
        if (ev.lengthComputable) {
            //showDownloadDialog();
            if (RxCore_GUI_Download != undefined) {
                //RxCore_GUI_Download.setDownload("show");
            }

            var percentComplete = Math.round(ev.loaded * 100 / ev.total);
            if (percentComplete == 100) {
                //hideDownloadDialog();
                if (RxCore_GUI_Download != undefined) {
                    RxCore_GUI_Download.setDownload("hide");
                }

            }
        } else {
            //document.getElementById('progressNumber').innerHTML = 'unable to compute';
        }

    };*/

    /*this.largeimageprogress = function (ev) {
        if (ev.lengthComputable) {
            //showDownloadDialog();
            if (RxCore_GUI_Download != undefined) {
                //RxCore_GUI_Download.setDownload("show");
            }

            var percentComplete = Math.round(ev.loaded * 100 / ev.total);
            if (percentComplete == 100) {
                //hideDownloadDialog();
                if (RxCore_GUI_Download != undefined) {
                    RxCore_GUI_Download.setDownload("hide");
                }

            }

        } else {
            //document.getElementById('progressNumber').innerHTML = 'unable to compute';
        }


    };*/

    public thumbload(){

        if (this.thumbnailobj.source){
            const oReq = new XMLHttpRequest();
            oReq.open("GET", this.thumbnailobj.source, true);

            oReq.responseType = "blob";
            oReq.onload = (oEvent) => {
                const url = URL.createObjectURL(oReq.response);
                    if (url) {
                        this.thumbnailobj.image.src = url;
                        this.draw_thumbnail();
                        this.thumbloaded = true;
                    }
            };
            oReq.send(null);

        }

      //thumbnail image loaded
        //thispage.draw_thumbnail();
        //thispage.thumbloaded = true;
    };

    public load3Dimage(ev: any){
        this.printobj.printctx.drawImage(ev.currentTarget,
            this.printobj.pdx,
            this.printobj.pdy,
            this.printobj.docwidth * this.printobj.pscale,
            this.printobj.docheight * this.printobj.pscale);
        drawmarkupPrint(this.printobj.printctx,this.pagenumber,this.printobj.pdx,this.printobj.pdy,this.printobj.pscale);
    };

    //this.smallimage.addEventListener('load', this.smallimageload, false);

    public smallimageloadevent(ev: any){
        let yscale = 0.0;
        let xscale = 0.0;
        let dxlocal = 0.0;
        let dylocal = 0.0;
        let dscalelocal = 0.0;
        let imagewidth = 0;
        let imageheight = 0;

        imagewidth = this.SmallImageWidth;
        imageheight = this.SmallImageHeight;

        this.smallimagecnv.width = imagewidth;
        this.smallimagecnv.height = imageheight;

        if (this.smallimagectx !==null) { // JS->TS:INFO added null check
            this.smallimagectx.drawImage(this.smallimage,0,0,imagewidth,imageheight);
        }
        //console.log(canvasoheight);

        yscale = Globals.canvasoheight / this.SmallImageHeight;
        xscale = Globals.canvasowidth / this.SmallImageWidth;
        dscalelocal = Math.min(xscale, yscale);

        dxlocal = (Globals.canvasowidth - (this.SmallImageWidth * dscalelocal)) / 2;
        dylocal = (Globals.canvasoheight - (this.SmallImageHeight * dscalelocal)) / 2;

        this.setimagedimsmall(dxlocal, dylocal, dscalelocal);

        if (RxCore_GUI_Download != undefined) {
            RxCore_GUI_Download.setDownload("hide");
        }

    }

    public smallimageload() {

        const oReq = new XMLHttpRequest();
        oReq.open("GET", this.SmallImageSRC, true);
        oReq.responseType = "blob";

        oReq.onload = (oEvent:any) => {
            const url = oReq.response; // Note: not oReq.responseText
            if (url) {
                this.smallimage.addEventListener('load', this.smallimageloadevent.bind(this), false);   // JS->TS:INFO added bind
                this.smallimage.src = URL.createObjectURL(url);
            }

        };

        oReq.onprogress = (ev:any) => {
            if (ev.lengthComputable) {
                //showDownloadDialog();
                if (RxCore_GUI_Download != undefined) {
                    //RxCore_GUI_Download.setDownload("show");
                }
                const percentComplete = Math.round(ev.loaded * 100 / ev.total);
                if (percentComplete == 100) {
                    //hideDownloadDialog();
                    if (RxCore_GUI_Download != undefined) {
                        RxCore_GUI_Download.setDownload("hide");
                    }
                }
            } else {
                //document.getElementById('progressNumber').innerHTML = 'unable to compute';
            }
        };
        oReq.send(null);
    };

    public largeimageloadevent(ev:any) {
        let yscale = 0.0;
        let xscale = 0.0;
        let dxlocal = 0.0;
        let dylocal = 0.0;
        let dscalelocal = 0.0;
        let imagewidth = 0;
        let imageheight = 0;

        imagewidth = this.MainImageWidth;
        imageheight = this.MainImageHeight;

        this.originalwidth = this.MainImageWidth;
        this.originalheight = this.MainImageHeight;

        this.largeimagecnv.width = imagewidth;
        this.largeimagecnv.height = imageheight;

        if (this.largeimagectx !== null) { // JS->TS:INFO added null check
            this.largeimagectx.drawImage(this.largeimage,0,0,imagewidth,imageheight);
        }

        //set image fixed scale for markup
        yscale = Globals.fixedScaleSize.height / this.MainImageHeight; //this.MainImageHeight;
        xscale = Globals.fixedScaleSize.width / this.MainImageWidth; // this.MainImageWidth;
        this.fixedScale = Math.min(xscale, yscale);


        //console.log(canvasoheight);
        yscale = Globals.canvasoheight / this.MainImageHeight;
        xscale = Globals.canvasowidth / this.MainImageWidth;

        this.printobj.setDocSize(this.MainImageWidth,this.MainImageHeight);

        this.width = imagewidth;
        this.height = imageheight;

        dscalelocal = Math.min(xscale, yscale);

        dxlocal = (Globals.canvasowidth - (this.MainImageWidth * dscalelocal)) / 2;
        dylocal = (Globals.canvasoheight - (this.MainImageHeight * dscalelocal)) / 2;

        this.setimagedimlarge(dxlocal, dylocal, dscalelocal);

        yscale = this.thumbnailobj.thumbnail.height / this.MainImageHeight;
        xscale = this.thumbnailobj.thumbnail.width / this.MainImageWidth;
        dscalelocal = Math.min(xscale,yscale);

        dxlocal = (this.thumbnailobj.thumbnail.width - (this.MainImageWidth*dscalelocal)) / 2;
        dylocal = (this.thumbnailobj.thumbnail.height - (this.MainImageHeight*dscalelocal)) / 2;

        this.setthumbnail(dxlocal,dylocal,dscalelocal);

        /*
        rescale small image  to ensure we are using the same canvas size.

         */
        imagewidth = this.SmallImageWidth;
        imageheight = this.SmallImageHeight;

        this.smallimagecnv.width = imagewidth;
        this.smallimagecnv.height = imageheight;

        if ( null !== this.smallimagectx) { // JS->TS:INFO added null check
            this.smallimagectx.drawImage(this.smallimage,0,0,imagewidth,imageheight);
        }
        //console.log(canvasoheight);

        yscale = Globals.canvasoheight / this.SmallImageHeight;
        xscale = Globals.canvasowidth / this.SmallImageWidth;
        dscalelocal = Math.min(xscale, yscale);

        dxlocal = (Globals.canvasowidth - (this.SmallImageWidth * dscalelocal)) / 2;
        dylocal = (Globals.canvasoheight - (this.SmallImageHeight * dscalelocal)) / 2;

        this.setimagedimsmall(dxlocal, dylocal, dscalelocal);

        //hideDownloadDialog();
        if (RxCore_GUI_Download != undefined) {
            RxCore_GUI_Download.setDownload("hide");
        }
    }

    public largeimageload () {
        const oReq = new XMLHttpRequest();
        oReq.open("GET", this.MainImageSRC, true);
        oReq.responseType = "blob";
        //var __this = thispage;

        oReq.onload = (oEvent:any) => {
            const url = oReq.response; // Note: not oReq.responseText
            if (url) {
                this.largeimage.addEventListener('load', this.largeimageloadevent.bind(this), false);  // JS->TS:INFO added bind
                this.largeimage.src = URL.createObjectURL(url);
            }
        };

        oReq.onprogress = (ev:any) => {
            if (ev.lengthComputable) {
                //showDownloadDialog();
                /*if (RxCore_GUI_Download != undefined) {
                    //RxCore_GUI_Download.setDownload("show");
                }*/
                const percentComplete = Math.round(ev.loaded * 100 / ev.total);
                if (percentComplete == 100) {
                    //hideDownloadDialog();
                    if (RxCore_GUI_Download != undefined) {
                        RxCore_GUI_Download.setDownload("hide");
                    }
                }
            } else {
                //document.getElementById('progressNumber').innerHTML = 'unable to compute';
            }
        };
        oReq.send(null);
    }

    public turnLayerOnOff (index:any) {
        this.VectorPageObj.turnLayerOnOff(index);

        if (this.usedincomposite && this.compositereference !== undefined) {
            //this.compositereference.draw_compare(false);
            this.compositereference.scaleToBackground(false);
        } else {
            this.draw_vector(false);
        }

        this.vectorischanged = true;
    }

    // TODO:JS->TS:FIX extract the common code from the next methods
    public turnBlockAllOnOff(OnOff:boolean){
        this.VectorPageObj.turnBlockAllOnOff(OnOff);

        if (this.usedincomposite && this.compositereference != undefined) {
            //this.compositereference.draw_compare(false);
            this.compositereference.scaleToBackground(false);
        } else {
            this.draw_vector(false);
        }

        this.vectorischanged = true;
    }

    public turnLayerAllOnOff(OnOff:boolean){
        this.VectorPageObj.turnLayerAllOnOff(OnOff);

        if (this.usedincomposite && this.compositereference != undefined) {
            //this.compositereference.draw_compare(false);
            this.compositereference.scaleToBackground(false);
        } else {
            this.draw_vector(false);
        }

        this.vectorischanged = true;
    }

    public resetLayers() {
        this.VectorPageObj.resetLayers();

        if (this.usedincomposite && this.compositereference != undefined) {
            //this.compositereference.draw_compare(false);
            this.compositereference.scaleToBackground(false);
        } else {
            this.draw_vector(false);
        }

        this.vectorischanged = true;
    }

    public getBlocks(){
        return this.VectorPageObj.getBlocks();
    }

    public getpageRef(){
        return this.pdfpageref;
    }

    public filterBlocks(szBlockLoadMask:any){
        this.VectorPageObj.filterBlocks(szBlockLoadMask);
    }

    public turnBlockOnOff(index:number) {
        this.VectorPageObj.turnBlockOnOff(index);
        if (this.usedincomposite && this.compositereference != undefined) {
            //this.compositereference.draw_compare(false);
            this.compositereference.scaleToBackground(false);
        } else {
            this.draw_vector(false);
        }
        this.vectorischanged = true;
    }

    public turn3DBlockOnOff(name:string) {
        for (let i = 0; i < this.Vector3DPageObj.scene.children.length; i++) {
            if (this.Vector3DPageObj.scene.children[i].name == name) {
                if (!this.Vector3DPageObj.scene.children[i].visible) {
                    this.Vector3DPageObj.scene.children[i].visible = true;
                    this.Vector3DPageObj.partlist[this.Vector3DPageObj.scene.children[i].name].tempvisible = true;
                } else {
                    this.Vector3DPageObj.scene.children[i].visible = false;
                    this.Vector3DPageObj.partlist[this.Vector3DPageObj.scene.children[i].name].tempvisible = false;
                }
                //thispage.Vector3DPageObj.scene.updateMatrix();
                //Viewer3D.update();
                if (Rxcore_GUI_3DPartInfo != undefined) {
                    Rxcore_GUI_3DPartInfo.set3DPartInfo(this.Vector3DPageObj.partlist[name]);
                }
                this.Vector3DPageObj.updateblocklist();
                return;
            }
        }
        //Viewer3D.update();
    }

    public restoreBlockStates() {
        this.VectorPageObj.restoreBlockStates();

        if (this.usedincomposite && this.compositereference != undefined) {
            //this.compositereference.draw_compare(false);
            this.compositereference.scaleToBackground(false);
        } else {
            this.draw_vector(false);
        }

        this.vectorischanged = true;
    }

    public resetBlocks() {
        this.VectorPageObj.resetBlocks();

        if (this.usedincomposite && this.compositereference != undefined) {
            //this.compositereference.draw_compare(false);
            this.compositereference.scaleToBackground(false);
        } else {
            this.draw_vector(false);
        }

        this.vectorischanged = true;
    }

    public reset3DParts() {
        let meshindex = 0;
        for (let i = 0; i < this.Vector3DPageObj.scene.children.length; i++) {
            if (this.Vector3DPageObj.scene.children[i].type == "Mesh") {
                if (!this.Vector3DPageObj.partlist[this.Vector3DPageObj.scene.children[i].name].isSpace) {
                    this.Vector3DPageObj.partlist[this.Vector3DPageObj.scene.children[i].name].resetvisible();
                    this.Vector3DPageObj.scene.children[i].visible = this.Vector3DPageObj.partlist[this.Vector3DPageObj.scene.children[i].name].tempvisible;
                    this.Vector3DPageObj.partlist[this.Vector3DPageObj.scene.children[i].name].selected = false;
                    if (this.Vector3DPageObj.partlist[this.Vector3DPageObj.scene.children[i].name].meshcolors.length > 1) {
                        this.Vector3DPageObj.scene.children[i].material.color = new THREE.Color(this.Vector3DPageObj.partlist[this.Vector3DPageObj.scene.children[i].name].meshcolors[meshindex]);
                        if (meshindex < this.Vector3DPageObj.partlist[this.Vector3DPageObj.scene.children[i].name].meshcolors.length) {
                            meshindex++;
                        }
                    } else {
                        this.Vector3DPageObj.scene.children[i].material.color = new THREE.Color(this.Vector3DPageObj.partlist[this.Vector3DPageObj.scene.children[i].name].facecolor);
                    }
                }
                //this.Vector3DPageObj.scene.children[i].visible = this.Vector3DPageObj.partlist[this.Vector3DPageObj.scene.children[i].name].tempvisible;
                //this.Vector3DPageObj.partlist[this.Vector3DPageObj.scene.children[i].name].tempvisible = this.Vector3DPageObj.partlist[thispage.Vector3DPageObj.scene.children[i].name].visible;
            }
        }
        //Viewer3D.update();
        this.Vector3DPageObj.updateblocklist();
    }

    public appendCustomBlockAttribute(blockid:string, name:string, value:any){
        if (this.usevectorxml) {
            this.VectorPageObj.appendCustomBlockAttribute(blockid , name, value);
        }
    }

    public setBlockColor(blockid:string, Color:any, override:any){
        if (this.usevectorxml) {
            this.VectorPageObj.setBlockColor(blockid, Color,override);
            this.draw_vector(false);
            this.vectorischanged = true;
        }
    }

    public FindBlockByAttr(attrname:string, attrvalue:string){
        if (this.usevectorxml) {
            return this.VectorPageObj.FindBlockByAttr(attrname, attrvalue);
        }
    }

    public search3DAttribute(expr:string){
        return this.Vector3DPageObj.searchAttribute(expr);
    }

    public set3DBlockColor(name:string, color:any, override:any){
        for (let i = 0; i < this.Vector3DPageObj.scene.children.length; i++) {
            if(this.Vector3DPageObj.scene.children[i].name === ""){
                continue;
            }
            if (this.Vector3DPageObj.scene.children[i].name == name && this.Vector3DPageObj.scene.children[i].visible) {
                if (override){
                    this.Vector3DPageObj.scene.children[i].material.color = new THREE.Color(color);
                }else{
                    this.Vector3DPageObj.scene.children[i].material.color = new THREE.Color(this.Vector3DPageObj.partlist[this.Vector3DPageObj.scene.children[i].name].facecolor);
                }

            }
        }
    }

    public select3DBlock(name:string) {
        this.Vector3DPageObj.setSelectedPart(-1);
        for (let i = 0; i < this.Vector3DPageObj.scene.children.length; i++) {

            if(this.Vector3DPageObj.scene.children[i].name === ""){
                continue;
            }
            if (this.Vector3DPageObj.scene.children[i].name == name && this.Vector3DPageObj.scene.children[i].visible) {

                if (!this.Vector3DPageObj.partlist[name].selected) {
                    this.Vector3DPageObj.scene.children[i].material.color = new THREE.Color(0xf781f3);

                    this.Vector3DPageObj.partlist[name].selected = true;
                    this.Vector3DPageObj.setSelectedPart(name);
                    if (Rxcore_GUI_3DPartInfo != undefined) {
                        Rxcore_GUI_3DPartInfo.set3DPartInfo(this.Vector3DPageObj.partlist[name]);
                    }

                } else {
                    this.Vector3DPageObj.partlist[this.Vector3DPageObj.scene.children[i].name].selected = false;
                    this.Vector3DPageObj.scene.children[i].material.color = new THREE.Color(this.Vector3DPageObj.partlist[this.Vector3DPageObj.scene.children[i].name].facecolor);
                }

            } else {
                if (this.Vector3DPageObj.scene.children[i].type == "Mesh") {
                    if (this.Vector3DPageObj.scene.children[i].visible && this.Vector3DPageObj.partlist[this.Vector3DPageObj.scene.children[i].name].selected) {
                        this.Vector3DPageObj.scene.children[i].material.color = new THREE.Color(this.Vector3DPageObj.partlist[this.Vector3DPageObj.scene.children[i].name].facecolor);

                        this.Vector3DPageObj.partlist[this.Vector3DPageObj.scene.children[i].name].selected = false;
                    }

                }

            }

        }
        this.Vector3DPageObj.updateblocklist();
    }

    public vectorbinaryload(ev:any) {
        let yscale = 0.0;
        let xscale = 0.0;
        let dxlocal = 0.0;
        let dylocal = 0.0;
        let dscalelocal = 0.0;
        let dscalelocalOne = 0.0;
        let imagewidth = 0;
        let imageheight = 0;

        if (ev.currentTarget.status == 200) {
            let arrayBuffer = ev.currentTarget.response;
            if (arrayBuffer) {
                //var dv = new DataView(arrayBuffer);
                this.VectorPageObj = new VectorPageObject(arrayBuffer, true);
                if (this.VectorPageObj.height == 0 || this.VectorPageObj.width == 0) {
                    return;
                }

                if (RxCore_GUI_Download != undefined) {
                    RxCore_GUI_Download.setDownload("hide");
                }

                this.originalwidth = this.VectorPageObj.width;
                this.originalheight = this.VectorPageObj.height;

                yscale = Globals.fixedScaleSize.height / this.VectorPageObj.height; //this.MainImageHeight;
                xscale = Globals.fixedScaleSize.width / this.VectorPageObj.width; // this.MainImageWidth;
                dscalelocalOne = Math.min(xscale, yscale);
                this.fixedScale = dscalelocalOne;


                yscale = Globals.canvasoheight / this.VectorPageObj.height; //this.MainImageHeight;
                xscale = Globals.canvasowidth / this.VectorPageObj.width; // this.MainImageWidth;

                dscalelocal = Math.min(xscale, yscale);

                dxlocal = (Globals.canvasowidth - (this.VectorPageObj.width * dscalelocal)) / 2;
                dylocal = (Globals.canvasoheight - (this.VectorPageObj.height * dscalelocal)) / 2;

                this.width = this.VectorPageObj.width;
                this.height = this.VectorPageObj.height;

                this.setvectordim(dxlocal, dylocal, dscalelocal);
                this.printobj.setDocSize(this.VectorPageObj.width,this.VectorPageObj.height);

                yscale = this.thumbnailobj.thumbnail.height / this.VectorPageObj.height;
                xscale = this.thumbnailobj.thumbnail.width / this.VectorPageObj.width;
                dscalelocal = Math.min(xscale,yscale);

                dxlocal = (this.thumbnailobj.thumbnail.width - (this.VectorPageObj.width*dscalelocal)) / 2;
                dylocal = (this.thumbnailobj.thumbnail.height - (this.VectorPageObj.height*dscalelocal)) / 2;

                this.setthumbnail(dxlocal,dylocal,dscalelocal);

                //yscale = 1080 / thispage.VectorPageObj.height; //thispage.MainImageHeight;
                //xscale = 1920 / thispage.VectorPageObj.width; // thispage.MainImageWidth;
                //dscalelocalOne = Math.min(xscale, yscale);


                /*var byteArray = new Uint8Array(arrayBuffer);
                 for (var i = 0; i < byteArray.byteLength; i++) {
                 // do something with each byte in the array
                 }*/
            }
        }
    }

    /*this.vectorload = function (ev) {
        var yscale = 0.0;
        var xscale = 0.0;
        var dxlocal = 0.0;
        var dylocal = 0.0;
        var dscalelocal = 0.0;
        var imagewidth = 0;
        var imageheight = 0;

        if (ev.currentTarget.status == 200) {

            var xmlDoc = ev.currentTarget.responseXML;
            if (xmlDoc == null || xmlDoc.documentElement == null) {
                try {
                    xmlDoc = $.parseXML(this.responseText).documentElement;
                } catch (e) {
                    alert("Error 1 - " + e);
                    console('file failed to load');
                    return;
                }
            }

            thispage.VectorPageObj = new VectorPageObject(xmlDoc, false);

            yscale = canvasoheight / thispage.VectorPageObj.height; //thispage.MainImageHeight;
            xscale = canvasowidth / thispage.VectorPageObj.width; // thispage.MainImageWidth;

            dscalelocal = Math.min(xscale, yscale);

            dxlocal = (canvasowidth - (thispage.VectorPageObj.width * dscalelocal)) / 2;
            dylocal = (canvasoheight - (thispage.VectorPageObj.height * dscalelocal)) / 2;

            thispage.width = thispage.VectorPageObj.width;
            thispage.height = thispage.VectorPageObj.height;

            thispage.setvectordim(dxlocal, dylocal, dscalelocal);

        }

    };*/

    public vectorbinprogress(ev:any) {
        if (ev.lengthComputable) {
            //showDownloadDialog();
            const percentComplete = Math.round(ev.loaded * 100 / ev.total);
            if (percentComplete == 100) {
                //hideDownloadDialog();
                if (RxCore_GUI_Download != undefined) {
                    RxCore_GUI_Download.setDownload("hide");
                }
            }
        }
    }

    public vectorprogress(ev: any) {
        const contentSize = ev.currentTarget.getResponseHeader("Content-Length");
        if (contentSize > 10000000) {
            //console.log(contentSize);
            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
                alert("This file is currently too large for your device. Check back for an update shortly ");
                //hideDownloadDialog();
                if (RxCore_GUI_Download != undefined) {
                    RxCore_GUI_Download.setDownload("hide");
                }
                ev.currentTarget.abort();
                //return;
            }

        }
        if (ev.lengthComputable) {
            //showDownloadDialog();
            const percentComplete = Math.round(ev.loaded * 100 / ev.total);
            if (percentComplete == 100) {
                //hideDownloadDialog();
                if (RxCore_GUI_Download != undefined) {
                    RxCore_GUI_Download.setDownload("hide");
                }
            }
        } else {
            //document.getElementById('progressNumber').innerHTML = 'unable to compute';
        }
    }

    public vectorabort(ev: any) {
        RxCore_Closedocument();
    }

    public vector3Dbinprogress(ev: any) {
        /*var contentSize = ev.currentTarget.getResponseHeader ("Content-Length");
         if (contentSize > 10000000){
         if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
         alert("This file is currently too large for your device. Check back for an update shortly ");
         hideDownloadDialog();
         ev.currentTarget.abort();
         }

         }*/
        /*if(RxCore_GUI_Download != undefined){
         RxCore_GUI_Download.setDownload("hide");
         }*/

        Globals.renderer.domElement.style.visibility = 'visible';
        if (ev.lengthComputable) {
            //showDownloadDialog();
            const percentComplete = Math.round(ev.loaded * 100 / ev.total);

            if (percentComplete == 100) {
                if (RxCore_GUI_Download != undefined) {
                    RxCore_GUI_Download.setDownload("hide");
                }
                //hideDownloadDialog();
                /*if(RxCore_GUI_Download != undefined){
                 RxCore_GUI_Download.setDownload("hide");
                 }*/
            }
        } else {
            //document.getElementById('progressNumber').innerHTML = 'unable to compute';
        }
    }

    public vector3Dprogress(ev: any) {
        /*var contentSize = ev.currentTarget.getResponseHeader ("Content-Length");
         if (contentSize > 10000000){
         if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
         alert("This file is currently too large for your device. Check back for an update shortly ");
         hideDownloadDialog();
         ev.currentTarget.abort();
         }

         }*/
        if (ev.lengthComputable) {
            //showDownloadDialog();
            const percentComplete = Math.round(ev.loaded * 100 / ev.total);
            if (percentComplete == 100) {
                //hideDownloadDialog();
                if (RxCore_GUI_Download != undefined) {
                    RxCore_GUI_Download.setDownload("hide");
                }
            }
        } else {
            //document.getElementById('progressNumber').innerHTML = 'unable to compute';
        }
    }

    public vector3Dabort(ev: any) {
        RxCore_Closedocument();
    }

    public vector3Dblocknavload(ev: any) {
        /*if(RxCore_GUI_Download != undefined){
         RxCore_GUI_Download.setDownload("hide");
         }*/
        if (ev.currentTarget.status == 200) {
            let xmlDoc = ev.currentTarget.responseXML;

            if (xmlDoc == null || xmlDoc.documentElement == null) {
                try {
                    // TODO:JS->TS:FIX
                    // TODO:JS->TS:CHECK replaced this.responseText with ev.currentTarget.responseText
                    // xmlDoc = $.parseXML(this.responseText).documentElement;
                    xmlDoc = $.parseXML(ev.currentTarget.responseText).documentElement;
                } catch (e) {
                    alert("Error 1 - " + e);
                    return;
                }
            }
            this.Vector3DPageObj.addblocks(xmlDoc);
        }
        //thispage.Vector3DPageObj.
    }

    public vector3DBinaryload(ev: any) {
        let yscale = 0.0;
        let xscale = 0.0;
        let dxlocal = 0.0;
        let dylocal = 0.0;
        let dscalelocal = 0.0;
        let imagewidth = 0;
        let imageheight = 0;

        //hideDownloadDialog();

        if (ev.currentTarget.status == 200) {
            //console.log(contentSize);
            // TODO:JS->TS:CHECK arraybuffer was used without var/const/let might have been intended for outer scope
            const arrayBuffer = ev.currentTarget.response; // JS->TS:INFO added const keyword
            if (arrayBuffer) {
                this.Vector3DPageObj = new Vector3DPageObject(arrayBuffer, true,this);

                this.walkthroughcontrol = new FirstPersonControl();

                this.walkthroughcontrol.movementSpeed = 50;
                this.walkthroughcontrol.lookSpeed = 0.125;
                this.walkthroughcontrol.lookVertical = true;

                this.printobj.setDocSize(Globals.canvasowidth,Globals.canvasoheight);

                Globals.documentopen = true;
                doResize(true);
                RxCore_3DOrbit();

                /*if (thispage.has3Dnav) {
                    thispage.load3dnavigator();
                }*/
            }
        }
    }

    // TODO:JS->TS:FIX nPartfilesLoaded and bisLastPart
    public vectorpart3Dload(ev: any, nPartfilesLoaded=0, bisLastPart=false) {
        if (ev.currentTarget.status == 200) {
            let xmlDoc = ev.currentTarget.responseXML;
            if (xmlDoc == null || xmlDoc.documentElement == null) {
                try {
                    // JS->TS:INFO replaced this.responseText with ev.currentTarget.responseText
                    // xmlDoc = $.parseXML(this.responseText).documentElement;
                    xmlDoc = $.parseXML(ev.currentTarget.responseText).documentElement;
                } catch (e) {
                    alert("Error 1 - " + e);
                    return;
                }
            }
            nPartfilesLoaded++; // TODO:JS->TS:CHECK variable used with outer scope intent
            if (nPartfilesLoaded == this.VectorPartfilelist.length) {
                bisLastPart = true;
            }
            //thispage.Vector3DPageObj.addpart(xmlDoc, bisLastPart);
            //renderer.render(thispage.Vector3DPageObj.scene, camera,false);
            //alert('new page loaded');
        }
    }

    // TODO:JS->TS:CHECK the method is empty
    public vector3Dpartprogress(ev:any) {
    }

    public load3dvectorPart() {
        //console.log(thispage.VectorPartfilelist.length);
        for (let i = 0; i < this.VectorPartfilelist.length; i++) {
            let xhr = new XMLHttpRequest();

            try {
                //alert(thispage.VectorPartfilelist[i]);
                xhr.open('GET', this.VectorPartfilelist[i], true);
            } catch (e) {
                alert("Error 1 - " + e);
            }
            try {
                xhr.responseType = '';
            } catch (e) {
                //alert("Error 2 - " + e);
            }
            //console.log(i);
            xhr.addEventListener('load', this.vectorpart3Dload.bind(this), false);  // JS->TS:INFO added bind
            xhr.addEventListener('progress', this.vector3Dpartprogress.bind(this), false);  // JS->TS:INFO added bind
            xhr.send();
        }
        //bAnimateready = true;
    }

    public load3dnavigator() {
        /*if(RxCore_GUI_Download != undefined){
         RxCore_GUI_Download.setDownload("show");
         }*/
        let xhr = new XMLHttpRequest();

        try {
            xhr.open('GET', this.Navigator3DSRC, true);
        } catch (e) {
            alert("Error 1 - " + e);
        }
        try {
            xhr.responseType = '';
        } catch (e) {
            //alert("Error 2 - " + e);
        }

        xhr.addEventListener('load', this.vector3Dblocknavload.bind(this), false);  // JS->TS:INFO added bind
        xhr.addEventListener('progress', this.vector3Dprogress.bind(this), false);  // JS->TS:INFO added bind
        xhr.addEventListener("abort", this.vector3Dabort.bind(this), false);  // JS->TS:INFO added bind
        xhr.send();
    }

    public loadvectors3DBinary() {
        if (RxCore_GUI_Download != undefined) {
            RxCore_GUI_Download.setDownload("show");
        }
        let xhr = new XMLHttpRequest();

        try {
            xhr.open('GET', this.Vector3DBinarySRC, true);
        } catch (e) {
            alert("Error 1 - " + e);
        }
        try {
            xhr.responseType = "arraybuffer";
        } catch (e) {
            //alert("Error 2 - " + e);
        }
        xhr.addEventListener('loadend', this.vector3DBinaryload.bind(this), false);  // JS->TS:INFO added bind
        xhr.addEventListener('progress', this.vector3Dbinprogress.bind(this), false);  // JS->TS:INFO added bind
        xhr.addEventListener("abort", this.vector3Dabort.bind(this), false);  // JS->TS:INFO added bind
        xhr.send();
    }

    public loadvectors3D() {
        //showDownloadDialog();
        /*if (RxCore_GUI_Download != undefined) {
            RxCore_GUI_Download.setDownload("show");
        }*/
        let xhr = new XMLHttpRequest();

        try {
            xhr.open('GET', this.Vector3DSRC, true);
        } catch (e) {
            alert("Error 1 - " + e);
        }
        try {
            xhr.responseType = '';
        } catch (e) {
            //alert("Error 2 - " + e);
        }
        // xhr.addEventListener('load', this.vector3Dload, false); // TODO:JS->TS:CHECK this was commented out since vector3Dload does not exist in the original file
        xhr.addEventListener('progress', this.vector3Dprogress.bind(this), false);  // JS->TS:INFO added bind
        xhr.addEventListener("abort", this.vector3Dabort.bind(this), false);  // JS->TS:INFO added bind
        xhr.send();
    }

    public loadbinvectors () {
        if (RxCore_GUI_Download != undefined) {
            RxCore_GUI_Download.setDownload("show");
        }
        let xhr = new XMLHttpRequest();
        try {
            xhr.open('GET', this.Vector2DBinarySRC, true);
        } catch (e) {
            alert("Error 1 - " + e);
            console.log('binary loading failed');
        }
        try {
            xhr.responseType = "arraybuffer";
            //xhr.responseType = '';
        } catch (e) {
            //alert("Error 2 - " + e);
        }

        xhr.addEventListener('load', this.vectorbinaryload.bind(this), false);  // JS->TS:INFO added bind
        xhr.addEventListener('progress', this.vectorbinprogress.bind(this), false);   // JS->TS:INFO added bind
        xhr.addEventListener("abort", this.vectorabort.bind(this), false);  // JS->TS:INFO added bind
        xhr.send();
    }

    public loadvectors() {
        //showDownloadDialog();
        let xhr = new XMLHttpRequest();

        try {
            xhr.open('GET', this.Vector2DSRC, true);
        } catch (e) {
            alert("Error 1 - " + e);
            console.log('xml loading failed');
        }
        try {
            xhr.responseType = '';
        } catch (e) {
            //alert("Error 2 - " + e);
        }

        // xhr.addEventListener('load', this.vectorload, false); // TODO:JS->TS:CHECK this has been commented out since vectorload is not available ( the implementation of vectorload was commented out in the original)
        xhr.addEventListener('progress', this.vectorprogress.bind(this), false);   // JS->TS:INFO added bind
        xhr.addEventListener("abort", this.vectorabort.bind(this), false);  // JS->TS:INFO added bind
        xhr.send();
    }

    public backupScaleAndOffset(){
        if (this.usevectorxml) {
            this.dscalebackup =  this.dscalevector;
            this.dxbackup = this.dxvector;
            this.dybackup = this.dyvector;
        } else if (this.usepdfjs) {
            this.dscalebackup =  this.dscalepdf;
            this.curpagescalebackup = this.curpagescale;
            this.dxbackup = this.dxpdf;
            this.dybackup = this.dypdf;
        } else {
            this.dscalebackup = this.dscale;
            this.dxbackup = this.dx;
            this.dybackup = this.dy;
        }
    }

    public restoreScaleAndOffset(){
        if (this.usevectorxml) {
            this.dscalevector = this.dscalebackup;
            this.dxvector = this.dxbackup;
            this.dyvector = this.dybackup;
        } else if (this.usepdfjs) {
            this.dscalepdf = this.dscalebackup;
            this.curpagescale = this.curpagescalebackup;
            this.dxpdf = this.dxbackup;
            this.dypdf = this.dybackup;
        } else {
            this.dscalebackup = this.dscale = this.dscalebackup;
            this.dx = this.dxbackup;
            this.dy = this.dybackup;
        }
    }

    public setPDFDiminit(dx:number,dy:number,dscale:number){
        this.pageloaded = false;
        this.dxpdf = dx;
        this.dypdf = dy;

        this.dscalepdf = dscale;
        //this.initialscale = dscale;
        //this.vectorloaded = true;

        this.startx = this.dxpdf;
        this.starty = this.dypdf;
        //dxlocal = (canvasowidth - (thispage.VectorPageObj.width*dscalelocal)) / 2;
        //dylocal = (canvasoheight - (thispage.VectorPageObj.height*dscalelocal)) / 2;

        this.endx = (this.offscreenwidth * this.dscalepdf) + this.startx;
        this.endy = (this.offscreenheight * this.dscalepdf) + this.starty;

        this.pdfdiminitset = true;

        //var numpages = thispage.Docref.pages.length - 1;
        if (this.pagenumber == this.DocRef.pages.length - 1){
            //add new get all pagedim callback here.
            if (Rxcore_GUI_pagedimLoadComplete != undefined){
                Rxcore_GUI_pagedimLoadComplete.loadComplete(this.DocRef.FileName);
            }

        }
    }

    public setPFDdimnodraw(dx:number,dy:number,dscale:number,bSetscale:boolean){
        this.pageloaded = true;
        this.dxpdf = dx;
        this.dypdf = dy;

        if (bSetscale){
            this.dscalepdf = dscale;
        }

        //this.initialscale = dscale;
        //this.vectorloaded = true;

        this.startx = this.dxpdf;
        this.starty = this.dypdf;
        //dxlocal = (canvasowidth - (thispage.VectorPageObj.width*dscalelocal)) / 2;
        //dylocal = (canvasoheight - (thispage.VectorPageObj.height*dscalelocal)) / 2;


        this.endx = (this.offscreenwidth * this.dscalepdf) + this.startx;
        this.endy = (this.offscreenheight * this.dscalepdf) + this.starty;

        /*
        if (firstpage){
            thispage.DocRef.setDocumentPageScale(thispage.offscreenwidth, thispage.offscreenheight, thispage.dscalepdf);
        }
        */
    }

    public setPDFdim(dx:number, dy:number, dscale:number) {
        this.pageloaded = true;
        if(!this.pdfdiminitset){
            this.dxpdf = dx;
            this.dypdf = dy;

            //this.initialscale = dscale;
            //this.vectorloaded = true;

            this.startx = this.dxpdf;
            this.starty = this.dypdf;
            //dxlocal = (canvasowidth - (thispage.VectorPageObj.width*dscalelocal)) / 2;
            //dylocal = (canvasoheight - (thispage.VectorPageObj.height*dscalelocal)) / 2;

            this.endx = (this.offscreenwidth * this.dscalepdf) + this.startx;
            this.endy = (this.offscreenheight * this.dscalepdf) + this.starty;
            this.pdfdiminitset = true;
        }
        this.dscalepdf = 1;
        // TODO:JS->TS:CHECK firstpage used from an outer scope. replaced with this.firstpage
        if (this.firstpage && !this.DocRef.markuploaded) {
            if (Globals.bUsemarkupbyref) {
                //getMarkupbyReference(path);
                // TODO:JS->TS:CHECK path used from an outes scope. replaced with this.path
                getMarkupbyReference(this.path, Globals.DocObj.OriginalURL);
            } else if(Globals.bUsemarkupbyrefEx) {
                getMarkupxmlurl();
                //getMarkupFilelist(path);
            }else{
                // TODO:JS->TS:CHECK path used from an outes scope. replaced with this.path
                getMarkupFilelist(this.path, Globals.DocObj.OriginalURL);
            }
        }
        // TODO:JS->TS:CHECK firstpage used from an outer scope. replaced with this.firstpage
        if (this.firstpage && !this.pdfdiminitset) {
            if (Globals.doCompare) {
                comparecheck(this.DocRef.FileName);
            } else {
                DeactivateAll();
                this.DocRef.SetActive();
            }
        }
        // TODO:JS->TS:CHECK firstpage used from an outer scope. replaced with this.firstpage
        if (this.firstpage){
            //thispage.DocRef.setDocumentPageScale(thispage.offscreenwidth, thispage.offscreenheight, thispage.dscalepdf);

            this.draw_canvas(true);
            this.visible = true;
            if (RxCore_GUI_Download != undefined) {
                RxCore_GUI_Download.setDownload("hide");
            }
            RxCore_default();
            if (Rxcore_GUI_fileLoadComplete != undefined) {
                Rxcore_GUI_fileLoadComplete.loadComplete(Globals.DocObj.OriginalURL);
            }
        }
        if (Rxcore_GUI_pageLoadComplete != undefined) {
            Rxcore_GUI_pageLoadComplete.loadComplete(this.pagenumber);
        }
        this.backupScaleAndOffset();
        //usepdfjs
        //hideDownloadDialog();
    }


    public istextvisible(x:number,y:number){
        let isVisible = false;

        const left = Math.max(0, x);
        const right = Math.min(Globals.canvasowidth, x);
        const bottom = Math.max(Globals.canvasoheight, y);
        const top = Math.min(0, y);

        if(x > 0 && x < Globals.canvasowidth){
            if (y > 0 && y < Globals.canvasoheight){
                isVisible = true;
            }
        }
        /*if(left <= right && bottom > top){

        }*/
        return isVisible;
    }

    public ispagevisible() {
        let isVisible = false;
        if (this.usepdfjs) {
            const left = Math.max(0, this.dxpdf);
            const right = Math.min(Globals.canvasowidth, this.endx);
            const bottom = Math.max(Globals.canvasoheight, this.endy);
            const top = Math.min(0, this.dypdf);

            if(left < right && bottom > top){
                isVisible = true;
            }
        }
        return isVisible;
    }

    public changeinterval(newinterval:any){
        clearInterval(this.vectortimervar);
        this.vectorpagetime = newinterval;

        this.vectortimervar = setInterval(() => {
            this.vectortimer();
        }, this.vectorpagetime);
    }

    public vectortimer() {
        let vectorscale:any = undefined;
        if (this.DocRef != null && this.DocRef.bActive) {
            //console.log(this.pagenumber);
            //console.log(DocObj.currentpage);
            if (this.pagenumber == this.DocRef.pages[this.DocRef.currentpage].pagenumber) {
                if (this.usedincomposite && this.compositereference != undefined) {
                    if(this.compositereference.printing && this.compositePrintreference != undefined){
                        if(this.compositereference.bisdvector){
                            // JS->TS:INFO removed var keyword and added definition at the start of the method
                            vectorscale = this.VectorPageObj.offscreenscale(this.compositePrintreference.overlayCScale);
                        }else if (this.compositereference.oisvector){
                            vectorscale = this.VectorPageObj.offscreenscale(this.compositePrintreference.overlayScale);
                        }else{
                            vectorscale = this.VectorPageObj.offscreenscale(this.dscalevector);
                        }
                    }else{
                        if(this.compositereference.bisdvector){
                            vectorscale = this.VectorPageObj.offscreenscale(this.compositereference.overlayCScale);
                        }else if (this.compositereference.oisvector){
                            vectorscale = this.VectorPageObj.offscreenscale(this.compositereference.overlayScale);
                        }else{
                            vectorscale = this.VectorPageObj.offscreenscale(this.dscalevector);
                        }
                    }
                }else{
                    vectorscale = this.VectorPageObj.offscreenscale(this.dscalevector);
                }
                //var vectorscale = thispage.VectorPageObj.offscreenscale(thispage.dscalevector);

                //console.log(vectorscale);
                if (vectorscale < 0.95 || vectorscale > 1.05 || this.vectorischanged) {
                    //if( vectorscale != 1 || this.vectorischanged ){
                    if (this.usedincomposite && this.compositereference != undefined) {
                        if(this.compositereference.printing && this.compositePrintreference != undefined){
                            this.compositePrintreference.scaleToBackground(true);
                        }else{
                            this.compositereference.scaleToBackground(true);
                        }
                        //this.compositereference.draw_compare(true);
                    } else {
                        this.cleartextdivs();
                        this.draw_vector(true);
                        this.settextdivs();
                    }
                    this.vectorischanged = false;
                }
                //comparedrawcheck();
            }
        }
    }

    public pdftimer() {
        if (this.DocRef != null){
            if (this.DocRef.bActive){
                if (this.pagenumber == this.DocRef.pages[this.DocRef.currentpage].pagenumber) {
                    //console.log(thispage.dscalepdf);
                    //thispage.dscalepdf != 1 &&
                    if (!this.pdfisrendered) {
                        if(this.compositePrintreference != undefined){
                            if(this.compositereference.printing){
                                this.compositePrintreference.renderPDFscale();
                            }
                        }else if(this.usedincomposite && this.compositereference != undefined){
                            this.compositereference.renderPDFscale();
                        }else{
                            if(!this.pageRendering){
                                this.DocRef.renderPDFscale();
                            }
                        }
                    }
                }
            }else{
                if(this.usedincomposite && this.compositereference != undefined ){
                    if(this.compositereference.bispdf){
                        if (this.pagenumber == this.DocRef.pages[this.DocRef.currentpage].pagenumber) {
                            if (!this.pdfisrendered) {
                                if(this.compositereference.printing && this.compositePrintreference != undefined){
                                    this.compositePrintreference.renderPDFscale();
                                }else{
                                    this.compositereference.renderPDFscale();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    /*this.pdftimer = function () {
        if (thispage.DocRef != null && thispage.DocRef.bActive) {
            if (thispage.pagenumber == thispage.DocRef.currentpage) {
                //console.log(thispage.dscalepdf);
                if (thispage.dscalepdf != 1 || !thispage.pdfisrendered) {
                    thispage.DocRef.renderPDFscale();
                }
            }

        }
    };*/

    public queRenderCompareScale(num:number){
        if (this.pageRendering) {
            this.pageNumPending = this.pagenumber + 1;
            //setTimeout(function(){thispage.pageRendering = false},3000);
            //console.log(thispage.pageNumPending);
        } else {
            this.renderPDFComparescale(num);
        }
    }

    public queRenderPageScaled() {
        if (this.pageRendering) {
            this.pageNumPending = this.pagenumber + 1;
            //setTimeout(function(){thispage.pageRendering = false},3000);
        } else {
            this.renderPDFpagescale(true);
        }
    }

    public setpagesize(w:number,h:number){
        //thispage.pagecanvas.width = w;
        //thispage.pagecanvas.height = h;
        this.pagedrawCanvas.width = w;
        this.pagedrawCanvas.height = h;
        this.offscreenwidth = w;
        this.offscreenheight = h;
        //console.log(thispage.pagenumber);
        //console.log(thispage.offscreenwidth);
    }

    public collapsepage(){
        //thispage.pdfisfirstrendered = false;
        //thispage.pdfisrendered = false;
        if(this.iscollapsed){
            return;
        }
        this.iscollapsed = true;
        if (null!=this.pagectx){ // JS->TS:INFO added null check
            this.pagectx.clearRect(0,0,this.offscreenwidth,this.offscreenheight);
        }
        if (null!==this.pagedrawctx){ // JS->TS:INFO added null check
            this.pagedrawctx.clearRect(0,0,this.offscreenwidth,this.offscreenheight);
        }
        //console.log(thispage.pagenumber);
        //thispage.offscreenwidth = thispage.pagecanvas.width;
        //thispage.offscreenheight = thispage.pagecanvas.height;
        this.pagecanvas.width = 1;
        this.pagecanvas.height = 1;
        this.pagedrawCanvas.width = 1;
        this.pagedrawCanvas.height = 1;
    }

    public queueGetPageDim(num:number){
        this.getPDFdimensions(num);
        //console.log(num);
    }

    public queueRenderPage(num:number) {
        if (!this.DocRef.bActive){
            return;
        }
        if (this.pageRendering) {
            this.pageNumPending = num;
        } else {
            this.renderPDFpage(num);
        }
    }

    public renderPDFComparescale(num:number){
        if(this.pdfrenderopque > 1){
            this.pdfrenderopque -= 1;
            //console.log('render aborted',thispage.pdfrenderopque);
            return;
        }
        this.pageRendering = true;
        /*if (thispage.bMaxzoom && dscale == 1) {
         this.pageRendering = false;
         return;
         }*/
        this.DocRef.pdfDoc.getPage(this.pagenumber + 1).then((page:any) =>{
            let pagewidth:number = 0;
            let pageheight:number = 0;
            let pagetemp:number = 0;

            if(page.view[3] != 0){
                pagewidth = Math.abs(page.view[2] - page.view[0]);
                pageheight = Math.abs(page.view[3] - page.view[1]);
                pagetemp = Math.abs(page.view[2] - page.view[0]);
            }else{
                pagewidth = Math.abs(page.view[2] - page.view[0]);
                pageheight = Math.abs(page.view[3] - page.view[1]);
                pagetemp = Math.abs(page.view[2]- page.view[0]);
            }

            switch (page.pageInfo.rotate) {
                case 0:
                    break;
                case 90:
                    pagewidth = pageheight;
                    pageheight = pagetemp;
                    break;
                case 180:
                    break;
                case 270:
                    pagewidth = pageheight;
                    pageheight = pagetemp;
                    break;
            }

            this.pdfpagewidth = pagewidth;
            this.pdfpageheight = pageheight;

            if(this.compositereference == undefined){
                console.log('overlay/compare reference not set');
                return;
            }

            let dscale = 0;
            let wscale = 0;
            let hscale = 0;

            if(this.compositereference.printing && this.compositePrintreference != undefined){
                switch(num){
                    case 1:
                        dscale = this.compositePrintreference.overlayScale;
                        wscale = (this.compositePrintreference.ovpagecanvas.width * dscale) / pagewidth;
                        hscale = (this.compositePrintreference.ovpagecanvas.height * dscale) / pageheight;
                        break;
                    case 0:
                        dscale = this.compositePrintreference.backgroundScale;
                        wscale = (this.compositePrintreference.bgpagecanvas.width * dscale) / pagewidth;
                        hscale = (this.compositePrintreference.bgpagecanvas.height * dscale) / pageheight;
                        break;
                }
            }else{
                switch(num){
                    case 1:
                        dscale = this.compositereference.overlayScale;
                        wscale = (this.compositereference.ovpagecanvas.width * dscale) / pagewidth;
                        hscale = (this.compositereference.ovpagecanvas.height * dscale) / pageheight;
                        break;
                    case 0:
                        dscale = this.compositereference.backgroundScale;
                        wscale = (this.compositereference.bgpagecanvas.width * dscale) / pagewidth;
                        hscale = (this.compositereference.bgpagecanvas.height * dscale) / pageheight;
                        break;
                }
            }

            let scale = Math.min(wscale, hscale);
            let restscale = 1;
            if (scale > this.nPDFMaxFactor ){
                restscale = scale / this.nPDFMaxFactor;
                scale = this.nPDFMaxFactor;
                this.bMaxzoom = true;
            }else{
                restscale = 1;
                this.bMaxzoom = false;
            }
            let viewport = undefined as any;
            if(this.usedincomposite && this.compositereference != undefined){
                //var viewport = page.getViewport(thispage.compositereference.overlayCScale);
                viewport = page.getViewport(scale);
            }

            if (isNaN(viewport.height) || isNaN(viewport.width)){
                this.pageRendering = false;
                return;
            }else{
                if(this.compositereference.printing && this.compositePrintreference != undefined){
                    switch(num){
                        case 1:
                            this.compositePrintreference.ovpagecanvas.height = viewport.height;
                            this.compositePrintreference.ovpagecanvas.width = viewport.width;
                            break;
                        case 0:
                            this.compositePrintreference.bgpagecanvas.height = viewport.height;
                            this.compositePrintreference.bgpagecanvas.width = viewport.width;
                            break;
                    }
                }else{
                    switch(num){
                        case 1:
                            this.compositereference.ovpagecanvas.height = viewport.height;
                            this.compositereference.ovpagecanvas.width = viewport.width;
                            break;
                        case 0:
                            this.compositereference.bgpagecanvas.height = viewport.height;
                            this.compositereference.bgpagecanvas.width = viewport.width;
                            //console.log(thispage.compositereference.bgpagecanvas.width);
                            break;
                    }
                }
            }
            this.dscalepdf = restscale;
            let renderContext = undefined as any;
            //thispage.markupscaleadjust = scale / thispage.pagescale;
            if(this.compositereference.printing && this.compositePrintreference != undefined){
                switch(num){
                    case 1:
                        this.compositePrintreference.overlayScale = restscale;
                        this.curpagescale = this.compositePrintreference.ovpagecanvas.width / this.pdfpagewidth;
                        this.curpagescale = this.compositePrintreference.ovpagecanvas.height / this.pdfpageheight;
                        renderContext = {
                            canvasContext:this.compositePrintreference.ovpagectx,
                            viewport:viewport
                        };
                        break;
                    case 0:
                        this.compositePrintreference.backgroundScale = restscale;
                        this.compositePrintreference.overlayCScale = restscale;
                        this.curpagescale = this.compositePrintreference.bgpagecanvas.width / this.pdfpagewidth;
                        this.curpagescale = this.compositePrintreference.bgpagecanvas.height / this.pdfpageheight;
                        renderContext = {
                            canvasContext:this.compositePrintreference.bgpagectx,
                            viewport:viewport
                        };
                        break;
                }
            }else{
                switch(num){
                    case 1:
                        this.compositereference.overlayScale = restscale;
                        this.curpagescale = this.compositereference.ovpagecanvas.width / this.pdfpagewidth;
                        this.curpagescale = this.compositereference.ovpagecanvas.height / this.pdfpageheight;
                        renderContext = {
                            canvasContext:this.compositereference.ovpagectx,
                            viewport:viewport
                        };
                        break;
                    case 0:
                        this.compositereference.backgroundScale = restscale;
                        this.compositereference.overlayCScale = restscale;
                        this.curpagescale = this.compositereference.bgpagecanvas.width / this.pdfpagewidth;
                        this.curpagescale = this.compositereference.bgpagecanvas.height / this.pdfpageheight;
                        renderContext = {
                            canvasContext:this.compositereference.bgpagectx,
                            viewport:viewport
                        };
                        break;
                }
            }
            let renderTask = page.render(renderContext);
            Globals.bPDFtemprender = true;

            renderTask.promise.then(()=>{
                this.pageRendering = false;
                Globals.bPDFtemprender = false;
                /*if (thispage.pageNumPending !== null) {
                    // New page rendering is pending
                    thispage.renderPDFComparescale(true);
                    thispage.pageNumPending = null;
                }*/

                this.pdfrenderopque -= 1;
                if(this.pdfrenderopque <= 0){
                    this.pdfrenderopque = 0;
                    this.pdfisrendered = true;
                }
                if(this.compositereference.printing && this.compositePrintreference != undefined){
                    this.compositePrintreference.invertpdf();
                }else if(this.usedincomposite && this.compositereference != undefined){
                    this.compositereference.invertpdf();
                    //thispage.compositereference.draw_compare(false);
                }else{
                    this.DocRef.draw_mpagepdf();
                }
            });
        });
    }

    public renderPDFpagescale(draw:any) {
        if(!this.pdfisfirstrendered){
            return;
        }
        if(this.pdfrenderopque > 1){
            this.pdfrenderopque -= 1;
            //console.log('render aborted',thispage.pdfrenderopque);
            return;
        }
        /*thispage.pdfrenderopque -= 1;
        console.log(thispage.pdfrenderopque);
        if(thispage.pdfrenderopque <= 0){
            thispage.pdfrenderopque = 0;
            thispage.pdfisrendered = true;
        }*/
        let renderstart = new Date().getTime();
        this.pageRendering = true;
        // Using promise to fetch the page
        /*if (thispage.bMaxzoom && thispage.dscalepdf == 1) {
            this.pageRendering = false;
            return;
        }*/

        this.DocRef.pdfDoc.getPage(this.pagenumber + 1).then((page:any)=> {
            page.cleanupAfterRender = true;

            // TODO:JS->TS:CHECK pdfjsWebLibs defined in outer scope Unknown dep
            const TextLayerBuilder = pdfjsWebLibs.pdfjsWebTextLayerBuilder.TextLayerBuilder;
            //var viewport = page.getViewport(scale);
            //canvas.height = viewport.height;
            //canvas.width = viewport.width;

            //PDFJS page scaling not to be confused with scaling of canvas image.
            //this.pagescale = thispage.pagescale;

            //page.view[0] = -dxlocal/scale;
            //page.view[1] = -dylocal/scale;
            let pagewidth = 0;
            let pageheight = 0;
            let pagetemp =0;
            if(page.view[3] != 0){
                pagewidth = Math.abs(page.view[2] - page.view[0]);
                pageheight = Math.abs(page.view[3] - page.view[1]);
                pagetemp = Math.abs(page.view[2] - page.view[0]);
            }else{
                pagewidth = Math.abs(page.view[2] - page.view[0]);
                pageheight = Math.abs(page.view[3] - page.view[1]);
                pagetemp = Math.abs(page.view[2]- page.view[0]);
            }
            switch (page.pageInfo.rotate) {
                case 0:
                    break;
                case 90:
                    pagewidth = pageheight;
                    pageheight = pagetemp;
                    break;
                case 180:
                    break;
                case 270:
                    pagewidth = pageheight;
                    pageheight = pagetemp;
                    break;
            }

            this.pdfpagewidth = pagewidth;
            this.pdfpageheight = pageheight;

            if(this.iscollapsed){
                //console.log('renderPDFpagescale');
                this.setpagesize(this.offscreenwidth,this.offscreenheight);
            }

            //var wscale = (thispage.pagecanvas.width * thispage.dscalepdf) / pagewidth;
            //var hscale = (thispage.pagecanvas.height * thispage.dscalepdf) / pageheight;

            let wscale = (this.offscreenwidth * this.dscalepdf) / pagewidth;
            let hscale = (this.offscreenheight * this.dscalepdf) / pageheight;
            let scale = Math.min(wscale, hscale);

            let txtviewport = page.getViewport(scale);
            let restscale = 1;
            if (scale > this.nPDFMaxFactor ){
                restscale = scale / this.nPDFMaxFactor;
                scale = this.nPDFMaxFactor;
                this.bMaxzoom = true;
            }else{
                restscale = 1;
                this.bMaxzoom = false;
            }

            //thispage.pagecanvas.height *= this.dscalepdf;
            //thispage.pagecanvas.width *= this.dscalepdf;
            //var tempscale = 1 / thispage.pagescale;

            //tempscale *= thispage.dscalepdf;
            //thispage.pagescale *= thispage.dscalepdf;

            let viewport = page.getViewport(scale);

            this.setpagesize(viewport.width,viewport.height);

            //thispage.pagecanvas.height = viewport.height;
            //thispage.pagecanvas.width = viewport.width;
            this.dscalepdf = restscale;
            this.markupscaleadjust = scale / this.pagescale;
            this.pdfSnapScale = scale;

            //thispage.markupscaleadjust = scale / thispage.pagescale;
            /*if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
                if (viewport.height * viewport.width < 5000000) {
                    thispage.pagecanvas.height = viewport.height;
                    thispage.pagecanvas.width = viewport.width;
                    thispage.dscalepdf = 1;
                    thispage.markupscaleadjust = scale / thispage.pagescale;
                } else {
                    thispage.pageRendering = false;
                    //thispage.dscalepdf = scale;
                    return;

                }

            } else {
                thispage.pagecanvas.height = viewport.height;
                thispage.pagecanvas.width = viewport.width;
                thispage.dscalepdf = 1;
                thispage.markupscaleadjust = scale / thispage.pagescale;
            }*/

            if (this.offscreenwidth <= Globals.canvasowidth) {
                this.dxpdf = (Globals.canvasowidth - viewport.width) / 2;
            }
            this.curpagescale = this.offscreenwidth / this.pdfpagewidth;
            //thispage.curpagescale = thispage.offscreenheight / thispage.pdfpageheight;


            /*thispage.curthumbscale = 160 / thispage.pdfpagewidth;

             thispage.thumbcanvas.width = 160;
             thispage.thumbcanvas.height = thispage.pdfpageheight * thispage.curthumbscale;*/


            //var wscale = thispage.pagecanvas.width / viewport.width;
            //var hscale = thispage.pagecanvas.height / viewport.height;
            //thispage.pdfdscaletemp = Math.min(wscale,hscale);

            //thispage.pdfdxtemp = (canvasowidth - (viewport.width*thispage.pdfdscaletemp)) / 2;
            //thispage.pdfdytemp = (canvasoheight - (viewport.height*thispage.pdfdscaletemp)) / 2;


            //canvasoheight = viewport.height;
            //canvasowidth = viewport.width;

            // Render PDF page into canvas context
            //this.pagecanvas = document.createElement('canvas');
            //this.pagectx = this.pagecanvas.getContext('2d');

            //thispage.pagectx.clearRect(0, 0, thispage.pagecanvas.width, thispage.pagecanvas.height);
            //thispage.pagectx.fillStyle = 'white';
            //thispage.pagectx.fillRect(0, 0, thispage.pagecanvas.width, thispage.pagecanvas.height);


            //var getPoints = page.getPointsList();



            /*getPoints(function(points){
                console.log(points);
            });*/

            /*getPoints.promise.then(function(points){
                console.log(points);
            });*/


            let renderContext = {
                canvasContext:this.pagedrawctx,
                //canvasContext:thispage.pagectx,
                viewport:viewport
            };
            let renderTask = page.render(renderContext);
            Globals.bPDFtemprender = true;

            // Wait for rendering to finish
            renderTask.promise.then(() => {
                this.pageRendering = false;
                Globals.bPDFtemprender = false;
                if (this.pageNumPending !== null) {
                    // New page rendering is pending
                    this.renderPDFpagescale(true);
                    this.pageNumPending = null;
                }
                this.pdfrenderopque -= 1;
                //console.log(thispage.pdfrenderopque);
                if(this.pdfrenderopque <= 0){
                    this.pdfrenderopque = 0;
                    this.pdfisrendered = true;
                }

                this.pagecanvas.width = this.pagedrawCanvas.width;
                this.pagecanvas.height = this.pagedrawCanvas.height;

                if (null!==this.pagectx){
                    this.pagectx.drawImage(this.pagedrawCanvas, 0,0);
                }

                this.pagedrawCanvas.width = 1;
                this.pagedrawCanvas.height = 1;

                //thispage.pdfisrendered = true;
                this.iscollapsed = false;
                this.backupScaleAndOffset();
                const renderend = new Date().getTime();

                const pagedata = {
                    page : this.pagenumber,
                    start : renderstart,
                    end : renderend
                };

                if(Rxcore_GUI_PDFRenderComplete != undefined){
                    Rxcore_GUI_PDFRenderComplete.RenderComplete(pagedata);
                }

                this.DocRef.draw_mpagepdf();

                /*if(draw){
                 thispage.draw_canvas(true);
                 }*/
            });

            //thispage.PDFTextArea.id = "PDFpage" + thispage.pagenumber + 1;
            let pgnum = this.pagenumber + 1;
            //var textareaid = "PDFpage" + pgnum;

            //thispage.PDFTextArea = document.getElementById(textareaid);

                this.PDFTextArea.style.left = this.startx + "px";
                this.PDFTextArea.style.top = this.starty + "px";
                //thispage.PDFTextArea.style.width = thispage.pagecanvas.width + "px";
                //thispage.PDFTextArea.style.height = thispage.pagecanvas.height + "px";
                this.PDFTextArea.style.width = this.offscreenwidth * this.dscalepdf + "px";
                this.PDFTextArea.style.height = this.offscreenheight * this.dscalepdf + "px";


            while (this.PDFTextArea.firstChild) {
                this.PDFTextArea.removeChild(this.PDFTextArea.firstChild);
            }

            page.getTextContent().then((textContent:any)=>{
                    this.textLayer = new TextLayerBuilder({
                        textLayerDiv : this.PDFTextArea,
                        pageIndex : pgnum - 1,
                        viewport : txtviewport
                    });
                    //thispage.textLayer.textLayerDiv = thispage.PDFTextArea;
                    //thispage.textLayer.pageIndex = pgnum - 1;
                    //thispage.textLayer.viewport = viewport;
                    this.textLayer.setTextContent(textContent);


                    this.textLayer.eventBus.on('textlayerrendered', (e:any)=>{
                    //if text search on reapply text search markers
                        if(this.DocRef.searchobj.active){
                            this.showSearch();
                         }
                    });
                    this.textLayer.render();
            });
        });
        // Update page counters
        //document.getElementById('page_num').textContent = pageNum;
    }

    public renderPDFMagnify(magnifyscale:any){

        this.DocRef.pdfDoc.getPage(this.pagenumber + 1).then((page:any)=>{
            page.cleanupAfterRender = true;

            let pagewidth = 0;
            let pageheight = 0;
            let pagetemp = 0;

            if(page.view[3] != 0){
                pagewidth = Math.abs(page.view[2] - page.view[0]);
                pageheight = Math.abs(page.view[3] - page.view[1]);
                pagetemp = Math.abs(page.view[2] - page.view[0]);
            }else{
                pagewidth = Math.abs(page.view[2] - page.view[0]);
                pageheight = Math.abs(page.view[3] - page.view[1]);
                pagetemp = Math.abs(page.view[2]- page.view[0]);
            }

            switch (page.pageInfo.rotate) {
                case 0:
                    break;
                case 90:
                    pagewidth = pageheight;
                    pageheight = pagetemp;
                    break;
                case 180:
                    break;
                case 270:
                    pagewidth = pageheight;
                    pageheight = pagetemp;
                    break;
            }

            //thispage.pdfpagewidth = pagewidth;
            //thispage.pdfpageheight = pageheight;
            let dscale = 0;
            let wscale = 0;
            let hscale = 0;
            if(this.usedincomposite && this.compositereference != undefined){
                if(this.isbackground){
                    dscale = this.compositereference.backgroundScale;
                    wscale = (this.compositereference.bgpagecanvas.width * dscale) / pagewidth;
                    hscale = (this.compositereference.bgpagecanvas.height * dscale) / pageheight;
                }
                if(this.isoverlay){
                    dscale = this.compositereference.overlayScale;
                    wscale = (this.compositereference.ovpagecanvas.width * dscale) / pagewidth;
                    hscale = (this.compositereference.ovpagecanvas.height * dscale) / pageheight;
                }
            }else{
                wscale = (this.offscreenwidth * this.dscalepdf) / pagewidth;
                hscale = (this.offscreenheight * this.dscalepdf) / pageheight;
            }

            let scale = Math.min(wscale, hscale);
            scale *= magnifyscale;
            let restscale = 1.0;
            if (scale > this.nPDFMaxFactor ){
                restscale = scale / this.nPDFMaxFactor;
                scale = this.nPDFMaxFactor;
                this.bMaxzoom = true;
            }else{
                restscale = 1.0;
                this.bMaxzoom = false;
            }
            let viewport = page.getViewport(scale);

            if (isNaN(viewport.height) || isNaN(viewport.width)){
                this.pageRendering = false;
                return;
            }else{
                this.magnifycanvas.height = viewport.height;
                this.magnifycanvas.width = viewport.width;
            }
            this.magnifyrestscale = restscale;
            /*if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
                if (viewport.height * viewport.width < 5000000) {
                    thispage.magnifycanvas.height = viewport.height;
                    thispage.magnifycanvas.width = viewport.width;
                    //thispage.dscalepdf = 1;
                    //thispage.markupscaleadjust = scale / thispage.pagescale;
                } else {
                    //thispage.pageRendering = false;
                    //thispage.dscalepdf = scale;
                    return;

                }

            } else {
                thispage.magnifycanvas.height = viewport.height;
                thispage.magnifycanvas.width = viewport.width;
                //thispage.dscalepdf = 1;
                //thispage.markupscaleadjust = scale / thispage.pagescale;
            }*/

            /*if (thispage.magnifycanvas.width <= canvasowidth) {
             thispage.dxpdf = (canvasowidth - viewport.width) / 2;
             }*/

            //thispage.curpagescale = thispage.magnifycanvas.width / pagewidth;
            //thispage.curpagescale = thispage.magnifycanvas.height / pageheight;

            let renderContext = {
                canvasContext : this.magnifypagectx,
                viewport : viewport
            };


            let renderTask = page.render(renderContext);
            // JS->TS:INFO added the let keyword for bPDFtemprendermag
            let bPDFtemprendermag = true;

            // Wait for rendering to finish
            renderTask.promise.then(() => {
                //thispage.pageRendering = false;
                bPDFtemprendermag = false;

                if(this.usedincomposite && this.compositereference != undefined){
                    if(this.isbackground){
                        this.invertpdfmagnify(1);
                    }
                    if(this.isoverlay){
                        this.invertpdfmagnify(2);
                    }
                }
                /*if (thispage.pageNumPending !== null) {
                 // New page rendering is pending
                 thispage.renderPDFMagnify(true);
                 thispage.pageNumPending = null;
                 }*/
                //thispage.pdfisrendered = true;
                //thispage.DocRef.draw_mpagepdf();
                /*if(draw){
                 thispage.draw_canvas(true);
                 }*/
            });
        });
    }

    public getPDFdimensions(num:number){
        this.DocRef.pdfDoc.getPage(num).then((page:any)=>{
            if (Globals.bAbortPageload){
                return;
            }
            //PDFJS page scaling not to be confused with scaling of canvas image.
            //this.pagescale = thispage.pagescale;
            let pagewidth = 0;
            let pageheight = 0;
            let pagetemp = 0;

            if(page.view[3] != 0){
                pagewidth = Math.abs(page.view[2] - page.view[0]);
                pageheight = Math.abs(page.view[3] - page.view[1]);
                pagetemp = Math.abs(page.view[2] - page.view[0]);
            }else{
                pagewidth = Math.abs(page.view[2] - page.view[0]);
                pageheight = Math.abs(page.view[3] - page.view[1]);
                pagetemp = Math.abs(page.view[2]- page.view[0]);
            }

            this.pdfpageref = page.pageInfo.ref;

            switch (page.pageInfo.rotate) {
                case 0:
                    break;
                case 90:
                    pagewidth = pageheight;
                    pageheight = pagetemp;
                    break;
                case 180:
                    break;
                case 270:
                    pagewidth = pageheight;
                    pageheight = pagetemp;
                    break;
            }

            this.pdfpagewidth = pagewidth;
            this.pdfpageheight = pageheight;

            this.originalwidth = pagewidth;
            this.originalheight = pageheight;

            this.nPDFMaxFactor = Math.sqrt(Globals.nMaximageArea / (pagewidth * pageheight));

            //test if current page scale 1.5 fit within canvas if not scale down until it does.

            const temppagescale = this.pagescale;
            let viewport = page.getViewport(this.pagescale);

            const yscale = Globals.fixedScaleSize.height / this.pdfpageheight; //thispage.MainImageHeight;
            const xscale = Globals.fixedScaleSize.width / this.pdfpagewidth; // thispage.MainImageWidth;
            this.fixedScale = Math.min(xscale, yscale);


            if ((viewport.height > Globals.canvasoheight && viewport.width > Globals.canvasowidth) || Globals.bPDFZoomAllinit) {
                const tempwscale = Globals.canvasowidth / pagewidth;
                const temphscale = Globals.canvasoheight / pageheight;
                if(Globals.bPDFZoomAllinit){
                    this.pagescale = Math.min(tempwscale, temphscale);
                }else{
                    this.pagescale = Math.max(tempwscale, temphscale);
                }

                //thispage.pagescale = Math.max(tempwscale, temphscale);
                viewport = page.getViewport(this.pagescale);
            }

            this.offscreenheight = viewport.height;
            this.offscreenwidth = viewport.width;

            //console.log(thispage.pagenumber, thispage.offscreenheight, thispage.offscreenwidth);

            //thispage.pagecanvas.height = viewport.height;
            //thispage.pagecanvas.width = viewport.width;

            this.width = viewport.width;
            this.height = viewport.height;

            let wscale = this.width / viewport.width;
            let hscale = this.height / viewport.height;
            this.pdfdscaletemp = Math.min(wscale, hscale);

            this.pdfdxtemp = (Globals.canvasowidth - viewport.width) / 2;
            this.pdfdytemp = (Globals.canvasoheight - viewport.height) / 2;

            this.curpagescale = this.pagescale;

            wscale = this.thumbnailobj.thumbnail.width / viewport.width;
            hscale = this.thumbnailobj.thumbnail.height / viewport.height;
            this.pdftempthumbscale = Math.min(wscale,hscale);
            this.pdftempthumbscale *= this.pagescale;

            this.dxthumbtemp = (this.thumbnailobj.thumbnail.width - viewport.width) / 2;
            this.dythumbtemp = (this.thumbnailobj.thumbnail.height - viewport.height) / 2;

            //set up and scale div for text then use function below to create text divs.

            this.setPDFDiminit(this.pdfdxtemp, 0, this.pdfdscaletemp);
        });
    }

    public PDFrenderpage(page:any){
        page.cleanupAfterRender = true;
        this.pageRendering = true;
        this.pdfstartrender = new Date().getTime();
        let num = this.pagenumber + 1;

        //PDFJS page scaling not to be confused with scaling of canvas image.
        //this.pagescale = thispage.pagescale;

        let TextLayerBuilder = pdfjsWebLibs.pdfjsWebTextLayerBuilder.TextLayerBuilder;
        let pagewidth = 0;
        let pageheight = 0;
        let pagetemp = 0;
        if(page.view[3] != 0){
            pagewidth = Math.abs(page.view[2] - page.view[0]);
            pageheight = Math.abs(page.view[3] - page.view[1]);
            pagetemp = Math.abs(page.view[2] - page.view[0]);
        }else{
            pagewidth = Math.abs(page.view[2] - page.view[0]);
            pageheight = Math.abs(page.view[3] - page.view[1]);
            pagetemp = Math.abs(page.view[2]- page.view[0]);
        }

        switch (page.pageInfo.rotate) {
            case 0:
                break;
            case 90:
                pagewidth = pageheight;
                pageheight = pagetemp;
                break;
            case 180:
                break;
            case 270:
                pagewidth = pageheight;
                pageheight = pagetemp;
                break;
        }

        this.pdfpagewidth = pagewidth;// * thispage.dscalepdf;
        this.pdfpageheight = pageheight;// * thispage.dscalepdf;

        this.originalwidth = pagewidth;
        this.originalheight = pageheight;

        this.nPDFMaxFactor = Math.sqrt(Globals.nMaximageArea / (this.pdfpagewidth * this.pdfpageheight));

        //set fixed scale for markup
        const yscale = Globals.fixedScaleSize.height / this.pdfpageheight; //thispage.MainImageHeight;
        const xscale = Globals.fixedScaleSize.width / this.pdfpagewidth; // thispage.MainImageWidth;
        this.fixedScale = Math.min(xscale, yscale);


        //test if current page scale 1.5 fit within canvas if not scale down until it does.

        const temppagescale = this.pagescale;
        let viewport = page.getViewport(this.pagescale * this.dscalepdf);
        //console.log(thispage.dscalepdf);

        if ((viewport.height > Globals.canvasoheight && viewport.width > Globals.canvasowidth) || Globals.bPDFZoomAllinit) {
            const tempwscale = Globals.canvasowidth / this.pdfpagewidth;
            const temphscale = Globals.canvasoheight / this.pdfpageheight;

            if (Globals.bPDFZoomAllinit){
                this.pagescale = Math.min(tempwscale, temphscale);
            }else{
                this.pagescale = Math.max(tempwscale, temphscale);
            }

            viewport = page.getViewport(this.pagescale);
        }

        this.setpagesize(viewport.width,viewport.height);

        this.width = this.offscreenwidth;
        this.height = this.offscreenheight;


        let wscale = (this.offscreenwidth) / viewport.width;
        let hscale = (this.offscreenheight) / viewport.height;
        this.pdfdscaletemp = Math.min(wscale, hscale);

        this.pdfdxtemp = (Globals.canvasowidth - viewport.width) / 2;
        this.pdfdytemp = (Globals.canvasoheight - viewport.height) / 2;

        this.curpagescale = this.pagescale;

        wscale = this.thumbnailobj.thumbnail.width / viewport.width;
        hscale = this.thumbnailobj.thumbnail.height / viewport.height;
        this.pdftempthumbscale = Math.min(wscale,hscale);
        this.pdftempthumbscale *= this.pagescale;

        this.dxthumbtemp = (this.thumbnailobj.thumbnail.width - viewport.width) / 2;
        this.dythumbtemp = (this.thumbnailobj.thumbnail.height - viewport.height) / 2;

        this.PDFTextArea.id = "PDFpage" + num;

        //thispage.PDFTextArea.style.top = thispage.pdfdytemp + "px";
        this.PDFTextArea.style.left = this.pdfdxtemp + "px";
        this.PDFTextArea.style.width = this.width + "px";
        this.PDFTextArea.style.height = this.height + "px";

        Globals.rxcontainer.appendChild(this.PDFTextArea);

        if(num == 1 && this.DocRef.textselect){
            this.PDFTextArea.style.display = Globals.szdispvalue;
        }else{
            this.PDFTextArea.style.display = "none";
        }

        let renderContext = {
            //canvasContext: thispage.pagectx,
            canvasContext: this.pagedrawctx,
            viewport: viewport
        };

        //thispage.setPFDdimnodraw(thispage.pdfdxtemp, 0, thispage.pdfdscaletemp,false);
        this.setPFDdimnodraw(this.pdfdxtemp, 0, 1,true);
        Globals.bPDFtemprender = true;

        const renderTask = page.render(renderContext);

        renderTask.promise.then( () => {
            this.pageRendering = false;
            Globals.bPDFtemprender = false;
            if (this.pageNumPending !== null) {
                // New page rendering is pending
                this.renderPDFpage(this.pageNumPending);
                this.pageNumPending = null;
            }
            this.pagecanvas.width = this.pagedrawCanvas.width;
            this.pagecanvas.height = this.pagedrawCanvas.height;

            if (null!==this.pagectx){
                this.pagectx.drawImage(this.pagedrawCanvas, 0,0);
            }

            this.pagedrawCanvas.width = 1;
            this.pagedrawCanvas.height = 1;

            this.pdfisrendered = true;
            this.iscollapsed = false;

            this.pdfisfirstrendered = true;
            this.setPDFdim(this.pdfdxtemp, 0, this.pdfdscaletemp);

            //console.log(thispage.pagenumber + 1);
            this.pdfendrender = new Date().getTime();
            this.pdfpagetime = (this.pdfendrender - this.pdfstartrender) - 200;
            this.pdfpagetime = 10;

            this.pdftimervar = setInterval(() => {
                this.pdftimer();
            }, this.pdfpagetime);

            this.setthumbnail(0,0,this.pdftempthumbscale);
            // thispage.DocRef.draw
        });

        page.getTextContent().then((textContent:any)=>{
            //if(num == 1){
            //callback call to determine if page has text.

            if (textContent.items.length > 0 ){
                if (RxCore_GUI_HasText != undefined){
                    RxCore_GUI_HasText.hastext = true;
                }
            }

            if (RxCore_GUI_HasText != undefined){
                RxCore_GUI_HasText.hasText(RxCore_GUI_HasText.hastext);
            }

            this.textLayer = new TextLayerBuilder({
                textLayerDiv : this.PDFTextArea,
                pageIndex : num - 1,
                viewport : viewport
            });

            this.textLayer.setTextContent(textContent);
            this.textLayer.render();
            //}
        });
    }

    public renderPDFpage(num:any) {
        this.pageRendering = true;

        this.pdfstartrender = new Date().getTime();
        // Using promise to fetch the page
        this.DocRef.pdfDoc.getPage(num).then((page:any) => {
            page.cleanupAfterRender = true;
            if (Globals.bAbortPageload){
                return;
            }
            //PDFJS page scaling not to be confused with scaling of canvas image.
            //this.pagescale = thispage.pagescale;

            const TextLayerBuilder = pdfjsWebLibs.pdfjsWebTextLayerBuilder.TextLayerBuilder;
            let pagewidth = 0;
            let pageheight = 0;
            let pagetemp = 0;

            if(page.view[3] != 0){
                pagewidth = Math.abs(page.view[2] - page.view[0]);
                pageheight = Math.abs(page.view[3] - page.view[1]);
                pagetemp = Math.abs(page.view[2] - page.view[0]);
            }else{
                pagewidth = Math.abs(page.view[2] - page.view[0]);
                pageheight = Math.abs(page.view[3] - page.view[1]);
                pagetemp = Math.abs(page.view[2]- page.view[0]);
            }

            this.pdfpageref = page.pageInfo.ref;

            this.PDFpageRotate = page.pageInfo.rotate;
            switch (page.pageInfo.rotate) {
                case 0:
                    break;
                case 90:
                    pagewidth = pageheight;
                    pageheight = pagetemp;
                    break;
                case 180:
                    break;
                case 270:
                    pagewidth = pageheight;
                    pageheight = pagetemp;
                    break;
            }

            this.pdfpagewidth = pagewidth;
            this.pdfpageheight = pageheight;

            this.originalwidth = pagewidth;
            this.originalheight = pageheight;


            let yscale = Globals.fixedScaleSize.height / this.pdfpageheight; //thispage.MainImageHeight;
            let xscale = Globals.fixedScaleSize.width / this.pdfpagewidth; // thispage.MainImageWidth;
            this.fixedScale = Math.min(xscale, yscale);
            //thispage.fixedScale = dscalelocalOne;


            this.nPDFMaxFactor = Math.sqrt(Globals.nMaximageArea / (pagewidth * pageheight));

            //test if current page scale 1.5 fit within canvas if not scale down until it does.

            let temppagescale = this.pagescale;
            let viewport:any=undefined;

            if(this.pdfdiminitset){
                viewport = page.getViewport(this.pagescale * this.dscalepdf);
            }else{
                viewport = page.getViewport(this.pagescale);
            }

            if ((viewport.height > Globals.canvasoheight && viewport.width > Globals.canvasowidth) || Globals.bPDFZoomAllinit) {
                const tempwscale = Globals.canvasowidth / this.pdfpagewidth;
                const temphscale = Globals.canvasoheight / this.pdfpageheight;
                if(Globals.bPDFZoomAllinit){
                    this.pagescale = Math.min(tempwscale, temphscale);
                }else{
                    this.pagescale = Math.max(tempwscale, temphscale);
                }
                viewport = page.getViewport(this.pagescale);
            }

            //console.log('renderPDFpage ' + thispage.dscalepdf,thispage.pdfdiminitset);

            this.setpagesize(viewport.width,viewport.height);

            //thispage.pagecanvas.height = viewport.height;
            //thispage.pagecanvas.width = viewport.width;

            this.width = this.offscreenwidth;
            this.height = this.offscreenheight;
            let wscale = this.offscreenwidth / viewport.width;
            let hscale = this.offscreenheight / viewport.height;
            this.pdfdscaletemp = Math.min(wscale, hscale);

            this.pdfdxtemp = (Globals.canvasowidth - viewport.width) / 2;
            this.pdfdytemp = (Globals.canvasoheight - viewport.height) / 2;

            this.curpagescale = this.pagescale;

            wscale = this.thumbnailobj.thumbnail.width / viewport.width;
            hscale = this.thumbnailobj.thumbnail.height / viewport.height;

            this.pdftempthumbscale = Math.min(wscale,hscale);
            this.pdftempthumbscale *= this.pagescale;

            this.dxthumbtemp = (this.thumbnailobj.thumbnail.width - viewport.width) / 2;
            this.dythumbtemp = (this.thumbnailobj.thumbnail.height - viewport.height) / 2;

            // Render PDF page into canvas context

            //thispage.pagectx.clearRect(0, 0, thispage.pagecanvas.width, thispage.pagecanvas.height);
            //thispage.pagectx.fillStyle = 'white';
            //thispage.pagectx.fillRect(0, 0, thispage.pagecanvas.width, thispage.pagecanvas.height);

            //thispage.PDFTextArea = document.getElementById("PDFTextArea");
            //if(num == 1){
            this.PDFTextArea.id = "PDFpage" + num;

            //thispage.PDFTextArea.style.top = thispage.pdfdytemp + "px";
            this.PDFTextArea.style.left = this.pdfdxtemp + "px";
            this.PDFTextArea.style.width = this.width + "px";
            this.PDFTextArea.style.height = this.height + "px";

            Globals.rxcontainer.appendChild(this.PDFTextArea);



            if(num == 1 && this.DocRef.textselect){
                this.PDFTextArea.style.display = Globals.szdispvalue;
            }else{
                this.PDFTextArea.style.display = "none";
            }
            //}

            /*var renderContext = {
             canvasContext:thispage.pagectx,
             viewport:viewport
             };*/

            //set up and scale div for text then use function below to create text divs.

            let renderContext = {
                //canvasContext: thispage.pagectx,
                canvasContext: this.pagedrawctx,
                viewport: viewport
            };

            /*page.render({
             canvasContext : context,
             viewport : viewport
             });*/

            const renderTask = page.render(renderContext);
            //page.render(renderContext);
            if(!this.pdfdiminitset){
                //thispage.setPFDdimnodraw(thispage.pdfdxtemp, 0, thispage.pdfdscaletemp,false);
                this.setPFDdimnodraw(this.pdfdxtemp, 0, 1,true);
            }

            Globals.bPDFtemprender = true;
            //temp test to check animate on first render.
            //bAnimatePDFrender = true;
            //thispage.iscollapsed = false;

            renderTask.promise.then(() => {
                this.pageRendering = false;
                Globals.bPDFtemprender = false;
                //bAnimatePDFrender = false;
                if (this.pageNumPending !== null) {
                    // New page rendering is pending
                    this.renderPDFpage(this.pageNumPending);
                    this.pageNumPending = null;
                }

                this.pagecanvas.width = this.pagedrawCanvas.width;
                this.pagecanvas.height = this.pagedrawCanvas.height;

                if (null!=this.pagectx){
                    this.pagectx.drawImage(this.pagedrawCanvas, 0,0);
                }
                this.pagedrawCanvas.width = 1;
                this.pagedrawCanvas.height = 1;

                this.PDFPointArray = page.pointArray;
                this.PDFinternalScale = page.internalscale;
                this.pdfSnapScale = this.pagescale;

                this.pdfisrendered = true;
                this.iscollapsed = false;

                this.pdfisfirstrendered = true;

                this.setPDFdim(this.pdfdxtemp, 0, this.pdfdscaletemp);

                this.pdfendrender = new Date().getTime();
                this.pdfpagetime = (this.pdfendrender - this.pdfstartrender) + 10;
                this.pdfpagetime = 10;
                //console.log(thispage.pdfpagetime);
                this.pdftimervar = setInterval(() =>{
                    this.pdftimer()
                }, this.pdfpagetime);

                //console.log(page.pointArray);
                //thispage.curpagescale

                //thispage.DocRef.draw_mpagepdf();

                this.setthumbnail(0,0,this.pdftempthumbscale);
            });

            page.getTextContent().then((textContent:any)=>{
                //if(num == 1){
                //callback call to determine if page has text.
                if (textContent.items.length > 0 ){
                    if (RxCore_GUI_HasText != undefined){
                        RxCore_GUI_HasText.hastext = true;
                    }

                }

                if (RxCore_GUI_HasText != undefined){
                    RxCore_GUI_HasText.hasText(RxCore_GUI_HasText.hastext);
                }
                this.textLayer = new TextLayerBuilder({
                    textLayerDiv : this.PDFTextArea,
                    pageIndex : num - 1,
                    viewport : viewport
                });
                this.textLayer.setTextContent(textContent);
                this.textLayer.render();

                //}
            });

            /*page.getTextContent().then(function (textContent) {

             if(num == 1){
             var textLayer = new TextLayerBuilder(thispage.PDFTextArea, num - 1); //The second zero is an index identifying
             //the page. It is set to page.number - 1.
             textLayer.setTextContent(textContent);

             var renderContext = {
             canvasContext: thispage.pagectx,
             viewport: viewport,
             textLayer: textLayer
             };

             }else{
             renderContext = {
             canvasContext: thispage.pagectx,
             viewport: viewport
             //textLayer: textLayer
             };

             }



             });*/


            // Wait for rendering to finish
        });

        // Update page counters
        //document.getElementById('page_num').textContent = pageNum;
    }

    public drawpoints(pointarray:any, scale:any){
        let localscalex=scale * 0.12;
        let localscaley=scale * 0.12;

        if(this.PDFinternalScale.x > 0){
            localscalex = scale * this.PDFinternalScale.x;
        }else{
            localscalex = scale * 0.12;
        }
        if (this.PDFinternalScale.y > 0){
            localscaley = scale * this.PDFinternalScale.y;
        }else{
            localscaley = scale * 0.12;
        }

        //thispage.

        let cheight = this.offscreenheight;
        let cwidth = this.offscreenwidth;

        //context.save();
        //context.translate(thispage.startx, canvas.height);

        //context.scale(1,-1);

        if (this.PDFpageRotate != 0) {
            //localscalex *= 0.1;
            //localscaley *= 0.1;
            //var txcanv = (canvasowidth / 2);
            //var tycanv = (canvasoheight / 2);
            //context.save();
            //context.translate(txcanv, tycanv);
            //context.rotate((360-thispage.PDFpageRotate) * (Math.PI / 180));
            //context.translate(-txcanv, -tycanv);

        }

        for(let i = 0;i<pointarray.length;i++){
            let transx = 0;
            let transy = 0;
            if (this.PDFpageRotate != 0) {
                transx = this.starty + (-(pointarray[i].y*localscaley) + cheight);
                transy = this.startx + (pointarray[i].x*localscalex);
            }else{
                transy = this.starty + (-(pointarray[i].y*localscaley) + cheight);
                /*if (thispage.PDFinternalScale.y > 0){

                }else{

                    transy = thispage.starty + ((pointarray[i].y*localscaley));
                }*/
                transx = this.startx + (pointarray[i].x*localscalex);
            }
            //drawsnap(context,{x:transx,y:transy});
            drawpoints(Globals.context,{x:transx,y:transy});
        }
        //context.restore();
    }

    public getdivpos(indx:number){
        const divpos = {
            x : 0,
            y : 0
        };

        this.pan_update(0,0);

        if(this.PDFTextArea != undefined){
            const divtext = this.PDFTextArea.children[indx];
            const topdivy = this.PDFTextArea.offsetTop;
            const topdivx = this.PDFTextArea.offsetLeft;
            divpos.y = divtext.offsetTop + topdivy;
            divpos.x = divtext.offsetLeft + topdivx;
        }

        if (this.TextSelectArea != undefined){
            const vdivtext = this.TextSelectArea.children[indx];
            const vtopdivy = this.TextSelectArea.offsetTop;
            const vtopdivx = this.TextSelectArea.offsetLeft;
            divpos.y = vdivtext.offsetTop + vtopdivy;
            divpos.x = vdivtext.offsetLeft + vtopdivx;

        }
        return divpos;
    }

    public indexdivTexts(){
        const pagetexts = [];
        if(this.PDFTextArea != undefined){
            const children = this.PDFTextArea.children;
            for (let i = 0; i < children.length; i++) {
                children[i].style.backgroundColor = null;
                const textChild = children[i];
                pagetexts.push(textChild.textContent);
                // Do stuff
            }
        }
        if (this.TextSelectArea != undefined){
            const vchildren = this.TextSelectArea.children;
            for (let vi = 0; vi < vchildren.length; vi++) {
                vchildren[vi].style.backgroundColor = null;
                const vtextChild = vchildren[vi];
                pagetexts.push(vtextChild.textContent);

            }
        }
        return pagetexts;
    }

    public clearmarktextdiv(indx:number,str:string){
        if(this.PDFTextArea != undefined){
            this.PDFTextArea.children[indx].innerHTML = "";
            const textnode = document.createTextNode(str);
            this.PDFTextArea.children[indx].appendChild(textnode);
        }
        if (this.TextSelectArea != undefined){
            this.TextSelectArea.children[indx].innerHTML = "";
            const vtextnode = document.createTextNode(str);
            this.TextSelectArea.children[indx].appendChild(vtextnode);
        }
    }

    public marktextdiv(indx:number,str:string,pos:number,length:number){
        if(this.PDFTextArea != undefined){
            const spantext = str.substring(pos, length+pos);
            const splittext = str.split(" ");
            this.PDFTextArea.children[indx].innerHTML = "";
            let numwords = 0;
            for (let i = 0;i<splittext.length;i++){
                let subpos = splittext[i].search(spantext);
                let textnode:any = undefined;
                if (subpos == -1) {
                    if(numwords>0){
                        textnode = document.createTextNode(splittext[i] + " ");
                    }else{
                        textnode = document.createTextNode(splittext[i]);
                    }
                    this.PDFTextArea.children[indx].appendChild(textnode);
                    numwords++;
                } else if (subpos >= 0) {
                    const node = document.createElement("span");
                    node.className = "highlight";                   // Create a <span> node
                    textnode = document.createTextNode(spantext);         // Create a text node
                    node.appendChild(textnode);                              // Append the text to <li>
                    this.PDFTextArea.children[indx].appendChild(node);
                    numwords = 0;
                }
            }
        }
        if(this.TextSelectArea != undefined){
            const vspantext = str.substring(pos, length+pos);
            const vsplittext = str.split(" ");
            this.TextSelectArea.children[indx].innerHTML = "";
            let vnumwords = 0;
            for (let vi = 0;vi<vsplittext.length;vi++){
                const vsubpos = vsplittext[vi].search(vspantext);
                let vtextnode:any = undefined;
                if (vsubpos == -1) {
                    if(vnumwords>0){
                        vtextnode = document.createTextNode(vsplittext[vi] + " ");
                    }else{
                        vtextnode = document.createTextNode(vsplittext[vi]);
                    }
                    this.TextSelectArea.children[indx].appendChild(vtextnode);
                    vnumwords++;
                }else if (vsubpos >= 0){
                    const vnode = document.createElement("span");
                    vnode.className = "highlight";                   // Create a <span> node
                    vtextnode = document.createTextNode(vspantext);         // Create a text node
                    vnode.appendChild(vtextnode);                              // Append the text to <li>
                    this.TextSelectArea.children[indx].appendChild(vnode);
                    vnumwords = 0;
                }
            }
        }
    }

    public getVectorSearchList(){
        const searcharray = this.indexdivTexts();
        const casesense = this.DocRef.searchobj.casesens;
        const str = this.DocRef.searchobj.expr;
        for (let txtcnt = 0;txtcnt < searcharray.length;txtcnt++){
            let searchexpr:string = '';
            let searchstr:string = '';

            if(!casesense){
                searchexpr = str.toLowerCase();
                searchstr = searcharray[txtcnt].toLowerCase();
            }else{
                searchexpr = str;
                searchstr = searcharray[txtcnt];
            }
            let found = false;
            const pos = searchstr.search(searchexpr);
            if (pos == -1) {
                found = false;
            } else if (pos >= 0) {
                found = true;
            }

            if (found){
                const resultobj = {
                    page : this.pagenumber,
                    indx : txtcnt,
                    searchtext : searcharray[txtcnt],
                    pos : pos,
                    length : str.length
                };
                this.DocRef.searchobj.matcharray.push(resultobj);
            }
        }

    }

    public getPDFSearchList(){
        //var resultarray = [];
        const searcharray = this.indexdivTexts();

        const casesense = this.DocRef.searchobj.casesens;
        const str = this.DocRef.searchobj.expr;

        for (let txtcnt = 0;txtcnt < searcharray.length;txtcnt++){
            let searchexpr:string = '';
            let searchstr:string = '';
            if(!casesense){
                searchexpr = str.toLowerCase();
                searchstr = searcharray[txtcnt].toLowerCase();
            }else{
                searchexpr = str;
                searchstr = searcharray[txtcnt];
            }
            let found = false;
            const pos = searchstr.search(searchexpr);
            if (pos == -1) {
                found = false;
            } else if (pos >= 0) {
                found = true;
            }
            if (found){
                const resultobj = {
                    page : this.pagenumber,
                    indx : txtcnt,
                    searchtext : searcharray[txtcnt],
                    pos : pos,
                    length : str.length
                };
                this.DocRef.searchobj.matcharray.push(resultobj);
            }
        }
        //return resultarray;
    }

    public getrotcoords(cx:number, cy:number, x:number, y:number, angle:number){
        const radians = (Math.PI / 180) * angle,
            cos = Math.cos(radians),
            sin = Math.sin(radians),
            nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
            ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
        return  {
            x:nx,
            y:ny
        }
    };

    public showSearch(){
        if(this.DocRef.searchobj.page == this.pagenumber){
            if(this.usevectorxml){
                this.settextdivs();
            }
            const text = this.DocRef.searchobj.matcharray[this.DocRef.searchobj.indx].searchtext;
            const counter = this.DocRef.searchobj.matcharray[this.DocRef.searchobj.indx].indx;
            const pos = this.DocRef.searchobj.matcharray[this.DocRef.searchobj.indx].pos;
            const length = this.DocRef.searchobj.matcharray[this.DocRef.searchobj.indx].length;
            //thispage.marktextdiv(counter,text,pos,length);
            const divpos = this.getdivpos(counter);


             //var visible = this.istextvisible(divpos.x, divpos.y);
             /*
             0 = right
             1 = left
             2 = up
             3 = down
            */

            const centery = Globals.canvasoheight / 2;
            const centerx = Globals.canvasowidth / 2;
            let panx = 0;
            let pany = 0;
            let distancexright = 0;
            let distanceybottom = 0;
            let distancexleft = 0;
            let distanceytop = 0;
            let move = 0;
            if(this.drotation != 0){
                const rotpos = this.getrotcoords(centerx,centery,divpos.x,divpos.y, -this.drotation);
                //divpos.x = rotpos.x;
                //divpos.y = rotpos.y;
                distancexright = Math.max(rotpos.x,Globals.canvasowidth) - Math.min(rotpos.x,Globals.canvasowidth);
                if (Math.max(rotpos.x,Globals.canvasowidth) == rotpos.x){
                    move = 1;
                    //panx =  distancexright + 300;
                    panx = rotpos.x - centerx;
                }else if(distancexright < 300) {
                    move = 1;
                    panx = rotpos.x - centerx;
                }
                distanceybottom = Math.max(rotpos.y,Globals.canvasoheight) - Math.min(rotpos.y,Globals.canvasoheight);
                if (Math.max(rotpos.y,Globals.canvasoheight) == rotpos.y){
                    move = 2;
                    pany = rotpos.y - centery;
                }else if(distanceybottom < 100){
                    move = 2;
                    pany = rotpos.y - centery;
                }
                distancexleft = Math.max(rotpos.x,0) - Math.min(rotpos.x,0);
                if (Math.min(rotpos.x,0) == rotpos.x){
                    move = 0;
                    panx = -(centerx - rotpos.x);
                }else if(distancexleft < 100) {
                    move = 0;
                    panx = -(centerx - rotpos.x);
                }
                distanceytop = Math.max(rotpos.y,0) - Math.min(rotpos.y,0);
                if (Math.min(rotpos.y,0) == rotpos.y){
                    move = 3;
                    pany = -(centery - rotpos.y);
                }else if(distanceytop < 100){
                    move = 3;
                    pany = -(centery - rotpos.y);
                }

                /*switch (thispage.drotation) {
                    case 90:
                        //this.dxvector -= sy;
                        //this.dyvector += sx;
                        thispage.pan_update(pany,-panx);

                        break;
                    case 180:
                        //this.dxvector += sx;
                        //this.dyvector += sy;
                        thispage.pan_update(-panx,-pany);
                        break;
                    case 270:
                        //this.dxvector += sy;
                        //this.dyvector -= sx;
                        thispage.pan_update(-pany,panx);
                        break;
                }*/
                this.pan_update(panx,pany);
            }else{
                distancexright = Math.max(divpos.x,Globals.canvasowidth) - Math.min(divpos.x,Globals.canvasowidth);
                if (Math.max(divpos.x,Globals.canvasowidth) == divpos.x){
                    move = 1;
                    //panx =  distancexright + 300;
                    panx = divpos.x - centerx;
                }else if(distancexright < 300) {
                    move = 1;
                    panx = divpos.x - centerx;
                }
                distanceybottom = Math.max(divpos.y,Globals.canvasoheight) - Math.min(divpos.y,Globals.canvasoheight);
                if (Math.max(divpos.y,Globals.canvasoheight) == divpos.y){
                    move = 2;
                    pany = divpos.y - centery;
                }else if(distanceybottom < 100){
                    move = 2;
                    pany = divpos.y - centery;
                }

                distancexleft = Math.max(divpos.x,0) - Math.min(divpos.x,0);
                if (Math.min(divpos.x,0) == divpos.x){
                    move = 0;
                    panx = -(centerx - divpos.x);
                    //var panx = distancexleft - 200;
                }else if(distancexleft < 100) {
                    move = 0;
                    panx = -(centerx - divpos.x);
               }

                distanceytop = Math.max(divpos.y,0) - Math.min(divpos.y,0);
                if (Math.min(divpos.y,0) == divpos.y){
                    move = 3;
                    pany = -(centery - divpos.y);
                }else if(distanceytop < 100){
                    move = 3;
                    pany = -(centery - divpos.y);
                }
                this.pan_update(panx,pany);
            }

            this.marktextdiv(counter,text,pos,length);
            /*if(visible){
                thispage.pan_update();
            }*/

            //console.log(visible);
            //console.log(divpos.y);
            //console.log(canvas.height);
        }
    }

    public clearSearch(){
        if(this.DocRef.searchobj.page == this.pagenumber){
            const text = this.DocRef.searchobj.matcharray[this.DocRef.searchobj.indx].searchtext;
            const counter = this.DocRef.searchobj.matcharray[this.DocRef.searchobj.indx].indx;
            this.clearmarktextdiv(counter,text);
        }
    }


    /*this.getPDFpagetext = function (){

        var resultarray = [];
        var searcharray = thispage.indexdivTexts();

        var casesense = thispage.DocRef.searchobj.casesens;
        var str = thispage.DocRef.searchobj.expr;

        for (var txtcnt = DocRef.searchobj.indx;txtcnt < searcharray.length;txtcnt++){

            if(!casesense){
                var searchexpr = str.toLowerCase();
                var searchstr = searcharray[txtcnt].toLowerCase();
            }else{
                searchexpr = str;
                searchstr = searcharray[txtcnt];

            }
            var found = false;
            var pos = searchstr.search(searchexpr);
            if (pos == -1) {
                found = false
            } else if (pos >= 0) {
                found = true;
            }

            if (found){
                //console.log(thispage.pagenumber + 1,txtcnt, searchstr);
                var resultobj = {
                  page : thispage.pagenumber,
                  indx : txtcnt,
                  searchtext : searcharray[txtcnt],
                  pos : pos,
                  length : str.length
                };
                resultarray.push(resultobj);

                if(thispage.DocRef.searchobj.page == thispage.pagenumber){
                    thispage.marktextdiv(txtcnt,searcharray[txtcnt],pos,str.length);
                }
                DocRef.searchobj.indx = txtcnt;


            }
        }

    };*/

    public loadimages() {
        //get_image(this.SmallImageSRC,this.smallimage);
        //showDownloadDialog();
        if (RxCore_GUI_Download != undefined) {
            RxCore_GUI_Download.setDownload("show");
        }
        //this.smallimage.addEventListener('load', this.smallimageload, false);
        //this.smallimage.addEventListener('progress', this.smallimageprogress, false);
        //this.smallimage.src = this.SmallImageSRC;
        this.smallimageload();

        //draw_image(ev.srcElement);
        //get_image(this.MainImageSRC,this.largeimage);
        //showDownloadDialog();
        /*if (RxCore_GUI_Download != undefined) {
            RxCore_GUI_Download.setDownload("show");
        }*/
        this.largeimageload();

        //this.largeimage.addEventListener('load', this.largeimageload, false);
        //this.largeimage.addEventListener('progress', this.largeimageprogress, false);
        //this.largeimage.src = this.MainImageSRC;

        //get_image(this.ThumbnailImageSRC,this.imagethumb);
    }
    //this.loadvector = function(this.Vector2DSRC){


    //  DrawVectors(this.VectorSRC);
    //};

    public setvectordim(dx:number, dy:number, dscale:number) {
        this.dxvector = dx;
        this.dyvector = dy;
        this.dscalevector = dscale;
        this.initialscale = dscale;
        this.vectorloaded = true;

        this.startx = this.dxvector;
        this.starty = this.dyvector;
        //dxlocal = (canvasowidth - (thispage.VectorPageObj.width*dscalelocal)) / 2;
        //dylocal = (canvasoheight - (thispage.VectorPageObj.height*dscalelocal)) / 2;

        this.endx = (this.VectorPageObj.width * this.dscalevector) + this.startx;
        this.endy = (this.VectorPageObj.height * this.dscalevector) + this.starty;

        //thispage.vectorstartrender = new Date().getTime();

        if (this.usedincomposite && this.compositereference != undefined) {
            //this.compositereference.draw_compare(true);
            this.compositereference.scaleToBackground(true);
        } else {
            this.draw_vector(true);
        }
        //this.draw_vector(true);
        //thispage.vectorendrender = new Date().getTime();
        //thispage.vectorpagetime = (thispage.vectorendrender - thispage.vectorstartrender);
        this.vectorpagetime = this.VectorPageObj.vectorpagetime;
        this.vectortimervar = setInterval(() =>{
            this.vectortimer();
        }, this.vectorpagetime);

        const textwidth = this.endx - this.startx;
        const textheight = this.endy - this.starty;

        if (this.VectorPageObj.textlist.length > 0 ){
            this.settextdivs(); // true); // JS->TS:INFO removed the parameter since the function is defined without one
        }

        if(this.TextSelectArea != undefined){
            this.TextSelectArea.style.top = this.starty + "px";
            this.TextSelectArea.style.left = this.startx + "px";
            this.TextSelectArea.style.width = textwidth + "px";
            this.TextSelectArea.style.height = textheight + "px";
            Globals.rxcontainer.appendChild(this.TextSelectArea);
            //thispage.TextSelectArea.parentNode = rxcontainer;

            // JS->TS:INFO replaced firstpage with this.firstpage
            if(this.firstpage && this.DocRef.textselect){
                this.TextSelectArea.style.display = Globals.szdispvalue;
            }else{
                this.TextSelectArea.style.display = "none";
            }
        }
        // JS->TS:INFO replaced firstpage with this.firstpage
        if (this.firstpage && !this.DocRef.markuploaded) {
            if (Globals.bUsemarkupbyref) {
                getMarkupbyReference(this.path, this.DocRef.FileName);
            } else if(Globals.bUsemarkupbyrefEx){
                getMarkupxmlurl();
            }else{
                getMarkupFilelist(this.path, this.DocRef.FileName);
            }
            //getMarkupFilelist(path);
        }

        if (Globals.doCompare) {
            comparecheck(this.DocRef.FileName);
        } else {
            DeactivateAll();
            this.DocRef.SetActive();
        }
        if(this.DocRef.bDoPrint){
            if (this.DocRef.checkprintready()){
                printCanvas(Globals.PrintPageURL);
            }
        }
        RxCore_default();
        if (this.firstpage){
            if (Rxcore_GUI_fileLoadComplete != undefined) {
                Rxcore_GUI_fileLoadComplete.loadComplete(this.DocRef.FileName);
            }
        }

        if (Rxcore_GUI_pageLoadComplete != undefined) {
            Rxcore_GUI_pageLoadComplete.loadComplete(this.pagenumber);
        }
    }

    public removetext(){
        if(this.TextSelectArea == undefined){
            return;
        }
        this.TextSelectArea.removeEventListener('wheel', ev_canvas, true);
        //rxcontainer.removeChild(thispage.TextSelectArea);
        this.TextSelectArea.remove();
    };

    public selecttext(){
        if(this.TextSelectArea == undefined){
            return;
        }
        if(this.DocRef.textselect){
            this.TextSelectArea.style.display = Globals.szdispvalue;
        }else{
            this.TextSelectArea.style.display = "none";
        }
    }

    public movetextdivs(){
        if(this.TextSelectArea == undefined){
            return;
        }

        const centery = Globals.canvasoheight / 2;
        const centerx = Globals.canvasowidth / 2;

        this.TextSelectArea.removeAttribute("style");

        const textwidth = this.endx - this.startx;
        const textheight = this.endy - this.starty;
        const centerxoff = centerx - this.startx;
        const centeryoff = centery - this.starty;

        this.TextSelectArea.style.top = this.starty + "px";
        this.TextSelectArea.style.left = this.startx + "px";

        this.TextSelectArea.style.width = textwidth + "px";
        this.TextSelectArea.style.height = textheight + "px";

        if(this.DocRef.textselect){
            this.TextSelectArea.style.display = Globals.szdispvalue;
        }else{
            this.TextSelectArea.style.display = "none";
        }

        if(this.drotation != 0){
            const szcentertrans = centerxoff + "px" + " " + centeryoff + "px";
            //thispage.TextSelectArea.style.transformOrigin="50% 50%";
            this.TextSelectArea.style.transformOrigin = szcentertrans;
            this.TextSelectArea.style.transform = "rotate(" + this.drotation + "deg)";
        }
    }

    public settextdivs(){
        if(this.TextSelectArea == undefined){
            return;
        }
        this.TextSelectArea.removeAttribute("style");

        const textwidth = this.endx - this.startx;
        const textheight = this.endy - this.starty;
        this.TextSelectArea.style.top = this.starty + "px";
        this.TextSelectArea.style.left = this.startx + "px";
        this.TextSelectArea.style.width = textwidth + "px";
        this.TextSelectArea.style.height = textheight + "px";

        if(this.DocRef.textselect){
            this.TextSelectArea.style.display = Globals.szdispvalue;
        }else{
            this.TextSelectArea.style.display = "none";
        }

        if(this.drotation != 0){
            this.TextSelectArea.style.transformOrigin="50% 50%";
            this.TextSelectArea.style.transform = "rotate(" + this.drotation + "deg)";
        }

        const textdata = {
            textLayerDiv : this.TextSelectArea,
            scale : this.dscalevector,
            dx : this.dxvector,
            dy : this.dyvector
        };

        this.VectorPageObj.TextLayerBuilder(textdata);
    }

    public cleartextdivs(){
        if(this.TextSelectArea == undefined){
            return;
        }
        const textdata = {
            textLayerDiv : this.TextSelectArea,
            scale : this.dscalevector,
            dx : this.dxvector,
            dy : this.dyvector
        };
        this.VectorPageObj.TextLayerClear(textdata);
    }

    public setimagedimlarge(dx:number, dy:number, dscale:number) {
        this.dx = dx;
        this.dy = dy;
        this.dscale = dscale;
        this.largeimageloaded = true;
        //redraw markup here in case scaling is available after markup is loaded.
        //documentopen = true;
        //drawmarkupAll(cntximg);
        if (this.firstpage && !this.DocRef.markuploaded) {
            if (Globals.bUsemarkupbyref) {
                getMarkupbyReference(this.path, this.DocRef.FileName);
            } else if(Globals.bUsemarkupbyrefEx) {
                getMarkupxmlurl();
            }else{
                getMarkupFilelist(this.path, this.DocRef.FileName);
            }
            //getMarkupFilelist(path);
        }
        if (this.initialzoom == 1) {
            // TODO:JS->TS:ADJUST this branch was also empty in the original code
        } else {
            this.ZoomRealSize();
        }
        this.draw_image(true);

        if (RxCore_GUI_Download != undefined) {
            RxCore_GUI_Download.setDownload("hide");
        }

        if (Globals.doCompare) {
            comparecheck(this.DocRef.FileName);
        } else {
            DeactivateAll();
            this.DocRef.SetActive();
        }
        //this.draw_image();
        if(this.DocRef.bDoPrint){
            if (this.DocRef.checkprintready()){
                printCanvas(Globals.PrintPageURL);
            }
        }
        RxCore_default();
        if (this.firstpage){
            if (Rxcore_GUI_fileLoadComplete != undefined) {
                Rxcore_GUI_fileLoadComplete.loadComplete(this.DocRef.FileName);
            }
        }
        if (Rxcore_GUI_pageLoadComplete != undefined) {
            Rxcore_GUI_pageLoadComplete.loadComplete(this.pagenumber);
        }
    }

    public setthumbnail(dx:number,dy:number,dscale:number){
        this.dxthumb=dx;
        this.dythumb=dy;
        this.dscalethumb=dscale;
        if(!this.usevector3Dxml){
            this.draw_thumbnail();
        }
    }

    public setimagedimsmall(dx:number, dy:number, dscale:number) {
        this.dxextent = dx;
        this.dyextent = dy;
        this.dscaleextent = dscale;
        this.initialscale = dscale;
        this.startx = this.dxextent;
        this.starty = this.dyextent;
        this.endx = (this.SmallImageWidth * this.dscaleextent) + this.startx;
        this.endy = (this.SmallImageHeight * this.dscaleextent) + this.starty;
        this.smallimageloaded = true;
        //draw image on screen for the first time after loading here.

        if(this.largeimageloaded){
            this.dscale = (this.smallimagecnv.width * this.dscaleextent) / this.largeimagecnv.width;
            this.dx = this.dxextent;
            this.dy = this.dyextent;
            this.bitmapratio = this.dscale / this.dscaleextent;
        }else{
            this.dscale = this.dscaleextent;
            this.dx = this.dxextent;
            this.dy = this.dyextent;

            this.bitmapratio = 1;
        }
        this.draw_image(true);
        //this.draw_image();
        //drawmarkupAll(cntximg);
    }

    public checkimageswitch() {
        let tempfactor:number;
        if (this.usedincomposite && this.compositereference != undefined && this.isbackground) {
            if(this.currentimage == 1){
                tempfactor = Globals.imageswitchfactor;
            }else{
                tempfactor  = Globals.imageswitchfactor / (this.MainImageWidth / this.SmallImageWidth);
            }
            if (this.compositereference.backgroundScale < tempfactor) {
                this.currentimage = 1;
            } else {
                this.currentimage = 0;
                //alert("switching to large image");
            }
            this.startx = this.dx;
            this.starty = this.dy;
            this.endx = (this.MainImageWidth * this.dscale) + this.startx;
            this.endy = (this.MainImageHeight * this.dscale) + this.starty;
        }else{
            if ((this.dscale / this.bitmapratio) < Globals.imageswitchfactor) {
                this.currentimage = 1;
            } else {
                this.currentimage = 0;
                //alert("switching to large image");
            }
            this.startx = this.dx;
            this.starty = this.dy;
            this.endx = (this.MainImageWidth * this.dscale) + this.startx;
            this.endy = (this.MainImageHeight * this.dscale) + this.starty;
        }
    }
    /*this.checkimageswitch = function () {
        if (this.dscaleextent < imageswitchfactor) {
            this.currentimage = 1;
            this.startx = this.dxextent;
            this.starty = this.dyextent;
            this.endx = (this.SmallImageWidth * this.dscaleextent) + this.startx;
            this.endy = (this.SmallImageHeight * this.dscaleextent) + this.starty;


        } else {
            this.currentimage = 0;
            this.startx = this.dx;
            this.starty = this.dy;
            this.endx = (this.MainImageWidth * this.dscale) + this.startx;
            this.endy = (this.MainImageHeight * this.dscale) + this.starty;

            //alert("switching to large image");
        }

        /*if (this.dscale > 0.3){
         this.currentimage = 0;
         //alert("switching to large image");
         }else{
         this.currentimage = 1;
         }

    };*/

    public ZoomRealSize() {
        //xscale = canvasowidth / thispage.MainImageWidth;
        const originalwidthpx = this.MainImageWidth / this.MainImageScaling;
        const originalinch = originalwidthpx / this.DPI;
        //assume 96 dpi for canvas
        const canvaswidthpx = originalinch * 96;
        this.dscale = canvaswidthpx / this.MainImageWidth;

        /*originalwidthpx = thispage.SmallImageWidth / this.SmallImageScaling;
        originalinch = originalwidthpx / thispage.DPI;
        canvaswidthpx = originalinch * 96;
        this.dscaleextent = canvaswidthpx / this.SmallImageWidth;*/

        this.dx = (Globals.canvasowidth - (this.MainImageWidth * this.dscale)) / 2;
        this.dy = 0;

        /*this.dxextent = (canvasowidth - (this.SmallImageWidth * this.dscaleextent)) / 2;
        this.dyextent = 0;*/
    }

    public getdx() {
        if (this.usevectorxml) {
            return this.dxvector;
        } else if (this.usepdfjs) {
            return this.dxpdf;
        } else {
            return this.dx;
        }
    }

    public getdy() {
        if (this.usevectorxml) {
            return this.dyvector;
        } else if (this.usepdfjs) {
            return this.dypdf;
        } else {
            return this.dy;
        }
    }

    public getdscale() {
        if (this.usevectorxml) {
            return this.dscalevector;
        } else if (this.usepdfjs) {
            return this.dscalepdf * this.curpagescale;
        } else {
            return this.dscale;
            /*if (this.currentimage == 0){

            }else{
                return this.dscaleextent;
            }*/

        }
    }

    public setpagedim(height:number, width:number,  x:number, y:number ){
        const pgdim = this.getpagedim();
        let scalew = width / pgdim.w;
        // let scaleh = height / pgdim.h; // TODO:JS->TS:CHECK looks like scaleh is not used
        if (scalew > 1){
            this.ZoomIn(scalew,true,true);
        }else{
            scalew = 1/scalew;
            this.ZoomOut(scalew,true,true);
        }
        this.pan_position(x,y);
        //console.log(scaleh, scalew);
    }

    public getpagedim(){
        let dpi = this.DPI;
        if (this.usepdfjs){
            dpi = 72;
        }
        const pagerect = this.getpagerect();
        const pgdim = {
            x : pagerect.x,
            y : pagerect.y,
            w : pagerect.w,
            h : pagerect.h,
            origw : this.originalwidth,
            origh : this.originalheight,
            scale : this.getdscale(),
            dpi : dpi,
            rotation : this.drotation
        };

        return pgdim;
    }

    public redraw(){
        if (this.usevectorxml) {
            this.draw_vector(false);
        }else if (this.usepdfjs) {
            this.pdfisrendered = false;
            this.pdfrenderopque += 1;
        }else{
            this.draw_image(true);
        }
        drawmarkupAll(Globals.cntximg);
        DrawMarkupSelected(Globals.context);
    }

    public zoomall(bexternal:any=undefined) { // JS->TS:INFO added undefined since bexternal is not always specified
        //SetImageDim(myimage);
        let pagerect:any = undefined;
        let zoomparams:any = undefined;
        if(RxCore_GUI_ZoomUpdate != undefined && bexternal == undefined){
            pagerect = this.getpagerect();
            zoomparams = {rect : pagerect};
            RxCore_GUI_ZoomUpdate.zoomUpdate(zoomparams, 3);
        }
        let yscale = this.dscale;
        let xscale = this.dscale;
        let pcanvheight = 0;
        let pcanvwidth = 0;
        if (this.usepdfjs) {
            if (this.usedincomposite && this.compositereference != undefined){
                pcanvheight = this.compositereference.ovpagecanvas.height;
                pcanvwidth = this.compositereference.ovpagecanvas.width;
            }else{
                pcanvheight = this.offscreenheight;
                pcanvwidth = this.offscreenwidth;
            }
        }
        switch (this.drotation) {
            case 0:
                yscale = Globals.canvasoheight / this.MainImageHeight;
                xscale = Globals.canvasowidth / this.MainImageWidth;
                this.dscale = Math.min(xscale, yscale);
                break;
            case 90:
                yscale = Globals.canvasoheight / this.MainImageWidth;
                xscale = Globals.canvasowidth / this.MainImageHeight;
                this.dscale = Math.min(xscale, yscale);
                break;
            case 180:
                yscale = Globals.canvasoheight / this.MainImageHeight;
                xscale = Globals.canvasowidth / this.MainImageWidth;
                this.dscale = Math.min(xscale, yscale);
                break;
            case 270:
                yscale = Globals.canvasoheight / this.MainImageWidth;
                xscale = Globals.canvasowidth / this.MainImageHeight;
                this.dscale = Math.min(xscale, yscale);
                break;
        }
        this.dx = (Globals.canvasowidth - (this.MainImageWidth * this.dscale)) / 2;
        this.dy = (Globals.canvasoheight - (this.MainImageHeight * this.dscale)) / 2;

        if (this.usevectorxml) {
            yscale = this.dyvector;
            xscale = this.dxvector;
            switch (this.drotation) {
                case 0:
                    yscale = Globals.canvasoheight / this.VectorPageObj.height;
                    xscale = Globals.canvasowidth / this.VectorPageObj.width;
                    this.dscalevector = Math.min(xscale, yscale);
                    break;
                case 90:
                    yscale = Globals.canvasoheight / this.VectorPageObj.width;
                    xscale = Globals.canvasowidth / this.VectorPageObj.height;
                    this.dscalevector = Math.min(xscale, yscale);
                    break;
                case 180:
                    yscale = Globals.canvasoheight / this.VectorPageObj.height;
                    xscale = Globals.canvasowidth / this.VectorPageObj.width;
                    this.dscalevector = Math.min(xscale, yscale);
                    break;
                case 270:
                    yscale = Globals.canvasoheight / this.VectorPageObj.width;
                    xscale = Globals.canvasowidth / this.VectorPageObj.height;
                    this.dscalevector = Math.min(xscale, yscale);
                    break;
            }
            this.dxvector = (Globals.canvasowidth - (this.VectorPageObj.width * this.dscalevector)) / 2;
            this.dyvector = (Globals.canvasoheight - (this.VectorPageObj.height * this.dscalevector)) / 2;
        }
        if (this.usepdfjs) {
            yscale = this.dypdf;
            xscale = this.dxpdf;
            switch (this.drotation) {
                case 0:
                    yscale = Globals.canvasoheight / pcanvheight;
                    xscale = Globals.canvasowidth / pcanvwidth;
                    this.dscalepdf = Math.min(xscale, yscale);
                    break;
                case 90:
                    yscale = Globals.canvasoheight / pcanvwidth;
                    xscale = Globals.canvasowidth / pcanvheight;
                    this.dscalepdf = Math.min(xscale, yscale);
                    break;
                case 180:
                    yscale = Globals.canvasoheight / pcanvheight;
                    xscale = Globals.canvasowidth / pcanvwidth;
                    this.dscalepdf = Math.min(xscale, yscale);
                    break;
                case 270:
                    yscale = Globals.canvasoheight / pcanvwidth;
                    xscale = Globals.canvasowidth / pcanvheight;
                    this.dscalepdf = Math.min(xscale, yscale);
                    break;
            }
            this.pdfisrendered = false;
            this.pdfrenderopque += 1;
            this.dxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
            this.dypdf = (Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2;
        }
        //this.currentimage = 1;
        if (this.usevector3Dxml) {
            return;
        }
        if (!this.usevectorxml) {
            if (this.usepdfjs) {
                //DocObj.draw_mpagepdf();
                this.startx = this.dxpdf;
                this.starty = this.dypdf;
                this.endx = (pcanvwidth * this.dscalepdf) + this.startx;
                this.endy = (pcanvheight * this.dscalepdf) + this.starty;
                if (this.pagenumber == this.DocRef.pages[this.DocRef.currentpage].pagenumber) {
                    if (this.usedincomposite && this.compositereference != undefined) {
                        this.dscalepdf = this.compositereference.getoverlayScaleFactor(3);
                        this.compositereference.scaleToBackground(true);
                    }else{
                        this.DocRef.zoomall();
                        this.DocRef.draw_mpagepdf();
                    }
                }
            } else {
                this.checkimageswitch();
                if (this.DocRef.Type == 0) {
                    this.DocRef.draw_mpage();
                } else {
                    if (this.usedincomposite && this.compositereference != undefined) {
                        //this.dscale = this.compositereference.getoverlayScaleFactor(3);
                        this.compositereference.scaleToBackground(true);
                    } else {
                        this.draw_image(true);
                    }
                }
            }
        } else {
            this.startx = this.dxvector;
            this.starty = this.dyvector;
            this.endx = (this.VectorPageObj.width * this.dscalevector) + this.startx;
            this.endy = (this.VectorPageObj.height * this.dscalevector) + this.starty;
            if (this.usedincomposite && this.compositereference != undefined) {
                //this.dscalevector = this.compositereference.getoverlayScaleFactor(3);
                this.compositereference.scaleToBackground(true);
            } else {
                this.draw_vector(false);
            }
        }
        drawmarkupAll(Globals.cntximg);
        DrawMarkupSelected(Globals.context);
        if(RxCore_GUI_ZoomUpdated != undefined && bexternal == undefined){
            pagerect = this.getpagerect();
            zoomparams = {rect : pagerect};
            RxCore_GUI_ZoomUpdated.zoomUpdate(zoomparams, 3);
        }
    }

    public ZoomPageUpdate(zoomparams:any, type:any){
        switch(type){
            case 0 :
                this.ZoomIn(zoomparams.factor, zoomparams.center,true, zoomparams.mousepos);
                break;
            case 1 :
                this.ZoomOut(zoomparams.factor, zoomparams.center,true, zoomparams.mousepos);
                break;
            case 2 :
                this.zoom_update(zoomparams.sx, zoomparams.sy, zoomparams.sWide, zoomparams.sHi,true);
                //zoom window
                break;
            case 3 :
                this.zoomall(true);
                break;
            case 4 :
                this.zoomwidth(true);
                //zoom width
                break;
            case 5 :
                this.zoomheight(true);
                break;
        }
    }

    public ZoomIn(factor:number, center:any, bexternal:any, mousepos:any = undefined) { // JS->TS:INFO adds default value of undefined since there are calls wihtout the third param
        if (this.usevector3Dxml) {
            return;
        }
        let pagerect:any;
        let zoomparams:any;
        if(RxCore_GUI_ZoomUpdate != undefined && bexternal == false ){
            pagerect = this.getpagerect();
            zoomparams = {factor : factor, center : center, mousepos : mousepos, rect : pagerect};
            RxCore_GUI_ZoomUpdate.zoomUpdate(zoomparams, 0);
        }
        let rotatedpoint:any;
        let mouseposdiffx:number=0;
        let mouseposdiffy:number=0;
        if (mousepos){
            rotatedpoint = {x:mousepos.x,y:mousepos.y};
            if(this.drotation != 0){
                rotatedpoint = mouse_rotated(mousepos.x,mousepos.y);
            }
            mouseposdiffx = (((Globals.canvasowidth / 2) - rotatedpoint.x) * factor) - ((Globals.canvasowidth / 2) - rotatedpoint.x);
            mouseposdiffy = (((Globals.canvasoheight / 2) - rotatedpoint.y) * factor) - ((Globals.canvasoheight / 2) - rotatedpoint.y);
        }
        //imagescale
        const prevcenterx = (Globals.canvasowidth - (this.MainImageWidth * this.dscale)) / 2;
        const prevcentery = (Globals.canvasoheight - (this.MainImageHeight * this.dscale)) / 2;
        const diffx = prevcenterx - this.dx;
        const diffy = prevcentery - this.dy;
        this.dscale = this.dscale * factor;
        const centerx = ((Globals.canvasowidth - (this.MainImageWidth * this.dscale)) / 2);
        const centery = ((Globals.canvasoheight - (this.MainImageHeight * this.dscale)) / 2);

        if (center) {
            this.dx = centerx;
            this.dy = centery;
        } else {
            this.dx = centerx - (diffx * factor);
            this.dy = centery - (diffy * factor);
        }
        if (mousepos){
            this.dx += mouseposdiffx;
            this.dy += mouseposdiffy;
        }
        //vectorscale
        if (this.usevectorxml) {
            const prevcenterxv = (Globals.canvasowidth - (this.VectorPageObj.width * this.dscalevector)) / 2;
            const prevcenteryv = (Globals.canvasoheight - (this.VectorPageObj.height * this.dscalevector)) / 2;
            const diffxv = prevcenterxv - this.dxvector;
            const diffyv = prevcenteryv - this.dyvector;
            this.dscalevector = this.dscalevector * factor;
            const centerxv = ((Globals.canvasowidth - (this.VectorPageObj.width * this.dscalevector)) / 2);
            const centeryv = ((Globals.canvasoheight - (this.VectorPageObj.height * this.dscalevector)) / 2);
            if (center) {
                this.dxvector = centerxv;
                this.dyvector = centeryv;
            } else {
                this.dxvector = centerxv - (diffxv * factor);
                this.dyvector = centeryv - (diffyv * factor);
            }
            if (mousepos){
                this.dxvector += mouseposdiffx;
                this.dyvector += mouseposdiffy;
            }
        }

        let pcanvheight = this.offscreenheight; // TODO:JS->TS:CHECK added intial values, check usage. These are also used in the if (!this.usevectorxml) ...
        let pcanvwidth = this.offscreenwidth; // TODO:JS->TS:CHECK added intial values, check usage. These are also used in the if (!this.usevectorxml) ...
        if (this.usepdfjs) {
            if (this.usedincomposite && this.compositereference != undefined){
                pcanvheight = this.compositereference.ovpagecanvas.height;
                pcanvwidth = this.compositereference.ovpagecanvas.width;
            }else{
                pcanvheight = this.offscreenheight;
                pcanvwidth = this.offscreenwidth;
            }
            let bScaleChanged = false;
            this.bMinzoom = false;
            const prevcenterxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
            const prevcenterypdf = (Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2;
            const diffxpdf = prevcenterxpdf - this.dxpdf;
            const diffypdf = prevcenterypdf - this.dypdf;
            const wscale = ((pcanvwidth * this.dscalepdf) / this.pdfpagewidth) * factor;
            const hscale = ((pcanvheight * this.dscalepdf) / this.pdfpageheight) * factor;
            const scale = Math.min(wscale, hscale);
            this.dscalepdf = this.dscalepdf * factor;
            bScaleChanged = true; // TODO:JS->TS:CHECK this was previously instantated to false. Maybe it should be set directly to true instead
            /*if (scale < this.nPDFMaxFactor) {
                this.dscalepdf = this.dscalepdf * factor;
                bScaleChanged = true;
                thispage.pdfisrendered = false;
                this.bMaxzoom = false;
            } else {
                if (!this.bMaxzoom) {
                    thispage.DocRef.renderPDFscale();
                }

                this.bMaxzoom = true;

            }*/
            const centerxpdf = ((Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2);
            const centerypdf = ((Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2);
            if (center) {
                this.dxpdf = centerxpdf;
                this.dypdf = centerypdf;
            } else {
                if (bScaleChanged) {
                    this.dxpdf = centerxpdf - (diffxpdf * factor);
                    this.dypdf = centerypdf - (diffypdf * factor);
                } else {
                    this.dxpdf = centerxpdf - diffxpdf;
                    this.dypdf = centerypdf - diffypdf;
                }
            }
            let bWidthlocked = false; // JS->TS:INFO added initialization
            if (pcanvwidth <= Globals.canvasowidth) {
                this.dxpdf = centerxpdf;
                bWidthlocked = true;
            }
            if (pcanvwidth * this.dscalepdf <= Globals.canvasowidth) {
                this.dxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
                bWidthlocked = true;
            }
            if (mousepos){
                if(!bWidthlocked){
                    this.dxpdf += mouseposdiffx;
                }
                this.dypdf += mouseposdiffy;
            }
            if (this.pagenumber == this.DocRef.pages[this.DocRef.currentpage].pagenumber) {
                if (this.usedincomposite && this.compositereference != undefined) {
                    //this.compositereference.ZoomIn(factor, center);
                }else{
                    this.DocRef.ZoomIn(factor, center);
                }
            }
            this.pdfrenderopque += 1;
            this.pdfisrendered = false;
            //DocObj.draw_mpagepdf();
            //thispage.renderPDFpagescale();
        }
        //vectorscale
        if (this.usevector3Dxml) {
            return;
        }

        if (!this.usevectorxml) {
            if (this.usepdfjs) {
                this.startx = this.dxpdf;
                this.starty = this.dypdf;
                this.endx = (pcanvwidth * this.dscalepdf) + this.startx;
                this.endy = (pcanvheight * this.dscalepdf) + this.starty;
                if (this.pagenumber == this.DocRef.pages[this.DocRef.currentpage].pagenumber) {
                    if (this.usedincomposite && this.compositereference != undefined) {
                        this.dscalepdf = this.compositereference.getoverlayScaleFactor(0);
                        const overlayoffset = this.compositereference.getoverlayOffsets(0);
                        this.dxpdf = overlayoffset.x;
                        this.dypdf = overlayoffset.y;
                        this.startx = this.dxpdf;
                        this.starty = this.dypdf;
                        this.endx = (pcanvwidth * this.dscalepdf) + this.startx;
                        this.endy = (pcanvheight * this.dscalepdf) + this.starty;
                        this.compositereference.scaleToBackground(true);
                    }else{
                        this.DocRef.draw_mpagepdf();
                    }
                }
            } else {
                this.checkimageswitch();
                if (this.DocRef.Type == 0) {
                    this.DocRef.draw_mpage();
                } else {
                    if (this.usedincomposite && this.compositereference != undefined) {
                        //this.dscale = this.compositereference.getoverlayScaleFactor(0);

                        //var overlayoffset = this.compositereference.getoverlayOffsets(0);
                        //this.dx = overlayoffset.x;
                        //this.dy = overlayoffset.y;
                        this.compositereference.scaleToBackground(true);
                    } else {
                        this.draw_image(true);
                    }
                }
            }
        } else {
            this.startx = this.dxvector;
            this.starty = this.dyvector;
            this.endx = (this.VectorPageObj.width * this.dscalevector) + this.startx;
            this.endy = (this.VectorPageObj.height * this.dscalevector) + this.starty;
            if (this.usedincomposite && this.compositereference != undefined) {
                //this.dscalevector = this.compositereference.getoverlayScaleFactor(0);

                //var overlayoffset = this.compositereference.getoverlayOffsets(0);
                this.compositereference.scaleToBackground(true);
            } else {
                this.draw_vector(false);
            }
        }
        drawmarkupAll(Globals.cntximg);
        DrawMarkupSelected(Globals.context);
        if(RxCore_GUI_ZoomUpdated != undefined && bexternal == false ){
            pagerect = this.getpagerect();
            zoomparams = {factor : factor, center : center, mousepos : mousepos, rect : pagerect};
            RxCore_GUI_ZoomUpdated.zoomUpdate(zoomparams, 0);
        }
    }

    public getBlockCentroid(blockId:any){
        let centroid:any=undefined;
        if (this.usevectorxml) {
            centroid = this.VectorPageObj.getblockcentroid(blockId,this.dscalevector, this.dxvector, this.dyvector);
        }
         return centroid;
    }

    public ZoomToBlock(blockId:any){
        if (this.usevectorxml) {
            const zoomrect = this.VectorPageObj.getBlockRect(blockId,this.dscalevector, this.dxvector, this.dyvector);
            if(zoomrect.found){
                this.zoom_update(zoomrect.x - zoomrect.wp, zoomrect.y - zoomrect.hp, zoomrect.w + (zoomrect.wp*2),zoomrect.h + (zoomrect.hp*2));
            }
        }
        /*return  {
            found : true,
            x : minx,
            y : miny,
            w : maxx - minx,
            h : maxy - miny,
            wp : (maxx - minx) / 10,
            hp : (maxy - miny) / 10
        };*/
    }

    public ZoomOutTest(factor:any, center:any, mousepos:any){
        if (this.usevector3Dxml) {
            return;
        }
        let rotatedpoint:any = undefined;
        let mouseposdiffx = 0;
        let mouseposdiffy = 0;
        if (mousepos){
            rotatedpoint = {x:mousepos.x,y:mousepos.y};
            if(this.drotation != 0){
                rotatedpoint = mouse_rotated(mousepos.x,mousepos.y);
            }
            mouseposdiffx = (((Globals.canvasowidth / 2) - rotatedpoint.x) / factor) - ((Globals.canvasowidth / 2) - rotatedpoint.x);
            mouseposdiffy = (((Globals.canvasoheight / 2) - rotatedpoint.y) / factor) - ((Globals.canvasoheight / 2) - rotatedpoint.y);
        }
        const prevcenterx = (Globals.canvasowidth - (this.MainImageWidth * this.dscale)) / 2;
        const prevcentery = (Globals.canvasoheight - (this.MainImageHeight * this.dscale)) / 2;
        const diffx = prevcenterx - this.dx;
        const diffy = prevcentery - this.dy;
        const localdscale = this.dscale / factor;

        const centerx = (Globals.canvasowidth - (this.MainImageWidth * localdscale)) / 2;
        const centery = (Globals.canvasoheight - (this.MainImageHeight * localdscale)) / 2;

        let localdx = 0;
        let localdy = 0;
        if (center) {
            localdx = centerx;
            localdy = centery;
        } else {
            localdx = centerx - (diffx / factor);
            localdy = centery - (diffy / factor);
        }

        if (mousepos){
            localdx += mouseposdiffx;
            localdy += mouseposdiffy;
        }
        let localdxvector = 0;
        let localdyvector = 0;
        let localdscalevector = 0;
        if (this.usevectorxml) {
            const prevcenterxv = (Globals.canvasowidth - (this.VectorPageObj.width * this.dscalevector)) / 2;
            const prevcenteryv = (Globals.canvasoheight - (this.VectorPageObj.height * this.dscalevector)) / 2;

            const diffxv = prevcenterxv - this.dxvector;
            const diffyv = prevcenteryv - this.dyvector;

            localdscalevector = this.dscalevector / factor;
            const centerxv = ((Globals.canvasowidth - (this.VectorPageObj.width * localdscalevector)) / 2);
            const centeryv = ((Globals.canvasoheight - (this.VectorPageObj.height * localdscalevector)) / 2);

            if (center) {
                localdxvector = centerxv;
                localdyvector = centeryv;
            } else {
                localdxvector = centerxv - (diffxv / factor);
                localdyvector = centeryv - (diffyv / factor);
            }
            if (mousepos){
                localdxvector += mouseposdiffx;
                localdyvector += mouseposdiffy;
            }

        }
        let localdscalepdf = 0;
        let localdxpdf = 0;
        let localdypdf = 0;
        let pcanvheight = 0;
        let pcanvwidth = 0;

        if (this.usepdfjs) {
            if (this.usedincomposite && this.compositereference != undefined){
                pcanvheight = this.compositereference.ovpagecanvas.height;
                pcanvwidth = this.compositereference.ovpagecanvas.width;
            }else{
                pcanvheight = this.offscreenheight;
                pcanvwidth = this.offscreenwidth;


            }
            const prevcenterxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
            const prevcenterypdf = (Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2;

            const diffxpdf = prevcenterxpdf - this.dxpdf;
            const diffypdf = prevcenterypdf - this.dypdf;
            const tempdx = this.dxpdf;
            const tempdy = this.dypdf;

            const yscale = Globals.canvasoheight / pcanvheight;
            const xscale = Globals.canvasowidth / pcanvwidth;
            const dscale = Math.min(xscale, yscale);

            const wscale = ((pcanvwidth * this.dscalepdf) / this.pdfpagewidth) * factor;
            const hscale = ((pcanvheight * this.dscalepdf) / this.pdfpageheight) * factor;
            const scale = Math.min(wscale, hscale);

            /*if (scale < this.nPDFMaxFactor) {
                this.bMaxzoom = false;
                //console.log('maxzoom ' + this.bMaxzoom);
            } else {
                if (!this.bMaxzoom) {
                    thispage.DocRef.renderPDFscale();
                }

                this.bMaxzoom = true;
                //console.log('maxzoom ' + this.bMaxzoom);
            }*/

            //01.11.2018 disabled for new zoom control

            const singlepage = (this.DocRef.pages.length == 1);

            if ((this.usedincomposite && this.compositereference != undefined) || singlepage){
                localdscalepdf = this.dscalepdf / factor;
                this.bMinzoom = false;
            }else{
                if (this.dscalepdf / factor < dscale) {
                    localdscalepdf = dscale;
                    //this.bMinzoom = true;
                } else {
                    localdscalepdf = this.dscalepdf / factor;
                    //this.bMinzoom = false;
                    //thispage.pdfisrendered = false;
                }
            }
            const centerxpdf = ((Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2);
            const centerypdf = ((Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2);
            let bWidthlocked = true;
            if (center) {
                localdxpdf = centerxpdf;
                localdypdf = centerypdf;
            } else {
                localdxpdf = centerxpdf - (diffxpdf / factor);
                localdypdf = centerypdf - (diffypdf / factor);
            }
            if (pcanvwidth <= Globals.canvasowidth) {
                localdxpdf = centerxpdf;
                bWidthlocked = true;
            }
            if (pcanvwidth * this.dscalepdf <= Globals.canvasowidth) {
                localdxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
                bWidthlocked = true;
            }
            if (mousepos){
                if(!bWidthlocked){
                    localdxpdf += mouseposdiffx;
                }
                localdypdf += mouseposdiffy;
            }
        }
        let localstartx = 0;
        let localstarty = 0;
        let localendx = 0;
        let localendy = 0;

        if (!this.usevectorxml) {
            if (this.usepdfjs) {
                localstartx = localdxpdf;
                localstarty = localdypdf;
                localendx = (pcanvwidth * localdscalepdf) + localstartx;
                localendy = (pcanvheight * localdscalepdf) + localstarty;

                if (this.pagenumber == this.DocRef.pages[this.DocRef.currentpage].pagenumber) {

                    if (this.usedincomposite && this.compositereference != undefined) {
                        localdscalepdf = this.compositereference.getoverlayScaleFactor(1);
                        const overlayoffset = this.compositereference.getoverlayOffsets(1);
                        localdxpdf = overlayoffset.x;
                        localdypdf = overlayoffset.y;
                        localstartx = localdxpdf;
                        localstarty = localdypdf;
                        localendx = (pcanvwidth * localdscalepdf) + localstartx;
                        localendy = (pcanvheight * localdscalepdf) + localstarty;
                    }else{
                        // TODO:JS->TS:INFO this else branch was empty
                    }
                }
            } else {
                // TODO:JS->TS:INFO this else branch was empty
            }
        } else {
            localstartx = localdxvector;
            localstarty = localdyvector;
            localendx = (this.VectorPageObj.width * localdscalevector) + localstartx;
            localendy = (this.VectorPageObj.height * localdscalevector) + localstarty;
        }
        //new method to work on local start and end variables.
        const pagerect = this.getpagetestrect({startx : localstartx, starty : localstarty, endx : localendx, endy : localendy});

        return pagerect;
        //var rotrect = {x1:rect.startx,y1: rect.starty,x2: rect.endx,y2:rect.endy};
    }

    public ZoomOut(factor:number, center:any, bexternal:any, mousepos:any=undefined) { // JS->TS:INFO added default value of undefined
        if (this.usevector3Dxml) {
            return;
        }
        let pagerect:any = undefined;
        let zoomparams:any = undefined;

        if(RxCore_GUI_ZoomUpdate != undefined && bexternal == false){
            pagerect = this.getpagerect();
            zoomparams = {factor : factor, center : center, mousepos : mousepos, rect : pagerect};
            RxCore_GUI_ZoomUpdate.zoomUpdate(zoomparams, 1);
        }
        let rotatedpoint:any = undefined;
        let mouseposdiffx = 0;
        let mouseposdiffy = 0;
        if (mousepos){
            rotatedpoint = {x:mousepos.x,y:mousepos.y};
            if(this.drotation != 0){
                rotatedpoint = mouse_rotated(mousepos.x,mousepos.y);
            }
            mouseposdiffx = (((Globals.canvasowidth / 2) - rotatedpoint.x) / factor) - ((Globals.canvasowidth / 2) - rotatedpoint.x);
            mouseposdiffy = (((Globals.canvasoheight / 2) - rotatedpoint.y) / factor) - ((Globals.canvasoheight / 2) - rotatedpoint.y);
        }
        const prevcenterx = (Globals.canvasowidth - (this.MainImageWidth * this.dscale)) / 2;
        const prevcentery = (Globals.canvasoheight - (this.MainImageHeight * this.dscale)) / 2;
        const diffx = prevcenterx - this.dx;
        const diffy = prevcentery - this.dy;
        this.dscale = this.dscale / factor;
        const centerx = (Globals.canvasowidth - (this.MainImageWidth * this.dscale)) / 2;
        const centery = (Globals.canvasoheight - (this.MainImageHeight * this.dscale)) / 2;
        if (center) {
            this.dx = centerx;
            this.dy = centery;
        } else {
            this.dx = centerx - (diffx / factor);
            this.dy = centery - (diffy / factor);
        }
        if (mousepos){
            this.dx += mouseposdiffx;
            this.dy += mouseposdiffy;
        }
        let prevcenterxv = 0;
        let prevcenteryv = 0;
        let diffxv = 0;
        let diffyv = 0;
        let centerxv = 0;
        let centeryv = 0;
        if (this.usevectorxml) {
            prevcenterxv = (Globals.canvasowidth - (this.VectorPageObj.width * this.dscalevector)) / 2;
            prevcenteryv = (Globals.canvasoheight - (this.VectorPageObj.height * this.dscalevector)) / 2;
            diffxv = prevcenterxv - this.dxvector;
            diffyv = prevcenteryv - this.dyvector;
            this.dscalevector = this.dscalevector / factor;
            centerxv = ((Globals.canvasowidth - (this.VectorPageObj.width * this.dscalevector)) / 2);
            centeryv = ((Globals.canvasoheight - (this.VectorPageObj.height * this.dscalevector)) / 2);
            if (center) {
                this.dxvector = centerxv;
                this.dyvector = centeryv;
            } else {
                this.dxvector = centerxv - (diffxv / factor);
                this.dyvector = centeryv - (diffyv / factor);
            }
            if (mousepos){
                this.dxvector += mouseposdiffx;
                this.dyvector += mouseposdiffy;
            }
        }
        let pcanvheight = 0;
        let pcanvwidth = 0;
        if (this.usepdfjs) {
            if (this.usedincomposite && this.compositereference != undefined){
                pcanvheight = this.compositereference.ovpagecanvas.height;
                pcanvwidth = this.compositereference.ovpagecanvas.width;
            }else{
                pcanvheight = this.offscreenheight;
                pcanvwidth = this.offscreenwidth;
            }
            const prevcenterxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
            const prevcenterypdf = (Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2;
            const diffxpdf = prevcenterxpdf - this.dxpdf;
            const diffypdf = prevcenterypdf - this.dypdf;
            const tempdx = this.dxpdf;
            const tempdy = this.dypdf;
            const yscale = Globals.canvasoheight / pcanvheight;
            const xscale = Globals.canvasowidth / pcanvwidth;
            const dscale = Math.min(xscale, yscale);
            const wscale = ((pcanvwidth * this.dscalepdf) / this.pdfpagewidth) * factor;
            const hscale = ((pcanvheight * this.dscalepdf) / this.pdfpageheight) * factor;
            const scale = Math.min(wscale, hscale);
            /*if (scale < this.nPDFMaxFactor) {
                this.bMaxzoom = false;
                //console.log('maxzoom ' + this.bMaxzoom);
            } else {
                if (!this.bMaxzoom) {
                    thispage.DocRef.renderPDFscale();
                }

                this.bMaxzoom = true;
                //console.log('maxzoom ' + this.bMaxzoom);
            }*/

            //01.11.2018 disabled for new zoom control
            const singlepage = (this.DocRef.pages.length == 1);
            if ((this.usedincomposite && this.compositereference != undefined) || singlepage){
                this.dscalepdf = this.dscalepdf / factor;
                this.bMinzoom = false;
            }else{
                if (this.dscalepdf / factor < dscale) {
                    this.dscalepdf = dscale;
                    this.bMinzoom = true;
                } else {
                    this.dscalepdf = this.dscalepdf / factor;
                    this.bMinzoom = false;
                    //thispage.pdfisrendered = false;
                }
            }
            const centerxpdf = ((Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2);
            const centerypdf = ((Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2);
            if (center) {
                this.dxpdf = centerxpdf;
                this.dypdf = centerypdf;
            } else {
                this.dxpdf = centerxpdf - (diffxpdf / factor);
                this.dypdf = centerypdf - (diffypdf / factor);
            }
            let bWidthlocked = false;
            if (pcanvwidth <= Globals.canvasowidth) {
                this.dxpdf = centerxpdf;
                bWidthlocked = true;
            }
            if (pcanvwidth * this.dscalepdf <= Globals.canvasowidth) {
                this.dxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
                bWidthlocked = true;
            }
            if (mousepos){
                if(!bWidthlocked){
                    this.dxpdf += mouseposdiffx;
                }
                this.dypdf += mouseposdiffy;
            }
            if (this.pagenumber == this.DocRef.pages[this.DocRef.currentpage].pagenumber) {
                if (this.usedincomposite && this.compositereference != undefined) {
                    //this.compositereference.ZoomOut(factor, center);
                }else{
                    this.DocRef.ZoomOut(factor, center,false);
                }
            }
            //DocObj.draw_mpagepdf();
            //thispage.renderPDFpagescale();
            this.pdfrenderopque += 1;
            this.pdfisrendered = false;
        }
        if (!this.usevectorxml) {
            if (this.usepdfjs) {
                this.startx = this.dxpdf;
                this.starty = this.dypdf;
                this.endx = (pcanvwidth * this.dscalepdf) + this.startx;
                this.endy = (pcanvheight * this.dscalepdf) + this.starty;
                if (this.pagenumber == this.DocRef.pages[this.DocRef.currentpage].pagenumber) {
                    if (this.usedincomposite && this.compositereference != undefined) {
                        this.dscalepdf = this.compositereference.getoverlayScaleFactor(1);
                        const overlayoffset = this.compositereference.getoverlayOffsets(1);
                        this.dxpdf = overlayoffset.x;
                        this.dypdf = overlayoffset.y;
                        this.startx = this.dxpdf;
                        this.starty = this.dypdf;
                        this.endx = (pcanvwidth * this.dscalepdf) + this.startx;
                        this.endy = (pcanvheight * this.dscalepdf) + this.starty;
                        this.compositereference.scaleToBackground(true);
                    }else{
                        this.DocRef.draw_mpagepdf();
                    }
                }
            } else {
                this.checkimageswitch();
                if (this.DocRef.Type == 0) {
                    this.DocRef.draw_mpage();
                } else {
                    if (this.usedincomposite && this.compositereference != undefined) {
                        //this.dscale = this.compositereference.getoverlayScaleFactor(1);
                        this.compositereference.scaleToBackground(true);
                    } else {
                        this.draw_image(true);
                    }
                }
            }
        } else {
            this.startx = this.dxvector;
            this.starty = this.dyvector;
            this.endx = (this.VectorPageObj.width * this.dscalevector) + this.startx;
            this.endy = (this.VectorPageObj.height * this.dscalevector) + this.starty;
            if (this.usedincomposite && this.compositereference != undefined) {
                //this.dscalevector = this.compositereference.getoverlayScaleFactor(1);
                this.compositereference.scaleToBackground(true);
            } else {
                this.draw_vector(false);
            }
        }
        drawmarkupAll(Globals.cntximg);
        DrawMarkupSelected(Globals.context);
        if(RxCore_GUI_ZoomUpdated != undefined && bexternal == false){
            pagerect = this.getpagerect();
            zoomparams = {factor : factor, center : center, mousepos : mousepos, rect : pagerect};
            RxCore_GUI_ZoomUpdated.zoomUpdate(zoomparams, 1);
        }
    }


    public zoomwidth(bexternal:any) {
        let pagerect:any = undefined;
        let zoomparams:any = undefined;
        if(RxCore_GUI_ZoomUpdate != undefined && bexternal == undefined){
            pagerect = this.getpagerect();
            zoomparams = {rect : pagerect};
            RxCore_GUI_ZoomUpdate.zoomUpdate(zoomparams, 4);
        }
        let xscale = 0.0;
        let pcanvheight = 0;
        let pcanvwidth = 0;

        if (this.usepdfjs) {
            if (this.usedincomposite && this.compositereference != undefined){
                pcanvheight = this.compositereference.ovpagecanvas.height;
                pcanvwidth = this.compositereference.ovpagecanvas.width;
            }else{
                pcanvheight = this.offscreenheight;
                pcanvwidth = this.offscreenwidth;
            }
        }

        switch (this.drotation) {
            case 0:
                xscale = Globals.canvasowidth / this.MainImageWidth;
                this.dscale = xscale;
                if (this.usevectorxml) {
                    xscale = Globals.canvasowidth / this.VectorPageObj.width;
                    this.dscalevector = xscale;
                } else if (this.usepdfjs) {
                    xscale = Globals.canvasowidth / pcanvwidth;
                    this.dscalepdf = xscale;
                }
                this.dx = (Globals.canvasowidth - (this.MainImageWidth * this.dscale)) / 2;
                this.dy = (Globals.canvasoheight - (this.MainImageHeight * this.dscale)) / 2;
                if (this.usevectorxml) {
                    this.dxvector = (Globals.canvasowidth - (this.VectorPageObj.width * this.dscalevector)) / 2;
                    this.dyvector = (Globals.canvasoheight - (this.VectorPageObj.height * this.dscalevector)) / 2;
                } else if (this.usepdfjs) {
                    this.dxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
                    this.dypdf = (Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2;
                }
                break;
            case 90:
                xscale = Globals.canvasowidth / this.MainImageHeight;
                this.dscale = xscale;
                if (this.usevectorxml) {
                    xscale = Globals.canvasowidth / this.VectorPageObj.height;
                    this.dscalevector = xscale;
                } else if (this.usepdfjs) {
                    xscale = Globals.canvasowidth / pcanvheight;
                    this.dscalepdf = xscale;
                }
                this.dx = (Globals.canvasowidth - (this.MainImageWidth * this.dscale)) / 2;
                this.dy = (Globals.canvasoheight - (this.MainImageHeight * this.dscale)) / 2;
                if (this.usevectorxml) {
                    this.dxvector = (Globals.canvasowidth - (this.VectorPageObj.width * this.dscalevector)) / 2;
                    this.dyvector = (Globals.canvasoheight - (this.VectorPageObj.height * this.dscalevector)) / 2;
                } else if (this.usepdfjs) {
                    this.dxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
                    this.dypdf = (Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2;
                }
                break;
            case 180:
                xscale = Globals.canvasowidth / this.MainImageWidth;
                this.dscale = xscale;
                if (this.usevectorxml) {
                    xscale = Globals.canvasowidth / this.VectorPageObj.width;
                    this.dscalevector = xscale;
                } else if (this.usepdfjs) {
                    xscale = Globals.canvasowidth / pcanvwidth;
                    this.dscalepdf = xscale;
                }
                this.dx = (Globals.canvasowidth - (this.MainImageWidth * this.dscale)) / 2;
                this.dy = (Globals.canvasoheight - (this.MainImageHeight * this.dscale)) / 2;
                if (this.usevectorxml) {
                    this.dxvector = (Globals.canvasowidth - (this.VectorPageObj.width * this.dscalevector)) / 2;
                    this.dyvector = (Globals.canvasoheight - (this.VectorPageObj.height * this.dscalevector)) / 2;
                } else if (this.usepdfjs) {
                    this.dxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
                    this.dypdf = (Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2;
                }
                break;
            case 270:
                xscale = Globals.canvasowidth / this.MainImageHeight;
                this.dscale = xscale;
                if (this.usevectorxml) {
                    xscale = Globals.canvasowidth / this.VectorPageObj.height;
                    this.dscalevector = xscale;
                } else if (this.usepdfjs) {
                    xscale = Globals.canvasowidth / pcanvheight;
                    this.dscalepdf = xscale;
                }
                this.dx = (Globals.canvasowidth - (this.MainImageWidth * this.dscale)) / 2;
                this.dy = (Globals.canvasoheight - (this.MainImageHeight * this.dscale)) / 2;
                if (this.usevectorxml) {
                    this.dxvector = (Globals.canvasowidth - (this.VectorPageObj.width * this.dscalevector)) / 2;
                    this.dyvector = (Globals.canvasoheight - (this.VectorPageObj.height * this.dscalevector)) / 2;
                } else if (this.usepdfjs) {
                    this.dxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
                    this.dypdf = (Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2;
                }
                break;
            default:
                xscale = Globals.canvasowidth / this.MainImageWidth;
                this.dscale = xscale;
                if (this.usevectorxml) {
                    xscale = Globals.canvasowidth / this.VectorPageObj.width;
                    this.dscalevector = xscale;
                } else if (this.usepdfjs) {
                    xscale = Globals.canvasowidth / pcanvwidth;
                    this.dscalepdf = xscale;
                }
                this.dx = (Globals.canvasowidth - (this.MainImageWidth * this.dscale)) / 2;
                this.dy = (Globals.canvasoheight - (this.MainImageHeight * this.dscale)) / 2;
                if (this.usevectorxml) {
                    this.dxvector = (Globals.canvasowidth - (this.VectorPageObj.width * this.dscalevector)) / 2;
                    this.dyvector = (Globals.canvasoheight - (this.VectorPageObj.height * this.dscalevector)) / 2;
                } else if (this.usepdfjs) {
                    this.dxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
                    this.dypdf = (Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2;
                }
                break;
        }
        if (this.usevector3Dxml) {
            return;
        }

        if (!this.usevectorxml) {
            if (this.usepdfjs) {
                //DocObj.draw_mpagepdf();
                this.startx = this.dxpdf;
                this.starty = this.dypdf;
                this.endx = (pcanvwidth * this.dscalepdf) + this.startx;
                this.endy = (pcanvheight * this.dscalepdf) + this.starty;
                if (this.pagenumber == this.DocRef.pages[this.DocRef.currentpage].pagenumber) {
                    if (this.usedincomposite && this.compositereference != undefined) {
                        this.dscalepdf = this.compositereference.getoverlayScaleFactor(4);
                        this.compositereference.scaleToBackground(true);
                    }else{
                        this.DocRef.zoomwidth();
                        this.DocRef.draw_mpagepdf();
                    }
                }
            } else {
                this.checkimageswitch();
                if (this.DocRef.Type == 0) {
                    this.DocRef.draw_mpage();
                } else {
                    if (this.usedincomposite && this.compositereference != undefined) {
                        //this.dscale = this.compositereference.getoverlayScaleFactor(4);
                        this.compositereference.scaleToBackground(true);
                    } else {
                        this.draw_image(true);
                    }
                }
            }
        } else {
            this.startx = this.dxvector;
            this.starty = this.dyvector;
            this.endx = (this.VectorPageObj.width * this.dscalevector) + this.startx;
            this.endy = (this.VectorPageObj.height * this.dscalevector) + this.starty;
            if (this.usedincomposite && this.compositereference != undefined) {
                //this.dscalevector = this.compositereference.getoverlayScaleFactor(4);
                this.compositereference.scaleToBackground(true);
            } else {
                this.draw_vector(false);
            }
        }
        if (this.usepdfjs) {
            this.pdfrenderopque += 1;
            this.pdfisrendered = false;
        }
        drawmarkupAll(Globals.cntximg);
        DrawMarkupSelected(Globals.context);
        if(RxCore_GUI_ZoomUpdated != undefined && bexternal == undefined){
            pagerect = this.getpagerect();
            zoomparams = {rect : pagerect};
            RxCore_GUI_ZoomUpdated.zoomUpdate(zoomparams, 4);
        }
    }

    public zoomheight(bexternal:any) {
        let pagerect:any = undefined;
        let zoomparams:any = undefined;

        if(RxCore_GUI_ZoomUpdate != undefined && bexternal == undefined){
            pagerect = this.getpagerect();
            zoomparams = {rect : pagerect};
            RxCore_GUI_ZoomUpdate.zoomUpdate(zoomparams, 5);
        }

        let yscale = 0.0;
        let pcanvheight = 0;
        let pcanvwidth = 0;

        if (this.usepdfjs) {
            if (this.usedincomposite && this.compositereference != undefined){
                pcanvheight = this.compositereference.ovpagecanvas.height;
                pcanvwidth = this.compositereference.ovpagecanvas.width;
            }else{
                pcanvheight = this.offscreenheight;
                pcanvwidth = this.offscreenwidth;
            }
        }
        switch (this.drotation) {
            case 0:
                yscale = Globals.canvasoheight / this.MainImageHeight;
                this.dscale = yscale;
                if (this.usevectorxml) {
                    yscale = Globals.canvasoheight / this.VectorPageObj.height;
                    this.dscalevector = yscale;
                } else if (this.usepdfjs) {
                    yscale = Globals.canvasoheight / pcanvheight;
                    this.dscalepdf = yscale;
                }
                this.dx = (Globals.canvasowidth - (this.MainImageWidth * this.dscale)) / 2;
                this.dy = (Globals.canvasoheight - (this.MainImageHeight * this.dscale)) / 2;
                if (this.usevectorxml) {
                    this.dxvector = (Globals.canvasowidth - (this.VectorPageObj.width * this.dscalevector)) / 2;
                    this.dyvector = (Globals.canvasoheight - (this.VectorPageObj.height * this.dscalevector)) / 2;
                } else if (this.usepdfjs) {
                    this.dxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
                    this.dypdf = (Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2;
                }
                break;
            case 90:
                yscale = Globals.canvasoheight / this.MainImageWidth;
                this.dscale = yscale;
                if (this.usevectorxml) {
                    yscale = Globals.canvasoheight / this.VectorPageObj.width;
                    this.dscalevector = yscale;
                } else if (this.usepdfjs) {
                    yscale = Globals.canvasoheight / pcanvwidth;
                    this.dscalepdf = yscale;
                }
                this.dx = (Globals.canvasowidth - (this.MainImageWidth * this.dscale)) / 2;
                this.dy = (Globals.canvasoheight - (this.MainImageHeight * this.dscale)) / 2;
                if (this.usevectorxml) {
                    this.dxvector = (Globals.canvasowidth - (this.VectorPageObj.width * this.dscalevector)) / 2;
                    this.dyvector = (Globals.canvasoheight - (this.VectorPageObj.height * this.dscalevector)) / 2;
                } else if (this.usepdfjs) {
                    this.dxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
                    this.dypdf = (Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2;
                }
                break;
            case 180:
                yscale = Globals.canvasoheight / this.MainImageHeight;
                this.dscale = yscale;
                if (this.usevectorxml) {
                    yscale = Globals.canvasoheight / this.VectorPageObj.height;
                    this.dscalevector = yscale;
                } else if (this.usepdfjs) {
                    yscale = Globals.canvasoheight / pcanvheight;
                    this.dscalepdf = yscale;
                }
                this.dx = (Globals.canvasowidth - (this.MainImageWidth * this.dscale)) / 2;
                this.dy = (Globals.canvasoheight - (this.MainImageHeight * this.dscale)) / 2;
                if (this.usevectorxml) {
                    this.dxvector = (Globals.canvasowidth - (this.VectorPageObj.width * this.dscalevector)) / 2;
                    this.dyvector = (Globals.canvasoheight - (this.VectorPageObj.height * this.dscalevector)) / 2;
                } else if (this.usepdfjs) {
                    this.dxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
                    this.dypdf = (Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2;
                }
                break;
            case 270:
                yscale = Globals.canvasoheight / this.MainImageWidth;
                this.dscale = yscale;
                if (this.usevectorxml) {
                    yscale = Globals.canvasoheight / this.VectorPageObj.width;
                    this.dscalevector = yscale;
                } else if (this.usepdfjs) {
                    yscale = Globals.canvasoheight / pcanvwidth;
                    this.dscalepdf = yscale;
                }
                this.dx = (Globals.canvasowidth - (this.MainImageWidth * this.dscale)) / 2;
                this.dy = (Globals.canvasoheight - (this.MainImageHeight * this.dscale)) / 2;
                if (this.usevectorxml) {
                    this.dxvector = (Globals.canvasowidth - (this.VectorPageObj.width * this.dscalevector)) / 2;
                    this.dyvector = (Globals.canvasoheight - (this.VectorPageObj.height * this.dscalevector)) / 2;
                } else if (this.usepdfjs) {
                    this.dxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
                    this.dypdf = (Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2;
                }
                break;
        }
        if (this.usevector3Dxml) {
            return;
        }
        if (!this.usevectorxml) {
            if (this.usepdfjs) {
                //DocObj.draw_mpagepdf();
                this.startx = this.dxpdf;
                this.starty = this.dypdf;
                this.endx = (pcanvwidth * this.dscalepdf) + this.startx;
                this.endy = (pcanvheight * this.dscalepdf) + this.starty;
                if (this.pagenumber == this.DocRef.pages[this.DocRef.currentpage].pagenumber) {
                    if (this.usedincomposite && this.compositereference != undefined) {
                        this.dscalepdf = this.compositereference.getoverlayScaleFactor(5);
                        this.compositereference.scaleToBackground(true);
                    }else{
                        this.DocRef.zoomheight();
                        this.DocRef.draw_mpagepdf();
                    }
                }
            } else {
                this.checkimageswitch();
                if (this.DocRef.Type == 0) {
                    this.DocRef.draw_mpage();
                } else {
                    if (this.usedincomposite && this.compositereference != undefined) {
                        //this.dscale = this.compositereference.getoverlayScaleFactor(5);
                        this.compositereference.scaleToBackground(true);
                    } else {
                        this.draw_image(true);
                    }
                }
            }
        } else {
            this.startx = this.dxvector;
            this.starty = this.dyvector;
            this.endx = (this.VectorPageObj.width * this.dscalevector) + this.startx;
            this.endy = (this.VectorPageObj.height * this.dscalevector) + this.starty;
            if (this.usedincomposite && this.compositereference != undefined) {
                //this.dscalevector = this.compositereference.getoverlayScaleFactor(5);
                this.compositereference.scaleToBackground(true);
            } else {
                this.draw_vector(false);
            }
        }
        if (this.usepdfjs) {
            this.pdfrenderopque += 1;
            this.pdfisrendered = false;
        }
        drawmarkupAll(Globals.cntximg);
        DrawMarkupSelected(Globals.context);
        if(RxCore_GUI_ZoomUpdated != undefined && bexternal == undefined){
            pagerect = this.getpagerect();
            zoomparams = {rect : pagerect};
            RxCore_GUI_ZoomUpdated.zoomUpdate(zoomparams, 5);
        }
    }

    public mtzoom_update(diagdiff:any, startscalelarge:any, startscalesmall:any) {

        //change to calculate change factor and maintain centre the same way as with zoom in and out.

        //image
        let curdiffh = (startscalelarge * this.MainImageHeight) - Globals.canvasoheight;
        let currdiffw = (startscalelarge * this.MainImageWidth) - Globals.canvasowidth;

        const mainimagediag = Math.sqrt((Math.pow(this.MainImageHeight, 2) + Math.pow(this.MainImageWidth, 2)));
        const canvasdiag = Math.sqrt((Math.pow(Globals.canvasoheight, 2) + Math.pow(Globals.canvasowidth, 2)));
        let curdiagdiff = (startscalelarge * mainimagediag) - canvasdiag;
        this.dscale = (canvasdiag + curdiagdiff + diagdiff) / mainimagediag;

        //vector
        if (this.usevectorxml) {
            curdiffh = (startscalesmall * this.VectorPageObj.height) - Globals.canvasoheight;
            currdiffw = (startscalesmall * this.VectorPageObj.width) - Globals.canvasowidth;
            const vectordiag = Math.sqrt((Math.pow(this.VectorPageObj.height, 2) + Math.pow(this.VectorPageObj.width, 2)));
            curdiagdiff = (startscalesmall * vectordiag) - canvasdiag;
            this.dscalevector = (canvasdiag + curdiagdiff + diagdiff) / vectordiag;
        }
        let pcanvheight = 0;
        let pcanvwidth = 0;

        if (this.usepdfjs) {
            if (this.usedincomposite && this.compositereference != undefined){
                pcanvheight = this.compositereference.ovpagecanvas.height;
                pcanvwidth = this.compositereference.ovpagecanvas.width;
            }else{
                pcanvheight = this.offscreenheight;
                pcanvwidth = this.offscreenwidth;
            }
            curdiffh = (startscalesmall * pcanvheight) - Globals.canvasoheight;
            currdiffw = (startscalesmall * pcanvwidth) - Globals.canvasowidth;
            const pdfdiag = Math.sqrt((Math.pow(pcanvheight, 2) + Math.pow(pcanvheight, 2)));
            curdiagdiff = (startscalesmall * pdfdiag) - canvasdiag;
            this.dscalepdf = (canvasdiag + curdiagdiff + diagdiff) / pdfdiag;
            this.pdfrenderopque += 1;
            this.pdfisrendered = false;
            //thispage.renderPDFpagescale();
        }
        if (this.usevector3Dxml) {
            return;
        }
        if (!this.usevectorxml) {
            if (this.usepdfjs) {
                //DocObj.draw_mpagepdf();
                this.startx = this.dxpdf;
                this.starty = this.dypdf;
                this.endx = (pcanvwidth) + this.startx;
                this.endy = (pcanvheight) + this.starty;
                if (this.pagenumber == this.DocRef.pages[this.DocRef.currentpage].pagenumber) {
                    if (this.usedincomposite && this.compositereference != undefined) {
                        this.compositereference.scaleToBackground(true);
                    }else{
                        Globals.DocObj.draw_mpagepdf();
                    }
                }
            } else {
                this.checkimageswitch();
                if (this.DocRef.Type == 0) {
                    this.DocRef.draw_mpage();
                } else {
                    if (this.usedincomposite && this.compositereference != undefined) {
                        this.compositereference.scaleToBackground(true);
                    } else {
                        this.draw_image(true);
                    }
                }
            }
        } else {
            this.startx = this.dxvector;
            this.starty = this.dyvector;
            this.endx = (this.VectorPageObj.width * this.dscalevector) + this.startx;
            this.endy = (this.VectorPageObj.height * this.dscalevector) + this.starty;
            if (this.usedincomposite && this.compositereference != undefined) {
                this.compositereference.scaleToBackground(true);
            } else {
                this.draw_vector(false);
            }
        }
        drawmarkupAll(Globals.cntximg);
        DrawMarkupSelected(Globals.context);
        //context.clearRect(0, 0, canvas.width, canvas.height);
    }

    public getRotatedPoint(width:number, height:number, x:number, y:number, anglerad:number) {
        const cosangle = Math.cos(anglerad);
        const sinangle = Math.sin(anglerad);
        const hw = x - width;
        const hh = y - height;
        const newx = (hw * cosangle) - (hh * sinangle);
        const newy = (hw * sinangle) + (hh * cosangle);
        const transpoint = new point(newx, newy);
        transpoint.x = width + newx; // JS->TS:INFO replaced transpoint.x with newx
        transpoint.y = height + newy; // JS->TS:INFO replaced transpoint.y with newy;
        return transpoint;
    }

    public zoom_update(sx:number, sy:number, sWide:number, sHi:number, bexternal:any = undefined) { // JS->TS:INFO added default value for bexternal
        let pagerect:any = undefined;
        let zoomparams:any = undefined;
        if(RxCore_GUI_ZoomUpdate != undefined && bexternal == undefined){
            pagerect = this.getpagerect();
            zoomparams = {sx : sx, sy : sy, sWide : sWide, sHi: sHi, rect : pagerect};
            RxCore_GUI_ZoomUpdate.zoomUpdate(zoomparams, 2);
        }
        let newscale = 1.0;
        let newscaleext = 1.0;
        let newscalev = 1.0;
        let newscalepdf = 1.0;
        let factor = 0.0;
        let pointXtoCenter = 0;
        let pointYtoCenter = 0;
        const canvdiv2H = Globals.canvasoheight / 2;
        const canvdiv2W = Globals.canvasowidth / 2;
        const CanvRotRad = this.drotation * (Math.PI / 180);

        //point to align to centre in display coordinates.
        const rectCenterX = sx + (sWide / 2);
        const rectCenterY = sy + (sHi / 2);

        let ox1 = sx / this.dscale;
        let oy1 = sy / this.dscale;
        let ox2 = (sx + sWide) / this.dscale;
        let oy2 = (sy + sHi) / this.dscale;
        const hscale = sHi / this.dscale;
        const wscale = sWide / this.dscale;

        let ox1v = sx / this.dscalevector;
        let oy1v = sy / this.dscalevector;
        let ox2v = (sx + sWide) / this.dscalevector;
        let oy2v = (sy + sHi) / this.dscalevector;
        const hscalev = sHi / this.dscalevector;
        const wscalev = sWide / this.dscalevector;

        let ox1pdf = sx / this.dscalepdf;
        let oy1pdf = sy / this.dscalepdf;
        let ox2pdf = (sx + sWide) / this.dscalepdf;
        let oy2pdf = (sy + sHi) / this.dscalepdf;
        const hscalepdf = sHi / this.dscalepdf;
        const wscalepdf = sWide / this.dscalepdf;


        let yscale = Globals.canvasoheight / this.MainImageHeight;
        let xscale = Globals.canvasowidth / this.MainImageWidth;
        const imagescaleheight = this.MainImageHeight * this.dscale;

        let pcanvheight = 0;
        let pcanvwidth = 0;

        let prevcenterxpdf = 0;
        let prevcenterypdf = 0;
        let diffxpdf = 0;
        let diffypdf = 0;
        let centerxpdf = 0;
        let centerypdf = 0;

        if (this.usepdfjs) {
            if (this.usedincomposite && this.compositereference != undefined){
                pcanvheight = this.compositereference.ovpagecanvas.height;
                pcanvwidth = this.compositereference.ovpagecanvas.width;
            }else{
                pcanvheight = this.offscreenheight;
                pcanvwidth = this.offscreenwidth;
            }
        }
        switch (this.drotation) {
            case 90:
                pointXtoCenter = rectCenterX - canvdiv2W;
                pointYtoCenter = rectCenterY - canvdiv2H;
                if (!this.usepdfjs) {
                    //move point to center
                    // x = y direction for 90 degrees
                    oy1 = (this.dy + pointXtoCenter);
                    ox1 = (this.dx - pointYtoCenter);
                    oy1v = (this.dyvector + pointXtoCenter);
                    ox1v = (this.dxvector - pointYtoCenter);
                    this.dx = ox1;
                    this.dy = oy1;
                    this.dxvector = ox1v;
                    this.dyvector = oy1v;
                    if (hscale > 0 && wscale > 0) {
                        yscale = this.dscale * Globals.canvasoheight / sHi;
                        xscale = this.dscale * Globals.canvasowidth / sWide;
                    }
                    newscale = Math.min(yscale, xscale);
                    if (hscalev > 0 && wscalev > 0) {
                        yscale = this.dscalevector * Globals.canvasoheight / sHi;
                        xscale = this.dscalevector * Globals.canvasowidth / sWide;
                    }
                    newscalev = Math.min(yscale, xscale);
                    factor = newscale / this.dscale;
                    if (this.usevectorxml) {
                        factor = newscalev / this.dscalevector;
                    }
                    this.ZoomIn(factor, false, false);
                } else {
                    //ox1pdf = +((rectCenterX+this.dypdf)/this.dscalepdf);
                    //oy1pdf = -((rectCenterY-this.dxpdf)/this.dscalepdf);
                    pointXtoCenter = rectCenterX - canvdiv2W;
                    pointYtoCenter = rectCenterY - canvdiv2H;
                    oy1pdf = (this.dypdf + rectCenterX) - canvdiv2W;
                    ox1pdf = (this.dxpdf - rectCenterY) + canvdiv2H;
                    this.dxpdf = ox1pdf;
                    this.dypdf = oy1pdf;
                    if (hscalepdf > 0 && wscalepdf > 0) {
                        yscale = this.dscalepdf * Globals.canvasoheight / sHi;
                        xscale = this.dscalepdf * Globals.canvasowidth / sWide;
                    }
                    newscalepdf = Math.min(yscale, xscale);
                    factor = newscalepdf / this.dscalepdf;
                    prevcenterxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
                    prevcenterypdf = (Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2;
                    diffxpdf = prevcenterxpdf - this.dxpdf;
                    diffypdf = prevcenterypdf - this.dypdf;
                    this.dscalepdf = newscalepdf;
                    centerxpdf = ((Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2);
                    centerypdf = ((Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2);
                    this.dxpdf = centerxpdf - (diffxpdf * factor);
                    this.dypdf = centerypdf - (diffypdf * factor);
                }
                break;
            case 270:
                if (this.usepdfjs) {
                    pointXtoCenter = rectCenterX - canvdiv2W;
                    pointYtoCenter = rectCenterY - canvdiv2H;
                    oy1pdf = (this.dypdf - rectCenterX) + canvdiv2W;
                    ox1pdf = (this.dxpdf + rectCenterY) - canvdiv2H;
                    this.dxpdf = ox1pdf;
                    this.dypdf = oy1pdf;
                    if (hscalepdf > 0 && wscalepdf > 0) {
                        yscale = this.dscalepdf * Globals.canvasoheight / sHi;
                        xscale = this.dscalepdf * Globals.canvasowidth / sWide;
                    }
                    newscalepdf = Math.min(yscale, xscale);
                    factor = newscalepdf / this.dscalepdf;
                    prevcenterxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
                    prevcenterypdf = (Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2;
                    diffxpdf = prevcenterxpdf - this.dxpdf;
                    diffypdf = prevcenterypdf - this.dypdf;
                    this.dscalepdf = newscalepdf;
                    centerxpdf = ((Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2);
                    centerypdf = ((Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2);
                    this.dxpdf = centerxpdf - (diffxpdf * factor);
                    this.dypdf = centerypdf - (diffypdf * factor);
                } else {
                    //move point to center
                    // x = y direction for 270 degrees
                    pointXtoCenter = rectCenterX - canvdiv2W;
                    pointYtoCenter = rectCenterY - canvdiv2H;
                    oy1 = (this.dy - pointXtoCenter);
                    ox1 = (this.dx + pointYtoCenter);
                    oy1v = (this.dyvector - pointXtoCenter);
                    ox1v = (this.dxvector + pointYtoCenter);
                    ox1pdf = (this.dypdf - pointXtoCenter);
                    oy1pdf = (this.dxpdf + pointYtoCenter);
                    this.dx = ox1;
                    this.dy = oy1;
                    this.dxvector = ox1v;
                    this.dyvector = oy1v;
                    this.dxpdf = ox1pdf;
                    this.dypdf = oy1pdf;
                    if (hscale > 0 && wscale > 0) {
                        yscale = this.dscale * Globals.canvasoheight / sHi;
                        xscale = this.dscale * Globals.canvasowidth / sWide;
                    }
                    newscale = Math.min(yscale, xscale);
                    if (hscalev > 0 && wscalev > 0) {
                        yscale = this.dscalevector * Globals.canvasoheight / sHi;
                        xscale = this.dscalevector * Globals.canvasowidth / sWide;
                    }
                    newscalev = Math.min(yscale, xscale);
                    if (hscalepdf > 0 && wscalepdf > 0) {
                        yscale = this.dscalepdf * Globals.canvasoheight / sHi;
                        xscale = this.dscalepdf * Globals.canvasowidth / sWide;
                    }
                    newscalepdf = Math.min(yscale, xscale);
                    factor = newscale / this.dscale;
                    if (this.usevectorxml) {
                        factor = newscalev / this.dscalevector;
                    }
                    if (this.usepdfjs) {
                        factor = newscalepdf / this.dscalepdf;
                    }
                    this.ZoomIn(factor, false, false);
                }
                break;
            case 180:
                if (this.usepdfjs) {
                    pointXtoCenter = rectCenterX - canvdiv2W;
                    pointYtoCenter = rectCenterY - canvdiv2H;
                    oy1pdf = (this.dypdf + rectCenterY) - canvdiv2H;
                    ox1pdf = (this.dxpdf + rectCenterX) - canvdiv2W;
                    this.dxpdf = ox1pdf;
                    this.dypdf = oy1pdf;
                    if (hscalepdf > 0 && wscalepdf > 0) {
                        yscale = this.dscalepdf * Globals.canvasoheight / sHi;
                        xscale = this.dscalepdf * Globals.canvasowidth / sWide;
                    }
                    newscalepdf = Math.min(yscale, xscale);
                    factor = newscalepdf / this.dscalepdf;
                    prevcenterxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
                    prevcenterypdf = (Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2;
                    diffxpdf = prevcenterxpdf - this.dxpdf;
                    diffypdf = prevcenterypdf - this.dypdf;
                    this.dscalepdf = newscalepdf;
                    centerxpdf = ((Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2);
                    centerypdf = ((Globals.canvasoheight - (pcanvheight * this.dscalepdf)) / 2);
                    this.dxpdf = centerxpdf - (diffxpdf * factor);
                    this.dypdf = centerypdf - (diffypdf * factor);
                } else {
                    //move point to center
                    pointXtoCenter = rectCenterX - canvdiv2W;
                    pointYtoCenter = rectCenterY - canvdiv2H;
                    oy1 = (this.dy + pointYtoCenter);
                    ox1 = (this.dx + pointXtoCenter);
                    oy1v = (this.dyvector + pointYtoCenter);
                    ox1v = (this.dxvector + pointXtoCenter);
                    ox1pdf = (this.dypdf + pointYtoCenter);
                    oy1pdf = (this.dxpdf + pointXtoCenter);
                    this.dx = ox1;
                    this.dy = oy1;
                    this.dxvector = ox1v;
                    this.dyvector = oy1v;
                    this.dxpdf = ox1pdf;
                    this.dypdf = oy1pdf;
                    if (hscale > 0 && wscale > 0) {
                        yscale = this.dscale * Globals.canvasoheight / sHi;
                        xscale = this.dscale * Globals.canvasowidth / sWide;
                    }
                    newscale = Math.min(yscale, xscale);
                    if (hscalev > 0 && wscalev > 0) {
                        yscale = this.dscalevector * Globals.canvasoheight / sHi;
                        xscale = this.dscalevector * Globals.canvasowidth / sWide;
                    }
                    newscalev = Math.min(yscale, xscale);
                    if (hscalepdf > 0 && wscalepdf > 0) {
                        yscale = this.dscalepdf * Globals.canvasoheight / sHi;
                        xscale = this.dscalepdf * Globals.canvasowidth / sWide;
                    }
                    newscalepdf = Math.min(yscale, xscale);
                    factor = newscale / this.dscale;
                    if (this.usevectorxml) {
                        factor = newscalev / this.dscalevector;
                    }
                    if (this.usepdfjs) {
                        factor = newscalepdf / this.dscalepdf;
                    }
                    this.ZoomIn(factor, false, false);
                }
                break;
            case 0:
                //offset in current scale
                ox1 = -((rectCenterX - this.dx) / this.dscale);
                oy1 = -((rectCenterY - this.dy) / this.dscale);
                ox1v = -((rectCenterX - this.dxvector) / this.dscalevector);
                oy1v = -((rectCenterY - this.dyvector) / this.dscalevector);
                ox1pdf = -((rectCenterX - this.dxpdf) / this.dscalepdf);
                oy1pdf = -((rectCenterY - this.dypdf) / this.dscalepdf);
                if (hscale > 0 && wscale > 0) {
                    yscale = this.dscale * Globals.canvasoheight / sHi;
                    xscale = this.dscale * Globals.canvasowidth / sWide;
                }
                this.dscale = Math.min(yscale, xscale);
                this.dx = (ox1 * this.dscale) + (Globals.canvasowidth / 2);
                this.dy = (oy1 * this.dscale) + (Globals.canvasoheight / 2);
                if (hscalev > 0 && wscalev > 0) {
                    yscale = this.dscalevector * Globals.canvasoheight / sHi;
                    xscale = this.dscalevector * Globals.canvasowidth / sWide;
                }
                this.dscalevector = Math.min(yscale, xscale);
                this.dxvector = (ox1v * this.dscalevector) + (Globals.canvasowidth / 2);
                this.dyvector = (oy1v * this.dscalevector) + (Globals.canvasoheight / 2);

                if (hscalepdf > 0 && wscalepdf > 0) {
                    yscale = this.dscalepdf * Globals.canvasoheight / sHi;
                    xscale = this.dscalepdf * Globals.canvasowidth / sWide;

                }
                this.dscalepdf = Math.min(yscale, xscale);
                this.dxpdf = (ox1pdf * this.dscalepdf) + (Globals.canvasowidth / 2);
                this.dypdf = (oy1pdf * this.dscalepdf) + (Globals.canvasoheight / 2);
                break;
        }
        //context.clearRect(0, 0, canvas.width, canvas.height);
        if (this.usevector3Dxml) {
            return;
        }
        if (!this.usevectorxml) {
            if (this.usepdfjs) {
                this.startx = this.dxpdf;
                this.starty = this.dypdf;
                this.endx = (pcanvwidth * this.dscalepdf) + this.startx;
                this.endy = (pcanvheight * this.dscalepdf) + this.starty;
                if (this.pagenumber == Globals.DocObj.pages[Globals.DocObj.currentpage].pagenumber) {
                    if (this.usedincomposite && this.compositereference != undefined) {
                        this.dscalepdf = this.compositereference.getoverlayScaleFactor(2);
                        this.compositereference.scaleToBackground(true);
                    }else{
                        this.DocRef.zoom_update(sx, sy, sWide, sHi);
                        this.DocRef.draw_mpagepdf();
                    }
                }
            } else {
                this.checkimageswitch();
                if (this.DocRef.Type == 0) {
                    this.DocRef.draw_mpage();
                } else {
                    if (this.usedincomposite && this.compositereference != undefined) {
                        //this.dscale = this.compositereference.getoverlayScaleFactor(2);
                        this.compositereference.scaleToBackground(true);
                    } else {
                        this.draw_image(true);
                    }
                }
            }
        } else {
            this.startx = this.dxvector;
            this.starty = this.dyvector;
            this.endx = (this.VectorPageObj.width * this.dscalevector) + this.startx;
            this.endy = (this.VectorPageObj.height * this.dscalevector) + this.starty;

            if (this.usedincomposite && this.compositereference != undefined) {
                //this.dscalevector = this.compositereference.getoverlayScaleFactor(2);
                this.compositereference.scaleToBackground(true);
            } else {
                this.draw_vector(false);
            }
        }
        if (this.usepdfjs) {
            this.pdfrenderopque += 1;
            this.pdfisrendered = false;
        }
        drawmarkupAll(Globals.cntximg);
        DrawMarkupSelected(Globals.context);
        if(RxCore_GUI_ZoomUpdated != undefined && bexternal == undefined){
            pagerect = this.getpagerect();
            zoomparams = {sx : sx, sy : sy, sWide : sWide, sHi: sHi, rect : pagerect};
            RxCore_GUI_ZoomUpdated.zoomUpdate(zoomparams, 2);
        }
    }


    public MarkupFind(SearchExpr:string) {
        let textfound = false;
        let hscaled = 0;
        let wscaled = 0;
        let xscaled = 0;
        let yscaled = 0;
        let npage = 0;

        while (this.CurrentMarkup < this.DocRef.nummarkups && !textfound) {
            if (this.DocRef.markuplist[this.CurrentMarkup].FindText(SearchExpr)) {
                textfound = true;
                this.zoomall();
                hscaled = this.DocRef.markuplist[this.CurrentMarkup].hscaled;
                wscaled = this.DocRef.markuplist[this.CurrentMarkup].wscaled;
                xscaled = this.DocRef.markuplist[this.CurrentMarkup].xscaled;
                yscaled = this.DocRef.markuplist[this.CurrentMarkup].yscaled;
                npage = this.DocRef.markuplist[this.CurrentMarkup].pagenumber;
                switch (this.drotation) {
                    case 0:
                        switch (this.DocRef.markuplist[this.CurrentMarkup].type) { // TODO:JS->TS:FIX refactor/define the markup values
                            case 0:
                                wscaled = wscaled - xscaled;
                                hscaled = hscaled - yscaled;
                                break;
                            case 1:
                                wscaled = wscaled - xscaled;
                                hscaled = hscaled - yscaled;
                                break;
                            case 2:
                                wscaled = wscaled - xscaled;
                                hscaled = hscaled - yscaled;
                                break;
                            case 6:
                                wscaled = wscaled - xscaled;
                                hscaled = hscaled - yscaled;
                                break;
                            case 7:
                                wscaled = wscaled - xscaled;
                                hscaled = hscaled - yscaled;
                                break;
                            case 8:
                                wscaled = wscaled - xscaled;
                                hscaled = hscaled - yscaled;
                                break;
                            case 9:
                                yscaled = yscaled - hscaled;
                                break;
                            default:
                                break;
                        }
                        break;
                    case 90:
                        //all values are absolute for all markup types.
                        hscaled = this.DocRef.markuplist[this.CurrentMarkup].rotatedrect.h;
                        wscaled = this.DocRef.markuplist[this.CurrentMarkup].rotatedrect.w;
                        xscaled = this.DocRef.markuplist[this.CurrentMarkup].rotatedrect.x;
                        yscaled = this.DocRef.markuplist[this.CurrentMarkup].rotatedrect.y;
                        //switch rect values to comply with orientation
                        //switch x and w
                        const wxtemp = xscaled;
                        xscaled = wscaled;
                        wscaled = wxtemp;
                        //change absolute rect values to relative
                        wscaled = wscaled - xscaled;
                        hscaled = hscaled - yscaled;
                        break;
                    case 180:
                        //all values are absolute for all markup types.
                        hscaled = this.DocRef.markuplist[this.CurrentMarkup].rotatedrect.h;
                        wscaled = this.DocRef.markuplist[this.CurrentMarkup].rotatedrect.w;
                        xscaled = this.DocRef.markuplist[this.CurrentMarkup].rotatedrect.x;
                        yscaled = this.DocRef.markuplist[this.CurrentMarkup].rotatedrect.y;
                        //switch rect values to comply with orientation
                        //both x,w and y,h is switched
                        const xtemp = xscaled;
                        const ytemp = yscaled;
                        xscaled = wscaled;
                        yscaled = hscaled;
                        wscaled = xtemp;
                        hscaled = ytemp;
                        //change absolute rect values to relative
                        wscaled = wscaled - xscaled;
                        hscaled = hscaled - yscaled;
                        break;
                    case 270:
                        //all values are absolute for all markup types.
                        hscaled = this.DocRef.markuplist[this.CurrentMarkup].rotatedrect.h;
                        wscaled = this.DocRef.markuplist[this.CurrentMarkup].rotatedrect.w;
                        xscaled = this.DocRef.markuplist[this.CurrentMarkup].rotatedrect.x;
                        yscaled = this.DocRef.markuplist[this.CurrentMarkup].rotatedrect.y;
                        //switch rect values to comply with orientation
                        const wytemp = yscaled;
                        yscaled = hscaled;
                        hscaled = wytemp;

                        //yscaled -= wscaled;
                        //var hwtemp = wscaled;
                        //wscaled = hscaled;
                        //hscaled = hwtemp;

                        //change absolute rect values to relative
                        wscaled = wscaled - xscaled;
                        hscaled = hscaled - yscaled;
                        break;
                }
                hscaled = hscaled + 100;
                wscaled = wscaled + 50;
                xscaled = xscaled - 50;
                yscaled = yscaled - 50;
                this.zoom_update(xscaled, yscaled, wscaled, hscaled);
            }
            this.CurrentMarkup++;
        }
        this.CurrentMarkup = 0;
    }

    public SetMarkupZoom(dx:number, dy:number, dscale:number) {
        let pcanvheight = 0;
        let pcanvwidth = 0;
        if (this.usevectorxml) {
            if (this.vectorloaded) {
                this.dscalevector = dscale;
                this.dxvector = dx;
                this.dyvector = dy;
                this.startx = this.dxvector;
                this.starty = this.dyvector;
                this.endx = (this.VectorPageObj.width * this.dscalevector) + this.startx;
                this.endy = (this.VectorPageObj.height * this.dscalevector) + this.starty;
                this.draw_vector(false);
            } else {
                this.loadbinvectors();
            }
        } else if (this.usepdfjs) {
            if (this.usedincomposite && this.compositereference != undefined){
                pcanvheight = this.compositereference.ovpagecanvas.height;
                pcanvwidth = this.compositereference.ovpagecanvas.width;
            }else{
                pcanvheight = this.offscreenheight;
                pcanvwidth = this.offscreenwidth;
            }
            this.dscalepdf = dscale;
            this.dxpdf = dx;
            this.dypdf = dy;
            this.startx = this.dxpdf;
            this.starty = this.dypdf;
            this.endx = (pcanvwidth * this.dscalepdf) + this.startx;
            this.endy = (pcanvheight * this.dscalepdf) + this.starty;
            this.pdfrenderopque += 1;
            this.pdfisrendered = false;
            if (this.pagenumber == this.DocRef.pages[this.DocRef.currentpage].pagenumber) {
                if (this.usedincomposite && this.compositereference != undefined) {
                    this.compositereference.scaleToBackground(true);
                }else{
                    this.DocRef.draw_mpagepdf();
                }
            }
        } else {
            this.dscale = dscale;
            this.dx = dx;
            this.dy = dy;
            this.checkimageswitch();
            if (this.DocRef.Type == 0) {
                this.DocRef.draw_mpage();
            } else {
                if (this.usedincomposite && this.compositereference != undefined) {
                    this.compositereference.scaleToBackground(true);
                } else {
                    this.draw_image(true);
                }
            }
        }
        //drawmarkupAll(cntximg);
        //DrawMarkupSelected(context);
    }

    public MarkupZoombyMarkup(markupobj:any) {
        this.zoomall();
        //var npage = markupobj.pagenumber;
        let scalefactor = this.dscale / markupobj.scaling;
        if (this.usevectorxml) {
            scalefactor = this.dscalevector / markupobj.scaling;
        } else if (this.usepdfjs) {
            scalefactor = this.dscalepdf / markupobj.scaling;
        } else {
            scalefactor = this.dscale / markupobj.scaling;
        }
        let xscaled = markupobj.xscaled;
        let wscaled = markupobj.wscaled;
        let yscaled = markupobj.yscaled;
        let hscaled = markupobj.hscaled;
        let switchval;
        switch (this.drotation) {
            case 0:
                switch (markupobj.type) { // TODO:JS->TS:ADJUST refactor
                    case 0:
                        xscaled = Math.min(markupobj.xscaled, markupobj.wscaled);
                        wscaled = Math.max(markupobj.xscaled, markupobj.wscaled);
                        yscaled = Math.min(markupobj.yscaled, markupobj.hscaled);
                        hscaled = Math.max(markupobj.yscaled, markupobj.hscaled);
                        wscaled = wscaled - xscaled;
                        hscaled = hscaled - yscaled;
                        break;
                    case 1:
                        xscaled = Math.min(markupobj.xscaled, markupobj.wscaled);
                        wscaled = Math.max(markupobj.xscaled, markupobj.wscaled);
                        yscaled = Math.min(markupobj.yscaled, markupobj.hscaled);
                        hscaled = Math.max(markupobj.yscaled, markupobj.hscaled);
                        wscaled = wscaled - xscaled;
                        hscaled = hscaled - yscaled;
                        break;
                    case 2:
                        xscaled = Math.min(markupobj.xscaled, markupobj.wscaled);
                        wscaled = Math.max(markupobj.xscaled, markupobj.wscaled);
                        yscaled = Math.min(markupobj.yscaled, markupobj.hscaled);
                        hscaled = Math.max(markupobj.yscaled, markupobj.hscaled);
                        wscaled = wscaled - xscaled;
                        hscaled = hscaled - yscaled;
                        break;
                    case 6:
                        xscaled = Math.min(markupobj.xscaled, markupobj.wscaled);
                        wscaled = Math.max(markupobj.xscaled, markupobj.wscaled);
                        yscaled = Math.min(markupobj.yscaled, markupobj.hscaled);
                        hscaled = Math.max(markupobj.yscaled, markupobj.hscaled);
                        wscaled = wscaled - xscaled;
                        hscaled = hscaled - yscaled;
                        if (hscaled == 0) {
                            hscaled = 1;
                        }
                        if (wscaled == 0) {
                            wscaled = 1;
                        }
                        break;
                    case 7:
                        xscaled = Math.min(markupobj.xscaled, markupobj.wscaled);
                        wscaled = Math.max(markupobj.xscaled, markupobj.wscaled);
                        yscaled = Math.min(markupobj.yscaled, markupobj.hscaled);
                        hscaled = Math.max(markupobj.yscaled, markupobj.hscaled);
                        wscaled = wscaled - xscaled;
                        hscaled = hscaled - yscaled;
                        if (hscaled == 0) {
                            hscaled = 1;
                        }
                        if (wscaled == 0) {
                            wscaled = 1;
                        }
                        break;
                    case 8:
                        xscaled = Math.min(markupobj.xscaled, markupobj.wscaled);
                        wscaled = Math.max(markupobj.xscaled, markupobj.wscaled);
                        yscaled = Math.min(markupobj.yscaled, markupobj.hscaled);
                        hscaled = Math.max(markupobj.yscaled, markupobj.hscaled);
                        wscaled = wscaled - xscaled;
                        hscaled = hscaled - yscaled;
                        break;
                    case 9:
                        if (markupobj.textrotate == 0) {
                            xscaled = markupobj.rotatedrect.x;
                            wscaled = markupobj.rotatedrect.w;
                            yscaled = markupobj.rotatedrect.y;
                            hscaled = markupobj.rotatedrect.h;
                        }
                        if (markupobj.textrotate / (Math.PI / 180) == 90) {
                            xscaled = markupobj.xscaled;
                            yscaled = markupobj.yscaled;
                            wscaled = markupobj.wscaled;
                            hscaled = markupobj.hscaled;
                            switchval = wscaled;
                            wscaled = hscaled;
                            hscaled = switchval;
                            //xscaled = xscaled + wscaled;
                            //yscaled = yscaled + hscaled;
                        }
                        if (markupobj.textrotate / (Math.PI / 180) == 270) {
                            xscaled = markupobj.xscaled;
                            yscaled = markupobj.yscaled;
                            wscaled = markupobj.wscaled;
                            hscaled = markupobj.hscaled;
                            switchval = wscaled;
                            wscaled = hscaled;
                            hscaled = switchval;
                            xscaled = xscaled - wscaled;
                            yscaled = yscaled - hscaled;
                        }
                        if (markupobj.textrotate / (Math.PI / 180) == 180) {
                            xscaled = markupobj.xscaled;
                            yscaled = markupobj.yscaled;
                            wscaled = markupobj.wscaled;
                            hscaled = markupobj.hscaled;
                            xscaled = xscaled - wscaled;
                            yscaled = yscaled - hscaled;
                        }
                        //yscaled = yscaled - hscaled;
                        break;
                    default:
                        break;
                }
                break;
            case 90:
                //all values are absolute for all markup types.
                xscaled = Math.min(markupobj.rotatedrect.x, markupobj.rotatedrect.w);
                wscaled = Math.max(markupobj.rotatedrect.x, markupobj.rotatedrect.w);
                yscaled = Math.min(markupobj.rotatedrect.y, markupobj.rotatedrect.h);
                hscaled = Math.max(markupobj.rotatedrect.y, markupobj.rotatedrect.h);
                //switch rect values to comply with orientation
                //switch x and w
                /*var wxtemp = xscaled;
                 xscaled = wscaled;
                 wscaled = wxtemp;*/
                //change absolute rect values to relative
                wscaled = wscaled - xscaled;
                hscaled = hscaled - yscaled;
                if (hscaled == 0) {
                    hscaled = 1;
                }
                if (wscaled == 0) {
                    wscaled = 1;
                }
                break;
            case 180:
                //all values are absolute for all markup types.
                xscaled = Math.min(markupobj.rotatedrect.x, markupobj.rotatedrect.w);
                wscaled = Math.max(markupobj.rotatedrect.x, markupobj.rotatedrect.w);
                yscaled = Math.min(markupobj.rotatedrect.y, markupobj.rotatedrect.h);
                hscaled = Math.max(markupobj.rotatedrect.y, markupobj.rotatedrect.h);
                //switch rect values to comply with orientation
                //both x,w and y,h is switched
                /*var xtemp = xscaled;
                 var ytemp = yscaled;
                 xscaled = wscaled;
                 yscaled = hscaled;
                 wscaled = xtemp;
                 hscaled = ytemp;*/
                //change absolute rect values to relative
                wscaled = wscaled - xscaled;
                hscaled = hscaled - yscaled;
                if (hscaled == 0) {
                    hscaled = 1;
                }
                if (wscaled == 0) {
                    wscaled = 1;
                }
                break;
            case 270:
                //all values are absolute for all markup types.
                xscaled = Math.min(markupobj.rotatedrect.x, markupobj.rotatedrect.w);
                wscaled = Math.max(markupobj.rotatedrect.x, markupobj.rotatedrect.w);
                yscaled = Math.min(markupobj.rotatedrect.y, markupobj.rotatedrect.h);
                hscaled = Math.max(markupobj.rotatedrect.y, markupobj.rotatedrect.h);
                //switch rect values to comply with orientation
                /*var wytemp = yscaled;
                 yscaled = hscaled;
                 hscaled = wytemp;*/


                //yscaled -= wscaled;
                //var hwtemp = wscaled;
                //wscaled = hscaled;
                //hscaled = hwtemp;

                //change absolute rect values to relative
                wscaled = wscaled - xscaled;
                hscaled = hscaled - yscaled;
                if (hscaled == 0) {
                    hscaled = 1;
                }
                if (wscaled == 0) {
                    wscaled = 1;
                }
                break;

        }
        //Call zoom update with values.
        this.zoom_update(xscaled, yscaled, wscaled, hscaled);
        this.ZoomOut(3, false,false);
    }

    public MarkupZoom() {
        //get current markup from list
        //GetCurMarkup(this.CurrentMarkup);
        if (this.CurrentMarkup > this.DocRef.nummarkups - 1) {
            this.CurrentMarkup = 0;
        }
        let npage = this.DocRef.markuplist[this.CurrentMarkup].pagenumber;
        while (npage != this.pagenumber && this.CurrentMarkup >= this.DocRef.nummarkups - 1) {
            this.CurrentMarkup++;
            npage = this.DocRef.markuplist[this.CurrentMarkup].pagenumber;
        }
        if (this.CurrentMarkup <= this.DocRef.nummarkups - 1) {
            this.MarkupZoombyMarkup(this.DocRef.markuplist[this.CurrentMarkup]);
            this.CurrentMarkup++;
            if (this.CurrentMarkup <= this.DocRef.nummarkups - 1) {
                npage = this.DocRef.markuplist[this.CurrentMarkup].pagenumber;
                while (npage != this.pagenumber && this.CurrentMarkup <= this.DocRef.nummarkups - 1) {
                    this.CurrentMarkup++;
                    if (this.CurrentMarkup >= this.DocRef.nummarkups - 1) {
                        break;
                    }
                    npage = this.DocRef.markuplist[this.CurrentMarkup].pagenumber;
                }
                if (this.CurrentMarkup >= this.DocRef.nummarkups - 1) {
                    this.CurrentMarkup = 0;
                }
            }
        }
    }

    public resize() {
        if (this.usevector3Dxml) {
            return;
        }
        let xscale = 0;
        let yscale = 0;
        if (this.bDorescaleonsizeChange) {
            yscale = Globals.canvasoheight / this.MainImageHeight;
            xscale = Globals.canvasowidth / this.MainImageWidth;
            this.dscale = Math.min(xscale, yscale);
            this.dx = (Globals.canvasowidth - (this.MainImageWidth * this.dscale)) / 2;
            this.dy = (Globals.canvasoheight - (this.MainImageHeight * this.dscale)) / 2;
        }
        if (this.usevectorxml && this.bDorescaleonsizeChange) {
            yscale = Globals.canvasoheight / this.VectorPageObj.height;
            xscale = Globals.canvasowidth / this.VectorPageObj.width;
            this.dscalevector = Math.min(xscale, yscale);
            this.dxvector = (Globals.canvasowidth - (this.VectorPageObj.width * this.dscalevector)) / 2;
            this.dyvector = (Globals.canvasoheight - (this.VectorPageObj.height * this.dscalevector)) / 2;
        }
        let pcanvheight = 0;
        let pcanvwidth = 0;
        if (this.usepdfjs) {
            //yscale = canvasoheight / thispage.pagecanvas.height;
            //xscale = canvasowidth / thispage.pagecanvas.width;
            //this.dscalepdf = Math.min(xscale,yscale);


            //this.dxpdf = (canvasowidth - (thispage.pagecanvas.width * this.dscalepdf)) / 2;
            //this.dypdf = (canvasoheight - (thispage.pagecanvas.height * this.dscalepdf)) / 2;
            if (this.usedincomposite && this.compositereference != undefined){
                pcanvheight = this.compositereference.ovpagecanvas.height;
                pcanvwidth = this.compositereference.ovpagecanvas.width;
            }else{
                pcanvheight = this.offscreenheight;
                pcanvwidth = this.offscreenwidth;
            }
            if (this.dxpdf > 1){
                this.pan_update(((Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2)-this.dxpdf,0);
            }
            //DocObj.draw_mpagepdf();
        }
        if (!this.usevectorxml) {
            if (this.usepdfjs) {
                //DocObj.draw_mpagepdf();
                this.startx = this.dxpdf;
                this.starty = this.dypdf;
                this.endx = (pcanvwidth * this.dscalepdf) + this.startx;
                this.endy = (pcanvheight * this.dscalepdf) + this.starty;
                if (this.pagenumber == this.DocRef.pages[this.DocRef.currentpage].pagenumber) {
                    if (Globals.canvasoheight > pcanvheight) {
                        this.zoomall();
                    } else {
                        if (this.usedincomposite && this.compositereference != undefined) {
                            this.dscalepdf = this.compositereference.getoverlayScaleFactor(6);
                            this.compositereference.scaleToBackground(true);
                        }else{
                            this.DocRef.draw_mpagepdf();
                        }
                    }
                }
            } else {
                this.checkimageswitch();
                if (this.DocRef.Type == 0) {
                    this.DocRef.draw_mpage();
                } else {
                    if (this.usedincomposite && this.compositereference != undefined) {
                        //this.dscale = this.compositereference.getoverlayScaleFactor(6);
                        this.compositereference.scaleToBackground(true);
                    } else {
                        this.draw_image(true);
                    }
                }
            }
        } else {
            if(this.VectorPageObj == undefined){
                return;
            }
            this.startx = this.dxvector;
            this.starty = this.dyvector;
            this.endx = (this.VectorPageObj.width * this.dscalevector) + this.startx;
            this.endy = (this.VectorPageObj.height * this.dscalevector) + this.starty;
            if (this.usedincomposite && this.compositereference != undefined) {
                //this.dscalevector = this.compositereference.getoverlayScaleFactor(6);
                this.compositereference.scaleToBackground(true);
            } else {
                this.draw_vector(false);
            }
        }
        drawmarkupAll(Globals.cntximg);
        DrawMarkupSelected(Globals.context);
    }

    public pan_page(sx:any, sy:any, bexternal:any){
        this.pan_update(sx,sy, bexternal);
    }

    public pan_page_pos(sx:any, sy:any, bexternal:any){
        this.pan_position(sx,sy, bexternal);
    }

    public pan_position(sx:any, sy:any, bexternal?:any){ // TODO:JS->TS:INFO bexternal was made optional. It is not used inside the function, but there are method calls with 3 params
        const pgdim = this.getpagedim();
        const diffx = pgdim.x - sx;
        const diffy = pgdim.y - sy;
        this.pan_update(diffx,diffy, true);
    }

    public getpagetestrect(rect:any){
        let rotrect = {x1:rect.startx,y1: rect.starty,x2: rect.endx,y2:rect.endy};
        const pagerect = {
            x : rotrect.x1,
            y : rotrect.y1,
            w : rotrect.x2 - rotrect.x1,
            h : rotrect.y2 - rotrect.y1
        };
        if(this.drotation != 0){
            rotrect = rect_rotated(rect.startx,rect.starty, rect.endx,rect.endy);
            pagerect.x = rotrect.x1;
            pagerect.y = rotrect.y1;
            pagerect.w = rotrect.x2 - rotrect.x1;
            pagerect.h = rotrect.y2 - rotrect.y1;
            switch(this.drotation){
                case 90:
                    pagerect.y = -((pagerect.y + pagerect.h) - Globals.canvasoheight);
                    pagerect.x = -((pagerect.x + pagerect.w) - Globals.canvasowidth);
                    break;
                case 270:
                    pagerect.y = -((pagerect.y + pagerect.h) - Globals.canvasoheight);
                    pagerect.x = -((pagerect.x + pagerect.w) - Globals.canvasowidth);
                    break;
            }
        }
        return pagerect;
    }

    public getpagerect(){
        let rotrect = {x1:this.startx,y1: this.starty,x2: this.endx,y2:this.endy};
        const pagerect = {
            x : rotrect.x1,
            y : rotrect.y1,
            w : rotrect.x2 - rotrect.x1,
            h : rotrect.y2 - rotrect.y1
        };
        if(this.drotation != 0){
            rotrect = rect_rotated(this.startx,this.starty, this.endx,this.endy);
            pagerect.x = rotrect.x1;
            pagerect.y = rotrect.y1;
            pagerect.w = rotrect.x2 - rotrect.x1;
            pagerect.h = rotrect.y2 - rotrect.y1;
            switch(this.drotation){
                case 90:
                    pagerect.y = -((pagerect.y + pagerect.h) - Globals.canvasoheight);
                    pagerect.x = -((pagerect.x + pagerect.w) - Globals.canvasowidth);
                    break;
                case 270:
                    pagerect.y = -((pagerect.y + pagerect.h) - Globals.canvasoheight);
                    pagerect.x = -((pagerect.x + pagerect.w) - Globals.canvasowidth);
                    break;
            }
        }
        return pagerect;
    }

    public pan_update(sx:any, sy:any, bexternal:any = undefined) {
        if (this.usevector3Dxml) {
            return;
        }
        let pagerect:any = undefined;
        if(RxCore_GUI_PanUpdate != undefined && bexternal == undefined){
            pagerect = this.getpagerect();
            RxCore_GUI_PanUpdate.panUpdate(sx,sy, pagerect);
        }

        const curpdfdx = this.dxpdf;
        switch (this.drotation) {
            case 0:
                this.dx = this.dx - sx;
                this.dy = this.dy - sy;
                this.dxvector -= sx;
                this.dyvector -= sy;
                this.dxpdf -= sx;
                this.dypdf -= sy;
                break;
            case 90:
                this.dx = this.dx - sy;
                this.dy = this.dy + sx;
                this.dxvector -= sy;
                this.dyvector += sx;
                this.dxpdf -= sy;
                this.dypdf += sx;
                break;
            case 180:
                this.dx = this.dx + sx;
                this.dy = this.dy + sy;
                this.dxvector += sx;
                this.dyvector += sy;
                this.dxpdf += sx;
                this.dypdf += sy;
                break;
            case 270:
                this.dx = this.dx + sy;
                this.dy = this.dy - sx;
                this.dxvector += sy;
                this.dyvector -= sx;
                this.dxpdf += sy;
                this.dypdf -= sx;
                break;
        }
        let pcanvheight = 0;
        let pcanvwidth = 0;
        let left = 0;
        let right = 0;
        let bottom = 0;
        let top = 0;

        if (!this.usevectorxml) {
            if (this.usepdfjs) {
                if (this.usedincomposite && this.compositereference != undefined){
                    pcanvheight = this.compositereference.ovpagecanvas.height;
                    pcanvwidth = this.compositereference.ovpagecanvas.width;
                }else{
                    pcanvheight = this.offscreenheight;
                    pcanvwidth = this.offscreenwidth;
                }
                this.startx = this.dxpdf;
                this.starty = this.dypdf;
                this.PDFTextArea.style.left = this.startx + "px";
                this.PDFTextArea.style.top = this.starty + "px";
                this.endx = (pcanvwidth * this.dscalepdf) + this.startx;
                this.endy = (pcanvheight * this.dscalepdf) + this.starty;
                if (this.usedincomposite && this.compositereference != undefined){
                    //allow free position for PDF when used with overlay/compare
                }else{
                    if (pcanvwidth * this.dscalepdf <= Globals.canvasowidth && this.drotation == 0) {
                        this.dxpdf = (Globals.canvasowidth - (pcanvwidth * this.dscalepdf)) / 2;
                    }
                }
                if (this.pagenumber == this.DocRef.pages[this.DocRef.currentpage].pagenumber) {
                    if (this.usedincomposite && this.compositereference != undefined) {
                        this.compositereference.scaleToBackground(false);
                    }else{
                        this.DocRef.pan_update(sx, sy);
                        this.DocRef.draw_mpagepdf();
                    }
                }
                //DocObj.draw_mpagepdf();

                left = Math.max(0, this.dxpdf);
                right = Math.min(Globals.canvasowidth, this.endx);
                bottom = Math.max(Globals.canvasoheight, this.endy);
                top = Math.min(0, this.dypdf);

                if(left < right && bottom > top){
                    this.visible = true;
                    if(this.DocRef.textselect){
                        this.PDFTextArea.style.display = Globals.szdispvalue;
                    }
                }else{
                    this.visible = false;
                    if(this.DocRef.textselect){
                       this.PDFTextArea.style.display = "none";
                    }
                }
                /*if ((thispage.dxpdf < canvasowidth && thispage.dxpdf > 0) || (thispage.endx > 0 && thispage.endx < canvasowidth)) {
                    if ((thispage.dypdf < canvasoheight && thispage.dypdf > 0) || (thispage.endy > 0 && thispage.endy < canvasoheight)) {
                        thispage.visible = true;
                        thispage.PDFTextArea.style.display = "initial";
                        console.log('pan visible on');
                        //console.log('visible ' + thispage.pagenumber);
                    } else {
                        thispage.visible = false;
                        thispage.PDFTextArea.style.display = "none";
                        console.log('pan visible off');

                    }
                }*/
            } else {
                this.checkimageswitch();
                if (this.DocRef.Type == 0) {
                    this.DocRef.draw_mpage();
                } else {
                    if (this.usedincomposite && this.compositereference != undefined) {
                        this.compositereference.scaleToBackground(false);
                    } else {
                        this.draw_image(true);
                    }
                }
            }
        } else {
            this.startx = this.dxvector;
            this.starty = this.dyvector;
            this.endx = (this.VectorPageObj.width * this.dscalevector) + this.startx;
            this.endy = (this.VectorPageObj.height * this.dscalevector) + this.starty;
            //thispage.TextSelectArea.style.left = thispage.startx + "px";
            //thispage.TextSelectArea.style.top = thispage.starty + "px";
            this.movetextdivs();
            if (this.usedincomposite && this.compositereference != undefined) {
                this.compositereference.scaleToBackground(false);
            } else {
                this.draw_vector(false);
            }
            left = Math.max(0, this.dxvector);
            right = Math.min(Globals.canvasowidth, this.endx);
            bottom = Math.max(Globals.canvasoheight, this.endy);
            top = Math.min(0, this.dyvector);
            if(left < right && bottom > top){
                this.visible = true;
                if(this.DocRef.textselect){
                    this.TextSelectArea.style.display = Globals.szdispvalue;
                }
            }else{
                this.visible = false;
                if(this.DocRef.textselect){
                    this.TextSelectArea.style.display = "none";
                }
            }
        }
        drawmarkupAll(Globals.cntximg);
        DrawMarkupSelected(Globals.context);
        if(RxCore_GUI_PanUpdated != undefined && bexternal == undefined){
            pagerect = this.getpagerect();
            RxCore_GUI_PanUpdated.panUpdate(sx,sy, pagerect);
        }
    }

    public rotateCanvas() {
        let localdx = 0.0;
        let localdy = 0.0;
        let localdscale = 0.0;

        Globals.contexto.save();
        let tx = (Globals.canvasowidth / 2);
        let ty = (Globals.canvasoheight / 2);
        Globals.contexto.translate(tx, ty);
        Globals.contexto.rotate(this.drotation * (Math.PI / 180));
        Globals.contexto.translate(-tx, -ty);
        Globals.contexto.fillStyle = "rgb(238,243,250)";
        Globals.contexto.fillRect(0, 0, Globals.canvasowidth, Globals.canvasoheight);
        switch (this.currentimage) {
            case 0:
                //localdx = this.dx;
                //localdy = this.dy;
                //localdscale = this.dscale;
                Globals.contexto.drawImage(this.largeimage, this.dx, this.dy, this.MainImageWidth * this.dscale, this.MainImageHeight * this.dscale);
                break;
            case 1:
                //localdx = this.dxextent;
                //localdy = this.dyextent;
                //localdscale = this.dscaleextent;
                localdscale = this.dscale / this.bitmapratio;
                Globals.contexto.drawImage(this.smallimage, this.dx, this.dy, this.SmallImageWidth * localdscale, this.SmallImageHeight * localdscale);
                break;
        }
        Globals.contexto.restore();
        drawmarkupAll(Globals.cntximg);
        DrawMarkupSelected(Globals.context);
    }

    public rotateimage(degree:number) {
        const bsinglepage = (this.DocRef.pages.length == 1);
        //console.log(bsinglepage);
        if((this.usepdfjs && !this.DocRef.pagelocked) && (this.usepdfjs && !bsinglepage)){
            this.pagelockrotation = degree;
            return;
        }

        let i = 0;
        switch (this.drotation) {
            case 0:
                if (degree == 90) {
                    for (i = 0; i <= 90; i = i + 10) {
                        this.drotation = i;
                        this.rotateCanvas();
                    }
                }
                if (degree == 180) {
                    for (i = 0; i <= 180; i = i + 10) {
                        this.drotation = i;
                        this.rotateCanvas();
                    }
                }
                if (degree == 270) {
                    for (i = 0; i <= 270; i = i + 10) {
                        this.drotation = i;
                        this.rotateCanvas();
                    }
                }
                break;
            case 90:
                if (degree == 0) {
                    for (i = 90; i >= 0; i = i - 10) {
                        this.drotation = i;
                        this.rotateCanvas();
                    }
                }
                if (degree == 180) {
                    for (i = 90; i <= 180; i = i + 10) {
                        this.drotation = i;
                        this.rotateCanvas();
                    }
                }
                if (degree == 270) {
                    for (i = 90; i <= 270; i = i + 10) {
                        this.drotation = i;
                        this.rotateCanvas();
                    }
                }
                break;
            case 180:
                if (degree == 0) {
                    for (i = 180; i >= 0; i = i - 10) {
                        this.drotation = i;
                        this.rotateCanvas();
                    }
                }
                if (degree == 270) {
                    for (i = 180; i <= 270; i = i + 10) {
                        this.drotation = i;
                        this.rotateCanvas();
                    }
                }
                if (degree == 90) {
                    for (i = 180; i >= 90; i = i - 10) {
                        this.drotation = i;
                        this.rotateCanvas();
                    }
                }
                break;
            case 270:
                if (degree == 0) {
                    for (i = 270; i >= 0; i = i - 10) {
                        this.drotation = i;
                        this.rotateCanvas();
                    }
                }
                if (degree == 180) {
                    for (i = 270; i >= 180; i = i - 10) {
                        this.drotation = i;
                        this.rotateCanvas();
                    }
                }
                if (degree == 90) {
                    for (i = 270; i >= 90; i = i - 10) {
                        this.drotation = i;
                        this.rotateCanvas();
                    }
                }
                break;
        }
        //this.draw_image();
        if (this.usevector3Dxml) {
            return;
        }
        let pcanvheight = 0;
        let pcanvwidth = 0;
        if (!this.usevectorxml) {
            if (this.usepdfjs) {
                if (this.usedincomposite && this.compositereference != undefined){
                    pcanvheight = this.compositereference.ovpagecanvas.height;
                    pcanvwidth = this.compositereference.ovpagecanvas.width;
                }else{
                    pcanvheight = this.offscreenheight;
                    pcanvwidth = this.offscreenwidth;
                }
                const centery = Globals.canvasoheight / 2;
                const centerx = Globals.canvasowidth / 2;
                this.startx = this.dxpdf;
                this.starty = this.dypdf;
                this.endx = (pcanvwidth * this.dscalepdf) + this.startx;
                this.endy = (pcanvheight * this.dscalepdf) + this.starty;
                this.PDFTextArea.style.left = this.startx + "px";
                this.PDFTextArea.style.top = this.starty + "px";
                const centerxoff = centerx - this.startx;
                const centeryoff = centery - this.starty;

                //var centerx = this.startx + ((this.endx - this.startx)/2);
                //var centery = this.starty + ((this.endy - this.starty)/2);

                this.PDFTextArea.style.transformOrigin= centerxoff + "px" + " " + centeryoff + "px";
                this.PDFTextArea.style.transform = "rotate(" + this.drotation + "deg)";
                if (this.pagenumber == this.DocRef.pages[this.DocRef.currentpage].pagenumber) {
                    if (this.usedincomposite && this.compositereference != undefined) {
                        this.compositereference.scaleToBackground(false);
                    } else {
                        this.DocRef.draw_mpagepdf();
                    }
                }
            } else {
                if (this.DocRef.Type == 0) {
                    this.DocRef.draw_mpage();
                } else {
                    if (this.usedincomposite && this.compositereference != undefined) {
                        this.compositereference.scaleToBackground(false);
                    } else {
                        this.draw_image(true);
                    }
                }
                //this.checkimageswitch();
            }
        } else {
            this.startx = this.dxvector;
            this.starty = this.dyvector;
            this.endx = (this.VectorPageObj.width * this.dscalevector) + this.startx;
            this.endy = (this.VectorPageObj.height * this.dscalevector) + this.starty;
            this.movetextdivs();
            if (this.usedincomposite && this.compositereference != undefined) {
                this.compositereference.scaleToBackground(false);
            } else {
                this.draw_vector(false);
            }
        }
        if (RxCore_GUI_RotatePage != undefined){
            RxCore_GUI_RotatePage.onRotate(degree); // , this.pagenumber); removed pagenumber since the method only has one param
        }
    }

    public get_layers_html() {
        return this.VectorPageObj.layerhtml;
    }

    public enableSnap(state:any){
        this.snapEnabled = state;
    }

    public getSnapState(){
        return this.snapEnabled;
    }

    public setViewMode(OnOff:boolean){
        if (this.usevectorxml){
            this.VectorPageObj.ViewMode(OnOff);
            this.draw_vector(false);
            this.vectorischanged = true;
        }
    }

    public blockAttributes(blockid:string){
        if (this.usevectorxml){
            return this.VectorPageObj.blockAttributes(blockid);
        }
    }

    public selectBlock(blockid:string){
        if (this.usevectorxml){
            this.VectorPageObj.selectBlock(blockid);
            this.draw_vector(false);
            this.vectorischanged = true;
        }
    }

    public getpixeldist(length:any){
        if (this.usevectorxml){
            const origlength = length * this.VectorPageObj.scale;
            const pixelLength = origlength * this.dscalevector;
            return pixelLength;
        }else{
            return length;
        }
    }

    public getpolygon(x:number,y:number,multi:any){
        if (this.usevectorxml){
            const within =  this.VectorPageObj.getinsidePolygon(x, y, this.dscalevector, this.dxvector, this.dyvector, multi);
            this.draw_vector(false);
            this.vectorischanged = true;
            //thispage.vectorischanged = true;
            if (within){
                //thispage.draw_vector_selected();
                return within;
            }
        }
    }

    public getPDFsnapPoint(x:number, y:number){
        let snappoint = {
            found:false,
            x:0,
            y:0
        };

        let rotatey = false;
        let snappoints = [];
        let rotatedpoint = {x:x,y:y};

        if(this.drotation != 0){
            rotatedpoint = mouse_rotated(x,y);
        }
        x = rotatedpoint.x;
        y = rotatedpoint.y;
        let localscalex = 0;
        let localscaley = 0;

        if(this.PDFinternalScale == undefined || this.PDFPointArray == undefined){
            return snappoint;
        }
        let snapradius = 10;
        if(this.PDFinternalScale.x > 0){
            localscalex = this.pdfSnapScale * this.PDFinternalScale.x;
        }else{
            localscalex = this.pdfSnapScale;
        }
        if(this.PDFinternalScale.y > 0){
            localscaley = this.pdfSnapScale * this.PDFinternalScale.y;
        }else{
            localscaley = this.pdfSnapScale;
            rotatey = true;
        }
        let cheight = this.offscreenheight;
        let cwidth = this.offscreenwidth;
        let transx = 0;
        let transy = 0;
        let a = 0;
        let b = 0;
        let tempdist = 0;
        for(let i = 0;i<this.PDFPointArray.length;i++){
            if (rotatey){
                transy = this.starty + ((this.PDFPointArray[i].y*localscaley) + cheight);
            }else{
                transy = this.starty + (-(this.PDFPointArray[i].y*localscaley) + cheight);
            }
            transx = this.startx + (this.PDFPointArray[i].x*localscalex);
            a = x - transx;
            b = y - transy;
            tempdist = Math.sqrt(a*a + b*b);
            if (tempdist < snapradius){
                snappoints.push({x:transx,y:transy});
            }
        }
        if(snappoints.length > 0){
            a = x - snappoints[0].x;
            b = y - snappoints[0].y;
            let curdist = Math.sqrt(a*a + b*b);
            tempdist = Math.sqrt(a*a + b*b);
            let snapindx = 0;
            for (let i = 0;i<snappoints.length;i++){
                    a = x - snappoints[i].x;
                    b = y - snappoints[i].y;
                    tempdist = Math.sqrt(a*a + b*b);
                    if (tempdist < curdist){
                        curdist = tempdist;
                        snapindx = i;
                    }
            }
            snappoint = {
                found : true,
                x:snappoints[snapindx].x,
                y:snappoints[snapindx].y
            };
        }else{
            snappoint = {
                found:false,
                x:0,
                y:0
            };
        }
        return snappoint;
    }

    public getsnap(x:number, y:number) {
        if (this.usevectorxml && this.snapEnabled ) {
            return this.VectorPageObj.getsnapPoint(x, y, this.dscalevector, this.dxvector, this.dyvector);
        }else if(this.usepdfjs && this.snapEnabled){
            return this.getPDFsnapPoint(x,y);
        }else{
            return {found:false,x:0,y:0};
        }
        //var snapPoint = this.VectorPageObj.getsnapPoint(x,y,this.dscalevector,this.dxvector,this.dyvector);
        //return this.VectorPageObj.getsnapPoint(x, y, this.dscalevector, this.dxvector, this.dyvector);
    }

    public draw_vectorPrint() {
        this.printobj.printctx.fillStyle = "rgb(255,255,255)";
        this.printobj.printctx.fillRect(0, 0, this.printobj.paperimage.width, this.printobj.paperimage.height);
        if (this.VectorPageObj == undefined) {
            return;
        }
        this.VectorPageObj.drawallnew(this.printobj.printctx,this.printobj.pscale,this.printobj.pdx,this.printobj.pdy,true,true);
        //this.VectorPageObj.drawall(thispage.printobj.printctx,thispage.printobj.pscale,thispage.printobj.pdx,thispage.printobj.pdy,true,true);
        drawmarkupPrint(this.printobj.printctx,this.pagenumber,this.printobj.pdx,this.printobj.pdy,this.printobj.pscale);
        //possible callback here.
    }

    public magnifyoff(){
        if (this.usevector3Dxml) {
            return;
        }
        //context.clearRect(0, 0, canvas.width, canvas.height);
        if (this.usedincomposite && this.compositereference != undefined) {
            //thispage.compositereference.draw_compare(false);
            this.compositereference.scaleToBackground(true);
        } else {
            if (this.usevectorxml) {
                this.draw_vector(true);
            } else if(this.usepdfjs) {
                this.DocRef.draw_mpagepdf();
            } else {
                if (this.DocRef.Type == 0) {
                    this.DocRef.draw_mpage();
                }else{
                    this.draw_image(true);
                }
            }
        }
    }

    public drawmagnify(mousepos:any,ctx:any,magnificationScale:any){
        if (this.usevector3Dxml) {
            return;
        }
        let rectCenterX = 0;
        let rectCenterY = 0;
        if (this.drotation == 0) {
            rectCenterX = (mousepos.x - ((Globals.magcanvas.width / 2)/magnificationScale));
            rectCenterY = (mousepos.y - ((Globals.magcanvas.height / 2)/magnificationScale));
        }else{
            const rotpos = rotate_point(mousepos,(Globals.canvasowidth / 2),(Globals.canvasoheight / 2),(360 - this.drotation));
            rectCenterX = (rotpos.x - ((Globals.magcanvas.width / 2)/magnificationScale));
            rectCenterY = (rotpos.y - ((Globals.magcanvas.height / 2)/magnificationScale));
        }
        ctx.fillStyle = this.DocRef.backgroundColor;
        ctx.fillRect(0, 0, Globals.magcanvas.width, Globals.magcanvas.height);
        let tx = (Globals.magcanvas.width / 2);
        let ty = (Globals.magcanvas.height / 2);
        let drawscale = 0;
        let xoffset =  0;
        let yoffset =  0;
        let drawwidth = 0; // TODO:JS->TS:CHECK this does not seem to be used/read
        let drawheight = 0; // TODO:JS->TS:CHECK this does not seem to be used/read
        if (this.usevectorxml){
            drawscale = this.dscalevector * magnificationScale;
            xoffset =  -(rectCenterX) + (this.dxvector); // - (thispage.dxvector + wscale);
            yoffset =  -(rectCenterY) + (this.dyvector);// - (thispage.dyvector + hscale);
            xoffset *= magnificationScale;
            yoffset *= magnificationScale;
            if (this.drotation == 0) {
                this.VectorPageObj.drawallmagnify(ctx, drawscale, xoffset, yoffset);
            }else{
                ctx.save();
                ctx.translate(tx, ty);
                ctx.rotate(this.drotation * (Math.PI / 180));
                ctx.translate(-tx, -ty);
                this.VectorPageObj.drawallmagnify(ctx, drawscale, xoffset, yoffset);
                //ctx.restore();
            }
        }else if(this.usepdfjs){
            drawscale = this.dscalepdf * this.curpagescale  * magnificationScale;
            drawwidth = this.magnifycanvas.width * this.magnifyrestscale; // TODO:JS->TS:CHECK this does not seem to be used
            drawheight = this.magnifycanvas.height * this.magnifyrestscale; // TODO:JS->TS:CHECK this does not seem to be used
            //DocObj.pages[DocObj.currentpage].curpagescale
            xoffset =  -(rectCenterX) + (this.dxpdf);
            yoffset =  -(rectCenterY) + (this.dypdf);
            xoffset *= magnificationScale;
            yoffset *= magnificationScale;
            if (this.drotation == 0) {
                ctx.drawImage(this.magnifycanvas, xoffset, yoffset);
            }else{
                ctx.save();
                ctx.translate(tx, ty);
                ctx.rotate(this.drotation * (Math.PI / 180));
                ctx.translate(-tx, -ty);
                ctx.drawImage(this.magnifycanvas, xoffset, yoffset);
                //ctx.restore();
            }
        }else{
            switch (this.currentimage) {
                case 0:
                    drawscale = this.dscale * magnificationScale;
                    xoffset =  -(rectCenterX) + (this.dx);
                    yoffset =  -(rectCenterY) + (this.dy);
                    xoffset *= magnificationScale;
                    yoffset *= magnificationScale;
                    if (this.drotation == 0) {
                        ctx.drawImage(this.largeimagecnv, xoffset, yoffset,this.MainImageWidth * drawscale,this.MainImageHeight * drawscale);
                    }else{
                        ctx.save();
                        ctx.translate(tx, ty);
                        ctx.rotate(this.drotation * (Math.PI / 180));
                        ctx.translate(-tx, -ty);
                        ctx.drawImage(this.largeimagecnv, xoffset, yoffset,this.MainImageWidth * drawscale,this.MainImageHeight * drawscale);
                        //ctx.restore();
                    }
                    break;
                case 1:
                    drawscale = (this.dscale / this.bitmapratio) * magnificationScale;
                    //var drawscale = thispage.dscale / thispage.bitmapratio;
                    xoffset =  -(rectCenterX) + (this.dx);
                    yoffset =  -(rectCenterY) + (this.dy);
                    xoffset *= magnificationScale;
                    yoffset *= magnificationScale;
                    if (this.drotation == 0) {
                        ctx.drawImage(this.smallimagecnv, xoffset, yoffset,this.SmallImageWidth * drawscale,this.SmallImageHeight * drawscale);
                    }else{
                        ctx.save();
                        ctx.translate(tx, ty);
                        ctx.rotate(this.drotation * (Math.PI / 180));
                        ctx.translate(-tx, -ty);
                        ctx.drawImage(this.smallimagecnv, xoffset, yoffset,this.SmallImageWidth * drawscale,this.SmallImageHeight * drawscale);
                    }
                    break;
            }
            drawscale = this.dscale * magnificationScale;
        }
        if (this.drotation == 0) {
            drawmarkupMagnify(ctx,this.pagenumber,xoffset,yoffset,drawscale,this.drotation);
        }else{
            drawmarkupMagnify(ctx,this.pagenumber,xoffset,yoffset,drawscale,this.drotation);
            ctx.restore();
        }
        //drawmarkupPrint(ctx,thispage.pagenumber,xoffset,yoffset,drawscale);

        //drawscale = thispage.dscalevector;

        //var wscale = ((thispage.VectorPageObj.width * drawscale) - (thispage.VectorPageObj.width * thispage.dscalevector)) / 2;
        //var hscale = ((thispage.VectorPageObj.height * drawscale) - (thispage.VectorPageObj.height * thispage.dscalevector)) / 2;

        //ctx.clearRect(0, 0, magcanvas.width, magcanvas.height);

        //this.VectorPageObj.drawall(ctx, drawscale, xoffset, yoffset, false,false);
    }

    public draw_vector_selected(){
        this.backupScaleAndOffset();
        Globals.contexto.fillRect(0, 0, Globals.canvasowidth, Globals.canvasoheight);
        let tx = (Globals.canvasowidth / 2);
        let ty = (Globals.canvasoheight / 2);
        if (this.VectorPageObj == undefined) {
            return;
        }
        if (this.drotation == 0) {
            //this.VectorPageObj.drawall(contexto, this.dscalevector, this.dxvector, this.dyvector, refresh,false);
            this.VectorPageObj.drawSelected(Globals.contexto, this.dscalevector, this.dxvector, this.dyvector);
        } else {
            Globals.contexto.save();
            Globals.contexto.translate(tx, ty);
            Globals.contexto.rotate(this.drotation * (Math.PI / 180));
            Globals.contexto.translate(-tx, -ty);
            //this.VectorPageObj.drawall(contexto, this.dscalevector, this.dxvector, this.dyvector, refresh,false);
            this.VectorPageObj.drawSelected(Globals.contexto, this.dscalevector, this.dxvector, this.dyvector);
            Globals.contexto.restore();
        }
    }

    public draw_vector(refresh:any) {
        this.backupScaleAndOffset();
        Globals.contexto.fillStyle = Globals.displayBGColor;

        Globals.contexto.fillRect(0, 0, Globals.canvasowidth, Globals.canvasoheight);
        let tx = (Globals.canvasowidth / 2);
        let ty = (Globals.canvasoheight / 2);
        Globals.documentopen = true;
        if (this.VectorPageObj == undefined) {
            return;
        }
        //thispage.cleartextdivs();
        if (Globals.bSuspendDraw){
            return;
        }
        if (this.drotation == 0) {
            //this.VectorPageObj.drawall(contexto, this.dscalevector, this.dxvector, this.dyvector, refresh,false);
            this.VectorPageObj.drawallnew(Globals.contexto, this.dscalevector, this.dxvector, this.dyvector, refresh,false);
        } else {
            Globals.contexto.save();
            Globals.contexto.translate(tx, ty);
            Globals.contexto.rotate(this.drotation * (Math.PI / 180));
            Globals.contexto.translate(-tx, -ty);
            //this.VectorPageObj.drawall(contexto, this.dscalevector, this.dxvector, this.dyvector, refresh,false);
            this.VectorPageObj.drawallnew(Globals.contexto, this.dscalevector, this.dxvector, this.dyvector, refresh,false);
            Globals.contexto.restore();
        }
        //thispage.settextdivs();
    }

    /*this.draw_vector = function (refresh) {
        contexto.fillStyle = "rgb(62,62,62)";
        //contexto.fillStyle = "rgb(160,160,160)";
        contexto.fillRect(0, 0, canvasowidth, canvasoheight);
        var tx = (canvasowidth / 2);
        var ty = (canvasoheight / 2);
        documentopen = true;

        if (thispage.VectorPageObj == undefined) {
            return;
        }
        //context,scalefactor,offsetx,offsety
        //this.dxvector = dx;
        //this.dyvector = dy;
        //this.dscalevector = dscale;


        if (this.drotation == 0) {

            if(refresh || !thispage.VectorPageObj.backgroundrender ){


                thispage.VectorPageObj.drawall(contexto, thispage.dscalevector, thispage.dxvector, thispage.dyvector, refresh);

            }
            if(thispage.VectorPageObj.backgroundrender){
                contexto.drawImage(thispage.VectorPageObj.offscreen, thispage.dxvector, thispage.dyvector, thispage.VectorPageObj.width * thispage.dscalevector, thispage.VectorPageObj.height * thispage.dscalevector);
            }


        } else {
            contexto.save();
            contexto.translate(tx, ty);
            contexto.rotate(thispage.drotation * (Math.PI / 180));
            contexto.translate(-tx, -ty);

            if(refresh || !thispage.VectorPageObj.backgroundrender){

                thispage.VectorPageObj.drawall(contexto, thispage.dscalevector, thispage.dxvector, thispage.dyvector, refresh);
            }
            if(thispage.VectorPageObj.backgroundrender){
                contexto.drawImage(thispage.VectorPageObj.offscreen, thispage.dxvector, thispage.dyvector, thispage.VectorPageObj.width * thispage.dscalevector, thispage.VectorPageObj.height * thispage.dscalevector);
            }




            contexto.restore();

        }
        if(refresh && thispage.VectorPageObj.vectorpagetime > thispage.vectorpagetime){
            thispage.changeinterval(thispage.VectorPageObj.vectorpagetime);

        }


    };*/

    public draw_canvas(clear:any) {
        this.backupScaleAndOffset();
        if (clear) {
            Globals.contexto.fillStyle = Globals.displayBGColor; //contexto.fillStyle = "rgb(238,243,250)";
            Globals.contexto.fillRect(0, 0, Globals.canvasowidth, Globals.canvasoheight);
        }
        //console.log(this.pagenumber);
        let tx = (Globals.canvasowidth / 2);
        let ty = (Globals.canvasoheight / 2);
        let rotation = 0;
        Globals.documentopen = true;
        const bsinglepage = (this.DocRef.pages.length == 1);
        if (this.DocRef.pagelocked || bsinglepage){
            rotation = this.drotation;
        }else{
            rotation = 0;
        }
        if (Globals.bSuspendDraw){
            return;
        }
        if (rotation == 0) {
            if(this.iscollapsed || !this.pdfisfirstrendered){
                if(!this.pdfisfirstrendered && Globals.bAnimatePDFrender){
                    Globals.contexto.drawImage(this.pagedrawCanvas, this.dxpdf, this.dypdf, this.offscreenwidth * this.dscalepdf, this.offscreenheight * this.dscalepdf);
                }else {
                    Globals.contexto.fillStyle = "rgb(255,255,255)"; //contexto.fillStyle = "rgb(238,243,250)";
                    Globals.contexto.fillRect(this.dxpdf, this.dypdf, this.offscreenwidth * this.dscalepdf, this.offscreenheight * this.dscalepdf);
                }
            }else{
                Globals.contexto.drawImage(this.pagecanvas, this.dxpdf, this.dypdf, this.offscreenwidth * this.dscalepdf, this.offscreenheight * this.dscalepdf);
            }
            /*if (thispage.pdfisrendered){
                contexto.drawImage(this.pagecanvas, this.dxpdf, this.dypdf, thispage.offscreenwidth * this.dscalepdf, thispage.offscreenheight * this.dscalepdf);
            }else{
                contexto.fillStyle = "rgb(255,255,255)"; //contexto.fillStyle = "rgb(238,243,250)";
                contexto.fillRect(this.dxpdf, this.dypdf, thispage.offscreenwidth * this.dscalepdf, thispage.offscreenheight * this.dscalepdf);

            }*/

            //contexto.fillStyle = "rgb(255,255,255)"; //contexto.fillStyle = "rgb(238,243,250)";
            //contexto.fillRect(this.dxpdf, this.dypdf, thispage.offscreenwidth * this.dscalepdf, thispage.offscreenheight * this.dscalepdf);
        } else {
            Globals.contexto.save();
            Globals.contexto.translate(tx, ty);
            Globals.contexto.rotate(rotation * (Math.PI / 180));
            Globals.contexto.translate(-tx, -ty);
            if (this.pdfisrendered && !this.iscollapsed){
                Globals.contexto.drawImage(this.pagecanvas, this.dxpdf, this.dypdf, this.offscreenwidth * this.dscalepdf, this.offscreenheight * this.dscalepdf);
            }else{
                Globals.contexto.fillStyle = "rgb(255,255,255)"; // contexto.fillStyle = "rgb(238,243,250)";
                Globals.contexto.fillRect(this.dxpdf, this.dypdf, this.offscreenwidth * this.dscalepdf, this.offscreenheight * this.dscalepdf);
            }
            Globals.contexto.restore();
        }
    }

    public transparent(data:any){
        for (let i = 0; i < data.length; i += 4) {
            if(data[i] == 255 && data[i + 1] == 255 && data[i + 2] == 255){
                data[i + 3] = 100;// - data[i + 2]; // transparent
                //do nothting with white
            }
        }
    }

    public setcolor(data:any, color:any){
        //var c = color; // 16712640
        /*var components = {
            r: (color & 0xff0000) >> 16,
            g: (color & 0x00ff00) >> 8,
            b: (color & 0x0000ff)
        };*/
        let components = convertHexrgb(color);
        for (let i = 0; i < data.length; i += 4) {
            if(data[i] == 255 && data[i + 1] == 255 && data[i + 2] == 255){
                data[i + 3] = 100;// - data[i + 2]; // transparent
                //do nothting with white
            }else{
                data[i]     = components.r; //255 - data[i];     // red
                data[i + 1] = components.g;//255 - data[i + 1]; // green
                data[i + 2] = components.b;// - data[i + 2]; // blue
                //this.overlayColor = '#ff8000';
            }
        }
    }

    public setred(data:any){
        for (let i = 0; i < data.length; i += 4) {
            if(data[i] == 255 && data[i + 1] == 255 && data[i + 2] == 255){
                data[i + 3] = 100;// - data[i + 2]; // transparent
                //do nothting with white
            }else{
                data[i]     =  255; //255 - data[i];     // red
                data[i + 1] = 128;//255 - data[i + 1]; // green
                data[i + 2] = 0;// - data[i + 2]; // blue
                //this.overlayColor = '#ff8000';
            }
        }
    }

    public setblue(data:any){
        for (let i = 0; i < data.length; i += 4) {
            if(data[i] == 255 && data[i + 1] == 255 && data[i + 2] == 255){
                //do nothting with white
                //data[i + 3] = 100;// - data[i + 2]; // transparent
            }else{
                data[i]     =  0; //255 - data[i];     // red
                data[i + 1] = 0;//255 - data[i + 1]; // green
                data[i + 2] = 255;// - data[i + 2]; // blue
            }
        }
    }

    public setinvert(data:any){
        for (let i = 0; i < data.length; i += 4) {
            data[i]     = 255 - data[i];     // red
            data[i + 1] = 255 - data[i + 1]; // green
            data[i + 2] = 255 - data[i + 2]; // blue
        }
    }

    public invertpdfmagnify(background:any){
        //var data = imageData.data;
        let imageData:any = undefined;
        try{
            if (null !== this.magnifypagectx) { // JS->TS:INFO added null check
                imageData = this.magnifypagectx.getImageData(0, 0, this.magnifycanvas.width, this.magnifycanvas.height);
            }
        }catch (e) {
            alert("Error 1 - " + e);
            console.log(e, this.magnifycanvas.width, this.magnifycanvas.height);
            background = -1;
        }
        let cmprcolors = this.compositereference.getColors();
        switch(background){
            case 0 :
                this.setinvert(imageData.data);
                break;
            case 1 :
                //thispage.setblue(imageData.data);
                this.setcolor(imageData.data,cmprcolors.bg);
                break;
            case 2 :
                //thispage.setred(imageData.data);
                this.setcolor(imageData.data,cmprcolors.fg);
                break;
        }
        if(background != -1 && (null !== this.magnifypagectx)){ // JS->TS:INFO added null check
            this.magnifypagectx.putImageData(imageData, 0, 0);
        }
    }

    public invertpdfprint(background:any){
        let imageData:any = undefined;
        switch(background){
            case 1 :
                try{
                    imageData = this.compositePrintreference.bgpagectx.getImageData(0, 0, this.compositePrintreference.bgpagecanvas.width, this.compositePrintreference.bgpagecanvas.height);
                }catch (e) {
                    alert("Error 1 - " + e);
                    console.log(e, this.compositePrintreference.bgpagecanvas.width, this.compositePrintreference.bgpagecanvas.height);
                    background = -1;
                }
                //thispage.compositereference.bgpagecanvas
                break;
            case 2 :
                try{
                    imageData = this.compositePrintreference.ovpagectx.getImageData(0, 0, this.compositePrintreference.ovpagecanvas.width, this.compositePrintreference.ovpagecanvas.height);
                }catch (e) {
                    alert("Error 1 - " + e);
                    console.log(e, this.compositePrintreference.ovpagecanvas.width, this.compositePrintreference.ovpagecanvas.height);
                    background = -1;
                }
                //thispage.compositereference.ovpagecanvas
                break;
        }
        //var data = imageData.data;
        const cmprcolors = this.compositereference.getColors();
        switch(background){
            case 0 :
                this.setinvert(imageData.data);
                break;
            case 1 :
                this.setcolor(imageData.data,cmprcolors.bg);
                //thispage.setblue(imageData.data);
                break;
            case 2 :
                this.setcolor(imageData.data,cmprcolors.fg);
                //thispage.setred(imageData.data);
                break;
        }
        if(background != -1){
            switch(background){
                case 1 :
                    this.compositePrintreference.bgpagectx.putImageData(imageData, 0, 0);
                    break;
                case 2 :
                    this.compositePrintreference.ovpagectx.putImageData(imageData, 0, 0);
                    break;
            }
        }
        if (this.usedincomposite && this.compositereference != undefined) {
            //this.compositereference.draw_compare(false);
            //console.log('draw compare invert pdf' );
        } else {
            //this.draw_image(true);
        }
        //imageData = null;
    }

    public transparentpdf(background:any){
        let imageData:any = undefined;
        switch(background){
            case 1 :
                try{
                    imageData = this.compositereference.bgpagectx.getImageData(0, 0, this.compositereference.bgpagecanvas.width, this.compositereference.bgpagecanvas.height);
                }catch (e) {
                    alert("Error 1 - " + e);
                    console.log(e, this.compositereference.bgpagecanvas.width, this.compositereference.bgpagecanvas.height);
                    background = -1;
                }
                //thispage.compositereference.bgpagecanvas
                break;
            case 2 :
                try{
                    imageData = this.compositereference.ovpagectx.getImageData(0, 0, this.compositereference.ovpagecanvas.width, this.compositereference.ovpagecanvas.height);
                }catch (e) {
                    alert("Error 1 - " + e);
                    console.log(e, this.compositereference.ovpagecanvas.width, this.compositereference.ovpagecanvas.height);
                    background = -1;
                }
                //thispage.compositereference.ovpagecanvas
                break;
        }
        switch(background){
            case 0 :
                this.setinvert(imageData.data);
                break;
            case 1 :
                this.transparent(imageData.data);
                break;
            case 2 :
                this.transparent(imageData.data);
                break;
        }
        if(background != -1){
            switch(background){
                case 1 :
                    this.compositereference.bgpagectx.putImageData(imageData, 0, 0);
                    break;
                case 2 :
                    this.compositereference.ovpagectx.putImageData(imageData, 0, 0);
                    break;
            }
        }
    }

    public invertpdf(background:any){
        let imageData:any = undefined;
        switch(background){
            case 1 :
                try{
                    imageData = this.compositereference.bgpagectx.getImageData(0, 0, this.compositereference.bgpagecanvas.width, this.compositereference.bgpagecanvas.height);
                }catch (e) {
                    alert("Error 1 - " + e);
                    console.log(e, this.compositereference.bgpagecanvas.width, this.compositereference.bgpagecanvas.height);
                    background = -1;
                }
                //thispage.compositereference.bgpagecanvas
                break;
            case 2 :
                try{
                    imageData = this.compositereference.ovpagectx.getImageData(0, 0, this.compositereference.ovpagecanvas.width, this.compositereference.ovpagecanvas.height);
                }catch (e) {
                    alert("Error 1 - " + e);
                    console.log(e, this.compositereference.ovpagecanvas.width, this.compositereference.ovpagecanvas.height);
                    background = -1;
                }
                //thispage.compositereference.ovpagecanvas
                break;
        }
        //var data = imageData.data;
        const cmprcolors = this.compositereference.getColors();
        switch(background){
            case 0 :
                this.setinvert(imageData.data);
                break;
            case 1 :
                this.setcolor(imageData.data,cmprcolors.bg);
                //thispage.setblue(imageData.data);
                break;
            case 2 :
                this.setcolor(imageData.data,cmprcolors.fg);
                //thispage.setred(imageData.data);
                break;
        }
        if(background != -1){
            switch(background){
                case 1 :
                    this.compositereference.bgpagectx.putImageData(imageData, 0, 0);
                    break;
                case 2 :
                    this.compositereference.ovpagectx.putImageData(imageData, 0, 0);
                    break;
            }
        }
        if (this.usedincomposite && this.compositereference != undefined) {
            //this.compositereference.draw_compare(false);
            //console.log('draw compare invert pdf' );
        } else {
            //this.draw_image(true);
        }
        //imageData = null;
    }

    public transparentimage(background:any){
        let imageDatalarge = this.largeimagectx.getImageData(0, 0, this.largeimagecnv.width, this.largeimagecnv.height);
        let imageDatasmall = this.smallimagectx.getImageData(0, 0, this.smallimagecnv.width, this.smallimagecnv.height);
        let data = imageDatasmall.data;
        switch(background){
            case 0 :
                this.setinvert(data);
                break;
            case 1 :
                //thispage.setblue(data);
                this.transparent(data);
                break;
            case 2 :
                //thispage.setred(data);
                this.transparent(data);
                break;
        }
        if (null !== this.smallimagectx) { // JS->TS:INFO added null check
            this.smallimagectx.putImageData(imageDatasmall, 0, 0);
        }
        data = imageDatalarge.data;
        switch(background){
            case 0 :
                this.setinvert(data);
                break;
            case 1 :
                //thispage.setblue(data);
                this.transparent(data);
                break;
            case 2 :
                this.transparent(data);
                //thispage.setred(data);
                break;
        }
        if (null!==this.largeimagectx) {  // JS->TS:INFO added null check
            this.largeimagectx.putImageData(imageDatalarge, 0, 0);
            this.largeimagectx.putImageData(imageDatalarge, 0, 0);
        }
        if (this.usedincomposite && this.compositereference != undefined) {
            //this.compositereference.draw_compare(false);
        } else {
            this.draw_image(true);
        }
    }

    public invert(background:any){
        let imageDatalarge = this.largeimagectx.getImageData(0, 0, this.largeimagecnv.width, this.largeimagecnv.height);
        let imageDatasmall = this.smallimagectx.getImageData(0, 0, this.smallimagecnv.width, this.smallimagecnv.height);
        //var imageData = contexto.getImageData(0, 0, canvasowidth, canvasoheight);
        let data = imageDatasmall.data;
        //thispage.setinvert(data);
        let cmprcolors = this.compositereference.getColors();
        switch(background){
            case 0 :
                this.setinvert(data);
                break;
            case 1 :
                //thispage.setblue(data);
                this.setcolor(data,cmprcolors.bg);
                break;
            case 2 :
                //thispage.setred(data);
                this.setcolor(data,cmprcolors.fg);
                break;
        }
        if (null!==this.smallimagectx){ // JS->TS:INFO added null check
            this.smallimagectx.putImageData(imageDatasmall, 0, 0);
        }
        data = imageDatalarge.data;
        switch(background){
            case 0 :
                this.setinvert(data);
                break;
            case 1 :
                //thispage.setblue(data);
                this.setcolor(data,cmprcolors.bg);
                break;
            case 2 :
                this.setcolor(data,cmprcolors.fg);
                //thispage.setred(data);
                break;
        }
        if (null!==this.largeimagectx) { // JS->TS:INFO added null check
            this.largeimagectx.putImageData(imageDatalarge, 0, 0);
        }
        if (this.usedincomposite && this.compositereference != undefined) {
            //this.compositereference.draw_compare(false);
        } else {
            this.draw_image(true);
        }
        //this.draw_image(true);
    }

    public resetimage(){
        let imagewidth = this.MainImageWidth;
        let imageheight = this.MainImageHeight;
        this.largeimagecnv.width = imagewidth;
        this.largeimagecnv.height = imageheight;
        if (null!==this.largeimagectx) { // JS->TS:INFO added null check
            this.largeimagectx.drawImage(this.largeimage,0,0,imagewidth,imageheight);
        }
        imagewidth = this.SmallImageWidth;
        imageheight = this.SmallImageHeight;
        this.smallimagecnv.width = imagewidth;
        this.smallimagecnv.height = imageheight;
        if (null!==this.smallimagectx) { // JS->TS:INFO added null check
            this.smallimagectx.drawImage(this.smallimage,0,0,imagewidth,imageheight);
        }
    }

    public draw_thumbnail(){
        //thispage.thumbctx = this.thumbcanvas.getContext('2d');
        /*
         draw to thumbnail once with the appropriate method.
         */
        if (null === this.thumbctx) { // JS->TS:INFO added null check
            return;
        }
        this.thumbctx.clearRect(0, 0, this.thumbnailobj.thumbnail.width, this.thumbnailobj.thumbnail.height);
        if(this.thumbloaded){
            this.thumbctx.drawImage(this.thumbnailobj.image, 0, 0);
        }
    }

    public draw_imagePrint(){
        this.printobj.printctx.drawImage(this.largeimage, this.printobj.pdx, this.printobj.pdy, this.printobj.docwidth * this.printobj.pscale, this.printobj.docheight * this.printobj.pscale);
        drawmarkupPrint(this.printobj.printctx,this.pagenumber,this.printobj.pdx,this.printobj.pdy,this.printobj.pscale);
    }

    public draw_image(clear:any) {
        this.backupScaleAndOffset();
        if (clear) {
            Globals.contexto.fillStyle = Globals.displayBGColor;
            Globals.contexto.fillRect(0, 0, Globals.canvasowidth, Globals.canvasoheight);
        }
        let tx = (Globals.canvasowidth / 2);
        let ty = (Globals.canvasoheight / 2);
        Globals.documentopen = true;
        if (Globals.bSuspendDraw){
            return;
        }
        switch (this.currentimage) {
            case 0:
                if (this.drotation == 0) {
                    Globals.contexto.drawImage(this.largeimagecnv, this.dx, this.dy, this.MainImageWidth * this.dscale, this.MainImageHeight * this.dscale);
                } else {
                    Globals.contexto.save();
                    Globals.contexto.translate(tx, ty);
                    Globals.contexto.rotate(this.drotation * (Math.PI / 180));
                    Globals.contexto.translate(-tx, -ty);
                    Globals.contexto.drawImage(this.largeimagecnv, this.dx, this.dy, this.MainImageWidth * this.dscale, this.MainImageHeight * this.dscale);
                    Globals.contexto.restore();
                }
                break;
            case 1:
                const drawscale = this.dscale / this.bitmapratio;
                if (this.drotation == 0) {
                    Globals.contexto.drawImage(this.smallimagecnv, this.dx, this.dy, this.SmallImageWidth * drawscale, this.SmallImageHeight * drawscale);
                } else {
                    Globals.contexto.save();
                    Globals.contexto.translate(tx, ty);
                    Globals.contexto.rotate(this.drotation * (Math.PI / 180));
                    Globals.contexto.translate(-tx, -ty);
                    Globals.contexto.drawImage(this.smallimagecnv, this.dx, this.dy, this.SmallImageWidth * drawscale, this.SmallImageHeight * drawscale);
                    Globals.contexto.restore();
                }
                break;
        }
    }
}