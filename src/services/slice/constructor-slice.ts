import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    mainAndSauce: [],
}

export const constructorSlice = createSlice({
    name: 'constructorIngredients',
    initialState,
    reducers: {
        sortIngredients: (state , action)=> {
            state.mainAndSauce[action.payload.hoverIndex] = state.mainAndSauce[action.payload.dragIndex];
            state.mainAndSauce[action.payload.dragIndex] = state.mainAndSauce[action.payload.hoverIndex];
        }
    },
});

export const {sortIngredients} = constructorSlice.actions;
export default constructorSlice.reducer;