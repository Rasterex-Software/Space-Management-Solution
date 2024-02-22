// TODO:JS->TS:CHECK review the methods/objects exported and decide if they should be organised some other way, in other files

import {
    Globals,
    GetLicense,
    RxCore_GUI_HasText,
    RxCore_Closedocument,
    RxCore_GUI_pagethumbs,
    RxCore_GUI_State,
    RxCore_GUI_Page,
    RxCore_GUI_Download,
    FreeLicense,

    Users,
    DocumentObject,
    PageObject,
    ImageUploadProgress,
    ImageUploadComplete

} from '../internal';

export function getURLFile(s:string){
    let path = "";
    const sp = s.split('/');
    for (let i = 0; i < sp.length - 1; i++) {
        path += sp[i] + "/";
    }
    //var file = sp[sp.length-1];
    //alert(file);
    return sp[sp.length-1];

}

export function getURLPath(s:string) {
    let path = "";

    if(s){
        const sp = s.split('/');
        for (let i = 0; i < sp.length - 1; i++) {
            path += sp[i] + "/";
        }

        if (Globals.bUseID){
            path = Globals.xmlurlrel;
        }
    }
    //var file = sp[sp.length-1];
    //alert(file);
    return path;
}

export function getPath(s:string) {
    let path = "";
    const sp = s.split('\\');
    for (let i = 0; i < sp.length - 1; i++) {
        path += sp[i] + "\\";
    }
    //var file = sp[sp.length-1];
    //alert(file);
    if(!path) {
        path = s;
    }

    return path;

}

export function getFileName(s:string) {
 let path = ""; // TODO:JS->TS:FIX path does not appear to be used
 let file = "";
  if(s){
    if(s.indexOf('https://') > -1){
        file = getURLFile(s);
     }else if (s.indexOf('http://') > -1){
        file = getURLFile(s);
     }else{
        const sp = s.split('\\');
        for (let i = 0; i < sp.length - 1; i++) {
                path += sp[i] + "\\";
            }
        file = sp[sp.length - 1];
        //alert(file);
     }
  }
 return file;

}

// TODO:JS->TS:CHECK this was already commented out in the original and should probably be removed
/*function getFileName(s) {
    var path = "";
    var file = "";
    var sp = s.split('\\');
    for (var i = 0; i < sp.length - 1; i++) {
        path += sp[i] + "\\";
    }
    file = sp[sp.length - 1];
    //alert(file);
    return file;

}*/

export function addSlash(s:string) {
    let path = "";
    const sp = s.split('\\');
    for (let i = 0; i < sp.length; i++) {
        if (i < sp.length - 1) {
            path += sp[i] + "\\\\";
        } else {
            //path += sp[i];
        }

    }
    if(!path) {
        path = s;
    }

    return path;
}


