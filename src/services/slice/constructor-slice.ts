import {createSlice, nanoid} from "@reduxjs/toolkit";
import {Ingredient} from "../../utils/types/types-ingredients";

interface bunConstructor {
    name: string,
    price: number,
    image_mobile: string,
    _id: string
}

interface constructor {
    bun: bunConstructor | Ingredient,
    mainAndSauce: Ingredient[],
}

export const initialState: constructor = {
    bun: {
        name: 'Выберете булку',
        price: 0,
        image_mobile: '',
        _id: '',
    },
    mainAndSauce: [],
}

export const constructorSlice = createSlice({
    name: 'constructorIngredients',
    initialState,
    reducers: {
        addIngredients: (state, action) => {
                state.bun = action.payload
            },
        sortIngredients: (state, action) => {
            state.mainAndSauce[action.payload.hoverIndex] = state.mainAndSauce[action.payload.dragIndex];
            state.mainAndSauce[action.payload.dragIndex] = state.mainAndSauce[action.payload.hoverIndex];
        }
    },
});

export const {addIngredients, sortIngredients} = constructorSlice.actions;
export default constructorSlice.reducer;