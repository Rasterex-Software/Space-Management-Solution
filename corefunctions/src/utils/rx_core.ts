// TODO:JS->TS:CHECK review the methods/objects exported and decide if they should be organised some other way, in other files
import * as THREE from 'three';

import {
    Globals,
    DeactivateAll,
    CloseCompare,
    getUnitlength,

    set_tool,
    draw_image,

    unselecteditmarkupall,
    unselelectallmarkup,
    sendMarkup,
    drawmarkupAll,
    hidemarkupAll,
    RxCore_GUI_Users,
    RxCore_GUI_State,
    RxCore_GUI_3DWalkthrough,
    RxCore_GUI_Download,
    Rxcore_GUI_fileLoadComplete,
    RxCore_GUI_CompareDiag,

    Users,

    CompareObject,
    MarkupObject,
    MousePosdrwext,
    RxCore_GUI_TextInput,
    Rectangle,

    DrawMarkupSelected,
    RxCore_GUI_Markuplist,
    RxCore_GUI_Consolidate,
    RxCore_GUI_MarkupLayers,
    RxCore_GUI_FileInfo,
    RxCore_GUI_Markup,
    RxCore_GUI_pagethumbs,
    RxCore_GUI_Notediag,
    RxCore_GUI_Textdiag,
    RxCore_GUI_printpage,
    RxCore_GUI_printCompare,
    RxCore_GUI_markupParamsError,
    createxmlmarkup,
    getMarkup,
    ev_canvas,
    deletemarkup,
    GetDisplayName,
    img_update,
    getUnitArea,
    unselectmarkup,
    getHatch,
    printCanvas,
    getScreenDim,

    getNumSymblibs,
    selectSymblib,
    selectSymbname,
    getnumSymbols,
    getSymbolName,
    getSymbolPNGData,

    regEvents,
    convertHex,
    rgbToHex,
    ChangeMarkupSelected,
    ChangeMarkupByindx,
    getSelectedmarkup,
    getFile,
    getFileCustom,
    getFilePages,
    compareOverlay,
    getMarkupfromXML,
    getxmlurl,
    getxmlurlEx,
    MarkupUndo,
    MarkupToLocalStorage,
    MarkupFromLocalStorage,
    CopymarkupSelected,
    MarkupPrintSave,
    moveToFront,
    moveToBack,
    belowlimitExtent,
    post3DImageData,
    exportFile,
    PDExportnew,
    getUserInfo,
    getTextdim,
    set3DToolType,
    GetPageObject,
    GetPaperHeight,
    GetPaperWidth,
    printfocus

} from '../internal';

class RxCore_helper_obj {
    public getUnitLabel() {
        return Globals.Unitlabel;
    }

    public getAreaUnitLabel() {
        return Globals.AreaUnitlabel;
    }

    public getLength(length:number) {
        let res;
        if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
            res = getUnitlength(length / Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector);
        } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
            res = getUnitlength(length / (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf));
        } else {
            res = getUnitlength(length / Globals.DocObj.pages[Globals.DocObj.currentpage].dscale);
        }
        return res;
    }
}

export var RxCore_helper = new RxCore_helper_obj();

export function RxCore_default() {
    if (!Globals.documentopen) {
        return;
    }

    if(Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml){
        //can't use this with 3D
        return;
    }

    set_tool('markupedit', {});
}

export function RxCore_Closedocument(index?:any) { // TODO:JS-TS:CHECK this method is sometimes called without a param. Added optional param. Consider changing to number and using -1 as default
    let documentObject = Globals.OpenFiles[index] || Globals.DocObj;
    let fileindex;

    if (!Globals.documentopen) {
        return false;
    }

    fileindex = documentObject.fileindex;

    /*if(CompareObj != undefined && documentcompare){
     CloseCompare();
     return;
     }*/

    if(Globals.DocObj){
        if (documentObject.bMarkupchanged && !Globals.readonlymode) {
            if (Globals.bMarkupSavecheck){
                if (confirm('Save Markup?')) {
                    sendMarkup(Globals.xmlurlmarkupsave, Globals.signature, Globals.DisplayName);
                } else {
                    //return;
                    //just close
               }
            }
        }
    }
    if (documentObject === Globals.DocObj) {
        Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
        Globals.cntximg.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
        Globals.contexto.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
    }

    //CompareObj.Close();
    /*for (var i=0;i< OpenFiles.length;i++){
     if(OpenFiles[i].Type == 'Compare'){
     OpenFiles.splice(i,1);
     }
     }*/

    if (Globals.OpenFiles[Globals.OpenFiles.length - 1].Type == 'Compare') {
        CloseCompare();
    } else {
        documentObject.Close();
        if (documentObject === Globals.DocObj) {
            documentObject = Globals.DocObj = null;
        }
        Globals.OpenFiles.splice(fileindex, 1);

        //var dindex = DocObj.fileindex;
        //DocObj = {};
        //DocObj = null;
        //OpenFiles.splice(dindex, 1);
        //OpenFiles.pop();
    }

    if(Globals.DocObj){
        Globals.DocObj.bMarkupchanged = false;
    }

    Globals.bUsemarkupbyref = false;
    Globals.bUsemarkupbyrefEx = false;

    /*if (Viewer3D != null){
     Viewer3D = null;
     }*/
    /*contexto = canvaso.getContext('2d');
     if (!contexto) {
     alert('Error: failed to getContext!');
     return;
     }*/

    //var szstyle = "width: 200px; height: " + canvasoheight + "px; position:relative; top:-100px; left:15px"
    //setContentThumb("<p>No pages open</p>");
    //ThumbnailpagesContainer.innerHTML = "<p>No pages open</p>";
    //ThumbnailpagesContainer.Close();
    //LayersContainer.setEmpty();
    //BlocksContainer.setEmpty();
    //LayersContainer.innerHTML = "<table><tr><td>Name</td><td>Color</td><td>State</td></tr></table>";
    //BlocksContainer.innerHTML = "<table><tr><td>Name</td><td>State</td></tr></table>";
    if (Globals.OpenFiles.length < 1) {
        Globals.documentopen = false;
        //DocObj.markuploaded = false;
        Globals.imagewidth = Globals.splashimage.width;
        Globals.imageheight = Globals.splashimage.height;

        Globals.imagewidth = Globals.splashimage.naturalWidth;
        Globals.imageheight = Globals.splashimage.naturalHeight;

        const yscale = Globals.canvasoheight / Globals.imageheight;
        const xscale = Globals.canvasowidth / Globals.imagewidth;
        const dscale = Math.min(xscale, yscale);

        const dx = (Globals.canvasowidth - (Globals.imagewidth * dscale)) / 2;
        const dy = (Globals.canvasoheight - (Globals.imageheight * dscale)) / 2;
        Globals.numUsers = 0;
        Globals.Userlist = [];
        Globals.Userlist[0] = new Users(Globals.signature, Globals.DisplayName, Globals.markuplayer, Globals.markupcolor);
        Globals.numUsers++;
        if (RxCore_GUI_Users != undefined) {
            RxCore_GUI_Users.setUserlist(Globals.Userlist);
        }
        draw_image(Globals.splashimage, dx, dy, dscale);
        set_tool('markupedit', {});

        const stateobj = {
            iscompare:false,
            numOpenFiles:Globals.OpenFiles.length,
            isPDF:false,
            is3D:false,
            is2D:false,
            numpages:0,
            currentpage:0
        };
        if (RxCore_GUI_State != undefined) {
            RxCore_GUI_State.setGUIState(stateobj);
        }
    } else {
        if (Globals.OpenFiles[Globals.OpenFiles.length - 1].Type == 'Compare') {
            Globals.CompareObj = Globals.OpenFiles[Globals.OpenFiles.length - 1];
            DeactivateAll();
            Globals.CompareObj.SetActive();
        } else {
            if (!Globals.DocObj) {
                Globals.DocObj = Globals.OpenFiles[Globals.OpenFiles.length - 1];
            }
            DeactivateAll();
            Globals.DocObj.SetActive();
        }
    }
    // Rebuild fileindex
    for (let i = 0; i < Globals.OpenFiles.length; i++) {
        Globals.OpenFiles[i].fileindex = i;
    }
    return true;
}

export function RxCore_3DOrbit() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        //only reset camera if current tool is walkthrough
        if (Globals.tool == undefined) {
            set_tool('orbitControl', {});
            //tool = new tools['orbitControl']();
            Globals.DocObj.curcontrol3D = 'orbitControl';
        }
        if (Globals.tool.name == 'Walkthrough3D') {
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.enabled = false;
            let camerax = 0;
            let cameray = 0;  // *= 2; // JS->TS:INFO initialize with 0 instead of multiply with 2
            let cameraz = 0;
            let format = Globals.DocObj.Format.substring(0, 3);
            if (format == 'IFC') {
                camerax = (Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.w / 2) * Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scale;
                cameray = -(Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.h) * Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scale;
                cameraz = (Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.d / 2) * Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scale;
                camerax = 0;
                cameray *= 2;
                cameraz = 0;
                Globals.DocObj.pages[Globals.DocObj.currentpage].camera.up.set(0, 0, 1);
                //DocObj.pages[DocObj.currentpage].camera.rotation.set(90 * Math.PI / 180, 0, 0);
            } else {
                camerax = (Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.w / 2) * Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scale;
                cameray = (Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.h / 2) * Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scale;
                cameraz = (Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.d) * Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scale;
                camerax = 0;
                cameray = 0;
                cameraz *= 2;
                Globals.DocObj.pages[Globals.DocObj.currentpage].camera.up.set(0, 1, 0);
                //DocObj.pages[DocObj.currentpage].camera.rotation.set(0, 90 * Math.PI / 180, 0);
            }
            Globals.DocObj.pages[Globals.DocObj.currentpage].camera.position.set(camerax, cameray, cameraz);
            Globals.DocObj.pages[Globals.DocObj.currentpage].camera.lookAt(new THREE.Vector3(0,0,0));

        }
        if (RxCore_GUI_3DWalkthrough != undefined) {
            RxCore_GUI_3DWalkthrough.setWalkthroughGUI(false);
            //$('div.wheelPanel').css('visibility', 'hidden');
        }
        set_tool('orbitControl', {});
        //tool = new tools['orbitControl']();
        Globals.DocObj.curcontrol3D = 'orbitControl';
    }
}

export function RxCore_3DWalkthrough(selected:any) {
    if (!Globals.documentopen) {
        return;
    }

    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        if (selected) {
            if (RxCore_GUI_3DWalkthrough != undefined) {
                RxCore_GUI_3DWalkthrough.setWalkthroughGUI(true);
                //$('div.wheelPanel').css('visibility', 'visible');
            }

            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.reset();
            set_tool('Walkthrough3D', {});
            //tool = new tools['Walkthrough3D']();

            let format = Globals.DocObj.Format.substring(0, 3);
            let camerax = 0;
            let cameray = 0;
            let cameraz = 0;
            if (format == 'IFC') {
                camerax = (Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.w / 2) * Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scale;
                cameray = -(Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.h) * Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scale;
                cameraz = (Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.d / 2) * Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scale;
                camerax = 0; // TODO:JS->TS:CHECK check why this is overwritten with 0 and comment out or remove the computation above
                //cameray *= 2;
                cameraz = 0; // TODO:JS->TS:CHECK check why this is overwritten with 0 and comment out or remove the computation above

                Globals.DocObj.pages[Globals.DocObj.currentpage].camera.up.set(0, 0, 1);
                //DocObj.pages[DocObj.currentpage].camera.rotation.set(90 * Math.PI / 180, 0, 0);
            } else {
                camerax = (Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.w / 2) * Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scale;
                cameray = (Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.h / 2) * Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scale;
                cameraz = (Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.d) * Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scale;

                camerax = 0;
                cameray = 0;
                //cameraz = 0;

                Globals.DocObj.pages[Globals.DocObj.currentpage].camera.up.set(0, 1, 0);
                //DocObj.pages[DocObj.currentpage].camera.rotation.set(0, 90 * Math.PI / 180, 0);
            }
            Globals.DocObj.pages[Globals.DocObj.currentpage].camera.position.set(camerax, cameray, cameraz);
            Globals.DocObj.pages[Globals.DocObj.currentpage].camera.lookAt(new THREE.Vector3(0,0,0));
            Globals.DocObj.curcontrol3D = 'Walkthrough3D';
        } else {
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.firstxyrecieved = false;
            RxCore_3DOrbit();
        }
    }
}


export function comparecheck(fileName:any) {
    let compareReady = true;

    for (let i = 0; i < Globals.CompareFiles.length; i++) {
        if (fileName == Globals.CompareFiles[i].Name) {
            Globals.CompareFiles[i].loaded = true;
        }
        if (compareReady) {
            compareReady = Globals.CompareFiles[i].loaded;
        }
    }
    if (compareReady) {
        RxCore_GetOpenFiles();
        Globals.doCompare = false;
        Globals.CompareFiles = [];
        RxCore_Compare(true);
    }
}


export function RxCore_GetOpenFiles() {
    /*
     state
     0 = unused;
     1 = background;  //
     2 = overlay;
     */
    let fileExist = false;
    let OpenFileObject;
    let isImage;
    for (let i = 0; i < Globals.OpenFiles.length; i++) {
        isImage = (!Globals.OpenFiles[i].pages[0].DocRef.pages[Globals.OpenFiles[i].pages[0].DocRef.currentpage].usepdfjs
            && !Globals.OpenFiles[i].pages[0].DocRef.pages[Globals.OpenFiles[i].pages[0].DocRef.currentpage].usevector3Dxml
            && !Globals.OpenFiles[i].pages[0].DocRef.pages[Globals.OpenFiles[i].pages[0].DocRef.currentpage].usevectorxml);

        if (Globals.OpenFiles[i].Type == 'Compare') {
            OpenFileObject = {
                index:Globals.OpenFiles[i].pages[0].DocRef.fileindex,
                Name:Globals.OpenFiles[i].pages[0].DocRef.FileName,
                Type:Globals.OpenFiles[i].pages[0].DocRef.Type,
                Is2D:Globals.OpenFiles[i].pages[0].DocRef.pages[Globals.OpenFiles[i].pages[0].DocRef.currentpage].usevectorxml,
                isImage : isImage,
                isPDF : Globals.OpenFiles[i].pages[0].DocRef.pages[Globals.OpenFiles[i].pages[0].DocRef.currentpage].usepdfjs,
                state:1
            };
            Globals.OpenfileNames.push(OpenFileObject);
            isImage = (!Globals.OpenFiles[i].pages[0].DocRef.pages[Globals.OpenFiles[i].pages[0].DocRef.currentpage].usepdfjs
                && !Globals.OpenFiles[i].pages[0].DocRef.pages[Globals.OpenFiles[i].pages[0].DocRef.currentpage].usevector3Dxml
                && !Globals.OpenFiles[i].pages[0].DocRef.pages[Globals.OpenFiles[i].pages[0].DocRef.currentpage].usevectorxml);

            OpenFileObject = {
                index:Globals.OpenFiles[i].pages[1].DocRef.fileindex,
                Name:Globals.OpenFiles[i].pages[1].DocRef.FileName,
                Type:Globals.OpenFiles[i].pages[1].DocRef.Type,
                Is2D:Globals.OpenFiles[i].pages[1].DocRef.pages[Globals.OpenFiles[i].pages[1].DocRef.currentpage].usevectorxml,
                isImage : isImage,
                isPDF : Globals.OpenFiles[i].pages[0].DocRef.pages[Globals.OpenFiles[i].pages[0].DocRef.currentpage].usepdfjs,
                state:2
            };
            Globals.OpenfileNames.push(OpenFileObject);
        } else {
            let statecmp = 0;
            for (let j = 0; j < Globals.CompareFiles.length; j++) {
                if (Globals.OpenFiles[i].FileName == Globals.CompareFiles[j].Name) {
                    statecmp = Globals.CompareFiles[j].state;
                }
            }
            isImage = (!Globals.OpenFiles[i].pages[Globals.OpenFiles[i].currentpage].usepdfjs
                && !Globals.OpenFiles[i].pages[Globals.OpenFiles[i].currentpage].usevector3Dxml
                && !Globals.OpenFiles[i].pages[Globals.OpenFiles[i].currentpage].usevectorxml);

            OpenFileObject = {
                index:Globals.OpenFiles[i].fileindex,
                Name:Globals.OpenFiles[i].FileName,
                Type:Globals.OpenFiles[i].Type,
                Is2D:Globals.OpenFiles[i].pages[Globals.OpenFiles[i].currentpage].usevectorxml,
                isImage : isImage,
                isPDF : Globals.OpenFiles[i].pages[0].DocRef.pages[Globals.OpenFiles[i].pages[0].DocRef.currentpage].usepdfjs,
                state:statecmp
            };

            for (let k = 0; k < Globals.OpenfileNames.length; k++) {
                if (OpenFileObject.index == Globals.OpenfileNames[k].index) {
                    fileExist = true;
                }
            }
            if (!fileExist) {
                Globals.OpenfileNames.push(OpenFileObject);
                fileExist = false;
            }
        }
    }
    return Globals.OpenfileNames;
}

