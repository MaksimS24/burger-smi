import {Ingredient} from "./types-ingredients";

export interface apiIngredients {
    success: boolean,
    data: Ingredient[];
}

export interface apiOrders {
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

interface UserInfo {
    name: string,
    email: string,
}

export interface Register extends UserInfo{
    password: string,
}

export interface SignInUser {
    user: UserInfo,
    refreshToken: string,
    accessToken: string,
    success: boolean
}

export interface LoginUserInfo {
    email: string,
    password: string,
}
export interface EditProfile extends UserInfo{
    accessToken: string,
    password: string,
}
export interface ForProfileEdit {
    user: UserInfo,
    success: boolean,
}

export interface ApiLogout {
    success: string,
    message: string,
}

export interface ApiForgotPassword {
    success: string,
    message: string,
}

export interface ApiSendPassword {
    password: string,
    token?: string,
}

