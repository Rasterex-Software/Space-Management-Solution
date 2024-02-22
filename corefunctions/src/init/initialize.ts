// TODO:JS->TS:INFO continue conversion
// TODO:JS->TS:ADJUST split/refactor

import * as THREE from 'three';

import {
    Globals,
    ev_canvas,
    resizeCanvas,
    setSmoothingEnabled,
    draw_image,
    RxCore_GUI_Stamps,
    Users,
    RxCore_GUI_Ready,
    RxCore_GUI_Permissions,
    doResize,
    createLayers,
    GetLicense,
} from '../internal';

import {
    getConfiguration
} from './getConfiguration';

import {
    //////////// deps
    msieversion,
    webglAvailable,
    get_splash
} from './deps';

import { initTools } from './tools';

// Keep everything in anonymous function, called on window load.
export function initialize(layout: any, divid: any, divclass: any) {

    if (Globals.initialized) return;
    Globals.initialized = true;


    Globals.defaultLayout = layout || Globals.defaultLayout;
    msieversion();

    //if (window.addEventListener) {
    $(document).ready(function () {
        //window.addEventListener('load', function () {

        // The active tool instance.
        //var tool;
        //var tool_default = 'pan';

        function init() {

            //find container and get size.
            if (divid != undefined) {
                Globals.rxcontainer = document.getElementById(divid);
            } else {
                Globals.rxcontainer = document.getElementById('rxcontainer');
            }

            if (divclass != undefined) {
                Globals.rxcontainer.className = divclass;
            } else {
                Globals.rxcontainer.className = 'rxcontainer';
            }

            //var col1 = document.getElementById('leftcol');
            //var colwidth = col1.clientWidth;
            //szcolwidth = szcolwidth.replace("px","");
            //var szcanvwidth = Containerdiv.style.width;
            //var szcanheight = Containerdiv.style.height;
            //szcanvwidth = szcanvwidth.replace("px","");
            //szcanheight = szcanheight.replace("px","");

            //Canvaswidth = szcanvwidth;
            //Canvasheight = szcanheight;

            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i))) {
                Globals.bIsmobile = true;
                Globals.nMaximageArea = Globals.nMaximageAreaIPad;
            }

            // Find the canvas element.
            Globals.canvaso = document.createElement('canvas');
            if (divid != undefined) {
                Globals.canvaso.id = divid + "rxcanvas";
                Globals.canvaso.className = 'rxcanvas';
            } else {
                Globals.canvaso.id = "rxcanvas";
            }


            //canvaso = document.getElementById('imageView');
            if (!Globals.canvaso) {
                alert('Error: I cannot find the canvas element!');
                return;
            }
            Globals.canvaso.innerHTML = "<p>Unfortunately, your browser is currently unsupported by our web \n";
            Globals.canvaso.innerHTML += "application.  We are sorry for the inconvenience. Please use one of the\n";
            Globals.canvaso.innerHTML += "supported browsers listed below, or draw the image you want using an\n";
            Globals.canvaso.innerHTML += "offline tool.</p>\n";

            Globals.canvaso.innerHTML += "<p>Supported browsers: <a href='http://www.opera.com'>Opera</a>,\n";
            Globals.canvaso.innerHTML += "<a href='http://www.mozilla.com'>Firefox</a>,\n";
            Globals.canvaso.innerHTML += "<a href='http://www.apple.com/safari'>Safari</a>, and\n";
            Globals.canvaso.innerHTML += "<a href='https://www.google.com/chrome'>Chrome</a>.</p>";

            // canvaso.style.border = "1px solid #000";

            resizeCanvas();

            /*if (Canvaswidth == "" && Canvasheight == ""){

             }else{
             canvasowidth  = Canvaswidth;
             canvasoheight = Canvasheight-bannerheight;
             }*/

            Globals.rxcontainer.appendChild(Globals.canvaso);

            if (!Globals.canvaso.getContext) {
                alert('Error: no canvas.getContext!');
                return;
            }

            Globals.canvaso.oncontextmenu = function () {
                return false;
            };

            // Get the 2D canvas context.
            Globals.contexto = Globals.canvaso.getContext('2d');
            if (!Globals.contexto) {
                alert('Error: failed to getContext!');
                return;
            }

            setSmoothingEnabled(false);
            // contexto.imageSmoothingEnabled = false;
            // contexto.mozImageSmoothingEnabled = false;
            // //contexto.webkitImageSmoothingEnabled = false;
            // contexto.msImageSmoothingEnabled = false;


            // Add temporary draw and markup display canvas.
            const container = Globals.canvaso.parentNode;
            // Add markup display canvas.

            Globals.canvimg = document.createElement('canvas');
            if (!Globals.canvimg) {
                alert('Error: I cannot create a new canvas element!');
                return;
            }

            if (divid != undefined) {
                Globals.canvimg.id = divid + 'imageDisp';
                Globals.canvimg.className = 'imageDisp';
            } else {
                Globals.canvimg.id = 'imageDisp';
            }

            Globals.canvimg.width = Globals.canvaso.width;
            Globals.canvimg.height = Globals.canvaso.height;
            container.appendChild(Globals.canvimg);

            Globals.canvimg.oncontextmenu = function () {
                return false;
            };

            Globals.cntximg = Globals.canvimg.getContext('2d');

            //sprite = document.getElementById("sprite");

            // Add the temporary draw canvas.
            Globals.canvas = document.createElement('canvas');
            if (!Globals.canvas) {
                alert('Error: I cannot create a new canvas element!');
                return;
            }

            if (divid != undefined) {
                Globals.canvas.id = divid + 'imageTemp';
                Globals.canvas.className = 'imageTemp';
            } else {
                Globals.canvas.id = 'imageTemp';
            }

            Globals.canvas.width = Globals.canvaso.width;
            Globals.canvas.height = Globals.canvaso.height;
            container.appendChild(Globals.canvas);

            Globals.canvas.oncontextmenu = function () {
                return false;
            };

            Globals.context = Globals.canvas.getContext('2d');

            /*canvas3D = document.createElement('canvas');
             if(!canvas3D){
             alert('Error: I cannot create a new canvas element!');
             return;
             }
             canvas3D.id  = 'canv3D';
             canvas3D.width  = canvaso.width;
             canvas3D.height = canvaso.height;
             container.appendChild(canvas3D);*/


            /*if ( webglAvailable() ) {
             renderer = new THREE.WebGLRenderer({alpha:true,canvas:canvas3D});
             //alert('bruker webgl rendering');
             } else {

             renderer = new THREE.CanvasRenderer({alpha:true,canvas:canvas3D});
             //alert('bruker canvas rendering');
             }*/

            if (webglAvailable()) {
                //renderer = new THREE.WebGLRenderer({alpha:true,antialias:true,precision:"highp"});
                Globals.renderer = new THREE.WebGLRenderer({
                    alpha: true,
                    antialias: true,
                    precision: "highp",
                    preserveDrawingBuffer: true
                });

                Globals.renderer.clippingPlanes = Globals.Empty; // GUI sets it to globalPlanes
                Globals.renderer.localClippingEnabled = false;

                console.log('webgl enabled');
                if (divid != undefined) {
                    Globals.renderer.domElement.id = divid + 'canv3D';
                    Globals.renderer.domElement.className = 'canv3D';

                } else {
                    Globals.renderer.domElement.id = 'canv3D';
                }

                //alert('bruker webgl rendering');
            } else {

                Globals.renderer = new THREE.CanvasRenderer({
                    alpha: true
                });
                if (divid != undefined) {
                    Globals.renderer.domElement.id = divid + 'canv3D';
                    Globals.renderer.domElement.className = 'canv3D';
                } else {
                    Globals.renderer.domElement.id = 'canv3D';
                }

                console.log('using canvas 3D');
                //alert('bruker canvas rendering');
            }

            container.appendChild(Globals.renderer.domElement);

            Globals.renderer.domElement.oncontextmenu = function () {
                return false;
            };

            Globals.renderer.setSize(Globals.canvaso.width, Globals.canvaso.height);

            Globals.renderer.domElement.style.visibility = 'hidden';

            //magnify canvas
            Globals.magcanvas = document.createElement('canvas');
            if (!Globals.magcanvas) {
                alert('Error: I cannot create a new canvas element!');
                return;
            }

            if (divid != undefined) {
                Globals.magcanvas.id = divid + 'imagemag';
                Globals.magcanvas.className = 'imagemag';
            } else {
                Globals.magcanvas.id = 'imagemag';
            }

            //set magnifyer size
            Globals.magcanvas.width = Globals.magnifysize.width;
            Globals.magcanvas.height = Globals.magnifysize.height;

            container.appendChild(Globals.magcanvas);

            Globals.magcanvas.oncontextmenu = function () {
                return false;
            };

            Globals.magctx = Globals.magcanvas.getContext('2d');

            Globals.magctx.fillStyle = "white";
            Globals.magctx.fillRect(0, 0, Globals.magnifysize.width, Globals.magnifysize.height);

            Globals.magcanvas.style.visibility = 'hidden';

            get_splash(Globals.splashscreen, Globals.splashimage);

            function check() {
                if (Globals.imageloaded) {
                    set_image();
                } else {
                    window.setTimeout(check, 500);
                }
            }

            check();

            function set_image() {
                Globals.imagewidth = Globals.splashimage.width;
                Globals.imageheight = Globals.splashimage.height;

                Globals.imagewidth = Globals.splashimage.naturalWidth;
                Globals.imageheight = Globals.splashimage.naturalHeight;

                //calculate zoom to extent initial scaling and offset
                //zoom to fit
                const yscale = Globals.canvaso.height / Globals.imageheight;
                const xscale = Globals.canvaso.width / Globals.imagewidth;
                const dscale = Math.min(xscale, yscale);

                const dx = (Globals.canvaso.width - (Globals.imagewidth * dscale)) / 2;
                const dy = (Globals.canvaso.height - (Globals.imageheight * dscale)) / 2;

                if (!Globals.documentopen) {
                    draw_image(Globals.splashimage, dx, dy, dscale);
                }

            }

            //SetGUIConnection();

            // Attach the mousedown, mousemove and mouseup event listeners.

            Globals.canvas.addEventListener("touchstart", ev_canvas, false);
            Globals.renderer.domElement.addEventListener("touchstart", ev_canvas, false);

            Globals.canvas.addEventListener("touchmove", ev_canvas, true);
            Globals.renderer.domElement.addEventListener("touchmove", ev_canvas, true);

            Globals.canvas.addEventListener("touchend", ev_canvas, false);
            Globals.canvas.addEventListener("touchcancel", ev_canvas, false);
            Globals.renderer.domElement.addEventListener("touchend", ev_canvas, false);
            Globals.renderer.domElement.addEventListener("touchcancel", ev_canvas, false);
            Globals.canvas.addEventListener("dbltap", ev_canvas, false);
            Globals.canvas.addEventListener("dblclick", ev_canvas, false);

            window.addEventListener('keydown', ev_canvas, true);
            window.addEventListener('keyup', ev_canvas, true);
            window.addEventListener('keypress', ev_canvas, true);
            Globals.canvas.addEventListener('wheel', ev_canvas, true);
            Globals.canvas.addEventListener('mousewheel', ev_canvas, true);
            Globals.renderer.domElement.addEventListener('wheel', ev_canvas, true);
            Globals.renderer.domElement.addEventListener('mousewheel', ev_canvas, true);
            Globals.canvas.addEventListener('DOMMouseScroll', ev_canvas, true);
            Globals.renderer.domElement.addEventListener('DOMMouseScroll', ev_canvas, true);
            Globals.canvas.addEventListener("drop", ev_canvas, false);
            Globals.canvas.addEventListener("dragover", ev_canvas, false);

            if (Globals.bDisableMSIE11Eventcheck) {

                Globals.canvas.addEventListener('mousemove', ev_canvas, false);
                Globals.renderer.domElement.addEventListener('mousemove', ev_canvas, false);
                Globals.canvas.addEventListener('mousedown', ev_canvas, false);
                Globals.renderer.domElement.addEventListener('mousedown', ev_canvas, false);
                Globals.canvas.addEventListener('mouseup', ev_canvas, false);
                Globals.renderer.domElement.addEventListener('mouseup', ev_canvas, false);
                Globals.canvas.addEventListener('mouseout', ev_canvas, false);
                Globals.renderer.domElement.addEventListener('mouseout', ev_canvas, false);

            } else {
                if (window.navigator.msPointerEnabled) {
                    Globals.canvas.addEventListener('MSPointerMove', ev_canvas, false);
                    Globals.renderer.domElement.addEventListener('MSPointerMove', ev_canvas, false);
                    Globals.canvas.addEventListener('MSPointerDown', ev_canvas, false);
                    Globals.renderer.domElement.addEventListener('MSPointerDown', ev_canvas, false);
                    Globals.canvas.addEventListener('MSPointerUp', ev_canvas, false);
                    Globals.renderer.domElement.addEventListener('MSPointerUp', ev_canvas, false);

                    Globals.canvas.addEventListener('MSPointerOut', ev_canvas, false);
                    Globals.renderer.domElement.addEventListener('MSPointerOut', ev_canvas, false);

                } else {
                    Globals.canvas.addEventListener('mousemove', ev_canvas, false);
                    Globals.renderer.domElement.addEventListener('mousemove', ev_canvas, false);
                    Globals.canvas.addEventListener('mousedown', ev_canvas, false);
                    Globals.renderer.domElement.addEventListener('mousedown', ev_canvas, false);
                    Globals.canvas.addEventListener('mouseup', ev_canvas, false);
                    Globals.renderer.domElement.addEventListener('mouseup', ev_canvas, false);
                    Globals.canvas.addEventListener('mouseout', ev_canvas, false);
                    Globals.renderer.domElement.addEventListener('mouseout', ev_canvas, false);

                }
            }

            //canvas.addEventListener("touchcancel", ev_canvas, false);
            //document.body.addEventListener("touchcancel", touchUp, false);
            //draw_image();
            //createLayers();
            //GetLicense();
            if (Globals.bGetconfig) {
                Globals.szLocationSearch = location.search;
                //szLocationSearch = getLocationSearch();

                if (Globals.szLocationSearch != "") {
                    Globals.locationSearchSet = true;
                }
                getConfiguration(Globals.configurationLocation);
                //getConfigJSON(configurationLocation);
            } else {
                //set stamp defaults
                createLayers();
                Globals.Stamplist = ["Approved", "Draft", "Received", "Rejected", "Reviewed", "Revised", "Date", "User Name"];
                //var stampul = document.getElementById("stamp");
                //var stampGUIobject = new Stampmenu(stampul);
                if (RxCore_GUI_Stamps != undefined) {
                    RxCore_GUI_Stamps.setMarkupStamps(Globals.Stamplist);
                }

                /*if(stampul != undefined){
                 for(i=0;i<Stamplist.length;i++)
                 {

                 if (i==0){
                 stampGUIobject.addstamp(Stamplist[i],true);

                 }else{
                 stampGUIobject.addstamp(Stamplist[i],false);
                 }

                 }

                 }*/
                //create default user
                Globals.Userlist[0] = new Users(Globals.signature, Globals.DisplayName, Globals.markuplayer, Globals.markupcolor);
                Globals.numUsers++;
            }

            if (!Globals.bIsmobile) {
                GetLicense();
            }

            console.log('rxcorejs ' + Globals.rxcoreversion);

        } //end init

        // The general-purpose event handler. This function just determines the mouse
        // position relative to the canvas element.
        /*function ev_canvas (ev) {
         //var touch_event = document.getElementById('shape');
         if (ev.layerX || ev.layerY == 0) { // Firefox
         ev._x = ev.layerX;
         ev._y = ev.layerY;
         } else if (ev.offsetX || ev.offsetY == 0) { // Opera
         ev._x = ev.offsetX;
         ev._y = ev.offsetY;
         }

         //touch_event.value = ev.type;
         if(tool == undefined){
         return;
         }
         // Call the event handler of the tool.
         var func = tool[ev.type];
         if (func) {
         func(ev);
         }
         }*/


        // This function draws the #imageTemp canvas on top of #imageView, after which
        // #imageTemp is cleared. This function is called each time when the user
        // completes a drawing operation.
        /*function zoom_update (sx,sy,sWide,sHi) {
         var factorwh = canvasoheight / canvasowidth;


         var tempx = 0.0;
         var tempy = 0.0;
         var tempxext = 0.0;
         var tempyext = 0.0;

         var ox1 = sx / dscale;
         var oy1 = sy / dscale;
         var ox2 = (sx + sWide) / dscale;
         var oy2 = (sy + sHi) / dscale;

         var ox1ext = sx / dscaleextent;
         var oy1ext = sy / dscaleextent;
         var ox2ext = (sx + sWide) / dscaleextent;
         var oy2ext = (sy + sHi) / dscaleextent;

         imagesize = 0;
         SetImageDim(myimage);

         var yscale = canvasoheight / imageheight;
         var xscale = canvasowidth / imagewidth;

         // var yscaleext = canvasoheight / imageheight;
         //var xscaleext = canvasowidth / imagewidth;


         tempx=(sx/dscale)-(dx/dscale);
         tempy=(sy/dscale)-(dy/dscale);

         tempxext = (sx/dscaleextent)-(dxextent/dscaleextent);
         tempyext = (sy/dscaleextent)-(dyextent/dscaleextent);


         if(Math.abs(oy2 - oy1) > 0 && Math.abs(ox2 - ox1) > 0 ){
         yscale = dscale * canvasoheight / sHi;
         xscale = dscale * canvasowidth / sWide;
         }

         dscale = Math.min(yscale, xscale);

         //SetImageDim(myimagesmall);
         //yscale = canvasoheight / imageheight;
         //xscale = canvasowidth / imagewidth;


         if(Math.abs(oy2ext - oy1ext) > 0 && Math.abs(ox2ext - ox1ext) > 0 ){
         yscale = dscaleextent * canvasoheight / sHi;
         xscale = dscaleextent * canvasowidth / sWide;
         }
         dscaleextent = Math.min(yscale, xscale);


         dx=-(tempx*dscale);
         dy=-(tempy*dscale);

         dxextent=-(tempxext*dscaleextent);
         dyextent=-(tempyext*dscaleextent);

         switch(imagesize){
         case 0:
         draw_image(myimage);
         break;
         case 1:
         draw_image(myimagesmall);
         break;
         }


         //draw_image(myimage);

         drawmarkupAll(cntximg);

         context.clearRect(0, 0, canvas.width, canvas.height);
         }*/


        /*function pan_update (sx,sy) {

         switch(drotation){
         case 0:
         dx = dx - sx;
         dy = dy - sy;
         dxextent = dxextent - sx;
         dyextent = dyextent - sy;

         break;
         case 90:
         dx = dx - sy;
         dy = dy + sx;
         dxextent = dxextent - sx;
         dyextent = dyextent + sy;
         break;
         case 180:
         dx = dx + sx;
         dy = dy + sy;
         dxextent = dxextent + sx;
         dyextent = dyextent + sy;
         break;
         case 270:
         dx = dx - sy;
         dy = dy - sx;
         dxextent = dxextent - sx;
         dyextent = dyextent - sy;
         break;

         }


         switch(imagesize){
         case 0:
         draw_image(myimage);
         break;
         case 1:
         draw_image(myimagesmall);
         break;
         }

         //draw_image(myimage);

         drawmarkupAll(cntximg);

         }*/
        /*tools.hide3d = function(){
         var tool = this;
         var x=0, y=0, w=0, h=0;
         var prevx=0, prevy=0;
         //Array for MSIE10 touchpoints
         var numtouchpoints = -1;
         var touchpointarr = [];
         this.name = 'hide3d';
         this.mousedown = function (ev) {

         ev.preventDefault();
         ev.stopPropagation();

         ev.target.style.cursor = 'crosshair';

         tool.started = true;
         var mousePos = getMousePos(canvaso, ev);

         if(documentopen){
         if(DocObj.pages[DocObj.currentpage].usevector3Dxml){
         //Viewer3D.mouseX = mousePos.x;
         //Viewer3D.mouseY = mousePos.y;

         var info = Viewer3D.pick(ev.clientX, ev.clientY);
         if (info.mesh != null){
         var meshid = info.mesh.name;
         //DocObj.pages[DocObj.currentpage].select3DBlock(meshid);
         DocObj.pages[DocObj.currentpage].turn3DBlockOnOff(meshid);
         }

         }


         }


         };

         this.mouseup = function (ev) {
         ev.preventDefault();
         ev.stopPropagation();
         ev.target.style.cursor = 'default';
         if (tool.started) {
         tool.started = false;
         }
         };

         this.pointerdown = function(ev){
         tool.MSPointerDown(ev);
         };


         this.MSPointerDown = function(ev){
         ev.preventDefault();
         ev.stopPropagation();

         ev.target.style.cursor = 'crosshair';
         var mousePos = getMousePos(canvas, ev);
         tool.started = true;
         if(documentopen){
         if(DocObj.pages[DocObj.currentpage].usevector3Dxml){
         //Viewer3D.mouseX = mousePos.x;
         //Viewer3D.mouseY = mousePos.y;

         var info = Viewer3D.pick(ev.clientX, ev.clientY);
         if (info.mesh != null){
         var meshid = info.mesh.name;
         //DocObj.pages[DocObj.currentpage].select3DBlock(meshid);
         DocObj.pages[DocObj.currentpage].turn3DBlockOnOff(meshid);
         }

         }


         }


         };

         this.MSPointerUp = function(ev){
         ev.target.style.cursor = 'default';
         if (tool.started) {

         tool.started = false;


         }

         };

         this.touchstart = function (ev) {
         ev.preventDefault();
         tool.started = true;
         //getTouchPos(canvas,ev,0);
         var touchPos = {
         x: ev.targetTouches[0].pageX,
         y: ev.targetTouches[0].pageY
         };




         if(documentopen){
         if(DocObj.pages[DocObj.currentpage].usevector3Dxml){
         //Viewer3D.mouseX = mousePos.x;
         //Viewer3D.mouseY = mousePos.y;

         var info = Viewer3D.pick(touchPos.x, touchPos.y);
         if (info.mesh != null){
         var meshid = info.mesh.name;
         //DocObj.pages[DocObj.currentpage].select3DBlock(meshid);
         DocObj.pages[DocObj.currentpage].turn3DBlockOnOff(meshid);
         }

         }


         }

         };

         this.touchend = function (ev) {
         ev.preventDefault();
         if (tool.started) {

         tool.started = false;
         }
         };


         };*/

        initTools();

        function animate() {
            requestAnimationFrame(animate);

            if (Globals.bPDFtemprender && !Globals.documentcompare && !Globals.DocObj.bLargePDF) {
                if (Globals.bAnimatePDFrender) {
                    Globals.DocObj.pages[Globals.DocObj.currentpage].draw_canvas(true);
                }

                //console.log(DocObj.currentpage);
            }

            if (!Globals.bAnimateready) {
                return;
            }

            if (!Globals.documentopen || !Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml || !Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj) {
                return;
            }

            // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/

            //requestAnimationFrame( animate );
            // Render the scene.
            //var cx = camera.position.x;
            //var cy = camera.position.y;
            //var cz = camera.position.z;

            //var campos = camera.position.clone();

            //DocObj.pages[DocObj.currentpage].Vector3DPageObj.scene.children[0].position.copy(campos);
            //var camoffset = campos.multiplyScalar(4);
            //camoffset.x *= DocObj.pages[DocObj.currentpage].Vector3DPageObj.scale;
            //camoffset.y *= DocObj.pages[DocObj.currentpage].Vector3DPageObj.scale;
            //camoffset.x *= DocObj.pages[DocObj.currentpage].Vector3DPageObj.scale;

            //DocObj.pages[DocObj.currentpage].Vector3DPageObj.scene.children[0].position.add(camoffset);
            //thispage.Vector3DPageObj.scene.children[1].rotation.set(90 * Math.PI / 180,0,0);

            //DocObj.pages[DocObj.currentpage].Vector3DPageObj.scene.__lights[0].position.set(cx,cy,cz+50);
            //DocObj.pages[DocObj.currentpage].Vector3DPageObj.scene.__lights[0].position.set(cx,cy,cz);

            //DocObj.pages[DocObj.currentpage].Vector3DPageObj.scene.__lights[0].rotation.set(camera.rotation.x,camera.rotation.y,camera.rotation.z,'XYZ');
            //DocObj.pages[DocObj.currentpage].Vector3DPageObj.scene.__lights[0].rotation.set(camera.rotation.x,camera.rotation.y,camera.rotation.z,'XYZ');

            Globals.renderer.render(Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scene, Globals.DocObj.pages[Globals.DocObj.currentpage].camera);
            //DocObj.pages[DocObj.currentpage].walkthroughcontrol.update(clock.getDelta());
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.update(Globals.DocObj.pages[Globals.DocObj.currentpage].clock.getDelta());

            //mesh.rotation.x += 0.01;
            //mesh.rotation.y += 0.02;

            //renderer.render( scene, camera );
        }

        init();
        animate();

        if (RxCore_GUI_Ready != undefined) {
            RxCore_GUI_Ready.setupComplete(Globals.initialDoc);
        }

        if (RxCore_GUI_Permissions != undefined) {
            const permissions = {
                consolidate: Globals.bCanConsolidate
            };

            RxCore_GUI_Permissions.UserPermissions(permissions);
        }

    });

    window.addEventListener('resize', function () {
        /*if (RxCore_GUI_Resize != undefined) {
            var canvasSize = {
                w:canvasowidth,
                h:canvasoheight
            };
            RxCore_GUI_Resize.onResize(canvasSize);
        }*/
        doResize(true);
    }, false);
    //}
};
