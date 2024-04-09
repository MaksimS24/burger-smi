import style from './feed-details.module.css';
import {FC, useState} from "react";
import {ForModalFeedOrder} from "../../../../hooks/for-modal-feed-order";
import StatusOrders from "../status-order/status-orders";
import IngredientsFeedOrder from "./ingredeints-feed-order/ingredients-feed-order";
import {IFeedOrders} from "../../../../services/reducers-actions-feed-orders/reducers";

const FeedDetails: FC = () => {

    const {order} = ForModalFeedOrder();
    const [isTotal, setIsTotal] = useState(0);

    return (
        <>
            <div>
                <div className='text text_type_main-medium'>{order?.name}</div>
                <div>
                    <StatusOrders status={order?.status}/>
                </div>
                <h3>Состав:</h3>
                <IngredientsFeedOrder order={order as IFeedOrders} setIsTotal={(price) => setIsTotal(price)}/>
            </div>
        </>
    );
};

export default FeedDetails;