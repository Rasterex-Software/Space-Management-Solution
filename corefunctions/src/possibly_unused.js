// TODO:JS->TS:CHECK  check again the functions/methods in this file. They were extracted from the RxCore object/function. These seemed unused in the original version.


function compute2DPolygonCentroid(ptsorg){
    var pts = [];
    pts = ptsorg.slice();

    var centroid = {x:0, y:0};
    var signedArea = 0.0;
    var x0 = 0.0; // Current vertex X
    var y0 = 0.0; // Current vertex Y
    var x1 = 0.0; // Next vertex X
    var y1 = 0.0; // Next vertex Y
    var a = 0.0; // Partial signed area

    for (var i=0; i<pts.length-1; ++i){
        x0 = pts[i].x;
        y0 = pts[i].y;
        x1 = pts[i+1].x;
        y1 = pts[i+1].y;
        a = x0*y1 - x1*y0;
        signedArea += a;
        centroid.x += (x0 + x1)*a;
        centroid.y += (y0 + y1)*a;

    }
    // Do last vertex
    x0 = pts[i].x;
    y0 = pts[i].y;
    x1 = pts[0].x;
    y1 = pts[0].y;
    a = x0*y1 - x1*y0;
    signedArea += a;
    centroid.x += (x0 + x1)*a;
    centroid.y += (y0 + y1)*a;

    signedArea *= 0.5;
    centroid.x /= (6.0*signedArea);
    centroid.y /= (6.0*signedArea);
    return centroid;



}

// TODO:JS->TS:CHECK the SetCalibration was not used in the original. The used .setCalibration calls were owened by other objects (PageObject, ...)
function SetCalibration(val) {
    if (val) {
        if (Globals.nCalibrateSet != 0) {
            Globals.nCalibrateScale = Globals.nCalibrateMeasured / Globals.nCalibrateSet;
            Globals.nCalibrateScale = 1 / Globals.nCalibrateScale;
            setCalibratebtn(); // TODO:JS->TS:FIX this function declaration does not exist
            //var scaledropdwn = document.getElementById('scaledropdown');
            //scaledropdwn.children[0].value = 'Calibration';
            Globals.MeasureScale = Globals.nCalibrateScale;
        }


    } else {
        Globals.nCalibrateScale = 1;
    }

}

// TODO:JS->TS:CHECK the method is declared in RxCore and in Rx_UserlistConn.
function SetUserMarkupdisplay(numuser, state) {
    var curmarkup = 0;
    Globals.Userlist[numuser].display = state;

    for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        var layerdisplay = getMarkupLayerState(Globals.DocObj.markuplist[curmarkup].layer);

        if (Globals.DocObj.markuplist[curmarkup].signature == Globals.Userlist[numuser].Signature && layerdisplay) {

            Globals.DocObj.markuplist[curmarkup].display = Globals.Userlist[numuser].display;
        }

    }
    drawmarkupAll(Globals.cntximg);
    DrawMarkupSelected(Globals.context);

}

// TODO:JS->TS:CHECK the method is declared in RxCore and in Rx_MarkupLayerConn.
function SetLayerMarkupdisplay(numlayer, state) {
    var curmarkup = 0;
    Globals.Layerlist[numlayer].display = state;

    for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {

        var signdisplay = getSignState(Globals.DocObj.markuplist[curmarkup].signature);

        if (Globals.DocObj.markuplist[curmarkup].layer == Globals.Layerlist[numlayer].Layer && signdisplay) {

            Globals.DocObj.markuplist[curmarkup].display = Globals.Layerlist[numlayer].display;
        }

    }
    drawmarkupAll(Globals.cntximg);
    DrawMarkupSelected(Globals.context);

}

// TODO:JS->TS:CHECK the method is declared in RxCore and in Rx_UserlistConn.
function setSignature(sign) {
    Globals.signature = sign;
}

// TODO:JS->TS:CHECK unused
function SetLayer(layer) {

    Globals.markuplayer = layer;
    Globals.markupcolor = Globals.Layerlist[layer].Color;
    Globals.markuplinecolor = Globals.Layerlist[layer].Color;
    Globals.markuptextcolor = Globals.Layerlist[layer].Color;
    ChangeMarkupSelected(0);
}

// TODO:JS->TS:CHECK this method is also declared in Rx_CalibrateConn
function SetTempCal(val) {
    Globals.nCalibrateSet = val;
}

