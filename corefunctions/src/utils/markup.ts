// TODO:JS->TS:CHECK review the methods/objects exported and decide if they should be organised some other way, in other files

import {
    Globals,
    GetDisplayName,

    RxCore_GUI_MarkupUnselect,
    RxCore_GUI_MarkupSave,
    RxCore_GUI_Markuplist,
    Rxcore_GUI_markupLoadComplete,
    RxCore_GUI_Users,
    Rxcore_GUI_fileLoadComplete,
    RxCore_GUI_printpage,
    RxCore_GUI_Markup,
    RxCore_GUI_pagethumbs,
    RxCore_GUI_Download,
    RxCore_GUI_CustomStamps,
    getBase64Image,

    parseXML, // TODO:JS->TS:CHECK
    getPath,
    getFileName,
    getFile,

    Users,

    MarkupObject,
    MarkupUndoObject,
    convertHex,
    setTransp
} from '../internal';

export function unselelectallmarkup() {
    for (let curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        if (Globals.DocObj.markuplist[curmarkup] != null) {
            if(Globals.DocObj.markuplist[curmarkup].selected){
                Globals.DocObj.markuplist[curmarkup].selected = false;
                if(RxCore_GUI_MarkupUnselect != undefined){
                    RxCore_GUI_MarkupUnselect.setMarkupunSelected(Globals.DocObj.markuplist[curmarkup]);
                }
            }
            //DocObj.markuplist[curmarkup].selectedit = false;
        }
    }
    drawmarkupAll(Globals.cntximg);
    DrawMarkupSelected(Globals.context);
}

export function unselecteditmarkupall() {

    for (let curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        if (Globals.DocObj.markuplist[curmarkup] != null) {
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

export function sendMarkup(xmlurlsave:any, signature:any, dispname:any) {
    const xhr = new XMLHttpRequest();

    /*if(DocObj.pages[DocObj.currentpage].usepdfjs){
     internalscale = DocObj.pages[DocObj.currentpage].curpagescale*DocObj.pages[DocObj.currentpage].dscalepdf;
     }*/

    let markupxml = createxmlmarkup(true, false,false,signature, dispname);
    let path = getPath(Globals.DocObj.OriginalURL);
    let markupsendurl;
    if (Globals.bMarkupPostOnly){
        markupsendurl = xmlurlsave;// + "&" + path + "&" + signature;
    }else{
        markupsendurl = xmlurlsave + "&" + path + "&" + signature;
    }

    try {
        xhr.open('POST', markupsendurl, true);
    } catch (e) {
        alert("Error 1 - " + e);
    }
    try {
        xhr.responseType = '';
    } catch (e) {
        //alert("Error 2 - " + e);
    }

    xhr.onload = (e:any) => {
        if (xhr.status == 200) {
            if (Globals.bRefreshmarkup) {
                Globals.DocObj.markuplist = [];
                Globals.numUsers = 0;
                Globals.Userlist = [];
                Globals.Userlist[0] = new Users(signature, Globals.DisplayName, Globals.markuplayer, Globals.markupcolor);
                Globals.numUsers++;
                Globals.DocObj.nummarkups = 0;
                getMarkupFilelist('');
            }
            if(Globals.DocObj){
                Globals.DocObj.bMarkupchanged = false;
            }
            if (RxCore_GUI_MarkupSave != undefined){
                RxCore_GUI_MarkupSave.markupSaved();
            }
            //alert("Markup Saved!");
        } else if (xhr.status == 404) {
            alert("server could not be found");
        } else if (xhr.status == 503) {
            alert("Server is down");
        }
    };
    xhr.send(markupxml);
} // end sendmarkup

// TODO:JS->TS:CHECK TODO:JS->TS:ADJUST
export function createxmlmarkup(markupsave:any, consolidate:any, includeall:any, signature:any, dispname:any){
    let curmarkup = 0;
    let savetime = new Date().getTime();
    let internalscale = 1;
    let fixedscale = 1;
    let imagescale = 1;

    let markupxmltxt = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";

    markupxmltxt += "<RasterexMarkup>\n";
    markupxmltxt += "<Header>\n";
    markupxmltxt += "<FileVersion>C365</FileVersion>\n";
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
        markupxmltxt += "<Format>pdfjs</Format>\n";
    } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        markupxmltxt += "<Format>vector</Format>\n";
    } else {
        markupxmltxt += "<Format>image</Format>\n";
    }
    markupxmltxt += "<Scale>1.0000</Scale>\n";
    markupxmltxt += "<OrigoX>0.0000</OrigoX>\n";
    markupxmltxt += "<OrigoY>0.0000</OrigoY>\n";
    markupxmltxt += "<DirectionY>1</DirectionY>\n";
    markupxmltxt += "<DirectionX>1</DirectionX>\n";
    markupxmltxt += "</Header>\n";
    markupxmltxt += "<Users>\n";
    markupxmltxt += "<User>\n";
    markupxmltxt += "<ID>" + signature + "</ID>\n";
    markupxmltxt += "<Name>" + dispname + "</Name>\n";
    markupxmltxt += "<Color>" + Globals.markupcolor + "</Color>\n";
    markupxmltxt += "<Layer>" + Globals.markuplayer + "</Layer>\n";
    markupxmltxt += "</User>\n";
    markupxmltxt += "</Users>\n";
    markupxmltxt += "<Entities/></RasterexMarkup>\n";
    //jquery function
    //var markupxml = $.parseXML(markupxmltxt);
    let markupxml = parseXML(markupxmltxt);

    //var found = false;
    let id = -1;


    if (Globals.DocObj.markuplist.length > 0) {
        for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
            if (Globals.DocObj.markuplist[curmarkup] != null) {
                if ((Globals.DocObj.markuplist[curmarkup].signature == signature || includeall) && (Globals.DocObj.markuplist[curmarkup].display || markupsave) && (Globals.DocObj.markuplist[curmarkup].consolidated || !consolidate) ) {
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                        internalscale = Globals.DocObj.markuplist[curmarkup].scaling;
                    }else{
                        imagescale = Globals.DocObj.markuplist[curmarkup].scaling;
                    }
                    fixedscale = Globals.DocObj.pages[Globals.DocObj.currentpage].fixedScale;
                    //var fixedscalefactor = DocObj.pages[DocObj.currentpage].fixedscaleFactor;
                    const pagenumber = Globals.DocObj.markuplist[curmarkup].pagenumber;
                    const entityNode = markupxml.createElement("Entity");
                    entityNode.setAttribute("ID", Globals.DocObj.markuplist[curmarkup].markupID);
                    if(Globals.DocObj.markuplist[curmarkup].type == 11){

                        const imagenode = createAppendElementret(entityNode, "Image", getBase64Image(Globals.DocObj.markuplist[curmarkup].image));
                        //type="png" encoding="base64"
                        imagenode.setAttribute("type", "png");
                        imagenode.setAttribute("encoding", "base64");

                        /*if(DocObj.markuplist[curmarkup].subtype == 1){
                         entityNode.setAttribute("abspath", 1);
                         }else{
                         entityNode.setAttribute("abspath", 0);
                         }*/
                    }

                    createAndAppendElement(entityNode, "UniqueID", Globals.DocObj.markuplist[curmarkup].uniqueID);
                    if(Globals.DocObj.markuplist[curmarkup].type == 11 && Globals.DocObj.markuplist[curmarkup].imagehref != ""){
                        createAndAppendElement(entityNode, "Imagehref", Globals.DocObj.markuplist[curmarkup].imagehref);
                    }
                    createAndAppendElement(entityNode, "Type", Globals.DocObj.markuplist[curmarkup].type);
                    createAndAppendElement(entityNode, "Subtype", Globals.DocObj.markuplist[curmarkup].subtype);
                    createAndAppendElement(entityNode, "Alternative", Globals.DocObj.markuplist[curmarkup].alternative);
                    createAndAppendElement(entityNode, "Layer", Globals.DocObj.markuplist[curmarkup].layer);
                    createAndAppendElement(entityNode, "Rotation", Globals.DocObj.markuplist[curmarkup].rotation);
                    createAndAppendElement(entityNode, "TextRotation", Globals.DocObj.markuplist[curmarkup].textrotate);
                    createAndAppendElement(entityNode, "PageRotation", Globals.DocObj.markuplist[curmarkup].pagerotation);
                    createAndAppendElement(entityNode, "FileName", Globals.DocObj.markuplist[curmarkup].documentName);
                    createAndAppendElement(entityNode, "Layout", Globals.DocObj.getPageObject(pagenumber).LayoutName);
                    createAndAppendElement(entityNode, "View", pagenumber);
                    createAndAppendElement(entityNode, "ViewName", Globals.DocObj.getPageObject(pagenumber).PageName);
                    createAndAppendElement(entityNode, "Handle", curmarkup);
                    //createAndAppendElement(entityNode, "Color", DocObj.markuplist[curmarkup].color);
                    createAndAppendElement(entityNode, "FillColor", Globals.DocObj.markuplist[curmarkup].fillcolor);
                    createAndAppendElement(entityNode, "LineColor", Globals.DocObj.markuplist[curmarkup].strokecolor);
                    createAndAppendElement(entityNode, "TextColor", Globals.DocObj.markuplist[curmarkup].textcolor);
                    createAndAppendElement(entityNode, "Transparency", Globals.DocObj.markuplist[curmarkup].transparency);
                    createAndAppendElement(entityNode, "Consolidated", Globals.DocObj.markuplist[curmarkup].consolidated ? 1:0);
                    createAndAppendElement(entityNode, "HaveLink", Globals.DocObj.markuplist[curmarkup].bhaveLink ? 1:0);
                    createAndAppendElement(entityNode, "FixedScale", Globals.bUseFixedScale ? 1:0);
                    createAndAppendElement(entityNode, "LineStyleScale", fixedscale);
                    createAndAppendElement(entityNode, "LinkURL", Globals.DocObj.markuplist[curmarkup].linkURL);

                    const fontNode = markupxml.createElement("Font");
                    fontNode.setAttribute("facename", Globals.DocObj.markuplist[curmarkup].font.fontName);
                    //fontNode.setAttribute("height", DocObj.markuplist[curmarkup].font.height);
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                        if(Globals.DocObj.markuplist[curmarkup].type != 12){
                            if(Globals.bUseFixedScale){
                                fontNode.setAttribute("height", (Globals.DocObj.markuplist[curmarkup].font.height / fixedscale).toString()); // TODO:JS->TS:CHECK added toString()
                            }else{
                                fontNode.setAttribute("height", (Globals.DocObj.markuplist[curmarkup].font.height / internalscale).toString()); // TODO:JS->TS:CHECK added toString()
                            }
                        }else{
                            fontNode.setAttribute("height", (Globals.DocObj.markuplist[curmarkup].font.height / internalscale).toString()); // TODO:JS->TS:CHECK added toString()
                        }

                        /*if (DocObj.markuplist[curmarkup].type != 12){
                            var fontscale = DocObj.markuplist[curmarkup].font.height / internalscale;
                        }else{
                            fontscale = DocObj.markuplist[curmarkup].font.height;
                        }*/

                        /*if(bUseFixedScale){
                            fontNode.setAttribute("height", DocObj.markuplist[curmarkup].font.height / fixedscale);
                        }else{

                        }*/
                    } else {
                        if(Globals.DocObj.markuplist[curmarkup].type != 12){
                            if(Globals.bUseFixedScale){
                                fontNode.setAttribute("height", ((Globals.DocObj.markuplist[curmarkup].font.height / fixedscale) * imagescale).toString());
                            }else{
                                fontNode.setAttribute("height", (Globals.DocObj.markuplist[curmarkup].font.height).toString());
                            }
                        }else{
                            fontNode.setAttribute("height", (Globals.DocObj.markuplist[curmarkup].font.height).toString());

                        }
                        /*if(bUseFixedScale &&  DocObj.markuplist[curmarkup].type != 12){
                            var fontscale = (DocObj.markuplist[curmarkup].font.height / fixedscale) * imagescale;

                        }else{
                            var fontscale = DocObj.markuplist[curmarkup].font.height;

                        }*/
                    }
                    //fontNode.setAttribute("height", fontscale);
                    fontNode.setAttribute("bold", (Globals.DocObj.markuplist[curmarkup].font.bold ? 1 : 0).toString());
                    fontNode.setAttribute("italic", (Globals.DocObj.markuplist[curmarkup].font.italic ? 1 : 0).toString());
                    entityNode.appendChild(fontNode);
                    /*createAndAppendElement(entityNode, "FontName", DocObj.markuplist[curmarkup].fontname);
                     if (DocObj.pages[DocObj.currentpage].usepdfjs || DocObj.pages[DocObj.currentpage].usevectorxml) {
                     createAndAppendElement(entityNode, "FontHeight", DocObj.markuplist[curmarkup].textheight / internalscale);
                     } else {
                     createAndAppendElement(entityNode, "FontHeight", DocObj.markuplist[curmarkup].textheight);
                     }*/
                    createAndAppendElement(entityNode, "Text", Globals.DocObj.markuplist[curmarkup].text == "" ? "." : Globals.DocObj.markuplist[curmarkup].text);
                    createAndAppendElement(entityNode, "SmallText", Globals.DocObj.markuplist[curmarkup].smalltext == "" ? "." : Globals.DocObj.markuplist[curmarkup].smalltext);
                    createAndAppendElement(entityNode, "DimText", Globals.DocObj.markuplist[curmarkup].dimtext == "" ? "." : Globals.DocObj.markuplist[curmarkup].dimtext);

                    createAndAppendElement(entityNode, "TextWidth", Globals.DocObj.markuplist[curmarkup].textwidth);
                    createAndAppendElement(entityNode, "Signature", Globals.DocObj.markuplist[curmarkup].signature);
                    const displayname = GetDisplayName(Globals.DocObj.markuplist[curmarkup].signature);
                    createAndAppendElement(entityNode, "Name", displayname);

                    createAndAppendElement(entityNode, "TimeStamp", Globals.DocObj.markuplist[curmarkup].timestamp);
                    createAndAppendElement(entityNode, "Scaling", Globals.DocObj.markuplist[curmarkup].scaling);

                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                        createAndAppendElement(entityNode, "Xoffset", Globals.DocObj.markuplist[curmarkup].xoffset / internalscale);
                        createAndAppendElement(entityNode, "Yoffset", Globals.DocObj.markuplist[curmarkup].yoffset / internalscale);

                    } else {
                        createAndAppendElement(entityNode, "Xoffset", Globals.DocObj.markuplist[curmarkup].xoffset);
                        createAndAppendElement(entityNode, "Yoffset", Globals.DocObj.markuplist[curmarkup].yoffset);
                    }
                    const localLinewidth = Globals.DocObj.markuplist[curmarkup].linewidth;
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                        if(Globals.bUseFixedScale){
                            //var linescale = ( localLinewidth / fixedscale) / internalscale;
                            const linescale = ( localLinewidth / fixedscale);
                            //console.log(fixedscale);
                            //console.log(linescale);
                            createAndAppendElement(entityNode, "LineWidth", linescale);
                        }else{
                            createAndAppendElement(entityNode, "LineWidth", localLinewidth / internalscale);
                        }
                    } else {
                        //createAndAppendElement(entityNode, "LineWidth", DocObj.markuplist[curmarkup].linewidth);
                        if(Globals.bUseFixedScale){
                            const linescale = (localLinewidth / fixedscale) * imagescale;
                            createAndAppendElement(entityNode, "LineWidth", linescale);
                        }else{
                            createAndAppendElement(entityNode, "LineWidth", localLinewidth);
                        }
                    }
                    const localArrowSize = Globals.DocObj.markuplist[curmarkup].arrowlength - Globals.DocObj.markuplist[curmarkup].linewidth;
                    createAndAppendElement(entityNode, "ArrowSize", localArrowSize);
                    createAndAppendElement(entityNode, "LineStyle", Globals.DocObj.markuplist[curmarkup].linestyle);
                    createAndAppendElement(entityNode, "MainImageScaling", Globals.DocObj.getPageObject(pagenumber).MainImageScaling);
                    createAndAppendElement(entityNode, "MainImageOffsetX", Globals.DocObj.getPageObject(pagenumber).MainImageOffsetX);
                    createAndAppendElement(entityNode, "MainImageOffsetY", Globals.DocObj.getPageObject(pagenumber).MainImageOffsetY);
                    createAndAppendElement(entityNode, "DocScale", Globals.DocObj.markuplist[curmarkup].docdscale);
                    createAndAppendElement(entityNode, "DocOffsetX", Globals.DocObj.markuplist[curmarkup].docdx);
                    createAndAppendElement(entityNode, "DocOffsetY", Globals.DocObj.markuplist[curmarkup].docdy);
                    if(Globals.DocObj.markuplist[curmarkup].type != 0 ){
                        if (Globals.DocObj.markuplist[curmarkup].points.length != -1) {
                            const pointsNode = markupxml.createElement("Points");
                            for (let i = 0; i < Globals.DocObj.markuplist[curmarkup].points.length; i++) {
                                const pointNode = markupxml.createElement("Point");
                                if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                                    const xpoint = (Globals.DocObj.markuplist[curmarkup].points[i].x - Globals.DocObj.markuplist[curmarkup].xoffset) / internalscale;
                                    const ypoint = (Globals.DocObj.markuplist[curmarkup].points[i].y - Globals.DocObj.markuplist[curmarkup].yoffset) / internalscale;
                                    pointNode.setAttribute("x", xpoint.toString());
                                    pointNode.setAttribute("y", ypoint.toString());
                                } else {
                                    pointNode.setAttribute("x", Globals.DocObj.markuplist[curmarkup].points[i].x);
                                    pointNode.setAttribute("y", Globals.DocObj.markuplist[curmarkup].points[i].y);
                                }
                                pointsNode.appendChild(pointNode);
                            }
                            entityNode.appendChild(pointsNode);
                        }
                    }else{
                        if (Globals.DocObj.markuplist[curmarkup].pointlist.length != 0) {
                            for(let j = 0; j < Globals.DocObj.markuplist[curmarkup].pointlist.length;j++){
                                const linesNode = markupxml.createElement("Line");
                                for (let i = 0; i < Globals.DocObj.markuplist[curmarkup].pointlist[j].length; i++) {
                                    const pointNode = markupxml.createElement("Point");
                                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                                        const xpoint = (Globals.DocObj.markuplist[curmarkup].pointlist[j][i].x - Globals.DocObj.markuplist[curmarkup].xoffset) / internalscale;
                                        const ypoint = (Globals.DocObj.markuplist[curmarkup].pointlist[j][i].y - Globals.DocObj.markuplist[curmarkup].yoffset) / internalscale;
                                        pointNode.setAttribute("x", xpoint.toString());
                                        pointNode.setAttribute("y", ypoint.toString());
                                    } else {
                                        pointNode.setAttribute("x", Globals.DocObj.markuplist[curmarkup].pointlist[j][i].x);
                                        pointNode.setAttribute("y", Globals.DocObj.markuplist[curmarkup].pointlist[j][i].y);
                                    }
                                    linesNode.appendChild(pointNode);
                                }
                                entityNode.appendChild(linesNode);
                            }
                        }
                    }
                    if(Globals.DocObj.markuplist[curmarkup].type == 7){
                        if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                            createAndAppendElement(entityNode, "LeaderLineOffset", Globals.DocObj.markuplist[curmarkup].leaderoffset / internalscale);
                        }else{
                            createAndAppendElement(entityNode, "LeaderLineOffset", Globals.DocObj.markuplist[curmarkup].leaderoffset);
                        }
                    }
                    const rectangleNode = markupxml.createElement("Rect");
                    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
                        const xorig = (Globals.DocObj.markuplist[curmarkup].x - Globals.DocObj.markuplist[curmarkup].xoffset) / internalscale;
                        const yorig = (Globals.DocObj.markuplist[curmarkup].y - Globals.DocObj.markuplist[curmarkup].yoffset) / internalscale;
                        let worig:number;
                        let horig:number;
                        if (Globals.DocObj.markuplist[curmarkup].type == 0 || Globals.DocObj.markuplist[curmarkup].type == 1 || Globals.DocObj.markuplist[curmarkup].type == 2 || Globals.DocObj.markuplist[curmarkup].type == 6 || Globals.DocObj.markuplist[curmarkup].type == 7 || Globals.DocObj.markuplist[curmarkup].type == 8) {
                            worig = (Globals.DocObj.markuplist[curmarkup].w - Globals.DocObj.markuplist[curmarkup].xoffset) / internalscale;
                            horig = (Globals.DocObj.markuplist[curmarkup].h - Globals.DocObj.markuplist[curmarkup].yoffset) / internalscale;
                        } else {
                            if (Globals.DocObj.markuplist[curmarkup].type == 9 && Globals.DocObj.markuplist[curmarkup].subtype == 0) {
                                worig = (Globals.DocObj.markuplist[curmarkup].w / internalscale);
                                horig = (Globals.DocObj.markuplist[curmarkup].textheight / internalscale);
                            } else if(Globals.DocObj.markuplist[curmarkup].type == 10 && Globals.bUseFixedScale) {
                                worig = (Globals.DocObj.markuplist[curmarkup].w / fixedscale);
                                horig = (Globals.DocObj.markuplist[curmarkup].h / fixedscale);
                            }else{
                                worig = (Globals.DocObj.markuplist[curmarkup].w / internalscale);
                                horig = (Globals.DocObj.markuplist[curmarkup].h / internalscale);
                            }
                        }
                        rectangleNode.setAttribute("x", xorig.toString());
                        rectangleNode.setAttribute("y", yorig.toString());
                        rectangleNode.setAttribute("w", worig.toString());
                        rectangleNode.setAttribute("h", horig.toString());
                    } else {
                        rectangleNode.setAttribute("x", Globals.DocObj.markuplist[curmarkup].x);
                        rectangleNode.setAttribute("y", Globals.DocObj.markuplist[curmarkup].y);
                        rectangleNode.setAttribute("w", Globals.DocObj.markuplist[curmarkup].w);
                        rectangleNode.setAttribute("h", Globals.DocObj.markuplist[curmarkup].h);
                    }
                    entityNode.appendChild(rectangleNode);
                    if(Globals.DocObj.markuplist[curmarkup].customattributes.length > 0){
                        const extendedNode = markupxml.createElement("Extended");
                        for (let cacnt = 0;cacnt < Globals.DocObj.markuplist[curmarkup].customattributes.length; cacnt++){
                            const sztagname  = Globals.DocObj.markuplist[curmarkup].customattributes[cacnt].name;
                            const sztagvalue  = Globals.DocObj.markuplist[curmarkup].customattributes[cacnt].value;
                            createAndAppendElement(extendedNode, sztagname, sztagvalue);
                        }
                        entityNode.appendChild(extendedNode);
                    }
                    markupxml.getElementsByTagName("Entities")[0].appendChild(entityNode);
                }
            }
        } //end for
        //SendData(markupxml,"http://viewserver.rasterex.com/demo/markupserver.dll?webmarkupsave");
    } //end if

    return markupxml;
}

