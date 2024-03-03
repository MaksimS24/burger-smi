import React from "react";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './main.module.css';
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

const Main = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.mainBurger}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </main>
        </DndProvider>

    );
}

export default Main;