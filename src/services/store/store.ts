import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ingredientsReducer from '../slice/ingredients-slice';
import constructorIngredients from '../slice/constructor-slice';
import ingredients from '../slice/ingredients-slice';
import modal from '../slice/ingredients-slice';
import order from '../slice/order-slice';
import profile from '../slice/profile-slice';
import {socketMiddleware} from "../middleware/socket-middleware";
import {feedOrdersActions} from "../reducers-actions-feed-orders/actions";
import feedOrdersReducer from '../reducers-actions-feed-orders/reducers';
import {profileOrdersActions} from "../reducers-actions-profile-orders/actions";
import profileOrdersReducer from "../reducers-actions-profile-orders/reducers";

const ingredientsPersistConfig = {
    key: 'ingredients',
    storage,
};

const feedOrdersMiddleware = socketMiddleware(feedOrdersActions);
const profileOrdersMiddleware = socketMiddleware(profileOrdersActions);

const persistedIngredientsReducer = persistReducer(ingredientsPersistConfig, ingredientsReducer);

export const store = configureStore({
    reducer: {ingredients, modal, constructorIngredients, order, profile, feedOrders: feedOrdersReducer, profileOrders: profileOrdersReducer},
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(feedOrdersMiddleware, profileOrdersMiddleware),

});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
