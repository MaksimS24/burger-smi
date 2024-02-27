import {createAsyncThunk} from "@reduxjs/toolkit";

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
    'slice/orderSlice/order',
    async (data) => {
        const res = await fetch(`${api}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await checkResponse(res)
    }
);
