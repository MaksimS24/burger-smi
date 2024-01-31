import {createAsyncThunk} from "@reduxjs/toolkit";


const apiIngredients = 'https://norma.nomoreparties.space/api/ingredients';
export const fetchIngredients = createAsyncThunk(
    'slice/fetchIngredients',
    async () => {
        const response = await fetch(apiIngredients);
        const data = await response.json();
        return data;
    }
);

