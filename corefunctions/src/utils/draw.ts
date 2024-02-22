// TODO:JS->TS:CHECK review the methods/objects exported and decide if they should be organised some other way, in other files

import {
    Globals,
    setSmoothingEnabled,

    RxCore_GUI_printpage,
    RxCore_GUI_Resize,

    unselelectallmarkup,
    unselecteditmarkupall,
    drawmarkupAll,
    drawmarkupMagnify,
    point,
    Layers
} from '../internal';


export function set_tool(toolname:string,params:any){
    //for (var i = 0; i < params.keys(obj).length; i++);
    if (Globals.tool){
        if(Globals.tool.name == 'pencil' && Globals.tool.started){
            Globals.tool.apply();
            unselelectallmarkup();
            unselecteditmarkupall();
        }
    }
    Globals.tool = new Globals.tools[toolname](params);
}

export function draw_image(image:any, dx:any, dy:any, dscale:any) {
    /*var dxextent=0.0, dyextent=0.0;
     var imagewidth = 0, imageheight = 0;
     var dscale=1;
     var dscaleextent=1;*/
    let localdx = 0.0;
    let localdy = 0.0;
    let localdscale = 0.0;

    Globals.contexto.fillStyle = "rgb(238,243,250)";
    Globals.contexto.fillRect(0, 0, Globals.canvasowidth, Globals.canvasoheight);
    switch (Globals.imagesize) {
        case 0:
            localdx = dx;
            localdy = dy;
            localdscale = dscale;
            break;
        case 1:
            localdx = dx;
            localdy = dy;
            localdscale = dscale;
            break;
    }

    if (Globals.drotation == 0) {
        Globals.contexto.drawImage(image, localdx, localdy, Globals.imagewidth * localdscale, Globals.imageheight * localdscale);
    } else {
        Globals.contexto.save();
        const tx = (Globals.canvasowidth / 2);
        const ty = (Globals.canvasoheight / 2);
        Globals.contexto.translate(tx, ty);
        Globals.contexto.rotate(Globals.drotation * (Math.PI / 180));
        Globals.contexto.translate(-tx, -ty);
        Globals.contexto.drawImage(image, localdx, localdy, Globals.imagewidth * localdscale, Globals.imageheight * localdscale);
        Globals.contexto.restore();
    }
}


export function getBase64Image(img:any) {
    // Create an empty canvas element
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    const ctx = canvas.getContext("2d");
    if (null!==ctx){
        ctx.drawImage(img, 0, 0);
    }

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    let dataURL = canvas.toDataURL("image/png");
    dataURL = "<![CDATA[" + dataURL + "]]>";

    //return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    return dataURL;

}

