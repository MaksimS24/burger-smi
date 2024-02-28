import {Ingredient} from "./types-ingredients";

export interface apiIngredients {
    success: boolean,
    data: Ingredient[];
}

export interface apiRequest {
    url: string,
    method: "POST" | "GET",
    body?: string,
    headers: {
        'Content-Type': string,
    }
}