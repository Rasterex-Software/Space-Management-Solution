import * as THREE from 'three';

// TODO:JS->TS:ADJUST recheck, reorganize and refactor this section once the initial split has been completed.
// TODO:JS->TS:ADJUST Some of the properties are repeated here and in the initialization section from the rxcorefuntions.ref.js
const GlobalsTemp = {
    xmlurl : '',
    xmlurldirect : '',
    xmlurlmarkup : '',
    // opensessionurl : '', // JS->TS:INFO not used
    // openMsessionurl : '', // JS->TS:INFO not used
    openUsessionurl : '',
    closesessionurl :'',
    xmlurlmarkupsave :'',
    FileuploadURL : '',
    PDFExportURL : '',
    CanvasSaveUrl : '',
    UploadServerfolder : '',
    UploadServerfolderd : '',
    xmlurlrel : '',
    xmlurlrelmarkup : '',
    // uploadfolderURL : '', // JS->TS:INFO not used
    htmlviewerurl : '',
    splashscreen : '',
    noteImgSrc : '',
    bGetconfig : '',
    bUseID : false,
    configurationLocation : '',
    userInfoURL: '',
    bUseCustomrelpath: false,
    bUsecustomConfig: false,
    xmlurlrelcustom: '',
    initialized: false,
    rxcoreversion: 20.5,
    rxcontainer: undefined as any,
    canvas: undefined as any,
    context: undefined as any,
    canvaso: undefined as any,
    contexto: undefined as any,
    canvimg: undefined as any,
    cntximg: undefined as any,
    canvas3D: undefined as any,
    magcanvas: undefined as any,
    magctx: undefined as any,
    // scene: undefined, // JS->TS:INFO not used
    // camera: undefined, // JS->TS:INFO not used
    renderer: undefined as any,
    globalPlaneX: new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 0 ),
    globalPlaneY: new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), 0 ),
    globalPlaneZ: new THREE.Plane( new THREE.Vector3( 0, 0, -1 ), 0 ),
    // globalPlanes: [] as any[], // JS->TS:INFO not used
    Empty: Object.freeze( [] ),
    // JS->TS:INFO the following 3 vars are not used
    // geometry, material, mesh;
    defaultLayout: {
        offsetWidth:0,
        offsetHeight:0
    },
    magnifysize: {
        width : 225,
        height : 150
    },
    fixedScaleSize: {
        width : 1920,
        height : 1080
    },
    // RxCore_GUI_...
    // TODO:JS->TS:CHECK add RxCore_GUI... globals

    canvasowidth: 0,
    canvasoheight: 0,
    dragdropfilename: '',
    bIsMSIE: false,
    szdispvalue: 'initial',
    szLicenCompanyFeature: '',
    imagewidth: 0,
    imageheight: 0,
    drotation: 0,
    imageswitchfactor: 1.5,
    imageloaded: false,
    documentopen: false,
    documentcompare: false,
    doCompare: false,
    compareMode: 0,
    // markuploaded: false, // JS->TS:INFO commented out in the original file
    // bMarkupchanged: false, // JS->TS:INFO commented out in the original file
    bLicenseAquired: false,
    bUseCompanyFeature: false,
    bPDFExportfullPath: false,
    bMarkupSavecheck: true,
    bUseFixedScale: true,
    // bUsemouseinput: true, // JS->TS:INFO commented out in the original file
    bPrintpageloaded: false,
    bAbortPageload: false,
    bLimMarkupExtent: true,
    bKeepVectorColor: false,

    bMarkupPostOnly: false,
    bSingleDocmode: false,
    bDoReScaleOnSize: true,
    bPDFZoomAllinit: false,
    bSuspendDraw: false,
    bRestrictPan: true,
    bLimitZoomOut: true,
    bAnimatePDFrender: false,
    bDisableMSIE11Eventcheck: false,
    bAutoloadThumbnails: true,
    bLabelsOff: false,
    printWin: {} as any,
    // PDFExpWin: 0, // JS->TS:INFO not used
    DocXMLPrint: {} as any,
    PaperWidth: 0,
    PaperHeight: 0,
    Paper: {} as any, // JS->TS:INFO not read, only set
    // PDFExportFileURL: '', // JS->TS:INFO not used
    PrintPageURL: 'printcanvas.htm',
    LicenseID: '',
    OEMFlag: '',
    backgroundColor: '#FFFFFF',
    backgroundCustomColor: '#FF0000',
    bCustomColor: false,
    bMultiselect: false,
    displayBGColor: 'rgb(62,62,62)',
    nScrollKeyNum: '17',
    nMaximageArea: 64000000,
    nMaximageAreaIPad: 5000000,
    nLargePDF: 50,
    bIsmobile: false,
    overlayBGColor: '#0000ff',
    overlayFGColor: '#ff8000',
    bOpeninitialdoc: false,
    OpeninitialdocURL: '',
    initialDoc: {
        open : false,
        url : '',
        custom : false
    },

    bMarkupcrated: false,
    bNoteFocus: false,
    bUseScrollKey: false,
    bOrthoOn: false,
    nOrthoDegree: 90,
    nMarkupcreated: -1,
    bMultimarkupadd: false,
    bAnimateready: false,
    bPDFtemprender: false,
    // bPDFtemprendermag: false, // JS->TS:INFO not used

    // lastTouchdata: -1, // JS->TS:INFO not used
    // Canvasheight: 0, // JS->TS:INFO not used
    // Canvaswidth: 0, // JS->TS:INFO not used

    // 1 = metric, 2 = Imperial, 3 = System, 4=Custom
    Unitofmeasure: 1,
    Unitlabel: 'mm',
    AreaUnitlabel: 'mm\u00B2',
    MeasureScale: 1.0,
    nCalibrateScale: 1.0,
    nCalibrateMeasured: 0.0,
    nCalibrateSet: 0.0,
    nArrowSize: 20,
    nPanlimit: 15,
    nLabelTextsize: 12,
    bUsemarkupbyref: false,
    bUsemarkupbyrefEx: false,
    // mm = 1 meter = 1000 for metric units.
    unitscale: 1,
    // 1 = Millimeter, 2 = Centimeter, 3 = Decimeter, 4=Meter,5=Kilometer,6=Nautical Miles
    // 1 = Inch,2=Feet,3=Yard,4=Mile,5=Nautical Miles
    SubmeasureUnit: 1,

    // 0 = large 1=small
    imagesize: 0,
    // array to hold markup objects
    byrefmarkupfiles: [] as any[],

    // markuplist = []; // JS->TS:INFO commented out in the original file
    // markupundolist = []; // JS->TS:INFO commented out in the original file
    markupprintlist: [] as any[],
    // markupfiles = []; // JS->TS:INFO commented out in the original file
    Userlist: [] as any[],
    Stamplist: [] as any[],
    // rotatepagearrs: [], // JS->TS:INFO not used
    numUsers: 0,
    Layerlist: [] as any[],
    // numLayers: 0, // JS->TS:INFO not used
    configJSON: {},
    // nummarkups = 0; // JS->TS:INFO commented out in the original file
    // curcontrol3D = 'orbitControl'; // JS->TS:INFO commented out in the original file
    // SzNoteText = ""; // JS->TS:INFO commented out in the original file

    //global configuration variables
    markuplayer: 1,
    markupcolor: '#FF0000',
    markupfillcolor: '#FF0000',
    markuplinecolor: '#FF0000',
    markuptextcolor: '#FF0000',

    globaltransparency: 100,
    signature: 'Default',
    DisplayName: 'Default',
    fontstylevalue: 'Arial',

    linewidthvalue: 4,
    //Linestylevalue: '_______', // JS->TS:INFO commented out in the original file
    HatchStyle: 0,
    fillstyle: 0,
    nlinestyle: 0,

    bCanChangeLayer: true,
    bCanChangeSignature: false,
    bCanConsolidate: false,
    bSetGlobal: false,
    readonlymode: false,

    //bGetconfig: true, // JS->TS:INFO commented out in the original file
    bRefreshmarkup: false,
    bReverseScale: false,
    //bMarkupLocked: false, // JS->TS:INFO commented out in the original file
    bMarkupNoLabel: false,
    // bConsolidate: false, // JS->TS:INFO not used


    locationSearchSet: false,
    szLocationSearch: '',
    //this.szBlockLoadMask: '*',
    //global configuration variables

    consolidateObj: {} as any,
    noteimage: new Image(),
    markupimage: new Image(),
    pattern: {} as any,
    splashimage: {} as any,
    nCurdocindex: 0,
    tool: {} as any,
    tools: {} as any,
    DocObj: {} as any,
    CompareObj: {} as any,
    OpenFiles: [] as any[],
    CompareFiles: [] as any[],
    OpenfileNames: [] as any[],
    defaultFont: {} as any
}

// GlobalsTemp.globalPlanes = [ GlobalsTemp.globalPlaneX, GlobalsTemp.globalPlaneY, GlobalsTemp.globalPlaneZ ]; // JS->TS:INFO not used

GlobalsTemp.initialDoc = {
    open : GlobalsTemp.bOpeninitialdoc,
    url : GlobalsTemp.OpeninitialdocURL,
    custom : false
}

export const Globals = GlobalsTemp;


