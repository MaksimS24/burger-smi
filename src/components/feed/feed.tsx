import style from './feed.module.css';
import FeedOrders from "./feed-orders/feed-orders";
import {useAppSelector} from "../../hooks/use-app-redux";
import Stats from "./stats/stats";
import feedOrdersReducer from "../../services/reducers-actions-feed-orders/reducers";
import {FC} from "react";


const Feed: FC = () => {

    const orders = useAppSelector((state) => state.feedOrders.data?.orders)
    return (
        <div className={style.feedContainer}>
            <div className={style.feedHeader}>
                <h2 className='text text_type_main-large'>Лента заказов</h2>
            </div>
            <div className={style.feedMainContainer}>
                <div className={style.feedOrders}>
                    {orders?.map(order => <FeedOrders key={order._id} data={order}/>)}
                </div>
                <div className={style.stats}>
                    <div className={style.statsUp}>
                        <div>
                            {/*<Stats title='Готовы' orders={} textId={}*/}
                            <h3 className={'text_type_main-medium'}>Готовы:</h3>
                        </div>
                        <div>
                            <h3 className={'text_type_main-medium'}>В работе:</h3>
                        </div>
                    </div>

                    <h3 className={'text_type_main-medium'}>Выполнено за все время:</h3>
                    <span></span>
                    <h3 className={'text_type_main-medium'}>Выполнено за сегодня:</h3>
                    <span></span>
                </div>
            </div>

        </div>
    )
        ;
};

export default Feed;