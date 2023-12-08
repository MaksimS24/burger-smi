import React from "react";
import styles from "./ingredient-card.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientCard = ({name, price, image, onClick, _id}) => {
    return (
        <li
            className={styles.liIngredients}
            onClick={() => onClick(_id)}
        >
            <img src={image} alt={'burger-ingredient-card'}/>
            <div className={'text text_type_digits-default'}>{price}
                <CurrencyIcon type={"primary"}/>
            </div>
            <div className={'text text_type_main-default'}>{name}</div>
        </li>
    )
}

export default IngredientCard;