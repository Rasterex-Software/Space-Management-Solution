import { Reducer } from 'redux';
import {
    INITIALIZE_RXCORE,
    UPDATE_SELECTED_AREA,
    RESIZE_CANVAS,
    SET_SORT_FILTER,
    START_CONVERT,
    END_CONVERT,
    UPDATE_SM_MODE,
    CLOSE_ALL_FILES,
    CLOSE_FILE,
    SCHEDULE_CLOSE,
    SET_HIERARCHY_PATH_STRING,
    UPDATE_FREE_SPACE_COLOR,
    UPDATE_COMMON_SPACE_COLOR,
    HIDE_LABELS,
} from '../actions/rxcore/index';

import { SortFilters } from '../actions/rxcore/index';
import { RootAction, RootState } from '../store';

// TODO: refactor sort filters to have his own reducer
export interface RxCoreState {
    initialized?: boolean;
    selectedArea: string;
    size?: object;
    spaceConverted: boolean;
    vectorBlocks?: any;
    sortFilter: string;
    sortASC: boolean;
    smMode: string;
    scheduledClose: boolean;
    scheduledSave: boolean;
    hierarchyPathStringForSelectedNode: string;
    freeSpaceColor: string;
    commonSpaceColor: string;
    hideLabels: boolean
}

export interface FloorsState {
    [k: string]: FloorState;
};

export interface FloorState {
    id?: string;
    index?: number;
    isFetching?: boolean;
    isFetched?: boolean;
    data?: any,
    tenants?: any[];
};

const INITIAL_STATE: RxCoreState = {
    initialized: false,
    selectedArea: '',
    sortFilter: SortFilters.LABEL,
    sortASC: true,
    spaceConverted: false,
    smMode: '',
    scheduledClose: false,
    scheduledSave: false,
    hierarchyPathStringForSelectedNode: '',
    freeSpaceColor: 'rgba(255,0,0,0.3)',
    commonSpaceColor: 'rgba(117,117,117,0.3)',
    hideLabels: false,
};

const rxcore: Reducer<RxCoreState, RootAction> = (state = INITIAL_STATE, action) => {
    let newState:any;

    switch (action.type) {
        case INITIALIZE_RXCORE:
            return {
                ...state,
                initialized: true
            }
        case UPDATE_SELECTED_AREA:
            // deselect if same id
            const blockId = state.selectedArea === action.blockId ? '' : action.blockId;
            return {
                ...state,
                selectedArea: blockId
            }
        case RESIZE_CANVAS:
            return {
                ...state,
                size: action.size
            }
        case SET_SORT_FILTER:
            const ASC = state.sortFilter === action.filter ? !state.sortASC : true;
            return {
                ...state,
                sortFilter: action.filter,
                sortASC: ASC
            }
        case START_CONVERT:
            return {
                ...state,
                spaceConverted: false
            }
        case END_CONVERT:
            return {
                ...state,
                spaceConverted: true
            }
        case UPDATE_SM_MODE:
            const isCloseScheduled: boolean =  (action.mode==='prepare');
            const isSaveScheduled: boolean = (state.smMode==='prepare');
            return {
                ...state,
                smMode: action.mode,
                scheduledClose: isCloseScheduled,
                scheduledSave: isSaveScheduled
            }
        case SCHEDULE_CLOSE:
            return {
                ...state,
                scheduledClose: true
            }
        case CLOSE_ALL_FILES:
            return {
                ...state,
                floors: [] as any, // as FloorsState,
                tenants: [],
                selectedFloor: '',
                selectedArea: '',
                vectorBlocks: [],
            }
        case CLOSE_FILE:
            newState = {
                ...state,
                selectedFloor: '',
                selectArea: '',
                scheduledClose: false,
                scheduledSave: false,
            }
            // TODO: review
            if (newState && newState.floors
                && newState.floors.hasOwnProperty(action.fileName)
                ) {
                delete newState.floors![action.fileName];
            }


            return newState;
        case SET_HIERARCHY_PATH_STRING:
            return {
                ...state,
                hierarchyPathStringForSelectedNode: action.hierarchyPathString
            }
        case UPDATE_FREE_SPACE_COLOR:
            return {
                ...state,
                freeSpaceColor: action.color
            }
        case UPDATE_COMMON_SPACE_COLOR:
                return {
                    ...state,
                    commonSpaceColor: action.color
                }
        case HIDE_LABELS:
            return {
                ...state,
                hideLabels: action.onOff
            }
        default:
            return state;
    }
};


export default rxcore;

export const areaSelector = (state: RootState) => state.rxcore.selectedArea;
export const filterSelector = (state: RootState) => state.rxcore.sortFilter;
export const filterAscSelector = (state: RootState) => state.rxcore.sortASC;

export function dynamicSort(property:string) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a: any,b: any) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}