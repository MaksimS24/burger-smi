import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {Ingredient} from "../../utils/types/types-ingredients";

interface bunConstructor {
    _id: string,
    name: string,
    price: number,
    image_mobile: string,
}

interface constructor {
    ingredients: [],
    bun: bunConstructor | Ingredient,
    mainAndSauce: Ingredient[],
}

export const initialState: constructor = {
    ingredients: [],
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
        addIngredients: (state, action: PayloadAction<Ingredient>) => {
            if (action.payload.type === 'bun') {
                state.bun = action.payload
            } else {
                state.mainAndSauce.unshift(action.payload)
            }
        },

        sortIngredients: (state, action) => {
            state.mainAndSauce[action.payload.hoverIndex] = state.mainAndSauce[action.payload.dragIndex];
            state.mainAndSauce[action.payload.dragIndex] = state.mainAndSauce[action.payload.hoverIndex];
        },

        deleteIngredients: (state, action) => {
            state.mainAndSauce = [...state.mainAndSauce.filter(({_id}) => _id != action.payload)]
        },
    },

});

export const {addIngredients, sortIngredients, deleteIngredients} = constructorSlice.actions;
export default constructorSlice.reducer;