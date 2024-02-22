// TODO:JS->TS:INFO continue conversion

import * as THREE from 'three';

import {
    Globals,
    decimalToHex
} from '../internal';

export class Part3DObjectMulti {
    id: any;
    selected: boolean;
    hasmesh: boolean;
    attributes: any; // any[];
    format: any;
    meshcolors: any; // any[];
    meshrefs: any; // any[];
    meshref: number;
    openmesh: boolean;
    curTrset: number;
    isLastBlock: boolean;
    isLoadComplete: boolean;
    vcentroid: any; // THREE.Vector3;
    minx: number;
    maxx: number;
    miny: number;
    maxy: number;
    minz: number;
    maxz: number;
    name: any;
    visible: any;
    transparent: any;
    defaultcolor: any;
    facecolor: any;
    curColor: any;
    tempvisible: boolean;
    tarray: any; // never[];
    addline: any; // (lineobj: any, ncolor: any) => void;
    appendtriangles: any; // (partdv: any, numt: any, id: any, ncolor: any) => void;
    addtriangles: any; // (partdv: any, numt: any, id: any, facecolor: any) => void;
    addpart: any; // (partdv: any, numt: any, id: any, ncolor: any, newblock: any) => void;
    processmesh: any; //  () => void;
    addmesh: any; //  method
    resetvisible: any; // () => void;
    material: any; // THREE.MeshPhongMaterial;
    center: any;
    setlastblock: any; //  () => void;
    addAtrib: any; //  (attname: any, attvalue: any) => void;
    isSpace: any; // boolean;

