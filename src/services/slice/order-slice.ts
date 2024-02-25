import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchOrders} from "../../utils/api";

interface dataOrder {
    progress: boolean,
    orderNumber: number | null
}
interface OrderInterface {
    dataOrder: dataOrder,
    isOrderOpen: boolean,
    status: string
}

export const initialState: OrderInterface = {
    isOrderOpen: false,
    dataOrder: {
        progress: false,
        orderNumber: null
    },
    status: '',
}

export const pushOrder = createAsyncThunk(
    'orders/pushOrder',
        fetchOrders
)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        orderOpenModal: (state) => {
            state.isOrderOpen = true;
        },
        orderCloseModal: (state) => {
            state.isOrderOpen = !state.isOrderOpen;
            state.dataOrder.orderNumber = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(pushOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(pushOrder.fulfilled, (state, action) => {
                // @ts-ignore
                state.dataOrder = action.payload;
                state.isOrderOpen = true;
            })
            .addCase(pushOrder.rejected, (state) => {
                state.status = 'failed';
            });
    }
})

export const {orderOpenModal, orderCloseModal} = orderSlice.actions;

export default orderSlice.reducer;


