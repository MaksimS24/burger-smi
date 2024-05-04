import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchIngredients} from "../../utils/api";
import {IIngredient} from "../../utils/types/types-ingredients";
import {IApiIngredients} from "../../utils/types/types-api";

interface IInterfaceIngredientsSlice {
    ingredients: IIngredient[],
    isLoading: boolean,
    isError: boolean | undefined | string,

}

export const initialState: IInterfaceIngredientsSlice = {
    ingredients: [],
    isLoading: false,
    isError: false,

};

export const ingredientsFetch = createAsyncThunk<IApiIngredients, void, {rejectValue: string}>(
    'slice/fetchIngredients',
    async (_, {rejectWithValue}) => {
        try {
            return await fetchIngredients();
        } catch (err) {
            return rejectWithValue('Error')
        }
    }
);


export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ingredientsFetch.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(ingredientsFetch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.ingredients = action.payload.data;
            })
            .addCase(ingredientsFetch.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.error.message;
            });
    },
});


export default ingredientsSlice.reducer;
