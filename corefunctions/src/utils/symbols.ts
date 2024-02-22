import {
    Globals,
    RxCore_GUI_Symbols
} from '../internal';

export function getNumSymblibs(){
    let xhr = new XMLHttpRequest();
    let urlEncodedData = "";
    let urlEncodedDataPairs = [];

    urlEncodedDataPairs.push(encodeURIComponent("MfcISAPICommand") + '=' + encodeURIComponent("FormRequest"));
    urlEncodedDataPairs.push(encodeURIComponent("Command") + '=' + encodeURIComponent("Numlibs"));

    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    try {
        xhr.open('POST', Globals.xmlurldirect + "?FormRequest", true);
    } catch (e) {
        alert("Error 1 - " + e);
    }
    xhr.onload = (e: any) => {
        if (xhr.status == 200) {
            //parse symbol xml here.
            //create callback to push symbol library to GUI
            let Numlibs = xhr.responseText;

            let symbolinfo = { type : 1, data : Numlibs};

            if (RxCore_GUI_Symbols != undefined){
                RxCore_GUI_Symbols.onSymbolReceived(symbolinfo);
            }

        }else if (xhr.status == 404) {
            alert("XML could not be found");
        } else if (xhr.status == 503) {
            alert("Server is down");
        } else if (xhr.status == 501) {
            //alert("Markup could not be loaded");
        }
    };
    xhr.send(urlEncodedData);
}

export function selectSymblib(num:any){
    //Command=Selectlib&Libnumber=n
    const xhr = new XMLHttpRequest();
    let urlEncodedData = "";
    let urlEncodedDataPairs = [];

    urlEncodedDataPairs.push(encodeURIComponent("MfcISAPICommand") + '=' + encodeURIComponent("FormRequest"));
    urlEncodedDataPairs.push(encodeURIComponent("Command") + '=' + encodeURIComponent("Selectlib"));
    urlEncodedDataPairs.push(encodeURIComponent("Libnumber") + '=' + encodeURIComponent(num));

    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    try {
        xhr.open('POST', Globals.xmlurldirect + "?FormRequest", true);
    } catch (e) {
        alert("Error 1 - " + e);
    }

    xhr.onload = (e) => {
        if (xhr.status == 200) {

            //parse symbol xml here.
            //create callback to push symbol library to GUI
            //var Numlibs = this.responseText;
            const symbolinfo = { type : 6, data : num};

            if (RxCore_GUI_Symbols != undefined){
                RxCore_GUI_Symbols.onSymbolReceived(symbolinfo);
            }

        }else if (xhr.status == 404) {
            alert("XML could not be found");
        } else if (xhr.status == 503) {
            alert("Server is down");
        } else if (xhr.status == 501) {
            //alert("Markup could not be loaded");
        }
    };
    xhr.send(urlEncodedData);
}

export function selectSymbname(num: any){
    //Command=Libname&Libnumber=n

    const xhr = new XMLHttpRequest();
    let urlEncodedData = "";
    let urlEncodedDataPairs = [];

    urlEncodedDataPairs.push(encodeURIComponent("MfcISAPICommand") + '=' + encodeURIComponent("FormRequest"));
    urlEncodedDataPairs.push(encodeURIComponent("Command") + '=' + encodeURIComponent("Libname"));
    urlEncodedDataPairs.push(encodeURIComponent("Libnumber") + '=' + encodeURIComponent(num));

    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    try {
        xhr.open('POST', Globals.xmlurldirect + "?FormRequest", true);
    } catch (e) {
        alert("Error 1 - " + e);
    }

    xhr.onload =  (e) => {
        if (xhr.status == 200) {

            //parse symbol xml here.
            //create callback to push symbol library to GUI
            const libname = xhr.responseText;
            const symbolinfo = { type : 2, data : libname};

            if (RxCore_GUI_Symbols != undefined){
                RxCore_GUI_Symbols.onSymbolReceived(symbolinfo);
            }
        }else if (xhr.status == 404) {
            alert("XML could not be found");
        } else if (xhr.status == 503) {
            alert("Server is down");
        } else if (xhr.status == 501) {
            //alert("Markup could not be loaded");
        }
    };

    xhr.send(urlEncodedData);
}

