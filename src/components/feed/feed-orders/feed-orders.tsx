import style from './feed-orders.module.css';
import {useAppSelector} from "../../../hooks/use-app-redux";
import {useLocation} from "react-router-dom";
import {IOrdersFeed} from "../../../utils/types/websocket";
import {FC, useCallback} from "react";
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
        <div className={style.mainFeedOrders}>
            <div className={style.topFeedOrder}>
                <span className='text text_type_digits-default'>#{number}</span>
                <time className='text text_type_main-default text_color_inactive'>
                    <FormattedDate date={new Date(createdAt)}/>
                </time>
            </div>
            <h3 className='text text_type_main-medium mt-6'>{name}</h3>
            {visibleStatus && <StatusOrders status={status}/>}
            <div className={style.footerFeedOrder}>
                <div className={style.imgFeedOrder}>
                    {orderForDisplay.leaf.map((thumb, i, arr) =>
                        <div key={`${thumb.id}${i}`} className={style.eachImg} style={{zIndex: arr.length -1}}>
                            <img className={style.img} src={thumb.image} alt={thumb.nameBurger}></img>
                            {thumb.isTotalNumber ? <div className={`${style.bigOrder} text text_type_main-default`}>+{thumb.isTotalNumber}</div> : null }
                        </div>
                    )}
                </div>
                <div className={style.priceFeedOrder}>
                    <h3 className='text text_type_digits-default mr-2'>{orderForDisplay.total}</h3>
                    <CurrencyIcon type='primary'/>
                </div>
            </div>
        </div>
    );
};

export default FeedOrders;