export function RxCore_Overlay(okcancel:any){
    CreateCompareOverlay(okcancel, 1);
}

export function RxCore_Compare(okcancel:any) {
    CreateCompareOverlay(okcancel, 0);
    //DocObj.PageDown();
}

export function CreateCompareOverlay(okcancel:any, mode:any) {
    let bindx = -1;
    let oindx = -1;
    if(Globals.documentcompare){
        return;
    }
    let backgroundFileName;
    let backgroundindex;
    let overlayFileName;
    let overlayindex;
    if (Globals.OpenfileNames.length > 1 && okcancel) {
        for (let i = 0; i < Globals.OpenfileNames.length; i++) {
            if (Globals.OpenfileNames[i].state == 1) {
                backgroundFileName = Globals.OpenfileNames[i].Name;
                backgroundindex = Globals.OpenfileNames[i].index;
            }
            if (Globals.OpenfileNames[i].state == 2) {
                overlayFileName = Globals.OpenfileNames[i].Name;
                overlayindex = Globals.OpenfileNames[i].index;
            }
        }
        for (let i = 0; i < Globals.OpenFiles.length; i++) {
            if (Globals.OpenFiles[i].fileindex == backgroundindex) {
                bindx = i;
                Globals.OpenFiles[i].disableMenu = true;
            }
            if (Globals.OpenFiles[i].fileindex == overlayindex) {

                oindx = i;
                Globals.OpenFiles[i].disableMenu = true;
            }

        }
        if (bindx != -1 && oindx != -1 && bindx != oindx) {
            Globals.DocObj = Globals.OpenFiles[oindx];
            DeactivateAll();
            Globals.DocObj.SetActive();
            RxCore_HideMarkup();
            Globals.CompareObj = new CompareObject(Globals.OpenFiles[bindx].pages[Globals.OpenFiles[bindx].currentpage], Globals.OpenFiles[oindx].pages[Globals.OpenFiles[oindx].currentpage]);

            Globals.OpenFiles.push(Globals.CompareObj);
            Globals.CompareObj.fileindex = Globals.OpenFiles.length - 1;

            Globals.documentcompare = true;
            //DocObj = OpenFiles[OpenFiles.length-2];
            //DocObj.currentpage = 0;
            Globals.CompareObj.compareMode = mode;
            Globals.CompareObj.invertimages();
            Globals.CompareObj.renderPDFscale();
            Globals.CompareObj.scaleToBackground(true);
            Globals.CompareObj.draw_compare(true);

            const stateobj = {
                iscompare:Globals.documentcompare,
                numOpenFiles:Globals.OpenFiles.length,
                isPDF:Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs,
                is3D:Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml,
                is2D:Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml,
                numpages:Globals.DocObj.pages.length,
                currentpage:Globals.DocObj.getcurPage()
            };
            if (RxCore_GUI_State != undefined) {
                RxCore_GUI_State.setGUIState(stateobj);
            }
            if (RxCore_GUI_Download != undefined) {
                RxCore_GUI_Download.setDownload("hide");
            }
            if(Rxcore_GUI_fileLoadComplete != undefined){
                Rxcore_GUI_fileLoadComplete.loadComplete('compare');
            }
            if(RxCore_GUI_CompareDiag != undefined){
                RxCore_GUI_CompareDiag.CompareDialog();
            }
            set_tool('markupedit', {});

            /*if (OpenFiles[bindx].pages[0].usevectorxml && OpenFiles[oindx].pages[0].usevectorxml) {

            }*/
        }
    } else {
        Globals.OpenfileNames = [];
    }
    //DocObj.PageDown();
}


export function RxCore_HideMarkup() {
    if (!Globals.documentopen) {
        return;
    }

    unselelectallmarkup();
    unselecteditmarkupall();
    if (Globals.DocObj.Drawmarkup) {
        Globals.DocObj.Drawmarkup = false;
        hidemarkupAll(false);
        drawmarkupAll(Globals.cntximg);
        Globals.DocObj.bMarkupLocked = true;
    } else {
        Globals.DocObj.Drawmarkup = true;
        hidemarkupAll(true);
        drawmarkupAll(Globals.cntximg);
        Globals.DocObj.bMarkupLocked = false;
    }
}

export function RxCore_setActiveFile(indx: any){
    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
    Globals.cntximg.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

    if(Globals.DocObj){
        Globals.DocObj.enableTextSelect(false);
    }


    if (Globals.OpenFiles.length >= 1 && Globals.OpenFiles[indx] != undefined) {

        if (Globals.OpenFiles[indx].Type == 'Compare') {
            Globals.CompareObj = Globals.OpenFiles[indx];
            for (let i = 0; i < Globals.OpenFiles.length; i++) {
                if (Globals.OpenFiles[i].Type !== 'Compare' && Globals.OpenFiles[i].pages.length) {
                    for (let j = 0; j < Globals.OpenFiles[i].pages.length; j++) {
                        Globals.OpenFiles[i].pages[j].usedincomposite = true;
                    }
                }

            }
            DeactivateAll();
            Globals.CompareObj.SetActive();

        } else{
            Globals.bAnimateready = true;
            Globals.DocObj = Globals.OpenFiles[indx];
            if (Globals.bPDFtemprender && !Globals.DocObj.pdfDoc) {
                Globals.bPDFtemprender = false;
            }
            if (Globals.DocObj.pages && Globals.DocObj.pages.length) {
                Globals.DocObj.pages[0].usedincomposite = false;
            }

            if (!Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml){
                if (RxCore_GUI_3DWalkthrough != undefined) {
                    RxCore_GUI_3DWalkthrough.setWalkthroughGUI(false);
                    //$('div.wheelPanel').css('visibility', 'hidden');
                }
            }


            DeactivateAll();
            Globals.DocObj.SetActive();

        }

    }

}

export function RxCore_CreateTextRect(x:any, y:any, w:any, h:any,text:any){

    const sizePos = {
        x : x + w,
        y : y + h
    };

    const startpos = {
        x : x,
        y : y
    };

    const bWithin = MousePosdrwext(startpos);
    if (!bWithin && Globals.bLimMarkupExtent) {
        return;
    }

    // JS->TS:INFO duplicated lines
    // const bWithin = MousePosdrwext(sizePos);
    // if (!bWithin && Globals.bLimMarkupExtent) {
    //     return;
    // }

    const textmarkupobj = new MarkupObject(9, 1, 0);

    textmarkupobj.x = x;
    textmarkupobj.y = y;

    switch(Globals.DocObj.pages[Globals.DocObj.currentpage].drotation){
        case 0:
            textmarkupobj.w = w;
            textmarkupobj.h = h;

            break;
        case 90:
            textmarkupobj.w = w;
            textmarkupobj.h = h;

            break;
        case 180:
            textmarkupobj.w = w;
            textmarkupobj.h = h;

            break;
        case 270:
            textmarkupobj.w = w;
            textmarkupobj.h = h;

            break;
    }


    textmarkupobj.pagerotation = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation;
    textmarkupobj.pagenumber = Globals.DocObj.getcurPage();

    textmarkupobj.font.setFontname(Globals.defaultFont.fontName);
    textmarkupobj.font.setHeight(Globals.defaultFont.height);
    textmarkupobj.font.setBold(Globals.defaultFont.bold);
    textmarkupobj.font.setItalic(Globals.defaultFont.italic);

    //textmarkupobj.font = defaultFont;
    textmarkupobj.fillcolor = "rgba(255,255,255, 0.9)";

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
    textmarkupobj.editaction = 0;
    textmarkupobj.selectedit = true;
    textmarkupobj.selected = false;
    textmarkupobj.text = text;

    //textmarkupobj.rotation = -(DocObj.pages[DocObj.currentpage].drotation * (Math.PI / 180));
    textmarkupobj.savemetolistDraw();

    Globals.DocObj.selectedmarkup.id = Globals.DocObj.getmarkupbynumber(textmarkupobj.markupnumber);
    Globals.DocObj.selectedmarkup.edit = true;
    Globals.DocObj.selectedmarkup.selected = true;
}

export function RxCore_hideTextInput() {
    if (RxCore_GUI_TextInput != undefined) {
        if(Globals.DocObj && Globals.DocObj.selectedmarkup && Globals.DocObj.selectedmarkup.edit){
            RxCore_GUI_TextInput.operation.edit = false;
            RxCore_GUI_TextInput.operation.start = false;
            RxCore_GUI_TextInput.operation.create = false;
            RxCore_GUI_TextInput.operation.save = true;

            const rect = Globals.canvas.getBoundingClientRect();
            const xrect  = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].rotatedrect.x + rect.left;
            const yrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].rotatedrect.y + rect.top;

            //var xrect  = DocObj.markuplist[DocObj.selectedmarkup.id].xscaled + rect.left;
            //var yrect = DocObj.markuplist[DocObj.selectedmarkup.id].yscaled + rect.top;

            const wrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].wscaled;
            const hrect = Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].hscaled;

            const txtrect:any = new Rectangle(xrect,yrect,wrect,hrect);
            txtrect.rotation = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation;  // TODO:JS->TS:CHECK property rotation does not exist on Rectangle
            RxCore_GUI_TextInput.setTextInput(txtrect);


            /*var xrect  = DocObj.markuplist[DocObj.selectedmarkup.id].xscaled + rect.left;
            var yrect = DocObj.markuplist[DocObj.selectedmarkup.id].yscaled + rect.top;
            var wrect = DocObj.markuplist[DocObj.selectedmarkup.id].wscaled;
            var hrect = DocObj.markuplist[DocObj.selectedmarkup.id].hscaled;
            var txtrect = new Rectangle(xrect,yrect,wrect,hrect);
            RxCore_GUI_TextInput.setTextInput(txtrect);*/

            Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].selectedit = false;
            Globals.DocObj.markuplist[Globals.DocObj.selectedmarkup.id].selected = false;

            Globals.DocObj.selectedmarkup.edit = false;
        }
    }
}

export function RxCore_PagePos(x:any,y:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        return;
    }

    Globals.DocObj.pages[Globals.DocObj.currentpage].pan_page_pos(x, y);
}



export function RxCore_getSymbolLibNum(){
    getNumSymblibs();
}

export function RxCore_selectSymblib(num:any){
    selectSymblib(num);
}

export function RxCore_selectSymbName(num:any){
    selectSymbname(num);
}

export function RxCore_getnumSymbols(num:any){
    getnumSymbols(num);
}

export function RxCore_getSymbolName(num:any, sname:any){
    getSymbolName(num,sname);
}

export function RxCore_getSymbolLibPNGData(num:any, sname:any){
    getSymbolPNGData(num,sname);
}

export function RxCore_ConsolidatedOnly(onOff:any){
    if (!Globals.documentopen) {
        return;
    }
    for (let curmarkup = 0; curmarkup < Globals.DocObj.markuplist.length; curmarkup++) {
        //var signdisplay = getSignState(DocObj.markuplist[curmarkup].signature);
        if (!Globals.DocObj.markuplist[curmarkup].consolidated) {
            Globals.DocObj.markuplist[curmarkup].display = onOff;
        }
    }
    drawmarkupAll(Globals.cntximg);
    DrawMarkupSelected(Globals.context);
}

export function RxCore_SetThumbnailctx(ctx:any,index:any){
    if (!Globals.documentopen) {
        return;
    }
    Globals.DocObj.pages[index].thumbctx = ctx;
}

export function RxCore_AbortPDFload(ok:any){
    Globals.bAbortPageload = ok;
    RxCore_Closedocument();
}

export function RxCore_AppendCustomBlockAttribute(blockid:any, name:any, value:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.documentcompare) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].appendCustomBlockAttribute(blockid , name, value);
    }
}

export function RxCore_setBlockColor(blockid:any, Color:any, override:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.documentcompare) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].setBlockColor(blockid , Color, override);
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].set3DBlockColor(blockid , Color, override);
    }
}

export function RxCore_setCompareColors(bgcolor:any, fgcolor:any){
    Globals.overlayBGColor = bgcolor;
    Globals.overlayFGColor = fgcolor;
    if (!Globals.documentopen) {
        return;
    }

    let bhaveCompare = false;
    for (let i = 0; i < Globals.OpenFiles.length; i++) {
        if (Globals.OpenFiles[i].Type == 'Compare') {
            bhaveCompare = true;
        }
    }

    if(bhaveCompare){
        Globals.CompareObj.setColors(bgcolor, fgcolor);
    }
}


export function RxCore_SetCompareFiles(index:any, state:any) {
    if(index == undefined){
        return;
    }
    //var filelist = RxCore_GetOpenFiles();

    if (Globals.OpenfileNames.length < index + 1 || Globals.OpenfileNames.length == 0) {
        const filelist = RxCore_GetOpenFiles();
        if(filelist.length > index){
            Globals.OpenfileNames[index].state = state;
        }

    }else{
        Globals.OpenfileNames[index].state = state;
        //var filelist = RxCore_GetOpenFiles();
    }

    //make sure only 1 background and 1 overlay
    for (let i = 0; i < Globals.OpenfileNames.length; i++) {
        if (Globals.OpenfileNames[i].state == state && i != index) {
            Globals.OpenfileNames[i].state = 0;
        }
    }

    if (RxCore_GUI_CompareDiag != undefined) {
        RxCore_GUI_CompareDiag.CompareDialog();
    }
}


