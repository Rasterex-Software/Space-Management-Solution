import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store";
import { RxFilesAction, receiveFiles, requestFile } from "./sync";
import * as RxHelpers from '../../../rx-helpers/index';
import { setActiveFile, AppAction } from "../app";
import { DEMO_FILES_LIST } from "./demo_data";

type ThunkResult = ThunkAction<void, RootState, undefined, RxFilesAction | AppAction>;


export const getAllFiles: ActionCreator<ThunkResult> = () => (dispatch) => {
    // Here you would normally get the data from the server. We're simulating
    // that by dispatching an async action (that you would dispatch when you
    // successfully got the data back).

    dispatch(receiveFiles(DEMO_FILES_LIST));
};

export const selectFile: ActionCreator<ThunkResult> = (fileName: string) => (dispatch, getState) => {
    const file = getState().files.items![fileName];

    if (file && file.isFetching === false) {  // TODO review. Currently reverted
        // set active file
        RxHelpers.setActiveFile(file.index!)
        // TODO: review, maybe this is not ok but active file should be set after floor is selected/fetched
        dispatch(setActiveFile(fileName));
        return;
    }

    dispatch(fetchFile(fileName));
}

export const fetchFile: ActionCreator<ThunkResult> = (fileName: string) => (dispatch) => {
    dispatch(requestFile(fileName));

    // this will dispatch actions from GUI_FileLoadComplete callback
    RxHelpers.openFile(fileName);
};