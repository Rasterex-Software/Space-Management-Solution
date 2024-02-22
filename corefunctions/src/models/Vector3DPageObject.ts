// TODO:JS->TS:INFO continue conversion
import * as THREE from 'three';

import {
    Globals,
    Part3DObject,
    Part3DObjectMulti,
    Block3DObject,
    RxCore_GUI_Download,
    RxCore_GUI_Read3DComplete,
    RxCore_GUI_3DParts
} from '../internal';
export class Vector3DPageObject {
    countparts: number;
    binaryreadcomplete: boolean;
    selectedpart: number;
    version: number;
    clippingOn: boolean;
    x: number;
    y: number;
    z: number;
    w: number;
    h: number;
    d: number;
    unit: number;
    orignalscale: number;
    scale: number;
    scene: any; // THREE.Scene;
    explodefactor: number;
    pxplodefactor: number;
    partlist: any[];
    blocklist: any[];
    originalpos: any; // THREE.Vector3;
    globalPlaneX: any; // THREE.Plane;
    globalPlaneY: any; // THREE.Plane;
    globalPlaneZ: any; // THREE.Plane;
    globalPlanes: any[];
    xPlaneconst: number;
    xPlaneEnd: any;
    xPlaneStart: number;
    yPlaneconst: number;
    yPlaneEnd: any;
    yPlaneStart: number;
    zPlaneconst: number;
    zPlaneEnd: any;
    zPlaneStart: number;
    blockreadComplete:any;
    updateblocklist: any;
    blockadded: any; // () => void;
    addblocks: any; // (pagexmldata: any) => void;
    searchAttribute: any; // (attribval: any) => number;
    addpartbinary: any; // (bstream: any, lastpart: any) => void;
    addpart: any; // (partxml: any, lastpart: any) => void;
    clipping: any; // (plane: any, constant: any, onoff: any) => void;
    doexplode: any; // boolean;
    explode: any; // (distance: any) => void;
    setTransparency: any; // (value: any) => void;
    resetTransparency: any; // () => void;
    setSelectedPart: any; // (name: any) => void;
    getSelectedPart: any; // () => any;
    Close: any; // () => void;
    constructor(pagexmldata:any, binary:any, parent:any) {
        var vector3Dref = this;
        var breadbinaryready = false;
        var pageobject = parent;
        var dv = new DataView(pagexmldata);
        var header = String.fromCharCode(dv.getUint8(0));
        var i = 1;
        while (i <= 15) {
            header += String.fromCharCode(dv.getUint8(i));
            i++;
        }
        this.countparts = 0;
        this.binaryreadcomplete = false;
        this.selectedpart = -1;
        this.version = parseInt(''+dv.getInt32(16, true)); // JS->TS:INFO added ''+ (parse... expects string)
        this.clippingOn = false;
        this.x = parseFloat(''+dv.getFloat32(24, true));
        this.y = parseFloat(''+dv.getFloat32(28, true));
        this.z = parseFloat(''+dv.getFloat32(32, true));
        this.w = parseFloat(''+dv.getFloat32(36, true)) - this.x;
        this.h = parseFloat(''+dv.getFloat32(40, true)) - this.y;
        this.d = parseFloat(''+dv.getFloat32(44, true)) - this.z;
        if (this.w < 1000) {
            this.unit = 1;
            //meter
        }
        else {
            this.unit = 0;
            //mm
        }
        this.orignalscale = parseFloat(''+dv.getFloat32(48, true));
        var headeroffset = 52;
        dv = null as any as DataView; // JS->TS:INFO
        var wscale = Globals.renderer.domElement.width / this.w;
        var hscale = Globals.renderer.domElement.height / this.h;
        this.scale = Math.min(wscale, hscale);
        parent.clock = new THREE.Clock();
        //this.scene = new JSC3D.Scene();
        this.scene = new THREE.Scene();
        var szShortformat = Globals.DocObj.Format.substring(0, 3);
        if (szShortformat == 'IFC') {
            this.scene.up.set(0, 0, 1);
        }
        else {
            this.scene.up.set(0, 1, 0);
        }
        //this.scene.up.set(0,0,1);
        //this.scene.rotation.set(0,1.57,0,'XYZ');
        this.explodefactor = 0;
        this.pxplodefactor = 0;
        this.partlist = [];
        this.blocklist = [];
        var curx = this.scene.position.x;
        var cury = this.scene.position.y;
        var curz = this.scene.position.z;
        curx += -(this.w / 2) * this.scale;
        cury += -(this.h / 2) * this.scale;
        curz += -(this.d / 2) * this.scale;
        this.scene.position.set(curx, cury, curz);
        this.originalpos = new THREE.Vector3();
        this.originalpos = this.scene.position.clone();
        this.scene.updateMatrix();
        this.globalPlaneX = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
        this.globalPlaneY = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        this.globalPlaneZ = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);
        this.globalPlanes = [this.globalPlaneX, this.globalPlaneY, this.globalPlaneZ],
            Globals.Empty = Object.freeze([]);
        this.xPlaneconst = this.w * this.scale;
        var safeadjust = this.xPlaneconst / 20; //10 percent additional space for clipping
        this.xPlaneconst += safeadjust;
        this.xPlaneEnd = curx;
        this.xPlaneStart = this.xPlaneconst - curx;
        this.xPlaneEnd -= safeadjust / 2;
        this.yPlaneconst = this.h * this.scale;
        safeadjust = this.yPlaneconst / 20; //10 percent additional space for clipping
        this.yPlaneconst += safeadjust;
        this.yPlaneEnd = cury;
        this.yPlaneStart = this.yPlaneconst - cury;
        this.yPlaneEnd -= safeadjust / 2;
        this.zPlaneconst = this.d * this.scale;
        safeadjust = this.zPlaneconst / 20; //10 percent additional space for clipping
        this.zPlaneconst += safeadjust;
        this.zPlaneEnd = curz;
        this.zPlaneStart = this.zPlaneconst - curz;
        this.zPlaneEnd -= safeadjust / 2;
        this.globalPlaneX.constant = this.xPlaneStart;
        this.globalPlaneY.constant = this.yPlaneStart;
        this.globalPlaneZ.constant = this.zPlaneStart;
        //var pointLight = new THREE.PointLight(0xFFFFFF);
        //pointLight.intensity = 0.8;
        //this.scene.add(pointLight);
        var directionalLight_1 = new THREE.DirectionalLight(0xffffff, 1.2);
        //directionalLight.intensity = 0.5;
        directionalLight_1.position.set(-500, -500, 500);
        //var helper_1 = new THREE.DirectionalLightHelper(directionalLight_1, 1);
        this.scene.add(directionalLight_1);
        //this.scene.add( helper_1 );
        var directionalLight_2 = new THREE.DirectionalLight(0xffffff, 1);
        //directionalLight.intensity = 0.3;
        directionalLight_2.position.set(1000, 1000, 1000);
        //var helper_2 = new THREE.DirectionalLightHelper(directionalLight_2, 1);
        this.scene.add(directionalLight_2);
        //this.scene.add( helper_2 );
        var directionalLight_3 = new THREE.DirectionalLight(0xffffff, 0.3);
        directionalLight_3.position.set(0, 0, -1000);
        this.scene.add(directionalLight_3);
        parent.camera = new THREE.PerspectiveCamera(45, Globals.canvasowidth / Globals.canvasoheight, 1, 10000);
        var format = Globals.DocObj.Format.substring(0, 3);
        if (format == 'IFC') {
            var camerax = (vector3Dref.w / 2) * vector3Dref.scale;
            var cameray = -(vector3Dref.h) * vector3Dref.scale;
            var cameraz = (vector3Dref.d / 2) * vector3Dref.scale;
            var camerayorig = cameray;
            camerax = 0;
            cameray *= 2;
            cameraz = 0;
            parent.camera.up.set(0, 0, 1);
            //parent.camera.rotation.set(90 * Math.PI / 180, 0, 0);
        }
        else {
            camerax = (vector3Dref.w / 2) * vector3Dref.scale;
            cameray = (vector3Dref.h / 2) * vector3Dref.scale;
            cameraz = (vector3Dref.d) * vector3Dref.scale;
            camerax = 0;
            cameray = 0;
            cameraz *= 2;
            parent.camera.up.set(0, 1, 0);
            //parent.camera.rotation.set(0, 90 * Math.PI / 180, 0);
        }
        parent.camera.position.set(camerax, cameray, cameraz);
        parent.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.scene.updateMatrix();
        Globals.bAnimateready = false;
        //    this.scene = new JSC3D.Scene();
        //    this.partlist = [];
        var maindv = new DataView(pagexmldata, headeroffset);
        var dvpos = 0;
        var objid = parseInt(''+maindv.getInt32(dvpos, true));  // JS->TS:INFO added ''+ (parse... expects string)
        var newblock = false;
        var blockid = -1;
        var bimtype = -1;
        var facecolor = 0;
        var blockcounter = 0;
        var tottriangles = 0;
        if (pageobject.has3Dnav) {
            pageobject.load3dnavigator();
        }
        else {
            breadbinaryready = true;
        }
        //parse3Dloop();
        function parse3Dloop() {
            var readstate = {
                objectid: objid,
                blockpart: blockid,
                bnewblock: newblock,
                maindvpos: dvpos,
                facecolor: 0
            };
            yieldingLoop(readstate, 200, function () {
                readstate = parse3Dbinary(readstate);
            }, function () {
                readbinarycomplete();
            });
            (function timer() {
                if (maindv)
                    if (readstate.objectid != 32768) {
                        setTimeout(timer, 10);
                    }
            })();
        }
        function parse3Dbinary(readstate:any) {
            switch (readstate.objectid) {
                case 9:
                    //trianglelist
                    readstate.maindvpos += 4;
                    var numtriangles = maindv.getInt32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var endrange = 9 * 4 * numtriangles;
                    var dvtriangles = new DataView(pagexmldata, headeroffset + readstate.maindvpos, endrange);
                    tottriangles += numtriangles;
                    /*if (blockcounter > 20) {
                     blockcounter = 0;
                     vector3Dref.scene.updateMatrix();
                     renderer.render(vector3Dref.scene, camera);
                     }*/
                    if (vector3Dref.partlist[readstate.blockpart] != undefined) {
                        vector3Dref.partlist[readstate.blockpart].addpart(dvtriangles, numtriangles, readstate.blockpart, readstate.facecolor, readstate.bnewblock);
                        vector3Dref.countparts++;
                    }
                    //console.log(tottriangles);
                    /*vector3Dref.partlist[blockpart].promise.then(function(){
                     vector3Dref.scene.updateMatrix();
                     renderer.render(vector3Dref.scene, camera);

                     });*/
                    /*this.parse(maindv).then(function() {
                     //console.log("Success!", response);
                     maindv = null;
                     //console.log('read finished');
                     bAnimateready = true;
                     if (RxCore_GUI_Download != undefined) {
                     RxCore_GUI_Download.setDownload("hide");
                     }


                     }, function(id, position) {
                     //console.log(objid);
                     //console.log(maindvpos);

                     console.error("Failed!", id, position);
                     });*/
                    //getbpartdiredct(dvtriangles, numtriangles, blockpart, facecolor, bnewblock);
                    /*if(numtriangles < 1000 && tottriangles < 2000000 ){
                     getbpartdiredct(dvtriangles, numtriangles, blockpart, facecolor, bnewblock);
                     }else{
                     getbpartdelay(dvtriangles, numtriangles, blockpart, facecolor, 100);
                     }*/
                    //ncolor  = decimalToHex(facecolor);
                    //vector3Dref.partlist[blockpart].createmesh(dvtriangles,numtriangles,ncolor);
                    readstate.maindvpos += endrange;
                    readstate.bnewblock = false;
                    //maindvpos += 4;
                    readstate.objectid = parseInt(''+maindv.getInt32(readstate.maindvpos, true));  // JS->TS:INFO added ''+ (parse... expects string)
                    break;
                case 10:
                    //Attribute
                    readstate.maindvpos += 4;
                    var nAttrbutenl = parseInt(''+maindv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parse... expects string)
                    readstate.maindvpos += 4;
                    var battrncount = readstate.maindvpos;
                    var szatrrname = "";
                    while (battrncount < readstate.maindvpos + nAttrbutenl * 2) {
                        if (maindv.getUint8(battrncount) != 0) {
                            szatrrname += String.fromCharCode(maindv.getUint16(battrncount, true));
                        }
                        battrncount += 2;
                    }
                    readstate.maindvpos = battrncount;
                    var nAttrbutevl = parseInt(''+maindv.getInt32(readstate.maindvpos, true));  // JS->TS:INFO added ''+ (parse... expects string)
                    readstate.maindvpos += 4;
                    var battrvcount = readstate.maindvpos;
                    var szatrtvalue = "";
                    while (battrvcount < readstate.maindvpos + nAttrbutevl * 2) {
                        if (maindv.getUint8(battrvcount) != 0) {
                            szatrtvalue += String.fromCharCode(maindv.getUint16(battrvcount, true));
                        }
                        battrvcount += 2;
                    }
                    readstate.maindvpos = battrvcount;
                    vector3Dref.partlist[readstate.blockpart].addAtrib(szatrrname, szatrtvalue);
                    /*
                     0	4	LONG	Object ID	10
                     4	4	LONG	NameLength		Number of characters in name
                     8	N	CHAR[N]	Name		Attribute Name
                     8+NameLength	4	LONG	ValueLength		Number of characters in value
                     8+NameLen+4	N	CHAR[N]	Value		Attribute Value

                     */
                    readstate.objectid = parseInt(''+maindv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parse... expects string)
                    break;
                case 33:
                    readstate.maindvpos += 4;
                    var lineX1 = maindv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var lineY1 = maindv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var lineZ1 = maindv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var lineX2 = maindv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var lineY2 = maindv.getFloat32(readstate.maindvpos, true);
                    readstate.maindvpos += 4;
                    var lineZ2 = maindv.getFloat32(readstate.maindvpos, true);
                    var lineobj = {
                        X1: lineX1,
                        Y1: lineY1,
                        Z1: lineZ1,
                        X2: lineX2,
                        Y2: lineY2,
                        Z2: lineZ2
                    };
                    if (vector3Dref.partlist[readstate.blockpart] != undefined) {
                        vector3Dref.partlist[readstate.blockpart].addline(lineobj, readstate.facecolor);
                        vector3Dref.countparts++;
                    }
                    /*4	4	FLOAT	X1		Line coordinates
                     8	4	FLOAT	Y1
                     12	4	FLOAT	Z1
                     16	4	FLOAT	X2
                     20	4	FLOAT	Y2
                     24	4	FLOAT	Z2*/
                    readstate.maindvpos += 4;
                    readstate.objectid = parseInt(''+maindv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parse... expects string)
                    break;
                case 74:
                    readstate.maindvpos += 4;
                    readstate.facecolor = parseInt(''+maindv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parse... expects string)
                    /*
                     0	4	LONG	Object ID	74
                     4	4	LONG	Draw color		#RRGGBB

                     */
                    readstate.maindvpos += 4;
                    readstate.objectid = parseInt(''+maindv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parse... expects string)
                    break;
                case 75:
                    //facecolor
                    readstate.maindvpos += 4;
                    bimtype = parseInt(''+maindv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parse... expects string)
                    vector3Dref.partlist[readstate.blockpart].ifctype = bimtype;
                    //console.log(bimtype);
                    /*if (bimtype == 34){
                     var visibility = 0;
                     }*/
                    /*
                     0	4	LONG	Object ID	75
                     4	4	LONG	BimType		#RRGGBB

                     */
                    readstate.maindvpos += 4;
                    readstate.objectid = parseInt(''+maindv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parse... expects string)
                    break;
                case 12288:
                    readstate.maindvpos += 4;
                    readstate.objectid = parseInt(''+maindv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parse... expects string)
                    //objid = 12288;
                    if (vector3Dref.partlist.length > 0 && szShortformat == 'IFC') {
                        switch (vector3Dref.partlist[readstate.blockpart].ifctype) {
                            case 34:
                                vector3Dref.partlist[readstate.blockpart].visible = 0;
                                break;
                            case 21:
                                if (vector3Dref.partlist[readstate.blockpart].tarray[vector3Dref.partlist[readstate.blockpart].curTrset].triangles > 5000) {
                                    vector3Dref.partlist[readstate.blockpart].visible = 0;
                                    vector3Dref.partlist[readstate.blockpart].tempvisible = false;
                                }
                                break;
                        }
                    }
                    if (readstate.blockpart != -1 && vector3Dref.partlist.length > 0) {
                        if (vector3Dref.partlist[readstate.blockpart].tarray.length > 0) {
                            vector3Dref.partlist[readstate.blockpart].processmesh();
                        }
                        /*var mstatus = vector3Dref.partlist[blockpart].getmeshstatus();
                         if (mstatus.open && mstatus.meshexist) {
                         //setTimeout(vector3Dref.partlist[blockpart].addmesh(),2);
                         vector3Dref.partlist[blockpart].addmesh();

                         }*/
                    }
                    //end of block;
                    break;
                case 4096:
                    readstate.maindvpos += 4;
                    /*if(blockpart != -1 && vector3Dref.partlist.length > 0){
                     var mstatus = vector3Dref.partlist[blockpart].getmeshstatus();
                     if(mstatus.open && mstatus.meshexist ){
                     vector3Dref.partlist[blockpart].addmesh();
                     console.log(blockpart);
                     }
                     }*/
                    readstate.blockpart = parseInt(''+maindv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parse... expects string)
                    readstate.bnewblock = true;
                    readstate.maindvpos += 4;
                    readstate.maindvpos += 4;
                    var nvisbile = parseInt(''+maindv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parse... expects string)
                    readstate.maindvpos += 4;
                    var ntransparent = parseInt(''+maindv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parse... expects string)
                    readstate.maindvpos += 4;
                    var ncolor = parseInt(''+maindv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parse... expects string)
                    readstate.maindvpos += 4;
                    var nNamelength = parseInt(''+maindv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parse... expects string)
                    readstate.maindvpos += 4;
                    var bnamecount = readstate.maindvpos;
                    var szblockname = "";
                    while (bnamecount < readstate.maindvpos + nNamelength * 2) {
                        if (maindv.getUint8(bnamecount) != 0) {
                            szblockname += String.fromCharCode(maindv.getUint16(bnamecount, true));
                        }
                        bnamecount += 2;
                    }
                    readstate.maindvpos = bnamecount;
                    var mesharr = [];
                    var opartobj = {
                        id: readstate.blockpart,
                        visible: nvisbile,
                        transparent: ntransparent,
                        color: ncolor,
                        name: szblockname
                    };
                    let part;
                    if (szShortformat == 'IFC') {
                        part = new Part3DObject(opartobj, readstate.blockpart, vector3Dref, true);
                    }
                    else {
                        part = new Part3DObjectMulti(opartobj, readstate.blockpart, vector3Dref, true);
                        part.addAtrib("Part name", szblockname);
                        //var blockitem = new Block3DObject(szblockname, readstate.blockpart, nvisbile, 0, 0);
                        //vector3Dref.blocklist.push(blockitem);
                    }
                    vector3Dref.partlist[readstate.blockpart] = part;
                    blockcounter++;
                    /*
                     0	4	LONG	Object ID	0x1000
                     4	4	LONG	Block ID
                     8	4	LONG	Flags		Reserved
                     12	4	LONG	Visible		Visible if non zero
                     16	4	LONG	Transparent		Transparent if non zero.
                     20	4	LONG	Color		Default block color
                     24	4	LONG	Length of name		Length of block name in Unicode characters including zero terminator.
                     28	[]	WCHAR	Name of block		Unicode
                     */
                    //block start
                    //objid = 4096;
                    //maindvpos += 4;
                    readstate.objectid = parseInt(''+maindv.getInt32(readstate.maindvpos, true)); // JS->TS:INFO added ''+ (parse... expects string)
                    break;
                case 32768:
                    //console.log('read finished');
                    //resolve();
                    //counter = 200;
                    //vector3Dref.partlist[vector3Dref.partlist.length-1].isLastBlock = true;
                    vector3Dref.partlist[vector3Dref.partlist.length - 1].setlastblock();
                    /*if (pageobject.has3Dnav) {
                     pageobject.load3dnavigator();
                     }*/
                    break;
                default:
                    //console.log('default');
                    //console.log(objid);
                    //console.log(maindvpos);
                    readstate.objectid = 32768;
                    //reject(objid,maindvpos);
                    //counter = 200;
                    console.error("Failed!", readstate.objectid, readstate.maindvpos);
                    break;
            }
            return readstate;
        }
        function readbinarycomplete() {
            vector3Dref.partlist[vector3Dref.partlist.length - 1].isLastBlock = true;
            vector3Dref.binaryreadcomplete = true;
            maindv = null as any as DataView; // JS->TS:INFO
            Globals.bAnimateready = true;
            if (RxCore_GUI_Download != undefined) {
                RxCore_GUI_Download.setDownload("hide");
            }
            if (vector3Dref.partlist[vector3Dref.partlist.length - 1].isLoadComplete) {
                vector3Dref.blockreadComplete();
            }
            vector3Dref.updateblocklist();
        }
        /*this.checkpartload = function(){
            vector3Dref.partlist[vector3Dref.partlist.length-1].isLastBlock = true;

            if(vector3Dref.partlist[vector3Dref.partlist.length-1].isLoadComplete){
                vector3Dref.blockreadComplete();
            }
            console.log('part complete');


        };*/
        this.blockadded = function () {
            vector3Dref.countparts--;
            if (vector3Dref.binaryreadcomplete) {
                if (vector3Dref.countparts == 0) {
                    vector3Dref.blockreadComplete();
                    vector3Dref.updateblocklist();
                }
            }
        };
        this.blockreadComplete = function () {
            if (RxCore_GUI_Read3DComplete != undefined) {
                RxCore_GUI_Read3DComplete.readComplete();
            }
            parent.DocRef.SetActive();
            //console.log('last block added');
            /*if (pageobject.has3Dnav) {
                pageobject.load3dnavigator();
            }*/
            //vector3Dref.updateblocklist();
            /*if(szShortformat == 'IFC'){

            }

            if(szShortformat != 'IFC'){
                breadbinaryready = false;
                vector3Dref.updateblocklist();
            }*/
        };
        this.addblocks = function (pagexmldata:any) {
            this.blocklist = [];
            var rootnode = pagexmldata.getElementsByTagName('navigator');
            var rc = 0;
            var level = 0;
            var curlev = level;
            var partnodes = pagexmldata.getElementsByTagName('partref');
            for (var pc = 0; pc < partnodes.length; pc++) {
                var curnode = partnodes[pc];
                curlev = level;
                level = 0;
                while (curnode.parentNode.nodeName == 'partref') {
                    curnode = curnode.parentNode;
                    level++;
                }
                if (level < curlev) {
                    //BlocksContainer.AddULend();
                    //this.htmlcontent += "</ul>";
                }
                if (level > curlev) {
                    //BlocksContainer.AddULstart();
                    //this.htmlcontent += "<ul style='list-style: none; margin: 0; padding: 0;'>";
                }
                if (RxCore_GUI_3DParts != undefined) {
                    var listposition = pc * RxCore_GUI_3DParts.listheight;
                }
                else {
                    listposition = 0;
                }
                //var listposition = pc * BlocksContainer.listheight;
                //BlocksContainer.AddLIelement();
                //this.htmlcontent += "<li style='list-style: none; padding-left: 10px;'>";
                var blockname = partnodes[pc].attributes.getNamedItem('name').value;
                var partindex = partnodes[pc].attributes.getNamedItem('index').value;
                var partstate = partnodes[pc].attributes.getNamedItem('state').value;
                var blockitem = new Block3DObject(blockname, partindex, partstate, level, listposition);
                this.blocklist.push(blockitem);
            }
            //this.updateblocklist();
            parse3Dloop();
            /*if (RxCore_GUI_3DParts != undefined) {
                RxCore_GUI_3DParts.isupdate = false;
                RxCore_GUI_3DParts.set3DParts(this.blocklist);
            }*/
        };
        this.updateblocklist = function () {
            //BlocksContainer.init3D();
            //this.htmlcontent = "<ul style='list-style: none; margin: 0; padding: 0;'>";
            var level = 0;
            //var blocklistheight = BlocksContainer.Getheight();
            for (var pc = 0; pc < this.blocklist.length; pc++) {
                //curlev = level;
                //level = this.blocklist[pc].level;
                //var curnode =  this.blocklist[pc].;
                /*while(curnode.parentNode.nodeName == 'partref'){
                 curnode = curnode.parentNode;
                 level++;
                 }*/
                /*if (level < curlev ){
                 BlocksContainer.AddULend();
                 //this.htmlcontent += "</ul>";
                 }
                 if (level > curlev ){
                 BlocksContainer.AddULstart();
                 //this.htmlcontent += "<ul style='list-style: none; margin: 0; padding: 0;'>";
                 }*/
                //BlocksContainer.AddLIelement();
                //this.htmlcontent += "<li style='list-style: none; padding-left: 10px;'>";
                //var blockname = partnodes[pc].attributes.getNamedItem('name').value;
                //var partindex = partnodes[pc].attributes.getNamedItem('index').value;
                //var partstate = partnodes[pc].attributes.getNamedItem('state').value;
                //var blockitem  = new Block3DObject(blockname,partindex,partstate,level);
                //this.blocklist.push(blockitem);
                var index = this.blocklist[pc].index;
                if (this.partlist[index] != undefined) {
                    this.blocklist[pc].state = this.partlist[index].tempvisible;
                }
                else {
                    this.blocklist[pc].state = false;
                }
                //this.blocklist[pc].state = this.partlist[index].tempvisible;
                if (this.partlist[index].selected) {
                    /* if(this.blocklist[pc].position > (blocklistheight / 2)){
                     BlocklistScrollTo = this.blocklist[pc].position - (blocklistheight / 2);
                     }*/
                    this.blocklist[pc].setSelected(true);
                }
                else {
                    this.blocklist[pc].setSelected(false);
                }
                //this.htmlcontent += this.blocklist[pc].htmltext;
            }
            if (RxCore_GUI_3DParts != undefined) {
                RxCore_GUI_3DParts.isupdate = true;
                //RxCore_GUI_3DParts.scrollto = BlocklistScrollTo;
                RxCore_GUI_3DParts.set3DParts(this.blocklist);
                //RxCore_GUI_3DParts.scrollto = 0;
            }
        };
        this.searchAttribute = function (attribval:any) {
            var id = -1;
            for (var pc = 0; pc < vector3Dref.partlist.length; pc++) {
                var part3D = vector3Dref.partlist[pc];
                for (var ac = 0; ac < part3D.attributes.length; ac++) {
                    if (part3D.attributes[ac].value == attribval) {
                        id = vector3Dref.partlist[pc].id;
                    }
                }
            }
            return id;
        };
        this.addpartbinary = function (bstream:any, lastpart:any) {
        };
        this.addpart = function (partxml:any, lastpart:any) {
            var partobj = partxml.getElementsByTagName('part');
            var i = 0;
            //var curlength = vector3Dref.partlist.length - 1;
            function getpart(partxml:any) {
                setTimeout(function () {
                    if (partxml.attributes.getNamedItem('id') != undefined) {
                        var pid = partxml.attributes.getNamedItem('id').value;
                    }
                    var part = new Part3DObject(partxml, pid, vector3Dref);
                    vector3Dref.partlist[pid] = part;
                    //vector3Dref.partlist.push(part);
                    if (part.hasmesh) {
                        try {
                            //vector3Dref.scene.add( part.mesh );
                        }
                        catch (e) {
                            alert(e.message);
                        }
                        try {
                            //renderer.render(vector3Dref.scene, camera,false);
                        }
                        catch (e) {
                            alert(e.message);
                        }
                        //console.log(pid);
                    }
                    Globals.bAnimateready = lastpart;
                    /*if(lastpart){
                     bAnimateready = true;
                     renderer.preserveDrawingBuffer = false;
                     renderer.autoClear = true;

                     }else{
                     renderer.render(vector3Dref.scene, camera,false);
                     }*/
                    //alert(i);
                }, 10);
            }
            while (i < partobj.length) {
                //bAnimateready = true;
                getpart(partobj[i]);
                i++;
            }
            /*
             if(lastpart){
             bAnimateready = true;
             renderer.preserveDrawingBuffer = false;
             renderer.autoClear = true;

             }else{
             renderer.render(vector3Dref.scene, camera,false);
             }
             */
            //bAnimateready = true;
            //alert(vector3Dref.partlist.length);
            //renderer.render(vector3Dref.scene, camera,false);
        };
        this.clipping = function (plane:any, constant:any, onoff:any) {
            vector3Dref.clippingOn = onoff;
            if (onoff) {
                Globals.renderer.clippingPlanes = vector3Dref.globalPlanes;
            }
            else {
                Globals.renderer.clippingPlanes = Globals.Empty;
                return;
            }
            var percent = constant / 100;
            switch (plane) {
                case 0: //x plane
                    var newval = vector3Dref.xPlaneEnd + (vector3Dref.xPlaneconst * percent);
                    vector3Dref.globalPlaneX.constant = newval;
                    break;
                case 1: //y plane
                    newval = vector3Dref.yPlaneEnd + (vector3Dref.yPlaneconst * percent);
                    vector3Dref.globalPlaneY.constant = newval;
                    break;
                case 2: //z plane
                    newval = vector3Dref.zPlaneEnd + (vector3Dref.zPlaneconst * percent);
                    vector3Dref.globalPlaneZ.constant = newval;
                    break;
            }
        };
        this.doexplode = false;
        this.explode = function (distance:any) {
            if (!vector3Dref.doexplode) {
                return;
            }
            var scenepos = vector3Dref.originalpos.clone();
            if (distance == 0) {
                for (var partix = 0; partix < vector3Dref.scene.children.length; partix++) {
                    if (vector3Dref.scene.children[partix].type == "Mesh") {
                        vector3Dref.scene.children[partix].position.x = 0;
                        vector3Dref.scene.children[partix].position.y = 0;
                        vector3Dref.scene.children[partix].position.z = 0;
                    }
                }
                if (this.pxplodefactor != 0) {
                    var pscenepos = vector3Dref.originalpos.clone();
                    var psceneoffset = pscenepos.multiplyScalar(this.pxplodefactor);
                    vector3Dref.scene.position.sub(psceneoffset);
                }
                this.pxplodefactor = 0;
                return;
            }
            distance /= 10;
            //- vector3Dref.pxplodefactor;
            for (partix = 0; partix < vector3Dref.scene.children.length; partix++) {
                //var partcenter = this.partlist[partix].center;
                if (vector3Dref.scene.children[partix].name === "") {
                    continue;
                }
                if (vector3Dref.scene.children[partix].type == "Mesh") {
                    if (vector3Dref.partlist[vector3Dref.scene.children[partix].name].center != undefined) {
                        //original center stored in the partlist.
                        var partcenter = vector3Dref.partlist[vector3Dref.scene.children[partix].name].vcentroid.clone();
                        if (this.pxplodefactor != 0) {
                            var ppartcenter = partcenter.clone();
                            var ppartoffset = ppartcenter.multiplyScalar(this.pxplodefactor);
                            ppartcenter.multiplyScalar(vector3Dref.scale);
                            vector3Dref.scene.children[partix].position.sub(ppartoffset);
                        }
                        //get original center from partlist
                        var partoffset = partcenter.multiplyScalar(distance);
                        partoffset.multiplyScalar(vector3Dref.scale);
                        vector3Dref.scene.children[partix].position.add(partoffset);
                    }
                }
            }
            if (this.pxplodefactor != 0) {
                pscenepos = vector3Dref.originalpos.clone();
                psceneoffset = pscenepos.multiplyScalar(this.pxplodefactor);
                vector3Dref.scene.position.sub(psceneoffset);
            }
            var sceneoffset = scenepos.multiplyScalar(distance);
            //sceneoffset.x /= vector3Dref.scale;
            //sceneoffset.y /= vector3Dref.scale;
            //sceneoffset.z /= vector3Dref.scale;
            vector3Dref.scene.position.add(sceneoffset);
            vector3Dref.scene.updateMatrix();
            vector3Dref.pxplodefactor = distance;
        };
        this.setTransparency = function (value:any) {
            for (var i = 0; i < vector3Dref.scene.children.length; i++) {
                if (vector3Dref.scene.children[i].type == "Mesh") {
                    if (vector3Dref.partlist[vector3Dref.scene.children[i].name].transparent == 0) {
                        vector3Dref.scene.children[i].material.transparent = true;
                        //vector3Dref.scene.children[i].material.depthWrite = false;
                        vector3Dref.scene.children[i].material.opacity = value;
                        //renderer.sortObjects = false;
                    }
                }
            }
            // a small explode used to force correct transparency
            //workaround for now until a better solution present itself
            vector3Dref.doexplode = true;
            if (value == 0) {
                vector3Dref.explode(0);
            }
            else {
                vector3Dref.explode(0.001);
            }
            vector3Dref.doexplode = false;
        };
        this.resetTransparency = function () {
            for (var i = 0; i < vector3Dref.scene.children.length; i++) {
                if (vector3Dref.scene.children[i].type == "Mesh") {
                    if (vector3Dref.partlist[vector3Dref.scene.children[i].name].transparent == 0) {
                        vector3Dref.scene.children[i].material.transparent = false;
                        vector3Dref.scene.children[i].material.opacity = 1;
                    }
                }
            }
            // a small explode used to force correct transparency
            //workaround for now until a better solution present itself
            vector3Dref.doexplode = true;
            vector3Dref.explode(0);
            vector3Dref.doexplode = false;
        };
        this.setSelectedPart = function (name:any) {
            this.selectedpart = name;
        };
        this.getSelectedPart = function () {
            return this.selectedpart;
        };
        this.Close = function () {
            while (this.partlist.length != 0) {
                this.partlist.pop();
            }
            while (this.blocklist.length != 0) {
                this.blocklist.pop();
            }
            while (this.scene.children.length != 0) {
                var obj = this.scene.children[this.scene.children.length - 1];
                this.scene.remove(obj);
                obj = null;
            }
            Globals.renderer.render(this.scene, parent.camera);
        };
        //parse3D(objid,blockid,newblock,dvpos);
        if (breadbinaryready) {
            parse3Dloop();
        }
        function yieldingLoop(state:any, chunksize:any, callback:any, finished:any) {
            (function chunk() {
                var i = 0;
                //var end = Math.min(i + chunksize, count);
                var end = (i < chunksize);
                for (; i < chunksize; ++i) {
                    callback.call(null, state);
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