export function doResize(binternal:any, offsetWidth:any=0, offsetHeight:any=0) { // JS->TS:INFO add 0 defaults to offsets, since the method is somethimes called with only one param

    // if (offsetWidth && offsetHeight) {
    // 	console.log(offsetWidth, offsetHeight);
    // 	if (offsetWidth === defaultLayout.offsetWidth && offsetHeight === defaultLayout.offsetHeight) {
    // 		console.log('here');
    // 		return;
    // 	}
    // }
    //var col1 = document.getElementById('leftcol');
    //var colwidth = col1.clientWidth;

    if (!Globals.canvaso) {
        //alert('Error: I cannot find the canvas element!');
        return;
    }

    resizeCanvas(offsetWidth, offsetHeight);

    if (Globals.documentopen && Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        Globals.renderer.setSize(Globals.canvaso.width, Globals.canvaso.height);

        if (Globals.DocObj.pages[Globals.DocObj.currentpage].camera) {
            Globals.DocObj.pages[Globals.DocObj.currentpage].camera.aspect = Globals.canvaso.width / Globals.canvaso.height;
            Globals.DocObj.pages[Globals.DocObj.currentpage].camera.updateProjectionMatrix();
        }
    }
    //calculate zoom to extent initial scaling and offset
    //zoom to fit centered
    /*var yscale = canvaso.height / imageheight;
     var xscale = canvaso.width / imagewidth;
     dscale = Math.min(xscale,yscale);

     dx = (canvaso.width - (imagewidth*dscale)) / 2;
     dy = (canvaso.height - (imageheight*dscale)) / 2;*/


    //draw_image(myimage);

    Globals.canvimg.width = Globals.canvaso.width;
    Globals.canvimg.height = Globals.canvaso.height;

    Globals.canvas.width = Globals.canvaso.width;
    Globals.canvas.height = Globals.canvaso.height;

    Globals.renderer.domElement.width = Globals.canvaso.width;
    Globals.renderer.domElement.height = Globals.canvaso.height;

    if (Globals.documentopen) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].resize();
    } else {
        Globals.imagewidth = Globals.splashimage.naturalWidth;
        Globals.imageheight = Globals.splashimage.naturalHeight;
        const yscale = Globals.canvaso.height / Globals.imageheight;
        const xscale = Globals.canvaso.width / Globals.imagewidth;
        const dscale = Math.min(xscale, yscale);
        const dx = (Globals.canvaso.width - (Globals.imagewidth * dscale)) / 2;
        const dy = (Globals.canvaso.height - (Globals.imageheight * dscale)) / 2;
        Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
        Globals.cntximg.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
        Globals.contexto.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
        //numLayers = 0;
        draw_image(Globals.splashimage, dx, dy, dscale);
    }
    if (binternal){
        if (RxCore_GUI_Resize != undefined) {
            const canvasSize = {
                w:Globals.canvaso.width,
                h:Globals.canvaso.height
            };
            RxCore_GUI_Resize.onResize(canvasSize);
        }
    }
    //if(DocObj.pages[DocObj.currentpage] != undefined){
    //DocObj.pages[DocObj.currentpage].resize();
    //}

    //drawmarkupAll(cntximg);
} // JS->TS:INFO end doResize

// TODO:JS->TS:ADJUST cleanup
export function resizeCanvas(offsetWidth?:any, offsetHeight?:any) { // JS->TS:INFO params are optional
    //console.log(rxcontainer.clientWidth);
    //console.log(rxcontainer.clientHeight);

    offsetWidth = offsetWidth || Globals.defaultLayout.offsetWidth;
    offsetHeight = offsetHeight || Globals.defaultLayout.offsetHeight;

    /* offsetParent offsets are 0 when no position:fixed menus available */
    if (Globals.rxcontainer.offsetParent){
        offsetWidth += Globals.rxcontainer.offsetParent.offsetLeft;
        offsetHeight += Globals.rxcontainer.offsetParent.offsetTop;
    }

    Globals.canvaso.width = window.innerWidth - offsetWidth;
    Globals.canvaso.height = window.innerHeight - offsetHeight;
    Globals.canvasowidth = Globals.canvaso.width;
    Globals.canvasoheight = Globals.canvaso.height;

    if (Globals.documentopen && !Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        let curwidth = Globals.canvaso.width;
        //var curheight = canvaso.height;

        let tempdx;
        let tempdy;
        if(Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml){
            tempdx = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
            tempdy = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
        }

        const scalefactor = (window.innerWidth - offsetWidth) / curwidth;
        //DocObj.pages[DocObj.currentpage].ZoomScale(scalefactor);


        /*if(curwidth < (window.innerWidth - offsetWidth)){

            scalefactor = curwidth / (window.innerWidth - offsetWidth);
            DocObj.pages[DocObj.currentpage].ZoomIn(scalefactor,false);
        }else{
            var scalefactor = (window.innerWidth - offsetWidth) / curwidth;
            DocObj.pages[DocObj.currentpage].ZoomIn(scalefactor,false);
        }*/

        if(Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml){
            //DocObj.pages[DocObj.currentpage].dxvector = tempdx;
            //DocObj.pages[DocObj.currentpage].dyvector = tempdy;
        }
    }
    /*if (rxcontainer.clientWidth && rxcontainer.clientHeight){
        canvaso.width = rxcontainer.clientWidth;
        canvaso.height = rxcontainer.clientHeight;

    }else{

    }*/
    if(Globals.documentopen && Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs){
        setSmoothingEnabled(false);
    }else{
        setSmoothingEnabled(true);
    }
} // JS->TS:INFO end resizeCanvas

