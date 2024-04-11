import style from './feed-details.module.css';
import {FC, useEffect, useState} from "react";
import StatusOrders from "../status-order/status-orders";
import IngredientsFeedOrder from "./ingredeints-feed-order/ingredients-feed-order";
import {IOrdersFeed} from "../../../../utils/types/websocket";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../hooks/use-app-redux";
import {wsConnectProfileOrders} from "../../../../services/reducers-actions-profile-orders/actions";
import {feedOrdersWs, wsProfile} from "../../../../utils/api";
import {wsConnectFeedOrders} from "../../../../services/reducers-actions-feed-orders/actions";

const FeedDetails: FC = () => {

    const {id} = useParams();
    const {pathname} = useLocation();
    const location = pathname.split('/')[1];
    const orders = useAppSelector((state) => location === 'profile' ? state.profileOrders.data?.orders : state.feedOrders.data?.orders);
    const order = orders?.find((data) => data._id === id) as IOrdersFeed;
    const [isTotal, setIsTotal] = useState(0);
    const dispatch = useAppDispatch();

    useEffect(() => {
        location === 'profile'
        ? dispatch(wsConnectProfileOrders(wsProfile()))
            : dispatch(wsConnectFeedOrders(feedOrdersWs));
    }, [location, dispatch]);

    return (
        <>
            <div className={style.mainFeedDetails}>
                <p className='text text_type_main-medium'>
                    {order?.name}
                </p>
                <div className='text text_type_main-small'>
                    <StatusOrders status={order?.status}/>
                </div>
                <h3 className='text text_type_main-medium'>
                    Состав:
                </h3>
                <IngredientsFeedOrder order={order as IOrdersFeed} setIsTotal={(price) => setIsTotal(price)}/>
                <div className={style.footerModalFeedOrder}>
                    <div className='text text_type_main-small'>
                        <FormattedDate date={new Date(order?.createdAt as string)}/>
                    </div>
                    <div className='text_type_digits-default'>
                        {isTotal} <CurrencyIcon type='primary'/>
                    </div>
                </div>

            </div>
        </>
    );
};

export default FeedDetails;