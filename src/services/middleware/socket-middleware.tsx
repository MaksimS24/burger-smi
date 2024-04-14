import {ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware, MiddlewareAPI} from "@reduxjs/toolkit";
import {IFeedWs} from "../../utils/types/websocket";
import {AppDispatch, RootState} from "../store/store";
import {resRefresh, wsProfile} from "../../utils/api";

interface IActionsWs {
    wsConnecting: ActionCreatorWithoutPayload,
    wsConnect: ActionCreatorWithPayload<string>,
    wsDisconnect: ActionCreatorWithoutPayload,
    wsOpen: ActionCreatorWithoutPayload,
    wsClose: ActionCreatorWithoutPayload,
    wsMessage: ActionCreatorWithPayload<IFeedWs>,
    wsError: ActionCreatorWithPayload<string>,
}

export const socketMiddleware = (actionsWs: IActionsWs): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let isConnected = false;
        let reconnectTimer = 0;
        let url = '';

        return (next) => (action) => {
            const {dispatch} = store;
            const {wsConnecting, wsConnect, wsDisconnect, wsOpen, wsClose, wsMessage, wsError} = actionsWs;

            if (wsConnect.match(action)) {
                url = action.payload;
                isConnected = true;
                dispatch(wsConnecting());
                socket = new WebSocket(url);
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(wsOpen());
                };

                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.success) {
                        dispatch(wsMessage(JSON.parse(event.data)));
                    } else {
                        if (data.message === 'Invalid or missing token') {
                            resRefresh().then(() => {
                                dispatch(wsConnect(wsProfile()));
                            });
                        }
                    }
                };

                socket.onclose = (event) => {
                    if (event.code !== 1000) {
                        dispatch(wsError(event.code.toString()));
                    }
                    dispatch(wsClose());

                    if (isConnected) {
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(wsConnect(url));
                        }, 3000);
                    }
                };

                if (wsDisconnect.match(action)) {
                    clearTimeout(reconnectTimer);
                    isConnected = false;
                    reconnectTimer = 0;
                    socket.close(1000, 'Close');
                    dispatch(wsClose());
                }
            }

            next(action);
        };
    };
};