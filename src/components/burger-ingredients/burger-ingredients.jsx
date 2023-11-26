import React, {useCallback, useEffect, useMemo, useState} from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredients from "./ingredients/ingredients";
import {ingredients} from "../../utils/data";

const BurgerIngredients = () => {


    //
    const [current, setCurrent] = useState('bun')
    const [listIngredients, setListIngredient] = useState([])

    useEffect(() => {
        setListIngredient(ingredients);
    }, []);

    // useCallback((current) => {
    //         if (ingredients.type === 'bun'){
    //             return current('bun');
    //         } else if (ingredients.type === 'main') {
    //             return current('main');
    //         } else if (ingredients.type === 'sauce') {
    //             return current('sauce')
    //         }
    //     });

    function getFilterIngredients() {
        return listIngredients.filter(item => item.type === current);
    }
    // return listIngredients.filter(item => {
    //     if (item.type === 'bun') {
    //         return !item;
    //     } else if (item.type === 'main') {
    //         return item;
    //     }
    // });

    const filteredList = useMemo(getFilterIngredients, [listIngredients, current])

    return (
        <div className={styles.mainBurgerIngredients}>

            <h1>Соберите бургер</h1>

            <div className={styles.tabIngredients}>
                <Tab value="bun" active={current === 'bun'} onCLick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="main" active={current === 'main'} onCLick={setCurrent}>
                    Начинки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onCLick={setCurrent}>
                    Соусы
                </Tab>
            </div>
            <div>
                <ul>
                    {filteredList.map(item => (
                        <li >
                            <h2>{item.type}</h2>
                            <Ingredients key={item._id}/>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
}

export default BurgerIngredients;