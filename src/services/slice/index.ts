import {combineReducers} from "redux";
import ingredientsReducer from "./ingredients-slice";
import modalReducer from "./ingredients-slice";
import {constructorSlice} from "./constructor-slice";


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    modal: modalReducer,
})