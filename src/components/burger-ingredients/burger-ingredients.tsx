import React, {FC, RefObject, useEffect, useRef, useState} from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from "./ingredient-card/ingredient-card";
import {fetchIngredients} from "../../utils/api";
import {useAppDispatch, useAppSelector} from "../../hooks/use-app-redux";
import {tabScroll} from "../../hooks/tabScroll";

const BurgerIngredients: FC = () => {

    //Tabs and scroll
    const [selectedTab, setSelectedTab] = useState<'bun' | 'main' | 'sauce'>('bun');

    const bunRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const tabRef = useRef<HTMLDivElement>(null);

    const getActive = () => {
        setSelectedTab(tabScroll({bunRef, sauceRef, mainRef, tabRef}));
    }

    const toHandleTabClick = (ref: RefObject<HTMLElement>) => {
        ref.current?.scrollIntoView({block: 'start', behavior: 'smooth'});
    }

    //Array ingredients
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    const ingredients = useAppSelector((state) => state.ingredients.ingredients);

    return (

        <div className={styles.mainBurgerIngredients}>

            <h1 className="text text_type_main-large">
                Соберите бургер
            </h1>

            {/*Табы*/}
            <div className={styles.tabIngredients} ref={tabRef}>
                <Tab value={"bun"} active={selectedTab === 'bun'} key={1} onClick={() => toHandleTabClick(bunRef)}>
                    Булки
                </Tab>
                <Tab value={"main"} active={selectedTab === 'main'} key={2} onClick={() => toHandleTabClick(mainRef)}>
                    Начинки
                </Tab>
                <Tab value={"sauce"} active={selectedTab === 'sauce'} key={3} onClick={() => toHandleTabClick(sauceRef)}>
                    Соусы
                </Tab>
            </div>

            {/*Ингредиенты*/}
            <main>
                <div className={styles.cardsIngredient} onScroll={() => getActive()}>

                    {/*Булки*/}
                    <h2 ref={bunRef}>Булки</h2>
                    <ul className={styles.ulIngredient}>
                        {ingredients.filter((ingredient) => ingredient.type === 'bun').map((ingredient) => (
                            <IngredientCard
                                ingredientData={ingredient}
                                key={ingredient._id}
                            />
                        ))}
                    </ul>

                    {/*Начинки*/}
                    <h2 ref={mainRef}>Начинки</h2>
                    <ul className={styles.ulIngredient}>
                        {ingredients.filter((ingredient) => ingredient.type === 'main').map((ingredient) => (
                            <IngredientCard
                                ingredientData={ingredient}
                                key={ingredient._id}
                            />
                        ))}
                    </ul>

                    {/*Соусы*/}
                    <h2 ref={sauceRef}>Соусы</h2>
                    <ul className={styles.ulIngredient}>
                        {ingredients.filter((ingredient) => ingredient.type === 'sauce').map((ingredient) => (
                            <IngredientCard
                                ingredientData={ingredient}
                                key={ingredient._id}
                            />
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    )
}
export default BurgerIngredients;

