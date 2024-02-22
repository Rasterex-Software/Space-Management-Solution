declare var RxCore: any;

export function saveAllMarkups() {
    RxCore.markUpSave();
}

export function deleteSelectedMarkup() {
    RxCore.deleteMarkUp();
    RxCore.markUpSave(true);
}

export function selectMarkup(selected: boolean) {
    return RxCore.selectMarkUp(selected);
}

export function selectMarkupbyGUID(uid: any) {
    return RxCore.selectMarkupbyGUID(uid);
}

export function unSelectMarkupbyGUID(uid: any) {
    return RxCore.unSelectMarkupbyGUID(uid);
}


export function getMarkupbyGUID(uid: any) {
    if (uid === undefined || uid === '') {
        return undefined;
    }

    return RxCore.getmarkupobjByGUID(uid);
}

export function getMarkupCustomAttributes(uid: string) {
    if (uid === undefined || uid === '') {
        return undefined;
    }

    return RxCore.getmarkupobjByGUID(uid).GetAttributes();
}

export function deleteMarkupbyGUID(uid: any) {
    RxCore.deleteMarkupbyGUID(uid);
    RxCore.markUpSave(true);
}

export function hideMarkupLabels() {
    RxCore.showMarkupLabels(false);
}

export function getFileMarkups() {
    return RxCore.GUI_Markuplist.markupList;
}