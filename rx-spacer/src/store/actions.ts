import { RxSpacerAction, RxSpacerActionCreator } from './store';

export const INITIALIZE = 'INITIALIZE';
export const UPDATE_SELECTED_AREA = 'UPDATE_SELECTED_AREA';
export const UPDATE_SELECTED_FILE = 'UPDATE_SELECTED_FILE';
export const UPDATE_PAGE = 'UPDATE_PAGE';

export const ADD_AREAS = 'ADD_AREAS';
export const ADD_AREA = 'ADD_AREA';
export const REMOVE_AREA = 'REMOVE_AREA';
export const CLEAR_AREAS = 'CLEAR_AREAS';

export const ADD_FIELD = 'ADD_FIELD';
export const ADD_FIELDS = 'ADD_FIELDS';
export const REMOVE_FIELD = 'REMOVE_FIELD';
export const TOGGLE_FIELD = 'TOGGLE_FIELD';

export const ADD_CONVERT_BLOCKS = 'ADD_CONVERT_BLOCKS';
export const DONE_PREPARATION = 'DONE_PREPARATION';

export interface RxSpacerActionInitialize extends RxSpacerAction<'INITIALIZE'> { initialized: boolean; }
export interface RxSpacerActionUpdateSelectedArea extends RxSpacerAction<'UPDATE_SELECTED_AREA'> { areaId: string; }
export interface RxSpacerActionUpdateSelectedFile extends RxSpacerAction<'UPDATE_SELECTED_FILE'> { fileName: string; }
export interface RxSpacerActionAddAreas extends RxSpacerAction<'ADD_AREAS'> { fileName: string; areas: string[]; }
export interface RxSpacerActionAddArea extends RxSpacerAction<'ADD_AREA'> { fileName: string; areaId: string; }
export interface RxSpacerActionRemoveArea extends RxSpacerAction<'REMOVE_AREA'> { fileName: string; areaId: string; }
export interface RxSpacerActionAddField extends RxSpacerAction<'ADD_FIELD'> { name: string; label: string; }
export interface RxSpacerActionRemoveField extends RxSpacerAction<'REMOVE_FIELD'> { name: string; }
export interface RxSpacerActionToggleField extends RxSpacerAction<'TOGGLE_FIELD'> { name: string; }
// tslint:disable-next-line: max-line-length
export interface RxSpacerActionAddConvertBlocks extends RxSpacerAction<'ADD_CONVERT_BLOCKS'> { vectorBlockIds: string[]; }
export interface RxSpacerActionClearAreas extends RxSpacerAction<'CLEAR_AREAS'> { fileName: string; }
export interface RxSpacerActionDonePreparation extends RxSpacerAction<'DONE_PREPARATION'> {}
export interface RxSpacerActionAddFields extends RxSpacerAction<'ADD_FIELDS'> { fields: any[]; }

export type RxSpacerActions = RxSpacerActionInitialize | RxSpacerActionUpdateSelectedArea | RxSpacerActionAddArea |
    RxSpacerActionRemoveArea | RxSpacerActionUpdateSelectedFile | RxSpacerActionAddField |
    RxSpacerActionRemoveField | RxSpacerActionToggleField | RxSpacerActionAddAreas |
    RxSpacerActionClearAreas | RxSpacerActionAddConvertBlocks | RxSpacerActionDonePreparation| RxSpacerActionAddFields ;

export const initialize: RxSpacerActionCreator<RxSpacerActionInitialize> = (initialized: boolean) => {
    return {
        type: INITIALIZE,
        initialized,
    };
};

export const updateSelectedArea: RxSpacerActionCreator<RxSpacerActionUpdateSelectedArea> = (areaId: string) => {
    return {
        type: UPDATE_SELECTED_AREA,
        areaId,
    };
};

export const updateSelectedFile: RxSpacerActionCreator<RxSpacerActionUpdateSelectedFile> = (fileName: string) => {
    return {
        type: UPDATE_SELECTED_FILE,
        fileName,
    };
};

export const addAreas: RxSpacerActionCreator<RxSpacerActionAddAreas> = (fileName: string, areas: string[]) => {
    return {
        type: ADD_AREAS,
        fileName,
        areas,
    };
};

export const addArea: RxSpacerActionCreator<RxSpacerActionAddArea> = (fileName: string, areaId: string) => {
    return {
        type: ADD_AREA,
        fileName,
        areaId,
    };
};

export const removeArea: RxSpacerActionCreator<RxSpacerActionRemoveArea> = (fileName: string, areaId: string) => {
    return {
        type: REMOVE_AREA,
        fileName,
        areaId,
    };
};

export const addField: RxSpacerActionCreator<RxSpacerActionAddField> = (name: string, label: string) => {
    return {
        type: ADD_FIELD,
        name,
        label,
    };
};

export const addFields: RxSpacerActionCreator<RxSpacerActionAddFields> = (fields: any[]) => {
    return {
        type: ADD_FIELDS,
        fields,
    };
};

// action for removing an item
export const removeField: RxSpacerActionCreator<RxSpacerActionRemoveField> = (name: string) => {
    return {
        type: REMOVE_FIELD,
        name,
    };
};

// action for toggling an item
export const toggleField: RxSpacerActionCreator<RxSpacerActionToggleField> = (name: string) => {
    return {
        type: TOGGLE_FIELD,
        name,
    };
};

export const addBlocksToConvert: RxSpacerActionCreator<RxSpacerActionAddConvertBlocks> = (vectorBlockIds: string[]) => {
    return {
        type: ADD_CONVERT_BLOCKS,
        vectorBlockIds,
    };
};

export const clearAreas: RxSpacerActionCreator<RxSpacerActionClearAreas> = (fileName: string) => {
    return {
        type: CLEAR_AREAS,
        fileName,
    };
};

export const donePreparation: RxSpacerActionCreator<RxSpacerActionDonePreparation> = () => {
    return {
        type: DONE_PREPARATION,
    };
};

// action for saving an edited item
// export const editFieldSave = (name, label) => {
//     return {

//     }
// }