export function getFile(Filepath: any, callback?: any, progressCallBack?: any) {
    Globals.bAbortPageload = false;

    if(Globals.bIsmobile){
        GetLicense();
    }

    //var TDocObj;
    if (!Globals.bLicenseAquired) {
        return;
    }
    //showDownloadDialog();
   /*if (RxCore_GUI_Download != undefined) {
        RxCore_GUI_Download.setDownload("show");
   }*/

    if (RxCore_GUI_HasText != undefined){
        RxCore_GUI_HasText.hastext = false;
        RxCore_GUI_HasText.hasText(RxCore_GUI_HasText.hastext);
    }

    const szFileName = getFileName(Filepath);

    Globals.cntximg.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
    Globals.contexto.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
    Globals.numUsers = 0;
    Globals.Userlist = [];
    Globals.Userlist[0] = new Users(Globals.signature, Globals.DisplayName, Globals.markuplayer, Globals.markupcolor);
    Globals.numUsers++;

    let PageObj;

    const xhr = new XMLHttpRequest();

    let XMLGetFile = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    XMLGetFile += "<RxViewServer>";
    XMLGetFile += "<Command>GetFile</Command>";
    XMLGetFile += "<LicenseID>" + Globals.LicenseID + "</LicenseID>";
    XMLGetFile += "<FileURL>" + Filepath + "</FileURL>";
    XMLGetFile += "</RxViewServer>";

    try {
        xhr.open('POST', Globals.xmlurl, true);
    } catch (e) {
        alert("Error 1 - " + e);
    }
    try {
        xhr.responseType = '';
    } catch (e) {
        //alert("Error 2 - " + e);
    }

    xhr.onload = function (e) {
        if (xhr.status == 200) {
            //hideDownloadDialog();
            let xmlDoc:any = xhr.responseXML;
            if (xmlDoc == null || xmlDoc.documentElement == null) {
                xmlDoc = $.parseXML(xhr.responseText).documentElement; // TODO:JS->TS:CHECK adding .documentElement changes the type of xmlDoc
            }
            let i, j = 0;

            if (Globals.documentopen && Globals.bSingleDocmode) {
                RxCore_Closedocument();
            }

            /*if (RxCore_GUI_Download != undefined) {
                RxCore_GUI_Download.setDownload("hide");
            }*/

            //ThumbnailpagesContainer.setEmpty();
            //save for use with print.
            Globals.DocXMLPrint = xmlDoc;
            let totalpages = 0;
            if (Globals.DocObj == null || Globals.DocObj == undefined) {
                Globals.nCurdocindex = Globals.OpenFiles.push(new DocumentObject(xmlDoc));
                Globals.DocObj = Globals.OpenFiles[Globals.nCurdocindex - 1];
                Globals.DocObj.fileindex = Globals.nCurdocindex - 1;
            } else {
                //DocObj.Suspend();
                Globals.nCurdocindex = Globals.OpenFiles.push(new DocumentObject(xmlDoc));
                Globals.DocObj = Globals.OpenFiles[Globals.nCurdocindex - 1];
                Globals.DocObj.fileindex = Globals.nCurdocindex - 1;
            }

            const path = addSlash(Globals.DocObj.OriginalURL);
            const layoutxmlobj = xmlDoc.getElementsByTagName('Layout');
            for (i = 0; i < layoutxmlobj.length; i++) {
                // @ts-ignore // TODO:JS->TS:CHECK
                let layoutname = layoutxmlobj[i].getElementsByTagName("LayoutName")[0].firstChild.nodeValue;
                Globals.DocObj.addlayout(layoutname);
                let pagexmlobj = layoutxmlobj[i].getElementsByTagName('Page');
                for (j = 0; j < pagexmlobj.length; j++) {
                    if (j == 0 && i == 0) {
                        PageObj = new PageObject(pagexmlobj[j], layoutname, true, path, j);
                        Globals.DocObj.addpage(PageObj, true);
                    } else {
                        PageObj = new PageObject(pagexmlobj[j], layoutname, false, '', j + totalpages);
                        Globals.DocObj.addpage(PageObj, false);
                    }
                }
                totalpages += j;
            }
            Globals.DocObj.FileName = szFileName;

            //var szstyle = "width: 200px; height: " + canvasoheight + "px; position:relative; top:-100px; left:15px"

            //Thumbnailpopup = DocObj.thumbnailhtmlsource;
            //layerhtmlsource
            //setContentThumb(Thumbnailpopup);

            //ThumbnailpagesContainer.innerHTML = Thumbnailpopup;
            //ThumbnailpagesContainer.Setheight(canvasoheight);
            //ThumbnailpagesContainer.setContent();

            Globals.OpenFiles[Globals.nCurdocindex - 1] = Globals.DocObj;
            if (RxCore_GUI_pagethumbs != undefined) {
                RxCore_GUI_pagethumbs.setThumbnails(Globals.DocObj.thumbnails);
            }

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

            const pagingobject = {
                numpages:Globals.DocObj.pages.length,
                currentpage:Globals.DocObj.getcurPage()
            };

            if(RxCore_GUI_Page != undefined){
                RxCore_GUI_Page.pageEvent(pagingobject);
            }

            //ThumbnailpagesContainer.parentNode.parentNode.style.height = canvasoheight + "px";
            //DocObj.pages[DocObj.currentpage].loadimages();
            //documentopen = true;
            //hideDownloadDialog();
            //var path = addSlash(DocObj.OriginalURL);
            //var path = getPath(DocObj.OriginalURL);
            //getMarkupFilelist(path);

            //moved to attempt to secure that file is loaded.
            //var path = addSlash(DocObj.OriginalURL);
            //getMarkupFilelist(path);

            if(Globals.bIsmobile){
                FreeLicense();
            }
        } else if (xhr.status == 404) {
            alert("XML could not be found");
        } else if (xhr.status == 503) {
            alert("Server is down");
        } else if (xhr.status == 501) {
            alert("Server is not responding refresh the page");
            if (RxCore_GUI_Download != undefined) {
                RxCore_GUI_Download.setDownload("hide");
            }
            if(!Globals.bIsmobile){
                GetLicense();
            }
        }
        if (callback && typeof callback === "function") {
            callback(xhr);
        }
    };
    //Download progress
    xhr.addEventListener("progress", function (evt:any) {
        if (evt.lengthComputable) {
            const percentComplete = evt.loaded / evt.total;
            if (progressCallBack) {
                progressCallBack(percentComplete)
            }
        }
    }, false);
    xhr.send(XMLGetFile);
}


