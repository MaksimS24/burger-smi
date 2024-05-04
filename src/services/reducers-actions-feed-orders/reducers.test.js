import feedOrdersReducer, {initialState} from "./reducers";
import {wsConnecting, wsOpen, wsClose, wsError, wsMessage} from "./actions";
import {TypeWsStatus} from "../../utils/types/websocket";


describe('Reducer feed orders', () => {

    it('Initial state', () => {
        const result = feedOrdersReducer(undefined, {});
        expect(result).toEqual(initialState);
    });

    it('Websocket connecting', () => {
        const result = feedOrdersReducer({...initialState}, {type: wsConnecting.type});
        expect(result).toEqual({...initialState, status: TypeWsStatus.CONNECTING});
    });

    it('Websocket online', () => {
        const result = feedOrdersReducer({...initialState}, {type: wsOpen.type});
        expect(result).toEqual({...initialState, status: TypeWsStatus.ONLINE});
    });

    it('Websocket offline', () => {
        const result = feedOrdersReducer(
            {...initialState, status: TypeWsStatus.ONLINE},
            {type: wsClose.type}
        );
        expect(result).toEqual(initialState);
    });

    it('Websocket online error', () => {
        const result = feedOrdersReducer(
            {...initialState, status: TypeWsStatus.ONLINE},
            {type: wsError.type, payload: 'Error'}
        );
        expect(result).toEqual({...initialState, error: 'Error', status: TypeWsStatus.ONLINE});
    });

    it('Websocket message', () => {
        const result = feedOrdersReducer(
            {...initialState, status: TypeWsStatus.ONLINE},
            {
                type: wsMessage.type,
                payload: [{
                    _id: '66311ef697ede0001d068570',
                    name: 'Краторный люминесцентный бургер',
                    price: '3498'
                }],
            }
        );
        expect(result).toEqual({
            ...initialState,
            status: TypeWsStatus.ONLINE,
            data: [{
                _id: '66311ef697ede0001d068570',
                name: 'Краторный люминесцентный бургер',
                price: '3498'
            }]
        });
    });
});