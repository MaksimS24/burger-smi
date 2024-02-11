import {createSlice} from "@reduxjs/toolkit";


export const initialState = {
    isOrderOpen: false,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        orderOpenModal: (state) => {
            state.isOrderOpen = true;
        },
        orderCloseModal: (state) => {
            state.isOrderOpen = !state.isOrderOpen;
        },
    },
});

export const {orderOpenModal, orderCloseModal} = orderSlice.actions;

export default orderSlice.reducer;


