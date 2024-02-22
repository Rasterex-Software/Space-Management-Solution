
// TODO:JS->TS:ADJUST
// TODO:JS->TS:INFO this file contains dependenciesthat are used by the initialize method and were not used by the other objects

import {
    Globals,
    RxCore_GUI_Markup,
    RxCore_GUI_Markuplist,
    drawmarkupAll,
    DrawMarkupSelected,
    RxCore_GUI_TextInput,
    RxCore_GUI_MarkupUnselect,
    set_tool,
    Rectangle,
    MarkupObject,
    GetDisplayName,
    unselelectallmarkup,
    unselecteditmarkupall,
    RxCore_CreateTextRect,
    MousePosdrwext,
    img_update,
} from '../internal';


export function msieversion() {
    //var ua = window.navigator.userAgent;
    //var msie = ua.indexOf("MSIE ");

    if (navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
        Globals.bIsMSIE = true;
        Globals.szdispvalue = "";
        //alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
    }
    else  // If another browser, return 0
    {
        Globals.bIsMSIE = false;
        Globals.szdispvalue = "initial";
        //alert('otherbrowser');
    }
    //bIsMSIE = false;
    //szdispvalue = "initial";
    //return false;
}

export function webglAvailable() {
    try {
        const canvas = document.createElement('canvas');
        // @ts-ignore  // JS->TS:INFO
        return !!(window.WebGLRenderingContext && (
            canvas.getContext('webgl') ||
                canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
}

export function get_splash(url:any, image:any) {
    image.addEventListener('load', splashload, false);
    image.src = url;
}

export function splashload() {
    Globals.imageloaded = true;
}


export function getMousePos(canvas:any, evt:any) {
    const rect = canvas.getBoundingClientRect();
    return {
        x:evt.clientX - rect.left,
        y:evt.clientY - rect.top
    };
}

export function getTouchPos(canvas: any, evt: any, num: any) {
    const rect = canvas.getBoundingClientRect();

    let x=0;// = evt.targetTouches[num].pageX - rect.left;
    let y=0;// = evt.targetTouches[num].pageY - rect.top;

    if(evt && evt.targetTouches && evt.targetTouches[num]) {
        x = evt.targetTouches[num].pageX - rect.left;
        y = evt.targetTouches[num].pageY - rect.top;
    } else if(evt && evt.changedTouches && evt.changedTouches[num]) {
        x = evt.changedTouches[num].pageX - rect.left;
        y = evt.changedTouches[num].pageY - rect.top;
    }

    return {
        x: x,
        y: y

    };
}

export function snap_rotated(point:any){
    let centercanvX = (Globals.canvasowidth / 2);
    let centercanvY = (Globals.canvasoheight / 2);
    let CanvRotRad = 0;
    let transpoint = {found:point.found,x:point.x,y:point.y};
    let bnochange = false;

    switch(Globals.DocObj.pages[Globals.DocObj.currentpage].drotation){
        case 0:
            CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);
            bnochange = true;
            //return transpoint;
            break;
        case 90:
            CanvRotRad = (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation) * (Math.PI / 180);
            break;
        case 270:
            CanvRotRad = (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation) * (Math.PI / 180);
            break;
        case 180:
            CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);
            break;
    }

    const cosangle = Math.cos(CanvRotRad);
    const sinangle = Math.sin(CanvRotRad);

    const hw = transpoint.x - centercanvX;
    const hh = transpoint.y - centercanvY;

    const newx = (hw * cosangle) - (hh * sinangle);
    const newy = (hw * sinangle) + (hh * cosangle);

    if(bnochange){

    }else{
        transpoint.x = centercanvX + newx;
        transpoint.y = centercanvY + newy;
    }
    /*transpoint = {x:newx,y:newy};
    transpoint.x = centercanvX + transpoint.x;
    transpoint.y = centercanvY + transpoint.y;*/

    return transpoint;
}

export function textRect(x:any, y:any, w:any, h:any){

    if (w < 200) {
        w = 200;
    }

    if (h < 124) {
        h = 124;
    }

    const sizePos = {
        x : x + w,
        y : y + h
    };

    const bWithin = MousePosdrwext(sizePos);
    if (!bWithin && Globals.bLimMarkupExtent) {
        return;
    }

    RxCore_CreateTextRect(x, y, w, h,"");

    if (RxCore_GUI_TextInput != undefined) {
        const rect = Globals.canvas.getBoundingClientRect();

        x += w*0.5;
        y += h*0.5;

        x += rect.left;
        y += rect.top;

        RxCore_GUI_TextInput.operation.start = true;
        RxCore_GUI_TextInput.operation.create = false;
        RxCore_GUI_TextInput.operation.edit = false;
        RxCore_GUI_TextInput.operation.save = false;

        const txtrect:any = new Rectangle(x,y,w,h);
        //txtrect.rotation = 0;
        txtrect.rotation = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation; // JS->TS:INFO propert rotation does not exist on Rectangle
        RxCore_GUI_TextInput.setTextInput(txtrect);

    }


    //RxCore_TextRect(false);
    set_tool('markupedit', {});

    /*if (RxCore_GUI_TextInput != undefined) {
        RxCore_GUI_TextInput.operation.start = false;
        RxCore_GUI_TextInput.operation.create = false;
        RxCore_GUI_TextInput.operation.edit = true;
        RxCore_GUI_TextInput.operation.save = false;
    }*/

}

export function stampRect(x:any, y:any, w:any, h:any, Text:any) {

    if (w < 200) {
        w = 200;
    }

    if (h < 124) {
        h = 124;
    }

    const sizePos = {
        x : x + w,
        y : y + h
    };

    const bWithin = MousePosdrwext(sizePos);
    if (!bWithin && Globals.bLimMarkupExtent) {
      return;
    }



    let stamptype = 0;
    for (let i = 0; i < Globals.Stamplist.length; i++) {
        if (Globals.Stamplist[i] == Text) {
            stamptype = i;
        }
    }
    let stampmarkupobj;
    stampmarkupobj = new MarkupObject(12, stamptype, 1);
    stampmarkupobj.fillcolor = "rgba(255,0,0,0.3)";
    stampmarkupobj.transparency = 30;

    if (stamptype < Globals.Stamplist.length - 2) {

        stampmarkupobj.text = Globals.Stamplist[stamptype];

    }else{
        if (Globals.Stamplist[stamptype] == 'Date') {
            stampmarkupobj.text = stampmarkupobj.GetDateTime(false);
            //ntexwtsize = 90;
        }

        if (Globals.Stamplist[stamptype] == 'User Name') {
            stampmarkupobj.text = GetDisplayName(stampmarkupobj.signature);
        }

    }

    stampmarkupobj.w = w;
    stampmarkupobj.h = h;
    let endx = 0;
    let startx = 0;
    let endy = 0;
    let starty = 0;

    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        stampmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
        stampmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
        stampmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
        endx = Globals.DocObj.pages[Globals.DocObj.currentpage].endx;
        startx = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
        endy = Globals.DocObj.pages[Globals.DocObj.currentpage].endy;
        starty = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
    } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
        stampmarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
        stampmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
        stampmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;
        endx = Globals.DocObj.pages[Globals.DocObj.currentpage].endx;
        startx = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
        endy = Globals.DocObj.pages[Globals.DocObj.currentpage].endy;
        starty = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;

    } else {
        stampmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
        stampmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
        stampmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;
        endx = Globals.DocObj.pages[Globals.DocObj.currentpage].endx;
        startx = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
        endy = Globals.DocObj.pages[Globals.DocObj.currentpage].endy;
        starty = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;
    }

    stampmarkupobj.font.setFontname("Times New Roman");
    stampmarkupobj.font.setBold(true);

    stampmarkupobj.pagenumber = Globals.DocObj.getcurPage();
    stampmarkupobj.editaction = 0;


    if ((stampmarkupobj.w*0.6) >= stampmarkupobj.h){
        //stampmarkupobj.textheight = (stampmarkupobj.h / 4);
        stampmarkupobj.font.setHeight(stampmarkupobj.h / 4);
    }else{
        //stampmarkupobj.textheight = stampmarkupobj.w * 0.16;
        stampmarkupobj.font.setHeight(stampmarkupobj.w * 0.16);
    }

    //stampmarkupobj.textheight = h / 4;
    stampmarkupobj.stampsmalltheight = 16;

    stampmarkupobj.x = x;
    stampmarkupobj.y = y;

    if (!Globals.bMultimarkupadd) {

        Globals.bMarkupcrated = true;
        //ft 08.08.2018 changed from separate index to direct array length
        //nMarkupcreated = DocObj.nummarkups;
        Globals.nMarkupcreated = Globals.DocObj.markuplist.length;

    }

    stampmarkupobj.drawme(Globals.context);
    stampmarkupobj.savemetolistDraw();

    img_update();
    if(Globals.DocObj){
        Globals.DocObj.bMarkupchanged = true;
    }

    stampmarkupobj = null;
    if (!Globals.bMultimarkupadd) {

        //need to move to connection object.
        //markupcreated();
        if (RxCore_GUI_Markup != undefined) {
            RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[Globals.nMarkupcreated], {created : true, modified : false, deleted : false});
        }
    }
}

