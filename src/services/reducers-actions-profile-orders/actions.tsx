import {createAction} from "@reduxjs/toolkit";
import {IFeedWs} from "../../utils/types/websocket";

export const wsConnectProfileOrders = createAction<string>('PROFILE_ORDERS_CONNECT');
export const wsDisconnectProfileOrders = createAction('PROFILE_ORDERS_DISCONNECT');

export const wsConnecting = createAction('PROFILE_ORDERS_CONNECTING');
export const wsOpen = createAction('PROFILE_ORDERS_OPEN');
export const wsClose = createAction('PROFILE_ORDERS_CLOSE');
export const wsMessage = createAction<IFeedWs>('PROFILE_ORDERS_MESSAGE');
export const wsError = createAction<string>('PROFILE_ORDERS_ERROR');

export const profileOrdersActions = {
    wsConnect: wsConnectProfileOrders,
    wsDisconnect: wsDisconnectProfileOrders,
    wsConnecting,
    wsOpen,
    wsClose,
    wsMessage,
    wsError,
};