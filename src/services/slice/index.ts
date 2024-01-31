import {combineReducers} from "redux";
import ingredientsReducer from "./ingredients-slice";
import modalReducer from "./ingredients-slice";
import ingredientsTabReducer from "./ingredients-tab-slice";


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    modal: modalReducer,
    ingredientsTab: ingredientsTabReducer,
})