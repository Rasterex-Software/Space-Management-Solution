import {
    Globals,
    TouchPoint,
    drawmarkupAll,
    MousePosdrwext,
    MarkupObject,
    img_update,
    RxCore_GUI_Notediag,
    RxCore_GUI_Markup,
    RxCore_GUI_Textdiag,
    setTransp,
    drawsnap,
    RxCore_hideTextInput,
    RxCore_PagePos,
    DrawMarkupSelected,
    RxCore_GUI_MarkupLink,
    MarkupSaveState,
    RxCore_GUI_TextInput,
    Rectangle,
    deletemarkup,
    RxCore_GUI_markupParamsError,
    getUnitArea,
    getUnitlength,
    lineangle,
    RxCore_GUI_Measurediag,
    point,
    RxCore_GUI_CompareMeasure,
    RxCore_GUI_Calibratediag,
    mouse_rotated,
    MousePosradiusdrwext,
    ortho_rotate
} from "../internal";

import * as THREE from 'three';

import {
    getMousePos,
    getTouchPos,
    snap_rotated,
    textRect,
    stampRect,
    findmarkupHover,
    findmarkup,
    finddoublemarkup
} from "./deps";

export function initTools() {

    // the hide3d tool
    Globals.tools.hide3d = function () {
        const tool = this;
        // TODO:JS->TS:CHECK a lot of constiables seems that are not used
        const x = 0,
            y = 0,
            w = 0,
            h = 0;
        const prevx = 0,
            prevy = 0;
        //Array for MSIE10 touchpoints
        const numtouchpoints = -1;
        const touchpointarr = [];
        this.name = 'hide3d';
        this.anglelengthsupport = false;

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const mvector = new THREE.Vector3();

        this.mousedown = function (ev: any) {

            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';

            tool.started = true;
            //var mousePos = getMousePos(canvaso, ev);
            const mousePos = getMousePos(Globals.renderer.domElement, ev);

            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {

                    mouse.x = (mousePos.x / Globals.canvasowidth) * 2 - 1;
                    mouse.y = -(mousePos.y / Globals.canvasoheight) * 2 + 1;

                    // update the picking ray with the camera and mouse position

                    raycaster.setFromCamera(mouse, Globals.DocObj.pages[Globals.DocObj.currentpage].camera);

                    // calculate objects intersecting the picking ray
                    const intersects = raycaster.intersectObjects(Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scene.children);

                    if (intersects.length > 0) {
                        for (let i = 0; i < intersects.length; i++) {
                            if (intersects[i].object.visible) {
                                const meshid = intersects[i].object.name;
                                Globals.DocObj.pages[Globals.DocObj.currentpage].turn3DBlockOnOff(meshid);
                                break;
                            }
                        }

                    }

                }

            }
        }

        this.mouseup = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'default';
            if (tool.started) {
                tool.started = false;
            }
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            tool.started = true;
            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {

                    mouse.x = (mousePos.x / Globals.canvasowidth) * 2 - 1;
                    mouse.y = -(mousePos.y / Globals.canvasoheight) * 2 + 1;

                    // update the picking ray with the camera and mouse position

                    raycaster.setFromCamera(mouse, Globals.DocObj.pages[Globals.DocObj.currentpage].camera);

                    // calculate objects intersecting the picking ray
                    const intersects = raycaster.intersectObjects(Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scene.children);

                    if (intersects.length > 0) {
                        for (let i = 0; i < intersects.length; i++) {
                            if (intersects[i].object.visible) {
                                const meshid = intersects[i].object.name;
                                Globals.DocObj.pages[Globals.DocObj.currentpage].turn3DBlockOnOff(meshid);
                                break;
                            }
                        }

                    }

                }
            }
        }

        this.touchstart = function (ev: any) {
            ev.preventDefault();
            tool.started = true;
            let touchPos: any = getTouchPos(Globals.renderer.domElement, ev, 0);


            /*var touchPos = {
             x: ev.targetTouches[0].pageX,
             y: ev.targetTouches[0].pageY
             };*/


            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    //Viewer3D.mouseX = mousePos.x;
                    //Viewer3D.mouseY = mousePos.y;
                    mouse.x = (touchPos.x / Globals.canvasowidth) * 2 - 1;
                    mouse.y = -(touchPos.y / Globals.canvasoheight) * 2 + 1;

                    // update the picking ray with the camera and mouse position

                    raycaster.setFromCamera(mouse, Globals.DocObj.pages[Globals.DocObj.currentpage].camera);

                    // calculate objects intersecting the picking ray
                    const intersects = raycaster.intersectObjects(Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scene.children);

                    if (intersects.length > 0) {
                        for (let i = 0; i < intersects.length; i++) {
                            if (intersects[i].object.visible) {
                                const meshid = intersects[i].object.name;
                                Globals.DocObj.pages[Globals.DocObj.currentpage].turn3DBlockOnOff(meshid);
                                break;
                            }
                        }

                    }

                    /*var info = Viewer3D.pick(touchPos.x, touchPos.y);
                     if (info.mesh != null){
                     var meshid = info.mesh.name;
                     DocObj.pages[DocObj.currentpage].select3DBlock(meshid);
                     }*/

                }


            }

        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {

                tool.started = false;
            }

        }

        this.touchend = (ev: any) => {
            ev.preventDefault();
            if (tool.started) {

                tool.started = false;
            }
        }
    }


    // the select3d tool
    Globals.tools.select3d = function () {
        const tool = this;
        // TODO:JS->TS:CHECK a lot of variables seems that are not used
        const x = 0,
            y = 0,
            w = 0,
            h = 0;
        const prevx = 0,
            prevy = 0;

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const mvector = new THREE.Vector3();

        this.name = 'select3d';
        this.anglelengthsupport = false;

        //Array for MSIE10 touchpoints
        const numtouchpoints = -1;
        const touchpointarr = [];

        this.mousedown = function (ev: any) {

            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';

            tool.started = true;
            //var mousePos = getMousePos(canvaso, ev);
            const mousePos = getMousePos(Globals.renderer.domElement, ev);

            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {

                    mouse.x = (mousePos.x / Globals.canvasowidth) * 2 - 1;
                    mouse.y = -(mousePos.y / Globals.canvasoheight) * 2 + 1;

                    // update the picking ray with the camera and mouse position

                    raycaster.setFromCamera(mouse, Globals.DocObj.pages[Globals.DocObj.currentpage].camera);

                    // calculate objects intersecting the picking ray
                    const intersects = raycaster.intersectObjects(Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scene.children);

                    if (intersects.length > 0) {
                        for (let i = 0; i < intersects.length; i++) {
                            const bPlaneX = (intersects[i].point.x > -Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.globalPlaneX.constant);
                            const bPlaneY = (intersects[i].point.y > -Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.globalPlaneY.constant);
                            const bPlaneZ = (intersects[i].point.z < Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.globalPlaneZ.constant);

                            if (intersects[i].object.visible && bPlaneX && bPlaneY && bPlaneZ) {
                                const meshid = intersects[i].object.name;
                                Globals.DocObj.pages[Globals.DocObj.currentpage].select3DBlock(meshid);
                                break;
                            }
                        }


                    }

                    //intersects[0].object.material.color = new THREE.Color( 0xf781f3 );

                    /*for ( var intersect in intersects ) {

                     var meshid = intersects[intersect].object.name;
                     intersects[intersect].object.material.color = new THREE.Color( 0xf781f3 );

                     }*/


                    /*var info = Viewer3D.pick(ev.clientX, ev.clientY);
                     if (info.mesh != null){
                     var meshid = info.mesh.name;
                     DocObj.pages[DocObj.currentpage].select3DBlock(meshid);
                     }*/
                }
            }
        }

        this.mouseup = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'default';
            if (tool.started) {
                tool.started = false;
            }
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }


        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            tool.started = true;
            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    //Viewer3D.mouseX = mousePos.x;
                    //Viewer3D.mouseY = mousePos.y;

                    mouse.x = (mousePos.x / Globals.canvasowidth) * 2 - 1;
                    mouse.y = -(mousePos.y / Globals.canvasoheight) * 2 + 1;

                    // update the picking ray with the camera and mouse position

                    raycaster.setFromCamera(mouse, Globals.DocObj.pages[Globals.DocObj.currentpage].camera);

                    // calculate objects intersecting the picking ray
                    const intersects = raycaster.intersectObjects(Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scene.children);

                    if (intersects.length > 0) {
                        for (let i = 0; i < intersects.length; i++) {
                            if (intersects[i].object.visible) {
                                const meshid = intersects[i].object.name;
                                Globals.DocObj.pages[Globals.DocObj.currentpage].select3DBlock(meshid);
                                break;
                            }
                        }
                    }


                    /*var info = Viewer3D.pick(ev.clientX, ev.clientY);
                     if (info.mesh != null){
                     var meshid = info.mesh.name;
                     DocObj.pages[DocObj.currentpage].select3DBlock(meshid);
                     }*/
                }
            }
        }

        this.MSPointerUp = function (ev: any) {
            ev.target.style.cursor = 'default';
            if (tool.started) {
                tool.started = false;
            }
        }

        this.touchstart = function (ev: any) {
            ev.preventDefault();
            tool.started = true;
            let touchPos: any = getTouchPos(Globals.renderer.domElement, ev, 0);


            /*var touchPos = {
             x: ev.targetTouches[0].pageX,
             y: ev.targetTouches[0].pageY
             };*/


            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    //Viewer3D.mouseX = mousePos.x;
                    //Viewer3D.mouseY = mousePos.y;
                    mouse.x = (touchPos.x / Globals.canvasowidth) * 2 - 1;
                    mouse.y = -(touchPos.y / Globals.canvasoheight) * 2 + 1;

                    // update the picking ray with the camera and mouse position

                    raycaster.setFromCamera(mouse, Globals.DocObj.pages[Globals.DocObj.currentpage].camera);

                    // calculate objects intersecting the picking ray
                    const intersects = raycaster.intersectObjects(Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scene.children);

                    if (intersects.length > 0) {
                        for (let i = 0; i < intersects.length; i++) {
                            if (intersects[i].object.visible) {
                                const meshid = intersects[i].object.name;
                                Globals.DocObj.pages[Globals.DocObj.currentpage].select3DBlock(meshid);
                                break;
                            }
                        }

                    }

                    /*var info = Viewer3D.pick(touchPos.x, touchPos.y);
                     if (info.mesh != null){
                     var meshid = info.mesh.name;
                     DocObj.pages[DocObj.currentpage].select3DBlock(meshid);
                     }*/

                }

            }

        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {
                tool.started = false;
            }

        }

        this.touchend = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {
                tool.started = false;
            }
        }
    }


    // the Walkthrough3D tool
    Globals.tools.Walkthrough3D = function () {

        const scope = this;
        //DocObj.pages[DocObj.currentpage].walkthroughcontrol.

        //this.object = camera;
        //this.domElement = renderer.domElement;

        this.name = 'Walkthrough3D';
        this.anglelengthsupport = false;

        this.started = false;

        Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.enabled = true;


        //var scope = this;
        const rotateStart = new THREE.Vector2();
        //controls.movementSpeed = 100;
        //controls.domElement = container;
        //controls.rollSpeed = Math.PI / 10;
        //controls.autoForward = false;
        //controls.dragToLook = true;


        //this.movementSpeed = 100.0;
        //this.rollSpeed = Math.PI / 10;

        //this.dragToLook = true;
        //this.autoForward = false;

        //this.tmpQuaternion = new THREE.Quaternion();

        //this.mouseStatus = 0;

        //this.moveState = { up: 0, down: 0, left: 0, right: 0, forward: 0, back: 0, pitchUp: 0, pitchDown: 0, yawLeft: 0, yawRight: 0, rollLeft: 0, rollRight: 0 };
        //this.moveVector = new THREE.Vector3( 0, 0, 0 );
        //this.rotationVector = new THREE.Vector3( 0, 0, 0 );

        this.keydown = function (ev: any) {
            //if ( scope.enabled === false || scope.noKeys === true || scope.noPan === true ) return;

            if (ev.altKey) {
                return;
            }

            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    switch (ev.keyCode) {

                        //case 16: /* shift */ DocObj.pages[DocObj.currentpage].walkthroughcontrol.movementSpeedMultiplier = .1; break;
                        case 16:
                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.mouseMove = true;
                            break;

                        case 87:
                            /*W*/
                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveForward = true;
                            break;
                        case 83:
                            /*S*/
                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveBackward = true;
                            break;

                        case 65:
                            /*A*/
                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveLeft = true;
                            break;
                        case 68:
                            /*D*/
                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveRight = true;
                            break;

                        case 82:
                            /*R*/
                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveUp = true;
                            break;
                        case 70:
                            /*F*/
                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveDown = true;
                            break;

                        case 33:
                            /*up*/

                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveUp = true;
                            break;
                        case 34:
                            /*down*/
                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveDown = true;

                            break;


                        case 38:
                            /*up*/

                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveForward = true;
                            break;
                        case 40:
                            /*down*/

                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveBackward = true;
                            break;
                        //case 38: /*up*/ DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveState.pitchUp = 1; break;
                        //case 40: /*down*/ DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveState.pitchDown = 1; break;

                        case 37:
                            /*left*/

                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveLeft = true;
                            break;
                        case 39:
                            /*right*/
                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveRight = true;

                            break;

                        //case 37: /*left*/ DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveState.yawLeft = 1; break;
                        //case 39: /*right*/ DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveState.yawRight = 1; break;

                        case 81:
                            /*Q*/
                            //DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveState.rollLeft = 1;
                            break;
                        case 69:
                            /*E*/
                            //DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveState.rollRight = 1;
                            break;

                    }
                    //DocObj.pages[DocObj.currentpage].walkthroughcontrol.updateMovementVector();
                    //DocObj.pages[DocObj.currentpage].walkthroughcontrol.updateRotationVector();
                }
            }

        }

        this.keyup = function (ev: any) {
            //if ( scope.enabled === false || scope.noKeys === true || scope.noPan === true ) return;

            /*DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveForward = false;
             DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveBackward = false;
             DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveLeft = false;
             DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveRight = false;
             DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveUp = false;
             DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveDown = false;*/

            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    switch (ev.keyCode) {

                        //case 16: /* shift */ DocObj.pages[DocObj.currentpage].walkthroughcontrol.movementSpeedMultiplier = .1; break;
                        case 16:
                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.mouseMove = false;
                            break;


                        case 87:
                            /*W*/
                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveForward = false;
                            break;
                        case 83:
                            /*S*/
                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveBackward = false;
                            break;

                        case 65:
                            /*A*/
                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveLeft = false;
                            break;
                        case 68:
                            /*D*/
                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveRight = false;
                            break;

                        case 82:
                            /*R*/
                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveUp = false;
                            break;
                        case 70:
                            /*F*/
                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveDown = false;
                            break;

                        case 33:
                            /*up*/

                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveUp = false;
                            break;
                        case 34:
                            /*down*/

                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveDown = false;
                            break;

                        case 38:
                            /*up*/

                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveForward = false;
                            break;
                        case 40:
                            /*down*/
                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveBackward = false;

                            break;
                        //case 38: /*up*/ DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveState.pitchUp = 0; break;
                        //case 40: /*down*/ DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveState.pitchDown = 0; break;

                        case 37:
                            /*left*/

                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveLeft = false;
                            break;
                        case 39:
                            /*right*/
                            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveRight = false;

                            break;
                        //case 37: /*left*/ DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveState.yawLeft = 0; break;
                        //case 39: /*right*/ DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveState.yawRight = 0; break;

                        case 81:
                            /*Q*/
                            //DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveState.rollLeft = 0;

                            break;
                        case 69:
                            /*E*/
                            //DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveState.rollRight = 0;
                            break;

                    }
                    //DocObj.pages[DocObj.currentpage].walkthroughcontrol.updateMovementVector();
                    //DocObj.pages[DocObj.currentpage].walkthroughcontrol.updateRotationVector();
                }
            }
        }


        this.mousedown = function (ev: any) {

            /*if ( this.domElement !== document ) {

             this.domElement.focus();

             }*/

            ev.preventDefault();
            //ev.stopPropagation();
            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    //var mousePos = getMousePos(renderer.domElement, ev);
                    //DocObj.pages[DocObj.currentpage].walkthroughcontrol.mouseStatus++;
                    //rotateStart.set(mousePos.x,mousePos.y);
                    //DocObj.pages[DocObj.currentpage].walkthroughcontrol.StartRotate(mousePos.x, mousePos.y);
                    if (scope.started) {
                        Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.onMouseDown(ev.button);
                    } else {
                        Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.onMouseDown(ev.button);
                        scope.started = true;
                    }
                }
            }
        }

        this.mousemove = function (ev: any) {
            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    const mousePos = getMousePos(Globals.renderer.domElement, ev);
                    //DocObj.pages[DocObj.currentpage].walkthroughcontrol.mousemove(mousePos.x, mousePos.y);
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.onMouseMove(mousePos.x, mousePos.y);
                }
            }
        }

        this.mouseup = function (ev: any) {
            ev.preventDefault();
            //ev.stopPropagation();

            //if ( this.dragToLook ) {

            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.onMouseUp(ev.button);

                }
            }

            /*} else {

             switch ( event.button ) {

             case 0: this.moveState.forward = 0; break;
             case 2: this.moveState.back = 0; break;

             }

             this.updateMovementVector();

             }*/
        }

        this.mouseout = function (ev: any) {
            ev.preventDefault();

            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveBackward = false;
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveForward = false;
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveLeft = false;
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveRight = false;
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveUp = false;
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveDown = false;
                }
            }
        }

        this.touchstart = function (ev: any) {
            ev.preventDefault();
            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    const mousePos = getTouchPos(Globals.renderer.domElement, ev, 0);
                    if (scope.started) {
                        Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.onMouseDown(0);
                    } else {
                        Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.onMouseDown(0);
                        Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.enabled = true;
                        scope.started = true;
                    }
                }
            }

        }

        this.touchmove = function (ev: any) {
            ev.preventDefault();
            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    const mousePos = getTouchPos(Globals.renderer.domElement, ev, 0);
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.onMouseMove(mousePos.x, mousePos.y);
                }
            }
        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();
            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.onMouseUp(0);
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.onMouseMove(0, 0);
                }
            }
        }

        this.touchend = function (ev: any) {
            ev.preventDefault();
            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.onMouseUp(0);
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.onMouseMove(0, 0);
                }
            }
        }

        this.pointerdown = function (ev: any) {
            scope.MSPointerDown(ev);
        }

        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            //ev.stopPropagation();
            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    const mousePos = getMousePos(Globals.renderer.domElement, ev);
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.onMouseDown(ev.button);
                }
            }
        }

        this.pointermove = function (ev: any) {
            scope.MSPointerMove(ev);
        }

        this.MSPointerMove = function (ev: any) {
            ev.preventDefault();
            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    const mousePos = getMousePos(Globals.renderer.domElement, ev);
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.onMouseMove(mousePos.x, mousePos.y);
                }
            }
        }

        this.pointerup = function (ev: any) {
            scope.MSPointerUp(ev);

        }

        this.MSPointerUp = function (ev: any) {
            ev.preventDefault();
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.onMouseUp(ev.button);
        }

        this.pointerout = function (ev: any) {
            scope.MSPointerOut(ev);
        }

        this.MSPointerOut = function (ev: any) {
            ev.preventDefault();

            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveBackward = false;
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveForward = false;
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveLeft = false;
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveRight = false;
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveUp = false;
                    Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveDown = false;
                }
            }
        }
    }

    // the orbitControl tool
    Globals.tools.orbitControl = function () {
        const tool = this;
        // TODO:JS->TS:CHECK a lot of variables seems that are not used
        const x = 0,
            y = 0,
            w = 0,
            h = 0;
        const prevx = 0,
            prevy = 0;
        //Array for MSIE10 touchpoints
        let numtouchpoints = -1;
        let touchpointarr: any = []; // JS->TS:INFO

        this.name = 'orbitControl';
        this.anglelengthsupport = false;

        this.object = Globals.DocObj.pages[Globals.DocObj.currentpage].camera;
        this.domElement = Globals.renderer.domElement;

        //this.domElement = ( domElement !== undefined ) ? domElement : document;

        // API

        // Set to false to disable this control
        this.enabled = true;

        // "target" sets the location of focus, where the control orbits around
        // and where it pans with respect to.
        this.target = new THREE.Vector3();

        // center is old, deprecated; use "target" instead
        this.center = this.target;

        this.noZoom = false;
        this.zoomSpeed = 0.5;

        // Limits to how far you can dolly in and out
        this.minDistance = 0;
        this.maxDistance = Infinity;

        // Set to true to disable this control
        this.noRotate = false;
        this.rotateSpeed = 1.0;

        // Set to true to disable this control
        this.noPan = false;
        this.keyPanSpeed = 7.0; // pixels moved per arrow key push

        // Set to true to automatically rotate around the target
        this.autoRotate = false;
        this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

        // How far you can orbit vertically, upper and lower limits.
        // Range is 0 to Math.PI radians.
        this.minPolarAngle = 0; // radians
        this.maxPolarAngle = Math.PI; // radians

        // Set to true to disable use of the keys
        this.noKeys = false;

        this.keys = {
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            BOTTOM: 40
        };

        ////////////
        // internals

        // TODO:JS->TS:CHECK this exists also as 'const tool = this', create confusion
        const scope = this;

        const EPS = 0.000001;

        const rotateStart = new THREE.Vector2();
        const rotateEnd = new THREE.Vector2();
        const rotateDelta = new THREE.Vector2();

        const panStart = new THREE.Vector2();
        const panEnd = new THREE.Vector2();
        const panDelta = new THREE.Vector2();
        const panOffset = new THREE.Vector3();

        const offset = new THREE.Vector3();

        const dollyStart = new THREE.Vector2();
        const dollyEnd = new THREE.Vector2();
        const dollyDelta = new THREE.Vector2();

        let phiDelta = 0;
        let thetaDelta = 0;
        let scale = 1;
        const pan = new THREE.Vector3();

        const lastPosition = new THREE.Vector3();
        const lastQuaternion = new THREE.Quaternion();

        const STATE = {
            NONE: -1,
            ROTATE: 0,
            DOLLY: 1,
            PAN: 2,
            TOUCH_ROTATE: 3,
            TOUCH_DOLLY: 4,
            TOUCH_PAN: 5
        };

        let state = STATE.NONE;

        // for reset

        this.target0 = this.target.clone();
        this.position0 = this.object.position.clone();

        // so camera.up is the orbit axis

        const quat = new THREE.Quaternion().setFromUnitVectors(Globals.DocObj.pages[Globals.DocObj.currentpage].camera.up, new THREE.Vector3(0, 1, 0));
        const quatInverse = quat.clone().inverse();

        const changeEvent = {
            type: 'change'
        };
        const startEvent = {
            type: 'start'
        };
        const endEvent = {
            type: 'end'
        };

        this.rotateLeft = function (angle: any) {
            if (angle === undefined) {
                angle = getAutoRotationAngle();
            }
            thetaDelta -= angle;
        }

        this.rotateUp = function (angle: any) {
            if (angle === undefined) {
                angle = getAutoRotationAngle();
            }
            phiDelta -= angle;
        }

        // pass in distance in world space to move left
        this.panLeft = function (distance: any) {
            const te = this.object.matrix.elements;

            // get X column of matrix
            panOffset.set(te[0], te[1], te[2]);
            panOffset.multiplyScalar(-distance);

            pan.add(panOffset);
        }

        // pass in distance in world space to move up
        this.panUp = function (distance: any) {
            const te = this.object.matrix.elements;

            // get Y column of matrix
            panOffset.set(te[4], te[5], te[6]);
            panOffset.multiplyScalar(distance);

            pan.add(panOffset);
        }

        // pass in x,y of change desired in pixel space,
        // right and down are positive
        this.pan = function (deltaX: any, deltaY: any) {
            const element = scope.domElement === document ? scope.domElement.body : scope.domElement;

            if (scope.object.fov !== undefined) {

                // perspective
                const position = scope.object.position;
                const offset = position.clone().sub(scope.target);
                let targetDistance = offset.length();

                // half of the fov is center to top of screen
                targetDistance *= Math.tan((scope.object.fov / 2) * Math.PI / 180.0);

                // we actually don't use screenWidth, since perspective camera is fixed to screen height
                scope.panLeft(2 * deltaX * targetDistance / element.clientHeight);
                scope.panUp(2 * deltaY * targetDistance / element.clientHeight);

            } else if (scope.object.top !== undefined) {

                // orthographic
                scope.panLeft(deltaX * (scope.object.right - scope.object.left) / element.clientWidth);
                scope.panUp(deltaY * (scope.object.top - scope.object.bottom) / element.clientHeight);

            } else {
                // camera neither orthographic or perspective
                console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
            }
        }

        this.dollyIn = function (dollyScale: any) {
            if (dollyScale === undefined) {
                dollyScale = getZoomScale();
            }

            scale /= dollyScale;
        }

        this.dollyOut = function (dollyScale: any) {
            if (dollyScale === undefined) {
                dollyScale = getZoomScale();
            }

            scale *= dollyScale;
        }

        this.update = function () {
            const position = this.object.position;

            offset.copy(position).sub(this.target);
            //offset.set(0,0,0);
            //console.log( 'target:', [ this.target.x, this.target.y, this.target.z ] );
            //console.log( 'offset:', [ offset.x, offset.y, offset.z ] );

            // rotate offset to "y-axis-is-up" space
            offset.applyQuaternion(quat);

            // angle from z-axis around y-axis
            let theta = Math.atan2(offset.x, offset.z);

            // angle from y-axis
            let phi = Math.atan2(Math.sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);

            if (this.autoRotate) {
                this.rotateLeft(getAutoRotationAngle());
            }

            theta += thetaDelta;
            phi += phiDelta;

            // restrict phi to be between desired limits
            phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, phi));

            // restrict phi to be betwee EPS and PI-EPS
            phi = Math.max(EPS, Math.min(Math.PI - EPS, phi));

            let radius = offset.length() * scale;

            // restrict radius to be between desired limits
            radius = Math.max(this.minDistance, Math.min(this.maxDistance, radius));
            //console.log( 'radius:', radius );

            // move target to panned location
            this.target.add(pan);

            offset.x = radius * Math.sin(phi) * Math.sin(theta);
            offset.y = radius * Math.cos(phi);
            offset.z = radius * Math.sin(phi) * Math.cos(theta);

            // rotate offset back to "camera-up-vector-is-up" space
            offset.applyQuaternion(quatInverse);

            position.copy(this.target).add(offset);

            //console.log( 'camera:', [ position.x, position.y, position.z ] );

            this.object.lookAt(this.target);

            //console.log( 'phi:', phi );
            //console.log( 'theta:', theta );

            //console.log( 'camera:', [ this.object.rotation.x, this.object.rotation.y, this.object.rotation.z ] );

            thetaDelta = 0;
            phiDelta = 0;
            scale = 1;
            pan.set(0, 0, 0);

            // update condition is:
            // min(camera displacement, camera rotation in radians)^2 > EPS
            // using small-angle approximation cos(x/2) = 1 - x^2 / 8

            if (lastPosition.distanceToSquared(this.object.position) > EPS || 8 * (1 - lastQuaternion.dot(this.object.quaternion)) > EPS) {
                //scope.dispatchEvent( changeEvent );

                lastPosition.copy(this.object.position);
                lastQuaternion.copy(this.object.quaternion);
            }
        }

        this.reset = function () {
            state = STATE.NONE;

            this.target.copy(this.target0);
            this.object.position.copy(this.position0);

            this.update();
        }

        function getAutoRotationAngle() {
            return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
        }

        function getZoomScale() {
            return Math.pow(0.95, scope.zoomSpeed);
        }

        this.mousedown = function (ev: any) {
            if (scope.enabled === false) return;

            ev.preventDefault();
            ev.stopPropagation();

            //ev.target.style.cursor = 'crosshair';

            tool.started = true;
            const mousePos = getMousePos(scope.domElement, ev);

            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {

                    if (ev.button === 0) {
                        if (scope.noRotate === true) return;

                        state = STATE.ROTATE;

                        rotateStart.set(mousePos.x, mousePos.y);

                    } else if (ev.button === 1) { // else if (event.button === 1) { // JS->TS:INFO change event to ev
                        if (scope.noZoom === true) return;

                        state = STATE.DOLLY;

                        dollyStart.set(mousePos.x, mousePos.y);

                    } else if (ev.button === 2) { // } else if (event.button === 2) {  // JS->TS:INFO change event to ev
                        if (scope.noPan === true) return;

                        state = STATE.PAN;

                        panStart.set(mousePos.x, mousePos.y);

                    }
                    //scope.dispatchEvent( startEvent );
                }
            }
        }

        this.mousemove = function (ev: any) {
            if (scope.enabled === false) return;

            ev.preventDefault();

            const mousePos = getMousePos(scope.domElement, ev);
            const element = scope.domElement === document ? scope.domElement.body : scope.domElement;

            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    if (state === STATE.ROTATE) {

                        if (scope.noRotate === true) return;

                        rotateEnd.set(mousePos.x, mousePos.y);
                        rotateDelta.subVectors(rotateEnd, rotateStart);

                        // rotating across whole screen goes 360 degrees around
                        scope.rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);

                        // rotating up and down along whole screen attempts to go 360, but limited to 180
                        scope.rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);

                        rotateStart.copy(rotateEnd);

                    } else if (state === STATE.DOLLY) {

                        if (scope.noZoom === true) return;

                        dollyEnd.set(mousePos.x, mousePos.y);
                        dollyDelta.subVectors(dollyEnd, dollyStart);

                        if (dollyDelta.y > 0) {

                            scope.dollyIn();

                        } else {

                            scope.dollyOut();

                        }

                        dollyStart.copy(dollyEnd);

                    } else if (state === STATE.PAN) {

                        if (scope.noPan === true) return;

                        panEnd.set(mousePos.x, mousePos.y);
                        panDelta.subVectors(panEnd, panStart);

                        scope.pan(panDelta.x, panDelta.y);

                        panStart.copy(panEnd);

                    }

                    scope.update();
                }
            }
        }

        this.mouseup = function (ev: any) {
            if (scope.enabled === false) return;

            ev.preventDefault();
            ev.stopPropagation();
            //ev.target.style.cursor = 'default';
            if (tool.started) {
                tool.started = false;
                state = STATE.NONE;
            }
            //scope.dispatchEvent( endEvent );
        }

        this.mousewheel = function (ev: any) {
            scope.onMouseWheel(ev);
        }

        this.wheel = function (ev: any) {
            scope.onMouseWheel(ev)
        }

        this.DOMMouseScroll = function (ev: any) {
            //scope.onMouseWheel(ev)
        }

        this.onMouseWheel = function (ev: any) {
            if (scope.enabled === false || scope.noZoom === true) return;

            ev.preventDefault();
            ev.stopPropagation();

            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    let delta = 0;

                    if (ev.wheelDelta !== undefined) { // WebKit / Opera / Explorer 9

                        delta = ev.wheelDelta;
                    } else if (ev.deltaY !== undefined) { // Firefox

                        delta = -ev.deltaY;
                    }

                    if (delta > 0) {

                        scope.dollyOut();

                    } else {

                        scope.dollyIn();

                    }

                    scope.update();

                }
            }
        }

        this.keydown = function (ev: any) {
            if (scope.enabled === false || scope.noKeys === true || scope.noPan === true) return;

            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    switch (ev.keyCode) {

                        case scope.keys.UP:
                            scope.pan(0, scope.keyPanSpeed);
                            scope.update();
                            break;

                        case scope.keys.BOTTOM:
                            scope.pan(0, -scope.keyPanSpeed);
                            scope.update();
                            break;

                        case scope.keys.LEFT:
                            scope.pan(scope.keyPanSpeed, 0);
                            scope.update();
                            break;

                        case scope.keys.RIGHT:
                            scope.pan(-scope.keyPanSpeed, 0);
                            scope.update();
                            break;

                    }
                }
            }
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            //ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(scope.domElement, ev);


            numtouchpoints++;
            touchpointarr[numtouchpoints] = new TouchPoint(ev.pointerId, mousePos.x, mousePos.y);


            tool.started = true;
            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    switch (numtouchpoints) {
                        case 0: //one point only pan and markup labels
                            if (ev.button === 0) {
                                if (scope.noRotate === true) return;

                                state = STATE.ROTATE;

                                rotateStart.set(mousePos.x, mousePos.y);

                            } else if (ev.button === 1) { // } else if (event.button === 1) { // JS->TS:INFO changed event into ev
                                if (scope.noZoom === true) return;

                                state = STATE.DOLLY;

                                dollyStart.set(mousePos.x, mousePos.y);

                            } else if (ev.button === 2) { // } else if (event.button === 2) { // JS->TS:INFO changed event into ev
                                if (scope.noPan === true) return;

                                state = STATE.PAN;

                                panStart.set(mousePos.x, mousePos.y);

                            }
                            break;
                        case 1:
                            if (scope.noZoom === true) return;
                            state = STATE.TOUCH_DOLLY;

                            const dx = Math.max(touchpointarr[0].x, touchpointarr[1].x) - Math.min(touchpointarr[0].x, touchpointarr[1].x);
                            const dy = Math.max(touchpointarr[0].y, touchpointarr[1].y) - Math.min(touchpointarr[0].y, touchpointarr[1].y);

                            const distance = Math.sqrt(dx * dx + dy * dy);
                            dollyStart.set(0, distance);


                            break;
                    }

                }

            }

        }

        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.MSPointerMove = function (ev: any) {
            if (!Globals.documentopen) {
                return;
            }

            if (scope.enabled === false) return;

            ev.preventDefault();

            const mousePos = getMousePos(scope.domElement, ev);
            let i = -1;

            while (i < numtouchpoints) {
                i++;
                if (touchpointarr[i].pointID == ev.pointerId) {
                    touchpointarr[i].x = mousePos.x;
                    touchpointarr[i].y = mousePos.y;
                }
            }

            const element = scope.domElement === document ? scope.domElement.body : scope.domElement;

            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    switch (numtouchpoints) {
                        case 0:
                            if (state === STATE.ROTATE) {

                                if (scope.noRotate === true) return;

                                rotateEnd.set(mousePos.x, mousePos.y);
                                rotateDelta.subVectors(rotateEnd, rotateStart);

                                // rotating across whole screen goes 360 degrees around
                                scope.rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);

                                // rotating up and down along whole screen attempts to go 360, but limited to 180
                                scope.rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);

                                rotateStart.copy(rotateEnd);

                            } else if (state === STATE.DOLLY) {

                                if (scope.noZoom === true) return;

                                dollyEnd.set(mousePos.x, mousePos.y);
                                dollyDelta.subVectors(dollyEnd, dollyStart);

                                if (dollyDelta.y > 0) {

                                    scope.dollyIn();

                                } else {

                                    scope.dollyOut();

                                }

                                dollyStart.copy(dollyEnd);

                            } else if (state === STATE.PAN) {

                                if (scope.noPan === true) return;

                                panEnd.set(mousePos.x, mousePos.y);
                                panDelta.subVectors(panEnd, panStart);

                                scope.pan(panDelta.x, panDelta.y);

                                panStart.copy(panEnd);

                            }

                            scope.update();

                            break;
                        case 1:
                            if (scope.noZoom === true) return;
                            if (state !== STATE.TOUCH_DOLLY) return;

                            const dx = Math.max(touchpointarr[0].x, touchpointarr[1].x) - Math.min(touchpointarr[0].x, touchpointarr[1].x);
                            const dy = Math.max(touchpointarr[0].y, touchpointarr[1].y) - Math.min(touchpointarr[0].y, touchpointarr[1].y);


                            const distance = Math.sqrt(dx * dx + dy * dy);

                            dollyEnd.set(0, distance);
                            dollyDelta.subVectors(dollyEnd, dollyStart);

                            if (dollyDelta.y > 0) {

                                scope.dollyOut();

                            } else if (dollyDelta.y < 0) {

                                scope.dollyIn();

                            }

                            dollyStart.copy(dollyEnd);

                            scope.update();

                            break;
                        case 2:
                            if (scope.noPan === true) return;
                            if (state !== STATE.TOUCH_PAN) return;

                            panEnd.set(touchpointarr[0].x, touchpointarr[0].y);
                            panDelta.subVectors(panEnd, panStart);

                            scope.pan(panDelta.x, panDelta.y);

                            panStart.copy(panEnd);

                            scope.update();

                            break;
                        default:

                            state = STATE.NONE;

                    }
                }
            }
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }

        this.MSPointerUp = function (ev: any) {
            numtouchpoints--;

            ev.preventDefault();
            ev.target.style.cursor = 'default';
            if (scope.enabled === false) return;
            state = STATE.NONE;

            if (tool.started) {
                tool.started = false;
            }
        }

        this.touchstart = function (ev: any) {
            if (scope.enabled === false) return;

            ev.preventDefault();
            tool.started = true;
            //getTouchPos(canvas,ev,0);
            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                    const touchPos: any = getTouchPos(Globals.renderer.domElement, ev, 0);
                    /*var touchPos = {
                     x: ev.targetTouches[0].pageX,
                     y: ev.targetTouches[0].pageY
                     };*/

                    switch (ev.touches.length) {
                        case 1: // one-fingered touch: rotate

                            if (scope.noRotate === true) return;

                            state = STATE.TOUCH_ROTATE;

                            rotateStart.set(touchPos.x, touchPos.y);
                            break;
                        case 2: // two-fingered touch: dolly

                            if (scope.noZoom === true) return;

                            const touchPos2: any = getTouchPos(Globals.renderer.domElement, ev, 1);
                            /*var touchPos2 = {
                             x: ev.targetTouches[1].pageX,
                             y: ev.targetTouches[1].pageY
                             };*/

                            state = STATE.TOUCH_DOLLY;

                            //var dx = touchPos.x - touchPos2.x;
                            //var dy = touchPos.y - touchPos2.y;

                            const dx = Math.max(touchPos.x, touchPos2.x) - Math.min(touchPos.x, touchPos2.x);
                            const dy = Math.max(touchPos.y, touchPos2.y) - Math.min(touchPos.y, touchPos2.y);

                            const distance = Math.sqrt(dx * dx + dy * dy);
                            dollyStart.set(0, distance);
                            break;

                        case 3: // three-fingered touch: pan

                            if (scope.noPan === true) return;

                            state = STATE.TOUCH_PAN;

                            panStart.set(touchPos.x, touchPos.y);
                            break;

                        default:

                            state = STATE.NONE;

                    }

                }
            }
        }

        this.touchmove = function (ev: any) {
            if (scope.enabled === false) return;

            ev.preventDefault();
            ev.stopPropagation();
            const element = scope.domElement === document ? scope.domElement.body : scope.domElement;

            if (Globals.documentopen) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {

                    const touchPos: any = getTouchPos(Globals.renderer.domElement, ev, 0);
                    /*var touchPos = {
                     x: ev.targetTouches[0].pageX,
                     y: ev.targetTouches[0].pageY
                     };*/

                    switch (ev.touches.length) { // switch (event.touches.length) { // JS->TS:INFO changed event into ev

                        case 1: // one-fingered touch: rotate

                            if (scope.noRotate === true) return;
                            if (state !== STATE.TOUCH_ROTATE) return;

                            rotateEnd.set(touchPos.x, touchPos.y);
                            rotateDelta.subVectors(rotateEnd, rotateStart);

                            // rotating across whole screen goes 360 degrees around
                            scope.rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);
                            // rotating up and down along whole screen attempts to go 360, but limited to 180
                            scope.rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);

                            rotateStart.copy(rotateEnd);

                            scope.update();
                            break;

                        case 2: // two-fingered touch: dolly

                            const touchPos2 = getTouchPos(Globals.renderer.domElement, ev, 1);

                            /*var touchPos2 = {
                             x: ev.targetTouches[1].pageX,
                             y: ev.targetTouches[1].pageY
                             };*/

                            if (scope.noZoom === true) return;
                            if (state !== STATE.TOUCH_DOLLY) return;

                            //var dx = touchPos.x - touchPos2.x;
                            //var dy = touchPos.y - touchPos2.y;
                            const dx = Math.max(touchPos.x, touchPos2.x) - Math.min(touchPos.x, touchPos2.x);
                            const dy = Math.max(touchPos.y, touchPos2.y) - Math.min(touchPos.y, touchPos2.y);


                            const distance = Math.sqrt(dx * dx + dy * dy);

                            dollyEnd.set(0, distance);
                            dollyDelta.subVectors(dollyEnd, dollyStart);

                            if (dollyDelta.y > 0) {

                                scope.dollyOut();

                            } else if (dollyDelta.y < 0) {

                                scope.dollyIn();

                            }

                            dollyStart.copy(dollyEnd);

                            scope.update();
                            break;

                        case 3: // three-fingered touch: pan

                            if (scope.noPan === true) return;
                            if (state !== STATE.TOUCH_PAN) return;

                            panEnd.set(touchPos.x, touchPos.y);
                            panDelta.subVectors(panEnd, panStart);

                            scope.pan(panDelta.x, panDelta.y);

                            panStart.copy(panEnd);

                            scope.update();
                            break;

                        default:

                            state = STATE.NONE;

                    }
                }
            }
        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();

            if (scope.enabled === false) return;
            //scope.dispatchEvent( endEvent );
            state = STATE.NONE;
            if (tool.started) {
                tool.started = false;
            }
        }

        this.touchend = function (ev: any) {
            ev.preventDefault();

            if (scope.enabled === false) return;
            //scope.dispatchEvent( endEvent );
            state = STATE.NONE;
            if (tool.started) {
                tool.started = false;
            }
        }
    }


    // the magnify tool
    Globals.tools.magnify = function () {
        const tool = this;
        let x = 0,
            y = 0,
            w = 0,
            h = 0;
        let prevx = 0,
            prevy = 0;
        let xcur1 = 0,
            xcur2 = 0,
            ycur1 = 0,
            ycur2 = 0;
        let startx = 0,
            starty = 0,
            startx2 = 0,
            starty2 = 0,
            startw = 0,
            starth = 0;
        let startcenterx = 0,
            startcentery = 0;
        let centerx = 0,
            centery = 0;
        let prevcenterx = 0,
            prevcentery = 0;
        let prevh = 0,
            prevw = 0;
        let startdiagonal = 0;
        let prevdiagonal = 0;
        let initdiagonal = 0;
        this.name = 'magnify';
        this.anglelengthsupport = false;

        this.started = false;

        let magnificationScale = 1.5;
        const magnifyingGlassRadius = 100;
        /*var ImageGlassRadius = 100 / DocObj.pages[DocObj.currentpage].dscaleextent;

        if (DocObj.pages[DocObj.currentpage].usevectorxml) {
            ImageGlassRadius = 100 / DocObj.pages[DocObj.currentpage].dscalevector;
        }*/
        if (Globals.DocObj.pages[Globals.DocObj.currentpage].usedincomposite && Globals.DocObj.pages[Globals.DocObj.currentpage].compositereference != undefined) {
            //DocObj.pages[DocObj.currentpage].compositereference.drawmagnify(mousepos,ctx,magnificationScale);
            Globals.DocObj.pages[Globals.DocObj.currentpage].compositereference.checkPDFmagnify(magnificationScale);
        } else {
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                Globals.DocObj.pages[Globals.DocObj.currentpage].renderPDFMagnify(magnificationScale);
            }

        }

        let imageData = null;
        let mrkimageData = null;
        let scrimageData = null;
        let magimage = 1;

        this.drawMagnify = function (mousepos: any) {
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usedincomposite && Globals.DocObj.pages[Globals.DocObj.currentpage].compositereference != undefined) {
                Globals.DocObj.pages[Globals.DocObj.currentpage].compositereference.drawmagnify(mousepos, Globals.magctx, magnificationScale);
            } else {
                Globals.DocObj.pages[Globals.DocObj.currentpage].drawmagnify(mousepos, Globals.magctx, magnificationScale);
            }
        }

        this.wheel = function (ev: any) {
            if (!tool.started) {
                return;
            }

            if (Globals.documentopen) {
                let delta = 0;
                if (ev.wheelDelta !== undefined) { // WebKit / Opera / Explorer 9

                    delta = ev.wheelDelta;

                } else if (ev.deltaY !== undefined) { // Firefox
                    if (Globals.bIsMSIE) {
                        delta = -ev.deltaY;
                    } else {
                        delta = -ev.deltaY * 50;
                    }
                }
                let movey = delta;
                if (movey < 0) {
                    if (magnificationScale > 1.5) {
                        magnificationScale -= 0.2;
                    }

                } else {
                    if (magnificationScale < 10) {
                        magnificationScale += 0.2;
                    }
                }
                if (magnificationScale < 2.5) {
                    magimage = 1;
                } else {
                    magimage = 0;
                }

                let mousePos = getMousePos(Globals.canvas, ev);
                tool.x0 = mousePos.x;
                tool.y0 = mousePos.y;
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usedincomposite && Globals.DocObj.pages[Globals.DocObj.currentpage].compositereference != undefined) {
                    //DocObj.pages[DocObj.currentpage].compositereference.drawmagnify(mousepos,ctx,magnificationScale);
                    Globals.DocObj.pages[Globals.DocObj.currentpage].compositereference.checkPDFmagnify(magnificationScale);
                } else {
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                        Globals.DocObj.pages[Globals.DocObj.currentpage].renderPDFMagnify(magnificationScale);
                    }

                }
                tool.drawMagnify({ x: tool.x0, y: tool.y0 }, Globals.magctx, magnificationScale);

            }
        }

        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }

        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            tool.started = true;
            tool.x0 = mousePos.x;
            tool.y0 = mousePos.y;
            prevx = tool.x0;
            prevy = tool.y0;
            Globals.magcanvas.style.top = mousePos.y - (Globals.magcanvas.height / 2) + "px";
            Globals.magcanvas.style.left = mousePos.x - (Globals.magcanvas.width / 2) + "px";
            Globals.magcanvas.style.visibility = 'visible';
        }

        this.mousedown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            tool.started = true;
            let mousePos = getMousePos(Globals.canvas, ev);
            tool.x0 = mousePos.x;
            tool.y0 = mousePos.y;
            prevx = tool.x0;
            prevy = tool.y0;

            Globals.magcanvas.style.top = mousePos.y - (Globals.magcanvas.height / 2) + "px";
            Globals.magcanvas.style.left = mousePos.x - (Globals.magcanvas.width / 2) + "px";
            Globals.magcanvas.style.visibility = 'visible';
        }

        this.touchstart = function (ev: any) {
            ev.preventDefault();
            tool.started = true;
            //var touchPos = getTouchPos(canvas,ev,0);
            const touchPos0 = getTouchPos(Globals.canvas, ev, 0);
            let touchPos1: any;
            if (ev.targetTouches.length > 1) {
                touchPos1 = getTouchPos(Globals.canvas, ev, 1);
            } else {
                touchPos1 = getTouchPos(Globals.canvas, ev, 0);
            }

            startx = touchPos0.x;
            starty = touchPos0.y;
            startx2 = touchPos1.x;
            starty2 = touchPos1.y;

            startw = Math.abs(startx2 - startx);
            starth = Math.abs(starty2 - starty);

            const startwsq = Math.pow(startw, 2);
            const starthsq = Math.pow(starth, 2);

            startdiagonal = Math.sqrt((startwsq + starthsq));
            prevdiagonal = startdiagonal;
            initdiagonal = startdiagonal;

            startcenterx = startx + (startw / 2);
            startcentery = starty + (starth / 2);
            prevcenterx = startcenterx;
            prevcentery = startcentery;

            const canvcenterx = touchPos0.x + (Globals.magcanvas.width / 2);
            const canvcentery = touchPos0.y - (Globals.magcanvas.height / 2);
            //magcanvas.style.top = startcentery - (magcanvas.height / 2) + "px";
            //magcanvas.style.left = startcenterx - (magcanvas.width / 2) + "px";
            Globals.magcanvas.style.top = touchPos0.y - Globals.magcanvas.height + "px";
            Globals.magcanvas.style.left = touchPos0.x + "px";
            Globals.magcanvas.style.visibility = 'visible';

            tool.drawMagnify({ x: canvcenterx, y: canvcentery });
        }

        this.MSPointerMove = function (ev: any) {
            if (!tool.started) {
                return;
            }
            const mousePos = getMousePos(Globals.canvas, ev);
            const xdiff = prevx - mousePos.x;
            const ydiff = prevy - mousePos.y;

            Globals.magcanvas.style.top = mousePos.y - (Globals.magcanvas.height / 2) + "px";
            Globals.magcanvas.style.left = mousePos.x - (Globals.magcanvas.width / 2) + "px";

            tool.drawMagnify(mousePos);
            prevx = mousePos.x;
            prevy = mousePos.y;
        }

        this.mousemove = function (ev: any) {
            if (!tool.started) {
                return;
            }
            const mousePos = getMousePos(Globals.canvas, ev);
            const xdiff = prevx - mousePos.x;
            const ydiff = prevy - mousePos.y;

            Globals.magcanvas.style.top = mousePos.y - (Globals.magcanvas.height / 2) + "px";
            Globals.magcanvas.style.left = mousePos.x - (Globals.magcanvas.width / 2) + "px";

            tool.drawMagnify(mousePos);

            prevx = mousePos.x;
            prevy = mousePos.y;

        }

        this.touchmove = function (ev: any) {
            ev.preventDefault();
            if (!tool.started) {
                return;
            }
            //var touchPos = getTouchPos(canvas,ev,0);
            const touchPos0 = getTouchPos(Globals.canvas, ev, 0);
            let touchPos1: any;
            if (ev.targetTouches.length > 1) {
                touchPos1 = getTouchPos(Globals.canvas, ev, 1);
            } else {
                touchPos1 = getTouchPos(Globals.canvas, ev, 0);
            }

            xcur1 = touchPos0.x;
            ycur1 = touchPos0.y;
            xcur2 = touchPos1.x;
            ycur2 = touchPos1.y;

            x = Math.min(xcur1, xcur2);
            y = Math.min(ycur1, ycur2);
            w = Math.abs(xcur2 - xcur1);
            h = Math.abs(ycur2 - ycur1);


            centerx = x + (w / 2);
            centery = y + (h / 2);

            const canvcenterx = touchPos0.x + (Globals.magcanvas.width / 2);
            const canvcentery = touchPos0.y - (Globals.magcanvas.height / 2);

            //magcanvas.style.top = centery - (magcanvas.height / 2) + "px";
            //magcanvas.style.left = centerx - (magcanvas.width / 2) + "px";
            Globals.magcanvas.style.top = touchPos0.y - Globals.magcanvas.height + "px";
            Globals.magcanvas.style.left = touchPos0.x + "px";

            tool.drawMagnify({ x: canvcenterx, y: canvcentery });

            const startwsq = Math.pow(w, 2);
            const starthsq = Math.pow(h, 2);

            startdiagonal = Math.sqrt((startwsq + starthsq));

            const diffwidth = prevdiagonal - startdiagonal;

            if (initdiagonal >= startdiagonal) {
                magnificationScale = 1.5;
            } else {
                if (diffwidth > 0) {
                    if (magnificationScale > 1.5) {
                        magnificationScale -= 0.2;
                    }

                } else {
                    if (magnificationScale < 10) {
                        magnificationScale += 0.2;
                    }
                }

            }

            prevdiagonal = startdiagonal;

            prevcenterx = centerx;
            prevcentery = centery;
            prevw = w;
            prevh = h;
            //prevx = touchPos.x;
            //prevy = touchPos.y;

        }

        this.MSPointerUp = function (ev: any) {
            ev.target.style.cursor = 'default';
            if (tool.started) {
                tool.mousemove(ev);
                tool.started = false;
                //tool.eraseMagnifyingGlass();
                Globals.magcanvas.style.visibility = 'hidden';
                imageData = null;
                scrimageData = null;
                mrkimageData = null;

                Globals.DocObj.pages[Globals.DocObj.currentpage].magnifyoff();

                drawmarkupAll(Globals.cntximg);
            }
        }

        this.mouseup = function (ev: any) {
            ev.target.style.cursor = 'default';
            if (tool.started) {
                tool.mousemove(ev);
                tool.started = false;
                //tool.eraseMagnifyingGlass();
                Globals.magcanvas.style.visibility = 'hidden';
                imageData = null;
                scrimageData = null;
                mrkimageData = null;

                Globals.DocObj.pages[Globals.DocObj.currentpage].magnifyoff();

                drawmarkupAll(Globals.cntximg);

            }
        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();
            /*if(ev.targetTouches.length > 1){
             var touchPos1 = getTouchPos(canvas, ev, 1);
             }else{
             touchPos1 = getTouchPos(canvas, ev, 0);
             }*/

            if (tool.started && ev.targetTouches.length < 1) {
                //tool.touchmove(ev);
                tool.started = false;
                //tool.eraseMagnifyingGlass();
                Globals.magcanvas.style.visibility = 'hidden';
                imageData = null;
                scrimageData = null;
                mrkimageData = null;

                Globals.DocObj.pages[Globals.DocObj.currentpage].magnifyoff();

                drawmarkupAll(Globals.cntximg);

            }
        }

        this.touchend = function (ev: any) {
            ev.preventDefault();
            /*if(ev.targetTouches.length > 1){
             var touchPos1 = getTouchPos(canvas, ev, 1);
             }else{
             touchPos1 = getTouchPos(canvas, ev, 0);
             }*/

            if (tool.started && ev.targetTouches.length < 1) {
                //tool.touchmove(ev);
                tool.started = false;
                //tool.eraseMagnifyingGlass();
                Globals.magcanvas.style.visibility = 'hidden';
                imageData = null;
                scrimageData = null;
                mrkimageData = null;

                Globals.DocObj.pages[Globals.DocObj.currentpage].magnifyoff();

                drawmarkupAll(Globals.cntximg);

            }
        }
    }

    // the note tool
    Globals.tools.note = function () {
        const tool = this;
        const prevx = 0,
            prevy = 0;
        this.started = false;
        this.name = 'note';
        this.anglelengthsupport = false;

        //ft 08.08.2018 changed from separate index to direct array length
        //var curmarkup = DocObj.nummarkups;
        let curmarkup = Globals.DocObj.markuplist.length;
        let notemarkupobj;

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.MSPointerDown = function (ev: any) {
            tool.started = true;
            if (Globals.DocObj) {
                Globals.DocObj.bMarkupchanged = true;
            }

            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                return;
            }

            tool.x0 = mousePos.x;
            tool.y0 = mousePos.y;

            notemarkupobj = new MarkupObject(10, 0, 0);
            notemarkupobj.pagenumber = Globals.DocObj.getcurPage();
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                notemarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                notemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                notemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                notemarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                notemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                notemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                notemarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                notemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                notemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }

            notemarkupobj.x = tool.x0;
            notemarkupobj.y = tool.y0;
            notemarkupobj.editaction = 0;

            notemarkupobj.drawme(Globals.context);
            notemarkupobj.savemetolistDraw();
            //TempID = notemarkupobj.markupnumber;
            //ft 08.08.2018 changed from markupnumber to array length
            //DocObj.selectedmarkup.id = notemarkupobj.markupnumber;
            Globals.DocObj.selectedmarkup.id = Globals.DocObj.markuplist.length - 1;

            if (!Globals.bMultimarkupadd) {
                Globals.bMarkupcrated = true;
                //ft 08.08.2018 changed from separate index to direct array length
                Globals.nMarkupcreated = Globals.DocObj.markuplist.length - 1;
                //nMarkupcreated = notemarkupobj.markupnumber;
            }

            img_update();
            tool.started = false;
            notemarkupobj = null;
            //setNContent(DocObj.markuplist[TempID].text);
            //showNDialog(false);
            if (RxCore_GUI_Notediag != undefined) {
                RxCore_GUI_Notediag.setNotediag(Globals.DocObj.markuplist[Globals.nMarkupcreated].text, true);
            }
            if (!Globals.bMultimarkupadd) {
                if (RxCore_GUI_Markup != undefined) {
                    //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                    const operation = { created: true, modified: false, deleted: false };
                    RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                }

            }

        }

        this.mousedown = function (ev: any) {
            tool.started = true;
            if (Globals.DocObj) {
                Globals.DocObj.bMarkupchanged = true;
            }

            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }
                return;
            }

            tool.x0 = mousePos.x;
            tool.y0 = mousePos.y;

            notemarkupobj = new MarkupObject(10, 0, 0);
            notemarkupobj.pagenumber = Globals.DocObj.getcurPage();
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                notemarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                notemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                notemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                notemarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                notemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                notemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                notemarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                notemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                notemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }
            notemarkupobj.x = tool.x0;
            notemarkupobj.y = tool.y0;
            notemarkupobj.editaction = 0;

            notemarkupobj.drawme(Globals.context);
            notemarkupobj.savemetolistDraw();

            //ft 08.08.2018 changed from markupnumber to array length
            //DocObj.selectedmarkup.id = notemarkupobj.markupnumber;
            Globals.DocObj.selectedmarkup.id = Globals.DocObj.markuplist.length - 1;
            //nMarkupcreated = notemarkupobj.markupnumber;
            Globals.nMarkupcreated = Globals.DocObj.markuplist.length - 1;
            if (!Globals.bMultimarkupadd) {
                Globals.bMarkupcrated = true;
                //ft 08.08.2018 changed from separate index to direct array length
                Globals.nMarkupcreated = Globals.DocObj.markuplist.length - 1;
                //nMarkupcreated = notemarkupobj.markupnumber;
            }

            img_update();
            tool.started = false;
            notemarkupobj = null;
            if (RxCore_GUI_Notediag != undefined) {
                RxCore_GUI_Notediag.setNotediag(Globals.DocObj.markuplist[Globals.nMarkupcreated].text, true);
            }
            if (!Globals.bMultimarkupadd) {
                if (RxCore_GUI_Markup != undefined) {
                    //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                    const operation = { created: true, modified: false, deleted: false };
                    RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                }

            }
            //setNContent(DocObj.markuplist[TempID].text);
            //showNDialog(false);
        }

        this.touchstart = function (ev: any) {
            tool.started = true;
            if (Globals.DocObj) {
                Globals.DocObj.bMarkupchanged = true;
            }

            const touchPos = getTouchPos(Globals.canvas, ev, 0);

            const bWithin = MousePosdrwext(touchPos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                return;
            }

            tool.x0 = touchPos.x;
            tool.y0 = touchPos.y;
            notemarkupobj = new MarkupObject(10, 0, 0);
            notemarkupobj.pagenumber = Globals.DocObj.getcurPage();
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                notemarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                notemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                notemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                notemarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                notemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                notemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                notemarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                notemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                notemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }

            notemarkupobj.x = tool.x0;
            notemarkupobj.y = tool.y0;
            notemarkupobj.editaction = 0;

            notemarkupobj.drawme(Globals.context);
            notemarkupobj.savemetolistDraw();

            //ft 08.08.2018 changed from markupnumber to array length
            //DocObj.selectedmarkup.id = notemarkupobj.markupnumber;
            Globals.DocObj.selectedmarkup.id = Globals.DocObj.markuplist.length - 1;


            if (!Globals.bMultimarkupadd) {

                Globals.bMarkupcrated = true;
                //ft 08.08.2018 changed from separate index to direct array length
                Globals.nMarkupcreated = Globals.DocObj.markuplist.length - 1;
                //nMarkupcreated = notemarkupobj.markupnumber;
            }

            img_update();
            tool.started = false;
            notemarkupobj = null;
            //setNContent(DocObj.markuplist[TempID].text);
            //showNDialog(false);

            if (RxCore_GUI_Notediag != undefined) {
                RxCore_GUI_Notediag.setNotediag(Globals.DocObj.markuplist[Globals.nMarkupcreated].text, true);
            }

            if (!Globals.bMultimarkupadd) {
                if (RxCore_GUI_Markup != undefined) {
                    //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                    const operation = { created: true, modified: false, deleted: false };
                    RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                }

            }

        };

        // TODO:JS->TS:CHECK empty method
        this.mouseup = function (ev: any) {

        }

        // TODO:JS->TS:CHECK empty method
        this.touchend = function (ev: any) {

        }
    }


    // the text tool
    Globals.tools.text = function () {
        const tool = this;
        let blinker;
        this.name = 'text';
        this.anglelengthsupport = false;

        this.started = false;
        //ft 08.08.2018 changed from separate index to direct array length
        //var curmarkup = DocObj.nummarkups;
        const curmarkup = Globals.DocObj.markuplist.length;
        let textmarkupobj;

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'text';

            //Draw blinking "cursor" centered on coordinates.
            tool.started = true;

            if (Globals.DocObj) {
                Globals.DocObj.bMarkupchanged = true;
            }

            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }
                ev.target.style.cursor = 'default';
                return;
            }

            tool.x0 = mousePos.x;
            tool.y0 = mousePos.y;
            textmarkupobj = new MarkupObject(9, 0, 0);
            textmarkupobj.pagenumber = Globals.DocObj.getcurPage();
            textmarkupobj.font.setFontname(Globals.defaultFont.fontName);
            //textmarkupobj.fontname = fontstylevalue;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                textmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                textmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                textmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                textmarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                textmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                textmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                textmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                textmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                textmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }

            textmarkupobj.x = tool.x0;
            textmarkupobj.y = tool.y0;
            textmarkupobj.editaction = 0;
            const markuptext = "";
            textmarkupobj.text = markuptext;

            textmarkupobj.savemetolistDraw();
            Globals.DocObj.selectedmarkup.id = textmarkupobj.markupnumber;
            //img_update();
            tool.started = false;
            textmarkupobj = null;
            if (RxCore_GUI_Textdiag != undefined) {
                RxCore_GUI_Textdiag.setTextdiag("");
            }

            //setTextContent(DocObj.markuplist[TempID].text);
            //showTextDialog(false);


            /*markuptext = prompt("Enter markup text","");
             if (markuptext != null && markuptext != ""){
             textmarkupobj.text = markuptext;
             textmarkupobj.drawme(context);
             textmarkupobj.savemetolist();
             img_update();
             tool.started = false;
             textmarkupobj = null;
             }*/

        }

        this.mousedown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'text';

            /*context.beginPath();
             context.moveTo(ev._x, ev._y);
             context.strokeStyle = "red";*/
            //Draw blinking "cursor" centered on coordinates.
            tool.started = true;
            if (Globals.DocObj) {
                Globals.DocObj.bMarkupchanged = true;
            }

            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                ev.target.style.cursor = 'default';
                return;
            }

            tool.x0 = mousePos.x;
            tool.y0 = mousePos.y;
            textmarkupobj = new MarkupObject(9, 0, 0);
            textmarkupobj.pagenumber = Globals.DocObj.getcurPage();
            textmarkupobj.font.setFontname(Globals.defaultFont.fontName);
            //textmarkupobj.fontname = fontstylevalue;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                textmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                textmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                textmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                textmarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                textmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                textmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                textmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                textmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                textmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }

            textmarkupobj.x = tool.x0;
            textmarkupobj.y = tool.y0;
            textmarkupobj.editaction = 0;

            const markuptext = "";

            textmarkupobj.savemetolistDraw();
            Globals.DocObj.selectedmarkup.id = textmarkupobj.markupnumber;
            //img_update();
            tool.started = false;
            textmarkupobj = null;
            if (RxCore_GUI_Textdiag != undefined) {
                RxCore_GUI_Textdiag.setTextdiag("");
            }

            //markuptext = prompt("Enter markup text","");

            /*if (markuptext != null && markuptext != ""){
             textmarkupobj.text = markuptext;
             textmarkupobj.drawme(context);
             textmarkupobj.savemetolist();
             img_update();
             tool.started = false;
             textmarkupobj = null;
             }*/

        }

        this.touchstart = function (ev: any) {
            tool.started = true;
            if (Globals.DocObj) {
                Globals.DocObj.bMarkupchanged = true;
            }

            const touchPos = getTouchPos(Globals.canvas, ev, 0);

            const bWithin = MousePosdrwext(touchPos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                return;
            }

            tool.x0 = touchPos.x;
            tool.y0 = touchPos.y;
            textmarkupobj = new MarkupObject(9, 0, 0);
            textmarkupobj.pagenumber = Globals.DocObj.getcurPage();
            textmarkupobj.font.setFontname(Globals.defaultFont.fontName);
            //textmarkupobj.fontname = fontstylevalue;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                textmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                textmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                textmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                textmarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                textmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                textmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                textmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                textmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                textmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }

            textmarkupobj.x = tool.x0;
            textmarkupobj.y = tool.y0;
            textmarkupobj.editaction = 0;

            const markuptext = "";

            textmarkupobj.savemetolistDraw();
            Globals.DocObj.selectedmarkup.id = textmarkupobj.markupnumber;
            //img_update();
            tool.started = false;
            textmarkupobj = null;
            if (RxCore_GUI_Textdiag != undefined) {
                RxCore_GUI_Textdiag.setTextdiag("");
            }


            /*var markuptext = prompt("Enter markup text","");
             if (markuptext != null && markuptext != ""){
             textmarkupobj.text = markuptext;
             textmarkupobj.drawme(context);
             textmarkupobj.savemetolist();
             img_update();
             tool.started = false;
             textmarkupobj = null;
             }*/
        }



        // This is called when you release the mouse button.
        this.mouseup = function (ev: any) {
            if (tool.started) {

            }
        }

        this.touchend = function (ev: any) {

        }
    }


    // The drawing pencil.
    Globals.tools.pencil = function (params: any) {
        const tool = this;
        this.started = false;
        this.name = 'pencil';
        this.anglelengthsupport = false;

        this.draw = false;
        //ft 08.08.2018 changed from separate index to direct array length
        //var curmarkup = DocObj.nummarkups;
        const curmarkup = Globals.DocObj.markuplist.length;
        let pencilmarkupobj: any;
        let numlines = 0;
        const subtype = params.p1

        this.newpencil = function (subtype: any, mousePos: any) {

            pencilmarkupobj = new MarkupObject(0, subtype, 0);
            pencilmarkupobj.pagenumber = Globals.DocObj.getcurPage();
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                pencilmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                pencilmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                pencilmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                pencilmarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                pencilmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                pencilmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                pencilmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                pencilmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                pencilmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }

            pencilmarkupobj.x = mousePos.x;
            pencilmarkupobj.y = mousePos.y;
            pencilmarkupobj.editaction = 0;
        }

        // This is called when you start holding down the mouse button.
        // This starts the pencil drawing.
        this.mousedown = function (ev: any) {
            const mousePos = getMousePos(Globals.canvas, ev);
            tool.draw = true;

            if (numlines == 0) {
                tool.newpencil(subtype, mousePos);
                tool.started = true;
                pencilmarkupobj.addpoint(mousePos.x, mousePos.y);
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = true;
                }

                pencilmarkupobj.startdraw(Globals.context);

            } else {
                pencilmarkupobj.addline();
                tool.started = true;
                pencilmarkupobj.addpoint(mousePos.x, mousePos.y);
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = true;
                }

                pencilmarkupobj.startdraw(Globals.context);

            }
            numlines++;

            // if (subtype == 1) {
            //     pencilmarkupobj.linewidth = 2;
            // }

            /*pencilmarkupobj.pagenumber = DocObj.currentpage;
            if (DocObj.pages[DocObj.currentpage].usevectorxml) {
                pencilmarkupobj.scaling = DocObj.pages[DocObj.currentpage].dscalevector;
                pencilmarkupobj.xoffset = DocObj.pages[DocObj.currentpage].dxvector;
                pencilmarkupobj.yoffset = DocObj.pages[DocObj.currentpage].dyvector;
            } else if (DocObj.pages[DocObj.currentpage].usepdfjs) {
                pencilmarkupobj.scaling = (DocObj.pages[DocObj.currentpage].curpagescale * DocObj.pages[DocObj.currentpage].dscalepdf);
                pencilmarkupobj.xoffset = DocObj.pages[DocObj.currentpage].dxpdf;
                pencilmarkupobj.yoffset = DocObj.pages[DocObj.currentpage].dypdf;

            } else {
                pencilmarkupobj.scaling = DocObj.pages[DocObj.currentpage].dscale;
                pencilmarkupobj.xoffset = DocObj.pages[DocObj.currentpage].dx;
                pencilmarkupobj.yoffset = DocObj.pages[DocObj.currentpage].dy;

            }*/

            //var mousePos = getMousePos(canvas, ev);
            /*pencilmarkupobj.x = mousePos.x;
            pencilmarkupobj.y = mousePos.y;
            pencilmarkupobj.editaction = 0;

            pencilmarkupobj.addpoint(mousePos.x, mousePos.y);
            tool.started = true;
            DocObj.bMarkupchanged = true;
            pencilmarkupobj.startdraw(context);*/
            //context.beginPath();
            //context.moveTo(pencilmarkupobj.x, pencilmarkupobj.y);
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.MSPointerDown = function (ev: any) {
            const mousePos = getMousePos(Globals.canvas, ev);
            tool.draw = true;
            if (numlines == 0) {
                tool.newpencil(subtype, mousePos);
                tool.started = true;
                pencilmarkupobj.addpoint(mousePos.x, mousePos.y);
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = true;
                }

                pencilmarkupobj.startdraw(Globals.context);


            } else {
                pencilmarkupobj.addline();
                tool.started = true;
                pencilmarkupobj.addpoint(mousePos.x, mousePos.y);
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = true;
                }

                pencilmarkupobj.startdraw(Globals.context);

            }
            numlines++;
            //pencilmarkupobj = new MarkupObject(0, subtype, 0);
            // if (subtype == 1) {
            //       pencilmarkupobj.linewidth = 2;
            //   }

            /*pencilmarkupobj.pagenumber = DocObj.currentpage;
            if (DocObj.pages[DocObj.currentpage].usevectorxml) {
                pencilmarkupobj.scaling = DocObj.pages[DocObj.currentpage].dscalevector;
                pencilmarkupobj.xoffset = DocObj.pages[DocObj.currentpage].dxvector;
                pencilmarkupobj.yoffset = DocObj.pages[DocObj.currentpage].dyvector;
            } else if (DocObj.pages[DocObj.currentpage].usepdfjs) {
                pencilmarkupobj.scaling = (DocObj.pages[DocObj.currentpage].curpagescale * DocObj.pages[DocObj.currentpage].dscalepdf);
                pencilmarkupobj.xoffset = DocObj.pages[DocObj.currentpage].dxpdf;
                pencilmarkupobj.yoffset = DocObj.pages[DocObj.currentpage].dypdf;

            } else {
                pencilmarkupobj.scaling = DocObj.pages[DocObj.currentpage].dscale;
                pencilmarkupobj.xoffset = DocObj.pages[DocObj.currentpage].dx;
                pencilmarkupobj.yoffset = DocObj.pages[DocObj.currentpage].dy;

            }*/

            /* var mousePos = getMousePos(canvas, ev);
             pencilmarkupobj.x = mousePos.x;
             pencilmarkupobj.y = mousePos.y;
             pencilmarkupobj.editaction = 0;
             pencilmarkupobj.addpoint(mousePos.x, mousePos.y);
             tool.started = true;
             DocObj.bMarkupchanged = true;
             pencilmarkupobj.startdraw(context);*/

        }

        // This function is called every time you move the mouse. Obviously, it only
        // draws if the tool.started state is set to true (when you are holding down
        // the mouse button).
        this.mousemove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            if (tool.started && tool.draw) {
                pencilmarkupobj.addpoint(mousePos.x, mousePos.y);
                pencilmarkupobj.drawme(Globals.context);
                //context.lineTo(ev._x, ev._y);
                //context.stroke();
            }
        }

        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.MSPointerMove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            if (tool.started && tool.draw) {
                pencilmarkupobj.addpoint(mousePos.x, mousePos.y);
                pencilmarkupobj.drawme(Globals.context);
            }
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }

        this.MSPointerUp = function (ev: any) {
            ev.preventDefault();
            tool.draw = false;
            /*if (tool.started) {
                tool.mousemove(ev);
                tool.started = false;
                pencilmarkupobj.findrectangle();
                pencilmarkupobj.savemetolist();
                pencilmarkupobj = null;

                img_update();
            }*/
        }

        // This is called when you release the mouse button.
        this.mouseup = function (ev: any) {
            ev.preventDefault();
            tool.draw = false;
            /*if (tool.started) {
                tool.mousemove(ev);
                tool.started = false;
                pencilmarkupobj.findrectangle();
                pencilmarkupobj.savemetolist();
                pencilmarkupobj = null;

                img_update();
            }*/
        }

        this.touchstart = function (ev: any) {
            ev.preventDefault();
            tool.draw = true;
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            if (numlines == 0) {
                tool.newpencil(subtype, touchPos);
                tool.started = true;
                pencilmarkupobj.addpoint(touchPos.x, touchPos.y);
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = true;
                }

                pencilmarkupobj.startdraw(Globals.context);


            } else {
                pencilmarkupobj.addline();
                tool.started = true;
                pencilmarkupobj.addpoint(touchPos.x, touchPos.y);
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = true;
                }

                pencilmarkupobj.startdraw(Globals.context);

            }
            numlines++;


            /*if (numlines == 0){
                pencilmarkupobj = new MarkupObject(0, subtype, 0);
                pencilmarkupobj.pagenumber = DocObj.currentpage;
                if (DocObj.pages[DocObj.currentpage].usevectorxml) {
                    pencilmarkupobj.scaling = DocObj.pages[DocObj.currentpage].dscalevector;
                    pencilmarkupobj.xoffset = DocObj.pages[DocObj.currentpage].dxvector;
                    pencilmarkupobj.yoffset = DocObj.pages[DocObj.currentpage].dyvector;
                } else if (DocObj.pages[DocObj.currentpage].usepdfjs) {
                    pencilmarkupobj.scaling = (DocObj.pages[DocObj.currentpage].curpagescale * DocObj.pages[DocObj.currentpage].dscalepdf);
                    pencilmarkupobj.xoffset = DocObj.pages[DocObj.currentpage].dxpdf;
                    pencilmarkupobj.yoffset = DocObj.pages[DocObj.currentpage].dypdf;

                } else {
                    pencilmarkupobj.scaling = DocObj.pages[DocObj.currentpage].dscale;
                    pencilmarkupobj.xoffset = DocObj.pages[DocObj.currentpage].dx;
                    pencilmarkupobj.yoffset = DocObj.pages[DocObj.currentpage].dy;

                }

                pencilmarkupobj.x = touchPos.x;
                pencilmarkupobj.y = touchPos.y;
                pencilmarkupobj.editaction = 0;
            }else{
                pencilmarkupobj.addline();
            }
            numlines++;*/

            //pencilmarkupobj = new MarkupObject(0, subtype, 0);
            // if (subtype == 1) {
            //            pencilmarkupobj.linewidth = 2;
            //        }

            /*pencilmarkupobj.addpoint(touchPos.x, touchPos.y);
            tool.started = true;
            DocObj.bMarkupchanged = true;
            pencilmarkupobj.startdraw(context);*/

            //context.strokeStyle = "red";
            //context.beginPath();
            //context.moveTo(ev.targetTouches[0].pageX - canvas.offsetLeft, ev.targetTouches[0].pageY - canvas.offsetTop - bannerheight);
            //tool.started = true;

        }

        this.touchmove = function (ev: any) {
            ev.preventDefault();
            if (tool.started && tool.draw) {
                const touchPos = getTouchPos(Globals.canvas, ev, 0);
                pencilmarkupobj.addpoint(touchPos.x, touchPos.y);
                pencilmarkupobj.drawme(Globals.context);

                //context.lineTo(, );
                //context.stroke();
            }
        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();
            tool.draw = false;
        }

        this.touchend = function (ev: any) {
            ev.preventDefault();
            tool.draw = false;
            /*if (tool.started) {
                //add new function to add current pointarray to existing
                //pencilmakrupobject.

                pencilmarkupobj.findrectangle();
                pencilmarkupobj.savemetolist();
                img_update();
                //alert("touchend");
                //tool.touchmove(ev);
                tool.started = false;

                pencilmarkupobj = null;
            }*/
        }

        this.apply = function () {
            tool.draw = false;
            if (!Globals.bMultimarkupadd) {
                Globals.bMarkupcrated = true;
                //ft 08.08.2018 changed from separate index to direct array length
                //nMarkupcreated = DocObj.nummarkups;
                Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
            }

            pencilmarkupobj.addline();
            pencilmarkupobj.findrectangle();
            pencilmarkupobj.savemetolistDraw();
            img_update();
            tool.started = false;
            pencilmarkupobj = null;

            if (!Globals.bMultimarkupadd) {
                //need to move to connection object.
                //markupcreated();
                if (RxCore_GUI_Markup != undefined) {
                    //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                    const operation = { created: true, modified: false, deleted: false };
                    RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                }

            }
        }
    }


    // The marker tool.
    Globals.tools.marker = function () {
        const tool = this;
        let prevx = 0,
            prevy = 0;
        let markermarkupobj: any;
        //ft 08.08.2018 changed from separate index to direct array length
        //var curmarkup = DocObj.nummarkups;
        const curmarkup = Globals.DocObj.markuplist.length;

        this.started = false;
        this.name = 'marker';
        this.anglelengthsupport = false;

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }

        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            tool.started = true;
            if (Globals.DocObj) {
                Globals.DocObj.bMarkupchanged = true;
            }

            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                ev.target.style.cursor = 'default';
                return;
            }

            tool.x0 = mousePos.x;
            tool.y0 = mousePos.y;
            markermarkupobj = new MarkupObject(3, 3, 0);
            //markermarkupobj.fillcolor = "rgba(255, 255, 0, 0.3)";
            markermarkupobj.transparency = 30;
            markermarkupobj.fillcolor = setTransp(markermarkupobj.fillcolor, markermarkupobj.transparency);
            //var markercolor = "rgba(255, 255, 0, 0.3)";
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                markermarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                markermarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                markermarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                markermarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                markermarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                markermarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                markermarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                markermarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                markermarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }
            markermarkupobj.pagenumber = Globals.DocObj.getcurPage();
            markermarkupobj.editaction = 0;

        }

        this.mousedown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            tool.started = true;
            if (Globals.DocObj) {
                Globals.DocObj.bMarkupchanged = true;
            }

            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                ev.target.style.cursor = 'default';
                return;
            }

            tool.x0 = mousePos.x;
            tool.y0 = mousePos.y;
            markermarkupobj = new MarkupObject(3, 3, 0);
            //markermarkupobj.fillcolor = "rgba(255, 255, 0, 0.3)";
            markermarkupobj.transparency = 30;
            markermarkupobj.fillcolor = setTransp(markermarkupobj.fillcolor, markermarkupobj.transparency);
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                markermarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                markermarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                markermarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                markermarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                markermarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                markermarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                markermarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                markermarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                markermarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }

            markermarkupobj.pagenumber = Globals.DocObj.getcurPage();
            markermarkupobj.editaction = 0;
        }

        this.touchstart = function (ev: any) {
            ev.preventDefault();
            tool.started = true;
            if (Globals.DocObj) {
                Globals.DocObj.bMarkupchanged = true;
            }

            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const bWithin = MousePosdrwext(touchPos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                return;
            }

            tool.x0 = touchPos.x;
            tool.y0 = touchPos.y;

            markermarkupobj = new MarkupObject(3, 3, 0);
            //markermarkupobj.fillcolor = "rgba(255, 255, 0, 0.3)";
            markermarkupobj.transparency = 30;
            markermarkupobj.fillcolor = setTransp(markermarkupobj.fillcolor, markermarkupobj.transparency);
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                markermarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                markermarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                markermarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                markermarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                markermarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                markermarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                markermarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                markermarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                markermarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }

            markermarkupobj.pagenumber = Globals.DocObj.getcurPage();
            markermarkupobj.editaction = 0;

        }

        this.MSPointerMove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';

            if (!tool.started) {
                return;
            }
            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);

            let x, y, w, h;
            if (bWithin || !Globals.bLimMarkupExtent) {
                x = Math.min(mousePos.x, tool.x0);
                y = Math.min(mousePos.y, tool.y0);
                w = Math.abs(mousePos.x - tool.x0);
                h = Math.abs(mousePos.y - tool.y0);

                prevx = mousePos.x;
                prevy = mousePos.y;

            } else {
                x = Math.min(prevx, tool.x0);
                y = Math.min(prevy, tool.y0);
                w = Math.abs(prevx - tool.x0);
                h = Math.abs(prevy - tool.y0);

            }

            /*var x = Math.min(mousePos.x,  tool.x0),
             y = Math.min(mousePos.y,  tool.y0),
             w = Math.abs(mousePos.x - tool.x0),
             h = Math.abs(mousePos.y - tool.y0);*/
            markermarkupobj.x = x;
            markermarkupobj.y = y;
            markermarkupobj.w = w;
            markermarkupobj.h = h;

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

            if (!w || !h) {
                return;
            }

            markermarkupobj.drawme(Globals.context);

        }

        this.mousemove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';

            if (!tool.started) {
                return;
            }
            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);

            let x, y, w, h;
            if (bWithin || !Globals.bLimMarkupExtent) {
                x = Math.min(mousePos.x, tool.x0);
                y = Math.min(mousePos.y, tool.y0);
                w = Math.abs(mousePos.x - tool.x0);
                h = Math.abs(mousePos.y - tool.y0);

                prevx = mousePos.x;
                prevy = mousePos.y;

            } else {
                x = Math.min(prevx, tool.x0);
                y = Math.min(prevy, tool.y0);
                w = Math.abs(prevx - tool.x0);
                h = Math.abs(prevy - tool.y0);

            }

            /*var x = Math.min(mousePos.x,  tool.x0),
             y = Math.min(mousePos.y,  tool.y0),
             w = Math.abs(mousePos.x - tool.x0),
             h = Math.abs(mousePos.y - tool.y0);*/
            markermarkupobj.x = x;
            markermarkupobj.y = y;
            markermarkupobj.w = w;
            markermarkupobj.h = h;

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

            if (!w || !h) {
                return;
            }

            markermarkupobj.drawme(Globals.context);

        }

        this.touchmove = function (ev: any) {
            ev.preventDefault();
            if (!tool.started) {
                return;
            }
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const bWithin = MousePosdrwext(touchPos);

            let x, y, w, h;
            if (bWithin || !Globals.bLimMarkupExtent) {
                x = Math.min(touchPos.x, tool.x0);
                y = Math.min(touchPos.y, tool.y0);
                w = Math.abs(touchPos.x - tool.x0);
                h = Math.abs(touchPos.y - tool.y0);

                prevx = touchPos.x;
                prevy = touchPos.y;

            } else {
                x = Math.min(prevx, tool.x0);
                y = Math.min(prevy, tool.y0);
                w = Math.abs(prevx - tool.x0);
                h = Math.abs(prevy - tool.y0);

            }

            /*var x = Math.min(touchPos.x,  tool.x0),
             y = Math.min(touchPos.y,  tool.y0),
             w = Math.abs(touchPos.x - tool.x0),
             h = Math.abs(touchPos.y - tool.y0);*/
            markermarkupobj.x = x;
            markermarkupobj.y = y;
            markermarkupobj.w = w;
            markermarkupobj.h = h;


            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

            if (!w || !h) {
                return;
            }
            markermarkupobj.drawme(Globals.context);
        }

        this.MSPointerUp = function (ev: any) {
            ev.target.style.cursor = 'default';
            if (tool.started) {
                tool.mousemove(ev);

                if (!Globals.bMultimarkupadd) {

                    Globals.bMarkupcrated = true;
                    //ft 08.08.2018 changed from separate index to direct array length
                    //nMarkupcreated = DocObj.nummarkups;
                    Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                }

                markermarkupobj.savemetolistDraw();

                markermarkupobj = null;

                tool.started = false;
                img_update();

                if (!Globals.bMultimarkupadd) {
                    //need to move to connection object.
                    //markupcreated();
                    if (RxCore_GUI_Markup != undefined) {
                        //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                        const operation = { created: true, modified: false, deleted: false };
                        RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                    }

                }
            }
        }

        this.mouseup = function (ev: any) {
            ev.target.style.cursor = 'default';
            if (tool.started) {
                tool.mousemove(ev);

                if (!Globals.bMultimarkupadd) {

                    Globals.bMarkupcrated = true;
                    //ft 08.08.2018 changed from separate index to direct array length
                    //nMarkupcreated = DocObj.nummarkups;
                    Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                }

                markermarkupobj.savemetolistDraw();

                markermarkupobj = null;

                tool.started = false;
                img_update();

                if (!Globals.bMultimarkupadd) {
                    //need to move to connection object.
                    //markupcreated();
                    if (RxCore_GUI_Markup != undefined) {
                        //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                        const operation = { created: true, modified: false, deleted: false };
                        RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                    }

                }

            }
        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {
                if (!Globals.bMultimarkupadd) {
                    Globals.bMarkupcrated = true;
                    //ft 08.08.2018 changed from separate index to direct array length
                    //nMarkupcreated = DocObj.nummarkups;
                    Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                }

                markermarkupobj.savemetolistDraw();

                img_update();
                tool.touchmove(ev);
                tool.started = false;
                markermarkupobj = null;

                if (!Globals.bMultimarkupadd) {
                    //need to move to connection object.
                    //markupcreated();
                    if (RxCore_GUI_Markup != undefined) {
                        //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                        const operation = { created: true, modified: false, deleted: false };
                        RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                    }

                }
            }
        }

        this.touchend = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {
                if (!Globals.bMultimarkupadd) {
                    Globals.bMarkupcrated = true;
                    //ft 08.08.2018 changed from separate index to direct array length
                    //nMarkupcreated = DocObj.nummarkups;
                    Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                }

                markermarkupobj.savemetolistDraw();

                img_update();
                tool.touchmove(ev);
                tool.started = false;
                markermarkupobj = null;

                if (!Globals.bMultimarkupadd) {
                    //need to move to connection object.
                    //markupcreated();
                    if (RxCore_GUI_Markup != undefined) {
                        //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                        const operation = { created: true, modified: false, deleted: false };
                        RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                    }

                }

            }
        }
    }


    // The rectangle tool.
    Globals.tools.rect = function (params: any) {

        const tool = this;
        let prevx = 0,
            prevy = 0;
        let rectmarkupobj: any;
        //var drawrectangle = new markuprectangle();
        //ft 08.08.2018 changed from separate index to direct array length
        //var curmarkup = DocObj.nummarkups;
        const curmarkup = Globals.DocObj.markuplist.length;
        let havesnap = false;
        let snapPoint: any;
        this.name = 'rect';
        this.anglelengthsupport = false;

        this.started = false;
        const type = params.p1;

        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }

        this.startRect = function (mousePos: any) {
            tool.started = true;
            if (Globals.DocObj) {
                Globals.DocObj.bMarkupchanged = true;
            }

            let rotatedpoint;
            if (havesnap) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                    rotatedpoint = snap_rotated(snapPoint);
                } else {
                    rotatedpoint = snapPoint;
                }

                tool.x0 = rotatedpoint.x;
                tool.y0 = rotatedpoint.y;
            } else {
                tool.x0 = mousePos.x;
                tool.y0 = mousePos.y;
            }
            rectmarkupobj = new MarkupObject(3, type, Globals.fillstyle);
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                rectmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                rectmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                rectmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                rectmarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                rectmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                rectmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                rectmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                rectmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                rectmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }

            rectmarkupobj.pagenumber = Globals.DocObj.getcurPage();
            rectmarkupobj.editaction = 0;
        }

        this.drawRect = function (mousePos: any) {
            let rotatedpoint;
            if (havesnap) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                    rotatedpoint = snap_rotated(snapPoint);
                } else {
                    rotatedpoint = snapPoint;
                }

                rectmarkupobj.x = Math.min(rotatedpoint.x, tool.x0);
                rectmarkupobj.y = Math.min(rotatedpoint.y, tool.y0);
                rectmarkupobj.w = Math.abs(rotatedpoint.x - tool.x0);
                rectmarkupobj.h = Math.abs(rotatedpoint.y - tool.y0);


                prevx = rotatedpoint.x;
                prevy = rotatedpoint.y;

            } else {
                rectmarkupobj.x = Math.min(mousePos.x, tool.x0);
                rectmarkupobj.y = Math.min(mousePos.y, tool.y0);
                rectmarkupobj.w = Math.abs(mousePos.x - tool.x0);
                rectmarkupobj.h = Math.abs(mousePos.y - tool.y0);

                prevx = mousePos.x;
                prevy = mousePos.y;

            }
        }

        this.endRect = function () {
            /*if(rectmarkupobj.w==0 || rectmarkupobj.h==0){
             return;
             }*/
            tool.started = false;

            if (!Globals.bMultimarkupadd) {

                Globals.bMarkupcrated = true;
                //ft 08.08.2018 changed from separate index to direct array length
                Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                //nMarkupcreated = DocObj.nummarkups;
            }

            rectmarkupobj.savemetolistDraw();
            rectmarkupobj = null;


            //tool.started = false;
            //markuplist.add(drawrectangle);
            img_update();
            drawmarkupAll(Globals.cntximg);

            if (!Globals.bMultimarkupadd) {
                //need to move to connection object.
                //markupcreated();
                if (RxCore_GUI_Markup != undefined) {
                    //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                    const operation = { created: true, modified: false, deleted: false };
                    RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                }

            }
        }

        this.setSnap = function (mousePos: any) {
            snapPoint = Globals.DocObj.pages[Globals.DocObj.currentpage].getsnap(mousePos.x, mousePos.y);

            if (snapPoint == undefined) {
                havesnap = false;
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            }

            if (snapPoint.found) {
                havesnap = true;
                drawsnap(Globals.context, snapPoint);
                //context.lineWidth = 1;
                //context.strokeStyle = 'blue';
                //context.strokeRect(snapPoint.x - 5, snapPoint.y - 5, 10, 10);
            } else {
                havesnap = false;
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            }

        }

        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';

            tool.started = true;
            if (Globals.DocObj) {
                Globals.DocObj.bMarkupchanged = true;
            }

            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);

            //mousePos = getDocRotMousePoint(mousePos);

            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                ev.target.style.cursor = 'default';
                return;

            }
            tool.startRect(mousePos);
        }

        this.mousedown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            tool.started = true;
            if (Globals.DocObj) {
                Globals.DocObj.bMarkupchanged = true;
            }

            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            //mousePos = getDocRotMousePoint(mousePos);

            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }
                ev.target.style.cursor = 'default';
                return;
            }
            tool.startRect(mousePos);
        }

        this.touchstart = function (ev: any) {

            ev.preventDefault();
            tool.started = true;
            if (Globals.DocObj) {
                Globals.DocObj.bMarkupchanged = true;
            }

            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const bWithin = MousePosdrwext(touchPos);
            //touchPos = getDocRotMousePoint(touchPos);

            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                return;
            }

            tool.x0 = touchPos.x;
            tool.y0 = touchPos.y;

            rectmarkupobj = new MarkupObject(3, type, Globals.fillstyle);
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                rectmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                rectmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                rectmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                rectmarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                rectmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                rectmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;
            } else {
                rectmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                rectmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                rectmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;
            }

            rectmarkupobj.pagenumber = Globals.DocObj.getcurPage();
            rectmarkupobj.editaction = 0;
        }

        this.MSPointerMove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);

            tool.setSnap(mousePos);

            if (!tool.started) {
                return;
            }

            const bWithin = MousePosdrwext(mousePos);
            //mousePos = getDocRotMousePoint(mousePos);

            if (bWithin || !Globals.bLimMarkupExtent) {
                tool.drawRect(mousePos);
            } else {
                rectmarkupobj.x = Math.min(prevx, tool.x0);
                rectmarkupobj.y = Math.min(prevy, tool.y0);
                rectmarkupobj.w = Math.abs(prevx - tool.x0);
                rectmarkupobj.h = Math.abs(prevy - tool.y0);
            }
            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            if (havesnap) {
                drawsnap(Globals.context, snapPoint);
            }

            if (!rectmarkupobj.w || !rectmarkupobj.h) {
                return;
            }
            rectmarkupobj.drawme(Globals.context);
        }

        this.mousemove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);

            tool.setSnap(mousePos);

            if (!tool.started) {
                return;
            }

            const bWithin = MousePosdrwext(mousePos);
            //mousePos = getDocRotMousePoint(mousePos);

            if (bWithin || !Globals.bLimMarkupExtent) {
                tool.drawRect(mousePos);
            } else {
                rectmarkupobj.x = Math.min(prevx, tool.x0);
                rectmarkupobj.y = Math.min(prevy, tool.y0);
                rectmarkupobj.w = Math.abs(prevx - tool.x0);
                rectmarkupobj.h = Math.abs(prevy - tool.y0);

                ev.target.style.cursor = 'default';
            }
            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            if (havesnap) {
                drawsnap(Globals.context, snapPoint);
            }

            rectmarkupobj.drawme(Globals.context);

            if (!rectmarkupobj.w || !rectmarkupobj.h) {
                return;
            }
        }

        this.touchmove = function (ev: any) {
            ev.preventDefault();
            if (!tool.started) {
                return;
            }
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const bWithin = MousePosdrwext(touchPos);
            //touchPos = getDocRotMousePoint(touchPos);

            let x, y, w, h;
            if (bWithin || !Globals.bLimMarkupExtent) {
                x = Math.min(touchPos.x, tool.x0),
                    y = Math.min(touchPos.y, tool.y0),
                    w = Math.abs(touchPos.x - tool.x0),
                    h = Math.abs(touchPos.y - tool.y0);

                prevx = touchPos.x;
                prevy = touchPos.y;
            } else {
                x = Math.min(prevx, tool.x0);
                y = Math.min(prevy, tool.y0);
                w = Math.abs(prevx - tool.x0);
                h = Math.abs(prevy - tool.y0);
            }

            rectmarkupobj.x = x;
            rectmarkupobj.y = y;
            rectmarkupobj.w = w;
            rectmarkupobj.h = h;

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

            if (!w || !h) {
                return;
            }
            rectmarkupobj.drawme(Globals.context);
        }

        this.MSPointerUp = function (ev: any) {
            ev.target.style.cursor = 'default';
            if (tool.started) {
                tool.mousemove(ev);
                tool.endRect();

                tool.started = false;
            }
        }

        this.mouseup = function (ev: any) {
            ev.target.style.cursor = 'default';
            if (tool.started) {

                tool.mousemove(ev);
                tool.endRect();

                tool.started = false;

            }
        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {

                tool.endRect();
                tool.started = false;

            }
        }

        this.touchend = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {
                tool.endRect();
                tool.started = false;

            }
        }
    }


    // The symbol tool.
    Globals.tools.symbol = function () {
        const tool = this;
        const canvasLeft = Globals.canvas.offsetLeft;
        const canvasTop = Globals.canvas.offsetTop;
        const startOffsetX = 0;
        const startOffsetY = 0;
        let imagemarkupobj;
        //ft 08.08.2018 changed from separate index to direct array length
        //var curmarkup = DocObj.nummarkups;
        const curmarkup = Globals.DocObj.markuplist.length;

        this.name = 'symbol';
        this.anglelengthsupport = false;

        this.started = false;

        //rxcontainer.ondrop = tool.drop;
        //rxcontainer.ondragover = tool.dragover;

        this.dragover = function (ev: any) {
            ev.preventDefault();
        }

        this.drop = function (ev: any) {
            ev.preventDefault();

            const mousePos = getMousePos(Globals.canvas, ev);
            //var dropX = ev.clientX;// - startOffsetX;
            //var dropY = ev.clientY;// - startOffsetY;

            imagemarkupobj = new MarkupObject(11, 1, 0);
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                imagemarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                imagemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                imagemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                imagemarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                imagemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                imagemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                imagemarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                imagemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                imagemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }
            imagemarkupobj.pagenumber = Globals.DocObj.getcurPage();
            imagemarkupobj.editaction = 0;
            const bWithin = MousePosdrwext(mousePos);

            if (bWithin || !Globals.bLimMarkupExtent) {
                const dropdata = JSON.parse(ev.dataTransfer.getData("Text"));
                imagemarkupobj.x = mousePos.x - (dropdata.width / 2);
                imagemarkupobj.y = mousePos.y - (dropdata.height / 2);
                imagemarkupobj.w = dropdata.width;
                imagemarkupobj.h = dropdata.height;
                //var dropdata = ev.dataTransfer.getData("Text");

                const createimage = new Image();
                //createimage.src = ev.dataTransfer.getData("Text");
                createimage.src = dropdata.src;
                imagemarkupobj.image = createimage;
                imagemarkupobj.imageloaded = true;
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

                if (!Globals.bMultimarkupadd) {
                    Globals.bMarkupcrated = true;
                    //ft 08.08.2018 changed from separate index to direct array length
                    //nMarkupcreated = DocObj.nummarkups;
                    Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                }

                imagemarkupobj.savemetolistDraw();

            }

            img_update();
            imagemarkupobj = null;
            if (!Globals.bMultimarkupadd && bWithin) {
                //need to move to connection object.
                //markupcreated();
                if (RxCore_GUI_Markup != undefined) {
                    //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                    const operation = { created: true, modified: false, deleted: false };
                    RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                }
            }
        }

        this.mousedown = function (ev: any) {
            //var mousePos = getMousePos(canvas, ev);
            //startOffsetX = mousePos.x;
            //startOffsetY = mousePos.y;
        }
    }


    // The cloud tool.
    Globals.tools.cloud = function () {
        const tool = this;
        let prevx = 0,
            prevy = 0;
        let cloudmarkupobj: any;
        //ft 08.08.2018 changed from separate index to direct array length
        //var curmarkup = DocObj.nummarkups;
        let curmarkup = Globals.DocObj.markuplist.length;

        this.name = 'cloud';
        this.anglelengthsupport = false;

        this.started = false;

        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }

        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            tool.started = true;
            if (Globals.DocObj) {
                Globals.DocObj.bMarkupchanged = true;
            }

            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                ev.target.style.cursor = 'default';
                return;
            }
            tool.x0 = mousePos.x;
            tool.y0 = mousePos.y;
            cloudmarkupobj = new MarkupObject(5, 0, Globals.fillstyle);
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                cloudmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                cloudmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                cloudmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                cloudmarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                cloudmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                cloudmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                cloudmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                cloudmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                cloudmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }

            cloudmarkupobj.pagenumber = Globals.DocObj.getcurPage();
            cloudmarkupobj.editaction = 0;

        }

        this.mousedown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            tool.started = true;
            if (Globals.DocObj) {
                Globals.DocObj.bMarkupchanged = true;
            }

            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                ev.target.style.cursor = 'default';
                return;
            }
            tool.x0 = mousePos.x;
            tool.y0 = mousePos.y;
            cloudmarkupobj = new MarkupObject(5, 0, Globals.fillstyle);
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                cloudmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                cloudmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                cloudmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                cloudmarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                cloudmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                cloudmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                cloudmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                cloudmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                cloudmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }

            cloudmarkupobj.pagenumber = Globals.DocObj.getcurPage();
            cloudmarkupobj.editaction = 0;
        }

        this.touchstart = function (ev: any) {
            ev.preventDefault();
            //context.strokeStyle = "red";
            tool.started = true;
            if (Globals.DocObj) {
                Globals.DocObj.bMarkupchanged = true;
            }

            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const bWithin = MousePosdrwext(touchPos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                return;
            }
            tool.x0 = touchPos.x;
            tool.y0 = touchPos.y;

            cloudmarkupobj = new MarkupObject(5, 0, Globals.fillstyle);
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                cloudmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                cloudmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                cloudmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                cloudmarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                cloudmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                cloudmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                cloudmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                cloudmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                cloudmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }

            cloudmarkupobj.pagenumber = Globals.DocObj.getcurPage();
            cloudmarkupobj.editaction = 0;
        }

        this.MSPointerMove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';

            if (!tool.started) {
                return;
            }
            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);

            let x, y, w, h;
            if (bWithin || !Globals.bLimMarkupExtent) {
                x = Math.min(mousePos.x, tool.x0);
                y = Math.min(mousePos.y, tool.y0);
                w = Math.abs(mousePos.x - tool.x0);
                h = Math.abs(mousePos.y - tool.y0);

                prevx = mousePos.x;
                prevy = mousePos.y;

            } else {
                x = Math.min(prevx, tool.x0);
                y = Math.min(prevy, tool.y0);
                w = Math.abs(prevx - tool.x0);
                h = Math.abs(prevy - tool.y0);

            }

            /*var x = Math.min(mousePos.x,  tool.x0),
             y = Math.min(mousePos.y,  tool.y0),
             w = Math.abs(mousePos.x - tool.x0),
             h = Math.abs(mousePos.y - tool.y0);*/
            cloudmarkupobj.x = x;
            cloudmarkupobj.y = y;
            cloudmarkupobj.w = w;
            cloudmarkupobj.h = h;

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

            if (!w || !h) {
                return;
            }

            cloudmarkupobj.drawme(Globals.context);
        }

        this.mousemove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';

            if (!tool.started) {
                return;
            }

            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);

            let x, y, w, h;
            if (bWithin || !Globals.bLimMarkupExtent) {
                x = Math.min(mousePos.x, tool.x0);
                y = Math.min(mousePos.y, tool.y0);
                w = Math.abs(mousePos.x - tool.x0);
                h = Math.abs(mousePos.y - tool.y0);

                prevx = mousePos.x;
                prevy = mousePos.y;

            } else {
                x = Math.min(prevx, tool.x0);
                y = Math.min(prevy, tool.y0);
                w = Math.abs(prevx - tool.x0);
                h = Math.abs(prevy - tool.y0);

            }

            /*var x = Math.min(mousePos.x,  tool.x0),
             y = Math.min(mousePos.y,  tool.y0),
             w = Math.abs(mousePos.x - tool.x0),
             h = Math.abs(mousePos.y - tool.y0);*/
            cloudmarkupobj.x = x;
            cloudmarkupobj.y = y;
            cloudmarkupobj.w = w;
            cloudmarkupobj.h = h;

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

            if (!w || !h) {
                return;
            }

            cloudmarkupobj.drawme(Globals.context);
        }

        this.touchmove = function (ev: any) {
            ev.preventDefault();
            if (!tool.started) {
                return;
            }

            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const bWithin = MousePosdrwext(touchPos);

            let x, y, w, h;
            if (bWithin || !Globals.bLimMarkupExtent) {
                x = Math.min(touchPos.x, tool.x0);
                y = Math.min(touchPos.y, tool.y0);
                w = Math.abs(touchPos.x - tool.x0);
                h = Math.abs(touchPos.y - tool.y0);

                prevx = touchPos.x;
                prevy = touchPos.y;

            } else {
                x = Math.min(prevx, tool.x0);
                y = Math.min(prevy, tool.y0);
                w = Math.abs(prevx - tool.x0);
                h = Math.abs(prevy - tool.y0);
            }

            /*var x = Math.min(touchPos.x,  tool.x0),
             y = Math.min(touchPos.y,  tool.y0),
             w = Math.abs(touchPos.x - tool.x0),
             h = Math.abs(touchPos.y - tool.y0);*/
            cloudmarkupobj.x = x;
            cloudmarkupobj.y = y;
            cloudmarkupobj.w = w;
            cloudmarkupobj.h = h;

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

            if (!w || !h) {
                return;
            }
            cloudmarkupobj.drawme(Globals.context);
        }

        this.MSPointerUp = function (ev: any) {
            ev.target.style.cursor = 'default';
            if (tool.started) {
                tool.mousemove(ev);
                if (!Globals.bMultimarkupadd) {

                    Globals.bMarkupcrated = true;
                    //ft 08.08.2018 changed from separate index to direct array length
                    //nMarkupcreated = DocObj.nummarkups;
                    Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                }

                cloudmarkupobj.savemetolistDraw();
                cloudmarkupobj = null;

                tool.started = false;

                img_update();

                if (!Globals.bMultimarkupadd) {
                    //need to move to connection object.
                    //markupcreated();
                    if (RxCore_GUI_Markup != undefined) {
                        //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                        const operation = { created: true, modified: false, deleted: false };
                        RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                    }

                }

            }

        }

        this.mouseup = function (ev: any) {
            ev.target.style.cursor = 'default';
            if (tool.started) {
                tool.mousemove(ev);
                if (!Globals.bMultimarkupadd) {

                    Globals.bMarkupcrated = true;
                    //ft 08.08.2018 changed from separate index to direct array length
                    //nMarkupcreated = DocObj.nummarkups;
                    Globals.nMarkupcreated = Globals.DocObj.markuplist.length;

                }

                cloudmarkupobj.savemetolistDraw();
                cloudmarkupobj = null;

                tool.started = false;

                img_update();

                if (!Globals.bMultimarkupadd) {
                    //need to move to connection object.
                    //markupcreated();
                    if (RxCore_GUI_Markup != undefined) {
                        //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                        const operation = { created: true, modified: false, deleted: false };
                        RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                    }

                }

            }
        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {
                if (!Globals.bMultimarkupadd) {

                    Globals.bMarkupcrated = true;
                    //ft 08.08.2018 changed from separate index to direct array length
                    Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                    //nMarkupcreated = DocObj.nummarkups;
                }

                cloudmarkupobj.savemetolistDraw();

                img_update();
                tool.touchmove(ev);
                tool.started = false;
                cloudmarkupobj = null;

                if (!Globals.bMultimarkupadd) {
                    //need to move to connection object.
                    //markupcreated();
                    if (RxCore_GUI_Markup != undefined) {
                        //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                        const operation = { created: true, modified: false, deleted: false };
                        RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                    }

                }

            }
        }

        this.touchend = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {
                if (!Globals.bMultimarkupadd) {

                    Globals.bMarkupcrated = true;
                    //ft 08.08.2018 changed from separate index to direct array length
                    Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                    //nMarkupcreated = DocObj.nummarkups;
                }

                cloudmarkupobj.savemetolistDraw();

                img_update();
                tool.touchmove(ev);
                tool.started = false;
                cloudmarkupobj = null;

                if (!Globals.bMultimarkupadd) {
                    //need to move to connection object.
                    //markupcreated();
                    if (RxCore_GUI_Markup != undefined) {
                        //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                        const operation = { created: true, modified: false, deleted: false };
                        RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                    }

                }

            }
        }
    }


    // Stamp rectangle tool
    Globals.tools.rectText = function () {
        const tool = this;

        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        let x = 0,
            y = 0,
            w = 0,
            h = 0;
        this.name = 'rectText';
        this.anglelengthsupport = false;

        this.started = false;
        const zoomcolor = "rgba(175, 175, 175, 0.3)";
        Globals.context.lineWidth = 2;
        Globals.context.strokeStyle = zoomcolor;
        Globals.context.fillStyle = zoomcolor;

        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }

        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);

            const bWithin = MousePosdrwext(mousePos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                ev.target.style.cursor = 'default';
                return;

            }

            if (ev.button != 2) {
                tool.started = true;
                tool.x0 = mousePos.x;
                tool.y0 = mousePos.y;
            }
        }

        this.mousedown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);

            const bWithin = MousePosdrwext(mousePos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                ev.target.style.cursor = 'default';
                return;

            }

            if (ev.button != 2) {
                tool.started = true;
                tool.x0 = mousePos.x;
                tool.y0 = mousePos.y;
            }
        }

        this.touchstart = function (ev: any) {
            ev.preventDefault();
            tool.started = true;
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const bWithin = MousePosdrwext(touchPos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                ev.target.style.cursor = 'default';
                return;

            }

            tool.x0 = touchPos.x;
            tool.y0 = touchPos.y;
        }

        this.MSPointerMove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';

            if (!tool.started) {
                return;
            }

            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            if (bWithin || !Globals.bLimMarkupExtent) {
                x = Math.min(mousePos.x, tool.x0);
                y = Math.min(mousePos.y, tool.y0);
                w = Math.abs(mousePos.x - tool.x0);
                h = Math.abs(mousePos.y - tool.y0);

            } else {
                x = Math.min(x, tool.x0);
                y = Math.min(y, tool.y0);
                w = Math.abs(x - tool.x0);
                h = Math.abs(y - tool.y0);
            }
            /*x = Math.min(mousePos.x, tool.x0);
            y = Math.min(mousePos.y, tool.y0);
            w = Math.abs(mousePos.x - tool.x0);
            h = Math.abs(mousePos.y - tool.y0);*/

            if (!w || !h) {
                return;
            }


            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            Globals.context.lineWidth = 1;
            Globals.context.strokeStyle = zoomcolor;
            Globals.context.fillRect(x, y, w, h);

        }

        this.mousemove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';

            if (!tool.started) {
                return;
            }

            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            if (bWithin || !Globals.bLimMarkupExtent) {
                x = Math.min(mousePos.x, tool.x0);
                y = Math.min(mousePos.y, tool.y0);
                w = Math.abs(mousePos.x - tool.x0);
                h = Math.abs(mousePos.y - tool.y0);
            } else {
                x = Math.min(x, tool.x0);
                y = Math.min(y, tool.y0);
                w = Math.abs(x - tool.x0);
                h = Math.abs(y - tool.y0);
            }


            /* x = Math.min(mousePos.x, tool.x0);
             y = Math.min(mousePos.y, tool.y0);
             w = Math.abs(mousePos.x - tool.x0);
             h = Math.abs(mousePos.y - tool.y0);*/

            if (!w || !h) {
                return;
            }


            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            Globals.context.lineWidth = 1;
            Globals.context.strokeStyle = zoomcolor;
            Globals.context.fillRect(x, y, w, h);
        }

        this.touchmove = function (ev: any) {
            ev.preventDefault();
            if (!tool.started) {
                return;
            }

            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const bWithin = MousePosdrwext(touchPos);
            if (bWithin || !Globals.bLimMarkupExtent) {
                x = Math.min(touchPos.x, tool.x0);
                y = Math.min(touchPos.y, tool.y0);
                w = Math.abs(touchPos.x - tool.x0);
                h = Math.abs(touchPos.y - tool.y0);

            } else {
                x = Math.min(x, tool.x0);
                y = Math.min(y, tool.y0);
                w = Math.abs(x - tool.x0);
                h = Math.abs(y - tool.y0);
            }



            /*x = Math.min(touchPos.x, tool.x0);
            y = Math.min(touchPos.y, tool.y0);
            w = Math.abs(touchPos.x - tool.x0);
            h = Math.abs(touchPos.y - tool.y0);*/


            if (!w || !h) {
                return;
            }

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

            Globals.context.lineWidth = 1;
            Globals.context.strokeStyle = zoomcolor;
            Globals.context.fillRect(x, y, w, h);
        }

        this.MSPointerUp = function (ev: any) {
            ev.preventDefault();

            ev.target.style.cursor = 'default';

            if (ev.button != 2) {
                if (tool.started) {
                    //tool.mousemove(ev);
                    tool.started = false;
                    if (!w || !h) {
                        return;
                    }
                    //DocObj.pages[DocObj.currentpage].zoom_update(x, y, w, h);
                    textRect(x, y, w, h);
                    tool.x = x;
                    tool.y = y;
                    tool.w = w;
                    tool.h = h;

                    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                }

            }

        }

        this.mouseup = function (ev: any) {
            ev.preventDefault();

            ev.target.style.cursor = 'default';

            if (ev.button != 2) {
                if (tool.started) {
                    //tool.mousemove(ev);
                    tool.started = false;
                    if (!w || !h) {
                        return;
                    }
                    //DocObj.pages[DocObj.currentpage].zoom_update(x, y, w, h);
                    textRect(x, y, w, h);
                    tool.x = x;
                    tool.y = y;
                    tool.w = w;
                    tool.h = h;

                    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                }

            }
        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {
                tool.started = false;
                if (!w || !h) {
                    return;
                }
                textRect(x, y, w, h);
                tool.x = x;
                tool.y = y;
                tool.w = w;
                tool.h = h;

                //DocObj.pages[DocObj.currentpage].zoom_update(x, y, w, h);
                //tool.touchmove(ev);

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            }
        }

        this.touchend = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {
                tool.started = false;
                if (!w || !h) {
                    return;
                }
                textRect(x, y, w, h);
                tool.x = x;
                tool.y = y;
                tool.w = w;
                tool.h = h;

                //DocObj.pages[DocObj.currentpage].zoom_update(x, y, w, h);
                //tool.touchmove(ev);

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            }
        }
    }


    // Stamp rectangle tool
    Globals.tools.rectStamp = function (params: any) {
        const tool = this;
        let x = 0,
            y = 0,
            w = 0,
            h = 0;
        this.name = 'rectStamp';
        this.anglelengthsupport = false;

        this.started = false;
        const zoomcolor = "rgba(175, 175, 175, 0.3)";
        Globals.context.lineWidth = 2;
        Globals.context.strokeStyle = zoomcolor;
        Globals.context.fillStyle = zoomcolor;
        const Text = params.p1;

        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }

        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                ev.target.style.cursor = 'default';
                return;
            }

            if (ev.button != 2) {
                tool.started = true;
                tool.x0 = mousePos.x;
                tool.y0 = mousePos.y;
            }
        }

        this.mousedown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }
                ev.target.style.cursor = 'default';
                return;

            }

            if (ev.button != 2) {
                tool.started = true;
                tool.x0 = mousePos.x;
                tool.y0 = mousePos.y;
            }
        }

        this.touchstart = function (ev: any) {
            ev.preventDefault();
            tool.started = true;
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const bWithin = MousePosdrwext(touchPos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                return;

            }

            tool.x0 = touchPos.x;
            tool.y0 = touchPos.y;
        }

        this.MSPointerMove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';

            if (!tool.started) {
                return;
            }

            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            if (bWithin || !Globals.bLimMarkupExtent) {
                x = Math.min(mousePos.x, tool.x0);
                y = Math.min(mousePos.y, tool.y0);
                w = Math.abs(mousePos.x - tool.x0);
                h = Math.abs(mousePos.y - tool.y0);
            } else {
                x = Math.min(x, tool.x0);
                y = Math.min(y, tool.y0);
                w = Math.abs(x - tool.x0);
                h = Math.abs(y - tool.y0);
            }

            /*x = Math.min(mousePos.x, tool.x0);
            y = Math.min(mousePos.y, tool.y0);
            w = Math.abs(mousePos.x - tool.x0);
            h = Math.abs(mousePos.y - tool.y0);*/

            if (!w || !h) {
                return;
            }

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            Globals.context.lineWidth = 1;
            Globals.context.strokeStyle = zoomcolor;
            Globals.context.fillRect(x, y, w, h);

        }

        this.mousemove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';

            if (!tool.started) {
                return;
            }

            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            if (bWithin || !Globals.bLimMarkupExtent) {
                x = Math.min(mousePos.x, tool.x0);
                y = Math.min(mousePos.y, tool.y0);
                w = Math.abs(mousePos.x - tool.x0);
                h = Math.abs(mousePos.y - tool.y0);

            } else {
                x = Math.min(x, tool.x0);
                y = Math.min(y, tool.y0);
                w = Math.abs(x - tool.x0);
                h = Math.abs(y - tool.y0);
            }
            /*x = Math.min(mousePos.x, tool.x0);
            y = Math.min(mousePos.y, tool.y0);
            w = Math.abs(mousePos.x - tool.x0);
            h = Math.abs(mousePos.y - tool.y0);*/

            if (!w || !h) {
                return;
            }


            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            Globals.context.lineWidth = 1;
            Globals.context.strokeStyle = zoomcolor;
            Globals.context.fillRect(x, y, w, h);
        }

        this.touchmove = function (ev: any) {
            ev.preventDefault();
            if (!tool.started) {
                return;
            }
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const bWithin = MousePosdrwext(touchPos);
            if (bWithin || !Globals.bLimMarkupExtent) {
                x = Math.min(touchPos.x, tool.x0);
                y = Math.min(touchPos.y, tool.y0);
                w = Math.abs(touchPos.x - tool.x0);
                h = Math.abs(touchPos.y - tool.y0);

            } else {
                x = Math.min(x, tool.x0);
                y = Math.min(y, tool.y0);
                w = Math.abs(x - tool.x0);
                h = Math.abs(y - tool.y0);
            }

            /*x = Math.min(touchPos.x, tool.x0);
            y = Math.min(touchPos.y, tool.y0);
            w = Math.abs(touchPos.x - tool.x0);
            h = Math.abs(touchPos.y - tool.y0);*/


            if (!w || !h) {
                return;
            }

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

            Globals.context.lineWidth = 1;
            Globals.context.strokeStyle = zoomcolor;
            Globals.context.fillRect(x, y, w, h);
        }

        this.MSPointerUp = function (ev: any) {
            ev.preventDefault();

            ev.target.style.cursor = 'default';

            if (ev.button != 2) {
                if (tool.started) {
                    //tool.mousemove(ev);
                    tool.started = false;
                    if (!w || !h) {
                        return;
                    }
                    //DocObj.pages[DocObj.currentpage].zoom_update(x, y, w, h);
                    stampRect(x, y, w, h, Text);
                    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                }

            }
        }

        this.mouseup = function (ev: any) {
            ev.preventDefault();

            ev.target.style.cursor = 'default';

            if (ev.button != 2) {
                if (tool.started) {
                    //tool.mousemove(ev);
                    tool.started = false;
                    if (!w || !h) {
                        return;
                    }
                    //DocObj.pages[DocObj.currentpage].zoom_update(x, y, w, h);
                    stampRect(x, y, w, h, Text);
                    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                }
            }
        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {
                tool.started = false;
                if (!w || !h) {
                    return;
                }
                stampRect(x, y, w, h, Text);
                //DocObj.pages[DocObj.currentpage].zoom_update(x, y, w, h);
                //tool.touchmove(ev);

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            }
        }

        this.touchend = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {
                tool.started = false;
                if (!w || !h) {
                    return;
                }
                stampRect(x, y, w, h, Text);
                //DocObj.pages[DocObj.currentpage].zoom_update(x, y, w, h);
                //tool.touchmove(ev);

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            }
        }
    }


    // The zoom tool.
    Globals.tools.zoomwindow = function () {
        const tool = this;
        let x = 0,
            y = 0,
            w = 0,
            h = 0;
        this.name = 'zoomwindow';
        this.anglelengthsupport = false;

        this.started = false;
        const zoomcolor = "rgba(175, 175, 175, 0.3)";
        Globals.context.lineWidth = 2;
        Globals.context.strokeStyle = zoomcolor;
        Globals.context.fillStyle = zoomcolor;

        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }

        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            if (ev.button != 2) {
                tool.started = true;
                tool.x0 = mousePos.x;
                tool.y0 = mousePos.y;
            }

        }

        this.mousedown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            if (ev.button != 2) {
                tool.started = true;
                tool.x0 = mousePos.x;
                tool.y0 = mousePos.y;
            }
        }

        this.touchstart = function (ev: any) {
            ev.preventDefault();
            tool.started = true;
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            tool.x0 = touchPos.x;
            tool.y0 = touchPos.y;
        }

        this.MSPointerMove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';

            if (!tool.started) {
                return;
            }
            const mousePos = getMousePos(Globals.canvas, ev);
            x = Math.min(mousePos.x, tool.x0);
            y = Math.min(mousePos.y, tool.y0);
            w = Math.abs(mousePos.x - tool.x0);
            h = Math.abs(mousePos.y - tool.y0);

            if (!w || !h) {
                return;
            }


            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            Globals.context.lineWidth = 1;
            Globals.context.strokeStyle = zoomcolor;
            Globals.context.fillRect(x, y, w, h);
        }

        this.mousemove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';

            if (!tool.started) {
                return;
            }

            const mousePos = getMousePos(Globals.canvas, ev);
            x = Math.min(mousePos.x, tool.x0);
            y = Math.min(mousePos.y, tool.y0);
            w = Math.abs(mousePos.x - tool.x0);
            h = Math.abs(mousePos.y - tool.y0);

            if (!w || !h) {
                return;
            }

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            Globals.context.lineWidth = 1;
            Globals.context.strokeStyle = zoomcolor;
            Globals.context.fillRect(x, y, w, h);
        }

        this.touchmove = function (ev: any) {
            ev.preventDefault();
            if (!tool.started) {
                return;
            }

            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            x = Math.min(touchPos.x, tool.x0);
            y = Math.min(touchPos.y, tool.y0);
            w = Math.abs(touchPos.x - tool.x0);
            h = Math.abs(touchPos.y - tool.y0);


            if (!w || !h) {
                return;
            }

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

            Globals.context.lineWidth = 1;
            Globals.context.strokeStyle = zoomcolor;
            Globals.context.fillRect(x, y, w, h);
        }

        this.MSPointerUp = function (ev: any) {
            ev.preventDefault();

            ev.target.style.cursor = 'default';

            if (ev.button != 2) {
                if (tool.started) {
                    //tool.mousemove(ev);
                    tool.started = false;
                    if (!w || !h) {
                        return;
                    }
                    Globals.DocObj.pages[Globals.DocObj.currentpage].zoom_update(x, y, w, h);
                    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                    //RxCore_default();
                }

            }
        }

        this.mouseup = function (ev: any) {
            ev.preventDefault();

            ev.target.style.cursor = 'default';

            if (ev.button != 2) {
                if (tool.started) {
                    //tool.mousemove(ev);
                    tool.started = false;
                    if (!w || !h) {
                        return;
                    }
                    Globals.DocObj.pages[Globals.DocObj.currentpage].zoom_update(x, y, w, h);
                    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                    //RxCore_default();
                }

            }
        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {
                tool.started = false;
                if (!w || !h) {
                    return;
                }

                Globals.DocObj.pages[Globals.DocObj.currentpage].zoom_update(x, y, w, h);
                //tool.touchmove(ev);

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                //RxCore_default();
            }

        }

        this.touchend = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {
                tool.started = false;
                if (!w || !h) {
                    return;
                }

                Globals.DocObj.pages[Globals.DocObj.currentpage].zoom_update(x, y, w, h);
                //tool.touchmove(ev);

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                //RxCore_default();
            }
        }
    }


    Globals.tools.pickPolygon = function (params: any) {
        const tool = this;
        const x = 0,
            y = 0,
            w = 0,
            h = 0;
        const prevx = 0,
            prevy = 0;
        this.started = false;
        const multi = params.p1;
        this.multiselect = multi;
        this.name = 'PickPolygon';
        this.anglelengthsupport = false;

        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }

        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            //ev.target.style.cursor = 'move';
            const mousePos = getMousePos(Globals.canvas, ev);
            const polyfound = Globals.DocObj.pages[Globals.DocObj.currentpage].getpolygon(mousePos.x, mousePos.y, tool.multiselect);
            //tool.started = true;
            /*tool.x0 = mousePos.x;
             tool.y0 = mousePos.y;
             prevx = tool.x0;
             prevy = tool.y0;*/
        }

        this.mousedown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            //ev.target.style.cursor = 'move';

            //tool.started = true;
            const mousePos = getMousePos(Globals.canvas, ev);
            const polyfound = Globals.DocObj.pages[Globals.DocObj.currentpage].getpolygon(mousePos.x, mousePos.y, multi);
            //page.getpolygon(x,y)
            /*tool.x0 = mousePos.x;
             tool.y0 = mousePos.y;
             prevx = tool.x0;
             prevy = tool.y0;*/
        }

        this.touchstart = function (ev: any) {
            ev.preventDefault();
            //tool.started = true;
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const polyfound = Globals.DocObj.pages[Globals.DocObj.currentpage].getpolygon(touchPos.x, touchPos.y, multi);
            /*tool.x0 = touchPos.x;
             tool.y0 = touchPos.y;
             prevx = tool.x0;
             prevy = tool.y0;
             x = tool.x0;
             y = tool.y0;*/
        }

        this.MSPointerMove = function (ev: any) {
            /*if (!tool.started) {
             return;
             }*/
            const mousePos = getMousePos(Globals.canvas, ev);
            //var xdiff = prevx - mousePos.x;
            //var ydiff = prevy - mousePos.y;

            //var polyfound = DocObj.pages[DocObj.currentpage].getpolygon(mousePos.x, mousePos.y);
            //DocObj.pages[DocObj.currentpage].pan_update(xdiff, ydiff);


            //prevx = mousePos.x;
            //prevy = mousePos.y;

        }

        this.mousemove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            /*if (!tool.started) {
             return;
             }*/
            //var mousePos = getMousePos(canvas, ev);
            //var polyfound = DocObj.pages[DocObj.currentpage].getpolygon(mousePos.x, mousePos.y);
            //var xdiff = prevx - mousePos.x;
            //var ydiff = prevy - mousePos.y;


            //prevx = mousePos.x;
            //prevy = mousePos.y;
        }

        this.touchmove = function (ev: any) {
            ev.preventDefault();
            /*if (!tool.started) {
             return;
             }*/
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            //var polyfound = DocObj.pages[DocObj.currentpage].getpolygon(touchPos.x, touchPos.y);
            //var xdiff = prevx - touchPos.x;
            //var ydiff = prevy - touchPos.y;

            //prevx = touchPos.x;
            //prevy = touchPos.y;
        }

        this.MSPointerUp = function (ev: any) {
            //ev.target.style.cursor = 'default';
            /*if (tool.started) {
             tool.mousemove(ev);
             tool.started = false;


             }*/

        }

        this.mouseup = function (ev: any) {
            //ev.target.style.cursor = 'default';
            /*if (tool.started) {
             tool.mousemove(ev);
             tool.started = false;


             }*/
        }

        this.touchend = function (ev: any) {
            //ev.preventDefault();
            /*if (tool.started) {
             tool.touchmove(ev);
             tool.started = false;
             }*/
        }
    }


    // The pan tool.
    Globals.tools.pan = function () {
        const tool = this;
        let x = 0,
            y = 0,
            w = 0,
            h = 0;
        let prevx = 0,
            prevy = 0;
        this.started = false;
        this.name = 'pan';
        this.anglelengthsupport = false;

        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }

        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'move';
            const mousePos = getMousePos(Globals.canvas, ev);
            tool.started = true;
            tool.x0 = mousePos.x;
            tool.y0 = mousePos.y;
            prevx = tool.x0;
            prevy = tool.y0;
        }

        this.mousedown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'move';

            tool.started = true;
            const mousePos = getMousePos(Globals.canvas, ev);
            tool.x0 = mousePos.x;
            tool.y0 = mousePos.y;
            prevx = tool.x0;
            prevy = tool.y0;
        }

        this.touchstart = function (ev: any) {
            ev.preventDefault();
            tool.started = true;
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            tool.x0 = touchPos.x;
            tool.y0 = touchPos.y;
            prevx = tool.x0;
            prevy = tool.y0;
            x = tool.x0;
            y = tool.y0;
        }

        this.MSPointerMove = function (ev: any) {
            if (!tool.started) {
                return;
            }
            const mousePos = getMousePos(Globals.canvas, ev);
            const xdiff = prevx - mousePos.x;
            const ydiff = prevy - mousePos.y;


            Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);


            prevx = mousePos.x;
            prevy = mousePos.y;
        }

        this.mousemove = function (ev: any) {
            if (!tool.started) {
                return;
            }
            const mousePos = getMousePos(Globals.canvas, ev);
            const xdiff = prevx - mousePos.x;
            const ydiff = prevy - mousePos.y;

            Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);

            prevx = mousePos.x;
            prevy = mousePos.y;
        }

        this.touchmove = function (ev: any) {
            ev.preventDefault();
            if (!tool.started) {
                return;
            }
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const xdiff = prevx - touchPos.x;
            const ydiff = prevy - touchPos.y;

            Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);

            prevx = touchPos.x;
            prevy = touchPos.y;
        }

        this.MSPointerUp = function (ev: any) {
            ev.target.style.cursor = 'default';
            if (tool.started) {
                tool.mousemove(ev);
                tool.started = false;
            }
        }

        this.mouseup = function (ev: any) {
            ev.target.style.cursor = 'default';
            if (tool.started) {
                tool.mousemove(ev);
                tool.started = false;
            }
        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {
                tool.touchmove(ev);
                tool.started = false;
            }
        }

        this.touchend = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {
                tool.touchmove(ev);
                tool.started = false;
            }
        }
    }


    // The markupedit tool.
    Globals.tools.markupedit = function () {
        const tool = this;
        let x = 0,
            y = 0,
            w = 0,
            h = 0;
        let prevx = 0,
            prevy = 0;
        let xcur1 = 0,
            xcur2 = 0,
            ycur1 = 0,
            ycur2 = 0;
        let startx = 0,
            starty = 0,
            startx2 = 0,
            starty2 = 0,
            startw = 0,
            starth = 0;
        let startwsq = 0.0;
        let starthsq = 0.0;
        let wsq = 0.0;
        let hsq = 0.0;

        let startdiagonal = 0.0;
        let diagonal = 0.0;
        let prevdiagonal = 0.0;
        let prevh = 0,
            prevw = 0;

        let startcenterx = 0,
            startcentery = 0;
        let centerx = 0,
            centery = 0;
        let prevcenterx = 0,
            prevcentery = 0;

        let id = -1;
        let fmarkup: any = {};
        let listentrynum = -1;

        const numtouchpoints = -1;
        let touchpointarr: any = [];
        let mstouchzoom = false;
        let mstouchpan = false;

        let startdeltax = 0;
        let startdeltay = 0;
        let diffangle = 0;
        let startangle = 0;
        let curangle = 0;

        let startscalesmall = 0;
        let startscalelarge = 0;

        this.LastTouchdata = -1;
        this.started = false;
        this.name = 'markupedit';
        this.anglelengthsupport = false;

        this.savestate = true;
        this.changedstate = false;
        this.scrollkeyOn = false;
        this.curmousepos = { x: 0, y: 0 };

        let havesnap = false;
        let snapPoint: any;

        //dragaction 1 = move, 2 = scale, 3= rotate, 4 = editpoint
        //var dragaction = 1;

        this.scrollhandling = function (movey: any) {
            if (!Globals.documentopen || Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                return;
            }

            RxCore_hideTextInput();

            if (movey < 0) {

                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs && Globals.DocObj.pages.length > 1 && !Globals.DocObj.pagelocked) {

                    //DocObj.pages[DocObj.currentpage].pan_update(0,-movey);
                    if (Globals.DocObj.currentpage == Globals.DocObj.pages.length - 1) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].endy <= Globals.canvas.height) {
                            movey = 0;
                        }
                    }
                    Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, -movey);

                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].pagenumber == Globals.DocObj.pages.length - 1 && Globals.DocObj.pages[Globals.DocObj.currentpage].drotation == 0) {
                        while (Globals.DocObj.pages[Globals.DocObj.currentpage].endy < Globals.canvas.height) {
                            Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, -1);
                        }
                    }

                } else {
                    if (Globals.bUseScrollKey) {
                        if (tool.scrollkeyOn) {
                            if (!Globals.DocObj.pages[Globals.DocObj.currentpage].usedincomposite) {

                                if (tool.belowlimitExtent(1.1)) {

                                    Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomOut(1.1, false, false, tool.curmousepos);
                                    tool.panlimit();
                                }

                                //tool.limitExtent(1.1);
                            }

                            //DocObj.pages[DocObj.currentpage].ZoomOutmouse(1.1, tool.curmousepos);
                        }

                    } else {
                        if (!Globals.DocObj.pages[Globals.DocObj.currentpage].usedincomposite) {

                            if (tool.belowlimitExtent(1.1)) {
                                Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomOut(1.1, false, false, tool.curmousepos);
                                tool.panlimit();

                            }
                            //tool.limitExtent(1.1);

                        }
                        //DocObj.pages[DocObj.currentpage].ZoomOutmouse(1.1, tool.curmousepos);
                    }

                }

            } else {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs && Globals.DocObj.pages.length > 1 && !Globals.DocObj.pagelocked) {

                    if (Globals.DocObj.currentpage == 0) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].starty >= 0) {
                            movey = 0;
                        }

                    }
                    Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, -movey);

                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].pagenumber == 0 && Globals.DocObj.pages[Globals.DocObj.currentpage].drotation == 0) {
                        while (Globals.DocObj.pages[Globals.DocObj.currentpage].starty > 0) {
                            Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, 1);
                        }

                    }

                } else {
                    if (Globals.bUseScrollKey) {
                        if (tool.scrollkeyOn) {
                            if (!Globals.DocObj.pages[Globals.DocObj.currentpage].usedincomposite) {

                                Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomIn(1.1, false, false, tool.curmousepos);
                                //tool.limitExtent(1.1);
                            }

                            //DocObj.pages[DocObj.currentpage].ZoomInMouse(1.1, tool.curmousepos);
                        }
                    } else {
                        if (!Globals.DocObj.pages[Globals.DocObj.currentpage].usedincomposite) {
                            Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomIn(1.1, false, false, tool.curmousepos);
                            //tool.limitExtent(1.1);
                        }

                        //DocObj.pages[DocObj.currentpage].ZoomInMouse(1.1, tool.curmousepos);
                    }

                }

            }

        }

        this.belowlimitExtent = function (zoomscalefactor: any) {
            let belowlimit = true;

            const pagedim = Globals.DocObj.pages[Globals.DocObj.currentpage].getpagedim();

            const wlimit = Globals.canvasowidth - 60;
            const hlimit = Globals.canvasoheight - 60;

            if ((pagedim.w / zoomscalefactor) < wlimit && (pagedim.h / zoomscalefactor) < hlimit) {
                belowlimit = false;
                //scalechanged = false;
                //DocObj.pages[DocObj.currentpage].zoomall();
            }

            const pagerect = Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomOutTest(zoomscalefactor, false, tool.curmousepos);

            const heightlimit = Globals.canvasoheight - (Globals.nPanlimit * 2);
            const widthlimit = Globals.canvasowidth - (Globals.nPanlimit * 2);
            //var toplimit = 15;
            const bottomlimit = ((pagerect.y + pagerect.h) <= heightlimit);
            const toplimit = (pagerect.y >= Globals.nPanlimit);

            // need to return these to reset the top and bottom positions.scroll|| bottomlimit || toplimit
            if ((pagerect.w / pagerect.h) < (Globals.canvasowidth / Globals.canvasoheight)) {
                if (pagerect.h <= heightlimit) {
                    belowlimit = false;
                }

            } else {
                if (pagerect.w <= widthlimit) {
                    belowlimit = false;
                }

            }

            /*if (DocObj.pages[DocObj.currentpage].usepdfjs) {
                //var curscale = DocObj.pages[DocObj.currentpage].curpagescale * DocObj.pages[DocObj.currentpage].dscalepdf;



            }else if (DocObj.pages[DocObj.currentpage].usevectorxml) {


                if (DocObj.pages[DocObj.currentpage].initialscale > DocObj.pages[DocObj.currentpage].dscalevector) {
                    //scalechanged = false;
                    //DocObj.pages[DocObj.currentpage].zoomall();
                    belowlimit = false;

                }


            } else {
                if (DocObj.pages[DocObj.currentpage].initialscale > (DocObj.pages[DocObj.currentpage].dscale / DocObj.pages[DocObj.currentpage].bitmapratio)) {
                    //scalechanged = false;
                    //DocObj.pages[DocObj.currentpage].zoomall();
                    belowlimit = false;
                }

            }*/

            if (!Globals.bLimitZoomOut) {
                belowlimit = true;
            }

            return belowlimit;
        }

        this.panlimit = function () {
            const pagedim = Globals.DocObj.pages[Globals.DocObj.currentpage].getpagedim();

            if ((pagedim.w / pagedim.h) < (Globals.canvasowidth / Globals.canvasoheight)) {
                if ((pagedim.y + pagedim.h) < (Globals.canvasoheight - Globals.nPanlimit)) {
                    RxCore_PagePos(pagedim.x, -Globals.nPanlimit);
                    //reset position to -15
                }

                if (pagedim.y > Globals.nPanlimit) {
                    //reset position to 15
                    RxCore_PagePos(pagedim.x, Globals.nPanlimit);
                }

            } else {
                if ((pagedim.x + pagedim.w) < (Globals.canvasowidth - Globals.nPanlimit)) {
                    RxCore_PagePos(-Globals.nPanlimit, pagedim.y);
                    //reset position to -15
                }

                if (pagedim.x > Globals.nPanlimit) {
                    //reset position to 15
                    RxCore_PagePos(Globals.nPanlimit, pagedim.y);
                }

            }


            /*if(pagedim.w >= canvasowidth){
            }*/

        }

        this.limitPan = function (x: any, y: any) {

            const pagedim = Globals.DocObj.pages[Globals.DocObj.currentpage].getpagedim();
            const direction = { up: false, down: false, left: false, right: false };

            direction.down = (y < 0);
            direction.up = (y > 0);
            direction.left = (x > 0);
            direction.right = (x < 0);

            /*switch(pagedim.rotation){
                case 90:
                    pagedim.y = -((pagedim.y + pagedim.h) - canvasoheight);
                    pagedim.x = -((pagedim.x + pagedim.w) - canvasowidth);
                    break;

                case 270:
                    pagedim.y = -((pagedim.y + pagedim.h) - canvasoheight);
                    pagedim.x = -((pagedim.x + pagedim.w) - canvasowidth);
                    break;
            }*/

            const moveyul = pagedim.y - y;
            const movexul = pagedim.x - x;
            const moveylr = moveyul + pagedim.h;
            const movexlr = movexul + pagedim.w;


            const allowpan = { x: true, y: true, diffx: x, diffy: y };

            if (!Globals.bRestrictPan) {
                return allowpan;
            }

            if (pagedim.h <= Globals.canvasoheight - 1) {
                allowpan.y = false;
            } else {
                if (pagedim.y > 15 && direction.down) {
                    allowpan.y = false;
                }

                if (pagedim.y + pagedim.h < (Globals.canvasoheight - 15) && direction.up) {
                    allowpan.y = false;
                }

            }

            if (pagedim.w <= Globals.canvasowidth - 1) {
                allowpan.x = false;
            } else {

                if (pagedim.x > 15 && direction.right) {
                    allowpan.x = false;
                }

                if (pagedim.x + pagedim.w < (Globals.canvasowidth - 15) && direction.left) {
                    allowpan.x = false;
                }

            }

            /*if (direction.down && moveyul > 15){
                allowpan.diffy = moveyul - 15;
            }

            if(direction.up && moveylr > 15){
                allowpan.diffy = moveylr - (canvasoheight - 15);
                allowpan.diffy = moveylr - (canvasoheight - 15);
            }*/

            if (direction.up && allowpan.y) {

                if (moveylr < (Globals.canvasoheight - 15)) {
                    if (y > 0) {
                        allowpan.diffy = y - ((Globals.canvasoheight - 15) - moveylr);
                    }
                }

            }

            if (direction.down && allowpan.y) {
                if (moveyul > 15) {
                    if (y < 0) {
                        allowpan.diffy = y + (moveyul - 15);
                    }
                }

            }

            if (direction.left && allowpan.x) {
                if (movexlr < (Globals.canvasowidth - 15)) {
                    if (x > 0) {
                        allowpan.diffx = x - ((Globals.canvasowidth - 15) - movexlr);
                    }
                }

            }

            if (direction.right && allowpan.x) {
                if (movexul > 15) {
                    if (x < 0) {
                        allowpan.diffx = x + (movexul - 15);
                    }

                }

            }

            return allowpan;
        }

        this.limitExtent = function (zoomscalefactor: any) {

            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                //var curscale = DocObj.pages[DocObj.currentpage].curpagescale * DocObj.pages[DocObj.currentpage].dscalepdf;

                const pagedim = Globals.DocObj.pages[Globals.DocObj.currentpage].getpagedim();

                if ((pagedim.w * zoomscalefactor) < Globals.canvasowidth && (pagedim.h * zoomscalefactor) < Globals.canvasoheight) {
                    //scalechanged = false;
                    Globals.DocObj.pages[Globals.DocObj.currentpage].zoomall();
                }

                //var cwidth = DocObj.pages[DocObj.currentpage].endx
                //if (DocObj.pages[DocObj.currentpage].endx - )

                /*if (DocObj.pages[DocObj.currentpage].initialscale > curscale) {
                    scalechanged = false;
                    DocObj.pages[DocObj.currentpage].zoomall();
                }*/

            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {

                if (Globals.DocObj.pages[Globals.DocObj.currentpage].initialscale > Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector) {
                    //scalechanged = false;
                    Globals.DocObj.pages[Globals.DocObj.currentpage].zoomall();

                }

            } else {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].initialscale > (Globals.DocObj.pages[Globals.DocObj.currentpage].dscale / Globals.DocObj.pages[Globals.DocObj.currentpage].bitmapratio)) {
                    //scalechanged = false;
                    Globals.DocObj.pages[Globals.DocObj.currentpage].zoomall();
                }

            }
        }

        this.DOMMouseScroll = function (ev: any) {

            //tool.scrollhandling(1, ev.detail*50);

        }

        this.mousewheel = function (ev: any) {
            tool.wheel(ev);
        }

        this.wheel = function (ev: any) {

            let delta = 0;
            if (ev.wheelDelta !== undefined) { // WebKit / Opera / Explorer 9

                delta = ev.wheelDelta;

            } else if (ev.deltaY !== undefined) { // Firefox
                if (Globals.bIsMSIE) {
                    delta = -ev.deltaY;
                } else {
                    delta = -ev.deltaY * 50;

                }

            }

            tool.scrollhandling(delta);

        }

        this.mousedownhandling = function (ev: any, mousePos: any) {
            if (!Globals.documentopen || Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                return;
            }

            ev.target.style.cursor = 'move';
            mstouchpan = true;
            tool.started = true;

            tool.x0 = mousePos.x;
            tool.y0 = mousePos.y;
            prevx = tool.x0;
            prevy = tool.y0;

            /*id = findmarkupHover(mousePos.x,mousePos.y);
             var listentrynum = DocObj.getmarkupbynumber(id);

             if (id != -1){
             if(DocObj.markuplist[listentrynum].type==10){
             if(RxCore_GUI_Notediag != undefined){
             RxCore_GUI_Notediag.setNotediag(DocObj.markuplist[listentrynum].text,true);
             }

             tool.started = false;
             }else{

             }


             }*/

        }

        this.mouseuphandler = function (ev: any) {
            if (!Globals.documentopen) {
                return;
            }

            ev.target.style.cursor = 'default';

            if (tool.started || mstouchpan) {
                //tool.mousemove(ev);
                tool.started = false;
                mstouchpan = false;
                if (Globals.DocObj.Type == 0 && !Globals.documentcompare) {
                    if (!Globals.DocObj.pagelocked) {
                        if (Globals.DocObj.currentpage == 0 && Globals.DocObj.pages[Globals.DocObj.currentpage].drotation == 0) {
                            while (Globals.DocObj.pages[Globals.DocObj.currentpage].starty > 0) {
                                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, 1);
                            }
                        }
                        if (Globals.DocObj.currentpage == Globals.DocObj.NumPages - 1 && Globals.DocObj.pages[Globals.DocObj.currentpage].drotation == 0) {
                            while (Globals.DocObj.pages[Globals.DocObj.currentpage].endy < Globals.canvas.height) {
                                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, -1);
                            }

                        }

                    }
                }

            }

        }

        this.movehandler = function (mousePos: any, ev: any) {
            if (!Globals.documentopen) {
                return;
            }

            if (!tool.started && !mstouchpan) {

                id = findmarkupHover(mousePos.x, mousePos.y);
                const listmnum = Globals.DocObj.getmarkupbynumber(id);
                if (id != -1 && Globals.DocObj.markuplist[listmnum].pagenumber == Globals.DocObj.getcurPage() && Globals.DocObj.markuplist[listmnum].display && Globals.DocObj.Drawmarkup) {

                    if (id != -1 && Globals.DocObj.markuplist[listmnum].bhaveLink) {
                        ev.target.style.cursor = 'pointer';
                        Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                        Globals.DocObj.markuplist[listmnum].displayurl(Globals.context, mousePos.x, mousePos.y);

                    } else if (id != -1 && Globals.DocObj.markuplist[listmnum].type == 10) {

                        ev.target.style.cursor = 'pointer';
                        Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                        Globals.DocObj.markuplist[listmnum].displaylabel(Globals.context, mousePos.x, mousePos.y);

                    } else {
                        ev.target.style.cursor = 'default';
                        Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                        Globals.DocObj.markuplist[listmnum].displaylabel(Globals.context, mousePos.x, mousePos.y);

                    }

                } else {
                    ev.target.style.cursor = 'default';
                    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

                }
                return;

            }

            const xdiff = prevx - mousePos.x;
            const ydiff = prevy - mousePos.y;

            if (Globals.DocObj.Type == 0 && !Globals.documentcompare && !Globals.DocObj.pagelocked) {

                if (Globals.DocObj.pages[Globals.DocObj.currentpage].startx < 0 || Globals.DocObj.pages[Globals.DocObj.currentpage].endx > Globals.canvas.width) {
                    Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                } else {
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation == 0) {
                        Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, ydiff);
                    } else {
                        Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                    }

                }
                //if(DocObj.pages[DocObj.currentpage].starty > 0)

            } else {
                //tool.panhandle(xdiff,ydiff);
                const allowpan = tool.limitPan(xdiff, ydiff);
                //var allowpan = {x:true,y:true, diffx : x, diffy:y};
                const movex = allowpan.x ? allowpan.diffx : 0;
                const movey = allowpan.y ? allowpan.diffy : 0;
                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(movex, movey);

                /*if (allowpan.x && allowpan.y){
                    DocObj.pages[DocObj.currentpage].pan_update(xdiff, ydiff);
                }else if(allowpan.x && !allowpan.y){
                    DocObj.pages[DocObj.currentpage].pan_update(xdiff, 0);
                }else if (!allowpan.x && allowpan.y){
                    DocObj.pages[DocObj.currentpage].pan_update(0, ydiff);
                }else {
                    DocObj.pages[DocObj.currentpage].pan_update(0, 0);
                }*/

            }

            prevx = mousePos.x;
            prevy = mousePos.y;

        }


        this.panhandle = function (xdiff: any, ydiff: any) {

            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].initialscale < Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector) {
                    if (xdiff < 50 && ydiff < 50) {
                        //limit check here.
                        Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                    }

                }

            } else {
                if (Globals.DocObj.Type == 0) {
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].startx < 0 || Globals.DocObj.pages[Globals.DocObj.currentpage].endx > Globals.canvas.width) {
                        if (xdiff < 50 && ydiff < 50) {
                            Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                        }

                    } else {
                        if (Globals.documentcompare) {
                            Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                        } else {
                            Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, ydiff);
                        }

                    }

                }
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].initialscale < (Globals.DocObj.pages[Globals.DocObj.currentpage].dscale / Globals.DocObj.pages[Globals.DocObj.currentpage].bitmapratio)) {
                    if (Globals.DocObj.Type == 0) {
                        if (Globals.documentcompare) {
                            Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                        } else {
                            Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, ydiff);
                        }

                    } else {
                        if (xdiff < 50 && ydiff < 50) {
                            Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                        }

                    }

                }

            }

        }

        this.labelhandler = function (mousePos: any, ev: any) {
            if (Globals.bLabelsOff) {
                return;
            }
            if (!Globals.documentopen) {
                return;
            }
            if (tool.started) {
                return;
            }
            id = findmarkupHover(mousePos.x, mousePos.y);
            const listmnum = Globals.DocObj.getmarkupbynumber(id);
            if (id != -1 && Globals.DocObj.markuplist[listmnum].pagenumber == Globals.DocObj.getcurPage() && Globals.DocObj.markuplist[listmnum].display && Globals.DocObj.Drawmarkup) {

                if (id != -1 && Globals.DocObj.markuplist[listmnum].bhaveLink) {
                    ev.target.style.cursor = 'pointer';
                    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                    drawmarkupAll(Globals.cntximg);
                    DrawMarkupSelected(Globals.context);

                    Globals.DocObj.markuplist[listmnum].displayurl(Globals.context, mousePos.x, mousePos.y);

                } else if (id != -1 && Globals.DocObj.markuplist[listmnum].type == 10) {
                    ev.target.style.cursor = 'pointer';
                    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

                    drawmarkupAll(Globals.cntximg);
                    DrawMarkupSelected(Globals.context);
                    Globals.DocObj.markuplist[listmnum].displaylabel(Globals.context, mousePos.x, mousePos.y);

                } else {
                    ev.target.style.cursor = 'default';
                    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

                    drawmarkupAll(Globals.cntximg);
                    DrawMarkupSelected(Globals.context);
                    Globals.DocObj.markuplist[listmnum].displaylabel(Globals.context, mousePos.x, mousePos.y);
                }

            } else {
                ev.target.style.cursor = 'default';
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                drawmarkupAll(Globals.cntximg);
                DrawMarkupSelected(Globals.context);

            }
        }

        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }

        this.MSPointerDown = function (ev: any) {
            if (!Globals.documentopen) {
                return;
            }

            if (Globals.readonlymode) {
                Globals.DocObj.bMarkupLocked = Globals.readonlymode;
            }

            ev.preventDefault();
            ev.stopPropagation();

            tool.started = true;
            const mousePos = getMousePos(Globals.canvas, ev);
            tool.x0 = mousePos.x;
            tool.y0 = mousePos.y;
            prevx = tool.x0;
            prevy = tool.y0;

            if (Globals.DocObj.bMarkupLocked) {
                //id = -1;
                fmarkup = findmarkup(tool.x0, tool.y0);
                id = fmarkup.id;

                if (fmarkup.blink) {
                    tool.started = false;
                    if (RxCore_GUI_MarkupLink != undefined) {
                        RxCore_GUI_MarkupLink.markupLink(Globals.DocObj.markuplist[fmarkup.index]);
                    }
                    return;
                }
                listentrynum = Globals.DocObj.getmarkupbynumber(id);
            } else {
                fmarkup = findmarkup(tool.x0, tool.y0);
                id = fmarkup.id;
                if (fmarkup.blink) {
                    tool.started = false;

                    if (RxCore_GUI_MarkupLink != undefined) {
                        RxCore_GUI_MarkupLink.markupLink(Globals.DocObj.markuplist[fmarkup.index]);
                    }
                    return;
                }

                listentrynum = Globals.DocObj.getmarkupbynumber(id);

            }

            touchpointarr.push(new TouchPoint(ev.pointerId, mousePos.x, mousePos.y));

            switch (touchpointarr.length) {
                case 1:
                    if (id == -1) {
                        // tool.started = false;
                        drawmarkupAll(Globals.cntximg);
                        DrawMarkupSelected(Globals.context);
                        tool.mousedownhandling(ev, mousePos);
                        Globals.DocObj.selectedmarkup.selected = false;
                        Globals.DocObj.selectedmarkup.edit = false;

                    } else {
                        if (tool.savestate) {
                            MarkupSaveState(id);
                        }
                        tool.savestate = false;
                        drawmarkupAll(Globals.cntximg);
                        DrawMarkupSelected(Globals.context);
                        if (Globals.DocObj) {
                            Globals.DocObj.bMarkupchanged = true;
                        }

                        if (Globals.DocObj.markuplist[listentrynum].type == 10) {
                            Globals.DocObj.selectedmarkup.id = listentrynum;
                            Globals.DocObj.selectedmarkup.selected = true;
                        }
                        if (Globals.DocObj.markuplist[listentrynum].type == 9) {
                            if (RxCore_GUI_TextInput != undefined) {
                                if (Globals.DocObj.selectedmarkup.edit) {
                                    RxCore_GUI_TextInput.operation.edit = false;
                                    RxCore_GUI_TextInput.operation.start = false;
                                    RxCore_GUI_TextInput.operation.create = false;
                                    RxCore_GUI_TextInput.operation.save = true;

                                    const rect = Globals.canvas.getBoundingClientRect();
                                    const xrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].rotatedrect.x + rect.left;
                                    const yrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].rotatedrect.y + rect.top;
                                    //var xrect  = DocObj.markuplist[DocObj.selectedmarkup.id].xscaled + rect.left;
                                    //var yrect = DocObj.markuplist[DocObj.selectedmarkup.id].yscaled + rect.top;

                                    const wrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].wscaled;
                                    const hrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].hscaled;

                                    const centercanvX = (Globals.canvasowidth / 2);
                                    const centercanvY = (Globals.canvasoheight / 2);

                                    let centerx = xrect + (wrect * 0.5);
                                    let centery = yrect + (hrect * 0.5);

                                    const CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);

                                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                                        const rectcenter = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].getRotatedMarkup(centercanvX, centercanvY, centerx, centery, CanvRotRad);
                                        centerx = rectcenter.x;
                                        centery = rectcenter.y;
                                    }

                                    centerx += rect.left;
                                    centery += rect.top;

                                    let txtrect: any = new Rectangle(xrect, yrect, wrect, hrect);
                                    txtrect.rotation = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation; // TODO:JS->TS:CHECK property rotation does not exist on Rectangle
                                    txtrect.rotation = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation; // TODO:JS->TS:CHECK check the double reassignment

                                    RxCore_GUI_TextInput.setTextInput(txtrect);

                                    /*var xrect  = DocObj.markuplist[DocObj.selectedmarkup.id].xscaled + rect.left;
                                    var yrect = DocObj.markuplist[DocObj.selectedmarkup.id].yscaled + rect.top;
                                    var wrect = DocObj.markuplist[DocObj.selectedmarkup.id].wscaled;
                                    var hrect = DocObj.markuplist[DocObj.selectedmarkup.id].hscaled;

                                    var txtrect = new Rectangle(xrect,yrect,wrect,hrect);
                                    RxCore_GUI_TextInput.setTextInput(txtrect);*/

                                    RxCore_GUI_TextInput.operation.edit = false;
                                    Globals.DocObj.selectedmarkup.edit = false;
                                }
                            }

                            Globals.DocObj.selectedmarkup.id = listentrynum;

                        }

                    }

                    if (ev.button == 1 && !tool.started) {
                        tool.started = true;
                    }
                    break;
                case 2:
                    mstouchzoom = true;
                    startx = touchpointarr[0].x;
                    starty = touchpointarr[0].y;
                    startx2 = touchpointarr[1].x;
                    starty2 = touchpointarr[1].y;

                    //establish rectangle from the two points.
                    const xmin = Math.min(startx, startx2);
                    const ymin = Math.min(starty, startx2);
                    startw = Math.abs(startx2 - startx);
                    starth = Math.abs(starty2 - starty);

                    //calculate diagonal between points
                    startwsq = Math.pow(startw, 2);
                    starthsq = Math.pow(starth, 2);
                    startdiagonal = Math.sqrt((startwsq + starthsq));
                    prevdiagonal = startdiagonal;

                    startcenterx = xmin + (startw / 2);
                    startcentery = ymin + (starth / 2);
                    prevcenterx = startcenterx;
                    prevcentery = startcentery;
                    prevh = starth;
                    prevw = startw;

                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                        startscalesmall = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                        startscalelarge = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                    } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                        startscalesmall = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf;
                        startscalelarge = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf;

                    } else {
                        startscalesmall = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                        startscalelarge = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;

                    }

                    break;

            }
        }

        this.mousedown = function (ev: any) {

            ev.preventDefault();
            ev.stopPropagation();

            if (Globals.readonlymode) {
                Globals.DocObj.bMarkupLocked = Globals.readonlymode;
            }

            if (!Globals.documentopen || Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                return;
            }

            tool.started = true;
            const mousePos = getMousePos(Globals.canvas, ev);
            tool.x0 = mousePos.x;
            tool.y0 = mousePos.y;
            prevx = tool.x0;
            prevy = tool.y0;

            if (Globals.DocObj.bMarkupLocked) {
                //id = -1;
                fmarkup = findmarkup(tool.x0, tool.y0);
                id = fmarkup.id;
                if (fmarkup.blink) {
                    tool.started = false;

                    if (RxCore_GUI_MarkupLink != undefined) {
                        RxCore_GUI_MarkupLink.markupLink(Globals.DocObj.markuplist[fmarkup.index]);
                    }
                    return;
                }

                listentrynum = Globals.DocObj.getmarkupbynumber(id);
            } else {
                fmarkup = findmarkup(tool.x0, tool.y0);
                id = fmarkup.id;

                if (fmarkup.blink) {
                    tool.started = false;

                    if (RxCore_GUI_MarkupLink != undefined) {
                        RxCore_GUI_MarkupLink.markupLink(Globals.DocObj.markuplist[fmarkup.index]);
                    }
                    return;
                }

                listentrynum = Globals.DocObj.getmarkupbynumber(id);
            }

            if (id == -1) {
                tool.started = false;
                if (RxCore_GUI_Markup != undefined) {
                    RxCore_GUI_Markup.showContext = false;
                }

                Globals.DocObj.selectedmarkup.edit = false;
                Globals.DocObj.selectedmarkup.selected = false;
                drawmarkupAll(Globals.cntximg);
                DrawMarkupSelected(Globals.context);
                tool.mousedownhandling(ev, mousePos);

            } else {
                if (tool.savestate) {
                    MarkupSaveState(id);
                }
                tool.savestate = false;
                drawmarkupAll(Globals.cntximg);
                DrawMarkupSelected(Globals.context);
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = true;
                }

                if (Globals.DocObj.selectedmarkup.id != -1 && Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id] != undefined) {
                    if (Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].type == 9) {
                        if (RxCore_GUI_TextInput != undefined) {
                            if (Globals.DocObj.selectedmarkup.edit) {
                                RxCore_GUI_TextInput.operation.edit = false;
                                RxCore_GUI_TextInput.operation.start = false;
                                RxCore_GUI_TextInput.operation.create = false;
                                RxCore_GUI_TextInput.operation.save = true;

                                const rect = Globals.canvas.getBoundingClientRect();
                                const xrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].rotatedrect.x + rect.left;
                                const yrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].rotatedrect.y + rect.top;

                                //var xrect  = DocObj.markuplist[DocObj.selectedmarkup.id].xscaled + rect.left;
                                //var yrect = DocObj.markuplist[DocObj.selectedmarkup.id].yscaled + rect.top;
                                const wrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].wscaled;
                                const hrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].hscaled;

                                const centercanvX = (Globals.canvasowidth / 2);
                                const centercanvY = (Globals.canvasoheight / 2);

                                let centerx = xrect + (wrect * 0.5);
                                let centery = yrect + (hrect * 0.5);

                                const CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);

                                if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                                    const rectcenter = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].getRotatedMarkup(centercanvX, centercanvY, centerx, centery, CanvRotRad);
                                    centerx = rectcenter.x;
                                    centery = rectcenter.y;
                                }

                                centerx += rect.left;
                                centery += rect.top;

                                const txtrect: any = new Rectangle(xrect, yrect, wrect, hrect);
                                txtrect.rotation = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation; // TODO:JS->TS:CHECK property rotation does not exist on Rectangle
                                RxCore_GUI_TextInput.setTextInput(txtrect);

                                /*var xrect  = DocObj.markuplist[DocObj.selectedmarkup.id].xscaled + rect.left;
                                 var yrect = DocObj.markuplist[DocObj.selectedmarkup.id].yscaled + rect.top;
                                 var wrect = DocObj.markuplist[DocObj.selectedmarkup.id].wscaled;
                                 var hrect = DocObj.markuplist[DocObj.selectedmarkup.id].hscaled;
                                 var txtrect = new Rectangle(xrect,yrect,wrect,hrect);
                                 RxCore_GUI_TextInput.setTextInput(txtrect);*/

                                Globals.DocObj.selectedmarkup.edit = false;
                            }
                        }
                        Globals.DocObj.selectedmarkup.id = listentrynum;

                    }

                }

                if (Globals.DocObj.markuplist[listentrynum].type == 10) {
                    Globals.DocObj.selectedmarkup.id = listentrynum;
                }

            }
            if (ev.button == 1 && !tool.started) {
                tool.started = true;
            }
            if (ev.button == 2 && tool.started) {
                //tool.started = true;
                if (RxCore_GUI_Markup != undefined) {
                    RxCore_GUI_Markup.showContext = true;
                    const operation = { created: false, modified: false, deleted: false };
                    RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[listentrynum], operation);
                }

            }

        }

        this.dblclick = function (ev: any) {
            if (Globals.readonlymode) {
                Globals.DocObj.bMarkupLocked = Globals.readonlymode;
            }

            tool.started = true;
            const mousePos = getMousePos(Globals.canvas, ev);
            tool.x0 = mousePos.x;
            tool.y0 = mousePos.y;

            if (!Globals.documentopen || Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                return;
            }

            if (Globals.DocObj.bMarkupLocked) {
                id = -1;
                //id = finddoublemarkup(tool.x0, tool.y0);
                //listentrynum = DocObj.getmarkupbynumber(id);
            } else {
                id = finddoublemarkup(tool.x0, tool.y0);
                listentrynum = Globals.DocObj.getmarkupbynumber(id);

            }

            if (id != -1) {
                MarkupSaveState(id);
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = true;
                }

                if (Globals.DocObj.markuplist[listentrynum].type == 9) {
                    const curmarkuptext = Globals.DocObj.markuplist[listentrynum].text;
                    Globals.DocObj.selectedmarkup.id = listentrynum;
                    Globals.DocObj.selectedmarkup.edit = true;

                    if (RxCore_GUI_Textdiag != undefined) {
                        RxCore_GUI_Textdiag.setTextdiag(Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].text);
                    }

                    if (RxCore_GUI_TextInput != undefined) {

                        RxCore_GUI_TextInput.operation.start = false;
                        RxCore_GUI_TextInput.operation.create = false;
                        RxCore_GUI_TextInput.operation.edit = true;
                        RxCore_GUI_TextInput.operation.save = false;

                        const rect = Globals.canvas.getBoundingClientRect();

                        const xrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].rotatedrect.x + rect.left;
                        const yrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].rotatedrect.y + rect.top;
                        //var xrect  = DocObj.markuplist[DocObj.selectedmarkup.id].xscaled + rect.left;
                        //var yrect = DocObj.markuplist[DocObj.selectedmarkup.id].yscaled + rect.top;

                        const wrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].wscaled;
                        const hrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].hscaled;

                        const centercanvX = (Globals.canvasowidth / 2);
                        const centercanvY = (Globals.canvasoheight / 2);

                        let centerx = xrect + (wrect * 0.5);
                        let centery = yrect + (hrect * 0.5);

                        const CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);

                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            const rectcenter = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].getRotatedMarkup(centercanvX, centercanvY, centerx, centery, CanvRotRad);
                            centerx = rectcenter.x;
                            centery = rectcenter.y;

                        }

                        centerx += rect.left;
                        centery += rect.top;

                        //DocObj.pages[DocObj.currentpage].drotation;
                        const txtrect: any = new Rectangle(xrect, yrect, wrect, hrect);
                        txtrect.rotation = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation;  // TODO:JS->TS:CHECK property rotation does not exist on Rectangle
                        txtrect.rotation = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].pagerotation;  // TODO:JS->TS:CHECK check why it is being assigned twice

                        RxCore_GUI_TextInput.setTextInput(txtrect);
                        Globals.DocObj.selectedmarkup.edit = false;
                    }

                    //setTextContent(DocObj.markuplist[listentrynum].text);
                    //showTextDialog();
                    //MarkupUndoObject.add(textedit,id,oldtext);
                    DrawMarkupSelected(Globals.context);
                    drawmarkupAll(Globals.cntximg);
                    tool.started = false;

                    //var markuptext = prompt("Edit markup text",curmarkuptext);
                    /*if (markuptext != null && markuptext != ""){
                     //DocObj.markuplist[listentrynum].text = markuptext;
                     }*/

                }
                if (Globals.DocObj.markuplist[listentrynum].type == 10) {
                    Globals.DocObj.selectedmarkup.id = listentrynum;
                    /*DocObj.selectedmarkup.edit = true;
                    if (RxCore_GUI_Notediag != undefined) {
                        RxCore_GUI_Notediag.setNotediag(DocObj.markuplist[listentrynum].text, false);
                    }*/

                    //setNContent(DocObj.markuplist[listentrynum].text);
                    //setNContent(DocObj.markuplist[TempID].text);
                    //showNDialog(false);
                    /*DocObj.markuplist[listentrynum].selected = false;
                    drawmarkupAll(cntximg);
                    DrawMarkupSelected(context);
                    tool.started = false;*/


                }

            } else {
                tool.started = false;
                tool.savestate = true;

            }

        }

        this.doubletap = function (touchPos: any) {
            //if markup selected go to editmode for polygons and text.
            if (Globals.readonlymode) {
                Globals.DocObj.bMarkupLocked = Globals.readonlymode;
            }

            if (Globals.DocObj.bMarkupLocked) {
                id = -1;
                //id = finddoublemarkup(touchPos.x, touchPos.y);
            } else {
                id = finddoublemarkup(touchPos.x, touchPos.y);
                listentrynum = Globals.DocObj.getmarkupbynumber(id);

            }

            if (id == -1) {
                tool.started = false;
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                tool.savestate = true;
            } else {
                if (tool.savestate) {
                    MarkupSaveState(id);
                    if (Globals.DocObj) {
                        Globals.DocObj.bMarkupchanged = true;
                    }

                }
                tool.savestate = false;

                if (Globals.DocObj.markuplist[listentrynum].type == 9) {
                    const curmarkuptext = Globals.DocObj.markuplist[listentrynum].text;
                    if (RxCore_GUI_TextInput != undefined) {

                        RxCore_GUI_TextInput.operation.start = false;
                        RxCore_GUI_TextInput.operation.create = false;
                        RxCore_GUI_TextInput.operation.edit = true;
                        RxCore_GUI_TextInput.operation.save = false;

                        const rect = Globals.canvas.getBoundingClientRect();
                        /*var xrect  = DocObj.markuplist[DocObj.selectedmarkup.id].xscaled + rect.left;
                        var yrect = DocObj.markuplist[DocObj.selectedmarkup.id].yscaled + rect.top;
                        var wrect = DocObj.markuplist[DocObj.selectedmarkup.id].wscaled;
                        var hrect = DocObj.markuplist[DocObj.selectedmarkup.id].hscaled;

                        var txtrect = new Rectangle(xrect,yrect,wrect,hrect);
                        RxCore_GUI_TextInput.setTextInput(txtrect);*/

                        const xrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].rotatedrect.x + rect.left;
                        const yrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].rotatedrect.y + rect.top;

                        //var xrect  = DocObj.markuplist[DocObj.selectedmarkup.id].xscaled + rect.left;
                        //var yrect = DocObj.markuplist[DocObj.selectedmarkup.id].yscaled + rect.top;

                        const wrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].wscaled;
                        const hrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].hscaled;

                        const txtrect: any = new Rectangle(xrect, yrect, wrect, hrect);
                        txtrect.rotation = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation; // TODO:JS->TS:CHECK property rotation does not exist on Rectangle
                        RxCore_GUI_TextInput.setTextInput(txtrect);

                        Globals.DocObj.selectedmarkup.edit = false;

                        //RxCore_GUI_TextInput.setTextInput(xrect,yrect,wrect,hrect);
                    }

                    /*var markuptext = prompt("Edit markup text", curmarkuptext);
                    if (markuptext != null && markuptext != "") {
                        DocObj.markuplist[listentrynum].text = markuptext;
                        drawmarkupAll(cntximg);
                        DrawMarkupSelected(context);
                        tool.started = false;
                    }*/
                }
                if (Globals.DocObj.markuplist[listentrynum].type == 10) {
                    Globals.DocObj.selectedmarkup.id = listentrynum;
                    //setNContent(DocObj.markuplist[listentrynum].text);
                    //showNDialog(false);
                    /*if (RxCore_GUI_Notediag != undefined) {
                        RxCore_GUI_Notediag.setNotediag(DocObj.markuplist[listentrynum].text, false);
                    }*/

                    /*DocObj.markuplist[listentrynum].selected = false;
                    drawmarkupAll(cntximg);
                    DrawMarkupSelected(context);
                    tool.started = false;*/

                }

            }
        };

        this.touchstart = function (ev: any) {
            if (!Globals.documentopen) {
                return;
            }
            if (Globals.readonlymode) {
                Globals.DocObj.bMarkupLocked = Globals.readonlymode;
            }

            ev.preventDefault();
            tool.started = true;
            const touchPos0 = getTouchPos(Globals.canvas, ev, 0);
            const touchx = touchPos0.x;
            const touchy = touchPos0.y;

            startx = touchPos0.x;
            starty = touchPos0.y;

            prevx = touchx;
            prevy = touchy;
            x = touchx;
            y = touchy;

            let lastTouch = 0;
            const now = new Date().getTime();
            if (tool.LastTouchdata == -1) {
                lastTouch = now + 1;
            } else {
                lastTouch = tool.LastTouchdata;
            }
            const delta = now - lastTouch;
            tool.LastTouchdata = now;

            switch (ev.targetTouches.length) {
                case 1:
                    if (delta < 500 && delta > 0) {
                        tool.doubletap(touchPos0);
                    } else {

                        if (Globals.DocObj.bMarkupLocked) {
                            //id = -1;
                            fmarkup = findmarkup(touchx, touchy);
                            id = fmarkup.id;

                            if (fmarkup.blink) {
                                tool.started = false;

                                if (RxCore_GUI_MarkupLink != undefined) {
                                    RxCore_GUI_MarkupLink.markupLink(Globals.DocObj.markuplist[fmarkup.index]);
                                }
                                return;
                            }

                            listentrynum = Globals.DocObj.getmarkupbynumber(id);
                        } else {
                            fmarkup = findmarkup(touchx, touchy);
                            id = fmarkup.id;

                            if (fmarkup.blink) {
                                tool.started = false;

                                if (RxCore_GUI_MarkupLink != undefined) {
                                    RxCore_GUI_MarkupLink.markupLink(Globals.DocObj.markuplist[fmarkup.index]);
                                }
                                return;
                            }

                            listentrynum = Globals.DocObj.getmarkupbynumber(id);
                        }

                        if (id == -1) {
                            tool.started = false;
                            //context.clearRect(0, 0, canvas.width, canvas.height);
                            drawmarkupAll(Globals.cntximg);
                            DrawMarkupSelected(Globals.context);
                            tool.mousedownhandling(ev, touchPos0);

                            tool.savestate = true;
                        } else {
                            if (tool.savestate) {
                                MarkupSaveState(id);
                                if (Globals.DocObj) {
                                    Globals.DocObj.bMarkupchanged = true;
                                }

                            }
                            tool.savestate = false;

                            drawmarkupAll(Globals.cntximg);
                            DrawMarkupSelected(Globals.context);
                            if (Globals.DocObj.markuplist[listentrynum].type == 9) {
                                if (RxCore_GUI_TextInput != undefined) {
                                    if (Globals.DocObj.selectedmarkup.edit) {
                                        RxCore_GUI_TextInput.operation.edit = false;
                                        RxCore_GUI_TextInput.operation.start = false;
                                        RxCore_GUI_TextInput.operation.create = false;
                                        RxCore_GUI_TextInput.operation.save = true;

                                        const rect = Globals.canvas.getBoundingClientRect();
                                        const xrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].rotatedrect.x + rect.left;
                                        const yrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].rotatedrect.y + rect.top;
                                        //var xrect  = DocObj.markuplist[DocObj.selectedmarkup.id].xscaled + rect.left;
                                        //var yrect = DocObj.markuplist[DocObj.selectedmarkup.id].yscaled + rect.top;

                                        const wrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].wscaled;
                                        const hrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].hscaled;

                                        const txtrect: any = new Rectangle(xrect, yrect, wrect, hrect);
                                        txtrect.rotation = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation;  // TODO:JS->TS:CHECK property rotation does not exist on Rectangle
                                        RxCore_GUI_TextInput.setTextInput(txtrect);

                                        /*var xrect  = DocObj.markuplist[DocObj.selectedmarkup.id].xscaled + rect.left;
                                        var yrect = DocObj.markuplist[DocObj.selectedmarkup.id].yscaled + rect.top;
                                        var wrect = DocObj.markuplist[DocObj.selectedmarkup.id].wscaled;
                                        var hrect = DocObj.markuplist[DocObj.selectedmarkup.id].hscaled;
                                        var txtrect = new Rectangle(xrect,yrect,wrect,hrect);
                                        RxCore_GUI_TextInput.setTextInput(txtrect);*/

                                        //RxCore_GUI_TextInput.setTextInput(xrect,yrect,wrect,hrect);
                                    }
                                }

                                Globals.DocObj.selectedmarkup.id = listentrynum;
                            }
                            if (Globals.DocObj.markuplist[listentrynum].type == 10) {
                                Globals.DocObj.selectedmarkup.id = listentrynum;
                            }

                        }
                    }

                    break;

                case 2:
                    const touchPos1 = getTouchPos(Globals.canvas, ev, 1);
                    startx2 = touchPos1.x;
                    starty2 = touchPos1.y;
                    startw = Math.abs(startx2 - startx);
                    starth = Math.abs(starty2 - starty);
                    startdeltax = startx2 - startx;
                    startdeltay = starty2 - starty;
                    startangle = Math.atan2(startdeltay, startdeltax) * 180 / Math.PI;

                    startwsq = Math.pow(startw, 2);
                    starthsq = Math.pow(starth, 2);

                    startdiagonal = Math.sqrt((startwsq + starthsq));
                    prevdiagonal = startdiagonal;

                    //center of two touchpoints.
                    startcenterx = startx + (startw / 2);
                    startcentery = starty + (starth / 2);
                    prevcenterx = startcenterx;
                    prevcentery = startcentery;
                    prevh = starth;
                    prevw = startw;

                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                        startscalesmall = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                        startscalelarge = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                    } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                        startscalesmall = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf;
                        startscalelarge = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf;

                    } else {
                        startscalesmall = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                        startscalelarge = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;

                    }

                    break;
            }

        }

        this.MSPointerMove = function (ev: any) {
            if (!Globals.documentopen) {
                return;
            }
            if (Globals.readonlymode) {
                Globals.DocObj.bMarkupLocked = Globals.readonlymode;
            }

            let snapoverride = false;
            let i = 0;
            const mousePos = getMousePos(Globals.canvas, ev);
            tool.curmousepos = mousePos;
            while (i < touchpointarr.length) {

                if (touchpointarr[i].pointID == ev.pointerId) {
                    touchpointarr[i].x = mousePos.x;
                    touchpointarr[i].y = mousePos.y;
                }
                i++;
            }
            switch (touchpointarr.length) {
                case 0:
                    tool.labelhandler(mousePos, ev);
                    if (!tool.started) {
                        return;
                    }

                    break;
                case 1:
                    if (!tool.started) {
                        return;
                    }
                    let xdiff = prevx - mousePos.x;
                    let ydiff = prevy - mousePos.y;

                    let rotatedpoint;
                    if (ev.buttons == 1) {

                        if (id != -1 && !Globals.DocObj.bMarkupLocked) {
                            snapPoint = Globals.DocObj.pages[Globals.DocObj.currentpage].getsnap(mousePos.x, mousePos.y);

                            if (!snapPoint || !snapPoint.found || snapPoint == undefined) {
                                havesnap = false;
                            } else {
                                havesnap = snapPoint.found || snapPoint != undefined;
                            }

                            if (Globals.DocObj.markuplist[listentrynum].editaction == 1) {
                                //modify to allow multiple move
                                ev.target.style.cursor = 'move';
                                if (Globals.bMultiselect){
                                    //new method in document object to move all selected if multi select is on.
                                    Globals.DocObj.moveselected(xdiff, ydiff);

                                }else{
                                    Globals.DocObj.markuplist[listentrynum].move(xdiff, ydiff);
                                }

                                //drawmarkupAll(cntximg);
                                DrawMarkupSelected(Globals.context);
                                tool.changedstate = true;

                            }

                            if (Globals.DocObj.markuplist[listentrynum].editaction == 2) {
                                if (havesnap) {
                                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                                        rotatedpoint = snap_rotated(snapPoint);
                                    } else {
                                        rotatedpoint = snapPoint;
                                    }

                                    xdiff = prevx - rotatedpoint.x;
                                    ydiff = prevy - rotatedpoint.y;
                                    snapoverride = true;
                                }

                                ev.target.style.cursor = 'nw-resize';
                                Globals.DocObj.markuplist[listentrynum].scale(xdiff, ydiff, Globals.DocObj.markuplist[listentrynum].scalecorner, Globals.context);

                                DrawMarkupSelected(Globals.context);
                                //drawmarkupAll(cntximg);
                                tool.changedstate = true;

                            }
                            if (Globals.DocObj.markuplist[listentrynum].editaction == 3) {
                                Globals.DocObj.markuplist[listentrynum].rotate(mousePos.x, mousePos.y, Globals.DocObj.markuplist[listentrynum].scalecorner);
                                DrawMarkupSelected(Globals.context);
                                //drawmarkupAll(cntximg);
                                tool.changedstate = true;

                            }
                            if (Globals.DocObj.markuplist[listentrynum].editaction == 4) {
                                if (havesnap) {
                                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                                        rotatedpoint = snap_rotated(snapPoint);
                                    } else {
                                        rotatedpoint = snapPoint;
                                    }

                                    xdiff = prevx - rotatedpoint.x;
                                    ydiff = prevy - rotatedpoint.y;
                                    snapoverride = true;
                                }

                                const bWithin = MousePosdrwext(mousePos);
                                if (bWithin || !Globals.bLimMarkupExtent) {
                                    Globals.DocObj.markuplist[listentrynum].editpoint(xdiff, ydiff, Globals.DocObj.markuplist[listentrynum].selectedpoint);

                                }

                                DrawMarkupSelected(Globals.context);
                                //drawmarkupAll(cntximg);
                                tool.changedstate = true;

                            }
                            if (Globals.DocObj.markuplist[listentrynum].editaction == 6) {
                                ev.target.style.cursor = 'move';
                                Globals.DocObj.markuplist[listentrynum].dimextend(mousePos.x, mousePos.y);

                                //drawmarkupAll(cntximg);
                                DrawMarkupSelected(Globals.context);
                                tool.changedstate = true;

                            }

                        } else {
                            Globals.cntximg.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                            tool.movehandler(mousePos, ev);
                        }

                        if (snapoverride && havesnap) {
                            if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                                rotatedpoint = snap_rotated(snapPoint);
                            } else {
                                rotatedpoint = snapPoint;
                            }

                            prevx = rotatedpoint.x;
                            prevy = rotatedpoint.y;

                        } else {
                            prevx = mousePos.x;
                            prevy = mousePos.y;

                        }
                    } else if (ev.buttons == 4) {
                        Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                        prevx = mousePos.x;
                        prevy = mousePos.y;
                        DrawMarkupSelected(Globals.context);
                    } else {

                    }
                    break;
                case 2:
                    if (!mstouchzoom) {
                        return;
                    }
                    xcur1 = touchpointarr[0].x;
                    ycur1 = touchpointarr[0].y;
                    xcur2 = touchpointarr[1].x;
                    ycur2 = touchpointarr[1].y;

                    //establish rectangle from two points
                    x = Math.min(xcur1, xcur2);
                    y = Math.min(ycur1, ycur2);
                    w = Math.abs(xcur2 - xcur1);
                    h = Math.abs(ycur2 - ycur1);

                    //calculate diagonal from width and height of rectangle
                    wsq = Math.pow(w, 2);
                    hsq = Math.pow(h, 2);
                    diagonal = Math.sqrt((wsq + hsq));
                    //if previous diagonal smaller than current zoomfactor > 1 else smaller

                    const diffdiagonal = diagonal - prevdiagonal;
                    const diagratio = 1 / prevdiagonal;
                    const zoomscalefactor = diagonal * diagratio;

                    //center of two touchpoints.
                    centerx = x + (w / 2);
                    centery = y + (h / 2);

                    xdiff = prevcenterx - centerx;
                    ydiff = prevcentery - centery;
                    const wdiff = prevw - w;
                    const hdiff = prevh - h;

                    if (diffdiagonal > 2 || diffdiagonal < -2) {
                        Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomIn(zoomscalefactor, false, false);

                    }

                    prevdiagonal = diagonal;
                    prevcenterx = centerx;
                    prevcentery = centery;
                    prevw = w;
                    prevh = h;
                    break;
            }

            //console.log(ev.buttons);

            //pan_update(xdiff, ydiff);
            //movemarkup(id,xdiff,ydiff)

        }

        this.mousemove = function (ev: any) {
            if (!Globals.documentopen) {
                return;
            }
            if (Globals.readonlymode) {
                Globals.DocObj.bMarkupLocked = Globals.readonlymode;
            }

            let bwithinbounds = true;
            let snapoverride = false;
            const mousePos = getMousePos(Globals.canvas, ev);
            tool.curmousepos = mousePos;
            tool.labelhandler(mousePos, ev);
            if (!tool.started) {
                return;
            }

            let xdiff = prevx - mousePos.x;
            let ydiff = prevy - mousePos.y;

            let rotatedpoint;
            if (ev.button == 0) {
                if (id != -1 && !Globals.DocObj.bMarkupLocked) {

                    snapPoint = Globals.DocObj.pages[Globals.DocObj.currentpage].getsnap(mousePos.x, mousePos.y);
                    if (!snapPoint || !snapPoint.found || snapPoint == undefined) {
                        havesnap = false;
                    } else {
                        havesnap = snapPoint.found || snapPoint != undefined;
                    }

                    if (Globals.DocObj.markuplist[listentrynum].editaction == 1) {
                        //modify to allow multiple move
                        ev.target.style.cursor = 'move';
                        if (Globals.bMultiselect){
                            //new method in document object to move all selected if multi select is on.
                            Globals.DocObj.moveselected(xdiff, ydiff);
                        }else{
                            Globals.DocObj.markuplist[listentrynum].move(xdiff, ydiff);
                        }
                        //drawmarkupAll(cntximg);
                        DrawMarkupSelected(Globals.context);
                        tool.changedstate = true;

                    }

                    if (Globals.DocObj.markuplist[listentrynum].editaction == 2) {

                        if (havesnap) {
                            if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                                rotatedpoint = snap_rotated(snapPoint);
                            } else {
                                rotatedpoint = snapPoint;
                            }

                            xdiff = prevx - rotatedpoint.x;
                            ydiff = prevy - rotatedpoint.y;
                            snapoverride = true;
                        }

                        if (Globals.DocObj.markuplist[listentrynum].scalecorner == 1 || Globals.DocObj.markuplist[listentrynum].scalecorner == 4) {
                            ev.target.style.cursor = 'nw-resize';
                        } else {
                            ev.target.style.cursor = 'ne-resize';
                        }

                        if (!havesnap){
                            Globals.DocObj.markuplist[listentrynum].scale(xdiff, ydiff, Globals.DocObj.markuplist[listentrynum].scalecorner, Globals.context);
                        }else{
                            if (Globals.DocObj.markuplist[listentrynum].type == 6 || Globals.DocObj.markuplist[listentrynum].type == 7){
                                Globals.DocObj.markuplist[listentrynum].snapToCorner(snapPoint.x, snapPoint.y, Globals.DocObj.markuplist[listentrynum].scalecorner);
                                //new snapto here.
                            }else{
                                Globals.DocObj.markuplist[listentrynum].scale(xdiff, ydiff, Globals.DocObj.markuplist[listentrynum].scalecorner, Globals.context);
                            }
                        }

                        DrawMarkupSelected(Globals.context);
                        //drawmarkupAll(cntximg);
                        tool.changedstate = true;


                    }
                    if (Globals.DocObj.markuplist[listentrynum].editaction == 3) {
                        Globals.DocObj.markuplist[listentrynum].rotate(mousePos.x, mousePos.y, Globals.DocObj.markuplist[listentrynum].scalecorner);
                        DrawMarkupSelected(Globals.context);
                        //drawmarkupAll(cntximg);
                        tool.changedstate = true;

                    }
                    if (Globals.DocObj.markuplist[listentrynum].editaction == 4) {
                        if (havesnap) {
                            if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                                rotatedpoint = snap_rotated(snapPoint);
                            } else {
                                rotatedpoint = snapPoint;
                            }

                            xdiff = prevx - rotatedpoint.x;
                            ydiff = prevy - rotatedpoint.y;
                            //xdiff = snapPoint.x;
                            //ydiff = snapPoint.y;

                            snapoverride = true;
                        }

                        const bWithin = MousePosdrwext(mousePos);
                        if (bWithin || !Globals.bLimMarkupExtent) {
                            //xdiff = prevx - mousePos.x;
                            //ydiff = prevy - mousePos.y;
                            if(Globals.DocObj.pages[Globals.DocObj.currentpage].drotation == 0){
                                Globals.DocObj.markuplist[listentrynum].snapTo(mousePos.x, mousePos.y, Globals.DocObj.markuplist[listentrynum].selectedpoint);
                            }else{
                                const rotmousepoint = mouse_rotated(mousePos.x, mousePos.y);
                                //function mouse_rotated(x,y){
                                Globals.DocObj.markuplist[listentrynum].snapTo(rotmousepoint.x, rotmousepoint.y, Globals.DocObj.markuplist[listentrynum].selectedpoint);
                            }

                            if (havesnap) {
                                if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                                    //rotatedpoint = snap_rotated(snapPoint);
                                    rotatedpoint = snapPoint;
                                } else {
                                    rotatedpoint = snapPoint;
                                }

                                Globals.DocObj.markuplist[listentrynum].snapTo(rotatedpoint.x, rotatedpoint.y, Globals.DocObj.markuplist[listentrynum].selectedpoint);
                            } else {
                                Globals.DocObj.markuplist[listentrynum].editpoint(xdiff, ydiff, Globals.DocObj.markuplist[listentrynum].selectedpoint);
                            }
                        }
                        DrawMarkupSelected(Globals.context);
                        //drawmarkupAll(cntximg);
                        tool.changedstate = true;

                    }
                    if (Globals.DocObj.markuplist[listentrynum].editaction == 6) {
                        ev.target.style.cursor = 'move';
                        Globals.DocObj.markuplist[listentrynum].dimextend(mousePos.x, mousePos.y);

                        //drawmarkupAll(cntximg);
                        DrawMarkupSelected(Globals.context);
                        tool.changedstate = true;

                    }

                } else {
                    Globals.cntximg.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                    tool.movehandler(mousePos, ev);
                }

                if (snapoverride && havesnap) {
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                        rotatedpoint = snap_rotated(snapPoint);
                    } else {
                        rotatedpoint = snapPoint;
                    }

                    prevx = rotatedpoint.x;
                    prevy = rotatedpoint.y;

                } else {
                    prevx = mousePos.x;
                    prevy = mousePos.y;

                }
            } else if (ev.button == 1) {
                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                prevx = mousePos.x;
                prevy = mousePos.y;
                DrawMarkupSelected(Globals.context);

            } else {

            }
            //pan_update(xdiff, ydiff);
            //movemarkup(id,xdiff,ydiff)

            //prevx = mousePos.x;
            //prevy = mousePos.y;

        }

        this.touchmove = function (ev: any) {
            if (!Globals.documentopen) {
                return;
            }
            if (Globals.readonlymode) {
                Globals.DocObj.bMarkupLocked = Globals.readonlymode;
            }

            ev.preventDefault();

            const touchPos0 = getTouchPos(Globals.canvas, ev, 0);
            const eventx = touchPos0.x;
            const eventy = touchPos0.y;
            xcur1 = touchPos0.x;
            ycur1 = touchPos0.y;

            const xdiff = prevx - xcur1;
            const ydiff = prevy - ycur1;

            switch (ev.targetTouches.length) {
                case 1:
                    if (id != -1 && !Globals.DocObj.bMarkupLocked) {
                        if (!tool.started) {
                            return;
                        }
                        if (Globals.DocObj.markuplist[listentrynum].editaction == 1) {
                            //modify to allow multiple move
                            if (Globals.bMultiselect){
                                //new method in document object to move all selected if multi select is on.
                                Globals.DocObj.moveselected(xdiff, ydiff);
                            }else{
                                Globals.DocObj.markuplist[listentrynum].move(xdiff, ydiff);
                            }

                            DrawMarkupSelected(Globals.context);
                            //drawmarkupAll(cntximg);
                            tool.changedstate = true;
                        }

                        if (Globals.DocObj.markuplist[listentrynum].editaction == 2) {
                            Globals.DocObj.markuplist[listentrynum].scale(xdiff, ydiff, Globals.DocObj.markuplist[listentrynum].scalecorner, Globals.context);
                            DrawMarkupSelected(Globals.context);
                            //drawmarkupAll(cntximg);
                            tool.changedstate = true;
                        }
                        if (Globals.DocObj.markuplist[listentrynum].editaction == 3) {
                            Globals.DocObj.markuplist[listentrynum].rotate(eventx, eventy, Globals.DocObj.markuplist[listentrynum].scalecorner);
                            DrawMarkupSelected(Globals.context);
                            //drawmarkupAll(cntximg);
                            tool.changedstate = true;

                        }
                        if (Globals.DocObj.markuplist[listentrynum].editaction == 4) {
                            Globals.DocObj.markuplist[listentrynum].editpoint(xdiff, ydiff, Globals.DocObj.markuplist[listentrynum].selectedpoint);
                            DrawMarkupSelected(Globals.context);
                            //drawmarkupAll(cntximg);
                            tool.changedstate = true;

                        }
                        if (Globals.DocObj.markuplist[listentrynum].editaction == 6) {
                            ev.target.style.cursor = 'move';
                            Globals.DocObj.markuplist[listentrynum].dimextend(touchPos0.x, touchPos0.y);

                            //drawmarkupAll(cntximg);
                            DrawMarkupSelected(Globals.context);
                            tool.changedstate = true;

                        }

                    } else {
                        //cntximg.clearRect(0, 0, canvas.width, canvas.height);
                        //context.clearRect(0, 0, canvas.width, canvas.height);
                        //tool.movehandler(touchPos0,ev);
                        //tool.panhandle(xdiff,ydiff);
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                            if (Globals.DocObj.pages[Globals.DocObj.currentpage].initialscale < Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector) {
                                if (xdiff < 50 && ydiff < 50) {
                                    Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                                }

                            }

                        } else {
                            if (Globals.DocObj.Type == 0) {
                                if (Globals.DocObj.pages[Globals.DocObj.currentpage].startx < 0 || Globals.DocObj.pages[Globals.DocObj.currentpage].endx > Globals.canvas.width) {
                                    if (xdiff < 50 && ydiff < 50) {
                                        Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                                    }

                                } else {
                                    if (Globals.documentcompare) {
                                        Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                                    } else {
                                        Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, ydiff);
                                    }

                                }

                            }
                            if (Globals.DocObj.pages[Globals.DocObj.currentpage].initialscale < (Globals.DocObj.pages[Globals.DocObj.currentpage].dscale / Globals.DocObj.pages[Globals.DocObj.currentpage].bitmapratio)) {
                                if (Globals.DocObj.Type == 0) {
                                    if (Globals.documentcompare) {
                                        Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                                    } else {
                                        Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, ydiff);
                                    }

                                } else {
                                    if (xdiff < 50 && ydiff < 50) {
                                        Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                                    }

                                }

                            }

                        }

                    }

                    prevx = touchPos0.x;
                    prevy = touchPos0.y;
                    break;

                case 2:
                    const touchPos1 = getTouchPos(Globals.canvas, ev, 1);
                    xcur2 = touchPos1.x;
                    ycur2 = touchPos1.y;
                    w = Math.abs(xcur2 - xcur1);
                    h = Math.abs(ycur2 - ycur1);
                    wsq = Math.pow(w, 2);
                    hsq = Math.pow(h, 2);
                    diagonal = Math.sqrt((wsq + hsq));
                    const diffdiagonal = diagonal - prevdiagonal;


                    /* Andriy:: Do we really need scalechanged var? */
                    let scalechanged = false;

                    const diagratio = 1 / prevdiagonal;
                    const zoomscalefactor = diagonal * diagratio;
                    const deltax = xcur2 - xcur1;
                    const deltay = ycur2 - ycur1;
                    curangle = Math.atan2(deltay, deltax) * 180 / Math.PI;
                    diffangle = curangle - startangle;
                    //center of two touchpoints.
                    centerx = xcur1 + (w / 2);
                    centery = ycur1 + (h / 2);
                    const zoomcenter = { x: centerx, y: centery };

                    const wdiff = prevw - w;
                    const hdiff = prevh - h;

                    let invertzoomscale, bUseZoomOut;
                    if (diffdiagonal > 2 || diffdiagonal < -2) {

                        if (zoomscalefactor < 1) {
                            invertzoomscale = 1 / zoomscalefactor;
                            bUseZoomOut = true;
                        } else {
                            invertzoomscale = zoomscalefactor;
                            bUseZoomOut = false;
                        }

                        if (bUseZoomOut) {
                            if (tool.belowlimitExtent(invertzoomscale)) {
                                Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomOut(invertzoomscale, false, false, zoomcenter);
                                scalechanged = true;
                            } else {
                                scalechanged = false;
                            }
                        } else {
                            Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomIn(invertzoomscale, false, false, zoomcenter);
                        }

                        /*if(tool.belowlimitExtent(invertzoomscale)){

                            scalechanged = true;
                        }else{
                            scalechanged = false;
                        }*/

                        prevdiagonal = diagonal;
                        //scalechanged = true;
                        /*if (DocObj.pages[DocObj.currentpage].usepdfjs) {
                            //var curscale = DocObj.pages[DocObj.currentpage].curpagescale * DocObj.pages[DocObj.currentpage].dscalepdf;

                            var pagedim = DocObj.pages[DocObj.currentpage].getpagedim();

                            if((pagedim.w * zoomscalefactor) < canvasowidth && (pagedim.h * zoomscalefactor) < canvasoheight){
                                scalechanged = false;
                                DocObj.pages[DocObj.currentpage].zoomall();
                            }

                            //var cwidth = DocObj.pages[DocObj.currentpage].endx
                            //if (DocObj.pages[DocObj.currentpage].endx - )



                        }else if (DocObj.pages[DocObj.currentpage].usevectorxml) {


                            if (DocObj.pages[DocObj.currentpage].initialscale > DocObj.pages[DocObj.currentpage].dscalevector) {
                                scalechanged = false;
                                DocObj.pages[DocObj.currentpage].zoomall();

                            }


                        } else {
                            if (DocObj.pages[DocObj.currentpage].initialscale > (DocObj.pages[DocObj.currentpage].dscale / DocObj.pages[DocObj.currentpage].bitmapratio)) {
                                scalechanged = false;
                                DocObj.pages[DocObj.currentpage].zoomall();
                            }

                        }*/

                    }
                    if (Math.abs(diffangle) > 10) {
                        // DocObj.pages[DocObj.currentpage].drotation = diffangle;
                    }

                    break;

            }

            prevcenterx = centerx;
            prevcentery = centery;
            prevw = w;
            prevh = h;
            prevx = xcur1;
            prevy = ycur1;

        }

        this.keyup = function (ev: any) {
            if (typeof Globals.nScrollKeyNum.indexOf === "function") {
                if (Globals.nScrollKeyNum.indexOf(ev.keyCode) >= 0) {
                    tool.scrollkeyOn = false;
                }

            }

            switch (ev.keyCode) {
                case Globals.nScrollKeyNum:
                    tool.scrollkeyOn = false;
                    break;

            }
        }

        this.keydown = function (ev: any) {
            //ev.preventDefault();
            if (Globals.readonlymode) {
                Globals.DocObj.bMarkupLocked = Globals.readonlymode;
            }

            if (!Globals.documentopen || Globals.DocObj.bMarkupLocked) {
                return;
            }

            if (typeof Globals.nScrollKeyNum.indexOf === "function") {
                if (Globals.nScrollKeyNum.indexOf(ev.keyCode) >= 0) {
                    tool.scrollkeyOn = true;
                }
            }

            switch (ev.keyCode) {
                case Globals.nScrollKeyNum:
                    tool.scrollkeyOn = true;
                    break;
                case 13:
                    break;
                case 8:
                    break;
                case 46:
                    if(!Globals.bMultiselect){
                        if(listentrynum == -1){ // TODO:JS->TS:CHECK removeed space between - and 1
                            break;
                        }

                        if(Globals.DocObj.markuplist[listentrynum] == undefined){
                            break;
                        }

                    }
                    if(listentrynum != -1){  // TODO:JS->TS:CHECK removeed space between - and 1
                        if(Globals.DocObj.markuplist[listentrynum].type == 9 && Globals.DocObj.markuplist[listentrynum].selectedit){
                            break;
                        }
                    }

                    if (Globals.bNoteFocus) {
                        break;
                    }

                    deletemarkup();
                    break;

            }

        }

        this.MSPointerUp = function (ev: any) {
            if (!Globals.documentopen) {
                return;
            }

            ev.target.style.cursor = 'default';
            touchpointarr.pop();

            if (tool.started) {
                //tool.mousemove(ev);
                if (id != -1) {
                    if (tool.changedstate) {
                        tool.savestate = true;

                    }
                    if (Globals.DocObj.markuplist[listentrynum].editaction == 4) {
                        Globals.DocObj.markuplist[listentrynum].findrectangle();
                        //drawmarkupAll(cntximg);

                    }
                    tool.started = false;
                } else {
                    tool.mouseuphandler(ev);
                }

            }

        }

        this.mouseup = function (ev: any) {
            if (!Globals.documentopen) {
                return;
            }

            ev.target.style.cursor = 'default';

            if (tool.started) {
                //tool.mousemove(ev);
                if (id != -1) {
                    if (tool.changedstate) {
                        tool.savestate = true;

                    }
                    if (Globals.DocObj.markuplist[listentrynum].editaction == 4) {
                        Globals.DocObj.markuplist[listentrynum].findrectangle();
                        //drawmarkupAll(cntximg);

                    }
                    tool.started = false;
                } else {
                    tool.mouseuphandler(ev);
                }

                //tool.started = false;

            }
        }

        this.touchcancel = function (ev: any) {
            if (!Globals.documentopen) {
                return;
            }

            ev.preventDefault();
            if (tool.started) {
                if (id != -1) {
                    if (tool.changedstate) {
                        tool.savestate = true;

                    }
                    if (Globals.DocObj.markuplist[listentrynum].editaction == 4) {
                        Globals.DocObj.markuplist[listentrynum].findrectangle();
                        //drawmarkupAll(cntximg);

                    }
                    tool.started = false;
                    if (Globals.DocObj.Type == 0 && !Globals.documentcompare) {

                        if (Globals.DocObj.currentpage == 0) {
                            while (Globals.DocObj.pages[Globals.DocObj.currentpage].starty > 0) {
                                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, 1);
                            }

                        }
                        if (Globals.DocObj.currentpage == Globals.DocObj.NumPages - 1) {
                            while (Globals.DocObj.pages[Globals.DocObj.currentpage].endy < Globals.canvas.height) {
                                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, -1);
                            }

                        }
                    }
                } else {
                    tool.mouseuphandler(ev);
                }
                //tool.touchmove(ev);

            }
        }

        this.touchend = function (ev: any) {
            if (!Globals.documentopen) {
                return;
            }

            ev.preventDefault();
            if (tool.started) {
                if (id != -1) {
                    if (tool.changedstate) {
                        tool.savestate = true;

                    }
                    if (Globals.DocObj.markuplist[listentrynum].editaction == 4) {
                        Globals.DocObj.markuplist[listentrynum].findrectangle();
                        //drawmarkupAll(cntximg);

                    }
                    tool.started = false;
                    if (Globals.DocObj.Type == 0 && !Globals.documentcompare) {

                        if (Globals.DocObj.currentpage == 0) {
                            while (Globals.DocObj.pages[Globals.DocObj.currentpage].starty > 0) {
                                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, 1);
                            }

                        }
                        if (Globals.DocObj.currentpage == Globals.DocObj.NumPages - 1) {
                            while (Globals.DocObj.pages[Globals.DocObj.currentpage].endy < Globals.canvas.height) {
                                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, -1);
                            }

                        }
                    }
                } else {
                    tool.mouseuphandler(ev);
                }
                //tool.touchmove(ev);

            }
        }

    }


    // The oval tool.
    Globals.tools.oval = function (params: any) {
        const tool = this;
        let prevx = 0,
            prevy = 0;
        //var kappa = .5522848;
        let ovalmarkupobj: any;
        this.started = false;
        this.name = 'oval';
        this.anglelengthsupport = false;
        const type = params.p1;

        let curmarkup = Globals.DocObj.markuplist.length;
        let havesnap = false;
        let snapPoint:any;

        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }


        this.startOval = function (mousePos:any) {

            tool.started = true;
            if(Globals.DocObj){
                Globals.DocObj.bMarkupchanged = true;
            }

            if (havesnap) {
                let rotatedpoint;
                if(Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0){
                    rotatedpoint = snap_rotated(snapPoint);
                }else{
                    rotatedpoint = snapPoint;
                }

                tool.x0 = rotatedpoint.x;
                tool.y0 = rotatedpoint.y;
            } else {
                tool.x0 = mousePos.x;
                tool.y0 = mousePos.y;
            }

            //ovalmarkupobj = new MarkupObject(3, type, fillstyle);
            ovalmarkupobj = new MarkupObject(4, type, Globals.fillstyle);
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                ovalmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                ovalmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                ovalmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                ovalmarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                ovalmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                ovalmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                ovalmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                ovalmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                ovalmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }

            ovalmarkupobj.pagenumber = Globals.DocObj.getcurPage();
            ovalmarkupobj.editaction = 0;


        };

        this.drawOval = function (mousePos:any) {
            if (havesnap) {
                let rotatedpoint;
                if(Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0){
                    rotatedpoint = snap_rotated(snapPoint);
                }else{
                    rotatedpoint = snapPoint;
                }

                ovalmarkupobj.x = Math.min(rotatedpoint.x, tool.x0);
                ovalmarkupobj.y = Math.min(rotatedpoint.y, tool.y0);
                ovalmarkupobj.w = Math.abs(rotatedpoint.x - tool.x0);
                ovalmarkupobj.h = Math.abs(rotatedpoint.y - tool.y0);


                prevx = rotatedpoint.x;
                prevy = rotatedpoint.y;


            } else {
                ovalmarkupobj.x = Math.min(mousePos.x, tool.x0);
                ovalmarkupobj.y = Math.min(mousePos.y, tool.y0);
                ovalmarkupobj.w = Math.abs(mousePos.x - tool.x0);
                ovalmarkupobj.h = Math.abs(mousePos.y - tool.y0);

                prevx = mousePos.x;
                prevy = mousePos.y;


            }
        };

        this.endOval = function () {
            /*if(rectmarkupobj.w==0 || rectmarkupobj.h==0){
             return;
             }*/
            tool.started = false;

            if (!Globals.bMultimarkupadd) {

                Globals.bMarkupcrated = true;
                //ft 08.08.2018 changed from separate index to direct array length
                Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                //nMarkupcreated = DocObj.nummarkups;
            }

            ovalmarkupobj.savemetolistDraw();
            ovalmarkupobj = null;


            //tool.started = false;
            //markuplist.add(drawrectangle);
            img_update();
            drawmarkupAll(Globals.cntximg);

            if (!Globals.bMultimarkupadd) {
                //need to move to connection object.
                //markupcreated();
                if (RxCore_GUI_Markup != undefined) {
                    //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                    const operation = {created : true, modified : false, deleted : false};
                    RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                }

            }


        };

        this.setSnap = function (mousePos:any) {
            snapPoint = Globals.DocObj.pages[Globals.DocObj.currentpage].getsnap(mousePos.x, mousePos.y);

            if(snapPoint == undefined){
                havesnap = false;
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            }

            if (snapPoint.found ) {
                havesnap = true;
                drawsnap(context,snapPoint);
                //context.lineWidth = 1;
                //context.strokeStyle = 'blue';
                //context.strokeRect(snapPoint.x - 5, snapPoint.y - 5, 10, 10);
            } else {
                havesnap = false;
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            }

        };


        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';

            tool.started = true;
            if(Globals.DocObj){
                Globals.DocObj.bMarkupchanged = true;
            }


            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if(Globals.DocObj){
                    Globals.DocObj.bMarkupchanged = false;
                }

                ev.target.style.cursor = 'default';
                return;
            }
            tool.startOval(mousePos);


            /*
            tool.x0 = mousePos.x;
            tool.y0 = mousePos.y;
            //ovalmarkupobj = new MarkupObject(4, 0, fillstyle);
            ovalmarkupobj = new MarkupObject(4, type, Globals.fillstyle);
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                ovalmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                ovalmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                ovalmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                ovalmarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                ovalmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                ovalmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                ovalmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                ovalmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                ovalmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }
            ovalmarkupobj.pagenumber = Globals.DocObj.getcurPage();
            */

        };

        this.mousedown = function (ev: any) {

            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';

            tool.started = true;
            if(Globals.DocObj){
                Globals.DocObj.bMarkupchanged = true;
            }

            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if(Globals.DocObj){
                    Globals.DocObj.bMarkupchanged = false;
                }

                ev.target.style.cursor = 'default';
                return;
            }

            tool.startOval(mousePos);

            /*
            tool.x0 = mousePos.x;
            tool.y0 = mousePos.y;
            //ovalmarkupobj = new MarkupObject(4, 0, fillstyle);
            ovalmarkupobj = new MarkupObject(4, type, Globals.fillstyle);
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                ovalmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                ovalmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                ovalmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                ovalmarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                ovalmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                ovalmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                ovalmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                ovalmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                ovalmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }

            ovalmarkupobj.pagenumber = Globals.DocObj.getcurPage(); */


        };



        this.touchstart = function (ev: any) {
            ev.preventDefault();
            //context.strokeStyle = "red";
            tool.started = true;
            if (Globals.DocObj) {
                Globals.DocObj.bMarkupchanged = true;
            }

            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const bWithin = MousePosdrwext(touchPos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                return;
            }

            tool.x0 = touchPos.x;
            tool.y0 = touchPos.y;

            //ovalmarkupobj = new MarkupObject(4, 0, fillstyle);
            ovalmarkupobj = new MarkupObject(4, type, Globals.fillstyle);
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                ovalmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                ovalmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                ovalmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                ovalmarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                ovalmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                ovalmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                ovalmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                ovalmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                ovalmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }

            ovalmarkupobj.pagenumber = Globals.DocObj.getcurPage();
        }

        this.MSPointerMove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            tool.setSnap(mousePos);

            if (!tool.started) {
                return;
            }

            const bWithin = MousePosdrwext(mousePos);

            // let x, y, w, h;
            if (bWithin || !Globals.bLimMarkupExtent) {
                tool.drawOval(mousePos);

                /*
                x = Math.min(mousePos.x, tool.x0);
                y = Math.min(mousePos.y, tool.y0);
                w = Math.abs(mousePos.x - tool.x0);
                h = Math.abs(mousePos.y - tool.y0);

                prevx = mousePos.x;
                prevy = mousePos.y;
                */
            } else {
                ovalmarkupobj.x = Math.min(prevx, tool.x0);
                ovalmarkupobj.y = Math.min(prevy, tool.y0);
                ovalmarkupobj.w = Math.abs(prevx - tool.x0);
                ovalmarkupobj.h = Math.abs(prevy - tool.y0);

                /*
                x = Math.min(prevx, tool.x0);
                y = Math.min(prevy, tool.y0);
                w = Math.abs(prevx - tool.x0);
                h = Math.abs(prevy - tool.y0);
                */
            }

            /*
            ovalmarkupobj.x = x;
            ovalmarkupobj.y = y;
            ovalmarkupobj.w = w;
            ovalmarkupobj.h = h;
            */

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

            if (havesnap) {
                drawsnap(Globals.context,snapPoint);
            }

            if (!ovalmarkupobj.w || !ovalmarkupobj.h) {
                return;
            }
            ovalmarkupobj.drawme(Globals.context);

        }

        this.mousemove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            tool.setSnap(mousePos);

            if (!tool.started) {
                return;
            }

            const bWithin = MousePosdrwext(mousePos);
            if (bWithin || !Globals.bLimMarkupExtent) {
                tool.drawOval(mousePos);
                /*
                ovalmarkupobj.x = Math.min(mousePos.x, tool.x0);
                ovalmarkupobj.y = Math.min(mousePos.y, tool.y0);
                ovalmarkupobj.w = Math.abs(mousePos.x - tool.x0);
                ovalmarkupobj.h = Math.abs(mousePos.y - tool.y0);

                prevx = mousePos.x;
                prevy = mousePos.y;
                */

            } else {
                ovalmarkupobj.x = Math.min(prevx, tool.x0);
                ovalmarkupobj.y = Math.min(prevy, tool.y0);
                ovalmarkupobj.w = Math.abs(prevx - tool.x0);
                ovalmarkupobj.h = Math.abs(prevy - tool.y0);

            }

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

            if (havesnap) {
                drawsnap(Globals.context,snapPoint);
            }

            ovalmarkupobj.drawme(Globals.context);

            if (!ovalmarkupobj.w || !ovalmarkupobj.h) { // TODO:JS->TS:CHECK since the if block is now the last in the function it can be removed
                return;
            }


        }

        this.touchmove = function (ev: any) {
            ev.preventDefault();
            if (!tool.started) {
                return;
            }
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const bWithin = MousePosdrwext(touchPos);

            let x, y, w, h;
            if (bWithin || !Globals.bLimMarkupExtent) {
                x = Math.min(touchPos.x, tool.x0);
                y = Math.min(touchPos.y, tool.y0);
                w = Math.abs(touchPos.x - tool.x0);
                h = Math.abs(touchPos.y - tool.y0);

                prevx = touchPos.x;
                prevy = touchPos.y;

            } else {
                x = Math.min(prevx, tool.x0);
                y = Math.min(prevy, tool.y0);
                w = Math.abs(prevx - tool.x0);
                h = Math.abs(prevy - tool.y0);

            }

            /*var x = Math.min(touchPos.x,  tool.x0),
             y = Math.min(touchPos.y,  tool.y0),
             w = Math.abs(touchPos.x - tool.x0),
             h = Math.abs(touchPos.y - tool.y0);*/

            ovalmarkupobj.x = x;
            ovalmarkupobj.y = y;
            ovalmarkupobj.w = w;
            ovalmarkupobj.h = h;

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

            if (!w || !h) {
                return;
            }
            ovalmarkupobj.drawme(Globals.context);

        }

        this.MSPointerUp = function (ev: any) {
            ev.target.style.cursor = 'default';
            if (tool.started) {
                tool.mousemove(ev);
                tool.endOval();
                tool.started = false;

                /*
                if (!Globals.bMultimarkupadd) {

                    Globals.bMarkupcrated = true;
                    //ft 08.08.2018 changed from separate index to direct array length
                    //nMarkupcreated = DocObj.nummarkups;
                    Globals.nMarkupcreated = Globals.DocObj.markuplist.length;

                }
                */

                /*
                ovalmarkupobj.savemetolistDraw();
                ovalmarkupobj = null;

                tool.started = false;
                img_update();

                if (!Globals.bMultimarkupadd) {
                    //need to move to connection object.
                    //markupcreated();
                    if (RxCore_GUI_Markup != undefined) {
                        //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                        const operation = { created: true, modified: false, deleted: false };
                        RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                    }

                }
                */

            }

        }

        this.mouseup = function (ev: any) {
            ev.target.style.cursor = 'default';
            if (tool.started) {
                tool.mousemove(ev);
                tool.endOval();
                tool.started = false;

                /*
                if (!Globals.bMultimarkupadd) {

                    Globals.bMarkupcrated = true;
                    //ft 08.08.2018 changed from separate index to direct array length
                    //nMarkupcreated = DocObj.nummarkups;
                    Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                }

                ovalmarkupobj.savemetolistDraw();
                ovalmarkupobj = null;

                tool.started = false;
                img_update();

                if (!Globals.bMultimarkupadd) {
                    //need to move to connection object.
                    //markupcreated();
                    if (RxCore_GUI_Markup != undefined) {
                        //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                        const operation = { created: true, modified: false, deleted: false };
                        RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                    }

                } */

            }
        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {
                tool.endOval();
                tool.started = false;

                /*
                if (!Globals.bMultimarkupadd) {

                    Globals.bMarkupcrated = true;
                    //ft 08.08.2018 changed from separate index to direct array length
                    //nMarkupcreated = DocObj.nummarkups;
                    Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                }

                ovalmarkupobj.savemetolistDraw();
                img_update();
                tool.touchmove(ev);

                ovalmarkupobj = null;
                tool.started = false;

                if (!Globals.bMultimarkupadd) {
                    //need to move to connection object.
                    //markupcreated();
                    if (RxCore_GUI_Markup != undefined) {
                        //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                        const operation = { created: true, modified: false, deleted: false };
                        RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                    }

                } */

            }
        }

        this.touchend = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {
                if (!Globals.bMultimarkupadd) {

                    Globals.bMarkupcrated = true;
                    //ft 08.08.2018 changed from separate index to direct array length
                    //nMarkupcreated = DocObj.nummarkups;
                    Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                }

                ovalmarkupobj.savemetolistDraw();
                img_update();
                tool.touchmove(ev);

                ovalmarkupobj = null;
                tool.started = false;

                if (!Globals.bMultimarkupadd) {
                    //need to move to connection object.
                    //markupcreated();
                    if (RxCore_GUI_Markup != undefined) {
                        //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                        const operation = { created: true, modified: false, deleted: false };
                        RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                    }

                }

            }
        }

    }


    // The arrow tool.
    Globals.tools.arrow = function (params: any) {
        const tool = this;
        let prevx = 0,
            prevy = 0;

        let limprevx = 0,
            limprevy = 0;

        let arrowmarkupobj: any;
        //ft 08.08.2018 changed from separate index to direct array length
        const curmarkup = Globals.DocObj.markuplist.length;
        //var curmarkup = DocObj.nummarkups;
        this.started = false;
        this.name = 'arrow';

        this.anglelengthsupport = true;

        let havesnap = false;
        let snapPoint: any;
        const type = params.p1;

        this.startx = 0;
        this.starty = 0;
        this.orgscale = 1.0;
        this.orgdx = 0.0;
        this.orgdy = 0.0;

        this.bUsemouseinput = true;

        this.curmousepos = { x: 0, y: 0 };

        this.setAngleLength = function (angle: any, length: any, type: any) {
            this.bUsemouseinput = false;
            if (arrowmarkupobj != undefined) {

                arrowmarkupobj.x = tool.x0;
                arrowmarkupobj.y = tool.y0;
                const curx2 = arrowmarkupobj.w;
                const cury2 = arrowmarkupobj.h;

                const secondpoint = arrowmarkupobj.setAnglelength(length, angle, type);
                //add state to markup object to change rotate adjustment bUsemouseinput
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

                if (MousePosdrwext({ x: secondpoint.w, y: secondpoint.h })) {
                    arrowmarkupobj.w = secondpoint.w;
                    arrowmarkupobj.h = secondpoint.h;
                    tool.setdimoffset(false);
                    arrowmarkupobj.drawme(Globals.context);

                } else {
                    arrowmarkupobj.w = curx2;
                    arrowmarkupobj.h = cury2;

                    this.bUsemouseinput = true;
                    arrowmarkupobj.drawme(Globals.context);
                    arrowmarkupobj.bUsemouseinput = true;
                    if (RxCore_GUI_markupParamsError != undefined) {
                        RxCore_GUI_markupParamsError.onDrawError('outside');
                    }

                }

            }

        }

        this.apply = function () {
            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            tool.setdimoffset(false);
            arrowmarkupobj.drawme(Globals.context);
            if (!Globals.bMultimarkupadd) {

                Globals.bMarkupcrated = true;
                //ft 08.08.2018 changed from separate index to direct array length
                //nMarkupcreated = DocObj.nummarkups;
                Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
            }

            arrowmarkupobj.savemetolistDraw();
            //arrowmarkupobj.savemetolistLoad();
            arrowmarkupobj = null;
            tool.started = false;
            //markupobject.markupnumber = DocObj.nummarkups;         DocObj.markuplist[markupobject.markupnumber] = this;
            img_update();

            if (!Globals.bMultimarkupadd) {
                //need to move to connection object.
                //markupcreated();
                if (RxCore_GUI_Markup != undefined) {
                    //var operation = {created : true, modified : false, deleted : false};
                    RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], { created: true, modified: false, deleted: false });
                    //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                }

            }
        }

        this.scrollhandling = function (movey: any) {
            if (!Globals.documentopen || Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                return;
            }

            if (movey < 0) {

                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs && Globals.DocObj.pages.length > 1) {

                    if (Globals.DocObj.currentpage == Globals.DocObj.NumPages - 1) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].endy <= Globals.canvas.height) {
                            movey = 0;
                        }
                    }
                    Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, -movey);

                } else {

                    Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomOut(1.1, false, false, tool.curmousepos);

                    if (tool.started) {

                        tool.setdimoffset(false);

                    }

                }

            } else {

                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs && Globals.DocObj.pages.length > 1) {

                    if (Globals.DocObj.currentpage == 0) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].starty >= 0) {
                            movey = 0;
                        }

                    }
                    Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, -movey);


                } else {

                    Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomIn(1.1, false, false, tool.curmousepos);

                    if (tool.started) {
                        tool.setdimoffset(false);

                    }

                }

            }

        }

        this.wheel = function (ev: any) {
            let delta = 0;
            if (ev.wheelDelta !== undefined) { // WebKit / Opera / Explorer 9

                delta = ev.wheelDelta;

            } else if (ev.deltaY !== undefined) { // Firefox

                delta = -ev.deltaY * 50;
            }

            tool.scrollhandling(delta);
        }

        this.setdimoffset = function (initial: any) {
            if (initial) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                    arrowmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                    arrowmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                    arrowmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
                } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                    arrowmarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                    arrowmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                    arrowmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

                } else {
                    arrowmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                    arrowmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                    arrowmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;
                }
                tool.orgscale = arrowmarkupobj.scaling;
                tool.orgdx = arrowmarkupobj.xoffset;
                tool.orgdy = arrowmarkupobj.yoffset;
            }

            //move operation to markup object.

            const curscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getdscale();
            const pagedx = Globals.DocObj.pages[Globals.DocObj.currentpage].getdx();
            const pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].getdy();

            const scalediff = (curscale / arrowmarkupobj.scaling);

            const changex = ((arrowmarkupobj.w - pagedx) / scalediff) + arrowmarkupobj.xoffset;
            const changey = ((arrowmarkupobj.h - pagedy) / scalediff) + arrowmarkupobj.yoffset;

            //arrowmarkupobj.w = changex;
            //arrowmarkupobj.h = changey;
        }

        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }

        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);

            let rotatedpoint;
            if (ev.button == 0) {
                if (!tool.started) {

                    if (bWithin || !Globals.bLimMarkupExtent) {
                        tool.started = true;
                        if (Globals.DocObj) {
                            Globals.DocObj.bMarkupchanged = true;
                        }

                        if (havesnap) {

                            if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                                rotatedpoint = snap_rotated(snapPoint);
                            } else {
                                rotatedpoint = snapPoint;
                            }

                            tool.x0 = rotatedpoint.x;
                            tool.y0 = rotatedpoint.y;

                        } else {
                            tool.x0 = mousePos.x;
                            tool.y0 = mousePos.y;

                        }
                        if (type == 10){
                            arrowmarkupobj = new MarkupObject(4, 1, Globals.fillstyle);
                        }else{
                            arrowmarkupobj = new MarkupObject(6, type, 0);
                        }

                        arrowmarkupobj.pagenumber = Globals.DocObj.getcurPage();
                        tool.setdimoffset(true);
                        tool.startx = tool.x0;
                        tool.starty = tool.y0;
                        arrowmarkupobj.editaction = 0;
                    }

                } else {
                    //tool.mousemove(ev);
                    const ccentre = {x : tool.x0, y : tool.y0};
                    let bWithinradius:any;
                    if (arrowmarkupobj.type == 4 && arrowmarkupobj.subtype == 1){
                        bWithinradius = MousePosradiusdrwext(ccentre,mousePos);
                    }else{
                        bWithinradius = true;
                    }

                    if ((bWithin && bWithinradius) || !Globals.bLimMarkupExtent) {
                        if (havesnap) {
                            if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                                rotatedpoint = snap_rotated(snapPoint);
                            } else {
                                rotatedpoint = snapPoint;
                            }
                            if (tool.bUsemouseinput) {
                                arrowmarkupobj.w = rotatedpoint.x;
                                arrowmarkupobj.h = rotatedpoint.y;
                            }

                        } else {
                            if (tool.bUsemouseinput) {
                                arrowmarkupobj.w = mousePos.x;
                                arrowmarkupobj.h = mousePos.y;
                            }

                        }

                        Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                        tool.setdimoffset(false);
                        arrowmarkupobj.drawme(Globals.context);
                        if (!Globals.bMultimarkupadd) {

                            Globals.bMarkupcrated = true;
                            //ft 08.08.2018 changed from separate index to direct array length
                            Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                            //nMarkupcreated = DocObj.nummarkups;
                        }

                        arrowmarkupobj.savemetolistDraw();
                        arrowmarkupobj = null;
                        tool.started = false;

                        img_update();

                        ev.target.style.cursor = 'default';

                        if (!Globals.bMultimarkupadd) {
                            //need to move to connection object.
                            //markupcreated();
                            if (RxCore_GUI_Markup != undefined) {
                                //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                                const operation = { created: true, modified: false, deleted: false };
                                RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], operation);
                            }

                        }
                    }

                }
            } else {
                prevx = mousePos.x;
                prevy = mousePos.y;

            }

        }

        this.mousedown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);

            let rotatedpoint;
            if (ev.button == 0) {
                if (!tool.started) {
                    //context.strokeStyle = "red";

                    if (bWithin || !Globals.bLimMarkupExtent) {
                        tool.started = true;
                        if (Globals.DocObj) {
                            Globals.DocObj.bMarkupchanged = true;
                        }


                        if (havesnap) {
                            if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                                rotatedpoint = snap_rotated(snapPoint);
                            } else {
                                rotatedpoint = snapPoint;
                            }

                            tool.x0 = rotatedpoint.x;
                            tool.y0 = rotatedpoint.y;

                        } else {
                            tool.x0 = mousePos.x;
                            tool.y0 = mousePos.y;

                        }
                        if (type == 10){
                            //circle
                            arrowmarkupobj = new MarkupObject(4, 1, Globals.fillstyle);
                        }else{
                            arrowmarkupobj = new MarkupObject(6, type, 0);
                        }



                        arrowmarkupobj.pagenumber = Globals.DocObj.getcurPage();
                        tool.setdimoffset(true);

                        tool.startx = tool.x0;
                        tool.starty = tool.y0;


                        arrowmarkupobj.editaction = 0;
                    }

                } else {
                    const ccentre = {x : tool.x0, y : tool.y0};
                    let bWithinradius;
                    if (arrowmarkupobj.type == 4 && arrowmarkupobj.subtype == 1){
                        bWithinradius = MousePosradiusdrwext(ccentre,mousePos);
                    }else{
                        bWithinradius = true;
                    }

                    if ((bWithin && bWithinradius) || !Globals.bLimMarkupExtent) {
                        if (havesnap) {
                            if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                                rotatedpoint = snap_rotated(snapPoint);
                            } else {
                                rotatedpoint = snapPoint;
                            }
                            if (tool.bUsemouseinput) {
                                arrowmarkupobj.w = rotatedpoint.x;
                                arrowmarkupobj.h = rotatedpoint.y;
                            }

                        } else {
                            if (tool.bUsemouseinput) {
                                if(Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0 && Globals.bOrthoOn){
                                    //var rotpoint = ortho_rotate(mousePos);
                                    const rotpoint = ortho_rotate(mousePos); // TODO:JS->TS:CHECK uncommented rotpoint
                                    arrowmarkupobj.w = rotpoint.x;
                                    arrowmarkupobj.h = rotpoint.y;

                                }else{
                                    arrowmarkupobj.w = mousePos.x;
                                    arrowmarkupobj.h = mousePos.y;

                                }
                            }

                        }

                        Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                        tool.setdimoffset(false);
                        arrowmarkupobj.drawme(Globals.context);
                        if (!Globals.bMultimarkupadd) {

                            Globals.bMarkupcrated = true;
                            //ft 08.08.2018 changed from separate index to direct array length
                            //nMarkupcreated = DocObj.nummarkups;
                            Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                        }

                        arrowmarkupobj.savemetolistDraw();
                        arrowmarkupobj = null;
                        tool.started = false;
                        //markupobject.markupnumber = DocObj.nummarkups;         DocObj.markuplist[markupobject.markupnumber] = this;
                        img_update();

                        if (!Globals.bMultimarkupadd) {
                            //need to move to connection object.
                            //markupcreated();
                            if (RxCore_GUI_Markup != undefined) {
                                //var operation = {created : true, modified : false, deleted : false};
                                RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], { created: true, modified: false, deleted: false });
                                //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                            }

                        }

                    }

                }

            } else {
                prevx = mousePos.x;
                prevy = mousePos.y;

            }

        }

        this.touchstart = function (ev: any) {
            ev.preventDefault();
            //context.strokeStyle = "red";
            tool.started = true;
            if (Globals.DocObj) {
                Globals.DocObj.bMarkupchanged = true;
            }

            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const bWithin = MousePosdrwext(touchPos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                return;
            }

            tool.x0 = touchPos.x;
            tool.y0 = touchPos.y;

            if (type == 10){
                arrowmarkupobj = new MarkupObject(4, 1, Globals.fillstyle);
            }else{
                arrowmarkupobj = new MarkupObject(6, type, 0);
            }

            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                arrowmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                arrowmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                arrowmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                arrowmarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                arrowmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                arrowmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

            } else {
                arrowmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                arrowmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                arrowmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;

            }

            arrowmarkupobj.pagenumber = Globals.DocObj.getcurPage();
            arrowmarkupobj.editaction = 0;
        }


        this.MSPointerMove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            tool.curmousepos = mousePos;

            /*
            // JS->TS:INFO commented out
            if (!tool.bUsemouseinput) {

                break;
             }
             */

            const xdiff = prevx - mousePos.x;
            const ydiff = prevy - mousePos.y;

            snapPoint = Globals.DocObj.pages[Globals.DocObj.currentpage].getsnap(mousePos.x, mousePos.y);

            if (!snapPoint.found || snapPoint == undefined) {
                havesnap = false;
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            } else {
                havesnap = true;
                drawsnap(Globals.context, snapPoint);

            }

            if (ev.buttons == 2) {

                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                tool.setdimoffset(false);
                prevx = mousePos.x;
                prevy = mousePos.y;

            }

            if (!tool.started) {

                return;
            }

            const bWithin = MousePosdrwext(mousePos);
            let rotatedpoint;
            const ccentre = {x : tool.x0, y : tool.y0};
            let bWithinradius;
            if (arrowmarkupobj.type == 4 && arrowmarkupobj.subtype == 1){
                bWithinradius = MousePosradiusdrwext(ccentre,mousePos);
            }else{
                bWithinradius = true;
            }

            if ((bWithin && bWithinradius) || !Globals.bLimMarkupExtent) {
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                arrowmarkupobj.x = tool.x0;
                arrowmarkupobj.y = tool.y0;

                if (havesnap) {

                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                        rotatedpoint = snap_rotated(snapPoint);
                    } else {
                        rotatedpoint = snapPoint;
                    }

                    if (tool.bUsemouseinput) {
                        arrowmarkupobj.w = rotatedpoint.x;
                        arrowmarkupobj.h = rotatedpoint.y;
                    }

                    limprevx = rotatedpoint.x;
                    limprevy = rotatedpoint.y;

                    //prevx = rotatedpoint.x;
                    //prevy = rotatedpoint.y;
                    drawsnap(Globals.context, snapPoint);

                } else {

                    if (tool.bUsemouseinput) {
                        arrowmarkupobj.w = mousePos.x;
                        arrowmarkupobj.h = mousePos.y;
                    }

                    limprevx = mousePos.x;
                    limprevy = mousePos.y;

                    //prevx = mousePos.x;
                    //prevy = mousePos.y;

                }
                tool.setdimoffset(false);


                arrowmarkupobj.drawme(Globals.context);

            } else {
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                arrowmarkupobj.x = tool.x0;
                arrowmarkupobj.y = tool.y0;

                if (tool.bUsemouseinput) {
                    arrowmarkupobj.w = limprevx;
                    arrowmarkupobj.h = limprevy;
                }

                tool.setdimoffset(false);

                arrowmarkupobj.drawme(Globals.context);


            }
        }


        this.mousemove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            tool.curmousepos = mousePos;

            const xdiff = prevx - mousePos.x;
            const ydiff = prevy - mousePos.y;


            snapPoint = Globals.DocObj.pages[Globals.DocObj.currentpage].getsnap(mousePos.x, mousePos.y);

            if (!snapPoint.found || snapPoint == undefined) {
                havesnap = false;
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            } else {
                havesnap = true;
                drawsnap(Globals.context, snapPoint);

            }

            if (ev.button == 2 || ev.buttons == 2) {

                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                tool.setdimoffset(false);
                prevx = mousePos.x;
                prevy = mousePos.y;

            }

            if (!tool.started) {
                return;
            }

            const bWithin = MousePosdrwext(mousePos);
            let rotatedpoint;
            const ccentre = {x : tool.x0, y : tool.y0};
            let bWithinradius;
            if (arrowmarkupobj.type == 4 && arrowmarkupobj.subtype == 1){
                bWithinradius = MousePosradiusdrwext(ccentre,mousePos);
            }else{
                bWithinradius = true;
            }
            if ((bWithin && bWithinradius) || !Globals.bLimMarkupExtent) {
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                if (tool.bUsemouseinput) {
                    arrowmarkupobj.x = tool.x0;
                    arrowmarkupobj.y = tool.y0;

                }

                if (havesnap) {

                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                        rotatedpoint = snap_rotated(snapPoint);
                    } else {
                        rotatedpoint = snapPoint;
                    }

                    if (tool.bUsemouseinput) {
                        arrowmarkupobj.w = rotatedpoint.x;
                        arrowmarkupobj.h = rotatedpoint.y;
                    }

                    limprevx = rotatedpoint.x;
                    limprevy = rotatedpoint.y;
                    //prevx = rotatedpoint.x;
                    //prevy = rotatedpoint.y;
                    drawsnap(Globals.context, snapPoint);

                } else {
                    if (tool.bUsemouseinput) {
                        arrowmarkupobj.w = mousePos.x;
                        arrowmarkupobj.h = mousePos.y;

                    }

                    limprevx = mousePos.x;
                    limprevy = mousePos.y;

                    //prevx = mousePos.x;
                    //prevy = mousePos.y;

                }
                tool.setdimoffset(false);

                //comment out test to check problem
                arrowmarkupobj.drawme(Globals.context);

            } else {
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

                if (tool.bUsemouseinput) {
                    arrowmarkupobj.x = tool.x0;
                    arrowmarkupobj.y = tool.y0;
                }

                if (tool.bUsemouseinput) {
                    arrowmarkupobj.w = limprevx;
                    arrowmarkupobj.h = limprevy;
                }

                tool.setdimoffset(false);

                //comment out test to check problem
                arrowmarkupobj.drawme(Globals.context);

                //if (tool.bUsemouseinput){

                //}

            }

        }

        this.touchmove = function (ev: any) {
            ev.preventDefault();
            if (!tool.started) {
                return;
            }
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const bWithin = MousePosdrwext(touchPos);
            if (bWithin || !Globals.bLimMarkupExtent) {

                arrowmarkupobj.x = tool.x0;
                arrowmarkupobj.y = tool.y0;

                if (tool.bUsemouseinput) {
                    arrowmarkupobj.w = touchPos.x;
                    arrowmarkupobj.h = touchPos.y;
                }

                prevx = touchPos.x;
                prevy = touchPos.y;

            } else {
                arrowmarkupobj.x = tool.x0;
                arrowmarkupobj.y = tool.y0;

                if (tool.bUsemouseinput) {
                    arrowmarkupobj.w = prevx;
                    arrowmarkupobj.h = prevy;
                }

            }

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            arrowmarkupobj.drawme(Globals.context);

        }

        this.MSPointerUp = function (ev: any) {
            ev.preventDefault();
            /*ev.target.style.cursor = 'default';
             if (tool.started) {
             tool.mousemove(ev);
             arrowmarkupobj.savemetolist();
             arrowmarkupobj = null;
             tool.started = false;

             img_update();

             }*/

        }

        this.mouseup = function (ev: any) {
            ev.preventDefault();
            /* ev.target.style.cursor = 'default';
             if (tool.started) {
             tool.mousemove(ev);
             arrowmarkupobj.savemetolist();
             arrowmarkupobj = null;
             tool.started = false;

             img_update();

             }*/
        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {
                if (!Globals.bMultimarkupadd) {

                    Globals.bMarkupcrated = true;
                    //ft 08.08.2018 changed from separate index to direct array length
                    Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                    //nMarkupcreated = DocObj.nummarkups;
                }

                arrowmarkupobj.savemetolistDraw();
                img_update();
                tool.touchmove(ev);
                tool.started = false;
                arrowmarkupobj = null;
                if (!Globals.bMultimarkupadd) {
                    //need to move to connection object.
                    //markupcreated();
                    if (RxCore_GUI_Markup != undefined) {
                        //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                        RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], { created: true, modified: false, deleted: false });
                    }

                }

            }
        }

        this.touchend = function (ev: any) {
            ev.preventDefault();
            if (tool.started) {
                if (!Globals.bMultimarkupadd) {

                    Globals.bMarkupcrated = true;
                    //ft 08.08.2018 changed from separate index to direct array length
                    Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                    //nMarkupcreated = DocObj.nummarkups;
                }

                arrowmarkupobj.savemetolistDraw();
                img_update();
                tool.touchmove(ev);
                tool.started = false;
                arrowmarkupobj = null;
                if (!Globals.bMultimarkupadd) {
                    //need to move to connection object.
                    //markupcreated();
                    if (RxCore_GUI_Markup != undefined) {
                        //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                        RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], { created: true, modified: false, deleted: false });
                    }

                }

            }
        }
    }


    // The Polycurve tool.
    Globals.tools.Polycurve = function (params: any) {
        const tool = this;
        let prevx = 0,
            prevy = 0;
        this.started = false;
        this.name = 'Polycurve';
        this.anglelengthsupport = false;

        this.terminated = false;
        this.LastTouchdata = -1;
        //ft 08.08.2018 changed from separate index to direct array length
        //var curmarkup = DocObj.nummarkups;
        const curmarkup = Globals.DocObj.markuplist.length;
        let polycurvemarkupobj: any;
        const subtype = params.p1;

        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        /*this.pointerup = function(ev){
         tool.MSPointerUp(ev);
         };*/

        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                ev.target.style.cursor = 'default';
                return;
            }

            if (!tool.started) {

                polycurvemarkupobj = new MarkupObject(2, subtype, 0);
                polycurvemarkupobj.pagenumber = Globals.DocObj.getcurPage();
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                    polycurvemarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                    polycurvemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                    polycurvemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
                } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                    polycurvemarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                    polycurvemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                    polycurvemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

                } else {
                    polycurvemarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                    polycurvemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                    polycurvemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;
                }

                polycurvemarkupobj.x = mousePos.x;
                polycurvemarkupobj.y = mousePos.y;
                polycurvemarkupobj.editaction = 0;
                polycurvemarkupobj.addpoint(mousePos.x, mousePos.y);
                tool.started = true;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = true;
                }

                polycurvemarkupobj.startdraw(Globals.context);
                polycurvemarkupobj.addpoint(mousePos.x, mousePos.y);
            } else {

                polycurvemarkupobj.addpoint(mousePos.x, mousePos.y);
            }

        }

        this.mousedown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }

                ev.target.style.cursor = 'default';
                return;
            }

            if (!tool.started) {
                polycurvemarkupobj = new MarkupObject(2, subtype, 0);
                polycurvemarkupobj.pagenumber = Globals.DocObj.getcurPage();
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                    polycurvemarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                    polycurvemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                    polycurvemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
                } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                    polycurvemarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                    polycurvemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                    polycurvemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

                } else {
                    polycurvemarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                    polycurvemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                    polycurvemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;
                }

                polycurvemarkupobj.x = mousePos.x;
                polycurvemarkupobj.y = mousePos.y;
                polycurvemarkupobj.editaction = 0;
                polycurvemarkupobj.addpoint(mousePos.x, mousePos.y);
                tool.started = true;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = true;
                }

                polycurvemarkupobj.startdraw(Globals.context);
                polycurvemarkupobj.addpoint(mousePos.x, mousePos.y);
            } else {

                polycurvemarkupobj.addpoint(mousePos.x, mousePos.y);
            }

        }

        this.MSPointerMove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            if (!tool.started) {
                return;
            }
            if (bWithin || !Globals.bLimMarkupExtent) {

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                polycurvemarkupobj.setlastpoint(mousePos.x, mousePos.y);
                polycurvemarkupobj.drawme(Globals.context);

                prevx = mousePos.x;
                prevy = mousePos.y;

            } else {

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                polycurvemarkupobj.setlastpoint(prevx, prevy);
                polycurvemarkupobj.drawme(Globals.context);

            }

        }

        this.mousemove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            if (!tool.started) {
                return;
            }
            const bWithin = MousePosdrwext(mousePos);
            if (bWithin || !Globals.bLimMarkupExtent) {

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                polycurvemarkupobj.setlastpoint(mousePos.x, mousePos.y);
                polycurvemarkupobj.drawme(Globals.context);

                prevx = mousePos.x;
                prevy = mousePos.y;

            } else {

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                polycurvemarkupobj.setlastpoint(prevx, prevy);
                polycurvemarkupobj.drawme(Globals.context);

            }

        }

        this.mouseup = function (ev: any) {
            //polycurvemarkupobj.addpoint(mousePos.x, ev._y);
        }

        this.dblclick = function (ev: any) {
            if (tool.started) {
                tool.mousemove(ev);
                //tool.started = false;
                tool.started = false;
                polycurvemarkupobj.points.splice(polycurvemarkupobj.numpoints - 1, 2);
                polycurvemarkupobj.findrectangle();
                polycurvemarkupobj.savemetolistDraw();
                polycurvemarkupobj = null;
                img_update();
                ev.target.style.cursor = 'default';
            }

        }

        this.doubletap = function (ev: any) {
            if (tool.started) {
                tool.started = false;
                polycurvemarkupobj.points.splice(polycurvemarkupobj.points.length - 1, 1);
                polycurvemarkupobj.findrectangle();
                polycurvemarkupobj.savemetolistDraw();
                polycurvemarkupobj = null;
                img_update();

                //tool.terminated = true;

            }

        }


        this.touchstart = function (ev: any) {
            ev.preventDefault();
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const touchx = touchPos.x;
            const touchy = touchPos.y;
            let lastTouch = 0;

            const now = new Date().getTime();
            if (tool.LastTouchdata == -1) {
                lastTouch = now + 1;
            } else {
                lastTouch = tool.LastTouchdata;

            }

            const delta = now - lastTouch;
            tool.LastTouchdata = now;

            if (delta < 500 && delta > 0) {
                tool.doubletap(ev);

            } else {
                const bWithin = MousePosdrwext(touchPos);
                if (!bWithin && Globals.bLimMarkupExtent) {
                    tool.started = false;
                    if (Globals.DocObj) {
                        Globals.DocObj.bMarkupchanged = false;
                    }

                    return;
                }

                if (!tool.started) {
                    polycurvemarkupobj = new MarkupObject(2, subtype, 0);
                    polycurvemarkupobj.pagenumber = Globals.DocObj.getcurPage();
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                        polycurvemarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                        polycurvemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                        polycurvemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
                    } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                        polycurvemarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                        polycurvemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                        polycurvemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

                    } else {
                        polycurvemarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                        polycurvemarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                        polycurvemarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;
                    }

                    polycurvemarkupobj.x = touchx;
                    polycurvemarkupobj.y = touchy;
                    polycurvemarkupobj.editaction = 0;
                    polycurvemarkupobj.addpoint(touchx, touchy);
                    polycurvemarkupobj.startdraw(Globals.context);
                    polycurvemarkupobj.addpoint(touchx, touchy);
                    tool.started = true;
                    if (Globals.DocObj) {
                        Globals.DocObj.bMarkupchanged = true;
                    }

                } else {
                    polycurvemarkupobj.addpoint(touchx, touchy);
                    //polygonmarkupobj.setlastpoint(touchx,touchy);
                }

            }

        }


        this.touchmove = function (ev: any) {
            ev.preventDefault();
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const touchx = touchPos.x;
            const touchy = touchPos.y;
            if (!tool.started) {
                return;
            }
            const bWithin = MousePosdrwext(touchPos);
            if (bWithin || !Globals.bLimMarkupExtent) {

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                polycurvemarkupobj.setlastpoint(touchPos.x, touchPos.y);
                polycurvemarkupobj.drawme(Globals.context);

                prevx = touchPos.x;
                prevy = touchPos.y;

            } else {

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                polycurvemarkupobj.setlastpoint(prevx, prevy);
                polycurvemarkupobj.drawme(Globals.context);

            }

        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const touchx = touchPos.x;
            const touchy = touchPos.y;

            if (tool.started) {
                const bWithin = MousePosdrwext(touchPos);
                if (bWithin || !Globals.bLimMarkupExtent) {
                    polycurvemarkupobj.addpoint(touchx, touchy);
                }

            }
        }

        this.touchend = function (ev: any) {
            ev.preventDefault();
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const touchx = touchPos.x;
            const touchy = touchPos.y;

            if (tool.started) {
                const bWithin = MousePosdrwext(touchPos);
                if (bWithin || !Globals.bLimMarkupExtent) {
                    polycurvemarkupobj.addpoint(touchx, touchy);
                }

            }

        }

    }



    // The area tool.
    Globals.tools.area = function (params:any) {
        const tool = this;
        let prevx = 0,
            prevy = 0;

        let limprevx = 0,
            limprevy = 0;

        let havesnap = false;
        let snapPoint: any;
        //ft 08.08.2018 changed from separate index to direct array length
        const curmarkup = Globals.DocObj.markuplist.length;
        //var curmarkup = DocObj.nummarkups;
        let areamarkupobj: any;

        const type = params.p1;
        const subtype = params.p2;

        this.name = 'area';
        this.anglelengthsupport = true;

        this.bUsemouseinput = true;

        this.started = false;
        this.terminated = false;
        this.LastTouchdata = -1;
        this.startx = 0;
        this.starty = 0;
        this.orgscale = 1.0;
        this.orgdx = 0.0;
        this.orgdy = 0.0;
        this.curmousepos = { x: 0, y: 0 };

        this.setAngleLength = function(angle:any, length:any, type:any){
            this.bUsemouseinput = false;

            const btwoormorepoints = (areamarkupobj.points.length >= 2);

            if (areamarkupobj != undefined && btwoormorepoints){

                //replace with points.

                //areamarkupobj.points[areamarkupobj.points.length - 2].x = tool.x0;
                //areamarkupobj.points[areamarkupobj.points.length - 2].y = tool.y0;

                //areamarkupobj.x = tool.x0;
                //areamarkupobj.y = tool.y0;
                const curx2 = areamarkupobj.points[areamarkupobj.points.length - 1].x;
                const cury2 = areamarkupobj.points[areamarkupobj.points.length - 1].y;


                const secondpoint = areamarkupobj.setAnglelengthPoints(length, angle, type);
                //add state to markup object to change rotate adjustment bUsemouseinput
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

                if (MousePosdrwext({x:secondpoint.w,y:secondpoint.h})){

                    //set last point.
                    areamarkupobj.setlastpoint(secondpoint.w, secondpoint.h);
                    areamarkupobj.addpoint(secondpoint.w, secondpoint.h);


                    tool.setdimoffset(false);
                    areamarkupobj.drawme(context);

                }else{
                    //set last point.
                    areamarkupobj.setlastpoint(curx2, cury2);
                    areamarkupobj.addpoint(curx2, cury2);

                    this.bUsemouseinput = true;
                    areamarkupobj.drawme(context);
                    areamarkupobj.bUsemouseinput = true;
                    if (RxCore_GUI_markupParamsError != undefined){
                        RxCore_GUI_markupParamsError.onDrawError('outside');
                    }

                }

            }


        };

        this.apply = function(){
            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

            if(!tool.started){
                return;
            }

            tool.started = false;
            tool.setdimoffset(false);
            areamarkupobj.drawme(context);
            areamarkupobj.points.splice(areamarkupobj.points.length - 1, 1);
            areamarkupobj.findrectangle();


            if (!Globals.bMultimarkupadd) {

                Globals.bMarkupcrated = true;
                //ft 08.08.2018 changed from separate index to direct array length
                //nMarkupcreated = DocObj.nummarkups;
                Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
            }


            areamarkupobj.savemetolistDraw();
            //arrowmarkupobj.savemetolistLoad();
            areamarkupobj = null;

            drawmarkupAll(Globals.cntximg);

            //markupobject.markupnumber = DocObj.nummarkups;         DocObj.markuplist[markupobject.markupnumber] = this;
            img_update();

            if (!Globals.bMultimarkupadd) {
                //need to move to connection object.
                //markupcreated();
                if (RxCore_GUI_Markup != undefined) {
                    //var operation = {created : true, modified : false, deleted : false};
                    RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], {created : true, modified : false, deleted : false});
                    //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                }

            }
        };

        this.scrollhandling = function (movey: any) {
            if (!Globals.documentopen || Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                return;
            }

            if (movey < 0) {

                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs && Globals.DocObj.pages.length > 1) {

                    if (Globals.DocObj.currentpage == Globals.DocObj.NumPages - 1) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].endy <= Globals.canvas.height) {
                            movey = 0;
                        }
                    }
                    Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, -movey);

                } else {

                    Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomOut(1.1, false, false, tool.curmousepos);

                    if (tool.started) {
                        tool.setdimoffset(false);

                    }

                }

            } else {

                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs && Globals.DocObj.pages.length > 1) {

                    if (Globals.DocObj.currentpage == 0) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].starty >= 0) {
                            movey = 0;
                        }

                    }
                    Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, -movey);

                } else {

                    Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomIn(1.1, false, false, tool.curmousepos);

                    if (tool.started) {
                        tool.setdimoffset(false);

                    }

                }

            }

        }

        this.wheel = function (ev: any) {
            let delta = 0;
            if (ev.wheelDelta !== undefined) { // WebKit / Opera / Explorer 9

                delta = ev.wheelDelta;

            } else if (ev.deltaY !== undefined) { // Firefox

                delta = -ev.deltaY * 50;

            }

            tool.scrollhandling(delta);

        }

        this.setdimoffset = function (initial: any) {

            if (initial) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                    areamarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                    areamarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                    areamarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
                } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                    areamarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                    areamarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                    areamarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

                } else {
                    areamarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                    areamarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                    areamarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;
                }


                tool.orgscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getdscale();
                tool.orgdx = Globals.DocObj.pages[Globals.DocObj.currentpage].getdx();
                tool.orgdy = Globals.DocObj.pages[Globals.DocObj.currentpage].getdy();

            }

            const curscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getdscale();
            const pagedx = Globals.DocObj.pages[Globals.DocObj.currentpage].getdx();
            const pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].getdy();

            const scalediff = (curscale / areamarkupobj.scaling);

            /*if(tool.started){
                var lastpoint = areamarkupobj.getlastpoint();

                if(lastpoint){
                    var changex = ((lastpoint.x - pagedx) / scalediff) + areamarkupobj.xoffset;
                    var changey = ((lastpoint.y - pagedy) / scalediff) + areamarkupobj.yoffset;

                    areamarkupobj.setlastpoint(changex, changey);

                }


            }*/
        }

        // This is called when you start holding down the mouse button.
        // This starts the pencil drawing.
        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }

        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);

            let rotatedpoint;
            if (ev.button == 0) {
                const bWithin = MousePosdrwext(mousePos);
                if (!bWithin && Globals.bLimMarkupExtent) {
                    return;
                }

                if (!tool.started) {
                    areamarkupobj = new MarkupObject(type, subtype, Globals.fillstyle);
                    areamarkupobj.pagenumber = Globals.DocObj.getcurPage();
                    tool.setdimoffset(true);

                    if (havesnap) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            rotatedpoint = snap_rotated(snapPoint);
                        } else {
                            rotatedpoint = snapPoint;
                        }

                        areamarkupobj.x = rotatedpoint.x;
                        areamarkupobj.y = rotatedpoint.y;
                        areamarkupobj.editaction = 0;
                        areamarkupobj.addpoint(rotatedpoint.x, rotatedpoint.y);
                        tool.started = true;
                        if (Globals.DocObj) {
                            Globals.DocObj.bMarkupchanged = true;
                        }
                        areamarkupobj.startdraw(Globals.context);
                        areamarkupobj.addpoint(rotatedpoint.x, rotatedpoint.y);

                    } else {
                        areamarkupobj.x = mousePos.x;
                        areamarkupobj.y = mousePos.y;
                        areamarkupobj.editaction = 0;
                        areamarkupobj.addpoint(mousePos.x, mousePos.y);
                        tool.started = true;
                        if (Globals.DocObj) {
                            Globals.DocObj.bMarkupchanged = true;
                        }
                        areamarkupobj.startdraw(Globals.context);
                        areamarkupobj.addpoint(mousePos.x, mousePos.y);

                    }

                } else {
                    if (havesnap) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            rotatedpoint = snap_rotated(snapPoint);
                        } else {
                            rotatedpoint = snapPoint;
                        }

                        if (tool.bUsemouseinput){
                            areamarkupobj.addpoint(rotatedpoint.x, rotatedpoint.y);
                        }

                    } else {
                        if (tool.bUsemouseinput){
                            areamarkupobj.addpoint(mousePos.x, mousePos.y);
                        }
                    }

                }
            } else {
                prevx = mousePos.x;
                prevy = mousePos.y;

            }

        }

        this.mousedown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);

            let rotatedpoint;
            if (ev.button == 0) {
                const bWithin = MousePosdrwext(mousePos);
                if (!bWithin && Globals.bLimMarkupExtent) {
                    return;
                }

                if (!tool.started) {
                    areamarkupobj = new MarkupObject(type, subtype, Globals.fillstyle);
                    areamarkupobj.pagenumber = Globals.DocObj.getcurPage();
                    tool.setdimoffset(true);

                    if (havesnap) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            rotatedpoint = snap_rotated(snapPoint);
                        } else {
                            rotatedpoint = snapPoint;
                        }

                        areamarkupobj.x = rotatedpoint.x;
                        areamarkupobj.y = rotatedpoint.y;
                        areamarkupobj.editaction = 0;
                        areamarkupobj.addpoint(rotatedpoint.x, rotatedpoint.y);
                        tool.started = true;
                        if (Globals.DocObj) {
                            Globals.DocObj.bMarkupchanged = true;
                        }
                        areamarkupobj.startdraw(Globals.context);
                        areamarkupobj.addpoint(rotatedpoint.x, rotatedpoint.y);

                    } else {
                        areamarkupobj.x = mousePos.x;
                        areamarkupobj.y = mousePos.y;
                        areamarkupobj.editaction = 0;
                        areamarkupobj.addpoint(mousePos.x, mousePos.y);
                        tool.started = true;
                        if (Globals.DocObj) {
                            Globals.DocObj.bMarkupchanged = true;
                        }
                        areamarkupobj.startdraw(Globals.context);
                        areamarkupobj.addpoint(mousePos.x, mousePos.y);

                    }

                } else {
                    if (havesnap) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            rotatedpoint = snap_rotated(snapPoint);
                        } else {
                            rotatedpoint = snapPoint;
                        }

                        if (tool.bUsemouseinput){
                            areamarkupobj.addpoint(rotatedpoint.x, rotatedpoint.y);
                        }

                    } else {
                        if (tool.bUsemouseinput){
                            areamarkupobj.addpoint(mousePos.x, mousePos.y);
                        }

                    }

                }
            } else {
                prevx = mousePos.x;
                prevy = mousePos.y;

            }
        }

        // This function is called every time you move the mouse. Obviously, it only
        // draws if the tool.started state is set to true (when you are holding down
        // the mouse button).
        this.MSPointerMove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);

            tool.curmousepos = mousePos;
            /*
            // JS->TS:INFO commented out
            if (!tool.bUsemouseinput){
                break;
            }
            */
            const xdiff = prevx - mousePos.x;
            const ydiff = prevy - mousePos.y;

            snapPoint = Globals.DocObj.pages[Globals.DocObj.currentpage].getsnap(mousePos.x, mousePos.y);

            if (!snapPoint.found || snapPoint == undefined) {
                havesnap = false;
                if (!tool.started) {
                    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                }

            } else {
                havesnap = true;
                if (!tool.started) {
                    drawsnap(Globals.context, snapPoint);
                }


            }

            const bWithin = MousePosdrwext(mousePos);

            if (ev.button == 2 || ev.buttons == 2) {
                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                prevx = mousePos.x;
                prevy = mousePos.y;

                if (tool.started) {
                    tool.setdimoffset(false);
                }

            }

            if (!tool.started) {
                return;
            }

            let rotatedpoint;
            if (bWithin || !Globals.bLimMarkupExtent) {
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                if (havesnap) {
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                        rotatedpoint = snap_rotated(snapPoint);
                    } else {
                        rotatedpoint = snapPoint;
                    }
                    drawsnap(Globals.context, snapPoint);

                    if (tool.bUsemouseinput){
                        areamarkupobj.setlastpoint(rotatedpoint.x, rotatedpoint.y);
                    }
                    tool.setdimoffset(false);
                    areamarkupobj.drawme(Globals.context);

                    limprevx = rotatedpoint.x;
                    limprevy = rotatedpoint.y;

                } else {
                    if (tool.bUsemouseinput){
                        areamarkupobj.setlastpoint(mousePos.x, mousePos.y);
                    }

                    tool.setdimoffset(false);
                    areamarkupobj.drawme(Globals.context);

                    limprevx = mousePos.x;
                    limprevy = mousePos.y;

                }
                if (havesnap) {
                    //drawsnap(context,snapPoint);
                }

                if (ev.button == 2 || ev.buttons == 2) {

                }

            } else {

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                if (tool.bUsemouseinput){
                    areamarkupobj.setlastpoint(limprevx, limprevy);
                }
                areamarkupobj.drawme(Globals.context);

            }

        }

        this.mousemove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            tool.curmousepos = mousePos;

            const xdiff = prevx - mousePos.x;
            const ydiff = prevy - mousePos.y;

            snapPoint = Globals.DocObj.pages[Globals.DocObj.currentpage].getsnap(mousePos.x, mousePos.y);

            if (!snapPoint.found || snapPoint == undefined) {
                havesnap = false;
                if (!tool.started) {
                    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                }

            } else {
                havesnap = true;
                if (!tool.started) {
                    drawsnap(Globals.context, snapPoint);
                }
            }

            const bWithin = MousePosdrwext(mousePos);

            if (ev.button == 2 || ev.buttons == 2) {
                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                prevx = mousePos.x;
                prevy = mousePos.y;

                if (tool.started) {
                    tool.setdimoffset(false);
                }

            }

            if (!tool.started) {
                return;
            }

            let rotatedpoint;
            if (bWithin || !Globals.bLimMarkupExtent) {

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                if (havesnap) {
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                        rotatedpoint = snap_rotated(snapPoint);
                    } else {
                        rotatedpoint = snapPoint;
                    }
                    drawsnap(Globals.context, snapPoint);
                    if (tool.bUsemouseinput){
                        areamarkupobj.setlastpoint(rotatedpoint.x, rotatedpoint.y);
                    }
                    tool.setdimoffset(false);
                    areamarkupobj.drawme(Globals.context);

                    prevx = rotatedpoint.x;
                    prevy = rotatedpoint.y;

                } else {
                    if (tool.bUsemouseinput){
                        areamarkupobj.setlastpoint(mousePos.x, mousePos.y);
                    }
                    tool.setdimoffset(false);
                    areamarkupobj.drawme(Globals.context);

                    prevx = mousePos.x;
                    prevy = mousePos.y;

                }
                if (havesnap) {
                    //drawsnap(context,snapPoint);
                }
                if (ev.button == 2 || ev.buttons == 2) {

                }
            } else {

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                if (tool.bUsemouseinput){
                    areamarkupobj.setlastpoint(prevx, prevy);
                }

                tool.setdimoffset(false);
                areamarkupobj.drawme(Globals.context);

            }
        }

        // This is called when you release the mouse button.
        this.MSPointerUp = function (ev: any) {
            //areamarkupobj.addpoint(mousePos.x, ev._y);
        }

        this.mouseup = function (ev: any) {
            //areamarkupobj.addpoint(mousePos.x, ev._y);
        }

        this.dblclick = function (ev: any) {
            if (!tool.bUsemouseinput){
                return;
            }

            if (tool.started) {
                //tool.mousemove(ev);
                //tool.started = false;
                tool.started = false;
                areamarkupobj.points.splice(areamarkupobj.points.length - 2, 2);
                areamarkupobj.findrectangle();
                if (!Globals.bMultimarkupadd) {

                    Globals.bMarkupcrated = true;
                    //ft 08.08.2018 changed from separate index to direct array length
                    Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                    //nMarkupcreated = DocObj.nummarkups;
                }

                areamarkupobj.savemetolistDraw();
                areamarkupobj = null;
                img_update();
                drawmarkupAll(Globals.cntximg);
                ev.target.style.cursor = 'default';

                if (!Globals.bMultimarkupadd) {
                    //need to move to connection object.
                    //markupcreated();
                    if (RxCore_GUI_Markup != undefined) {
                        //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                        RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], { created: true, modified: false, deleted: false });
                    }

                }

            }
        }

        this.doubletap = function (ev: any) {
            if (!tool.bUsemouseinput){
                return;
            }

            if (tool.started) {
                tool.started = false;
                areamarkupobj.points.splice(areamarkupobj.points.length - 1, 1);
                areamarkupobj.findrectangle();
                if (!Globals.bMultimarkupadd) {

                    Globals.bMarkupcrated = true;
                    //ft 08.08.2018 changed from separate index to direct array length
                    Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                    //nMarkupcreated = DocObj.nummarkups;
                }

                areamarkupobj.savemetolistDraw();
                areamarkupobj = null;
                img_update();
                drawmarkupAll(Globals.cntximg);
                //tool.terminated = true;

                if (!Globals.bMultimarkupadd) {
                    //need to move to connection object.
                    //markupcreated();
                    if (RxCore_GUI_Markup != undefined) {
                        //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                        RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], { created: true, modified: false, deleted: false });
                    }

                }

            }

        }

        this.touchstart = function (ev: any) {
            ev.preventDefault();
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const touchx = touchPos.x;
            const touchy = touchPos.y;
            let lastTouch = 0;

            //doubletap

            const now = new Date().getTime();
            if (tool.LastTouchdata == -1) {
                lastTouch = now + 1;
            } else {
                lastTouch = tool.LastTouchdata;

            }

            const delta = now - lastTouch;
            tool.LastTouchdata = now;

            if (delta < 500 && delta > 0) {
                tool.doubletap(ev);
                //alert("double tap");
                return;
            }

            //doubletap

            const bWithin = MousePosdrwext(touchPos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                return;
            }

            if (!tool.started) {
                areamarkupobj = new MarkupObject(type, subtype, Globals.fillstyle);
                areamarkupobj.pagenumber = Globals.DocObj.getcurPage();
                tool.setdimoffset(true);

                areamarkupobj.x = touchx;
                areamarkupobj.y = touchy;
                areamarkupobj.editaction = 0;
                areamarkupobj.addpoint(touchx, touchy);
                areamarkupobj.startdraw(Globals.context);
                areamarkupobj.addpoint(touchx, touchy);
                tool.started = true;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = true;
                }

            } else {
                if (tool.bUsemouseinput){
                    areamarkupobj.addpoint(touchx, touchy);
                }
                //polygonmarkupobj.setlastpoint(touchx,touchy);
            }

        }

        this.touchmove = function (ev: any) {
            ev.preventDefault();
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const touchx = touchPos.x;
            const touchy = touchPos.y;
            if (!tool.started) {
                return;
            }
            const bWithin = MousePosdrwext(touchPos);
            if (bWithin || !Globals.bLimMarkupExtent) {

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                if (tool.bUsemouseinput){
                    areamarkupobj.setlastpoint(touchPos.x, touchPos.y);
                }
                areamarkupobj.drawme(Globals.context);

                prevx = touchPos.x;
                prevy = touchPos.y;

            } else {

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                if (tool.bUsemouseinput){
                    areamarkupobj.setlastpoint(prevx, prevy);
                }
                areamarkupobj.drawme(Globals.context);

            }
            /*if (tool.started) {
             context.clearRect(0, 0, canvas.width, canvas.height);
             areamarkupobj.setlastpoint(touchx,touchy);
             areamarkupobj.drawme(context);

             }*/
        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const touchx = touchPos.x;
            const touchy = touchPos.y;

            if (tool.started) {
                if (tool.bUsemouseinput){
                    areamarkupobj.addpoint(touchx, touchy);
                }
            }

        }

        this.touchend = function (ev: any) {
            ev.preventDefault();
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const touchx = touchPos.x;
            const touchy = touchPos.y;

            if (tool.started) {
                if (tool.bUsemouseinput){
                    areamarkupobj.addpoint(touchx, touchy);
                }
            }

        }


        /*this.touchend = function (ev) {
         ev.preventDefault();
         if (tool.started) {
         pencilmarkupobj.findrectangle();
         pencilmarkupobj.savemetolist();
         img_update();
         //alert("touchend");
         //tool.touchmove(ev);
         tool.started = false;

         pencilmarkupobj = null;
         }
         };*/

    }


    //the measure tool
    Globals.tools.measuretool = function () {
        const tool = this;
        this.name = 'measuretool';
        this.anglelengthsupport = false;

        this.started = false;
        const Unit = "mm";
        const AreaUnit = "mm\u00B2";
        this.Area = 0.0;
        this.totaldistance = 0;
        //dialog content html
        this.LastTouchdata = -1;

        let havesnap = false;
        let snapPoint: any;


        /*this.dialogtextstart = "<p><strong>Measurement Result</strong></p>\n" +
         "        <div style='height:200px;overflow-y:scroll;border:1px solid #769dc4;padding:0 10px;width:360px;'>\n" +
         "            <p>\n" +
         "                <table id='MeasureInfo'>\n" +
         "                <TR>\n" +
         "                    <TH nowrap>Points</TH><TH nowrap align='left'>Angle</TH><TH nowrap align='left'>Distance</TH>\n" +
         "                </TR>\n" +
         "                <TR>\n";
         this.tabletext = "";
         this.dialogtextend = "                </TR>\n" +
         "            </table>\n" +
         "            </p>\n" +
         "            </div>\n";

         this.dialogfieldtext = "";

         this.dialogcontent = "";*/
        //dialog content html

        this.points = [];
        this.numpoints = -1;

        this.lines = [];
        this.numlines = -1;

        this.lengths = [];
        this.numlengths = -1;

        this.angles = [];
        this.numangles = -1;
        this.result = {
            points: [],
            lines: [],
            lengths: [],
            angles: [],
            numpoints: -1,
            numlines: -1,
            numlengths: -1,
            numangles: -1,
            area: 0,
            totaldistance: 0
        };

        this.addToTable = function () {
            const lcounter = 0;
            const point1 = 0;
            const point2 = 0;
            const pointstext = "";
            const angletext = "";
            const length = 0;
            const texttotable = "";
            const trueangle = 0;

            let markupscalesq = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                markupscalesq = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                markupscalesq = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf) * (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
            }
            //tool.tabletext = texttotable;
            tool.result.area = tool.PolygonArea();
            tool.result.area = getUnitArea(tool.result.area / markupscalesq);
            //tool.result.area = tool.result.area.toFixed(2);
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                tool.result.totaldistance = getUnitlength(tool.result.totaldistance / Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector);
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                tool.result.totaldistance = getUnitlength(tool.result.totaldistance / (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf));
            } else {
                tool.result.totaldistance = getUnitlength(tool.result.totaldistance / Globals.DocObj.pages[Globals.DocObj.currentpage].dscale);
            }


            //Unit = Unitlabel;
            //  AreaUnit = AreaUnitlabel;


            /*for(lcounter = 0;lcounter<tool.lengths.length;lcounter++){
             if(lcounter>0){
             trueangle = tool.angles[lcounter-1]*( 180 / Math.PI);
             angletext = trueangle.toFixed(0);
             angletext = angletext + "&deg;";
             }else{
             angletext = "-";
             }


             point1 = lcounter + 1;
             point2 = lcounter + 2;
             pointstext = point1 + "-" + point2;
             length = tool.lengths[lcounter];
             if(DocObj.pages[DocObj.currentpage].usevectorxml){
             length = getUnitlength(length/DocObj.pages[DocObj.currentpage].dscalevector);
             } else if (DocObj.pages[DocObj.currentpage].usepdfjs){
             length = getUnitlength(length/(DocObj.pages[DocObj.currentpage].curpagescale*DocObj.pages[DocObj.currentpage].dscalepdf));
             } else {
             length = getUnitlength(length/DocObj.pages[DocObj.currentpage].dscale);
             }

             length = length.toFixed(2);

             texttotable = texttotable + "<TR>";
             texttotable = texttotable + "                    <TD nowrap>" + pointstext + "</TD>\n";
             texttotable = texttotable + "                    <TD>\n" + angletext + "</TD>\n";
             texttotable = texttotable + "                    <TD>\n" + length + Unit + " </TD>\n";
             texttotable = texttotable + "</TR>";

             }*/

            /*var markupscalesq = DocObj.pages[DocObj.currentpage].dscale*DocObj.pages[DocObj.currentpage].dscale;
             if(DocObj.pages[DocObj.currentpage].usevectorxml){
             markupscalesq = DocObj.pages[DocObj.currentpage].dscalevector*DocObj.pages[DocObj.currentpage].dscalevector;
             }else if(DocObj.pages[DocObj.currentpage].usepdfjs){
             markupscalesq = (DocObj.pages[DocObj.currentpage].curpagescale*DocObj.pages[DocObj.currentpage].dscalepdf)*(DocObj.pages[DocObj.currentpage].curpagescale*DocObj.pages[DocObj.currentpage].dscalepdf);
             }
             tool.tabletext = texttotable;
             tool.Area = tool.PolygonArea();
             tool.Area = getUnitArea(tool.Area/markupscalesq);
             tool.Area = tool.Area.toFixed(2);
             if(DocObj.pages[DocObj.currentpage].usevectorxml){
             tool.totaldistance = getUnitlength(tool.totaldistance/DocObj.pages[DocObj.currentpage].dscalevector);
             }else if (DocObj.pages[DocObj.currentpage].usepdfjs){
             tool.totaldistance = getUnitlength(tool.totaldistance/(DocObj.pages[DocObj.currentpage].curpagescale*DocObj.pages[DocObj.currentpage].dscalepdf));
             }else{
             tool.totaldistance = getUnitlength(tool.totaldistance/DocObj.pages[DocObj.currentpage].dscale);
             }

             tool.totaldistance = tool.totaldistance.toFixed(2);

             this.dialogfieldtext = "<br>" +
             "       <table>" +
             "        <tr>" +
             "	     <td>Distance: </td>" + "<td><input type='text' value='" + tool.totaldistance + "'> " + Unit + "</td>\n" +
             "          </tr>" +
             "           <tr>" +
             "	     <td>Area: </td>" + "<td><input type='text' value='" + tool.Area + "'> " + AreaUnit + "</td>\n" +
             "        </tr>" +
             "        </table>" +
             "        <br />\n" +
             "        <br />\n";*/
            //"        <button data-dojo-type='dijit/form/Button' data-dojo-props='onClick:hideMDialog'>OK</button>\n";

        }

        this.PolygonArea = function () {
            let i = 0;
            let area = 0.0;
            const n = tool.result.points.length;


            for (i = 0; i < n - 1; i++) {
                area += (tool.result.points[i].x * tool.result.points[i + 1].y) - (tool.result.points[i + 1].x * tool.result.points[i].y);
            }
            area += (tool.result.points[n - 1].x * tool.result.points[0].y) - (tool.result.points[0].x * tool.result.points[n - 1].y);
            return Math.abs(area / 2.0);
        }

        this.getdiag = function (width: any, height: any) {
            const dimwsq = Math.pow(width, 2);
            const dimhsq = Math.pow(height, 2);
            const dimdiag = Math.sqrt((dimwsq + dimhsq));

            return dimdiag;
        }

        this.addpoint = function (x: any, y: any) {
            tool.result.points.push(new point(x, y));
            tool.result.numpoints++;
        }

        this.setlastpoint = function (x: any, y: any) {
            tool.result.points[tool.result.points.length - 1].x = x;
            tool.result.points[tool.result.points.length - 1].y = y;
        }

        this.startdraw = function (ctx: any) {
            ctx.beginPath();
            ctx.moveTo(tool.result.points[tool.result.points.length - 1].x, tool.result.points[tool.result.points.length - 1].y);
        }

        this.getangleofline = function (startx: any, starty: any, endx: any, endy: any, useabs: any) {
            let width = 0;
            let height = 0;

            if (useabs) {
                width = Math.abs(endx - startx);
                height = Math.abs(endy - starty);
            } else {
                width = endx - startx;
                height = endy - starty;
            }

            return Math.atan2(height, width);
        }

        this.findanglebetweenlines = function () {
            let counter = 0;
            let startx = 0;
            let starty = 0;
            let endx = 0;
            let endy = 0;
            let reangle = false;

            let startAngle = 0;
            let endAngle = 0;
            let sumAngle = 0;

            for (counter = 0; counter < tool.result.lines.length; counter++) {
                if (counter > 0) {

                    if (tool.result.lines[counter - 1].height <= 0 && tool.result.lines[counter - 1].width >= 0) {
                        startAngle = tool.result.lines[counter - 1].rewangle;
                    } else if (tool.result.lines[counter - 1].width <= 0 && tool.result.lines[counter - 1].height >= 0) {
                        startAngle = tool.result.lines[counter - 1].rewangle;
                    } else if (tool.result.lines[counter - 1].width >= 0 && tool.result.lines[counter - 1].height >= 0) {
                        startAngle = tool.result.lines[counter - 1].angle;
                    } else if (tool.result.lines[counter - 1].width <= 0 && tool.result.lines[counter - 1].height <= 0) {
                        startAngle = tool.result.lines[counter - 1].angle;
                    }

                    if (tool.result.lines[counter].height <= 0 && tool.result.lines[counter].width >= 0) {

                        endAngle = tool.result.lines[counter].rewangle;
                    } else if (tool.result.lines[counter].width <= 0 && tool.result.lines[counter].height >= 0) {
                        endAngle = tool.result.lines[counter].rewangle;
                    } else if (tool.result.lines[counter].width >= 0 && tool.result.lines[counter].height >= 0) {
                        endAngle = tool.result.lines[counter].angle;
                    } else if (tool.result.lines[counter].width <= 0 && tool.result.lines[counter].height <= 0) {
                        endAngle = tool.result.lines[counter].angle;
                    }

                    sumAngle = Math.PI - Math.abs(startAngle + endAngle);
                    tool.result.angles.push(Math.abs(sumAngle));
                    tool.result.numangles++;

                }
            }
        }


        this.calculatedistance = function () {
            let acounter = 0;
            let startx = 0;
            let starty = 0;
            let endx = 0;
            let endy = 0;
            let width = 0;
            let height = 0;
            let length = 0;
            let curline;

            if (tool.result.points.length >= 2) {
                startx = tool.result.points[0].x;
                starty = tool.result.points[0].y;

                for (acounter = 1; acounter < tool.result.points.length; acounter++) {

                    endx = tool.result.points[acounter].x;
                    endy = tool.result.points[acounter].y;

                    if (acounter != tool.result.points.length) {
                        width = Math.abs(endx - startx);
                        height = Math.abs(endy - starty);
                        length = tool.getdiag(width, height);
                        if (length != 0) {
                            tool.result.lengths.push(length);
                            tool.result.numlengths++;
                            curline = new lineangle(startx, starty, endx, endy);
                            tool.result.lines.push(curline);
                            tool.result.numlines++;
                            tool.result.totaldistance = tool.result.totaldistance + length;
                        }
                    }
                    startx = endx;
                    starty = endy;

                }
                if (tool.result.points.length >= 3) {
                    endx = tool.result.points[0].x;
                    endy = tool.result.points[0].y;
                    width = Math.abs(endx - startx);
                    height = Math.abs(endy - starty);
                    length = tool.getdiag(width, height);
                    curline = new lineangle(startx, starty, endx, endy);
                    tool.result.lines.push(curline);
                    tool.result.numlines++;
                    tool.result.lengths.push(length);
                    tool.result.numlengths++;
                    tool.result.totaldistance = tool.result.totaldistance + length;

                }

            }

        }

        this.draw = function (ctx: any) {
            let counter = 0;
            let startAngle = 0.0;
            let endAngle = 0.0;
            let startx = 0;
            let starty = 0;
            let endx = 0;
            let endy = 0;
            let width = 0;
            let height = 0;
            let arcx = 0;
            let arcy = 0;
            let drawangle = false;

            //var dimarea = 0;

            ctx.strokeStyle = "red";
            ctx.beginPath();
            ctx.moveTo(tool.result.points[0].x, tool.result.points[0].y);

            for (counter = 1; counter < tool.result.points.length; counter++) {
                ctx.lineTo(tool.result.points[counter].x, tool.result.points[counter].y);
                if (counter > 1) {
                    startx = tool.result.points[counter - 1].x;
                    starty = tool.result.points[counter - 1].y;
                    endx = tool.result.points[counter].x;
                    endy = tool.result.points[counter].y;

                    startAngle = tool.getangleofline(startx, starty, endx, endy, false);
                    //startAngle = startAngle;

                    startx = tool.result.points[counter - 2].x;
                    starty = tool.result.points[counter - 2].y;
                    endx = tool.result.points[counter - 1].x;
                    endy = tool.result.points[counter - 1].y;
                    arcx = endx;
                    arcy = endy;

                    endAngle = tool.getangleofline(startx, starty, endx, endy, false);
                    endAngle = endAngle - Math.PI;

                    drawangle = true;

                }
            }

            ctx.strokeStyle = "red";
            ctx.lineWidth = 1;
            ctx.closePath();
            ctx.stroke();
            if (drawangle) {
                ctx.beginPath();
                ctx.arc(arcx, arcy, 50, startAngle, endAngle, false);
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 4;
                ctx.stroke();

            }

        }

        // This is called when you start holding down the mouse button.
        // This starts the measure area drawing.
        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }

        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);

            let rotatedpoint;
            if (!tool.started) {

                if (havesnap) {
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                        rotatedpoint = snap_rotated(snapPoint);
                    } else {
                        rotatedpoint = snapPoint;
                    }

                    tool.addpoint(rotatedpoint.x, rotatedpoint.y);
                    tool.addpoint(rotatedpoint.x, rotatedpoint.y);
                } else {
                    tool.addpoint(mousePos.x, mousePos.y);
                    tool.addpoint(mousePos.x, mousePos.y);
                }
                tool.started = true;

            } else {
                if (havesnap) {
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                        rotatedpoint = snap_rotated(snapPoint);
                    } else {
                        rotatedpoint = snapPoint;
                    }

                    tool.addpoint(rotatedpoint.x, rotatedpoint.y);
                } else {
                    tool.addpoint(mousePos.x, mousePos.y);
                }

                /*if(tool.points[tool.numpoints].x != mousePos.x && tool.points[tool.numpoints].y != ev._y){
                 tool.addpoint(mousePos.x, ev._y);
                 }*/

            }

        }

        this.mousedown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);

            let rotatedpoint;
            if (!tool.started) {

                if (havesnap) {
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                        rotatedpoint = snap_rotated(snapPoint);
                    } else {
                        rotatedpoint = snapPoint;
                    }

                    tool.addpoint(rotatedpoint.x, rotatedpoint.y);
                    tool.addpoint(rotatedpoint.x, rotatedpoint.y);
                } else {
                    tool.addpoint(mousePos.x, mousePos.y);
                    tool.addpoint(mousePos.x, mousePos.y);
                }
                tool.started = true;

            } else {
                if (havesnap) {
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                        rotatedpoint = snap_rotated(snapPoint);
                    } else {
                        rotatedpoint = snapPoint;
                    }

                    tool.addpoint(rotatedpoint.x, rotatedpoint.y);
                } else {
                    tool.addpoint(mousePos.x, mousePos.y);
                }

                /*if(tool.points[tool.numpoints].x != ev._x && tool.points[tool.numpoints].y != ev._y){
                 tool.addpoint(ev._x, ev._y);
                 }*/

            }

        }

        // This function is called every time you move the mouse. Obviously, it only
        // draws if the tool.started state is set to true (when you are holding down
        // the mouse button).
        this.MSPointerMove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';

            const mousePos = getMousePos(Globals.canvas, ev);
            snapPoint = Globals.DocObj.pages[Globals.DocObj.currentpage].getsnap(mousePos.x, mousePos.y);

            if (!snapPoint.found || snapPoint == undefined) {
                havesnap = false;
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            } else {
                havesnap = true;
                drawsnap(Globals.context, snapPoint);

            }

            let rotatedpoint;
            if (tool.started) {
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                if (havesnap) {
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                        rotatedpoint = snap_rotated(snapPoint);
                    } else {
                        rotatedpoint = snapPoint;
                    }

                    tool.setlastpoint(rotatedpoint.x, rotatedpoint.y);
                    drawsnap(Globals.context, snapPoint);

                } else {
                    tool.setlastpoint(mousePos.x, mousePos.y);
                }
                tool.draw(Globals.context);
            }

        }

        this.mousemove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);

            snapPoint = Globals.DocObj.pages[Globals.DocObj.currentpage].getsnap(mousePos.x, mousePos.y);

            if (!snapPoint.found || snapPoint == undefined) {
                havesnap = false;
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            } else {
                havesnap = true;
                drawsnap(Globals.context, snapPoint);

            }

            let rotatedpoint;
            if (tool.started) {
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

                if (havesnap) {

                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                        rotatedpoint = snap_rotated(snapPoint);
                    } else {
                        rotatedpoint = snapPoint;
                    }

                    tool.setlastpoint(rotatedpoint.x, rotatedpoint.y);
                    drawsnap(Globals.context, snapPoint);

                } else {
                    tool.setlastpoint(mousePos.x, mousePos.y);
                }


                tool.draw(Globals.context);
            }

        }

        // This is called when you release the mouse button.
        this.MSPointerUp = function (ev: any) {
            //this.addToTable();
        }

        this.mouseup = function (ev: any) {
            //this.addToTable();
        }

        this.dblclick = function (ev: any) {
            if (tool.started) {
                tool.mousemove(ev);
                tool.started = false;

                tool.result.points.splice(tool.result.numpoints - 1, 2);
                tool.result.totaldistance = 0;

                tool.calculatedistance();
                tool.findanglebetweenlines();
                tool.addToTable();

                if (RxCore_GUI_Measurediag != undefined) {
                    RxCore_GUI_Measurediag.setMeasureresult(tool.result);
                }

                tool.result.points = [];
                tool.result.numpoints = -1;
                tool.result.lengths = [];
                tool.result.numlengths = -1;
                tool.result.angles = [];
                tool.result.numangles = -1;
                tool.result.lines = [];
                tool.result.numlines = -1;

                //show dialog here.
                //tool.dialogcontent = tool.dialogtextstart + tool.tabletext + tool.dialogtextend  + tool.dialogfieldtext;
                //setMContent(tool.dialogcontent);

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

                ev.target.style.cursor = 'default';

                //img_update();

            }

        }

        this.doubletap = function (ev: any) {
            if (tool.started) {

                //img_update();
                tool.started = false;
                tool.result.points.splice(tool.result.numpoints - 1, 1);
                tool.result.totaldistance = 0;

                tool.calculatedistance();
                tool.findanglebetweenlines();
                tool.addToTable();

                //show dialog here.

                if (RxCore_GUI_Measurediag != undefined) {
                    RxCore_GUI_Measurediag.setMeasureresult(tool.result);
                }

                tool.result.points = [];
                tool.result.numpoints = -1;
                tool.result.lengths = [];
                tool.result.numlengths = -1;
                tool.result.angles = [];
                tool.result.numangles = -1;
                tool.result.lines = [];
                tool.result.numlines = -1;


                //tool.dialogcontent = tool.dialogtextstart + tool.tabletext + tool.dialogtextend  + tool.dialogfieldtext;
                //setMContent(tool.dialogcontent);

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

            }

        }

        this.touchstart = function (ev: any) {
            ev.preventDefault();
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            //alert('touchdown');
            const touchx = touchPos.x;
            const touchy = touchPos.y;

            //double tap
            let lastTouch = 0;

            const now = new Date().getTime();

            if (tool.LastTouchdata == -1) {
                lastTouch = now + 1;
            } else {
                lastTouch = tool.LastTouchdata;
            }

            const delta = now - lastTouch;
            tool.LastTouchdata = now;

            if (delta < 500 && delta > 0) {
                tool.doubletap(ev);
                return;
                //alert("double tap");
            }
            //double tap

            if (!tool.started) {

                tool.addpoint(touchPos.x, touchPos.y);
                //tool.startdraw(context);
                tool.addpoint(touchPos.x, touchPos.y);
                tool.started = true;

            } else {
                tool.addpoint(touchPos.x, touchPos.y);
                //tool.addToTable();
                //areamarkupobj.addpoint(touchx, touchy);
                //polygonmarkupobj.setlastpoint(touchx,touchy);
            }
        }

        this.touchmove = function (ev: any) {
            ev.preventDefault();

            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            //var touchx = touchPos.x;
            //var touchy = touchPos.y;

            if (tool.started) {
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                tool.setlastpoint(touchPos.x, touchPos.y);
                tool.draw(Globals.context);

            }
        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const touchx = touchPos.x;
            const touchy = touchPos.y;

            if (tool.started) {
                //tool.addToTable();
                //tool.addpoint(touchx, touchy);
            }
        }

        this.touchend = function (ev: any) {
            ev.preventDefault();
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const touchx = touchPos.x;
            const touchy = touchPos.y;

            if (tool.started) {
                //tool.addToTable();
                //tool.addpoint(touchx, touchy);
            }
        }
    }


    // The dimension line tool.
    Globals.tools.measure = function (params: any) {
        const tool = this;
        let prevx = 0,
            prevy = 0;

        let limprevx = 0,
            limprevy = 0;

        let dimensionmarkupobj: any;
        let havesnap = false;
        let snapPoint: any;
        const subtype = params.p1;
        this.started = false;
        this.name = 'measure';
        this.anglelengthsupport = false;

        this.startx = 0;
        this.starty = 0;
        this.orgscale = 1.0;
        this.orgdx = 0.0;
        this.orgdy = 0.0;

        this.curmousepos = { x: 0, y: 0 };

        this.scrollhandling = function (movey: any) {
            if (!Globals.documentopen || Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                return;
            }

            if (movey < 0) {

                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs && Globals.DocObj.pages.length > 1) {
                    //DocObj.pages[DocObj.currentpage].pan_update(0,-movey);
                    if (Globals.DocObj.currentpage == Globals.DocObj.NumPages - 1) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].endy <= Globals.canvas.height) {
                            movey = 0;
                        }
                    }
                    Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, -movey);

                } else {

                    Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomOut(1.1, false, false, tool.curmousepos);

                    if (tool.started) {

                        tool.setdimoffset(false);

                    }

                }

            } else {

                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs && Globals.DocObj.pages.length > 1) {

                    if (Globals.DocObj.currentpage == 0) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].starty >= 0) {
                            movey = 0;
                        }

                    }
                    Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, -movey);

                } else {

                    Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomIn(1.1, false, false, tool.curmousepos);

                    if (tool.started) {
                        tool.setdimoffset(false);

                    }

                }

            }

        }

        this.wheel = function (ev: any) {
            let delta = 0;
            if (ev.wheelDelta !== undefined) { // WebKit / Opera / Explorer 9
                delta = ev.wheelDelta;
            } else if (ev.deltaY !== undefined) { // Firefox
                delta = -ev.deltaY * 50;
            }

            tool.scrollhandling(delta);
        }

        this.setdimoffset = function (initial: any) {
            if (initial) {

                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                    dimensionmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
                    dimensionmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
                    dimensionmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
                } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                    dimensionmarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
                    dimensionmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
                    dimensionmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

                } else {
                    dimensionmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
                    dimensionmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
                    dimensionmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;
                }
                tool.orgscale = dimensionmarkupobj.scaling;
                tool.orgdx = dimensionmarkupobj.xoffset;
                tool.orgdy = dimensionmarkupobj.yoffset;


            }

            const curscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getdscale();
            const pagedx = Globals.DocObj.pages[Globals.DocObj.currentpage].getdx();
            const pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].getdy();

            const scalediff = (curscale / dimensionmarkupobj.scaling);
            //var newx = (tool.startx - tool.orgdx) * scalediff;
            //var newy = (tool.starty - tool.orgdy) * scalediff;
            //newx += pagedx;
            //newy += pagedy;

            //this.wscaled = (this.w - this.xoffset) * scalefactor;
            //this.hscaled = (this.h - this.yoffset) * scalefactor;

            //this.wscaled += pagedx;
            //this.hscaled += pagedy;
            //changex = ((this.wscaled + pagedx) / scalefactor) + this.xoffset;

            const changex = ((dimensionmarkupobj.w - pagedx) / scalediff) + dimensionmarkupobj.xoffset;
            const changey = ((dimensionmarkupobj.h - pagedy) / scalediff) + dimensionmarkupobj.yoffset;

            //dimensionmarkupobj.w = changex;
            //dimensionmarkupobj.h = changey;
        }

        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }

        this.MSPointerDown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);

            let rotatedpoint;
            if (ev.button == 0) {
                if (!tool.started) {
                    tool.started = true;
                    if (Globals.DocObj) {
                        Globals.DocObj.bMarkupchanged = true;
                    }

                    if (!bWithin && Globals.bLimMarkupExtent) {
                        tool.started = false;
                        if (Globals.DocObj) {
                            Globals.DocObj.bMarkupchanged = false;
                        }
                        ev.target.style.cursor = 'default';
                        return;
                    }
                    if (havesnap) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            rotatedpoint = snap_rotated(snapPoint);
                        } else {
                            rotatedpoint = snapPoint;
                        }

                        tool.x0 = rotatedpoint.x;
                        tool.y0 = rotatedpoint.y;

                    } else {
                        tool.x0 = mousePos.x;
                        tool.y0 = mousePos.y;
                    }

                    dimensionmarkupobj = new MarkupObject(7, subtype, 0);
                    dimensionmarkupobj.pagenumber = Globals.DocObj.getcurPage();
                    dimensionmarkupobj.pagerotation = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation;

                    tool.setdimoffset(true);
                    tool.startx = tool.x0;
                    tool.starty = tool.y0;

                    dimensionmarkupobj.editaction = 0;

                } else {
                    if (bWithin || !Globals.bLimMarkupExtent) {
                        if (havesnap) {
                            if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                                rotatedpoint = snap_rotated(snapPoint);
                            } else {
                                rotatedpoint = snapPoint;
                            }

                            dimensionmarkupobj.w = rotatedpoint.x;
                            dimensionmarkupobj.h = rotatedpoint.y;

                        } else {
                            dimensionmarkupobj.w = mousePos.x;
                            dimensionmarkupobj.h = mousePos.y;

                        }
                        //tool.mousemove(ev);
                        Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                        tool.setdimoffset(false);
                        dimensionmarkupobj.drawme(Globals.context);

                        if (!Globals.bMultimarkupadd) {

                            Globals.bMarkupcrated = true;
                            //ft 08.08.2018 changed from separate index to direct array length
                            //nMarkupcreated = DocObj.nummarkups;
                            Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                        }

                        dimensionmarkupobj.savemetolistDraw();
                        dimensionmarkupobj = null;
                        tool.started = false;
                        img_update();

                        ev.target.style.cursor = 'default';

                        if (!Globals.bMultimarkupadd) {
                            //need to move to connection object.
                            //markupcreated();
                            if (RxCore_GUI_Markup != undefined) {
                                //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                                RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], { created: true, modified: false, deleted: false });
                            }

                        }
                    }

                }
            } else {
                prevx = mousePos.x;
                prevy = mousePos.y;

            }
        }

        this.mousedown = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            const bWithin = MousePosdrwext(mousePos);

            let rotatedpoint;
            if (ev.button == 0) {
                if (!tool.started) {
                    tool.started = true;
                    if (Globals.DocObj) {
                        Globals.DocObj.bMarkupchanged = true;
                    }

                    if (!bWithin && Globals.bLimMarkupExtent) {
                        tool.started = false;
                        if (Globals.DocObj) {
                            Globals.DocObj.bMarkupchanged = false;
                        }
                        ev.target.style.cursor = 'default';
                        return;
                    }

                    if (havesnap) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            rotatedpoint = snap_rotated(snapPoint);
                        } else {
                            rotatedpoint = snapPoint;
                        }

                        tool.x0 = rotatedpoint.x;
                        tool.y0 = rotatedpoint.y;
                    } else {
                        tool.x0 = mousePos.x;
                        tool.y0 = mousePos.y;
                    }

                    dimensionmarkupobj = new MarkupObject(7, subtype, 0);
                    dimensionmarkupobj.pagenumber = Globals.DocObj.getcurPage();
                    dimensionmarkupobj.pagerotation = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation;
                    tool.setdimoffset(true);

                    tool.startx = tool.x0;
                    tool.starty = tool.y0;

                    dimensionmarkupobj.editaction = 0;

                } else {
                    if (bWithin || !Globals.bLimMarkupExtent) {
                        if (havesnap) {
                            if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                                rotatedpoint = snap_rotated(snapPoint);
                            } else {
                                rotatedpoint = snapPoint;
                            }

                            dimensionmarkupobj.w = rotatedpoint.x;
                            dimensionmarkupobj.h = rotatedpoint.y;

                        } else {
                            dimensionmarkupobj.w = mousePos.x;
                            dimensionmarkupobj.h = mousePos.y;

                        }
                        //tool.mousemove(ev);
                        Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                        tool.setdimoffset(false);
                        dimensionmarkupobj.drawme(Globals.context);

                        if (!Globals.bMultimarkupadd) {

                            Globals.bMarkupcrated = true;
                            //ft 08.08.2018 changed from separate index to direct array length
                            Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                            //nMarkupcreated = DocObj.nummarkups;
                        }

                        dimensionmarkupobj.savemetolistDraw();
                        dimensionmarkupobj = null;
                        tool.started = false;
                        img_update();

                        ev.target.style.cursor = 'default';

                        if (!Globals.bMultimarkupadd) {
                            //need to move to connection object.
                            //markupcreated();
                            if (RxCore_GUI_Markup != undefined) {
                                //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                                // RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[DocObj.nummarkups], true);
                                RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], { created: true, modified: false, deleted: false });
                            }

                        }
                    }

                }
            } else {
                prevx = mousePos.x;
                prevy = mousePos.y;

            }

        }

        this.touchstart = function (ev: any) {
            //context.strokeStyle = "red";
            tool.started = true;
            if (Globals.DocObj) {
                Globals.DocObj.bMarkupchanged = true;
            }
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const bWithin = MousePosdrwext(touchPos);
            if (!bWithin && Globals.bLimMarkupExtent) {
                tool.started = false;
                if (Globals.DocObj) {
                    Globals.DocObj.bMarkupchanged = false;
                }
                ev.target.style.cursor = 'default';
                return;
            }

            tool.x0 = touchPos.x;
            tool.y0 = touchPos.y;
            dimensionmarkupobj = new MarkupObject(7, 0, 0);
            dimensionmarkupobj.pagenumber = Globals.DocObj.getcurPage();
            dimensionmarkupobj.pagerotation = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation;
            tool.setdimoffset(true);

            dimensionmarkupobj.editaction = 0;
        }

        this.MSPointerMove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            tool.curmousepos = mousePos;

            const xdiff = prevx - mousePos.x;
            const ydiff = prevy - mousePos.y;

            snapPoint = Globals.DocObj.pages[Globals.DocObj.currentpage].getsnap(mousePos.x, mousePos.y);

            if (!snapPoint.found || snapPoint == undefined) {
                havesnap = false;
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            } else {
                havesnap = true;
                drawsnap(Globals.context, snapPoint);

            }
            if (ev.buttons == 2) {

                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                tool.setdimoffset(false);
                prevx = mousePos.x;
                prevy = mousePos.y;

            }

            if (!tool.started) {
                return;
            }

            let bWithin = MousePosdrwext(mousePos);
            let rotatedpoint;
            if (bWithin || !Globals.bLimMarkupExtent) {
                if (havesnap) {
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                        rotatedpoint = snap_rotated(snapPoint);
                    } else {
                        rotatedpoint = snapPoint;
                    }

                    dimensionmarkupobj.x = tool.x0;
                    dimensionmarkupobj.y = tool.y0;
                    dimensionmarkupobj.w = rotatedpoint.x;
                    dimensionmarkupobj.h = rotatedpoint.y;

                    limprevx = rotatedpoint.x;
                    limprevy = rotatedpoint.y;

                } else {
                    dimensionmarkupobj.x = tool.x0;
                    dimensionmarkupobj.y = tool.y0;
                    dimensionmarkupobj.w = mousePos.x;
                    dimensionmarkupobj.h = mousePos.y;

                    limprevx = mousePos.x;
                    limprevy = mousePos.y;

                }

            } else {
                dimensionmarkupobj.x = tool.x0;
                dimensionmarkupobj.y = tool.y0;
                dimensionmarkupobj.w = limprevx;
                dimensionmarkupobj.h = limprevy;

            }

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

            if (havesnap) {
                drawsnap(Globals.context, snapPoint);
            }

            if (dimensionmarkupobj.w - dimensionmarkupobj.x != 0) {
                tool.setdimoffset(false);
                dimensionmarkupobj.drawme(Globals.context);
            }
        }

        this.mousemove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';
            const mousePos = getMousePos(Globals.canvas, ev);
            tool.curmousepos = mousePos;

            const xdiff = prevx - mousePos.x;
            const ydiff = prevy - mousePos.y;

            snapPoint = Globals.DocObj.pages[Globals.DocObj.currentpage].getsnap(mousePos.x, mousePos.y);

            if (!snapPoint.found || snapPoint == undefined) {
                havesnap = false;
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            } else {
                havesnap = true;
                drawsnap(Globals.context, snapPoint);

            }
            if (ev.button == 2 || ev.buttons == 2) {

                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                tool.setdimoffset(false);
                prevx = mousePos.x;
                prevy = mousePos.y;

            }

            if (!tool.started) {
                return;
            }

            //var mousePos = getMousePos(canvas, ev);
            const bWithin = MousePosdrwext(mousePos);
            let rotatedpoint;
            if (bWithin || !Globals.bLimMarkupExtent) {

                if (havesnap) {
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                        rotatedpoint = snap_rotated(snapPoint);
                    } else {
                        rotatedpoint = snapPoint;
                    }

                    dimensionmarkupobj.x = tool.x0;
                    dimensionmarkupobj.y = tool.y0;
                    dimensionmarkupobj.w = rotatedpoint.x;
                    dimensionmarkupobj.h = rotatedpoint.y;
                    limprevx = rotatedpoint.x;
                    limprevy = rotatedpoint.y;

                } else {
                    dimensionmarkupobj.x = tool.x0;
                    dimensionmarkupobj.y = tool.y0;
                    dimensionmarkupobj.w = mousePos.x;
                    dimensionmarkupobj.h = mousePos.y;

                    limprevx = mousePos.x;
                    limprevy = mousePos.y;

                }

            } else {
                dimensionmarkupobj.x = tool.x0;
                dimensionmarkupobj.y = tool.y0;
                dimensionmarkupobj.w = limprevx;
                dimensionmarkupobj.h = limprevy;

            }

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

            if (havesnap) {
                drawsnap(Globals.context, snapPoint);
            }

            if (dimensionmarkupobj.w - dimensionmarkupobj.x != 0) {
                tool.setdimoffset(false);
                dimensionmarkupobj.drawme(Globals.context);
            }

        }

        this.touchmove = function (ev: any) {
            ev.preventDefault();
            if (!tool.started) {
                return;
            }
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            const bWithin = MousePosdrwext(touchPos);
            if (bWithin || !Globals.bLimMarkupExtent) {

                dimensionmarkupobj.x = tool.x0;
                dimensionmarkupobj.y = tool.y0;
                dimensionmarkupobj.w = touchPos.x;
                dimensionmarkupobj.h = touchPos.y;

                prevx = touchPos.x;
                prevy = touchPos.y;

            } else {
                dimensionmarkupobj.x = tool.x0;
                dimensionmarkupobj.y = tool.y0;
                dimensionmarkupobj.w = prevx;
                dimensionmarkupobj.h = prevy;

            }

            /*dimensionmarkupobj.x = tool.x0;
             dimensionmarkupobj.y = tool.y0;
             dimensionmarkupobj.w = touchPos.x;
             dimensionmarkupobj.h = touchPos.y;*/

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            if (dimensionmarkupobj.w - dimensionmarkupobj.x != 0) {
                dimensionmarkupobj.drawme(Globals.context);
            }

        }

        this.MSPointerUp = function (ev: any) {
            /*if (tool.started) {
             tool.mousemove(ev);
             dimensionmarkupobj.savemetolist();
             dimensionmarkupobj = null;
             tool.started = false;
             img_update();

             ev.target.style.cursor = 'default';

             }*/

        }

        this.mouseup = function (ev: any) {
            /*if (tool.started) {
             tool.mousemove(ev);
             dimensionmarkupobj.savemetolist();
             dimensionmarkupobj = null;
             tool.started = false;
             img_update();
             drawmarkupAll(cntximg);
             ev.target.style.cursor = 'default';

             }*/
        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();

            if (tool.started) {
                tool.started = false;
                if (!Globals.bMultimarkupadd) {

                    Globals.bMarkupcrated = true;
                    //ft 08.08.2018 changed from separate index to direct array length
                    Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                    //nMarkupcreated = DocObj.nummarkups;
                }

                dimensionmarkupobj.savemetolistDraw();
                img_update();
                //tool.touchmove(ev);
                dimensionmarkupobj = null;
                //alert(DocObj.pages[DocObj.currentpage].dscale);
                if (!Globals.bMultimarkupadd) {
                    //need to move to connection object.
                    //markupcreated();
                    if (RxCore_GUI_Markup != undefined) {
                        //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                        RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], { created: true, modified: false, deleted: false });
                    }

                }

            }
        }

        this.touchend = function (ev: any) {
            ev.preventDefault();

            if (tool.started) {
                tool.started = false;
                if (!Globals.bMultimarkupadd) {

                    Globals.bMarkupcrated = true;
                    //ft 08.08.2018 changed from separate index to direct array length
                    Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
                    //nMarkupcreated = DocObj.nummarkups;
                }

                dimensionmarkupobj.savemetolistDraw();
                img_update();
                //tool.touchmove(ev);
                dimensionmarkupobj = null;
                //alert(DocObj.pages[DocObj.currentpage].dscale);
                if (!Globals.bMultimarkupadd) {
                    //need to move to connection object.
                    //markupcreated();
                    if (RxCore_GUI_Markup != undefined) {
                        //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                        RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], { created: true, modified: false, deleted: false });
                    }

                }

            }
        }

    }


    // The getoverlayscale line tool.
    Globals.tools.getoverlayscale = function (params: any) {
        const tool = this;
        const page = params.p1;
        const index = params.p2;
        this.started = false;

        this.points = [];
        //this.compareref = Compareobject;
        this.pageobject = page;
        this.pageindex = index;

        this.name = 'getoverlayscale';
        this.anglelengthsupport = false;

        this.startx = 0;
        this.starty = 0;
        this.x = 0;
        this.y = 0;

        this.w = 0;
        this.h = 0;
        this.distance = 0.0;
        this.orgscale = 1.0;
        this.orgdx = 0.0;
        this.orgdy = 0.0;

        const curcanv = document.createElement('canvas');
        curcanv.width = 30;
        curcanv.height = 30;
        const curcntximg: any = curcanv.getContext('2d');

        curcntximg.strokeStyle = "gray";
        curcntximg.lineWidth = 1;

        curcntximg.strokeRect(0, 0, 30, 30);

        curcntximg.beginPath();
        curcntximg.moveTo(15, 0);
        curcntximg.lineTo(15, 14);
        curcntximg.moveTo(15, 30);
        curcntximg.lineTo(15, 16);
        curcntximg.moveTo(0, 15);
        curcntximg.lineTo(14, 15);
        curcntximg.moveTo(30, 15);
        curcntximg.lineTo(16, 15);
        curcntximg.closePath();
        curcntximg.stroke();

        let prevx = 0,
            prevy = 0;

        let Unit = "mm";

        let havesnap = false;
        let snapPoint: any;

        this.dialogfieldtext = "";

        this.getdiag = function (width: any, height: any) {
            const dimwsq = Math.pow(width, 2);
            const dimhsq = Math.pow(height, 2);
            const dimdiag = Math.sqrt((dimwsq + dimhsq));

            return dimdiag;
        }

        this.getangleofline = function (startx: any, starty: any, endx: any, endy: any, useabs: any) {
            let width = 0;
            let height = 0;
            if (useabs) {
                width = Math.abs(endx - startx);
                height = Math.abs(endy - starty);
            } else {
                width = endx - startx;
                height = endy - starty;

            }
            return Math.atan2(height, width);
        }

        this.dialogtext = function () {
            let lcounter = 0;
            let point1 = 0;
            let point2 = 0;
            let pointstext = "";
            let angletext = "";
            let length = 0;
            let texttotable = "";
            let trueangle = 0;

            Unit = Globals.Unitlabel;

            const dimwidth = tool.w - tool.x;
            const dimheight = tool.h - tool.y;

            const dimdiag = tool.getdiag(dimwidth, dimheight);

            const lineangle = tool.getangleofline(tool.x, tool.y, tool.w, tool.h, false);
            //console.log((lineangle / (Math.PI / 180)));

            let xoffset = tool.x - tool.pageobject.getdx();
            let yoffset = tool.y - tool.pageobject.getdy();

            const pagescale = tool.pageobject.getdscale();
            tool.distance = dimdiag;

            /*if (DocObj.pages[DocObj.currentpage].usevectorxml) {
                tool.distance = getUnitlength(dimdiag / DocObj.pages[DocObj.currentpage].dscalevector);
            } else if (DocObj.pages[DocObj.currentpage].usepdfjs) {
                tool.distance = getUnitlength(dimdiag / (DocObj.pages[DocObj.currentpage].curpagescale * DocObj.pages[DocObj.currentpage].dscalepdf));
            } else {
                tool.distance = getUnitlength(dimdiag / DocObj.pages[DocObj.currentpage].dscale);
            }*/

            let pagewidth;
            if (tool.pageobject.usevectorxml) {
                pagewidth = pagescale * tool.pageobject.VectorPageObj.width;

                //tool.distance = getUnitlength(dimdiag / tool.pageobject.dscalevector);

                xoffset /= tool.pageobject.dscalevector;
                yoffset /= tool.pageobject.dscalevector;
            } else if (tool.pageobject.usepdfjs) {

                switch (tool.pageindex) {

                    case 0:
                        //pagewidth = tool.compareref.bgpagecanvas.width;

                        break;

                    case 1:
                        //pagewidth = tool.compareref.ovpagecanvas.width;


                        break;

                }
                //tool.distance = getUnitlength(dimdiag);
                //tool.distance = getUnitlength(dimdiag / (tool.pageobject.curpagescale * tool.pageobject.dscalepdf));
                tool.distance = getUnitlength(dimdiag);
                //tool.distance *= tool.pageobject.dscalepdf;

                pagewidth = tool.pageobject.pagecanvas.width;

                const scaledPageWidth = tool.pageobject.pagecanvas.width * tool.pageobject.dscalepdf;
                pagewidth = scaledPageWidth;

                //console.log(tool.pageobject.dscalepdf);
                //console.log(tool.distance);

                const curpagescale = scaledPageWidth / tool.pageobject.pdfpagewidth;
                xoffset /= curpagescale;
                yoffset /= curpagescale;

            } else {
                pagewidth = pagescale * tool.pageobject.MainImageWidth;
                xoffset /= tool.pageobject.dscale;
                yoffset /= tool.pageobject.dscale;

            }

            if (RxCore_GUI_CompareMeasure != undefined) {
                RxCore_GUI_CompareMeasure.AlignMeasure(tool.distance, lineangle, { x: xoffset, y: yoffset }, pagewidth);
            }

        }

        this.drawCross = function (ctx: any, mousePos: any) {
            ctx.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            ctx.strokeStyle = "gray";
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(0, mousePos.y);
            ctx.lineTo(mousePos.x - 1, mousePos.y);
            ctx.moveTo(mousePos.x + 1, mousePos.y);
            ctx.lineTo(Globals.canvas.width, mousePos.y);
            ctx.moveTo(mousePos.x, 0);
            ctx.lineTo(mousePos.x, mousePos.y - 1);
            ctx.moveTo(mousePos.x, mousePos.y + 1);
            ctx.lineTo(mousePos.x, Globals.canvas.height);
            ctx.closePath();
            ctx.stroke();
        }

        this.draw = function (ctx: any) {
            const arrowangle = 22.5;
            const arrowlength = Globals.nArrowSize;
            const arrowanglerad = arrowangle / (180 / Math.PI);

            const dimwidth = tool.w - tool.x;
            const dimheight = tool.h - tool.y;

            const dimanglerad = Math.atan2(dimheight, dimwidth);
            const arrowh = Math.abs(arrowlength / Math.cos(arrowanglerad));

            ctx.strokeStyle = "blue";
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.w, this.h);
            ctx.closePath();
            ctx.stroke();

            ctx.strokeRect(this.x - 15, this.y - 15, 30, 30);

            ctx.beginPath();
            ctx.moveTo(this.x, this.y - 15);
            ctx.lineTo(this.x, this.y - 1);
            ctx.moveTo(this.x, this.y + 15);
            ctx.lineTo(this.x, this.y + 1);
            ctx.moveTo(this.x - 15, this.y);
            ctx.lineTo(this.x - 1, this.y);
            ctx.moveTo(this.x + 15, this.y);
            ctx.lineTo(this.x + 1, this.y);
            ctx.closePath();
            ctx.stroke();

            ctx.strokeRect(this.w - 15, this.h - 15, 30, 30);

            ctx.beginPath();
            ctx.moveTo(this.w, this.h - 15);
            ctx.lineTo(this.w, this.h - 1);
            ctx.moveTo(this.w, this.h + 15);
            ctx.lineTo(this.w, this.h + 1);
            ctx.moveTo(this.w - 15, this.h);
            ctx.lineTo(this.w - 1, this.h);
            ctx.moveTo(this.w + 15, this.h);
            ctx.lineTo(this.w + 1, this.h);
            ctx.closePath();
            ctx.stroke();

        }

        this.scrollhandling = function (movey: any) {
            if (!Globals.documentopen || Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                return;
            }

            let curscale, pagedx, pagedy, scalediff, newx, newy;
            if (movey < 0) {

                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs && Globals.DocObj.pages.length > 1 && !Globals.DocObj.pagelocked) {
                    //DocObj.pages[DocObj.currentpage].pan_update(0,-movey);
                    if (Globals.DocObj.currentpage == Globals.DocObj.NumPages - 1) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].endy <= Globals.canvas.height) {
                            movey = 0;
                        }
                    }
                    Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, -movey);

                } else {

                    Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomOut(1.1, false, false);

                    curscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getdscale();
                    pagedx = Globals.DocObj.pages[Globals.DocObj.currentpage].getdx();
                    pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].getdy();

                    if (tool.started) {
                        scalediff = (curscale / tool.orgscale);
                        newx = (tool.startx - tool.orgdx) * scalediff;
                        newy = (tool.starty - tool.orgdy) * scalediff;
                        newx += pagedx;
                        newy += pagedy;

                        tool.x = newx;
                        tool.y = newy;

                    }

                }

            } else {

                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs && Globals.DocObj.pages.length > 1 && !Globals.DocObj.pagelocked) {

                    if (Globals.DocObj.currentpage == 0) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].starty >= 0) {
                            movey = 0;
                        }

                    }
                    Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, -movey);

                } else {

                    Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomIn(1.1, false, false);

                    curscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getdscale();
                    pagedx = Globals.DocObj.pages[Globals.DocObj.currentpage].getdx();
                    pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].getdy();

                    if (tool.started) {
                        scalediff = (curscale / tool.orgscale);
                        newx = (tool.startx - tool.orgdx) * scalediff;
                        newy = (tool.starty - tool.orgdy) * scalediff;
                        newx += pagedx;
                        newy += pagedy;

                        tool.x = newx;
                        tool.y = newy;

                    }

                }

            }

        }

        this.wheel = function (ev: any) {
            let delta = 0;
            if (ev.wheelDelta !== undefined) { // WebKit / Opera / Explorer 9
                delta = ev.wheelDelta;

            } else if (ev.deltaY !== undefined) { // Firefox
                delta = -ev.deltaY * 50;

            }

            tool.scrollhandling(delta);
        }

        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }

        this.MSPointerDown = function (ev: any) {
            const mousePos = getMousePos(Globals.canvas, ev);

            let rotatedpoint;
            if (ev.button == 0) {
                if (!tool.started) {
                    ev.preventDefault();
                    ev.stopPropagation();

                    ev.target.style.cursor = 'crosshair';
                    //ev.target.style.cursor = 'url(' + curcanv.toDataURL() + ')15 15, auto';

                    tool.started = true;
                    if (havesnap) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            rotatedpoint = snap_rotated(snapPoint);
                        } else {
                            rotatedpoint = snapPoint;
                        }

                        tool.x = rotatedpoint.x;
                        tool.y = rotatedpoint.y;
                        tool.w = rotatedpoint.x;
                        tool.h = rotatedpoint.y;

                    } else {
                        tool.x = mousePos.x;
                        tool.y = mousePos.y;
                        tool.w = mousePos.x;
                        tool.h = mousePos.y;

                    }

                    tool.orgscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getdscale();
                    tool.orgdx = Globals.DocObj.pages[Globals.DocObj.currentpage].getdx();
                    tool.orgdy = Globals.DocObj.pages[Globals.DocObj.currentpage].getdy();
                    tool.startx = tool.x;
                    tool.starty = tool.y;

                } else {

                    if (havesnap) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            rotatedpoint = snap_rotated(snapPoint);
                        } else {
                            rotatedpoint = snapPoint;
                        }

                        tool.w = rotatedpoint.x;
                        tool.h = rotatedpoint.y;

                    } else {
                        tool.w = mousePos.x;
                        tool.h = mousePos.y;

                    }

                    tool.started = false;

                    tool.dialogtext();

                    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                    ev.target.style.cursor = 'default';

                }
            } else {
                prevx = mousePos.x;
                prevy = mousePos.y;

            }

        }

        this.mousedown = function (ev: any) {
            const mousePos = getMousePos(Globals.canvas, ev);

            let rotatedpoint;
            if (ev.button == 0) {
                if (!tool.started) {
                    ev.preventDefault();
                    ev.stopPropagation();

                    //ev.target.style.cursor = 'crosshair';
                    ev.target.style.cursor = 'url(' + curcanv.toDataURL() + ')15 15, auto';

                    tool.started = true;
                    if (havesnap) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            rotatedpoint = snap_rotated(snapPoint);
                        } else {
                            rotatedpoint = snapPoint;
                        }

                        tool.x = rotatedpoint.x;
                        tool.y = rotatedpoint.y;
                        tool.w = rotatedpoint.x;
                        tool.h = rotatedpoint.y;

                    } else {
                        tool.x = mousePos.x;
                        tool.y = mousePos.y;
                        tool.w = mousePos.x;
                        tool.h = mousePos.y;

                    }
                    tool.orgscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getdscale();
                    tool.orgdx = Globals.DocObj.pages[Globals.DocObj.currentpage].getdx();
                    tool.orgdy = Globals.DocObj.pages[Globals.DocObj.currentpage].getdy();
                    tool.startx = tool.x;
                    tool.starty = tool.y;

                } else {
                    if (havesnap) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            rotatedpoint = snap_rotated(snapPoint);
                        } else {
                            rotatedpoint = snapPoint;
                        }

                        tool.w = rotatedpoint.x;
                        tool.h = rotatedpoint.y;

                    } else {
                        tool.w = mousePos.x;
                        tool.h = mousePos.y;

                    }
                    tool.started = false;

                    tool.dialogtext();

                    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                    ev.target.style.cursor = 'default';

                }
            } else {

                prevx = mousePos.x;
                prevy = mousePos.y;

            }
        }

        this.touchstart = function (ev: any) {
            if (!tool.started) {
                const touchPos = getTouchPos(Globals.canvas, ev, 0);
                tool.started = true;
                tool.x = touchPos.x;
                tool.y = touchPos.y;
                tool.w = touchPos.x;
                tool.h = touchPos.y;

                tool.orgscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getdscale();
                tool.orgdx = Globals.DocObj.pages[Globals.DocObj.currentpage].getdx();
                tool.orgdy = Globals.DocObj.pages[Globals.DocObj.currentpage].getdy();


            } else {
                //tool.started = true;
            }
        }

        this.MSPointerMove = function (ev: any) {
            const mousePos = getMousePos(Globals.canvas, ev);
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';

            const xdiff = prevx - mousePos.x;
            const ydiff = prevy - mousePos.y;


            snapPoint = Globals.DocObj.pages[Globals.DocObj.currentpage].getsnap(mousePos.x, mousePos.y);

            if (!snapPoint.found) {
                havesnap = false;
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            } else {
                havesnap = true;
                drawsnap(Globals.context, snapPoint);

            }

            if (ev.buttons == 2) {

                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                prevx = mousePos.x;
                prevy = mousePos.y;

            }

            if (!tool.started) {
                return;
            }

            let rotatedpoint;
            if (havesnap) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                    rotatedpoint = snap_rotated(snapPoint);
                } else {
                    rotatedpoint = snapPoint;
                }

                tool.w = rotatedpoint.x;
                tool.h = rotatedpoint.y;

            } else {
                tool.w = mousePos.x;
                tool.h = mousePos.y;

            }

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            if (ev.buttons == 2) {
                tool.x -= xdiff;
                tool.y -= ydiff;

            }

            if (tool.w - tool.x != 0) {
                tool.draw(Globals.context);
            }
        }

        this.mousemove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'url(' + curcanv.toDataURL() + ')15 15, auto';

            const mousePos = getMousePos(Globals.canvas, ev);

            tool.drawCross(Globals.context, mousePos);

            const xdiff = prevx - mousePos.x;
            const ydiff = prevy - mousePos.y;

            snapPoint = Globals.DocObj.pages[Globals.DocObj.currentpage].getsnap(mousePos.x, mousePos.y);

            if (!snapPoint.found) {
                havesnap = false;
                //context.clearRect(0, 0, canvas.width, canvas.height);
            } else {
                havesnap = true;
                drawsnap(Globals.context, snapPoint);

            }
            if (ev.button == 2 || ev.buttons == 2) {

                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);

                prevx = mousePos.x;
                prevy = mousePos.y;

            }

            if (!tool.started) {
                return;
            }

            let rotatedpoint;
            if (havesnap) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                    rotatedpoint = snap_rotated(snapPoint);
                } else {
                    rotatedpoint = snapPoint;
                }

                tool.w = rotatedpoint.x;
                tool.h = rotatedpoint.y;

            } else {
                tool.w = mousePos.x;
                tool.h = mousePos.y;

            }

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            if (ev.button == 2 || ev.buttons == 2) {
                tool.x -= xdiff;
                tool.y -= ydiff;

            }

            if (tool.w - tool.x != 0) {
                tool.draw(Globals.context);
            }
        }

        this.touchmove = function (ev: any) {
            ev.preventDefault();
            if (!tool.started) {
                return;
            }

            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            tool.w = touchPos.x;
            tool.h = touchPos.y;

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            if (tool.w - tool.x != 0) {
                tool.draw(Globals.context);
            }

        }

        this.MSPointerUp = function (ev: any) {
            if (tool.started) {

            }

        }

        this.mouseup = function (ev: any) {
            if (tool.started) {
            }
        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();

            if (tool.started) {
                tool.started = false;
                tool.dialogtext();

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            }

        }

        this.touchend = function (ev: any) {
            ev.preventDefault();

            if (tool.started) {
                tool.started = false;
                tool.dialogtext();

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            }
        }
    }


    // The overlayscale line tool.
    Globals.tools.overlayscale = function (params: any) {
        const tool = this;
        const Compareobject = params.p1;
        this.started = false;

        this.points = [];
        this.compareref = Compareobject;

        this.name = 'overlayscale';
        this.anglelengthsupport = false;

        this.startx = 0;
        this.starty = 0;
        this.x = 0;
        this.y = 0;

        this.w = 0;
        this.h = 0;
        this.distance = 0.0;
        this.orgscale = 1.0;
        this.orgdx = 0.0;
        this.orgdy = 0.0;
        this.curmousepos = { x: 0, y: 0 };

        const curcanv = document.createElement('canvas');
        curcanv.width = 30;
        curcanv.height = 30;
        let curcntximg: any = curcanv.getContext('2d');

        curcntximg.strokeStyle = "gray";
        curcntximg.lineWidth = 1;

        curcntximg.strokeRect(0, 0, 30, 30);

        curcntximg.beginPath();
        curcntximg.moveTo(15, 0);
        curcntximg.lineTo(15, 14);
        curcntximg.moveTo(15, 30);
        curcntximg.lineTo(15, 16);
        curcntximg.moveTo(0, 15);
        curcntximg.lineTo(14, 15);
        curcntximg.moveTo(30, 15);
        curcntximg.lineTo(16, 15);
        curcntximg.closePath();
        curcntximg.stroke();

        let prevx = 0,
            prevy = 0;

        let Unit = "mm";

        let havesnap = false;
        let snapPoint: any;

        this.dialogfieldtext = "";

        this.getdiag = function (width: any, height: any) {
            const dimwsq = Math.pow(width, 2);
            const dimhsq = Math.pow(height, 2);
            const dimdiag = Math.sqrt((dimwsq + dimhsq));

            return dimdiag;
        }

        this.dialogtext = function () {
            let lcounter = 0;
            let point1 = 0;
            let point2 = 0;
            let pointstext = "";
            let angletext = "";
            let length = 0;
            let texttotable = "";
            let trueangle = 0;

            Unit = Globals.Unitlabel;

            const dimwidth = tool.w - tool.x;
            const dimheight = tool.h - tool.y;

            //tool.distance = tool.getdiag(dimwidth, dimheight);
            const dimdiag = tool.getdiag(dimwidth, dimheight);
            //var tempscale = MeasureScale;
            //MeasureScale = 1.0;

            let xoffset = tool.x - tool.compareref.pages[tool.compareref.scaleindex].getdx();
            let yoffset = tool.y - tool.compareref.pages[tool.compareref.scaleindex].getdy();

            const pagescale = tool.compareref.pages[tool.compareref.scaleindex].getdscale();
            tool.distance = dimdiag;

            if (tool.compareref.pages[tool.compareref.scaleindex].usevectorxml) {
                //tool.distance = getUnitlength(dimdiag / tool.compareref.pages[tool.compareref.scaleindex].dscalevector);
                var pagewidth = pagescale * tool.compareref.pages[tool.compareref.scaleindex].VectorPageObj.width;

                //tool.distance = dimdiag / tool.compareref.pages[tool.compareref.scaleindex].dscalevector;
                xoffset /= tool.compareref.pages[tool.compareref.scaleindex].dscalevector;
                yoffset /= tool.compareref.pages[tool.compareref.scaleindex].dscalevector;

            } else if (tool.compareref.pages[tool.compareref.scaleindex].usepdfjs) {
                switch (tool.compareref.scaleindex) {
                    case 0:
                        pagewidth = tool.compareref.bgpagecanvas.width;

                        break;

                    case 1:
                        pagewidth = tool.compareref.ovpagecanvas.width;


                        break;

                }
                pagewidth = tool.compareref.pages[tool.compareref.scaleindex].pagecanvas.width;
                var curpagescale = tool.compareref.pages[tool.compareref.scaleindex].pagecanvas.width / tool.compareref.pages[tool.compareref.scaleindex].pdfpagewidth;
                //tool.distance = getUnitlength(dimdiag / (tool.compareref.pages[tool.compareref.scaleindex].curpagescale * tool.compareref.pages[tool.compareref.scaleindex].dscalepdf));
                //tool.distance = dimdiag / (tool.compareref.pages[tool.compareref.scaleindex].curpagescale * tool.compareref.pages[tool.compareref.scaleindex].dscalepdf);
                xoffset /= curpagescale;
                yoffset /= curpagescale;

            } else {
                //tool.distance = getUnitlength(dimdiag / tool.compareref.pages[tool.compareref.scaleindex].dscale);
                pagewidth = pagescale * tool.compareref.pages[tool.compareref.scaleindex].MainImageWidth;
                xoffset /= tool.compareref.pages[tool.compareref.scaleindex].dscale;
                yoffset /= tool.compareref.pages[tool.compareref.scaleindex].dscale;
            }

            //nCalibrateMeasured = tool.distance;
            //MeasureScale = tempscale;

            //var offsetdiag = tool.getdiag(xoffset, yoffset);

            tool.compareref.setdistance(tool.distance, { x: xoffset, y: yoffset }, pagewidth);

            //var tempscale = MeasureScale;
            //MeasureScale = 1.0;


            //nCalibrateMeasured = tool.distance;
            //MeasureScale = tempscale;

        }

        this.draw = function (ctx: any) {
            const arrowangle = 22.5;
            const arrowlength = Globals.nArrowSize;
            const arrowanglerad = arrowangle / (180 / Math.PI);


            const dimwidth = tool.w - tool.x;
            const dimheight = tool.h - tool.y;


            const dimanglerad = Math.atan2(dimheight, dimwidth);
            const arrowh = Math.abs(arrowlength / Math.cos(arrowanglerad));


            //var dimangleradneg = Math.PI + dimanglerad;
            //var arrowupperangle = dimangleradneg + arrowanglerad;
            //var arrowlowerangle = dimangleradneg - arrowanglerad;

            //var topx = this.w + Math.cos(arrowupperangle) * arrowh;
            //var topy = this.h + Math.sin(arrowupperangle) * arrowh;
            //var botx = this.w + Math.cos(arrowlowerangle) * arrowh;
            //var boty = this.h + Math.sin(arrowlowerangle) * arrowh;

            //var sarrowupperangle = dimanglerad + arrowanglerad;
            //var sarrowlowerangle = dimanglerad - arrowanglerad;


            //var stopx = this.x + Math.cos(sarrowupperangle) * arrowh;
            //var stopy = this.y + Math.sin(sarrowupperangle) * arrowh;
            //var sbotx = this.x + Math.cos(sarrowlowerangle) * arrowh;
            //var sboty = this.y + Math.sin(sarrowlowerangle) * arrowh;


            ctx.strokeStyle = "blue";
            ctx.lineWidth = 2;


            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.w, this.h);
            ctx.closePath();
            ctx.stroke();

            ctx.strokeRect(this.x - 15, this.y - 15, 30, 30);


            ctx.beginPath();
            ctx.moveTo(this.x, this.y - 15);
            ctx.lineTo(this.x, this.y - 1);
            ctx.moveTo(this.x, this.y + 15);
            ctx.lineTo(this.x, this.y + 1);
            ctx.moveTo(this.x - 15, this.y);
            ctx.lineTo(this.x - 1, this.y);
            ctx.moveTo(this.x + 15, this.y);
            ctx.lineTo(this.x + 1, this.y);
            ctx.closePath();
            ctx.stroke();

            //arrowlines

            /*ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(stopx, stopy);
            ctx.closePath();
            ctx.stroke();*/

            /*ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(sbotx, sboty);
            ctx.closePath();
            ctx.stroke();*/

            ctx.strokeRect(this.w - 15, this.h - 15, 30, 30);

            ctx.beginPath();
            ctx.moveTo(this.w, this.h - 15);
            ctx.lineTo(this.w, this.h - 1);
            ctx.moveTo(this.w, this.h + 15);
            ctx.lineTo(this.w, this.h + 1);
            ctx.moveTo(this.w - 15, this.h);
            ctx.lineTo(this.w - 1, this.h);
            ctx.moveTo(this.w + 15, this.h);
            ctx.lineTo(this.w + 1, this.h);
            ctx.closePath();
            ctx.stroke();

            /*ctx.beginPath();
            ctx.moveTo(this.w, this.h);
            ctx.lineTo(topx, topy);
            ctx.closePath();
            ctx.stroke();*/

            /*ctx.beginPath();
            ctx.moveTo(this.w, this.h);
            ctx.lineTo(botx, boty);
            ctx.closePath();
            ctx.stroke();*/
        }

        this.scrollhandling = function (movey: any) {
            if (!Globals.documentopen || Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                return;
            }

            let curscale, pagedx, pagedy, scalediff, newx, newy;
            if (movey < 0) {

                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs && Globals.DocObj.pages.length > 1) {
                    //DocObj.pages[DocObj.currentpage].pan_update(0,-movey);
                    if (Globals.DocObj.currentpage == Globals.DocObj.NumPages - 1) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].endy <= Globals.canvas.height) {
                            movey = 0;
                        }
                    }
                    Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, -movey);

                } else {

                    Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomOut(1.1, false, false, Globals.tools.curmousepos);

                    curscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getdscale();
                    pagedx = Globals.DocObj.pages[Globals.DocObj.currentpage].getdx();
                    pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].getdy();

                    if (tool.started) {

                        scalediff = (curscale / tool.orgscale);
                        newx = (tool.startx - tool.orgdx) * scalediff;
                        newy = (tool.starty - tool.orgdy) * scalediff;
                        newx += pagedx;
                        newy += pagedy;

                        tool.x = newx;
                        tool.y = newy;

                    }

                }

            } else {

                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs && Globals.DocObj.pages.length > 1) {

                    if (Globals.DocObj.currentpage == 0) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].starty >= 0) {
                            movey = 0;
                        }

                    }
                    Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, -movey);

                } else {

                    Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomIn(1.1, false, false, tool.curmousepos);

                    curscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getdscale();
                    pagedx = Globals.DocObj.pages[Globals.DocObj.currentpage].getdx();
                    pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].getdy();

                    if (tool.started) {
                        scalediff = (curscale / tool.orgscale);
                        newx = (tool.startx - tool.orgdx) * scalediff;
                        newy = (tool.starty - tool.orgdy) * scalediff;
                        newx += pagedx;
                        newy += pagedy;

                        tool.x = newx;
                        tool.y = newy;

                    }

                }

            }

        }

        this.wheel = function (ev: any) {
            let delta = 0;
            if (ev.wheelDelta !== undefined) { // WebKit / Opera / Explorer 9
                delta = ev.wheelDelta;

            } else if (ev.deltaY !== undefined) { // Firefox
                delta = -ev.deltaY * 50;

            }

            tool.scrollhandling(delta);

        }

        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }

        this.MSPointerDown = function (ev: any) {
            const mousePos = getMousePos(Globals.canvas, ev);

            let rotatedpoint;
            if (ev.button == 0) {
                if (!tool.started) {
                    ev.preventDefault();
                    ev.stopPropagation();

                    ev.target.style.cursor = 'crosshair';
                    //ev.target.style.cursor = 'url(' + curcanv.toDataURL() + ')15 15, auto';

                    tool.started = true;
                    if (havesnap) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            rotatedpoint = snap_rotated(snapPoint);
                        } else {
                            rotatedpoint = snapPoint;
                        }

                        tool.x = rotatedpoint.x;
                        tool.y = rotatedpoint.y;
                        tool.w = rotatedpoint.x;
                        tool.h = rotatedpoint.y;

                    } else {
                        tool.x = mousePos.x;
                        tool.y = mousePos.y;
                        tool.w = mousePos.x;
                        tool.h = mousePos.y;

                    }

                    tool.orgscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getdscale();
                    tool.orgdx = Globals.DocObj.pages[Globals.DocObj.currentpage].getdx();
                    tool.orgdy = Globals.DocObj.pages[Globals.DocObj.currentpage].getdy();
                    tool.startx = tool.x;
                    tool.starty = tool.y;

                } else {

                    if (havesnap) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            rotatedpoint = snap_rotated(snapPoint);
                        } else {
                            rotatedpoint = snapPoint;
                        }

                        tool.w = rotatedpoint.x;
                        tool.h = rotatedpoint.y;

                    } else {
                        tool.w = mousePos.x;
                        tool.h = mousePos.y;

                    }

                    tool.started = false;

                    tool.dialogtext();
                    /*if (RxCore_GUI_Calibratediag != undefined) {
                     RxCore_GUI_Calibratediag.setCalibrate(tool.distance);
                     }*/

                    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                    ev.target.style.cursor = 'default';

                }
            } else {
                prevx = mousePos.x;
                prevy = mousePos.y;

            }

        }

        this.mousedown = function (ev: any) {
            const mousePos = getMousePos(Globals.canvas, ev);

            let rotatedpoint;
            if (ev.button == 0) {
                if (!tool.started) {
                    ev.preventDefault();
                    ev.stopPropagation();

                    //ev.target.style.cursor = 'crosshair';
                    ev.target.style.cursor = 'url(' + curcanv.toDataURL() + ')15 15, auto';

                    tool.started = true;
                    if (havesnap) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            rotatedpoint = snap_rotated(snapPoint);
                        } else {
                            rotatedpoint = snapPoint;
                        }

                        tool.x = rotatedpoint.x;
                        tool.y = rotatedpoint.y;
                        tool.w = rotatedpoint.x;
                        tool.h = rotatedpoint.y;

                    } else {
                        tool.x = mousePos.x;
                        tool.y = mousePos.y;
                        tool.w = mousePos.x;
                        tool.h = mousePos.y;

                    }
                    tool.orgscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getdscale();
                    tool.orgdx = Globals.DocObj.pages[Globals.DocObj.currentpage].getdx();
                    tool.orgdy = Globals.DocObj.pages[Globals.DocObj.currentpage].getdy();
                    tool.startx = tool.x;
                    tool.starty = tool.y;

                } else {
                    if (havesnap) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            rotatedpoint = snap_rotated(snapPoint);
                        } else {
                            rotatedpoint = snapPoint;
                        }

                        tool.w = rotatedpoint.x;
                        tool.h = rotatedpoint.y;

                    } else {
                        tool.w = mousePos.x;
                        tool.h = mousePos.y;

                    }
                    tool.started = false;

                    tool.dialogtext();

                    /*if (RxCore_GUI_Calibratediag != undefined) {
                     RxCore_GUI_Calibratediag.setCalibrate(tool.distance);
                     }*/

                    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                    ev.target.style.cursor = 'default';

                }
            } else {

                prevx = mousePos.x;
                prevy = mousePos.y;

            }
        }

        this.touchstart = function (ev: any) {
            if (!tool.started) {
                const touchPos = getTouchPos(Globals.canvas, ev, 0);
                tool.started = true;
                tool.x = touchPos.x;
                tool.y = touchPos.y;
                tool.w = touchPos.x;
                tool.h = touchPos.y;

                tool.orgscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getdscale();
                tool.orgdx = Globals.DocObj.pages[Globals.DocObj.currentpage].getdx();
                tool.orgdy = Globals.DocObj.pages[Globals.DocObj.currentpage].getdy();

            } else {
                //tool.started = true;
                //tool.w = ev.targetTouches[0].pageX - canvas.offsetLeft;
                //tool.h = ev.targetTouches[0].pageY - canvas.offsetTop - bannerheight;
                //tool.started = false;
            }
        }

        this.MSPointerMove = function (ev: any) {
            const mousePos = getMousePos(Globals.canvas, ev);
            ev.preventDefault();
            ev.stopPropagation();

            ev.target.style.cursor = 'crosshair';
            //ev.target.style.cursor = 'url(' + curcanv.toDataURL() + ')15 15, auto';
            const xdiff = prevx - mousePos.x;
            const ydiff = prevy - mousePos.y;

            snapPoint = Globals.DocObj.pages[Globals.DocObj.currentpage].getsnap(mousePos.x, mousePos.y);

            if (!snapPoint.found) {
                havesnap = false;
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            } else {
                havesnap = true;
                drawsnap(Globals.context, snapPoint);

            }

            //console.log(ev.buttons);
            if (ev.buttons == 2) {

                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                prevx = mousePos.x;
                prevy = mousePos.y;

            }

            if (!tool.started) {
                return;
            }

            let rotatedpoint;
            if (havesnap) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                    rotatedpoint = snap_rotated(snapPoint);
                } else {
                    rotatedpoint = snapPoint;
                }

                tool.w = rotatedpoint.x;
                tool.h = rotatedpoint.y;

            } else {
                tool.w = mousePos.x;
                tool.h = mousePos.y;

            }

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            if (ev.buttons == 2) {
                tool.x -= xdiff;
                tool.y -= ydiff;

            }

            if (tool.w - tool.x != 0) {
                tool.draw(Globals.context);
            }

        }

        this.mousemove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            //ev.target.style.cursor = 'crosshair';
            ev.target.style.cursor = 'url(' + curcanv.toDataURL() + ')15 15, auto';

            const mousePos = getMousePos(Globals.canvas, ev);

            const xdiff = prevx - mousePos.x;
            const ydiff = prevy - mousePos.y;

            snapPoint = Globals.DocObj.pages[Globals.DocObj.currentpage].getsnap(mousePos.x, mousePos.y);

            if (!snapPoint.found) {
                havesnap = false;
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            } else {
                havesnap = true;
                drawsnap(Globals.context, snapPoint);

            }
            //console.log('button',ev.button);
            //console.log('buttons',ev.buttons);
            if (ev.button == 2 || ev.buttons == 2) {

                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);

                prevx = mousePos.x;
                prevy = mousePos.y;

            }

            if (!tool.started) {
                return;
            }

            //this.x = tool.x0;
            //dimensionmarkupobj.y = tool.y0;

            let rotatedpoint;
            if (havesnap) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                    rotatedpoint = snap_rotated(snapPoint);
                } else {
                    rotatedpoint = snapPoint;
                }

                tool.w = rotatedpoint.x;
                tool.h = rotatedpoint.y;

            } else {
                tool.w = mousePos.x;
                tool.h = mousePos.y;

            }

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            if (ev.button == 2 || ev.buttons == 2) {
                tool.x -= xdiff;
                tool.y -= ydiff;

            }

            if (tool.w - tool.x != 0) {
                tool.draw(Globals.context);
            }

        }

        this.touchmove = function (ev: any) {
            ev.preventDefault();
            if (!tool.started) {
                return;
            }

            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            tool.w = touchPos.x;
            tool.h = touchPos.y;

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            if (tool.w - tool.x != 0) {
                tool.draw(Globals.context);
            }
        }

        this.MSPointerUp = function (ev: any) {
            if (tool.started) {
                /*tool.mousemove(ev);
                 //dimensionmarkupobj.savemetolist();
                 //dimensionmarkupobj = null;
                 //tool.started = false;
                 //img_update();*/

            }
        }

        this.mouseup = function (ev: any) {
            if (tool.started) {
                /*tool.mousemove(ev);
                 //dimensionmarkupobj.savemetolist();
                 //dimensionmarkupobj = null;
                 //tool.started = false;
                 //img_update();*/
            }
        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();

            if (tool.started) {
                tool.started = false;
                tool.dialogtext();
                /*if (RxCore_GUI_Calibratediag != undefined) {
                 RxCore_GUI_Calibratediag.setCalibrate(tool.distance);
                 }*/

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            }

        }

        this.touchend = function (ev: any) {
            ev.preventDefault();

            if (tool.started) {
                tool.started = false;
                tool.dialogtext();
                /*if (RxCore_GUI_Calibratediag != undefined) {
                 RxCore_GUI_Calibratediag.setCalibrate(tool.distance);
                 }*/

                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            }
        }
    }


    // The calibrate line tool.
    Globals.tools.calibrate = function () {
        const tool = this;
        let prevx = 0,
            prevy = 0;
        let Unit = "mm";
        let havesnap = false;
        let snapPoint: any;

        this.started = false;
        this.name = 'calibrate';
        this.anglelengthsupport = false;

        this.x = 0;
        this.y = 0;

        this.w = 0;
        this.h = 0;
        this.distance = 0.0;

        this.startx = 0;
        this.starty = 0;
        this.orgscale = 1.0;
        this.orgdx = 0.0;
        this.orgdy = 0.0;
        this.curmousepos = { x: 0, y: 0 };

        this.dialogfieldtext = "";

        this.scrollhandling = function (movey: any) {
            if (!Globals.documentopen || Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
                return;
            }

            if (movey < 0) {

                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs && Globals.DocObj.pages.length > 1) {

                    if (Globals.DocObj.currentpage == Globals.DocObj.NumPages - 1) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].endy <= Globals.canvas.height) {
                            movey = 0;
                        }
                    }
                    Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, -movey);

                } else {

                    Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomOut(1.1, false, false, tool.curmousepos);


                    if (tool.started) {
                        tool.setdimoffset(false);

                    }

                }

            } else {

                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs && Globals.DocObj.pages.length > 1) {

                    if (Globals.DocObj.currentpage == 0) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].starty >= 0) {
                            movey = 0;
                        }

                    }
                    Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(0, -movey);

                } else {

                    Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomIn(1.1, false, false, tool.curmousepos);

                    if (tool.started) {
                        tool.setdimoffset(false);

                    }

                }

            }

        }

        this.wheel = function (ev: any) {
            let delta = 0;
            if (ev.wheelDelta !== undefined) { // WebKit / Opera / Explorer 9
                delta = ev.wheelDelta;

            } else if (ev.deltaY !== undefined) { // Firefox
                delta = -ev.deltaY * 50;

            }

            tool.scrollhandling(delta);
        }

        this.setdimoffset = function (initial: any) {

            if (initial) {
                tool.orgscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getdscale();
                tool.orgdx = Globals.DocObj.pages[Globals.DocObj.currentpage].getdx();
                tool.orgdy = Globals.DocObj.pages[Globals.DocObj.currentpage].getdy();
                tool.startx = tool.x;
                tool.starty = tool.y;
            }

            const curscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getdscale();
            const pagedx = Globals.DocObj.pages[Globals.DocObj.currentpage].getdx();
            const pagedy = Globals.DocObj.pages[Globals.DocObj.currentpage].getdy();

            const scalediff = (curscale / tool.orgscale);

            if (tool.started) {
                let newx = (tool.startx - tool.orgdx) * scalediff;
                let newy = (tool.starty - tool.orgdy) * scalediff;
                newx += pagedx;
                newy += pagedy;

                tool.x = newx;
                tool.y = newy;

            }

        }

        this.getdiag = function (width: any, height: any) {
            const dimwsq = Math.pow(width, 2);
            const dimhsq = Math.pow(height, 2);
            const dimdiag = Math.sqrt((dimwsq + dimhsq));

            return dimdiag;
        }

        this.dialogtext = function () {
            let lcounter = 0;
            let point1 = 0;
            let point2 = 0;
            let pointstext = "";
            let angletext = "";
            let length = 0;
            let texttotable = "";
            let trueangle = 0;

            Unit = Globals.Unitlabel;

            const dimwidth = tool.w - tool.x;
            const dimheight = tool.h - tool.y;

            const dimdiag = tool.getdiag(dimwidth, dimheight);
            let tempscale: any = Globals.MeasureScale; // TODO:JS->TS:CHECK tempscale seems to be declared and asigned twice
            tempscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getMeasureScale(); // TODO:JS->TS:CHECK

            Globals.MeasureScale = 1.0;
            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                tool.distance = getUnitlength(dimdiag / Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector);
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                tool.distance = getUnitlength(dimdiag / (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf));
            } else {
                tool.distance = getUnitlength(dimdiag / Globals.DocObj.pages[Globals.DocObj.currentpage].dscale);
            }

            //tool.distance = tool.distance.toFixed(2);
            //nCalibrateMeasured = tool.distance;

            Globals.DocObj.pages[Globals.DocObj.currentpage].setMeasureScaledirect(1);

            if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                Globals.nCalibrateMeasured = getUnitlength(dimdiag / Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector);
            } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
                Globals.nCalibrateMeasured = getUnitlength(dimdiag / (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf));
            } else {
                Globals.nCalibrateMeasured = getUnitlength(dimdiag / Globals.DocObj.pages[Globals.DocObj.currentpage].dscale);
            }

            Globals.DocObj.pages[Globals.DocObj.currentpage].setMeasureScaledirect(tempscale);
            Globals.MeasureScale = tempscale;
            /*this.dialogfieldtext = "<br>" +
             "       <table>" +
             "        <tr >" +
             "	     <td nowrap>Measured line is: " + "</td>\n" +
             "        </tr>" +
             "        <tr >" +
             "	     <td nowrap>" + "<input type='text' size='10' id='Cval' value='" + tool.distance + "' onChange='SetTempCal(this.value)'> " + Unit + " long</td>\n" +
             "        </tr>" +
             "        </table>" +
             "        <br />\n" +
             "        <br />\n";*/
            //"        <button data-dojo-type='dijit/form/Button' data-dojo-props='onClick:hideCDialogOK'>OK</button>\n" +
            //"        <button data-dojo-type='dijit/form/Button' data-dojo-props='onClick:hideCDialogCancel'>Cancel</button>";

        }


        this.draw = function (ctx: any) {
            const arrowangle = 22.5;
            const arrowlength = Globals.nArrowSize;
            const arrowanglerad = arrowangle / (180 / Math.PI);
            const dimwidth = tool.w - tool.x;
            const dimheight = tool.h - tool.y;

            const dimanglerad = Math.atan2(dimheight, dimwidth);
            const arrowh = Math.abs(arrowlength / Math.cos(arrowanglerad));

            const dimangleradneg = Math.PI + dimanglerad;
            const arrowupperangle = dimangleradneg + arrowanglerad;
            const arrowlowerangle = dimangleradneg - arrowanglerad;

            const topx = this.w + Math.cos(arrowupperangle) * arrowh;
            const topy = this.h + Math.sin(arrowupperangle) * arrowh;
            const botx = this.w + Math.cos(arrowlowerangle) * arrowh;
            const boty = this.h + Math.sin(arrowlowerangle) * arrowh;

            const sarrowupperangle = dimanglerad + arrowanglerad;
            const sarrowlowerangle = dimanglerad - arrowanglerad;

            const stopx = this.x + Math.cos(sarrowupperangle) * arrowh;
            const stopy = this.y + Math.sin(sarrowupperangle) * arrowh;
            const sbotx = this.x + Math.cos(sarrowlowerangle) * arrowh;
            const sboty = this.y + Math.sin(sarrowlowerangle) * arrowh;

            //this.dimtext = getUnitlength(dimdiag);
            //this.dimtext = this.dimtext.toFixed(2);

            //this.dimtext = this.dimtext + " " + Unitlabel;


            //ctx.font = this.measuretextheight + "pt " + "Helvetica";
            //var dimt = ctx.measureText(this.dimtext);
            //var dimtextwidth = dimt.width;

            //var dimtextx = this.x + (dimwidth / 2) - (dimtextwidth / 2);
            //var dimtexty = this.y + (dimheight / 2)- (this.measuretextheight / 2);

            //ctx.fillStyle = this.color;
            //ctx.fillText(this.dimtext, dimtextx, dimtexty);

            ctx.strokeStyle = "black";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.w, this.h);
            ctx.closePath();
            ctx.stroke();

            //arrowlines

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(stopx, stopy);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(sbotx, sboty);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(this.w, this.h);
            ctx.lineTo(topx, topy);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(this.w, this.h);
            ctx.lineTo(botx, boty);
            ctx.closePath();
            ctx.stroke();
        }

        this.pointermove = function (ev: any) {
            tool.MSPointerMove(ev);
        }

        this.pointerdown = function (ev: any) {
            tool.MSPointerDown(ev);
        }

        this.pointerup = function (ev: any) {
            tool.MSPointerUp(ev);
        }

        this.MSPointerDown = function (ev: any) {
            const mousePos = getMousePos(Globals.canvas, ev);

            let rotatedpoint;
            if (ev.button == 0) {
                if (!tool.started) {
                    ev.preventDefault();
                    ev.stopPropagation();

                    ev.target.style.cursor = 'crosshair';

                    tool.started = true;
                    if (havesnap) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            rotatedpoint = snap_rotated(snapPoint);
                        } else {
                            rotatedpoint = snapPoint;
                        }

                        tool.x = rotatedpoint.x;
                        tool.y = rotatedpoint.y;
                        tool.w = rotatedpoint.x;
                        tool.h = rotatedpoint.y;

                    } else {
                        tool.x = mousePos.x;
                        tool.y = mousePos.y;
                        tool.w = mousePos.x;
                        tool.h = mousePos.y;

                    }
                    tool.setdimoffset(true);
                } else {

                    if (havesnap) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            rotatedpoint = snap_rotated(snapPoint);
                        } else {
                            rotatedpoint = snapPoint;
                        }

                        tool.w = rotatedpoint.x;
                        tool.h = rotatedpoint.y;

                    } else {
                        tool.w = mousePos.x;
                        tool.h = mousePos.y;

                    }

                    tool.started = false;

                    tool.dialogtext();
                    if (RxCore_GUI_Calibratediag != undefined) {
                        RxCore_GUI_Calibratediag.setCalibrate(tool.distance);
                    }

                    //setCContent(tool.dialogfieldtext);
                    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                    ev.target.style.cursor = 'default';

                }
            } else {
                prevx = mousePos.x;
                prevy = mousePos.y;

            }

        }

        this.mousedown = function (ev: any) {
            const mousePos = getMousePos(Globals.canvas, ev);

            let rotatedpoint;
            if (ev.button == 0) {
                if (!tool.started) {
                    ev.preventDefault();
                    ev.stopPropagation();

                    ev.target.style.cursor = 'crosshair';

                    tool.started = true;
                    if (havesnap) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            rotatedpoint = snap_rotated(snapPoint);
                        } else {
                            rotatedpoint = snapPoint;
                        }

                        tool.x = rotatedpoint.x;
                        tool.y = rotatedpoint.y;
                        tool.w = rotatedpoint.x;
                        tool.h = rotatedpoint.y;

                    } else {
                        tool.x = mousePos.x;
                        tool.y = mousePos.y;
                        tool.w = mousePos.x;
                        tool.h = mousePos.y;

                    }
                    tool.setdimoffset(true);
                } else {
                    if (havesnap) {
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                            rotatedpoint = snap_rotated(snapPoint);
                        } else {
                            rotatedpoint = snapPoint;
                        }

                        tool.w = rotatedpoint.x;
                        tool.h = rotatedpoint.y;

                    } else {
                        tool.w = mousePos.x;
                        tool.h = mousePos.y;

                    }
                    tool.started = false;

                    tool.dialogtext();
                    if (RxCore_GUI_Calibratediag != undefined) {
                        RxCore_GUI_Calibratediag.setCalibrate(tool.distance);
                    }

                    //setCContent(tool.dialogfieldtext);
                    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
                    ev.target.style.cursor = 'default';

                }
            } else {
                prevx = mousePos.x;
                prevy = mousePos.y;

            }

        }

        this.touchstart = function (ev: any) {
            //context.strokeStyle = "red";

            if (!tool.started) {
                const touchPos = getTouchPos(Globals.canvas, ev, 0);
                tool.started = true;
                tool.x = touchPos.x;
                tool.y = touchPos.y;
                tool.w = touchPos.x;
                tool.h = touchPos.y;

            } else {
                //tool.started = true;
                //tool.w = ev.targetTouches[0].pageX - canvas.offsetLeft;
                //tool.h = ev.targetTouches[0].pageY - canvas.offsetTop - bannerheight;
                //tool.started = false;
            }
        }

        this.MSPointerMove = function (ev: any) {
            const mousePos = getMousePos(Globals.canvas, ev);
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';

            tool.curmousepos = mousePos;
            const xdiff = prevx - mousePos.x;
            const ydiff = prevy - mousePos.y;

            snapPoint = Globals.DocObj.pages[Globals.DocObj.currentpage].getsnap(mousePos.x, mousePos.y);

            if (!snapPoint.found || snapPoint == undefined) {
                havesnap = false;
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            } else {
                havesnap = true;
                drawsnap(Globals.context, snapPoint);
            }

            if (ev.buttons == 2) {

                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);
                prevx = mousePos.x;
                prevy = mousePos.y;

            }

            if (!tool.started) {
                return;
            }

            let rotatedpoint;
            if (havesnap) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                    rotatedpoint = snap_rotated(snapPoint);
                } else {
                    rotatedpoint = snapPoint;
                }

                tool.w = rotatedpoint.x;
                tool.h = rotatedpoint.y;

            } else {
                tool.w = mousePos.x;
                tool.h = mousePos.y;

            }

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            if (ev.buttons == 2) {
                tool.x -= xdiff;
                tool.y -= ydiff;
            }

            if (tool.w - tool.x != 0) {
                tool.setdimoffset(false);
                tool.draw(Globals.context);
            }

        }

        this.mousemove = function (ev: any) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.style.cursor = 'crosshair';

            const mousePos = getMousePos(Globals.canvas, ev);

            tool.curmousepos = mousePos;
            const xdiff = prevx - mousePos.x;
            const ydiff = prevy - mousePos.y;

            snapPoint = Globals.DocObj.pages[Globals.DocObj.currentpage].getsnap(mousePos.x, mousePos.y);

            if (!snapPoint.found || snapPoint == undefined) {
                havesnap = false;
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            } else {
                havesnap = true;
                drawsnap(Globals.context, snapPoint);

            }

            if (ev.button == 2 || ev.buttons == 2) {

                Globals.DocObj.pages[Globals.DocObj.currentpage].pan_update(xdiff, ydiff);

                prevx = mousePos.x;
                prevy = mousePos.y;

            }

            if (!tool.started) {
                return;
            }

            //this.x = tool.x0;
            //dimensionmarkupobj.y = tool.y0;
            let rotatedpoint;
            if (havesnap) {
                if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
                    rotatedpoint = snap_rotated(snapPoint);
                } else {
                    rotatedpoint = snapPoint;
                }

                tool.w = rotatedpoint.x;
                tool.h = rotatedpoint.y;

            } else {
                tool.w = mousePos.x;
                tool.h = mousePos.y;
            }

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

            if (ev.button == 2 || ev.buttons == 2) {
                tool.x -= xdiff;
                tool.y -= ydiff;
            }

            if (tool.w - tool.x != 0) {
                tool.setdimoffset(false);
                tool.draw(Globals.context);
            }

        }

        this.touchmove = function (ev: any) {
            ev.preventDefault();
            if (!tool.started) {
                return;
            }
            //dimensionmarkupobj.x = tool.x0;
            //dimensionmarkupobj.y = tool.y0;
            const touchPos = getTouchPos(Globals.canvas, ev, 0);
            tool.w = touchPos.x;
            tool.h = touchPos.y;

            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            if (tool.w - tool.x != 0) {
                tool.draw(Globals.context);
            }

        }

        this.MSPointerUp = function (ev: any) {
            if (tool.started) {
                /*tool.mousemove(ev);
                 //dimensionmarkupobj.savemetolist();
                 //dimensionmarkupobj = null;
                 //tool.started = false;
                 //img_update();*/

            }
        }

        this.mouseup = function (ev: any) {
            if (tool.started) {
                /*tool.mousemove(ev);
                 //dimensionmarkupobj.savemetolist();
                 //dimensionmarkupobj = null;
                 //tool.started = false;
                 //img_update();*/
            }
        }

        this.touchcancel = function (ev: any) {
            ev.preventDefault();

            if (tool.started) {
                tool.started = false;
                tool.dialogtext();
                if (RxCore_GUI_Calibratediag != undefined) {
                    RxCore_GUI_Calibratediag.setCalibrate(tool.distance);
                }

                //setCContent(tool.dialogfieldtext);
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            }
        }

        this.touchend = function (ev: any) {
            ev.preventDefault();

            if (tool.started) {
                tool.started = false;
                tool.dialogtext();
                if (RxCore_GUI_Calibratediag != undefined) {
                    RxCore_GUI_Calibratediag.setCalibrate(tool.distance);
                }

                //setCContent(tool.dialogfieldtext);
                Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
            }
        }
    }
}
