import React, {useEffect, useMemo, useState} from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredients from "./ingredients/ingredients";
import {ingredients} from "../../utils/data";

const BurgerIngredients = () => {

    // useCallback(() => {
    //     if (data.type === 'bun'){
    //         return setCurrent('bun');
    //     } else if (data.type === 'main') {
    //         return setCurrent('main');
    //     } else if (data.type === 'sauce') {
    //         return setCurrent('sauce')
    //     }
    // });
    const [current, setCurrent] = useState([])
    const [listIngredients, setListIngredient] = useState()

    useEffect(() => {
        setCurrent(ingredients);
    }, []);

    function getFilterIngredients() {
        if(!listIngredients) {
            return current;
        }
        return current.filter((item) => item.type === setCurrent);
    }

    const filteredList = useMemo(getFilterIngredients, [listIngredients, current])

    const viewCategoryIngredient = (event) => {
        setListIngredient(event.target.value);
    }

    return (
        <div className={styles.mainBurgerIngredients}>

            <h1>Соберите бургер</h1>

            <div className={styles.tabIngredients}>
                <Tab value="bun" active={current === ['bun']}  onCLick={viewCategoryIngredient}>
                    Булки
                </Tab>
                <Tab value="main" active={current === ['main']} onCLick={viewCategoryIngredient}>
                    Соусы
                </Tab>
                <Tab value="sauce" active={current === ['sauce']} onCLick={viewCategoryIngredient}>
                    Начинки
                </Tab>
            </div>
            <div>
                {filteredList.map((item, element, index) => (
                    <ul>
                        <li>
                            <h2>{item.type}</h2>
                            <Ingredients {...element} key={index}/>
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    );
}

export default BurgerIngredients;