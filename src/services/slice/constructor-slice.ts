import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {Ingredient} from "../../utils/types/types-ingredients";

interface bunConstructor {
    _id: string,
    name: string,
    price: number,
    image_mobile: string,
}

interface constructor {
    ingredientsConstructor: [] | Ingredient[],
    bun: bunConstructor | Ingredient[],
    mainAndSauce: Ingredient[],
    ingredientsAdd: boolean,
}

export const initialState: constructor = {
    ingredientsConstructor: [],
    bun: {
        name: 'Выберете булку',
        price: 0,
        image_mobile: '',
        _id: '',
    },
    mainAndSauce: [],
    ingredientsAdd: false,
}

export const constructorSlice = createSlice({
    name: 'constructorIngredients',
    initialState,
    reducers: {
        addIngredients: (state, action: PayloadAction<Ingredient>) => {
            if (action.payload.type === 'bun' || action.payload._id === 'id') {
                state.bun = {...action.payload};
                state.ingredientsAdd = true
            } else {
                state.mainAndSauce.unshift(action.payload);
            }
        },

        sortIngredients: (state, action: PayloadAction<{ dragIndex: number; dropIndex: number }>) => {
            const sort = state.mainAndSauce[action.payload.dropIndex]
            state.mainAndSauce[action.payload.dropIndex] = state.mainAndSauce[action.payload.dragIndex];
            state.mainAndSauce[action.payload.dragIndex] = sort;
        },

        deleteIngredients: (state, action) => {
            state.mainAndSauce = [...state.mainAndSauce].filter(({_id}) => _id !== action.payload)
        },
    },
});

export const {addIngredients, sortIngredients, deleteIngredients} = constructorSlice.actions;
export default constructorSlice.reducer;