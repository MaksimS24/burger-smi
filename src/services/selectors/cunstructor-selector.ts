import { RootState } from '../store/store';

export const bunSelector = (state: RootState) => state.constructorIngredients.bun
export const mainAndSauceSelector = (state: RootState) => state.constructorIngredients.mainAndSauce
