import constructorReducer, {
    initialState,
    addIngredients,
    sortIngredients,
    resetIngredients,
    deleteIngredients
} from "./constructor-slice";
import {testBunMainAndSaucesConstructor, testMainAndSaucesConstructor} from "../test-utils/for-constructor-slice";


describe('Constructor slice', () => {
    it('Should return the initial state', () => {
        const result = constructorReducer(undefined, {type: ''});
        expect(result).toEqual(initialState);
    })

    it('Добавление bun в состояние тип bun и заменa plug на false', () => {
        const result = constructorReducer(initialState, addIngredients(testBunMainAndSaucesConstructor[0]));
        expect(result.bun).toHaveProperty('_id');
        expect(result.bun.type).toBe('bun');
        expect(result.ingredientsAdd).toBe(true);
        expect(result.plug).toBe(false);
    })

    it('Добавление main и sauce в конструктор', () => {
        const result = constructorReducer(initialState, addIngredients(testBunMainAndSaucesConstructor[1]));
        expect(result.mainAndSauce[0]).toHaveProperty('_id');
        expect(result.mainAndSauce).toHaveLength(1);
        expect(result.plug).toBe(false);
    })

    it('Сортировка ингредиентов в конструкторе', () => {
        const expectedState = {...initialState, mainAndSauce: [testMainAndSaucesConstructor[1], testMainAndSaucesConstructor[0]]};
        const action = {type: sortIngredients.type, payload: {dragIndex: 1, dropIndex: 0}};
        const result = constructorReducer({...initialState, mainAndSauce: testMainAndSaucesConstructor}, action);
        expect(result).toEqual(expectedState);
    })

    it('Удаление ингредиента', () => {
        const expectedState = {...initialState, mainAndSauce: testMainAndSaucesConstructor.filter((item => item._uuid !== "643d69a5c3f7b9001cfa0941"))};
        const action = {type: deleteIngredients.type, payload: "643d69a5c3f7b9001cfa0941"};
        const result = constructorReducer({...initialState, mainAndSauce: testMainAndSaucesConstructor}, action);
        expect(result).toEqual(expectedState);
        expect(result.mainAndSauce).toHaveLength(2);
    })

    it('Начальное состоняие конструктора', () => {
        const expectedState = initialState;
        const action = {type: resetIngredients.type};
        const result = constructorReducer(initialState, action);
        expect(result).toEqual(expectedState);
    })
})