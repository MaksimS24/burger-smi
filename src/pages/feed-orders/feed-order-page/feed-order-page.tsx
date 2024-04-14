import style from '../../../components/feed/feed-details/feed-details.module.css';
import {FC, useEffect, useState} from "react";
import StatusOrders from "../../../pages/feed-orders/status-order/status-orders";
import {IOrdersFeed} from "../../../utils/types/websocket";
import IngredientsFeedOrder from '../../../components/feed/feed-details/ingredeints-feed-order/ingredients-feed-order'
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useOrdersModal} from "../../../hooks/useOrdersModal";
import {useAppDispatch} from "../../../services/selectors/use-typed-selector";
import {
    wsConnectProfileOrders,
    wsDisconnectProfileOrders
} from "../../../services/reducers-actions-profile-orders/actions";
import {feedOrdersWs, wsProfile} from "../../../utils/api";
import {wsConnectFeedOrders, wsDisconnectFeedOrders} from "../../../services/reducers-actions-feed-orders/actions";

const FeedOrderPage: FC = () => {

    const [isTotal, setIsTotal] = useState(0);
    const {order, location} = useOrdersModal();
    const dispatch = useAppDispatch();

    useEffect(() => {
        location === 'profile'
        ? dispatch(wsConnectProfileOrders(wsProfile()))
            : dispatch(wsConnectFeedOrders(feedOrdersWs));
        return () => {
            location === 'profile' ? dispatch(wsDisconnectFeedOrders()) : dispatch(wsDisconnectProfileOrders())
        };
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

export default FeedOrderPage;