// TODO:JS->TS:INFO refactor createAppendElementret and createAndAppendElement
export function createAppendElementret(source:any, name:any, value:any){
    const node = source.ownerDocument.createElement(name);
    node.appendChild(source.ownerDocument.createTextNode(value));
    source.appendChild(node);
    return node;
}

export function createAndAppendElement(source:any, name:any, value:any){
    const node = source.ownerDocument.createElement(name);
    node.appendChild(source.ownerDocument.createTextNode(value));
    source.appendChild(node);
}

export function createxmlmarkupentity(markupobj:any,Docref:any){
    let savetime = new Date().getTime();
    let internalscale = 1;
    let fixedscale = 1;
    let imagescale = 1;

    let markupxmltxt = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
    markupxmltxt += "<RasterexMarkup>\n";
    markupxmltxt += "<FileVersion>C360</FileVersion>\n";
    markupxmltxt += "<Entities/></RasterexMarkup>\n";
    let markupxml = parseXML(markupxmltxt);

    if (markupobj != null) {
        if (Docref.pages[Docref.currentpage].usepdfjs || Docref.pages[Docref.currentpage].usevectorxml) {
            internalscale = markupobj.scaling;
        }else{

            imagescale = markupobj.scaling;
        }
        //fixedscale = markupobj.fixedScale;
        fixedscale = Docref.pages[Docref.currentpage].fixedScale;
        const pagenumber = markupobj.pagenumber;
        const bpagenotloaded = (Docref.getPageObject(pagenumber) == undefined);
        const entityNode = markupxml.createElement("Entity");
        entityNode.setAttribute("ID", markupobj.markupID);
        if(markupobj.type == 11){
            const imagenode = createAppendElementret(entityNode, "Image", getBase64Image(markupobj.image));
            //type="png" encoding="base64"
            imagenode.setAttribute("type", "png");
            imagenode.setAttribute("encoding", "base64");

            /*if(markupobj.subtype == 1){
             entityNode.setAttribute("abspath", 1);
             }else{
             entityNode.setAttribute("abspath", 0);
             }*/
        }
        createAndAppendElement(entityNode, "UniqueID", markupobj.uniqueID);
        if(markupobj.type == 11 && markupobj.imagehref != ""){
            createAndAppendElement(entityNode, "Imagehref", markupobj.imagehref);
        }
        createAndAppendElement(entityNode, "Type", markupobj.type);
        createAndAppendElement(entityNode, "Subtype", markupobj.subtype);
        createAndAppendElement(entityNode, "Alternative", markupobj.alternative);
        createAndAppendElement(entityNode, "Layer", markupobj.layer);
        createAndAppendElement(entityNode, "Rotation", markupobj.rotation);
        createAndAppendElement(entityNode, "TextRotation", markupobj.textrotate);
        createAndAppendElement(entityNode, "PageRotation", markupobj.pagerotation);
        createAndAppendElement(entityNode, "FileName", markupobj.documentName);
        if (bpagenotloaded){
            createAndAppendElement(entityNode, "Layout", markupobj.layout);
        }else{
            createAndAppendElement(entityNode, "Layout", Docref.getPageObject(pagenumber).LayoutName);
        }
        createAndAppendElement(entityNode, "View", pagenumber);
        if (bpagenotloaded){
            createAndAppendElement(entityNode, "ViewName", pagenumber);
        }else{
            createAndAppendElement(entityNode, "ViewName", Docref.getPageObject(pagenumber).PageName);
        }
        createAndAppendElement(entityNode, "Handle", markupobj.markupnumber);
        //createAndAppendElement(entityNode, "Color", markupobj.color);
        createAndAppendElement(entityNode, "FillColor", markupobj.fillcolor);
        createAndAppendElement(entityNode, "LineColor", markupobj.strokecolor);
        createAndAppendElement(entityNode, "TextColor", markupobj.textcolor);
        createAndAppendElement(entityNode, "Transparency", markupobj.transparency);
        createAndAppendElement(entityNode, "Consolidated", markupobj.consolidated ? 1:0);
        createAndAppendElement(entityNode, "HaveLink", markupobj.bhaveLink ? 1:0);
        createAndAppendElement(entityNode, "FixedScale", Globals.bUseFixedScale ? 1:0);
        createAndAppendElement(entityNode, "LineStyleScale", fixedscale);
        createAndAppendElement(entityNode, "LinkURL", markupobj.linkURL);

        /*var fontNode = markupxml.createElement("Font");
        fontNode.setAttribute("facename", markupobj.font.fontName);
        //fontNode.setAttribute("height", markupobj.font.height);
        if (Docref.pages[Docref.currentpage].usepdfjs || Docref.pages[Docref.currentpage].usevectorxml) {

            fontNode.setAttribute("height", markupobj.font.height / internalscale);
        } else {
            fontNode.setAttribute("height", markupobj.font.height);
        }*/
        const fontNode = markupxml.createElement("Font");
        fontNode.setAttribute("facename", markupobj.font.fontName);

        if (markupobj.usepdfjs || markupobj.usevectorxml) {
            if(markupobj.type != 12){
                if(Globals.bUseFixedScale){
                    fontNode.setAttribute("height", (markupobj.font.height / fixedscale).toString());
                }else{
                    fontNode.setAttribute("height", (markupobj.font.height / internalscale).toString());
                }
            }else{
                fontNode.setAttribute("height", (markupobj.font.height / internalscale).toString());
            }
        } else {
            if(markupobj.type != 12){
                if(Globals.bUseFixedScale){
                    fontNode.setAttribute("height", ((markupobj.font.height / fixedscale) * imagescale).toString());
                }else{
                    fontNode.setAttribute("height", (markupobj.font.height).toString());
                }
            }else{
                fontNode.setAttribute("height", (markupobj.font.height).toString());
            }
        }
        fontNode.setAttribute("bold", (markupobj.font.bold ? 1 : 0).toString());
        fontNode.setAttribute("italic", (markupobj.font.italic ? 1 : 0).toString());
        entityNode.appendChild(fontNode);
        /*createAndAppendElement(entityNode, "FontName", markupobj.fontname);
         if (Docref.pages[Docref.currentpage].usepdfjs || Docref.pages[Docref.currentpage].usevectorxml) {
         createAndAppendElement(entityNode, "FontHeight", markupobj.textheight / internalscale);
         } else {
         createAndAppendElement(entityNode, "FontHeight", markupobj.textheight);
         }*/
        createAndAppendElement(entityNode, "Text", markupobj.text == "" ? "." : markupobj.text);
        createAndAppendElement(entityNode, "SmallText", markupobj.smalltext == "" ? "." : markupobj.smalltext);
        createAndAppendElement(entityNode, "DimText", markupobj.dimtext == "" ? "." : markupobj.dimtext);
        createAndAppendElement(entityNode, "TextWidth", markupobj.textwidth);
        createAndAppendElement(entityNode, "Signature", markupobj.signature);
        const displayname = GetDisplayName(markupobj.signature);
        createAndAppendElement(entityNode, "Name", displayname);
        createAndAppendElement(entityNode, "TimeStamp", markupobj.timestamp);
        createAndAppendElement(entityNode, "Scaling", markupobj.scaling);
        if (Docref.pages[Docref.currentpage].usepdfjs || Docref.pages[Docref.currentpage].usevectorxml) {
            createAndAppendElement(entityNode, "Xoffset", markupobj.xoffset / internalscale);
            createAndAppendElement(entityNode, "Yoffset", markupobj.yoffset / internalscale);
        } else {
            createAndAppendElement(entityNode, "Xoffset", markupobj.xoffset);
            createAndAppendElement(entityNode, "Yoffset", markupobj.yoffset);
        }
        const localLinewidth = markupobj.linewidth;
        if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
            if(Globals.bUseFixedScale){
                const linescale = ( localLinewidth / fixedscale);
                createAndAppendElement(entityNode, "LineWidth", linescale);
            }else{
                createAndAppendElement(entityNode, "LineWidth", localLinewidth / internalscale);
            }
        } else {
            createAndAppendElement(entityNode, "LineWidth", markupobj.linewidth);
            if(Globals.bUseFixedScale){
                const linescale = (localLinewidth / fixedscale) * imagescale;
                createAndAppendElement(entityNode, "LineWidth", linescale);
            }else{
                createAndAppendElement(entityNode, "LineWidth", localLinewidth);
            }
        }
       const localArrowSize = markupobj.arrowlength - markupobj.linewidth;
       createAndAppendElement(entityNode, "ArrowSize", localArrowSize);

        /*if (Docref.pages[Docref.currentpage].usepdfjs || Docref.pages[Docref.currentpage].usevectorxml) {
            if(bUseFixedScale){
                createAndAppendElement(entityNode, "LineWidth", markupobj.linewidth / internalscale);
            }else{
                createAndAppendElement(entityNode, "LineWidth", markupobj.linewidth / internalscale);
            }


        } else {
            createAndAppendElement(entityNode, "LineWidth", markupobj.linewidth);
        }*/

        createAndAppendElement(entityNode, "LineStyle", markupobj.linestyle);
        if (bpagenotloaded){
            createAndAppendElement(entityNode, "MainImageScaling", markupobj.docdscale);
            createAndAppendElement(entityNode, "MainImageOffsetX", markupobj.docdx);
            createAndAppendElement(entityNode, "MainImageOffsetY", markupobj.docdy);
        }else{
            createAndAppendElement(entityNode, "MainImageScaling", Docref.getPageObject(pagenumber).MainImageScaling);
            createAndAppendElement(entityNode, "MainImageOffsetX", Docref.getPageObject(pagenumber).MainImageOffsetX);
            createAndAppendElement(entityNode, "MainImageOffsetY", Docref.getPageObject(pagenumber).MainImageOffsetY);
        }
        createAndAppendElement(entityNode, "DocScale", markupobj.docdscale);
        createAndAppendElement(entityNode, "DocOffsetX", markupobj.docdx);
        createAndAppendElement(entityNode, "DocOffsetY", markupobj.docdy);
        if(markupobj.type != 0 ){
            if (markupobj.points.length != -1) {
                const pointsNode = markupxml.createElement("Points");
                for (let i = 0; i < markupobj.points.length; i++) {
                    const pointNode = markupxml.createElement("Point");
                    if (Docref.pages[Docref.currentpage].usepdfjs || Docref.pages[Docref.currentpage].usevectorxml) {
                        const xpoint = (markupobj.points[i].x - markupobj.xoffset) / internalscale;
                        const ypoint = (markupobj.points[i].y - markupobj.yoffset) / internalscale;
                        pointNode.setAttribute("x", xpoint.toString());
                        pointNode.setAttribute("y", ypoint.toString());
                    } else {
                        pointNode.setAttribute("x", markupobj.points[i].x.toString());
                        pointNode.setAttribute("y", markupobj.points[i].y.toString());
                    }
                    pointsNode.appendChild(pointNode);
                }
                entityNode.appendChild(pointsNode);
            }
        }else{
            if (markupobj.pointlist.length != 0) {
                for(let j = 0; j < markupobj.pointlist.length;j++){
                    const linesNode = markupxml.createElement("Line");
                    for (let i = 0; i < markupobj.pointlist[j].length; i++) {
                        const pointNode = markupxml.createElement("Point");
                        if (Docref.pages[Docref.currentpage].usepdfjs || Docref.pages[Docref.currentpage].usevectorxml) {
                            const xpoint = (markupobj.pointlist[j][i].x - markupobj.xoffset) / internalscale;
                            const ypoint = (markupobj.pointlist[j][i].y - markupobj.yoffset) / internalscale;
                            pointNode.setAttribute("x", xpoint.toString());
                            pointNode.setAttribute("y", ypoint.toString());
                        } else {
                            pointNode.setAttribute("x", markupobj.pointlist[j][i].x);
                            pointNode.setAttribute("y", markupobj.pointlist[j][i].y);
                        }
                        linesNode.appendChild(pointNode);
                    }
                    entityNode.appendChild(linesNode);
                }
            }
        }
        if(markupobj.type == 7){
            if (Docref.pages[Docref.currentpage].usepdfjs || Docref.pages[Docref.currentpage].usevectorxml) {
                createAndAppendElement(entityNode, "LeaderLineOffset", markupobj.leaderoffset / internalscale);
            }else{
                createAndAppendElement(entityNode, "LeaderLineOffset", markupobj.leaderoffset);
            }
        }
        let rectangleNode = markupxml.createElement("Rect");

        if (Docref.pages[Docref.currentpage].usepdfjs || Docref.pages[Docref.currentpage].usevectorxml) {
            let xorig = (markupobj.x - markupobj.xoffset) / internalscale;
            let yorig = (markupobj.y - markupobj.yoffset) / internalscale;
            let worig:number;
            let horig:number;
            if (markupobj.type == 0 || markupobj.type == 1 || markupobj.type == 2 || markupobj.type == 6 || markupobj.type == 7 || markupobj.type == 8) {
                worig = (markupobj.w - markupobj.xoffset) / internalscale;
                horig = (markupobj.h - markupobj.yoffset) / internalscale;
            } else {
                if (markupobj.type == 9 && markupobj.subtype == 0) {
                    worig = (markupobj.w / internalscale);
                    horig = (markupobj.textheight / internalscale);
                } else if(markupobj.type == 10 && Globals.bUseFixedScale) {
                    worig = (markupobj.w / fixedscale);
                    horig = (markupobj.h / fixedscale);
                } else {
                    worig = (markupobj.w / internalscale);
                    horig = (markupobj.h / internalscale);
                }
            }
            rectangleNode.setAttribute("x", xorig.toString());
            rectangleNode.setAttribute("y", yorig.toString());
            rectangleNode.setAttribute("w", worig.toString());
            rectangleNode.setAttribute("h", horig.toString());
        } else {
            rectangleNode.setAttribute("x", markupobj.x);
            rectangleNode.setAttribute("y", markupobj.y);
            rectangleNode.setAttribute("w", markupobj.w);
            rectangleNode.setAttribute("h", markupobj.h);
        }
        entityNode.appendChild(rectangleNode);
        if(markupobj.customattributes.length > 0){
            const extendedNode = markupxml.createElement("Extended");
            for (let cacnt = 0;cacnt < markupobj.customattributes.length; cacnt++){
                const sztagname  = markupobj.customattributes[cacnt].name;
                const sztagvalue  = markupobj.customattributes[cacnt].value;
                createAndAppendElement(extendedNode, sztagname, sztagvalue);
            }
            entityNode.appendChild(extendedNode);
        }
        markupxml.getElementsByTagName("Entities")[0].appendChild(entityNode);
    }
    return markupxml;
} // JS->TS:INFO createxmlmarkupentity end


