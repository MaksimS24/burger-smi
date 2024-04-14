import {createAction} from "@reduxjs/toolkit";
import {IFeedWs} from "../../utils/types/websocket";

export const wsConnectFeedOrders = createAction<string>('FEED_ORDERS_CONNECT');
export const wsDisconnectFeedOrders = createAction('FEED_ORDERS_DISCONNECT');

export const wsConnecting = createAction('FEED_ORDERS_CONNECTING');
export const wsOpen = createAction('FEED_ORDERS_OPEN');
export const wsClose = createAction('FEED_ORDERS_CLOSE');
export const wsMessage = createAction<IFeedWs>('FEED_ORDERS_MESSAGE');
export const wsError = createAction<string>('FEED_ORDERS_ERROR');

export const feedOrdersActions = {
    wsConnect: wsConnectFeedOrders,
    wsDisconnect: wsDisconnectFeedOrders,
    wsConnecting,
    wsOpen,
    wsClose,
    wsMessage,
    wsError,
};