export function getFileCustom(Filepath: any) {
    Globals.bAbortPageload = false;
    if(Globals.bIsmobile){
        GetLicense();
    }
    if (!Globals.bLicenseAquired) {
        return;
    }

    if (RxCore_GUI_HasText != undefined){
        RxCore_GUI_HasText.hastext = false;
        RxCore_GUI_HasText.hasText(RxCore_GUI_HasText.hastext);
    }
    Globals.cntximg.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
    Globals.contexto.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
    Globals.numUsers = 0;
    Globals.Userlist = [];
    Globals.Userlist[0] = new Users(Globals.signature, Globals.DisplayName, Globals.markuplayer, Globals.markupcolor);
    Globals.numUsers++;
    let dataxml = Filepath + "data.xml";
    let PageObj;
    const xhr = new XMLHttpRequest();

    try {
        xhr.open('GET', dataxml, true);
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
            //hideDownloadDialog();
            let xmlDoc:any = xhr.responseXML; // TODO:JS->TS:INFO added any since the reasignment below ( with documentElement ) changes its type
            if (xmlDoc == null || xmlDoc.documentElement == null) {
                xmlDoc = $.parseXML(xhr.responseText).documentElement;
            }
            let i, j = 0;
            if (Globals.documentopen && Globals.bSingleDocmode) {
                RxCore_Closedocument();
            }
            /*if (RxCore_GUI_Download != undefined) {
                RxCore_GUI_Download.setDownload("hide");
            }*/
            //save for use with print.
            Globals.DocXMLPrint = xmlDoc;
            let totalpages = 0;
            if (Globals.DocObj == null || Globals.DocObj == undefined) {
                Globals.nCurdocindex = Globals.OpenFiles.push(new DocumentObject(xmlDoc));
                Globals.DocObj = Globals.OpenFiles[Globals.nCurdocindex - 1];
                Globals.DocObj.fileindex = Globals.nCurdocindex - 1;
                Globals.DocObj.relativepath = Filepath;
            } else {
                //DocObj.Suspend();
                Globals.nCurdocindex = Globals.OpenFiles.push(new DocumentObject(xmlDoc));
                Globals.DocObj = Globals.OpenFiles[Globals.nCurdocindex - 1];
                Globals.DocObj.fileindex = Globals.nCurdocindex - 1;
                Globals.DocObj.relativepath = Filepath;
            }
            const path = addSlash(Globals.DocObj.OriginalURL);
            const layoutxmlobj = xmlDoc.getElementsByTagName('Layout');
            for (i = 0; i < layoutxmlobj.length; i++) {
                // @ts-ignore // TODO:JS->TS:CHECK
                const layoutname = layoutxmlobj[i].getElementsByTagName("LayoutName")[0].firstChild.nodeValue;
                Globals.DocObj.addlayout(layoutname);
                const pagexmlobj = layoutxmlobj[i].getElementsByTagName('Page');
                for (j = 0; j < pagexmlobj.length; j++) {
                    if (j == 0 && i == 0) {
                        PageObj = new PageObject(pagexmlobj[j], layoutname, true, path, j);
                        Globals.DocObj.addpage(PageObj, true);
                    } else {
                        PageObj = new PageObject(pagexmlobj[j], layoutname, false, '', j + totalpages);
                        Globals.DocObj.addpage(PageObj, false);
                    }
                }
                totalpages += j;
            }
            //DocObj.FileName = szFileName;
            Globals.OpenFiles[Globals.nCurdocindex - 1] = Globals.DocObj;
            if (RxCore_GUI_pagethumbs != undefined) {
                RxCore_GUI_pagethumbs.setThumbnails(Globals.DocObj.thumbnails);
            }
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
            const pagingobject = {
                numpages:Globals.DocObj.pages.length,
                currentpage:Globals.DocObj.getcurPage()
            };
            if(RxCore_GUI_Page != undefined){
                RxCore_GUI_Page.pageEvent(pagingobject);
            }
            if(Globals.bIsmobile){
                FreeLicense();
            }
        } else if (xhr.status == 404) {
            alert("XML could not be found");
        } else if (xhr.status == 503) {
            alert("Server is down");
        } else if (xhr.status == 501) {
            alert("Server is not responding refresh the page");
            if (RxCore_GUI_Download != undefined) {
                RxCore_GUI_Download.setDownload("hide");
            }
            if(!Globals.bIsmobile){
                GetLicense();
            }
        }
    };
    xhr.send();
}

