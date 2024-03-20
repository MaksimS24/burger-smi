import {createSlice} from '@reduxjs/toolkit';
import {fetchIngredients} from "../../utils/api";
import {Ingredient} from "../../utils/types/types-ingredients";

interface InterfaceIngredientsSlice {
    ingredients: Ingredient[],
    status: string,
    isIngredientsOpen: boolean,
    id: null,
    isLoading: boolean,
    isError: boolean,

}
export const initialState: InterfaceIngredientsSlice = {
    ingredients: [],
    status: 'idle',
    isIngredientsOpen: false,
    id: null,
    isLoading: false,
    isError: false,

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
                state.isLoading = true;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload.data;
            })
            .addCase(fetchIngredients.rejected, (state) => {
                state.isError = true;
            });
    },
});

export const {openModal, closeModal} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
