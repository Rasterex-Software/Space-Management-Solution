/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

declare global {
    interface Window {
        process?: Object;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

import {
    createStore,
    compose,
    applyMiddleware,
    combineReducers,
    Reducer,
    StoreEnhancer
} from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';

import { AppAction } from './actions/app.js';
import { RxCoreAction } from './actions/rxcore/index'

import app, { AppState } from './reducers/app.js';
import rxcore, { RxCoreState } from './reducers/rxcore.js';
import { 
    // loadState, 
    saveState } from './localStorage.js';
import tenants, { RxTenantsState } from './reducers/tenants.js';
import { RxTenantsAction } from './actions/tenants/sync.js';
import files, { RxFilesState } from './reducers/files.js';
import { RxFilesAction } from './actions/files/sync.js';
import { RxLegendsAction } from './actions/legends.js';
import legends, { RxLegendsState } from './reducers/legends.js';


// Overall state extends static states and partials lazy states.
export interface RootState {
    app: AppState;
    rxcore: RxCoreState;
    tenants: RxTenantsState;
    files: RxFilesState;
    legends: RxLegendsState;
}

export type RootAction = AppAction | RxCoreAction | RxTenantsAction | RxFilesAction | RxLegendsAction;

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose: <Ext0, Ext1, StateExt0, StateExt1>(
    f1: StoreEnhancer<Ext0, StateExt0>, f2: StoreEnhancer<Ext1, StateExt1>
) => StoreEnhancer<Ext0 & Ext1, StateExt0 & StateExt1> =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Initializes the Redux store with a lazyReducerEnhancer (so that you can
// lazily add reducers after the store has been created) and redux-thunk (so
// that you can dispatch async actions). See the "Redux and state management"
// section of the wiki for more details:
// https://github.com/Polymer/pwa-starter-kit/wiki/4.-Redux-and-state-management
export const store = createStore(
    state => state as Reducer<RootState, RootAction>,
    // loadState(), // If there is local storage data, load it.
    devCompose(
        lazyReducerEnhancer(combineReducers),
        applyMiddleware(thunk as ThunkMiddleware<RootState, RootAction>))
);

// Initially loaded reducers.
store.addReducers({
    app,
    rxcore,
    tenants,
    files,
    legends
});

// This subscriber writes to local storage anytime the state updates.
store.subscribe(() => {
    saveState(store.getState());
});