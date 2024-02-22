var RxConfig = (function() {
    'use strict';

    /* server connect */
    var gui360URL = "rxweb/";

// var baseURL = "http://WIN-6S2CRD9PC67/";
// var baseURL = "http://192.168.1.198/";
// var baseURL = "http://localhost:9080/";
// var baseURL = "http://192.168.1.28/";
// var baseURL = "https://api.stage.uv.resterex.demo2.nordlogic.com/";
    //+ gui360URL;
    // var baseURL = "http://localhost:9000/";
    // var baseURL = "http://localhost:8080/";
    var baseURL = window.location.origin+'/';
    var baseUrlApi = "https://api.dev.rasterex.demo2.nordlogic.com/";
// var baseUrlApi = "http://192.168.1.28/";
    var baseURLBin = baseUrlApi + "RxBinWeb/";
    // var baseURLWeb = baseURL + "rxweb/";
    var baseURLWeb = baseURL + "";
    var baseURLBinWeb = baseUrlApi + "RxBinweb";

    var xmlurl = baseURLBin + "RxCSISAPI.dll?WebClientPublish";
    var xmlurldirect = baseURLBin + "RxCSISAPI.dll";
    var xmlurlmarkup = baseURLBin + "RxCSISAPI.dll?WebClientPublish";
    var opensessionurl = baseURLBin + "RxCSISAPI.dll?OpenSession";
    var openUsessionurl = baseURLBin + "RxCSISAPI.dll?OpenSessionUser";
    var openMsessionurl = baseURLBin + "RxCSISAPI.dll?OpenMarkupSession";
    var closesessionurl = baseURLBin + "RxCSISAPI.dll?CloseSession";
    var xmlurlmarkupsave = baseURLBin + "RxCSISAPI.dll?WebClientSaveMarkup";
    var FileuploadURL = baseURLBin + "RxCSISAPI.dll?WebClientFileUpload";
    var PDFExportURL = baseURLBin + "RxCSISAPI.dll?WebClientSaveAs";
    var CanvasSaveUrl = baseURLBin + "RxCSISAPI.dll?WebClientSaveImageAs";
    var UploadServerfolder = "C:\\Rasterex\\Upload\\";
    var UploadServerfolderd = "C:\\\\Rasterex\\\\Upload\\\\";
    var xmlurlrel = baseURLBinWeb;
    var xmlurlrelmarkup = baseURLBinWeb;
    var uploadfolderURL = baseURLWeb + "Upload/";
    var htmlviewerurl = baseURLWeb + "default.htm";
    // var splashscreen = baseURL + "rxweb/welcome.jpg";
    // var noteImgSrc = baseURL + "rxweb/images/note.png";
    var splashscreen = baseURLWeb + "welcome.jpg";
    var noteImgSrc = baseURLWeb + "images/note.png";

    var PDFcmap = baseURLWeb + "pdfjs/web/cmaps/";

    var baseFileURL = "C:\\\\Rasterex\\\\Upload\\\\";

    /* config */

    //"http://viewserver.rasterex.com/RxBinweb/RxCSISAPI.dll?WebClientGetConfig";

    var configurationLocation = baseURLBin + "RxCSISAPI.dll?WebClientGetConfig";
    var bGetconfig = true;
    var bUseID = false;
    var noCachFolder = false;

    return {
        xmlurl: xmlurl,
	      xmlurldirect : xmlurldirect,
        xmlurlmarkup : xmlurlmarkup,
        opensessionurl: opensessionurl,
	      openUsessionurl : openUsessionurl,
        openMsessionurl: openMsessionurl,
        closesessionurl: closesessionurl,
        xmlurlmarkupsave: xmlurlmarkupsave,
        FileuploadURL: FileuploadURL,
        PDFExportURL: PDFExportURL,
        CanvasSaveUrl: CanvasSaveUrl,
        UploadServerfolder: UploadServerfolder,
        UploadServerfolderd: UploadServerfolderd,
        baseFileURL: baseFileURL,
        baseURLWeb : baseURLWeb,
        baseURLBinWeb : baseURLBinWeb,
        xmlurlrel: xmlurlrel,
        xmlurlrelmarkup : xmlurlrelmarkup,
        uploadfolderURL: uploadfolderURL,
        htmlviewerurl: htmlviewerurl,
        splashscreen: splashscreen,
        noteImgSrc : noteImgSrc,
        PDFcmap : PDFcmap,
        bGetconfig: bGetconfig,
        bUseID : bUseID,
        noCachFolder : noCachFolder,
        configurationLocation: configurationLocation,
        OemFlag: 'bypass'
    };

})();
