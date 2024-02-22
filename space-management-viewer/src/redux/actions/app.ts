import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store.js';

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const SET_ACTIVE_FILE = 'SET_ACTIVE_FILE';
export const TOGGLE_TENANTS_LIST_LEGEND = 'TOGGLE_TENANTS_LIST_LEGEND';
export const TOGGLE_TENANTS_OVERVIEW = 'TOGGLE_TENANTS_OVERVIEW';
export const UPDATE_ACTIVE_LEGEND = 'UPDATE_ACTIVE_LEGEND';

export interface AppActionUpdatePage extends Action<'UPDATE_PAGE'> { page: string };
export interface AppActionUpdateOffline extends Action<'UPDATE_OFFLINE'> { offline: boolean };
export interface AppActionSetActiveFile extends Action<'SET_ACTIVE_FILE'> { fileName: string};
export interface AppActionToggleTenantsListLegend extends Action<'TOGGLE_TENANTS_LIST_LEGEND'> {};
export interface AppActionToggleTenantsOverview extends Action<'TOGGLE_TENANTS_OVERVIEW'> {};
export interface AppActionUpdateActiveLegend extends Action<'UPDATE_ACTIVE_LEGEND'> { key: string };

export type AppAction = AppActionUpdatePage | AppActionUpdateOffline | AppActionSetActiveFile |
AppActionToggleTenantsListLegend | AppActionToggleTenantsOverview | AppActionUpdateActiveLegend;

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>;

export const navigate: ActionCreator<ThunkResult> = (path: string) => (dispatch) => {
    // Extract the page name from path.
    const page = path === '/' ? 'sm-landing' : path.slice(1);

    // Any other info you might want to extract from the path (like page type),
    // you can do here
    dispatch(loadPage(page));
};

const loadPage: ActionCreator<ThunkResult> = (page: string) => (dispatch) => {
    switch (page) {
        case 'sm-rxcontainer':
            break;
        case 'sm-landing':
            import('../../components/views/sm-landing.js').then((_module) => {
                // Put code in here that you want to run every time when
                // navigating to view1 after sm-view1.js is loaded.
            });
            break;
        default:
            page = 'view404';
            import('../../components/views/sm-view404.js');
    }

    dispatch(updatePage(page));
};

const updatePage: ActionCreator<AppActionUpdatePage> = (page: string) => {
    return {
        type: UPDATE_PAGE,
        page
    };
};


export const updateOffline: ActionCreator<ThunkResult> = (offline: boolean) => (dispatch, getState) => {
    // Show the snackbar only if offline status changes.
    if (offline !== getState().app!.offline) {
        // dispatch(showSnackbar());
    }
    dispatch({
        type: UPDATE_OFFLINE,
        offline
    });
};

export const setActiveFile: ActionCreator<AppActionSetActiveFile> = (fileName) => {
    return {
        type: SET_ACTIVE_FILE,
        fileName
    };
};


export const toggleTenantsOverview: ActionCreator<AppActionToggleTenantsOverview> = () => {
    return {
        type: TOGGLE_TENANTS_OVERVIEW
    };
};

export const toggleTenantsListLegend: ActionCreator<AppActionToggleTenantsListLegend> = () => {
    return {
        type: TOGGLE_TENANTS_LIST_LEGEND,
    };
};

export const activeLegend: ActionCreator<ThunkResult> = (key: string) => (dispatch, getState) => {
    // if same key 
    if (getState().app.activeLegend === key) {
        key = '';
    }

    dispatch({
        type: UPDATE_ACTIVE_LEGEND,
        key,
    });
};
