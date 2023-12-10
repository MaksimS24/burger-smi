import {PayloadAction, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Ingredient} from "../../utils/types-ingredients";


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
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isModalOpen = true;
        },
        closeModal: (state, action) => {
            state.isModalOpen = false;
        }
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

export const { openModal, closeModal } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
