
export enum IOrdersStatus {
    CREATED = 'created',
    DONE = 'done',
    PENDING = 'pending',
}
export interface IOrdersFeed {
    _id: string,
    createdAt: string,
    updatedAt: string,
    ingredients: string[],
    name: string,
    number: string,
    status: IOrdersStatus,
}

export interface IFeedWs {
    success: boolean,
    orders: IOrdersFeed[],
    total: number,
    totalToday: number,
}

export enum TypeWsStatus {
    CONNECTING = 'CONNECT',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
}
