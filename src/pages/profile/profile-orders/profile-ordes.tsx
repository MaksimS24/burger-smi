import style from './profile-orders.module.css';
import {FC, useEffect} from "react";
import {
    wsConnectProfileOrders,
    wsDisconnectProfileOrders
} from "../../../services/reducers-actions-profile-orders/actions";
import {wsProfile} from "../../../utils/api";
import FeedOrders from "../../feed-orders/feed-orders";
import {useAppDispatch, useAppSelector} from "../../../services/selectors/use-typed-selector";

const ProfileOrders: FC = () => {

    const orders = useAppSelector((state) => state.profileOrders.data?.orders);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(wsConnectProfileOrders(wsProfile()));
        return () => {
            dispatch(wsDisconnectProfileOrders())
        }
    }, [dispatch]);

    return (
        <>
            <div className={style.mainProfileOrders}>
                <span>
                {orders?.map((order, index) => <FeedOrders data={order} key={index}/>).reverse()}
                </span>
            </div>

        </>
    );
};

export default ProfileOrders;