export function drawpoints(ctx:any, snapPoint:any){
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
        const txcanv = (Globals.canvasowidth / 2);
        const tycanv = (Globals.canvasoheight / 2);
        ctx.translate(txcanv, tycanv);
        ctx.rotate(Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180));
        ctx.translate(-txcanv, -tycanv);
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'blue';
    //ctx.clearRect(snapPoint.x - 50,snapPoint.y - 50,100,100);
    ctx.strokeRect(snapPoint.x - 5, snapPoint.y - 5, 10, 10);
}

export function drawsnap(ctx:any, snapPoint:any){
    ctx.save();
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
        const txcanv = (Globals.canvasowidth / 2);
        const tycanv = (Globals.canvasoheight / 2);
        ctx.translate(txcanv, tycanv);
        ctx.rotate(Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180));
        ctx.translate(-txcanv, -tycanv);

    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'blue';
    ctx.clearRect(snapPoint.x - 50,snapPoint.y - 50,100,100);
    ctx.strokeRect(snapPoint.x - 5, snapPoint.y - 5, 10, 10);
    ctx.restore();
}

export function drawvectorline(lineobj:any,ctx:any, scalefactor:any, offsetx:any, offsety:any, mediax:any, mediay:any, mediah:any,ls:any,bs:any,drawprint:any){
    let x1scaled = (lineobj.x1 - mediax) * scalefactor;
    let y1scaled = (mediah - lineobj.y1) * scalefactor;
    let x2scaled = (lineobj.x2 - mediax) * scalefactor;
    let y2scaled = (mediah - lineobj.y2) * scalefactor;

    if (ls == 0 || bs == 0) {
        return;
    }
    x1scaled += offsetx;
    y1scaled += offsety;
    x2scaled += offsetx;
    y2scaled += offsety;
    if(!lineobj.parent.backgroundrender){
        if (x1scaled < 0 && x2scaled < 0) {
            return;
        }
        if (y1scaled < 0 && y2scaled < 0) {
            return;
        }
        if (x1scaled > Globals.canvasowidth && x2scaled > Globals.canvasowidth) {
            return;
        }
        if (y1scaled > Globals.canvasoheight && y2scaled > Globals.canvasoheight) {
            return;
        }
    }

    /*if (DocObj.pages[DocObj.currentpage].VectorPageObj != undefined) {
        if (!DocObj.pages[DocObj.currentpage].VectorPageObj.backgroundrender) {
            if (x1scaled < 0 && x2scaled < 0) {
                return;
            }
            if (y1scaled < 0 && y2scaled < 0) {
                return;
            }

            if (x1scaled > canvasowidth && x2scaled > canvasowidth) {
                return;
            }
            if (y1scaled > canvasoheight && y2scaled > canvasoheight) {
                return;
            }
        }

    } else {
        if (x1scaled < 0 && x2scaled < 0) {
            return;
        }
        if (y1scaled < 0 && y2scaled < 0) {
            return;
        }

        if (x1scaled > canvasowidth && x2scaled > canvasowidth) {
            return;
        }
        if (y1scaled > canvasoheight && y2scaled > canvasoheight) {
            return;
        }

    }*/

    //ctx.save();
    ctx.lineCap = 'round';
    //ctx.globalAlpha = 0.5;
    //ctx.imageSmoothingEnabled = false;
    if(!Globals.bKeepVectorColor){
        if (lineobj.strokecolor == Globals.DocObj.backgroundColor) {
            if (Globals.DocObj.backgroundColor == "#FFFFFF") {
                lineobj.strokecolor = "#000000";
            }
            if (Globals.DocObj.backgroundColor == "#000000") {
                lineobj.strokecolor = "#FFFFFF";
            }
        }
    }
    if(drawprint && lineobj.strokecolor == "#FFFFFF" ){
        lineobj.strokecolor = "#000000";
    }
    if (lineobj.drawcompare) {
        ctx.strokeStyle = lineobj.comparecolor;
    } else if (lineobj.parent.viewmode == 1) {
        ctx.strokeStyle = "black";
    }else{
        ctx.strokeStyle = lineobj.strokecolor;
    }
    if (lineobj.linewidth * scalefactor < 1) {
        ctx.lineWidth = 1;
    } else {
        ctx.lineWidth = lineobj.linewidth * scalefactor;
    }
    //ctx.lineWidth = this.linewidth * scalefactor;
    ctx.beginPath();
    ctx.moveTo(x1scaled, y1scaled);
    ctx.lineTo(x2scaled, y2scaled);
    ctx.stroke();
    lineobj.drawcompare = false;
}

