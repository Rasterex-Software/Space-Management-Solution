// TODO:JS->TS:INFO continue conversion
import {
    Globals,
    RxCore_GUI_VectorLayers,
    LayerObject,
    BlockObject,
    decimalToHex,
    lineObject,
    pathObject,
    arcObject,
    circleObject,
    imageObject,
    textObject,
    RxCore_GUI_VectorBlocks,
    RxCore_GUI_HasText,
    RxCore_GUI_2DBlockInfo,
    RxCore_GUI_2DBlockID,
    setSmoothingEnabledEx,
    mouse_rotated,
    comparedrawcheck,
    matchRuleShort,
    drawvectorline,
   // drawprint // TODO:JS->TS:CHECK if this should have been an external function
} from '../internal';


export class VectorPageObject {
    firstdraw: boolean;
    firstdrawcompare: boolean;
    offscreen: any; // HTMLCanvasElement;
    offscreenctx: any;
    backgroundrender: boolean;
    docompare: boolean;
    dooverlay: boolean;
    isbackground: boolean;
    comparecolor: string;
    layerlist: any[];
    numlayers: number;
    vectorpagetime: number;
    textlayerset: boolean;
    blocklist: any[];
    filterblocklist: any[];
    numblocks: number;
    bnameunique: boolean;
    selectedobject: any;
    selectColor: string;
    viewmode: number;
    multiselect: boolean;
    selectedblocks: any[];
    fileversion: number;
    flag: number;
    x: any; // number;
    y: any; // number;
    w: any; // number;
    h: any; // number;
    scale: any; //number;
    offsetx: any; //number;
    offsety: any; //number;
    pathlist: any[];
    textlist: any[];
    attributes: any[];
    numpaths: number;
    width: number;
    height: number;
    getBlocks: any; // () => any;
    restoreBlockStates: any; //  () => void;
    setBlockColor: any; //  (blockid: any, Color: any, override: any) => void;
    appendCustomBlockAttribute: any; //  (blockid: any, name: any, value: any) => void;
    FindBlockByAttr: any; //  (attrname: any, attrvalue: any) => number;
    ViewMode: any; //  (onoff: any) => void;
    unSelectAllBlocks: any; //  () => void;
    blockAttributes: any; //  (blockid: any) => any[];
    selectBlockPath: any; //  (select: any, blockid: any) => void;
    selectBlock: any; //  (blockid: any) => void;
    getblockcentroid: any; //  (blockid: any, scalefactor: any, offsetx: any, offsety: any) => {};
    getBlockRect: any; //  (blockid: any, scalefactor: any, offsetx: any, offsety: any) => { found: boolean; x: number; y: number; w: number; h: number; wp: number; hp: number; };
    getinsidePolygon: any; //  (x: any, y: any, scalefactor: any, offsetx: any, offsety: any, multi: any) => void;
    resetLayers: any; //  () => void;
    filterBlocks: any; //  (szBlockLoadMask: any) => void;
    turnBlockAllOnOff: any; //  (OnOff: any) => void;
    turnLayerAllOnOff: any; //  (OnOff: any) => void;
    setActive: any; //  () => void;
    turnLayerOnOff: any; //  (layerindex: any) => void;
    resetBlocks: any; //  () => void;
    turnBlockOnOff: any; //  (index: any) => void;
    rotate_point: any; //  (pointX: any, pointY: any, originX: any, originY: any, angle: any) => { x: any; y: any; };
    gettextpos: any; //  (marerobj: any, scalefactor: any, offsetx: any, offsety: any) => { top: number; left: number; width: number; height: number; fontsize: number; };
    TextLayerClear: any; //  (texlayerdata: any) => void;
    TextLayerBuilder: any; //  (texlayerdata: any) => void;
    clearSearchAll: any; //  () => void;
    textSearch: any; //  (text: any, start: any) => { numtexts: any; position: any; textobject: any; };
    highlightText: any; //  (indx: any) => void;
    getsnapPoint: any; //  (x: any, y: any, scalefactor: any, offsetx: any, offsety: any) => { found: boolean; x: number; y: number; };
    offscreenscale: any; //  (scalefactor: any) => number;
    drawallmagnifycmpre: any; //  (context: any, scalefactor: any, offsetx: any, offsety: any, comparecolor: any, isbackground: any) => void;
    drawallmagnify: any; // (context: any, scalefactor: any, offsetx: any, offsety: any): any
    drawallcmpre:  any; // (context: any, scalefactor: any, offsetx: any, offsety: any, refresh: any, comparecolor: any, isbackground: any, mode: any) => void;
    drawallnew: any; // (context: any, scalefactor: any, offsetx: any, offsety: any, refresh: any, arg5: boolean): any
    drawSelected: any; //  (context: any, scalefactor: any, offsetx: any, offsety: any) => void;
    drawall:  any; // (context: any, scalefactor: any, offsetx: any, offsety: any, refresh: any, drawprint: any) => void;
    Close:  any; // () => void;
    constructor(pagexmldata:any, binary:any) {
        var scope = this;
        this.firstdraw = false;
        this.firstdrawcompare = false;
        this.offscreen = document.createElement('canvas');
        this.offscreenctx = this.offscreen.getContext('2d');
        this.backgroundrender = true;
        this.docompare = false;
        this.dooverlay = false;
        this.isbackground = false;
        this.comparecolor = 'red';
        this.layerlist = [];
        this.numlayers = -1;
        this.vectorpagetime = 0;
        this.textlayerset = false;
        this.blocklist = [];
        this.filterblocklist = [];
        this.numblocks = -1;
        this.bnameunique = false;
        this.selectedobject = undefined;
        //this.selectColor = "#bf3ad1";
        this.selectColor = "rgba(191,58,209,0.3)";
        this.viewmode = 0;
        this.multiselect = false;
        this.selectedblocks = [];
        var dv = new DataView(pagexmldata);
        var header = String.fromCharCode(dv.getUint8(0));
        var i = 1;
        while (i <= 15) {
            header += String.fromCharCode(dv.getUint8(i));
            i++;
        }
        this.fileversion = parseInt(''+dv.getInt32(16, true)); // JS->TS:INFO added ''+ (parseInt expects string)
        this.flag = dv.getInt32(20, true);
        //var version = parseInt(dv.getInt32(16, true));
        //console.log('version:' + version);
        var layerdvpos = 52;
        if (this.flag == 0) {
            this.x = dv.getFloat32(24, true);
            this.y = dv.getFloat32(28, true);
            this.w = dv.getFloat32(32, true);
            this.h = dv.getFloat32(36, true);
            this.scale = dv.getFloat32(40, true);
            this.offsetx = dv.getFloat32(44, true);
            this.offsety = dv.getFloat32(48, true);
            layerdvpos = 52;
        }
        else if (this.flag == 1) {
            this.x = dv.getFloat64(24, true);
            this.y = dv.getFloat64(32, true);
            this.w = dv.getFloat64(40, true);
            this.h = dv.getFloat64(48, true);
            this.scale = dv.getFloat64(56, true);
            this.offsetx = dv.getFloat64(64, true);
            this.offsety = dv.getFloat64(72, true);
            layerdvpos = 80;
        }
        /*---                           ---*/
        this.numlayers = parseInt(''+dv.getInt32(layerdvpos, true)); // JS->TS:INFO added ''+ (parseInt expects string)
        var layerSize = 144;
        var startpos = layerdvpos + 4;
        var layertotsize = this.numlayers * layerSize;
        if (this.numlayers != 0) {
            var layerdv = new DataView(pagexmldata, startpos, layerSize);
            //Layer number
            var nlayer = 0;
            while (nlayer < this.numlayers) {
                var NewLayer = new LayerObject(layerdv, true);
                this.layerlist[NewLayer.index] = NewLayer;
                //this.numlayers++;
                nlayer++;
                startpos += layerSize;
                if (nlayer < this.numlayers) {
                    layerdv = new DataView(pagexmldata, startpos, layerSize);
                }
            }
            if (RxCore_GUI_VectorLayers != undefined) {
                RxCore_GUI_VectorLayers.setVectorLayers(scope.layerlist);
            }
        }
        //startpos += layerSize;
        this.pathlist = [];
        this.textlist = [];
        this.attributes = [];
        this.numpaths = -1;
        this.width = this.w - this.x;
        this.height = this.h - this.y;
        var blockdv = new DataView(pagexmldata, startpos);
        this.pathlist = [];
        this.numpaths = -1;
        this.width = this.w - this.x;
        this.height = this.h - this.y;
        var blockindx = 0;
        var bobjid = parseInt(''+blockdv.getInt32(0, true)); // JS->TS:INFO added ''+ (parseInt expects string)
        if (bobjid != 32768) {
            var blockid = parseInt(''+blockdv.getInt32(4, true)); // JS->TS:INFO added ''+ (parseInt expects string)
            var blockflag = parseInt(''+blockdv.getInt32(8, true)); // JS->TS:INFO added ''+ (parseInt expects string)
            this.bnameunique = (blockflag == 1);
            var bnamelength = parseInt(''+blockdv.getInt32(12, true)); // JS->TS:INFO added ''+ (parseInt expects string)
            var blocknamedv = new DataView(pagexmldata, startpos + 16, bnamelength * 2);
            var bnamecount = 0;
            var blockname = String.fromCharCode(blocknamedv.getUint16(bnamecount, true));
            bnamecount += 2;
            while (bnamecount < bnamelength * 2) {
                blockname += String.fromCharCode(blocknamedv.getUint16(bnamecount, true));
                bnamecount += 2;
            }
            //move to position after first block description
            var vectordv = new DataView(pagexmldata, startpos + 16 + bnamelength * 2);
            this.blocklist[blockindx] = new BlockObject(blockid, blockname, 1, Globals.backgroundColor);
            var dvpos = 0;
            var objid = parseInt(''+vectordv.getInt32(dvpos, true)); // JS->TS:INFO added ''+ (parseInt expects string)
            var prevobjid = objid;
            var drawlayer = -1;
            var layerstate = 1;
            var drawpen = 0;
            var lineweight = 1;
            var linewidth = 0;
            var numpoints = 0;
            var fontobject = {
                height: 10,
                rotation: 0,
                weight: 100,
                italic: 0,
                underline: 0,
                name: "Arial"
            };
        }
        function parse2Dloop() {
            var readstate = {
                objectid: objid,
                prevobjectid: prevobjid,
                blockpart: blockindx,
                maindvpos: dvpos,
                dlayer: drawlayer,
                lstate: layerstate,
                dpen: drawpen,
                scolor: decimalToHex(0),
                fcolor: decimalToHex(0),
                lwidth: linewidth,
                font: fontobject,
                drawmode: 13
            };
            //blockindx = readstate.blockpart
            yieldingLoop(readstate, 1000, function () {
                readstate = parse2Dbinary(readstate);
            }, function () {
                readbinarycomplete();
            });
            (function timer() {
                if (vectordv)
                    if (readstate.objectid != 32768) {
                        setTimeout(timer, 10);
                    }
            })();
        }
        function parse2Dbinary(readstate:any) {
            switch (readstate.objectid) {
                case 1:
                    readstate.maindvpos += 4;
                    var lX1 = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var lY1 = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var lX2 = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var lY2 = vectordv.getFloat32(readstate.maindvpos, true);
                    var lineobject = {
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        pen: readstate.dpen,
                        strokecolor: readstate.scolor,
                        fillcolor: readstate.fcolor,
                        linewidth: readstate.lwidth,
                        x1: lX1,
                        y1: lY1,
                        x2: lX2,
                        y2: lY2
                    };
                    var lineobj = new lineObject(lineobject, scope, readstate.blockpart, true);
                    scope.pathlist.push(lineobj);
                    scope.numpaths++;
                    readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 2:
                    readstate.maindvpos += 4;
                    numpoints = vectordv.getInt32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    lX1 = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    lY1 = vectordv.getFloat32(readstate.maindvpos, true);
                    var lpoints = [];
                    lpoints.push(lX1);
                    lpoints.push(lY1);
                    var cpnts = 1;
                    while (cpnts < numpoints) {
                        readstate.maindvpos += 4;
                        lpoints.push(vectordv.getFloat32(readstate.maindvpos, true));
                        readstate.maindvpos += 4;
                        lpoints.push(vectordv.getFloat32(readstate.maindvpos, true));
                        cpnts++;
                    }
                    var pathobject = {
                        precision: 0,
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        pen: readstate.dpen,
                        strokecolor: readstate.scolor,
                        fillcolor: readstate.fcolor,
                        linewidth: readstate.lwidth,
                        numpoints: numpoints * 2,
                        points: lpoints,
                        filled: 0,
                        gotsubpath: false,
                        shape: readstate.objectid
                    };
                    var pathobj = new pathObject(pathobject, scope, readstate.blockpart, true);
                    scope.pathlist.push(pathobj);
                    scope.numpaths++;
                    readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 3:
                    readstate.maindvpos += 4;
                    numpoints = vectordv.getInt32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    lX1 = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    lY1 = vectordv.getFloat32(readstate.maindvpos, true);
                    lpoints = [];
                    lpoints.push(lX1);
                    lpoints.push(lY1);
                    cpnts = 1;
                    while (cpnts < numpoints) {
                        readstate.maindvpos += 4;
                        lpoints.push(vectordv.getFloat32(readstate.maindvpos, true));
                        readstate.maindvpos += 4;
                        lpoints.push(vectordv.getFloat32(readstate.maindvpos, true));
                        cpnts++;
                    }
                    pathobject = {
                        precision: 0,
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        pen: readstate.dpen,
                        strokecolor: readstate.scolor,
                        fillcolor: readstate.fcolor,
                        linewidth: readstate.lwidth,
                        numpoints: numpoints * 2,
                        points: lpoints,
                        filled: 1,
                        gotsubpath: false,
                        shape: readstate.objectid
                    };
                    pathobj = new pathObject(pathobject, scope, readstate.blockpart, true);
                    scope.pathlist.push(pathobj);
                    scope.numpaths++;
                    readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 13:
                    readstate.maindvpos += 4;
                    var aX = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var aY = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var aR = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var aSa = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var aEa = vectordv.getFloat32(readstate.maindvpos, true);
                    //var endangle = aSa + Math.PI;
                    /*if(aSa > 0){
                        endangle = aSa + Math.PI;
                    }else{
                        endangle = aSa - Math.PI;
                    }*/
                    /*var startangle = aSa;
                    if(startangle < 0){
                        startangle += Math.PI*2;
                    }*/
                    var arcobject = {
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        pen: readstate.dpen,
                        strokecolor: readstate.scolor,
                        fillcolor: readstate.fcolor,
                        linewidth: readstate.lwidth,
                        clockwise: (aEa > 0),
                        ax: aX,
                        ay: aY,
                        ar: aR,
                        asa: aSa,
                        aea: aSa + aEa
                    };
                    var arcobj = new arcObject(arcobject, scope, readstate.blockpart, true);
                    scope.pathlist.push(arcobj);
                    scope.numpaths++;
                    readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 4:
                    readstate.maindvpos += 4;
                    var cX = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var cY = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var cR = vectordv.getFloat32(readstate.maindvpos, true);
                    var circleobject = {
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        pen: readstate.dpen,
                        strokecolor: readstate.scolor,
                        fillcolor: readstate.fcolor,
                        linewidth: readstate.lwidth,
                        cx: cX,
                        cy: cY,
                        cr: cR,
                        filled: 0
                    };
                    var circleobj = new circleObject(circleobject, scope, readstate.blockpart, true);
                    scope.pathlist.push(circleobj);
                    scope.numpaths++;
                    readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 5:
                    readstate.maindvpos += 4;
                    cX = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    cY = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    cR = vectordv.getFloat32(readstate.maindvpos, true);
                    circleobject = {
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        pen: readstate.dpen,
                        strokecolor: readstate.scolor,
                        fillcolor: readstate.fcolor,
                        linewidth: readstate.lwidth,
                        cx: cX,
                        cy: cY,
                        cr: cR,
                        filled: 1
                    };
                    circleobj = new circleObject(circleobject, scope, readstate.blockpart, true);
                    scope.pathlist.push(circleobj);
                    scope.numpaths++;
                    readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 6:
                    var numpointarr:any = [] as any;
                    var subpatharr:any = [] as any;
                    var subpatharrays:any = [] as any;
                    //readstate.maindvpos += 4;
                    //var tnumpoints = vectordv.getInt32(readstate.maindvpos,true);
                    readstate.maindvpos += 4;
                    var subpolygons = vectordv.getInt32(readstate.maindvpos, true);
                    //readstate.maindvpos += 4;
                    //var numpoints_1 = vectordv.getInt32(readstate.maindvpos,true);
                    var pcountr = 0;
                    while (pcountr < subpolygons) {
                        readstate.maindvpos += 4;
                        numpointarr.push(vectordv.getInt32(readstate.maindvpos, true));
                        pcountr++;
                    }
                    pcountr = 0;
                    while (pcountr < subpolygons) {
                        for (var pc = 0; pc < numpointarr[pcountr]; pc++) {
                            readstate.maindvpos += 4;
                            subpatharr.push(vectordv.getFloat32(readstate.maindvpos, true));
                            readstate.maindvpos += 4;
                            subpatharr.push(vectordv.getFloat32(readstate.maindvpos, true));
                        }
                        subpatharrays.push(subpatharr);
                        subpatharr = [];
                        pcountr++;
                    }
                    pathobject = {
                        precision: 0,
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        pen: readstate.dpen,
                        strokecolor: readstate.scolor,
                        fillcolor: readstate.fcolor,
                        linewidth: readstate.lwidth,
                        numpoints: numpointarr[0] * 2,
                        points: subpatharrays,
                        filled: 1,
                        gotsubpath: true,
                        shape: readstate.objectid
                    };
                    pathobj = new pathObject(pathobject, scope, readstate.blockpart, true);
                    //lpoints = [];
                    //lpoints.push(lX1);
                    //lpoints.push(lY1);
                    //cpnts = 1;
                    /*while(cpnts<numpoints){
                     readstate.maindvpos += 4;
                     lpoints.push(vectordv.getFloat32(readstate.maindvpos,true));
                     readstate.maindvpos += 4;
                     lpoints.push(vectordv.getFloat32(readstate.maindvpos,true));
                     cpnts++;
                     }*/
                    //pathobj = new pathObject(pathobject,blockindx,true);
                    scope.pathlist.push(pathobj);
                    scope.numpaths++;
                    readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 7:
                    readstate.maindvpos += 4;
                    lX1 = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    lY1 = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    lX2 = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    lY2 = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var imagelength = vectordv.getInt32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var imagestr = "";
                    var curpos = readstate.maindvpos;
                    while (curpos < imagelength + readstate.maindvpos) {
                        imagestr += String.fromCharCode(vectordv.getUint8(curpos));
                        curpos++;
                    }
                    readstate.maindvpos = curpos;
                    var imageobject = {
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        x1: lX1,
                        y1: lY1,
                        x2: lX2,
                        y2: lY2,
                        image: imagestr,
                        useref: false
                    };
                    var imgobj = new imageObject(imageobject, readstate.blockpart, true);
                    scope.pathlist.push(imgobj);
                    scope.numpaths++;
                    //readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 8:
                    readstate.maindvpos += 4;
                    lX1 = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    lY1 = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    lX2 = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    lY2 = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var nameLength = vectordv.getInt32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    imagestr = "";
                    curpos = readstate.maindvpos;
                    while (curpos < nameLength + readstate.maindvpos) {
                        imagestr += String.fromCharCode(vectordv.getUint8(curpos));
                        curpos++;
                    }
                    readstate.maindvpos = curpos;
                    imageobject = {
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        x1: lX1,
                        y1: lY1,
                        x2: lX2,
                        y2: lY2,
                        image: imagestr,
                        useref: true
                    };
                    imgobj = new imageObject(imageobject, readstate.blockpart, true);
                    scope.pathlist.push(imgobj);
                    scope.numpaths++;
                    //readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 10:
                    //Attribute
                    readstate.maindvpos += 4;
                    var nAttrbutenl = parseInt(''+vectordv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parseInt expects string)
                    readstate.maindvpos += 4;
                    var battrncount = readstate.maindvpos;
                    var szatrrname = "";
                    while (battrncount < readstate.maindvpos + nAttrbutenl * 2) {
                        szatrrname += String.fromCharCode(vectordv.getUint16(battrncount, true));
                        battrncount += 2;
                    }
                    readstate.maindvpos = battrncount;
                    var nAttrbutevl = parseInt(''+vectordv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parseInt expects string)
                    readstate.maindvpos += 4;
                    var battrvcount = readstate.maindvpos;
                    var szatrtvalue = "";
                    while (battrvcount < readstate.maindvpos + nAttrbutevl * 2) {
                        szatrtvalue += String.fromCharCode(vectordv.getUint16(battrvcount, true));
                        battrvcount += 2;
                    }
                    readstate.maindvpos = battrvcount;
                    var AttributeObject = {
                        name: szatrrname,
                        value: szatrtvalue,
                        blockref: readstate.blockpart
                    };
                    scope.attributes.push(AttributeObject);
                    //vector3Dref.partlist[blockid].addAtrib(szatrrname,szatrtvalue);
                    /*
                     0	4	LONG	Object ID	10
                     4	4	LONG	NameLength		Number of characters in name
                     8	N	CHAR[N]	Name		Attribute Name
                     8+NameLength	4	LONG	ValueLength		Number of characters in value
                     8+NameLen+4	N	CHAR[N]	Value		Attribute Value

                     */
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = parseInt(''+vectordv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parseInt expects string)
                    break;
                case 11:
                    readstate.maindvpos += 4;
                    var ltX1 = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var ltY1 = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var ltX2 = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var ltY2 = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    if (scope.fileversion >= 2) {
                        var ltrot = vectordv.getFloat32(readstate.maindvpos, true);
                        readstate.maindvpos += 4;
                    }
                    else {
                        ltrot = 0;
                    }
                    if (ltrot != 0) {
                        //console.log(ltrot);
                    }
                    var nTextLength = vectordv.getInt32(readstate.maindvpos, true);
                    nTextLength *= 2;
                    readstate.maindvpos += 4;
                    var textncount = readstate.maindvpos;
                    var sztextobj = "";
                    while (textncount < readstate.maindvpos + nTextLength) {
                        sztextobj += String.fromCharCode(vectordv.getUint16(textncount, true));
                        textncount += 2;
                    }
                    readstate.maindvpos = textncount;
                    var textobject = {
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        x1: ltX1,
                        y1: ltY1,
                        x2: ltX2,
                        y2: ltY2,
                        rot: ltrot,
                        text: sztextobj,
                        draw: false
                    };
                    scope.textlist.push(textobject);
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 12:
                    readstate.maindvpos += 4;
                    var ltoX1 = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var lt0Y1 = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    nTextLength = vectordv.getInt32(readstate.maindvpos, true);
                    nTextLength *= 2;
                    readstate.maindvpos += 4;
                    textncount = readstate.maindvpos;
                    sztextobj = "";
                    while (textncount < readstate.maindvpos + nTextLength) {
                        sztextobj += String.fromCharCode(vectordv.getUint16(textncount, true));
                        textncount += 2;
                    }
                    readstate.maindvpos = textncount;
                    var dtextobject = {
                        strokecolor: readstate.scolor,
                        fillcolor: readstate.fcolor,
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        x1: ltoX1,
                        y1: lt0Y1,
                        text: sztextobj
                    };
                    var textobj = new textObject(dtextobject, readstate.font, readstate.blockpart);
                    scope.pathlist.push(textobj);
                    scope.numpaths++;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 21: //double line.
                    readstate.maindvpos += 4;
                    lX1 = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    lY1 = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    lX2 = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    lY2 = vectordv.getFloat64(readstate.maindvpos, true);
                    lineobject = {
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        pen: readstate.dpen,
                        strokecolor: readstate.scolor,
                        fillcolor: readstate.fcolor,
                        linewidth: readstate.lwidth,
                        x1: lX1,
                        y1: lY1,
                        x2: lX2,
                        y2: lY2
                    };
                    lineobj = new lineObject(lineobject, scope, readstate.blockpart, true);
                    scope.pathlist.push(lineobj);
                    scope.numpaths++;
                    readstate.maindvpos += 8;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 22: //double polyline.
                    readstate.maindvpos += 4;
                    numpoints = vectordv.getInt32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    lX1 = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    lY1 = vectordv.getFloat64(readstate.maindvpos, true);
                    lpoints = [];
                    lpoints.push(lX1);
                    lpoints.push(lY1);
                    cpnts = 1;
                    while (cpnts < numpoints) {
                        readstate.maindvpos += 8;
                        lpoints.push(vectordv.getFloat64(readstate.maindvpos, true));
                        readstate.maindvpos += 8;
                        lpoints.push(vectordv.getFloat64(readstate.maindvpos, true));
                        cpnts++;
                    }
                    pathobject = {
                        precision: 1,
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        pen: readstate.dpen,
                        strokecolor: readstate.scolor,
                        fillcolor: readstate.fcolor,
                        linewidth: readstate.lwidth,
                        numpoints: numpoints * 2,
                        points: lpoints,
                        filled: 0,
                        gotsubpath: false,
                        shape: readstate.objectid
                    };
                    pathobj = new pathObject(pathobject, scope, readstate.blockpart, true);
                    scope.pathlist.push(pathobj);
                    scope.numpaths++;
                    readstate.maindvpos += 8;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 23: //double polygon.
                    readstate.maindvpos += 4;
                    numpoints = vectordv.getInt32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    lX1 = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    lY1 = vectordv.getFloat64(readstate.maindvpos, true);
                    lpoints = [];
                    lpoints.push(lX1);
                    lpoints.push(lY1);
                    cpnts = 1;
                    while (cpnts < numpoints) {
                        readstate.maindvpos += 8;
                        lpoints.push(vectordv.getFloat64(readstate.maindvpos, true));
                        readstate.maindvpos += 8;
                        lpoints.push(vectordv.getFloat64(readstate.maindvpos, true));
                        cpnts++;
                    }
                    pathobject = {
                        precision: 1,
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        pen: readstate.dpen,
                        strokecolor: readstate.scolor,
                        fillcolor: readstate.fcolor,
                        linewidth: readstate.lwidth,
                        numpoints: numpoints * 2,
                        points: lpoints,
                        filled: 1,
                        gotsubpath: false,
                        shape: readstate.objectid
                    };
                    pathobj = new pathObject(pathobject, scope, readstate.blockpart, true);
                    scope.pathlist.push(pathobj);
                    scope.numpaths++;
                    readstate.maindvpos += 8;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 24: //double outline circle.
                    readstate.maindvpos += 4;
                    cX = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    cY = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    cR = vectordv.getFloat64(readstate.maindvpos, true);
                    circleobject = {
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        pen: readstate.dpen,
                        strokecolor: readstate.scolor,
                        fillcolor: readstate.fcolor,
                        linewidth: readstate.lwidth,
                        cx: cX,
                        cy: cY,
                        cr: cR,
                        filled: 0
                    };
                    circleobj = new circleObject(circleobject, scope, readstate.blockpart, true);
                    scope.pathlist.push(circleobj);
                    scope.numpaths++;
                    readstate.maindvpos += 8;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 34:
                    readstate.maindvpos += 4;
                    aX = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    aY = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    aR = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    aSa = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    aEa = vectordv.getFloat64(readstate.maindvpos, true);
                    arcobject = {
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        pen: readstate.dpen,
                        strokecolor: readstate.scolor,
                        fillcolor: readstate.fcolor,
                        linewidth: readstate.lwidth,
                        clockwise: (aEa > 0),
                        ax: aX,
                        ay: aY,
                        ar: aR,
                        asa: aSa,
                        aea: aSa + aEa
                    };
                    arcobj = new arcObject(arcobject, scope, readstate.blockpart, true);
                    scope.pathlist.push(arcobj);
                    scope.numpaths++;
                    readstate.maindvpos += 8;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 25: //double filled circle.
                    readstate.maindvpos += 4;
                    cX = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    cY = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    cR = vectordv.getFloat64(readstate.maindvpos, true);
                    circleobject = {
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        pen: readstate.dpen,
                        strokecolor: readstate.scolor,
                        fillcolor: readstate.fcolor,
                        linewidth: readstate.lwidth,
                        cx: cX,
                        cy: cY,
                        cr: cR,
                        filled: 1
                    };
                    circleobj = new circleObject(circleobject, scope, readstate.blockpart, true);
                    scope.pathlist.push(circleobj);
                    scope.numpaths++;
                    readstate.maindvpos += 8;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 26: //double polypolygon.
                    numpointarr = [];
                    subpatharr = [];
                    subpatharrays = [];
                    readstate.maindvpos += 4;
                    subpolygons = vectordv.getInt32(readstate.maindvpos, true);
                    pcountr = 0;
                    while (pcountr < subpolygons) {
                        readstate.maindvpos += 4;
                        numpointarr.push(vectordv.getInt32(readstate.maindvpos, true));
                        pcountr++;
                    }
                    readstate.maindvpos += 4;
                    pcountr = 0;
                    while (pcountr < subpolygons) {
                        for (pc = 0; pc < numpointarr[pcountr]; pc++) {
                            /*if(pc == 0){
                                readstate.maindvpos += 4;
                            }else{
                                readstate.maindvpos += 8;
                            }*/
                            subpatharr.push(vectordv.getFloat64(readstate.maindvpos, true));
                            readstate.maindvpos += 8;
                            subpatharr.push(vectordv.getFloat64(readstate.maindvpos, true));
                            readstate.maindvpos += 8;
                        }
                        subpatharrays.push(subpatharr);
                        subpatharr = [];
                        pcountr++;
                    }
                    pathobject = {
                        precision: 1,
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        pen: readstate.dpen,
                        strokecolor: readstate.scolor,
                        fillcolor: readstate.fcolor,
                        linewidth: readstate.lwidth,
                        numpoints: numpointarr[0] * 2,
                        points: subpatharrays,
                        filled: 1,
                        gotsubpath: true,
                        shape: readstate.objectid
                    };
                    pathobj = new pathObject(pathobject, scope, readstate.blockpart, true);
                    scope.pathlist.push(pathobj);
                    scope.numpaths++;
                    //readstate.maindvpos += 8;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 27: //double image embedded.
                    readstate.maindvpos += 4;
                    lX1 = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    lY1 = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    lX2 = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    lY2 = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    imagelength = vectordv.getInt32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    imagestr = "";
                    curpos = readstate.maindvpos;
                    while (curpos < imagelength + readstate.maindvpos) {
                        imagestr += String.fromCharCode(vectordv.getUint8(curpos));
                        curpos++;
                    }
                    readstate.maindvpos = curpos;
                    imageobject = {
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        x1: lX1,
                        y1: lY1,
                        x2: lX2,
                        y2: lY2,
                        image: imagestr,
                        useref: false
                    };
                    imgobj = new imageObject(imageobject, readstate.blockpart, true);
                    scope.pathlist.push(imgobj);
                    scope.numpaths++;
                    //readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 28: //double image referenced.
                    readstate.maindvpos += 4;
                    lX1 = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    lY1 = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    lX2 = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    lY2 = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    nameLength = vectordv.getInt32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    imagestr = "";
                    curpos = readstate.maindvpos;
                    while (curpos < nameLength + readstate.maindvpos) {
                        imagestr += String.fromCharCode(vectordv.getUint8(curpos));
                        curpos++;
                    }
                    readstate.maindvpos = curpos;
                    imageobject = {
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        x1: lX1,
                        y1: lY1,
                        x2: lX2,
                        y2: lY2,
                        image: imagestr,
                        useref: true
                    };
                    imgobj = new imageObject(imageobject, readstate.blockpart, true);
                    scope.pathlist.push(imgobj);
                    scope.numpaths++;
                    //readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 31: //double text element.
                    readstate.maindvpos += 4;
                    ltX1 = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    ltY1 = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    ltX2 = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    ltY2 = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    if (scope.fileversion >= 2) {
                        ltrot = vectordv.getFloat64(readstate.maindvpos, true);
                        readstate.maindvpos += 8;
                    }
                    else {
                        ltrot = 0;
                    }
                    if (ltrot != 0) {
                        //console.log(ltrot);
                    }
                    nTextLength = vectordv.getInt32(readstate.maindvpos, true);
                    nTextLength *= 2;
                    readstate.maindvpos += 4;
                    textncount = readstate.maindvpos;
                    sztextobj = "";
                    while (textncount < readstate.maindvpos + nTextLength) {
                        sztextobj += String.fromCharCode(vectordv.getUint16(textncount, true));
                        textncount += 2;
                    }
                    readstate.maindvpos = textncount;
                    textobject = {
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        x1: ltX1,
                        y1: ltY1,
                        x2: ltX2,
                        y2: ltY2,
                        rot: ltrot,
                        text: sztextobj,
                        draw: false
                    };
                    scope.textlist.push(textobject);
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 32: //double text output.
                    readstate.maindvpos += 4;
                    ltoX1 = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    lt0Y1 = vectordv.getFloat64(readstate.maindvpos, true);
                    readstate.maindvpos += 8;
                    nTextLength = vectordv.getInt32(readstate.maindvpos, true);
                    nTextLength *= 2;
                    readstate.maindvpos += 4;
                    textncount = readstate.maindvpos;
                    sztextobj = "";
                    while (textncount < readstate.maindvpos + nTextLength) {
                        sztextobj += String.fromCharCode(vectordv.getUint16(textncount, true));
                        textncount += 2;
                    }
                    readstate.maindvpos = textncount;
                    dtextobject = {
                        strokecolor: readstate.scolor,
                        fillcolor: readstate.fcolor,
                        layer: readstate.dlayer,
                        drawmode: readstate.drawmode,
                        layerstate: readstate.lstate,
                        x1: ltoX1,
                        y1: lt0Y1,
                        text: sztextobj
                    };
                    textobj = new textObject(dtextobject, readstate.font, readstate.blockpart);
                    scope.pathlist.push(textobj);
                    scope.numpaths++;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 64:
                    readstate.maindvpos += 4;
                    var ndrawcolor = vectordv.getInt32(readstate.maindvpos, true);
                    readstate.scolor = decimalToHex(ndrawcolor);
                    readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 65:
                    readstate.maindvpos += 4;
                    var nfillcolor = vectordv.getInt32(readstate.maindvpos, true);
                    readstate.fcolor = decimalToHex(nfillcolor);
                    readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 66:
                    readstate.maindvpos += 4;
                    readstate.lwidth = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 67:
                    readstate.maindvpos += 4;
                    var linestyle = vectordv.getInt32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 68:
                    readstate.maindvpos += 4;
                    readstate.dlayer = vectordv.getInt32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    /*for(var lc = 0;lc<this.layerlist.length;lc++){
                     if (this.layerlist[lc].index == readstate.dlayer){
                     readstate.lstate = this.layerlist[lc].state;
                     }
                     }*/
                    break;
                case 69:
                    readstate.maindvpos += 4;
                    readstate.dpen = vectordv.getInt32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 70:
                    readstate.maindvpos += 4;
                    lineweight = vectordv.getInt32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 71:
                    var drawbackcolor = true;
                    readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 72:
                    var fillbackcolor = true;
                    readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 73:
                    readstate.maindvpos += 4;
                    var drawmode = vectordv.getInt32(readstate.maindvpos, true);
                    readstate.drawmode = drawmode;
                    readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 76:
                    readstate.maindvpos += 4;
                    var fheight = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var frotation = vectordv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var fweight = vectordv.getInt32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var fitalic = vectordv.getInt32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var funderline = vectordv.getInt32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var fontnamelength = vectordv.getInt32(readstate.maindvpos, true);
                    fontnamelength *= 2;
                    readstate.maindvpos += 4;
                    var fnamecount = readstate.maindvpos;
                    var szfontname = "";
                    while (fnamecount < readstate.maindvpos + fontnamelength) {
                        if (vectordv.getUint16(fnamecount, true) != 0) {
                            szfontname += String.fromCharCode(vectordv.getUint16(fnamecount, true));
                        }
                        fnamecount += 2;
                    }
                    readstate.maindvpos = fnamecount;
                    readstate.font = {
                        height: fheight,
                        rotation: frotation,
                        weight: fweight,
                        italic: fitalic,
                        underline: funderline,
                        name: szfontname
                    };
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    break;
                case 12288:
                    readstate.objectid = 12288;
                    readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    //end of block;
                    break;
                case 4096:
                    readstate.objectid = 4096;
                    readstate.blockpart++;
                    //readstate.maindvpos += 4;
                    //bobjid = parseInt(vectordv.getInt32(readstate.maindvpos,true));
                    readstate.maindvpos += 4;
                    readstate.blockid = parseInt(''+vectordv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parseInt expects string)
                    readstate.maindvpos += 4;
                    var blockflag = parseInt(''+vectordv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parseInt expects string)
                    scope.bnameunique = (blockflag == 1);
                    readstate.maindvpos += 4;
                    bnamelength = parseInt(''+vectordv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parseInt expects string)
                    readstate.maindvpos += 4;
                    bnamecount = readstate.maindvpos;
                    blockname = "";
                    //bnamecount++;
                    while (bnamecount < readstate.maindvpos + bnamelength * 2) {
                        blockname += String.fromCharCode(vectordv.getUint16(bnamecount, true));
                        bnamecount += 2;
                    }
                    readstate.maindvpos = bnamecount;
                    var bexist = false;
                    if (scope.bnameunique) {
                        for (var bcount = 0; bcount < scope.blocklist.length; bcount++) {
                            if (blockname == scope.blocklist[bcount].name) {
                                readstate.blockpart = bcount;
                                bexist = true;
                                break;
                            }
                        }
                    }
                    if (!bexist) {
                        scope.blocklist[readstate.blockpart] = new BlockObject(readstate.blockid, blockname, 1, readstate.fcolor);
                    }
                    //readstate.maindvpos += 4;
                    readstate.prevobjectid = readstate.objectid;
                    readstate.objectid = vectordv.getInt32(readstate.maindvpos, true);
                    //start of new block
                    break;
                case 32768:
                    //read complete
                    readstate.objectid = 32768;
                    break;
                default:
                    console.log('default');
                    console.log(readstate.objectid);
                    console.log(readstate.prevobjectid);
                    console.log(readstate.maindvpos);
                    readstate.objectid = 32768;
            }
            return readstate;
        }
        function readbinarycomplete() {
            scope.filterblocklist = scope.blocklist.slice();
            if (RxCore_GUI_VectorBlocks != undefined) {
                RxCore_GUI_VectorBlocks.setVectorBlocks(scope.filterblocklist);
            }
            if (scope.docompare) {
                comparedrawcheck();
            }
            else {
                Globals.DocObj.pages[Globals.DocObj.currentpage].draw_vector(true);
            }
            if (scope.textlist.length > 0) {
                if (RxCore_GUI_HasText != undefined) {
                    RxCore_GUI_HasText.hastext = true;
                    RxCore_GUI_HasText.hasText(RxCore_GUI_HasText.hastext);
                }
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].VectorPageObj != undefined) {
                    Globals.DocObj.pages[Globals.DocObj.currentpage].settextdivs(true);
                }
            }
            else {
                if (RxCore_GUI_HasText != undefined) {
                    RxCore_GUI_HasText.hastext = false;
                    RxCore_GUI_HasText.hasText(RxCore_GUI_HasText.hastext);
                }
            }
        }
        function blockon(count:any) {
            var bblcckon = true;
            if (scope.blocklist.length > 0) {
                bblcckon = (scope.blocklist[scope.pathlist[count].blockname].state == 1);
            }
            return bblcckon;
        }
        function layeron(count:any) {
            var blayeron = true;
            if (scope.layerlist.length > 0) {
                if (scope.pathlist[count].layer != -1 && scope.layerlist[scope.pathlist[count].layer] != undefined) {
                    blayeron = (scope.layerlist[scope.pathlist[count].layer].state == 1);
                }
            }
            return blayeron;
        }
        function getBlockID(blockindex:any) {
            //var blockindex = -1;
            var blockID = scope.blocklist[blockindex].index;
            return blockID;
        }
        function getBlockIndex(blockid:any) {
            var blockindex = -1;
            for (var bcount = 0; bcount < scope.blocklist.length; bcount++) {
                if (scope.blocklist[bcount].index == blockid) {
                    blockindex = bcount;
                    break;
                }
            }
            return blockindex;
        }
        function getAttributes(blockindex:any) {
            var partlist = [];
            //var blockindex = getBlockIndex(blockid);
            for (var attrc = 0; attrc < scope.attributes.length; attrc++) {
                if (scope.attributes[attrc].blockref == blockindex) {
                    partlist.push(scope.attributes[attrc]);
                }
            }
            return partlist;
        }
        this.getBlocks = function () {
            return scope.filterblocklist;
        };
        this.restoreBlockStates = function () {
            for (var bcount = 0; bcount < scope.blocklist.length; bcount++) {
                scope.blocklist[bcount].overridecolor = false;
                scope.blocklist[bcount].color = scope.blocklist[bcount].defaultcolor;
            }
        };
        this.setBlockColor = function (blockid:any, Color:any, override:any) {
            //var blockindex = 0;
            var blockindex = getBlockIndex(blockid);
            scope.blocklist[blockindex].overridecolor = override;
            if (override) {
                scope.blocklist[blockindex].color = Color;
            }
            else {
                scope.blocklist[blockindex].color = scope.blocklist[blockindex].defaultcolor;
            }
            /*for(var bcount = 0;bcount < scope.blocklist.length;bcount++){
                if (scope.blocklist[bcount].index == blockid){
                    scope.blocklist[bcount].color = Color;
                    break;
                }
            }*/
        };
        this.appendCustomBlockAttribute = function (blockid:any, name:any, value:any) {
            var blockindex = getBlockIndex(blockid);
            var AttributeObject = {
                name: name,
                value: value,
                blockref: blockindex
            };
            scope.attributes.push(AttributeObject);
        };
        this.FindBlockByAttr = function (attrname:any, attrvalue:any) {
            var blockref = -1;
            var blockindex = -1;
            //matchRuleShort(block.name, szBlockLoadMask);
            for (var attrc = 0; attrc < scope.attributes.length; attrc++) {
                if (scope.attributes[attrc].name.toUpperCase() == attrname.toUpperCase() && scope.attributes[attrc].value == attrvalue) {
                    blockref = scope.attributes[attrc].blockref;
                    break;
                }
            }
            if (blockref != -1) {
                blockindex = scope.blocklist[blockref].index;
                /*for(var bcount = 0;bcount < scope.blocklist.length;bcount++){
                    if (scope.blocklist[bcount].index == blockref){
                        blockindex = bcount;
                        break;
                    }
                }*/
            }
            return blockindex;
        };
        this.ViewMode = function (onoff:any) {
            scope.viewmode = onoff;
        };
        this.unSelectAllBlocks = function () {
            for (var i = 0; i < scope.pathlist.length; i++) {
                if (scope.pathlist[i].type == "path") {
                    scope.pathlist[i].unselect();
                }
            }
            var partlist:any = [] as any;
            if (RxCore_GUI_2DBlockInfo != undefined) {
                RxCore_GUI_2DBlockInfo.set2DBlockInfo(partlist);
            }
        };
        this.blockAttributes = function (blockid:any) {
            var partlist = [];
            var blockindex = getBlockIndex(blockid);
            partlist = getAttributes(blockindex);
            return partlist;
        };
        this.selectBlockPath = function (select:any, blockid:any) {
            //var blockindex = getBlockIndex(blockid);
            for (var i = 0; i < scope.pathlist.length; i++) {
                var blayeron = layeron(i);
                var bblcckon = blockon(i);
                if (blayeron && bblcckon) {
                    if (scope.pathlist[i].blockname == blockid) {
                        if (scope.pathlist[i].type == 'path') {
                            if (select) {
                                scope.pathlist[i].select();
                            }
                            else {
                                scope.pathlist[i].unselect();
                            }
                        }
                    }
                }
            }
        };
        this.selectBlock = function (blockid:any) {
            var partlist = [];
            //getBlockIndex(blockid);
            var blockindex = getBlockIndex(blockid);
            for (var i = 0; i < scope.pathlist.length; i++) {
                var blayeron = layeron(i);
                var bblcckon = blockon(i);
                if (blayeron && bblcckon) {
                    //within = scope.pathlist[i].insidePolygon(x, y, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h);
                    if (scope.pathlist[i].blockname == blockindex) {
                        if (scope.pathlist[i].type == 'path') {
                            scope.pathlist[i].toggleselect();
                        }
                        if (scope.pathlist[i].selected) {
                            partlist = getAttributes(blockindex);
                        }
                        else {
                            partlist = [];
                        }
                    }
                    else {
                        if (scope.pathlist[i].type == "path") {
                            scope.pathlist[i].unselect();
                        }
                    }
                }
            }
            if (RxCore_GUI_2DBlockID != undefined) {
                RxCore_GUI_2DBlockID.set2DBlockID([scope.blocklist[blockindex].index]);
            }
            if (RxCore_GUI_2DBlockInfo != undefined) {
                RxCore_GUI_2DBlockInfo.set2DBlockInfo(partlist);
            }
        };
        this.getblockcentroid = function (blockid:any, scalefactor:any, offsetx:any, offsety:any) {
            //this.getcentroid
            var blockindex = getBlockIndex(blockid);
            var centroid = {};
            for (var i = 0; i < scope.pathlist.length; i++) {
                var blayeron = layeron(i);
                var bblcckon = blockon(i);
                if (blayeron && bblcckon) {
                    if (scope.pathlist[i].blockname == blockindex) {
                        centroid = scope.pathlist[i].getcentroid(scalefactor, offsetx, offsety, scope.x, scope.y, scope.h);
                        break;
                    }
                }
            }
            return centroid;
        };
        this.getBlockRect = function (blockid:any, scalefactor:any, offsetx:any, offsety:any) {
            var blockindex = getBlockIndex(blockid);
            //var rect = {x:0,y:0,w:0,h:0};
            var rect = {
                found: false,
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                wp: 0,
                hp: 0
            };
            for (var i = 0; i < scope.pathlist.length; i++) {
                var blayeron = layeron(i);
                var bblcckon = blockon(i);
                if (blayeron && bblcckon) {
                    if (scope.pathlist[i].blockname == blockindex) {
                        rect = scope.pathlist[i].getRectangle(scalefactor, offsetx, offsety, scope.x, scope.y, scope.h);
                        break;
                    }
                }
            }
            return rect;
        };
        this.getinsidePolygon = function (x:any, y:any, scalefactor:any, offsetx:any, offsety:any, multi:any) {
            scope.multiselect = multi;
            var within = false;
            var rotatedpoint = { x: x, y: y };
            var partlist = [];
            var selected = [];
            let foundblock:any = undefined as any; // JS->TS:INFO possible source of errors
            let partindex:any = undefined as any; // JS->TS:INFO possible source of errors
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                rotatedpoint = mouse_rotated(x, y);
            }
            x = rotatedpoint.x;
            y = rotatedpoint.y;
            for (var i = 0; i < scope.pathlist.length; i++) {
                var blayeron = layeron(i);
                var bblcckon = blockon(i);
                if (blayeron && bblcckon) {
                    within = scope.pathlist[i].insidePolygon(x, y, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h);
                    if (within) {
                        //scope.pathlist[i].toggleselect();
                        foundblock = scope.pathlist[i].blockname;
                        partindex = i;
                    }
                    else {
                        //foundblock = undefined;
                        if (multi) {
                            if (scope.pathlist[i].selected) {
                                var blockindex = scope.pathlist[i].blockname;
                                selected.push(scope.blocklist[blockindex].index);
                            }
                        }
                    }
                }
            }
            if (foundblock) {
                if (!scope.pathlist[partindex].selected) {
                    scope.selectBlockPath(true, scope.pathlist[partindex].blockname);
                }
                else {
                    scope.selectBlockPath(false, scope.pathlist[partindex].blockname);
                }
                if (scope.pathlist[partindex].selected) {
                    selected.push(scope.blocklist[foundblock].index);
                    if (!multi) {
                        partlist = getAttributes(foundblock);
                    }
                }
                else {
                    if (!multi) {
                        partlist = [];
                    }
                }
            }
            if (RxCore_GUI_2DBlockID != undefined) {
                RxCore_GUI_2DBlockID.set2DBlockID(selected);
            }
            if (!multi) {
                if (RxCore_GUI_2DBlockInfo != undefined) {
                    RxCore_GUI_2DBlockInfo.set2DBlockInfo(partlist);
                }
            }
        };
        this.resetLayers = function () {
            for (var i = 0; i < this.layerlist.length; i++) {
                if (this.layerlist[i] == undefined) {
                    continue;
                }
                this.layerlist[i].state = this.layerlist[i].defaultstate;
            }
            if (RxCore_GUI_VectorLayers != undefined) {
                RxCore_GUI_VectorLayers.setVectorLayers(this.layerlist);
            }
        };
        this.filterBlocks = function (szBlockLoadMask:any) {
            scope.filterblocklist = scope.blocklist.filter(function (block) {
                return matchRuleShort(block.name, szBlockLoadMask);
            });
            if (RxCore_GUI_VectorBlocks != undefined) {
                RxCore_GUI_VectorBlocks.setVectorBlocks(scope.filterblocklist);
            }
            //matchRuleShort("bird123", "bird*")
        };
        this.turnBlockAllOnOff = function (OnOff:any) {
            for (var i = 0; i < scope.filterblocklist.length; i++) {
                if (scope.filterblocklist[i] == undefined) {
                    continue;
                }
                scope.filterblocklist[i].state = OnOff ? 1 : 0;
            }
            for (i = 0; i < scope.blocklist.length; i++) {
                if (scope.blocklist[i] == undefined) {
                    continue;
                }
                scope.blocklist[i].state = OnOff ? 1 : 0;
            }
            if (RxCore_GUI_VectorBlocks != undefined) {
                RxCore_GUI_VectorBlocks.setVectorBlocks(scope.filterblocklist);
            }
        };
        this.turnLayerAllOnOff = function (OnOff:any) {
            for (var i = 0; i < this.layerlist.length; i++) {
                if (this.layerlist[i] == undefined) {
                    continue;
                }
                this.layerlist[i].state = OnOff ? 1 : 0;
            }
            if (RxCore_GUI_VectorLayers != undefined) {
                RxCore_GUI_VectorLayers.setVectorLayers(scope.layerlist);
            }
        };
        this.setActive = function () {
            if (RxCore_GUI_VectorLayers != undefined) {
                RxCore_GUI_VectorLayers.setVectorLayers(scope.layerlist);
            }
            if (RxCore_GUI_VectorBlocks != undefined) {
                RxCore_GUI_VectorBlocks.setVectorBlocks(scope.filterblocklist);
            }
        };
        this.turnLayerOnOff = function (layerindex:any) {
            if (this.layerlist[layerindex].state == 1) {
                this.layerlist[layerindex].state = 0;
            }
            else {
                this.layerlist[layerindex].state = 1;
            }
            /*for (var i=0; i<this.pathlist.length;i++){
             if(layerindex == this.pathlist[i].layer ){
             this.pathlist[i].layerstate = this.layerlist[layerindex].state;
             }

             }*/
            /*for (i=0;i<this.layerlist.length-1;i++){
             if (this.layerlist[i].index == layerindex){
             if (this.layerlist[i].state == 1){
             this.layerlist[i].state = 0;
             return;
             }else{
             this.layerlist[i].state = 1;
             return;
             }
             }
             }*/
        };
        this.resetBlocks = function () {
            for (var i = 0; i < scope.filterblocklist.length; i++) {
                if (scope.filterblocklist[i] == undefined) {
                    continue;
                }
                scope.filterblocklist[i].state = scope.filterblocklist[i].defaultstate;
            }
            for (i = 0; i < scope.blocklist.length; i++) {
                if (scope.blocklist[i] == undefined) {
                    continue;
                }
                scope.blocklist[i].state = scope.blocklist[i].defaultstate;
            }
            if (RxCore_GUI_VectorBlocks != undefined) {
                RxCore_GUI_VectorBlocks.setVectorBlocks(scope.filterblocklist);
            }
        };
        this.turnBlockOnOff = function (index:any) {
            for (var i = 0; i < scope.filterblocklist.length; i++) {
                if (index == scope.filterblocklist[i].index) {
                    var bstate = (scope.filterblocklist[i].state == 1) ? 0 : 1;
                    scope.filterblocklist[i].state = bstate;
                }
            }
            for (i = 0; i < scope.blocklist.length; i++) {
                if (index == scope.blocklist[i].index) {
                    bstate = (scope.blocklist[i].state == 1) ? 0 : 1;
                    scope.blocklist[i].state = bstate;
                    //this.blocklist[i].state = (this.blocklist[i].state == 1) ? 0 : 1;
                    //(this.blocklist[i].state == 0) ? this.blocklist[i].state = 1 : this.blocklist[i].state = 0;
                    //(this.blocklist[i].state == 1) ? this.blocklist[i].state = 0 : this.blocklist[i].state = 1;
                    //this.blocklist[i].state = 1;
                    /*for (var j=0; j<this.pathlist.length;j++){
                     if(blockName == this.pathlist[j].blockname ){
                     this.pathlist[j].blockstate = 1;
                     }

                     }*/
                } /*else if (index == this.blocklist[i].index && this.blocklist[i].state == 1) {
                 this.blocklist[i].state = 0;

                 }*/
            }
        };
        // TODO:JS->TS:CHECK matbe can be replaced with the global equivalent
        function getrotpoint(width:any, height:any, x:any, y:any, anglerad:any) {
            var cosangle = Math.cos(anglerad);
            var sinangle = Math.sin(anglerad);
            var hw = x - width;
            var hh = y - height;
            var newx = (hw * cosangle) - (hh * sinangle);
            var newy = (hw * sinangle) + (hh * cosangle);
            var transpoint = { x: newx, y: newy };
            transpoint.x = width + transpoint.x;
            transpoint.y = height + transpoint.y;
            return transpoint;
        }
         // TODO:JS->TS:CHECK maybe can be replaced with the global equivalent
        function rotate_pointrad(point:any, originX:any, originY:any, radians:any) {
            //var new_x_point = old_x_point * cos(Angle) - old_y_point * sin(Angle);
            //var new_y_point = old_y_point * cos(Angle) + old_x_point * sin(Angle);
            var transpx = point.x - originX;
            var transpy = point.y - originY;
            return {
                x: (Math.cos(radians) * (transpx) - Math.sin(radians) * (transpy)) + originX,
                y: (Math.sin(radians) * (transpx) + Math.cos(radians) * (transpy)) + originY
            };
        }
        // TODO:JS->TS:CHECK maybe can be replaced with the global equivalent
        this.rotate_point = function (pointX:any, pointY:any, originX:any, originY:any, angle:any) {
            angle = angle * Math.PI / 180.0;
            return {
                x: Math.cos(angle) * (pointX - originX) - Math.sin(angle) * (pointY - originY) + originX,
                y: Math.sin(angle) * (pointX - originX) + Math.cos(angle) * (pointY - originY) + originY
            };
        };
        this.gettextpos = function (marerobj:any, scalefactor:any, offsetx:any, offsety:any) {
            //scope.x, scope.y, scope.h,layerstate,blockstate
            var x1scaled = Math.min(((marerobj.x1 - scope.x) * scalefactor), ((marerobj.x2 - scope.x) * scalefactor));
            var y1scaled = Math.min(((scope.h - marerobj.y1) * scalefactor), ((scope.h - marerobj.y2) * scalefactor));
            var x2scaled = Math.max(((marerobj.x1 - scope.x) * scalefactor), ((marerobj.x2 - scope.x) * scalefactor));
            var y2scaled = Math.max(((scope.h - marerobj.y1) * scalefactor), ((scope.h - marerobj.y2) * scalefactor));
            //marerobj.rot
            var centerx = x1scaled + ((x2scaled - x1scaled) / 2);
            var centery = y1scaled + ((y2scaled - y1scaled) / 2);
            var ulrotpoint = scope.rotate_point(x1scaled, y1scaled, centerx, centery, marerobj.rot);
            var lrrotpoint = scope.rotate_point(x2scaled, y2scaled, centerx, centery, marerobj.rot);
            x1scaled = Math.min(ulrotpoint.x, lrrotpoint.x);
            y1scaled = Math.min(ulrotpoint.y, lrrotpoint.y);
            x2scaled = Math.max(ulrotpoint.x, lrrotpoint.x);
            y2scaled = Math.max(ulrotpoint.y, lrrotpoint.y);
            return {
                top: y1scaled,
                left: x1scaled,
                width: Math.abs(x2scaled - x1scaled),
                height: Math.abs(y2scaled - y1scaled),
                fontsize: y2scaled - y1scaled
            };
            /*function textmarkerdiv(marerobj,scalefactor,offsetx,offsety,mediax,mediay,mediah){

             }*/
        };
        this.TextLayerClear = function (texlayerdata:any) {
            if (texlayerdata.textLayerDiv != undefined) {
                while (texlayerdata.textLayerDiv.firstChild) {
                    texlayerdata.textLayerDiv.removeChild(texlayerdata.textLayerDiv.firstChild);
                }
            }
            scope.textlayerset = false;
        };
        this.TextLayerBuilder = function (texlayerdata:any) {
            if (scope.textlayerset) {
                return;
            }
            //var div = texlayerdata.textLayerDiv;
            for (var i = 0; i < scope.textlist.length; i++) {
                var textdivpos = scope.gettextpos(scope.textlist[i], texlayerdata.scale, texlayerdata.dx, texlayerdata.dy);
                var textdiv = document.createElement('div');
                var localx = textdivpos.left;
                var localy = textdivpos.top;
                if (scope.textlist[i].rot != 0) {
                    //var radangle = scope.textlist[i].rot * (Math.PI/180);
                    //localx -= (textdivpos.height/2);
                    //localx = (textdivpos.left*Math.cos(radangle))-(textdivpos.top*Math.sin(radangle));
                    //localy = (textdivpos.left*Math.sin(radangle))+(textdivpos.top*Math.cos(radangle));
                }
                //<div data-canvas-width="132.41322" style="left: 191.37px; top: 228.609px; font-size: 14.94px; font-family: sans-serif; transform: scaleX(1.04262);">
                textdiv.style.left = localx + "px";
                textdiv.style.top = localy + "px";
                textdiv.style.width = textdivpos.width + "px";
                textdiv.style.height = textdivpos.height + "px";
                textdiv.style.fontFamily = "sans-serif";
                textdiv.style.fontSize = textdivpos.fontsize + "px";
                textdiv.style.transform = "scale(1.3)";
                textdiv.textContent = scope.textlist[i].text;
                if (scope.textlist[i].rot != 0) {
                    textdiv.style.transformOrigin = "50% 50%";
                    var normrot = -scope.textlist[i].rot;
                    var szrotation = "scale(1.3) rotate(" + normrot + "deg)";
                    textdiv.style.transform = szrotation;
                }
                else {
                    //textdiv.style.fontFamily = "sans-serif";
                    //textdiv.style.fontSize = textdivpos.fontsize + "px";
                    //textdiv.textContent = scope.textlist[i].text;
                }
                texlayerdata.textLayerDiv.appendChild(textdiv);
            }
            scope.textlayerset = true;
        };
        this.clearSearchAll = function () {
            for (var i = 0; i < scope.textlist.length; i++) {
                scope.textlist[i].draw = false;
            }
        };
        this.textSearch = function (text:any, start:any) {
            for (var i = start; i < scope.textlist.length; i++) {
                if (scope.textlist[i].text == text) {
                    return {
                        numtexts: scope.textlist.length,
                        position: i,
                        textobject: scope.textlist[i]
                    };
                }
            }
            //return last instance and check for match
            return {
                numtexts: scope.textlist.length,
                position: i,
                textobject: scope.textlist[i - 1]
            };
        };
        this.highlightText = function (indx:any) {
            scope.textlist[indx].draw = true;
        };
        this.getsnapPoint = function (x:any, y:any, scalefactor:any, offsetx:any, offsety:any) {
            var snappoint = {
                found: false,
                x: 0,
                y: 0
            };
            var rotatedpoint = { x: x, y: y };
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                rotatedpoint = mouse_rotated(x, y);
            }
            x = rotatedpoint.x;
            y = rotatedpoint.y;
            var snappoints = [];
            for (var i = 0; i < this.pathlist.length; i++) {
                //var localoffsetx = this.x * scalefactor;
                //var localoffsety = this.y * scalefactor;
                //this.layerlist[this.pathlist[i].layer].state == 1
                //this.blocklist[this.pathlist[i].blockname].state == 1
                var blayeron = layeron(i);
                var bblcckon = blockon(i);
                //var blayeron = true;
                //var bblcckon = true;
                /*if (this.layerlist.length > 0) {

                    if (this.pathlist[i].layer != -1 && this.layerlist[this.pathlist[i].layer] != undefined) {
                        blayeron = (this.layerlist[this.pathlist[i].layer].state == 1);
                    }
                }
                if (this.blocklist.length > 0) {
                    bblcckon = (this.blocklist[this.pathlist[i].blockname].state == 1);
                }*/
                if (blayeron && bblcckon) {
                    snappoint = this.pathlist[i].findsnapPoint(x, y, scalefactor, offsetx, offsety, this.x, this.y, this.h);
                    if (snappoint == undefined) {
                        snappoint = {
                            found: false,
                            x: 0,
                            y: 0
                        };
                    }
                    if (snappoint.found) {
                        snappoints.push(snappoint);
                    }
                }
            }
            if (snappoints.length > 0) {
                var a = x - snappoints[0].x;
                var b = y - snappoints[0].y;
                var curdist = Math.sqrt(a * a + b * b);
                var tempdist = Math.sqrt(a * a + b * b);
                var snapindx = 0;
                for (i = 0; i < snappoints.length; i++) {
                    if (snappoints[i].found) {
                        a = x - snappoints[i].x;
                        b = y - snappoints[i].y;
                        tempdist = Math.sqrt(a * a + b * b);
                        if (tempdist < curdist) {
                            curdist = tempdist;
                            snapindx = i;
                        }
                    }
                }
                snappoint = snappoints[snapindx];
                /*if(DocObj.pages[DocObj.currentpage].drotation != 0){
                    rotatedpoint = mouse_rotated(snappoint.x,snappoint.y);
                    snappoint.x = rotatedpoint.x;
                    snappoint.y = rotatedpoint.y;
                }*/
            }
            else {
                snappoint = {
                    found: false,
                    x: 0,
                    y: 0
                };
            }
            return snappoint;
        };
        this.offscreenscale = function (scalefactor:any) {
            if (this.backgroundrender) {
                return this.offscreen.width / (this.width * scalefactor);
            }
            else {
                return 1;
            }
        };
        this.drawallmagnifycmpre = function (context:any, scalefactor:any, offsetx:any, offsety:any, comparecolor:any, isbackground:any) {
            //this.isbackground = isbackground;
            this.docompare = true;
            this.comparecolor = comparecolor;
            //console.log(isbackground);
            //console.log(comparecolor);
            //backgroundColor = 'white';
            if (isbackground) {
                context.globalCompositeOperation = 'source-over';
                context.fillStyle = 'white';
                //context.fillRect(offsetx, offsety, this.width * scalefactor, this.height * scalefactor);
                context.fillRect(0, 0, Globals.magcanvas.width, Globals.magcanvas.height);
            }
            else {
                context.globalCompositeOperation = 'darken';
            }
            scope.drawallmagnify(context, scalefactor, offsetx, offsety);
        };
        this.drawallmagnify = function (context:any, scalefactor:any, offsetx:any, offsety:any) {
            var layerstate = 1;
            var blockstate = 1;
            for (var pindx = 0; pindx < scope.pathlist.length; pindx++) {
                layerstate = layeron(i) ? 1 : 0;
                blockstate = blockon(i) ? 1 : 0;
                /*if (scope.layerlist.length > 0) {
                    if (scope.pathlist[pindx].layer != -1 && scope.layerlist[scope.pathlist[pindx].layer] != undefined) {
                        layerstate = scope.layerlist[scope.pathlist[pindx].layer].state;
                    }

                }
                if (scope.blocklist.length > 0) {
                    blockstate = scope.blocklist[scope.pathlist[pindx].blockname].state;
                }*/
                if (scope.docompare) {
                    if (scope.dooverlay) {
                        scope.pathlist[pindx].drawemeoverlay(context, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h, layerstate, blockstate);
                    }
                    else {
                        scope.pathlist[pindx].drawemecompare(context, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h, scope.comparecolor, layerstate, blockstate);
                    }
                }
                else {
                    if (scope.pathlist[pindx]) {
                        if (scope.pathlist[pindx].type == "line") {
                            drawvectorline(scope.pathlist[pindx], context, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h, layerstate, blockstate, false);
                        }
                        else {
                            scope.pathlist[pindx].drawme(context, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h, layerstate, blockstate, false);
                        }
                    }
                }
            }
        };
        /*this.drawallcmpre = function (context, scalefactor, offsetx, offsety, refresh, comparecolor, isbackground) {

            this.isbackground = isbackground;
            this.docompare = true;
            this.comparecolor = comparecolor;
            //backgroundColor = 'white';
            if (this.isbackground) {
                context.globalCompositeOperation = 'source-over';
                context.fillStyle = 'white';
                context.fillRect(offsetx, offsety, this.width * scalefactor, this.height * scalefactor);

            } else {
                context.globalCompositeOperation = 'darken';
            }


            this.drawall(context, scalefactor, offsetx, offsety, refresh,false);



        };*/
        this.drawallcmpre = function (context:any, scalefactor:any, offsetx:any, offsety:any, refresh:any, comparecolor:any, isbackground:any, mode:any) {
            this.isbackground = isbackground;
            this.dooverlay = (mode == 1);
            this.docompare = true;
            this.comparecolor = comparecolor;
            //backgroundColor = 'white';
            if (this.isbackground) {
                context.globalCompositeOperation = 'source-over';
                context.fillStyle = 'white';
                context.fillRect(offsetx, offsety, this.width * scalefactor, this.height * scalefactor);
            }
            else {
                context.globalCompositeOperation = 'darken';
            }
            this.drawallnew(context, scalefactor, offsetx, offsety, refresh, false);
        };
        this.drawallnew = function (context:any, scalefactor:any, offsetx:any, offsety:any, refresh:any, drawprint:any) {
            var vectorstartrender = new Date().getTime();
            var layerstate = 1;
            var blockstate = 1;
            var curdrawmode = 13;
            if ((scope.width * scalefactor) * (scope.height * scalefactor) > Globals.nMaximageArea) {
                scope.backgroundrender = false;
                if (!scope.docompare) {
                    if (drawprint) {
                        context.fillStyle = 'white';
                    }
                    else {
                        context.fillStyle = Globals.DocObj.backgroundColor;
                    }
                    context.fillRect(offsetx, offsety, scope.width * scalefactor, scope.height * scalefactor);
                }
                for (var pindx = 0; pindx < scope.pathlist.length; pindx++) {
                    layerstate = layeron(pindx) ? 1 : 0;
                    blockstate = blockon(pindx) ? 1 : 0;
                    if (scope.docompare) {
                        if (scope.dooverlay) {
                            scope.pathlist[pindx].drawemeoverlay(context, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h, layerstate, blockstate);
                        }
                        else {
                            scope.pathlist[pindx].drawemecompare(context, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h, scope.comparecolor, layerstate, blockstate);
                        }
                    }
                    else {
                        if (scope.pathlist[pindx]) {
                            /*if(scope.pathlist[pindx].drawmode != curdrawmode){
                                switch(scope.pathlist[pindx].drawmode){
                                    case 13 :
                                        context.globalCompositeOperation = 'source-over';
                                        break;
                                    case 9 :
                                        context.globalCompositeOperation = 'darken';
                                        break;
                                    case 7 :
                                        context.globalCompositeOperation = 'darken';
                                        break;
                                    default :
                                        context.globalCompositeOperation = 'source-over';
                                        break;
                                }
                                curdrawmode = scope.pathlist[pindx].drawmode;
                            }*/
                            if (scope.pathlist[pindx].type == "line") {
                                drawvectorline(scope.pathlist[pindx], context, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h, layerstate, blockstate, drawprint);
                            }
                            else {
                                scope.pathlist[pindx].drawme(context, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h, layerstate, blockstate, drawprint);
                            }
                        }
                    }
                }
            }
            else {
                scope.backgroundrender = true;
                //context.drawImage(scope.offscreen, offsetx, offsety, scope.width * scalefactor, scope.height * scalefactor);
                //context.drawImage(scope.offscreen, offsetx, offsety, scope.width * scalefactor, scope.height * scalefactor);
                if (refresh) {
                    scope.offscreen.width = scope.width * scalefactor;
                    scope.offscreen.height = scope.height * scalefactor;
                    //offscreenctx = scope.offscreen.getContext('2d');
                    setSmoothingEnabledEx(true, scope.offscreenctx);
                    if (!scope.docompare) {
                        if (drawprint) {
                            scope.offscreenctx.fillStyle = 'white';
                        }
                        else {
                            scope.offscreenctx.fillStyle = Globals.DocObj.backgroundColor;
                        }
                        scope.offscreenctx.fillRect(0, 0, scope.width * scalefactor, scope.height * scalefactor);
                    }
                    //offscreenctx.globalCompositeOperation = 'source-over';
                    var pathcount = 0;
                    while (pathcount < scope.pathlist.length) {
                        layerstate = layeron(pathcount) ? 1 : 0;
                        blockstate = blockon(pathcount) ? 1 : 0;
                        if (scope.docompare) {
                            /*if(scope.pathlist[pathcount].type == "line"){
                             drawvectorline(scope.pathlist[pathcount],scope.offscreenctx, scalefactor, 0, 0, scope.x, scope.y, scope.h,layerstate,blockstate,drawprint);
                             }else{

                             }*/
                            if (scope.dooverlay) {
                                scope.pathlist[pathcount].drawemeoverlay(scope.offscreenctx, scalefactor, 0, 0, scope.x, scope.y, scope.h, layerstate, blockstate);
                            }
                            else {
                                scope.pathlist[pathcount].drawemecompare(scope.offscreenctx, scalefactor, 0, 0, scope.x, scope.y, scope.h, scope.comparecolor, layerstate, blockstate);
                            }
                        }
                        else {
                            /*if(scope.pathlist[pathcount].drawmode != curdrawmode){
                                switch(scope.pathlist[pathcount].drawmode){
                                    case 13 :
                                        scope.offscreenctx.globalCompositeOperation = 'source-over';
                                        break;
                                    case 9 :
                                        scope.offscreenctx.globalCompositeOperation = 'darken';
                                        break;
                                    case 7 :
                                        scope.offscreenctx.globalCompositeOperation = 'darken';
                                        break;
                                    default :
                                        scope.offscreenctx.globalCompositeOperation = 'source-over';
                                        break;
                                }
                                curdrawmode = scope.pathlist[pathcount].drawmode;
                            }*/
                            if (scope.pathlist[pathcount].type == "line") {
                                drawvectorline(scope.pathlist[pathcount], scope.offscreenctx, scalefactor, 0, 0, scope.x, scope.y, scope.h, layerstate, blockstate, drawprint);
                            }
                            else {
                                scope.pathlist[pathcount].drawme(scope.offscreenctx, scalefactor, 0, 0, scope.x, scope.y, scope.h, layerstate, blockstate, drawprint);
                            }
                        }
                        pathcount++;
                    }
                }
                context.drawImage(this.offscreen, offsetx, offsety, this.width * scalefactor, this.height * scalefactor);
            }
            scope.firstdraw = true;
            if (scope.docompare) {
                scope.firstdrawcompare = true;
            }
            var vectorendrender = new Date().getTime();
            scope.vectorpagetime = (vectorendrender - vectorstartrender);
        };
        this.drawSelected = function (context:any, scalefactor:any, offsetx:any, offsety:any) {
            if (scope.selectedobject == undefined) {
                return;
            }
            var layerstate = 1;
            var blockstate = 1;
            var curdrawmode = 13;
            if ((scope.width * scalefactor) * (scope.height * scalefactor) > Globals.nMaximageArea) {
                scope.backgroundrender = false;
                if (scope.layerlist.length > 0) {
                    if (scope.selectedobject.layer != -1 && scope.layerlist[scope.selectedobject.layer] != undefined) {
                        layerstate = scope.layerlist[scope.selectedobject.layer].state;
                    }
                }
                if (scope.blocklist.length > 0) {
                    blockstate = scope.blocklist[scope.selectedobject.blockname].state;
                    /*if (scope.blocklist[scope.pathlist[pindx].blockname].state == 0) {
                     continue;
                     }*/
                }
                if (scope.selectedobject) {
                    scope.selectedobject.drawme(context, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h, layerstate, blockstate);
                }
            }
            else {
                scope.backgroundrender = true;
                //context.drawImage(scope.offscreen, offsetx, offsety, scope.width * scalefactor, scope.height * scalefactor);
                //context.drawImage(scope.offscreen, offsetx, offsety, scope.width * scalefactor, scope.height * scalefactor);
                if (scope.layerlist.length > 0) {
                    if (scope.selectedobject.layer != -1 && scope.layerlist[scope.selectedobject.layer] != undefined) {
                        layerstate = scope.layerlist[scope.selectedobject.layer].state;
                    }
                }
                if (scope.blocklist.length > 0) {
                    blockstate = scope.blocklist[scope.selectedobject.blockname].state;
                }
                const drawprint:any = undefined as any; // TODO:JS->TS:INFO drawprint does not appear to be defined (even in the outside scope).
                if (scope.selectedobject.type == "line") {
                    drawvectorline(scope.selectedobject, scope.offscreenctx, scalefactor, 0, 0, scope.x, scope.y, scope.h, layerstate, blockstate, drawprint);
                }
                else {
                    scope.selectedobject.drawme(scope.offscreenctx, scalefactor, 0, 0, scope.x, scope.y, scope.h, layerstate, blockstate, drawprint);
                }
                /*if (refresh) {
                    scope.offscreen.width = scope.width * scalefactor;
                    scope.offscreen.height = scope.height * scalefactor;
                    setSmoothingEnabledEx(true,scope.offscreenctx);

                    if (!scope.docompare) {
                        scope.offscreenctx.fillStyle = DocObj.backgroundColor;
                        scope.offscreenctx.fillRect(0, 0, scope.width * scalefactor, scope.height * scalefactor);

                    }

                }*/
                context.drawImage(scope.offscreen, offsetx, offsety, this.width * scalefactor, this.height * scalefactor);
            }
        };
        this.drawall = function (context:any, scalefactor:any, offsetx:any, offsety:any, refresh:any, drawprint:any) {
            var vectorstartrender = new Date().getTime();
            var layerstate = 1;
            var blockstate = 1;
            //context.fillStyle = backgroundColor;
            //context.fillRect(offsetx, offsety, this.width*scalefactor, scope.height*scalefactor);
            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
                if ((scope.width * scalefactor) * (scope.height * scalefactor) > 5000000) {
                    scope.backgroundrender = false;
                    if (!scope.docompare) {
                        if (drawprint) {
                            context.fillStyle = 'white';
                        }
                        else {
                            context.fillStyle = Globals.DocObj.backgroundColor;
                        }
                        context.fillRect(offsetx, offsety, scope.width * scalefactor, scope.height * scalefactor);
                    }
                    for (var pindx = 0; pindx < scope.pathlist.length; pindx++) {
                        if (scope.layerlist.length > 0) {
                            if (scope.pathlist[pindx].layer != -1 && scope.layerlist[scope.pathlist[pindx].layer] != undefined) {
                                layerstate = scope.layerlist[scope.pathlist[pindx].layer].state;
                                /*if (scope.layerlist[scope.pathlist[pindx].layer].state == 0) {
                                    continue;
                                }*/
                            }
                        }
                        if (scope.blocklist.length > 0) {
                            blockstate = scope.blocklist[scope.pathlist[pindx].blockname].state;
                            /*if (scope.blocklist[scope.pathlist[pindx].blockname].state == 0) {
                                continue;
                            }*/
                        }
                        if (scope.docompare) {
                            if (scope.dooverlay) {
                                scope.pathlist[pindx].drawemeoverlay(context, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h, layerstate, blockstate);
                            }
                            else {
                                scope.pathlist[pindx].drawemecompare(context, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h, scope.comparecolor, layerstate, blockstate);
                            }
                        }
                        else {
                            if (scope.pathlist[pindx]) {
                                scope.pathlist[pindx].drawme(context, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h, layerstate, blockstate, drawprint);
                            }
                        }
                    }
                    /*for (var tindx = 0; tindx < scope.textlist.length; tindx++) {
                        if(scope.textlist[tindx].draw){
                            drawtextmarker(scope.textlist[tindx],context, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h,layerstate,blockstate);
                        }
                    }*/
                }
                else {
                    scope.backgroundrender = true;
                    if (refresh) {
                        scope.offscreen.width = scope.width * scalefactor;
                        scope.offscreen.height = scope.height * scalefactor;
                        //var offscreenctx = scope.offscreen.getContext('2d');
                        //setSmoothingEnabledEx(true,scope.offscreenctx);
                        //offscreenctx.imageSmoothingEnabled = false;
                        //offscreenctx.mozImageSmoothingEnabled = false;
                        //offscreenctx.webkitImageSmoothingEnabled = false;
                        //offscreenctx.msImageSmoothingEnabled = false;
                        if (!scope.docompare) {
                            if (drawprint) {
                                scope.offscreenctx.fillStyle = 'white';
                            }
                            else {
                                scope.offscreenctx.fillStyle = Globals.DocObj.backgroundColor;
                            }
                            scope.offscreenctx.fillRect(0, 0, scope.width * scalefactor, scope.height * scalefactor);
                        }
                        //offscreenctx.globalCompositeOperation = 'source-over';
                        for (var i = 0; i < scope.pathlist.length; i++) {
                            //var localoffsetx = scope.y * scalefactor;
                            //var localoffsety = scope.x * scalefactor;
                            if (scope.layerlist.length > 0) {
                                if (scope.pathlist[i].layer != -1 && scope.layerlist[scope.pathlist[i].layer] != undefined) {
                                    layerstate = scope.layerlist[scope.pathlist[i].layer].state;
                                    /*if (scope.layerlist[scope.pathlist[i].layer].state == 0) {
                                        continue;
                                    }*/
                                }
                            }
                            if (scope.blocklist.length > 0) {
                                blockstate = scope.blocklist[scope.pathlist[i].blockname].state;
                                /*if (scope.blocklist[scope.pathlist[i].blockname].state == 0) {
                                    continue;
                                }*/
                            }
                            if (scope.docompare) {
                                if (scope.dooverlay) {
                                    scope.pathlist[i].drawemeoverlay(scope.offscreenctx, scalefactor, 0, 0, scope.x, scope.y, scope.h, layerstate, blockstate);
                                }
                                else {
                                    scope.pathlist[i].drawemecompare(scope.offscreenctx, scalefactor, 0, 0, scope.x, scope.y, scope.h, scope.comparecolor, layerstate, blockstate);
                                }
                            }
                            else {
                                if (scope.pathlist[i]) {
                                    scope.pathlist[i].drawme(scope.offscreenctx, scalefactor, 0, 0, scope.x, scope.y, scope.h, layerstate, blockstate, drawprint);
                                }
                            }
                        }
                        /*for (tindx = 0; tindx < scope.textlist.length; tindx++) {
                            if(scope.textlist[tindx].draw){
                                drawtextmarker(scope.textlist[tindx],scope.offscreenctx, scalefactor, 0, 0, scope.x, scope.y, scope.h,layerstate,blockstate);
                            }
                        }*/
                    }
                    context.drawImage(scope.offscreen, offsetx, offsety, scope.width * scalefactor, scope.height * scalefactor);
                }
            }
            else {
                if ((scope.width * scalefactor) * (scope.height * scalefactor) > 75000000) {
                    scope.backgroundrender = false;
                    if (!scope.docompare) {
                        if (drawprint) {
                            context.fillStyle = 'white';
                        }
                        else {
                            context.fillStyle = Globals.DocObj.backgroundColor;
                        }
                        context.fillRect(offsetx, offsety, scope.width * scalefactor, scope.height * scalefactor);
                    }
                    for (pindx = 0; pindx < scope.pathlist.length; pindx++) {
                        if (scope.layerlist.length > 0) {
                            if (scope.pathlist[pindx].layer != -1 && scope.layerlist[scope.pathlist[pindx].layer] != undefined) {
                                layerstate = scope.layerlist[scope.pathlist[pindx].layer].state;
                                /*if (scope.layerlist[scope.pathlist[pindx].layer].state == 0) {
                                    continue;
                                }*/
                            }
                        }
                        if (scope.blocklist.length > 0) {
                            blockstate = scope.blocklist[scope.pathlist[pindx].blockname].state;
                            /*if (scope.blocklist[scope.pathlist[pindx].blockname].state == 0) {
                                continue;
                            }*/
                        }
                        if (scope.docompare) {
                            if (scope.dooverlay) {
                                scope.pathlist[pindx].drawemeoverlay(context, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h, layerstate, blockstate);
                            }
                            else {
                                scope.pathlist[pindx].drawemecompare(context, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h, scope.comparecolor, layerstate, blockstate);
                            }
                        }
                        else {
                            if (scope.pathlist[pindx]) {
                                if (scope.pathlist[pindx].type == "line") {
                                    drawvectorline(scope.pathlist[pindx], context, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h, layerstate, blockstate, drawprint);
                                }
                                else {
                                    scope.pathlist[pindx].drawme(context, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h, layerstate, blockstate, drawprint);
                                }
                            }
                        }
                    }
                    /*for (tindx = 0; tindx < scope.textlist.length; tindx++) {
                        if(scope.textlist[tindx].draw){
                            drawtextmarker(scope.textlist[tindx],context, scalefactor, offsetx, offsety, scope.x, scope.y, scope.h,layerstate,blockstate);
                        }
                    }*/
                }
                else {
                    scope.backgroundrender = true;
                    //context.drawImage(scope.offscreen, offsetx, offsety, scope.width * scalefactor, scope.height * scalefactor);
                    //context.drawImage(scope.offscreen, offsetx, offsety, scope.width * scalefactor, scope.height * scalefactor);
                    if (refresh) {
                        scope.offscreen.width = scope.width * scalefactor;
                        scope.offscreen.height = scope.height * scalefactor;
                        //offscreenctx = scope.offscreen.getContext('2d');
                        setSmoothingEnabledEx(true, scope.offscreenctx);
                        if (!scope.docompare) {
                            if (drawprint) {
                                scope.offscreenctx.fillStyle = 'white';
                            }
                            else {
                                scope.offscreenctx.fillStyle = Globals.DocObj.backgroundColor;
                            }
                            scope.offscreenctx.fillRect(0, 0, scope.width * scalefactor, scope.height * scalefactor);
                        }
                        //offscreenctx.globalCompositeOperation = 'source-over';
                        var pathcount = 0;
                        while (pathcount < scope.pathlist.length) {
                            if (scope.layerlist.length > 0) {
                                if (scope.pathlist[pathcount].layer != -1 && scope.layerlist[scope.pathlist[pathcount].layer] != undefined) {
                                    layerstate = scope.layerlist[scope.pathlist[pathcount].layer].state;
                                    /*if (scope.layerlist[scope.pathlist[pathcount].layer].state == 0) {
                                        bdrawlayerblock = false;
                                        //pathcount++;
                                        //continue;

                                    }*/
                                }
                            }
                            if (scope.blocklist.length > 0) {
                                blockstate = scope.blocklist[scope.pathlist[pathcount].blockname].state;
                                /*if (scope.blocklist[scope.pathlist[pathcount].blockname].state == 0) {
                                    bdrawlayerblock = false;
                                    //pathcount++;
                                    //continue;
                                }*/
                            }
                            //scope.pathlist[i].drawme(offscreenctx,scalefactor,offsetx,offsety,scope.x, scope.y,scope.h);
                            if (scope.docompare) {
                                if (scope.dooverlay) {
                                    scope.pathlist[pathcount].drawemeoverlay(scope.offscreenctx, scalefactor, 0, 0, scope.x, scope.y, scope.h, layerstate, blockstate);
                                }
                                else {
                                    scope.pathlist[pathcount].drawemecompare(scope.offscreenctx, scalefactor, 0, 0, scope.x, scope.y, scope.h, scope.comparecolor, layerstate, blockstate);
                                }
                            }
                            else {
                                if (scope.pathlist[pathcount].type == "line") {
                                    drawvectorline(scope.pathlist[pathcount], scope.offscreenctx, scalefactor, 0, 0, scope.x, scope.y, scope.h, layerstate, blockstate, drawprint);
                                }
                                else {
                                    scope.pathlist[pathcount].drawme(scope.offscreenctx, scalefactor, 0, 0, scope.x, scope.y, scope.h, layerstate, blockstate, drawprint);
                                }
                                /*if(scope.pathlist[pathcount]){

                                    scope.pathlist[pathcount].drawme(scope.offscreenctx, scalefactor, 0, 0, scope.x, scope.y, scope.h,layerstate,blockstate);
                                }*/
                                /*if(scope.firstdraw){
                                 setTimeout(scope.pathlist[pathcount].drawme(offscreenctx, scalefactor, 0, 0, scope.x, scope.y, scope.h), 0);
                                 }else{
                                 scope.pathlist[pathcount].drawme(offscreenctx, scalefactor, 0, 0, scope.x, scope.y, scope.h);
                                 }*/
                                //
                            }
                            pathcount++;
                        }
                        /*for (tindx = 0; tindx < scope.textlist.length; tindx++) {
                            if(scope.textlist[tindx].draw){
                                drawtextmarker(scope.textlist[tindx],scope.offscreenctx, scalefactor, 0, 0, scope.x, scope.y, scope.h,layerstate,blockstate);
                            }
                        }*/
                    }
                    context.drawImage(this.offscreen, offsetx, offsety, this.width * scalefactor, this.height * scalefactor);
                }
            }
            scope.firstdraw = true;
            if (scope.docompare) {
                scope.firstdrawcompare = true;
            }
            var vectorendrender = new Date().getTime();
            scope.vectorpagetime = (vectorendrender - vectorstartrender);
        };
        this.Close = function () {
            scope.layerlist = [];
            scope.blocklist = [];
            scope.filterblocklist = [];
            /*while (scope.layerlist.length != 0) {
                scope.layerlist.pop();
            }

            while (scope.blocklist.length != 0) {
                scope.blocklist.pop();
            }*/
            while (this.pathlist.length != 0) {
                this.pathlist[this.pathlist.length - 1].Close();
                this.pathlist.pop();
            }
            scope.pathlist = [];
        };
        parse2Dloop();
        function yieldingLoop(state:any, chunksize:any, callback:any, finished:any) {
            (function chunk() {
                var i = 0;
                //var end = Math.min(i + chunksize, count);
                var end = (i < chunksize);
                for (; i < chunksize; ++i) {
                    callback.call(null, state);
                    if (state.objectid == 32768) {
                        break;
                    }
                }
                if (state.objectid != 32768) {
                    setTimeout(chunk, 0);
                }
                else {
                    //console.log(state.objectid);
                    finished.call(null);
                }
            })();
        }
    }
}
