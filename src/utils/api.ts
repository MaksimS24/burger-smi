import {createAsyncThunk} from "@reduxjs/toolkit";

const api = 'https://norma.nomoreparties.space/api';
export const fetchIngredients = createAsyncThunk(
    'slice/fetchIngredients',
    async () => {
        const response = await fetch(`${api}/ingredients`);
        await fetch(`${api}/ingredients`)
            .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error ${res.status}`);
        })
        const data = await response.json();

        return data;
    }

);

export const fetchOrders = createAsyncThunk(
    'slice/orderSlice',
    async () => {
        const res = await fetch(`${api}/orders`);
        await fetch(`${api}/orders`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error ${res.status}`);
            })
        return res
    }

);