export function RxCore_getOpenFilesList() {
    const openFilesList = [];

    for (let i = 0; i < Globals.OpenFiles.length; i++) {
        openFilesList.push({
            index: Globals.OpenFiles[i].fileindex,
            name: Globals.OpenFiles[i].FileName || Globals.OpenFiles[i].Type,
            isActive: Globals.OpenFiles[i].bActive,
        })
    }
    return openFilesList;
}

export function RxCore_setWalkthroughDiv(HTMLElement:any) {
    if (!Globals.documentopen) {
        return;
    }

    regEvents(HTMLElement);
    //regEvents($(this.touchCake)[0]);
}

export function RxCore_3DTransparency(value:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.setTransparency(value);
    }
}

export function RxCore_3DTransparentOn() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.setTransparency(0.5);
    }
}

export function RxCore_3DExplodedistance(value:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml && Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.doexplode) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.explode(value);
    }
}

export function RxCore_3DExplode(onoff:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.doexplode = onoff;
        //tool = new tools['select3d']();
    }
}

export function RxCore_3dClipping(onoff:any,plane:any,value:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.clipping(plane,value,onoff);
        //tool = new tools['select3d']();
    }
}

export function RxCore_ChangeVectorLayer(index:any) {
    if (!Globals.documentopen) {
        return;
    }
    Globals.DocObj.pages[Globals.DocObj.currentpage].turnLayerOnOff(index);
}

export function RxCore_resetLayers() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].resetLayers();
    }
}

export function RxCore_LayersAll(OnOff:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].turnLayerAllOnOff(OnOff);
    }
}

export function RxCore_BlocksAll(OnOff:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].turnBlockAllOnOff(OnOff);
    }
}

export function RxCore_BlockLoadMask(szBlockLoadMask:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].filterBlocks(szBlockLoadMask);
    }
}

export function RxCore_get2DVectorBlocks(){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        return Globals.DocObj.pages[Globals.DocObj.currentpage].getBlocks();
    }
}

export function RxCore_getBlockAttributes(blockid:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        return Globals.DocObj.pages[Globals.DocObj.currentpage].blockAttributes(blockid);
    }
}

export function RxCore_getBookMarkPage(destref:any){
    if (!Globals.documentopen) {
        return;
    }
    return Globals.DocObj.get_bookmark_pageref(destref);
}

export function RxCore_getCacheURL(){
    if (!Globals.documentopen) {
        return;
    }

    return Globals.DocObj.CacheURL;
}

export function RxCore_getOriginalPath(){
    if (!Globals.documentopen) {
        return;
    }
    return Globals.DocObj.OriginalURL;
}


export function RxCore_ChangeVectorBlock(index:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].turnBlockOnOff(index);
    }
}

export function RxCore_RestoreBlockStates(){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].restoreBlockStates();
    }
}

export function RxCore_resetBlocks() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].resetBlocks();
    }
}

export function RxCore_Change3DVectorBlock(name:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].turn3DBlockOnOff(name);
    }
}

export function RxCore_FindBlockByAttr(attrname:any, attrvalue:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        return Globals.DocObj.pages[Globals.DocObj.currentpage].FindBlockByAttr(attrname, attrvalue);
    }
}

export function RxCore_Search3dAttribute(expr:any){
    if (!Globals.documentopen) {
        return -1;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        return Globals.DocObj.pages[Globals.DocObj.currentpage].search3DAttribute(expr);
    }
}

export function RxCore_Select3DVectorBlock(name:any) {
    if (!Globals.documentopen) {
        return;
    }

    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].select3DBlock(name);
    }
}

export function RxCore_SelectVectorBlock(blockid:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].selectBlock(blockid);
    }
}


export function RxCore_MoveTo3DPart(){
    if (!Globals.documentopen) {
        return;
    }

    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        const partid = Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.getSelectedPart();
        if (partid !=-1){
            Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scene.updateMatrixWorld();

            const origox = Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scene.position.x;
            const origoy = Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scene.position.y;
            const origoz = Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scene.position.z;
            const modelscale = Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scale;

            //var partx = -(origox - DocObj.pages[DocObj.currentpage].Vector3DPageObj.partlist[partid].center.x) * modelscale;
            //var party = -(origoy - DocObj.pages[DocObj.currentpage].Vector3DPageObj.partlist[partid].center.y) * modelscale;
            //var partz = -(origoz - DocObj.pages[DocObj.currentpage].Vector3DPageObj.partlist[partid].center.z) * modelscale;

            //vcentroid
            //centroid

            const partx = -Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.partlist[partid].vcentroid.x * modelscale;
            const party = -Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.partlist[partid].vcentroid.y * modelscale;
            const partz = -Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.partlist[partid].vcentroid.z * modelscale;
            const zdiff = Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.partlist[partid].vcentroid.z - Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.partlist[partid].minz;


            const camerax = origox - partx; //- (DocObj.pages[DocObj.currentpage].Vector3DPageObj.partlist[partid].radius * 2);
            const cameray = origoy - party; //- (DocObj.pages[DocObj.currentpage].Vector3DPageObj.partlist[partid].radius * 2);
            const cameraz = origoz - partz;
            const partPos = new THREE.Vector3(camerax, cameray, cameraz);

            let offset;
            let zoffset;

            const format = Globals.DocObj.Format.substring(0, 3);
            if (format == 'IFC') {
                Globals.DocObj.pages[Globals.DocObj.currentpage].camera.up.set(0, 0, 1);
                //DocObj.pages[DocObj.currentpage].camera.rotation.set(90 * Math.PI / 180, 0, 0);

            } else {
                //DocObj.pages[DocObj.currentpage].camera.rotation.set(0, 90 * Math.PI / 180, 0);
                Globals.DocObj.pages[Globals.DocObj.currentpage].camera.up.set(0, 1, 0);
            }

            if(Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.unit == 1){
                offset = modelscale;
                zoffset = (1.8 - zdiff) * modelscale;
            }else{
                offset = 1000 * modelscale;
                zoffset = (1800 - zdiff) * modelscale;
            }

            Globals.DocObj.pages[Globals.DocObj.currentpage].camera.position.x = camerax;
            Globals.DocObj.pages[Globals.DocObj.currentpage].camera.position.y = cameray - offset;
            Globals.DocObj.pages[Globals.DocObj.currentpage].camera.position.z = cameraz + zoffset;
            Globals.DocObj.pages[Globals.DocObj.currentpage].camera.lookAt(partPos);

            const xrot = Globals.DocObj.pages[Globals.DocObj.currentpage].camera.rotation.x;
            const yrot = Globals.DocObj.pages[Globals.DocObj.currentpage].camera.rotation.y;
            const zrot = Globals.DocObj.pages[Globals.DocObj.currentpage].camera.rotation.z;

            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.setInitial(-(xrot * (180 / Math.PI)),90,0,0);
        }
    }

    if (RxCore_GUI_3DWalkthrough != undefined) {
        RxCore_GUI_3DWalkthrough.setWalkthroughGUI(true);
        //$('div.wheelPanel').css('visibility', 'visible');
    }
    set_tool('Walkthrough3D', {});
    //tool = new tools['Walkthrough3D']();
    Globals.DocObj.curcontrol3D = 'Walkthrough3D';
}

export function RxCore_Reset3DModel() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].reset3DParts();
        Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.doexplode = true;
        Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.explode(0);
        Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.doexplode = false;
        Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.resetTransparency();
        Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.clipping(-1,0,false);
        //RxCore.clipping3D(item.state,-1,0);

        let format = Globals.DocObj.Format.substring(0, 3);
        let camerax;
        let cameray;
        let cameraz;
        if (format == 'IFC') {

            camerax = (Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.w / 2) * Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scale;
            cameray = -(Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.h) * Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scale;
            cameraz = (Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.d / 2) * Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scale;

            camerax = 0; // TODO:JS->TS:CHECK remove previous asignment if it is overwritten here
            cameray *= 2;
            cameraz = 0; // TODO:JS->TS:CHECK remove previous asignment if it is overwritten here

            Globals.DocObj.pages[Globals.DocObj.currentpage].camera.up.set(0, 0, 1);
            //DocObj.pages[DocObj.currentpage].camera.rotation.set(90 * Math.PI / 180, 0, 0);
        } else {

            camerax = (Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.w / 2) * Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scale;
            cameray = (Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.h / 2) * Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scale;
            cameraz = (Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.d) * Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.scale;

            camerax = 0; // TODO:JS->TS:CHECK remove previous asignment if it is overwritten here
            cameray = 0; // TODO:JS->TS:CHECK remove previous asignment if it is overwritten here
            cameraz *= 2;

            Globals.DocObj.pages[Globals.DocObj.currentpage].camera.up.set(0, 1, 0);
            //DocObj.pages[DocObj.currentpage].camera.rotation.set(0, 90 * Math.PI / 180, 0);
        }

        //camera.rotation.set(90 * Math.PI / 180,0,0);
        Globals.DocObj.pages[Globals.DocObj.currentpage].camera.position.set(camerax, cameray, cameraz);
        Globals.DocObj.pages[Globals.DocObj.currentpage].camera.lookAt(new THREE.Vector3(0,0,0));

        Globals.DocObj.curcontrol3D = 'orbitControl';
        RxCore_3DOrbit();
        //Viewer3D.resetScene();
        //Viewer3D.update();
    }
}

export function RxCore_MarkupMultiselect(onOff:any){
    Globals.bMultiselect = onOff;
}

export function RxCore_changeSnapState(state:any) {
    if (!Globals.documentopen) {
        return;
    }
    Globals.DocObj.pages[Globals.DocObj.currentpage].enableSnap(state);
}

export function RxCore_getSnapState(){
    if (!Globals.documentopen) {
        return;
    }else{
        return Globals.DocObj.pages[Globals.DocObj.currentpage].getSnapState();
    }
}

export function RxCore_ChangeTransp(val:any) {
    if (!Globals.documentopen) {
        return;
    }
    if(Globals.readonlymode){
        return;
    }
    const temptransp = Globals.globaltransparency;
    Globals.globaltransparency = val;
    ChangeMarkupSelected(6);  // TODO:JS->TS:ADJUST use meaningful constants instead of numbers
    if (!Globals.bSetGlobal) {
        Globals.globaltransparency = temptransp;
    }
}

export function RxCore_ChangeColorByIndex(indx:any, val:any, strokefill:any){
    if (!Globals.documentopen) {
        return;
    }
    if(Globals.readonlymode){
        return;
    }

    if (val.match(/rgb/gi) != null) {
        val = rgbToHex(val);
    }
    let tempcolor = Globals.markupcolor;

    switch (strokefill) { // TODO:JS->TS:ADJUST use meaningful constants instead of numbers
        case 1:
            tempcolor = Globals.markuplinecolor;
            Globals.markuplinecolor = val;
            ChangeMarkupByindx(indx,1);
            if (!Globals.bSetGlobal) {
                Globals.markuplinecolor = tempcolor;
            }

            break;
        case 0:
            tempcolor = Globals.markupfillcolor;
            Globals.markupfillcolor = val;
            ChangeMarkupByindx(indx,7);
            if (!Globals.bSetGlobal) {
                Globals.markupfillcolor = tempcolor;
            }

            break;
        case 2:
            tempcolor = Globals.markuptextcolor;
            Globals.markuptextcolor = val;
            ChangeMarkupByindx(indx,8);
            if (!Globals.bSetGlobal) {
                Globals.markuptextcolor = tempcolor;
            }
            break;
    }
}

export function RxCore_ChangeColor(val:any, strokefill:any) {
    if (!Globals.documentopen) {
        return;
    }
    if(Globals.readonlymode){
        return;
    }

    if (val.match(/rgb/gi) != null) {
        val = rgbToHex(val);
    }

    let tempcolor = Globals.markupcolor;
    //markupcolor = val;

    switch (strokefill) { // TODO:JS->TS:ADJUST use meaninful constants instead of numbers
        case 1:
            tempcolor = Globals.markuplinecolor;
            Globals.markuplinecolor = val;

            ChangeMarkupSelected(1);
            if (!Globals.bSetGlobal) {
                Globals.markuplinecolor = tempcolor;
            }

            break;
        case 0:
            tempcolor = Globals.markupfillcolor;
            Globals.markupfillcolor = val;

            ChangeMarkupSelected(7);
            if (!Globals.bSetGlobal) {
                Globals.markupfillcolor = tempcolor;
            }

            break;
        case 2:
            tempcolor = Globals.markuptextcolor;
            Globals.markuptextcolor = val;

            ChangeMarkupSelected(8);
            if (!Globals.bSetGlobal) {
                Globals.markuptextcolor = tempcolor;
            }

            break;
    }

    /*if (!bSetGlobal) {
        markupcolor = tempcolor;
    }*/
}

export function RxCore_MarkupSaveCheck(OnOff:any){
    Globals.bMarkupSavecheck = OnOff;
}

export function RxCore_GetColor() {
    return Globals.markupcolor;
}

export function RxCore_GetCompareColors() {
    let comparecolors = {
        bg:Globals.overlayBGColor,
        fg:Globals.overlayFGColor
    };

    let bhaveCompare = false;
    for (let i = 0; i < Globals.OpenFiles.length; i++) {
        if (Globals.OpenFiles[i].Type == 'Compare') {
            bhaveCompare = true;
        }
    }
    if(bhaveCompare){
        comparecolors = Globals.CompareObj.getColors();
    }
    return comparecolors;
}

export function RxCore_GetlineColor() {
    return Globals.markuplinecolor;
}

export function RxCore_GetfillColor() {
    return Globals.markupfillcolor;
}

export function RxCore_GetTextColor() {
    return Globals.markuptextcolor;
}

export function RxCore_GetCanvasSize(){
    return {
        w:Globals.canvasowidth,
        h:Globals.canvasoheight
    };
}

export function RxCore_hideLabels(onoff:any){
    Globals.bMarkupNoLabel = onoff;
}

export function RxCore_lockMarkup(onoff:any){
    Globals.DocObj.bMarkupLocked = onoff;
}

export function RxCore_MarkupChanged(){
    let retvalue = false;
    if(Globals.DocObj){
        (Globals.DocObj.bMarkupchanged && !Globals.readonlymode) ? retvalue = true : retvalue = false; // TODO:JS->TS:ADJUST
    }
    return retvalue;
}

export function RxCore_MarkupRedraw(){
    if (!Globals.documentopen) {
        return;
    }
    drawmarkupAll(Globals.cntximg);
    DrawMarkupSelected(Globals.context);
}

export function RxCore_MarkupRotate(degree:any) {
    if (!Globals.documentopen) {
        return;
    }
    if(Globals.readonlymode){
        return;
    }
    const markupobject:any = getSelectedmarkup(); // TODO:JS->TS:INFO added any since rotation is not formally defined as a property
    if(!markupobject.isempty){
        markupobject.rotation = degree * (Math.PI / 180);
    }
    drawmarkupAll(Globals.cntximg);
    DrawMarkupSelected(Globals.context);
    //ChangeMarkupSelected(degree);
}

