import {createReducer} from "@reduxjs/toolkit";
import {IFeedWs, TypeWsStatus} from "../../utils/types/websocket";
import {wsClose, wsConnecting, wsError, wsMessage, wsOpen} from "./actions";

export interface IFeedOrders {
    data: IFeedWs | null,
    status: TypeWsStatus,
    error: string,
}
const initialState: IFeedOrders = {
    data: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
    },
    status: TypeWsStatus.OFFLINE,
    error: '',
};

const feedOrdersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnecting, (state) => {
            state.status = TypeWsStatus.CONNECTING;
        })
        .addCase(wsOpen, (state) => {
            state.status = TypeWsStatus.ONLINE;
            state.error = '';
        })
        .addCase(wsClose, (state) => {
            state.status = TypeWsStatus.OFFLINE;
            state.data = null;
        })
        .addCase(wsMessage, (state, action) => {
            state.data = action.payload;
        })
        .addCase(wsError, (state) => {
            state.error = '';
        })
})

export default feedOrdersReducer;