    constructor(xmldata:any, index:any, parent:any, binary:any) {
        var scope = this;
        this.id = index;
        this.selected = false;
        this.hasmesh = false;
        this.attributes = [];
        this.format = Globals.DocObj.Format.substring(0, 3);
        this.meshcolors = [];
        this.meshrefs = [];
        this.meshref = 0;
        this.openmesh = false;
        this.curTrset = 0;
        this.isLastBlock = false;
        this.isLoadComplete = false;
        this.vcentroid = new THREE.Vector3();
        this.minx = 1000000;
        this.maxx = 0;
        this.miny = 1000000;
        this.maxy = 0;
        this.minz = 1000000;
        this.maxz = 0;
        this.id = xmldata.id;
        this.name = xmldata.name;
        this.visible = xmldata.visible;
        this.transparent = xmldata.transparent;
        this.defaultcolor = decimalToHex(xmldata.color);
        this.facecolor = decimalToHex(xmldata.color);
        this.curColor = decimalToHex(xmldata.color);
        this.tempvisible = (this.visible == 1);
        this.tarray = [];
        this.addline = function (lineobj:any, ncolor:any) {
            var facecolor = decimalToHex(ncolor);
            var x1 = lineobj.X1 - parent.x;
            var y1 = lineobj.Y1 - parent.y;
            var z1 = lineobj.Z1 - parent.z;
            var x2 = lineobj.X2 - parent.x;
            var y2 = lineobj.Y2 - parent.y;
            var z2 = lineobj.Z2 - parent.z;
            var linepos = new Float32Array([x1, y1, z1, x2, y2, z2]);
            var linegeometry = new THREE.BufferGeometry();
            linegeometry.addAttribute('position', new THREE.BufferAttribute(linepos, 3));
            linegeometry.setIndex(new THREE.BufferAttribute(new Uint16Array([0, 1]), 1));
            var material = new THREE.LineBasicMaterial({ color: facecolor, linewidth: 2.0 });
            var linesegment = new THREE.LineSegments(linegeometry, material);
            linesegment.scale.x = parent.scale;
            linesegment.scale.y = parent.scale;
            linesegment.scale.z = parent.scale;
            parent.scene.add(linesegment);
        };
        this.appendtriangles = function (partdv:any, numt:any, id:any, ncolor:any) {
            var curlength = scope.tarray[scope.curTrset].vectors.length;
            var newlength = numt * 9;
            scope.tarray[scope.curTrset].vectors = new Float32Array(curlength + newlength);
            scope.tarray[scope.curTrset].dv.push(partdv);
            scope.tarray[scope.curTrset].triangles.push(numt);
        };
        this.addtriangles = function (partdv:any, numt:any, id:any, facecolor:any) {
            var dvarr = [];
            var trianglearr = [];
            dvarr.push(partdv);
            trianglearr.push(numt);
            var newgeometry = new THREE.BufferGeometry();
            var vertices = new Float32Array(numt * 9);
            var tobject = {
                dv: dvarr,
                triangles: trianglearr,
                color: facecolor,
                vindex: 0,
                dvpos: 0,
                geometry: newgeometry,
                vectors: vertices
            };
            scope.tarray.push(tobject);
            this.curTrset = scope.tarray.length - 1;
        };
        this.addpart = function (partdv:any, numt:any, id:any, ncolor:any, newblock:any) {
            if (partdv) {
                var facecolor = decimalToHex(ncolor);
                //var mstatus = scope.getmeshstatus();
                var dvarr = [];
                if (scope.tarray.length > 0) {
                    if (scope.tarray[scope.curTrset].color == facecolor) {
                        scope.facecolor = facecolor;
                        scope.appendtriangles(partdv, numt, id, ncolor);
                    }
                    else {
                        scope.addtriangles(partdv, numt, id, facecolor);
                    }
                }
                else {
                    this.curColor = facecolor;
                    scope.addtriangles(partdv, numt, id, facecolor);
                }
            }
        };
        this.processmesh = function () {
            scope.curTrset = 0;
            for (var i = 0; i < scope.tarray.length; i++) {
                for (var j = 0; j < scope.tarray[i].triangles.length; j++) {
                    var dvsize = scope.tarray[i].triangles[j] * 9 * 4;
                    parsemeshbuffer(0, scope.tarray[i].dv[j], dvsize, i);
                }
            }
            scope.addmesh();
            Globals.bAnimateready = true;
            /*if(scope.tarray[scope.curTrset] != undefined){
                yieldingLoop((scope.tarray[scope.curTrset].triangles * 9 * 4), 1332, function() {
                    for(var i = 0;i< scope.tarray.length;i++){
                        for(var j = 0;j<scope.tarray[i].triangles.length;j++){
                            parsemeshbuffer(0, scope.tarray[i].dv[j], dvsize,i);
                        }
                    }


                }, function() {
                    scope.addmesh();
                    bAnimateready = true;

                });

            }*/
            /*(function timer() {

                bAnimateready = false;

                if(scope.tarray[scope.curTrset] != undefined){
                    if (scope.tarray[scope.curTrset].dvpos < (scope.tarray[scope.curTrset].triangles * 9 * 4)) {
                        setTimeout(timer, 10);
                    }
                }
            })();*/
        };
        this.resetvisible = function () {
            scope.tempvisible = (scope.visible == 1);
        };
        function maxmin(x:any, y:any, z:any) {
            if (scope.maxx < x) {
                scope.maxx = x;
            }
            if (scope.maxy < y) {
                scope.maxy = y;
            }
            if (scope.maxz < z) {
                scope.maxz = z;
            }
            if (scope.minx > x) {
                scope.minx = x;
            }
            if (scope.miny > y) {
                scope.miny = y;
            }
            if (scope.minz > z) {
                scope.minz = z;
            }
        }
        function parsemeshbuffer(dvpos:any, dv:any, dvsize:any, tobjectnum:any) {
            while (dvpos < dvsize) {
                var x = dv.getFloat32(dvpos, true) - parent.x;
                dvpos += 4;
                var y = dv.getFloat32(dvpos, true) - parent.y;
                dvpos += 4;
                var z = dv.getFloat32(dvpos, true) - parent.z;
                maxmin(x, y, z);
                scope.tarray[tobjectnum].vectors[scope.tarray[tobjectnum].vindex] = x;
                scope.tarray[tobjectnum].vectors[scope.tarray[tobjectnum].vindex + 1] = y;
                scope.tarray[tobjectnum].vectors[scope.tarray[tobjectnum].vindex + 2] = z;
                scope.tarray[tobjectnum].vindex += 3;
                dvpos += 4;
                x = dv.getFloat32(dvpos, true) - parent.x;
                dvpos += 4;
                y = dv.getFloat32(dvpos, true) - parent.y;
                dvpos += 4;
                z = dv.getFloat32(dvpos, true) - parent.z;
                maxmin(x, y, z);
                scope.tarray[tobjectnum].vectors[scope.tarray[tobjectnum].vindex] = x;
                scope.tarray[tobjectnum].vectors[scope.tarray[tobjectnum].vindex + 1] = y;
                scope.tarray[tobjectnum].vectors[scope.tarray[tobjectnum].vindex + 2] = z;
                scope.tarray[tobjectnum].vindex += 3;
                dvpos += 4;
                x = dv.getFloat32(dvpos, true) - parent.x;
                dvpos += 4;
                y = dv.getFloat32(dvpos, true) - parent.y;
                dvpos += 4;
                z = dv.getFloat32(dvpos, true) - parent.z;
                dvpos += 4;
                maxmin(x, y, z);
                scope.tarray[tobjectnum].vectors[scope.tarray[tobjectnum].vindex] = x;
                scope.tarray[tobjectnum].vectors[scope.tarray[tobjectnum].vindex + 1] = y;
                scope.tarray[tobjectnum].vectors[scope.tarray[tobjectnum].vindex + 2] = z;
                scope.tarray[tobjectnum].vindex += 3;
            }
        }
        this.addmesh = function () {
            this.curTrset = 0;
            while (scope.tarray.length != 0) {
                scope.hasmesh = true;
                var facecolor = scope.tarray[scope.curTrset].color;
                scope.material = new THREE.MeshPhongMaterial({
                    color: facecolor,
                    side: THREE.DoubleSide,
                    //vertexColors: THREE.VertexColors,
                    shininess: 20,
                    // @ts-ignore JS->TS:INFO according to the types for THREE MeshPhongMaterial does not have a shading option
                    shading: THREE.SmoothShading      // JS->TS:INFO see comment on line above
                });
                if (scope.transparent != 0) {
                    scope.material.transparent = true;
                    scope.material.opacity = 0.3;
                }
                scope.tarray[scope.curTrset].geometry.addAttribute('position', new THREE.BufferAttribute(scope.tarray[scope.curTrset].vectors, 3));
                //scope.tarray[scope.curTrset].geometry.computeFaceNormals();
                scope.tarray[scope.curTrset].geometry.computeVertexNormals();
                scope.tarray[scope.curTrset].geometry.computeBoundingSphere();
                scope.center = scope.tarray[scope.curTrset].geometry.boundingSphere.center.clone();
                scope.vcentroid.set(scope.minx, scope.miny, scope.minz);
                var maxvector = new THREE.Vector3((scope.maxx - scope.minx) * 0.5, (scope.maxy - scope.miny) * 0.5, (scope.maxz - scope.minz) * 0.5);
                scope.vcentroid.add(maxvector);
                var partmesh = new THREE.Mesh(scope.tarray[scope.curTrset].geometry, scope.material);
                partmesh.name = scope.id;
                partmesh.scale.x = parent.scale;
                partmesh.scale.y = parent.scale;
                partmesh.scale.z = parent.scale;
                if (this.visible == 0) {
                    partmesh.visible = false;
                    //partmesh.visible = false;
                    scope.tempvisible = false;
                }
                parent.scene.add(partmesh);
                scope.tarray.shift();
            }
            scope.isLoadComplete = true;
            if (scope.isLastBlock) {
                parent.blockreadComplete();
            }
        };
        this.setlastblock = function () {
            scope.isLastBlock = true;
            if (scope.isLoadComplete || !scope.hasmesh) {
                parent.blockreadComplete();
            }
        };
        this.addAtrib = function (attname:any, attvalue:any) {
            var attobj = {
                name: attname,
                value: attvalue
            };
            this.attributes.push(attobj);
            var spacecheck = attname.substring(0, 8);
            if (spacecheck == 'IfcSpace') {
                this.isSpace = true;
            }
        };
        function yieldingLoop(count:any, chunksize:any, callback:any, finished:any) {
            var i = 0;
            (function chunk() {
                var end = Math.min(i + chunksize, count);
                for (; i < end; ++i) {
                    callback.call(null, i);
                }
                if (i < count) {
                    setTimeout(chunk, 0);
                }
                else {
                    finished.call(null);
                }
            })();
        }
    }
}
