import {createAsyncThunk} from "@reduxjs/toolkit";
import {getCookie, setCookie} from "./cookie";
import {
    ApiForgotPassword,
    apiIngredients,
    ApiLogout,
    apiOrders,
    ApiSendPassword,
    EditProfile,
    ForProfileEdit, LoginUserInfo,
    Register,
    SignInUser
} from "./types/types-api";

const api = 'https://norma.nomoreparties.space/api';

const checkResponse = <T>(res: Response): Promise<T> => {
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
            .then((res) => checkResponse<apiIngredients>(res))
        const data = await response.json();

        return data;
    }
);

export async function fetchRefresh<T>(url: RequestInfo, options: RequestInit) {
    try {
        const res = await fetch(url, options);
        return await checkResponse<T>(res);
    } catch (err) {
        if ((err as Error).message === 'jwt expected' ||
            (err as Error).message === 'You should be authorised') {
            const resRefresh = await fetch(`${api}/auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: getCookie('refreshToken'),
                }),
            });
            const dataRefresh = await resRefresh.json();
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
        return await fetchRefresh<apiOrders>(`${api}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: getCookie('accessToken') as string,
            },
            body: JSON.stringify(data),
        }).then((data) => {
            if (data.success) return data;
            return Promise.reject<apiOrders>(data);
        });
    });

export const registerUser = createAsyncThunk(
    'auth/register',
    async (data: Register) => {
        const res = await fetch(`${api}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await checkResponse<SignInUser>(res);
    },
);

export const loginUser = createAsyncThunk(
    'user/login',
    async (data: LoginUserInfo) => {
        const res = await fetch(`${api}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await checkResponse<SignInUser>(res);
    },
);

export const logoutUser = createAsyncThunk(
    'user/logout',
    async () => {
        const res = await fetch(`${api}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: getCookie('refreshToken')
            }),
        });
        return await checkResponse<ApiLogout>(res);
    },
);

export const profileInfo = createAsyncThunk(
    'user/authentication',
    async () => {
        return await fetchRefresh<ForProfileEdit>(`${api}/auth/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: getCookie('accessToken') as string,
            },
        }).then((data) => {
            if (data.success) return data;
            return Promise.reject<ForProfileEdit>(data);
        });
    });

export const requestForEditing = createAsyncThunk(
    'user/auth',
    async (data: EditProfile) => {
        return await fetchRefresh<ForProfileEdit>(`${api}/auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: getCookie('accessToken') as string,
            },
            body: JSON.stringify(data),
        }).then((data) => {
            if (data.success) return data;
            return Promise.reject<ForProfileEdit>(data);
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
        return await checkResponse<ApiForgotPassword>(res);
    },
);

export const passwordSend = createAsyncThunk(
    'user/password-reset/reset',
    async (data: ApiSendPassword) => {
        const res = await fetch(`${api}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await checkResponse<ApiForgotPassword>(res);
    },
);



