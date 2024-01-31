import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchIngredients} from "../../utils/api";
import {Ingredient} from "../../utils/types/types-ingredients";


interface stateIngredient {
    ingredients: Ingredient[],
    selectedTab: "bun" | "main" | "sauce",
    loading: false,
    error: false
}

const initialState = {
    ingredients: [],
    selectedTab: 'bun',
    loading: false,
    error: false
}

export const ingredientsTabSlice = createSlice({
    name: 'ingredientsTab',
    initialState,
    reducers: {
        setSelectedTab: (state, action: PayloadAction<stateIngredient["selectedTab"]>) => {
            state.selectedTab = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(fetchIngredients.pending, state => {
                state.loading = false;
                state.error = false;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.loading = false;
                state.ingredients = action.payload;
            })
            .addCase(fetchIngredients.rejected, (state) => {
                state.loading = false;
                state.error = false;
            })
})

export const {setSelectedTab} = ingredientsTabSlice.actions;
export default ingredientsTabSlice.reducer;