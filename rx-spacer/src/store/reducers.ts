import { createSelector } from 'reselect';

import { RxSpacerReducer } from './store';

import { RootState } from '.';
import {
    ADD_AREA, ADD_AREAS, ADD_CONVERT_BLOCKS, ADD_FIELD,
    ADD_FIELDS, CLEAR_AREAS, DONE_PREPARATION, INITIALIZE,
    REMOVE_AREA, REMOVE_FIELD, TOGGLE_FIELD, UPDATE_SELECTED_AREA,
    UPDATE_SELECTED_FILE,
} from './actions';

import { RxSpacerActions } from './actions';
export interface AreaAttribute {
    name: string;
    label: string;
    placeholder: string;
    isVisible: boolean;
    type?: string;
    options?: string[];
}

export interface RxSpacerState {
    initialized: boolean;
    areaAttributes: AreaAttribute[];
    areas: {[key: string]: string[]};
    blocksToConvert?: string[];
    preparationDone: boolean;
    selectedFile?: string;
    selectedAreaId?: string;
}

export const initialState: RxSpacerState = {
    initialized: false,
    areaAttributes: [],
    areas: {},
    preparationDone: false,
};

export const rxspacer: RxSpacerReducer<RxSpacerState, RxSpacerActions> = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE:
            return {
                ...state,
                initialized: action.initialized,
            };
        case UPDATE_SELECTED_AREA:
            return {
                ...state,
                selectedAreaId: action.areaId,
            };
        case UPDATE_SELECTED_FILE:
            return {
                ...state,
                selectedFile: action.fileName,
                preparationDone: false,
            };
        case CLEAR_AREAS:
            const newAreas = Object.assign({}, state.areas);
            newAreas[action.fileName] = [];

            return {
                ...state,
                areas: newAreas,
            };
        case ADD_AREAS:
        case ADD_AREA:
        case REMOVE_AREA:
            return {
                ...state,
                areas: areas(state.areas, action),
            };
        case ADD_FIELDS:
            return {
                ...state,
                areaAttributes: action.fields,
            };
        case ADD_FIELD:
        case REMOVE_FIELD:
        case TOGGLE_FIELD:
            return {
                ...state,
                areaAttributes: fields(state.areaAttributes, action),
            };
        case ADD_CONVERT_BLOCKS:
            return {
                ...state,
                blocksToConvert: action.vectorBlockIds,
            };
        case DONE_PREPARATION:
            return {
                ...state,
                preparationDone: true,
            };
        default:
            return state;
    }
};

// Slice reducer: it only reduces the bit of the state it's concerned about.
const areas = (state: any, action: RxSpacerActions) => {
    let obj: any;
    switch (action.type) {
        case ADD_AREAS:
            obj = {};
            obj[action.fileName] = [];
            const addedAreas = state.hasOwnProperty(action.fileName) ? state[action.fileName] : obj[action.fileName];
            return {
                ...state,
                [action.fileName] : addedAreas.concat(action.areas),
            };
        case ADD_AREA:
            obj = {};
            obj[action.fileName] = [];
            const addedArea = state[action.fileName] ? state[action.fileName] : obj[action.fileName];
            return {
                ...state,
                [action.fileName]: addedArea.concat([action.areaId]),
            };
        case REMOVE_AREA:
            const newAreas = state[action.fileName].filter(
                (area: any) =>  area !== action.areaId,
            );
            return {
                ...state,
                [action.fileName]: newAreas,
            };
        default:
            return state;
    }
};

const fields = (state: any[], action: RxSpacerActions) => {
    switch (action.type) {
        case ADD_FIELD:
            return [
                ...state,
                {
                    name: action.name,
                    label: action.label,
                },
            ];
        case REMOVE_FIELD:
            return state.filter((field) => field.name !== action.name);

        case TOGGLE_FIELD:
            return state.map((field) => {
                // if we found a desired element,
                // then change the state of isTriggeredEdit
                if (field.name === action.name) {
                    return {
                        ...field,
                        isVisible: !field.isVisible,
                    };
                }
                return field;
            });

        // case 'EDIT_ITEM_SAVE':
        //     return state.map(item => {
        //         // if we found a desired element,
        //         // then change the state of isTriggeredEdit
        //         if (item.id === action.id) {
        //             return {
        //                 ...item,
        //                 title: action.title,
        //                 message: action.message,
        //                 isTriggeredEdit: !item.isTriggeredEdit
        //             }
        //         }
        //         else {
        //             return item;
        //         }
        //     })

        default:
            return state;
    }
};

export default rxspacer;

export const areasSelector = (state: RootState) => state.rxspacer.areas;
export const areaIdSelector = (state: RootState) => state.rxspacer.selectedAreaId;
export const fieldsSelector = (state: RootState) => state.rxspacer.areaAttributes;
export const selectedFileSelector = (state: RootState) => state.rxspacer.selectedFile;

export const currentAreasSelector = createSelector(
    areasSelector,
    selectedFileSelector,
    (allAreas, file) => {
        return file ? allAreas[file] || [] : [];
    },
);

export const visibleFieldsSelector = createSelector(
    fieldsSelector,
    (allFields) => {
        return allFields.filter((field) => field.isVisible);
    },
);