export function RxCore_MarkupSubtype(num:any) {
    if (!Globals.documentopen) {
        return;
    }
    if(Globals.readonlymode){
        return;
    }
    const markupobject:any = getSelectedmarkup(); // TODO:JS->TS:INFO added any since subtype is not formally defined as a key
    if(!markupobject.isempty){
        markupobject.subtype = num;
    }
    //getSelectedmarkup().rotation = degree*( Math.PI /180);

    drawmarkupAll(Globals.cntximg);
    DrawMarkupSelected(Globals.context);
}

export function RxCore_OpenRecent(fileurl:any) {
    if (RxCore_GUI_Download != undefined) {
        RxCore_GUI_Download.setDownload("show");
    }
    getFile(fileurl);
}

export function RxCore_OpenMarkup(fileurl:any){
    if (!Globals.documentopen) {
        return;
    }
    getMarkup(fileurl);
}

export function RxCore_ClearMarkup(){
    if (!Globals.documentopen) {
        return;
    }

    Globals.DocObj.markuplist = [];
    Globals.numUsers = 0;
    Globals.Userlist = [];
    Globals.Userlist[0] = new Users(Globals.signature, Globals.DisplayName, Globals.markuplayer, Globals.markupcolor); // TODO:JS->TS:CHECK
    Globals.numUsers++;
    Globals.DocObj.nummarkups = 0;

    if (RxCore_GUI_Markuplist != undefined) {
        RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist);
    }
    if (RxCore_GUI_Users != undefined) {
        RxCore_GUI_Users.setUserlist(Globals.Userlist);
    }
    drawmarkupAll(Globals.cntximg);
    DrawMarkupSelected(Globals.context);
}

export function RxCore_OpenFileCustom(fileurl:any) {
    if (RxCore_GUI_Download != undefined) {
        RxCore_GUI_Download.setDownload("show");
    }

    Globals.bUseCustomrelpath = true;
    Globals.xmlurlrelcustom = fileurl;
    getFileCustom(fileurl);
}

export function RxCore_OpenPages(fileurl:any,pages:any){
    if (RxCore_GUI_Download != undefined) {
        RxCore_GUI_Download.setDownload("show");
    }
    Globals.bUseCustomrelpath = false;
    getFilePages(fileurl,pages);
}

export function RxCore_OpenFile(fileurl:any, callback:any, progressCallBack:any) {
    if (RxCore_GUI_Download != undefined) {
        RxCore_GUI_Download.setDownload("show");
    }
    Globals.bUseCustomrelpath = false;

    getFile(fileurl, callback, progressCallBack);
}

export function RxCore_OpenFilePages(fileurl:any, pages:any, callback:any) {
    if (RxCore_GUI_Download != undefined) {
        RxCore_GUI_Download.setDownload("show");
    }

    Globals.bUseCustomrelpath = false;
    getFilePages(fileurl,pages, callback);
}

export function RxCore_consolidate(select:any){
    //bConsolidate = true;
    if(Globals.bCanConsolidate){
        Globals.consolidateObj.isactive = select;
        if(RxCore_GUI_Consolidate != undefined){
            RxCore_GUI_Consolidate.Consolidatevt();
        }
    }
}

/*function RxCore_consolidateObj(){

    return consolidateObj;

}*/


export function RxCore_compareScale(){
    if (!Globals.documentopen) {
        return;
    }

    unselelectallmarkup();
    unselecteditmarkupall();

    let bhaveCompare = false;
    for (let i = 0; i < Globals.OpenFiles.length; i++) {
        if (Globals.OpenFiles[i].Type == 'Compare') {
            bhaveCompare = true;
        }
    }
    Globals.CompareObj.scalecompare();

    //find background file index
    //RxCore_setActiveFile(indx);
    //tool = new tools['overlayscale']();
}

export function RxCore_getCompareScale(){
    if (!Globals.documentopen) {
        return;
    }

    unselelectallmarkup();
    unselecteditmarkupall();

    //DocObj.pages[DocObj.currentpage].scalecompare();
}

export function RxCore_CompareNudgeRotate(clockwise:any){
    if (!Globals.documentopen) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    let bhaveCompare = false;
    for (let i = 0; i < Globals.OpenFiles.length; i++) {
        if (Globals.OpenFiles[i].Type == 'Compare') {
            bhaveCompare = true;
        }
    }
    Globals.CompareObj.nudgeRotate(clockwise);
}

export function RxCore_CompareNudgeScale(updown:any){
    if (!Globals.documentopen) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();

    let bhaveCompare = false;
    for (let i = 0; i < Globals.OpenFiles.length; i++) {
        if (Globals.OpenFiles[i].Type == 'Compare') {
            bhaveCompare = true;
        }
    }
    Globals.CompareObj.nudgeScale(updown);
}

export function RxCore_CompareNudgeOffset(direction:any){
    if (!Globals.documentopen) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();

    let bhaveCompare = false;
    for (let i = 0; i < Globals.OpenFiles.length; i++) {
        if (Globals.OpenFiles[i].Type == 'Compare') {
            bhaveCompare = true;
        }
    }
    Globals.CompareObj.nudgeoffset(direction);
}

export function RxCore_setCompareScale(scalearray:any){
    if (!Globals.documentopen) {
        return;
    }

    unselelectallmarkup();
    unselecteditmarkupall();

    let bhaveCompare = false;
    for (let i = 0; i < Globals.OpenFiles.length; i++) {
        if (Globals.OpenFiles[i].Type == 'Compare') {
            bhaveCompare = true;
        }
    }
    Globals.CompareObj.setcomparescale(scalearray);
}


export function RxCore_OverlayFiles(fileurlbackground:any, fileurloverlay:any) {
    compareOverlay(fileurlbackground, fileurloverlay,1);
}

export function RxCore_CompareFiles(fileurlbackground:any, fileurloverlay:any) {
    compareOverlay(fileurlbackground, fileurloverlay,0);
}

export function RxCore_Comparediag() {
    if (RxCore_GUI_CompareDiag != undefined) {
        if (Globals.OpenfileNames.length == 0) {
            RxCore_GetOpenFiles();
        }
        RxCore_GUI_CompareDiag.CompareDialog();
    }
}

export function RxCore_CompareEx(filelist:any, okcancel:any){  // TODO:JS->TS:CHECK this function does nothing!
    const bindx = -1;
    const oindx = -1;

    if (Globals.OpenfileNames.length > 1 && okcancel){

    }
}

export function RxCore_exicompareMeasure(){
    if (!Globals.documentopen) {
        return;
    }
    if(Globals.documentcompare){
        return;
    }

    Globals.DocObj.pages[Globals.DocObj.currentpage].enableSnap(false);
    set_tool('markupedit', {});
}

export function RxCore_CompareMesure(index:any){
    if (!Globals.documentopen) {
        return;
    }
    if(Globals.documentcompare){
        return;
    }

    Globals.DocObj.pages[Globals.DocObj.currentpage].enableSnap(true);
    set_tool('getoverlayscale', {p1 : Globals.DocObj.pages[Globals.DocObj.currentpage], p2 : index});
    //tool = new tools['getoverlayscale'](DocObj.pages[DocObj.currentpage], index);
}



export function RxCore_getMarkupXMLData(){
    if (!Globals.documentopen || Globals.documentcompare) {
        return;
    }
    return createxmlmarkup(true, false,true,Globals.signature, Globals.DisplayName);
 }

export function RxCore_setMarkupXMLData(xmldata:any){
    if (!Globals.documentopen || Globals.documentcompare) {
        return;
    }

    getMarkupfromXML(xmldata);
}

export function RxCore_xmlurlEx(fileurl:any){
    getxmlurlEx(fileurl);
}


export function RxCore_xmlurl(fileurl:any) {
    getxmlurl(fileurl);
}

export function RxCore_getAllPageDimensions(){
    if (!Globals.documentopen) {
        return;
    }
    return Globals.DocObj.getAllPageDim();
}

export function RxCore_getPageDimensions(pagenum:any){
    if (!Globals.documentopen) {
        return;
    }

    return Globals.DocObj.getPageDim(pagenum);
}

export function RxCore_setPageDimensions(pagenum:any, height:any, width:any,  x:any, y:any){
    if (!Globals.documentopen) {
        return;
    }

    Globals.DocObj.setPageDim(pagenum, height, width,  x, y);
}

export function RxCore_getPageRotation(){
    let rotation = 0;
    if (!Globals.documentopen) {
        rotation = 0;
    }else{
        rotation = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation;
    }
    return rotation;
}

export function RxCore_redrawPage(pagenum:any){
    if (!Globals.documentopen) {
        return;
    }

    Globals.DocObj.getPageObject(pagenum).redraw();
}

export function RxCore_suspendDraw(onOff:any){
    Globals.bSuspendDraw = onOff;
    if(!onOff && Globals.documentopen){
        //need to get current page.
        const curpage = Globals.DocObj.getcurPage();
        Globals.DocObj.getPageObject(curpage).redraw();
    }
}

export function RxCore_RotatePage(pagenum:any, degrees:any){
    if (!Globals.documentopen) {
        return;
    }
    Globals.DocObj.getPageObject(pagenum).rotateimage(degrees);
    if(pagenum == 0){
        Globals.DocObj.getPageObject(pagenum).redraw();
    }
}

export function RxCore_RotateDrawing(cycle:any, szrotatetool:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (cycle) {
        //unselelectallmarkup();
        //unselecteditmarkupall();
        switch (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation) {
            case 0:
                Globals.DocObj.pages[Globals.DocObj.currentpage].rotateimage(90);
                break;
            case 90:
                Globals.DocObj.pages[Globals.DocObj.currentpage].rotateimage(180);
                break;
            case 270:
                Globals.DocObj.pages[Globals.DocObj.currentpage].rotateimage(0);
                break;
            case 180:
                Globals.DocObj.pages[Globals.DocObj.currentpage].rotateimage(270);
                break;
        }
    } else {
        if (szrotatetool == '0') {
            Globals.DocObj.pages[Globals.DocObj.currentpage].rotateimage(0);
        }
        if (szrotatetool == '90') {
            Globals.DocObj.pages[Globals.DocObj.currentpage].rotateimage(90);
        }
        if (szrotatetool == '180') {
            Globals.DocObj.pages[Globals.DocObj.currentpage].rotateimage(180);
        }
        if (szrotatetool == '270') {
            Globals.DocObj.pages[Globals.DocObj.currentpage].rotateimage(270);
        }
    }
}

export function RxCore_PageLock(onOff:any){
    if (!Globals.documentopen) {
        return;
    }
    Globals.DocObj.pagelock(onOff);
}

export function RxCore_PageonlyMarkup(toggle:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (RxCore_GUI_Markuplist != undefined) {
        if (toggle) {
            if (RxCore_GUI_Markuplist.pageonly) {
                RxCore_GUI_Markuplist.pageonly = false;
            } else {
                RxCore_GUI_Markuplist.pageonly = true;
            }
        } else {
            RxCore_GUI_Markuplist.pageonly = true;
        }
        RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist);
        /* Andriy */
        // RxCore_GUI_Markuplist.notify();
    }
}

export function RxCore_MarkupUndo() {
    if (!Globals.documentopen || Globals.documentcompare) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    MarkupUndo();
    drawmarkupAll(Globals.cntximg);

    if (RxCore_GUI_Markuplist != undefined) {
        RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist);
    }
}

export function RxCore_CopyMarkup() {
    if (!Globals.documentopen || Globals.documentcompare) {
        return;
    }
    CopymarkupSelected();
}

export function RxCore_PasteMarkup() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.documentcompare) {
        return;
    }
    MarkupFromLocalStorage();
    drawmarkupAll(Globals.cntximg);
}

export function RxCore_NextMarkup() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.documentcompare) {
        return;
    }

    unselelectallmarkup();
    unselecteditmarkupall();
    Globals.DocObj.pages[Globals.DocObj.currentpage].MarkupZoom();
}

export function RxCore_ZoomMarkup(dx:any, dy:any, dscale:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.documentcompare) {
        return;
    }

    Globals.DocObj.pages[Globals.DocObj.currentpage].SetMarkupZoom(dx, dy, dscale);
}


export function RxCore_FindMarkup() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.documentcompare) {
        return;
    }

    unselelectallmarkup();
    unselecteditmarkupall();
    const markuptext = prompt("Search markup text", "");
    if (markuptext != null && markuptext != "") {
        Globals.DocObj.pages[Globals.DocObj.currentpage].MarkupFind(markuptext);
    }
}

export function RxCore_TextSelect(onoff:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.documentcompare) {
        return;
    }

    Globals.DocObj.enableTextSelect(onoff);
}


export function RxCore_endTextSearch(){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.documentcompare) {
        return;
    }
    Globals.DocObj.textsearchend();
    /*if (DocObj.pages[DocObj.currentpage].usepdfjs){
        DocObj.textsearchend();
    }*/
}

export function RxCore_textSearch(text:any, direction:any, casesens:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.documentcompare) {
        return;
    }
    Globals.DocObj.textsearch(text,direction,casesens);
}

export function RxCore_MarkupOutlined() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode) {
        return;
    }
    if (Globals.documentcompare) {
        return;
    }
    const tempfillstyle = Globals.fillstyle;
    Globals.fillstyle = 0;
    ChangeMarkupSelected(3);
    if (!Globals.bSetGlobal) {
        Globals.fillstyle = tempfillstyle;
    }
}

export function RxCore_MarkupEdged() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode) {
        return;
    }
    if (Globals.documentcompare) {
        return;
    }
    const tempfillstyle = Globals.fillstyle;
    Globals.fillstyle = 2;
    ChangeMarkupSelected(3);

    if (!Globals.bSetGlobal) {
        Globals.fillstyle = tempfillstyle;
    }
}

export function RxCore_MarkupFilled() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode) {
        return;
    }
    if (Globals.documentcompare) {
        return;
    }

    const tempfillstyle = Globals.fillstyle;
    Globals.fillstyle = 1;
    ChangeMarkupSelected(3);
    if (!Globals.bSetGlobal) {
        Globals.fillstyle = tempfillstyle;
    }
}

export function RxCore_MarkupHatched() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode) {
        return;
    }
    if (Globals.documentcompare) {
        return;
    }

    const tempfillstyle = Globals.fillstyle;
    Globals.fillstyle = 3 + Globals.HatchStyle;
    ChangeMarkupSelected(3);
    if (!Globals.bSetGlobal) {
        Globals.fillstyle = tempfillstyle;
    }
}

export function RxCore_GetFillstyle() {
    return Globals.fillstyle;
}

export function RxCore_GetHatchStyle() {
    return Globals.HatchStyle;
}

export function RxCore_SetMarkupLayer(layer:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.documentcompare) {
        return;
    }

    Globals.markuplayer = layer;
    Globals.markupcolor = Globals.Layerlist[layer].Color;

    Globals.markuplinecolor = Globals.markupcolor;
    Globals.markuptextcolor = Globals.markupcolor;
}