export function getFilePages(Filepath: any, pages: any, callback?: any){
    Globals.bAbortPageload = false;
    if(Globals.bIsmobile){
        GetLicense();
    }

    //var TDocObj;
    if (!Globals.bLicenseAquired) {
        return;
    }

    if (RxCore_GUI_HasText != undefined){
        RxCore_GUI_HasText.hastext = false;
        RxCore_GUI_HasText.hasText(RxCore_GUI_HasText.hastext);
    }

    let szFileName = getFileName(Filepath);
    Globals.cntximg.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
    Globals.context.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
    Globals.contexto.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);
    Globals.numUsers = 0;
    Globals.Userlist = [];
    Globals.Userlist[0] = new Users(Globals.signature, Globals.DisplayName, Globals.markuplayer, Globals.markupcolor);
    Globals.numUsers++;

    let PageObj;
    const xhr = new XMLHttpRequest();
    let XMLGetFile = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    XMLGetFile += "<RxViewServer>";
    XMLGetFile += "<Command>GetFile</Command>";
    XMLGetFile += "<LicenseID>" + Globals.LicenseID + "</LicenseID>";
    XMLGetFile += "<FileURL>" + Filepath + "</FileURL>";
    XMLGetFile += "</RxViewServer>";

    try {
        xhr.open('POST', Globals.xmlurl, true);
    } catch (e) {
        alert("Error 1 - " + e);
    }
    try {
        xhr.responseType = '';
    } catch (e) {
        //alert("Error 2 - " + e);
    }

    xhr.onload = (e:any)=> {
        if (xhr.status == 200) {
            let xmlDoc:any = xhr.responseXML; // TODO:JS->TS:INFO added any since the usage of .documentElement after $.parseXml changes the type
            if (xmlDoc == null || xmlDoc.documentElement == null) {
                xmlDoc = $.parseXML(xhr.responseText).documentElement;
            }
            let i, j = 0;

            if (RxCore_GUI_Download != undefined) {
                RxCore_GUI_Download.setDownload("hide");
            }
            let totalpages = 0;
            let pagesadded = 0;
            if (Globals.DocObj == null || Globals.DocObj == undefined) {
                Globals.nCurdocindex = Globals.OpenFiles.push(new DocumentObject(xmlDoc));
                Globals.DocObj = Globals.OpenFiles[Globals.nCurdocindex - 1];
                Globals.DocObj.fileindex = Globals.nCurdocindex - 1;
                Globals.DocObj.usepagesload = true;
            } else {
                Globals.nCurdocindex = Globals.OpenFiles.push(new DocumentObject(xmlDoc));
                Globals.DocObj = Globals.OpenFiles[Globals.nCurdocindex - 1];
                Globals.DocObj.fileindex = Globals.nCurdocindex - 1;
                Globals.DocObj.usepagesload = true;
            }
            let path = addSlash(Globals.DocObj.OriginalURL);
            let layoutxmlobj = xmlDoc.getElementsByTagName('Layout');
            for (i = 0; i < layoutxmlobj.length; i++) {
                const layoutname = layoutxmlobj[i].getElementsByTagName("LayoutName")[0].firstChild.nodeValue;
                Globals.DocObj.addlayout(layoutname);
                const pagexmlobj = layoutxmlobj[i].getElementsByTagName('Page');
                //pages
                for (j = 0; j < pagexmlobj.length; j++) {
                    if (j == 0 && i == 0) {
                        if (pages.indexOf(j) >= 0){
                            PageObj = new PageObject(pagexmlobj[j], layoutname, true, path, j);
                            Globals.DocObj.addpage(PageObj, true);
                            pagesadded ++;
                        }
                    } else {
                        if (pages.indexOf(j) >= 0){
                            if(pagesadded == 0){
                                PageObj = new PageObject(pagexmlobj[j], layoutname, true, path, j + totalpages);
                                Globals.DocObj.addpage(PageObj, true);
                                pagesadded ++;
                            }else{
                                PageObj = new PageObject(pagexmlobj[j], layoutname, false, '', j + totalpages);
                                Globals.DocObj.addpage(PageObj, false);
                                pagesadded ++;
                            }
                        }
                    }
                }
                totalpages += j;
            }
            Globals.DocObj.FileName = szFileName;
            Globals.OpenFiles[Globals.nCurdocindex - 1] = Globals.DocObj;
            if (RxCore_GUI_pagethumbs != undefined) {
                RxCore_GUI_pagethumbs.setThumbnails(Globals.DocObj.thumbnails);
            }
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
            const pagingobject = {
                numpages:Globals.DocObj.pages.length,
                currentpage:Globals.DocObj.getcurPage()
            };
            if(RxCore_GUI_Page != undefined){
                RxCore_GUI_Page.pageEvent(pagingobject);
            }
            if(Globals.bIsmobile){
                FreeLicense();
            }
        }else if (xhr.status == 404) {
            alert("XML could not be found");
            if (RxCore_GUI_Download != undefined) {
                RxCore_GUI_Download.setDownload("hide");
            }
        } else if (xhr.status == 503) {
            alert("Server is down");
            if (RxCore_GUI_Download != undefined) {
                RxCore_GUI_Download.setDownload("hide");
            }
        } else if (xhr.status == 501) {
            alert("Server is not responding refresh the page");
            if (RxCore_GUI_Download != undefined) {
                RxCore_GUI_Download.setDownload("hide");
            }
            if(!Globals.bIsmobile){
                GetLicense();
            }
        }
        if (callback && typeof callback === "function") {
            callback(xhr);
        }
    };
    xhr.send(XMLGetFile);
}
/* Andriy added callback to getFile */



