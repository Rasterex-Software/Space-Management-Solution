import { Action, ActionCreator } from 'redux';

export const RECEIVE_TENANTS = 'RECEIVE_TENANTS';
export const RECEIVE_FLOOR_TENANTS = 'RECEIVE_FLOOR_TENANTS';
export const UPDATE_TENANT_COLOR = 'UPDATE_TENANT_COLOR';

export interface RxTenantActionReceiveTenants extends Action<'RECEIVE_TENANTS'> { data: any };
export interface RxTenantActionReceiveFloorTenants extends Action<'RECEIVE_FLOOR_TENANTS'> { data: any };
export interface RxTenantActionUpdateTenantColor extends Action<'UPDATE_TENANT_COLOR'> { tenantId: number, color: string };

export type RxTenantsAction = RxTenantActionReceiveTenants | RxTenantActionReceiveFloorTenants | RxTenantActionUpdateTenantColor;

export const receiveTenants: ActionCreator<RxTenantActionReceiveTenants> = (data: any) => {
    return {
        type: RECEIVE_TENANTS,
        data
    };
};

export const receiveFloorTenants: ActionCreator<RxTenantActionReceiveFloorTenants> = (data: any) => {
    return {
        type: RECEIVE_FLOOR_TENANTS,
        data
    };
};

export const updateTenantColor: ActionCreator<RxTenantActionUpdateTenantColor> = (tenantId: number, color: string) => {
    return {
        type: UPDATE_TENANT_COLOR,
        tenantId,
        color
    };
};