export function RxCore_ChangeMarkupLayer(layer:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.documentcompare) {
        return;
    }
    const templayer = Globals.markuplayer;
    const tempcolor = Globals.markupcolor;
    //var tempfillcolor = markupfillcolor;
    const templinecolor = Globals.markuplinecolor;
    const temptextcolor = Globals.markuptextcolor;

    Globals.markuplayer = layer;
    Globals.markupcolor = Globals.Layerlist[layer].Color;
    Globals.markuplinecolor = Globals.markupcolor;
    Globals.markuptextcolor = Globals.markupcolor;

    ChangeMarkupSelected(0);

    if (!Globals.bSetGlobal) {
        Globals.markuplayer = templayer;
        Globals.markupcolor = tempcolor;
        Globals.markuplinecolor = templinecolor;
        Globals.markuptextcolor = temptextcolor;
    }
}


export function RxCore_MarkupLayerdialog() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.documentcompare) {
        return;
    }
    if (RxCore_GUI_MarkupLayers != undefined) {
        RxCore_GUI_MarkupLayers.setMarkupLayers(Globals.Layerlist);
    }
}

export function RxCore_GetMarkupLayers(){
    return Globals.Layerlist;
}

export function RxCore_getSelectedMarkup() {
    if (!Globals.documentopen) {
        return;
    }
    if(Globals.readonlymode){
        return;
    }
    return getSelectedmarkup();
}

export function RxCore_GetUsers(){
    return Globals.Userlist;
}

export function RxCore_MarkupTools(selected:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.documentcompare) {
        return;
    }

    if (!selected) {
        set_tool('markupedit', {});

        return;
    }

    unselelectallmarkup();
    set_tool('markupedit', {});

    if (RxCore_GUI_Users != undefined) {
        RxCore_GUI_Users.setUserlist(Globals.Userlist);
    }

    if (RxCore_GUI_MarkupLayers != undefined) {
        RxCore_GUI_MarkupLayers.setMarkupLayers(Globals.Layerlist);
    }
}


export function RxCore_MarkupUserdialog() {
    if (!Globals.documentopen) {
        return;
    }
    //unselelectallmarkup();

    if (RxCore_GUI_Users != undefined) {
        RxCore_GUI_Users.setUserlist(Globals.Userlist);
    }
}

export function RxCore_FileInfodialog() {
    if (!Globals.documentopen) {
        return;
    }
    let ImageWidth = Math.floor(Globals.DocObj.pages[Globals.DocObj.currentpage].MainImageWidth / Globals.DocObj.pages[Globals.DocObj.currentpage].MainImageScaling);
    let imagewidthunits = getUnitlength(Globals.DocObj.pages[Globals.DocObj.currentpage].MainImageWidth);
    let ImageHeight = Math.floor(Globals.DocObj.pages[Globals.DocObj.currentpage].MainImageHeight / Globals.DocObj.pages[Globals.DocObj.currentpage].MainImageScaling);
    let imageheightunits = getUnitlength(Globals.DocObj.pages[Globals.DocObj.currentpage].MainImageHeight);

    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml && Globals.DocObj.pages[Globals.DocObj.currentpage].VectorPageObj) {
        ImageWidth = Math.floor(Globals.DocObj.pages[Globals.DocObj.currentpage].VectorPageObj.width);
        imagewidthunits = getUnitlength(ImageWidth);
        ImageHeight = Math.floor(Globals.DocObj.pages[Globals.DocObj.currentpage].VectorPageObj.height);
        imageheightunits = getUnitlength(ImageHeight);

    } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
        ImageWidth = Math.floor(Globals.DocObj.pages[Globals.DocObj.currentpage].pdfpagewidth);
        imagewidthunits = getUnitlength(ImageWidth);
        ImageHeight = Math.floor(Globals.DocObj.pages[Globals.DocObj.currentpage].pdfpageheight);
        imageheightunits = getUnitlength(ImageHeight);

    } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml && Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj) {
        ImageWidth = Math.floor(Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.w);
        imagewidthunits = getUnitlength(ImageWidth);
        ImageHeight = Math.floor(Globals.DocObj.pages[Globals.DocObj.currentpage].Vector3DPageObj.h);
        imageheightunits = getUnitlength(ImageHeight);

    } else {

    }

    const OffsetX = Globals.DocObj.pages[Globals.DocObj.currentpage].OffsetX;
    const OffsetY = Globals.DocObj.pages[Globals.DocObj.currentpage].OffsetY;
    const OriginalScale = Globals.DocObj.pages[Globals.DocObj.currentpage].OriginalScale;
    const fileformat = Globals.DocObj.Format;
    const fileURL = Globals.DocObj.FileName;
    const fileSize = Math.floor(Globals.DocObj.FileSizeLow / 1024);
    const fileCompression = Globals.DocObj.pages[Globals.DocObj.currentpage].Compression;
    const fileDPI = Globals.DocObj.pages[Globals.DocObj.currentpage].DPI;
    const filePages = Globals.DocObj.NumPages;

    let FileInformation:any = {
        FileFormat:fileformat,
        FileName:fileURL,
        FileSize:fileSize,
        Compression:fileCompression,
        DPI:fileDPI,
        Pages:filePages,
        ImageWidth:ImageWidth,
        imagewidthunits:imagewidthunits,
        ImageHeight:ImageHeight,
        imageheightunits:imageheightunits,
        OffsetX:OffsetX,
        OffsetY:OffsetY,
        OriginalScale:OriginalScale,
        XRefs:Globals.DocObj.xrefs,
        Fonts:Globals.DocObj.fonts,
        Properties : Globals.DocObj.documentproperties
    };

    if (Globals.DocObj.CadMeasurement != undefined){
        FileInformation.CADMeasurement = Globals.DocObj.CadMeasurement; // TODO:JS->TS:CHECK CADMeasurement did not appear in the initilization of FileInformation
    }

    if (Globals.documentcompare) {
        FileInformation = {
            FileFormat:'Overlay Composite',
            FileName:Globals.CompareObj.pages[0].DocRef.FileName + "-" + Globals.CompareObj.pages[1].DocRef.FileName,
            FileSize:"-",
            Compression:"-",
            DPI:"-",
            Pages:"-",
            ImageWidth:"-",
            imagewidthunits:imagewidthunits,
            ImageHeight:"-",
            imageheightunits:imageheightunits,
            OffsetX:"-",
            OffsetY:"-",
            OriginalScale:"-"
        };
    }

    if (RxCore_GUI_FileInfo != undefined) {
        RxCore_GUI_FileInfo.setFileInfo(FileInformation);
    }
}

export function RxCore_Measure(selected:any) {
    if (!Globals.documentopen) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    if (selected) {
        set_tool('measuretool', {});
        //tool = new tools['measuretool']();
    } else {
        set_tool('markupedit', {});

    }
}

export function RxCore_CloseAll() {
    if (!Globals.documentopen) {
        return;
    }
    while (Globals.OpenFiles.length > 0) {
        RxCore_Closedocument();
    }
}


export function RxCore_Printdocument() {
    if (!Globals.documentopen) {
        return;
    }
    const pheight = parseInt(Globals.DocObj.pages[Globals.DocObj.currentpage].height);
    const pwidth = parseInt(Globals.DocObj.pages[Globals.DocObj.currentpage].width);

    if (pheight > pwidth) {
        Globals.PaperWidth = 210;
        Globals.PaperHeight = 297;
    } else {
        Globals.PaperWidth = 297;
        Globals.PaperHeight = 210;
    }

    MarkupPrintSave();

    if(!Globals.documentcompare){
        if(Globals.DocObj.checkprintready()){
            printCanvas(Globals.PrintPageURL);
        }else{
           //load all pages.
            Globals.DocObj.loadAllPages();
        }
    }else{
        Globals.CompareObj.print(Globals.PrintPageURL);
    }

    /*if(!documentcompare){
        printCanvas(PrintPageURL);
    }else{
        CompareObj.print(PrintPageURL);
    }*/
}

export function RxCore_GetdocInfo() {
    if (!Globals.documentopen) {
        return {
            iscompare:false,
            isPDF:false,
            is3D:false,
            is2D:false,
            numpages:0,
            currentpage:0
        }
    } else {
        return {
            iscompare:Globals.documentcompare,
            isPDF:Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs,
            is3D:Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml,
            is2D:Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml,
            numpages:Globals.DocObj.pages.length,
            currentpage:Globals.DocObj.getcurPage(),
            type : Globals.DocObj.Type
        }
    }
}

export function RxCore_SetViewMode(OnOff:any){
    if (!Globals.documentopen) {
        return;
    }
    if(Globals.documentcompare){
        return;
    }
    Globals.DocObj.pages[Globals.DocObj.currentpage].setViewMode(OnOff);
}

export function RxCore_setPDFinitalZoomAll(OnOff:any){
    Globals.bPDFZoomAllinit = OnOff;
}

export function RxCore_setPDFAnimateRender(OnOff:any){
    Globals.bAnimatePDFrender = OnOff;
}

export function RxCore_SetScrollZoomKey(OnOff:any, keys:any){
    Globals.bUseScrollKey = OnOff;
    Globals.nScrollKeyNum = keys;
}

export function RxCore_SetSingleDocument(OnOff:any) {
    Globals.bSingleDocmode = OnOff;
}

export function PrintCommon(PrintPgURL:any, PaperSize:any){
    MarkupPrintSave();
    Globals.PaperWidth = PaperSize.width;
    Globals.PaperHeight = PaperSize.height;
    if(!Globals.documentcompare){
        if(Globals.DocObj.checkprintready()){
            printCanvas(PrintPgURL);
        }else{
            //load all pages.
            Globals.DocObj.loadAllPages();
        }
    }else{

        Globals.CompareObj.print(PrintPgURL,PaperSize);
    }
}

export function RxCore_PrintOptionsSize(PrintPgURL:any, PaperSize:any){
    if (!Globals.documentopen) {
        return;
    }
    let tempwidth;
    //auto
    if(PaperSize.mode == 0){
        if (Globals.DocObj.pages[Globals.DocObj.currentpage].height > Globals.DocObj.pages[Globals.DocObj.currentpage].width) { // drawing portrait
            if(PaperSize.width > PaperSize.height){
                tempwidth = PaperSize.width;
                PaperSize.width = PaperSize.height;
                PaperSize.height = tempwidth;
            }
        } else { // drawing landscape
            if(PaperSize.height > PaperSize.width){
                tempwidth = PaperSize.width;
                PaperSize.width = PaperSize.height;
                PaperSize.height = tempwidth;
            }
        }
    }else if(PaperSize.mode == 1) { //force portrait
        if(PaperSize.width > PaperSize.height){
            tempwidth = PaperSize.width;
            PaperSize.width = PaperSize.height;
            PaperSize.height = tempwidth;
        }
    }else if(PaperSize.mode == 2) { //force landscape
        if(PaperSize.height > PaperSize.width){
            tempwidth = PaperSize.width;
            PaperSize.width = PaperSize.height;
            PaperSize.height = tempwidth;
        }
    }
    PrintCommon(PrintPgURL, PaperSize);
}

export function RXCore_PrintdocOptions(PrintPgURL:any) {
    if (!Globals.documentopen) {
        return;
    }
    let PWidth;
    let PHeight;
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].height > Globals.DocObj.pages[Globals.DocObj.currentpage].width) {
        PWidth = 210;
        PHeight = 297;
    } else {
        PWidth = 297;
        PHeight = 210;
    }
    PrintCommon(PrintPgURL, {width : PWidth, height : PHeight});

    /*if(!documentcompare){
        printCanvas(PrintPgURL);
    }else{
        CompareObj.print(PrintPgURL,{width : PaperWidth,height : PaperHeight});
    }*/
}

export function RxCore_MoveToBack() {
    if (!Globals.documentopen ) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    moveToBack();
}

export function RxCore_MoveToFront() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    moveToFront();
}

export function RxCore_DeleteMarkup() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    deletemarkup();
}

export function RxCore_ZoomWindow(selected:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    if (selected) {
        set_tool('zoomwindow', {});
        //tool = new tools['zoomwindow']();
    } else {
        set_tool('markupedit', {});
    }
}

/*function RxCore_Zoom(x,y){
    if (!documentopen) {
        return;
    }
    if (DocObj.pages[DocObj.currentpage].usevector3Dxml) {
        return;
    }

    DocObj.pages[DocObj.currentpage].pan_page(x, y,true);
}*/

export function RxCore_ZoomPageUpdate(zoomparams:any, type:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        return;
    }

    Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomPageUpdate(zoomparams, type);
}

export function RxCore_PanPage(x:any, y:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        return;
    }
    Globals.DocObj.pages[Globals.DocObj.currentpage].pan_page(x, y,true);
    //DocObj.pages[DocObj.currentpage].pan_page_pos(x, y,true);
}

export function RxCore_PanWindow(selected:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        return;
    }

    unselelectallmarkup();
    unselecteditmarkupall();
    if (selected) {
        set_tool('pan', {});
        //tool = new tools['pan']();
    } else {
        set_tool('markupedit', {});
    }
}

export function RxCore_MagnifyGlass(selected:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        return;
    }

    unselelectallmarkup();
    unselecteditmarkupall();
    if (selected) {
        Globals.magcanvas.addEventListener('mousemove', ev_canvas, false);
        Globals.magcanvas.addEventListener('mousedown', ev_canvas, false);
        Globals.magcanvas.addEventListener('mouseup', ev_canvas, false);
        Globals.magcanvas.addEventListener('mouseout', ev_canvas, false);
        Globals.magcanvas.addEventListener('wheel', ev_canvas, false);
        set_tool('magnify', {});
        //tool = new tools['magnify']();
    } else {
        Globals.magcanvas.style.visibility = 'hidden';
        Globals.magcanvas.removeEventListener('mousemove', ev_canvas, false);
        Globals.magcanvas.removeEventListener('mousedown', ev_canvas, false);
        Globals.magcanvas.removeEventListener('mouseup', ev_canvas, false);
        Globals.magcanvas.removeEventListener('mouseout', ev_canvas, false);
        Globals.magcanvas.removeEventListener('wheel', ev_canvas, false);
        set_tool('markupedit', {});
    }
}

export function RxCore_ZoomFit() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        return;
    }

    //unselelectallmarkup();
    //unselecteditmarkupall();
    Globals.DocObj.pages[Globals.DocObj.currentpage].zoomall();

}

export function RxCore_ZoomHeight() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        return;
    }

    //unselelectallmarkup();
    //unselecteditmarkupall();
    Globals.DocObj.pages[Globals.DocObj.currentpage].zoomheight();

}

export function RxCore_ZoomWidth() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        return;
    }

    //unselelectallmarkup();
    //unselecteditmarkupall();
    Globals.DocObj.pages[Globals.DocObj.currentpage].zoomwidth();

}

export function RxCore_ZoomIn() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        return;
    }

    //unselelectallmarkup();
    //unselecteditmarkupall();
    Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomIn(1.1, false, false);

}

export function RxCore_ZoomOut() {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        return;
    }

    //unselelectallmarkup();
    //unselecteditmarkupall();

    if (belowlimitExtent(1.1)){
        Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomOut(1.1, false, false);
    }
}

export function RxCore_ZoomToBlock(blockId:any){
    if (!Globals.documentopen || Globals.documentcompare) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        return;
    }

    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].ZoomToBlock(blockId);
    }
}

export function RxCore_NextPage() {
    if (!Globals.documentopen || Globals.documentcompare) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    Globals.DocObj.PageDown();
    set_tool('markupedit', {});
}

