import {useAppSelector} from "../../../hooks/use-app-redux";
import {useLocation} from "react-router-dom";
import {IOrdersFeed} from "../../../utils/types/websocket";
import {FC, ReactElement, useCallback, useMemo} from "react";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import StatusOrders from "./status-order/status-orders";

interface IFeedOrders {
    data: IOrdersFeed,
    visibleStatus?: boolean,
}
interface IVisionOrder {
    image: string,
    isTotalNumber: null | number,
    id: string,
    nameBurger: string,
}

const FeedOrders: FC<IFeedOrders> = ({data, visibleStatus = false}) => {

    const {createdAt, ingredients, status, number, name} = data;
    const location = useLocation();
    const ingredientsFeed = useAppSelector((state) => state.ingredients.ingredients);

    const createOrder = useCallback(() => {
        let total = 0;
        const leaf: IVisionOrder[] = [];
        ingredients.forEach((ingredientsInFeedOrder, i, arr) => {
            const dataIngredient = ingredientsFeed.find(ingredient => ingredient._id === ingredientsInFeedOrder);
            if(dataIngredient) {
                total += dataIngredient?.price ? dataIngredient?.price : 0;
                if(i < 6) leaf.push({
                    image: dataIngredient?.image_mobile,
                    isTotalNumber: i === 5 ? arr.length - (i + 1) : null,
                    id: dataIngredient?._id,
                    nameBurger: dataIngredient?.name
                })
            }
        })
        return {total, leaf}
    },[ingredients, ingredientsFeed]);

    const orderForDisplay = createOrder();

    return (
        <>
            <div>{number}</div>
            <time>
                <FormattedDate date={new Date(createdAt)}/>
            </time>
            <h3>{name}</h3>
            {visibleStatus && <StatusOrders status={status}/>}
            <div>
                <div>
                    {orderForDisplay.leaf.map((thumb, i, arr) =>
                        <div key={`${thumb.id}${i}`} style={{zIndex: arr.length -1}}>
                            <img src={thumb.image} alt={thumb.nameBurger}></img>
                            {thumb.isTotalNumber ? <div className={`text text_type_main-default`}>+{thumb.isTotalNumber}</div> : null }
                        </div>
                    )}
                </div>
                <div>
                    <h3 className='text text_type_digits-default'>{orderForDisplay.total}</h3>
                    <CurrencyIcon type='primary'/>
                </div>
            </div>
        </>
    );
};

export default FeedOrders;