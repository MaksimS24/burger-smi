import React from "react";
import styles from "./ingredients.module.css";
import {data} from "../../../utils/data";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const Ingredients = () => {

    const bun = data.filter(bun =>
        bun.type === 'bun');
    const main = data.filter(main =>
        main.type === 'main');
    const sauce = data.filter(sauce =>
        sauce.type === 'sauce');

    return (
        <div className={styles.mainIngredient}>
            <p>Булки</p>
            <div className={styles.ingredients}>
                {bun.map(data => (
                    <ul key={data._id}>
                        <img src={data.image} alt={'img'}/>
                        <li>{data.price}</li>
                        <CurrencyIcon type={"primary"}/>
                        <li>{data.name}</li>
                    </ul>
                ))}
            </div>
            <div>
                <p>Соусы</p>
                {sauce.map(data => (
                    <ul key={data._id}>
                        <img src={data.image} alt={'img'}/>
                        <li>{data.price}</li>
                        <CurrencyIcon type={"primary"}/>
                        <li>{data.name}</li>
                    </ul>
                ))}
            </div>
            <div>
                <p>Начинки</p>
                {main.map(data => (
                    <ul key={data._id}>
                        <img src={data.image} alt={'img'}/>
                        <li>{data.price}</li>
                        <CurrencyIcon type={"primary"}/>
                        <li>{data.name}</li>
                    </ul>
                ))}
            </div>
        </div>
    );
}

export default Ingredients;