export function getxmlurlEx(filepath: any){
    Globals.bAbortPageload = false;
    //showDownloadDialog();
    const xhr = new XMLHttpRequest();

    try {
        xhr.open('GET', filepath, true);
    } catch (e) {
        alert("Error 1 - " + e);
    }
    try {
        xhr.responseType = '';
    } catch (e) {
        //alert("Error 2 - " + e);
    }

    xhr.onload = (e) => {
        if (xhr.status == 200) {
            //hideDownloadDialog();
            let xmlDoc:any = xhr.responseXML;  // TODO:JS->TS:INFO added any since the assignment with .documentElement changes its type
            if (xmlDoc == null || xmlDoc.documentElement == null) {
                xmlDoc = $.parseXML(xhr.responseText).documentElement;
            }
            const imageinfo = xmlDoc.getElementsByTagName('IMAGE_INFO');
            const fileurl = xmlDoc.getElementsByTagName("URL")[0].firstChild.nodeValue;
            const markupurls = xmlDoc.getElementsByTagName('MARKUP_URL');
            const saveurl = xmlDoc.getElementsByTagName('USER_MARKUPPOSTURL');
            //var xcmfiles = [];

            for (let i = 0; i < markupurls.length; i++) {
                Globals.byrefmarkupfiles[i] = markupurls[i].firstChild.nodeValue;
            }
            Globals.bUsemarkupbyrefEx = true;
            if (RxCore_GUI_Download != undefined) {
                RxCore_GUI_Download.setDownload("show");
            }
            getFile(fileurl);
        } else if (xhr.status == 404) {
            alert("XML could not be found");
        } else if (xhr.status == 503) {
            alert("Server is down");
        }
    };
    xhr.send();
}

