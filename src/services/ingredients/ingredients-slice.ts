import {PayloadAction, createSlice, createAsyncThunk} from '@reduxjs/toolkit';


export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async () => {
        const response = await fetch('https://norma.nomoreparties.space/api/ingredients');
        const data = await response.json();
        return data;
    }
);

const initialState = {
    ingredients: [],
    status: 'idle',
    isModalOpen: false
};

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        // setIngredients: (state, { payload }: PayloadAction<Ingredient[]>) => {
        //     if (payload) {
        //         console.log('payload', payload)
        //         state = payload;
        //     }
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ingredients = action.payload;
            })
            // .addCase(fetchIngredients.rejected, (state, action) => {
            //     state.status = 'failed';
            //     state.error = action.error.message;
            // });
    },
});

// export const { setIngredients } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
