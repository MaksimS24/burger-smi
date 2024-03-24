import React, {FC, useEffect, useRef, useState} from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from "./ingredient-card/ingredient-card";
import {fetchIngredients} from "../../utils/api";
import {useAppDispatch, useAppSelector} from "../../hooks/use-app-redux";

const BurgerIngredients: FC = () => {

    const bunRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const [selectedTab, setSelectedTab] = useState('bun');

    const handleTabClick = (tabValue: any) => {
        setSelectedTab(tabValue);
        switch (tabValue) {
            case 'bun':
                bunRef.current?.scrollIntoView({block: 'start', behavior: 'smooth'});
                break;
            case 'main':
                mainRef.current?.scrollIntoView({block: 'start', behavior: 'smooth'});
                break;
            case 'sauce':
                sauceRef.current?.scrollIntoView({block: 'start', behavior: 'smooth'});
                break;
            default:
                break;
        }
    };

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
            <div className={styles.tabIngredients}>
                <Tab value="bun" active={selectedTab === 'bun'} onClick={handleTabClick}>
                    Булки
                </Tab>
                <Tab value="main" active={selectedTab === 'main'} onClick={handleTabClick}>
                    Начинки
                </Tab>
                <Tab value="sauce" active={selectedTab === 'sauce'} onClick={handleTabClick}>
                    Соусы
                </Tab>
            </div>

            {/*Ингредиенты*/}
            <div className={styles.cardsIngredient}>

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
        </div>
    )
}
export default BurgerIngredients;

