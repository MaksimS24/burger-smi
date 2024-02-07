import React from "react";
import styles from "./ingredient-card.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";

const IngredientCard = ({name, price, image, onClick, _id}) => {

    const [{isDrag}, dropTarget] = useDrag(() => ({
        type: 'ingredient',
        item: {_id},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        }),
    }));

    return (
        <li
            className={styles.liIngredients}
            onClick={() => onClick(_id)}
            ref={dropTarget}
        >
            <img src={image}
                 alt={'burger-ingredient-card'}
            />
            <div className={'text text_type_digits-default'}>{price}
                <CurrencyIcon type={"primary"}/>
            </div>
            <div className={'text text_type_main-default'}>{name}</div>
        </li>
    );
};

export default IngredientCard;