export function findmarkupHover(x:any, y:any) {
    let curmarkup = 0;
    let found = false;
    let id = -1;
    for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        if (Globals.DocObj.markuplist[curmarkup] != null) {
            if (Globals.DocObj.markuplist[curmarkup].iswithin(x, y) && Globals.DocObj.markuplist[curmarkup].display && Globals.DocObj.markuplist[curmarkup].pagenumber == Globals.DocObj.getcurPage()) {
                found = true;
                id = Globals.DocObj.markuplist[curmarkup].markupnumber;
            }
        }
    }

    return id;
}

export function findmarkup(x:any, y:any) {
    let curmarkup = 0;
    let found = false;
    let id = -1;
    let blink = false;
    let index = -1;
    let markupnull = {};

    if(!Globals.bMultiselect){
        unselelectallmarkup();
    }

    //for (curmarkup=0;curmarkup<DocObj.markuplist.length;curmarkup--){
    for (curmarkup = Globals.DocObj.markuplist.length; curmarkup > 0; curmarkup--) {
        if (Globals.DocObj.markuplist[curmarkup - 1] != null && !Globals.DocObj.markuplist[curmarkup - 1].locked) {
            if (Globals.DocObj.markuplist[curmarkup - 1].iswithin(x, y) && Globals.DocObj.markuplist[curmarkup - 1].display && Globals.DocObj.markuplist[curmarkup - 1].pagenumber == Globals.DocObj.getcurPage()) {

                if(Globals.DocObj.markuplist[curmarkup - 1].bhaveLink){
                    found = false;
                    blink = true;
                    id = Globals.DocObj.markuplist[curmarkup - 1].markupnumber;
                    index = curmarkup - 1;
                    break;
                }
                if(Globals.DocObj.markuplist[curmarkup - 1].signature == Globals.signature){
                    if (Globals.DocObj.markuplist[curmarkup - 1].selectedit) {
                        Globals.DocObj.markuplist[curmarkup - 1].selected = false;
                        found = true;
                        id = Globals.DocObj.markuplist[curmarkup - 1].markupnumber;

                        //DocObj.markuplist[curmarkup].lastselected = false;
                    } else {
                        switch (Globals.DocObj.markuplist[curmarkup - 1].type) {
                            case 1:
                                //editpolygon
                                Globals.DocObj.markuplist[curmarkup - 1].selectedit = true;
                                Globals.DocObj.markuplist[curmarkup - 1].selected = false;
                                Globals.DocObj.markuplist[curmarkup - 1].lastselected = true;
                                found = true;
                                id = Globals.DocObj.markuplist[curmarkup - 1].markupnumber;
                                index = curmarkup - 1;

                                break;
                            case 8:
                                //edit area
                                Globals.DocObj.markuplist[curmarkup - 1].selectedit = true;
                                Globals.DocObj.markuplist[curmarkup - 1].selected = false;
                                Globals.DocObj.markuplist[curmarkup - 1].lastselected = true;
                                found = true;
                                id = Globals.DocObj.markuplist[curmarkup - 1].markupnumber;
                                index = curmarkup - 1;

                                break;
                            default:
                                Globals.DocObj.markuplist[curmarkup - 1].selected = true;
                                Globals.DocObj.markuplist[curmarkup - 1].lastselected = true;
                                found = true;
                                id = Globals.DocObj.markuplist[curmarkup - 1].markupnumber;
                                index = curmarkup - 1;
                                //add markup angle lenght callback;
                                Globals.DocObj.markuplist[curmarkup - 1].lengthangleCallbackSelect();

                                break;

                        } //end switch


                        //id = DocObj.markuplist[curmarkup-1].markupnumber;

                        break;


                    }
                }



                /*found = true;
                 id = DocObj.markuplist[curmarkup].markupnumber;
                 break;*/
            }

        }
    }


    unselecteditmarkup(id);


    if (!found) {
        if (RxCore_GUI_Markup != undefined) {
            RxCore_GUI_Markup.setMarkupSelected(id, {created : false, modified : false, deleted : false});
        }

        for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
            if (Globals.DocObj.markuplist[curmarkup] != null) {
                Globals.DocObj.markuplist[curmarkup].selected = false;
                Globals.DocObj.markuplist[curmarkup].selectedit = false;
            }

        }

    } else {
        if (RxCore_GUI_Markup != undefined) {
            RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[index], {created : false, modified : true, deleted : false});
        }

    }

    if (RxCore_GUI_Markuplist != undefined) {
        RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist);
        /* Andriy Notify */
        // RxCore_GUI_Markuplist.notify();

    }


    return {
        id : id,
        blink : blink,
        index : index
    };
}

