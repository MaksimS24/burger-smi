import React from "react";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './main.module.css';

const Main = () => {
    return (
        <main className={styles.mainBurger}>
            <BurgerIngredients/>
            <BurgerConstructor/>
        </main>
    );
}

export default Main;