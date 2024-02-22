
// TODO avoid using this
// declare var axiosInstance: any;
// import axios from 'axios';

import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store';

import * as RxHelpers from '../../../rx-helpers/index';
import RxEvents from 'rx-events';

import * as sync from './sync';
import { setActiveFile, AppAction } from '../app';
import { receiveFile } from '../files/sync';

type ThunkResult = ThunkAction<void, RootState, undefined, sync.RxCoreAction | AppAction>;

// ASYNC ACTIONS CREATOR
export const initRxCore: ActionCreator<ThunkResult> = (layout) => (dispatch) => {
    // init rxcore
    RxHelpers.init(layout);
    // this will dispatch actions from GUI callbacks
    initGuiCallbacks(dispatch);
    RxHelpers.restrictPan(false);
    dispatch(sync.initializeRxCore());
};

export const selectArea: ActionCreator<ThunkResult> = (blockId: string) => () => {
    // this will dispatch actions from GUI_2DBlockID callback
    // RxHelpers.selectVectorBlock(blockId);
    RxHelpers.selectRxSpace(blockId, false);
};

export const doResize: ActionCreator<ThunkResult> = (offsetWidth: number, offsetHeight: number) => () => {
    // this will dispatch actions from GUI_Resize
    RxHelpers.resize(offsetWidth, offsetHeight)
};

const initGuiCallbacks = (dispatch: any) => {
    // File load complete callback
    RxEvents.subscribe('file-load-complete', () => {
        setTimeout(() => {
            RxHelpers.zoomFit();
            RxHelpers.hideMarkupLabels();

            const fileName = RxHelpers.getFileInfo().FileName;
            const fileIndex = RxHelpers.getFileIndexByName(fileName);

            dispatch(receiveFile(fileName, {name: fileName, index: fileIndex}));
            // TODO: review, maybe this is not ok but active file should be set after floor is selected/fetched
            dispatch(setActiveFile(fileName));
            // TODO: review
            // dispatch(fetchFloorTenants(fileName));
        // TODO: review, for the moment timeout value was removed because there is no reference to vector blocks anymore
        // but setTimeout is still needed because of zoomFit
        });
    });

    // Select area block id callback
    RxEvents.subscribe('2d-block-id',
        (blockdata: any) => {
            // vector block areas
            if (Array.isArray(blockdata)) {
                dispatch(sync.activeArea(blockdata[0]))
            // spacer areas
            } else {
                // TODO: find a way to unselect spacer areas, maybe changes in rxcorefunctions
                if (blockdata.hasOwnProperty('attr')) {
                    const blockId = blockdata.attr.find((element: any) => element.name === 'SpaceID').value;
                    dispatch(sync.activeArea(blockId))
                } else if (blockdata.hasOwnProperty('isempty')) {
                    dispatch(sync.activeArea(''))
                }
            }
        }
    )

    RxEvents.subscribe('canvas-resize',
        (size: object) => dispatch(sync.resizeCanvas(size))
    )
}

export const closeAllFiles: ActionCreator<ThunkResult> = () => (dispatch) => {
    RxHelpers.closeAll();
    dispatch(sync.closeAllFilesAndUpdateState());
};

export const updateSmMode: ActionCreator<ThunkResult> = (newMode:string) => (dispatch, getState) => {
    // Clear previous mode
    const selectedArea = getState().rxcore.selectedArea;
    const previousMode = getState().rxcore.smMode;
    RxHelpers.restoreDefault();
    RxHelpers.resetAreasState();

    if (selectedArea !== '') {
        if (previousMode === 'prepare') {
            RxHelpers.unSelectMarkupbyGUID(selectedArea);
            dispatch(sync.activeArea(''));
        } else {
            RxHelpers.selectRxSpace(selectedArea);
        }
    }

    // RxHelpers.resetAreasState();
    dispatch(sync.updateSmModeInStore(newMode));
};

export const toggleLabels: ActionCreator<ThunkResult> = () => (dispatch, getState) => {
    const onOff = !getState().rxcore.hideLabels;
    RxHelpers.hideLabels(onOff);

    dispatch(sync.hideLabels(onOff));
}