export function unselecteditmarkup(id:any) {
    for (let curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        if (Globals.DocObj.markuplist[curmarkup] != null && Globals.DocObj.markuplist[curmarkup].markupnumber != id) {
            //DocObj.markuplist[curmarkup].selected = false;
            if(Globals.DocObj.markuplist[curmarkup].selectedit){
                Globals.DocObj.markuplist[curmarkup].selectedit = false;
                if(RxCore_GUI_MarkupUnselect != undefined){
                    RxCore_GUI_MarkupUnselect.setMarkupunSelected(Globals.DocObj.markuplist[curmarkup]);
                }
            }
        }
    }
    drawmarkupAll(Globals.cntximg);
    DrawMarkupSelected(Globals.context);
}

export function finddoublemarkup(x:any, y:any) {
    let curmarkup = 0;
    let found = false;
    let id = -1;

    //for (curmarkup = 0; curmarkup < DocObj.markuplist.length; curmarkup++) {
    for (curmarkup = Globals.DocObj.markuplist.length; curmarkup > 0; curmarkup--) {
        if (Globals.DocObj.markuplist[curmarkup-1] != null) {
            if (Globals.DocObj.markuplist[curmarkup - 1].iswithin(x, y) && Globals.DocObj.markuplist[curmarkup - 1].signature == Globals.signature && Globals.DocObj.markuplist[curmarkup - 1].display) {
                switch (Globals.DocObj.markuplist[curmarkup - 1].type) {
                    /*case 1:
                     //editpolygon
                     DocObj.markuplist[curmarkup - 1].selectedit = true;
                     DocObj.markuplist[curmarkup - 1].selected = false;
                     found = true;
                     id = DocObj.markuplist[curmarkup - 1].markupnumber;
                     break;
                     case 8:
                     //edit area
                     DocObj.markuplist[curmarkup - 1].selectedit = true;
                     DocObj.markuplist[curmarkup - 1].selected = false;
                     found = true;
                     id = DocObj.markuplist[curmarkup - 1].markupnumber;

                     break;*/
                    case 9:
                        unselelectallmarkup();
                        unselecteditmarkupall();
                        //edit text
                        Globals.DocObj.markuplist[curmarkup - 1].selectedit = true;
                        Globals.DocObj.markuplist[curmarkup - 1].selected = false;
                        found = true;
                        id = Globals.DocObj.markuplist[curmarkup - 1].markupnumber;

                        break;
                    case 10:
                        //unselelectallmarkup();
                        //unselecteditmarkupall();
                        //DocObj.markuplist[curmarkup - 1].selectedit = true;
                        //DocObj.markuplist[curmarkup - 1].selected = false;
                        //found = true;
                        //id = DocObj.markuplist[curmarkup - 1].markupnumber;

                        break;
                    default:
                        //DocObj.markuplist[curmarkup - 1].selected = true;
                        //found = true;
                        //id = DocObj.markuplist[curmarkup - 1].markupnumber;

                        break;

                } //end switch

            } //end if
        } //end if
        if(found){
          break;
        }
    } //end for
    if (!found) {
        /*for (curmarkup = 0; curmarkup < DocObj.markuplist.length; curmarkup++) {
            if (DocObj.markuplist[curmarkup] != null) {
                DocObj.markuplist[curmarkup].selected = false;
                DocObj.markuplist[curmarkup].selectedit = false;
            }

        }*/
    }
    return id;
}