// TODO:JS->TS:CHECK
function getpage(pagenum) {
    Globals.DocObj.GotoPage(pagenum);
}

// TODO:JS->TS:CHECK
function displaydebuglabel(ctx, x, y, text) {
    var labelheight = 20;
    var labelwidth = 1;

    ctx.save();
    ctx.font = "10pt Arial";

    ctx.strokeStyle = "black";
    ctx.fillStyle = "rgba(113, 114, 118, 0.8)";
    ctx.lineWidth = 1;

    var labeltypewidth = ctx.measureText(text);
    var labetypesize = labeltypewidth.width;
    labelwidth = labetypesize;


    ctx.strokeRect(x, y + 30, labelwidth, labelheight);
    ctx.fillRect(x, y + 30, labelwidth, labelheight);

    ctx.fillStyle = "white";

    ctx.fillText(text, x + 3, y + 42);

    ctx.restore(); // restore context to what it was on entry

}

// TODO:JS->TS:CHECK appears only code that has been commented out code
function drawtextmarker(marerobj,ctx,scalefactor,offsetx,offsety,mediax,mediay,mediah,ls,bs){
    var x1scaled = (marerobj.x1 - mediax) * scalefactor;
    var y1scaled = (mediah - marerobj.y1) * scalefactor;
    var x2scaled = (marerobj.x2 - mediax) * scalefactor;
    var y2scaled = (mediah - marerobj.y2) * scalefactor;

    x1scaled += offsetx;
    y1scaled += offsety;
    x2scaled += offsetx;
    y2scaled += offsety;

    var markercolor = "rgba(255, 255, 0, 0.3)";
    ctx.fillStyle = markercolor;
    ctx.strokeStyle = markercolor;
    ctx.fillRect(x1scaled, y1scaled, x2scaled - x1scaled, y2scaled - y1scaled);
}

// TODO:JS->TS:CHECK unused
function xhrProgress(evt) {
    if (evt.lengthComputable) {
        //var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        //showDownloadDialog();
        if (RxCore_GUI_Download != undefined) {
            RxCore_GUI_Download.setDownload("show");
        }

        //document.getElementById('progressbar').value = Math.round(evt.loaded * 100 / evt.total);//percentComplete;//.toString() + '%';
        //if (document.getElementById('progressbar').value == 100){
        //document.getElementById('progressbar').value = 0;
        //hideDownloadDialog();

        //}
    } else {
        //document.getElementById('progressNumber').innerHTML = 'unable to compute';
    }
}

// TODO:JS->TS:CHECK unused ( call was commented out ). Seems to have been replaced by getConfiguration(configurationLocation)
function getConfigJSON(configurationLocation){
    var XMLGetConfig = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    XMLGetConfig += "<RxViewServer>";
    XMLGetConfig += "<Command>GetConfiguration</Command>";
    XMLGetConfig += "<LicenseID>" + Globals.LicenseID + "</LicenseID>";
    if (Globals.locationSearchSet) {
        XMLGetConfig += "<CallingPageUrl>" + Globals.htmlviewerurl + Globals.szLocationSearch + "</CallingPageUrl>";
    } else {
        XMLGetConfig += "<CallingPageUrl>" + Globals.htmlviewerurl + "</CallingPageUrl>";
    }

    XMLGetConfig += "</RxViewServer>";


    var xhr = new XMLHttpRequest();

    if(Globals.bUsecustomConfig){
        try {
            xhr.open('GET', configurationLocation, false);
        } catch (e) {
            alert("Error 1 - " + e);
        }
        xhr.send();

    }else{
        try {
            xhr.open('POST', configurationLocation, false);
        } catch (e) {
            alert("Error 1 - " + e);
        }
        xhr.send(XMLGetConfig);

    }

    Globals.configJSON = Object.freeze(JSON.parse(xhr.responseText));
    //Object.freeze(configJSON);

    try {
        //var xmllayers = configxml.getElementsByTagName('layer');
        if (Globals.configJSON.layers.layer.length > 0) {
            for (var l = 0; l < Globals.configJSON.layers.layer.length; l++) {
                //get layer attributes and create layer list.
                var LayerName = Globals.configJSON.layers.layer[l].name;
                var LayerColor = Globals.configJSON.layers.layer[l].color;
                var LayerNumber = Globals.configJSON.layers.layer[l].number;
                var LayerState = Globals.configJSON.layers.layer[l].state;
                if (LayerState == 'on') {
                    var bState = true;
                } else {
                    bState = false;
                }
                Globals.Layerlist[l] = new Layers(LayerNumber, LayerColor, LayerName, bState);
            }
        }
    } catch (e) {
        //ignore and continue
        createLayers();
    }
    Globals.readonlymode = Globals.configJSON.Readonlymarkup;
}