export function getnumSymbols(num: any){
    //Command=Numsymbols&Libnumber=n
    const xhr = new XMLHttpRequest();
    let urlEncodedData = "";
    let urlEncodedDataPairs = [];

    urlEncodedDataPairs.push(encodeURIComponent("MfcISAPICommand") + '=' + encodeURIComponent("FormRequest"));
    urlEncodedDataPairs.push(encodeURIComponent("Command") + '=' + encodeURIComponent("Numsymbols"));
    urlEncodedDataPairs.push(encodeURIComponent("Libnumber") + '=' + encodeURIComponent(num));

    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    try {
        xhr.open('POST', Globals.xmlurldirect + "?FormRequest", true);
    } catch (e) {
        alert("Error 1 - " + e);
    }

    xhr.onload = function (e) {
        if (xhr.status == 200) {
            //parse symbol xml here.
            //create callback to push symbol library to GUI
            const numsymbols = xhr.responseText;
            const symbolinfo = { type : 3, data : numsymbols};
            if (RxCore_GUI_Symbols != undefined){
                RxCore_GUI_Symbols.onSymbolReceived(symbolinfo);
            }
        }else if (xhr.status == 404) {
            alert("XML could not be found");
        } else if (xhr.status == 503) {
            alert("Server is down");
        } else if (xhr.status == 501) {
            //alert("Markup could not be loaded");
        }
    };

    xhr.send(urlEncodedData);
}

export function getSymbolName(num: any, sname: any){
    //Command=Symbolname&Libnumber=nSymbolnumber=
    const xhr = new XMLHttpRequest();
    let urlEncodedData = "";
    let urlEncodedDataPairs = [];

    urlEncodedDataPairs.push(encodeURIComponent("MfcISAPICommand") + '=' + encodeURIComponent("FormRequest"));
    urlEncodedDataPairs.push(encodeURIComponent("Command") + '=' + encodeURIComponent("Symbolname"));
    urlEncodedDataPairs.push(encodeURIComponent("Libnumber") + '=' + encodeURIComponent(num));
    urlEncodedDataPairs.push(encodeURIComponent("Symbolnumber") + '=' + encodeURIComponent(sname));

    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    try {
        xhr.open('POST', Globals.xmlurldirect + "?FormRequest", true);
    } catch (e) {
        alert("Error 1 - " + e);
    }

    xhr.onload = function (e) {
        if (xhr.status == 200) {

            //parse symbol xml here.
            //create callback to push symbol library to GUI
            const symbolName = xhr.responseText;
            const symbolinfo = { type : 4, data : symbolName};
            if (RxCore_GUI_Symbols != undefined){
                RxCore_GUI_Symbols.onSymbolReceived(symbolinfo);
            }
        }else if (xhr.status == 404) {
            alert("XML could not be found");
        } else if (xhr.status == 503) {
            alert("Server is down");
        } else if (xhr.status == 501) {
            //alert("Markup could not be loaded");
        }
    };

    xhr.send(urlEncodedData);
}

export function getSymbolPNGData(num:any, sname:any){
    //Command=symbolpngdata&Libnumber=n&Symbolnumber=s;

    const xhr = new XMLHttpRequest();
    let urlEncodedData = "";
    let urlEncodedDataPairs = [];

    urlEncodedDataPairs.push(encodeURIComponent("MfcISAPICommand") + '=' + encodeURIComponent("FormRequest"));
    urlEncodedDataPairs.push(encodeURIComponent("Command") + '=' + encodeURIComponent("symbolpng"));
    urlEncodedDataPairs.push(encodeURIComponent("Libnumber") + '=' + encodeURIComponent(num));
    urlEncodedDataPairs.push(encodeURIComponent("Symbolnumber") + '=' + encodeURIComponent(sname));

    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    try {
        xhr.open('POST', Globals.xmlurldirect + "?FormRequest", true);
        xhr.responseType = "arraybuffer";
    } catch (e) {
        alert("Error 1 - " + e);
    }

    xhr.onload = function (e) {
        if (xhr.status == 200) {
            //parse symbol xml here.
            //create callback to push symbol library to GUI
            const symbolPNGData = new Blob([xhr.response], {type: "image/png"});
            //var symbolPNGData = this.responseText;
            const symbolinfo = { type : 5, data : symbolPNGData, index : sname};
            if (RxCore_GUI_Symbols != undefined){
                RxCore_GUI_Symbols.onSymbolReceived(symbolinfo);
            }
        }else if (xhr.status == 404) {
            alert("XML could not be found");
        } else if (xhr.status == 503) {
            alert("Server is down");
        } else if (xhr.status == 501) {
            //alert("Markup could not be loaded");
        }
    };

    xhr.send(urlEncodedData);
}