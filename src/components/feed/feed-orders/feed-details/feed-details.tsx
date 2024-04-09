import style from './feed-details.module.css';
import {FC, useState} from "react";
import {ForModalFeedOrder} from "../../../../hooks/for-modal-feed-order";
import StatusOrders from "../status-order/status-orders";
import IngredientsFeedOrder from "./ingredeints-feed-order/ingredients-feed-order";
import {IOrdersFeed} from "../../../../utils/types/websocket";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

const FeedDetails: FC = () => {

    const {order} = ForModalFeedOrder();
    const [isTotal, setIsTotal] = useState(0);

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