export function getMarkupFilelist(Filepath:string, FileName:string='') {
    //var TDocObj;
    let PageObj;
    //var pages = new Array();

    let file = getFileName(FileName);
    const xhr = new XMLHttpRequest();

    //alert("XMLHttpRequest created");

    let XMLGetFile = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    XMLGetFile += "<RxViewServer>";
    XMLGetFile += "<Command>GetMarkup</Command>";
    XMLGetFile += "<LicenseID>" + Globals.LicenseID + "</LicenseID>";
    XMLGetFile += "<FileURL>" + Filepath + "</FileURL>";
    XMLGetFile += "</RxViewServer>";

    try {
        xhr.open('POST', Globals.xmlurlmarkup, true);
    } catch (e) {
        alert("Error 1 - " + e);
    }
    try {
        //xhr.responseType = 'text/xml';
        xhr.responseType = '';
    } catch (e) {
        //alert("Error 2 - " + e);
    }

    xhr.onload = (e:any)=> {
        if (xhr.status == 200) {
            //console.log(this.responseText);
            let MarkupFilePath = '';
            let i = 0;
            let xmlDoc = xhr.responseXML;
            if (xmlDoc == null || xmlDoc.documentElement == null) {
                xmlDoc = $.parseXML(xhr.responseText); // .documentElement; // JS->TS:INFO removed .documentElement
            }
            let SzReadonlymarkup;
            try {
                SzReadonlymarkup = xmlDoc!.getElementsByTagName("readonlymarkup")[0].firstChild!.nodeValue;  // JS->TS:INFO added ! to assume that the properties are set ( if not they are caught by the try catch block)
            } catch (e) {
                //ignore and continue
                SzReadonlymarkup = "";
            }
            if (!Globals.readonlymode){
                Globals.readonlymode = (SzReadonlymarkup != "" && SzReadonlymarkup == "True");
            }
            let markupfilepathobj = xmlDoc.getElementsByTagName('File');
            Globals.DocObj.setnummarkupfiles(markupfilepathobj.length);
            for (i = 0; i < markupfilepathobj.length; i++) {
                MarkupFilePath = markupfilepathobj[i]!.firstChild!.nodeValue!.toString(); // TODO:JS->TS:FIX add proper checks instead of !

                if(Globals.bUseCustomrelpath){
                    MarkupFilePath = Globals.xmlurlrelcustom + MarkupFilePath;
                }else{
                    MarkupFilePath = Globals.xmlurlrelmarkup + MarkupFilePath;
                }
                getMarkup(MarkupFilePath);
                //markupfiles.push(MarkupFilePath);
            }
            drawmarkupAll(Globals.cntximg);
            Globals.DocObj.markuploaded = true;

            if (markupfilepathobj.length == 0) {
                if (RxCore_GUI_Markuplist != undefined) {
                    RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist);
                    /* Andriy */
                    // RxCore_GUI_Markuplist.notify();
                }
                if (Rxcore_GUI_markupLoadComplete != undefined) {
                    Rxcore_GUI_markupLoadComplete.loadComplete(Globals.DocObj.markuplist, Globals.DocObj.fileindex);
                }
            }
        } else if (xhr.status == 404) {
            alert("XML could not be found");
        } else if (xhr.status == 503) {
            alert("Server is down");
        } else if (xhr.status == 501) {
            //alert("Markup could not be loaded");
        }
    };
    //alert(XMLGetFile);
    xhr.send(XMLGetFile);
} // JS->TS:INFO end getMarkupFilelist


