import style from './profile-orders.module.css';
import {useAppDispatch, useAppSelector} from "../../../hooks/use-app-redux";
import {useEffect} from "react";
import {
    wsConnectProfileOrders,
    wsDisconnectProfileOrders
} from "../../../services/reducers-actions-profile-orders/actions";
import {wsProfile} from "../../../utils/api";
import FeedOrders from "../../../components/feed/feed-orders/feed-orders";

const ProfileOrders = () => {

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
            <div>
                {orders?.map((order, index) => <FeedOrders data={order} key={index}/>).reverse()}
            </div>

        </>
    );
};

export default ProfileOrders;