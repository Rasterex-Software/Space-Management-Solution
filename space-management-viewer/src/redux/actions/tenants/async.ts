import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store";
import { RxTenantsAction, receiveTenants } from "./sync";
import { DEMO_TENANTS_LIST } from './demo_data'

type ThunkResult = ThunkAction<void, RootState, undefined, RxTenantsAction>;


    
export const getAllTenants: ActionCreator<ThunkResult> = () => (dispatch) => {
    // Here you would normally get the data from the server. We're simulating
    // that by dispatching an async action (that you would dispatch when you
    // succesfully got the data back).

    dispatch(receiveTenants(DEMO_TENANTS_LIST));
};

// export const getFileTenants: ActionCreator<ThunkResult> = (fileId) => (dispatch, getState) => {
    // Here you would normally get the data from the server. We're simulating
    // that by dispatching an async action (that you would dispatch when you
    // succesfully got the data back).

    // dispatch(updateFloorTenants());
// };