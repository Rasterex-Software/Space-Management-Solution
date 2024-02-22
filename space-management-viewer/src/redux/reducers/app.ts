import { Reducer } from 'redux';
import {
    UPDATE_PAGE,
    UPDATE_OFFLINE,
    SET_ACTIVE_FILE,
    TOGGLE_TENANTS_OVERVIEW,
    TOGGLE_TENANTS_LIST_LEGEND,
    UPDATE_ACTIVE_LEGEND,
} from '../actions/app.js';
import { RootAction, RootState } from '../store.js';

export interface AppState {
    page: string;
    offline: boolean;
    activeFile?: string;
    tenantsOverview: boolean;
    tenantListLegend: boolean;
    activeLegend?: string;
}

const INITIAL_STATE: AppState = {
    page: '',
    offline: false,
    tenantsOverview: false,
    tenantListLegend: false,
};

const app: Reducer<AppState, RootAction> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_PAGE:
            return {
                ...state,
                page: action.page
            };
        case UPDATE_OFFLINE:
            return {
                ...state,
                offline: action.offline
            };
        case SET_ACTIVE_FILE:
                return {
                    ...state,
                    activeFile: action.fileName
                };
        case TOGGLE_TENANTS_LIST_LEGEND:
                return {
                    ...state,
                    tenantListLegend: !state.tenantListLegend,
                }
        case TOGGLE_TENANTS_OVERVIEW:
            return {
                ...state,
                tenantsOverview: !state.tenantsOverview,
                activeLegend: ''
            }
        case UPDATE_ACTIVE_LEGEND:
            return {
                ...state,
                activeLegend: action.key,
                tenantsOverview: false
            }
        default:
            return state;
    }
};

export default app;

export const activeLegendKeySelector = (state: RootState) => state.app.activeLegend;