// TODO:JS->TS:CHECK recheck this method
export function getMarkup(MarkupFile:string) {
    let PageObj;
    const xhr = new XMLHttpRequest();

    try {
        xhr.open('GET', MarkupFile, true);
    } catch (e) {
        alert("Error 1 - " + e);
    }
    try {
        //xhr.responseType = 'text/xml';
        xhr.responseType = '';
    } catch (e) {
        //alert("Error 2 - " + e);
    }
    xhr.onload = function (e) {
        if (this.status == 200) {
            //console.log(this.responseText);
            let MarkupFilePath = ''; // JS->TS:INFO changed initialization from 0 to empty string
            let i = 0;
            let xmlDoc = this.responseXML;
            if (xmlDoc == null || xmlDoc.documentElement == null) {
                xmlDoc = $.parseXML(this.responseText); // .documentElement; // JS->TS:INFO removed .documentElement
            }

            //var markupType = markupentityobj[i].getElementsByTagName("Type")[0].firstChild.nodeValue;
            Globals.DocObj.setmarkupfilesreceived();
            let fileVersion;
            //DocObj = new DocumentObject(xmlDoc);
            if (xmlDoc.getElementsByTagName('FileVersion') != null && xmlDoc.getElementsByTagName('FileVersion').length != 0) {
                fileVersion = xmlDoc!.getElementsByTagName('FileVersion')[0]!.firstChild!.nodeValue; // TODO:JS->TS:FIX add proper checks
            }

            if (xmlDoc.getElementsByTagName('User') != null && xmlDoc.getElementsByTagName('User').length != 0) {
                let UserID = xmlDoc.getElementsByTagName('User');
                for (i = 0; i < UserID.length; i++) {
                    let MarkupUserDispName = UserID[i]!.getElementsByTagName("Name")[0]!.firstChild!.nodeValue;
                    let MarkupUserID = UserID[i]!.getElementsByTagName("ID")[0]!.firstChild!.nodeValue;
                    let MarkupUserLayer;
                    let MarkupUserColor;
                    if (UserID[i].getElementsByTagName("Layer")[0] != undefined) {
                        MarkupUserLayer = UserID[i].getElementsByTagName("Layer")[0].firstChild!.nodeValue;
                    } else {
                        MarkupUserLayer = Globals.markuplayer;
                    }
                    if (UserID[i].getElementsByTagName("Color")[0] != undefined) {
                        MarkupUserColor = UserID[i].getElementsByTagName("Color")[0].firstChild!.nodeValue;
                    } else {
                        MarkupUserColor = Globals.markupcolor;
                    }

                    //var MarkupUserLayer = UserID[i].getElementsByTagName("Layer")[0].firstChild.nodeValue;
                    //var MarkupUserColor = UserID[i].getElementsByTagName("Color")[0].firstChild.nodeValue;

                    if (Globals.Userlist[0].Signature == MarkupUserID) { // TODO:JS->TS:CHECK should this be commented out?
                        //Userlist[0] = new Users(MarkupUserID,MarkupUserDispName,MarkupUserLayer,MarkupUserColor);
                        //numUsers++;
                    } else if (null!==MarkupUserID && null!==MarkupUserDispName){
                        // TODO:JS->TS:CHECK only the first two params were considered mandatory the next two were converted to number and string ( even if null )
                        Globals.Userlist[Globals.numUsers] = new Users(MarkupUserID, MarkupUserDispName, +(''+MarkupUserLayer), ''+MarkupUserColor);
                        Globals.numUsers++;
                    }
                }
            } else {
                if (xmlDoc.getElementsByTagName('Name') != null) {
                    let sign = xmlDoc.getElementsByTagName('Name');
                    if (null!==sign[0].firstChild && Globals.Userlist[0].Signature != sign[0].firstChild!.nodeValue) { // TODO:JS->TS:CHECK added null check and ''+ for convertiong to string
                        Globals.Userlist[Globals.numUsers] = new Users(''+sign[0].firstChild!.nodeValue, ''+sign[0].firstChild!.nodeValue, Globals.markuplayer, Globals.markupcolor);
                        Globals.numUsers++;
                    }
                }
            }
            if (xmlDoc.getElementsByTagName('Entity') != null) {
                const markupentityobj = xmlDoc.getElementsByTagName('Entity');
                let xmlmarkupobj;
                for (i = 0; i < markupentityobj.length; i++) {
                    // TODO:JS->TS:CHECK review this section.
                    let markupType = parseInt(''+markupentityobj[i].getElementsByTagName("Type")[0].firstChild!.nodeValue);
                    let markupSubtype = parseInt(''+markupentityobj[i].getElementsByTagName("Subtype")[0].firstChild!.nodeValue);
                    let markupAlternative = parseInt(''+markupentityobj[i].getElementsByTagName("Alternative")[0].firstChild!.nodeValue);
                    let markupID = !markupentityobj[i].getAttribute('ID') ? null : markupentityobj[i].getAttribute('ID');
                    // markupType = parseInt(markupType); // JS->TS:INFO TS is strong typed. Had to move parseInt above
                    // markupSubtype = parseInt(markupSubtype); // JS->TS:INFO TS is strong typed. Had to move parseInt above
                    // markupAlternative = parseInt(markupAlternative); // JS->TS:INFO TS is strong typed. Had to move parseInt above
                    xmlmarkupobj = new MarkupObject(markupType, markupSubtype, markupAlternative);
                    xmlmarkupobj.markupID = markupID;

                    let bOK = xmlmarkupobj.SetfromXML(markupentityobj[i], fileVersion);
                    if (bOK) {
                        const markupfiles = Globals.DocObj.getnummarkupfiles();
                        const received = Globals.DocObj.getmarkupfilesreceived();
                        const lastmarkup = (i == markupentityobj.length - 1 && (markupfiles == received));
                        xmlmarkupobj.savemetolistLoad(lastmarkup);
                    }
                }
                /* Andriy call callback only once */
                if (xmlmarkupobj) xmlmarkupobj.notify();

                if (markupentityobj.length == 0) {
                    if (RxCore_GUI_Markuplist != undefined) {
                        RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist);
                        /* Andriy */
                        // RxCore_GUI_Markuplist.notify();
                    }
                }
                if (RxCore_GUI_Users != undefined) {
                    RxCore_GUI_Users.setUserlist(Globals.Userlist);
                }
                if (Rxcore_GUI_fileLoadComplete != undefined) {
                    //Rxcore_GUI_fileLoadComplete.loadComplete(MarkupFile);
                }
                drawmarkupAll(Globals.cntximg);
                /*if(last){
                    if (Rxcore_GUI_markupLoadComplete != undefined) {
                        Rxcore_GUI_markupLoadComplete.loadComplete(DocObj.markuplist, DocObj.fileindex);
                    }
                }*/
            }
        } else if (this.status == 404) {
            alert("XML could not be found");
        } else if (this.status == 503) {
            alert("Server is down");
        } else if (this.status == 501) {
            //alert("Markup could not be loaded");
        }
    };
    xhr.send();
} // JS->TS:INFO end getMarkup()


// TODO:JS->TS:CHECK  TODO:JS->TS:ADJUST  the method
export function getMarkupbyReference(Filepath:any, FileName:any) {
    let relpath = Globals.xmlurlrel;
    if(Globals.bUseCustomrelpath){
        relpath = Globals.xmlurlrelcustom;
    }
    let file = getFileName(FileName);
    let xhr = new XMLHttpRequest();

    let XMLGetFile = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    XMLGetFile += "<RxViewServer>";
    XMLGetFile += "<Command>GetMarkupByRef</Command>";
    XMLGetFile += "<LicenseID>" + Globals.LicenseID + "</LicenseID>";
    XMLGetFile += "<FileURL>" + Filepath + file + "</FileURL>";
    //XMLGetFile += "<FileURL>" + Filepath + "</FileURL>";
    XMLGetFile += "<MARKUP_INFO>";
    for (let i = 0; i < Globals.byrefmarkupfiles.length; i++) {
        XMLGetFile += "<MARKUP_URL>" + Globals.byrefmarkupfiles[i] + "</MARKUP_URL>";
    }
    XMLGetFile += "</MARKUP_INFO>";
    XMLGetFile += "</RxViewServer>";

    try {
        xhr.open('POST', Globals.xmlurl, true);
    } catch (e) {
        alert("Error 1 - " + e);
    }
    try {
        //xhr.responseType = 'text/xml';
        xhr.responseType = '';
    } catch (e) {
        //alert("Error 2 - " + e);
    }

    xhr.onload = function (e) {
        if (xhr.status == 200) {
            //console.log(xhr.responseText);
            let MarkupFilePath = '';
            let i = 0;
            let xmlDoc = xhr.responseXML;
            if (xmlDoc == null || xmlDoc.documentElement == null) {
                xmlDoc = $.parseXML(xhr.responseText); // .documentElement;  // TODO:JS->TS:CHECK  TODO:JS->TS:ADJUST
            }
            const markupfilepathobj = xmlDoc.getElementsByTagName('File');
            Globals.DocObj.setnummarkupfiles(markupfilepathobj.length);
            for (i = 0; i < markupfilepathobj.length; i++) {
                MarkupFilePath = ''+markupfilepathobj[i].firstChild!.nodeValue; // TODO:JS->TS:CHECK  TODO:JS->TS:ADJUST
                MarkupFilePath = relpath + MarkupFilePath;
                const last = (i == markupfilepathobj.length - 1); // TODO:JS->TS:INFO 'last' does not appear to be used
                getMarkup(MarkupFilePath);
                //markupfiles.push(MarkupFilePath);
            }
            drawmarkupAll(Globals.cntximg);
            Globals.DocObj.markuploaded = true;
            if (markupfilepathobj.length == 0) {
                if (RxCore_GUI_Markuplist != undefined) {
                    RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist);
                    /* Andriy */
                    // RxCore_GUI_Markuplist.notify();
                }
            }
            Globals.bUsemarkupbyref = false;
        } else if (xhr.status == 404) {
            alert("XML could not be found");
        } else if (xhr.status == 503) {
            alert("Server is down");
        } else if (xhr.status == 501) {
            //alert("Markup could not be loaded");
        }
    };
    xhr.send(XMLGetFile);
} // JS->TS:INFO end getMarkupbyReference

// TODO:JS->TS:CHECK
export function getMarkupxmlurl(){
    Globals.DocObj.setnummarkupfiles(Globals.byrefmarkupfiles.length);

    for (let i = 0; i < Globals.byrefmarkupfiles.length; i++) {
        let last = (i == Globals.byrefmarkupfiles.length - 1);
        getMarkup(Globals.byrefmarkupfiles[i]);
    }

    drawmarkupAll(Globals.cntximg);
    Globals.DocObj.markuploaded = true;

    // TODO:JS->TS:FIX !!!!!!!!!!!!!!!
    // if (markupfilepathobj.length == 0) {  // TODO:JS->TS:CHECK markupfilepathobj is global and outside of this scope.
    //     if (RxCore_GUI_Markuplist != undefined) {
    //         RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist);
    //         /* Andriy */
    //         // RxCore_GUI_Markuplist.notify();
    //     }
    // }
    Globals.bUsemarkupbyrefEx = false;
}

export function drawmarkupMagnify(ctx:any,page:any,dx:any,dy:any,dscale:any,drotation:any){
    let curmarkup = 0;
    if (Globals.DocObj.Drawmarkup) {
        for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
            if (Globals.DocObj.markuplist[curmarkup] != null) {
                if (Globals.DocObj.markuplist[curmarkup].pagenumber == page) {
                    if (Globals.DocObj.markuplist[curmarkup].display) {
                        Globals.DocObj.markuplist[curmarkup].drawprint(ctx,dx,dy,dscale,drotation,false);

                    }
                }
            }
        }
    }
}

