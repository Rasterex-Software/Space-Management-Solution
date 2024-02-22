// TODO:JS->TS:INFO continue conversion

import * as THREE from 'three';

import {
    Globals,
    decimalToHex
} from '../internal';

export class Part3DObject {
    id: any;
    selected: boolean;
    isSpace: boolean;
    ifctype: number;
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
    centroid: any; // THREE.Vector3;
    vcentroid: any; // THREE.Vector3;
    minx: number;
    maxx: number;
    miny: number;
    maxy: number;
    minz: number;
    maxz: number;
    tempz: number;
    name: any;
    visible: any;
    transparent: any;
    defaultcolor: string;
    facecolor: string;
    tempvisible: boolean;
    tarray: any; // any[];
    addline: any; // (lineobj: any, ncolor: any) => void;
    addpart: any; // (partdv: any, numt: any, id: any, ncolor: any, newblock: any) => void;
    getmeshstatus: any; // method
    addAtrib: any; // (attname: any, attvalue: any) => void;
    appendmesh: any; // (binarydata: any, numt: any, facecolor: any, blockid: any) => void;
    createmesh: any; // (binarydata: any, numt: any, facecolor: any, blockid: any) => void;
    material: any; // THREE.MeshPhongMaterial;
    processmesh: any; // () => void;
    addmesh: any; // method
    center: any; // THREE.Vector3;
    radius: any; // number;
    boxmax: any; // THREE.Vector3;
    setlastblock: any; // () => void;
    resetvisible: any; // () => void;
    constructor(xmldata: any, index: any, parent: any, binary?: any) {
        var scope = this;
        this.id = index;
        this.selected = false;
        this.isSpace = false;
        this.ifctype = 0;
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
        this.centroid = new THREE.Vector3();
        this.vcentroid = new THREE.Vector3();
        this.minx = 1000000;
        this.maxx = 0;
        this.miny = 1000000;
        this.maxy = 0;
        this.minz = 1000000;
        this.maxz = 0;
        this.tempz = 0;
        this.id = xmldata.id;
        this.name = xmldata.name;
        this.visible = xmldata.visible;
        this.transparent = xmldata.transparent;
        this.defaultcolor = decimalToHex(xmldata.color);
        this.facecolor = decimalToHex(xmldata.color);
        this.tempvisible = (this.visible == 1);
        this.tarray = [];
        /*
         var opartobj ={
         id : blockid,
         visible : nvisbile,
         transparent : ntransparent,
         color : ncolor,
         name : szblockname,
         };
         */
        this.addline = function (lineobj: any, ncolor: any) {
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
        this.addpart = function (partdv: any, numt: any, id: any, ncolor: any, newblock: any) {
            if (partdv) {
                var facecolor = decimalToHex(ncolor);
                var mstatus = scope.getmeshstatus();
                var newgeometry = new THREE.BufferGeometry();
                var vertices = new Float32Array(numt * 9);
                var tobject = {
                    dv: partdv,
                    triangles: numt,
                    color: facecolor,
                    vindex: 0,
                    dvpos: 0,
                    geometry: newgeometry,
                    vectors: vertices
                };
                scope.tarray.push(tobject);
                /*if (!mstatus.meshexist) {
                    scope.createmesh(partdv, numt, facecolor, id);
                }else{
                    if (facecolor == mstatus.color) {
                        scope.appendmesh(partdv, numt, facecolor, id);
                    }else{
                        scope.addmesh();
                        scope.createmesh(partdv, numt, facecolor, id);
                    }
                }*/
            }
        };
        this.addAtrib = function (attname: any, attvalue: any) {
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
        this.getmeshstatus = function () {
            return {
                meshexist: this.hasmesh,
                color: this.facecolor,
                open: this.openmesh
            };
        };
        this.appendmesh = function (binarydata: any, numt: any, facecolor: any, blockid: any) {
            var dvsize = numt * 9 * 4;
            var dvpos = 0;
            //var vindex = 0;
            //var newgeometry =  new THREE.Geometry();
            //newgeometry = pushmesh(dvpos,dvsize,vindex,binarydata,newgeometry);
            /*while (dvpos < dvsize) {
                //dvpos += 4;
                var x = binarydata.getFloat32(dvpos, true) - parent.x;
                dvpos += 4;
                var y = binarydata.getFloat32(dvpos, true) - parent.y;
                dvpos += 4;
                var z = binarydata.getFloat32(dvpos, true) - parent.z;

                newgeometry.vertices.push(new THREE.Vector3(x, y, z));
                dvpos += 4;
                x = binarydata.getFloat32(dvpos, true) - parent.x;
                dvpos += 4;
                y = binarydata.getFloat32(dvpos, true) - parent.y;
                dvpos += 4;
                z = binarydata.getFloat32(dvpos, true) - parent.z;
                newgeometry.vertices.push(new THREE.Vector3(x, y, z));
                dvpos += 4;
                x = binarydata.getFloat32(dvpos, true) - parent.x;
                dvpos += 4;
                y = binarydata.getFloat32(dvpos, true) - parent.y;
                dvpos += 4;
                z = binarydata.getFloat32(dvpos, true) - parent.z;
                dvpos += 4;
                newgeometry.vertices.push(new THREE.Vector3(x, y, z));


                newgeometry.faces.push(new THREE.Face3(vindex, vindex + 1, vindex + 2));
                vindex += 3;

            }*/
        };
        this.createmesh = function (binarydata: any, numt: any, facecolor: any, blockid: any) {
            /*
             0	4	LONG	Object ID	9
             4	4	LONG	NumTriangles		Number of triangles
             8	4	FLOAT	X1		Triangle coordinates
             12	4	FLOAT	Y1
             16	4	FLOAT	Z1
             20	4	FLOAT	X2
             24	4	FLOAT	Y2
             28	4	FLOAT	Z2
             32	4	FLOAT	X3
             36	4	FLOAT	Y3
             40	4	FLOAT	Z3
             44	4	FLOAT	X[N]
             */
            this.openmesh = true;
            //newgeometry = new THREE.Geometry();
            this.hasmesh = true;
            this.facecolor = facecolor;
            this.meshcolors.push(facecolor);
            this.meshref++;
            this.meshrefs.push(this.meshref);
            if (this.format == 'IFC') {
                this.material = new THREE.MeshPhongMaterial({
                    color: this.facecolor,
                    side: THREE.DoubleSide,
                    shininess: 5,
                    // @ts-ignore JS->TS:INFO according to the types for THREE MeshPhongMaterial does not have a shading option
                    shading: THREE.SmoothShading      // JS->TS:INFO see comment on line above
                });
            }
            else {
                this.material = new THREE.MeshPhongMaterial({
                    color: this.facecolor,
                    side: THREE.DoubleSide,
                    shininess: 40,
                    // @ts-ignore JS->TS:INFO according to the types for THREE MeshPhongMaterial does not have a shading option
                    shading: THREE.SmoothShading      // JS->TS:INFO see comment on line above
                });
                this.material.metal = true;
            }
            if (this.transparent != 0) {
                this.material.transparent = true;
                this.material.opacity = 0.3;
            }
            var dvsize = numt * 9 * 4;
            var dvpos = 0;
            //vindex = 0;
            //newgeometry = pushmesh(dvpos,dvsize,vindex,binarydata,newgeometry);
            /*while (dvpos < dvsize) {
                //dvpos += 4;
                var x = binarydata.getFloat32(dvpos, true) - parent.x;
                dvpos += 4;
                var y = binarydata.getFloat32(dvpos, true) - parent.y;
                dvpos += 4;
                var z = binarydata.getFloat32(dvpos, true) - parent.z;

                newgeometry.vertices.push(new THREE.Vector3(x, y, z));
                dvpos += 4;
                x = binarydata.getFloat32(dvpos, true) - parent.x;
                dvpos += 4;
                y = binarydata.getFloat32(dvpos, true) - parent.y;
                dvpos += 4;
                z = binarydata.getFloat32(dvpos, true) - parent.z;
                newgeometry.vertices.push(new THREE.Vector3(x, y, z));
                dvpos += 4;
                x = binarydata.getFloat32(dvpos, true) - parent.x;
                dvpos += 4;
                y = binarydata.getFloat32(dvpos, true) - parent.y;
                dvpos += 4;
                z = binarydata.getFloat32(dvpos, true) - parent.z;
                dvpos += 4;
                newgeometry.vertices.push(new THREE.Vector3(x, y, z));


                newgeometry.faces.push(new THREE.Face3(vindex, vindex + 1, vindex + 2));
                vindex += 3;

            }*/
            //return newgeometry;
            //parent.scene.updateMatrix();
            //renderer.render(parent.scene, camera,false);
        };
        this.processmesh = function () {
            scope.curTrset = 0;
            if (scope.tarray[scope.curTrset] != undefined) {
                yieldingLoop((scope.tarray[scope.curTrset].triangles * 9 * 4), 1332, function () {
                    Globals.bAnimateready = false;
                    parsemeshbuffer();
                }, function () {
                    scope.addmesh();
                    Globals.bAnimateready = true;
                    //addmesh//document.getElementById('done').innerHTML = 'done!';
                });
            }
            //var t = document.getElementById('timer');
            (function timer() {
                //t.innerHTML = j;
                Globals.bAnimateready = true;
                //parsemesh(scope.tarray[scope.curTrset]);
                if (scope.tarray[scope.curTrset] != undefined) {
                    if (scope.tarray[scope.curTrset].dvpos < (scope.tarray[scope.curTrset].triangles * 9 * 4)) {
                        setTimeout(timer, 10);
                    }
                }
            })();
        };
        this.addmesh = function () {
            /*
             0	4	LONG	Object ID	9
             4	4	LONG	NumTriangles		Number of triangles
             8	4	FLOAT	X1		Triangle coordinates
             12	4	FLOAT	Y1
             16	4	FLOAT	Z1
             20	4	FLOAT	X2
             24	4	FLOAT	Y2
             28	4	FLOAT	Z2
             32	4	FLOAT	X3
             36	4	FLOAT	Y3
             40	4	FLOAT	Z3
             44	4	FLOAT	X[N]
             */
            this.openmesh = true;
            this.hasmesh = true;
            //newgeometry = new THREE.Geometry();
            this.facecolor = scope.tarray[scope.curTrset].color;
            this.meshcolors.push(scope.tarray[scope.curTrset].color);
            this.meshref++;
            this.meshrefs.push(this.meshref);
            if (this.format == 'IFC') {
                this.material = new THREE.MeshPhongMaterial({
                    color: this.facecolor,
                    side: THREE.DoubleSide,
                    shininess: 5,
                    // @ts-ignore JS->TS:INFO according to the types for THREE MeshPhongMaterial does not have a shading option
                    shading: THREE.SmoothShading      // JS->TS:INFO see comment on line above
                });
            }
            else {
                this.material = new THREE.MeshPhongMaterial({
                    color: this.facecolor,
                    side: THREE.DoubleSide,
                    shininess: 20,
                    // @ts-ignore JS->TS:INFO according to the types for THREE MeshPhongMaterial does not have a shading option
                    shading: THREE.SmoothShading      // JS->TS:INFO see comment on line above
                    //emissive: this.facecolor,
                    //emissiveIntensity : 0.5
                });
                //this.material.metal = true;
                //console.log(this.facecolor);
            }
            if (this.transparent != 0) {
                this.material.transparent = true;
                this.material.opacity = 0.3;
            }
            scope.tarray[scope.curTrset].geometry.addAttribute('position', new THREE.BufferAttribute(scope.tarray[scope.curTrset].vectors, 3));
            //scope.tarray[scope.curTrset].geometry.computeFaceNormals();
            scope.tarray[scope.curTrset].geometry.computeVertexNormals();
            //scope.tarray[scope.curTrset].geometry.computeBoundingSphere();
            //scope.tarray[scope.curTrset].geometry.computeBoundingBox();
            //scope.center = scope.tarray[scope.curTrset].geometry.boundingSphere.center.clone();
            //scope.radius = scope.tarray[scope.curTrset].geometry.boundingSphere.radius;
            //scope.boxmax = scope.tarray[scope.curTrset].geometry.boundingBox.max.clone();
            //code for wireframe like material
            //this.wireframe = THREE.SceneUtils.createMultiMaterialObject( newgeometry, materials );
            var partmesh = new THREE.Mesh(scope.tarray[scope.curTrset].geometry, scope.material);
            partmesh.name = scope.id;
            partmesh.scale.x = parent.scale;
            partmesh.scale.y = parent.scale;
            partmesh.scale.z = parent.scale;
            partmesh.geometry.computeBoundingSphere();
            partmesh.geometry.computeBoundingBox();
            if (this.visible == 0) {
                partmesh.visible = false;
                //partmesh.visible = false;
                scope.tempvisible = false;
            }
            parent.scene.add(partmesh);
            //partmesh.updateMatrix();
            //var attribute = partmesh.geometry.attributes.position; // we want the position data
            //var index = 1; // index is zero-based, so this the the 2nd vertex
            //scope.centroid.fromAttribute( attribute, index ); // extract the x,y,z coordinates
            //scope.centroid.applyMatrix4( partmesh.matrixWorld );
            scope.center = partmesh.geometry.boundingSphere.center.clone();
            scope.radius = partmesh.geometry.boundingSphere.radius;
            scope.boxmax = partmesh.geometry.boundingBox.max.clone();
            scope.vcentroid.set(scope.minx, scope.miny, scope.minz);
            var maxvector = new THREE.Vector3((scope.maxx - scope.minx) * 0.5, (scope.maxy - scope.miny) * 0.5, (scope.maxz - scope.minz) * 0.5);
            scope.vcentroid.add(maxvector);
            //scope.worldpos = partmesh.worldToLocal(scope.centroid);
            parent.blockadded();
            scope.isLoadComplete = true;
            if (scope.isLastBlock) {
                parent.blockreadComplete();
            }
            //var currentcolor = scope.tarray[scope.curTrset].color;
            if (scope.tarray.length > 1) {
                //if(currentcolor == scope.tarray[scope.curTrset+1].color){
                //scope.tarray[scope.curTrset+1].geometry = scope.tarray[scope.curTrset].geometry;
                //}
            }
            scope.tarray.shift();
            if (scope.tarray.length > 0) {
                scope.processmesh();
            }
        };
        this.setlastblock = function () {
            scope.isLastBlock = true;
            if (scope.isLoadComplete || !scope.hasmesh) {
                parent.blockreadComplete();
            }
        };
        this.resetvisible = function () {
            scope.tempvisible = (scope.visible == 1);
        };
        function maxmin(x: any, y: any, z: any) {
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
        function parsemeshbuffer() {
            var counter = 0;
            var meshobj = scope.tarray[scope.curTrset];
            if (meshobj.dvpos < (meshobj.triangles * 9 * 4)) {
                var x = meshobj.dv.getFloat32(meshobj.dvpos, true) - parent.x;
                meshobj.dvpos += 4;
                var y = meshobj.dv.getFloat32(meshobj.dvpos, true) - parent.y;
                meshobj.dvpos += 4;
                var z = meshobj.dv.getFloat32(meshobj.dvpos, true) - parent.z;
                maxmin(x, y, z);
                meshobj.vectors[meshobj.vindex] = x;
                meshobj.vectors[meshobj.vindex + 1] = y;
                meshobj.vectors[meshobj.vindex + 2] = z;
                meshobj.vindex += 3;
                //meshobj.geometry.vertices.push(new THREE.Vector3(x, y, z));
                meshobj.dvpos += 4;
                x = meshobj.dv.getFloat32(meshobj.dvpos, true) - parent.x;
                meshobj.dvpos += 4;
                y = meshobj.dv.getFloat32(meshobj.dvpos, true) - parent.y;
                meshobj.dvpos += 4;
                z = meshobj.dv.getFloat32(meshobj.dvpos, true) - parent.z;
                maxmin(x, y, z);
                meshobj.vectors[meshobj.vindex] = x;
                meshobj.vectors[meshobj.vindex + 1] = y;
                meshobj.vectors[meshobj.vindex + 2] = z;
                meshobj.vindex += 3;
                //meshobj.geometry.vertices.push(new THREE.Vector3(x, y, z));
                meshobj.dvpos += 4;
                x = meshobj.dv.getFloat32(meshobj.dvpos, true) - parent.x;
                meshobj.dvpos += 4;
                y = meshobj.dv.getFloat32(meshobj.dvpos, true) - parent.y;
                meshobj.dvpos += 4;
                z = meshobj.dv.getFloat32(meshobj.dvpos, true) - parent.z;
                meshobj.dvpos += 4;
                maxmin(x, y, z);
                //meshobj.geometry.vertices.push(new THREE.Vector3(x, y, z));            }
                meshobj.vectors[meshobj.vindex] = x;
                meshobj.vectors[meshobj.vindex + 1] = y;
                meshobj.vectors[meshobj.vindex + 2] = z;
                meshobj.vindex += 3;
            }
            scope.tarray[scope.curTrset] = meshobj;
            return meshobj.dvpos;
        }
        function yieldingLoop(count: any, chunksize: any, callback: any, finished: any) {
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
        //var j = 0; //scope.tarray[scope.curTrset].dvpos
        //var count = 1e6; //total meshobj.triangles * 9 * 4
    }
}
