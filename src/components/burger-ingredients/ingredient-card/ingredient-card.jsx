import React, {useMemo, useRef} from "react";
import styles from "./ingredient-card.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";

const IngredientCard = ({name, price, image, image_mobile, onClick, _id, type}) => {

    const cardDrag = {name, price, image_mobile, type, _id}

    const [{isDrag}, dragTarget] = useDrag(() => ({
        type: 'ingredients',
        item: cardDrag,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        }),
    }));

    const ingredients = useSelector((state) => state.constructorIngredients.mainAndSauce);

    let counter = 0;
    ingredients.data?.map(ingredient => {
        if (ingredient._id === _id) {
            counter += 1;
        }
        return counter
    })
    console.log(counter)


    return (
        <li className={styles.liIngredients}
            onClick={() => onClick(_id)}
            style={{isDrag}}
        >
            {counter ? <Counter count={counter} size={"default"} extraClass={styles.count}/> : null}
            <img src={image}
                 alt={'burger-ingredient-card'}
                 ref={dragTarget}
            />
            <div className={'text text_type_digits-default'}>
                {price}
                <CurrencyIcon type={"primary"}/>
            </div>
            <div className={'text text_type_main-default'}>
                {name}
            </div>
        </li>
    );
};

export default IngredientCard;