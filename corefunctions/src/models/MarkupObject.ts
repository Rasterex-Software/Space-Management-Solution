// TODO:JS->TS:INFO continue conversion

import {
    Globals,
    Rectangle,
    FontObject,
    convertHex,
    undoremovemarkup,
    drawmarkupAll,
    DrawMarkupSelected,
    RxCore_GUI_Markuplist,
    Rxcore_GUI_markupLoadComplete,
    RxCore_GUI_pagethumbs,
    RxCore_GUI_markupdrawParams,
    GetDisplayName,
    point,
    checkUniqueID,
    getGUID,
    setTransp,
    getRotPoint,
    getPageRotCorner,
    MarkupSaveState,
    getlastmarkupnumber,
    distToSegment,
    getUnitlength,
    wordWrap,
    isEven,
    getScreenDim,
    wrapText,
    getHatch,
    getUnitArea,
    get_polygon_centroid,
    insidepolygon,
    MarkupUndoObject
} from '../internal';

export class MarkupObject {
    markupnumber: number;
    type: any;
    subtype: any;
    alternative: any;
    hatchStyle: any; // number;
    hatchprt: any; // number;
    saved: boolean;
    firstpointrotAdjusted: boolean;
    markupID: any; // number;
    uniqueID: number;
    locked: boolean;
    timestamp: number;
    layer: any;
    signature: any;
    color: any;
    transparency: number;
    consolidated: boolean;
    linkURL: string;
    imagehref: string;
    bhaveLink: boolean;
    bCanHaveLink: boolean;
    anglelengthsupport: boolean;
    setRadiusSupport: boolean;
    fillcolor: any;
    strokecolor: any;
    textcolor: any;
    markercolor: any;
    orthoDrawAngle: number;
    orthoDrawAngledeg: number;
    pagenumber: number;
    pagerotation: number;
    documentName: any;
    layout: string;
    display: boolean;
    relativeWH: boolean;
    drawn: boolean;
    imageloaded: boolean;
    x: any; // number;
    y: any; // number;
    w: any; // number;
    h: any; // number;
    radius: number;
    xscaled: number;
    yscaled: number;
    wscaled: number;
    hscaled: number;
    radiusScaled: number;
    leaderoffset: number;
    labelpos: any; // { x: any; y: any; w: any; h: any; };
    rotatedrect: any;
    LowerRightRect: any;
    LowerLeftRect: any;
    UpperLeftRect: any;
    UpperRightRect: any;
    RotmarkerRect: any;
    LowerRightRectRot: any;
    LowerLeftRectRot: any;
    UpperLeftRectRot: any;
    UpperRightRectRot: any;
    RotmarkerRectRot: any;
    fixedscaleFactor: number;
    scaling: number;
    xoffset: number;
    yoffset: number;
    scalingext: number;
    xoffsetext: number;
    yoffsetext: number;
    rotation: number;
    textrotate: number;
    bUsemouseinput: boolean;
    docdx: any;
    docdy: any;
    docdscale: any;
    dimtext: any; // string;
    linewidth: any;
    linestyle: any;
    selected: boolean;
    lastselected: boolean;
    selectedit: boolean;
    firstpointset: boolean;
    editaction: number;
    scalecorner: number;
    selectedpoint: number;
    textheight: number;
    textwidth: number;
    stampsmalltwidth: number;
    stampsmalltheight: number;
    measuretextheight: number;
    carpos: number;
    text: string;
    smalltext: string;
    cursorblink: boolean;
    fontname: string;
    font: any;
    arrowlength: any;
    pointlist: any; // any[];
    points: any; // any[];
    sides: any; // any[];
    numpoints: number;
    customattributes: any; // any[];
    PerformUndo: any; // (UndoObj: any) => void;
    setLink: any; // (szURL: any, bhavelink: any) => void;
    getLink: any; // () => { bCanHaveLink: any; link: any; bhavelink: any; };
    getUniqueID: any; // () => any;
    setUniqueID: any; // (id: any) => void;
    setRxUniqueID: any; // () => void;
    onRotate: any; // () => void;
    SetFromStorage: any; // () => void;
    calculateDrawAngle: any; // (rect: any) => void;
    calculateOrtho: any; // (bscale: any, corner: any, point: any) => void;
    ClearAttributes: any; // () => void;
    ConsolidateList: any; // (settings: any, last: any) => void;
    Consolidate: any; // (settings: any) => void;
    AddAttribute: any; // (szName: any, szValue: any) => void;
    GetAttributes: any; // () => any;
    deleteAttribute: any; // (szName: any) => void;
    updateAttribute: any; // (newszName: any, newszValue: any) => void;
    restorestampfontSize: any; // () => void;
    SetfromXML: any; // (xmlDoc: any, fileVersion: any) => boolean;
    removepoints: any; // ()=> any
    addpoint: any; // (x: number, y: number)=>any
    findrectangle: any; // ()=> any
    markupcdataload: any; // (createimage: HTMLImageElement, cdata: any)=> any
    markupimageload: any; // (imageurl: any, createimage: HTMLImageElement)=> any
    image: any;
    GetLinestyle: any; // (linestyle: any, ctx: any, scale: any) => void;
    GetDateTime: any; // (time: any) => string;
    getdiag: any; // (width: any, height: any) => number;
    onPanScale: any; // () => void;
    setDimDrawme: any; // () => { x: any; y: any; w: any; h: any; };
    getlastpoint: any; // () => any
    SetDimensions: any; // (scalefactor: any, rotation: any, pagedx: any, pagedy: any) => void;
    setRotatedMarkuprect: any; // (centercanvX: number, centercanvY: number, abswidthandheight: boolean, anglerad: number)=> any
    getRotatedMarkup: any; // (x: any, y: any, w: any, h: any, rotatefactor: number)=> any
    PolygonArea: any; // () => number;
    PolygonCentre: any; // (xy: any) => number;
    FindText: any; // (SearchExpr: any) => boolean;
    RotateText: any; // () => void;
    AdjustForRotation: any; // (save: any) => void;
    setinitRotatedMarkupPoint: any; // (centercanvX: number, centercanvY: number, x: any, y: any, CanvRotRad: number)=> any
    notify: any; // () => void;
    addsides: any; // () => void;
    savemetolistLoad: any; // (last: any) => void;
    savemetolist: any; // (arg0: boolean, arg1: boolean, last: any) => any
    savemetolistDraw: any; // () => void;
    rotate: any; // (x: any, y: any, corner: any) => void;
    getMarkupSelectPointRot: any; // (arg0: number, arg1: number, textrotate: any)=> any
    withinbounds: any; // (x: any, y: any) => boolean;
    move: any; // (x: any, y: any) => void;
    dimextend: any; // (x: any, y: any) => void;
    scale: any; // (x: any, y: any, corner: any, ctx: any) => void;
    addline: any; // () => void;
    snapTo: any; // (x: any, y: any, point: any) => void;
    editpoint: any; // (x: any, y: any, point: any) => void;
    movepoint: any; // (x: any, y: any, point: any) => void;
    setlastpoint: any; // (x: any, y: any) => void;
    startdraw: any; // (ctx: any) => void;
    displayurl: any; // (ctx: any, x: any, y: any) => void;
    displaylabel: any; // (ctx: any, x: any, y: any) => void;
    Rect: any; // (ctx: any, x: any, y: any, width: any, height: any, linewidth: any, fill: any, stroke: any, fillcolor: any, strokecolor: any) => void;
    Circle: any; // (ctx: any, x: any, y: any, w: any, h: any, linewidth: any, fill: any, stroke: any, fillcolor: any, strokecolor: any) => void;
    Oval: any; // (ctx: any, x: any, y: any, width: any, height: any, linewidth: any, fill: any, stroke: any, fillcolor: any, strokecolor: any) => void;
    polygon: any; // (ctx: any, linewidth: any, fill: any, stroke: any, fillcolor: any, strokecolor: any, scalefactor: any, dx: any, dy: any, useoffset: any) => void;
    polyline: any; // (ctx: any, linewidth: any, strokecolor: any, scalefactor: any, dx: any, dy: any, useoffset: any) => void;
    polycurves: any; // (ctx: any, linewidth: any, strokecolor: any, scalefactor: any) => void;
    dimensionLeader: any; // (ctx: any, x: any, y: any, width: any, height: any, offset: any, arrowl: any, arrowa: any, linewidth: any, type: any, fillcolor: any, strokecolor: any) => { x: any; y: any; w: any; h: any; };
    arrow: any; // (ctx: any, x: any, y: any, width: any, height: any, arrowl: any, arrowa: any, linewidth: any, type: any, fillcolor: any, strokecolor: any) => void;
    setdimvaluepoly: any; // () => void;
    setdimvalue: any; // (x: any, y: any, width: any, height: any) => void;
    dimvaluedraw: any; // (ctx: any, x: any, y: any, width: any, height: any, color: any, scalefactor: any, brotate: any) => void;
    roundedRect: any; // (ctx: any, x: any, y: any, width: any, height: any, rotation: any, radius: any, linewidth: any, fill: any, stroke: any, fillcolor: any, strokecolor: any) => void;
    newcloud: any; // (ctx: any, x: any, y: any, width: any, height: any, radius: any, linewidth: any, fill: any, stroke: any, fillcolor: any, strokecolor: any) => void;
    cloud: any; // (ctx: any, x: any, y: any, width: any, height: any, radius: any, linewidth: any, fill: any, stroke: any, fillcolor: any, strokecolor: any) => void;
    editpolygon: any; // (ctx: any, scalefactor: any) => void;
    selectLabel: any; // (ctx: any, x: any, y: any, width: any, height: any, full: any, rotate: any) => void;
    select: any; // (ctx: any, x: any, y: any, width: any, height: any, full: any, rotate: any) => void;
    setAnglelength: any; // (length: any, angle: any, type: any) => { w: any; h: any; };
    anglelength: any; // (startx: any, starty: any, endx: any, endy: any, useabs: any) => { length: number; angle: number; };
    drawme: any; // (ctx: any) => void;
    drawmescaled: any; // (ctx: any) => any
    drawthumb: any; // (ctx: any) => void;
    drawprint: any; // (ctx: any, dxthumb: any, dythumb: any, dscalethumb: any, arg4: number, arg5: boolean)=> any
    getTopLeftRot: any; // (width: any, height: any, anglerad: any) => any;
    getBottomRightRot: any; // (width: any, height: any, anglerad: any) => any;
    getRotSelectRot: any; // (width: any, height: any, anglerad: any) => any;
    GetwithinCorner: any; // (x: any, y: any) => { within: boolean; scalecorner: number; editaction: number; };
    Getwithin: any; // (x: any, y: any, x1: any, x2: any, y1: any, y2: any) => any
    normalizeRect: any; // (rect: any) => { x: any; y: any; w: any; h: any; };
    GetwithinRect: any; // (x: any, y: any, rect: any) => boolean;
    iswithin: any; // (x: any, y: any) => boolean;
    snapToCorner: any; // (x: any, y: any, corner: any) => void;
    getsnappoint: any; // (x: any, y: any) => void;
    drawradius: any; // (ctx: any, x: any, y: any, w: any, h: any, crossl: any, linewidth: any, strokecolor: any, bdiameter: any) => void;
    radiusDimLeader: any; // (ctx: any, x: any, y: any, w: any, h: any, linewidth: any, strokecolor: any) => void;
    barhead: any; // (ctx: any, x: any, y: any, width: any, height: any, lineEnds: any, arrowl: any, linewidth: any, strokecolor: any) => void;
    arrowhead: any; // (ctx: any, x: any, y: any, width: any, height: any, lineEnds: any, arrowa: any, arrowl: any, linewidth: any, strokecolor: any, bopen: any) => void;
    setAnglelengthPoints: any; // (length: any, angle: any) => any;
    setAngleLenghtEdit: any; // (length: any, angle: any, type: any) => any;
    setAngleLengthinternalPoints: any; // (length: any, angle: any, brotate: any) => { w: any; h: any; };
    setAngleLengthinternal: any; // (length: any, angle: any, type: any, brotate: any) => { w: any; h: any; };
    lengthangleCallbackSelect: any; // () => void;
    lengthangleCallbackPoints: any; // (drotation: any) => void;
    lengthangleCallback: any; // (x: any, y: any, w: any, h: any, drotation: any) => void;
    radiusCallback: any; // (x: any, y: any, w: any, h: any, useabs: any) => void;
    constructor(type:any, subtype:any, alternative:any) {
        var markupobject = this;
        this.markupnumber = 0;
        this.type = type;
        this.subtype = subtype;
        this.alternative = alternative;
        if (alternative >= 3) {
            this.hatchStyle = alternative - 3;
        }
        else {
            this.hatchprt = 0;
        }
        this.saved = false;
        this.firstpointrotAdjusted = false;
        this.markupID = 0;
        this.uniqueID = 0;
        this.locked = false;
        this.timestamp = new Date().getTime();
        this.layer = Globals.markuplayer;
        this.signature = Globals.signature;
        this.color = Globals.markupcolor;
        this.transparency = 100;
        this.consolidated = false;
        this.linkURL = "";
        this.imagehref = "";
        this.bhaveLink = false;
        this.bCanHaveLink = ((markupobject.type == 1 && markupobject.subtype == 2) || markupobject.type == 3 || markupobject.type == 4 || markupobject.type == 5 || markupobject.type == 9 || markupobject.type == 11);
        this.anglelengthsupport = (markupobject.type == 6 );
        this.setRadiusSupport = (markupobject.type == 4 && markupobject.subtype == 1);
        this.fillcolor = convertHex(Globals.markupfillcolor, this.transparency);
        this.strokecolor = convertHex(Globals.markuplinecolor, 100);
        this.textcolor = convertHex(Globals.markuptextcolor, this.transparency);
        this.markercolor = convertHex(Globals.markupfillcolor, 30);
        this.orthoDrawAngle = 0;
        this.orthoDrawAngledeg = 0;
        this.pagenumber = 0;
        this.pagerotation = 0;
        this.documentName = Globals.DocObj.OriginalURL;
        this.layout = "Default";
        this.display = true;
        this.relativeWH = false;
        this.drawn = false;
        this.imageloaded = false;
        //General placement and scaling properties
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.radius = 0; //only used for circles
        this.xscaled = 0;
        this.yscaled = 0;
        this.wscaled = 0;
        this.hscaled = 0;
        this.radiusScaled = 0; //only used for circles
        //for new dimension with leader offset.
        this.leaderoffset = 0;
        this.labelpos = { x: this.x, y: this.y, w: this.w, h: this.h };
        this.rotatedrect = new Rectangle(this.xscaled, this.yscaled, this.wscaled, this.hscaled);
        //Selection point areas for mouse manipulation
        this.LowerRightRect = new Rectangle(this.xscaled, this.yscaled, this.wscaled, this.hscaled);
        this.LowerLeftRect = new Rectangle(this.xscaled, this.yscaled, this.wscaled, this.hscaled);
        this.UpperLeftRect = new Rectangle(this.xscaled, this.yscaled, this.wscaled, this.hscaled);
        this.UpperRightRect = new Rectangle(this.xscaled, this.yscaled, this.wscaled, this.hscaled);
        this.RotmarkerRect = new Rectangle(this.xscaled, this.yscaled, this.wscaled, this.hscaled);
        this.LowerRightRectRot = new Rectangle(this.xscaled, this.yscaled, this.wscaled, this.hscaled);
        this.LowerLeftRectRot = new Rectangle(this.xscaled, this.yscaled, this.wscaled, this.hscaled);
        this.UpperLeftRectRot = new Rectangle(this.xscaled, this.yscaled, this.wscaled, this.hscaled);
        this.UpperRightRectRot = new Rectangle(this.xscaled, this.yscaled, this.wscaled, this.hscaled);
        this.RotmarkerRectRot = new Rectangle(this.xscaled, this.yscaled, this.wscaled, this.hscaled);
        //this.center = new point((this.w-this.x)/2,(this.h - this.y)/2);
        this.fixedscaleFactor = 1.0;
        this.scaling = 0.0;
        this.xoffset = 0.0;
        this.yoffset = 0.0;
        this.scalingext = 0.0;
        this.xoffsetext = 0.0;
        this.yoffsetext = 0.0;
        this.rotation = 0;
        this.textrotate = 0;
        this.bUsemouseinput = true; //if angle and length set by numric input check this in adjustforroation
        this.docdx = Globals.DocObj.pages[Globals.DocObj.currentpage].getdx();
        this.docdy = Globals.DocObj.pages[Globals.DocObj.currentpage].getdy();
        this.docdscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getdscale();
        //measurement properties
        this.dimtext = ".";
        this.linewidth = Globals.linewidthvalue;
        //this.hatchStyle = HatchStyle;
        this.linestyle = Globals.nlinestyle;
        //this.linestyle = Linestylevalue.value;
        //General placement and scaling properties
        this.selected = false;
        this.lastselected = false;
        this.selectedit = false;
        this.firstpointset = false;
        //0 = no action, 1 = move, 2 = scale, 3=rotate, 4=move point,5=edit text, 6=dimension label
        this.editaction = 0;
        //0 = no corner, 1 = upper left, 2 = upper right, 3 = lower left, 4 = lover right,5=rotate marker
        this.scalecorner = 0;
        this.selectedpoint = -1;
        //text specific properties.
        this.textheight = 24;
        this.textwidth = 0;
        this.stampsmalltwidth = 0;
        this.stampsmalltheight = 0;
        this.measuretextheight = 12;
        this.carpos = 0;
        this.text = ".";
        this.smalltext = ".";
        this.cursorblink = true;
        this.fontname = "Helvetica";
        var bmpath = (type == 1 && subtype == 3);
        //this.font = new FontObject("Helvetica", 24, false, false);
        this.font = new FontObject("Helvetica", (type == 7 || type == 8 || bmpath) ? Globals.nLabelTextsize : 24, false, false);
        this.arrowlength = Globals.nArrowSize + this.linewidth;
        //text specific properties.
        //properties for objects with multiple points, pencil polygon etc.
        this.pointlist = [];
        this.points = [];
        this.sides = [];
        this.numpoints = -1;
        this.customattributes = [];
        //properties for objects with multiple points, pencil polygon etc.
        //General variables
        var markersize = 20;
        var labelsize = { w: 0, h: 0 };
        var markercolor = "rgba(255, 255, 0, 0.3)";
        var stampcolor = "rgba(255, 0, 0, 0.3)";
        var markerlinewidth = 15;
        var arrowangle = 22.5;
        var arrowlength = Globals.nArrowSize + this.linewidth;
        var arrowanglerad = arrowangle / (180 / Math.PI);
        //General variables
        //text specific variables
        var blinker;
        //text specific variables
        //variables for ovals and curves
        var kappa = .5522848;
        //variables for ovals and curves
        //square root scaling factors for area calculation
        //var dscalesqroot = Math.sqrt(DocObj.pages[this.pagenumber].dscale);
        //var mscaleroot = Math.sqrt(DocObj.pages[this.pagenumber].MainImageScaling);
        //square root scaling factors for area calculation
        this.PerformUndo = function (UndoObj:any) {
            var curpoint = 0;
            var tempx = 0;
            var tempy = 0;
            this.type = UndoObj.type;
            this.subtype = UndoObj.subtype;
            this.alternative = UndoObj.alternative;
            this.consolidated = UndoObj.consolidated;
            this.x = UndoObj.x;
            this.y = UndoObj.y;
            this.w = UndoObj.w;
            this.h = UndoObj.h;
            this.xscaled = UndoObj.xscaled;
            this.yscaled = UndoObj.yscaled;
            this.wscaled = UndoObj.wscaled;
            this.hscaled = UndoObj.hscaled;
            this.timestamp = UndoObj.timestamp;
            this.layer = UndoObj.layer;
            this.signature = UndoObj.signature;
            this.color = UndoObj.color;
            this.fillcolor = UndoObj.fillcolor;
            this.strokecolor = UndoObj.strokecolor;
            this.textcolor = UndoObj.textcolor;
            this.scaling = UndoObj.scaling;
            this.xoffset = UndoObj.xoffset;
            this.yoffset = UndoObj.yoffset;
            this.docdx = UndoObj.docdx;
            this.docdy = UndoObj.docdy;
            this.docdscale = UndoObj.docdscale;
            this.scalingext = UndoObj.scalingext;
            this.xoffsetext = UndoObj.xoffsetext;
            this.yoffsetext = UndoObj.yoffsetext;
            this.rotation = UndoObj.rotation;
            this.textrotate = UndoObj.textrotate;
            this.dimtext = UndoObj.dimtext;
            this.linewidth = UndoObj.linewidth;
            this.textheight = UndoObj.textheight;
            this.measuretextheight = UndoObj.measuretextheight;
            this.textwidth = UndoObj.textwidth;
            this.text = UndoObj.text;
            //this.fontname = UndoObj.fontname;
            this.font = UndoObj.font;
            this.points = UndoObj.points.slice();
            this.numpoints = UndoObj.points.length - 1;
            for (var i = 0; i < UndoObj.pointlist.length; i++) {
                this.pointlist[i] = UndoObj.pointlist[i].slice();
            }
            if (UndoObj.delete) {
                undoremovemarkup(UndoObj.markupnumber);
                //UndoObj
                //remove from docobj markuplist
            }
        };
        this.setLink = function (szURL:any, bhavelink:any) {
            if (szURL != "") {
                markupobject.linkURL = szURL;
                markupobject.bhaveLink = bhavelink;
            }
        };
        this.getLink = function () {
            return {
                bCanHaveLink: markupobject.bCanHaveLink,
                link: markupobject.linkURL,
                bhavelink: markupobject.bhaveLink
            };
        };
        this.getUniqueID = function () {
            return markupobject.uniqueID;
        };
        this.setUniqueID = function (id:any) {
            if (markupobject.uniqueID == 0) {
                if (checkUniqueID(id)) {
                    markupobject.uniqueID = id;
                }
            }
        };
        this.setRxUniqueID = function () {
            //call new server method to get GUID.
            getGUID(markupobject);
        };
        this.onRotate = function () {
        };
        this.SetFromStorage = function () {
        };
        this.calculateDrawAngle = function (rect: any) {
            var angleRadians = Math.atan2(rect.h - rect.y, rect.w - rect.x);
            //normalize to remove negative values
            if (angleRadians < 0)
                angleRadians += 2 * Math.PI;
            markupobject.orthoDrawAngle = angleRadians;
            markupobject.orthoDrawAngledeg = markupobject.orthoDrawAngle * (180 / Math.PI);
            //markupobject.orthoDrawAngle = angleRadians * (180 / Math.PI);
            //calculateOrtho
        };
        this.calculateOrtho = function (bscale: any, corner: any, point: any) {
            //angle = atan2(vector2.y, vector2.x) - atan2(vector1.y, vector1.x);
            //var angle = Math.atan2(this.h, this.w) - Math.atan2(this.y, this.x);
            let angleRadians = Math.atan2(this.h - this.y, this.w - this.x);
            let pageangle  = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);
            //angleRadians += pageangle;
            /*if(bscale){
                switch(corner){
                    case 1 :
                        angleRadians = Math.atan2(point.y - this.y, point.x- this.x);
                        break;
                    case 4 :
                        angleRadians = Math.atan2(this.h - point.y, this.w- point.x);
                        break;
                }
            }*/
            if (angleRadians < 0)
                angleRadians += 2 * Math.PI;
            let degrees = angleRadians * (180 / Math.PI);
            switch (Globals.nOrthoDegree) {
                case 90:
                    if (degrees > 315) {
                        //0
                        if (bscale && corner == 1) {
                            this.y = this.h;
                        }
                        else {
                            this.h = this.y;
                        }
                    }
                    else if (degrees < 315 && degrees > 270) {
                        //270
                        if (bscale && corner == 1) {
                            this.x = this.w;
                        }
                        else {
                            this.w = this.x;
                        }
                    }
                    else if (degrees > 225 && degrees < 270) {
                        //270
                        if (bscale && corner == 1) {
                            this.x = this.w;
                        }
                        else {
                            this.w = this.x;
                        }
                    }
                    else if (degrees < 225 && degrees > 180) {
                        //180
                        if (bscale && corner == 1) {
                            this.y = this.h;
                        }
                        else {
                            this.h = this.y;
                        }
                    }
                    else if (degrees > 135 && degrees < 180) {
                        //180
                        if (bscale && corner == 1) {
                            this.y = this.h;
                        }
                        else {
                            this.h = this.y;
                        }
                    }
                    else if (degrees < 135 && degrees > 90) {
                        //90
                        if (bscale && corner == 1) {
                            this.x = this.w;
                        }
                        else {
                            this.w = this.x;
                        }
                    }
                    else if (degrees > 45 && degrees < 90) {
                        //90
                        if (bscale && corner == 1) {
                            this.x = this.w;
                        }
                        else {
                            this.w = this.x;
                        }
                    }
                    else if (degrees < 45) {
                        //0
                        if (bscale && corner == 1) {
                            this.y = this.h;
                        }
                        else {
                            this.h = this.y;
                        }
                    }
                    break;
                case 45:
                    break;
                case 15:
                    break;
            }
            //console.log(degrees);
        };
        this.ClearAttributes = function () {
            this.customattributes = [];
        };
        this.ConsolidateList = function (settings: any, last: any) {
            Globals.consolidateObj.add(markupobject, settings, last);
        };
        this.Consolidate = function (settings: any) {
            //layer : markuplayer,
            //fillcolor : markupfillcolor,
            //linecolor : markuplinecolor,
            //textcolor : markuptextcolor,
            //changeStrokeColor : false,
            //changeTexColort : false,
            //changeLayer : true,
            //bperformed : false,
            //isactive : false,
            //signature : signature,
            //todo create undo save point.
            MarkupSaveState(markupobject.markupnumber);
            Globals.DocObj.bMarkupchanged = true;
            markupobject.consolidated = true;
            markupobject.signature = Globals.signature;
            if (settings.changeStrokeColor) {
                markupobject.strokecolor = settings.strokecolor;
            }
            if (settings.changeTexColort) {
                markupobject.textcolor = settings.textcolor;
            }
            if (settings.changeLayer) {
                markupobject.layer = settings.layer;
                //todo change fill color if layer is changed.
            }
            drawmarkupAll(Globals.cntximg);
            DrawMarkupSelected(Globals.context);
            if (RxCore_GUI_Markuplist != undefined) {
                RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist);
            }
        };
        this.AddAttribute = function (szName: any, szValue: any) {
            var extendobj = {
                name: szName,
                value: szValue
            };
            markupobject.customattributes.push(extendobj);
        };
        this.GetAttributes = function () {
            return markupobject.customattributes;
        };
        this.deleteAttribute = function (szName: any) {
            var foundindex = -1;
            for (var i = 0; i < markupobject.customattributes; i++) {
                if (markupobject.customattributes[i].name == szName) {
                    foundindex = i;
                }
            }
            if (foundindex != -1) {
                //splice to remove entry
                markupobject.customattributes.splice(foundindex, 1);
            }
        };
        this.updateAttribute = function (newszName: any, newszValue: any) {
            for (var i = 0; i < markupobject.customattributes; i++) {
                if (markupobject.customattributes[i].name == newszName) {
                    markupobject.customattributes[i].name = newszName;
                    markupobject.customattributes[i].value = newszValue;
                }
            }
        };
        this.restorestampfontSize = function () {
            markupobject.font.setHeight(markupobject.w * 0.16);
            if (markupobject.alternative == 0) {
                markupobject.stampsmalltheight = (markupobject.w * 0.08) - 4;
                if (markupobject.stampsmalltheight < 1) {
                    markupobject.stampsmalltheight = 1;
                }
                var combinedtextheight = markupobject.textheight + markupobject.stampsmalltheight + ((markupobject.h / 10) * 2);
                if (combinedtextheight > markupobject.h) {
                    //this.textheight = (this.h / 2) - ((this.h / 10) * 2);
                    markupobject.font.setHeight((markupobject.h / 2) - ((markupobject.h / 10) * 2));
                    markupobject.stampsmalltheight = (markupobject.textheight / 2) - 4;
                    if (markupobject.stampsmalltheight < 1) {
                        markupobject.stampsmalltheight = 1;
                    }
                }
            }
            else {
                if ((markupobject.w * 0.6) >= markupobject.h) {
                    //this.textheight = (this.h / 4);
                    markupobject.font.setHeight(markupobject.h / 4);
                }
                else {
                    //this.textheight = this.w * 0.16;
                    markupobject.font.setHeight(markupobject.w * 0.16);
                }
            }
        };
        this.SetfromXML = function (xmlDoc: any, fileVersion: any) {
            var internalscale = 1;
            var bfixedScale = false;
            var fixedscale = Globals.DocObj.pages[Globals.DocObj.currentpage].fixedScale;
            //<FileVersion>
            this.x = parseFloat(xmlDoc.getElementsByTagName('Rect')[0].attributes.getNamedItem('x').value);
            this.y = parseFloat(xmlDoc.getElementsByTagName('Rect')[0].attributes.getNamedItem('y').value);
            this.w = parseFloat(xmlDoc.getElementsByTagName('Rect')[0].attributes.getNamedItem('w').value);
            this.h = parseFloat(xmlDoc.getElementsByTagName('Rect')[0].attributes.getNamedItem('h').value);
            var bNewFileformat = (fileVersion == 'C360' || fileVersion == 'C365');
            var bNewestFileformat = (fileVersion == 'C365');
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs && bNewFileformat) {
                internalscale = Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf;
            }
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml && bNewFileformat) {
                internalscale = Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
            }
            if (xmlDoc.getElementsByTagName('FixedScale')[0] != undefined) {
                bfixedScale = (parseFloat(xmlDoc.getElementsByTagName('FixedScale')[0].firstChild.nodeValue) == 1);
            }
            if (this.h == 0 && this.w == 0) {
                if (this.type == 8 || this.type == 1 || this.type == 2) {
                }
                else {
                    return false;
                }
            }
            if (this.type == 8 || this.type == 1 || this.type == 2) {
                //skip size check
            }
            else {
            }
            this.bCanHaveLink = ((this.type == 1 && this.subtype == 2) || this.type == 3 || this.type == 4 || this.type == 5 || this.type == 9 || this.type == 11);
            if (xmlDoc.getElementsByTagName('HaveLink')[0] != undefined) {
                this.bhaveLink = (parseInt(xmlDoc.getElementsByTagName('HaveLink')[0].firstChild.nodeValue) == 1);
            }
            if (xmlDoc.getElementsByTagName('LinkURL')[0] != undefined) {
                if (xmlDoc.getElementsByTagName('LinkURL')[0].firstChild != null) {
                    this.linkURL = xmlDoc.getElementsByTagName('LinkURL')[0].firstChild.nodeValue;
                }
            }
            if (xmlDoc.getElementsByTagName('Layer')[0] != undefined) {
                this.layer = xmlDoc.getElementsByTagName('Layer')[0].firstChild.nodeValue;
            }
            else {
                this.layer = Globals.markuplayer;
            }
            /*if (this.layer == 0) {
                this.layer = markuplayer;
            }*/
            this.timestamp = parseInt(xmlDoc.getElementsByTagName('TimeStamp')[0].firstChild.nodeValue);
            this.rotation = parseFloat(xmlDoc.getElementsByTagName('Rotation')[0].firstChild.nodeValue);
            //PageRotation
            if (xmlDoc.getElementsByTagName('Extended')[0] != undefined) {
                const extendedobjects = xmlDoc.getElementsByTagName('Extended')[0].childNodes;
                this.customattributes = [];
                for (let nodec = 0; nodec < extendedobjects.length; nodec++) {
                    if(extendedobjects[nodec].firstChild != null){
                        const attrname = extendedobjects[nodec].nodeName;
                        const attrvalue = extendedobjects[nodec].firstChild.nodeValue;
                        this.AddAttribute(attrname,attrvalue);
                    }
                }
            }
            if (xmlDoc.getElementsByTagName('Consolidated')[0] != undefined) {
                this.consolidated = (parseInt(xmlDoc.getElementsByTagName('Consolidated')[0].firstChild.nodeValue) == 1);
            }
            //
            if (xmlDoc.getElementsByTagName('TextRotation')[0] != undefined) {
                this.textrotate = parseFloat(xmlDoc.getElementsByTagName('TextRotation')[0].firstChild.nodeValue);
            }
            if (xmlDoc.getElementsByTagName('PageRotation')[0] != undefined) {
                this.pagerotation = parseFloat(xmlDoc.getElementsByTagName('PageRotation')[0].firstChild.nodeValue);
            }
            this.documentName = xmlDoc.getElementsByTagName('FileName')[0].firstChild.nodeValue;
            this.layout = xmlDoc.getElementsByTagName('Layout')[0].firstChild.nodeValue;
            this.pagenumber = parseInt(xmlDoc.getElementsByTagName('View')[0].firstChild.nodeValue);
            if (xmlDoc.getElementsByTagName('Color')[0] != undefined) {
                this.color = xmlDoc.getElementsByTagName('Color')[0].firstChild.nodeValue;
            }
            if (xmlDoc.getElementsByTagName('UniqueID')[0] != undefined) {
                this.uniqueID = xmlDoc.getElementsByTagName('UniqueID')[0].firstChild.nodeValue;
            }
            if (xmlDoc.getElementsByTagName('DocOffsetX')[0] != undefined) {
                this.docdx = parseFloat(xmlDoc.getElementsByTagName('DocOffsetX')[0].firstChild.nodeValue);
            }
            else {
                this.docdx = Globals.DocObj.pages[Globals.DocObj.currentpage].getdx();
            }
            if (xmlDoc.getElementsByTagName('DocOffsetY')[0] != undefined) {
                this.docdy = parseFloat(xmlDoc.getElementsByTagName('DocOffsetY')[0].firstChild.nodeValue);
            }
            else {
                this.docdy = Globals.DocObj.pages[Globals.DocObj.currentpage].getdy();
            }
            if (xmlDoc.getElementsByTagName('DocScale')[0] != undefined) {
                this.docdscale = parseFloat(xmlDoc.getElementsByTagName('DocScale')[0].firstChild.nodeValue);
            }
            else {
                this.docdscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getdscale();
            }
            if (xmlDoc.getElementsByTagName('Transparency')[0] != undefined) {
                this.transparency = parseInt(xmlDoc.getElementsByTagName('Transparency')[0].firstChild.nodeValue);
            }
            if (this.type == 3 && this.subtype == 3) {
                this.transparency = 30;
                this.fillcolor = setTransp(this.fillcolor, this.transparency);
            }
            if (xmlDoc.getElementsByTagName('LineColor')[0] != undefined) {
                this.strokecolor = xmlDoc.getElementsByTagName('LineColor')[0].firstChild.nodeValue;
                var isHex = /^#[0-9A-F]{6}$/i.test(this.strokecolor);
                if (isHex) {
                    this.strokecolor = convertHex(this.strokecolor, 100);
                }
                else {
                    this.strokecolor = setTransp(this.strokecolor, 100);
                }
            }
            if (xmlDoc.getElementsByTagName('TextColor')[0] != undefined) {
                this.textcolor = xmlDoc.getElementsByTagName('TextColor')[0].firstChild.nodeValue;
            }
            this.scaling = parseFloat(xmlDoc.getElementsByTagName('Scaling')[0].firstChild.nodeValue);
            if (xmlDoc.getElementsByTagName('FillColor')[0] != undefined) {
                this.fillcolor = xmlDoc.getElementsByTagName('FillColor')[0].firstChild.nodeValue;
                this.fillcolor = setTransp(this.fillcolor, this.transparency);
            }
            if (xmlDoc.getElementsByTagName('FontName')[0] != undefined) {
                this.fontname = xmlDoc.getElementsByTagName('FontName')[0].firstChild.nodeValue;
            }
            if (xmlDoc.getElementsByTagName('FontHeight')[0] != undefined) {
                this.textheight = xmlDoc.getElementsByTagName('FontHeight')[0].firstChild.nodeValue;
            }
            if (this.fontname != undefined || this.textheight != undefined) {
                this.font = new FontObject(this.fontname, this.textheight, false, false);
            }
            if (xmlDoc.getElementsByTagName('Font')[0] != undefined) {
                var facename = xmlDoc.getElementsByTagName('Font')[0].attributes.getNamedItem('facename').value;
                var height = parseFloat(xmlDoc.getElementsByTagName('Font')[0].attributes.getNamedItem('height').value);
                var bold = (parseInt(xmlDoc.getElementsByTagName('Font')[0].attributes.getNamedItem('bold').value) == 1);
                var italic = (parseInt(xmlDoc.getElementsByTagName('Font')[0].attributes.getNamedItem('italic').value) == 1);
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                    if (this.type != 12) {
                        if (bfixedScale && bNewFileformat) {
                            height = Math.round(height * fixedscale);
                        }
                        else {
                            height = Math.round(height * internalscale);
                        }
                    }
                }
                else {
                    if (this.type != 12) {
                        if (bfixedScale) {
                            height = Math.round((height * fixedscale) / this.scaling);
                            //fontNode.setAttribute("height", (DocObj.markuplist[curmarkup].font.height / fixedscale) * imagescale);
                        }
                        else {
                            height = Math.round(height);
                            //fontNode.setAttribute("height", DocObj.markuplist[curmarkup].font.height);
                        }
                    }
                    else {
                        //fontNode.setAttribute("height", DocObj.markuplist[curmarkup].font.height);
                        height = Math.round(height);
                    }
                }
                //this.font = new FontObject(facename, height, bold, italic);
                var bispath = (this.type == 1 && this.subtype == 3);
                this.font = new FontObject(facename, (this.type == 7 || this.type == 8 || bispath) ? Globals.nLabelTextsize : height, bold, italic);
                this.textheight = parseFloat(''+height); // JS->TS:INFO parseFloat expencts a string param ( added ''+ )
            }
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                this.textheight *= internalscale; //changed to recreate correct textheight
            }
            this.signature = xmlDoc.getElementsByTagName('Signature')[0].firstChild.nodeValue;
            if (bNewFileformat) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                    this.scaling = internalscale;
                }
            }
            //this.scaling = DocObj.pages[DocObj.currentpage].dscale;
            this.xoffset = parseFloat(xmlDoc.getElementsByTagName('Xoffset')[0].firstChild.nodeValue);
            this.yoffset = parseFloat(xmlDoc.getElementsByTagName('Yoffset')[0].firstChild.nodeValue);
            if (bNewFileformat && (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml)) {
                this.x = (this.x + this.xoffset) * internalscale;
                this.y = (this.y + this.yoffset) * internalscale;
                if (this.type == 0 || this.type == 1 || this.type == 2 || this.type == 6 || this.type == 7 || this.type == 8) {
                    this.w = (this.w + this.xoffset) * internalscale;
                    this.h = (this.h + this.yoffset) * internalscale;
                }
                else {
                    if (this.type == 10 && bfixedScale) {
                        this.w *= fixedscale;
                        this.h *= fixedscale;
                    }
                    else {
                        this.w *= internalscale;
                        this.h *= internalscale;
                    }
                }
            }
            if (this.type == 7) {
                if (xmlDoc.getElementsByTagName('LeaderLineOffset')[0] != undefined) {
                    this.leaderoffset = xmlDoc.getElementsByTagName('LeaderLineOffset')[0].firstChild.nodeValue;
                    if (bNewFileformat && (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml)) {
                        this.leaderoffset *= internalscale;
                    }
                }
            }
            this.linewidth = xmlDoc.getElementsByTagName('LineWidth')[0].firstChild.nodeValue;
            /*if(this.type == 0 && this.subtype == 1){
                this.linewidth /= 10;
            }*/
            if (bNewFileformat && (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml)) {
                if (bfixedScale) {
                    this.linewidth *= fixedscale;
                }
                else {
                    this.linewidth *= internalscale;
                }
                this.arrowlength = Globals.nArrowSize + this.linewidth;
            }
            if (xmlDoc.getElementsByTagName('ArrowSize')[0] != undefined) {
                var arrowsize = parseInt(xmlDoc.getElementsByTagName('ArrowSize')[0].firstChild.nodeValue);
                if (bNewFileformat && (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml)) {
                    this.arrowlength = arrowsize + this.linewidth;
                }
            }
            if (xmlDoc.getElementsByTagName('LineStyle')[0] != undefined) {
                this.linestyle = parseFloat(xmlDoc.getElementsByTagName('LineStyle')[0].firstChild.nodeValue);
            }
            this.text = xmlDoc.getElementsByTagName('Text')[0].firstChild.nodeValue;
            if (this.text == '.') {
                this.text = '';
            }
            if (xmlDoc.getElementsByTagName('SmallText')[0] != undefined) {
                this.smalltext = xmlDoc.getElementsByTagName('SmallText')[0].firstChild.nodeValue;
            }
            if (xmlDoc.getElementsByTagName('DimText')[0] != undefined && xmlDoc.getElementsByTagName('DimText')[0].firstChild != null) {
                this.dimtext = xmlDoc.getElementsByTagName('DimText')[0].firstChild.nodeValue;
            }
            else {
                this.dimtext = "";
            }
            if (this.type == 1 || this.type == 2 || this.type == 8) {
                this.removepoints();
                if (xmlDoc.getElementsByTagName('Point').length != 0) {
                    var PointList = xmlDoc.getElementsByTagName('Point');
                    for (var i = 0; i < PointList.length; i++) {
                        var x = parseFloat(PointList[i].attributes.getNamedItem('x').value);
                        var y = parseFloat(PointList[i].attributes.getNamedItem('y').value);
                        if (bNewFileformat && (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml)) {
                            x = (x + this.xoffset) * internalscale;
                            y = (y + this.yoffset) * internalscale;
                        }
                        markupobject.addpoint(x, y);
                    }
                    this.numpoints = PointList.length;
                    markupobject.findrectangle();
                    /*if (this.h == 0 && this.w == 0) {

                    }*/
                }
                else {
                    return false;
                }
            }
            if (this.type == 0) {
                this.removepoints();
                if (xmlDoc.getElementsByTagName('Line').length != 0) {
                    var pointLines = xmlDoc.getElementsByTagName('Line');
                    for (i = 0; i < pointLines.length; i++) {
                        var linePoints = pointLines[i].getElementsByTagName('Point');
                        for (var j = 0; j < linePoints.length; j++) {
                            x = parseFloat(linePoints[j].attributes.getNamedItem('x').value);
                            y = parseFloat(linePoints[j].attributes.getNamedItem('y').value);
                            if (bNewFileformat && (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml)) {
                                x = (x + this.xoffset) * internalscale;
                                y = (y + this.yoffset) * internalscale;
                            }
                            var tempPoint = new point(x, y);
                            this.points.push(tempPoint);
                            //this.pointlist[i][j].y = y;
                        }
                        this.pointlist.push(this.points);
                        this.points = [];
                    }
                    if (this.h == 0 && this.w == 0) {
                        markupobject.findrectangle();
                    }
                }
                else {
                    return false;
                }
            }
            if (bNewFileformat && (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml)) {
                this.xoffset *= internalscale;
                this.yoffset *= internalscale;
            }
            if (this.type == 12) {
                if (this.transparency == undefined) {
                    this.transparency = 30;
                    this.fillcolor = setTransp(this.fillcolor, this.transparency);
                }
                if (this.subtype == 100) {
                    this.text = xmlDoc.getElementsByTagName('Text')[0].firstChild.nodeValue;
                }
                //this.textheight = this.w * 0.16;
                //this.font.setHeight(this.textheight);
                this.font.setFontname("Times New Roman");
                this.font.setBold(true);
                //ctx.font = "bold " + textstampscaled + "pt " + "Times New Roman";
                this.stampsmalltheight = (this.w * 0.08) - 4;
                var combinedtextheight = this.textheight + this.stampsmalltheight + ((this.h / 10) * 2);
                if (combinedtextheight > this.h) {
                    this.textheight = (this.h / 2) - ((this.h / 10) * 2);
                    this.stampsmalltheight = (this.textheight / 2) - 4;
                }
            }
            let cdata;
            if (this.type == 11) {
                var createimage = new Image();
                if (xmlDoc.getElementsByTagName('Image')[0] != undefined && xmlDoc.getElementsByTagName('Image')[0].firstChild != null) {
                    if (xmlDoc.getElementsByTagName('Image')[0].firstChild.nodeValue != "") {
                        if (xmlDoc.getElementsByTagName('Image')[0].firstChild.nodeValue == "\n") {
                            cdata = xmlDoc.getElementsByTagName('Image')[0].firstChild.nextSibling.nodeValue;
                        }
                        else {
                            cdata = xmlDoc.getElementsByTagName('Image')[0].firstChild.nodeValue;
                            cdata = cdata.slice(9, cdata.length - 3);
                        }
                        //cdata = cdata.slice(cdata.length - 3);
                        //"<![CDATA[" + dataURL + "]]>";
                        //createimage.setAttribute('src',cdata);
                        markupobject.markupcdataload(createimage, cdata);
                        //createimage.addEventListener('load', markupobject.markupcdataload, false);
                        //createimage.src = cdata;
                        //this.image = createimage;
                        //markupobject.imageloaded = true;
                    }
                }
                else if (xmlDoc.getElementsByTagName('Imagehref')[0] != undefined && xmlDoc.getElementsByTagName('Imagehref')[0].firstChild != null) {
                    const imageurl = xmlDoc.getElementsByTagName('Imagehref')[0].firstChild.nodeValue;
                    markupobject.imagehref = imageurl;
                    markupobject.markupimageload(imageurl, createimage);
                    //createimage.src = imageurl;
                    //this.image = createimage;
                    //this.dimtext = "";
                }
                else {
                    this.type = 3;
                    this.subtype = 0;
                    this.alternative = 0;
                }
                //create image either from separate image or embedded data.
                //this.image = createimage;
            }
            //this.stampsmalltheight = this.textheight / 2;
            if (this.type == 12) {
                markupobject.restorestampfontSize();
            }
            //<Points>
            /*if (xmlDoc.getElementsByTagName('DimText')[0].firstChild.length != 0){
             this.text = xmlDoc.getElementsByTagName('DimText')[0].firstChild.nodeValue;
             }*/
            /*this.x = xmlDoc.getElementsByTagName('Rect')[0].attributes['x'].value;
             this.y = xmlDoc.getElementsByTagName('Rect')[0].attributes['y'].value;
             this.w = xmlDoc.getElementsByTagName('Rect')[0].attributes['w'].value;
             this.h = xmlDoc.getElementsByTagName('Rect')[0].attributes['h'].value;*/
            /*
             Add function for getting points for polylines pencil etc.
             */
            return true;
        };
        this.markupcdataload = function (image: any, cdata: any) {
            image.onload = function (ev:any) {
                markupobject.image = image;
                markupobject.imageloaded = true;
                drawmarkupAll(Globals.cntximg);
                DrawMarkupSelected(Globals.context);
            };
            image.src = cdata;
        };
        this.markupimageload = function (imageURL: any, image: any) {
            const oReq = new XMLHttpRequest();
            oReq.open("GET", imageURL, true);
            oReq.responseType = "blob";
            oReq.onload = function (oEvent) {
                var url = URL.createObjectURL(oReq.response);
                if (url) {
                    markupobject.markupcdataload(image, url);
                    // image.src = url;
                    // markupobject.image = image;
                    // markupobject.imageloaded = true;

                    // drawmarkupAll(Globals.cntximg);
                    // DrawMarkupSelected(Globals.context);
                }
            };
            oReq.send(null);
        };
        this.GetLinestyle = function (linestyle: any, ctx: any, scale: any) {
            switch (linestyle) {
                case 0:
                    break;
                case 1:
                    ctx.setLineDash([10 * scale]);
                    break;
                case 2:
                    ctx.setLineDash([2 * scale, 5 * scale]);
                    break;
                case 3:
                    ctx.setLineDash([10 * scale, 5 * scale, 2 * scale, 5 * scale, 2 * scale, 5 * scale]);
                    break;
                case 4:
                    ctx.setLineDash([10 * scale, 5 * scale, 2 * scale, 5 * scale]);
                    break;
            }
        };
        this.GetDateTime = function (time: any) {
            var dDate = new Date(markupobject.timestamp);
            var day = dDate.getDate();
            var month = dDate.getMonth();
            month = month + 1;
            var year = dDate.getFullYear();
            //var hours = dDate.getHours();
            var hours = (dDate.getHours() < 10 ? '0' : '') + dDate.getHours();
            //var minutes = dDate.getMinutes();
            var minutes = (dDate.getMinutes() < 10 ? '0' : '') + dDate.getMinutes();
            //var seconds = dDate.getSeconds();
            var seconds = (dDate.getSeconds() < 10 ? '0' : '') + dDate.getSeconds();
            if (time) {
                return day + "." + month + "." + year + " " + hours + ":" + minutes + ":" + seconds;
            }
            else {
                return day + "." + month + "." + year;
            }
        };
        this.getdiag = function (width: any, height: any) {
            var dimwsq = Math.pow(width, 2);
            var dimhsq = Math.pow(height, 2);
            var dimdiag = Math.sqrt((dimwsq + dimhsq));
            return dimdiag;
        };
        this.onPanScale = function () {
            //move operation to markup object.
            /*var curscale = DocObj.pages[DocObj.currentpage].getdscale();
            var pagedx = DocObj.pages[DocObj.currentpage].getdx();
            var pagedy = DocObj.pages[DocObj.currentpage].getdy();

            var scalediff = (curscale / arrowmarkupobj.scaling);


            var changex = ((arrowmarkupobj.w - pagedx) / scalediff) + arrowmarkupobj.xoffset;
            var changey = ((arrowmarkupobj.h - pagedy) / scalediff) + arrowmarkupobj.yoffset;


            arrowmarkupobj.w = changex;
            arrowmarkupobj.h = changey;*/
        };
        this.setDimDrawme = function () {
            // TODO:JS->TS:CHECK coords should have default values or should make sure they cannot be used without having been defined
            let coords:any;
            if (this.type == 6 || this.type == 7) {
                coords = {
                    x: this.x,
                    y: this.y,
                    w: this.w,
                    h: this.h,
                };
            }
            else if (this.type == 1 || this.type == 8) {
                var point = this.getlastpoint();
                if (!point) {
                    return { x: 0, y: 0, w: 0, h: 0 };
                }
                coords = {
                    x: point.x,
                    y: point.y,
                    w: point.x,
                    h: point.y,
                };
            }
            var rotation = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation;
            var scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale; // markupobject.scaling;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector; // markupobject.scaling;
            }
            else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                scalefactor = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf); // markupobject.scaling;
            }
            else {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale; // markupobject.scaling;
                if (Globals.DocObj.Type == 0) {
                    scalefactor = Globals.DocObj.pages[0].dscale; // markupobject.scaling;
                }
            }
            //var fixedscale = DocObj.pages[DocObj.currentpage].fixedScale;
            //markupobject.fixedscaleFactor =  scalefactor / DocObj.pages[DocObj.currentpage].fixedScale;
            scalefactor /= markupobject.scaling;
            var pagedx = 0;
            var pagedy = 0;
            if (Globals.DocObj.Type == 0) {
                var docdx = Globals.DocObj.pages[0].dx;
            }
            else {
                docdx = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
            }
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                pagedx = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            }
            else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                pagedx = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;
            }
            else {
                pagedx = docdx;
                pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;
            }
            var pagecorner = getPageRotCorner({ x: pagedx, y: pagedy });
            var rotoffset = getPageRotCorner({ x: this.xoffset, y: this.yoffset });
            switch (rotation) {
                case 0:
                    if (this.type == 6 || this.type == 7) {
                        coords.x = ((this.x - pagedx) / scalefactor) + this.xoffset;
                        coords.y = ((this.y - pagedy) / scalefactor) + this.yoffset;
                        coords.w = ((this.w - pagedx) / scalefactor) + this.xoffset;
                        coords.h = ((this.h - pagedy) / scalefactor) + this.yoffset;
                    }
                    else if (this.type == 1 || this.type == 8) {
                        coords.w = ((point.x - pagedx) / scalefactor) + this.xoffset;
                        coords.h = ((point.y - pagedy) / scalefactor) + this.yoffset;
                    }
                    break;
                case 90:
                    if (this.type == 6 || this.type == 7) {
                        coords.x = ((this.x - pagecorner.x) / scalefactor) + rotoffset.y;
                        coords.y = ((this.y - pagecorner.y) / scalefactor) + rotoffset.x;
                        coords.w = ((this.w - pagecorner.x) / scalefactor) + rotoffset.x;
                        coords.h = ((this.h - pagecorner.y) / scalefactor) + rotoffset.y;
                    }
                    else if (this.type == 1 || this.type == 8) {
                        coords.w = ((point.x - pagecorner.x) / scalefactor) + rotoffset.x;
                        coords.h = ((point.y - pagecorner.y) / scalefactor) + rotoffset.y;
                    }
                    break;
                case 180:
                    if (this.type == 6 || this.type == 7) {
                        coords.x = ((this.x - pagecorner.x) / scalefactor) + rotoffset.y;
                        coords.y = ((this.y - pagecorner.y) / scalefactor) + rotoffset.x;
                        coords.w = ((this.w - pagecorner.x) / scalefactor) + rotoffset.x;
                        coords.h = ((this.h - pagecorner.y) / scalefactor) + rotoffset.y;
                    }
                    else if (this.type == 1 || this.type == 8) {
                        coords.w = ((point.x - pagecorner.x) / scalefactor) + rotoffset.x;
                        coords.h = ((point.y - pagecorner.y) / scalefactor) + rotoffset.y;
                    }
                    break;
                case 270:
                    if (this.type == 6 || this.type == 7) {
                        coords.x = ((this.x - pagecorner.x) / scalefactor) + rotoffset.y;
                        coords.y = ((this.y - pagecorner.y) / scalefactor) + rotoffset.x;
                        coords.w = ((this.w - pagecorner.x) / scalefactor) + rotoffset.x;
                        coords.h = ((this.h - pagecorner.y) / scalefactor) + rotoffset.y;
                    }
                    else if (this.type == 1 || this.type == 8) {
                        coords.w = ((point.x - pagecorner.x) / scalefactor) + rotoffset.x;
                        coords.h = ((point.y - pagecorner.y) / scalefactor) + rotoffset.y;
                    }
                    break;
            }
            var rotRad360 = 360 * (Math.PI / 180);
            var abswidthandheight = true;
            //coords.w = this.w * scalefactor;
            //coords.h = this.h * scalefactor;
            if (Globals.DocObj.Type == 0) {
                var docdx = Globals.DocObj.pages[0].dx;
            }
            else {
                docdx = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
            }
            /*switch (this.type) {
                case 6: //line arrow

                    coords.x += pagedx;
                    coords.y += pagedy;

                    coords.w += pagedx;
                    coords.h += pagedy;

                    //this.w = coords.w;
                    //this.h = coords.h;

                    //abswidthandheight = true;


                    break;
                case 7: //dimension line

                    coords.x += pagedx;
                    coords.y += pagedy;

                    //coords.w = (coords.w - this.xoffset) * scalefactor;
                    //coords.h = (coords.h - this.yoffset) * scalefactor;

                    coords.w += pagedx;
                    coords.h += pagedy;
                    //this.w = coords.w;
                    //this.h = coords.h;

                    //abswidthandheight = true;

                    break;
            }*/
            /*var CanvRotRad = (360 - DocObj.pages[DocObj.currentpage].drotation) * (Math.PI / 180);
            var centercanvX = (canvasowidth / 2);
            var centercanvY = (canvasoheight / 2);

            if (DocObj.pages[DocObj.currentpage].drotation != 0){

                var transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, coords.x, coords.y, CanvRotRad);
                coords.x = transpoint.x;
                coords.y = transpoint.y;

            }*/
            return coords;
        };
        this.SetDimensions = function (scalefactor: any, rotation: any, pagedx: any, pagedy: any) {
            //Calculate the scaled and rotated coordinates and store them.
            //var scalefactor = DocObj.pages[DocObj.currentpage].dscale / this.scaling;
            /*if (!markupobject.saved){
                rotation = 0;
            }*/
            var rotRad360 = 360 * (Math.PI / 180);
            var abswidthandheight = true;
            this.xscaled = (this.x - this.xoffset) * scalefactor;
            this.yscaled = (this.y - this.yoffset) * scalefactor;
            this.wscaled = this.w * scalefactor;
            this.hscaled = this.h * scalefactor;
            if (Globals.DocObj.Type == 0) {
                var docdx = Globals.DocObj.pages[0].dx;
            }
            else {
                docdx = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
            }
            switch (this.type) {
                case 0: //pencil, marker, eraser
                    /*if (DocObj.pages[DocObj.currentpage].usevectorxml){
                     this.xscaled += DocObj.pages[DocObj.currentpage].dxvector;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dyvector;

                     }else if(DocObj.pages[DocObj.currentpage].usepdfjs){
                     this.xscaled += DocObj.pages[DocObj.currentpage].dxpdf;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dypdf;

                     }else{
                     this.xscaled += docdx;
                     //this.xscaled += DocObj.pages[DocObj.currentpage].dx;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dy;

                     }*/
                    this.xscaled += pagedx;
                    this.yscaled += pagedy;
                    this.wscaled = (this.w - this.xoffset) * scalefactor;
                    this.hscaled = (this.h - this.yoffset) * scalefactor;
                    /*if (DocObj.pages[DocObj.currentpage].usevectorxml){
                     this.wscaled += DocObj.pages[DocObj.currentpage].dxvector;
                     this.hscaled += DocObj.pages[DocObj.currentpage].dyvector;

                     }else if(DocObj.pages[DocObj.currentpage].usepdfjs){
                     this.wscaled += DocObj.pages[DocObj.currentpage].dxpdf;
                     this.hscaled += DocObj.pages[DocObj.currentpage].dypdf;

                     }else{
                     this.wscaled += docdx;
                     //this.wscaled += DocObj.pages[DocObj.currentpage].dx;
                     this.hscaled += DocObj.pages[DocObj.currentpage].dy;

                     }*/
                    this.wscaled += pagedx;
                    this.hscaled += pagedy;
                    abswidthandheight = true;
                    break;
                case 1: //polygon
                    /*if (DocObj.pages[DocObj.currentpage].usevectorxml){
                     this.xscaled += DocObj.pages[DocObj.currentpage].dxvector;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dyvector;
                     }else if(DocObj.pages[DocObj.currentpage].usepdfjs){
                     this.xscaled += DocObj.pages[DocObj.currentpage].dxpdf;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dypdf;
                     }else{
                     this.xscaled += docdx;
                     //this.xscaled += DocObj.pages[DocObj.currentpage].dx;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dy;

                     }*/
                    this.xscaled += pagedx;
                    this.yscaled += pagedy;
                    this.wscaled = (this.w - this.xoffset) * scalefactor;
                    this.hscaled = (this.h - this.yoffset) * scalefactor;
                    /*if (DocObj.pages[DocObj.currentpage].usevectorxml){
                     this.wscaled += DocObj.pages[DocObj.currentpage].dxvector;
                     this.hscaled += DocObj.pages[DocObj.currentpage].dyvector;
                     }else if(DocObj.pages[DocObj.currentpage].usepdfjs){
                     this.wscaled += DocObj.pages[DocObj.currentpage].dxpdf;
                     this.hscaled += DocObj.pages[DocObj.currentpage].dypdf;
                     }else{
                     this.wscaled += docdx;
                     //this.wscaled += DocObj.pages[DocObj.currentpage].dx;
                     this.hscaled += DocObj.pages[DocObj.currentpage].dy;

                     }*/
                    this.wscaled += pagedx;
                    this.hscaled += pagedy;
                    abswidthandheight = true;
                    break;
                case 2:
                    /*if (DocObj.pages[DocObj.currentpage].usevectorxml){
                     this.xscaled += DocObj.pages[DocObj.currentpage].dxvector;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dyvector;
                     }else if(DocObj.pages[DocObj.currentpage].usepdfjs){
                     this.xscaled += DocObj.pages[DocObj.currentpage].dxpdf;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dypdf;

                     }else{
                     this.xscaled += docdx;
                     //this.xscaled += DocObj.pages[DocObj.currentpage].dx;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dy;

                     }*/
                    this.xscaled += pagedx;
                    this.yscaled += pagedy;
                    this.wscaled = (this.w - this.xoffset) * scalefactor;
                    this.hscaled = (this.h - this.yoffset) * scalefactor;
                    /*if (DocObj.pages[DocObj.currentpage].usevectorxml){
                     this.wscaled += DocObj.pages[DocObj.currentpage].dxvector;
                     this.hscaled += DocObj.pages[DocObj.currentpage].dyvector;
                     }else if(DocObj.pages[DocObj.currentpage].usepdfjs){
                     this.wscaled += DocObj.pages[DocObj.currentpage].dxpdf;
                     this.hscaled += DocObj.pages[DocObj.currentpage].dypdf;

                     }else{
                     this.wscaled += docdx;
                     //this.wscaled += DocObj.pages[DocObj.currentpage].dx;
                     this.hscaled += DocObj.pages[DocObj.currentpage].dy;

                     }*/
                    this.wscaled += pagedx;
                    this.hscaled += pagedy;
                    abswidthandheight = true;
                    break;
                case 3: //rectangle
                    this.xscaled += pagedx;
                    this.yscaled += pagedy;
                    /*if (DocObj.pages[DocObj.currentpage].usevectorxml){
                     this.xscaled += DocObj.pages[DocObj.currentpage].dxvector;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dyvector;
                     }else if(DocObj.pages[DocObj.currentpage].usepdfjs){
                     this.xscaled += DocObj.pages[DocObj.currentpage].dxpdf;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dypdf;

                     }else{
                     this.xscaled += docdx;
                     //this.xscaled += DocObj.pages[DocObj.currentpage].dx;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dy;

                     }*/
                    abswidthandheight = false;
                    break;
                case 4: //oval
                    this.xscaled += pagedx;
                    this.yscaled += pagedy;

                    if (this.subtype == 1){

                        this.wscaled = (this.w - this.xoffset) * scalefactor;
                        this.hscaled = (this.h - this.yoffset) * scalefactor;

                        this.wscaled += pagedx;
                        this.hscaled += pagedy;

                        abswidthandheight = true;
                    }else{
                        abswidthandheight = false;
                    }

                    /*if (DocObj.pages[DocObj.currentpage].usevectorxml){
                     this.xscaled += DocObj.pages[DocObj.currentpage].dxvector;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dyvector;
                     }else if(DocObj.pages[DocObj.currentpage].usepdfjs){
                     this.xscaled += DocObj.pages[DocObj.currentpage].dxpdf;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dypdf;

                     }else{
                     this.xscaled += docdx;
                     //this.xscaled += DocObj.pages[DocObj.currentpage].dx;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dy;

                     }*/

                    break;
                case 5:
                    this.xscaled += pagedx;
                    this.yscaled += pagedy;
                    /*if (DocObj.pages[DocObj.currentpage].usevectorxml){
                     this.xscaled += DocObj.pages[DocObj.currentpage].dxvector;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dyvector;
                     }else if(DocObj.pages[DocObj.currentpage].usepdfjs){
                     this.xscaled += DocObj.pages[DocObj.currentpage].dxpdf;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dypdf;

                     }else{
                     this.xscaled += docdx;
                     //this.xscaled += DocObj.pages[DocObj.currentpage].dx;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dy;

                     }*/
                    abswidthandheight = false;
                    break;
                case 6: //line arrow
                    this.xscaled += pagedx;
                    this.yscaled += pagedy;
                    this.wscaled = (this.w - this.xoffset) * scalefactor;
                    this.hscaled = (this.h - this.yoffset) * scalefactor;
                    this.wscaled += pagedx;
                    this.hscaled += pagedy;
                    /*if (DocObj.pages[DocObj.currentpage].usevectorxml){
                     this.xscaled += DocObj.pages[DocObj.currentpage].dxvector;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dyvector;
                     this.wscaled += DocObj.pages[this.pagenumber].dxvector;
                     this.hscaled += DocObj.pages[this.pagenumber].dyvector;
                     }else if(DocObj.pages[DocObj.currentpage].usepdfjs){

                     this.xscaled += DocObj.pages[DocObj.currentpage].dxpdf;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dypdf;
                     this.wscaled += DocObj.pages[this.pagenumber].dxpdf;
                     this.hscaled += DocObj.pages[this.pagenumber].dypdf;

                     }else{
                     this.xscaled += docdx;
                     //this.xscaled += DocObj.pages[DocObj.currentpage].dx;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dy;
                     this.wscaled += DocObj.pages[this.pagenumber].dx;
                     this.hscaled += DocObj.pages[this.pagenumber].dy;

                     }*/
                    abswidthandheight = true;
                    break;
                case 7: //dimension line
                    this.xscaled += pagedx;
                    this.yscaled += pagedy;
                    this.wscaled = (this.w - this.xoffset) * scalefactor;
                    this.hscaled = (this.h - this.yoffset) * scalefactor;
                    this.wscaled += pagedx;
                    this.hscaled += pagedy;
                    /*if (DocObj.pages[DocObj.currentpage].usevectorxml){
                     this.xscaled += DocObj.pages[DocObj.currentpage].dxvector;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dyvector;
                     this.wscaled += DocObj.pages[this.pagenumber].dxvector;
                     this.hscaled += DocObj.pages[this.pagenumber].dyvector;
                     }else if(DocObj.pages[DocObj.currentpage].usepdfjs){

                     this.xscaled += DocObj.pages[DocObj.currentpage].dxpdf;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dypdf;
                     this.wscaled += DocObj.pages[this.pagenumber].dxpdf;
                     this.hscaled += DocObj.pages[this.pagenumber].dypdf;

                     }else{
                     this.xscaled += docdx;
                     //this.xscaled += DocObj.pages[DocObj.currentpage].dx;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dy;
                     this.wscaled += DocObj.pages[this.pagenumber].dx;
                     this.hscaled += DocObj.pages[this.pagenumber].dy;

                     }*/
                    abswidthandheight = true;
                    break;
                case 8:
                    this.xscaled += pagedx;
                    this.yscaled += pagedy;
                    /*if (DocObj.pages[DocObj.currentpage].usevectorxml){
                     this.xscaled += DocObj.pages[DocObj.currentpage].dxvector;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dyvector;
                     }else if(DocObj.pages[DocObj.currentpage].usepdfjs){

                     this.xscaled += DocObj.pages[DocObj.currentpage].dxpdf;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dypdf;

                     }else{
                     this.xscaled += docdx;
                     //this.xscaled += DocObj.pages[DocObj.currentpage].dx;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dy;

                     }*/
                    this.wscaled = (this.w - this.xoffset) * scalefactor;
                    this.hscaled = (this.h - this.yoffset) * scalefactor;
                    this.wscaled += pagedx;
                    this.hscaled += pagedy;
                    /*if (DocObj.pages[DocObj.currentpage].usevectorxml){
                     this.wscaled += DocObj.pages[DocObj.currentpage].dxvector;
                     this.hscaled += DocObj.pages[DocObj.currentpage].dyvector;
                     }else if(DocObj.pages[DocObj.currentpage].usepdfjs){

                     this.wscaled += DocObj.pages[DocObj.currentpage].dxpdf;
                     this.hscaled += DocObj.pages[DocObj.currentpage].dypdf;

                     }else{
                     this.wscaled += docdx;
                     //this.wscaled += DocObj.pages[DocObj.currentpage].dx;
                     this.hscaled += DocObj.pages[DocObj.currentpage].dy;

                     }*/
                    abswidthandheight = true;
                    break;
                case 9: //text
                    this.xscaled += pagedx;
                    this.yscaled += pagedy;
                    /*if (DocObj.pages[DocObj.currentpage].usevectorxml){
                     this.xscaled += DocObj.pages[DocObj.currentpage].dxvector;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dyvector;
                     }else if(DocObj.pages[DocObj.currentpage].usepdfjs){

                     this.xscaled += DocObj.pages[DocObj.currentpage].dxpdf;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dypdf;

                     }else{
                     this.xscaled += docdx;
                     //this.xscaled += DocObj.pages[DocObj.currentpage].dx;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dy;

                     }*/
                    if (this.subtype == 1) {
                        abswidthandheight = false;
                    }
                    else {
                        this.wscaled = this.textwidth; // * scalefactor;
                        this.hscaled = this.textheight * scalefactor;
                    }
                    //width and height determined by text and font set in draw function
                    abswidthandheight = false;
                    break;
                case 10:
                    this.xscaled += pagedx;
                    this.yscaled += pagedy;
                    /*if (DocObj.pages[DocObj.currentpage].usevectorxml){
                     this.xscaled += DocObj.pages[DocObj.currentpage].dxvector;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dyvector;
                     }else if(DocObj.pages[DocObj.currentpage].usepdfjs){

                     this.xscaled += DocObj.pages[DocObj.currentpage].dxpdf;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dypdf;

                     }else{
                     this.xscaled += docdx;
                     //this.xscaled += DocObj.pages[DocObj.currentpage].dx;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dy;

                     }*/
                    if (Globals.bUseFixedScale) {
                        this.wscaled = this.w * markupobject.fixedscaleFactor;
                        this.hscaled = this.h * markupobject.fixedscaleFactor;
                    }
                    else {
                        this.wscaled = this.w * scalefactor;
                        this.hscaled = this.h * scalefactor;
                    }
                    abswidthandheight = false;
                    break;
                //image
                case 11:
                    this.xscaled += pagedx;
                    this.yscaled += pagedy;
                    /*if (DocObj.pages[DocObj.currentpage].usevectorxml){
                     this.xscaled += DocObj.pages[DocObj.currentpage].dxvector;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dyvector;
                     }else if(DocObj.pages[DocObj.currentpage].usepdfjs){

                     this.xscaled += DocObj.pages[DocObj.currentpage].dxpdf;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dypdf;

                     }else{
                     this.xscaled += docdx;
                     //this.xscaled += DocObj.pages[DocObj.currentpage].dx;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dy;

                     }*/
                    this.wscaled = this.w * scalefactor;
                    this.hscaled = this.h * scalefactor;
                    abswidthandheight = false;
                    break;
                case 12:
                    this.xscaled += pagedx;
                    this.yscaled += pagedy;
                    /*if (DocObj.pages[DocObj.currentpage].usevectorxml){
                     this.xscaled += DocObj.pages[DocObj.currentpage].dxvector;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dyvector;
                     }else if(DocObj.pages[DocObj.currentpage].usepdfjs){

                     this.xscaled += DocObj.pages[DocObj.currentpage].dxpdf;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dypdf;

                     }else{
                     this.xscaled += docdx;
                     //this.xscaled += DocObj.pages[DocObj.currentpage].dx;
                     this.yscaled += DocObj.pages[DocObj.currentpage].dy;

                     }*/
                    abswidthandheight = false;
                    break;
            }
            //var centerx = this.xscaled + (this.wscaled / 2);
            //var centery = this.yscaled + (this.hscaled / 2);
            var anglerad = rotation * (Math.PI / 180);
            var centercanvX = (Globals.canvasowidth / 2);
            var centercanvY = (Globals.canvasoheight / 2);
            this.rotatedrect.x = this.xscaled;
            this.rotatedrect.y = this.yscaled;
            this.rotatedrect.w = this.wscaled;
            this.rotatedrect.h = this.hscaled;
            /*if (markupobject.textrotate !=0 && this.type == 9){
             var textp = markupobject.getRotatedMarkup(this.xscaled,this.yscaled,this.rotatedrect.w,this.rotatedrect.h,markupobject.textrotate);
             this.rotatedrect.w = textp.x;
             this.rotatedrect.h = textp.y;
             }*/
            if (rotation != 0) {
                markupobject.setRotatedMarkuprect(centercanvX, centercanvY, abswidthandheight, anglerad);
            }
            if (this.type == 9 && this.subtype == 0 && this.textrotate != 0) {
                if (rotation == 0) {
                    //this.rotatedrect.x = this.xscaled;
                    //this.rotatedrect.y = this.yscaled;
                    //this.rotatedrect.w = this.xscaled + this.wscaled;
                    //this.rotatedrect.h = this.yscaled - this.hscaled;
                    //markupobject.setRotatedMarkuprect(centercanvX, centercanvY,abswidthandheight, anglerad);
                }
                var txtx = Math.min(this.rotatedrect.x, this.rotatedrect.w);
                var txtw = Math.max(this.rotatedrect.x, this.rotatedrect.w);
                var txty = Math.min(this.rotatedrect.y, this.rotatedrect.h);
                var txth = Math.max(this.rotatedrect.y, this.rotatedrect.h);
                var rotatefactor = markupobject.textrotate - rotRad360;
                var textp = markupobject.getRotatedMarkup(this.rotatedrect.x, this.rotatedrect.y, this.rotatedrect.w, this.rotatedrect.h, rotatefactor);
                this.rotatedrect.w = textp.x;
                this.rotatedrect.h = textp.y;
                if (this.textrotate / (Math.PI / 180) == 180 && rotation == 0) {
                    rotatefactor = markupobject.textrotate;
                    textp = markupobject.getRotatedMarkup(this.rotatedrect.x, this.rotatedrect.y, this.rotatedrect.w, this.rotatedrect.h, rotatefactor);
                    this.rotatedrect.w = textp.x;
                    this.rotatedrect.h = textp.y;
                }
                /*var txtx = Math.min(this.rotatedrect.x,this.rotatedrect.w);
                 var txtw = Math.max(this.rotatedrect.x,this.rotatedrect.w);
                 var txty = Math.min(this.rotatedrect.y,this.rotatedrect.h);
                 var txth = Math.max(this.rotatedrect.y,this.rotatedrect.h);

                 rotwidth = txtw - txtx;
                 rotheight = txth - txty;

                 var rotwidtheight = markupobject.getMarkupSelectPointRot(this.rotatedrect.w, this.rotatedrect.h,markupobject.textrotate);
                 this.rotatedrect.w = this.rotatedrect.x + rotwidtheight.x;
                 this.rotatedrect.h = this.rotatedrect.y + rotwidtheight.y;*/
            }
            if (this.type == 9 && this.subtype == 1) {
                if (rotation != 0) {
                    //markupobject.setRotatedMarkuprect(centercanvX, centercanvY, abswidthandheight,anglerad - (90 * (Math.PI / 180)));
                    //var textrectx1 = Math.min(this.rotatedrect.x, this.rotatedrect.w);
                    //var textrectx2 = Math.max(this.rotatedrect.x, this.rotatedrect.w);
                    //var textrecty1 = Math.min(this.rotatedrect.y, this.rotatedrect.h);
                    //var textrecty2 = Math.max(this.rotatedrect.y, this.rotatedrect.h);
                    //this.xscaled = textrectx1;
                    //this.yscaled = textrecty2;
                }
            }
            //this.getRotatedMarkuprect = function (centercanvX, centercanvY,abswidthandheight, anglerad){
            /*this.rotatedrect.x = this.xscaled;
             this.rotatedrect.y = this.yscaled;
             this.rotatedrect.w = this.wscaled;
             this.rotatedrect.h = this.hscaled;*/
        };
        this.PolygonArea = function () {
            var i = 0;
            var area = 0.0;
            var n = this.points.length;
            for (i = 0; i < n - 1; i++) {
                area += (this.points[i].x * this.points[i + 1].y) - (this.points[i + 1].x * this.points[i].y);
            }
            area += (this.points[n - 1].x * this.points[0].y) - (this.points[0].x * this.points[n - 1].y);
            return Math.abs(area / 2.0);
        };
        this.PolygonCentre = function (xy: any) {
            var centre = 0;
            var n = this.points.length;
            var i;
            if (xy == 'x') {
                if (n > 0) {
                    for (i = 0; i < n; i++) {
                        centre += this.points[i].x;
                    }
                    centre = centre / n;
                }
            }
            else {
                if (n > 0) {
                    for (i = 0; i < n; i++) {
                        centre += this.points[i].y;
                    }
                    centre = centre / n;
                }
            }
            return centre;
        };
        this.FindText = function (SearchExpr: any) {
            var found = false;
            var pos = this.text.search(SearchExpr);
            if (pos == -1) {
                found = false;
            }
            else if (pos >= 0) {
                found = true;
            }
            return found;
        };
        this.RotateText = function () {
        };
        this.AdjustForRotation = function (save: any) {
            var CanvRotRad = (360 - Globals.DocObj.pages[Globals.DocObj.currentpage].drotation) * (Math.PI / 180);
            var CanvRotRadOrig = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);
            var centercanvX = (Globals.canvasowidth / 2);
            var centercanvY = (Globals.canvasoheight / 2);
            var counter = 0;
            var lcounter = 0;
            let transpoint; //  = new point(); // TODO:JS->TS:CHECK
            var absX = 0;
            var absY = 0;
            var ulx = 0;
            var uly = 0;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation == 0) {
                return;
            }
            switch (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation) {
                case 0:
                    return;
                    break;
                case 90:
                    absX = this.x;
                    absY = this.y + this.h;
                    ulx = this.x + this.w;
                    uly = this.y;
                    break;
                case 180:
                    absX = this.x;
                    absY = this.y;
                    ulx = this.x + this.w;
                    uly = this.y + this.h;
                    break;
                case 270:
                    absX = this.x + this.w;
                    absY = this.y;
                    ulx = this.x;
                    uly = this.y + this.h;
                    break;
            }
            switch (this.type) {
                case 0: //eraser, pencil, marker
                    //for each point
                    //markupobject.setinitRotatedMarkuppoint(centercanvX, centercanvY,abswidthandheight, CanvRotRad);
                    //set new this.x and new this.y
                    for (lcounter = 0; lcounter < this.pointlist.length; lcounter++) {
                        for (counter = 0; counter < this.pointlist[lcounter].length; counter++) {
                            transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.pointlist[lcounter][counter].x, this.pointlist[lcounter][counter].y, CanvRotRad);
                            this.pointlist[lcounter][counter].x = transpoint.x;
                            this.pointlist[lcounter][counter].y = transpoint.y;
                        }
                    }
                    markupobject.findrectangle();
                    break;
                case 1: //polygons
                    //for each point
                    /*for (counter = 0; counter < this.points.length; counter++) {
                        transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.points[counter].x, this.points[counter].y, CanvRotRad);
                        this.points[counter].x = transpoint.x;
                        this.points[counter].y = transpoint.y;

                    }*/
                    //always start with point 0
                    if (!markupobject.firstpointset) {
                        transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.points[0].x, this.points[0].y, CanvRotRad);
                        this.points[0].x = transpoint.x;
                        this.points[0].y = transpoint.y;
                        markupobject.firstpointset = true;
                    }
                    else {
                        //test always setting this.
                    }
                    var curpoint = this.points.length - 1;
                    transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.points[curpoint].x, this.points[curpoint].y, CanvRotRad);
                    this.points[curpoint].x = transpoint.x;
                    this.points[curpoint].y = transpoint.y;
                    markupobject.findrectangle();
                    break;
                case 2: //Poly curves
                    //for each point
                    for (counter = 0; counter < this.points.length; counter++) {
                        transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.points[counter].x, this.points[counter].y, CanvRotRad);
                        this.points[counter].x = transpoint.x;
                        this.points[counter].y = transpoint.y;
                    }
                    markupobject.findrectangle();
                    break;
                case 3: //Rectangle
                    transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, ulx, uly, CanvRotRad);
                    this.x = transpoint.x;
                    this.y = transpoint.y;
                    transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, absX, absY, CanvRotRad);
                    this.w = transpoint.x - this.x;
                    this.h = transpoint.y - this.y;
                    break;
                case 4: //Oval
                    if (markupobject.subtype != 1){
                        transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, ulx, uly, CanvRotRad);
                        this.x = transpoint.x;
                        this.y = transpoint.y;

                        transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, absX, absY, CanvRotRad);
                        this.w = transpoint.x - this.x;
                        this.h = transpoint.y - this.y;
                    }else{
                        if(!save){
                            transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.x, this.y, CanvRotRad);
                            this.x = transpoint.x;
                            this.y = transpoint.y;

                            transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.w, this.h, CanvRotRad);
                            this.w = transpoint.x;
                            this.h = transpoint.y;
                        }else{
                            transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.x, this.y, CanvRotRadOrig);
                            this.x = transpoint.x;
                            this.y = transpoint.y;
                        }
                    }
                    break;
                case 5: //Cloud
                    transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, ulx, uly, CanvRotRad);
                    this.x = transpoint.x;
                    this.y = transpoint.y;
                    transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, absX, absY, CanvRotRad);
                    this.w = transpoint.x - this.x;
                    this.h = transpoint.y - this.y;
                    break;
                case 6: //line arrow etc.
                    if (!save) {
                        transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.x, this.y, CanvRotRad);
                        this.x = transpoint.x;
                        this.y = transpoint.y;
                        transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.w, this.h, CanvRotRad);
                        this.w = transpoint.x;
                        this.h = transpoint.y;
                    } else {
                        if(Globals.bOrthoOn){
                            console.log(this.w, this.h); // TODO:JS->TS:INFO remove console.log?
                            transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.w, this.h, CanvRotRadOrig);
                            this.w = transpoint.x;
                            this.h = transpoint.y;
                            console.log(this.w, this.h); // TODO:JS->TS:INFO remove console.log?
                        }

                        transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.x, this.y, CanvRotRadOrig);
                        this.x = transpoint.x;
                        this.y = transpoint.y;
                    }
                    //markupobject.setinitRotatedMarkuppoint(centercanvX, centercanvY,abswidthandheight, CanvRotRad);
                    break;
                case 7: //dimension line.
                    if (!save) {
                        transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.x, this.y, CanvRotRad);
                        this.x = transpoint.x;
                        this.y = transpoint.y;
                        transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.w, this.h, CanvRotRad);
                        this.w = transpoint.x;
                        this.h = transpoint.y;
                    }
                    else {
                        transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.x, this.y, CanvRotRadOrig);
                        this.x = transpoint.x;
                        this.y = transpoint.y;
                    }
                    break;
                case 8:
                    if (!this.firstpointrotAdjusted) {
                        transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.points[0].x, this.points[0].y, CanvRotRad);
                        this.points[0].x = transpoint.x;
                        this.points[0].y = transpoint.y;
                        this.firstpointrotAdjusted = true;
                    }
                    /*for (counter = 0; counter < this.points.length; counter++) {
                        transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.points[counter].x, this.points[counter].y, CanvRotRad);
                        this.points[counter].x = transpoint.x;
                        this.points[counter].y = transpoint.y;
                    }*/
                    if (this.points.length == 2) {
                        /*for (counter = 0; counter < this.points.length; counter++) {
                            transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.points[counter].x, this.points[counter].y, CanvRotRad);
                            this.points[counter].x = transpoint.x;
                            this.points[counter].y = transpoint.y;
                        }*/
                        /*var curpoint = this.points.length - 1;
                        var prevpoint = this.points.length - 2;
                        transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.points[curpoint].x, this.points[curpoint].y, CanvRotRad);
                        this.points[curpoint].x = transpoint.x;
                        this.points[curpoint].y = transpoint.y;*/
                    }
                    else {
                    }
                    var curpoint = this.points.length - 1;
                    transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.points[curpoint].x, this.points[curpoint].y, CanvRotRad);
                    this.points[curpoint].x = transpoint.x;
                    this.points[curpoint].y = transpoint.y;
                    markupobject.findrectangle();
                    break;
                case 9: //text markup
                    if (this.subtype == 1) {
                        transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, ulx, uly, CanvRotRad);
                        this.x = transpoint.x;
                        this.y = transpoint.y;
                        transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, absX, absY, CanvRotRad);
                        this.w = transpoint.x - this.x;
                        this.h = transpoint.y - this.y;
                    }
                    else {
                        transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.x, this.y, CanvRotRad);
                        this.x = transpoint.x;
                        this.y = transpoint.y;
                        this.textrotate = CanvRotRad;
                    }
                    /*if (markupobject.textrotate !=0){
                     var textp = markupobject.getRotatedMarkup(this.x,this.y,this.x+this.w,this.y-this.h,markupobject.textrotate);
                     this.rotatedrect.w = textp2.x;
                     this.rotatedrect.h = textp2.y;
                     }*/
                    break;
                case 10: //note markup
                    transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.x, this.y, CanvRotRad);
                    this.x = transpoint.x;
                    this.y = transpoint.y;
                    break;
                case 11:
                    transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.x, this.y, CanvRotRad);
                    this.x = transpoint.x;
                    this.y = transpoint.y;
                    /*transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY,absX,absY, CanvRotRad);
                     this.w = transpoint.x - this.x;
                     this.h = transpoint.y - this.y;*/
                    break;
                case 12: //stamp markup
                    transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, ulx, uly, CanvRotRad);
                    this.x = transpoint.x;
                    this.y = transpoint.y;
                    this.textrotate = CanvRotRad;
                    transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, absX, absY, CanvRotRad);
                    this.w = transpoint.x - this.x;
                    this.h = transpoint.y - this.y;
                    break;
                default:
                    break;
            }
        };
        /* Andriy notify get markup listeners */
        /* Andriy nocallback */
        this.notify = function () {
            RxCore_GUI_Markuplist.notify();
        };
        this.addsides = function () {
            this.sides = [];
            if (this.points.length > 0) {
                var side = {
                    x1: this.points[0].x,
                    y1: this.points[0].y,
                    x2: this.points[0].x,
                    y2: this.points[0].y
                };
                var counter = 0;
                //
                for (counter = 0; counter < this.points.length; counter++) {
                    if (counter == 0) {
                        side = {
                            x1: this.points[counter].x,
                            y1: this.points[counter].y,
                            x2: this.points[counter].x,
                            y2: this.points[counter].y
                        };
                    }
                    else if (counter > 0) {
                        side.x2 = this.points[counter].x;
                        side.y2 = this.points[counter].y;
                        this.sides.push({ x1: side.x1, y1: side.y1, x2: side.x2, y2: side.y2 });
                        side.x1 = this.points[counter].x;
                        side.y1 = this.points[counter].y;
                    }
                }
                if (this.sides[0] != undefined) {
                    side.x2 = this.sides[0].x1;
                    side.y2 = this.sides[0].y1;
                    this.sides.push({ x1: side.x1, y1: side.y1, x2: side.x2, y2: side.y2 });
                }
            }
        };
        this.savemetolistLoad = function (last: any) {
            markupobject.savemetolist(true, false, last);
        };
        this.savemetolistDraw = function () {
            markupobject.savemetolist(false, true);
        };
        this.savemetolist = function (preventNotification: any, draw: any, last: any) {
            markupobject.saved = true;
            //
            const bisCircle = (markupobject.type == 4 && markupobject.subtype == 1);
            if(markupobject.type == 0 || markupobject.type == 6 || markupobject.type == 7 || markupobject.type == 9
                || markupobject.type == 10 || markupobject.type == 11 || bisCircle) {
                if (draw && markupobject.bUsemouseinput) {
                    markupobject.AdjustForRotation(true);
                }
                markupobject.bUsemouseinput = true;
            }
            markupobject.markupnumber = getlastmarkupnumber();
            Globals.DocObj.markupdraworder[Globals.DocObj.markupdraworder.length] = Globals.DocObj.markuplist.length;
            Globals.DocObj.markuplist[Globals.DocObj.markuplist.length] = markupobject;
            //create undoboject where delete flag is true
            if (draw) {
                const undoobj = new MarkupUndoObject(markupobject.markupnumber);
                undoobj.SetUndoValues(markupobject);
                undoobj.delete = true;
                Globals.DocObj.markupundolist.push(undoobj);
            }
            //DocObj.markuplist[markupobject.markupnumber].selected = true;
            Globals.DocObj.nummarkups++;
            if (RxCore_GUI_Markuplist != undefined) {
                RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist, preventNotification);
            }
            if (last) {
                if (Rxcore_GUI_markupLoadComplete != undefined) {
                    Rxcore_GUI_markupLoadComplete.loadComplete(Globals.DocObj.markuplist, Globals.DocObj.fileindex);
                }
            }
            if (RxCore_GUI_pagethumbs != undefined) {
                RxCore_GUI_pagethumbs.setThumbnails(Globals.DocObj.thumbnails);
            }
        };
        this.rotate = function (x:any, y:any, corner:any) {
            var localx = x;
            var localy = y;
            var CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);
            var centercanvX = (Globals.canvasowidth / 2);
            var centercanvY = (Globals.canvasoheight / 2);
            var rotRad360 = 360 * (Math.PI / 180);
            var negrotRad180 = -180 * (Math.PI / 180);
            var rotRad180 = 180 * (Math.PI / 180);
            var scalefactor = 0.0;
            let rotatefactor = 0; // JS->TS:INFO initialized rotatefactor with 0
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector / markupobject.scaling;
            }
            else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                scalefactor = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf) / markupobject.scaling;
            }
            else {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale / markupobject.scaling;
            }
            /*var xscaled = this.x * scalefactor;
             var yscaled = this.y * scalefactor;
             var wscaled = this.w * scalefactor;
             var hscaled = this.h * scalefactor;*/
            var xscaled = (this.x - this.xoffset) * scalefactor;
            var yscaled = (this.y - this.yoffset) * scalefactor;
            var wscaled = this.w * scalefactor;
            var hscaled = this.h * scalefactor;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                xscaled = xscaled + Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                yscaled = yscaled + Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            }
            else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                xscaled = xscaled + Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                yscaled = yscaled + Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;
            }
            else {
                xscaled = xscaled + Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                yscaled = yscaled + Globals.DocObj.pages[Globals.DocObj.currentpage].dy;
            }
            var centerx = xscaled + (wscaled / 2);
            var centery = yscaled + (hscaled / 2);
            if (this.type == 9 && this.subtype == 0) {
                centerx = xscaled + (wscaled / 2);
                centery = yscaled - (hscaled / 2);
                rotatefactor = 0;
                if (this.textrotate != 0) {
                    rotatefactor = rotRad360 - this.textrotate;
                    var textscaled = this.textheight * scalefactor;
                    var textwscaled = this.textwidth * scalefactor;
                    var rmcenter = markupobject.getMarkupSelectPointRot(textwscaled / 2, -(textscaled / 2), markupobject.textrotate);
                    centerx = xscaled + rmcenter.x;
                    centery = yscaled + rmcenter.y;
                }
            }
            var width = centerx - localx;
            var height = centery - localy;
            var temprot = Math.atan2(height, width);
            if (temprot < -(Math.PI * 0.5)) {
                temprot += Math.PI * 2;
            }
            var markupcenter = markupobject.getRotatedMarkup(centercanvX, centercanvY, centerx, centery, CanvRotRad);
            var markupxy = markupobject.getRotatedMarkup(centercanvX, centercanvY, xscaled, yscaled, CanvRotRad);
            switch (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation) {
                case 0:
                    //localx = x;
                    //localy = y;
                    if (this.type == 9 && this.subtype == 0) {
                        markupobject.rotation = temprot - (Math.PI * 0.5) + rotatefactor;
                    }
                    else {
                        markupobject.rotation = temprot - (Math.PI * 0.5);
                    }
                    break;
                case 90:
                    //localx = y;
                    //localy = -x;
                    width = localx - markupcenter.x;
                    height = localy - markupcenter.y;
                    temprot = Math.atan2(height, width);
                    if (this.type == 9 && this.subtype == 0) {
                        markupobject.rotation = temprot - (Math.PI * 0.5) + CanvRotRad + rotatefactor;
                    }
                    else {
                        markupobject.rotation = temprot - (Math.PI * 0.5) + CanvRotRad;
                    }
                    break;
                case 180:
                    //localx = -x;
                    //localy = -y;
                    width = localx - markupcenter.x;
                    height = localy - markupcenter.y;
                    temprot = Math.atan2(height, width);
                    if (this.type == 9 && this.subtype == 0) {
                        markupobject.rotation = temprot - (Math.PI * 0.5) + rotatefactor;
                    }
                    else {
                        markupobject.rotation = temprot - (Math.PI * 0.5); // + CanvRotRad;
                    }
                    break;
                case 270:
                    //localx = -y;
                    //localy = x;
                    width = localx - markupcenter.x;
                    height = localy - markupcenter.y;
                    temprot = Math.atan2(height, width);
                    if (this.type == 9 && this.subtype == 0) {
                        markupobject.rotation = temprot - (Math.PI * 0.5) + CanvRotRad + rotatefactor;
                    }
                    else {
                        markupobject.rotation = temprot - (Math.PI * 0.5) + CanvRotRad;
                    }
                    break;
            }
            //rotation angle in radians
            //temprot = Math.atan2(height,width);
            //markupobject.rotation = temprot - (Math.PI*0.5) + CanvRotRad;
            switch (this.type) {
                case 0: //eraser, pencil, marker
                    //no rotation supported
                    markupobject.rotation = 0;
                    break;
                case 1: //polygons
                    //no rotation supported
                    markupobject.rotation = 0;
                    break;
                case 2: //Poly curves
                    //execute code block 2
                    markupobject.rotation = 0;
                    break;
                case 3: //Rectangle
                    break;
                case 4: //Oval
                    break;
                case 5: //Cloud
                    break;
                case 6: //line arrow etc.
                    //no rotation supported
                    markupobject.rotation = 0;
                    break;
                case 7: //dimension line.
                    //no rotation supported
                    markupobject.rotation = 0;
                    break;
                case 8:
                    //no rotation supported
                    markupobject.rotation = 0;
                    break;
                case 9: //text markup
                    break;
                case 12: //stamp markup
                    break;
                default:
                    break;
            }
            //var negrotRad180 = -180 * (Math.PI / 180);
            //var rotRad180 = 180 * (Math.PI / 180);
            if (markupobject.rotation < negrotRad180) {
                markupobject.rotation += rotRad360;
            }
            if (markupobject.rotation > rotRad180) {
                markupobject.rotation -= rotRad360;
            }
        };
        this.withinbounds = function (x:any, y:any) {
            var bwithin = false;
            var boundstartx = Globals.DocObj.pages[Globals.DocObj.currentpage].startx;
            var boundstarty = Globals.DocObj.pages[Globals.DocObj.currentpage].starty;
            var boundendx = Globals.DocObj.pages[Globals.DocObj.currentpage].endx;
            var boundendy = Globals.DocObj.pages[Globals.DocObj.currentpage].endy;
            let scalefactor;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector / markupobject.scaling;
            }
            else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                scalefactor = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf) / markupobject.scaling;
            }
            else {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale / markupobject.scaling;
            }
            //scalefactor = DocObj.pages[DocObj.currentpage].dscale / this.scaling;
            var thisx = this.x * scalefactor;
            var thisy = this.y * scalefactor;
            var thisw = this.w * scalefactor;
            var thish = this.h * scalefactor;
            switch (this.type) {
                case 0: //eraser, pencil, marker
                    break;
                case 1: //polygons
                    break;
                case 2: //Poly curves
                    break;
                case 3: //Rectangle
                    thisx = this.xscaled;
                    thisy = this.yscaled;
                    thisw = this.xscaled + this.wscaled;
                    thish = this.yscaled + this.hscaled;
                    break;
                case 4: //Oval
                    thisx = this.xscaled;
                    thisy = this.yscaled;
                    thisw = this.xscaled + this.wscaled;
                    thish = this.yscaled + this.hscaled;
                    break;
                case 5: //Cloud
                    thisx = this.xscaled;
                    thisy = this.yscaled;
                    thisw = this.xscaled + this.wscaled;
                    thish = this.yscaled + this.hscaled;
                    break;
                case 6: //line arrow etc.
                    break;
                case 7: //dimension line.
                    break;
                case 8:
                    break;
                case 9: //text markup
                    if (this.subtype == 0) {
                        thisx = this.xscaled;
                        thisy = this.yscaled;
                        thisw = this.xscaled + this.textwidth;
                        thish = this.yscaled - this.textheight;
                    }
                    else if (this.subtype == 1) {
                        thisx = this.xscaled;
                        thisy = this.yscaled;
                        thisw = this.xscaled + this.wscaled;
                        thish = this.yscaled + this.hscaled;
                    }
                    break;
                case 10: //text markup
                    thisx = this.xscaled;
                    thisy = this.yscaled;
                    thisw = this.xscaled + this.wscaled;
                    thish = this.yscaled + this.hscaled;
                    break;
                case 11: //image markup
                    thisx = this.xscaled;
                    thisy = this.yscaled;
                    thisw = this.xscaled + this.wscaled;
                    thish = this.yscaled + this.hscaled;
                    break;
                case 12: //stamp markup
                    thisx = this.xscaled;
                    thisy = this.yscaled;
                    thisw = this.xscaled + this.wscaled;
                    thish = this.yscaled + this.hscaled;
                    break;
                default:
                    break;
            }
            if (thisx + x > boundstartx) {
                if (thisy + y > boundstarty) {
                    if (thisw + x < boundendx) {
                        if (thish + y < boundendy) {
                            bwithin = true;
                        }
                    }
                }
            }
            return bwithin;
        };
        this.move = function (x: any, y: any) {
            var localx = x;
            var localy = y;
            var bMovepints = true;
            var bMovepintsx = true;
            var bMovepintsy = true;
            switch (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation) {
                case 0:
                    localx = x;
                    localy = y;
                    break;
                case 90:
                    localx = y;
                    localy = -x;
                    break;
                case 180:
                    localx = -x;
                    localy = -y;
                    break;
                case 270:
                    localx = -y;
                    localy = x;
                    break;
            }
            let xscalepoint = 0;
            let yscalepoint = 0;
            let scalefactor = 0.0;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector / markupobject.scaling;
            }
            else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                scalefactor = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf) / markupobject.scaling;
            }
            else {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale / markupobject.scaling;
            }
            //        scalefactor = DocObj.pages[DocObj.currentpage].dscale / this.scaling;
            let xscaled = this.x * scalefactor;
            let yscaled = this.y * scalefactor;
            let wscaled = this.w * scalefactor;
            let hscaled = this.h * scalefactor;
            //this.xscaled = (this.x - this.xoffset) * scalefactor;
            //this.yscaled = (this.y - this.yoffset) * scalefactor;

            //var pageobjdim = DocObj.pages[DocObj.currentpage].getpagerect();

            let startx = Globals.DocObj.pages[Globals.DocObj.currentpage].startx;
            let endx = Globals.DocObj.pages[Globals.DocObj.currentpage].endx;
            let starty = Globals.DocObj.pages[Globals.DocObj.currentpage].starty;
            let endy = Globals.DocObj.pages[Globals.DocObj.currentpage].endy;

            switch (this.type) {
                case 0: //eraser, pencil, marker
                    let counter = 0;
                    let lcounter = 0;
                    //var within = false;
                    xscaled = xscaled - localx;
                    yscaled = yscaled - localy;
                    wscaled -= localx;
                    hscaled -= localy;
                    /*if (bLimMarkupExtent){
                     if((this.xscaled - localx) < DocObj.pages[DocObj.currentpage].startx || (this.xscaled - localx) > DocObj.pages[DocObj.currentpage].endx){
                     xscaled = xscaled + localx;
                     wscaled += localx;
                     bMovepints = false;

                     }
                     if(this.yscaled - localy <DocObj.pages[DocObj.currentpage].starty || this.yscaled - localy > DocObj.pages[DocObj.currentpage].endy){
                     yscaled = yscaled + localy;
                     hscaled += localy;
                     bMovepints = false;
                     }
                     }*/
                    //set new this.x and new this.y
                    /*if (bLimMarkupExtent){
                     if(this.wscaled - localx < DocObj.pages[DocObj.currentpage].startx || this.wscaled - localx > DocObj.pages[DocObj.currentpage].endx){
                     xscaled += localx;
                     wscaled += localx;
                     bMovepints = false;

                     }
                     if(this.hscaled - localy <DocObj.pages[DocObj.currentpage].starty || this.hscaled - localy > DocObj.pages[DocObj.currentpage].endy){
                     yscaled += localy;
                     hscaled += localy;
                     bMovepints = false;
                     }
                     }*/
                    this.x = xscaled / scalefactor;
                    this.y = yscaled / scalefactor;
                    if (this.subtype == 1 || this.subtype == 0) {
                        this.w = wscaled / scalefactor;
                        this.h = hscaled / scalefactor;
                        //set new this.x and new this.y
                        if (bMovepints) {
                            for (lcounter = 0; lcounter < this.pointlist.length; lcounter++) {
                                for (counter = 0; counter < this.pointlist[lcounter].length; counter++) {
                                    xscalepoint = this.pointlist[lcounter][counter].x * scalefactor;
                                    yscalepoint = this.pointlist[lcounter][counter].y * scalefactor;
                                    xscalepoint = xscalepoint - localx;
                                    yscalepoint = yscalepoint - localy;
                                    /*if (bLimMarkupExtent){
                                     if(xscalepoint < DocObj.pages[DocObj.currentpage].startx || xscalepoint > DocObj.pages[DocObj.currentpage].endx){
                                     xscalepoint += localx;

                                     }
                                     if(yscalepoint <DocObj.pages[DocObj.currentpage].starty || yscalepoint > DocObj.pages[DocObj.currentpage].endy){
                                     yscalepoint += localy;
                                     }
                                     }*/
                                    this.pointlist[lcounter][counter].x = xscalepoint / scalefactor;
                                    this.pointlist[lcounter][counter].y = yscalepoint / scalefactor;
                                }
                            }
                        }
                        else {
                            this.findrectangle();
                        }
                        //this.findrectangle();
                    }
                    break;
                case 1: //polygons
                    let pcounter = 0;
                    //var within = false;
                    //wscaled = wscaled - localx;
                    //hscaled = hscaled - localy;
                    xscaled = xscaled - localx;
                    yscaled = yscaled - localy;
                    wscaled -= localx;
                    hscaled -= localy;
                    if (Globals.bLimMarkupExtent) {
                        if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                            xscaled = xscaled + localx;
                            wscaled += localx;
                            bMovepints = false;
                        }
                        if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                            yscaled = yscaled + localy;
                            hscaled += localy;
                            bMovepints = false;
                        }
                    }
                    //set new this.x and new this.y
                    if (Globals.bLimMarkupExtent) {
                        if (this.wscaled - localx < startx || this.wscaled - localx > endx) {
                            wscaled += localx;
                            xscaled = xscaled + localx;
                            bMovepints = false;
                        }
                        if (this.hscaled - localy < starty || this.hscaled - localy > endy) {
                            hscaled += localy;
                            yscaled = yscaled + localy;
                            bMovepints = false;
                        }
                    }
                    this.x = xscaled / scalefactor;
                    this.y = yscaled / scalefactor;
                    this.w = wscaled / scalefactor;
                    this.h = hscaled / scalefactor;
                    xscalepoint = 0;
                    yscalepoint = 0;
                    //set new this.x and new this.y
                    if (bMovepints) {
                        for (pcounter = 0; pcounter < this.points.length; pcounter++) {
                            xscalepoint = this.points[pcounter].x * scalefactor;
                            yscalepoint = this.points[pcounter].y * scalefactor;
                            xscalepoint -= localx;
                            yscalepoint -= localy;
                            /*if (bLimMarkupExtent){
                             if(xscalepoint < DocObj.pages[DocObj.currentpage].startx || xscalepoint > DocObj.pages[DocObj.currentpage].endx){
                             xscalepoint += localx;

                             }
                             if(yscalepoint <DocObj.pages[DocObj.currentpage].starty || yscalepoint > DocObj.pages[DocObj.currentpage].endy){
                             yscalepoint += localy;
                             }
                             }*/
                            this.points[pcounter].x = xscalepoint / scalefactor;
                            this.points[pcounter].y = yscalepoint / scalefactor;
                        }
                        this.findrectangle();
                    }
                    else {
                        this.findrectangle();
                    }
                    //this.findrectangle();
                    break;
                case 2: //Poly curves
                    let curcounter = 0;
                    //var within = false;
                    xscaled = xscaled - localx;
                    yscaled = yscaled - localy;
                    wscaled -= localx;
                    hscaled -= localy;
                    if (Globals.bLimMarkupExtent) {
                        if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                            xscaled = xscaled + localx;
                            wscaled += localx;
                            bMovepints = false;
                        }
                        if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                            yscaled = yscaled + localy;
                            hscaled += localy;
                            bMovepints = false;
                        }
                    }
                    if (Globals.bLimMarkupExtent) {
                        if (wscaled < startx || wscaled > endx) {
                            xscaled += localx;
                            wscaled += localx;
                            bMovepints = false;
                        }
                        if (this.hscaled - localy < starty || this.hscaled - localy > endy) {
                            yscaled += localy;
                            hscaled += localy;
                            bMovepints = false;
                        }
                    }
                    //set new this.x and new this.y
                    this.x = xscaled / scalefactor;
                    this.y = yscaled / scalefactor;
                    this.w = wscaled / scalefactor;
                    this.h = hscaled / scalefactor;
                    //set new this.x and new this.y
                    if (bMovepints) {
                        for (curcounter = 0; curcounter < this.points.length; curcounter++) {
                            xscalepoint = this.points[curcounter].x * scalefactor;
                            yscalepoint = this.points[curcounter].y * scalefactor;
                            xscalepoint -= localx;
                            yscalepoint -= localy;
                            /*if (bLimMarkupExtent){
                             if(xscalepoint < DocObj.pages[DocObj.currentpage].startx || xscalepoint > DocObj.pages[DocObj.currentpage].endx){
                             xscalepoint += localx;


                             }
                             if(yscalepoint <DocObj.pages[DocObj.currentpage].starty || yscalepoint > DocObj.pages[DocObj.currentpage].endy){
                             yscalepoint += localy;

                             }
                             }*/
                            this.points[curcounter].x = xscalepoint / scalefactor;
                            this.points[curcounter].y = yscalepoint / scalefactor;
                        }
                    }
                    else {
                        this.findrectangle();
                    }
                    break;
                case 3: //Rectangle
                    xscaled = xscaled - localx;
                    yscaled = yscaled - localy;
                    if (Globals.bLimMarkupExtent) {
                        if ((this.xscaled - localx) < startx || (this.xscaled + localx) > endx) {
                            xscaled = xscaled + localx;
                        }
                        if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                            yscaled = yscaled + localy;
                        }
                    }
                    //set new this.x and new this.y
                    if (Globals.bLimMarkupExtent) {
                        if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                            xscaled = xscaled + localx;
                        }
                        if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                            yscaled = yscaled + localy;
                        }
                    }
                    this.x = xscaled / scalefactor;
                    this.y = yscaled / scalefactor;
                    break;
                case 4: //Oval
                    xscaled = xscaled - localx;
                    yscaled = yscaled - localy;

                    let xscaledactual = (this.x - this.xoffset) * scalefactor;
                    let yscaledactual = (this.y - this.yoffset) * scalefactor;
                    xscaledactual += startx;
                    yscaledactual += starty;

                    xscaledactual -= localx;
                    yscaledactual -= localy;

                    if (this.subtype == 1) {
                        wscaled -= localx;
                        hscaled -= localy;

                        let xdiff = Math.max(xscaled, wscaled) - Math.min(xscaled, wscaled);
                        let ydiff = Math.max(yscaled, hscaled) - Math.min(yscaled, hscaled);

                        let radius = markupobject.getdiag(xdiff, ydiff);

                        if (Globals.bLimMarkupExtent) {
                            if ((xscaledactual - radius) < startx || (xscaledactual + radius) > endx) {
                                xscaled = xscaled + localx;
                                wscaled += localx;
                                //yscaled = yscaled + localy;
                            }
                            if ((yscaledactual - radius) < starty || (yscaledactual + radius) > endy) {
                                //xscaled = xscaled + localx;
                                yscaled = yscaled + localy;
                                hscaled += localy;
                            }
                        }
                        this.w = wscaled / scalefactor;
                        this.h = hscaled / scalefactor;

                        this.x = xscaled / scalefactor;
                        this.y = yscaled / scalefactor;
                    }
                    else {
                        if (Globals.bLimMarkupExtent) {
                            if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                                xscaled = xscaled + localx;
                            }
                            if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                                yscaled = yscaled + localy;
                            }
                        }
                        //set new this.x and new this.y
                        this.x = xscaled / scalefactor;
                        this.y = yscaled / scalefactor;
                        if (Globals.bLimMarkupExtent) {
                            if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                xscaled = xscaled + localx;
                            }
                            if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                yscaled = yscaled + localy;
                            }
                            this.x = xscaled / scalefactor;
                            this.y = yscaled / scalefactor;
                        }
                    }
                    break;
                case 5: //Cloud
                    xscaled = xscaled - localx;
                    yscaled = yscaled - localy;
                    if (Globals.bLimMarkupExtent) {
                        if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                            xscaled = xscaled + localx;
                        }
                        if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                            yscaled = yscaled + localy;
                        }
                    }
                    //set new this.x and new this.y
                    this.x = xscaled / scalefactor;
                    this.y = yscaled / scalefactor;
                    if (Globals.bLimMarkupExtent) {
                        if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                            xscaled = xscaled + localx;
                        }
                        if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                            yscaled = yscaled + localy;
                        }
                        this.x = xscaled / scalefactor;
                        this.y = yscaled / scalefactor;
                    }
                    break;
                case 6: //line arrow etc.
                    xscaled = xscaled - localx;
                    yscaled = yscaled - localy;
                    if (Globals.bLimMarkupExtent) {
                        if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                            wscaled += localx;
                            xscaled += localx;
                        }
                        if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                            hscaled += localy;
                            yscaled += localy;
                        }
                    }
                    //set new this.x and new this.y
                    wscaled -= localx;
                    hscaled -= localy;
                    if (Globals.bLimMarkupExtent) {
                        if (this.wscaled - localx < startx || this.wscaled - localx > endx) {
                            wscaled += localx;
                            xscaled += localx;
                        }
                        if (this.hscaled - localy < starty || this.hscaled - localy > endy) {
                            hscaled += localy;
                            yscaled += localy;
                        }
                    }
                    this.x = xscaled / scalefactor;
                    this.y = yscaled / scalefactor;
                    this.w = wscaled / scalefactor;
                    this.h = hscaled / scalefactor;
                    break;
                case 7: //dimension line.
                    xscaled = xscaled - localx;
                    yscaled = yscaled - localy;
                    if (Globals.bLimMarkupExtent) {
                        if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                            wscaled += localx;
                            xscaled += localx;
                        }
                        if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                            hscaled += localy;
                            yscaled += localy;
                        }
                    }
                    //set new this.x and new this.y
                    wscaled -= localx;
                    hscaled -= localy;
                    if (Globals.bLimMarkupExtent) {
                        if (this.wscaled - localx < startx || this.wscaled - localx > endx) {
                            wscaled += localx;
                            xscaled += localx;
                        }
                        if (this.hscaled - localy < starty || this.hscaled - localy > endy) {
                            hscaled += localy;
                            yscaled += localy;
                        }
                    }
                    this.x = xscaled / scalefactor;
                    this.y = yscaled / scalefactor;
                    this.w = wscaled / scalefactor;
                    this.h = hscaled / scalefactor;
                    break;
                case 8:
                    var acounter = 0;
                    //var within = false;
                    xscaled = xscaled - localx;
                    yscaled = yscaled - localy;
                    wscaled -= localx;
                    hscaled -= localy;
                    if (Globals.bLimMarkupExtent) {
                        if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                            xscaled += localx;
                            wscaled += localx;
                            bMovepints = false;
                        }
                        if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                            yscaled += localy;
                            hscaled += localy;
                            bMovepints = false;
                        }
                    }
                    if (Globals.bLimMarkupExtent) {
                        if (this.wscaled - localx < startx || this.wscaled - localx > endx) {
                            xscaled += localx;
                            wscaled += localx;
                            bMovepints = false;
                        }
                        if (this.hscaled - localy < starty || this.hscaled - localy > endy) {
                            yscaled += localy;
                            hscaled += localy;
                            bMovepints = false;
                        }
                    }
                    this.x = xscaled / scalefactor;
                    this.y = yscaled / scalefactor;
                    this.w = wscaled / scalefactor;
                    this.h = hscaled / scalefactor;
                    //set new this.x and new this.y
                    if (bMovepints) {
                        for (acounter = 0; acounter < this.points.length; acounter++) {
                            xscalepoint = this.points[acounter].x * scalefactor;
                            yscalepoint = this.points[acounter].y * scalefactor;
                            xscalepoint -= localx;
                            yscalepoint -= localy;
                            /*if (bLimMarkupExtent){
                             if(xscalepoint < DocObj.pages[DocObj.currentpage].startx || xscalepoint > DocObj.pages[DocObj.currentpage].endx){
                             xscalepoint += localx;

                             }
                             if(yscalepoint <DocObj.pages[DocObj.currentpage].starty || yscalepoint > DocObj.pages[DocObj.currentpage].endy){
                             yscalepoint += localy;
                             }
                             }*/
                            this.points[acounter].x = xscalepoint / scalefactor;
                            this.points[acounter].y = yscalepoint / scalefactor;
                        }
                    }
                    else {
                        this.findrectangle();
                    }
                    this.findrectangle();
                    break;
                case 9: //text markup
                    var textwscaled = this.textwidth * scalefactor;
                    xscaled = xscaled - localx;
                    yscaled = yscaled - localy;
                    var switchval = wscaled;
                    switch (this.textrotate / (Math.PI / 180)) {
                        case 0:
                            break;
                        case 90:
                            wscaled = hscaled;
                            hscaled = switchval;
                            break;
                        case 180:
                            break;
                        case 270:
                            wscaled = hscaled;
                            hscaled = switchval;
                            break;
                    }
                    if (Globals.bLimMarkupExtent) {
                        if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                            xscaled += localx;
                        }
                        if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                            yscaled += localy;
                        }
                    }
                    if (Globals.bLimMarkupExtent) {
                        if ((this.xscaled + wscaled) - localx < startx || (this.xscaled + wscaled) - localx > endx) {
                            xscaled = xscaled + localx;
                        }
                        if (this.subtype == 1) {
                            if ((this.yscaled + hscaled) - localy < starty || (this.yscaled + hscaled) - localy > endy) {
                                yscaled = yscaled + localy;
                            }
                        }
                        else {
                            if ((this.yscaled - hscaled) - localy < starty || (this.yscaled - hscaled) - localy > endy) {
                                yscaled = yscaled + localy;
                            }
                        }
                    }
                    this.x = xscaled / scalefactor;
                    this.y = yscaled / scalefactor;
                    break;
                case 10:
                    xscaled = xscaled - localx;
                    yscaled = yscaled - localy;
                    if (Globals.bLimMarkupExtent) {
                        if ((this.xscaled - localx) < startx || (this.xscaled + localx) > endx) {
                            xscaled = xscaled + localx;
                        }
                        if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                            yscaled = yscaled + localy;
                        }
                    }
                    //set new this.x and new this.y
                    if (Globals.bLimMarkupExtent) {
                        if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                            xscaled = xscaled + localx;
                        }
                        if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                            yscaled = yscaled + localy;
                        }
                    }
                    this.x = xscaled / scalefactor;
                    this.y = yscaled / scalefactor;
                    break;
                case 11:
                    xscaled = xscaled - localx;
                    yscaled = yscaled - localy;
                    if (Globals.bLimMarkupExtent) {
                        if ((this.xscaled - localx) < startx || (this.xscaled + localx) > endx) {
                            xscaled = xscaled + localx;
                        }
                        if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                            yscaled = yscaled + localy;
                        }
                    }
                    //set new this.x and new this.y
                    if (Globals.bLimMarkupExtent) {
                        if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                            xscaled = xscaled + localx;
                        }
                        if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                            yscaled = yscaled + localy;
                        }
                    }
                    this.x = xscaled / scalefactor;
                    this.y = yscaled / scalefactor;
                    break;
                case 12: //stamp markup
                    xscaled = xscaled - localx;
                    yscaled = yscaled - localy;
                    if (Globals.bLimMarkupExtent) {
                        if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                            xscaled += localx;
                        }
                        if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                            yscaled += localy;
                        }
                    }
                    if (Globals.bLimMarkupExtent) {
                        if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                            xscaled = xscaled + localx;
                        }
                        if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                            yscaled = yscaled + localy;
                        }
                    }
                    this.x = xscaled / scalefactor;
                    this.y = yscaled / scalefactor;
                    break;
                default:
                    break;
            }
            /*if (!this.withinbounds(localx,localy) && bLimMarkupExtent){
             this.x = restorex;
             this.y =  restorey;
             this.w = restorew;
             this.h = restoreh;
             }*/
        };
        this.dimextend = function (x: any, y: any) {
            //method only for dimensions.
            var centercanvX = (Globals.canvasowidth / 2);
            var centercanvY = (Globals.canvasoheight / 2);
            var CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);
            switch (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation) {
                case 0:
                    CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);
                    break;
                case 90:
                    CanvRotRad = (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation + 180) * (Math.PI / 180);
                    break;
                case 270:
                    CanvRotRad = (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation - 180) * (Math.PI / 180);
                    break;
                case 180:
                    CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);
                    break;
            }
            //var orgmousepoint = {x:x,y:y};
            //var pagerotation = DocObj.pages[DocObj.currentpage].drotation;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                var rotmousepoint = markupobject.getRotatedMarkup(centercanvX, centercanvY, x, y, CanvRotRad);
                x = rotmousepoint.x;
                y = rotmousepoint.y;
            }
            var scalefactor;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector / markupobject.scaling;
            }
            else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                scalefactor = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf) / markupobject.scaling;
            }
            else {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale / markupobject.scaling;
            }
            var mp = {
                x: x,
                y: y
            };
            var lp1 = {
                x: this.xscaled,
                y: this.yscaled
            };
            var lp2 = {
                x: this.wscaled,
                y: this.hscaled
            };
            var side = ((mp.x - lp1.x) * (lp2.y - lp1.y)) - ((mp.y - lp1.y) * (lp2.x - lp1.x));
            //console.log(side);
            var linedistance = distToSegment(mp, lp1, lp2);
            if (side > 0) {
                markupobject.leaderoffset = -(linedistance / scalefactor);
            }
            else {
                markupobject.leaderoffset = (linedistance / scalefactor);
            }
            if (linedistance < 1) {
                markupobject.leaderoffset = 0;
                //console.log('can get to 0');
            }
            ;
            //this.setDimOffset
            /*if (distToSegment(mp, lp1, lp2) < 10) {
                within = true;
                this.editaction = 1;
            }*/
        };
        this.scale = function (x: any, y: any, corner: any, ctx: any) {
            var localx = x;
            var localy = y;
            var tempx = 0;
            var tempy = 0;
            switch (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation) {
                case 0:
                    localx = x;
                    localy = y;
                    break;
                case 90:
                    localx = y;
                    localy = -x;
                    break;
                case 180:
                    localx = -x;
                    localy = -y;
                    break;
                case 270:
                    localx = -y;
                    localy = x;
                    break;
            }
            if (markupobject.rotation != 0) {
                tempx = localx;
                tempy = localy;
                const calcrot = -markupobject.rotation;
                localx = (tempx * Math.cos(calcrot)) - (tempy * Math.sin(calcrot));
                localy = (tempx * Math.sin(calcrot)) + (tempy * Math.cos(calcrot));
            }
            // var pageobjdim = Globals.DocObj.pages[Globals.DocObj.currentpage].getpagerect();

            let startx = Globals.DocObj.pages[Globals.DocObj.currentpage].startx;
            let endx = Globals.DocObj.pages[Globals.DocObj.currentpage].endx;
            let starty = Globals.DocObj.pages[Globals.DocObj.currentpage].starty;
            let endy = Globals.DocObj.pages[Globals.DocObj.currentpage].endy;


            /* var startx = pageobjdim.x;
            var endx = pageobjdim.x + pageobjdim.w;
            var starty = pageobjdim.y;
            var endy = pageobjdim.y + pageobjdim.h; */

            /*
             Andriy: Unused variables

             var xscalepoint = 0;
             var yscalepoint = 0;*/
            let scalefactor;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector / markupobject.scaling;
            }
            else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                scalefactor = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf) / markupobject.scaling;
            }
            else {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale / markupobject.scaling;
            }
            //var scalefactor = DocObj.pages[DocObj.currentpage].dscale / this.scaling;
            //var scalefactor = dscale / this.scaling;
            let xscaled = this.x * scalefactor;
            let yscaled = this.y * scalefactor;
            let wscaled = this.w * scalefactor;
            let hscaled = this.h * scalefactor;
            /*
             Unused variables
             var restorex = this.x;
             var restorey = this.y;
             var restorew = this.w;
             var restoreh = this.h;*/
            switch (this.type) {
                case 0: //pencil, marker, eraser, (currently not in use)
                    //var scalefactor = dscale / this.scaling;
                    //var counter = 0;
                    /*for (counter=0;counter<this.points.length;counter++){
                     xscalepoint = this.points[counter].x * scalefactor;
                     yscalepoint = this.points[counter].y * scalefactor;
                     this.points[counter].x = xscalepoint - localx;
                     this.points[counter].y = yscalepoint - localy;
                     }*/
                    //var xscaled = this.x * scalefactor;
                    //var yscaled = this.y * scalefactor;
                    //var wscaled = this.w * scalefactor;
                    //var hscaled = this.h * scalefactor;
                    //wscaled -= localx;
                    //hscaled -= localy;
                    //this.w = wscaled/scalefactor;
                    //this.h = hscaled/scalefactor;
                    break;
                case 1: //polygon, (currently not in use)
                    break;
                case 2: //polycurves, (currently not in use)
                    break;
                case 3: //rectangle
                    switch (corner) {
                        case 4:
                            wscaled -= localx;
                            hscaled -= localy;
                            if (Globals.bLimMarkupExtent) {
                                if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                    wscaled = wscaled + localx;
                                }
                                if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                    hscaled = hscaled + localy;
                                }
                            }
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            break;
                        case 1:
                            xscaled -= localx;
                            yscaled -= localy;
                            wscaled += localx;
                            hscaled += localy;
                            if (Globals.bLimMarkupExtent) {
                                if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                                    xscaled = xscaled + localx;
                                    wscaled = wscaled - localx;
                                }
                                if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                    wscaled = wscaled - localx;
                                    xscaled = xscaled + localx;
                                }
                                if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                                    yscaled = yscaled + localy;
                                    hscaled = hscaled - localy;
                                }
                                if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                    yscaled = yscaled + localy;
                                    hscaled = hscaled - localy;
                                }
                            }
                            this.x = xscaled / scalefactor;
                            this.y = yscaled / scalefactor;
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            break;
                        case 3:
                            xscaled -= localx;
                            //yscaled -= localy;
                            wscaled += localx;
                            hscaled -= localy;
                            if (Globals.bLimMarkupExtent) {
                                if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                                    xscaled = xscaled + localx;
                                    wscaled = wscaled - localx;
                                }
                                if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                    xscaled = xscaled + localx;
                                    wscaled = wscaled - localx;
                                }
                                /*if(this.yscaled - localy <DocObj.pages[DocObj.currentpage].starty || this.yscaled - localy > DocObj.pages[DocObj.currentpage].endy){
                                 yscaled = yscaled + localy;
                                 //hscaled = hscaled - localy;
                                 }*/
                                 if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                    hscaled = hscaled + localy;
                                    yscaled = yscaled - localy;
                                }
                            }
                            this.x = xscaled / scalefactor;
                            //this.y = yscaled/scalefactor;
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            break;
                        case 2:
                            //xscaled -= localx;
                            yscaled -= localy;
                            wscaled -= localx;
                            hscaled += localy;
                            if (Globals.bLimMarkupExtent) {
                                /*if(this.xscaled - localx < DocObj.pages[DocObj.currentpage].startx || this.xscaled - localx > DocObj.pages[DocObj.currentpage].endx){
                                 xscaled = xscaled + localx;
                                 wscaled = wscaled - localx;

                                 }*/
                                 if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                    xscaled = xscaled - localx;
                                    wscaled = wscaled + localx;
                                }
                                if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                                    yscaled = yscaled + localy;
                                    hscaled = hscaled - localy;
                                }
                                if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                    hscaled = hscaled - localy;
                                    yscaled = yscaled + localy;
                                }
                            }
                            //this.x = xscaled/scalefactor;
                            this.y = yscaled / scalefactor;
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            break;
                    }
                    break;
                case 4: //Oval
                    switch (corner) {
                        case 4:
                            if (this.subtype == 1) {

                                let wscaledactual = (this.w - this.xoffset) * scalefactor;
                                let hscaledactual = (this.h - this.yoffset) * scalefactor;
                                wscaledactual += startx;
                                hscaledactual += starty;

                                wscaledactual -= localx;
                                hscaledactual -= localy;

                                wscaled -= localx;
                                hscaled -= localy;
                                let xdiff = Math.max(this.xscaled, this.wscaled) - Math.min(this.xscaled, this.wscaled);
                                let ydiff = Math.max(this.yscaled, this.hscaled) - Math.min(this.yscaled, this.hscaled);

                                let newxdiff = Math.max(this.xscaled, wscaledactual) - Math.min(this.xscaled, wscaledactual);
                                let newydiff = Math.max(this.yscaled, hscaledactual) - Math.min(this.yscaled, hscaledactual);

                                let oldradius = markupobject.getdiag(xdiff, ydiff);
                                let curradius = markupobject.getdiag(newxdiff, newydiff);
                                //add 10 percent to prevent moving outside.
                                //oldradius = oldradius + (oldradius * 0.1);

                                if (Globals.bLimMarkupExtent) {
                                    if ((this.xscaled - curradius) < startx || (this.xscaled + curradius) > endx) {
                                        wscaled = wscaled + localx;
                                        hscaled = hscaled + localy;
                                        if(curradius < oldradius){  // TODO:JS->TS:CHECK conditional block that does nothing
                                            //proceed
                                        }else{

                                        }
                                    }
                                    if ((this.yscaled - curradius) < starty || (this.yscaled + curradius) > endy) {
                                        wscaled = wscaled + localx;
                                        hscaled = hscaled + localy;
                                        if(curradius < oldradius){ // TODO:JS->TS:CHECK conditional block that does nothing
                                            //proceed
                                        }else{

                                        }
                                    }
                                }
                                markupobject.radiusCallback(this.x, this.y, this.w, this.h, true); // TODO:JS->TS:CHECK used markupobject as a reference to the MarkupObject instance
                                // this.radiusCallback = function(x,y, w, h, useabs){
                            } else {
                                wscaled -= localx;
                                hscaled -= localy;
                                if (Globals.bLimMarkupExtent) {
                                    if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                        wscaled = wscaled + localx;
                                    }
                                    if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                        hscaled = hscaled + localy;
                                    }
                                }
                            }
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            break;
                        case 1:
                            xscaled -= localx;
                            yscaled -= localy;
                            wscaled += localx;
                            hscaled += localy;
                            if (Globals.bLimMarkupExtent) {
                                if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                                    xscaled = xscaled + localx;
                                    wscaled -= localx;
                                }
                                if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                                    yscaled = yscaled + localy;
                                    hscaled -= localy;
                                }
                            }
                            this.x = xscaled / scalefactor;
                            this.y = yscaled / scalefactor;
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            break;
                        case 3:
                            xscaled -= localx;
                            //yscaled -= localy;
                            wscaled += localx;
                            hscaled -= localy;
                            if (Globals.bLimMarkupExtent) {
                                if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                                    xscaled = xscaled + localx;
                                    wscaled = wscaled - localx;
                                }
                                if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                    xscaled = xscaled + localx;
                                    wscaled = wscaled - localx;
                                }
                                /*if(this.yscaled - localy <DocObj.pages[DocObj.currentpage].starty || this.yscaled - localy > DocObj.pages[DocObj.currentpage].endy){
                                 yscaled = yscaled + localy;
                                 //hscaled = hscaled - localy;
                                 }*/
                                 if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                    hscaled = hscaled + localy;
                                    yscaled = yscaled - localy;
                                }
                            }
                            this.x = xscaled / scalefactor;
                            //this.y = yscaled/scalefactor;
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            break;
                        case 2:
                            //xscaled -= localx;
                            yscaled -= localy;
                            wscaled -= localx;
                            hscaled += localy;
                            if (Globals.bLimMarkupExtent) {
                                /*if(this.xscaled - localx < DocObj.pages[DocObj.currentpage].startx || this.xscaled - localx > DocObj.pages[DocObj.currentpage].endx){
                                 xscaled = xscaled + localx;
                                 wscaled = wscaled - localx;

                                 }*/
                                if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                    xscaled = xscaled - localx;
                                    wscaled = wscaled + localx;
                                }
                                if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                                    yscaled = yscaled + localy;
                                    hscaled = hscaled - localy;
                                }
                                if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                    hscaled = hscaled - localy;
                                    yscaled = yscaled + localy;
                                }
                            }
                            //this.x = xscaled/scalefactor;
                            this.y = yscaled / scalefactor;
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            break;
                    }
                    /*if(corner == 4){
                     wscaled -= localx;
                     hscaled -= localy;

                     if (bLimMarkupExtent){
                     if((this.xscaled + this.wscaled) - localx < DocObj.pages[DocObj.currentpage].startx || (this.xscaled + this.wscaled) - localx > DocObj.pages[DocObj.currentpage].endx){
                     wscaled = wscaled + localx;

                     }
                     if((this.yscaled + this.hscaled)-localy <DocObj.pages[DocObj.currentpage].starty || (this.yscaled + this.hscaled)-localy > DocObj.pages[DocObj.currentpage].endy){
                     hscaled = hscaled + localy;
                     }

                     }

                     this.w = wscaled/scalefactor;
                     this.h = hscaled/scalefactor;

                     }
                     if (corner == 1){
                     xscaled -= localx;
                     yscaled -= localy;
                     wscaled += localx;
                     hscaled += localy;

                     if (bLimMarkupExtent){
                     if(this.xscaled - localx < DocObj.pages[DocObj.currentpage].startx || this.xscaled - localx > DocObj.pages[DocObj.currentpage].endx){
                     xscaled = xscaled + localx;

                     }
                     if(this.yscaled - localy <DocObj.pages[DocObj.currentpage].starty || this.yscaled - localy > DocObj.pages[DocObj.currentpage].endy){
                     yscaled = yscaled + localy;
                     }

                     }

                     this.x = xscaled/scalefactor;
                     this.y = yscaled/scalefactor;
                     this.w = wscaled/scalefactor;
                     this.h = hscaled/scalefactor;

                     }*/
                    break;
                case 5: //Cloud
                    /*if(corner == 4){
                     wscaled -= localx;
                     hscaled -= localy;
                     if (bLimMarkupExtent){
                     if((this.xscaled + this.wscaled) - localx < DocObj.pages[DocObj.currentpage].startx || (this.xscaled + this.wscaled) - localx > DocObj.pages[DocObj.currentpage].endx){
                     wscaled = wscaled + localx;

                     }
                     if((this.yscaled + this.hscaled)-localy <DocObj.pages[DocObj.currentpage].starty || (this.yscaled + this.hscaled)-localy > DocObj.pages[DocObj.currentpage].endy){
                     hscaled = hscaled + localy;
                     }

                     }

                     this.w = wscaled/scalefactor;
                     this.h = hscaled/scalefactor;

                     }
                     if (corner == 1){
                     xscaled -= localx;
                     yscaled -= localy;
                     wscaled += localx;
                     hscaled += localy;

                     if (bLimMarkupExtent){
                     if(this.xscaled - localx < DocObj.pages[DocObj.currentpage].startx || this.xscaled - localx > DocObj.pages[DocObj.currentpage].endx){
                     xscaled = xscaled + localx;

                     }
                     if(this.yscaled - localy <DocObj.pages[DocObj.currentpage].starty || this.yscaled - localy > DocObj.pages[DocObj.currentpage].endy){
                     yscaled = yscaled + localy;
                     }

                     }

                     this.x = xscaled/scalefactor;
                     this.y = yscaled/scalefactor;
                     this.w = wscaled/scalefactor;
                     this.h = hscaled/scalefactor;

                     }*/
                    switch (corner) {
                        case 4:
                            wscaled -= localx;
                            hscaled -= localy;
                            if (Globals.bLimMarkupExtent) {
                                if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                    wscaled = wscaled + localx;
                                }
                                if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                    hscaled = hscaled + localy;
                                }
                            }
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            /*if(wscaled/scalefactor < 0){
                             var x2 = this.x + wscaled/scalefactor;
                             tempx = this.x;
                             this.x += wscaled/scalefactor;
                             x2 = tempx;
                             this.w = x2 - tempx;
                             }else{
                             this.w = wscaled/scalefactor;
                             }
                             if(hscaled/scalefactor < 0){
                             var y2 = this.y + hscaled/scalefactor;
                             tempy = this.y;
                             this.y += hscaled/scalefactor;
                             this.h = y2 - tempy;
                             }else{
                             this.h = hscaled/scalefactor;
                             }*/
                            //console.log(this.w);
                            //console.log(this.x);
                            break;
                        case 1:
                            xscaled -= localx;
                            yscaled -= localy;
                            wscaled += localx;
                            hscaled += localy;
                            if (Globals.bLimMarkupExtent) {
                                if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                                    xscaled = xscaled + localx;
                                    wscaled -= localx;
                                }
                                if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                                    yscaled = yscaled + localy;
                                    hscaled -= localy;
                                }
                            }
                            this.x = xscaled / scalefactor;
                            this.y = yscaled / scalefactor;
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            /*if(this.w < 0){
                             tempx = this.x;
                             this.x += this.w;
                             this.w = this.x - tempx;
                             }
                             if(this.h < 0){
                             tempy = this.y;
                             this.y += this.h;
                             this.h = this.y - tempy;
                             }*/
                            break;
                        case 3:
                            xscaled -= localx;
                            //yscaled -= localy;
                            wscaled += localx;
                            hscaled -= localy;
                            if (Globals.bLimMarkupExtent) {
                                if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                                    xscaled = xscaled + localx;
                                    wscaled = wscaled - localx;
                                }
                                if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                    xscaled = xscaled + localx;
                                    wscaled = wscaled - localx;
                                }
                                /*if(this.yscaled - localy <DocObj.pages[DocObj.currentpage].starty || this.yscaled - localy > DocObj.pages[DocObj.currentpage].endy){
                                 yscaled = yscaled + localy;
                                 //hscaled = hscaled - localy;
                                 }*/
                                 if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                    hscaled = hscaled + localy;
                                    yscaled = yscaled - localy;
                                }
                            }
                            this.x = xscaled / scalefactor;
                            //this.y = yscaled/scalefactor;
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            /*if(this.w < 0){
                             tempx = this.x;
                             this.x += this.w;
                             this.w = this.x - tempx;
                             }
                             if(this.h < 0){
                             tempy = this.y;
                             this.y += this.h;
                             this.h = this.y - tempy;
                             }*/
                            break;
                        case 2:
                            //xscaled -= localx;
                            yscaled -= localy;
                            wscaled -= localx;
                            hscaled += localy;
                            if (Globals.bLimMarkupExtent) {
                                /*if(this.xscaled - localx < DocObj.pages[DocObj.currentpage].startx || this.xscaled - localx > DocObj.pages[DocObj.currentpage].endx){
                                 xscaled = xscaled + localx;
                                 wscaled = wscaled - localx;

                                 }*/
                                 if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                    xscaled = xscaled - localx;
                                    wscaled = wscaled + localx;
                                }
                                if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                                    yscaled = yscaled + localy;
                                    hscaled = hscaled - localy;
                                }
                                if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                    hscaled = hscaled - localy;
                                    yscaled = yscaled + localy;
                                }
                            }
                            //this.x = xscaled/scalefactor;
                            this.y = yscaled / scalefactor;
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            /*if(this.w < 0){
                             tempx = this.x;
                             this.x += this.w;
                             this.w = this.x - tempx;
                             }
                             if(this.h < 0){
                             tempy = this.y;
                             this.y += this.h;
                             this.h = this.y - tempy;
                             }*/
                            break;
                    }
                    break;
                case 6: //line arrow etc.
                    if (corner == 4) {
                        wscaled -= localx;
                        hscaled -= localy;
                        if (Globals.bLimMarkupExtent) {
                            if (this.wscaled - localx < startx || this.wscaled - localx > endx) {
                                wscaled = wscaled + localx;
                            }
                            if (this.hscaled - localy < starty || this.hscaled - localy > endy) {
                                hscaled = hscaled + localy;
                            }
                        }
                        this.w = wscaled / scalefactor;
                        this.h = hscaled / scalefactor;
                    }
                    if (corner == 1) {
                        xscaled -= localx;
                        yscaled -= localy;
                        if (Globals.bLimMarkupExtent) {
                            if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                                xscaled = xscaled + localx;
                            }
                            if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                                yscaled = yscaled + localy;
                            }
                        }
                        this.x = xscaled / scalefactor;
                        this.y = yscaled / scalefactor;
                    }
                    markupobject.lengthangleCallback(this.x, this.y, this.w, this.h, Globals.DocObj.pages[Globals.DocObj.currentpage].drotation);
                    //this.lengthangleCallback = function(x, y, w, h, drotation)
                    //var point = {x : localx, y : localy};
                    if (Globals.bOrthoOn) {
                        markupobject.calculateOrtho(true, corner, { x: localx, y: localy });
                    }
                    /*wscaled = wscaled - x;
                     hscaled = hscaled - y;

                     this.w = wscaled/scalefactor;
                     this.h = hscaled/scalefactor;*/
                    break;
                case 7: //dimension line.
                    if (corner == 4) {
                        wscaled -= localx;
                        hscaled -= localy;
                        if (Globals.bLimMarkupExtent) {
                            if (this.wscaled - localx < startx || this.wscaled - localx > endx) {
                                wscaled = wscaled + localx;
                            }
                            if (this.hscaled - localy < starty || this.hscaled - localy > endy) {
                                hscaled = hscaled + localy;
                            }
                        }
                        this.w = wscaled / scalefactor;
                        this.h = hscaled / scalefactor;
                    }
                    if (corner == 1) {
                        xscaled -= localx;
                        yscaled -= localy;
                        if (Globals.bLimMarkupExtent) {
                            if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                                xscaled = xscaled + localx;
                            }
                            if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                                yscaled = yscaled + localy;
                            }
                        }
                        this.x = xscaled / scalefactor;
                        this.y = yscaled / scalefactor;
                    }
                    if (Globals.bOrthoOn) {
                        markupobject.calculateOrtho(true, corner, { x: localx, y: localy });
                    }
                    /*wscaled = wscaled - x;
                     hscaled = hscaled - y;


                     this.w = wscaled/scalefactor;
                     this.h = hscaled/scalefactor;*/
                    var dimwidth = this.w - this.x;
                    var dimheight = this.h - this.y;
                    var dimdiag = markupobject.getdiag(dimwidth, dimheight);
                    /*var dimwsq = Math.pow(dimwidth,2);
                     var dimhsq = Math.pow(dimheight,2);
                     var dimdiag = Math.sqrt((dimwsq+dimhsq));*/
                    this.dimtext = getUnitlength(dimdiag);
                    this.dimtext = (+this.dimtext).toFixed(2); // JS->TS:INFO converted to number before aplying toFixed
                    this.dimtext = this.dimtext + " " + Globals.Unitlabel;
                    break;
                case 8:
                    //not implemented for area markup.
                    break;
                case 9: //text markup
                    if (this.subtype == 1) {
                        switch (corner) {
                            case 4:
                                wscaled -= localx;
                                hscaled -= localy;
                                if (Globals.bLimMarkupExtent) {
                                    if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                        wscaled = wscaled + localx;
                                    }
                                    if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                        hscaled = hscaled + localy;
                                    }
                                }
                                if (wscaled < 0) {
                                    wscaled = 1;
                                }
                                if (hscaled < 0) {
                                    hscaled = 1;
                                }
                                this.w = wscaled / scalefactor;
                                this.h = hscaled / scalefactor;
                                break;
                            case 1:
                                xscaled -= localx;
                                yscaled -= localy;
                                wscaled += localx;
                                hscaled += localy;
                                if (Globals.bLimMarkupExtent) {
                                    if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                                        xscaled = xscaled + localx;
                                        wscaled = wscaled - localx;
                                    }
                                    if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                        wscaled = wscaled - localx;
                                        xscaled = xscaled + localx;
                                    }
                                    if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                                        yscaled = yscaled + localy;
                                        hscaled = hscaled - localy;
                                    }
                                    if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                        yscaled = yscaled + localy;
                                        hscaled = hscaled - localy;
                                    }
                                }
                                if (wscaled < 0) {
                                    wscaled = 1;
                                }
                                if (hscaled < 0) {
                                    hscaled = 1;
                                }
                                this.x = xscaled / scalefactor;
                                this.y = yscaled / scalefactor;
                                this.w = wscaled / scalefactor;
                                this.h = hscaled / scalefactor;
                                break;
                            case 3:
                                xscaled -= localx;
                                //yscaled -= localy;
                                wscaled += localx;
                                hscaled -= localy;
                                if (Globals.bLimMarkupExtent) {
                                    if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                                        xscaled = xscaled + localx;
                                        wscaled = wscaled - localx;
                                    }
                                    if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                        xscaled = xscaled + localx;
                                        wscaled = wscaled - localx;
                                    }
                                    /*if(this.yscaled - localy <DocObj.pages[DocObj.currentpage].starty || this.yscaled - localy > DocObj.pages[DocObj.currentpage].endy){
                                     yscaled = yscaled + localy;
                                     //hscaled = hscaled - localy;
                                     }*/
                                     if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                        hscaled = hscaled + localy;
                                        yscaled = yscaled - localy;
                                    }
                                }
                                if (wscaled < 0) {
                                    wscaled = 1;
                                }
                                if (hscaled < 0) {
                                    hscaled = 1;
                                }
                                this.x = xscaled / scalefactor;
                                //this.y = yscaled/scalefactor;
                                this.w = wscaled / scalefactor;
                                this.h = hscaled / scalefactor;
                                break;
                            case 2:
                                //xscaled -= localx;
                                yscaled -= localy;
                                wscaled -= localx;
                                hscaled += localy;
                                if (Globals.bLimMarkupExtent) {
                                    /*if(this.xscaled - localx < DocObj.pages[DocObj.currentpage].startx || this.xscaled - localx > DocObj.pages[DocObj.currentpage].endx){
                                     xscaled = xscaled + localx;
                                     wscaled = wscaled - localx;

                                     }*/
                                     if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                        xscaled = xscaled - localx;
                                        wscaled = wscaled + localx;
                                    }
                                    if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                                        yscaled = yscaled + localy;
                                        hscaled = hscaled - localy;
                                    }
                                    if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                        hscaled = hscaled - localy;
                                        yscaled = yscaled + localy;
                                    }
                                }
                                if (wscaled < 0) {
                                    wscaled = 1;
                                }
                                if (hscaled < 0) {
                                    hscaled = 1;
                                }
                                //this.x = xscaled/scalefactor;
                                this.y = yscaled / scalefactor;
                                this.w = wscaled / scalefactor;
                                this.h = hscaled / scalefactor;
                                break;
                        }
                    } else {
                        let textscaled = this.textheight * scalefactor;
                        let textwscaled = this.textwidth * scalefactor;
                        switch (this.textrotate / (Math.PI / 180)) {
                            case 0:
                                break;
                            case 90:
                                break;
                            case 180:
                                break;
                            case 270:
                                localx = -y;
                                localy = x;
                                //localy = -localy;
                                break;
                        }
                        textscaled = textscaled - (localy * 0.25);
                        textwscaled = textwscaled - (localx * 0.25);
                        wscaled -= (localx * 0.25);
                        hscaled -= (localy * 0.25);
                        this.font.setHeight(textscaled / scalefactor);
                        ctx.font = this.font.fontstring;
                        let dimt = ctx.measureText(this.text);
                        let dimtextwidth = dimt.width;  // TODO:JS->TS:CHECK possibly unused
                        if (Globals.bLimMarkupExtent) {
                            if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                wscaled = wscaled + localx;
                                textwscaled = textwscaled + localx;
                                textscaled = textscaled + localy;
                            }
                            if ((this.yscaled - this.hscaled) - localy < starty || (this.yscaled - this.hscaled) - localy > endy) {
                                hscaled = hscaled + localy;
                                textscaled = textscaled + localy;
                            }
                        }
                        this.w = wscaled / scalefactor;
                        this.h = hscaled / scalefactor;
                        this.textheight = textscaled / scalefactor;
                        this.textwidth = textwscaled / scalefactor;
                    }
                    break;
                case 11:
                    switch (corner) {
                        case 4:
                            wscaled -= localx;
                            hscaled -= localy;
                            if (Globals.bLimMarkupExtent) {
                                if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                    wscaled = wscaled + localx;
                                }
                                if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                    hscaled = hscaled + localy;
                                }
                            }
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            break;
                        case 1:
                            xscaled -= localx;
                            yscaled -= localy;
                            wscaled += localx;
                            hscaled += localy;
                            if (Globals.bLimMarkupExtent) {
                                if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                                    xscaled = xscaled + localx;
                                    wscaled = wscaled - localx;
                                }
                                if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                    wscaled = wscaled - localx;
                                    xscaled = xscaled + localx;
                                }
                                if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                                    yscaled = yscaled + localy;
                                    hscaled = hscaled - localy;
                                }
                                if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                    yscaled = yscaled + localy;
                                    hscaled = hscaled - localy;
                                }
                            }
                            this.x = xscaled / scalefactor;
                            this.y = yscaled / scalefactor;
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            break;
                        case 3:
                            xscaled -= localx;
                            //yscaled -= localy;
                            wscaled += localx;
                            hscaled -= localy;
                            if (Globals.bLimMarkupExtent) {
                                if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                                    xscaled = xscaled + localx;
                                    wscaled = wscaled - localx;
                                }
                                if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                    xscaled = xscaled + localx;
                                    wscaled = wscaled - localx;
                                }
                                /*if(this.yscaled - localy <DocObj.pages[DocObj.currentpage].starty || this.yscaled - localy > DocObj.pages[DocObj.currentpage].endy){
                                 yscaled = yscaled + localy;
                                 //hscaled = hscaled - localy;
                                 }*/
                                 if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                    hscaled = hscaled + localy;
                                    yscaled = yscaled - localy;
                                }
                            }
                            this.x = xscaled / scalefactor;
                            //this.y = yscaled/scalefactor;
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            break;
                        case 2:
                            //xscaled -= localx;
                            yscaled -= localy;
                            wscaled -= localx;
                            hscaled += localy;
                            if (Globals.bLimMarkupExtent) {
                                /*if(this.xscaled - localx < DocObj.pages[DocObj.currentpage].startx || this.xscaled - localx > DocObj.pages[DocObj.currentpage].endx){
                                 xscaled = xscaled + localx;
                                 wscaled = wscaled - localx;

                                 }*/
                                 if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                    xscaled = xscaled - localx;
                                    wscaled = wscaled + localx;
                                }
                                if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                                    yscaled = yscaled + localy;
                                    hscaled = hscaled - localy;
                                }
                                if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                    hscaled = hscaled - localy;
                                    yscaled = yscaled + localy;
                                }
                            }
                            //this.x = xscaled/scalefactor;
                            this.y = yscaled / scalefactor;
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            break;
                    }
                    break;
                case 12: //stamp markup
                    //var textstampscaled = this.textheight * scalefactor;
                    //var textwstampscaled = this.textwidth * scalefactor;
                    //var textsmallscaled = this.stampsmalltheight * scalefactor;
                    switch (corner) {
                        case 4:
                            wscaled -= localx;
                            hscaled -= localy;
                            if (Globals.bLimMarkupExtent) {
                                if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                    wscaled = wscaled + localx;
                                }
                                if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                    hscaled = hscaled + localy;
                                }
                            }
                            if (wscaled < 0) {
                                wscaled = 1;
                            }
                            if (hscaled < 0) {
                                hscaled = 1;
                            }
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            break;
                        case 1:
                            xscaled -= localx;
                            yscaled -= localy;
                            wscaled += localx;
                            hscaled += localy;
                            if (Globals.bLimMarkupExtent) {
                                if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                                    xscaled = xscaled + localx;
                                    wscaled = wscaled - localx;
                                }
                                if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                    wscaled = wscaled - localx;
                                    xscaled = xscaled + localx;
                                }
                                if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                                    yscaled = yscaled + localy;
                                    hscaled = hscaled - localy;
                                }
                                if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                    yscaled = yscaled + localy;
                                    hscaled = hscaled - localy;
                                }
                            }
                            if (wscaled < 0) {
                                wscaled = 1;
                            }
                            if (hscaled < 0) {
                                hscaled = 1;
                            }
                            this.x = xscaled / scalefactor;
                            this.y = yscaled / scalefactor;
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            break;
                        case 3:
                            xscaled -= localx;
                            //yscaled -= localy;
                            wscaled += localx;
                            hscaled -= localy;
                            if (Globals.bLimMarkupExtent) {
                                if (this.xscaled - localx < startx || this.xscaled - localx > endx) {
                                    xscaled = xscaled + localx;
                                    wscaled = wscaled - localx;
                                }
                                if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                    xscaled = xscaled + localx;
                                    wscaled = wscaled - localx;
                                }
                                /*if(this.yscaled - localy <DocObj.pages[DocObj.currentpage].starty || this.yscaled - localy > DocObj.pages[DocObj.currentpage].endy){
                                 yscaled = yscaled + localy;
                                 //hscaled = hscaled - localy;
                                 }*/
                                 if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                    hscaled = hscaled + localy;
                                    yscaled = yscaled - localy;
                                }
                            }
                            if (wscaled < 0) {
                                wscaled = 1;
                            }
                            if (hscaled < 0) {
                                hscaled = 1;
                            }
                            this.x = xscaled / scalefactor;
                            //this.y = yscaled/scalefactor;
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            break;
                        case 2:
                            //xscaled -= localx;
                            yscaled -= localy;
                            wscaled -= localx;
                            hscaled += localy;
                            if (Globals.bLimMarkupExtent) {
                                /*if(this.xscaled - localx < DocObj.pages[DocObj.currentpage].startx || this.xscaled - localx > DocObj.pages[DocObj.currentpage].endx){
                                 xscaled = xscaled + localx;
                                 wscaled = wscaled - localx;

                                 }*/
                                 if ((this.xscaled + this.wscaled) - localx < startx || (this.xscaled + this.wscaled) - localx > endx) {
                                    xscaled = xscaled - localx;
                                    wscaled = wscaled + localx;
                                }
                                if (this.yscaled - localy < starty || this.yscaled - localy > endy) {
                                    yscaled = yscaled + localy;
                                    hscaled = hscaled - localy;
                                }
                                if ((this.yscaled + this.hscaled) - localy < starty || (this.yscaled + this.hscaled) - localy > endy) {
                                    hscaled = hscaled - localy;
                                    yscaled = yscaled + localy;
                                }
                            }
                            if (wscaled < 0) {
                                wscaled = 1;
                            }
                            if (hscaled < 0) {
                                hscaled = 1;
                            }
                            //this.x = xscaled/scalefactor;
                            this.y = yscaled / scalefactor;
                            this.w = wscaled / scalefactor;
                            this.h = hscaled / scalefactor;
                            break;
                    }
                    /*wscaled -= localx;
                     hscaled -= localy;

                     if (bLimMarkupExtent){
                     if((this.xscaled + this.wscaled) - localx < DocObj.pages[DocObj.currentpage].startx || (this.xscaled + this.wscaled) - localx > DocObj.pages[DocObj.currentpage].endx){
                     wscaled = wscaled + localx;

                     }
                     if((this.yscaled + this.hscaled)-localy <DocObj.pages[DocObj.currentpage].starty || (this.yscaled + this.hscaled)-localy > DocObj.pages[DocObj.currentpage].endy){
                     hscaled = hscaled + localy;
                     }

                     }


                     this.w = wscaled/scalefactor;
                     this.h = hscaled/scalefactor;*/
                    //this.textheight = this.w * 0.16;
                    this.font.setHeight(this.w * 0.16);
                    if (this.alternative == 0) {
                        this.stampsmalltheight = (this.w * 0.08) - 4;
                        if (this.stampsmalltheight < 1) {
                            this.stampsmalltheight = 1;
                        }
                        var combinedtextheight = this.textheight + this.stampsmalltheight + ((this.h / 10) * 2);
                        if (combinedtextheight > this.h) {
                            //this.textheight = (this.h / 2) - ((this.h / 10) * 2);
                            this.font.setHeight((this.h / 2) - ((this.h / 10) * 2));
                            this.stampsmalltheight = (this.textheight / 2) - 4;
                            if (this.stampsmalltheight < 1) {
                                this.stampsmalltheight = 1;
                            }
                        }
                    }
                    else {
                        if ((this.w * 0.6) >= this.h) {
                            //this.textheight = (this.h / 4);
                            this.font.setHeight(this.h / 4);
                        }
                        else {
                            //this.textheight = this.w * 0.16;
                            this.font.setHeight(this.w * 0.16);
                        }
                    }
                    /*if (this.h < 40){
                     this.stampsmalltheight = 1;
                     this.textheight = 1;

                     }*/
                    //recalculate text size for stampe here.
                    break;
                default:
                //code to be executed if n is different from case 1 and 2
            }
            /* if (!this.withinbounds(localx,localy) && bLimMarkupExtent){
             this.x = restorex;
             this.y = restorey;
             this.w = restorew;
             this.h = restoreh;
             }*/
        };
        //functions for polygons, pencil, polycurves
        this.findrectangle = function () {
            var counter = 0;
            var lcounter = 0;
            if (this.type == 0) {
                var minx = this.pointlist[0][0].x;
                var miny = this.pointlist[0][0].y;
                var maxx = this.pointlist[0][0].x;
                var maxy = this.pointlist[0][0].y;
                for (lcounter = 0; lcounter < this.pointlist.length; lcounter++) {
                    for (counter = 0; counter < this.pointlist[lcounter].length; counter++) {
                        if (this.pointlist[lcounter][counter].x < minx) {
                            minx = this.pointlist[lcounter][counter].x;
                        }
                        if (this.pointlist[lcounter][counter].y < miny) {
                            miny = this.pointlist[lcounter][counter].y;
                        }
                        if (this.pointlist[lcounter][counter].x > maxx) {
                            maxx = this.pointlist[lcounter][counter].x;
                        }
                        if (this.pointlist[lcounter][counter].y > maxy) {
                            maxy = this.pointlist[lcounter][counter].y;
                        }
                    }
                }
            }
            else {
                minx = this.points[0].x;
                miny = this.points[0].y;
                maxx = this.points[0].x;
                maxy = this.points[0].y;
                for (counter = 0; counter < this.points.length; counter++) {
                    if (this.points[counter].x < minx) {
                        minx = this.points[counter].x;
                    }
                    if (this.points[counter].y < miny) {
                        miny = this.points[counter].y;
                    }
                    if (this.points[counter].x > maxx) {
                        maxx = this.points[counter].x;
                    }
                    if (this.points[counter].y > maxy) {
                        maxy = this.points[counter].y;
                    }
                }
            }
            this.x = minx;
            this.y = miny;
            this.w = maxx;
            this.h = maxy;
            this.xscaled = this.x;
            this.yscaled = this.y;
            this.wscaled = this.w;
            this.hscaled = this.h;
            if ((this.type == 1 && this.subtype == 2) || this.type == 8) {
                this.addsides();
            }
            //alert(x);
        };
        this.removepoints = function () {
            this.pointlist = [];
            this.points = [];
            this.sides = [];
        };
        this.addpoint = function (x: any, y: any) {
            //this.points.push(new point(x, y));
            this.points.push({ x: x, y: y });
        };
        this.addline = function () {
            this.pointlist.push(markupobject.points);
            this.points = [];
            //this.points.push(new point(x, y));
        };
        this.snapToCorner = function(x:any,y:any,corner:any){
            const snappoint:any = markupobject.getsnappoint(x,y);
            //use to edit end points of  of dimensions and arrows.
            if (corner == 1){
                this.x = snappoint.x;
                this.y = snappoint.y;
            }else if(corner == 4){
                this.w = snappoint.x;
                this.h = snappoint.y;
            }
        };
        this.snapTo = function (x: any, y: any, point: any) {
            const snappoint:any = markupobject.getsnappoint(x,y);

            this.points[point].x = snappoint.x;//((x - pagedx) / scalefactor) + this.xoffset;
            this.points[point].y = snappoint.y;//((y - pagedy) / scalefactor) + this.yoffset;
        };
        this.getsnappoint = function(x:any,y:any):any{
            let pagedx = 0;
            let pagedy = 0;
            let docdx;
            if (Globals.DocObj.Type == 0) {
                docdx = Globals.DocObj.pages[0].dx;
            }
            else {
                docdx = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
            }
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                pagedx = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            }
            else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                pagedx = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;
            }
            else {
                pagedx = docdx;
                pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;
            }
            let scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale / this.scaling;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector / markupobject.scaling;
            }
            else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                scalefactor = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf) / markupobject.scaling;
            }
            else {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale / markupobject.scaling;
            }

            return {
                x : ((x - pagedx) / scalefactor) + this.xoffset,
                y : ((y - pagedy) / scalefactor) + this.yoffset
            };
        };
        this.editpoint = function (x: any, y: any, point: any) {
            var localx = x;
            var localy = y;
            var scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale / this.scaling;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector / markupobject.scaling;
            }
            else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                scalefactor = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf) / markupobject.scaling;
            }
            else {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale / markupobject.scaling;
            }
            switch (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation) {
                case 0:
                    localx = x;
                    localy = y;
                    break;
                case 90:
                    localx = y;
                    localy = -x;
                    break;
                case 180:
                    localx = -x;
                    localy = -y;
                    break;
                case 270:
                    localx = -y;
                    localy = x;
                    break;
            }
            var xscalepoint = 0.0;
            var yscalepoint = 0.0;
            xscalepoint = this.points[point].x * scalefactor;
            yscalepoint = this.points[point].y * scalefactor;
            xscalepoint = xscalepoint - localx;
            yscalepoint = yscalepoint - localy;
            this.points[point].x = xscalepoint / scalefactor;
            this.points[point].y = yscalepoint / scalefactor;
            this.findrectangle();
        };
        this.movepoint = function (x: any, y: any, point: any) {
            this.points[point].x = x;
            this.points[point].y = y;
        };
        this.setlastpoint = function (x: any, y: any) {
            this.points[this.points.length - 1].x = x;
            this.points[this.points.length - 1].y = y;
            this.findrectangle();
        };
        this.getlastpoint = function () {
            if (this.points.length > 0) {
                return {
                    x: this.points[this.points.length - 1].x,
                    y: this.points[this.points.length - 1].y
                };
            }
            else {
                return false;
            }
        };
        this.startdraw = function (ctx: any) {
            ctx.beginPath();
            ctx.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
        };
        // common drawing functions
        this.displayurl = function (ctx: any, x: any, y: any) {
            var labelwidth = 1;
            var labelheight = 20;
            var labelType = markupobject.linkURL;
            ctx.save();
            ctx.font = "10pt Arial";
            var labeltypewidth = ctx.measureText(labelType);
            var labetypesize = labeltypewidth.width;
            if (labetypesize > labelwidth) {
                labelwidth = labetypesize;
            }
            labelwidth += 10;
            ctx.strokeStyle = "black";
            ctx.fillStyle = "rgba(113, 114, 118, 0.8)";
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y + 30, labelwidth, labelheight);
            ctx.fillRect(x, y + 30, labelwidth, labelheight);
            ctx.fillStyle = "white";
            ctx.fillText(labelType, x + 3, y + 42);
            ctx.restore();
        };
        this.displaylabel = function (ctx: any, x: any, y: any) {
            var labelType = "";
            var labelSign = GetDisplayName(this.signature);
            //var labelLayer = "Markup Layer " + this.layer;
            var labelLayer = Globals.Layerlist[this.layer].Name;
            var labeldate = this.GetDateTime(true);
            var notetext = "";
            var labelwidth = 1;
            var labelheight = (10 * 4) + 10;
            var noteBool = false;
            ctx.save();
            ctx.font = "10pt Arial";
            let textarray:any; // JS->TS:CHECK check usage
            switch (this.type) {
                case 0:
                    if (this.subtype == 0) {
                        labelType = "Freehand pen";
                    }
                    if (this.subtype == 1) {
                        labelType = "Eraser";
                    }
                    break;
                case 1:
                    if (this.subtype == 1) {
                        labelType = "Polyline";
                    }
                    if (this.subtype == 2) {
                        labelType = "Polygon";
                    }
                    if (this.subtype == 3) {
                        labelType = "Measure Path";
                    }
                    break;
                case 2:
                    labelType = "Polycurve";
                    break;
                case 3:
                    if (this.subtype == 0) {
                        labelType = "Rectangle";
                    }
                    if (this.subtype == 1) {
                        labelType = "Rounded Rectangle";
                    }
                    break;
                case 4:
                    labelType = "Oval";
                    break;
                case 5:
                    labelType = "Revision Cloud";
                    break;
                case 6:
                    if (this.subtype == 9) {
                        labelType = "Line";
                    }
                    else {
                        labelType = "Arrow";
                    }
                    break;
                case 7:
                    labelType = "Dimension Line";
                    break;
                case 8:
                    labelType = "Area";
                    break;
                case 9:
                    labelType = "Text";
                    notetext = this.text;
                    var labelnotewidth = ctx.measureText(notetext);
                    var labelnotesize = labelnotewidth.width;
                    /*if (labelnotesize > labelwidth) {
                        labelwidth = labelnotesize;
                    }
                    labelheight = (10 * 4) + 10;
                    noteBool = true;*/
                    break;
                case 11:
                    labelType = "Image";
                    break;
                case 10:
                    labelType = "Note";
                    if (this.text != undefined) {
                        notetext = this.text;
                    }
                    else {
                        notetext = "";
                    }
                    var disptext = wordWrap(notetext, 30);
                    textarray = disptext.split('\n');
                    labelnotewidth = 0;
                    for (var i = 0; i < textarray.length; i++) {
                        if (ctx.measureText(textarray[i]) > labelnotewidth) {
                            labelnotewidth = ctx.measureText(textarray[i]);
                        }
                    }
                    //labelnotewidth = ctx.measureText(notetext);
                    labelnotesize = labelnotewidth.width;
                    if (labelnotesize > labelwidth) {
                        labelwidth = labelnotesize;
                    }
                    labelheight = (10 * 5) + 10;
                    noteBool = true;
                    break;
                case 12:
                    labelType = "Stamp";
                    break;
            }
            var labeltypewidth = ctx.measureText(labelType);
            var labetypesize = labeltypewidth.width;
            if (labetypesize > labelwidth) {
                labelwidth = labetypesize;
            }
            var labelSignwidth = ctx.measureText(labelSign);
            var labelsignsize = labelSignwidth.width;
            if (labelsignsize > labelwidth) {
                labelwidth = labelsignsize;
            }
            var labelLayerwidth = ctx.measureText(labelLayer);
            var labellayersize = labelLayerwidth.width;
            if (labellayersize > labelwidth) {
                labelwidth = labellayersize;
            }
            var labeldatewidth = ctx.measureText(labeldate);
            var labeldatesize = labeldatewidth.width;
            if (labeldatesize > labelwidth) {
                labelwidth = labeldatesize;
            }
            if (this.type != 10) {
                labelwidth += 10;
                ctx.strokeStyle = "black";
                ctx.fillStyle = "rgba(113, 114, 118, 0.8)";
                ctx.lineWidth = 1;
                ctx.strokeRect(x, y + 30, labelwidth, labelheight);
                ctx.fillRect(x, y + 30, labelwidth, labelheight);
                ctx.fillStyle = "white";
                ctx.fillText(labelType, x + 3, y + 42);
                ctx.fillText(labelSign, x + 3, y + 54);
                ctx.fillText(labelLayer, x + 3, y + 66);
                ctx.fillText(labeldate, x + 3, y + 78);
                if (noteBool) {
                    ctx.fillText(notetext, x + 3, y + 90);
                }
            }
            else {
                if (labelwidth < 200) {
                    labelwidth = 200;
                }
                else {
                    labelwidth += 10;
                }
                labelheight = 150;
                ctx.strokeStyle = "black";
                ctx.fillStyle = "rgba(255, 255, 0, 0.8)";
                ctx.lineWidth = 1;
                ctx.strokeRect(x, y + 30, labelwidth, labelheight);
                ctx.fillRect(x, y + 30, labelwidth, labelheight);
                ctx.fillStyle = "black";
                ctx.save();
                ctx.beginPath();
                ctx.rect(x, y + 30, labelwidth, labelheight);
                ctx.clip();
                ctx.fillText(labelSign, x + 5, y + 46);
                ctx.fillText(labeldate, x + 5, y + 60);
                ctx.fillText(labelLayer, x + 5, y + 74);
                //ctx.fillText(labelLayer, x+3 , y+66);
                if (noteBool) {
                    var ystart = y + 100;
                    for (i = 0; i < textarray.length; i++) {
                        ctx.fillText(textarray[i], x + 5, ystart);
                        ystart += 12;
                    }
                    //ctx.fillText(notetext, x+3 , y+100);
                }
                ctx.restore();
            }
            ctx.restore(); // restore context to what it was on entry
        };
        this.Rect = function (ctx: any, x: any, y: any, width: any, height: any,
                              linewidth: any, fill: any, stroke: any, fillcolor: any, strokecolor: any) {
            ctx.save(); // save the context so we don't mess up others
            ctx.strokeStyle = strokecolor;
            ctx.fillStyle = fillcolor;
            ctx.lineWidth = linewidth;
            if (markupobject.rotation != 0 && markupobject.type != 9) {
                const tx = x + (width / 2);
                const ty = y + (height / 2);
                ctx.translate(tx, ty);
                ctx.rotate(markupobject.rotation);
                ctx.translate(-tx, -ty);
            }
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + width, y);
            ctx.lineTo(x + width, y + height);
            ctx.lineTo(x, y + height);
            ctx.closePath();
            if (fill) {
                ctx.fill();
            }
            if (stroke) {
                ctx.stroke();
            }
            ctx.restore(); // restore context to what it was on entry
        };
        this.drawradius = function(ctx:any, x:any, y:any, w:any, h:any, crossl:any, linewidth:any, strokecolor:any, bdiameter:any){
            ctx.save(); // save the context so we don't mess up others
            ctx.strokeStyle = strokecolor;
            ctx.lineWidth = 2;

            const xdiff = Math.max(x,w) - Math.min(x,w);
            const ydiff = Math.max(y,h) - Math.min(y,h);
            const radius = markupobject.getdiag(xdiff, ydiff); // TODO:JS->TS:CHECK unused?

            //draw center cross.
            ctx.beginPath();
            ctx.moveTo(x-crossl, y);
            ctx.lineTo(x+crossl, y);
            ctx.moveTo(x, y-crossl);
            ctx.lineTo(x, y+crossl);
            ctx.stroke();

            //draw leader

            ctx.restore(); // restore context to what it was on entry
        };
        this.radiusDimLeader = function(ctx:any,x:any,y:any,w:any,h:any, linewidth:any, strokecolor:any){  // TODO:JS->TS:CHECK empty method
        };
        this.Circle = function (ctx: any, x: any, y: any, w: any, h: any,
                                linewidth: any, fill: any, stroke: any, fillcolor: any, strokecolor: any) {
            ctx.save(); // save the context so we don't mess up others
            ctx.strokeStyle = strokecolor;
            ctx.fillStyle = fillcolor;
            ctx.lineWidth = linewidth;
            /* if (markupobject.rotation != 0) {
                ctx.translate(x, y);
                ctx.rotate(markupobject.rotation);
                ctx.translate(-x, -y);
            } */

            const xdiff = Math.max(x,w) - Math.min(x,w);
            const ydiff = Math.max(y,h) - Math.min(y,h);
            const radius = markupobject.getdiag(xdiff, ydiff);

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            if (fill) {
                ctx.fill();
            }
            if (stroke) {
                ctx.stroke();
            }
            ctx.restore(); // restore context to what it was on entry
        };
        this.Oval = function (ctx: any, x: any, y: any, width: any, height: any,
                              linewidth: any, fill: any, stroke: any, fillcolor: any, strokecolor: any) {
            var ox = (width / 2) * kappa;
            var oy = (height / 2) * kappa;
            var xe = x + width;
            var ye = y + height;
            var xm = x + width / 2;
            var ym = y + height / 2;
            ctx.save(); // save the context so we don't mess up others
            ctx.strokeStyle = strokecolor;
            ctx.fillStyle = fillcolor;
            ctx.lineWidth = linewidth;
            if (markupobject.rotation != 0) {
                var tx = x + (width / 2);
                var ty = y + (height / 2);
                ctx.translate(tx, ty);
                ctx.rotate(markupobject.rotation);
                ctx.translate(-tx, -ty);
            }
            ctx.beginPath();
            ctx.moveTo(x, ym);
            ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
            ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
            ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
            ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
            ctx.closePath();
            if (fill) {
                ctx.fill();
            }
            if (stroke) {
                ctx.stroke();
            }
            ctx.restore(); // restore context to what it was on entry
        };
        /*this.polygon=function(ctx,linewidth,fill,stroke,fillcolor,strokecolor){
         var counter = 0;

         ctx.save();

         ctx.strokeStyle = strokecolor;
         ctx.lineWidth = linewidth;
         ctx.fillStyle = fillcolor;
         ctx.beginPath();
         ctx.moveTo(markupobject.points[0].x, markupobject.points[0].y);

         for (counter=1;counter<markupobject.points.length;counter++){
         ctx.lineTo(markupobject.points[counter].x, markupobject.points[counter].y);
         }
         ctx.closePath();


         if(fill){
         ctx.fill();
         }
         if(stroke){
         ctx.stroke();
         }
         ctx.restore();


         };*/
        this.polygon = function (ctx: any, linewidth: any, fill: any, stroke: any,
                                 fillcolor: any, strokecolor: any, scalefactor: any, dx: any, dy: any, useoffset: any) {
            var counter = 0;
            var xscaled = (this.points[0].x - this.xoffset) * scalefactor;
            var yscaled = (this.points[0].y - this.yoffset) * scalefactor;
            if (useoffset) {
                xscaled += dx;
                yscaled += dy;
            }
            ctx.save();
            ctx.strokeStyle = strokecolor;
            if (Globals.bUseFixedScale) {
                ctx.lineWidth = linewidth * markupobject.fixedscaleFactor;
            }
            else {
                ctx.lineWidth = linewidth * scalefactor;
            }
            ctx.fillStyle = fillcolor;
            ctx.beginPath();
            //      ctx.moveTo(markupobject.points[0].x, markupobject.points[0].y);
            ctx.moveTo(xscaled, yscaled);
            for (counter = 1; counter < markupobject.points.length; counter++) {
                //            ctx.lineTo(markupobject.points[counter].x, markupobject.points[counter].y);
                xscaled = (this.points[counter].x - this.xoffset) * scalefactor;
                yscaled = (this.points[counter].y - this.yoffset) * scalefactor;
                if (useoffset) {
                    xscaled += dx;
                    yscaled += dy;
                }
                ctx.lineTo(xscaled, yscaled);
            }
            ctx.closePath();
            if (fill) {
                ctx.fill();
            }
            if (stroke) {
                ctx.stroke();
            }
            ctx.restore();
        };
        this.polyline = function (ctx: any, linewidth: any, strokecolor: any,
                                  scalefactor: any, dx: any, dy: any, useoffset: any) {
            var counter = 0;
            var xscaled = (this.points[0].x - this.xoffset) * scalefactor;
            var yscaled = (this.points[0].y - this.yoffset) * scalefactor;
            if (useoffset) {
                xscaled += dx;
                yscaled += dy;
            }
            ctx.save();
            ctx.strokeStyle = strokecolor;
            if (Globals.bUseFixedScale) {
                ctx.lineWidth = linewidth * markupobject.fixedscaleFactor;
            }
            else {
                ctx.lineWidth = linewidth * scalefactor;
            }
            ctx.beginPath();
            //      ctx.moveTo(markupobject.points[0].x, markupobject.points[0].y);
            ctx.moveTo(xscaled, yscaled);
            for (counter = 1; counter < markupobject.points.length; counter++) {
                //            ctx.lineTo(markupobject.points[counter].x, markupobject.points[counter].y);
                xscaled = (this.points[counter].x - this.xoffset) * scalefactor;
                yscaled = (this.points[counter].y - this.yoffset) * scalefactor;
                if (useoffset) {
                    xscaled += dx;
                    yscaled += dy;
                }
                ctx.lineTo(xscaled, yscaled);
            }
            //ctx.closePath();
            ctx.stroke();
            ctx.restore();
        };
        this.polycurves = function (ctx: any, linewidth: any, strokecolor: any, scalefactor: any) {
            var counter = 0;
            var control = new point();
            var start = new point();
            var xscaled = (this.points[0].x - this.xoffset) * scalefactor;
            var yscaled = (this.points[0].y - this.yoffset) * scalefactor;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                xscaled += Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                yscaled += Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            }
            else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                xscaled += Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                yscaled += Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;
            }
            else {
                xscaled = xscaled + Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                yscaled = yscaled + Globals.DocObj.pages[Globals.DocObj.currentpage].dy;
            }
            ctx.save();
            ctx.strokeStyle = strokecolor;
            ctx.lineWidth = linewidth * scalefactor;
            ctx.beginPath();
            //      ctx.moveTo(markupobject.points[0].x, markupobject.points[0].y);
            ctx.moveTo(xscaled, yscaled);
            start.x = xscaled;
            start.y = yscaled;
            for (counter = 1; counter < markupobject.points.length; counter++) {
                xscaled = (this.points[counter].x - this.xoffset) * scalefactor;
                yscaled = (this.points[counter].y - this.yoffset) * scalefactor;
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                    xscaled += Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                    yscaled += Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
                }
                else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                    xscaled += Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                    yscaled += Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;
                }
                else {
                    xscaled = xscaled + Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                    yscaled = yscaled + Globals.DocObj.pages[Globals.DocObj.currentpage].dy;
                }
                if (isEven(counter)) {
                    ctx.moveTo(start.x, start.y);
                    ctx.quadraticCurveTo(control.x, control.y, xscaled, yscaled);
                    start.x = xscaled;
                    start.y = yscaled;
                }
                else {
                    //dont draw if converted to curve.
                    if (counter + 1 == markupobject.points.length) {
                        ctx.lineTo(xscaled, yscaled);
                    }
                    control.x = xscaled;
                    control.y = yscaled;
                }
                //ctx.lineTo(xscaled, yscaled);
            }
            //ctx.closePath();
            ctx.stroke();
            ctx.restore();
        };
        this.dimensionLeader = function (ctx: any, x: any, y: any, width: any, height: any,
                                         offset: any, arrowl: any, arrowa: any, linewidth: any,
                                         type: any, fillcolor: any, strokecolor: any) {
            //bounding box
            var arrwidth = width - x;
            var arrheight = height - y;
            var baranglerad = 90 / (180 / Math.PI);
            var arrowanglerad = arrowa / (180 / Math.PI);
            //angle of diagonal in radians
            var arrdiagrad = Math.atan2(arrheight, arrwidth);
            //arrowhead length
            var arrowhead = Math.abs(arrowl / Math.cos(arrowanglerad));
            //bar length
            var barhead = arrowl / 2;
            //negative angle of diagonal
            var arrangleradneg = Math.PI + arrdiagrad;
            //angle of end barb lines relative to line
            var aarrowupperangle = arrangleradneg + arrowanglerad;
            var aarrowlowerangle = arrangleradneg - arrowanglerad;
            //angle of end bar lines relative to line
            var abarupperangle = arrangleradneg + baranglerad;
            var abarlowerangle = arrangleradneg - baranglerad;
            //calculated points of the line end barbs
            var arrtopx = width + Math.cos(aarrowupperangle) * arrowhead;
            var arrtopy = height + Math.sin(aarrowupperangle) * arrowhead;
            var arrbotx = width + Math.cos(aarrowlowerangle) * arrowhead;
            var arrboty = height + Math.sin(aarrowlowerangle) * arrowhead;
            //calculated points of the line end bar
            var bartopx = width + Math.cos(abarupperangle) * barhead;
            var bartopy = height + Math.sin(abarupperangle) * barhead;
            var barbotx = width + Math.cos(abarlowerangle) * barhead;
            var barboty = height + Math.sin(abarlowerangle) * barhead;
            //new end points for main line with leader line offsets.
            var leaderoffsetendx = width + Math.cos(abarlowerangle) * offset;
            var leaderoffsetendy = height + Math.sin(abarlowerangle) * offset;
            var startx = x + Math.cos(arrdiagrad) * barhead;
            var starty = y + Math.sin(arrdiagrad) * barhead;
            var endx = width - Math.cos(arrdiagrad) * barhead;
            var endy = height - Math.sin(arrdiagrad) * barhead;
            //angle of start barb lines relative to line
            var asarrowupperangle = arrdiagrad + arrowanglerad;
            var asarrowlowerangle = arrdiagrad - arrowanglerad;
            //angle of start bar lines relative to line
            var asbarupperangle = arrdiagrad + baranglerad;
            var asbarlowerangle = arrdiagrad - baranglerad;
            //calculated points of the line start barbs
            var arrstopx = x + Math.cos(asarrowupperangle) * arrowhead;
            var arrstopy = y + Math.sin(asarrowupperangle) * arrowhead;
            var arrsbotx = x + Math.cos(asarrowlowerangle) * arrowhead;
            var arrsboty = y + Math.sin(asarrowlowerangle) * arrowhead;
            //calculated points of the line start bar
            var barstopx = x + Math.cos(asbarupperangle) * barhead;
            var barstopy = y + Math.sin(asbarupperangle) * barhead;
            var barsbotx = x + Math.cos(asbarlowerangle) * barhead;
            var barsboty = y + Math.sin(asbarlowerangle) * barhead;
            //new position for main line start and stop when having leader line offsets.
            var leaderoffsetx = x + Math.cos(asbarupperangle) * offset;
            var leaderoffsety = y + Math.sin(asbarupperangle) * offset;
            //calculated points of the line end barbs for offset
            var arrtopxoffset = leaderoffsetendx + Math.cos(aarrowupperangle) * arrowhead;
            var arrtopyoffset = leaderoffsetendy + Math.sin(aarrowupperangle) * arrowhead;
            var arrbotxoffset = leaderoffsetendx + Math.cos(aarrowlowerangle) * arrowhead;
            var arrbotyoffset = leaderoffsetendy + Math.sin(aarrowlowerangle) * arrowhead;
            //calculated points of the line start barbs with offset
            var arrstopxoffset = leaderoffsetx + Math.cos(asarrowupperangle) * arrowhead;
            var arrstopyoffset = leaderoffsety + Math.sin(asarrowupperangle) * arrowhead;
            var arrsbotxoffset = leaderoffsetx + Math.cos(asarrowlowerangle) * arrowhead;
            var arrsbotyoffset = leaderoffsety + Math.sin(asarrowlowerangle) * arrowhead;
            //var offsetdims = {x:leaderoffsetx, y: leaderoffsety, w : leaderoffsetendx, h: leaderoffsetendy};
            //var leaderpoint = {x: }
            ctx.save(); // save the context so we don't mess up others
            ctx.lineWidth = linewidth;
            ctx.strokeStyle = strokecolor;
            ctx.fillStyle = fillcolor;
            if (this.subtype == 9) {
                ctx.lineCap = "butt";
            }
            else {
                ctx.lineCap = 'round';
            }
            ctx.beginPath();
            if (type == 1 || type == 3) {
                if (type == 1) {
                    ctx.moveTo(x, y);
                }
                else if (type == 3) {
                    ctx.moveTo(startx, starty);
                }
                ctx.lineTo(endx, endy);
            }
            else {
                if (offset == 0) {
                    ctx.moveTo(x, y);
                    ctx.lineTo(width, height);
                }
                else {
                    ctx.moveTo(leaderoffsetx, leaderoffsety);
                    ctx.lineTo(leaderoffsetendx, leaderoffsetendy);
                }
            }
            //ctx.closePath();
            ctx.stroke();
            if (type == 0) {
                ctx.beginPath();
                ctx.moveTo(width, height);
                ctx.lineTo(arrtopx, arrtopy);
                //ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(width, height);
                ctx.lineTo(arrbotx, arrboty);
                //ctx.closePath();
                ctx.stroke();
            }
            if (type == 1) {
                //ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(width, height);
                ctx.lineTo(arrtopx, arrtopy);
                ctx.lineTo(arrbotx, arrboty);
                ctx.closePath();
                //ctx.stroke();
                ctx.fill();
            }
            if (type == 2) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(arrstopx, arrstopy);
                //ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(arrsbotx, arrsboty);
                //ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(width, height);
                ctx.lineTo(arrtopx, arrtopy);
                //ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(width, height);
                ctx.lineTo(arrbotx, arrboty);
                //ctx.closePath();
                ctx.stroke();
            }
            if (type == 3) {
                //ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(arrstopx, arrstopy);
                ctx.lineTo(arrsbotx, arrsboty);
                ctx.closePath();
                ctx.fill();
                ctx.lineCap = 'round';
                //ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(width, height);
                ctx.lineTo(arrtopx, arrtopy);
                ctx.lineTo(arrbotx, arrboty);
                ctx.closePath();
                ctx.fill();
                ctx.lineCap = 'round';
                //ctx.stroke();
            }
            //bars both ends
            if (type == 4) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                if (offset == 0) {
                    ctx.lineTo(barstopx, barstopy);
                }
                else {
                    ctx.lineTo(leaderoffsetx, leaderoffsety);
                }
                //ctx.closePath();
                ctx.stroke();
                if (offset == 0) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(barsbotx, barsboty);
                    //ctx.closePath();
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(width, height);
                    ctx.lineTo(bartopx, bartopy);
                    //ctx.closePath();
                    ctx.stroke();
                }
                ctx.beginPath();
                ctx.moveTo(width, height);
                if (offset == 0) {
                    ctx.lineTo(barbotx, barboty);
                }
                else {
                    ctx.lineTo(leaderoffsetendx, leaderoffsetendy);
                }
                //ctx.closePath();
                ctx.stroke();
            }
            //bars and open arrows
            if (type == 5) {
                if (offset == 0) {
                    var awstrtx = x;
                    var awstrty = y;
                    var awendx = width;
                    var awendy = height;
                    var arwstrttopx = arrstopx;
                    var arwstrttopy = arrstopy;
                    var arwstrtbotx = arrsbotx;
                    var arwstrtboty = arrsboty;
                    var arwendtopx = arrtopx;
                    var arwendtopy = arrtopy;
                    var arwendbotx = arrbotx;
                    var arwendboty = arrboty;
                }
                else {
                    awstrtx = leaderoffsetx;
                    awstrty = leaderoffsety;
                    awendx = leaderoffsetendx;
                    awendy = leaderoffsetendy;
                    arwstrttopx = arrstopxoffset;
                    arwstrttopy = arrstopyoffset;
                    arwstrtbotx = arrsbotxoffset;
                    arwstrtboty = arrsbotyoffset;
                    arwendtopx = arrtopxoffset;
                    arwendtopy = arrtopyoffset;
                    arwendbotx = arrbotxoffset;
                    arwendboty = arrbotyoffset;
                }
                ctx.beginPath();
                ctx.moveTo(awstrtx, awstrty);
                ctx.lineTo(arwstrttopx, arwstrttopy);
                //ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(awstrtx, awstrty);
                ctx.lineTo(arwstrtbotx, arwstrtboty);
                //ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(awendx, awendy);
                ctx.lineTo(arwendtopx, arwendtopy);
                //ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(awendx, awendy);
                ctx.lineTo(arwendbotx, arwendboty);
                //ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x, y);
                if (offset == 0) {
                    ctx.lineTo(barstopx, barstopy);
                }
                else {
                    ctx.lineTo(leaderoffsetx, leaderoffsety);
                }
                //ctx.closePath();
                ctx.stroke();
                if (offset == 0) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(barsbotx, barsboty);
                    //ctx.closePath();
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(width, height);
                    ctx.lineTo(bartopx, bartopy);
                    //ctx.closePath();
                    ctx.stroke();
                }
                ctx.beginPath();
                ctx.moveTo(width, height);
                if (offset == 0) {
                    ctx.lineTo(barbotx, barboty);
                }
                else {
                    ctx.lineTo(leaderoffsetendx, leaderoffsetendy);
                }
                //ctx.closePath();
                ctx.stroke();
            }
            /*if (type == 9) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(width, height);
                ctx.stroke();
            }*/
            ctx.restore(); // restore context to what it was on entry
            var offsetdims = { x: leaderoffsetx, y: leaderoffsety, w: leaderoffsetendx, h: leaderoffsetendy };
            return offsetdims;
        };

        this.barhead = function(ctx:any, x:any,y:any, width:any, height:any, lineEnds:any, arrowl:any, linewidth:any,
                     strokecolor:any) {
            const arrwidth = width - x;
            const arrheight = height - y;

            const baranglerad = 90 / (180 / Math.PI);

            //angle of diagonal in radians
            const arrdiagrad = Math.atan2(arrheight, arrwidth);

            //bar length
            const barhead = arrowl / 2;

            //negative angle of diagonal
            const arrangleradneg = Math.PI + arrdiagrad;

            //angle of end bar lines relative to line
            const abarupperangle = arrangleradneg + baranglerad;
            const abarlowerangle = arrangleradneg - baranglerad;


            //calculated points of the line end bar
            const bartopx = width + Math.cos(abarupperangle) * barhead;
            const bartopy = height + Math.sin(abarupperangle) * barhead;
            const barbotx = width + Math.cos(abarlowerangle) * barhead;
            const barboty = height + Math.sin(abarlowerangle) * barhead;

            const startx = x + Math.cos(arrdiagrad) * barhead;
            const starty = y + Math.sin(arrdiagrad) * barhead;
            const endx = width - Math.cos(arrdiagrad) * barhead;
            const endy = height - Math.sin(arrdiagrad) * barhead;

            //angle of start bar lines relative to line
            const asbarupperangle = arrdiagrad + baranglerad;
            const asbarlowerangle = arrdiagrad - baranglerad;

            //calculated points of the line start bar
            const barstopx = x + Math.cos(asbarupperangle) * barhead;
            const barstopy = y + Math.sin(asbarupperangle) * barhead;
            const barsbotx = x + Math.cos(asbarlowerangle) * barhead;
            const barsboty = y + Math.sin(asbarlowerangle) * barhead;

            ctx.save(); // save the context so we don't mess up others

            ctx.lineCap = 'round';
            ctx.lineWidth = linewidth;
            ctx.strokeStyle = strokecolor;


            if(lineEnds.start){
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(barstopx, barstopy);
                //ctx.closePath();
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(barsbotx, barsboty);
                //ctx.closePath();
                ctx.stroke();

            }

            if(lineEnds.end){
                ctx.beginPath();
                ctx.moveTo(width, height);
                ctx.lineTo(bartopx, bartopy);
                //ctx.closePath();
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(width, height);
                ctx.lineTo(barbotx, barboty);
                //ctx.closePath();
                ctx.stroke();

            }

            ctx.restore(); // restore context to what it was on entry


        };
        this.arrowhead = function(ctx:any, x:any,y:any, width:any, height:any, lineEnds:any, arrowa:any, arrowl:any,
                        linewidth:any, strokecolor:any, bopen:any){
            const arrwidth = width - x;
            const arrheight = height - y;

            const arrowanglerad = arrowa / (180 / Math.PI);

            //angle of diagonal in radians
            const arrdiagrad = Math.atan2(arrheight, arrwidth);

            //arrowhead length
            const arrowhead = Math.abs(arrowl / Math.cos(arrowanglerad));

            //negative angle of diagonal
            const arrangleradneg = Math.PI + arrdiagrad;

            //angle of end barb lines relative to line
            const aarrowupperangle = arrangleradneg + arrowanglerad;
            const aarrowlowerangle = arrangleradneg - arrowanglerad;

            //calculated points of the line end barbs
            const arrtopx = width + Math.cos(aarrowupperangle) * arrowhead;
            const arrtopy = height + Math.sin(aarrowupperangle) * arrowhead;
            const arrbotx = width + Math.cos(aarrowlowerangle) * arrowhead;
            const arrboty = height + Math.sin(aarrowlowerangle) * arrowhead;

            //angle of start barb lines relative to line
            const asarrowupperangle = arrdiagrad + arrowanglerad;
            const asarrowlowerangle = arrdiagrad - arrowanglerad;

            //calculated points of the line start barbs
            const arrstopx = x + Math.cos(asarrowupperangle) * arrowhead;
            const arrstopy = y + Math.sin(asarrowupperangle) * arrowhead;
            const arrsbotx = x + Math.cos(asarrowlowerangle) * arrowhead;
            const arrsboty = y + Math.sin(asarrowlowerangle) * arrowhead;


            //if blinestart arrow on start of line else on end of line.

            ctx.save(); // save the context so we don't mess up others

            ctx.lineCap = 'round';
            ctx.lineWidth = linewidth;
            ctx.strokeStyle = strokecolor;


            if(lineEnds.start){
                if(bopen){
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(arrstopx, arrstopy);
                    ctx.closePath();
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(arrsbotx, arrsboty);
                    ctx.closePath();
                    ctx.stroke();

                }else{
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(arrstopx, arrstopy);
                    ctx.lineTo(arrsbotx, arrsboty);
                    ctx.closePath();
                    ctx.fill();
                    ctx.lineCap = 'round';

                }

            }

            if(lineEnds.end){
                if(bopen){
                    ctx.beginPath();
                    ctx.moveTo(width, height);
                    ctx.lineTo(arrtopx, arrtopy);
                    ctx.closePath();
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(width, height);
                    ctx.lineTo(arrbotx, arrboty);
                    ctx.closePath();
                    ctx.stroke();

                }else{
                    ctx.beginPath();
                    ctx.moveTo(width, height);
                    ctx.lineTo(arrtopx, arrtopy);
                    ctx.lineTo(arrbotx, arrboty);
                    ctx.closePath();
                    //ctx.stroke();
                    ctx.fill();

                }

            }

            ctx.restore(); // restore context to what it was on entry
        };

        this.arrow = function (ctx: any, x: any, y: any, width: any, height: any,
                               arrowl: any, arrowa: any, linewidth: any, type: any, fillcolor: any, strokecolor: any) {
            //bounding box
            const arrwidth = width - x;
            const arrheight = height - y;

            const arrdiagrad = Math.atan2(arrheight, arrwidth);

            const barhead = arrowl / 2;

            const startx = x + Math.cos(arrdiagrad) * barhead;
            const starty = y + Math.sin(arrdiagrad) * barhead;
            const endx = width - Math.cos(arrdiagrad) * barhead;
            const endy = height - Math.sin(arrdiagrad) * barhead;

            const lineEnds = {start : false, end : false};

            ctx.save(); // save the context so we don't mess up others
            ctx.lineWidth = linewidth;
            ctx.strokeStyle = strokecolor;
            ctx.fillStyle = fillcolor;
            if (this.subtype == 9) {
                ctx.lineCap = "butt";
            }
            else {
                ctx.lineCap = 'round';
            }
            ctx.beginPath();
            if (type == 1 || type == 3) {
                if (type == 1) {
                    ctx.moveTo(x, y);
                }
                else if (type == 3) {
                    ctx.moveTo(startx, starty);
                }
                ctx.lineTo(endx, endy);
            }
            else {
                ctx.moveTo(x, y);
                ctx.lineTo(width, height);
            }
            //ctx.closePath();
            ctx.stroke();
            if (type == 0) {
                lineEnds.end = true;
                lineEnds.start = false;

                markupobject.arrowhead(ctx, x,y, width, height, lineEnds, arrowa, arrowl, linewidth, strokecolor, true);
            }
            if (type == 1) {
                lineEnds.end = true;
                lineEnds.start = false;

                markupobject.arrowhead(ctx, x,y, width, height, lineEnds, arrowa, arrowl, linewidth, strokecolor, false);
            }
            if (type == 2) {
                lineEnds.end = true;
                lineEnds.start = true;

                markupobject.arrowhead(ctx, x,y, width, height, lineEnds, arrowa, arrowl, linewidth, strokecolor, true);
            }
            if (type == 3) {
                lineEnds.end = true;
                lineEnds.start = true;

                markupobject.arrowhead(ctx, x,y, width, height, lineEnds, arrowa, arrowl, linewidth, strokecolor, false);
            }
            //bars both ends
            if (type == 4) {
                lineEnds.end = true;
                lineEnds.start = true;
                markupobject.barhead(ctx, x,y, width, height, lineEnds, arrowl, linewidth, strokecolor);
            }
            //bars and open arrows
            if (type == 5) {
                lineEnds.end = true;
                lineEnds.start = true;

                markupobject.arrowhead(ctx, x,y, width, height, lineEnds, arrowa, arrowl, linewidth, strokecolor, true);

                lineEnds.end = true;
                lineEnds.start = true;
                markupobject.barhead(ctx, x,y, width, height, lineEnds, arrowl, linewidth, strokecolor);
            }
            /*if (type == 9) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(width, height);
                ctx.stroke();
            }*/
            ctx.restore(); // restore context to what it was on entry
        };
        this.setdimvaluepoly = function () {
            var dimdiag = 0;
            for (var i = 0; i < markupobject.points.length; i++) {
                if (i > 0) {
                    var dimwidth = markupobject.points[i].x - markupobject.points[i - 1].x;
                    var dimheight = markupobject.points[i].y - markupobject.points[i - 1].y;
                    dimdiag += markupobject.getdiag(dimwidth, dimheight);
                    markupobject.dimtext = getUnitlength(dimdiag / markupobject.scaling);
                    markupobject.dimtext = (+markupobject.dimtext).toFixed(2); // JS->TS:INFO converted to number before aplying toFixed
                    markupobject.dimtext = markupobject.dimtext + " " + Globals.Unitlabel;
                }
            }
        };
        this.setdimvalue = function (x: any, y: any, width: any, height: any) {
            var dimwidth = width - x;
            var dimheight = height - y;
            var dimdiag = markupobject.getdiag(dimwidth, dimheight);
            this.dimtext = getUnitlength(dimdiag / this.scaling);
            this.dimtext = (+this.dimtext).toFixed(2); // JS->TS:INFO converted to number before aplying toFixed
            this.dimtext = this.dimtext + " " + Globals.Unitlabel;
        };
        this.dimvaluedraw = function (ctx: any, x: any, y: any, width: any, height: any,
                                      color: any, scalefactor: any, brotate: any) {
            ctx.save();
            var dimwidth = width - x;
            var dimheight = height - y;
            var dimdiag = markupobject.getdiag(dimwidth, dimheight);
            var dimanglerad = Math.atan2(dimheight, dimwidth);
            ctx.textAlign = "start";
            markupobject.font.setScale(scalefactor);
            var scaletextheight = markupobject.font.height * scalefactor;
            this.textheight = markupobject.font.height;
            ctx.font = markupobject.font.fontstringScaled;
            var dimt = ctx.measureText(this.dimtext);
            var dimtextwidth = dimt.width;
            if (markupobject.saved) {
                var dimtextx = x + (dimwidth / 2) - (dimtextwidth / 2);
                var dimtexty = y + (dimheight / 2) + (scaletextheight / 2);
            }
            else {
                //var dimtextx = x + (dimwidth / 2) - (dimtextwidth / 2);
                dimtextx = width + (15 * scalefactor);
                dimtexty = height;
                //var dimtexty = y + (dimheight / 2) + (scaletextheight / 2);
            }
            if (dimanglerad > (Math.PI * 0.5) || dimanglerad < -(Math.PI * 0.5)) {
                if (markupobject.pagerotation == 0) {
                    dimanglerad += Math.PI;
                }
            }
            //console.log(dimanglerad);
            if (brotate && markupobject.saved) {
                var tx = x + (dimwidth / 2);
                var ty = y + (dimheight / 2);
                ctx.translate(tx, ty);
                ctx.rotate(dimanglerad);
                ctx.translate(-tx, -ty);
            }
            /*if(rotation !=0){
             }*/
            ctx.lineWidth = 1;
            var yrect = dimtexty - scaletextheight;
            ctx.fillStyle = "white";
            ctx.strokeStyle = this.strokecolor;
            ctx.fillRect(dimtextx - (10 * scalefactor), yrect - (5 * scalefactor), dimtextwidth + (20 * scalefactor), scaletextheight + (10 * scalefactor));
            ctx.strokeRect(dimtextx - (10 * scalefactor), yrect - (5 * scalefactor), dimtextwidth + (20 * scalefactor), scaletextheight + (10 * scalefactor));
            labelsize.w = dimtextwidth + (20 * scalefactor);
            labelsize.h = scaletextheight + (10 * scalefactor);
            ctx.fillStyle = "black";
            ctx.fillText(this.dimtext, dimtextx, dimtexty);
            ctx.restore();
        };
        this.roundedRect = function (ctx: any, x: any, y: any, width: any, height: any,
                                     rotation: any, radius: any, linewidth: any, fill: any,
                                     stroke: any, fillcolor: any, strokecolor: any) {
            ctx.save(); // save the context so we don't mess up others
            ctx.strokeStyle = strokecolor;
            ctx.fillStyle = fillcolor;
            ctx.lineWidth = linewidth;
            if (rotation != 0) {
                const tx = x + (width / 2);
                const ty = y + (height / 2);
                ctx.translate(tx, ty);
                ctx.rotate(markupobject.rotation);
                ctx.translate(-tx, -ty);
            }
            //alternative 2 start
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.arcTo(x + width, y, x + width, y + radius, radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
            ctx.lineTo(x + radius, y + height);
            ctx.arcTo(x, y + height, x, y + height - radius, radius);
            ctx.lineTo(x, y + radius);
            ctx.arcTo(x, y, x + radius, y, radius);
            //alternative 2 end
            /*ctx.beginPath();

             // draw top and top right corner
             ctx.moveTo(x+radius,y);
             ctx.arcTo(x+width,y,x+width,y+radius,radius);

             // draw right side and bottom right corner
             ctx.arcTo(x+width,y+height,x+width-radius,y+height,radius);

             // draw bottom and bottom left corner
             ctx.arcTo(x,y+height,x,y+height-radius,radius);

             // draw left and top left corner
             ctx.arcTo(x,y,x+radius,y,radius);*/
            if (fill) {
                ctx.fill();
            }
            if (stroke) {
                ctx.stroke();
            }
            ctx.restore(); // restore context to what it was on entry
        };
        this.newcloud = function (ctx: any, x: any, y: any, width: any, height: any, radius: any,
                                  linewidth: any, fill: any, stroke: any, fillcolor: any, strokecolor: any) {
            if (width <= 0 || height <= 0) {
                if (width < 0) {
                    x += width;
                    width = Math.abs(width);
                }
                if (height < 0) {
                    y += height;
                    height = Math.abs(height);
                }
                //return;
            }
            var diameter = radius * 2;
            var numdiamh = Math.floor(width / diameter);
            var numdiamv = Math.floor(height / diameter);
            var diamwidth = diameter * numdiamh;
            var diamheight = diameter * numdiamv;
            var doscale = false;
            var xscale = 1;
            var yscale = 1;
            var lNumX = 8;
            var dRadX = width / lNumX;
            var lNumY = height / dRadX;
            if (lNumY < 6) {
                dRadX = height / 6;
                lNumY = 6;
                lNumX = width / dRadX;
            }
            var dRadY = height / lNumY;
            //var nArcsX = lNumX/2;
            //var nArcsY = lNumY/2 - 1;
            var localradiusx = dRadX;
            var diameterx = localradiusx * 2;
            var localradiusy = dRadY;
            var diametery = localradiusy * 2;
            numdiamh = Math.floor(width / diameterx);
            var doublediamh = (width / diameterx);
            numdiamv = Math.floor(height / diameterx);
            var doublediamv = (height / diameterx);
            /*if(width > 0){
             }else{
             numdiamh = 1;
             doublediamh = 1;
             }
             if(height > 0){

             }else{
             numdiamv = 1;
             doublediamv = 1;
             }*/
            var doublediamwidth = diameterx * doublediamh;
            var doublediamheight = diameterx * doublediamv;
            diamwidth = diameterx * numdiamh;
            diamheight = diameterx * numdiamv;
            ctx.save(); // save the context so we don't mess up others
            ctx.strokeStyle = strokecolor;
            ctx.fillStyle = fillcolor;
            ctx.lineWidth = linewidth;
            if (markupobject.rotation != 0) {
                var tx = x + (width / 2);
                var ty = y + (height / 2);
                ctx.translate(tx, ty);
                ctx.rotate(markupobject.rotation);
                ctx.translate(-tx, -ty);
            }
            if (width > diamwidth) {
                xscale = width / diamwidth;
                doscale = true;
            }
            if (height > diamheight) {
                yscale = height / diamheight;
                doscale = true;
            }
            if (doscale) {
                ctx.translate(x, y);
                ctx.scale(xscale, yscale);
                ctx.translate(-x, -y);
            }
            ctx.beginPath();
            //ctx.moveTo(x+localradiusx,y+diametery);
            //upper left bubble
            ctx.arc(x + localradiusx, y + localradiusx, localradiusx, (0.5 * Math.PI), 0, false);
            //if (numdiamh > 2){
            for (var i = 2; i < numdiamh; i++) {
                var vertoffsett = x + localradiusx + (diameterx * (i - 1));
                ctx.arc(vertoffsett, y + localradiusx, localradiusx, Math.PI, 0, false);
            }
            //}
            //upper right bubble
            ctx.arc(x + diamwidth - localradiusx, y + localradiusx, localradiusx, Math.PI, (0.5 * Math.PI), false);
            //if (numdiamv > 2){
            for (i = 2; i < numdiamv; i++) {
                var horoffsetr = y + localradiusx + (diameterx * (i - 1));
                ctx.arc(x + diamwidth - localradiusx, horoffsetr, localradiusx, 1.5 * Math.PI, 0.5 * Math.PI, false);
            }
            //}
            //lower right bubble
            ctx.arc(x + diamwidth - localradiusx, y + diamheight - localradiusx, localradiusx, (1.5 * Math.PI), Math.PI, false);
            //if (numdiamh > 2){
            for (i = numdiamh - 1; i > 1; i--) {
                var vertoffsetb = x + localradiusx + (diameterx * (i - 1));
                ctx.arc(vertoffsetb, y + diamheight - localradiusx, localradiusx, 0, Math.PI, false);
            }
            //}
            //lower left bubble
            ctx.arc(x + localradiusx, y + diamheight - localradiusx, localradiusx, 0, (1.5 * Math.PI), false);
            //if (numdiamv > 2){
            for (i = numdiamv - 1; i > 1; i--) {
                var horoffsetl = y + localradiusx + (diameterx * (i - 1));
                ctx.arc(x + localradiusx, horoffsetl, localradiusx, 0.5 * Math.PI, 1.5 * Math.PI, false);
            }
            //}
            /*if (width<diameter*2 && height<diameter*2){
             //draw a circle until width > radius and height > radius
             ctx.arc(x+radius, y+radius, width/2, 0 , 2 * Math.PI, false);
             //ArcToPolyline( x1+nPosX*dRadX, y1 + dRadY, dRadX, dRadY, 90, 270, 0, pDestPnts, &lPoints );
             }else{

             }*/
            //ctx.closePath();
            if (fill) {
                ctx.fill();
            }
            if (stroke) {
                ctx.stroke();
            }
            ctx.restore(); // restore context to what it was on entry
        };
        this.cloud = function (ctx: any, x: any, y: any, width: any, height: any, radius: any,
                               linewidth: any, fill: any, stroke: any, fillcolor: any, strokecolor: any) {
            var diameter = radius * 2;
            var numdiamh = Math.floor(width / diameter);
            var numdiamv = Math.floor(height / diameter);
            var diamwidth = diameter * numdiamh;
            var diamheight = diameter * numdiamv;
            ctx.save(); // save the context so we don't mess up others
            ctx.strokeStyle = strokecolor;
            ctx.fillStyle = fillcolor;
            ctx.lineWidth = linewidth;
            if (markupobject.rotation != 0) {
                var tx = x + (width / 2);
                var ty = y + (height / 2);
                ctx.translate(tx, ty);
                ctx.rotate(markupobject.rotation);
                ctx.translate(-tx, -ty);
            }
            ctx.beginPath();
            if (width < diameter * 2 && height < diameter * 2) {
                //draw a circle until width > radius and height > radius
                ctx.arc(x + radius, y + radius, width / 2, 0, 2 * Math.PI, false);
            }
            else {
                ctx.moveTo(x + radius, y + diameter);
                //upper left bubble
                ctx.arc(x + radius, y + radius, radius, (0.5 * Math.PI), 0, false);
                if (numdiamh > 2) {
                    for (var i = 2; i < numdiamh; i++) {
                        var vertoffsett = x + radius + diameter * (i - 1);
                        ctx.arc(vertoffsett, y + radius, radius, Math.PI, 0, false);
                    }
                }
                //upper right bubble
                ctx.arc(x + diamwidth - radius, y + radius, radius, Math.PI, (0.5 * Math.PI), false);
                if (numdiamv > 2) {
                    for (i = 2; i < numdiamv; i++) {
                        var horoffsetr = y + radius + diameter * (i - 1);
                        ctx.arc(x + diamwidth - radius, horoffsetr, radius, 1.5 * Math.PI, 0.5 * Math.PI, false);
                    }
                }
                //lower right bubble
                ctx.arc(x + diamwidth - radius, y + diamheight - radius, radius, (1.5 * Math.PI), Math.PI, false);
                if (numdiamh > 2) {
                    for (i = numdiamh - 1; i > 1; i--) {
                        var vertoffsetb = x + radius + (diameter * (i - 1));
                        ctx.arc(vertoffsetb, y + diamheight - radius, radius, 0, Math.PI, false);
                    }
                }
                //lower left bubble
                ctx.arc(x + radius, y + diamheight - radius, radius, 0, (1.5 * Math.PI), false);
                if (numdiamv > 2) {
                    for (i = numdiamv - 1; i > 1; i--) {
                        var horoffsetl = y + radius + (diameter * (i - 1));
                        ctx.arc(x + radius, horoffsetl, radius, 0.5 * Math.PI, 1.5 * Math.PI, false);
                    }
                }
            }
            //ctx.closePath();
            if (fill) {
                ctx.fill();
            }
            if (stroke) {
                ctx.stroke();
            }
            ctx.restore(); // restore context to what it was on entry
        };
        this.editpolygon = function (ctx: any, scalefactor: any) {
            var counter = 0;
            ctx.save();
            ctx.strokeStyle = "red";
            ctx.fillStyle = "white";
            ctx.lineWidth = 1;
            //ctx.beginPath();
            //ctx.moveTo(this.points[0].x, this.points[0].y);
            var xscaled = 0.0;
            var yscaled = 0.0;
            for (counter = 0; counter < markupobject.points.length; counter++) {
                xscaled = (this.points[counter].x - this.xoffset) * scalefactor;
                yscaled = (this.points[counter].y - this.yoffset) * scalefactor;
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                    xscaled += Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                    yscaled += Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
                }
                else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                    xscaled += Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                    yscaled += Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;
                }
                else {
                    xscaled = xscaled + Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                    yscaled = yscaled + Globals.DocObj.pages[Globals.DocObj.currentpage].dy;
                }
                ctx.fillRect(xscaled - 5, yscaled - 5, 10, 10);
                ctx.strokeRect(xscaled - 5, yscaled - 5, 10, 10);
            }
            //ctx.closePath();
            //markupobject
            ctx.restore();
        };
        this.selectLabel = function (ctx: any, x: any, y: any, width: any, height: any, full: any, rotate: any) {
            var halfmarker = markersize / 2;
            ctx.save(); // save the context so we don't mess up others
            ctx.strokeStyle = "blue";
            ctx.fillStyle = "white";
            ctx.lineWidth = 1;
            ctx.beginPath();
            var tx = x + ((width - x) / 2);
            var ty = y + ((height - y) / 2);
            //var centerx = width - (x / 2);
            //var centery = height - (y / 2);
            ctx.arc(tx, ty, halfmarker, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore(); // restore context to what it was on entry
        };
        this.select = function (ctx: any, x: any, y: any, width: any, height: any, full: any, rotate: any) {
            var centercanvX = (Globals.canvasowidth / 2);
            var centercanvY = (Globals.canvasoheight / 2);
            var CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);
            var rotRad360 = 360 * (Math.PI / 180);
            var halfmarker = markersize / 2;
            let pointul:any = new point(); // TODO:JS->TS:INFO added any as a type to simulate the exact behaviour of the original and avoid TS warnings
            let pointlr:any = new point(); // TODO:JS->TS:INFO added any as a type to simulate the exact behaviour of the original and avoid TS warnings
            pointul.x = x;
            pointul.y = y;
            pointlr.x = width;
            pointlr.y = height;
            var tx = x + ((width - x) / 2);
            var ty = y + ((height - y) / 2);
            let negheightcenter:any; // TODO:JS->TS:INFO
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                pointul = markupobject.getRotatedMarkup(centercanvX, centercanvY, x, y, CanvRotRad);
                pointlr = markupobject.getRotatedMarkup(centercanvX, centercanvY, width, height, CanvRotRad);
            }
            ctx.save(); // save the context so we don't mess up others
            if (full) {
                //if text created on rotated canvas
                if (markupobject.textrotate != 0 && markupobject.type == 9 && markupobject.subtype == 0) {
                    ctx.translate(x, y);
                    ctx.rotate(markupobject.textrotate);
                    ctx.translate(-x, -y);
                }
                //find center
                if (markupobject.rotation != 0) {
                    //var tx = x+(width/2);
                    //var ty = y+(height/2);
                    ctx.translate(tx, ty);
                    ctx.rotate(markupobject.rotation);
                    ctx.translate(-tx, -ty);
                    if (markupobject.type == 9 && markupobject.subtype == 0) {
                        ty = y - ((y - height) / 2);
                        negheightcenter = (height - y) / 2;
                        if (markupobject.textrotate != 0) {
                            var lrrotpoint = markupobject.getMarkupSelectPointRot(((width - x) / 2), (-(height - y) / 2), markupobject.rotation);
                            var tulrotpoint = markupobject.getMarkupSelectPointRot(lrrotpoint.x, lrrotpoint.y, markupobject.textrotate);
                            var rmrkcenter = markupobject.getMarkupSelectPointRot((width - x) / 2, negheightcenter, markupobject.textrotate);
                            tx = x + rmrkcenter.x;
                            ty = y + rmrkcenter.y;
                            this.LowerRightRectRot.x = tx + tulrotpoint.x - halfmarker;
                            this.LowerRightRectRot.y = ty + tulrotpoint.y - halfmarker;
                            this.LowerRightRectRot.w = tx + tulrotpoint.x + halfmarker;
                            this.LowerRightRectRot.h = ty + tulrotpoint.y + halfmarker;
                        }
                        else {
                            var ulrotpoint = markupobject.getMarkupSelectPointRot(-((width - x) / 2), -(-((height - y) / 2)), markupobject.rotation);
                            this.UpperLeftRectRot.x = tx + ulrotpoint.x - halfmarker;
                            this.UpperLeftRectRot.y = ty + ulrotpoint.y - halfmarker;
                            this.UpperLeftRectRot.w = tx + ulrotpoint.x + halfmarker;
                            this.UpperLeftRectRot.h = ty + ulrotpoint.y + halfmarker;
                            lrrotpoint = markupobject.getMarkupSelectPointRot(((width - x) / 2), (-(height - y) / 2), markupobject.rotation);
                            this.LowerRightRectRot.x = tx + lrrotpoint.x - halfmarker;
                            this.LowerRightRectRot.y = ty + lrrotpoint.y - halfmarker;
                            this.LowerRightRectRot.w = tx + lrrotpoint.x + halfmarker;
                            this.LowerRightRectRot.h = ty + lrrotpoint.y + halfmarker;
                        }
                    }
                    else {
                        ulrotpoint = markupobject.getMarkupSelectPointRot(-((width - x) / 2), -((height - y) / 2), markupobject.rotation);
                        this.UpperLeftRectRot.x = tx + ulrotpoint.x - halfmarker;
                        this.UpperLeftRectRot.y = ty + ulrotpoint.y - halfmarker;
                        this.UpperLeftRectRot.w = tx + ulrotpoint.x + halfmarker;
                        this.UpperLeftRectRot.h = ty + ulrotpoint.y + halfmarker;
                        lrrotpoint = markupobject.getMarkupSelectPointRot(((width - x) / 2), ((height - y) / 2), markupobject.rotation);
                        this.LowerRightRectRot.x = tx + lrrotpoint.x - halfmarker;
                        this.LowerRightRectRot.y = ty + lrrotpoint.y - halfmarker;
                        this.LowerRightRectRot.w = tx + lrrotpoint.x + halfmarker;
                        this.LowerRightRectRot.h = ty + lrrotpoint.y + halfmarker;
                        var llrotpoint = markupobject.getMarkupSelectPointRot(-((width - x) / 2), ((height - y) / 2), markupobject.rotation);
                        this.LowerLeftRectRot.x = tx + llrotpoint.x - halfmarker;
                        this.LowerLeftRectRot.y = ty + llrotpoint.y - halfmarker;
                        this.LowerLeftRectRot.w = tx + llrotpoint.x + halfmarker;
                        this.LowerLeftRectRot.h = ty + llrotpoint.y + halfmarker;
                        var urrotpoint = markupobject.getMarkupSelectPointRot(((width - x) / 2), -((height - y) / 2), markupobject.rotation);
                        this.UpperRightRectRot.x = tx + urrotpoint.x - halfmarker;
                        this.UpperRightRectRot.y = ty + urrotpoint.y - halfmarker;
                        this.UpperRightRectRot.w = tx + urrotpoint.x + halfmarker;
                        this.UpperRightRectRot.h = ty + urrotpoint.y + halfmarker;
                    }
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                        var ULrotpointul = markupobject.getRotatedMarkup(centercanvX, centercanvY, this.UpperLeftRectRot.x, this.UpperLeftRectRot.y, CanvRotRad);
                        var ULrotpointlr = markupobject.getRotatedMarkup(centercanvX, centercanvY, this.UpperLeftRectRot.w, this.UpperLeftRectRot.h, CanvRotRad);
                        this.UpperLeftRectRot.x = Math.min(ULrotpointul.x, ULrotpointlr.x);
                        this.UpperLeftRectRot.y = Math.min(ULrotpointul.y, ULrotpointlr.y);
                        this.UpperLeftRectRot.w = Math.max(ULrotpointul.x, ULrotpointlr.x);
                        this.UpperLeftRectRot.h = Math.max(ULrotpointul.y, ULrotpointlr.y);
                        var URrotpointul = markupobject.getRotatedMarkup(centercanvX, centercanvY, this.UpperRightRectRot.x, this.UpperRightRectRot.y, CanvRotRad);
                        var URrotpointlr = markupobject.getRotatedMarkup(centercanvX, centercanvY, this.UpperRightRectRot.w, this.UpperRightRectRot.h, CanvRotRad);
                        this.UpperRightRectRot.x = Math.min(URrotpointul.x, URrotpointlr.x);
                        this.UpperRightRectRot.y = Math.min(URrotpointul.y, URrotpointlr.y);
                        this.UpperRightRectRot.w = Math.max(URrotpointul.x, URrotpointlr.x);
                        this.UpperRightRectRot.h = Math.max(URrotpointul.y, URrotpointlr.y);
                        var LLrotpointul = markupobject.getRotatedMarkup(centercanvX, centercanvY, this.LowerLeftRectRot.x, this.LowerLeftRectRot.y, CanvRotRad);
                        var LLrotpointlr = markupobject.getRotatedMarkup(centercanvX, centercanvY, this.LowerLeftRectRot.w, this.LowerLeftRectRot.h, CanvRotRad);
                        this.LowerLeftRectRot.x = Math.min(LLrotpointul.x, LLrotpointlr.x);
                        this.LowerLeftRectRot.y = Math.min(LLrotpointul.y, LLrotpointlr.y);
                        this.LowerLeftRectRot.w = Math.max(LLrotpointul.x, LLrotpointlr.x);
                        this.LowerLeftRectRot.h = Math.max(LLrotpointul.y, LLrotpointlr.y);
                        var LRrotpointul = markupobject.getRotatedMarkup(centercanvX, centercanvY, this.LowerRightRectRot.x, this.LowerRightRectRot.y, CanvRotRad);
                        var LRrotpointlr = markupobject.getRotatedMarkup(centercanvX, centercanvY, this.LowerRightRectRot.w, this.LowerRightRectRot.h, CanvRotRad);
                        this.LowerRightRectRot.x = Math.min(LRrotpointul.x, LRrotpointlr.x);
                        this.LowerRightRectRot.y = Math.min(LRrotpointul.y, LRrotpointlr.y);
                        this.LowerRightRectRot.w = Math.max(LRrotpointul.x, LRrotpointlr.x);
                        this.LowerRightRectRot.h = Math.max(LRrotpointul.y, LRrotpointlr.y);
                    }
                    if (rotate) {
                        if (markupobject.type == 9 && markupobject.subtype == 0) {
                            if (markupobject.textrotate == 0) {
                                var rmrotpoint = markupobject.getMarkupSelectPointRot(0, -(-(negheightcenter - 20)), markupobject.rotation);
                            }
                            else {
                                rmrotpoint = markupobject.getMarkupSelectPointRot(0, -(-(negheightcenter - 20)), markupobject.rotation);
                                rmrotpoint = markupobject.getMarkupSelectPointRot(rmrotpoint.x, rmrotpoint.y, markupobject.textrotate);
                                var rmcenter = markupobject.getMarkupSelectPointRot((width - x) / 2, negheightcenter, markupobject.textrotate);
                                var xyrot = markupobject.getMarkupSelectPointRot((width - x) / 2, negheightcenter, markupobject.rotation);
                                tx = x + rmcenter.x;
                                ty = y + rmcenter.y;
                            }
                        }
                        else {
                            rmrotpoint = markupobject.getMarkupSelectPointRot(0, -(((height - y) / 2) + 20), markupobject.rotation);
                        }
                        this.RotmarkerRectRot.x = tx + rmrotpoint.x - halfmarker;
                        this.RotmarkerRectRot.y = ty + rmrotpoint.y - halfmarker;
                        this.RotmarkerRectRot.w = tx + rmrotpoint.x + halfmarker;
                        this.RotmarkerRectRot.h = ty + rmrotpoint.y + halfmarker;
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            var rotrotpointul = markupobject.getRotatedMarkup(centercanvX, centercanvY, this.RotmarkerRectRot.x, this.RotmarkerRectRot.y, CanvRotRad);
                            var rotrotpointlr = markupobject.getRotatedMarkup(centercanvX, centercanvY, this.RotmarkerRectRot.w, this.RotmarkerRectRot.h, CanvRotRad);
                            this.RotmarkerRectRot.x = Math.min(rotrotpointul.x, rotrotpointlr.x);
                            this.RotmarkerRectRot.y = Math.min(rotrotpointul.y, rotrotpointlr.y);
                            this.RotmarkerRectRot.w = Math.max(rotrotpointul.x, rotrotpointlr.x);
                            this.RotmarkerRectRot.h = Math.max(rotrotpointul.y, rotrotpointlr.y);
                        }
                    }
                }
                if (markupobject.type == 9 && markupobject.subtype == 0) {
                    if (markupobject.textrotate == 0) {
                        //markupobject.textrotate
                        this.LowerLeftRect.x = x - halfmarker;
                        this.LowerLeftRect.y = y - halfmarker;
                        this.LowerLeftRect.w = x + halfmarker;
                        this.LowerLeftRect.h = y + halfmarker;
                        this.LowerRightRect.x = width - halfmarker;
                        this.LowerRightRect.y = y - halfmarker;
                        this.LowerRightRect.w = width + halfmarker;
                        this.LowerRightRect.h = y + halfmarker;
                        this.UpperRightRect.x = width - halfmarker;
                        this.UpperRightRect.y = height - halfmarker;
                        this.UpperRightRect.w = width + halfmarker;
                        this.UpperRightRect.h = height + halfmarker;
                        this.UpperLeftRect.x = x - halfmarker;
                        this.UpperLeftRect.y = height - halfmarker;
                        this.UpperLeftRect.w = x + halfmarker;
                        this.UpperLeftRect.h = height + halfmarker;
                    }
                    else {
                        lrrotpoint = markupobject.getMarkupSelectPointRot((width - x), 0, markupobject.textrotate);
                        this.LowerRightRect.x = x + lrrotpoint.x - halfmarker;
                        this.LowerRightRect.y = y + lrrotpoint.y - halfmarker;
                        this.LowerRightRect.w = x + lrrotpoint.x + halfmarker;
                        this.LowerRightRect.h = y + lrrotpoint.y + halfmarker;
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            //lrrotpoint = markupobject.getMarkupSelectPointRot((this.rotatedrect.w-this.rotatedrect.x), 0,markupobject.textrotate);
                            this.LowerRightRect.x = this.rotatedrect.w - halfmarker;
                            this.LowerRightRect.y = this.rotatedrect.y - halfmarker;
                            this.LowerRightRect.w = this.rotatedrect.w + halfmarker;
                            this.LowerRightRect.h = this.rotatedrect.y + halfmarker;
                        }
                    }
                }
                else {
                    this.UpperLeftRect.x = pointul.x - halfmarker;
                    this.UpperLeftRect.y = pointul.y - halfmarker;
                    this.UpperLeftRect.w = pointul.x + halfmarker;
                    this.UpperLeftRect.h = pointul.y + halfmarker;
                    this.LowerLeftRect.x = pointul.x - halfmarker;
                    this.LowerLeftRect.y = pointlr.y - halfmarker;
                    this.LowerLeftRect.w = pointul.x + halfmarker;
                    this.LowerLeftRect.h = pointlr.y + halfmarker;
                    this.UpperRightRect.x = pointlr.x - halfmarker;
                    this.UpperRightRect.y = pointul.y - halfmarker;
                    this.UpperRightRect.w = pointlr.x + halfmarker;
                    this.UpperRightRect.h = pointul.y + halfmarker;
                    this.LowerRightRect.x = pointlr.x - halfmarker;
                    this.LowerRightRect.y = pointlr.y - halfmarker;
                    this.LowerRightRect.w = pointlr.x + halfmarker;
                    this.LowerRightRect.h = pointlr.y + halfmarker;
                }
                ctx.strokeStyle = "blue";
                ctx.fillStyle = "white";
                ctx.lineWidth = 1;
                if (markupobject.type != 10) {
                    ctx.beginPath();
                    ctx.arc(x, y, halfmarker, 0, Math.PI * 2, false);
                    //ctx.closePath();
                    //ctx.fill();
                    //ctx.stroke();
                    //ctx.beginPath();
                    ctx.moveTo(x + halfmarker, height);
                    ctx.arc(x, height, halfmarker, 0, Math.PI * 2, false);
                    //ctx.closePath();
                    //ctx.fill();
                    //ctx.stroke();
                    //ctx.beginPath();
                    ctx.moveTo(width + halfmarker, y);
                    ctx.arc(width, y, halfmarker, 0, Math.PI * 2, false);
                    //ctx.closePath();
                    //ctx.fill();
                    //ctx.stroke();
                    ctx.moveTo(width + halfmarker, height);
                    //ctx.beginPath();
                    ctx.arc(width, height, halfmarker, 0, Math.PI * 2, false);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                }
                ctx.strokeStyle = "red";
                ctx.strokeRect(((x + width) / 2) - 3, y - 3, 6, 6);
                ctx.strokeRect(x - 3, ((height + y) / 2) - 3, 6, 6);
                ctx.strokeRect(width - 3, ((height + y) / 2) - 3, 6, 6);
                ctx.strokeRect(((width + x) / 2) - 3, height - 3, 6, 6);
                if (rotate) {
                    if (markupobject.type == 9 && markupobject.subtype == 0) {
                        ctx.beginPath();
                        ctx.moveTo((x + width) / 2, height - 3);
                        ctx.lineTo((x + width) / 2, height - 15);
                        ctx.closePath();
                        ctx.stroke();
                        ctx.strokeStyle = "blue";
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.arc((x + width) / 2, height - 20, halfmarker, 0, Math.PI * 2, false);
                        ctx.stroke();
                        if (markupobject.textrotate == 0) {
                            this.RotmarkerRect.x = ((x + width) / 2) - halfmarker;
                            this.RotmarkerRect.y = (height - 20) - halfmarker;
                            this.RotmarkerRect.w = ((x + width) / 2) + halfmarker;
                            this.RotmarkerRect.h = (height - 20) + halfmarker;
                        }
                        else {
                            rmrotpoint = markupobject.getMarkupSelectPointRot((width - x) / 2, -((y - (height)) + 20), markupobject.textrotate);
                            this.RotmarkerRect.x = x + rmrotpoint.x - halfmarker;
                            this.RotmarkerRect.y = y + rmrotpoint.y - halfmarker;
                            this.RotmarkerRect.w = x + rmrotpoint.x + halfmarker;
                            this.RotmarkerRect.h = y + rmrotpoint.y + halfmarker;
                        }
                    }
                    else {
                        ctx.beginPath();
                        ctx.moveTo((x + width) / 2, y - 3);
                        ctx.lineTo((x + width) / 2, y - 15);
                        ctx.closePath();
                        ctx.stroke();
                        ctx.strokeStyle = "blue";
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.arc((x + width) / 2, y - 20, halfmarker, 0, Math.PI * 2, false);
                        ctx.fill();
                        ctx.stroke();
                        this.RotmarkerRect.x = ((x + width) / 2) - halfmarker;
                        this.RotmarkerRect.y = (y - 20) - halfmarker;
                        this.RotmarkerRect.w = ((x + width) / 2) + halfmarker;
                        this.RotmarkerRect.h = (y - 20) + halfmarker;
                    }
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                        var rotpointul = markupobject.getRotatedMarkup(centercanvX, centercanvY, this.RotmarkerRect.x, this.RotmarkerRect.y, CanvRotRad);
                        var rotpointlr = markupobject.getRotatedMarkup(centercanvX, centercanvY, this.RotmarkerRect.w, this.RotmarkerRect.h, CanvRotRad);
                        this.RotmarkerRect.x = Math.min(rotpointul.x, rotpointlr.x);
                        this.RotmarkerRect.y = Math.min(rotpointul.y, rotpointlr.y);
                        this.RotmarkerRect.w = Math.max(rotpointul.x, rotpointlr.x);
                        this.RotmarkerRect.h = Math.max(rotpointul.y, rotpointlr.y);
                    }
                }
                //find center
                /*var centerx = (x+width)/2;
                 var centery = (y+height)/2;
                 //draw circle in center
                 ctx.strokeStyle = "blue";
                 ctx.lineWidth = 1;
                 ctx.beginPath();
                 ctx.arc(centerx, centery, 5, 0, Math.PI * 2,false);
                 ctx.closePath();
                 ctx.stroke();*/
            }
            else {
                ctx.strokeStyle = "blue";
                ctx.fillStyle = "white";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(x, y, halfmarker, 0, Math.PI * 2, false);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(width, height, halfmarker, 0, Math.PI * 2, false);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
            }
            ctx.restore(); // restore context to what it was on entry
        };

        this.setAnglelengthPoints = function(length:any, angle:any){

            return markupobject.setAngleLengthinternalPoints(length, angle, true);
        };

        this.setAnglelength = function(length:any, angle:any, type:any){
            //(x2, y2) = (x1 + l * cos(a),y1 + l * sin(a));

            return markupobject.setAngleLengthinternal(length, angle, type, true);

        };

        this.setAngleLenghtEdit = function(length:any, angle:any, type:any){
            return markupobject.setAngleLengthinternal(length, angle, type, false);
        };

        this.setAngleLengthinternalPoints = function(length:any, angle:any, brotate:any){
            const centercanvX = (Globals.canvasowidth / 2);
            const centercanvY = (Globals.canvasoheight / 2);
            const CanvRotRad = (360 - Globals.DocObj.pages[Globals.DocObj.currentpage].drotation) * (Math.PI / 180);
            const CanvRotRadOrig = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);

            if(angle > 0){
                angle *= -1;
            }else{
                angle = 360 - angle;
            }

            if (!brotate){
                //add page rotation to draw angle.
                angle += (360 - Globals.DocObj.pages[Globals.DocObj.currentpage].drotation);
                if (angle > 360){
                    angle -= 360;
                }
            }
            const scalelength = length * markupobject.scaling;
            const linewidthvalue = getScreenDim(scalelength);
            const lineangle = angle * (Math.PI / 180);

            //use points
            let x2 = this.points[this.points.length - 2].x + (linewidthvalue * Math.cos(lineangle));
            let y2 = this.points[this.points.length - 2].y + (linewidthvalue * Math.sin(lineangle));

            markupobject.bUsemouseinput = false;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0 && brotate){

                //use points
                let transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.points[this.points.length - 2].x, this.points[this.points.length - 2].y, CanvRotRad);
                this.points[this.points.length - 2].x = transpoint.x;
                this.points[this.points.length - 2].y = transpoint.y;

                //use points
                transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, x2, y2, CanvRotRad);
                x2 = transpoint.x;
                y2 = transpoint.y;

                //add document page rotation to markup rotation here.
            }

            return {w : x2, h : y2};
        };

        this.setAngleLengthinternal = function(length:any, angle:any, type:any, brotate:any){
            const centercanvX = (Globals.canvasowidth / 2);
            const centercanvY = (Globals.canvasoheight / 2);
            const CanvRotRad = (360 - Globals.DocObj.pages[Globals.DocObj.currentpage].drotation) * (Math.PI / 180);
            const CanvRotRadOrig = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);

            if(angle > 0){
                angle *= -1;
            }else{
                angle = 360 - angle;
            }

            if (!brotate){
                //add page rotation to draw angle.
                angle += (360 - Globals.DocObj.pages[Globals.DocObj.currentpage].drotation);
                if (angle > 360){
                    angle -= 360;
                }
            }
            const scalelength = length * markupobject.scaling;
            const linewidthvalue = getScreenDim(scalelength, type);
            const lineangle = angle * (Math.PI / 180);
            let x2 = this.x + (linewidthvalue * Math.cos(lineangle));
            let y2 = this.y + (linewidthvalue * Math.sin(lineangle));

            //this.AdjustForRotation(false);

            markupobject.bUsemouseinput = false;

            if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0 && brotate){
                let transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, this.x, this.y, CanvRotRad);
                this.x = transpoint.x;
                this.y = transpoint.y;

                transpoint = markupobject.setinitRotatedMarkupPoint(centercanvX, centercanvY, x2, y2, CanvRotRad);
                x2 = transpoint.x;
                y2 = transpoint.y;

                //add document page rotation to markup rotation here.
            }

            return {w : x2, h : y2};
        };

        this.lengthangleCallbackSelect = function(){
            if (markupobject.anglelengthsupport){
                markupobject.lengthangleCallback(this.xscaled, this.yscaled, this.wscaled, this.hscaled,
                                                 Globals.DocObj.pages[Globals.DocObj.currentpage].drotation);
            }
            if(markupobject.setRadiusSupport){
                markupobject.radiusCallback(this.xscaled, this.yscaled, this.wscaled, this.hscaled,true);
            }

        };

        this.lengthangleCallbackPoints = function(drotation:any){

            if(this.points.length < 2){
                return;
            }

            const x = this.points[this.points.length - 2].x;
            const y = this.points[this.points.length - 2].y;
            const w = this.points[this.points.length - 1].x;
            const h = this.points[this.points.length - 1].y;

            const lengthangle = markupobject.anglelength(x, y, w, h, false);

            lengthangle.length = getUnitlength(lengthangle.length / markupobject.scaling);

            if (RxCore_GUI_markupdrawParams != undefined){
                if(!markupobject.bUsemouseinput){
                    lengthangle.angle -= drotation;
                }
                RxCore_GUI_markupdrawParams.onDrawEvent(lengthangle);
            }
        };

        this.lengthangleCallback = function(x:any,y:any, w:any, h:any, drotation:any){
            const lengthangle = markupobject.anglelength(x, y, w, h, false);
            lengthangle.length = getUnitlength(lengthangle.length / markupobject.scaling);

            if (RxCore_GUI_markupdrawParams != undefined){
                if(!markupobject.bUsemouseinput){
                    lengthangle.angle -= drotation;
                }
                RxCore_GUI_markupdrawParams.onDrawEvent(lengthangle);
            }
        };

        this.radiusCallback = function(x:any,y:any, w:any, h:any, useabs:any){
            const lengthangle = markupobject.anglelength(x, y, w, h, useabs);

            lengthangle.length = getUnitlength(lengthangle.length / markupobject.scaling);
            if (RxCore_GUI_markupdrawParams != undefined){
                RxCore_GUI_markupdrawParams.onDrawEvent(lengthangle);
            }
        };

        this.anglelength = function (startx: any, starty: any, endx: any, endy: any, useabs: any) {
            let width = 0;
            let height = 0;
            width = Math.abs(endx - startx);
            height = Math.abs(endy - starty);
            const dimwsq = Math.pow(width, 2);
            const dimhsq = Math.pow(height, 2);
            const dimdiag = Math.sqrt((dimwsq + dimhsq));
            if (useabs) {
                width = Math.abs(endx - startx);
                height = Math.abs(endy - starty);
            }
            else {
                width = endx - startx;
                height = endy - starty;
            }
            let lineangle = Math.atan2(height, width) * (180 / Math.PI);
            if (lineangle < 0) {
                lineangle *= -1;
            }
            else {
                lineangle = 360 - lineangle;
            }
            return {
                length: dimdiag,
                angle: lineangle
            };
        };
        this.drawme = function (ctx: any) {
            var scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale; // markupobject.scaling;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector; // markupobject.scaling;
            }
            else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                scalefactor = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf); // markupobject.scaling;
            }
            else {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale; // markupobject.scaling;
                if (Globals.DocObj.Type == 0) {
                    scalefactor = Globals.DocObj.pages[0].dscale; // markupobject.scaling;
                }
            }
            markupobject.fixedscaleFactor = scalefactor / Globals.DocObj.pages[Globals.DocObj.currentpage].fixedScale;
            if (Globals.bUseFixedScale) {
                var linewidthlocal = this.linewidth * markupobject.fixedscaleFactor;
            }
            else {
                linewidthlocal = this.linewidth;
            }
            if (Globals.bUseFixedScale) {
                var arrowlengthlocal = this.arrowlength * markupobject.fixedscaleFactor;
            }
            else {
                arrowlengthlocal = this.arrowlength;
            }
            /*if (DocObj.pages[DocObj.currentpage].drotation != 0) {
                var txcanv = (canvasowidth / 2);
                var tycanv = (canvasoheight / 2);
                ctx.save();
                ctx.translate(txcanv, tycanv);
                ctx.rotate((360 - DocObj.pages[DocObj.currentpage].drotation) * (Math.PI / 180));
                ctx.translate(-txcanv, -tycanv);

            }*/
            switch (this.type) {
                case 0: //pencil
                    ctx.save();
                    if (this.subtype == 1) {
                        if (Globals.DocObj.backgroundColor != undefined) {
                            ctx.strokeStyle = Globals.DocObj.backgroundColor;
                        }
                        else {
                            ctx.strokeStyle = "white";
                        }
                        ctx.lineWidth = linewidthlocal * 10;
                    }
                    else {
                        ctx.lineWidth = linewidthlocal;
                        ctx.strokeStyle = this.strokecolor;
                        this.GetLinestyle(markupobject.linestyle, ctx, 1);
                    }
                    ctx.lineTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
                    ctx.stroke();
                    ctx.restore();
                    break;
                case 1: //polygon
                    /*switch (this.subtype){
                        case 3:
                            //markupobject.findrectangle();
                            break;

                    }*/
                    var coords = markupobject.setDimDrawme();
                    this.setlastpoint(coords.w, coords.h);
                    this.AdjustForRotation(false);
                    this.drawmescaled(ctx);
                    break;
                case 2:
                    switch (this.subtype) {
                        case 1:
                            markupobject.polycurves(ctx, markupobject.linewidth, markupobject.color, 1);
                            break;
                    }
                    break;
                case 3: //rectangle
                    this.xscaled = this.x;
                    this.yscaled = this.y;
                    this.wscaled = this.w;
                    this.hscaled = this.h;
                    this.AdjustForRotation(false);
                    this.drawmescaled(ctx);
                    break;
                case 4: //oval
                    this.xscaled = this.x;
                    this.yscaled = this.y;
                    this.wscaled = this.w;
                    this.hscaled = this.h;
                    this.AdjustForRotation(false);
                    if (this.subtype == 1){
                        markupobject.radiusCallback(this.xscaled, this.yscaled, this.wscaled, this.hscaled, true);
                    }
                    this.drawmescaled(ctx);
                    break;
                case 5: //cloud//(ctx,x,y,width,height,radius,linewidth,fill,stroke,fillcolor,strokecolor)
                    this.xscaled = this.x;
                    this.yscaled = this.y;
                    this.wscaled = this.w;
                    this.hscaled = this.h;
                    this.AdjustForRotation(false);
                    this.drawmescaled(ctx);
                    break;
                case 6: //line, arrow
                    /*ctx.save();
                    markupobject.GetLinestyle(markupobject.linestyle,ctx,1);
                    var coords = markupobject.setDimDrawme();
                    markupobject.arrow(ctx, coords.x, coords.y, this.w, this.h, arrowlengthlocal, arrowangle, linewidthlocal, this.subtype, markupobject.strokecolor, markupobject.strokecolor);
                    ctx.restore();*/
                    if (Globals.bOrthoOn) {
                        markupobject.calculateOrtho(false, 0, { x: 0, y: 0 });
                    }
                    var coords = markupobject.setDimDrawme();

                    if(!Globals.bOrthoOn){
                        this.w = coords.w;
                        this.h = coords.h;
                    }

                    this.xscaled = this.x;
                    this.yscaled = this.y;
                    this.wscaled = this.w;
                    this.hscaled = this.h;
                    if (markupobject.bUsemouseinput) {
                        this.AdjustForRotation(false);
                    }
                    markupobject.lengthangleCallback(this.xscaled, this.yscaled, this.wscaled, this.hscaled,
                         Globals.DocObj.pages[Globals.DocObj.currentpage].drotation);

                    /* const lengthangle = markupobject.anglelength(this.xscaled, this.yscaled, this.wscaled, this.hscaled, false);
                    lengthangle.length = getUnitlength(lengthangle.length / markupobject.scaling);
                    if (RxCore_GUI_markupdrawParams != undefined) {
                        if (!markupobject.bUsemouseinput) {
                            lengthangle.angle -= Globals.DocObj.pages[Globals.DocObj.currentpage].drotation;
                        }
                        RxCore_GUI_markupdrawParams.onDrawEvent(lengthangle);
                    }
                    */
                    this.drawmescaled(ctx);
                    break;
                case 7: //dimension line
                    if (Globals.bOrthoOn) {
                        markupobject.calculateOrtho(false, 0, { x: 0, y: 0 });
                    }
                    /*ctx.save();
                    markupobject.GetLinestyle(markupobject.linestyle,ctx,1);
                    var dimtype = this.subtype + 4;
                    var coords = markupobject.setDimDrawme();
                    markupobject.arrow(ctx, coords.x, coords.y, this.w, this.h, arrowlengthlocal, arrowangle, linewidthlocal, dimtype, markupobject.strokecolor, markupobject.strokecolor);
                    ctx.restore();
                    markupobject.setdimvalue(this.x, this.y, this.w, this.h);
                    if(bUseFixedScale){
                        var localscale = markupobject.fixedscaleFactor;
                    }else{
                        localscale = 1;
                    }

                    markupobject.dimvaluedraw(ctx, coords.x, coords.y, coords.w, coords.h, this.strokecolor, localscale,true);*/
                    var coords = markupobject.setDimDrawme();
                    this.w = coords.w;
                    this.h = coords.h;
                    this.xscaled = this.x;
                    this.yscaled = this.y;
                    this.wscaled = this.w;
                    this.hscaled = this.h;
                    this.AdjustForRotation(false);
                    this.drawmescaled(ctx);
                    break;
                case 8:
                    var coords = markupobject.setDimDrawme();
                    this.setlastpoint(coords.w, coords.h);
                    if(markupobject.bUsemouseinput){
                        this.AdjustForRotation(false);
                    }
                    markupobject.lengthangleCallbackPoints(Globals.DocObj.pages[Globals.DocObj.currentpage].drotation);

                    this.drawmescaled(ctx);
                    break;
                case 9: //text markup
                    ctx.font = this.font.fontstring;
                    var dim = ctx.measureText(this.text);
                    this.textwidth = dim.width;
                    this.w = this.textwidth;
                    this.h = this.textheight;
                    ctx.textAlign = "start";
                    //cursor
                    //drawing of text goes here.
                    ctx.fillStyle = markupobject.fillcolor;
                    //ctx.font = this.textheight + "pt Helvetica";
                    if (this.subtype == 1) {
                        markupobject.Rect(ctx, this.x, this.y, this.w, this.h, this.linewidth, true, true, markupobject.fillcolor, markupobject.strokecolor);
                        ctx.fillText(this.text, this.x + 10, this.y + this.h + 10);
                    }
                    else {
                        //fontstylevalue.value;
                        ctx.fillText(this.text, this.x, this.y);
                        this.xscaled = this.x;
                        this.yscaled = this.y;
                        this.wscaled = this.w;
                        this.hscaled = this.h;
                    }
                    break;
                case 10:
                    this.w = Globals.noteimage.width;
                    this.h = Globals.noteimage.height;
                    ctx.drawImage(Globals.noteimage, this.x, this.y, this.w, this.h);
                    this.xscaled = this.x;
                    this.yscaled = this.y;
                    this.wscaled = this.w;
                    this.hscaled = this.h;
                    break;
                case 11:
                    this.w = this.image.width;
                    this.h = this.image.height;
                    if (markupobject.imageloaded) {
                        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
                    }
                    this.xscaled = this.x;
                    this.yscaled = this.y;
                    this.wscaled = this.w;
                    this.hscaled = this.h;
                    break;
                case 12:
                    this.xscaled = this.x;
                    this.yscaled = this.y;
                    this.wscaled = this.w;
                    this.hscaled = this.h;
                    this.AdjustForRotation(false);
                    this.drawmescaled(ctx);
                    break;
            }
            /*if (DocObj.pages[DocObj.currentpage].drotation != 0) {
                ctx.restore();
            }*/
        };
        this.drawmescaled = function (ctx: any) {
            var scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale; // markupobject.scaling;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector; // markupobject.scaling;
            }
            else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                scalefactor = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf); // markupobject.scaling;
            }
            else {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale; // markupobject.scaling;
                if (Globals.DocObj.Type == 0) {
                    scalefactor = Globals.DocObj.pages[0].dscale; // markupobject.scaling;
                }
            }
            //var fixedscale = DocObj.pages[DocObj.currentpage].fixedScale;
            markupobject.fixedscaleFactor = scalefactor / Globals.DocObj.pages[Globals.DocObj.currentpage].fixedScale;
            scalefactor /= markupobject.scaling;
            var pagedx = 0;
            var pagedy = 0;
            if (Globals.DocObj.Type == 0) {
                var docdx = Globals.DocObj.pages[0].dx;
            }
            else {
                docdx = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
            }
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                pagedx = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            }
            else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                pagedx = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;
            }
            else {
                pagedx = docdx;
                pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;
            }
            //console.log(pagedx);
            //console.log(pagedy);
            let xscalepoint = 0;
            let yscalepoint = 0;
            let arrowlengthscaled;
            let radiusScaled;
            if (Globals.bUseFixedScale) {
                arrowlengthscaled = this.arrowlength * markupobject.fixedscaleFactor;
            }
            else {
                arrowlengthscaled = this.arrowlength * scalefactor;
            }
            if (Globals.bUseFixedScale) {
                radiusScaled = 10 * markupobject.fixedscaleFactor;
            }
            else {
                radiusScaled = 10 * scalefactor;
            }
            var textoffsetScaled = (this.h / 10) * scalefactor;
            let linewidthScaled;
            let crossl;
            if (Globals.bUseFixedScale) {
                linewidthScaled = this.linewidth * markupobject.fixedscaleFactor;
                crossl = 5 * markupobject.fixedscaleFactor;
            }
            else {
                linewidthScaled = this.linewidth * scalefactor;
                crossl = 5 * scalefactor;
            }
            var leaderOffsetScalded = this.leaderoffset * scalefactor;
            var tx = 0;
            var ty = 0;
            var ptrn = getHatch(ctx, markupobject.hatchStyle, this.color);
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                var txcanv = (Globals.canvasowidth / 2);
                var tycanv = (Globals.canvasoheight / 2);
                ctx.save();
                ctx.translate(txcanv, tycanv);
                ctx.rotate(Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180));
                ctx.translate(-txcanv, -tycanv);
            }
            switch (this.type) {
                case 0: //pencil, marker, eraser
                    var counter = 0;
                    var lcounter = 0;
                    markupobject.SetDimensions(scalefactor, Globals.DocObj.pages[Globals.DocObj.currentpage].drotation, pagedx, pagedy);
                    /*xscalepoint = this.pointlist[0][0].x - this.xoffset * scalefactor;
                    yscalepoint = this.pointlist[0][0].y - this.yoffset * scalefactor;

                    //xscalepoint = (this.points[0].x - this.xoffset) * scalefactor;
                    //yscalepoint = (this.points[0].y - this.yoffset) * scalefactor;

                    if (DocObj.pages[DocObj.currentpage].usevectorxml) {
                        xscalepoint += DocObj.pages[DocObj.currentpage].dxvector;
                        yscalepoint += DocObj.pages[DocObj.currentpage].dyvector;
                    } else if (DocObj.pages[DocObj.currentpage].usepdfjs) {

                        xscalepoint += DocObj.pages[DocObj.currentpage].dxpdf;
                        yscalepoint += DocObj.pages[DocObj.currentpage].dypdf;

                    } else {
                        xscalepoint += DocObj.pages[DocObj.currentpage].dx;
                        yscalepoint += DocObj.pages[DocObj.currentpage].dy;

                    }*/
                    ctx.save();
                    if (this.subtype == 1) {
                        if (Globals.DocObj.backgroundColor != undefined) {
                            ctx.strokeStyle = Globals.DocObj.backgroundColor;
                        }
                        else {
                            ctx.strokeStyle = "white";
                        }
                        ctx.lineWidth = linewidthScaled * 10;
                    }
                    else {
                        ctx.strokeStyle = this.strokecolor;
                        ctx.lineWidth = linewidthScaled;
                        markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                    }
                    ctx.beginPath();
                    for (lcounter = 0; lcounter < this.pointlist.length; lcounter++) {
                        for (counter = 0; counter < this.pointlist[lcounter].length; counter++) {
                            xscalepoint = (this.pointlist[lcounter][counter].x - this.xoffset) * scalefactor;
                            yscalepoint = (this.pointlist[lcounter][counter].y - this.yoffset) * scalefactor;
                            //xscalepoint = (this.points[counter].x - this.xoffset) * scalefactor;
                            //yscalepoint = (this.points[counter].y - this.yoffset) * scalefactor;
                            xscalepoint += pagedx;
                            yscalepoint += pagedy;
                            if (counter == 0) {
                                ctx.moveTo(xscalepoint, yscalepoint);
                            }
                            else {
                                ctx.lineTo(xscalepoint, yscalepoint);
                            }
                        }
                    }
                    ctx.stroke();
                    ctx.restore();
                    if (markupobject.selected) {
                        markupobject.select(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, true, false);
                    }
                    break;
                case 1: //polygon
                    var pcounter = 0;
                    markupobject.SetDimensions(scalefactor, Globals.DocObj.pages[Globals.DocObj.currentpage].drotation, pagedx, pagedy);
                    switch (this.subtype) {
                        case 1:
                            ctx.save();
                            markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                            markupobject.polyline(ctx, markupobject.linewidth, markupobject.strokecolor, scalefactor, pagedx, pagedy, true);
                            ctx.restore();
                            break;
                        case 2:
                            if (this.alternative == 0) {
                                ctx.save();
                                markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                                markupobject.polygon(ctx, markupobject.linewidth, false, true, markupobject.fillcolor, markupobject.strokecolor, scalefactor, pagedx, pagedy, true);
                                ctx.restore();
                            }
                            if (this.alternative == 1) {
                                ctx.save();
                                markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                                markupobject.polygon(ctx, markupobject.linewidth, true, true, markupobject.fillcolor, markupobject.strokecolor, scalefactor, pagedx, pagedy, true);
                                ctx.restore();
                            }
                            if (this.alternative == 2) {
                                markupobject.polygon(ctx, markupobject.linewidth, true, true, "white", markupobject.color, scalefactor, pagedx, pagedy, true);
                            }
                            if (this.alternative >= 3) {
                                markupobject.polygon(ctx, markupobject.linewidth, true, true, ptrn, markupobject.color, scalefactor, pagedx, pagedy, true);
                            }
                            break;
                        case 3:
                            ctx.save();
                            markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                            markupobject.polyline(ctx, markupobject.linewidth, markupobject.strokecolor, scalefactor, pagedx, pagedy, true);
                            ctx.restore();
                            //markupobject.findrectangle();
                            markupobject.setdimvaluepoly();
                            if (Globals.bUseFixedScale) {
                                markupobject.dimvaluedraw(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, this.strokecolor, markupobject.fixedscaleFactor, false);
                            }
                            else {
                                markupobject.dimvaluedraw(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, this.strokecolor, scalefactor, false);
                            }
                            //markupobject.setdimvaluepoly();
                            //markupobject.findrectangle();
                            //markupobject.dimvaluedraw(ctx, this.x, this.y, this.w, this.h, this.color, 1);
                            break;
                    }
                    if (markupobject.selected) {
                        markupobject.select(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, true, false);
                    }
                    if (markupobject.selectedit) {
                        markupobject.editpolygon(ctx, scalefactor);
                    }
                    break;
                case 2:
                    var curvcounter = 0;
                    markupobject.SetDimensions(scalefactor, Globals.DocObj.pages[Globals.DocObj.currentpage].drotation, pagedx, pagedy);
                    switch (this.subtype) {
                        case 1:
                            markupobject.polycurves(ctx, markupobject.linewidth, markupobject.color, scalefactor);
                            break;
                    }
                    if (markupobject.selected) {
                        markupobject.select(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, true, false);
                    }
                    if (markupobject.selectedit) {
                        markupobject.editpolygon(ctx, scalefactor);
                    }
                    break;
                case 3: //rectangle
                    markupobject.SetDimensions(scalefactor, Globals.DocObj.pages[Globals.DocObj.currentpage].drotation, pagedx, pagedy);
                    if (this.subtype == 2) {
                        if (Globals.DocObj.backgroundColor != undefined) {
                            var erasecolor = Globals.DocObj.backgroundColor;
                        }
                        else {
                            erasecolor = "white";
                        }
                        markupobject.Rect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, false, erasecolor, erasecolor);
                        //ctx.lineWidth = this.linewidth * 10 * scalefactor;
                    }
                    if (this.subtype == 3) {
                        markupobject.Rect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, false, markupobject.fillcolor, markupobject.fillcolor);
                    }
                    if (this.subtype == 1) {
                        //
                        if (this.alternative == 0) {
                            ctx.save();
                            markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                            markupobject.roundedRect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, markupobject.rotation, radiusScaled, linewidthScaled, false, true, markupobject.fillcolor, markupobject.strokecolor);
                            ctx.restore();
                        }
                        if (this.alternative == 1) {
                            ctx.save();
                            markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                            markupobject.roundedRect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, markupobject.rotation, radiusScaled, linewidthScaled, true, true, markupobject.fillcolor, markupobject.strokecolor);
                            ctx.restore();
                        }
                        if (this.alternative == 2) {
                            markupobject.roundedRect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, markupobject.rotation, radiusScaled, linewidthScaled, true, true, "white", this.color);
                        }
                        if (this.alternative >= 3) {
                            markupobject.roundedRect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, markupobject.rotation, radiusScaled, linewidthScaled, true, true, ptrn, this.color);
                        }
                    }
                    if (this.subtype == 0) {
                        if (this.alternative == 0) {
                            ctx.save();
                            markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                            markupobject.Rect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, false, true, markupobject.fillcolor, markupobject.strokecolor);
                            ctx.restore();
                        }
                        if (this.alternative == 1) {
                            ctx.save();
                            markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                            markupobject.Rect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, true, markupobject.fillcolor, markupobject.strokecolor);
                            ctx.restore();
                        }
                        if (this.alternative == 2) {
                            markupobject.Rect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, true, "white", this.color);
                        }
                        if (this.alternative >= 3) {
                            //var ptrn = ctx.createPattern(hatchdiagforw,'repeat');
                            markupobject.Rect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, true, ptrn, this.color);
                        }
                    }
                    if (markupobject.selected) {
                        markupobject.select(ctx, this.xscaled, this.yscaled, this.xscaled + this.wscaled, this.yscaled + this.hscaled, true, true);
                    }
                    break;
                case 4: //oval
                    markupobject.SetDimensions(scalefactor, Globals.DocObj.pages[Globals.DocObj.currentpage].drotation, pagedx, pagedy);
                    if (this.alternative == 0) {
                        ctx.save();
                        markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                        if (this.subtype == 1) {
                            markupobject.Circle(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, false, true, markupobject.fillcolor, markupobject.strokecolor);
                            markupobject.drawradius(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, crossl, linewidthScaled, markupobject.strokecolor, false);
                        }
                        else {
                            markupobject.Oval(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, false, true, markupobject.fillcolor, markupobject.strokecolor);
                        }
                        ctx.restore();
                    }
                    if (this.alternative == 1) {
                        ctx.save();
                        markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                        if (this.subtype == 1) {
                            markupobject.Circle(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, true, markupobject.fillcolor, markupobject.strokecolor);
                            markupobject.drawradius(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, crossl, linewidthScaled, markupobject.strokecolor, false); // TODO:JS->TS:CHECK added crossl param ( it was missing in the original )
                        }
                        else {
                            markupobject.Oval(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, true, markupobject.fillcolor, markupobject.strokecolor);
                        }
                        ctx.restore();
                    }
                    if (this.alternative == 2) {
                        markupobject.Oval(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, true, "white", this.color);
                    }
                    if (this.alternative >= 3) {
                        markupobject.Oval(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, true, ptrn, this.color);
                    }
                    if (markupobject.selected) {
                        if (this.subtype == 1) {
                            // markupobject.select(ctx, this.xscaled, this.yscaled, this.xscaled + this.wscaled, this.yscaled + this.hscaled, false, false);
                            markupobject.select(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, false, false);
                        }
                        else {
                            markupobject.select(ctx, this.xscaled, this.yscaled, this.xscaled + this.wscaled, this.yscaled + this.hscaled, true, true);
                        }
                    }
                    break;
                case 5:
                    markupobject.SetDimensions(scalefactor, Globals.DocObj.pages[Globals.DocObj.currentpage].drotation, pagedx, pagedy);
                    if (this.alternative == 0) {
                        ctx.save();
                        markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                        //markupobject.cloud(ctx,this.xscaled,this.yscaled,this.wscaled,this.hscaled,radiusScaled,linewidthScaled,false,true,this.color,this.color);
                        markupobject.newcloud(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, radiusScaled, linewidthScaled, false, true, markupobject.fillcolor, markupobject.strokecolor);
                        ctx.restore();
                    }
                    if (this.alternative == 1) {
                        //markupobject.cloud(ctx,this.xscaled,this.yscaled,this.wscaled,this.hscaled,radiusScaled,linewidthScaled,true,true,this.color,this.color);
                        ctx.save();
                        markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                        markupobject.newcloud(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, radiusScaled, linewidthScaled, true, true, markupobject.fillcolor, markupobject.strokecolor);
                        ctx.restore();
                    }
                    if (this.alternative == 2) {
                        //markupobject.cloud(ctx,this.xscaled,this.yscaled,this.wscaled,this.hscaled,radiusScaled,linewidthScaled,true,true,"white",this.color);
                        markupobject.newcloud(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, radiusScaled, linewidthScaled, true, true, "white", this.color);
                    }
                    if (this.alternative >= 3) {
                        //markupobject.cloud(ctx,this.xscaled,this.yscaled,this.wscaled,this.hscaled,radiusScaled,linewidthScaled,true,true,ptrn,this.color);
                        markupobject.newcloud(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, radiusScaled, linewidthScaled, true, true, ptrn, this.color);
                    }
                    if (markupobject.selected) {
                        markupobject.select(ctx, this.xscaled, this.yscaled, this.xscaled + this.wscaled, this.yscaled + this.hscaled, true, true);
                    }
                    break;
                case 6: //line arrow
                    markupobject.SetDimensions(scalefactor, Globals.DocObj.pages[Globals.DocObj.currentpage].drotation, pagedx, pagedy);
                    ctx.save();
                    markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                    markupobject.arrow(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, arrowlengthscaled, arrowangle, linewidthScaled, this.subtype, markupobject.strokecolor, markupobject.strokecolor);
                    ctx.restore();
                    if (markupobject.selected) {
                        markupobject.select(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, false, false);
                    }
                    break;
                case 7: //dimension line
                    markupobject.SetDimensions(scalefactor, Globals.DocObj.pages[Globals.DocObj.currentpage].drotation, pagedx, pagedy);
                    var dimtype = this.subtype + 4;
                    ctx.save();
                    markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                    this.labelpos = markupobject.dimensionLeader(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, leaderOffsetScalded, arrowlengthscaled, arrowangle, linewidthScaled, dimtype, markupobject.strokecolor, markupobject.strokecolor);
                    ctx.restore();
                    if (markupobject.selected) {
                        markupobject.select(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, false, false);
                        if (this.leaderoffset == 0) {
                            markupobject.selectLabel(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, false, false);
                        }
                        else {
                            markupobject.selectLabel(ctx, this.labelpos.x, this.labelpos.y, this.labelpos.w, this.labelpos.h, false, false);
                        }
                    }
                    markupobject.setdimvalue(this.x, this.y, this.w, this.h);
                    if (Globals.bUseFixedScale) {
                        if (this.leaderoffset == 0) {
                            markupobject.dimvaluedraw(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, this.strokecolor, markupobject.fixedscaleFactor, true);
                        }
                        else {
                            markupobject.dimvaluedraw(ctx, this.labelpos.x, this.labelpos.y, this.labelpos.w, this.labelpos.h, this.strokecolor, markupobject.fixedscaleFactor, true);
                        }
                    }
                    else {
                        if (this.leaderoffset == 0) {
                            markupobject.dimvaluedraw(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, this.strokecolor, scalefactor, true);
                        }
                        else {
                            markupobject.dimvaluedraw(ctx, this.labelpos.x, this.labelpos.y, this.labelpos.w, this.labelpos.h, this.strokecolor, scalefactor, true);
                        }
                    }
                    break;
                case 8:
                    var acounter = 0;
                    var dimarea = 0;
                    markupobject.SetDimensions(scalefactor, Globals.DocObj.pages[Globals.DocObj.currentpage].drotation, pagedx, pagedy);
                    if (Globals.bUseFixedScale) {
                        var localscalefactor = markupobject.fixedscaleFactor;
                    }
                    else {
                        localscalefactor = scalefactor;
                    }
                    if (this.alternative == 0) {
                        ctx.save();
                        markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                        markupobject.polygon(ctx, markupobject.linewidth, false, true, markupobject.fillcolor, markupobject.strokecolor, scalefactor, pagedx, pagedy, true);
                        ctx.restore();
                    }
                    if (this.alternative == 1) {
                        ctx.save();
                        markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                        markupobject.polygon(ctx, markupobject.linewidth, true, true, markupobject.fillcolor, markupobject.strokecolor, scalefactor, pagedx, pagedy, true);
                        ctx.restore();
                    }
                    if (this.alternative == 2) {
                        markupobject.polygon(ctx, markupobject.linewidth, true, true, "white", markupobject.color, scalefactor, pagedx, pagedy, true);
                    }
                    if (this.alternative >= 3) {
                        markupobject.polygon(ctx, markupobject.linewidth, true, true, ptrn, markupobject.color, scalefactor, pagedx, pagedy, true);
                    }
                    if (markupobject.selected) {
                        markupobject.select(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, true, false);
                    }
                    if (markupobject.selectedit) {
                        markupobject.editpolygon(ctx, scalefactor);
                    }
                    var markupscalesq = this.scaling * this.scaling;
                    dimarea = markupobject.PolygonArea();
                    this.dimtext = getUnitArea(dimarea / markupscalesq);
                    this.dimtext = (+this.dimtext).toFixed(2); // JS->TS:INFO toFixed only exists on number; converted to number
                    this.dimtext = this.dimtext + " " + Globals.AreaUnitlabel;
                    var centroidpt = get_polygon_centroid(this.points);
                    //var areatextx = markupobject.PolygonCentre('x');
                    //var areatexty = markupobject.PolygonCentre('y');
                    var areatextx = centroidpt.x;
                    var areatexty = centroidpt.y;
                    var areatextxscaled = (areatextx - this.xoffset) * scalefactor;
                    var areatextyscaled = (areatexty - this.yoffset) * scalefactor;
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                        areatextxscaled = areatextxscaled + Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                        areatextyscaled = areatextyscaled + Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
                    }
                    else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                        areatextxscaled += Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                        areatextyscaled += Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;
                    }
                    else {
                        areatextxscaled = areatextxscaled + Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                        areatextyscaled = areatextyscaled + Globals.DocObj.pages[Globals.DocObj.currentpage].dy;
                    }
                    if (!Globals.bMarkupNoLabel) {
                        var areatextscaled = this.measuretextheight * scalefactor;
                        if (Globals.bUseFixedScale) {
                            areatextscaled = this.measuretextheight * markupobject.fixedscaleFactor;
                        }
                        ctx.textAlign = "start";
                        ctx.font = areatextscaled + "pt " + "Helvetica";
                        this.textheight = this.measuretextheight;
                        var areat = ctx.measureText(this.dimtext);
                        var areatextwidth = areat.width;
                        var areatextheight = areatextscaled;
                        areatextxscaled = areatextxscaled - (areatextwidth / 2);
                        areatextyscaled = areatextyscaled + (areatextheight / 2);
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = this.strokecolor;
                        ctx.fillStyle = "white";
                        ctx.fillRect(areatextxscaled - (10 * localscalefactor), areatextyscaled - (20 * localscalefactor), areatextwidth + (20 * localscalefactor), areatextscaled + (15 * localscalefactor));
                        ctx.strokeRect(areatextxscaled - (10 * localscalefactor), areatextyscaled - (20 * localscalefactor), areatextwidth + (20 * localscalefactor), areatextscaled + (15 * localscalefactor));
                        // ctx.fillStyle = this.color;
                        ctx.fillStyle = "black";
                        ctx.fillText(this.dimtext, areatextxscaled, areatextyscaled);
                    }
                    break;
                case 9: //text
                    markupobject.SetDimensions(scalefactor, Globals.DocObj.pages[Globals.DocObj.currentpage].drotation, pagedx, pagedy);
                    if (markupobject.selectedit) {
                        break;
                    }
                    if (Globals.bUseFixedScale) {
                        var temptxtscale = markupobject.fixedscaleFactor;
                    }
                    else {
                        temptxtscale = scalefactor;
                    }
                    this.font.setScale(temptxtscale);
                    var textscaled = this.font.height * temptxtscale;
                    ctx.font = this.font.fontstringScaled;
                    var dimsel = ctx.measureText(this.text);
                    this.textwidth = dimsel.width;
                    //draw text selected goes here.
                    ctx.save();
                    tx = this.xscaled;
                    ty = this.yscaled;
                    if (markupobject.textrotate != 0 && markupobject.subtype == 0) {
                        ctx.translate(tx, ty);
                        ctx.rotate(markupobject.textrotate);
                        ctx.translate(-tx, -ty);
                    }
                    //console.log(markupobject.rotation * (180 / Math.PI));
                    if (markupobject.rotation != 0) {
                        tx = this.xscaled + (this.wscaled / 2);
                        if (markupobject.subtype == 0) {
                            ty = this.yscaled - (this.hscaled / 2);
                        }
                        else {
                            ty = this.yscaled + (this.hscaled / 2);
                        }
                        ctx.translate(tx, ty);
                        ctx.rotate(markupobject.rotation);
                        ctx.translate(-tx, -ty);
                    }
                    ctx.textAlign = "start";
                    ctx.fillStyle = markupobject.textcolor;
                    if (this.subtype == 1) {
                        //markupobject.fillcolor = "rgba(255,255,255, 0.9)";
                        //this.textcolor = "rgba(255,255,255, 0.9)";
                        var toffsetx = 4 * temptxtscale;
                        //var toffsety = 2*scalefactor;
                        var toffsety = ((this.font.height / 4) * 2.0) * temptxtscale;
                        if (markupobject.linewidth == 0) {
                            markupobject.Rect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, false, markupobject.fillcolor, markupobject.strokecolor);
                        }
                        else {
                            ctx.save();
                            markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                            markupobject.Rect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, true, markupobject.fillcolor, markupobject.strokecolor);
                            ctx.restore();
                        }
                        ctx.save();
                        ctx.beginPath();
                        ctx.rect(this.xscaled, this.yscaled, this.wscaled, this.hscaled);
                        ctx.clip();
                        //ctx.font=font;
                        //ctx.fillText(theText,3,50);
                        //wraptext(ctx, this.text, x, y, maxWidth, lineHeight);
                        var textarray = this.text.split('\n');
                        var ystart = this.yscaled + textscaled + toffsety;
                        var ttx = this.xscaled; // + (this.wscaled);
                        var tty = this.yscaled; //+ (this.hscaled/2);
                        var txtrotate = markupobject.textrotate * (180 / Math.PI);
                        let maxwidth:any; // JS->TS:CHECK check usage
                        let startx;
                        switch (markupobject.pagerotation) {
                            case 0:
                                startx = this.xscaled + toffsetx;
                                maxwidth = this.wscaled;
                                break;
                            case 90:
                                startx = (this.xscaled + toffsetx) - this.hscaled;
                                ctx.translate(ttx, tty);
                                ctx.rotate(-(markupobject.pagerotation * (Math.PI / 180)));
                                ctx.translate(-ttx, -tty);
                                maxwidth = this.hscaled;
                                break;
                            case 270:
                                //startx = this.xscaled + toffsetx;
                                startx = (this.xscaled + toffsetx); // + this.hscaled;
                                //ystart = (this.yscaled + toffsety) - this.wscaled;
                                ystart = (this.yscaled + textscaled + toffsety) - this.wscaled;
                                ctx.translate(ttx, tty);
                                ctx.rotate(-(markupobject.pagerotation * (Math.PI / 180)));
                                ctx.translate(-ttx, -tty);
                                maxwidth = this.hscaled;
                                break;
                            case 180:
                                startx = this.xscaled + toffsetx;
                                ttx = this.xscaled + (this.wscaled / 2);
                                tty = this.yscaled + (this.hscaled / 2);
                                ctx.translate(ttx, tty);
                                ctx.rotate(-(markupobject.pagerotation * (Math.PI / 180)));
                                ctx.translate(-ttx, -tty);
                                //adjust maxwidth to match text area
                                maxwidth = this.wscaled;
                                break;
                        }
                        maxwidth -= 5;
                        wrapText(ctx, this.text, startx, ystart, maxwidth, textscaled + toffsety);
                        /*for (var i = 0; i < textarray.length; i++) {

                            ctx.fillText(textarray[i], startx , ystart);
                            ystart += textscaled + toffsety;
                            //ctx.fillText(textarray[i], x + 5, ystart);

                        }*/
                        ctx.restore();
                    }
                    else {
                        ctx.fillText(this.text, this.xscaled, this.yscaled);
                    }
                    ctx.restore();
                    if (markupobject.selected) {
                        if (this.subtype == 1) {
                            markupobject.select(ctx, this.xscaled, this.yscaled, this.xscaled + this.wscaled, this.yscaled + this.hscaled, true, true);
                        }
                        else {
                            markupobject.select(ctx, this.xscaled, this.yscaled, this.xscaled + this.wscaled, this.yscaled - this.hscaled, true, true);
                        }
                    }
                    break;
                case 10:
                    markupobject.SetDimensions(scalefactor, Globals.DocObj.pages[Globals.DocObj.currentpage].drotation, pagedx, pagedy);
                    /*if (bUseFixedScale){

                    }else{
                        markupobject.SetDimensions(scalefactor, DocObj.pages[DocObj.currentpage].drotation, pagedx, pagedy);
                    }*/
                    ctx.save();
                    tx = this.xscaled;
                    ty = this.yscaled;
                    if (markupobject.rotation != 0) {
                        tx = this.xscaled + (this.wscaled / 2);
                        ty = this.yscaled - (this.hscaled / 2);
                        ctx.translate(tx, ty);
                        ctx.rotate(markupobject.rotation);
                        ctx.translate(-tx, -ty);
                    }
                    ctx.drawImage(Globals.noteimage, this.xscaled, this.yscaled, this.wscaled, this.hscaled);
                    ctx.restore();
                    if (markupobject.selected) {
                        markupobject.select(ctx, this.xscaled, this.yscaled, this.xscaled + this.wscaled, this.yscaled + this.hscaled, true, false);
                    }
                    break;
                case 11:
                    if (!markupobject.imageloaded) {
                        break;
                    }
                    markupobject.SetDimensions(scalefactor, Globals.DocObj.pages[Globals.DocObj.currentpage].drotation, pagedx, pagedy);
                    ctx.save();
                    tx = this.xscaled;
                    ty = this.yscaled;
                    if (markupobject.rotation != 0) {
                        tx = this.xscaled + (this.wscaled / 2);
                        ty = this.yscaled + (this.hscaled / 2);
                        ctx.translate(tx, ty);
                        ctx.rotate(markupobject.rotation);
                        ctx.translate(-tx, -ty);
                    }
                    if (markupobject.imageloaded) {
                        ctx.drawImage(this.image, this.xscaled, this.yscaled, this.wscaled, this.hscaled);
                    }
                    ctx.restore();
                    if (markupobject.selected) {
                        markupobject.select(ctx, this.xscaled, this.yscaled, this.xscaled + this.wscaled, this.yscaled + this.hscaled, true, true);
                    }
                    break;
                case 12:
                    markupobject.SetDimensions(scalefactor, Globals.DocObj.pages[Globals.DocObj.currentpage].drotation, pagedx, pagedy);
                    var textstampscaled = this.font.height * scalefactor;
                    this.font.setScale(scalefactor);
                    var textsmallstampscaled = markupobject.stampsmalltheight * scalefactor;
                    if (Globals.bUseFixedScale) {
                        markupobject.roundedRect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, markupobject.rotation, radiusScaled, 3 * markupobject.fixedscaleFactor, true, true, markupobject.fillcolor, markupobject.strokecolor);
                    }
                    else {
                        markupobject.roundedRect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, markupobject.rotation, radiusScaled, 3 * scalefactor, true, true, markupobject.fillcolor, markupobject.strokecolor);
                    }
                    if (markupobject.selected) {
                        markupobject.select(ctx, this.xscaled, this.yscaled, this.xscaled + this.wscaled, this.yscaled + this.hscaled, true, true);
                    }
                    var Displayname = GetDisplayName(markupobject.signature);
                    var datetext = markupobject.GetDateTime(false);
                    //var smalltext = "By " + markupobject.signature + "," + " ";
                    this.smalltext = "By " + Displayname + "," + " ";
                    this.smalltext += datetext;
                    /*if (this.subtype != 100) {
                        markupobject.text = Stamplist[this.subtype];
                    }*/
                    /*if (this.subtype == 0){ markupobject.text = "Approved";}
                     if (this.subtype == 1){ markupobject.text = "Draft";}
                     if (this.subtype == 2){ markupobject.text = "Received";}
                     if (this.subtype == 3){ markupobject.text = "Rejected";}
                     if (this.subtype == 4){ markupobject.text = "Reviewed";}
                     if (this.subtype == 5){ markupobject.text = "Revised";}*/
                    ctx.save();
                    if (markupobject.rotation != 0) {
                        tx = this.xscaled + (this.wscaled / 2);
                        ty = this.yscaled + (this.hscaled / 2);
                        ctx.translate(tx, ty);
                        ctx.rotate(markupobject.rotation);
                        ctx.translate(-tx, -ty);
                    }
                    /*var heightorient = this.hscaled;
                     var widthorient = this.wscaled;
                     //main stamp text.
                     if(this.hscaled > this.wscaled){
                     heightorient = this.wscaled;
                     widthorient = this.hscaled;
                     }else
                     markupobject.textheight = (heightorient/4);*/
                    /*if(DocObj.pages[DocObj.currentpage].drotation == 90 || DocObj.pages[DocObj.currentpage].drotation == 270){
                     markupobject.textheight = (this.wscaled/4);
                     tx = this.xscaled+(this.hscaled/2);
                     ty = this.yscaled+(this.wscaled/2)-textoffsetScaled;

                     }else{

                     }*/
                    ctx.fillStyle = markupobject.strokecolor;
                    //ctx.font = "bold " + textstampscaled + "pt " + "Times New Roman";
                    ctx.font = this.font.fontstringScaled;
                    var stampdim = ctx.measureText(this.text);
                    this.textwidth = stampdim.width;
                    tx = this.xscaled + (this.wscaled / 2);
                    //ty = this.yscaled+(this.hscaled/2);
                    if (this.alternative == 0) {
                        ty = this.yscaled + ((this.hscaled / 4) + (textstampscaled / 2));
                    }
                    else {
                        ty = this.yscaled + (this.hscaled / 2);
                        ty += (textstampscaled / 4);
                    }
                    //tx = this.xscaled+(this.wscaled/2);
                    //ty = this.yscaled+(this.hscaled/2);
                    if (markupobject.textrotate != 0) {
                        ty = this.yscaled + (this.hscaled / 2);
                        ctx.translate(tx, ty);
                        ctx.rotate(markupobject.textrotate);
                        ctx.translate(-tx, -ty);
                        tx = this.xscaled + (this.wscaled / 2);
                        //ty = this.yscaled+(this.hscaled/2);
                        if (this.alternative == 0) {
                            ty = this.yscaled + ((this.hscaled / 4) + (textstampscaled / 2));
                        }
                        else {
                            ty = this.yscaled + (this.hscaled / 2);
                            ty += (textstampscaled / 4);
                        }
                    }
                    ctx.textAlign = 'center';
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation == 90 || Globals.DocObj.pages[Globals.DocObj.currentpage].drotation == 270) {
                        ctx.fillText(this.text, tx, ty);
                    }
                    else {
                        ctx.fillText(this.text, tx, ty);
                    }
                    if (this.alternative == 0) {
                        //stamp information text.
                        //var smalltextsize = markupobject.textheight / 2;
                        ctx.fillStyle = this.color;
                        ctx.font = "bold " + textsmallstampscaled + "pt " + "Times New Roman";
                        /*tx = this.xscaled+(this.wscaled/2);
                         ty = this.yscaled+(this.hscaled/2)+textoffsetScaled;

                         if (markupobject.textrotate !=0){
                         ctx.translate(tx,ty);
                         ctx.rotate(markupobject.textrotate);
                         ctx.translate(-tx,-ty);

                         }*/
                        ty = this.yscaled + ((this.hscaled / 4) * 3);
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation == 90 || Globals.DocObj.pages[Globals.DocObj.currentpage].drotation == 270) {
                            ctx.fillText(this.smalltext, tx, ty);
                        }
                        else {
                            ctx.fillText(this.smalltext, tx, ty);
                        }
                    }
                    ctx.restore();
                    break;
            }
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                ctx.restore();
            }
        };
        this.drawthumb = function (ctx: any) {
            //this.drawprint(ctx,DocObj.pages[DocObj.currentpage].dxthumb,DocObj.pages[DocObj.currentpage].dythumb,DocObj.pages[DocObj.currentpage].dscalethumb);
            this.drawprint(ctx, Globals.DocObj.pages[Globals.DocObj.currentpage].dxthumb, Globals.DocObj.pages[Globals.DocObj.currentpage].dythumb, Globals.DocObj.pages[Globals.DocObj.currentpage].dscalethumb, 0, true);
        };
        this.drawprint = function (ctx: any, dx: any, dy: any, dscale: any, drotation: any, bthumbnail: any) {
            markupobject.fixedscaleFactor = dscale / Globals.DocObj.pages[Globals.DocObj.currentpage].fixedScale;
            let scalefactor = dscale / markupobject.scaling;
            let pagedx = dx;
            let pagedy = dy;
            //var scalefactor = DocObj.pages[DocObj.currentpage].dscalethumb / markupobject.scaling;
            //var pagedx = DocObj.pages[DocObj.currentpage].dxthumb;
            //var pagedy = DocObj.pages[DocObj.currentpage].dythumb;
            let xscalepoint = 0;
            let yscalepoint = 0;
            let arrowlengthscaled;
            if (Globals.bUseFixedScale && !bthumbnail) {
                arrowlengthscaled = this.arrowlength * markupobject.fixedscaleFactor;
            }
            else {
                arrowlengthscaled = this.arrowlength * scalefactor;
            }
            let radiusScaled;
            if (Globals.bUseFixedScale && !bthumbnail) {
                radiusScaled = 10 * markupobject.fixedscaleFactor;
            }
            else {
                radiusScaled = 10 * scalefactor;
            }
            let textoffsetScaled = (this.h / 10) * scalefactor;
            let linewidthScaled;
            if (Globals.bUseFixedScale && !bthumbnail) {
                linewidthScaled = this.linewidth * markupobject.fixedscaleFactor;
            }
            else {
                linewidthScaled = this.linewidth * scalefactor;
            }
            let leaderOffsetScalded = this.leaderoffset * scalefactor;

            let tx = 0;
            let ty = 0;
            let ptrn = getHatch(ctx, markupobject.hatchStyle, this.color);
            switch (this.type) {
                case 0: //pencil, marker, eraser
                    var counter = 0;
                    var lcounter = 0;
                    //markupobject.SetDimensions(scalefactor,0,pagedx,pagedy);
                    markupobject.SetDimensions(scalefactor, drotation, pagedx, pagedy);
                    ctx.save();
                    if (this.subtype == 1) {
                        ctx.strokeStyle = "white";
                        /*if(backgroundColor != undefined){
                            ctx.strokeStyle = backgroundColor;
                        }else{
                            ctx.strokeStyle = "white";
                        }*/
                        ctx.lineWidth = this.linewidth * 10 * scalefactor;
                    }
                    else {
                        ctx.strokeStyle = this.strokecolor;
                        ctx.lineWidth = this.linewidth * scalefactor;
                        markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                    }
                    ctx.beginPath();
                    for (lcounter = 0; lcounter < this.pointlist.length; lcounter++) {
                        for (counter = 0; counter < this.pointlist[lcounter].length; counter++) {
                            xscalepoint = (this.pointlist[lcounter][counter].x - this.xoffset) * scalefactor;
                            yscalepoint = (this.pointlist[lcounter][counter].y - this.yoffset) * scalefactor;
                            xscalepoint += dx;
                            yscalepoint += dy;
                            if (counter == 0) {
                                ctx.moveTo(xscalepoint, yscalepoint);
                            }
                            else {
                                ctx.lineTo(xscalepoint, yscalepoint);
                            }
                        }
                    }
                    ctx.stroke();
                    ctx.restore();
                    break;
                case 1: //polygon
                    var pcounter = 0;
                    markupobject.SetDimensions(scalefactor, drotation, pagedx, pagedy);
                    switch (this.subtype) {
                        case 1:
                            ctx.save();
                            markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                            markupobject.polyline(ctx, markupobject.linewidth, markupobject.strokecolor, scalefactor, dx, dy, true);
                            ctx.restore();
                            break;
                        case 2:
                            if (this.alternative == 0) {
                                ctx.save();
                                markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                                markupobject.polygon(ctx, markupobject.linewidth, false, true, markupobject.fillcolor, markupobject.strokecolor, scalefactor, dx, dy, true);
                                ctx.restore();
                            }
                            if (this.alternative == 1) {
                                markupobject.polygon(ctx, markupobject.linewidth, true, true, markupobject.fillcolor, markupobject.strokecolor, scalefactor, dx, dy, true);
                            }
                            if (this.alternative == 2) {
                                markupobject.polygon(ctx, markupobject.linewidth, true, true, "white", markupobject.color, scalefactor, dx, dy, true);
                            }
                            if (this.alternative >= 3) {
                                markupobject.polygon(ctx, markupobject.linewidth, true, true, ptrn, markupobject.color, scalefactor, dx, dy, true);
                            }
                            break;
                        case 3:
                            ctx.save();
                            markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                            markupobject.polyline(ctx, markupobject.linewidth, markupobject.strokecolor, scalefactor, dx, dy, true);
                            ctx.restore();
                            markupobject.setdimvaluepoly();
                            if (Globals.bUseFixedScale && !bthumbnail) {
                                markupobject.dimvaluedraw(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, this.strokecolor, markupobject.fixedscaleFactor, false);
                            }
                            else {
                                markupobject.dimvaluedraw(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, this.strokecolor, scalefactor, false);
                            }
                            break;
                    }
                    break;
                case 2:
                    var curvcounter = 0;
                    markupobject.SetDimensions(scalefactor, drotation, pagedx, pagedy);
                    switch (this.subtype) {
                        case 1:
                            markupobject.polycurves(ctx, markupobject.linewidth, markupobject.color, scalefactor);
                            break;
                    }
                    break;
                case 3: //rectangle
                    markupobject.SetDimensions(scalefactor, drotation, pagedx, pagedy);
                    if (this.subtype == 2) {
                        if (Globals.DocObj.backgroundColor != undefined) {
                            var erasecolor = Globals.DocObj.backgroundColor;
                        }
                        else {
                            erasecolor = "white";
                        }
                        markupobject.Rect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, false, erasecolor, erasecolor);
                        //ctx.lineWidth = this.linewidth * 10 * scalefactor;
                    }
                    if (this.subtype == 3) {
                        markupobject.Rect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, false, markupobject.fillcolor, markupobject.fillcolor);
                    }
                    if (this.subtype == 1) {
                        //
                        if (this.alternative == 0) {
                            ctx.save();
                            markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                            markupobject.roundedRect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, markupobject.rotation, radiusScaled, linewidthScaled, false, true, markupobject.fillcolor, markupobject.strokecolor);
                            ctx.restore();
                        }
                        if (this.alternative == 1) {
                            ctx.save();
                            markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                            markupobject.roundedRect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, markupobject.rotation, radiusScaled, linewidthScaled, true, true, markupobject.fillcolor, markupobject.strokecolor);
                            ctx.restore();
                        }
                        if (this.alternative == 2) {
                            markupobject.roundedRect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, markupobject.rotation, radiusScaled, linewidthScaled, true, true, "white", this.color);
                        }
                        if (this.alternative >= 3) {
                            markupobject.roundedRect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, markupobject.rotation, radiusScaled, linewidthScaled, true, true, ptrn, this.color);
                        }
                    }
                    if (this.subtype == 0) {
                        if (this.alternative == 0) {
                            ctx.save();
                            markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                            markupobject.Rect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, false, true, markupobject.fillcolor, markupobject.strokecolor);
                            ctx.restore();
                        }
                        if (this.alternative == 1) {
                            ctx.save();
                            markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                            markupobject.Rect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, true, markupobject.fillcolor, markupobject.strokecolor);
                            ctx.restore();
                        }
                        if (this.alternative == 2) {
                            markupobject.Rect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, true, "white", this.color);
                        }
                        if (this.alternative >= 3) {
                            //var ptrn = ctx.createPattern(hatchdiagforw,'repeat');
                            markupobject.Rect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, true, ptrn, this.color);
                        }
                    }
                    break;
                case 4: //oval
                    markupobject.SetDimensions(scalefactor, drotation, pagedx, pagedy);
                    if (this.alternative == 0) {
                        ctx.save();
                        markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                        markupobject.Oval(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, false, true, markupobject.fillcolor, markupobject.strokecolor);
                        ctx.restore();
                    }
                    if (this.alternative == 1) {
                        ctx.save();
                        markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                        markupobject.Oval(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, true, markupobject.fillcolor, markupobject.strokecolor);
                        ctx.restore();
                    }
                    if (this.alternative == 2) {
                        markupobject.Oval(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, true, "white", this.color);
                    }
                    if (this.alternative >= 3) {
                        markupobject.Oval(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, true, ptrn, this.color);
                    }
                    break;
                case 5:
                    markupobject.SetDimensions(scalefactor, drotation, pagedx, pagedy);
                    if (this.alternative == 0) {
                        ctx.save();
                        markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                        markupobject.newcloud(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, radiusScaled, linewidthScaled, false, true, markupobject.fillcolor, markupobject.strokecolor);
                        ctx.restore();
                    }
                    if (this.alternative == 1) {
                        ctx.save();
                        markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                        markupobject.newcloud(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, radiusScaled, linewidthScaled, true, true, markupobject.fillcolor, markupobject.strokecolor);
                        ctx.restore();
                    }
                    if (this.alternative == 2) {
                        markupobject.newcloud(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, radiusScaled, linewidthScaled, true, true, "white", this.color);
                    }
                    if (this.alternative >= 3) {
                        markupobject.newcloud(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, radiusScaled, linewidthScaled, true, true, ptrn, this.color);
                    }
                    break;
                case 6: //line arrow
                    markupobject.SetDimensions(scalefactor, drotation, pagedx, pagedy);
                    ctx.save();
                    markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                    markupobject.arrow(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, arrowlengthscaled, arrowangle, linewidthScaled, this.subtype, markupobject.strokecolor, markupobject.strokecolor);
                    ctx.restore();
                    break;
                case 7: //dimension line
                    markupobject.SetDimensions(scalefactor, drotation, pagedx, pagedy);
                    var dimtype = this.subtype + 4;
                    ctx.save();
                    markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                    // markupobject.arrow(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, arrowlengthscaled, arrowangle, linewidthScaled, dimtype, markupobject.strokecolor, markupobject.strokecolor);
                    markupobject.labelpos = markupobject.dimensionLeader(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, leaderOffsetScalded,arrowlengthscaled, arrowangle, linewidthScaled, dimtype, markupobject.strokecolor, markupobject.strokecolor);
                    ctx.restore();
                    markupobject.setdimvalue(this.x, this.y, this.w, this.h);
                    if (Globals.bUseFixedScale && !bthumbnail) {
                        if (this.leaderoffset == 0){
                            markupobject.dimvaluedraw(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, this.strokecolor, markupobject.fixedscaleFactor,true);
                        }else{
                            markupobject.dimvaluedraw(ctx, this.labelpos.x, this.labelpos.y, this.labelpos.w, this.labelpos.h, this.strokecolor, markupobject.fixedscaleFactor,true);
                        }
                    } else {
                        if (this.leaderoffset == 0){
                            markupobject.dimvaluedraw(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, this.strokecolor, scalefactor,true);
                        }else{
                            markupobject.dimvaluedraw(ctx, this.labelpos.x, this.labelpos.y, this.labelpos.w, this.labelpos.h, this.strokecolor, scalefactor,true);
                        }
                    }
                    break;
                case 8:
                    var acounter = 0;
                    var dimarea = 0;
                    markupobject.SetDimensions(scalefactor, drotation, pagedx, pagedy);
                    if (Globals.bUseFixedScale) {
                        var localscalefactor = markupobject.fixedscaleFactor;
                    }
                    else {
                        localscalefactor = scalefactor;
                    }
                    /*if(bUseFixedScale && !bthumbnail){
                        markupobject.dimvaluedraw(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, this.strokecolor, markupobject.fixedscaleFactor,true);
                    }else{
                        markupobject.dimvaluedraw(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, this.strokecolor, scalefactor,true);
                    }*/
                    if (this.alternative == 0) {
                        ctx.save();
                        markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                        markupobject.polygon(ctx, markupobject.linewidth, false, true, markupobject.fillcolor, markupobject.strokecolor, scalefactor, pagedx, pagedy, true);
                        ctx.restore();
                    }
                    if (this.alternative == 1) {
                        ctx.save();
                        markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                        markupobject.polygon(ctx, markupobject.linewidth, true, true, markupobject.fillcolor, markupobject.strokecolor, scalefactor, pagedx, pagedy, true);
                        ctx.restore();
                    }
                    if (this.alternative == 2) {
                        markupobject.polygon(ctx, markupobject.linewidth, true, true, "white", markupobject.color, scalefactor, pagedx, pagedy, true);
                    }
                    if (this.alternative >= 3) {
                        markupobject.polygon(ctx, markupobject.linewidth, true, true, ptrn, markupobject.color, scalefactor, pagedx, pagedy, true);
                    }
                    var markupscalesq = this.scaling * this.scaling;
                    dimarea = markupobject.PolygonArea();
                    this.dimtext = getUnitArea(dimarea / markupscalesq);
                    this.dimtext = (+this.dimtext).toFixed(2); // JS->TS:INFO converted to number before using toFixed
                    this.dimtext = this.dimtext + " " + Globals.AreaUnitlabel;
                    var areatextx = markupobject.PolygonCentre('x');
                    var areatexty = markupobject.PolygonCentre('y');
                    var areatextxscaled = (areatextx - this.xoffset) * scalefactor;
                    var areatextyscaled = (areatexty - this.yoffset) * scalefactor;
                    areatextxscaled += dx;
                    areatextyscaled += dy;
                    if (!Globals.bMarkupNoLabel) {
                        var areatextscaled = this.measuretextheight * scalefactor;
                        if (Globals.bUseFixedScale && !bthumbnail) {
                            areatextscaled = this.measuretextheight * markupobject.fixedscaleFactor;
                        }
                        ctx.textAlign = "start";
                        ctx.font = areatextscaled + "pt " + "Helvetica";
                        this.textheight = this.measuretextheight;
                        var areat = ctx.measureText(this.dimtext);
                        var areatextwidth = areat.width;
                        var areatextheight = areatextscaled;
                        areatextxscaled = areatextxscaled - (areatextwidth / 2);
                        areatextyscaled = areatextyscaled + (areatextheight / 2);
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = this.color;
                        ctx.fillStyle = "white";
                        ctx.fillRect(areatextxscaled - (10 * localscalefactor), areatextyscaled - (20 * localscalefactor), areatextwidth + (20 * localscalefactor), areatextscaled + (15 * localscalefactor));
                        ctx.strokeRect(areatextxscaled - (10 * localscalefactor), areatextyscaled - (20 * localscalefactor), areatextwidth + (20 * localscalefactor), areatextscaled + (15 * localscalefactor));
                        ctx.fillStyle = "black";
                        ctx.fillText(this.dimtext, areatextxscaled, areatextyscaled);
                    }
                    break;
                case 9: //text
                    markupobject.SetDimensions(scalefactor, drotation, pagedx, pagedy);
                    if (markupobject.selectedit) {
                        break;
                    }
                    if (Globals.bUseFixedScale && !bthumbnail) {
                        var temptxtscale = markupobject.fixedscaleFactor;
                    }
                    else {
                        temptxtscale = scalefactor;
                    }
                    this.font.setScale(temptxtscale);
                    var textscaled = this.font.height * temptxtscale;
                    ctx.font = this.font.fontstringScaled;
                    var dimsel = ctx.measureText(this.text);
                    this.textwidth = dimsel.width;
                    //draw text selected goes here.
                    ctx.save();
                    tx = this.xscaled;
                    ty = this.yscaled;
                    if (markupobject.textrotate != 0 && markupobject.subtype == 0) {
                        ctx.translate(tx, ty);
                        ctx.rotate(markupobject.textrotate);
                        ctx.translate(-tx, -ty);
                    }
                    ctx.textAlign = "start";
                    ctx.fillStyle = markupobject.textcolor;
                    if (this.subtype == 1) {
                        var toffsetx = 4 * temptxtscale;
                        //var toffsety = 8*scalefactor;
                        //var toffsety = ((this.font.height / 4) * 1.3) * scalefactor;
                        var toffsety = ((this.font.height / 4) * 2.0) * temptxtscale;
                        if (markupobject.linewidth == 0) {
                            markupobject.Rect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, false, markupobject.fillcolor, markupobject.strokecolor);
                        }
                        else {
                            ctx.save();
                            markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);
                            markupobject.Rect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, linewidthScaled, true, true, markupobject.fillcolor, markupobject.strokecolor);
                            ctx.restore();
                        }
                        ctx.save();
                        ctx.beginPath();
                        ctx.rect(this.xscaled, this.yscaled, this.wscaled, this.hscaled);
                        ctx.clip();
                        var textarray = this.text.split('\n');
                        var ystart = this.yscaled + textscaled + toffsety;
                        var ttx = this.xscaled; // + (this.wscaled);
                        var tty = this.yscaled; //+ (this.hscaled/2);
                        var txtrotate = markupobject.textrotate * (180 / Math.PI);
                        let startx;
                        let maxwidth;
                        switch (markupobject.pagerotation) {
                            case 0:
                                startx = this.xscaled + toffsetx;
                                maxwidth = this.wscaled;
                                break;
                            case 90:
                                startx = (this.xscaled + toffsetx) - this.hscaled;
                                ctx.translate(ttx, tty);
                                ctx.rotate(-(markupobject.pagerotation * (Math.PI / 180)));
                                ctx.translate(-ttx, -tty);
                                maxwidth = this.hscaled;
                                break;
                            case 270:
                                //startx = this.xscaled + toffsetx;
                                startx = (this.xscaled + toffsetx); // + this.hscaled;
                                //ystart = (this.yscaled + toffsety) - this.wscaled;
                                ystart = (this.yscaled + textscaled + toffsety) - this.wscaled;
                                ctx.translate(ttx, tty);
                                ctx.rotate(-(markupobject.pagerotation * (Math.PI / 180)));
                                ctx.translate(-ttx, -tty);
                                maxwidth = this.hscaled;
                                break;
                            case 180:
                                startx = this.xscaled + toffsetx;
                                ttx = this.xscaled + (this.wscaled / 2);
                                tty = this.yscaled + (this.hscaled / 2);
                                ctx.translate(ttx, tty);
                                ctx.rotate(-(markupobject.pagerotation * (Math.PI / 180)));
                                ctx.translate(-ttx, -tty);
                                maxwidth = this.wscaled;
                                break;
                        }
                        wrapText(ctx, this.text, startx, ystart, maxwidth, textscaled + toffsety);
                        /*for (var i = 0; i < textarray.length; i++) {

                            ctx.fillText(textarray[i], startx , ystart);
                            ystart += textscaled + toffsety;

                        }*/
                        ctx.restore();
                    }
                    else {
                        ctx.fillText(this.text, this.xscaled, this.yscaled);
                    }
                    ctx.restore();
                    break;
                case 10:
                    markupobject.SetDimensions(scalefactor, drotation, pagedx, pagedy);
                    ctx.save();
                    tx = this.xscaled;
                    ty = this.yscaled;
                    if (markupobject.rotation != 0) {
                        tx = this.xscaled + (this.wscaled / 2);
                        ty = this.yscaled - (this.hscaled / 2);
                        ctx.translate(tx, ty);
                        ctx.rotate(markupobject.rotation);
                        ctx.translate(-tx, -ty);
                    }
                    ctx.drawImage(Globals.noteimage, this.xscaled, this.yscaled, this.wscaled, this.hscaled);
                    ctx.restore();
                    break;
                case 11:
                    if (!markupobject.imageloaded) {
                        break;
                    }
                    markupobject.SetDimensions(scalefactor, drotation, pagedx, pagedy);
                    ctx.save();
                    tx = this.xscaled;
                    ty = this.yscaled;
                    if (markupobject.rotation != 0) {
                        tx = this.xscaled + (this.wscaled / 2);
                        ty = this.yscaled + (this.hscaled / 2);
                        ctx.translate(tx, ty);
                        ctx.rotate(markupobject.rotation);
                        ctx.translate(-tx, -ty);
                    }
                    ctx.drawImage(this.image, this.xscaled, this.yscaled, this.wscaled, this.hscaled);
                    ctx.restore();
                    break;
                case 12:
                    markupobject.SetDimensions(scalefactor, drotation, pagedx, pagedy);
                    var textstampscaled = this.font.height * scalefactor;
                    this.font.setScale(scalefactor);
                    var textsmallstampscaled = markupobject.stampsmalltheight * scalefactor;
                    if (Globals.bUseFixedScale && !bthumbnail) {
                        markupobject.roundedRect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, markupobject.rotation, radiusScaled, 3 * markupobject.fixedscaleFactor, true, true, markupobject.fillcolor, markupobject.strokecolor);
                    }
                    else {
                        markupobject.roundedRect(ctx, this.xscaled, this.yscaled, this.wscaled, this.hscaled, markupobject.rotation, radiusScaled, 3 * scalefactor, true, true, markupobject.fillcolor, markupobject.strokecolor);
                    }
                    var Displayname = GetDisplayName(markupobject.signature);
                    var datetext = markupobject.GetDateTime(false);
                    //var smalltext = "By " + markupobject.signature + "," + " ";
                    this.smalltext = "By " + Displayname + "," + " ";
                    this.smalltext += datetext;
                    ctx.save();
                    if (markupobject.rotation != 0) {
                        tx = this.xscaled + (this.wscaled / 2);
                        ty = this.yscaled + (this.hscaled / 2);
                        ctx.translate(tx, ty);
                        ctx.rotate(markupobject.rotation);
                        ctx.translate(-tx, -ty);
                    }
                    ctx.fillStyle = markupobject.strokecolor;
                    ctx.font = markupobject.font.fontstringScaled;
                    var stampdim = ctx.measureText(this.text);
                    this.textwidth = stampdim.width;
                    tx = this.xscaled + (this.wscaled / 2);
                    //ty = this.yscaled+(this.hscaled/2);
                    if (this.alternative == 0) {
                        ty = this.yscaled + ((this.hscaled / 4) + (textstampscaled / 2));
                    }
                    else {
                        ty = this.yscaled + (this.hscaled / 2);
                        ty += (textstampscaled / 4);
                    }
                    //tx = this.xscaled+(this.wscaled/2);
                    //ty = this.yscaled+(this.hscaled/2);
                    if (markupobject.textrotate != 0) {
                        ctx.translate(tx, ty);
                        ctx.rotate(markupobject.textrotate);
                        ctx.translate(-tx, -ty);
                        tx = this.xscaled + (this.wscaled / 2);
                        //ty = this.yscaled+(this.hscaled/2);
                        if (this.alternative == 0) {
                            ty = this.yscaled + ((this.hscaled / 4) + (textstampscaled / 2));
                        }
                        else {
                            ty = this.yscaled + (this.hscaled / 2);
                            ty += (textstampscaled / 4);
                        }
                    }
                    ctx.textAlign = 'center';
                    ctx.fillText(this.text, tx, ty);
                    if (this.alternative == 0) {
                        ctx.fillStyle = this.color;
                        ctx.font = "bold " + textsmallstampscaled + "pt " + "Times New Roman";
                        ty = this.yscaled + ((this.hscaled / 4) * 3);
                        ctx.fillText(this.smalltext, tx, ty);
                    }
                    ctx.restore();
                    break;
            }
        };
        this.setinitRotatedMarkupPoint = function (width: any, height: any, x: any, y: any, anglerad: any) {
            var cosangle = Math.cos(anglerad);
            var sinangle = Math.sin(anglerad);
            var hw = x - width;
            var hh = y - height;
            var newx = (hw * cosangle) - (hh * sinangle);
            var newy = (hw * sinangle) + (hh * cosangle);
            var transpoint = new point(newx, newy);
            transpoint.x = width + transpoint.x;
            transpoint.y = height + transpoint.y;
            return transpoint;
        };
        /*this.setinitRotatedMarkuprect = function(width, height,absolute, anglerad){
         var origx = this.x;
         var origy = this.y;
         var origw = this.w;
         var origh = this.h;

         var cosangle = Math.cos(anglerad);
         var sinangle = Math.sin(anglerad);


         var hw = origx - width;
         var hh = origy - height;

         var newx = (hw*cosangle) - (hh*sinangle);
         var newy = (hw*sinangle) + (hh*cosangle);

         //var transpoint = new point(newx,newy);
         newx = width + newx;
         newy = height + newy;

         this.x = newx;
         this.y = newy;

         if (absolute){
         hw = origw - width;
         hh = origh - height;
         }else{
         hw = (origx + origw) - width;
         hh = (origy + origh) - height;
         }

         var neww = (hw*cosangle) - (hh*sinangle);
         var newh = (hw*sinangle) + (hh*cosangle);

         neww = width + neww;
         newh = height + newh;


         this.w = neww;
         this.h = newh;

         };*/
        //transformed coordinates for rotated canvas.
        this.setRotatedMarkuprect = function (width: any, height: any, absolute: any, anglerad: any) {
            var origx = this.rotatedrect.x;
            var origy = this.rotatedrect.y;
            var origw = this.rotatedrect.w;
            var origh = this.rotatedrect.h;
            var cosangle = Math.cos(anglerad);
            var sinangle = Math.sin(anglerad);
            var hw = origx - width;
            var hh = origy - height;
            var newx = (hw * cosangle) - (hh * sinangle);
            var newy = (hw * sinangle) + (hh * cosangle);
            //var transpoint = new point(newx,newy);
            newx = width + newx;
            newy = height + newy;
            this.rotatedrect.x = newx;
            this.rotatedrect.y = newy;
            if (absolute) {
                hw = origw - width;
                hh = origh - height;
            }
            else {
                if (this.type == 9 && this.subtype == 0) {
                    hw = (origx + origw) - width;
                    hh = (origy - origh) - height;
                }
                else {
                    hw = (origx + origw) - width;
                    hh = (origy + origh) - height;
                }
            }
            var neww = (hw * cosangle) - (hh * sinangle);
            var newh = (hw * sinangle) + (hh * cosangle);
            neww = width + neww;
            newh = height + newh;
            if (markupobject.textrotate != 0) {
                cosangle = Math.cos(markupobject.textrotate);
                sinangle = Math.sin(markupobject.textrotate);
            }
            this.rotatedrect.w = neww;
            this.rotatedrect.h = newh;
        };
        //transformed coordinates for rotated canvas.
        this.getRotatedMarkup = function (width: any, height: any, x: any, y: any, anglerad: any) {
            var cosangle = Math.cos(anglerad);
            var sinangle = Math.sin(anglerad);
            var hw = x - width;
            var hh = y - height;
            var newx = (hw * cosangle) - (hh * sinangle);
            var newy = (hw * sinangle) + (hh * cosangle);
            var transpoint = new point(newx, newy);
            transpoint.x = width + transpoint.x;
            transpoint.y = height + transpoint.y;
            return transpoint;
        };
        this.getMarkupSelectPointRot = function (width: any, height: any, anglerad: any) {
            var hw = width;
            var hh = height;
            var cosangle = Math.cos(anglerad);
            var sinangle = Math.sin(anglerad);
            var newx = (hw * cosangle) - (hh * sinangle);
            var newy = (hw * sinangle) + (hh * cosangle);
            var transpoint = new point(newx, newy);
            return transpoint;
        };
        this.getTopLeftRot = function (width: any, height: any, anglerad: any) {
            var hw = -width / 2;
            var hh = -height / 2;
            var cosangle = Math.cos(anglerad);
            var sinangle = Math.sin(anglerad);
            var newx = (hw * cosangle) - (hh * sinangle);
            var newy = (hw * sinangle) + (hh * cosangle);
            var transpoint = new point(newx, newy);
            return transpoint;
        };
        this.getBottomRightRot = function (width: any, height: any, anglerad: any) {
            var hw = width / 2;
            var hh = height / 2;
            var cosangle = Math.cos(anglerad);
            var sinangle = Math.sin(anglerad);
            var newx = (hw * cosangle) - (hh * sinangle);
            var newy = (hw * sinangle) + (hh * cosangle);
            var transpoint = new point(newx, newy);
            return transpoint;
        };
        this.getRotSelectRot = function (width: any, height: any, anglerad: any) {
            var hw = 0;
            var hh = (-height / 2) - 15;
            var cosangle = Math.cos(anglerad);
            var sinangle = Math.sin(anglerad);
            var newx = (hw * cosangle) - (hh * sinangle);
            var newy = (hw * sinangle) + (hh * cosangle);
            var transpoint = new point(newx, newy);
            return transpoint;
        };
        this.GetwithinCorner = function (x: any, y: any) {
            var within = false;
            var scalecorner = 0;
            var editaction = 0;
            var pagerotation = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation;
            if (markupobject.rotation != 0) {
                var x1 = this.LowerRightRectRot.x;
                var x2 = this.LowerRightRectRot.w;
                var y1 = this.LowerRightRectRot.y;
                var y2 = this.LowerRightRectRot.h;
                if (markupobject.Getwithin(x, y, x1, x2, y1, y2)) {
                    within = true;
                    scalecorner = 4;
                    editaction = 2;
                }
                x1 = this.UpperLeftRectRot.x;
                x2 = this.UpperLeftRectRot.w;
                y1 = this.UpperLeftRectRot.y;
                y2 = this.UpperLeftRectRot.h;
                if (markupobject.Getwithin(x, y, x1, x2, y1, y2)) {
                    within = true;
                    scalecorner = 1;
                    editaction = 2;
                }
                x1 = this.UpperRightRectRot.x;
                x2 = this.UpperRightRectRot.w;
                y1 = this.UpperRightRectRot.y;
                y2 = this.UpperRightRectRot.h;
                if (markupobject.Getwithin(x, y, x1, x2, y1, y2)) {
                    within = true;
                    scalecorner = 2;
                    editaction = 2;
                }
                x1 = this.LowerLeftRectRot.x;
                x2 = this.LowerLeftRectRot.w;
                y1 = this.LowerLeftRectRot.y;
                y2 = this.LowerLeftRectRot.h;
                if (markupobject.Getwithin(x, y, x1, x2, y1, y2)) {
                    within = true;
                    scalecorner = 3;
                    editaction = 2;
                }
                x1 = this.RotmarkerRectRot.x;
                x2 = this.RotmarkerRectRot.w;
                y1 = this.RotmarkerRectRot.y;
                y2 = this.RotmarkerRectRot.h;
                if (markupobject.Getwithin(x, y, x1, x2, y1, y2)) {
                    within = true;
                    scalecorner = 5;
                    editaction = 3;
                }
            }
            else {
                //this.LowerRightRect.x, this.LowerRightRect.w, this.LowerRightRect.y, this.LowerRightRect.h
                x1 = this.LowerRightRect.x;
                x2 = this.LowerRightRect.w;
                y1 = this.LowerRightRect.y;
                y2 = this.LowerRightRect.h;
                if (markupobject.Getwithin(x, y, x1, x2, y1, y2)) {
                    within = true;
                    scalecorner = 4;
                    editaction = 2;
                }
                //this.UpperLeftRect.x, this.UpperLeftRect.w, this.UpperLeftRect.y, this.UpperLeftRect.h
                x1 = this.UpperLeftRect.x;
                x2 = this.UpperLeftRect.w;
                y1 = this.UpperLeftRect.y;
                y2 = this.UpperLeftRect.h;
                if (markupobject.Getwithin(x, y, x1, x2, y1, y2)) {
                    within = true;
                    scalecorner = 1;
                    editaction = 2;
                }
                x1 = this.UpperRightRect.x;
                x2 = this.UpperRightRect.w;
                y1 = this.UpperRightRect.y;
                y2 = this.UpperRightRect.h;
                if (markupobject.Getwithin(x, y, x1, x2, y1, y2)) {
                    within = true;
                    if (pagerotation == 90 || pagerotation == 270) {
                        scalecorner = 3;
                    }
                    else {
                        scalecorner = 2;
                    }
                    editaction = 2;
                }
                x1 = this.LowerLeftRect.x;
                x2 = this.LowerLeftRect.w;
                y1 = this.LowerLeftRect.y;
                y2 = this.LowerLeftRect.h;
                if (markupobject.Getwithin(x, y, x1, x2, y1, y2)) {
                    within = true;
                    if (pagerotation == 90 || pagerotation == 270) {
                        scalecorner = 2;
                    }
                    else {
                        scalecorner = 3;
                    }
                    editaction = 2;
                }
                //this.RotmarkerRect.x, this.RotmarkerRect.w, this.RotmarkerRect.y, this.RotmarkerRect.h
                x1 = this.RotmarkerRect.x;
                x2 = this.RotmarkerRect.w;
                y1 = this.RotmarkerRect.y;
                y2 = this.RotmarkerRect.h;
                if (markupobject.Getwithin(x, y, x1, x2, y1, y2)) {
                    within = true;
                    scalecorner = 5;
                    editaction = 3;
                }
            }
            return {
                within: within,
                scalecorner: scalecorner,
                editaction: editaction
            };
        };
        this.Getwithin = function (x: any, y: any, x1: any, x2: any, y1: any, y2: any) {
            var within = false;
            if (x > x1 && x < x2) {
                if (y > y1 && y < y2) {
                    within = true;
                }
            }
            return within;
        };
        this.normalizeRect = function (rect: any) {
            var normrect = {
                x: rect.x,
                y: rect.y,
                w: rect.w,
                h: rect.h
            };
            normrect.x = Math.min(rect.x, rect.w);
            normrect.y = Math.min(rect.y, rect.h);
            normrect.w = Math.max(rect.x, rect.w);
            normrect.h = Math.max(rect.y, rect.h);
            return normrect;
        };
        this.GetwithinRect = function (x: any, y: any, rect: any) {
            var within = false;
            if (x > rect.x && x < rect.w) {
                if (y > rect.y && y < rect.h) {
                    within = true;
                }
            }
            return within;
        };
        /*this.getBottomRightRot = function (width, height, anglerad,point){

         var hw = width /2;
         var hh = width /2

         var cosangle = Math.cos(anglerad);
         var sinangle = Math.sin(anglerad);


         switch(point){
         case 1://upper left
         hw = -width /2;
         hh = -height /2;

         break;
         case 2://lower right
         break;
         case 3: //upper right
         hw = width /2;
         hh = -height /2;
         break;
         case 4:
         hw = -widht/2;
         hh = height /2;
         break;
         case 5: //rotate point
         hw = 0;
         hh = -height/2-15;
         break;
         }

         var newx = (hw*cosangle) - (hh*sinangle);
         var newy = (hw*sinangle)+(hh*cosangle);
         var transpoint = new point(newx,newy);
         return transpoint;
         };*/
        /*function getTopLeft( width:Number, height:Number, theta:Number ) : Point
         {
         //half width and height directed appropriately (for top left)
         var hw:Number = -width / 2;
         var hh:Number = -height / 2;
         var cos:Number = Math.cos( theta );
         var sin:Number = Math.sin( theta );
         return new Point( hw * cos - hh * sin, hw * sin + hh * cos );
         }*/
        this.iswithin = function (x: any, y: any) {
            var centercanvX = (Globals.canvasowidth / 2);
            var centercanvY = (Globals.canvasoheight / 2);
            var CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);
            switch (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation) {
                case 0:
                    CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);
                    break;
                case 90:
                    CanvRotRad = (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation + 180) * (Math.PI / 180);
                    break;
                case 270:
                    CanvRotRad = (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation - 180) * (Math.PI / 180);
                    break;
                case 180:
                    CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);
                    break;
            }
            var pagedx = 0;
            var pagedy = 0;
            if (Globals.DocObj.Type == 0) {
                var docdx = Globals.DocObj.pages[0].dx;
            }
            else {
                docdx = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
            }
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                pagedx = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            }
            else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                pagedx = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;
            }
            else {
                pagedx = docdx;
                pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;
            }
            var scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale / this.scaling;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector / markupobject.scaling;
            }
            else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                scalefactor = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf) / markupobject.scaling;
            }
            else {
                scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale / markupobject.scaling;
            }
            //markupobject.SetDimensions(scalefactor,DocObj.pages[DocObj.currentpage].drotation);
            var centerx = this.xscaled + (this.wscaled / 2);
            var centery = this.yscaled + (this.hscaled / 2);
            var rotX = 0.0;
            var rotY = 0.0;
            var xscaledpoint = 0.0;
            var yscaledpoint = 0.0;
            var nodeselectsize = 8;
            var rotaneg = 0.0;
            if (markupobject.rotation != 0) {
                rotaneg = markupobject.rotation;
                var rotpoint = markupobject.getBottomRightRot(this.wscaled, this.hscaled, rotaneg);
                rotX = rotpoint.x;
                rotY = rotpoint.y;
                var rotXLower = centerx + rotX;
                var rotYLower = centery + rotY;
                rotpoint = markupobject.getRotSelectRot(this.wscaled, this.hscaled, rotaneg);
                var rotXSelect = centerx + rotpoint.x;
                var rotYSelect = centery + rotpoint.y;
            }
            var within = false;
            var orgmousepoint = { x: x, y: y };
            //var pagerotation = DocObj.pages[DocObj.currentpage].drotation;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                var rotmousepoint = markupobject.getRotatedMarkup(centercanvX, centercanvY, x, y, CanvRotRad);
                x = rotmousepoint.x;
                y = rotmousepoint.y;
            }
            else {
                //rotmousepoint.x = x;
                //rotmousepoint.y = y;
            }
            var extentx = Math.min(this.xscaled, this.xscaled + this.wscaled);
            var extentw = Math.max(this.xscaled, this.xscaled + this.wscaled);
            var extenty = Math.min(this.yscaled, this.yscaled + this.hscaled);
            var extenth = Math.max(this.yscaled, this.yscaled + this.hscaled);
            var extentxabs = Math.min(this.xscaled, this.wscaled);
            var extentwabs = Math.max(this.xscaled, this.wscaled);
            var extentyabs = Math.min(this.yscaled, this.hscaled);
            var extenthabs = Math.max(this.yscaled, this.hscaled);
            switch (this.type) {
                case 0:
                    /*this.wscaled = (this.w - this.xoffset) * scalefactor;
                     this.hscaled = (this.h - this.yoffset) * scalefactor;

                     this.wscaled = this.wscaled + DocObj.pages[DocObj.currentpage].dx;
                     this.hscaled = this.hscaled + DocObj.pages[DocObj.currentpage].dy;*/
                    //xscaled = xscaled + dx;
                    //yscaled = yscaled + dy;
                    if (x > this.xscaled && x < this.wscaled) {
                        if (y > this.yscaled && y < this.hscaled) {
                            within = true;
                            this.editaction = 1;
                        }
                    }
                    //within lower right scaling area (disabled for this type)
                    if (x > (this.wscaled - markersize) && x < (this.wscaled + markersize)) {
                        if (y > (this.hscaled - markersize) && y < (this.hscaled + markersize)) {
                            within = true;
                            //this.editaction = 2;
                            //this.scalecorner = 4;
                        }
                    }
                    break;
                case 1:
                    var mp = {
                        x: x,
                        y: y
                    };
                    var lp1 = {
                        x: this.xscaled,
                        y: this.yscaled
                    };
                    var lp2 = {
                        x: this.wscaled,
                        y: this.hscaled
                    };
                    var epsilon = {
                        x: lp1.x - ((lp2.x - lp1.x) / 10),
                        y: lp2.y - ((lp2.y - lp1.y) / 2)
                    };
                    if (markupobject.subtype == 2) {
                        within = insidepolygon(scalefactor, pagedx, pagedy, markupobject.xoffset, markupobject.yoffset, markupobject.sides, mp, epsilon);
                        this.editaction = 1;
                    }
                    else {
                        if (x > this.xscaled && x < this.wscaled) {
                            if (y > this.yscaled && y < this.hscaled) {
                                within = true;
                                this.editaction = 1;
                            }
                        }
                        //within lower right scaling area (disabled for this type)
                        /*if (x > (this.wscaled - markersize) && x < (this.wscaled + markersize)) {
                         if (y > (this.hscaled - markersize) && y < (this.hscaled + markersize)) {
                         within = true;
                         //this.editaction = 2;
                         //this.scalecorner = 4;
                         }
                         }*/
                    }
                    if (markupobject.selectedit) {
                        var counter = 0;
                        for (counter = 0; counter < markupobject.points.length; counter++) {
                            xscaledpoint = (markupobject.points[counter].x - this.xoffset) * scalefactor;
                            yscaledpoint = (markupobject.points[counter].y - this.yoffset) * scalefactor;
                            xscaledpoint = xscaledpoint + pagedx;
                            yscaledpoint = yscaledpoint + pagedy;
                            if (x > xscaledpoint - nodeselectsize && x < xscaledpoint + nodeselectsize) {
                                if (y > yscaledpoint - nodeselectsize && y < yscaledpoint + nodeselectsize) {
                                    within = true;
                                    markupobject.selectedpoint = counter;
                                    markupobject.editaction = 4;
                                }
                            }
                        }
                    }
                    break;
                case 2:
                    if (x > this.xscaled && x < this.wscaled) {
                        if (y > this.yscaled && y < this.hscaled) {
                            within = true;
                            this.editaction = 1;
                        }
                    }
                    //within lower right scaling area (disabled for this type)
                    if (x > (this.wscaled - markersize) && x < (this.wscaled + markersize)) {
                        if (y > (this.hscaled - markersize) && y < (this.hscaled + markersize)) {
                            within = true;
                            //this.editaction = 2;
                            //this.scalecorner = 4;
                        }
                    }
                    if (markupobject.selectedit) {
                        counter = 0;
                        for (counter = 0; counter < markupobject.points.length; counter++) {
                            xscaledpoint = (markupobject.points[counter].x - this.xoffset) * scalefactor;
                            yscaledpoint = (markupobject.points[counter].y - this.yoffset) * scalefactor;
                            xscaledpoint = xscaledpoint + pagedx;
                            yscaledpoint = yscaledpoint + pagedy;
                            if (x > xscaledpoint - nodeselectsize && x < xscaledpoint + nodeselectsize) {
                                if (y > yscaledpoint - nodeselectsize && y < yscaledpoint + nodeselectsize) {
                                    within = true;
                                    markupobject.selectedpoint = counter;
                                    markupobject.editaction = 4;
                                }
                            }
                        }
                    }
                    break;
                case 3:
                    if (markupobject.Getwithin(x, y, extentx, extentw, extenty, extenth)) {
                        within = true;
                        this.editaction = 1;
                    }
                    var selectcorner = markupobject.GetwithinCorner(orgmousepoint.x, orgmousepoint.y);
                    if (selectcorner.within) {
                        within = true;
                        this.editaction = selectcorner.editaction;
                        this.scalecorner = selectcorner.scalecorner;
                    }
                    break;
                case 4:
                    if (this.subtype == 1) {
                        var xdiff = Math.max(this.xscaled, this.wscaled) - Math.min(this.xscaled, this.wscaled);
                        var ydiff = Math.max(this.yscaled, this.hscaled) - Math.min(this.yscaled, this.hscaled);

                        var radius = markupobject.getdiag(xdiff, ydiff);
                        if (Math.sqrt((x - this.xscaled) * (x - this.xscaled) + (y - this.yscaled) * (y - this.yscaled)) < radius) {
                            within = true;
                            this.editaction = 1;
                        }
                        //within lower right scaling area
                        var xlr = this.xscaled;
                        var ylr = this.yscaled;

                        var xlrl = xlr - markersize;
                        var xlrr = xlr + markersize;
                        var ylrl = ylr - markersize;
                        var ylrr = ylr + markersize;
                        if (x > (xlrl) && x < (xlrr)) {
                            if (y > (ylrl) && y < (ylrr)) {
                                within = true;
                                this.editaction = 2;
                                this.scalecorner = 4;
                            }
                        }
                    }
                    else {
                        if (markupobject.Getwithin(x, y, extentx, extentw, extenty, extenth)) {
                            within = true;
                            this.editaction = 1;
                        }
                        selectcorner = markupobject.GetwithinCorner(orgmousepoint.x, orgmousepoint.y);
                        if (selectcorner.within) {
                            within = true;
                            this.editaction = selectcorner.editaction;
                            this.scalecorner = selectcorner.scalecorner;
                        }
                    }
                    break;
                case 5:
                    if (markupobject.Getwithin(x, y, extentx, extentw, extenty, extenth)) {
                        within = true;
                        this.editaction = 1;
                    }
                    selectcorner = markupobject.GetwithinCorner(orgmousepoint.x, orgmousepoint.y);
                    if (selectcorner.within) {
                        within = true;
                        this.editaction = selectcorner.editaction;
                        this.scalecorner = selectcorner.scalecorner;
                    }
                    break;
                case 6: //line, arrow
                    /*this.wscaled = (this.w - this.xoffset) * scalefactor;
                     this.hscaled = (this.h - this.yoffset) * scalefactor;


                     this.wscaled = this.wscaled + DocObj.pages[DocObj.currentpage].dx;
                     this.hscaled = this.hscaled + DocObj.pages[DocObj.currentpage].dy;*/
                    //                  xscaled = xscaled + dx;
                    //                  yscaled = yscaled + dy;
                    /*if (x> extentxabs && x<extentwabs ){
                     if (y> extentyabs && y<extenthabs){
                     within = true;
                     this.editaction = 1;
                     }
                     }*/
                    mp = {
                        x: x,
                        y: y
                    };
                    lp1 = {
                        x: this.xscaled,
                        y: this.yscaled
                    };
                    lp2 = {
                        x: this.wscaled,
                        y: this.hscaled
                    };
                    if (distToSegment(mp, lp1, lp2) < 10) {
                        within = true;
                        this.editaction = 1;
                    }
                    /*if (x> extentxabs && x<extentwabs ){
                     if (this.yscaled == this.hscaled || Math.abs(this.yscaled - this.hscaled) < markersize ){
                     if (y> this.yscaled - markersize && y<this.hscaled + markersize){
                     within = true;
                     this.editaction = 1;
                     }

                     }
                     if (this.yscaled < this.hscaled){

                     if (y> this.yscaled && y<this.hscaled){
                     within = true;
                     this.editaction = 1;
                     }
                     }else{
                     if (y> this.hscaled && y<this.yscaled){
                     within = true;
                     this.editaction = 1;
                     }

                     }

                     }*/
                    //within lower right scaling area
                    if (x > (this.wscaled - markersize) && x < (this.wscaled + markersize)) {
                        if (y > (this.hscaled - markersize) && y < (this.hscaled + markersize)) {
                            within = true;
                            this.editaction = 2;
                            this.scalecorner = 4;
                        }
                    }
                    //within upper left scaling area
                    if (x > (this.xscaled - markersize) && x < (this.xscaled + markersize)) {
                        if (y > (this.yscaled - markersize) && y < (this.yscaled + markersize)) {
                            within = true;
                            this.editaction = 2;
                            this.scalecorner = 4;
                        }
                    }
                    //within upper left scaling area
                    if (x > (this.xscaled - markersize) && x < (this.xscaled + markersize)) {
                        if (y > (this.yscaled - markersize) && y < (this.yscaled + markersize)) {
                            within = true;
                            this.editaction = 2;
                            this.scalecorner = 1;
                        }
                    }
                    break;
                case 7: //dimention line
                    /*switch(DocObj.pages[DocObj.currentpage].currentimage){
                     case 0:
                     xscaled = xscaled + DocObj.pages[DocObj.currentpage].dx;
                     yscaled = yscaled + DocObj.pages[DocObj.currentpage].dy;
                     break;
                     case 1:
                     xscaled = xscaled + DocObj.pages[DocObj.currentpage].dxextent;
                     yscaled = yscaled + DocObj.pages[DocObj.currentpage].dyextent;

                     break;
                     }

                     this.wscaled = (this.w - this.xoffset) * scalefactor;
                     this.hscaled = (this.h - this.yoffset) * scalefactor;


                     this.wscaled = this.wscaled + DocObj.pages[DocObj.currentpage].dx;
                     this.hscaled = this.hscaled + DocObj.pages[DocObj.currentpage].dy;*/
                    //                  xscaled = xscaled + dx;
                    //                  yscaled = yscaled + dy;
                    mp = {
                        x: x,
                        y: y
                    };
                    lp1 = {
                        x: this.xscaled,
                        y: this.yscaled
                    };
                    lp2 = {
                        x: this.wscaled,
                        y: this.hscaled
                    };
                    if (distToSegment(mp, lp1, lp2) < 10) {
                        within = true;
                        this.editaction = 1;
                    }
                    /*if (x> extentxabs && x<extentwabs ){
                     if (this.yscaled == this.hscaled || Math.abs(this.yscaled - this.hscaled) < markersize ){
                     if (y> this.yscaled - markersize && y<this.hscaled + markersize){
                     within = true;
                     this.editaction = 1;
                     }

                     }
                     if (this.yscaled < this.hscaled){

                     if (y> this.yscaled && y<this.hscaled){
                     within = true;
                     this.editaction = 1;
                     }
                     }else{
                     if (y> this.hscaled && y<this.yscaled){
                     within = true;
                     this.editaction = 1;
                     }

                     }

                     }*/
                    //within lower right scaling area
                    if (x > (this.wscaled - markersize) && x < (this.wscaled + markersize)) {
                        if (y > (this.hscaled - markersize) && y < (this.hscaled + markersize)) {
                            within = true;
                            this.editaction = 2;
                            this.scalecorner = 4;
                        }
                    }
                    //within upper left scaling area
                    if (x > (this.xscaled - markersize) && x < (this.xscaled + markersize)) {
                        if (y > (this.yscaled - markersize) && y < (this.yscaled + markersize)) {
                            within = true;
                            this.editaction = 2;
                            this.scalecorner = 4;
                        }
                    }
                    //within upper left scaling area
                    if (x > (this.xscaled - markersize) && x < (this.xscaled + markersize)) {
                        if (y > (this.yscaled - markersize) && y < (this.yscaled + markersize)) {
                            within = true;
                            this.editaction = 2;
                            this.scalecorner = 1;
                        }
                    }
                    //labelposition for changing leader line offset.
                    if (this.leaderoffset == 0) {
                        var tx = this.xscaled + ((this.wscaled - this.xscaled) / 2);
                        var ty = this.yscaled + ((this.hscaled - this.yscaled) / 2);
                    }
                    else {
                        tx = this.labelpos.x + ((this.labelpos.w - this.labelpos.x) / 2);
                        ty = this.labelpos.y + ((this.labelpos.h - this.labelpos.y) / 2);
                    }
                    //labelsize.w = dimtextwidth + (20 * scalefactor);
                    //labelsize.h = scaletextheight + (10 * scalefactor);
                    if (labelsize.w != 0 && labelsize.h != 0) {
                        var lwsize = labelsize.w * 0.5;
                        if (x > (tx - lwsize) && x < (tx + lwsize)) {
                            if (y > (ty - lwsize) && y < (ty + lwsize)) {
                                within = true;
                                this.editaction = 6;
                                //this.scalecorner = 3;
                            }
                        }
                    }
                    else {
                        if (x > (tx - markersize) && x < (tx + markersize)) {
                            if (y > (ty - markersize) && y < (ty + markersize)) {
                                within = true;
                                this.editaction = 6;
                                //this.scalecorner = 3;
                            }
                        }
                    }
                    /*if (x > (this.xscaled - markersize) && x < (this.xscaled + markersize)) {
                        if (y > (this.yscaled - markersize) && y < (this.yscaled + markersize)) {
                            within = true;
                            this.editaction = 2;
                            this.scalecorner = 1;
                        }

                    }*/
                    break;
                case 8:
                    /* this.wscaled = (this.w - this.xoffset) * scalefactor;
                     this.hscaled = (this.h - this.yoffset) * scalefactor;

                     this.wscaled = this.wscaled + DocObj.pages[DocObj.currentpage].dx;
                     this.hscaled = this.hscaled + DocObj.pages[DocObj.currentpage].dy;*/
                    mp = {
                        x: x,
                        y: y
                    };
                    lp1 = {
                        x: this.xscaled,
                        y: this.yscaled
                    };
                    lp2 = {
                        x: this.wscaled,
                        y: this.hscaled
                    };
                    epsilon = {
                        x: lp1.x - ((lp2.x - lp1.x) / 10),
                        y: lp2.y - ((lp2.y - lp1.y) / 2)
                    };
                    within = insidepolygon(scalefactor, pagedx, pagedy, markupobject.xoffset, markupobject.yoffset, markupobject.sides, mp, epsilon);
                    if (within) {
                        this.editaction = 1;
                    }
                    /*if (x > this.xscaled && x < this.wscaled) {
                     if (y > this.yscaled && y < this.hscaled) {
                     within = true;
                     this.editaction = 1;
                     }
                     }*/
                    //within lower right scaling area (disabled for this type)
                    if (x > (this.wscaled - markersize) && x < (this.wscaled + markersize)) {
                        if (y > (this.hscaled - markersize) && y < (this.hscaled + markersize)) {
                            within = true;
                            //this.editaction = 2;
                            //this.scalecorner = 4;
                        }
                    }
                    if (markupobject.selectedit) {
                        var acounter = 0;
                        for (acounter = 0; acounter < markupobject.points.length; acounter++) {
                            xscaledpoint = (markupobject.points[acounter].x - this.xoffset) * scalefactor;
                            yscaledpoint = (markupobject.points[acounter].y - this.yoffset) * scalefactor;
                            xscaledpoint = xscaledpoint + pagedx;
                            yscaledpoint = yscaledpoint + pagedy;
                            if (x > xscaledpoint - nodeselectsize && x < xscaledpoint + nodeselectsize) {
                                if (y > yscaledpoint - nodeselectsize && y < yscaledpoint + nodeselectsize) {
                                    within = true;
                                    markupobject.selectedpoint = acounter;
                                    markupobject.editaction = 4;
                                }
                            }
                        }
                    }
                    break;
                case 9:
                    if (this.subtype == 1) {
                        if (markupobject.Getwithin(x, y, extentx, extentw, extenty, extenth)) {
                            within = true;
                            this.editaction = 1;
                        }
                        selectcorner = markupobject.GetwithinCorner(orgmousepoint.x, orgmousepoint.y);
                        if (selectcorner.within) {
                            within = true;
                            this.editaction = selectcorner.editaction;
                            this.scalecorner = selectcorner.scalecorner;
                        }
                    }
                    else if (this.subtype == 0) {
                        this.hscaled = this.textheight * scalefactor;
                        this.wscaled = this.textwidth;
                        var wscaled = this.wscaled;
                        var hscaled = this.hscaled;
                        var switchval = wscaled;
                        switch (this.textrotate / (Math.PI / 180)) {
                            case 0:
                                if (this.subtype == 0) {
                                    if (markupobject.Getwithin(x, y, this.xscaled, this.xscaled + wscaled, this.yscaled - hscaled, this.yscaled)) {
                                        within = true;
                                        this.editaction = 1;
                                    }
                                }
                                else if (this.subtype == 1) {
                                    if (markupobject.Getwithin(x, y, this.xscaled, this.xscaled + wscaled, this.yscaled + hscaled, this.yscaled)) {
                                        within = true;
                                        this.editaction = 1;
                                    }
                                }
                                break;
                            case 90:
                                wscaled = hscaled;
                                hscaled = switchval;
                                var mtextx1 = Math.min(this.xscaled, this.xscaled + wscaled);
                                var mtextx2 = Math.max(this.xscaled, this.xscaled + wscaled);
                                var mtexty1 = Math.min(this.yscaled, this.yscaled + hscaled);
                                var mtexty2 = Math.max(this.yscaled, this.yscaled + hscaled);
                                if (markupobject.Getwithin(x, y, mtextx1, mtextx2, mtexty1, mtexty2)) {
                                    within = true;
                                    this.editaction = 1;
                                }
                                break;
                            case 180:
                                mtextx1 = Math.min(this.xscaled, this.xscaled - wscaled);
                                mtextx2 = Math.max(this.xscaled, this.xscaled - wscaled);
                                mtexty1 = Math.min(this.yscaled, this.yscaled + hscaled);
                                mtexty2 = Math.max(this.yscaled, this.yscaled + hscaled);
                                if (markupobject.Getwithin(x, y, mtextx1, mtextx2, mtexty1, mtexty2)) {
                                    within = true;
                                    this.editaction = 1;
                                }
                                break;
                            case 270:
                                wscaled = hscaled;
                                hscaled = switchval;
                                mtextx1 = Math.min(this.xscaled, this.xscaled - wscaled);
                                mtextx2 = Math.max(this.xscaled, this.xscaled - wscaled);
                                mtexty1 = Math.min(this.yscaled, this.yscaled - hscaled);
                                mtexty2 = Math.max(this.yscaled, this.yscaled - hscaled);
                                if (markupobject.Getwithin(x, y, mtextx1, mtextx2, mtexty1, mtexty2)) {
                                    within = true;
                                    this.editaction = 1;
                                }
                                break;
                        }
                        selectcorner = markupobject.GetwithinCorner(orgmousepoint.x, orgmousepoint.y);
                        if (selectcorner.within) {
                            within = true;
                            this.editaction = selectcorner.editaction;
                            this.scalecorner = selectcorner.scalecorner;
                        }
                    }
                    break;
                case 10:
                    if (x > this.xscaled && x < (this.xscaled + this.wscaled)) {
                        if (y > this.yscaled && y < (this.yscaled + this.hscaled)) {
                            //also hover over
                            within = true;
                            this.editaction = 1;
                        }
                    }
                    break;
                case 11:
                    if (markupobject.Getwithin(x, y, this.xscaled, this.xscaled + this.wscaled, this.yscaled, this.yscaled + this.hscaled)) {
                        within = true;
                        this.editaction = 1;
                    }
                    selectcorner = markupobject.GetwithinCorner(orgmousepoint.x, orgmousepoint.y);
                    if (selectcorner.within) {
                        within = true;
                        this.editaction = selectcorner.editaction;
                        this.scalecorner = selectcorner.scalecorner;
                    }
                    break;
                case 12:
                    if (x > this.xscaled && x < (this.xscaled + this.wscaled)) {
                        if (y > this.yscaled && y < (this.yscaled + this.hscaled)) {
                            within = true;
                            this.editaction = 1;
                        }
                    }
                    selectcorner = markupobject.GetwithinCorner(orgmousepoint.x, orgmousepoint.y);
                    if (selectcorner.within) {
                        within = true;
                        this.editaction = selectcorner.editaction;
                        this.scalecorner = selectcorner.scalecorner;
                    }
                    break;
            }
            return within;
        };
    }
}
