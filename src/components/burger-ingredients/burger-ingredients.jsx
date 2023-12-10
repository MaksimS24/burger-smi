import React, {useEffect, useRef, useState} from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from "./ingredient-card/ingredient-card";
import IngredientDetails from "./ingredient-card/ingredient-details/ingredient-details";
import Modal from "../modal/modal";

import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../services/ingredients/ingredients-slice";

const BurgerIngredients = () => {

    const dispatch = useDispatch();
    const ingredients = useSelector((state) => state.ingredients.ingredients);
    const status = useSelector((state) => state.ingredients.status);
    const error = useSelector((state) => state.ingredients.error);
    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    const bunRef = useRef(null);
    const mainRef = useRef(null);
    const sauceRef = useRef(null);
    const [selectedTab, setSelectedTab] = useState('bun');
    const [id, setId] = useState();
    const [isOpen, setModalIsOpen] = useState(false);


    const handleModal = (id) => {
        setModalIsOpen(true)
        setId(id)
    }


    
    const handleTabClick = (tabValue) => {
        setSelectedTab(tabValue);
        switch (tabValue) {
            case 'bun':
                bunRef?.current.scrollIntoView({behavior: 'smooth'});
                break;
            case 'main':
                mainRef?.current.scrollIntoView({behavior: 'smooth'});
                break;
            case 'sauce':
                sauceRef?.current.scrollIntoView({behavior: 'smooth'});
                break;
            default:
                break;
        }
    };

    return (
        <div className={styles.mainBurgerIngredients}>

            {isOpen && <Modal
                title={"Детали ингредиента"}
                children={<IngredientDetails id={id}/>}
                setIsOpen={setModalIsOpen}/>
            }

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
                    {ingredients?.data?.filter((ingredient) => ingredient?.type === 'bun')?.map((ingredient) => (
                            <IngredientCard onClick={handleModal} {...ingredient} key={ingredient?._id}/>
                        ))}
                </ul>

                {/*Начинки*/}
                <h2 ref={mainRef}>Начинки</h2>
                <ul className={styles.ulIngredient}>
                    {ingredients?.data?.filter((ingredient) => ingredient?.type === 'main')?.map((ingredient) => (
                            <IngredientCard onClick={handleModal} {...ingredient} key={ingredient?._id}/>
                        ))}
                </ul>

                {/*Соусы*/}
                <h2 ref={sauceRef}>Соусы</h2>
                <ul className={styles.ulIngredient}>
                    {ingredients?.data?.filter((ingredient) => ingredient?.type === 'sauce')?.map((ingredient) => (
                            <IngredientCard onClick={handleModal} {...ingredient} key={ingredient?._id}/>
                        ))}
                </ul>
            </div>
        </div>
    )
}
export default BurgerIngredients;