export function getPageRotCorner(cornerpoint:any){
    if (!Globals.documentopen) {
        return cornerpoint;
    }

    const centercanvX = (Globals.canvasowidth / 2);
    const centercanvY = (Globals.canvasoheight / 2);

    const CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);

    if (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation != 0) {
        const rotmousepoint = getRotPoint(centercanvX, centercanvY, cornerpoint.x, cornerpoint.y, CanvRotRad);
        cornerpoint.x = rotmousepoint.x;
        cornerpoint.y = rotmousepoint.y;
    }

    return cornerpoint;
}

export function getRotPoint(width: any, height: any, x: any, y: any, anglerad: any){
    const cosangle = Math.cos(anglerad);
    const sinangle = Math.sin(anglerad);

    const hw = x - width;
    const hh = y - height;

    const newx = (hw * cosangle) - (hh * sinangle);
    const newy = (hw * sinangle) + (hh * cosangle);

    const transpoint = new point(newx, newy);
    transpoint.x = width + transpoint.x;
    transpoint.y = height + transpoint.y;
    return transpoint;
}

export function getScreenDim(length:any, munit:any=undefined){

    let pixelwidth = 0;
    let dpi = Globals.DocObj.pages[Globals.DocObj.currentpage].DPI;
    let DPmm = dpi / 25.4;
    let DPInch = dpi;

    /*if(DocObj.pages[DocObj.currentpage].usevectorxml){
        dpi = 0;
    }*/

    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
        dpi = 72;
        DPmm = dpi / 25.4;
        DPInch = dpi;
    }

    length = length * Globals.unitscale;
    //length *= DocObj.pages[DocObj.currentpage].getdscale();

    //var mscale = MeasureScale;
    let mscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getMeasureScale();
    if (mscale == undefined){
        mscale = Globals.MeasureScale;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml || Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        //length = ((value / DocObj.pages[DocObj.currentpage].OriginalScale)) * mscale;
        pixelwidth = (length / mscale) * Globals.DocObj.pages[Globals.DocObj.currentpage].OriginalScale;
    } else {
        //length = ((value / DocObj.pages[DocObj.currentpage].MainImageScaling)) * mscale;
        pixelwidth = (length / mscale) * Globals.DocObj.pages[Globals.DocObj.currentpage].MainImageScaling;
    }

    //pixelwidth = pixelwidth * DPmm;

    if (dpi != 0) {
        switch (Globals.Unitofmeasure) {
            case 1:
                //dimValue = dimValue / DPmm;
                pixelwidth = pixelwidth * DPmm;
                break;
            case 2:
                //dimValue = dimValue / DPInch;
                pixelwidth = pixelwidth * DPInch;
                break;
            case 3:
                //dimvalue= dimvalue;
                break;
        }
    } else {
        /*if (!DocObj.pages[DocObj.currentpage].usevectorxml) {
            pixelwidth = pixelwidth * DocObj.pages[DocObj.currentpage].getdscale();

        }*/
    }
    return pixelwidth;
}

