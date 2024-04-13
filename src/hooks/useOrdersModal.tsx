import {useLocation, useParams} from "react-router-dom";
import {useAppSelector} from "../services/selectors/use-typed-selector";
import {IOrdersFeed} from "../utils/types/websocket";

export const useOrdersModal = () => {
    const {id} = useParams();
    const {pathname} = useLocation();
    const location = pathname.split('/')[1];
    const orders = useAppSelector((state) => location === 'profile'
        ? state.profileOrders.data?.orders
        : state.feedOrders.data?.orders);
    const order = orders?.find((data) => data._id === id) as IOrdersFeed;
    return {order, location};
}