// TODO:JS->TS:CHECK unused
function printfile(prwin) {
    prwin.print();
}

// TODO:JS->TS:CHECK unused
function checkprintload() {
    if (Globals.printWin.document.readyState == 'complete' && Globals.bPrintpageloaded) {
        var printbtn = Globals.printWin.document.getElementById('printbtn');
        printbtn.click();
    } else {
        window.setTimeout(checkprintload, 1000);
    }
}

// TODO:JS->TS:CHECK unused
function printloadcomplete(ev) {
    //ev.url
    //alert('try to print');
    Globals.bPrintpageloaded = true;
    //var printbtn = printWin.document.getElementById('printbtn');
    //printbtn.click();
    //checkprintload();
}

// TODO:JS->TS:CHECK unused
function ClosePrint() {
    Globals.printWin.close();
}

// TODO:JS->TS:CHECK unused
function GetPrintObject() {
    return Globals.DocObj;
}

// TODO:JS->TS:CHECK unused
function GetImageWidth(image) {

    var nimagewidth = image.width;
    nimagewidth = image.naturalWidth;

    return Globals.imagewidth;
}

// TODO:JS->TS:CHECK unused
function GetImageHeight(image) {

    var nimageheight = image.width;
    nimageheight = image.naturalWidth;

    return Globals.imageheight;
}

// TODO:JS->TS:CHECK unused. ( Calls appear to have been commented out )
function SetImageDim(image) {
    Globals.imagewidth = image.width;
    Globals.imageheight = image.height;

    Globals.imagewidth = image.naturalWidth;
    Globals.imageheight = image.naturalHeight;
}

// TODO:JS->TS:CHECK unused ( there is a call in get_image but get_image seems unused).
function imageloadprogress(ev) {
    if (ev.lengthComputable) {
        //var percentComplete = Math.round(evt.loaded * 100 / evt.total);


        /*document.getElementById('progressbar').value = Math.round(ev.loaded * 100 / ev.total);//percentComplete;//.toString() + '%';
         if (document.getElementById('progressbar').value == 100){
         document.getElementById('progressbar').value = 0;
         //hideUploadDialog();

         }*/
    } else {
        //document.getElementById('progressNumber').innerHTML = 'unable to compute';
    }

}