export function getHatch(ctx:any, type:any, color:any) {

    //diagonal-forward = 0
    //diagonal-back = 1
    //diagonal-cross = 2
    //hatch-horizontal = 3
    //hatch-vertical = 4
    //hatch-cross = 5

    Globals.pattern.width = 16;
    Globals.pattern.height = 16;
    const pctx = Globals.pattern.getContext('2d');

    pctx.strokeStyle = color;
    pctx.lineWidth = 1;

    switch (type) {
        case 3:
            pctx.beginPath();
            pctx.moveTo(0.0, 10.0);
            pctx.lineTo(10.0, 0.0);
            pctx.moveTo(10.0, 16.0);
            pctx.lineTo(16.0, 10.0);
            pctx.moveTo(2.0, 16.0);
            pctx.lineTo(16.0, 2.0);
            pctx.moveTo(0.0, 2.0);
            pctx.lineTo(2.0, 0.0);
            pctx.stroke();
            break;
        case 2:
            pctx.beginPath();
            pctx.moveTo(0.0, 14.0);
            pctx.lineTo(2.0, 16.0);
            pctx.moveTo(0.0, 6.0);
            pctx.lineTo(10.0, 16.0);
            pctx.moveTo(2.0, 0.0);
            pctx.lineTo(16.0, 14.0);
            pctx.moveTo(10.0, 0.0);
            pctx.lineTo(16.0, 6.0);
            pctx.stroke();
            break;
        case 5:
            pctx.beginPath();
            pctx.moveTo(0.0, 10.0);
            pctx.lineTo(10.0, 0.0);
            pctx.moveTo(10.0, 16.0);
            pctx.lineTo(16.0, 10.0);
            pctx.moveTo(2.0, 16.0);
            pctx.lineTo(16.0, 2.0);
            pctx.moveTo(0.0, 2.0);
            pctx.lineTo(2.0, 0.0);

            pctx.moveTo(0.0, 14.0);
            pctx.lineTo(2.0, 16.0);
            pctx.moveTo(0.0, 6.0);
            pctx.lineTo(10.0, 16.0);
            pctx.moveTo(2.0, 0.0);
            pctx.lineTo(16.0, 14.0);
            pctx.moveTo(10.0, 0.0);
            pctx.lineTo(16.0, 6.0);
            pctx.stroke();
            break;
        case 0:
            pctx.beginPath();
            pctx.moveTo(0.0, 4.0);
            pctx.lineTo(16.0, 4.0);
            pctx.moveTo(0.0, 12.0);
            pctx.lineTo(16.0, 12.0);

            pctx.stroke();

            break;
        case 1:
            pctx.beginPath();
            pctx.moveTo(4.0, 0.0);
            pctx.lineTo(4.0, 16.0);
            pctx.moveTo(12.0, 0.0);
            pctx.lineTo(12.0, 16.0);

            pctx.stroke();
            break;
        case 4:
            pctx.beginPath();
            pctx.moveTo(0.0, 4.0);
            pctx.lineTo(16.0, 4.0);
            pctx.moveTo(0.0, 12.0);
            pctx.lineTo(16.0, 12.0);

            pctx.moveTo(4.0, 0.0);
            pctx.lineTo(4.0, 16.0);
            pctx.moveTo(12.0, 0.0);
            pctx.lineTo(12.0, 16.0);
            pctx.stroke();
            break;
    }
    const HatchPtrn = ctx.createPattern(Globals.pattern, "repeat");
    return HatchPtrn;
}