export function RxCore_PrevPage() {
    if (!Globals.documentopen || Globals.documentcompare) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    Globals.DocObj.PageUp();
    set_tool('markupedit', {});
}

export function RxCore_GetcurPage() {
    let curpage = 0;
    if (!Globals.documentopen) {
        curpage = 0;
    } else {
        curpage = Globals.DocObj.getcurPage();
    }

    return curpage;
}

export function RxCore_gotoPage(pagenum: any) {
    if (!Globals.documentopen || Globals.documentcompare) {
        return;
    }

    unselelectallmarkup();
    unselecteditmarkupall();
    Globals.DocObj.GotoPage(pagenum);
}

export function RxCore_MarkupSelect(selected:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    if (selected) {
        set_tool('markupedit', {});
        if (Globals.bMarkupcrated) {
            Globals.DocObj.markuplist[Globals.nMarkupcreated].selected = true;
            drawmarkupAll(Globals.cntximg);
            DrawMarkupSelected(Globals.context);
            Globals.bMarkupcrated = false;
            Globals.nMarkupcreated = -1;
        }
    } else {
        set_tool('markupedit', {});
    }
}

export function RxCore_NoteFocus(onOff: any){
    if (!Globals.documentopen) {
        return;
    }
    Globals.bNoteFocus = onOff;
}

export function RxCore_MarkupNote(selected:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    if (selected) {
        set_tool('note', {});
        //tool = new tools['note']();
    } else {
        set_tool('markupedit', {});
    }
}

export function RxCore_MarkupText(selected:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    if (selected) {
        set_tool('text', {});
        //tool = new tools['text']();
    } else {
        set_tool('markupedit', {});
    }
}

export function RxCore_MarkupErase(selected:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    if (selected) {
        set_tool('pencil', {p1 : 1});
        //tool = new tools['pencil'](1);
    } else {
        if(Globals.tool.name == 'pencil' && Globals.tool.started){
            Globals.tool.apply();
        }
        set_tool('markupedit', {});
    }
}

export function RxCore_MarkupSave(unselect:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    if(!unselect) {
        unselelectallmarkup();
        unselecteditmarkupall();
    }
    sendMarkup(Globals.xmlurlmarkupsave, Globals.signature, Globals.DisplayName);
}

export function RxCore_canvToImage() {
    if (!Globals.documentopen) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        post3DImageData();
    }
}

export function RxCore_ExportFile(consolidate:any, format:any, UPI:any, paperSize:any, markupFlag:any ){
    if (!Globals.documentopen) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    exportFile(consolidate,format,UPI,paperSize,markupFlag);
}

export function RxCore_PDFExport() {
    if (!Globals.documentopen) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    PDExportnew();
}

export function RxCore_applyCircleMarkup(){
    if(Globals.tool.name == 'arrow' && Globals.tool.started){
        Globals.tool.apply();
    }
}

export function RxCore_applyArrowMarkup(){
    if(Globals.tool.name == 'arrow' && Globals.tool.started){
        Globals.tool.apply();
    }
}

export function RxCore_applyAreaMarkup(){
    if(Globals.tool.name == 'area' && Globals.tool.started){
        Globals.tool.apply();
    }
}

export function RxCore_applyPolygonMarkup(){
    RxCore_applyAreaMarkup();
}

export function RxCore_applyPolyLineMarkup(){
    RxCore_applyAreaMarkup();
}

export function RxCore_applyMeasurePathMarkup(){
    RxCore_applyAreaMarkup();
}

export function RxCore_applyRadiusSelected(radius:any){
    RxCore_applyAngleLengthSelected(0,radius);
}

export function RxCore_applyAngleLengthSelected(angle:any, length:any, type:any=undefined){
    const markupobject:any = getSelectedmarkup();
    if (!markupobject.isempty){
        if(markupobject.anglelengthsupport || markupobject.setRadiusSupport){
            const curx2 = markupobject.w;
            const cury2 = markupobject.h;

            const curx1 = markupobject.x;
            const cury1 = markupobject.y;

            const secondpoint = markupobject.setAngleLenghtEdit(length, angle, type);
            Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

            if (MousePosdrwext({x:secondpoint.w,y:secondpoint.h})){

                markupobject.w = secondpoint.w;
                markupobject.h = secondpoint.h;
                //markupobject.AdjustForRotation(true);
                //markupobject.x = curx1;
                //markupobject.y = cury1;

                drawmarkupAll(Globals.cntximg);
                DrawMarkupSelected(context);
            }else{
                //markupobject.w = curx2;
                //markupobject.h = cury2;

                drawmarkupAll(Globals.cntximg);
                DrawMarkupSelected(context);

                if (RxCore_GUI_markupParamsError != undefined){
                    RxCore_GUI_markupParamsError.onDrawError('outside');
                }
            }
        }
    }
}

export function RxCore_applyAngleLength(angle:any, length:any, type:any){
    if(Globals.tool.anglelengthsupport && Globals.tool.started){
        Globals.tool.setAngleLength(angle, length, type);
    }
}

export function RxCore_MarkupHighlight(selected:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    if (selected) {
        set_tool('marker', {});
        //tool = new tools['marker']();
    } else {
        set_tool('markupedit', {});
    }
}

export function Rxcore_MarkupSymbol(selected:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();

    if (selected) {
        set_tool('symbol', {});
        //tool = new tools['symbol']();
    }else{
        set_tool('markupedit', {});
    }
}

export function RxCore_MarkupShape(selected:any, type:any, subtype:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    if (selected) {
        switch (type) {
            case 0:
                set_tool('rect', {p1 : subtype});
                //tool = new tools['rect'](subtype);
                break;
            case 1:
                set_tool('oval', {p1 : subtype});
                //tool = new tools['oval']();
                break;
            case 2:
                set_tool('cloud', {});
                //tool = new tools['cloud']();
                break;
            case 3:
                //set_tool('polygon', {});
                set_tool('area', {p1 : 1, p2 : 2});
                //tool = new tools['polygon']();
                break;
        }
    } else {
        set_tool('markupedit', {});
    }
}

export function RxCore_MarkupLine(selected:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    if (selected) {
        set_tool('arrow', {p1 : 9});
        //tool = new tools['arrow'](type);
    } else {
        set_tool('markupedit', {});
    }
}

export function RxCore_MarkupCircle(selected:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }

    unselelectallmarkup();
    unselecteditmarkupall();

    if (selected) {
        set_tool('arrow', {p1 : 10});
        //tool = new tools['arrow'](type);
    } else {
        set_tool('markupedit', {});
    }
}

export function RxCore_MarkupArrow(selected:any, type:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    if (selected) {
        set_tool('arrow', {p1 : type});
        //tool = new tools['arrow'](type);
    } else {
        set_tool('markupedit', {});
    }
}

export function RxCore_MarkupDimension(selected:any, type:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    if (selected) {
        set_tool('measure', {p1 : type});
        //tool = new tools['measure'](type);
    } else {
        set_tool('markupedit', {});
    }
}

export function RxCore_MarkupArea(selected:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    if (selected) {
        set_tool('area', {p1 : 8});
        //tool = new tools['area']();
    } else {
        set_tool('markupedit', {});
    }
}

export function RxCore_MarkupMeasurePath(selected:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    if (selected) {
        //set_tool('polyline', {p1 : 3});
        set_tool('area', {p1 : 1, p2 : 3});
        //tool = new tools['polyline'](3);
    } else {
        set_tool('markupedit', {});
    }
}

export function RxCore_MarkupPolyline(selected:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    if (selected) {
        //set_tool('polyline', {p1 : 1});
        set_tool('area', {p1 : 1, p2 : 1});
        //tool = new tools['polyline'](1);
    } else {
        set_tool('markupedit', {});
    }
}

export function RxCore_MarkupPolycurve(selected:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    if (selected) {
        set_tool('Polycurve', {p1 : 1});
        //tool = new tools['Polycurve'](1);
    } else {
        set_tool('markupedit', {});
    }
}

export function RxCore_MarkupFreepen(selected:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    if (selected) {
        set_tool('pencil', {p1 : 0});
        //tool = new tools['pencil'](0);
    } else {
        if(Globals.tool.name == 'pencil' && Globals.tool.started){
            Globals.tool.apply();
        }
        set_tool('markupedit', {});
    }
}

export function RxCore_Calibrate(selected:any) {
    if (!Globals.documentopen) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    if (selected) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].enableSnap(true);
        set_tool('calibrate', {});
        //tool = new tools['calibrate']();
    } else {
        Globals.DocObj.pages[Globals.DocObj.currentpage].enableSnap(true);
        set_tool('markupedit', {});
    }
}

export function RxCore_setLabelSize(num:any){
    const tempsize = Globals.nLabelTextsize;
    Globals.nLabelTextsize = num;
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode) {
        return;
    }

    ChangeMarkupSelected(11);
    if (!Globals.bSetGlobal) {
        Globals.nLabelTextsize = tempsize;
    }
}

export function RxCore_setArrowSize(num:any){
    const tempsize = Globals.nArrowSize;
    Globals.nArrowSize = num;
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode) {
        return;
    }
    ChangeMarkupSelected(10);
    if (!Globals.bSetGlobal) {
        Globals.nArrowSize = tempsize;
    }
}

export function RxCore_SetLineStyle(linestyle:any) {
    /*if (!documentopen) {
        return;
    }
    if (readonlymode) {
        return;
    }*/
    const tempstyle = Globals.nlinestyle;
    Globals.nlinestyle = linestyle;
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode) {
        return;
    }
    ChangeMarkupSelected(9);
    if (!Globals.bSetGlobal) {
        Globals.linewidthvalue = tempstyle;
    }

    /*if (linestyle == 'Ã¢â‚¬â€Ã¢â‚¬â€Ã¢â‚¬â€Ã¢â‚¬â€') {
        nlinestyle = 0;

    } //solid
    if (linestyle == 'Ã¢â‚¬â€œ Ã¢â‚¬â€œ Ã¢â‚¬â€œ Ã¢â‚¬â€œ Ã¢â‚¬â€œ ') {
        nlinestyle = 1;
    } //dashed
    if (linestyle == 'Ã‚Â· Ã‚Â· Ã‚Â· Ã‚Â· Ã‚Â· Ã‚Â· Ã‚Â· ') {
        nlinestyle = 2;
    } //dotted
    if (linestyle == 'Ã¢â‚¬â€œ Ã‚Â· Ã‚Â· Ã¢â‚¬â€œ Ã‚Â· Ã‚Â· ') {
        nlinestyle = 3;
    } //dash dot dot dash
    if (linestyle == 'Ã¢â‚¬â€œ Ã‚Â· Ã¢â‚¬â€œ Ã‚Â· Ã¢â‚¬â€œ Ã‚Â· ') {
        nlinestyle = 4;
    } //dash dot*/
}

export function RxCore_SetLineWidthUnits(value:any, type:any){
    const tempwidht = Globals.linewidthvalue;
    //var scale = DocObj.pages[DocObj.currentpage].getdscale();
    const fixedscale = Globals.DocObj.pages[Globals.DocObj.currentpage].fixedScale;
    //value = (value * (scale / fixedscale)) / (scale / fixedscale);
    Globals.linewidthvalue = getScreenDim(value, type);
    Globals.linewidthvalue *= fixedscale;
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode) {
        return;
    }
    ChangeMarkupSelected(2);
    if (!Globals.bSetGlobal) {
        Globals.linewidthvalue = tempwidht;
    }
}

export function RxCore_SetDimOffset(value:any) {
    if (!Globals.documentopen) {
        return;
    }
    if(Globals.readonlymode){
        return;
    }
    let markupobject:any = getSelectedmarkup();
    if(!markupobject.isempty && markupobject.type == 7){
        markupobject.leaderoffset = value;
    }
    drawmarkupAll(Globals.cntximg);
    DrawMarkupSelected(Globals.context);
}

export function RxCore_SetLineWidth(value:any) {
    const tempwidht = Globals.linewidthvalue;
    Globals.linewidthvalue = value;
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode) {
        return;
    }
    ChangeMarkupSelected(2);
    if (!Globals.bSetGlobal) {
        Globals.linewidthvalue = tempwidht;
    }
}

export function RxCore_GetLineWidth() {
    return Globals.linewidthvalue;
}

export function RxCore_SetUnit(value:any) {
    /*for (i=0;i<this.childElementCount;i++){
     if(this.children[i].className == 'selected'){
     var szUnit = this.children[i].textContent;
     }
     }*/
    /*if (value=='Metric'){Unitofmeasure=1;}
     if (value=='Imperial'){Unitofmeasure=2;}
     if (value=='System'){Unitofmeasure=3;}
     if (value=='Custom'){Unitofmeasure=4;}*/
    //var unitdropdwn = document.getElementById('unitdropdown');

    switch (value) {
        case 1:
            Globals.Unitlabel = "mm";
            Globals.AreaUnitlabel = "mm\u00B2";
            //unitdropdwn.setAttribute('ref','metricunits');
            //unitdropdwn.children[0].value = "Millimeter";
            break;
        case 2:
            Globals.Unitlabel = "in.";
            Globals.AreaUnitlabel = "sq.in.";
            //unitdropdwn.setAttribute('ref','imperialunits');
            //unitdropdwn.children[0].value = "Inch";
            break;
        case 3:
            Globals.Unitlabel = "Units";
            Globals.AreaUnitlabel = "Units\u00B2";
            break;
    }
    Globals.Unitofmeasure = value;
}

export function RxCore_allowLayerChange(onoff:any){ // TODO:JS->TS:INFO empty function

}

export function RxCore_getUser(){

    //signature = szCurrentUser;
    //DisplayName = szDisplayName;
    getUserInfo();
    //Userlist[0] = new Users(signature, DisplayName, markuplayer, markupcolor);
}

export function RxCore_setEndPoints(szXmlUrlmarkup: any,szMarkupSaveUrl: any,szFileExport: any,sz3DImage: any,szgetUserInfo: any){
    Globals.xmlurlmarkup = szXmlUrlmarkup;
    Globals.xmlurlmarkupsave = szMarkupSaveUrl;
    Globals.PDFExportURL = szFileExport;
    Globals.CanvasSaveUrl = sz3DImage;
    Globals.userInfoURL = szgetUserInfo;
    Globals.bPDFExportfullPath = true;
}

export function RxCore_SetGlobalStyle(global:any) {
    Globals.bSetGlobal = global;
}

export function RxCore_SetFontBold(onoff:any) {
    const tempbold = Globals.defaultFont.bold;
    Globals.defaultFont.bold ? Globals.defaultFont.setBold(false) : Globals.defaultFont.setBold(true);
    //defaultFont.setBold(onoff);
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode) {
        return;
    }
    ChangeMarkupSelected(4);
    if (!Globals.bSetGlobal) {
        Globals.defaultFont.setBold(tempbold); // temobold); // TODO:JS->TS:FIX temobold declaration does not exists. Assumed typo for tempbold
    }
}

export function RxCore_SetFontItalic(onoff:any) {
    const tempitalic = Globals.defaultFont.italic;
    Globals.defaultFont.italic ? Globals.defaultFont.setItalic(false) : Globals.defaultFont.setItalic(true);
    //defaultFont.setItalic(onoff);
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode) {
        return;
    }
    ChangeMarkupSelected(4);
    if (!Globals.bSetGlobal) {
        Globals.defaultFont.setItalic(tempitalic);

    }
}

