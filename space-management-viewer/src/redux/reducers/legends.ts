import { Reducer } from 'redux';
import {
    CREATE_LEGEND,
    REMOVE_LEGEND,
} from '../actions/legends';
import { RootAction, RootState } from '../store.js';
import { LegendOption } from '../../components/legend-designer/legend-designer-type';
import { createSelector } from 'reselect';
import { activeLegendKeySelector } from './app';

export interface RxLegendsState {
    [key: string]: RxLegendState
}

export interface RxLegendState {
    name?: string;
    type?: string;
    options?: LegendOption[];
}

const INITIAL_STATE: RxLegendsState = {
    Floor_Area_Types: {
        name: "Floor Area Types",
        type: "Area Attribute",
        options: [{value: "type", label: "Type"}]
    } 
};


const legends: Reducer<RxLegendsState, RootAction> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_LEGEND:
            const key = action.name.replace(/ /g,"_");
            
            return {
                ...state,
                [key]: legend(state[key], action)
            }
        case REMOVE_LEGEND:
            delete state[action.name]; 
            
            return {
                ...state
            }
        default:
            return state;
    }
}

const legend: Reducer<RxLegendState, RootAction> = (state = {}, action) => {
    switch (action.type) {
        case CREATE_LEGEND:
            return {
                ...state,
                name: action.name,
                type: action.legendType,
                options: action.options
            }
        default:
            return state;
    }
}

export default legends;

export const legendsSelector = (state: RootState) => state.legends;

export const activeLegendSelector = createSelector(
    activeLegendKeySelector,
    legendsSelector,
    (key, legends) => key 
        ? legends.hasOwnProperty(key) ? legends[key] : null
        : null
)