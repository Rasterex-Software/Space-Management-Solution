import {
    Globals,
    Layers,
    RxCore_GUI_Stamps,
    Users,
    PaperSize,
    createLayers
} from '../internal';

export function getConfiguration(configurationLocation:string) {
    let XMLGetConfig = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    XMLGetConfig += "<RxViewServer>";
    XMLGetConfig += "<Command>GetConfiguration</Command>";
    XMLGetConfig += "<LicenseID>" + Globals.LicenseID + "</LicenseID>";
    if (Globals.locationSearchSet) {
        XMLGetConfig += "<CallingPageUrl>" + Globals.htmlviewerurl + Globals.szLocationSearch + "</CallingPageUrl>";
    } else {
        XMLGetConfig += "<CallingPageUrl>" + Globals.htmlviewerurl + "</CallingPageUrl>";
    }
    XMLGetConfig += "</RxViewServer>";
    const xhr = new XMLHttpRequest();

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
    let xmlDoc = xhr.responseText;
    let configxml:any = $.parseXML(xmlDoc);
    let SzContext:any = '';
    let szLicMode:any = '';
    let szLicCompany:any = '';
    let szImgSwitchFactor:any =1.5; // JS->TS:INFO added initializer. // TODO:JS->TS:CHECK
    let SzCurrentUser:any = '';
    let SzDisplayName:any = '';
    let SzMarkupLayer:any = '';
    let SzMarkupColor:any = '';
    let SzXmlUrl:any = '';
    let SzXmlUrlmarkup:any = '';
    let SzXMLURLRel:any = '';
    let SzMarkupSaveUrl:any = '';
    let SzFileExport:any = '';
    let szMarkupPostonly:any = '';
    let Sz3DImage:any = '';
    let SzPrintPageURL:any = 'printcanvas.htm';
    let SzEnableMarkupEdit:any = '';
    let SzCanChangeSign:any = '';
    let SzCanConsolidate:any = '';
    let SzCanChangeLayer:any = '';
    let SzReadonlymarkup:any = '';
    let SzEnableFileIOpen:any = '';
    let SzReverseScale:any = '';
    let SzIntitialDocument:any = '';
    let SzUseCustom:any = '';
    let SzPaperWidth:any = '794';
    let SzPaperHeight:any = '1122';
    let SzArrowSize:any = '20';
    let SzLabelSize:any = '12';
    let SzrefreshMarkup:any = '';
    let szPDFZoomAll:any = '';
    let szPDFanimateRender:any = '';

    try {
        SzContext = configxml.getElementsByTagName("Context")[0].firstChild.nodeValue;
    } catch (e) {
        //alert("Error getting Context - " + e);
        //getting context failed ignore and proceed
        //added try cactch for safari compliance
        SzContext = "";
    }
    try {
        szLicMode = configxml.getElementsByTagName("Licensemode")[0].firstChild.nodeValue;
    } catch (e) {
        szLicMode = "";
    }

    try {
        szLicCompany = configxml.getElementsByTagName("CompanyFeature")[0].firstChild.nodeValue;
    } catch (e) {
        szLicCompany = "";
    }

    Globals.bUseCompanyFeature = (szLicCompany != "");
    Globals.szLicenCompanyFeature = szLicCompany;
    //<CompanyFeature>

    try {
        szImgSwitchFactor = configxml.getElementsByTagName("ImgSwitchFactor")[0].firstChild.nodeValue;
    } catch (e) {
        Globals.imageswitchfactor = 1.5; // TODO:JS->TS:CHECK
    }
    try {
        SzCurrentUser = configxml.getElementsByTagName("CurrentUserName")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        SzCurrentUser = "";
    }
    try {
        SzDisplayName = configxml.getElementsByTagName("DisplayName")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        SzDisplayName = "";
    }
    try {
        SzMarkupLayer = configxml.getElementsByTagName("MarkupLayer")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        SzMarkupLayer = "";
    }
    try {
        SzMarkupColor = configxml.getElementsByTagName("MarkupColor")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        SzMarkupColor = "";
    }
    try {
        SzXmlUrl = configxml.getElementsByTagName("XmlUrl")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        SzXmlUrl = "";
    }
    try {
        SzXmlUrlmarkup = configxml.getElementsByTagName("XmlUrlmarkup")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        SzXmlUrlmarkup = "";
    }
    try {
        szMarkupPostonly = configxml.getElementsByTagName("MarkupSavePOSTOnly")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        szMarkupPostonly = "";
    }

    Globals.bMarkupPostOnly = (szMarkupPostonly != "" && szMarkupPostonly == "True");

    try {
        SzXMLURLRel = configxml.getElementsByTagName("XmlUrlRel")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        SzXMLURLRel = "";
    }

    try {
        SzMarkupSaveUrl = configxml.getElementsByTagName("MarkupSaveUrl")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        SzMarkupSaveUrl = "";
    }

    try {
        SzFileExport = configxml.getElementsByTagName("ExportFile")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        SzFileExport = "";
    }

    try {
        Sz3DImage = configxml.getElementsByTagName("Image3DSave")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        Sz3DImage = "";
    }

    try {
        SzPrintPageURL = configxml.getElementsByTagName("PrintPageURL")[0].firstChild.nodeValue;
    } catch (e) {
        SzPrintPageURL = "printcanvas.htm";
    }

    try {
        SzEnableMarkupEdit = configxml.getElementsByTagName("EnableMarkupEdit")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        SzEnableMarkupEdit = "";
    }
    try {
        SzCanChangeSign = configxml.getElementsByTagName("CanChangeSignature")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        SzCanChangeSign = "";
    }
    try {
        SzCanConsolidate = configxml.getElementsByTagName("CanConsolidate")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        SzCanConsolidate = "";
    }
    try {
        SzCanChangeLayer = configxml.getElementsByTagName("CanChangeLayer")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        SzCanChangeLayer = "";
    }
    try {
        SzReadonlymarkup = configxml.getElementsByTagName("Readonlymarkup")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        SzReadonlymarkup = "";
    }
    try {
        SzEnableFileIOpen = configxml.getElementsByTagName("EnableFileOpen")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        SzEnableFileIOpen = "";
    }
    try {
        SzReverseScale = configxml.getElementsByTagName("ReverseScale")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        SzReverseScale = "";
    }

    try {
        SzIntitialDocument = configxml.getElementsByTagName("InitialDocument")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        SzIntitialDocument = "";
    }

    try {
        SzUseCustom = configxml.getElementsByTagName("UseCustom")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        SzUseCustom = "";
    }

    try {
        SzPaperWidth = configxml.getElementsByTagName("Paperwidth")[0].firstChild.nodeValue;
    } catch (e) {
        SzPaperWidth = "794";
    }
    try {
        SzPaperHeight = configxml.getElementsByTagName("Paperheight")[0].firstChild.nodeValue;
    } catch (e) {
        SzPaperHeight = "1122";
    }
    try {
        SzArrowSize = configxml.getElementsByTagName("ArrowSize")[0].firstChild.nodeValue;
    } catch (e) {
        SzArrowSize = "20";
    }

    Globals.nArrowSize = parseInt(SzArrowSize);

    try {
        SzLabelSize = configxml.getElementsByTagName("LabelSize")[0].firstChild.nodeValue;
    } catch (e) {
        SzLabelSize = "12";
    }

    Globals.nLabelTextsize = parseInt(SzLabelSize);

    try {
        SzrefreshMarkup = configxml.getElementsByTagName("RefreshMarkup")[0].firstChild.nodeValue;
    } catch (e) {
        //ignore and continue
        SzrefreshMarkup = "";
    }

    try {
        szPDFZoomAll = configxml.getElementsByTagName("PDFZoomAll")[0].firstChild.nodeValue;
    } catch (e) {
        szPDFZoomAll = "";
    }
    Globals.bPDFZoomAllinit = (szPDFZoomAll != "" && szPDFZoomAll == "True");

    try {
        szPDFanimateRender = configxml.getElementsByTagName("PDFAnimateRender")[0].firstChild.nodeValue;
    } catch (e) {
        szPDFanimateRender = "";
    }
    Globals.bAnimatePDFrender = (szPDFanimateRender != "" && szPDFanimateRender == "True");


    try {
        let xmllayers = configxml.getElementsByTagName('layer');
        if (xmllayers.length > 0) {
            for (var l = 0; l < xmllayers.length; l++) {
                //get layer attributes and create layer list.
                var LayerName = xmllayers[l].getElementsByTagName("name")[0].firstChild.nodeValue;
                var LayerColor = xmllayers[l].getElementsByTagName("color")[0].firstChild.nodeValue;
                var LayerNumber = xmllayers[l].getElementsByTagName("number")[0].firstChild.nodeValue;
                var LayerState = xmllayers[l].getElementsByTagName("state")[0].firstChild.nodeValue;
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

    try {
        var stamptags = configxml.getElementsByTagName('stamp');
        if (stamptags.length > 0) {
            for (var i = 0; i < stamptags.length; i++) {
                Globals.Stamplist[i] = stamptags[i].firstChild.nodeValue;
            }
            Globals.Stamplist[i] = "Date";
            Globals.Stamplist[i + 1] = "User Name";
        } else {
            Globals.Stamplist = ["Approved", "Draft", "Received", "Rejected", "Reviewed", "Revised", "Date", "User Name"];
        }
    } catch (e) {
        //ignore error and add default values
        Globals.Stamplist = ["Approved", "Draft", "Received", "Rejected", "Reviewed", "Revised", "Date", "User Name"];

    }


    if (Globals.Stamplist.length > 0) {

        if (RxCore_GUI_Stamps != undefined) {
            RxCore_GUI_Stamps.setMarkupStamps(Globals.Stamplist);
        }

    }

    //set global variables from xml
    if (SzContext != "") {
        //
    }
    if (szLicMode != "") {
        Globals.OEMFlag = szLicMode;
    }
    if (szImgSwitchFactor != "") {
        Globals.imageswitchfactor = parseFloat(szImgSwitchFactor);
    }
    if (SzCurrentUser != "") {
        Globals.signature = SzCurrentUser;
    }
    if (SzDisplayName != "") {
        Globals.DisplayName = SzDisplayName;
    }

    if (SzMarkupLayer != "") {
        Globals.markuplayer = parseInt(SzMarkupLayer);
    }

    if (SzMarkupColor != "") {
        Globals.markupcolor = SzMarkupColor;
        Globals.markuplinecolor = SzMarkupColor;
        Globals.markuptextcolor = SzMarkupColor;
    }

    Globals.Userlist[0] = new Users(Globals.signature, Globals.DisplayName, Globals.markuplayer, Globals.markupcolor);
    Globals.numUsers++;

    if (SzXmlUrl != "") {
        Globals.xmlurl = SzXmlUrl;
    }

    if (SzXmlUrlmarkup != "") {
        Globals.xmlurlmarkup = SzXmlUrlmarkup;
    }


    if (SzXMLURLRel != "") {
        Globals.xmlurlrel = SzXMLURLRel;
    }
    if (SzMarkupSaveUrl != "") {
        Globals.xmlurlmarkupsave = SzMarkupSaveUrl;
    }

    if(SzFileExport != ""){
        Globals.PDFExportURL = SzFileExport;
    }

    if(Sz3DImage != ""){
        Globals.CanvasSaveUrl = Sz3DImage;
    }
    //

    if (SzPrintPageURL != "") {
        Globals.PrintPageURL = SzPrintPageURL;
    }

    Globals.readonlymode = (SzReadonlymarkup != "" && SzReadonlymarkup == "True");

    /*if (SzReadonlymarkup != "" && SzReadonlymarkup == "True") {
        readonlymode = true;
        //$('.editOnly').remove();
        //$('#View').css('display', '');
        //$('li[ref="View"]').addClass('selected');

    } else {
        readonlymode = false;
    }*/
    Globals.bCanChangeSignature = (SzCanChangeSign != "" && SzCanChangeSign == "True");

    Globals.bCanConsolidate = (SzCanConsolidate != "" && SzCanConsolidate == "True");

    Globals.bCanChangeLayer = (SzCanChangeLayer != "" && SzCanChangeLayer == "True");

    if (SzEnableFileIOpen != "" && SzEnableFileIOpen == "False") {
        $('.disableOpenClose').remove();
    } else {
        //bCanChangeLayer = false;
    }
    Globals.bReverseScale = (SzReverseScale != "" && SzReverseScale == "True");
    Globals.bRefreshmarkup = (SzrefreshMarkup != "" && SzrefreshMarkup == "True");

    if (SzIntitialDocument != "") {
        //getFile(SzIntitialDocument);
        Globals.bOpeninitialdoc = true;
        Globals.OpeninitialdocURL = SzIntitialDocument;

        Globals.initialDoc.open = Globals.bOpeninitialdoc;
        Globals.initialDoc.url = Globals.OpeninitialdocURL;
    }

    if(SzUseCustom != "" && SzUseCustom == "True"){
        Globals.initialDoc.custom = true;
    }else{
        Globals.initialDoc.custom = false;
    }


    Globals.Paper = new PaperSize(SzPaperWidth, SzPaperHeight);

    /*try{
     xhr.responseType = 'document';
     }
     catch(e){
     //alert("Error 2 - " + e);
     }*/

    /*xhr.onreadystatechange = function(){
     if (this.readyState === 4 && this.status === 200) {
     //console.log(this.responseText);
     var xmlDoc = this.responseText;

     //var xmlDoc = this.responseXML;
     try{
     var SzContext = xmlDoc.getElementsByTagName("Context")[0].firstChild.nodeValue;
     }
     catch(e){
     //alert("Error getting Context - " + e);
     //getting context failed ignore and proceed
     //added try cactch for safari compliance
     }
     try{
     var SzCurrentUser = xmlDoc.getElementsByTagName("CurrentUserName")[0].firstChild.nodeValue;
     }
     catch(e){
     //ignore and continue
     }
     try{
     var SzXmlUrl = xmlDoc.getElementsByTagName("XmlUrl")[0].firstChild.nodeValue;
     }
     catch(e){
     //ignore and continue
     }

     try{
     var SzXMLURLRel = xmlDoc.getElementsByTagName("XmlUrlRel")[0].firstChild.nodeValue;
     }
     catch(e){
     //ignore and continue
     }

     try{
     var SzMarkupSaveUrl = xmlDoc.getElementsByTagName("MarkupSaveUrl")[0].firstChild.nodeValue;
     }
     catch(e){
     //ignore and continue
     }

     try{
     var SzEnableMarkupEdit = xmlDoc.getElementsByTagName("EnableMarkupEdit")[0].firstChild.nodeValue;
     }
     catch(e){
     //ignore and continue
     }
     try{
     var SzCanChangeSign = xmlDoc.getElementsByTagName("CanChangeSignature")[0].firstChild.nodeValue;
     }
     catch(e){
     //ignore and continue
     }
     try{
     var SzCanChangeLayer = xmlDoc.getElementsByTagName("CanChangeLayer")[0].firstChild.nodeValue;
     }
     catch(e){
     //ignore and continue
     }
     try{
     var SzReadonlymarkup = xmlDoc.getElementsByTagName("Readonlymarkup")[0].firstChild.nodeValue;
     }
     catch(e){
     //ignore and continue
     }
     try{
     var SzEnableFileIOpen = xmlDoc.getElementsByTagName("EnableFileOpen")[0].firstChild.nodeValue;
     }
     catch(e){
     //ignore and continue
     }

     try{
     var SzIntitialDocument = xmlDoc.getElementsByTagName("InitialDocument")[0].firstChild.nodeValue;
     }
     catch(e){
     //ignore and continue
     }

     try{
     var SzrefreshMarkup = xmlDoc.getElementsByTagName("RefreshMarkup")[0].firstChild.nodeValue;
     }
     catch(e){
     //ignore and continue
     }





     //set global variables from xml
     if(SzContext != ""){
     //
     }

     if(SzCurrentUser != ""){
     signature = SzCurrentUser;
     }
     if(SzXmlUrl != ""){
     xmlurl = SzXmlUrl;
     }
     if(SzXMLURLRel != ""){
     xmlurlrel = SzXMLURLRel;
     }
     if(SzMarkupSaveUrl != ""){
     xmlurlmarkupsave = SzMarkupSaveUrl;
     }
     if(SzReadonlymarkup != "" && SzReadonlymarkup == "True"){
     readonlymode = true;
     $('.editOnly').remove();
     $('#View').css('display', '');
     $('li[ref="View"]').addClass('selected');

     }else{
     readonlymode = false;
     }
     if(SzCanChangeSign != "" && SzCanChangeSign == "True"){
     bCanChangeSignature = true;
     }else{
     bCanChangeSignature = false;
     }
     if(SzCanChangeLayer != "" && SzCanChangeLayer == "True"){
     bCanChangeLayer = true;
     }else{
     bCanChangeLayer = false;
     }
     if(SzEnableFileIOpen != "" && SzEnableFileIOpen == "False"){
     $('.disableOpenClose').remove();
     }else{
     //bCanChangeLayer = false;
     }
     if(SzrefreshMarkup != "" && SzrefreshMarkup == "True"){
     bRefreshmarkup = true;
     }else{
     bRefreshmarkup = false;
     }
     if(SzIntitialDocument != ""){
     getFile(SzIntitialDocument);
     }


     }
     else if (this.status == 404){
     alert("XML configuration could not be found");
     }
     };*/

    /*xhr.onload = function(ev) {





     };*/

    //xhr.send(XMLGetConfig);

}