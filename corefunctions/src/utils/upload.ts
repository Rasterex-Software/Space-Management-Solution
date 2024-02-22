import {
    Globals,
    RxCore_GUI_Upload,
    RxCore_GUI_Download,
    getFile,
    set_tool
} from '../internal';

export function uploadFiledragdrop(dragdropfile:any) {
    //var fd = new FormData();
    const file = dragdropfile;
    Globals.dragdropfilename = file.name;
    //fd.append("fileToUpload", file);
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploaddragComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    const urifilename = encodeURI(file.name); // TODO:JS->TS:INFO unused; should the file.name from xhr.open have been replaced with urifilename?
    //xhr.open("POST", FileuploadURL + "?" + UploadServerfolder + "&" + file.name,true);
    xhr.open("POST", Globals.FileuploadURL + "?" + Globals.UploadServerfolder + "&" + file.name + "&" + file.lastModified + "&" + file.size, true);
    xhr.send(file);
}


export function uploadFile() {
    //var fd = new FormData();
    // @ts-ignore // TODO:JS->TS:ADJUST
    let file = document.getElementById('fileToUpload').files[0];
    //fd.append("fileToUpload", file);
    const xhr = new XMLHttpRequest();
    if (RxCore_GUI_Upload != undefined) {
        RxCore_GUI_Upload.setUpload("show");
    }


    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    const urifilename = encodeURI(file.name); // TODO:JS->TS:INFO unused; should the file.name from xhr.open have been replaced with urifilename?
    //xhr.open("POST", FileuploadURL + "?" + UploadServerfolder + "&" + file.name,true);
    xhr.open("POST", Globals.FileuploadURL + "?" + Globals.UploadServerfolder + "&" + file.name + "&" + file.lastModified + "&" + file.size, true);
    xhr.send(file);
}

export function uploadProgress(evt:any) {
    if (evt.lengthComputable) {
        //var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        //showUploadDialog();
        if (RxCore_GUI_Upload != undefined) {
            RxCore_GUI_Upload.setUpload(Math.round(evt.loaded * 100 / evt.total));
        }

        /*document.getElementById('progressbar').value = Math.round(evt.loaded * 100 / evt.total); //percentComplete;//.toString() + '%';
        if (document.getElementById('progressbar').value == 100) {
            document.getElementById('progressbar').value = 0;
            //hideUploadDialog();

        }*/
    } else {
        //document.getElementById('progressNumber').innerHTML = 'unable to compute';
    }
}

export function uploadComplete(evt:any) {
    /* This event is raised when the server send back a response */
    // @ts-ignore // TODO:JS-TS:ADJUST
    let file = document.getElementById('fileToUpload').files[0];
    let urifilename = encodeURI(file.name);
    let openfile = Globals.UploadServerfolderd + file.name;
    //hideUploadDialog();
    if (RxCore_GUI_Upload != undefined) {
        RxCore_GUI_Upload.setUpload("hide");
    }
    if (RxCore_GUI_Download != undefined) {
        RxCore_GUI_Download.setDownload("show");
    }

    //var urifilename = encodeURI(openfile);
    getFile(openfile);
    set_tool('markupedit', {});

    //alert(evt.target.responseText);
}

export function uploaddragComplete(evt:any) {
    /* This event is raised when the server send back a response */
    //var file = evt.dataTransfer.files[0];
    if (Globals.dragdropfilename == "") {
        return;
    }
    let urifilename = encodeURI(Globals.dragdropfilename);
    let openfile = Globals.UploadServerfolderd + Globals.dragdropfilename;
    //hideUploadDialog();

    if (RxCore_GUI_Upload != undefined) {
        RxCore_GUI_Upload.setUpload("hide");
    }

    if (RxCore_GUI_Download != undefined) {
        RxCore_GUI_Download.setDownload("show");
    }

    //var urifilename = encodeURI(openfile);
    getFile(openfile);
    set_tool('markupedit', {});

    Globals.dragdropfilename = "";
    //alert(evt.target.responseText);
}

export function uploadFailed(evt:any) {
    //hideUploadDialog();
    if (RxCore_GUI_Upload != undefined) {
        RxCore_GUI_Upload.setUpload("hide");
    }

    alert("There was an error attempting to upload the file.");

}

export function uploadCanceled(evt:any) {
    //hideUploadDialog();
    if (RxCore_GUI_Upload != undefined) {
        RxCore_GUI_Upload.setUpload("hide");
    }
    alert("The upload has been canceled by the user or the browser dropped the connection.");
}

export function fileSelected() {
    uploadFile();
}