export function RxCore_SetFontHeight(value: any) {
    //console.log('RxCore_SetFontHeight', value);
    const tempheight = Globals.defaultFont.height;
    Globals.defaultFont.setHeight(value);
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode) {
        return;
    }
    ChangeMarkupSelected(4);
    if (!Globals.bSetGlobal) {
        Globals.defaultFont.setHeight(tempheight);
    }
}

export function RxCore_SetFont(value: any) {
    const tempfont = Globals.defaultFont.fontName;
    Globals.defaultFont.setFontname(value);
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode) {
        return;
    }

    ChangeMarkupSelected(4);
    if (!Globals.bSetGlobal) {
        Globals.defaultFont.setFontname(tempfont);
        //fontstylevalue = tempfont;
    }
}

export function RxCore_GetFont() {
    return Globals.defaultFont;
}

export function RxCore_GetFixedScale(){
    if (!Globals.documentopen) {
        return 1;
    }
    let scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector; // markupobject.scaling;
    } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
        scalefactor = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf); // markupobject.scaling;
    } else {
        scalefactor = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale; // markupobject.scaling;
        if (Globals.DocObj.Type == 0) {
            scalefactor = Globals.DocObj.pages[0].dscale; // markupobject.scaling;
        }
    }

    let fixedScale = scalefactor / Globals.DocObj.pages[Globals.DocObj.currentpage].fixedScale;
    if (Globals.bUseFixedScale){
        return fixedScale;
    }else{
        return 1;
    }
}

export function RxCore_MarkupHatch(style: any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    const tempstyle = Globals.HatchStyle;
    Globals.HatchStyle = style;
    ChangeMarkupSelected(3);
    if (!Globals.bSetGlobal) {
        Globals.HatchStyle = tempstyle;
    }
    /*

     if (szhatchpattern == 'Forward Diagonal'){ HatchStyle = 0;}
     if (szhatchpattern == 'Backward Diagonal'){ HatchStyle = 1;}
     if (szhatchpattern == 'Diagonal Cross'){ HatchStyle = 2;}
     if (szhatchpattern == 'Horizontal'){ HatchStyle = 3;}
     if (szhatchpattern == 'vertical'){ HatchStyle = 4;}
     if (szhatchpattern == 'Cross'){ HatchStyle = 5;}
     // change hatch style for selected markup if applicable.


     }*/
}

export function RxCore_GetMarkupHatch() {
    return Globals.HatchStyle;
}

export function RxCore_MetricUnit(unit: any) {
    if (unit == 'Millimeter') {
        Globals.SubmeasureUnit = 1;
    }
    if (unit == 'Centimeter') {
        Globals.SubmeasureUnit = 2;
    }
    if (unit == 'Decimeter') {
        Globals.SubmeasureUnit = 3;
    }
    if (unit == 'Meter') {
        Globals.SubmeasureUnit = 4;
    }
    if (unit == 'Kilometer') {
        Globals.SubmeasureUnit = 5;
    }
    if (unit == 'Nautical Miles') {
        Globals.SubmeasureUnit = 6;
    }

    switch (Globals.SubmeasureUnit) {
        case 1:
            Globals.Unitlabel = "mm";
            Globals.AreaUnitlabel = "mm\u00B2";
            Globals.unitscale = 1;
            break;
        case 2:
            Globals.Unitlabel = "cm";
            Globals.AreaUnitlabel = "cm\u00B2";
            Globals.unitscale = 10;
            break;
        case 3:
            Globals.Unitlabel = "dm";
            Globals.AreaUnitlabel = "dm\u00B2";
            Globals.unitscale = 100;
            break;
        case 4:
            Globals.Unitlabel = "m";
            Globals.AreaUnitlabel = "m\u00B2";
            Globals.unitscale = 1000;
            break;
        case 5:
            Globals.Unitlabel = "km";
            Globals.AreaUnitlabel = "km\u00B2";
            Globals.unitscale = 1000000;
            break;
        case 6:
            Globals.Unitlabel = "nmi";
            Globals.AreaUnitlabel = "nmi\u00B2";
            Globals.unitscale = 185200000;
            break;
    }
}

export function RxCore_ImperialUnit(unit: any) {
    if (unit == 'Inch') {
        Globals.SubmeasureUnit = 1;
    }
    if (unit == 'Feet') {
        Globals.SubmeasureUnit = 2;
    }
    if (unit == 'Yard') {
        Globals.SubmeasureUnit = 3;
    }
    if (unit == 'Mile') {
        Globals.SubmeasureUnit = 4;
    }
    if (unit == 'Nautical Miles') {
        Globals.SubmeasureUnit = 5;
    }

    switch (Globals.SubmeasureUnit) {
        case 1:
            Globals.Unitlabel = "in.";
            Globals.AreaUnitlabel = "sq.in.";
            Globals.unitscale = 1;
            break;
        case 2:
            Globals.Unitlabel = "ft.";
            Globals.AreaUnitlabel = "sq.ft.";
            Globals.unitscale = 12;
            break;
        case 3:
            Globals.Unitlabel = "yd.";
            Globals.AreaUnitlabel = "sq.yd.";
            Globals.unitscale = 36;
            break;
        case 4:
            Globals.Unitlabel = "mi.";
            Globals.AreaUnitlabel = "sq.mi";
            Globals.unitscale = 63360;
            break;
        case 5:
            Globals.Unitlabel = "nm";
            Globals.AreaUnitlabel = "sq.nm";
            Globals.unitscale = 72913.3858;
            break;
    }
}

export function RxCore_setCalibration(scale: any){
    if(Globals.documentopen){
        Globals.DocObj.pages[Globals.DocObj.currentpage].setCalibrateScale(scale);
    }
}

export function RxCore_scale(scale: any) {
    let numerator = 0;
    let denomintaor = 0;
    /*for (i=0;i<this.childElementCount;i++){
     if(this.children[i].className == 'selected'){
     var szScale = this.children[i].textContent;
     }
     }*/

    if(Globals.documentopen){
        Globals.DocObj.pages[Globals.DocObj.currentpage].setMeasureScale(scale);

    }else{
        if (scale != 'Calibration') {
            const numarr = scale.split(":");
            numerator = numarr[0];
            denomintaor = numarr[1];
            if (Globals.bReverseScale) {
                Globals.MeasureScale = denomintaor / numerator;
            } else {
                Globals.MeasureScale = numerator / denomintaor;
            }
        } else {
            Globals.MeasureScale = Globals.nCalibrateScale;
        }
    }
}

export function RxCore_MarkupAddBlockText(BlockId: any, height: any, text:any, color: any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }

    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        let centroid = Globals.DocObj.pages[Globals.DocObj.currentpage].getBlockCentroid(BlockId);
        let textsize = Globals.DocObj.pages[Globals.DocObj.currentpage].getpixeldist(height);
        let textsizept = textsize * 0.75; //convert px to pt.

        let textmarkupobj = new MarkupObject(9, 1, 0);

        textmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].getdscale();
        textmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].getdx();
        textmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].getdy();


        textmarkupobj.font.setFontname(Globals.defaultFont.fontName);
        textmarkupobj.font.setHeight(textsizept);
        textmarkupobj.font.setBold(Globals.defaultFont.bold);
        textmarkupobj.font.setItalic(Globals.defaultFont.italic);

        let textdim = getTextdim(Globals.cntximg,text, textmarkupobj.font);

        textmarkupobj.linewidth = 0.5;
        textmarkupobj.w = textdim.w;
        textmarkupobj.h = textdim.h;

        textmarkupobj.x = centroid.x - (textmarkupobj.w/2);
        textmarkupobj.y = centroid.y - (textmarkupobj.h/2);

        textmarkupobj.text = text;

        textmarkupobj.fillcolor = "rgba(255,255,255, 0.9)";
        textmarkupobj.textcolor = color;
        textmarkupobj.strokecolor = color;
        textmarkupobj.pagerotation = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation;
        textmarkupobj.pagenumber = Globals.DocObj.getcurPage();

        textmarkupobj.savemetolistDraw();
    }
    drawmarkupAll(Globals.cntximg);
}

export function RxCore_TextRect(selected: any, callback: any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }

    if (selected) {
        unselelectallmarkup();
        unselecteditmarkupall();

        set_tool('rectText',{});

        //tool = new tools['rectText']();
    } else {
        /*if (RxCore_GUI_TextInput != undefined) {
            RxCore_GUI_TextInput.operation.start = false;
            RxCore_GUI_TextInput.operation.create = false;
            RxCore_GUI_TextInput.operation.edit = true;
            RxCore_GUI_TextInput.operation.save = false;


            RxCore_GUI_TextInput.setTextInput(tool.x,tool.y,tool.w,tool.h);

        }*/

        set_tool('markupedit',{});

    }

    if (RxCore_GUI_TextInput && callback && typeof callback === "function") {
        RxCore_GUI_TextInput.connect(callback);
    }
}

export function RxCore_setConfiguration(configURL: any){
    Globals.configurationLocation = configURL;
    Globals.bUsecustomConfig = true;
}

export function RxCore_StampMarkup(Text:any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }
    unselelectallmarkup();
    unselecteditmarkupall();
    set_tool('rectStamp', {p1 : Text});
    //tool = new tools['rectStamp'](Text);
}

export function RxCore_MarkupStamp(Text:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.readonlymode || Globals.documentcompare) {
        return;
    }

    unselelectallmarkup();
    unselecteditmarkupall();
    let stamptype = 0;
    //var szstamp = Text;

    for (let i = 0; i < Globals.Stamplist.length; i++) {
        if (Globals.Stamplist[i] == Text) {
            stamptype = i;
        }
    }

    //width of stamp = 200 pixels.
    //1/3 from top of display.
    //height of stamp = 1/4 of width
    //font size = 62 for main text 31 for small text.
    //height of stamp = height of text + 30 percent

    let stampmarkupobj;
    if (stamptype < Globals.Stamplist.length - 2) {
        stampmarkupobj = new MarkupObject(12, stamptype, 0);
        stampmarkupobj.w = 200;
        stampmarkupobj.h = 124;
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
        stampmarkupobj.pagenumber = Globals.DocObj.getcurPage();
        stampmarkupobj.editaction = 0;

        stampmarkupobj.textheight = 32;
        stampmarkupobj.stampsmalltheight = 16;

        stampmarkupobj.x = (startx + ((endx - startx) / 2)) - (stampmarkupobj.w / 2);
        stampmarkupobj.y = (starty + ((endy - starty) / 2)) - (stampmarkupobj.h / 2);

        if (!Globals.bMultimarkupadd) {
            Globals.bMarkupcrated = true;
            //ft 08.08.2018 changed from separate index to direct array length
            //nMarkupcreated = DocObj.nummarkups;
            Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
        }

        stampmarkupobj.drawme(Globals.context);
        stampmarkupobj.savemetolistDraw();
    } else {
        stampmarkupobj = new MarkupObject(9, 0, 0);
        let ntexwtsize = 100; // TODO:JS->TS:CHECK moved initialization up since the var was being used in the if/else below

        if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
            stampmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscalevector;
            stampmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector;
            stampmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector;
            stampmarkupobj.x = (Globals.DocObj.pages[Globals.DocObj.currentpage].dxvector + (Globals.DocObj.pages[Globals.DocObj.currentpage].endx / 2)) - ntexwtsize; // - (stampmarkupobj.w / 2);
            stampmarkupobj.y = (Globals.DocObj.pages[Globals.DocObj.currentpage].dyvector + (Globals.DocObj.pages[Globals.DocObj.currentpage].endy / 2)) + (stampmarkupobj.textheight / 2);
        } else if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
            stampmarkupobj.scaling = (Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf);
            stampmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf;
            stampmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf;
            stampmarkupobj.x = (Globals.DocObj.pages[Globals.DocObj.currentpage].dxpdf + (Globals.DocObj.pages[Globals.DocObj.currentpage].endx / 2)) - ntexwtsize; // - (stampmarkupobj.w / 2);
            stampmarkupobj.y = (Globals.DocObj.pages[Globals.DocObj.currentpage].dypdf + (Globals.DocObj.pages[Globals.DocObj.currentpage].endy / 2)) + (stampmarkupobj.textheight / 2);
        } else {
            stampmarkupobj.scaling = Globals.DocObj.pages[Globals.DocObj.currentpage].dscale;
            stampmarkupobj.xoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dx;
            stampmarkupobj.yoffset = Globals.DocObj.pages[Globals.DocObj.currentpage].dy;
            stampmarkupobj.x = (Globals.DocObj.pages[Globals.DocObj.currentpage].dx + (Globals.DocObj.pages[Globals.DocObj.currentpage].endx / 2)) - ntexwtsize; // - (stampmarkupobj.w / 2);
            stampmarkupobj.y = (Globals.DocObj.pages[Globals.DocObj.currentpage].dy + (Globals.DocObj.pages[Globals.DocObj.currentpage].endy / 2)) + (stampmarkupobj.textheight / 2);
        }
        stampmarkupobj.pagenumber = Globals.DocObj.getcurPage();
        stampmarkupobj.editaction = 0;
        stampmarkupobj.textheight = 32;
        // var ntexwtsize = 100; // TODO:JS->TS:CHECK moved initialization up since the var was being used before this line
        if (Globals.Stamplist[stamptype] == 'Date') {
            stampmarkupobj.text = stampmarkupobj.GetDateTime(false);
            ntexwtsize = 90;
        }

        if (Globals.Stamplist[stamptype] == 'User Name') {
            stampmarkupobj.text = GetDisplayName(stampmarkupobj.signature);
        }

        //stampmarkupobj.text = Stamplist[stamptype];

        //stampmarkupobj.w = 200;
        //stampmarkupobj.h = 124;

        //stampmarkupobj.x = (canvas.width / 2)-ntexwtsize;// - (stampmarkupobj.w / 2);
        //stampmarkupobj.y = (canvas.height / 2) + (stampmarkupobj.textheight / 2);

        //stampmarkupobj.stampsmalltheight = 16;

        stampmarkupobj.drawme(Globals.context);
        if (!Globals.bMultimarkupadd) {

            Globals.bMarkupcrated = true;
            //ft 08.08.2018 changed from separate index to direct array length
            //nMarkupcreated = DocObj.nummarkups;
            Globals.nMarkupcreated = Globals.DocObj.markuplist.length;
        }

        stampmarkupobj.savemetolistDraw();
    }
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

export function RxCore_MSIEeventCheck(onoff: any){
    Globals.bDisableMSIE11Eventcheck = onoff;
}

export function RxCore_PickPolygon(selected: any, multi: any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.documentcompare) {
        return;
    }
    if (!selected) {
        set_tool('markupedit', {});

        return;
    }
    unselelectallmarkup();
    set_tool('pickPolygon', {p1 : multi});
    //tool = new tools['pickPolygon'](multi);
}

export function RxCore_KeepvectorColor(OnOff: any){
    /*if (!documentopen) {
     return;
     }*/

    Globals.bKeepVectorColor = OnOff;
}

