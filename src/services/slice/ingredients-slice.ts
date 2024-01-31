import {createSlice} from '@reduxjs/toolkit';
import {fetchIngredients} from "../../utils/api";


export const initialState = {
    ingredients: [],
    status: 'idle',
    isOpen: false,
    id: null,
};

export const ingredientsSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = !state.isOpen;
        },
        setId: (state, action) => {
                state.id = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload;
            })
            .addCase(fetchIngredients.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const {openModal, closeModal, setId} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
