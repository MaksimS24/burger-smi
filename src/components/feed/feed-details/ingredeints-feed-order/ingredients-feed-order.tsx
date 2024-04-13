import style from './ingredients-feed-order.module.css';
import {FC, useEffect, useMemo} from "react";
import {IOrdersFeed} from "../../../../utils/types/websocket";
import {IIngredient} from "../../../../utils/types/types-ingredients";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppSelector} from "../../../../services/selectors/use-typed-selector";

interface IData {
    _id: string,
    name: string,
    count: number,
    price: number,
    image_mobile: string,
}

const IngredientsFeedOrder: FC<{order: IOrdersFeed; setIsTotal: (price: number) => void}> = ({order, setIsTotal}) => {
    const ingredients = useAppSelector((state) => state.ingredients.ingredients);
    const {data, totalPrice} = useMemo(() => {
        let totalPrice = 0;
        const data: IData[] = [];
        order?.ingredients.forEach((elementsOrder) => {
            const isIngredientsIndex = data.findIndex((index) => index._id === elementsOrder);
            const isIngredient = data[isIngredientsIndex];

            if (isIngredient) {
                totalPrice += isIngredient.price;
                isIngredient.count += 1;
            } else {
                const searchIngredients = ingredients.find((ingredient: IIngredient) => ingredient._id === elementsOrder);
                const {_id, name, price, image_mobile} = searchIngredients as IIngredient;
                totalPrice += price;
                data.push({
                    _id, name, count: 1, price, image_mobile
                });
            }
        });
        return {data, totalPrice};
    }, [order, ingredients]);

    useEffect(() => {
        setIsTotal(totalPrice);
    }, [totalPrice, setIsTotal]);

    return (
        <ul>
            {data.map((item, index) => (
                <li className={style.ingredientsModalFeedOrder} key={index}>
                    <div className={style.eachImgModalFeed}>
                        <img src={item.image_mobile} alt='ingredient'/>
                    </div>
                    <p className='text_type_main-default ml-6'>{item.name}</p>
                    <span className='text text_type_main-default text text_type_digits-default'>
                        {item.count} x {item.price} <CurrencyIcon type='primary'/>
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default IngredientsFeedOrder;