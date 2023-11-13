import React from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredients from "./ingredients/ingredients";

const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('one')
    return (
        <div className={styles.mainBurgerIngredients}>

            <h1>Соберите бургер</h1>

            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    One
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Two
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Three
                </Tab>
            </div>
            <Ingredients/>
        </div>
    );
}

export default BurgerIngredients;