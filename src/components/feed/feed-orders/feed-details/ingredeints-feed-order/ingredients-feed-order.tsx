import style from './ingredients-feed-order.module.css';
import {FC, useEffect, useMemo} from "react";
import {IOrdersFeed} from "../../../../../utils/types/websocket";
import {useAppSelector} from "../../../../../hooks/use-app-redux";
import {IIngredient} from "../../../../../utils/types/types-ingredients";

interface IData {
    _id: string,
    name: string,
    count: number,
    price: number,
    image_large: string,
}

const IngredientsFeedOrder: FC<{ order: IOrdersFeed; setIsTotal: (price: number) => void }> = ({order, setIsTotal}) => {
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
                const searchIngredients = ingredients.find((ingredient: IIngredient) => ingredient._id === elementsOrder)
                const {_id, name, price, image_large} = searchIngredients as IIngredient;
                totalPrice += price;
                data.push({
                    _id, name, count: 1, price, image_large
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
            {data.map((index, item) => {
                <li key={index}>
                    <img src={item.image_large} alt='image-ingredients'/>
                    <p className='text text_type_main-default'>{item.name}</p>
                    <div>{item.count} x {item.price}</div>
                </li>
            })}
        </ul>
    );
};

export default IngredientsFeedOrder;