export function hidemarkupAll(onOff:any){
    for (let curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        if (Globals.DocObj.markuplist[curmarkup] != null) {
            if (Globals.DocObj.markuplist[curmarkup].type == 0 && Globals.DocObj.markuplist[curmarkup].subtype == 1) {
                // JS->TS:INFO this if branch was empty
            }else{
                Globals.DocObj.markuplist[curmarkup].display = onOff;
            }

        }

    }

}

export function drawmarkupAll(ctx:any) {
    let curmarkup = 0;
    ctx.clearRect(0, 0, Globals.canvasowidth, Globals.canvasoheight);
    Globals.DocObj.pages[Globals.DocObj.currentpage].draw_thumbnail();
    if (Globals.bSuspendDraw){
        return;
    }
    if (Globals.DocObj.Drawmarkup) {
        for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
            if (Globals.DocObj.markuplist[curmarkup] != null) {
                if (Globals.DocObj.markuplist[curmarkup].pagenumber == Globals.DocObj.getcurPage()) {
                    if (!Globals.DocObj.markuplist[curmarkup].selected && !Globals.DocObj.markuplist[curmarkup].selectedit) {
                        if (Globals.DocObj.markuplist[curmarkup].display) {
                            Globals.DocObj.markuplist[curmarkup].drawthumb(Globals.DocObj.pages[Globals.DocObj.currentpage].thumbctx);
                            Globals.DocObj.markuplist[curmarkup].drawmescaled(ctx);
                        }
                    }
                }
            }
        }
    } else {
        for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
            if (Globals.DocObj.markuplist[curmarkup] != null) {
                if (Globals.DocObj.markuplist[curmarkup].pagenumber == Globals.DocObj.getcurPage()) {
                    if (Globals.DocObj.markuplist[curmarkup].type == 0 && Globals.DocObj.markuplist[curmarkup].subtype == 1) {
                        if (Globals.DocObj.markuplist[curmarkup].display) {
                            Globals.DocObj.markuplist[curmarkup].drawthumb(Globals.DocObj.pages[Globals.DocObj.currentpage].thumbctx);
                            Globals.DocObj.markuplist[curmarkup].drawmescaled(ctx);
                        }
                    }
                }
            }
        }
    }
}

export function DrawMarkupSelected(ctx:any) {
    let curmarkup = 0;
    ctx.clearRect(0, 0, Globals.canvasowidth, Globals.canvasoheight);

    if (Globals.DocObj.Drawmarkup) {
        for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
            if (Globals.DocObj.markuplist[curmarkup] != null) {
                if (Globals.DocObj.markuplist[curmarkup].pagenumber == Globals.DocObj.getcurPage()) {
                    if (Globals.DocObj.markuplist[curmarkup].selected || Globals.DocObj.markuplist[curmarkup].selectedit) {
                        if (Globals.DocObj.markuplist[curmarkup].display) {
                            Globals.DocObj.markuplist[curmarkup].drawthumb(Globals.DocObj.pages[Globals.DocObj.currentpage].thumbctx);
                            Globals.DocObj.markuplist[curmarkup].drawmescaled(ctx);
                        }
                    }
                }
            }
        }
    } else {
        for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
            if (Globals.DocObj.markuplist[curmarkup] != null) {
                if (Globals.DocObj.markuplist[curmarkup].pagenumber == Globals.DocObj.getcurPage()) {
                    if (Globals.DocObj.markuplist[curmarkup].type == 0 && Globals.DocObj.markuplist[curmarkup].subtype == 1) {
                        if (Globals.DocObj.markuplist[curmarkup].display) {
                            Globals.DocObj.markuplist[curmarkup].drawthumb(Globals.DocObj.pages[Globals.DocObj.currentpage].thumbctx);
                            Globals.DocObj.markuplist[curmarkup].drawmescaled(ctx);
                        }
                    }
                }
            }
        }
    }
}

export function drawmarkupPrint(ctx:any,page:any,dx:number,dy:number,dscale:number){
    let curmarkup = 0;
    for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        if (Globals.DocObj.markuplist[curmarkup] != null) {
            if (Globals.DocObj.markuplist[curmarkup].pagenumber == page) {
                if (Globals.DocObj.markuplist[curmarkup].display) {
                    Globals.DocObj.markuplist[curmarkup].drawprint(ctx,dx,dy,dscale,0,false);
                }
            }
        }
    }
    if(RxCore_GUI_printpage != undefined){
        RxCore_GUI_printpage.printpageComplete(Globals.DocObj.pages[page].printobj);
    }
}


export function undoremovemarkup(id:any){
    let curmarkup = 0;
    let deletedmarkup = 0;
    let markupcount = 0;

    let tempmarkuplist = [];

    for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        if (Globals.DocObj.markuplist[curmarkup] != null ) {

            let bOwned = (Globals.DocObj.markuplist[curmarkup].signature == Globals.signature);
            if(id = Globals.DocObj.markuplist[curmarkup].markupnumber){
                if (RxCore_GUI_Markup != undefined) {
                    RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[curmarkup], {created : false, modified : false, deleted : true});
                }
            }else{
                tempmarkuplist[markupcount] = Globals.DocObj.markuplist[curmarkup];
                markupcount++;
            }
        }
    }

    Globals.DocObj.markuplist = tempmarkuplist;
    Globals.DocObj.nummarkups = Globals.DocObj.markuplist.length;

    if (RxCore_GUI_Markuplist != undefined) {
        RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist);
    }

    if (RxCore_GUI_pagethumbs != undefined) {
        RxCore_GUI_pagethumbs.setThumbnails(Globals.DocObj.thumbnails);
    }

    drawmarkupAll(Globals.cntximg);
    DrawMarkupSelected(Globals.context);
}

export function getGUID(markupobject:any){
    //GetGUID
    let XMLGetGUID = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    XMLGetGUID += "<RxViewServer>";
    XMLGetGUID += "<Command>GetGUID</Command>";
    XMLGetGUID += "<LicenseID>" + Globals.LicenseID + "</LicenseID>";
    XMLGetGUID += "</RxViewServer>";

    const xhr = new XMLHttpRequest();

    try {
        xhr.open('POST', Globals.xmlurl, false);
    } catch (e) {
        alert("Error 1 - " + e);
    }
    xhr.onload = (e) => {
        if (xhr.status == 200) {
            const GUID = xhr.responseText;
            markupobject.setUniqueID(GUID);
        }
    };

    xhr.send(XMLGetGUID);
}

export function MarkupSaveState(id:any) {
    let curmarkup = 0;
    let undoobj;

    for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        if (Globals.DocObj.markuplist[curmarkup] != null) {
            if (Globals.DocObj.markuplist[curmarkup].markupnumber == id) {
                undoobj = new MarkupUndoObject(id);
                undoobj.SetUndoValues(Globals.DocObj.markuplist[curmarkup]);
                Globals.DocObj.markupundolist.push(undoobj);

                /*if (RxCore_GUI_Markup != undefined) {
                    RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[curmarkup], {created : false, modified : true, deleted : false});
                }*/
            }
        }
    }
    //drawmarkupAll(cntximg);
}

export function getlastmarkupnumber(){
    let curmarkup = 0;
    let curmarkupnum = 0;
    let prevmarkupnum = 0;
    let nextnumber = 0;
    for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        if (Globals.DocObj.markuplist[curmarkup] != null) {
            if(curmarkup == 0){
                curmarkupnum = Globals.DocObj.markuplist[curmarkup].markupnumber;
                prevmarkupnum = curmarkupnum;
                nextnumber = curmarkupnum + 1;
            }else{
                curmarkupnum = Globals.DocObj.markuplist[curmarkup].markupnumber;
                if(prevmarkupnum < curmarkupnum){
                    nextnumber = curmarkupnum + 1;
                }else{
                    nextnumber = prevmarkupnum + 1;
                }
                prevmarkupnum = curmarkupnum;
            }
        }
    }
    return nextnumber;
}


export function deletemarkup() {
    let curmarkup = 0;
    let deletedmarkup = 0;
    let markupcount = 0;
    let id = -1;
    //var tempmarkuplistsel = new Array();
    let tempmarkuplist = [];

    for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        //DocObj.markuplist[curmarkup].usser
        if (Globals.DocObj.markuplist[curmarkup] != null ) {
            let bOwned = (Globals.DocObj.markuplist[curmarkup].signature == Globals.signature);
            //console.log(DocObj.markuplist[curmarkup].selected, DocObj.markuplist[curmarkup].selectedit);

            if(bOwned && (Globals.DocObj.markuplist[curmarkup].selected || Globals.DocObj.markuplist[curmarkup].selectedit)){
                id = Globals.DocObj.markuplist[curmarkup].markupnumber;
                MarkupSaveState(id);
                if (RxCore_GUI_Markup != undefined) {
                    RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[curmarkup], {created : false, modified : false, deleted : true});
                }
            }else{
                tempmarkuplist[markupcount] = Globals.DocObj.markuplist[curmarkup];
                markupcount++;

            }

            /*if (!DocObj.markuplist[curmarkup].selected && !DocObj.markuplist[curmarkup].selectedit ) {
                //id = DocObj.markuplist[curmarkup].markupnumber;
                //MarkupSaveState(id);

                tempmarkuplist[markupcount] = DocObj.markuplist[curmarkup];
                markupcount++;
            } else {
                id = DocObj.markuplist[curmarkup].markupnumber;
                MarkupSaveState(id);

            }*/

        }
    }
    //DocObj.markuplist = [];
    Globals.DocObj.markuplist = tempmarkuplist;
    Globals.DocObj.nummarkups = Globals.DocObj.markuplist.length;

    /*    for (deletedmarkup=0;deletedmarkup<tempmarkuplist.length;deletedmarkup++){
     //delete DocObj.markuplist[tempmarkuplist[deletedmarkup]];
     //DocObj.markuplist.splice(tempmarkuplist[deletedmarkup],1);
     }*/

    if (RxCore_GUI_Markuplist != undefined) {
        RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist);
        /* Andriy */
        // RxCore_GUI_Markuplist.notify();

    }
    if (RxCore_GUI_pagethumbs != undefined) {
        RxCore_GUI_pagethumbs.setThumbnails(Globals.DocObj.thumbnails);
    }

    drawmarkupAll(Globals.cntximg);
    DrawMarkupSelected(Globals.context);
}



export function ChangeMarkupSelected(type:any) {
    let curmarkup = 0;

    for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        if (Globals.DocObj.markuplist[curmarkup].selected || Globals.DocObj.markuplist[curmarkup].selectedit) {

            switch (type) {  // TODO:JS->TS:INFO use predefined constants instead of numbers
                case 0:
                    Globals.DocObj.markuplist[curmarkup].layer = Globals.markuplayer;
                    break;
                case 1:
                    //DocObj.markuplist[curmarkup].color = markupcolor;
                    Globals.DocObj.markuplist[curmarkup].strokecolor = convertHex(Globals.markuplinecolor, 100);

                    /*if (DocObj.markuplist[curmarkup].type == 9 && DocObj.markuplist[curmarkup].subtype == 1) {
                        DocObj.markuplist[curmarkup].textcolor = convertHex(markupcolor, DocObj.markuplist[curmarkup].transparency);
                    }

                    if (DocObj.markuplist[curmarkup].type == 9 || DocObj.markuplist[curmarkup].type == 12) {
                        else{
                            //DocObj.markuplist[curmarkup].fillcolor = convertHex(markupcolor, DocObj.markuplist[curmarkup].transparency);
                        }


                    }*/
                    break;
                case 2:
                    Globals.DocObj.markuplist[curmarkup].linewidth = Globals.linewidthvalue;
                    if (Globals.DocObj.markuplist[curmarkup].type == 6 || Globals.DocObj.markuplist[curmarkup].type == 7) {
                        let arrowlength = Globals.nArrowSize;
                        arrowlength += Globals.linewidthvalue;
                        Globals.DocObj.markuplist[curmarkup].arrowlength = arrowlength;
                    }
                    break;
                case 3:
                    /* background pattern */
                    Globals.DocObj.markuplist[curmarkup].alternative = Globals.fillstyle;
                    if (Globals.DocObj.markuplist[curmarkup].alternative >= 3) {
                        Globals.DocObj.markuplist[curmarkup].hatchStyle = Globals.DocObj.markuplist[curmarkup].alternative - 3;
                    }
                    break;
                case 4:

                    //DocObj.markuplist[curmarkup].fontname = fontstylevalue;
                    Globals.DocObj.markuplist[curmarkup].font.setFontname(Globals.defaultFont.fontName);
                    Globals.DocObj.markuplist[curmarkup].font.setHeight(Globals.defaultFont.height);
                    Globals.DocObj.markuplist[curmarkup].font.setBold(Globals.defaultFont.bold);
                    Globals.DocObj.markuplist[curmarkup].font.setItalic(Globals.defaultFont.italic);

                    break;
                case 5:
                    //DocObj.markuplist[curmarkup].rotation = markuprotation;
                    break;
                case 6:
                    Globals.DocObj.markuplist[curmarkup].fillcolor = setTransp(Globals.DocObj.markuplist[curmarkup].fillcolor, Globals.globaltransparency);
                    Globals.DocObj.markuplist[curmarkup].strokecolor = setTransp(Globals.DocObj.markuplist[curmarkup].strokecolor, 100);
                    Globals.DocObj.markuplist[curmarkup].transparency = Globals.globaltransparency;
                    break;
                case 7:
                    Globals.DocObj.markuplist[curmarkup].fillcolor = convertHex(Globals.markupfillcolor, Globals.DocObj.markuplist[curmarkup].transparency);
                    break;
                case 8:
                    //DocObj.markuplist[curmarkup].textcolor = convertHex(markuptextcolor, DocObj.markuplist[curmarkup].transparency);
                    Globals.DocObj.markuplist[curmarkup].textcolor = convertHex(Globals.markuptextcolor, 100);
                    break;
                case 9:
                    Globals.DocObj.markuplist[curmarkup].linestyle = Globals.nlinestyle;
                    break;
                case 10:
                    if (Globals.DocObj.markuplist[curmarkup].type == 6 || Globals.DocObj.markuplist[curmarkup].type == 7) {
                        let arrowlength = Globals.nArrowSize;
                        arrowlength += Globals.DocObj.markuplist[curmarkup].linewidth;
                        Globals.DocObj.markuplist[curmarkup].arrowlength = arrowlength;
                    }
                    break;
                case 11:
                    if (Globals.DocObj.markuplist[curmarkup].type == 8 || Globals.DocObj.markuplist[curmarkup].type == 7) {
                        //var arrowlength = nArrowSize;
                        Globals.DocObj.markuplist[curmarkup].font.setHeight(Globals.nLabelTextsize);
                        //arrowlength += DocObj.markuplist[curmarkup].linewidth;
                        //DocObj.markuplist[curmarkup].arrowlength = arrowlength;
                    }
                    break;
            }

            drawmarkupAll(Globals.cntximg);
            DrawMarkupSelected(Globals.context);
        }
    }

    if (type == 4 && Globals.DocObj.selectedmarkup.id != -1 && Globals.DocObj.selectedmarkup.edit && Globals.DocObj.selectedmarkup.selected){
        Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].font.setFontname(Globals.defaultFont.fontName);
        Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].font.setHeight(Globals.defaultFont.height);
        Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].font.setBold(Globals.defaultFont.bold);
        Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].font.setItalic(Globals.defaultFont.italic);
    }
}

