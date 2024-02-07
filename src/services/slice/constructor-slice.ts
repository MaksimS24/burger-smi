import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    bun: {
        name: 'Выберете булку',
        price: 0,
        image_mobile: null,
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
        sortIngredients: (state , action)=> {
            state.mainAndSauce[action.payload.hoverIndex] = state.mainAndSauce[action.payload.dragIndex];
            state.mainAndSauce[action.payload.dragIndex] = state.mainAndSauce[action.payload.hoverIndex];
        }
    },
});

export const {addIngredients, sortIngredients} = constructorSlice.actions;
export default constructorSlice.reducer;