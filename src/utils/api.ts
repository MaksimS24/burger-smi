import {createAsyncThunk} from "@reduxjs/toolkit";
import {Order} from "./types/types-ingredients";

const api = 'https://norma.nomoreparties.space/api';

const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
}

export const fetchIngredients = createAsyncThunk(
    'slice/fetchIngredients',
    async () => {
        const response = await fetch(`${api}/ingredients`);
        await fetch(`${api}/ingredients`)
            .then((res) => checkResponse(res))
        const data = await response.json();

        return data;
    }
);

export const fetchOrders = createAsyncThunk(
    'slice/orderSlice',
    async () => {
        const res = await fetch(`${api}/orders`);
        await fetch(`${api}/orders/`)
            .then((res) => checkResponse(res))

        return res
    }
);
