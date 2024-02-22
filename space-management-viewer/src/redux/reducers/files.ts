import { Reducer } from "redux";
import { RootAction, RootState } from "../store";
import { RECEIVE_FILES, RECEIVE_FILE_AREAS, RECEIVE_FILE, 
    REQUEST_FILE, FAIL_FILE, RECEIVE_FILE_AREA, 
    REMOVE_FILE_AREA, ADD_FILE_AREA_TENANT, 
    REMOVE_FILE_AREA_TENANT, ADD_FILE_AREA_TENANTS,
    UPDATE_AREA_CUSTOM_LABEL, REMOVE_AREA_CUSTOM_LABEL
} from "../actions/files/sync";
import { createSelector } from "reselect";
import { areaSelector } from "./rxcore";
import { tenantsSelector } from "./tenants";

export interface ItemsState {
    [fileName: string]: RxFileState
}

export interface RxFilesState {
    failure: boolean,
    isFetching: boolean,
    items: ItemsState;
}

export interface RxFileAreaTenants {
    [areaId: string]: number
}

export interface RxFileAreaLabel{
    [areaId: string]: string
}

export interface RxFileState {
    failure?: boolean,
    isFetching?: boolean,
    id?: number;
    index?: number;
    isPrepared?: boolean;
    name?: string;
    hierarchyPath?: string;
    layerState?: any;
    rotationState?: string;
    areaIds?: string[];
    areaTenants?: RxFileAreaTenants;
    areaLabels?: RxFileAreaLabel;
};

const INITIAL_STATE: RxFilesState = {
    failure: false,
    isFetching: false,
    items: {}
}

const files: Reducer<RxFilesState, RootAction> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RECEIVE_FILES:
            return {
              ...state,
              failure: false,
              isFetching: false,
              items: action.data
            };
        case RECEIVE_FILE_AREAS:
        case RECEIVE_FILE_AREA:
        case RECEIVE_FILE:
        case REQUEST_FILE:
        case FAIL_FILE:
        case REMOVE_FILE_AREA:
        case ADD_FILE_AREA_TENANT:
        case REMOVE_FILE_AREA_TENANT: 
        case ADD_FILE_AREA_TENANTS:
        case UPDATE_AREA_CUSTOM_LABEL:
        case REMOVE_AREA_CUSTOM_LABEL:
            return {
                ...state,
                items: items(state.items, action)
            }
        default:
            return state;
    }
}

const items: Reducer<ItemsState, RootAction> = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_FILE:
        case RECEIVE_FILE:
        case RECEIVE_FILE_AREAS:
        case RECEIVE_FILE_AREA:
        case FAIL_FILE:
        case REMOVE_FILE_AREA:
        case ADD_FILE_AREA_TENANT: 
        case REMOVE_FILE_AREA_TENANT:
        case ADD_FILE_AREA_TENANTS:
        case UPDATE_AREA_CUSTOM_LABEL:
        case REMOVE_AREA_CUSTOM_LABEL:
            return {
                ...state,
                [action.fileName]: item(state[action.fileName], action),
            }
        default:
            return state;
    }
}

const item: Reducer<RxFileState, RootAction> = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_FILE: {
            return {
                ...state,
                isFetching: true,
                failure: false
            }
        }
        case RECEIVE_FILE:
            return {
                ...state,
                ...action.data,
                isFetching: false,
                failure: false
            }
        case RECEIVE_FILE_AREAS:
            return {
                ...state,
                areaIds: action.data
            }
        case RECEIVE_FILE_AREA:
            const newAreas = state.areaIds === undefined ? [] : state.areaIds.concat();
            newAreas.push(action.data);
            return {
                ...state,
                areaIds: newAreas,
            }
        case FAIL_FILE:
            return {
                ...state,
                isFetching: false,
                failure: true,
            }
        case REMOVE_FILE_AREA:
            const remainingAreas = ( state.areaIds === undefined )
                ? [] 
                : state.areaIds.filter((areaId: any) =>  areaId !== action.areaId)

            return {
                ...state,
                areaIds: remainingAreas,
            };
        case ADD_FILE_AREA_TENANT: 
        case REMOVE_FILE_AREA_TENANT: 
            return {
                ...state,
                areaTenants: areaTenants(state.areaTenants, action)
            }
        case ADD_FILE_AREA_TENANTS: 
            return {
                ...state,
                areaTenants: action.data,
            }
        case UPDATE_AREA_CUSTOM_LABEL:
        case REMOVE_AREA_CUSTOM_LABEL:
            return {
                ...state,
                areaLabels: areaLabels(state.areaLabels, action)
            }
        default:
            return state;
    }
}

const areaTenants: Reducer<RxFileAreaTenants, RootAction> = (state = {}, action) => {
    switch (action.type) {
        case ADD_FILE_AREA_TENANT:
            return {
                ...state,
                [action.areaId]: action.tenantId
            }
        case REMOVE_FILE_AREA_TENANT: 
            delete state[action.areaId]; 
            return {
                ...state
            }
        default:
            return state;
    }
}

const areaLabels: Reducer<RxFileAreaLabel, RootAction> = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_AREA_CUSTOM_LABEL: 
            return {
                ...state,
                [action.areaId]: action.label
            }
        case REMOVE_AREA_CUSTOM_LABEL:
            const stateCopy = Object.assign({}, state);
            delete stateCopy[action.areaId]; 
            return {
                ...stateCopy
            }
        default:
            return state;
    }
}

export default files;

const activeFileNameSelector = (state: RootState) => state.app.activeFile;
const itemsSelector = (state: RootState) => state.files.items;

export const activeFileSelector = createSelector(
    itemsSelector,
    activeFileNameSelector,
    (items, fileName) => items[fileName!] || null
)

export const selectedAreaTenantIdSelector = createSelector(
    areaSelector,
    activeFileSelector,
    (areaId, file) => file.areaTenants ? file.areaTenants[areaId] : null
)

export const selectedAreaTenant = createSelector(
    selectedAreaTenantIdSelector,
    tenantsSelector,
    (tenantId, tenants) => {
        return tenantId ? tenants.find((tenant) => tenant.id === tenantId) : undefined;
    }
)

export const selectedAreaTenantSpaces = createSelector(
    selectedAreaTenantIdSelector,
    activeFileSelector,
    (tenantId, file) => {
        return file.areaTenants 
            ? Object.keys(file.areaTenants).filter(key => file.areaTenants![key] === tenantId)
            : null;
    }
)

const activeFileTenantsIds = createSelector (
    activeFileSelector,
    (activeFile) =>  activeFile.areaTenants 
        ? Object.values(activeFile.areaTenants).filter((v, i, a) => a.indexOf(v) === i) 
        : null 
)

export const activeFileTenantsSelector = createSelector(
    tenantsSelector,
    activeFileTenantsIds,
    (tenants, ids) => ids 
        ? tenants.filter((tenant) => ids.includes(tenant.id!))
        : null 
)

export const freeSpaceSelector = createSelector(
    activeFileSelector,
    (file) => file.areaTenants !== undefined
        ? file.areaIds ? file.areaIds.filter((id) => file.areaTenants![id] === undefined) : undefined
        : file.areaIds
)