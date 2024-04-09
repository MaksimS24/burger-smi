import style from './feed.module.css';
import FeedOrders from "./feed-orders/feed-orders";
import {useAppDispatch, useAppSelector} from "../../hooks/use-app-redux";
import {FC, useEffect, useMemo} from "react";
import {feedOrdersWs} from "../../utils/api";
import {
    wsConnectFeedOrders,
    wsDisconnectFeedOrders
} from "../../services/reducers-actions-feed-orders/actions";

const Feed: FC = () => {

    const orders = useAppSelector((state) => state.feedOrders.data?.orders);
    const total = useAppSelector((state) => state.feedOrders.data?.total);
    const totalToday = useAppSelector((state) => state.feedOrders.data?.totalToday);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(wsConnectFeedOrders(feedOrdersWs));
        return () => {
            dispatch(wsDisconnectFeedOrders());
        }
    }, [dispatch]);

    const {readyOrders, workOrders} = useMemo(() => ({
            readyOrders: orders?.map(order => order.status === 'done' ? order.number : null),
            workOrders: orders?.map(order => order.status === 'pending' ? order.number : null),
        }),
        [orders]
    );

    return (
        <div className={style.mainFeedOrders}>
            <div className={style.feedHeader}>
                <h2 className='text text_type_main-large mt-10'>Лента заказов</h2>
            </div>
            <div className={style.feedMainContainer}>
                <div className={style.feedOrders}>
                    {orders?.map(order => <FeedOrders key={order._id} data={order}/>)}
                </div>
                <div className={style.stats}>
                    <div className={style.statsUp}>
                        <div className={style.readyOrders}>
                            <h3 className={'text_type_main-medium'}>Готовы:</h3>
                            <ul className={style.readyOrder}>
                                {readyOrders?.map((item, ind) =>
                                    ind < 10 ? (
                                        <li key={ind} className='text text_type_digits-default'>{item}</li>
                                    ) : null
                                )}
                            </ul>
                        </div>
                        <div className={style.workOrders}>
                            <h3 className={'text_type_main-medium'}>В работе:</h3>
                            <ul className={style.workOrder}>
                                {workOrders?.map((item, ind) =>
                                    ind < 10 ? (
                                        <li key={ind} className='text text_type_digits-default'>{item}</li>
                                    ) : null
                                )}
                            </ul>
                        </div>

                    </div>

                    <div className={style.totals}>
                        <h3 className='text_type_main-medium'>Выполнено за все время:</h3>
                        <p className='text text_type_digits-large'>{total}</p>
                        <h3 className='text_type_main-medium'>Выполнено за сегодня:</h3>
                        <p className='text text_type_digits-large'>{totalToday}</p>
                    </div>
                </div>
            </div>

        </div>
    )
        ;
};

export default Feed;