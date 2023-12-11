import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ingredientsReducer from '../ingredients/ingredients-slice';
import modalReducer from '../ingredients/ingredients-slice';

const ingredientsPersistConfig = {
    key: 'ingredients',
    storage,
};

const persistedIngredientsReducer = persistReducer(ingredientsPersistConfig, ingredientsReducer);

export const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        modal: modalReducer,
    }
    // devTools: process.env.NODE_ENV !== 'production',
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: false,
    //     }),

    
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
