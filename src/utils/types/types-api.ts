import {IIngredient} from "./types-ingredients";

export interface IApiIngredients {
    success: boolean,
    data: IIngredient[];
}

export interface IApiOrders {
    success: boolean,
    name: string,
    order: {
        number: number | null
    }
}

export interface apiRequest {
    url: string,
    method: "POST" | "GET",
    body?: string,
    headers: {
        'Content-Type': string,
    }
}

export interface IUserInfo {
    name: string,
    email: string,
}

export interface IRegister extends IUserInfo{
    password: string,
}

export interface ISignInUser {
    user: IUserInfo,
    refreshToken: string,
    accessToken: string,
    success: boolean,
}

export interface ILoginUserInfo {
    email: string,
    password: string,
}
export interface IEditProfile extends IUserInfo{
    accessToken: string,
    password: string,
}
export interface IForProfileEdit {
    user: IUserInfo,
    success: boolean,
}

export interface IApiLogout {
    success: boolean,
    message: string,
}

export interface IApiForgotPassword {
    success: boolean,
    message: string,
}

export interface IApiSendPassword {
    password: string,
    token: string,
}

export interface IApiResRefresh {
    accessToken: string;
    refreshToken: string;
    success: boolean;
}
