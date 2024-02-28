import {createSlice} from "@reduxjs/toolkit";
import {fetchOrders} from "../../utils/api";

interface OrderInterface {
    isOrderOpen: boolean,
    dataOrder: {
        success: boolean,
        name: '',
        order: {
            number: number | null
        }
    }
    status: string,
    error: boolean,
}

export const initialState: OrderInterface = {
    isOrderOpen: false,
    dataOrder: {
        success: false,
        name: '',
        order: {
            number: null
        }
    },
    status: '',
    error: false,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        orderOpenModal: (state, action) => {
            state.isOrderOpen = true;
            state.error = action.payload;
        },
        orderCloseModal: (state) => {
            state.isOrderOpen = !state.isOrderOpen;
            state.dataOrder.order.number = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
                state.error = false;

            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.dataOrder = action.payload;
                state.isOrderOpen = true;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                // @ts-ignore
                state.error = action.payload;
            });
    }
})

export const {orderOpenModal, orderCloseModal} = orderSlice.actions;

export default orderSlice.reducer;


