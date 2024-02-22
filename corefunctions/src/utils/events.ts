
import {
    Globals,
    getAngleWithXAxis,
    RxCore_GUI_3DWalkthrough,
    RxCore_GUI_Upload,
    Rxcore_GUI_exportComplete,
    getURLPath,
} from '../internal';

export function ev_canvas(ev:any) {
    //var touch_event = document.getElementById('shape');
    if (ev.layerX || ev.layerY == 0) { // Firefox
        ev._x = ev.layerX;
        ev._y = ev.layerY;
    } else if (ev.offsetX || ev.offsetY == 0) { // Opera
        ev._x = ev.offsetX;
        ev._y = ev.offsetY;
    }

    //touch_event.value = ev.type;
    if (Globals.tool == undefined) {
        return;
    }

    // Call the event handler of the tool.
    const func = Globals.tool[ev.type];
    if (func) {
        func(ev);
    }
}

export function touchEvents(ev:any) {
    ev.preventDefault();
    let posX = 0;
    let posY = 0;
    let moveint = 0;
    let _wheelImg:any = undefined;
    let elemRect = _wheelImg.getBoundingClientRect();
    let _wheelImgX = elemRect.left + 100;
    let _wheelImgY = elemRect.top + 100;

    if (RxCore_GUI_3DWalkthrough != undefined) {
        _wheelImg = RxCore_GUI_3DWalkthrough._wheelImg;
        if (_wheelImg != undefined) {
            if (_wheelImg.x == undefined) {
                elemRect = _wheelImg.getBoundingClientRect();
                _wheelImgX = elemRect.left + 100;
                _wheelImgY = elemRect.top + 100;
            } else {
                _wheelImgX = _wheelImg.x + 100;
                _wheelImgY = _wheelImg.y + 100;
            }
        }
    } else {
        _wheelImgX = 0;
        _wheelImgY = 0;
    }
    switch (ev.type) {
        case 'mousedown':
            ev.preventDefault();
            posX = ev.pageX;
            posY = ev.pageY;
            moveint = 1;
            getAngleWithXAxis(100, posX - _wheelImgX, -posY + _wheelImgY, moveint);
            break;
        case 'MSPointerDown':
            ev.preventDefault();
            posX = ev.pageX;
            posY = ev.pageY;
            moveint = 1;
            getAngleWithXAxis(100, posX - _wheelImgX, -posY + _wheelImgY, moveint);

            break;
        case 'pointerdown':
            ev.preventDefault();
            posX = ev.pageX;
            posY = ev.pageY;
            moveint = 1;
            getAngleWithXAxis(100, posX - _wheelImgX, -posY + _wheelImgY, moveint);
            break;
        case 'mousemove':
            break;
        case 'touchstart':
            ev.preventDefault();
            posX = ev.targetTouches[0].pageX;
            posY = ev.targetTouches[0].pageY;
            moveint = 1;
            getAngleWithXAxis(100, posX - _wheelImgX, -posY + _wheelImgY, moveint);
            break;
        case 'touchmove':
            break;
        case 'mouseup':
            posX = ev.pageX;
            posY = ev.pageY;
            moveint = 0;
            getAngleWithXAxis(100, posX - _wheelImgX, -posY + _wheelImgY, moveint);
            break;
        case 'MSPointerUp':
            posX = ev.pageX;
            posY = ev.pageY;
            moveint = 0;
            getAngleWithXAxis(100, posX - _wheelImgX, -posY + _wheelImgY, moveint);
            break;
        case 'pointerup':
            posX = ev.pageX;
            posY = ev.pageY;
            moveint = 0;
            getAngleWithXAxis(100, posX - _wheelImgX, -posY + _wheelImgY, moveint);
            break;
        case 'mouseout':
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveForward = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveBackward = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveLeft = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveRight = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveUp = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveDown = false;
            moveint = 0;
            break;
        case 'MSPointerOut':
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveForward = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveBackward = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveLeft = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveRight = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveUp = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveDown = false;
            moveint = 0;
            break;
        case 'pointerout':
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveForward = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveBackward = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveLeft = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveRight = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveUp = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveDown = false;

            moveint = 0;
            break;
        case 'touchcancel':
            ev.preventDefault();
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveForward = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveBackward = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveLeft = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveRight = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveUp = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveDown = false;
            moveint = 0;
            break;
        case 'touchend':
            //alert('touchend');
            ev.preventDefault();
            //posX = ev.targetTouches[0].pageX;
            //posY = ev.targetTouches[0].pageY;
            //posX = ev.changedTouches[0].pageX;
            //posY = ev.changedTouches[0].pageY;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveForward = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveBackward = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveLeft = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveRight = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveUp = false;
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveDown = false;
            moveint = 0;
            //getAngleWithXAxis(100, posX - _wheelImgX, - posY + _wheelImgY, moveint);
            break;
    }
    //DocObj.pages[DocObj.currentpage].walkthroughcontrol.updateMovementVector();
    //DocObj.pages[DocObj.currentpage].walkthroughcontrol.updateRotationVector();
}