export function RxCore_DrawPoints(){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].drawpoints(Globals.DocObj.pages[Globals.DocObj.currentpage].PDFPointArray,Globals.DocObj.pages[Globals.DocObj.currentpage].pdfSnapScale);
    }
}

export function Rxcore_BackgroundColor(color: any){
    Globals.backgroundColor = color;
}

export function RxCore_BackgroundCustomColor(color: any){
    if (!Globals.documentopen) {
        return;
    }
    Globals.backgroundCustomColor = color;
    Globals.bCustomColor = true;

    Globals.DocObj.backgroundColor = Globals.backgroundCustomColor;

    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].draw_vector(true);
    }
    drawmarkupAll(Globals.cntximg);
}

export function RxCore_setdisplayBackground(color: any){
    Globals.displayBGColor = color;

    if (Globals.documentopen) {
        if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
            Globals.DocObj.pages[Globals.DocObj.currentpage].draw_vector(true);
        }
        drawmarkupAll(Globals.cntximg);
    }
}

export function RxCore_togglebackground() {
    if (!Globals.documentopen) {
        return;
    }

    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
        Globals.DocObj.backgroundColor = "#FFFFFF";
    } else {
        if(Globals.bCustomColor){
            if (Globals.DocObj.backgroundColor == Globals.backgroundCustomColor) {
                Globals.DocObj.backgroundColor = "#A0A0A0";
            }else if (Globals.DocObj.backgroundColor == "#A0A0A0") {
                Globals.DocObj.backgroundColor = "#FFFFFF";
            } else if (Globals.DocObj.backgroundColor == "#FFFFFF") {

                Globals.DocObj.backgroundColor = "#000000";

            } else if (Globals.DocObj.backgroundColor == "#000000") {
                Globals.DocObj.backgroundColor = Globals.backgroundCustomColor;
                Globals.bKeepVectorColor = !Globals.bKeepVectorColor;
            }
        }else{
            if (Globals.DocObj.backgroundColor == "#A0A0A0") {
                Globals.DocObj.backgroundColor = "#FFFFFF";
            } else if (Globals.DocObj.backgroundColor == "#FFFFFF") {

                Globals.DocObj.backgroundColor = "#000000";

            } else if (Globals.DocObj.backgroundColor == "#000000") {
                Globals.DocObj.backgroundColor = "#A0A0A0";
                Globals.bKeepVectorColor = !Globals.bKeepVectorColor;
            }

        }

    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
        Globals.DocObj.pages[Globals.DocObj.currentpage].draw_vector(true);
    }
    drawmarkupAll(Globals.cntximg);
}


export function RxCore_3DSelect(selected: any) {
    set3DToolType(selected, 'select3d');
}

export function RxCore_3DToggleVisible(selected:any) {
    set3DToolType(selected, 'hide3d');
}

export function RxCore_unSelectAllMarkup(){
    if (!Globals.documentopen) {
        return;
    }

    unselelectallmarkup();
    unselecteditmarkupall();

    if(RxCore_GUI_Markuplist != undefined){
        RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist);
    }
}

export function RxCore_UseFixedScale(onoff: any){
    Globals.bUseFixedScale = onoff;
}

export function RxCore_UseOrtho(onoff: any, degree: any){
    Globals.bOrthoOn = onoff;
    Globals.nOrthoDegree = degree;
}

export function RxCore_SetGUIDMarkupSelected(){
    if (!Globals.documentopen) {
        return;
    }
    if(Globals.readonlymode){
        return;
    }
    const markupobject:any = getSelectedmarkup();

    if(!markupobject.isempty){
        markupobject.setRxUniqueID();
    }
}

export function RxCore_AutoLoadThumbnails(onoff:any){
    Globals.bAutoloadThumbnails = onoff;
}

export function RxCore_LoadThumbnails(){
    if (!Globals.documentopen) {
        return;
    }

    Globals.DocObj.thumbnails = [];

    for(let i = 0; i < Globals.DocObj.pages.length; i++){
        Globals.DocObj.pages[i].thumbnailobj.source = Globals.DocObj.pages[i].ThumbnailImageSRC;
        Globals.DocObj.pages[i].thumbloaded = true;
        Globals.DocObj.pages[i].thumbload();
        Globals.DocObj.thumbnails.push(Globals.DocObj.pages[i].getThumbnail);
    }

   if (RxCore_GUI_pagethumbs != undefined) {
        RxCore_GUI_pagethumbs.setThumbnails(Globals.DocObj.thumbnails);
   }
}

export function RxCore_LockMarkupbyGUID(GUID: any, onOff: any){
    if (!Globals.documentopen) {
        return;
    }

    for (let curdoc = 0;curdoc < Globals.OpenFiles.length;curdoc++){
        Globals.OpenFiles[curdoc].lockMarkupbyGUID(GUID, onOff);
    }
}

// TODO:JS->TS:CHECK check the implementation of this function
export function RxCore_getMarkupByGUID(GUID: any){
    if (!Globals.documentopen) {
        return;
    }

    for (let curdoc = 0;curdoc < Globals.OpenFiles.length;curdoc++){
        const markupxml = Globals.OpenFiles[curdoc].getmarkupbyGUIDXML(GUID); // TODO:JS->TS:ADJUST markupxml is not used
    }
}

export function RxCore_getMarkupXMLByGUID(GUID: any){
    if (!Globals.documentopen) {
        return;
    }

    let markupxml;
    for (let curdoc = 0;curdoc < Globals.OpenFiles.length;curdoc++){
        markupxml = Globals.OpenFiles[curdoc].getmarkupbyGUIDXML(GUID);
    }

    return markupxml;  // TODO:JS->TS:CHECK only the last value from the for?
}

/*function RxCore_getmarkupbyGUID(GUID){
    if (!documentopen) {
        return;
    }

    for (var curdoc = 0;curdoc < OpenFiles.length;curdoc++){
        var markupxml = OpenFiles[curdoc].getmarkupbyGUIDXML(GUID);
    }



}*/


export function RxCore_getmarkupobjByGUID(GUID: any){
    if (!Globals.documentopen) {
        return;
    }
    return Globals.DocObj.getmarkupobjbyGUID(GUID);
}

export function RxCore_unSelectMarkupbyGUID(GUID: any){
    if (!Globals.documentopen) {
        return;
    }
    const indx = Globals.DocObj.getmarkupbyGUID(GUID);
    if(indx != -1){
        RxCore_unSelectMarkupbyIndex(indx);
    }
}

export function RxCore_SelectMarkupbyGUID(GUID: any){
    if (!Globals.documentopen) {
        return;
    }
    const indx = Globals.DocObj.getmarkupbyGUID(GUID);
    if(indx != -1){
        RxCore_SelectMarkupbyIndex(indx);
    }
}

export function RxCore_unSelectMarkupbyIndex(indx: any){
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.markuplist.length - 1 < indx ){
        return;
    }
    if(Globals.DocObj.markuplist[indx].locked){
        return;
    }
    unselectmarkup(indx);

    if (RxCore_GUI_Markuplist != undefined) {
        RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist);
    }

    drawmarkupAll(Globals.cntximg);
    DrawMarkupSelected(Globals.context);

    //set_tool('markupedit', {});
}

export function RxCore_SelectMarkupbyIndex(indx: any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.markuplist.length - 1 < indx ){
        return;
    }
    if(Globals.DocObj.markuplist[indx].locked){
        return;
    }

    if(Globals.consolidateObj.isactive){
        unselectmarkup(indx);
    }else{
        if(!Globals.bMultiselect){
            unselelectallmarkup();
        }
    }

    if (Globals.DocObj.getcurPage() != Globals.DocObj.markuplist[indx].pagenumber) {
        Globals.DocObj.GotoPage(Globals.DocObj.markuplist[indx].pagenumber);
    }

    if (Globals.DocObj.markuplist[indx].selectedit) {
        Globals.DocObj.markuplist[indx].selected = false;
    } else {
        Globals.DocObj.markuplist[indx].selected = true;
        /* Andriy TODO: Commented as Temporarely fix */
//            DocObj.pages[DocObj.currentpage].SetMarkupZoom(DocObj.markuplist[indx].docdx, DocObj.markuplist[indx].docdy, DocObj.markuplist[indx].docdscale);
        if (RxCore_GUI_Markup != undefined) {
            if(Globals.DocObj.markuplist[indx].signature == Globals.signature){
                const operation = {created : false, modified : false, deleted : false};
                RxCore_GUI_Markup.setMarkupSelected(Globals.DocObj.markuplist[indx], operation);
            }

            /*if(RxCore_GUI_Markuplist != undefined){
                RxCore_GUI_Markuplist.setMarkupList(DocObj.markuplist);
            }*/

            /* Andriy */
            //RxCore_GUI_Markuplist.notify();
        }
        if (RxCore_GUI_Markuplist != undefined) {

            RxCore_GUI_Markuplist.setMarkupList(Globals.DocObj.markuplist);
        }
    }

    drawmarkupAll(Globals.cntximg);
    DrawMarkupSelected(Globals.context);

    /*if(RxCore_GUI_Markuplist != undefined){
     RxCore_GUI_Markuplist.setMarkupList(DocObj.markuplist);
     }*/

    // console.log('selectmarkupbyindex');
    // set_tool('markupedit', {});
}

export function RxCore_setLayout(offsetWidth: any, offsetHeight: any) {
    Globals.defaultLayout.offsetWidth = Globals.defaultLayout.offsetWidth || offsetWidth;
    Globals.defaultLayout.offsetHeight = Globals.defaultLayout.offsetHeight || offsetHeight;
}

export function RxCore_documentOpened() {
    return (typeof Globals.documentopen !== 'undefined' && Globals.documentopen);
}

/*function RxCore_getThumbnails(callback) {
    RxCore_GUI_pagethumbs.callback = callback;
    return RxCore_GUI_pagethumbs.thumbnails;
}*/

/*function RxCore_get3DBlocks(callback) {
    RxCore_GUI_3DParts.callback = callback;
    return RxCore_GUI_3DParts.parts;
}*/

/*function RxCore_get3DInfo(callback) {
    Rxcore_GUI_3DPartInfo.callback = callback;
    return Rxcore_GUI_3DPartInfo.info;
}*/

/*function RxCore_getAnnotations(callback) {
    RxCore_GUI_Markuplist.callback = callback;
    return RxCore_GUI_Markuplist.annotations;
}*/

/*function RxCore_getGUIState(callback) {
    RxCore_GUI_State.callback = callback;
    return RxCore_GUI_State.state;
}*/


export function RxCore_getFileInfo(callback: any) {
    RxCore_GUI_FileInfo.callback = callback;
    RxCore_FileInfodialog();
    return RxCore_GUI_FileInfo.fileinfo;
}

export function RxCore_markUpSelected(callback: any) {
    if (callback && typeof callback === "function") {
        RxCore_GUI_Markup.connect(callback);
    }
    //markUpSelected
    //RxCore_GUI_Markup.callback = callback;
    //RxCore_GUI_Markup.
}

/*function RxCore_onMeasureFinished(callback) {
    RxCore_GUI_Measurediag.callback = callback;
}*/

/*function RxCore_onCalibrateFinished(callback) {
    RxCore_GUI_Calibratediag.callback = callback;
}*/

export function RxCore_onTextPlaced(callback: any) {
    RxCore_GUI_Textdiag.callback = callback;
}

export function RxCore_setText(text: any) {
    RxCore_GUI_Textdiag.setText(text);
}

/*function RxCore_getNoteInput(callback){

    if (callback && typeof callback === "function") {
        RxCore_GUI_Notediag.connect(callback);
    }




|
}*/

export function RxCore_getTextInput(callback: any) {
    if (callback && typeof callback === "function") {
        connect(callback);
    }


    function connect(callback: any) {
        RxCore_GUI_TextInput.connect(callback);
    }

    function getText() {
        // @ts-ignore // TODO:JS->TS:CHECK
        return RxCore_GUI_TextInput.getText().text
    }

    function setText(text:any) {
        RxCore_GUI_TextInput.setText(text);
    }

    return {
        getText: getText,
        setText: setText,
        connect: connect
    }
}

// TODO:JS->TS:CHECK   // TODO:JS->TS:ADJUST
export function RxCore_getNoteDiag(callback: any) {

    if (callback && typeof callback === "function") {
        connect(callback);
    }

    function connect(callback: any) {
        RxCore_GUI_Notediag.connect(callback);
    }

    function getText() {
        return RxCore_GUI_Notediag.getText().text;
    }

    function setText(text: any) {
        RxCore_GUI_Notediag.setText(text);
    }

    return {
        getText: getText,
        setText: setText,
        connect: connect
    }
}

export function RxCore_getTextInputText() {
    // @ts-ignore
    return RxCore_GUI_TextInput.getText().text;
}

export function RxCore_setTextInputText(text: any) {
    return RxCore_GUI_TextInput.setText(text);
}

export function RxCore_onNotePlaced(callback: any) {
    RxCore_GUI_Notediag.callback = callback;
}

export function RxCore_setNoteText(text: any) {
    RxCore_GUI_Notediag.setText(text);
}

export function RxCore_ScaleonResize(toggle: any) {
    Globals.bDoReScaleOnSize = toggle;
}

export function RxCore_changeTextColor(color: any) {
    if(Globals.bCanChangeLayer){
        RxCore_ChangeColor(color, 2);
    }
}

export function RxCore_changeFillColorByIndex(indx: any, color: any) {
    RxCore_ChangeColorByIndex(indx,color, 0);
}

export function RxCore_changeFillColor(color: any) {
    RxCore_ChangeColor(color, 0);
}

export function RxCore_changeStrokeColor(color: any) {
    if(Globals.bCanChangeLayer){
        RxCore_ChangeColor(color, 1);
    }
}

export function RxCore_printhelper():any {
    return {
        areaUnitlabel:Globals.AreaUnitlabel,
        bMarkupNoLabel : Globals.bMarkupNoLabel,
        compareObj:Globals.CompareObj,
        docObj:Globals.DocObj,
        onPrintpage : RxCore_GUI_printpage,
        onPrintCompare : RxCore_GUI_printCompare,
        documentcompare:Globals.documentcompare,
        getDisplayName:GetDisplayName,
        getHatch : getHatch,
        getPageObject:GetPageObject,
        getPaperHeight:GetPaperHeight,
        getPaperWidth:GetPaperWidth,
        markupprintlist:Globals.markupprintlist,
        measureScale:Globals.MeasureScale,
        printfocus:printfocus,
        stampList:Globals.Stamplist,
        Userlist : Globals.Userlist,
        unitLabel:Globals.Unitlabel,
        unitOfMeasure:Globals.Unitofmeasure,
        unitscale:Globals.unitscale,
        getUnitArea: getUnitArea,
        xmlurlrel:Globals.xmlurlrel,
        bUseCustomrelpath : Globals.bUseCustomrelpath,
        xmlurlrelcustom : Globals.xmlurlrelcustom,
        noteimage : Globals.noteimage,
        bUseFixedScale : Globals.bUseFixedScale,
        fixedScale : Globals.DocObj.pages[Globals.DocObj.currentpage].fixedScale
    };
}

export function RxCore_getReadOnly(){
    return Globals.readonlymode;
}
