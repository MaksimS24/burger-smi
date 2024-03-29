import {createSlice} from "@reduxjs/toolkit";
import {fetchOrders} from "../../utils/api";

interface OrderInterface {
    isOrderOpen: boolean,
    dataOrder: {
        success: boolean,
        name: string,
        order: {
            number: number | null
        }
    }
    isLoading: boolean,
    isError: boolean,
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
    isLoading: false,
    isError: false,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        orderOpenModal: (state, action) => {
            state.isOrderOpen = true;
            state.isError = action.payload;
        },
        orderCloseModal: (state) => {
            state.isOrderOpen = !state.isOrderOpen;
            state.dataOrder.order.number = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading =true;
                state.isError = false;

            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.dataOrder = action.payload;
                state.isOrderOpen = true;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
    }
})

export const {orderOpenModal, orderCloseModal} = orderSlice.actions;

export default orderSlice.reducer;


