declare var RxCore: any;
declare var RxConfig: any;

export function setActiveFile(index: number) {
    RxCore.setActiveFile(index);
}

export function openFile(fileName: string) {
    const path = RxConfig.baseFileURL + fileName;
    RxCore.openFile(path);
}

export function closeAll() {
    return RxCore.closeAll();
}

export function uploadFile() {
    RxCore.fileSelected();
}

export function getFileInfo() {
    return RxCore.getFileInfo();
}

export function getFileIndexByName(name: string) {
    const files = RxCore.getOpenFilesList();

    if (files.length > 0) {
        const file = files.find((file: any) => file.name === name);

        if (file) {
            return file.index;
        }
    }

    return undefined;
}

export function closeFile(name: string) {
    const fileIndex = getFileIndexByName(name);

    if (fileIndex !== undefined) {
        return RxCore.closeDocument(fileIndex);
    }

    return false;
}
