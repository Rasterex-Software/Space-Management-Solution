import {
    Globals,
    post3DImageData,
    getPath,
    getURLPath,
    getFileName,
    createxmlmarkup,
    PDFuploadProgress,
    Rxcore_GUI_exportComplete
} from '../internal';

export function exportFile(consolidateonly:any, format:any, UPI: any, paperSize: any, markupFlag: any){
    let curmarkup = 0;
    let savetime = new Date().getTime();
    let internalscale = 1;
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        post3DImageData();
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
        internalscale = Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf;
    }
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", PDFuploadProgress, false);

    const markupxml = createxmlmarkup(false,consolidateonly,true,Globals.signature, Globals.signature);
    //var markupxml = parseXML(markupxmltxt);

    const path = getPath(Globals.DocObj.OriginalURL);
    const file = getFileName(Globals.DocObj.OriginalURL);
    //WebClientSaveAs?filepath&filename&PDF&UPI
    let PDFCreateURL;
    if(Globals.bUseCustomrelpath){
        //relpath = xmlurlrelcustom;
        PDFCreateURL = Globals.PDFExportURL + "&" + path + "&" + file + "&" + format + "&" + UPI + "&" + paperSize + "&" + markupFlag;
    }else{
        PDFCreateURL = Globals.PDFExportURL + "?" + path + "&" + file + "&" + format + "&" + UPI + "&" + paperSize + "&" + markupFlag;
    }

    /*if(bUseCustomrelpath){
        var PDFCreateURL = xmlurlrelcustom + "?" + path + "&" + file + "&" + format + "&" + UPI + "&" + paperSize + "&" + markupFlag;
    }else{

    }*/
    //xmlurlrelcustom = fileurl;

    //PDFExportURL?path&file&PDF&200

    try {
        xhr.open('POST', PDFCreateURL, true);
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
            let xmlDoc:any = xhr.responseXML; // TODO:JS->TS:INFO used any since assignment with .documentElement changes type
            if (xmlDoc == null || xmlDoc.documentElement == null) {
                xmlDoc = $.parseXML(xhr.responseText).documentElement;
            }
            let bIsPDF = true;
            let PDFFileUrl = xmlDoc.getElementsByTagName('File')[0].firstChild.nodeValue;
            if (xmlDoc.getElementsByTagName('isPDF')[0] != undefined) {
                bIsPDF = (xmlDoc.getElementsByTagName('isPDF')[0].firstChild.nodeValue == '1');
            }
            let cachfolder = getURLPath(Globals.DocObj.FileNameSRC);
            if(Globals.bUseCustomrelpath){
                cachfolder = Globals.xmlurlrelcustom;
            }

            if(!Globals.bPDFExportfullPath){
                if(bIsPDF){
                    PDFFileUrl = cachfolder + PDFFileUrl;
                }else{
                    PDFFileUrl = cachfolder + PDFFileUrl;
                    //PDFFileUrl;
                }
            }

            if (Rxcore_GUI_exportComplete != undefined){
                Rxcore_GUI_exportComplete.loadComplete(PDFFileUrl);
            }


            //get pdf url here.
        } else if (xhr.status == 404) {
            alert("XML could not be found");
        } else if (xhr.status == 503) {
            alert("Server is down");
        }

    };
    xhr.send(markupxml);
}


export function PDExportnew() {
    let curmarkup = 0;
    let savetime = new Date().getTime();
    let internalscale = 1;
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        post3DImageData();
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
        internalscale = Globals.DocObj.pages[Globals.DocObj.currentpage].curpagescale * Globals.DocObj.pages[Globals.DocObj.currentpage].dscalepdf;
    }

    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", PDFuploadProgress, false);

    const markupxml = createxmlmarkup(false,false,true,Globals.signature, Globals.signature);
    //var markupxml = parseXML(markupxmltxt);

    const path = getPath(Globals.DocObj.OriginalURL);
    const file = getFileName(Globals.DocObj.OriginalURL);
    //WebClientSaveAs?filepath&filename&PDF&UPI
    const PDFCreateURL = Globals.PDFExportURL + "?" + path + "&" + file + "&" + "PDF&200";

    //PDFExportURL?path&file&PDF&200

    try {
        xhr.open('POST', PDFCreateURL, true);
    } catch (e) {
        alert("Error 1 - " + e);
    }
    try {
        xhr.responseType = '';
    } catch (e) {
        //alert("Error 2 - " + e);
    }

    xhr.onload = (e: any)=> {
        if (xhr.status == 200) {
            let xmlDoc:any = xhr.responseXML; // TODO:JS->TS:INFO used any since assignment with .documentElement changes type
            if (xmlDoc == null || xmlDoc.documentElement == null) {
                xmlDoc = $.parseXML(xhr.responseText).documentElement;
            }
            let PDFFileUrl = xmlDoc.getElementsByTagName('File')[0].firstChild.nodeValue;
            const cachfolder = getURLPath(Globals.DocObj.FileNameSRC);
            PDFFileUrl = cachfolder + PDFFileUrl;

            if (Rxcore_GUI_exportComplete != undefined){
                Rxcore_GUI_exportComplete.loadComplete(PDFFileUrl);
            }
            //get pdf url here.
        } else if (xhr.status == 404) {
            alert("XML could not be found");
        } else if (xhr.status == 503) {
            alert("Server is down");
        }
    };
    xhr.send(markupxml);
}