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
export const feedOrdersWs = 'wss://norma.nomoreparties.space/orders/all';
export const wsProfile = () => {
    return `wss://norma.nomoreparties.space/orders?token=${getCookie('accessToken')?.slice(7)}`;
};

const checkResponse = <T>(res: Response): Promise<T> => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
}

export const fetchIngredients = async () => {
    const res = await fetch(`${api}/ingredients`);
    return await checkResponse<IApiIngredients>(res);;
};

export async function resRefresh(): Promise<IApiResRefresh> {
    const res = await fetch(`${api}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: getCookie('refreshToken'),
        }),
    });
    const data = await res.json();
    if (data.success) {
        setCookie('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data;
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
            (options.headers as { [key: string]: string }).authorization = dataRefresh.accessToken;
            const res = await fetch(url, options);
            return await checkResponse<T>(res);
        }
        return Promise.reject(err);
    }
}

export const fetchOrders = async (data: { ingredients: string[] }) => {
    const res = await fetchRefresh<IApiOrders>(`${api}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: getCookie('accessToken') as string,
        },
        body: JSON.stringify(data),
    });
    return res;
};

export const registerUser = async (data: IRegister) => {
    const res = await fetch(`${api}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return await checkResponse<ISignInUser>(res);
};

export const loginUser = async (data: ILoginUserInfo) => {
    const res = await fetch(`${api}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return await checkResponse<ISignInUser>(res);
};

export const logoutUser = async () => {
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
};

export const profileInfo = async () => {
    const res = await fetchRefresh<IForProfileEdit>(`${api}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: getCookie('accessToken') as string,
        },
    })
    return res;
};

export const requestForEditing = async (data: IEditProfile) => {
    const res = await fetchRefresh<IForProfileEdit>(`${api}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: getCookie('accessToken') as string,
        },
        body: JSON.stringify(data),
    })
    return res;
};

export const forgotPasswordEmail = async (email: string) => {
    const res = await fetch(`${api}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email}),
    });
    return await checkResponse<IApiForgotPassword>(res);
};

export const passwordSend = async (data: IApiSendPassword) => {
    const res = await fetch(`${api}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}),
    });
    return await checkResponse<IApiForgotPassword>(res);
};