export function getUnitArea(value:any) {
    let dimValue = 0;
    let dpi = Globals.DocObj.pages[Globals.DocObj.currentpage].DPI;
    let DPmm = dpi / 25.4;
    let DPInch = dpi;

    //var mscale = MeasureScale;
    let mscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getMeasureScale();
    if (mscale ==  undefined){
        mscale = Globals.MeasureScale;
    }

    //var unit = currentglobalunit;
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
        dpi = 72;
        DPmm = dpi / 25.4;
    }

    let Dpmmsquare = DPmm * DPmm;
    let DPInchSquare = DPInch * DPInch;
    let measureScaleSquared = mscale * mscale;
    let mainimagesquare;
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        mainimagesquare = Globals.DocObj.pages[Globals.DocObj.currentpage].OriginalScale * Globals.DocObj.pages[Globals.DocObj.currentpage].OriginalScale;
    } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
        mainimagesquare = Globals.DocObj.pages[Globals.DocObj.currentpage].OriginalScale * Globals.DocObj.pages[Globals.DocObj.currentpage].OriginalScale;
    } else {
        mainimagesquare = Globals.DocObj.pages[Globals.DocObj.currentpage].MainImageScaling * Globals.DocObj.pages[Globals.DocObj.currentpage].MainImageScaling;
    }

    let dscalesquare = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;

    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        dscalesquare = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
    } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
        dscalesquare = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf) * (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
    }

    //var scalefactor = DocObj.pages[DocObj.currentpage].dscale / this.scaling;
    //var scalefactorsquare = scalefactor * scalefactor;
    let orignalscalesquare = Globals.DocObj.pages[Globals.DocObj.currentpage].OriginalScale * Globals.DocObj.pages[Globals.DocObj.currentpage].OriginalScale;

    //dimValue = ((value  / mainimagesquare) / dscalesquare)*measureScaleSquared;//*scalefactorsquare;
    //change to make value independent of current zoom factor.
    dimValue = (value / mainimagesquare) * measureScaleSquared; //*scalefactorsquare;
    dimValue = dimValue / (Globals.unitscale * Globals.unitscale);

    if (dpi != 0) {
        switch (Globals.Unitofmeasure) {
            case 1:
                dimValue = dimValue / Dpmmsquare;
                break;
            case 2:
                dimValue = dimValue / DPInchSquare;
                break;
            case 3:
                //dimValue = dimValue;
                break;
        }
    } else {
        if (!Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
            dimValue = dimValue / orignalscalesquare;
        }
    }
    return dimValue;
}

export function MousePosdrwext(mousepos:any) {
    let bIswithin = false;

    if(Globals.DocObj.pages[Globals.DocObj.currentpage].drotation == 0){
        if (mousepos.x > Globals.DocObj.pages[Globals.DocObj.currentpage].startx && mousepos.x < Globals.DocObj.pages[Globals.DocObj.currentpage].endx) {
            if (mousepos.y > Globals.DocObj.pages[Globals.DocObj.currentpage].starty && mousepos.y < Globals.DocObj.pages[Globals.DocObj.currentpage].endy) {
                bIswithin = true;
            }
        }
    }else{
        const rotrect = Globals.DocObj.pages[Globals.DocObj.currentpage].rotatedRect();
        if (mousepos.x > rotrect.x && mousepos.x < rotrect.w) {
            if (mousepos.y > rotrect.y && mousepos.y < rotrect.h) {
                bIswithin = true;
            }
        }
    }
    return bIswithin;
}

