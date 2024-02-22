import { Action, ActionCreator } from 'redux';

export const REQUEST_FILE = 'REQUEST_FILE';
export const RECEIVE_FILE = 'RECEIVE_FILE';
export const FAIL_FILE = 'FAIL_FILE';
export const RECEIVE_FILES = 'RECEIVE_FILES';
export const RECEIVE_FILE_AREAS = 'RECEIVE_FILE_AREAS';
export const RECEIVE_FILE_AREA = 'RECEIVE_FILE_AREA';
export const REMOVE_FILE_AREA = 'REMOVE_FILE_AREA';
export const ADD_FILE_AREA_TENANT = 'ADD_FILE_AREA_TENANT';
export const REMOVE_FILE_AREA_TENANT = 'REMOVE_FILE_AREA_TENANT';
export const ADD_FILE_AREA_TENANTS = 'ADD_FILE_AREA_TENANTS';
export const UPDATE_AREA_CUSTOM_LABEL = 'UPDATE_AREA_CUSTOM_LABEL';
export const REMOVE_AREA_CUSTOM_LABEL = 'REMOVE_AREA_CUSTOM_LABEL';

export interface RxFileActionRequestFile extends Action<'REQUEST_FILE'> { fileName: string };
export interface RxFileActionReceiveFile extends Action<'RECEIVE_FILE'> { fileName: string; data: any };
export interface RxFileActionFailFile extends Action<'FAIL_FILE'> { fileName: string };
export interface RxFileActionReceiveFiles extends Action<'RECEIVE_FILES'> { data: any };
export interface RxFileActionReceiveFileArea extends Action<'RECEIVE_FILE_AREA'> { fileName: string; data: any };
export interface RxFileActionReceiveFileAreas extends Action<'RECEIVE_FILE_AREAS'> { fileName: string; data: any };
export interface RxFileActionRemoveFileArea extends Action<'REMOVE_FILE_AREA'> { fileName: string; areaId: string };
export interface RxFileActionAddFileAreaTenant extends Action<'ADD_FILE_AREA_TENANT'> { fileName: string; tenantId: number; areaId: string };
export interface RxFileActionRemoveFileAreaTenant extends Action<'REMOVE_FILE_AREA_TENANT'> { fileName: string; areaId: string };
export interface RxFileActionAddFileAreaTenants extends Action<'ADD_FILE_AREA_TENANTS'> { fileName: string; data: object };
export interface RxFileActionUpdateAreaCustomLabel extends Action<'UPDATE_AREA_CUSTOM_LABEL'> { fileName: string; label: string; areaId: string };
export interface RxFileActionRemoveAreaCustomLabel extends Action<'REMOVE_AREA_CUSTOM_LABEL'> { fileName: string; areaId: string };

export type RxFilesAction = RxFileActionReceiveFiles | RxFileActionReceiveFileAreas | RxFileActionReceiveFile |
    RxFileActionRequestFile | RxFileActionFailFile | RxFileActionReceiveFileArea | RxFileActionRemoveFileArea | 
    RxFileActionAddFileAreaTenant | RxFileActionRemoveFileAreaTenant | RxFileActionAddFileAreaTenants |
    RxFileActionUpdateAreaCustomLabel | RxFileActionRemoveAreaCustomLabel;

export const requestFile: ActionCreator<RxFileActionRequestFile> = (fileName) => {
    return {
        type: REQUEST_FILE,
        fileName
    };
};

export const receiveFile: ActionCreator<RxFileActionReceiveFile> = (fileName: string, data: any) => {
    return {
        type: RECEIVE_FILE,
        fileName,
        data
    };
};

export const failFile: ActionCreator<RxFileActionFailFile> = (fileName: string) => {
    return {
        type: FAIL_FILE,
        fileName,
    };
};

export const receiveFiles: ActionCreator<RxFileActionReceiveFiles> = (data: any) => {
    return {
        type: RECEIVE_FILES,
        data
    };
};

export const receiveFileArea: ActionCreator<RxFileActionReceiveFileArea> = (fileName: string, data: any) => {
    return {
        type: RECEIVE_FILE_AREA,
        fileName,
        data
    };
};


export const receiveFileAreas: ActionCreator<RxFileActionReceiveFileAreas> = (fileName: string, data: any) => {
    return {
        type: RECEIVE_FILE_AREAS,
        fileName,
        data
    };
};

export const removeFileArea: ActionCreator<RxFileActionRemoveFileArea> = (fileName:string, areaId: string) => {
    return {
        type: REMOVE_FILE_AREA,
        fileName,
        areaId
    };
};

export const addFileAreaTenant: ActionCreator<RxFileActionAddFileAreaTenant> = (fileName:string, tenantId: number, areaId: string) => {
    return {
        type: ADD_FILE_AREA_TENANT,
        fileName,
        tenantId,
        areaId
    }
}

export const removeFileAreaTenant: ActionCreator<RxFileActionRemoveFileAreaTenant> = (fileName:string, areaId: string) => {
    return {
        type: REMOVE_FILE_AREA_TENANT,
        fileName,
        areaId
    }
}

export const addFileAreaTenants: ActionCreator<RxFileActionAddFileAreaTenants> = (fileName:string, data: object) => {
    return {
        type: ADD_FILE_AREA_TENANTS,
        fileName,
        data
    }
}

export const updateAreaCustomLabel: ActionCreator<RxFileActionUpdateAreaCustomLabel> = (fileName: string, label: string, areaId: string) => {
    return {
        type: UPDATE_AREA_CUSTOM_LABEL,
        fileName,
        label,
        areaId
    }
}

export const removeAreaCustomLabel: ActionCreator<RxFileActionRemoveAreaCustomLabel> = (fileName: string, areaId: string) => {
    return {
        type: REMOVE_AREA_CUSTOM_LABEL,
        fileName,
        areaId
    }
}