export function regEvents(element:any) {
    element.addEventListener('touchstart', touchEvents);
    element.addEventListener('touchmove', touchEvents);
    element.addEventListener('touchcancel', touchEvents);
    element.addEventListener('touchend', touchEvents);

    if(Globals.bDisableMSIE11Eventcheck){
        element.addEventListener('mousemove', touchEvents);
        element.addEventListener('mousedown', touchEvents);
        element.addEventListener('mouseup', touchEvents);
        element.addEventListener('mouseout', touchEvents);
    }else{
        if (window.navigator.msPointerEnabled) {
            element.addEventListener('MSPointerMove', touchEvents);
            element.addEventListener('MSPointerDown', touchEvents);
            element.addEventListener('MSPointerUp', touchEvents);
            element.addEventListener('MSPointerOut', touchEvents);
        }else{
            element.addEventListener('mousemove', touchEvents);
            element.addEventListener('mousedown', touchEvents);
            element.addEventListener('mouseup', touchEvents);
            element.addEventListener('mouseout', touchEvents);
        }
    }
}

// TODO:JS->TS:CHECK   check 'this' ( use bind )
export function ImageUploadProgress(ev:any) {
    if (ev.lengthComputable) {
        //var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        //showUploadDialog();
        if (RxCore_GUI_Upload != undefined) {
            RxCore_GUI_Upload.setUpload(Math.round(ev.loaded * 100 / ev.total));
        }

        /*document.getElementById('progressbar').value = Math.round(ev.loaded * 100 / ev.total); //percentComplete;//.toString() + '%';
        if (document.getElementById('progressbar').value == 100) {
            document.getElementById('progressbar').value = 0;
            //hideUploadDialog();

        }*/
    } else {
        //document.getElementById('progressNumber').innerHTML = 'unable to compute';
    }
}

// TODO:JS->TS:CHECK   check 'this' ( use bind )
export function ImageUploadComplete(ev:any) {
    //hideUploadDialog();
    if (RxCore_GUI_Upload != undefined) {
        RxCore_GUI_Upload.setUpload("hide");
    }

    if (ev.currentTarget.status == 200) {
        let xmlDoc:any = ev.currentTarget.responseXML; // TODO:JS->TS:INFO used any because the assignment with .documentElement changes its type
        if (xmlDoc == null || xmlDoc.documentElement == null) {
            xmlDoc = $.parseXML(ev.currentTarget.responseText).documentElement;
        }
        let PDFFileUrl = xmlDoc.getElementsByTagName('File')[0].firstChild.nodeValue;
        let cachfolder = getURLPath(Globals.DocObj.FileNameSRC);
        PDFFileUrl = cachfolder + PDFFileUrl;

        if (Rxcore_GUI_exportComplete != undefined){
            Rxcore_GUI_exportComplete.loadComplete(PDFFileUrl);
        }
        //get pdf url here.
    } else if (ev.currentTarget.status == 404) { // TODO:JS->TS:INFO replaced this with ev.currentTarget
        alert("XML could not be found");
    } else if (ev.currentTarget.status == 503) { // TODO:JS->TS:INFO replaced this with ev.currentTarget
        alert("Server is down");
    }
}

// TODO:JS->TS:CHECK the function is empty
export function PDFuploadProgress(ev:any) {

}