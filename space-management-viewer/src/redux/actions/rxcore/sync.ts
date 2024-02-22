import { Action, ActionCreator } from 'redux';

// ACTIONS
export const INITIALIZE_RXCORE = 'INITIALIZE_RXCORE';
export const UPDATE_SELECTED_AREA = 'UPDATE_SELECTED_AREA';
export const RESIZE_CANVAS = 'RESIZE_CANVAS';
export const SET_SORT_FILTER = 'SET_SORT_FILTER';
export const START_CONVERT = 'START_CONVERT';
export const END_CONVERT = 'END_CONVERT';
export const UPDATE_SM_MODE = 'UPDATE_SM_MODE';
export const CLOSE_ALL_FILES = 'CLOSE_ALL_FILES';
export const CLOSE_FILE = 'CLOSE_FILE';
export const SCHEDULE_CLOSE = 'SCHEDULE_CLOSE';
export const SET_HIERARCHY_PATH_STRING = 'SET_HIERARCHY_PATH_STRING';
export const UPDATE_FREE_SPACE_COLOR = 'UPDATE_FREE_SPACE_COLOR';
export const UPDATE_COMMON_SPACE_COLOR = 'UPDATE_COMMON_SPACE_COLOR';
export const UPDATE_TENANT_COLOR = 'UPDATE_TENANT_COLOR';
export const HIDE_LABELS = 'HIDE_LABELS';

export const SortFilters = {
    LABEL: 'label',
    SURFACE: 'surface',
    TYPE: 'type',
    DESCRIPTION: 'description'
}

export interface RxCoreActionInitializeRxcore extends Action<'INITIALIZE_RXCORE'> {};
export interface RxCoreActionUpdateSelectedArea extends Action<'UPDATE_SELECTED_AREA'> { blockId: string };
export interface RxCoreActionResizeCanvas extends Action<'RESIZE_CANVAS'> { size: object };
export interface RxCoreActionSetSortFilter extends Action<'SET_SORT_FILTER'> { filter: string };
export interface RxCoreActionStartConvert extends Action<'START_CONVERT'> {};
export interface RxCoreActionEndConvert extends Action<'END_CONVERT'> {};
export interface RxCoreActionUpdateSmMode extends Action<'UPDATE_SM_MODE'> { mode: string };
export interface RxCoreActionCloseAllFiles extends Action<'CLOSE_ALL_FILES'> {};
export interface RxCoreActionCloseFile extends Action<'CLOSE_FILE'> {fileName: string};
export interface RxCoreActionScheduleClose extends Action<'SCHEDULE_CLOSE'> {};
export interface RxCoreActionSetHierarchyPathString extends Action<'SET_HIERARCHY_PATH_STRING'> { hierarchyPathString: string };
export interface RxCoreActionUpdateFreeSpaceColor extends Action<'UPDATE_FREE_SPACE_COLOR'> { color: string };
export interface RxCoreActionUpdateCommonSpaceColor extends Action<'UPDATE_COMMON_SPACE_COLOR'> { color: string };
export interface RxCoreActionUpdateTenantColor extends Action<'UPDATE_TENANT_COLOR'> { tenantId: string, color: string };
export interface RxCoreActionHideLabels extends Action<'HIDE_LABELS'> {onOff: boolean};

export type RxCoreAction = RxCoreActionInitializeRxcore | RxCoreActionUpdateSelectedArea  | RxCoreActionResizeCanvas | 
    RxCoreActionSetSortFilter | RxCoreActionEndConvert| RxCoreActionStartConvert |
    RxCoreActionUpdateSmMode | RxCoreActionCloseAllFiles | RxCoreActionCloseFile |
    RxCoreActionScheduleClose | RxCoreActionSetHierarchyPathString | RxCoreActionUpdateFreeSpaceColor |
    RxCoreActionUpdateCommonSpaceColor | RxCoreActionUpdateTenantColor | RxCoreActionHideLabels;

export const initializeRxCore: ActionCreator<RxCoreActionInitializeRxcore> = () => {
    return {
        type: INITIALIZE_RXCORE
    };
};

export const activeArea: ActionCreator<RxCoreActionUpdateSelectedArea> = (blockId: string) => {
    return {
        type: UPDATE_SELECTED_AREA,
        blockId
    };
}

export const resizeCanvas: ActionCreator<RxCoreActionResizeCanvas> = (size: object) => {
    return {
        type: RESIZE_CANVAS,
        size
    };
}

export const setSortFilter: ActionCreator<RxCoreActionSetSortFilter> = (filter) => {
    return {
        type: SET_SORT_FILTER,
        filter,
    };
};

export const startConvert: ActionCreator<RxCoreActionStartConvert> = () => {
    return {
        type: START_CONVERT,
    };
};

export const endConvert: ActionCreator<RxCoreActionEndConvert> = () => {
    return {
        type: END_CONVERT,
    };
};

export const updateSmModeInStore: ActionCreator<RxCoreActionUpdateSmMode> = (mode) => {
    return {
        type: UPDATE_SM_MODE,
        mode
    };
};

export const closeAllFilesAndUpdateState: ActionCreator<RxCoreActionCloseAllFiles> = () => {
    return {
        type: CLOSE_ALL_FILES,
    };
};

export const closeFile: ActionCreator<RxCoreActionCloseFile> = (fileName: any) => {
    return {
        type: CLOSE_FILE,
        fileName
    };
};

export const scheduleClose: ActionCreator<RxCoreActionScheduleClose> = () => {
    return {
        type: SCHEDULE_CLOSE,
    };
};

export const setHierarchyPathStringForSelectedNode: ActionCreator<RxCoreActionSetHierarchyPathString> = (hierarchyPathString) => {
    return {
        type: SET_HIERARCHY_PATH_STRING,
        hierarchyPathString
    };
};

export const updateFreeSpaceColor: ActionCreator<RxCoreActionUpdateFreeSpaceColor> = (color) => {
    return {
        type: UPDATE_FREE_SPACE_COLOR,
        color
    };
}

export const updateCommonSpaceColor: ActionCreator<RxCoreActionUpdateCommonSpaceColor> = (color) => {
    return {
        type: UPDATE_COMMON_SPACE_COLOR,
        color
    };
}

export const updateTenantColor: ActionCreator<RxCoreActionUpdateTenantColor> = (tenantId, color) => {
    return {
        type: UPDATE_TENANT_COLOR,
        tenantId,
        color
    };
}

export const hideLabels: ActionCreator<RxCoreActionHideLabels> = (onOff) => {
    return {
        type: HIDE_LABELS,
        onOff,
    };
}