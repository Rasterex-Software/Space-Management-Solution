import { Action, ActionCreator } from 'redux';
// import { ThunkAction } from 'redux-thunk';
// import { RootState } from '../store.js';
import { LegendOption } from '../../components/legend-designer/legend-designer-type.js';

export const CREATE_LEGEND = 'CREATE_LEGEND';
export const REMOVE_LEGEND = 'REMOVE_LEGEND';

export interface LegendsActionCreateLegend extends Action<'CREATE_LEGEND'> { name: string, legendType: string, options: LegendOption[] };
export interface LegendsActionRemoveLegend extends Action<'REMOVE_LEGEND'> { name: string };

export type RxLegendsAction = LegendsActionCreateLegend | LegendsActionRemoveLegend;

// type ThunkResult = ThunkAction<void, RootState, undefined, LegendsAction>;

export const createLegend: ActionCreator<LegendsActionCreateLegend> = (name: string, legendType: string, options: LegendOption[]) => {
    return {
        type: CREATE_LEGEND,
        name,
        legendType,
        options
    };
};

export const removeLegend: ActionCreator<LegendsActionRemoveLegend> = (name: string) => {
    return {
        type: REMOVE_LEGEND,
        name
    };
};