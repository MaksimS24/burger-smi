import {createSlice} from '@reduxjs/toolkit';
import {fetchIngredients} from "../../utils/api";
import {Ingredient} from "../../utils/types/types-ingredients";

interface InterfaceIngredientsSlice {
    ingredients: Ingredient[],
    status: string,
    isIngredientsOpen: boolean,
    id: null
}
export const initialState: InterfaceIngredientsSlice = {
    ingredients: [],
    status: 'idle',
    isIngredientsOpen: false,
    id: null,
};


export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isIngredientsOpen = true;
        },
        closeModal: (state) => {
            state.isIngredientsOpen = !state.isIngredientsOpen;
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

export const {openModal, closeModal} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
