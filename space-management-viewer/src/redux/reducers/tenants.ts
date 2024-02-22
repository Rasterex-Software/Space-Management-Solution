import { Reducer } from "redux";
import { RootAction, RootState } from "../store";
import { RECEIVE_TENANTS, UPDATE_TENANT_COLOR } from "../actions/tenants/sync";

export interface RxTenantsState {
    failure: boolean,
    isFetching: boolean,
    items: RxTenantState[];
}

export interface RxTenantState {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    label?: string;
    firstName?: string;
    lastName?: string;
    description?: string;
    phone?: string;
    email?: string;
    color?: string;
    highlighted?: boolean
};

const INITIAL_STATE: RxTenantsState = {
    failure: false,
    isFetching: false,
    items: []
}

const tenants: Reducer<RxTenantsState, RootAction> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RECEIVE_TENANTS:
            return {
              ...state,
              failure: false,
              isFetching: false,
              items: action.data
            };
        case UPDATE_TENANT_COLOR: 
            return {
                ...state,
                items: items(state.items, action)
            }
        default:
            return state;
    }
}

const items: Reducer<RxTenantState[], RootAction> = (state = [], action) => {
    let tenant:RxTenantState | undefined;
    let index: number;

    switch (action.type) {
        case UPDATE_TENANT_COLOR:
            // TODO: review
            tenant = state.find(tenant => tenant.id === action.tenantId);
            index = state.indexOf(tenant!);
            state[index] = item(tenant, action)
            return [
                ...state,
            ]
        default:
            return state;
    }
}

const item: Reducer<RxTenantState, RootAction> = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_TENANT_COLOR:
            return {
                ...state,
                color: action.color
            }
        default:
            return state;
    }
}

export default tenants;

export const tenantsSelector = (state: RootState) => state.tenants.items;