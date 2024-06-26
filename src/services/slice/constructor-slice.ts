import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {IIngredient} from "../../utils/types/types-ingredients";

interface IBunConstructor {
    _id: string,
    name: string,
    price: number,
    image_mobile: string,
}

interface IConstructor {
    ingredientsConstructor: [] | IIngredient,
    bun: IBunConstructor | IIngredient,
    mainAndSauce: IIngredient[],
    ingredientsAdd: boolean,
    plug: boolean
}

export const initialState: IConstructor = {
    ingredientsConstructor: [],
    bun: {
        name: 'Выберете булку',
        price: 0,
        image_mobile: '',
        _id: '',
    },
    mainAndSauce: [],
    ingredientsAdd: false,
    plug: true,
}

export const constructorSlice = createSlice({
    name: 'constructorIngredients',
    initialState,
    reducers: {
        addIngredients: {
            reducer(state, action: PayloadAction<IIngredient>) {
                if (action.payload.type === 'bun') {
                    state.bun = action.payload;
                    state.ingredientsAdd = true;
                } else {
                    state.mainAndSauce = [action.payload, ...state.mainAndSauce];
                }
                state.plug = false;
            },
            prepare: (payload: IIngredient) => ({payload: {...payload, _uuid: nanoid()}})
        },

        sortIngredients: (state, action: PayloadAction<{ dragIndex: number; dropIndex: number }>) => {
            const sort = state.mainAndSauce[action.payload.dropIndex];
            state.mainAndSauce[action.payload.dropIndex] = state.mainAndSauce[action.payload.dragIndex];
            state.mainAndSauce[action.payload.dragIndex] = sort;
        },

        deleteIngredients: (state, action: PayloadAction<string>) => {
            state.mainAndSauce = [...state.mainAndSauce].filter(({_uuid}) => _uuid !== action.payload);
            if(!state.mainAndSauce.length && !state.bun._id) state.plug = true;
        },

        resetIngredients: () => ({...initialState}),
    },
});

export const {addIngredients, sortIngredients, deleteIngredients, resetIngredients} = constructorSlice.actions;
export default constructorSlice.reducer;