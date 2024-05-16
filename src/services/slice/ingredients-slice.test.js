import ingredientsReducer, {ingredientsFetch, initialState} from "./ingredients-slice";
import {isBaseIngredients} from "../test-utils/for-ingredients-slice";

describe('Ingredients-slice', () => {

    it('returns the initial state', () => {
        const result = ingredientsReducer(undefined, {type: ''});
        expect(result).toEqual(initialState)
    });

    //Extra reducers
    it('Check extraReducer pending', () => {
        const result = ingredientsReducer({...initialState, isError: true}, ingredientsFetch.pending());
        expect(result.isLoading).toBe(true);
        expect(result.isError).toEqual(false);
    });

    it('Check extraReducer fulfilled', () => {
        const result = ingredientsReducer({
            ...initialState,
            isLoading: true
        }, ingredientsFetch.fulfilled({data: [{isBaseIngredients}]}));
        expect(result.isLoading).toBe(false);
        expect(result.ingredients).toEqual([{isBaseIngredients}]);
    });

    it('Check extraReducer rejected', () => {
        const result = ingredientsReducer({...initialState, isLoading: true}, ingredientsFetch.rejected('Error'));
        expect(result.isLoading).toBe(false);
        expect(result.isError).toBe('Error');
    })

    //AsyncThunk

    global.fetch = jest.fn();

    describe('Get is ingredients in server', () => {
        it('Successful request', async () => {
            const mockRes = {data: [{isBaseIngredients}], success: true};
            fetch.mockResolvedValue({ok: true, json: () => Promise.resolve(mockRes)});
            const dispatchSpy = jest.fn();
            const thunkSpy = ingredientsFetch();

            await thunkSpy(dispatchSpy);

            const {calls} = dispatchSpy.mock;
            expect(calls).toHaveLength(2);

            const [first, last] = calls;
            expect(first[0].type).toBe(ingredientsFetch.pending().type);
            expect(last[0].type).toBe(ingredientsFetch.fulfilled().type);
            expect(last[0].payload).toBe(mockRes);
        });

        it('Successful request failed', async () => {
            fetch.mockResolvedValue({ok: false, json: () => Promise.reject()});
            const dispatch = jest.fn();
            const thunkSpy = ingredientsFetch();

            await thunkSpy(dispatch);

            const {calls} = dispatch.mock;
            expect(calls).toHaveLength(2);

            const [first, last] = calls;
            expect(first[0].type).toBe(ingredientsFetch.pending().type);
            expect(last[0].type).toBe(ingredientsFetch.rejected().type);
            expect(last[0].payload).toBe('Error');
        })
    })
})