export function unselectmarkup(id:any){
    for (let curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        if (Globals.DocObj.markuplist[curmarkup] != null && Globals.DocObj.markuplist[curmarkup].markupnumber == id) {
            //DocObj.markuplist[curmarkup].selected = false;
            if(Globals.DocObj.markuplist[curmarkup].selected){
                Globals.DocObj.markuplist[curmarkup].selected = false;
                if(RxCore_GUI_MarkupUnselect != undefined){
                    RxCore_GUI_MarkupUnselect.setMarkupunSelected(Globals.DocObj.markuplist[curmarkup]);
                }
            }
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

export function ChangeMarkupByindx(indx: any, type: any){
    let curmarkup = 0;

    for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        if (Globals.DocObj.markuplist[curmarkup].markupnumber == indx) {

            switch (type) {
                case 0:      // TODO:JS->TS:INFO use predefined constants instead of number values
                    Globals.DocObj.markuplist[curmarkup].layer = Globals.markuplayer;
                    break;
                case 1:
                    //DocObj.markuplist[curmarkup].color = markupcolor;
                    Globals.DocObj.markuplist[curmarkup].strokecolor = convertHex(Globals.markuplinecolor, 100);

                    /*if (DocObj.markuplist[curmarkup].type == 9 && DocObj.markuplist[curmarkup].subtype == 1) {
                     DocObj.markuplist[curmarkup].textcolor = convertHex(markupcolor, DocObj.markuplist[curmarkup].transparency);
                     }

                     if (DocObj.markuplist[curmarkup].type == 9 || DocObj.markuplist[curmarkup].type == 12) {
                     else{
                     //DocObj.markuplist[curmarkup].fillcolor = convertHex(markupcolor, DocObj.markuplist[curmarkup].transparency);
                     }


                     }*/

                    break;
                case 2:
                    Globals.DocObj.markuplist[curmarkup].linewidth = Globals.linewidthvalue;
                    if (Globals.DocObj.markuplist[curmarkup].type == 6 || Globals.DocObj.markuplist[curmarkup].type == 7) {
                        let arrowlength = Globals.nArrowSize;
                        arrowlength += Globals.linewidthvalue;
                        Globals.DocObj.markuplist[curmarkup].arrowlength = arrowlength;
                    }
                    break;
                case 3:
                    /* background pattern */
                    Globals.DocObj.markuplist[curmarkup].alternative = Globals.fillstyle;
                    if (Globals.DocObj.markuplist[curmarkup].alternative >= 3) {
                        Globals.DocObj.markuplist[curmarkup].hatchStyle = Globals.DocObj.markuplist[curmarkup].alternative - 3;
                    }

                    break;
                case 4:

                    //DocObj.markuplist[curmarkup].fontname = fontstylevalue;
                    Globals.DocObj.markuplist[curmarkup].font.setFontname(Globals.defaultFont.fontName);
                    Globals.DocObj.markuplist[curmarkup].font.setHeight(Globals.defaultFont.height);
                    Globals.DocObj.markuplist[curmarkup].font.setBold(Globals.defaultFont.bold);
                    Globals.DocObj.markuplist[curmarkup].font.setItalic(Globals.defaultFont.italic);

                    break;
                case 5:
                    //DocObj.markuplist[curmarkup].rotation = markuprotation;
                    break;
                case 6:

                    Globals.DocObj.markuplist[curmarkup].fillcolor = setTransp(Globals.DocObj.markuplist[curmarkup].fillcolor, Globals.globaltransparency);
                    Globals.DocObj.markuplist[curmarkup].strokecolor = setTransp(Globals.DocObj.markuplist[curmarkup].strokecolor, 100);
                    Globals.DocObj.markuplist[curmarkup].transparency = Globals.globaltransparency;
                    break;
                case 7:
                    Globals.DocObj.markuplist[curmarkup].fillcolor = convertHex(Globals.markupfillcolor, Globals.DocObj.markuplist[curmarkup].transparency);
                    break;
                case 8:
                    Globals.DocObj.markuplist[curmarkup].textcolor = convertHex(Globals.markuptextcolor, Globals.DocObj.markuplist[curmarkup].transparency);
                    break;

            }

            drawmarkupAll(Globals.cntximg);
            DrawMarkupSelected(Globals.context);
        }
    }
}


export function getSelectedmarkup() {
    let selectedmarkup = {isempty : true};
    for (let curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        if (Globals.DocObj.markuplist[curmarkup].selected || Globals.DocObj.markuplist[curmarkup].selectedit ) {
            selectedmarkup = Globals.DocObj.markuplist[curmarkup];
        }
    }
    return selectedmarkup;
}


export function compareOverlay(fileurlbackground: any, fileurloverlay: any, mode: any){
    Globals.doCompare = true;
    Globals.compareMode = mode;
    for (let i = 0; i < Globals.OpenFiles.length; i++) {
        if (Globals.OpenFiles[i].Type == 'Compare') {
            Globals.OpenFiles.splice(i, 1);
        }
    }

    let OpenFileObject = {
        Name:getFileName(fileurlbackground),
        loaded:false,
        disableMenu: true,
        state:1
    };

    Globals.CompareFiles.push(OpenFileObject);

    OpenFileObject = {
        Name:getFileName(fileurloverlay),
        loaded:false,
        disableMenu: true,
        state:2
    };

    Globals.CompareFiles.push(OpenFileObject);

    if (RxCore_GUI_Download != undefined) {
        RxCore_GUI_Download.setDownload("show");
    }

    getFile(fileurlbackground);
    getFile(fileurloverlay);
}

// TODO:JS->TS:CHECK  // TODO:JS->TS:ADJUST // TODO:JS->TS:OPTIMIZE
export function getMarkupfromXML(xmldata: any){
    let MarkupFilePath = 0;
    let i = 0;

    const xmlDoc = $.parseXML(xmldata).documentElement;
    let fileVersion;
    let UserID;
    if (xmlDoc.getElementsByTagName('FileVersion') != null && xmlDoc.getElementsByTagName('FileVersion').length != 0) {
        // @ts-ignore // TODO:JS->TS:INFO
        fileVersion = xmlDoc.getElementsByTagName('FileVersion')[0].firstChild.nodeValue;
    }

    if (xmlDoc.getElementsByTagName('User') != null && xmlDoc.getElementsByTagName('User').length != 0) {
        UserID = xmlDoc.getElementsByTagName('User');
        let MarkupUserColor:any; // TODO:JS->TS:ADJUST type
        let MarkupUserLayer:any; // TODO:JS->TS:ADJUST type
        for (i = 0; i < UserID.length; i++) {
            // @ts-ignore // TODO:JS->TS:INFO
            const MarkupUserDispName:any = UserID[i].getElementsByTagName("Name")[0].firstChild.nodeValue;
            // @ts-ignore // TODO:JS->TS:INFO
            const MarkupUserID:any = UserID[i].getElementsByTagName("ID")[0].firstChild.nodeValue;

            if (UserID[i].getElementsByTagName("Layer")[0] != undefined) {
                // @ts-ignore // TODO:JS->TS:INFO
                MarkupUserLayer = UserID[i].getElementsByTagName("Layer")[0].firstChild.nodeValue;
            } else {
                MarkupUserLayer = Globals.markuplayer;
            }
            if (UserID[i].getElementsByTagName("Color")[0] != undefined) {
                // @ts-ignore // TODO:JS->TS:INFO
                MarkupUserColor = UserID[i].getElementsByTagName("Color")[0].firstChild.nodeValue;
            } else {
                MarkupUserColor = Globals.markupcolor;
            }

            if (Globals.Userlist[0].Signature == MarkupUserID) {
                //Userlist[0] = new Users(MarkupUserID,MarkupUserDispName,MarkupUserLayer,MarkupUserColor);
                //numUsers++;
            } else {
                Globals.Userlist[Globals.numUsers] = new Users(MarkupUserID, MarkupUserDispName, MarkupUserLayer, MarkupUserColor);
                Globals.numUsers++;
            }
        }
    } else {
        if (xmlDoc.getElementsByTagName('Name') != null) {
            let sign = xmlDoc.getElementsByTagName('Name');
            // @ts-ignore // TODO:JS->TS:INFO
            if (Globals.Userlist[0].Signature != sign[0].firstChild.nodeValue) {
                // @ts-ignore // TODO:JS->TS:INFO
                Globals.Userlist[Globals.numUsers] = new Users(sign[0].firstChild.nodeValue, sign[0].firstChild.nodeValue, Globals.markuplayer, Globals.markupcolor);
                Globals.numUsers++;
            }
        }
    }
    if (xmlDoc.getElementsByTagName('Entity') != null) {
        let markupentityobj = xmlDoc.getElementsByTagName('Entity');
        let xmlmarkupobj;
        for (i = 0; i < markupentityobj.length; i++) {
            // @ts-ignore // TODO:JS->TS:INFO
            let markupType:any = markupentityobj[i].getElementsByTagName("Type")[0].firstChild.nodeValue;
            // @ts-ignore // TODO:JS->TS:INFO
            let markupSubtype:any = markupentityobj[i].getElementsByTagName("Subtype")[0].firstChild.nodeValue;
            // @ts-ignore // TODO:JS->TS:INFO
            let markupAlternative:any = markupentityobj[i].getElementsByTagName("Alternative")[0].firstChild.nodeValue;
            // @ts-ignore // TODO:JS->TS:INFO
            let markupID = !markupentityobj[i].getAttribute('ID') ? null : markupentityobj[i].getAttribute('ID');
            markupType = parseInt(markupType);
            markupSubtype = parseInt(markupSubtype);
            markupAlternative = parseInt(markupAlternative);
            xmlmarkupobj = new MarkupObject(markupType, markupSubtype, markupAlternative);
            xmlmarkupobj.markupID = markupID;

            const bOK = xmlmarkupobj.SetfromXML(markupentityobj[i], fileVersion);
            if (bOK) {
                xmlmarkupobj.savemetolistLoad();
            }
        }
        /* Andriy call callback only once */

        if (xmlmarkupobj) xmlmarkupobj.notify(); // TODO:JS->TS:CHECK why only the last one?
        if (markupentityobj.length == 0) {
            if (RxCore_GUI_Markuplist != undefined) {
                RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist);
                /* Andriy */
                // RxCore_GUI_Markuplist.notify();
            }
        }
        drawmarkupAll(Globals.cntximg);
    }
}

export function MarkupUndo() {

    let found = false;
    let localmarkup = Globals.DocObj.markupundolist.pop();
    let undodeletobj;

    if (localmarkup != undefined) {
        let id = localmarkup.markupnumber;

        let curmarkup = 0;
        let curpoint = 0;

        for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
            if (Globals.DocObj.markuplist[curmarkup] != null) {
                if (Globals.DocObj.markuplist[curmarkup].markupnumber == id) {
                    Globals.DocObj.markuplist[curmarkup].PerformUndo(localmarkup);
                    found = true;
                }
            }
        }
        if (!found) {
            //DocObj.markuplist.push(localmarkup);
            id = localmarkup.markupnumber;
            const undoMarkupdeletobj = new MarkupObject(localmarkup.type, localmarkup.subtype, localmarkup.alternative);
            undoMarkupdeletobj.savemetolistLoad();

            //ft 08.08.2018 changed from separate index to direct array length

            //DocObj.markuplist[DocObj.nummarkups - 1].markupnumber = id;
            //DocObj.markuplist[DocObj.nummarkups - 1].PerformUndo(localmarkup);

            Globals.DocObj.markuplist[Globals.DocObj.markuplist.length - 1].markupnumber = id;
            Globals.DocObj.markuplist[Globals.DocObj.markuplist.length - 1].PerformUndo(localmarkup);
        }
    }
}

