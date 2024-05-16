import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
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
    isError: boolean | undefined | string,
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

export const orderFetch = createAsyncThunk(
    'slice/orderSlice/order',
    fetchOrders,
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        orderCloseModal: (state) => {
            state.isOrderOpen = false;
            state.dataOrder.order.number = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(orderFetch.pending, (state) => {
                state.isLoading = true;
                state.isError = false;

            })
            .addCase(orderFetch.fulfilled, (state, action) => {
                state.dataOrder = action.payload;
                state.isOrderOpen = true;
                state.isLoading = false;
            })
            .addCase(orderFetch.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
            })
            .addDefaultCase(() => {})
    }
})

export const {orderCloseModal} = orderSlice.actions;

export default orderSlice.reducer;


