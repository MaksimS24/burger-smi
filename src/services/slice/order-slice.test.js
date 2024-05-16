import orderReducer, {initialState, orderCloseModal, orderFetch} from './order-slice';

const orderData = {
    success: true,
    name: 'Флюоресцентный люминесцентный бургер',
    order: {
        number: 38859,
    },
};

describe('Order slice', () => {
    it('Should return the initial state', () => {
        const result = orderReducer(undefined, {type: ''});
        expect(result).toEqual(initialState);
    });

    it('Should work orderCloseModal', () => {
        const action = {type: orderCloseModal.type};
        const result = orderReducer({...initialState, data: orderData, orderCloseModal: false}, action);
        expect(result.orderCloseModal).toBe(false);
        expect(result.dataOrder.order.number).toBe(null);
    });

    //Extra reducers
    it('Should work isLoading and isError in pending', () => {
        const result = orderReducer({...initialState, isLoading: true}, orderFetch.pending());
        expect(result.isLoading).toBe(true);
        expect(result.isError).toBe(false);
    });

    it('Should work orderFetch', () => {
        const result = orderReducer({...initialState, isLoading: true}, orderFetch.fulfilled(orderData));
        expect(result.isLoading).toBe(false);
        expect(result.dataOrder).toBe(orderData);
    });

    it('Should work isLoading and isError in pending rejected', () => {
        const result = orderReducer({...initialState, isLoading: true}, orderFetch.rejected('Error'));
        expect(result.isLoading).toBe(false);
        expect(result.isError).toBe('Error');
    })

    //Async Thunk

    global.fetch = jest.fn();

    describe('Sending a request', () => {

        it('Successful  on the orderFetch', async () => {
            const mockRes = '{"ingredients": ["60666c42cc7b410027a1a9b2", "60666c42cc7b410027a1a9b3"]}';
            fetch.mockResolvedValue({ok: true, json: () => Promise.resolve(orderData)});
            const dispatchSpy = jest.fn();
            const thunkSpy = orderFetch(mockRes);

            await thunkSpy(dispatchSpy);

            const {calls} = dispatchSpy.mock;
            expect(calls).toHaveLength(2)

            const [first, last] = calls;
            expect(first[0].type).toBe(orderFetch.pending().type);
            expect(last[0].type).toBe(orderFetch.fulfilled().type);
            expect(last[0].payload).toBe(orderData);
        });

        it('Request error', async () => {
            fetch.mockResolvedValue({ok: false, json: () => Promise.reject()});
            const dispatchSpy = jest.fn();
            const thunkSpy = orderFetch(orderData);

            await thunkSpy(dispatchSpy);

            const {calls} = dispatchSpy.mock;
            expect(calls).toHaveLength(2);

            const [first, last] = calls;
            expect(first[0].type).toBe(orderFetch.pending().type);
            expect(last[0].type).toBe(orderFetch.rejected().type);
        });
    });

});