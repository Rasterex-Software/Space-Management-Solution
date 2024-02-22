declare var RxCore: any;


// TODO: review, mode param is added because for the moment default tool in prepare mode is spaceEdit
// so we need a way to make distinction
export function selectTool(mode: string, toolName?: string) {
    switch (toolName) {
        case 'zoom_in':
            RxCore.zoomIn();
            break;
        case 'zoom_out':
            RxCore.zoomOut();
            break;
        case 'zoom_fit':
            RxCore.zoomFit();
            break;
        case 'zoom_width':
            RxCore.zoomWidth();
            break;
        case 'zoom_height':
            RxCore.zoomHeight();
            break;
        case 'zoom_window':
            RxCore.zoomWindow(true);
            break;
        case 'rotate':
            RxCore.rotate(true);
            break;
        default:
            break;
    }

    // always set default tool depending on mode after an tool selection
    if (toolName !== 'zoom_window') {
        if (mode === 'prepare') {
            enableSpaceEdit();
        } else {
            restoreDefault();
        }
    }
}

export function enableSpaceEdit() {
    RxCore.spaceEdit();
}

export function restoreDefault(mode?: string) {
    RxCore.restoreDefault();
    RxCore.unSelectAllMarkup();
    RxCore.pickRxSpace(true, false);

    if ( mode === 'edit') {
        enableSpaceEdit();
    }
}

export function deselectTool() {
    RxCore.pickPolygon(false);
}

export function resize(offsetWidth: number, offsetHeight: number) {
    RxCore.doResize(true, offsetWidth, offsetHeight);
    RxCore.zoomFit();
}

export function zoomFit() {
    RxCore.zoomFit();
}

export function restrictPan(onOff:boolean){
    RxCore.restrictPan(onOff);
}

export function changeSnapState(selected: boolean) {
    RxCore.changeSnapState(selected);
}

export function getSnapState() {
    RxCore.getSnapState();
}

