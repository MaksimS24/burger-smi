import React from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredients from "./ingredients/ingredients";

const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('bun')

    // useEffect(() => {
    //     if (data.type === 'bun'){
    //         return setCurrent('bun');
    //     } else if (data.type === 'main') {
    //         return setCurrent('main');
    //     } else if (data.type === 'sauce') {
    //         return setCurrent('sauce')
    //     }
    // });


    return (
        <div className={styles.mainBurgerIngredients}>

            <h1>Соберите бургер</h1>

            <div style={{ display: 'flex' }}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <Ingredients/>
        </div>
    );
}

export default BurgerIngredients;