export function CopymarkupSelected() {
    let curmarkup = 0;

    if (typeof(Storage) !== "undefined") {
        localStorage.clear();
    }

    for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        if (Globals.DocObj.markuplist[curmarkup].selected == true || Globals.DocObj.markuplist[curmarkup].selectedit ) {
            if (Globals.bMultiselect){
                multiMarkupToLocalStorage(Globals.DocObj.markuplist[curmarkup]);
            }else{
                singleMarkupToLocalStorage(Globals.DocObj.markuplist[curmarkup]);
            }

            //MarkupToLocalStorage(Globals.DocObj.markuplist[curmarkup]);
        }
    }
}

export function singleMarkupToLocalStorage(MarkupObj:any){
    localStorage.clear();
    MarkupToLocalStorage(MarkupObj, false);
}

export function multiMarkupToLocalStorage(MarkupObj:any){
    MarkupToLocalStorage(MarkupObj, true);
}

export function MarkupToLocalStorage(MarkupObj:any, multi:boolean) {
    if (typeof(Storage) !== "undefined") {
        let postfix:any='';
        if (multi){
            postfix = MarkupObj.markupnumber;
            if (localStorage.getItem("MarkupPostfixlist") != null) {
                const postfixes = localStorage.MarkupPostfixlist;
                localStorage.setItem("MarkupPostfixlist", postfixes + "," + postfix);
            }else{
                localStorage.setItem("MarkupPostfixlist", postfix);
            }

        }else{
            postfix = '';
        }

        //localStorage.Type = MarkupObj.type;
        localStorage.setItem("Type" + postfix , MarkupObj.type);
        //localStorage.Subtype = MarkupObj.subtype;
        localStorage.setItem("Subtype" + postfix , MarkupObj.subtype);
        localStorage.setItem("Alternative" + postfix , MarkupObj.alternative);
        localStorage.setItem("Rotation" + postfix , MarkupObj.rotation);
        localStorage.setItem("fillcolor" + postfix , MarkupObj.fillcolor);
        localStorage.setItem("strokecolor" + postfix , MarkupObj.strokecolor);
        localStorage.setItem("textcolor" + postfix , MarkupObj.textcolor);
        localStorage.setItem("markercolor" + postfix , MarkupObj.markercolor);
        localStorage.setItem("Color" + postfix , MarkupObj.color);
        localStorage.setItem("FontName" + postfix , MarkupObj.font.fontName);
        localStorage.setItem("FontHeight" + postfix , MarkupObj.font.height);

        if(MarkupObj.leaderoffset != undefined){
            localStorage.setItem("LeaderOffset" + postfix , MarkupObj.leaderoffset);
        }

        if(MarkupObj.arrowlength != undefined){
            localStorage.setItem("Arrowlength" + postfix , MarkupObj.arrowlength);
        }

        //localStorage.Alternative = MarkupObj.alternative;
        //localStorage.Rotation = MarkupObj.rotation;
        //localStorage.fillcolor = MarkupObj.fillcolor;
        //localStorage.strokecolor = MarkupObj.strokecolor;
        //localStorage.textcolor = MarkupObj.textcolor;
        //localStorage.markercolor = MarkupObj.markercolor;
        //localStorage.Color = MarkupObj.color;
        //localStorage.FontName = MarkupObj.font.fontName;
        //localStorage.FontHeight = MarkupObj.font.height;
        if (MarkupObj.text == "") {
            //localStorage.Text = ".";
            localStorage.setItem("Text" + postfix , ".");
        } else {
            //localStorage.Text = MarkupObj.text;
            localStorage.setItem("Text" + postfix , MarkupObj.text);
        }
        if (localStorage.DimText == "") {
            //localStorage.DimText = ".";
            localStorage.setItem("DimText" + postfix , ".");
        } else {
            //localStorage.DimText = MarkupObj.dimtext;
            localStorage.setItem("DimText" + postfix , MarkupObj.dimtext);
        }

        //localStorage.TextWidth = MarkupObj.textwidth;
        localStorage.setItem("TextWidth" + postfix , MarkupObj.textwidth);

        if (MarkupObj.type == 12) {
            //localStorage.Stampsmalltheight = MarkupObj.stampsmalltheight;
            localStorage.setItem("Stampsmalltheight" + postfix , MarkupObj.stampsmalltheight);
        }

        if (MarkupObj.type == 11) {
            localStorage.setItem("image" + postfix , MarkupObj.image.src);
            //localStorage.image = MarkupObj.image.src;

        }

        localStorage.setItem("Scaling" + postfix , MarkupObj.scaling);
        //localStorage.Scaling = MarkupObj.scaling;

        //localStorage.Xoffset = MarkupObj.xoffset;
        localStorage.setItem("Xoffset" + postfix , MarkupObj.xoffset);

        //localStorage.Yoffset = MarkupObj.yoffset;
        localStorage.setItem("Yoffset" + postfix , MarkupObj.yoffset);

        localStorage.setItem("LineWidth" + postfix , MarkupObj.linewidth);
        //localStorage.LineWidth = MarkupObj.linewidth;

        if (MarkupObj.points.length > 0) {
            //localStorage.Points = JSON.stringify(MarkupObj.points);
            localStorage.setItem("Points" + postfix , JSON.stringify(MarkupObj.points));

        }
        if (MarkupObj.pointlist.length > 0) {
            localStorage.setItem("Pointlist" + postfix , JSON.stringify(MarkupObj.pointlist));
            //localStorage.Pointlist = JSON.stringify(MarkupObj.pointlist);

        }

        localStorage.setItem("Rect" + postfix , "x=" + MarkupObj.x + " y=" + MarkupObj.y + " w=" + MarkupObj.w + " h=" + MarkupObj.h);

        //localStorage.Rect = "x=" + MarkupObj.x + " y=" + MarkupObj.y + " w=" + MarkupObj.w + " h=" + MarkupObj.h;
    } else {
        // Sorry! No web storage support..
    }

}

export function MarkupFromLocalStorage() {
    if (typeof(Storage) !== "undefined") {
        let Postfixlist;
        let Postfixarray;
        if (localStorage.getItem("MarkupPostfixlist") != null) {
            Postfixlist = localStorage.MarkupPostfixlist;
            Postfixarray = Postfixlist.split(",");
        }else{
            Postfixarray = [''];
        }

        for(let pfixc = 0;pfixc < Postfixarray.length; pfixc++){
            const postfix = Postfixarray[pfixc];

            if (localStorage.getItem("Type" + postfix) != null) {
                const type = parseInt(''+localStorage.getItem("Type" + postfix)); // TODO:JS->TS:CHECK added ''+ to force conversion to string even if getItem returns null
                if (localStorage.getItem("Subtype" + postfix) != null) {
                    const subtype = parseInt(''+localStorage.getItem("Subtype" + postfix)); // TODO:JS->TS:CHECK added ''+ to force conversion to string even if getItem returns null

                    if (localStorage.getItem("Alternative" + postfix) != null) {
                        if (localStorage.getItem("Rect" + postfix) != null) {

                            const alternative = parseInt(''+localStorage.getItem("Alternative" + postfix));  // TODO:JS->TS:CHECK added ''+ to force conversion to string even if getItem returns null
                            const NewMarkupobj = new MarkupObject(type, subtype, alternative);

                            NewMarkupobj.pagenumber = Globals.DocObj.getcurPage();

                            NewMarkupobj.fillcolor = localStorage.getItem("fillcolor" + postfix);

                            NewMarkupobj.strokecolor = localStorage.getItem("strokecolor" + postfix);
                            NewMarkupobj.textcolor = localStorage.getItem("textcolor" + postfix);
                            NewMarkupobj.markercolor = localStorage.getItem("markercolor" + postfix);

                            NewMarkupobj.color = localStorage.getItem("Color" + postfix);

                            NewMarkupobj.dimtext = localStorage.getItem("DimText" + postfix);



                            NewMarkupobj.font.setFontname(localStorage.getItem("FontName" + postfix));
                            NewMarkupobj.font.setHeight(localStorage.getItem("FontHeight" + postfix));

                            //NewMarkupobj.textheight = localStorage.FontHeight;
                            if (type == 12) {
                                NewMarkupobj.stampsmalltheight = parseInt(''+localStorage.getItem("Stampsmalltheight" + postfix)); // TODO:JS->TS:CHECK added parseInt
                            }

                            if (type == 11) {
                                const createimage = new Image();
                                NewMarkupobj.markupcdataload(createimage, localStorage.getItem("image" + postfix));


                            }

                            if(localStorage.getItem("LeaderOffset" + postfix) != null){
                                NewMarkupobj.leaderoffset = parseFloat(''+localStorage.getItem("LeaderOffset" + postfix)); // TODO:JS->TS:CHECK added ''+ to force conversion to string even if getItem returns null
                            }

                            if(localStorage.getItem("Arrowlength" + postfix) != null){
                                NewMarkupobj.arrowlength = parseFloat(''+localStorage.getItem("Arrowlength" + postfix)); // TODO:JS->TS:CHECK added ''+ to force conversion to string even if getItem returns null
                            }


                            NewMarkupobj.text = ''+localStorage.getItem("Text" + postfix);  // TODO:JS->TS:CHECK added ''+ to force conversion to string even if getItem returns null

                            NewMarkupobj.dimtext = localStorage.getItem("DimText" + postfix);

                            NewMarkupobj.textwidth = parseFloat(''+localStorage.getItem("TextWidth" + postfix));  // TODO:JS->TS:CHECK added ''+ to force conversion to string even if getItem returns null

                            NewMarkupobj.scaling = parseFloat(''+localStorage.getItem("Scaling" + postfix));  // TODO:JS->TS:CHECK added ''+ to force conversion to string even if getItem returns null

                            NewMarkupobj.xoffset = parseFloat(''+localStorage.getItem("Xoffset" + postfix));  // TODO:JS->TS:CHECK added ''+ to force conversion to string even if getItem returns null

                            NewMarkupobj.yoffset = parseFloat(''+localStorage.getItem("Yoffset" + postfix));  // TODO:JS->TS:CHECK added ''+ to force conversion to string even if getItem returns null

                            NewMarkupobj.linewidth = parseInt(''+localStorage.getItem("LineWidth" + postfix));  // TODO:JS->TS:CHECK added ''+ to force conversion to string even if getItem returns null


                            const Rectlist = ''+localStorage.getItem("Rect" + postfix);  // TODO:JS->TS:CHECK added ''+ to force conversion to string even if getItem returns null

                            const Rectarray = Rectlist.split(" ");
                            const xval = Rectarray[0].split("=");
                            const yval = Rectarray[1].split("=");
                            const wval = Rectarray[2].split("=");
                            const hval = Rectarray[3].split("=");
                            NewMarkupobj.x = parseInt(xval[1]);
                            NewMarkupobj.y = parseInt(yval[1]);
                            NewMarkupobj.w = parseInt(wval[1]);
                            NewMarkupobj.h = parseInt(hval[1]);
                            if (NewMarkupobj.type == 3 || NewMarkupobj.type == 4 || NewMarkupobj.type == 5 || NewMarkupobj.type == 9 || NewMarkupobj.type == 10 || NewMarkupobj.type == 11 || NewMarkupobj.type == 12) {
                                NewMarkupobj.x += 10;
                                NewMarkupobj.y += 10;

                            } else {
                                NewMarkupobj.x += 10;
                                NewMarkupobj.y += 10;
                                NewMarkupobj.w += 10;
                                NewMarkupobj.h += 10;

                            }


                            let Pointlist;
                            if (localStorage.getItem("Points" + postfix) != null) {

                                Pointlist = ''+localStorage.getItem("Points" + postfix);  // TODO:JS->TS:CHECK added ''+ to force conversion to string even if getItem returns null
                                NewMarkupobj.points = JSON.parse(Pointlist);
                                //var content_array = JSON.parse(str);
                                //var pointarray = Pointlist.split(",");
                                for (let i = 0; i < NewMarkupobj.points.length - 1; i++) {
                                    NewMarkupobj.points[i].x += 10;
                                    NewMarkupobj.points[i].y += 10;
                                    //var point = pointarray[i];
                                    //var pointpair = point.split(" ");
                                    //var xp = pointpair[0].split("=");
                                    //var yp = pointpair[1].split("=");
                                    //NewMarkupobj.addpoint(parseInt(xp[1]),parseInt(yp[1]));
                                    //NewMarkupobj.addpoint(parseInt(xp[1]) + 10, parseInt(yp[1]) + 10);
                                    //+= "x=" + MarkupObj.points[i].x + " y=" + MarkupObj.points[i].y + ",";
                                }

                            }
                            if (localStorage.getItem("Pointlist" + postfix) != null) {
                                Pointlist = ''+localStorage.getItem("Pointlist" + postfix);  // TODO:JS->TS:CHECK added ''+ to force conversion to string even if getItem returns null
                                NewMarkupobj.pointlist = JSON.parse(Pointlist);
                            }


                            NewMarkupobj.savemetolistLoad();
                        }

                    }

                }

            }
        }


    } else {
        // Sorry! No web storage support..
    }

}