export function createLayers() {
    Globals.Layerlist[0] = new Layers(0, "#ffffff", "Layer 0", true);
    Globals.Layerlist[1] = new Layers(1, "#ff0000", "Layer 1", true);
    Globals.Layerlist[2] = new Layers(2, "#0000ff", "Layer 2", true);
    Globals.Layerlist[3] = new Layers(3, "#008000", "Layer 3", true);
    Globals.Layerlist[4] = new Layers(4, "#ffff00", "Layer 4", true);
    Globals.Layerlist[5] = new Layers(5, "#a52a2a", "Layer 5", true);
    Globals.Layerlist[6] = new Layers(6, "#ffd700", "Layer 6", true); //gold
    Globals.Layerlist[7] = new Layers(7, "#fff5ee", "Layer 7", true);
    Globals.Layerlist[8] = new Layers(8, "#fff8dc", "Layer 8", true);
    Globals.Layerlist[9] = new Layers(9, "#fffacd", "Layer 9", true);
    Globals.Layerlist[10] = new Layers(10, "#ffffe0", "Layer 10", true);
    Globals.Layerlist[11] = new Layers(11, "#98fb98", "Layer 11", true);
    Globals.Layerlist[12] = new Layers(12, "#afeeee", "Layer 12", true);
    Globals.Layerlist[13] = new Layers(13, "#e0ffff", "Layer 13", true);
    Globals.Layerlist[14] = new Layers(14, "#e6e6fa", "Layer 14", true);
    Globals.Layerlist[15] = new Layers(15, "#dda0dd", "Layer 15", true);
    Globals.Layerlist[16] = new Layers(16, "#d3d3d3", "Layer 16", true);
    Globals.Layerlist[17] = new Layers(17, "#ffc0cb", "Layer 17", true);
    Globals.Layerlist[18] = new Layers(18, "#ffe4c4", "Layer 18", true);
    Globals.Layerlist[19] = new Layers(19, "#ffe4b5", "Layer 19", true);
    Globals.Layerlist[20] = new Layers(20, "#f0e68c", "Layer 20", true);
    Globals.Layerlist[21] = new Layers(21, "#90ee90", "Layer 21", true);
    Globals.Layerlist[22] = new Layers(22, "#20b2aa", "Layer 22", true);
    Globals.Layerlist[23] = new Layers(23, "#87cefa", "Layer 23", true);
    Globals.Layerlist[24] = new Layers(24, "#6495ed", "Layer 24", true);
    Globals.Layerlist[25] = new Layers(25, "#ee82ee", "Layer 25", true);
    Globals.Layerlist[26] = new Layers(26, "#c0c0c0", "Layer 26", true);
    Globals.Layerlist[27] = new Layers(27, "#f08080", "Layer 27", true);
    Globals.Layerlist[28] = new Layers(28, "#f4a460", "Layer 28", true);
    /*


     24 background-color: #ffa500
     25 background-color: #eee8aa
     26 background-color: #7fff00
     27 background-color: #48d1cc
     28 background-color: #87ceeb
     29 background-color: #7b68ee
     30 background-color: #da70d6
     31 background-color: #808080

     33 background-color: #ff4500
     34 background-color: #ff8c00

     36 background-color: #32cd32
     37 background-color: #8fbc8f
     38 background-color: #4169e1
     39 background-color: #6a5acd
     40 background-color: #ba55d3
     41 background-color: #696969
     42 background-color: #dc143c
     43 background-color: #d2691e
     44 background-color: #ff7f50

     46 background-color: #228b22
     47 background-color: #2e8b57

     49 background-color: #8a2be2
     50 background-color: #9932cc
     51 background-color: #2f4f4f
     52 background-color: #b22222
     53 background-color: #8b4513
     54 background-color: #a0522d
     55 background-color: #808000

     57 background-color: #008b8b
     58 background-color: #0000cd
     59 background-color: #483d8b
     60 background-color: #8b008b

     62 background-color: #8b0000
     63 background-color: #800000

     65 background-color: #556b2f
     66 background-color: #006400
     67 background-color: #191970
     68 background-color: #000080
     69 background-color: #4b0082
     70 background-color: #800080

     */
    Globals.Layerlist[29] = new Layers(29, "#000000", "Layer 29", true); //black
}

export function img_update() {
    Globals.cntximg.drawImage(Globals.canvas, 0, 0);
    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
}