export function getxmlurl(filepath:any) {
    Globals.bAbortPageload = false;
    //showDownloadDialog();
    const xhr = new XMLHttpRequest();
    try {
        xhr.open('GET', filepath, true);
    } catch (e) {
        alert("Error 1 - " + e);
    }
    try {
        xhr.responseType = '';
    } catch (e) {
        //alert("Error 2 - " + e);
    }
    xhr.onload = (e:any)=> {
        if (xhr.status == 200) {
            //hideDownloadDialog();
            let xmlDoc:any = xhr.responseXML; // TODO:JS->TS:INFO added any since the assignment with .documentElement changes its type
            if (xmlDoc == null || xmlDoc.documentElement == null) {
                xmlDoc = $.parseXML(xhr.responseText).documentElement;
            }
            const imageinfo = xmlDoc.getElementsByTagName('IMAGE_INFO');
            const fileurl = xmlDoc.getElementsByTagName("URL")[0].firstChild.nodeValue;
            const markupurls = xmlDoc.getElementsByTagName('MARKUP_URL');
            const saveurl = xmlDoc.getElementsByTagName('USER_MARKUPPOSTURL');
            //var xcmfiles = [];

            for (let i = 0; i < markupurls.length; i++) {
                Globals.byrefmarkupfiles[i] = markupurls[i].firstChild.nodeValue;
            }
            Globals.bUsemarkupbyref = true;
            if (RxCore_GUI_Download != undefined) {
                RxCore_GUI_Download.setDownload("show");
            }
            getFile(fileurl);
        } else if (xhr.status == 404) {
            alert("XML could not be found");
        } else if (xhr.status == 503) {
            alert("Server is down");
        }
    };
    xhr.send();
}


export function post3DImageData() {
    //CanvasSaveUrl

    const xhr = new XMLHttpRequest();
    xhr.addEventListener("progress", ImageUploadProgress, false);
    xhr.addEventListener("load", ImageUploadComplete.bind(xhr), false); // TODO:JS->TS:INFO uses bind so that the 'this' inside refers to xhr
    //xhr.addEventListener("error", ImageuploadFailed, false);
    //xhr.addEventListener("abort", ImageuploadCanceled, false);

    xhr.upload.addEventListener("progress", ImageUploadProgress, false);

    const path = getPath(Globals.DocObj.OriginalURL);
    const file = getFileName(Globals.DocObj.OriginalURL);

    let InageCreateURL; // TODO:JS->TS:CHECK typo n->m
    //var InageCreateURL = CanvasSaveUrl + "?" + path + "&" + file + "&" + "PDF&200";

    if(Globals.bUseCustomrelpath){
        InageCreateURL = Globals.CanvasSaveUrl + "&" + path + "&" + file + "&" + "PDF&200";
    }else{
        InageCreateURL = Globals.CanvasSaveUrl + "?" + path + "&" + file + "&" + "PDF&200";
    }

    //var dataURL = canvas.toDataURL();
    //var canvas = document.getElementById("canvas");
    const dataURL = Globals.renderer.domElement.toDataURL();

    try {
        xhr.open('POST', InageCreateURL, true);
    } catch (e) {
        alert("Error 1 - " + e);
    }
    try {
        xhr.responseType = '';
    } catch (e) {
        //alert("Error 2 - " + e);
    }

    xhr.send(dataURL);
}


