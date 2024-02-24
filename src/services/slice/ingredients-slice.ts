import {createSlice} from '@reduxjs/toolkit';
import {fetchIngredients} from "../../utils/api";

export const initialState = {
    ingredients: [],
    status: 'idle',
    isIngredientsOpen: false,
    id: null,
};

export const ingredientsSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isIngredientsOpen = true;
        },
        closeModal: (state) => {
            state.isIngredientsOpen = !state.isIngredientsOpen;
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
