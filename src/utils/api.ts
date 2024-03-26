import {createAsyncThunk} from "@reduxjs/toolkit";
import {getCookie, setCookie} from "./cookie";
import {
    IApiForgotPassword,
    IApiLogout,
    IApiOrders,
    IApiResRefresh,
    IApiSendPassword,
    IEditProfile,
    IForProfileEdit, IApiIngredients, ILoginUserInfo,
    IRegister,
    ISignInUser
} from "./types/types-api";

const api = 'https://norma.nomoreparties.space/api';

const checkResponse = <T>(res: Response): Promise<T> => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
}

export const fetchIngredients = createAsyncThunk<IApiIngredients>(
    'slice/fetchIngredients',
    async () => {
        const res = await fetch(`${api}/ingredients`);
        await fetch(`${api}/ingredients`)
            .then((res) => checkResponse<IApiIngredients>(res))
        const data = await res.json();

        return data;
    }
);

async function resRefresh(): Promise<IApiResRefresh> {
    const res = await fetch(`${api}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: getCookie('refreshToken'),
        }),
    });
    return await res.json();
}

export async function fetchRefresh<T>(url: RequestInfo, options: RequestInit) {
    try {
        const res = await fetch(url, options);
        return await checkResponse<T>(res);
    } catch (err) {
        if ((err as Error).message === 'jwt expected' ||
            (err as Error).message === 'You should be authorised') {

            const dataRefresh = await resRefresh();
            if (!dataRefresh.success) return Promise.reject(dataRefresh);
            setCookie('accessToken', dataRefresh.accessToken);
            setCookie('refreshToken', dataRefresh.refreshToken);
            (options.headers as { [key: string]: string }).authorization = dataRefresh.accessToken;
            const res = await fetch(url, options);
            return await checkResponse<T>(res);
        }
        return Promise.reject(err);
    }
}

export const fetchOrders = createAsyncThunk(
    'slice/orderSlice/order',
    async (data: { ingredients: string[] }) => {
        return await fetchRefresh<IApiOrders>(`${api}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: getCookie('accessToken') as string,
            },
            body: JSON.stringify(data),
        }).then((data) => {
            if (data.success) return data;
            return Promise.reject<IApiOrders>(data);
        });
    });

export const registerUser = createAsyncThunk(
    'auth/register',
    async (data: IRegister) => {
        const res = await fetch(`${api}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await checkResponse<ISignInUser>(res);
    },
);

export const loginUser = createAsyncThunk<ISignInUser, ILoginUserInfo>(
    'user/login',
    async (data: ILoginUserInfo) => {
        const res = await fetch(`${api}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await checkResponse<ISignInUser>(res);
    },
);

export const logoutUser = createAsyncThunk<IApiLogout>(
    'auth/logout',
    async () => {
        const res = await fetch(`${api}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken'),
            }),
        });
        return await checkResponse<IApiLogout>(res);
    },
);

export const profileInfo = createAsyncThunk<IForProfileEdit>(
    'user/authentication',
    async () => {
        return await fetchRefresh<IForProfileEdit>(`${api}/auth/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: getCookie('accessToken') as string,
            },
        }).then((data) => {
            if (data.success) return data;
            return Promise.reject<IForProfileEdit>(data);
        });
    });

export const requestForEditing = createAsyncThunk<IForProfileEdit, IEditProfile>(
    'user/auth',
    async (data: IEditProfile) => {
        return await fetchRefresh<IForProfileEdit>(`${api}/auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: getCookie('accessToken') as string,
            },
            body: JSON.stringify(data),
        }).then((data) => {
            if (data.success) return data;
            return Promise.reject<IForProfileEdit>(data);
        });
    },
);

export const forgotPasswordEmail = createAsyncThunk(
    'user/password-reset',
    async (email: string) => {
        const res = await fetch(`${api}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email}),
        });
        return await checkResponse<IApiForgotPassword>(res);
    },
);

export const passwordSend = createAsyncThunk(
    'user/password-reset/reset',
    async (data: IApiSendPassword) => {
        const res = await fetch(`${api}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data}),
        });
        return await checkResponse<IApiForgotPassword>(res);
    },
);