export function MarkupPrintSave() {
    let curmarkup = 0;
    let undoobj;
    Globals.markupprintlist = [];
    //markupprintlist = DocObj.markuplist.slice(0);
    for (curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        if (Globals.DocObj.markuplist[curmarkup] != null) {
            Globals.DocObj.markuplist[curmarkup].drawn = false;
            undoobj = new MarkupUndoObject(Globals.DocObj.markuplist[curmarkup].markupnumber);
            undoobj.SetUndoValues(Globals.DocObj.markuplist[curmarkup]);
            Globals.markupprintlist.push(undoobj);
        }
    }
}

export function moveToBack() {
    /* Andriy: it can be declared in for loop, no need to set to 0 twice */
    // var curmarkup = 0;
    let id = -1;

    for (let curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        if (Globals.DocObj.markuplist[curmarkup] != null) {
            if (!Globals.DocObj.markuplist[curmarkup].selected && !Globals.DocObj.markuplist[curmarkup].selectedit) { // TODO:JS->TS:CHECK this branch is empty

            } else {
                id = Globals.DocObj.markuplist[curmarkup].markupnumber;
                let tempmarkup = Globals.DocObj.markuplist[curmarkup];
                Globals.DocObj.markuplist[curmarkup] = Globals.DocObj.markuplist[0];
                Globals.DocObj.markuplist[0] = tempmarkup;
                MarkupSaveState(id);
                break;
            }

        }
    }

    if (RxCore_GUI_Markuplist != undefined) {
        RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist);
    }
    if (RxCore_GUI_pagethumbs != undefined) {
        RxCore_GUI_pagethumbs.setThumbnails(Globals.DocObj.thumbnails);
    }
    drawmarkupAll(Globals.cntximg);
    DrawMarkupSelected(Globals.context);
}



export function moveToFront() {
    /* Andriy: it can be declared in for loop, no need to set to 0 twice */
    // var curmarkup = 0;

    let id = -1;
    for (let curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        if (Globals.DocObj.markuplist[curmarkup] != null) {
            if (!Globals.DocObj.markuplist[curmarkup].selected && !Globals.DocObj.markuplist[curmarkup].selectedit) { // TODO:JS->TS:CHECK this branch is empty

            } else {
                id = Globals.DocObj.markuplist[curmarkup].markupnumber;
                MarkupSaveState(id);
                const tempmarkup = Globals.DocObj.markuplist[curmarkup];
                Globals.DocObj.markuplist[curmarkup] = Globals.DocObj.markuplist[Globals.DocObj.markuplist.length - 1];
                Globals.DocObj.markuplist[Globals.DocObj.markuplist.length - 1] = tempmarkup;

                break;
            }
        }
    }

    if (RxCore_GUI_Markuplist != undefined) {
        RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist);
    }
    if (RxCore_GUI_pagethumbs != undefined) {
        RxCore_GUI_pagethumbs.setThumbnails(Globals.DocObj.thumbnails);
    }

    drawmarkupAll(Globals.cntximg);
    DrawMarkupSelected(Globals.context);
}

export function getMarkupLayerColor(layer:any){
    let layerfound = false;
    let layerColor = '#FF0000';

    for (let i = 0; i < Globals.Layerlist.length; i++) {
        if (Globals.Layerlist[i].Layer == layer) {
            layerfound = true;
            layerColor = Globals.Layerlist[i].Color;

        }
    }
    return layerColor;
}

export function getMarkupLayerState(layer:any){
    let layerfound = false;
    let displaystate = true;

    for (let i = 0; i < Globals.Layerlist.length; i++) {
        if (Globals.Layerlist[i].Layer == layer) {
            layerfound = true;
            displaystate = Globals.Layerlist[i].display;

        }
    }
    return displaystate;
}



export function deleteUniqueMarkup(GUID:any){
    for (let curdoc = 0;curdoc < Globals.OpenFiles.length;curdoc++){
        for (let curmarkup = 0; curmarkup < Globals.OpenFiles[curdoc].markuplist.length; curmarkup++) {
            if (Globals.OpenFiles[curdoc].markuplist[curmarkup] != null) {
                if(Globals.OpenFiles[curdoc].markuplist[curmarkup].getUniqueID() == GUID){
                    MarkupSaveState(Globals.OpenFiles[curdoc].markuplist[curmarkup].markupnumber);
                    Globals.OpenFiles[curdoc].markuplist.splice(curmarkup,1);
                }
            }
        }

    }

}

export function findUniqueMarkup(GUID:any){
    let uniqueMarkup = {isempty : true};
    for (let curdoc = 0;curdoc < Globals.OpenFiles.length;curdoc++){
        for (let curmarkup = 0; curmarkup < Globals.OpenFiles[curdoc].markuplist.length; curmarkup++) {
            if (Globals.OpenFiles[curdoc].markuplist[curmarkup] != null) {
                if(Globals.OpenFiles[curdoc].markuplist[curmarkup].getUniqueID() == GUID){
                    uniqueMarkup = Globals.OpenFiles[curdoc].markuplist[curmarkup];
                }
            }
        }

    }
    return uniqueMarkup;

}


export function createCustomStamp(image: any, sname: any){
    const stampinfo = { type : 5, data : image.image, index : sname, width : image.width, height: image.height};
    if (RxCore_GUI_CustomStamps != undefined){
        RxCore_GUI_CustomStamps.onStampReceived(stampinfo);
    }
}

export function createCustomStamps(stampsobject:any){
/*var stampinfo = { type : 1, data : "1"};

if (RxCore_GUI_CustomStamps != undefined){
    RxCore_GUI_CustomStamps.onStampReceived(stampinfo);
}*/

    let stampinfo = {type : 2, data : "Custom Stamps" };

    if (RxCore_GUI_CustomStamps != undefined){
        RxCore_GUI_CustomStamps.onStampReceived(stampinfo);
    }

    stampinfo = {type : 3, data : stampsobject.numstamps};
    if (RxCore_GUI_CustomStamps != undefined){
        RxCore_GUI_CustomStamps.onStampReceived(stampinfo);
    }

    for (let i = 0; i < stampsobject.numstamps; i++){
        createCustomStamp(stampsobject.stamps[i],i);
    }
}

export function MarkupSaveStateGUID(GUID:any){
    for (let curdoc = 0;curdoc < Globals.OpenFiles.length;curdoc++){
        for (let curmarkup = 0; curmarkup < Globals.OpenFiles[curdoc].markuplist.length; curmarkup++) {
            if (Globals.OpenFiles[curdoc].markuplist[curmarkup] != null) {
                if(Globals.OpenFiles[curdoc].markuplist[curmarkup].getUniqueID() == GUID){
                    MarkupSaveState(Globals.OpenFiles[curdoc].markuplist[curmarkup].markupnumber);
                }
            }
        }
    }
}

export function modifyMarkup(GUID: any, markupxml:any){
    const xmlmarkupobj:any = findUniqueMarkup(GUID); // TODO:JS->TS:CHECK added any because property .alternative ( used a couple of lines below) is not formally declared
    if(xmlmarkupobj.isempty){
        return;
    }

    MarkupSaveStateGUID(GUID);

    const xmldoc = parseXML(markupxml);
    let fileVersion;
    if (xmldoc.getElementsByTagName('FileVersion') != null && xmldoc.getElementsByTagName('FileVersion').length != 0) {
        fileVersion = xmldoc.getElementsByTagName('FileVersion')[0].firstChild.nodeValue;
    }

    if (xmldoc.getElementsByTagName('Entity') != null) {
        const markupentityobj:any = xmldoc.getElementsByTagName('Entity');
        for (let i = 0; i < markupentityobj.length; i++) {
            //var markupType = markupentityobj[i].getElementsByTagName("Type")[0].firstChild.nodeValue;
            //var markupSubtype = markupentityobj[i].getElementsByTagName("Subtype")[0].firstChild.nodeValue;
            //if (markupentityobj[i].getElementsByTagName("Alternative")[0].firstChild.nodeValue != undefined)
            let markupAlternative = markupentityobj[i].getElementsByTagName("Alternative")[0].firstChild.nodeValue;
            markupAlternative = parseInt(markupAlternative);
            //var markupID = !markupentityobj[i].getAttribute('ID') ? null : markupentityobj[i].getAttribute('ID');
            //markupType = parseInt(markupType);
            //markupSubtype = parseInt(markupSubtype);
            //markupAlternative = parseInt(markupAlternative);
            //var xmlmarkupobj = new MarkupObject(markupType, markupSubtype, markupAlternative);
            //xmlmarkupobj.markupID = markupID;

            const bOK = xmlmarkupobj.SetfromXML(markupentityobj[i], fileVersion);
            if (bOK) {
                xmlmarkupobj.alternative = markupAlternative;
                //xmlmarkupobj.savemetolist(true);
            }
        }
        /* Andriy call callback only once */
        if (xmlmarkupobj) xmlmarkupobj.notify();

        if (markupentityobj.length == 0) {
            if (RxCore_GUI_Markuplist != undefined) {
                RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist);
                /* Andriy */
                // RxCore_GUI_Markuplist.notify();
            }
        }
        drawmarkupAll(Globals.cntximg);
    }
} // JS->TS:INFO end modifyMarkup

export function addMarkup(markupxml:any){
    const xmldoc = parseXML(markupxml);
    let fileVersion;
    let xmlmarkupobj;
    if (xmldoc.getElementsByTagName('FileVersion') != null && xmldoc.getElementsByTagName('FileVersion').length != 0) {
        fileVersion = xmldoc.getElementsByTagName('FileVersion')[0].firstChild.nodeValue;
    }

    if (xmldoc.getElementsByTagName('Entity') != null) {
        let markupentityobj = xmldoc.getElementsByTagName('Entity');
        for (let i = 0; i < markupentityobj.length; i++) {
            let markupType = markupentityobj[i].getElementsByTagName("Type")[0].firstChild.nodeValue;
            let markupSubtype = markupentityobj[i].getElementsByTagName("Subtype")[0].firstChild.nodeValue;
            let markupAlternative = markupentityobj[i].getElementsByTagName("Alternative")[0].firstChild.nodeValue;
            let markupID = !markupentityobj[i].getAttribute('ID') ? null : markupentityobj[i].getAttribute('ID');
            markupType = parseInt(markupType);
            markupSubtype = parseInt(markupSubtype);
            markupAlternative = parseInt(markupAlternative);
            xmlmarkupobj = new MarkupObject(markupType, markupSubtype, markupAlternative);
            xmlmarkupobj.markupID = markupID;
            const bOK = xmlmarkupobj.SetfromXML(markupentityobj[i], fileVersion);
            if (bOK) {
                xmlmarkupobj.savemetolistLoad();

            }

            if (markupentityobj[i].getElementsByTagName("Signature")[0].firstChild.nodeValue != undefined){
                const sign = markupentityobj[i].getElementsByTagName("Signature")[0].firstChild.nodeValue;
                let dispname;
                if (markupentityobj[i].getElementsByTagName("Name")[0].firstChild.nodeValue != undefined){
                    dispname = markupentityobj[i].getElementsByTagName("Name")[0].firstChild.nodeValue;
                }

                if (sign && dispname){
                    if (GetDisplayName(sign) == 'default user'){
                        Globals.numUsers = Globals.Userlist.length;
                        const layerColor = getMarkupLayerColor(xmlmarkupobj.layer)
                        Globals.Userlist[Globals.numUsers] = new Users(sign, dispname, xmlmarkupobj.layer, layerColor);
                        Globals.numUsers = Globals.Userlist.length;
                    }
                }
            }
        }
        /* Andriy call callback only once */

        if (xmlmarkupobj) xmlmarkupobj.notify();

        if (markupentityobj.length == 0) {
            if (RxCore_GUI_Markuplist != undefined) {
                RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist);
                /* Andriy */
                // RxCore_GUI_Markuplist.notify();
            }
        }

        /*if (RxCore_GUI_Users != undefined) {
            RxCore_GUI_Users.setUserlist(Userlist);
        }*/

        /*if (Rxcore_GUI_fileLoadComplete != undefined) {
            Rxcore_GUI_fileLoadComplete.loadComplete(MarkupFile);
        }*/
        drawmarkupAll(Globals.cntximg);
    }

} // JS->TS:INFO end addMarkup


export function deleteMarkupbyGUID(GUID:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }

    deleteUniqueMarkup(GUID);

    drawmarkupAll(Globals.cntximg);
    DrawMarkupSelected(Globals.context);
}