// TODO:JS->TS:CHECK unused ( there is a call in get_image but get_image seems unused).
function imageload(ev) {
    var yscale = 0.0;
    var xscale = 0.0;
    var dxlocal = 0.0;
    var dylocal = 0.0;
    var dscalelocal = 0.0;
    var imagewidth = 0;
    var imageheight = 0;

    var target = ev.target || ev.srcElement;

    //if (ev.srcElement.src.toLowerCase() == DocObj.pages[DocObj.currentpage].MainImageSRC.toLowerCase()){
    if (target.src.toLowerCase() == Globals.DocObj.pages[Globals.DocObj.currentpage].MainImageSRC.toLowerCase()) {
        //largeimageloaded = true;
        //SetImageDim(ev.srcElement); //use width and height from xml instead of calculating
        imagewidth = Globals.DocObj.pages[Globals.DocObj.currentpage].MainImageWidth;
        imageheight = Globals.DocObj.pages[Globals.DocObj.currentpage].MainImageHeight;

        //set image fixed scale for markup
        yscale = Globals.fixedScaleSize.height / Globals.DocObj.pages[Globals.DocObj.currentpage].MainImageHeight; //thispage.MainImageHeight;
        xscale = Globals.fixedScaleSize.width / Globals.DocObj.pages[Globals.DocObj.currentpage].MainImageWidth; // thispage.MainImageWidth;
        Globals.DocObj.pages[Globals.DocObj.currentpage].fixedScale = Math.min(xscale, yscale);


        yscale = Globals.canvasoheight / imageheight;
        xscale = Globals.canvasowidth / imagewidth;
        dscalelocal = Math.min(xscale, yscale);
        //DocObj.pages[DocObj.currentpage].dscale = dscalelocal;

        dxlocal = (Globals.canvasowidth - (imagewidth * dscalelocal)) / 2;
        dylocal = (Globals.canvasoheight - (imageheight * dscalelocal)) / 2;

        //DocObj.pages[DocObj.currentpage].dx = dxlocal;
        //DocObj.pages[DocObj.currentpage].dy = dylocal;

        Globals.DocObj.pages[Globals.DocObj.currentpage].setimagedimlarge(dxlocal, dylocal, dscalelocal);
        //hideDownloadDialog();
        if (RxCore_GUI_Download != undefined) {
            RxCore_GUI_Download.setDownload("hide");
        }


    }

    //if (ev.srcElement.src.toLowerCase() == DocObj.pages[DocObj.currentpage].SmallImageSRC.toLowerCase()){
    if (target.src.toLowerCase() == Globals.DocObj.pages[Globals.DocObj.currentpage].SmallImageSRC.toLowerCase()) {
        //smallimageloaded = true;
        //SetImageDim(ev.srcElement); //use width and height from xml instead of calculating
        imagewidth = Globals.DocObj.pages[Globals.DocObj.currentpage].SmallImageWidth;
        imageheight = Globals.DocObj.pages[Globals.DocObj.currentpage].SmallImageHeight;

        yscale = Globals.canvasoheight / imageheight;
        xscale = Globals.canvasowidth / imagewidth;
        dscalelocal = Math.min(xscale, yscale);

        dxlocal = (Globals.canvasowidth - (imagewidth * dscalelocal)) / 2;
        dylocal = (Globals.canvasoheight - (imageheight * dscalelocal)) / 2;


        Globals.DocObj.pages[Globals.DocObj.currentpage].setimagedimsmall(dxlocal, dylocal, dscalelocal);
        //hideDownloadDialog();
        if (RxCore_GUI_Download != undefined) {
            RxCore_GUI_Download.setDownload("hide");
        }

        //draw_image(ev.srcElement);
        //DocObj.pages[DocObj.currentpage].draw_image();

    }

    //imageloaded = true;
    //drawmarkupAll(cntximg);
}

// TODO:JS->TS:CHECK unused ( calls were commented out in the original file )
function get_image(url, image) {

    //showDownloadDialog();

    if (RxCore_GUI_Download != undefined) {
        RxCore_GUI_Download.setDownload("show");
    }

    image.addEventListener('load', imageload, false);
    image.addEventListener('progress', imageloadprogress, false);
    image.src = url;


}

// TODO:JS->TS:CHECK unused
var onRotateEvent = function(callback){
    var scope = this;

  };

// TODO:JS->TS:CHECK unused
function pencilcheck(){
    if(Globals.tool.name == 'pencil' && Globals.tool.started){
        Globals.tool.apply();
    }

}

// TODO:JS->TS:CHECK unused
function getMarkupDrawRotPoint(markuprect){
    if (!Globals.documentopen) {
        return markuprect;

    }

    var centercanvX = (Globals.canvasowidth / 2);
    var centercanvY = (Globals.canvasoheight / 2);
    var CanvRotRad =  (90 - Globals.DocObj.pages[Globals.DocObj.currentpage].drotation) * (Math.PI / 180);


    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
        var startpoint = getRotPoint(centercanvX, centercanvY, markuprect.x, markuprect.y, CanvRotRad);
        markuprect.x = startpoint.x;
        markuprect.y = startpoint.y;
        var endpoint = getRotPoint(centercanvX, centercanvY, markuprect.w, markuprect.h, CanvRotRad);
        markuprect.w = endpoint.x;
        markuprect.y = endpoint.y;

    }


    return markuprect;

}


// TODO:JS->TS:CHECK unused ( calls have been commented out in the original)
function getDocRotMousePoint(mousepoint){

        if (!Globals.documentopen) {
            return mousepoint;
        }

        var centercanvX = (Globals.canvasowidth / 2);
        var centercanvY = (Globals.canvasoheight / 2);

        var CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);

        switch(Globals.DocObj.pages[Globals.DocObj.currentpage].drotation){
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


        if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
            var rotmousepoint = getRotPoint(centercanvX, centercanvY, mousepoint.x, mousepoint.y, CanvRotRad);
            mousepoint.x = rotmousepoint.x;
            mousepoint.y = rotmousepoint.y;
        }

        return mousepoint;

}