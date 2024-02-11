import React, {useRef} from "react";
import styles from "./ingredient-card.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";

const IngredientCard = ({name, price, image, image_mobile, onClick, _id, type}) => {

    const [{isDrag}, dropTarget] = useDrag(() => ({
        type: 'ingredients',
        item: {name, price, image_mobile, type},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        }),
    }));

    return (
        <li
            className={styles.liIngredients}
            onClick={() => onClick(_id)}

        >
            <img src={image}
                 alt={'burger-ingredient-card'}
                 ref={dropTarget}
            />
            <div className={'text text_type_digits-default'}>{price}
                <CurrencyIcon type={"primary"}/>
            </div>
            <div className={'text text_type_main-default'}>{name}</div>
        </li>
    );
};

export default IngredientCard;