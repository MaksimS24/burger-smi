import React, {useRef, useState} from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from "./ingredient-card/ingredient-card";
import {ingredients} from "../../utils/data";
import IngredientDetails from "./ingredient-card/ingredient-details/ingredient-details";
import Modal from "../modal/modal";

const BurgerIngredients = (props) => {
    const {data} = props;
    const bunRef = useRef(null);
    const mainRef = useRef(null);
    const sauceRef = useRef(null);
    const [selectedTab, setSelectedTab] = useState('bun');
    const [id, setId] = useState()
    const [isOpen, setModalIsOpen] = useState(false)

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

            <div className={styles.cardsIngredient}>

                {/*Булки*/}
                <h2 ref={bunRef}>Булки</h2>
                <ul className={styles.ulIngredient}>
                    {ingredients
                        .filter((ingredient) => ingredient.type === 'bun')
                        .map((ingredient) => (
                            <IngredientCard onClick={handleModal} {...ingredient} key={ingredient._id}/>
                        ))}
                </ul>

                {/*Начинки*/}
                <h2 ref={mainRef}>Начинки</h2>
                <ul className={styles.ulIngredient}>
                    {ingredients
                        .filter((ingredient) => ingredient.type === 'main')
                        .map((ingredient) => (
                            <IngredientCard onClick={handleModal} {...ingredient} key={ingredient._id}/>
                        ))}
                </ul>

                {/*Соусы*/}
                <h2 ref={sauceRef}>Соусы</h2>
                <ul className={styles.ulIngredient}>
                    {ingredients
                        .filter((ingredient) => ingredient.type === 'sauce')
                        .map((ingredient) => (
                            <IngredientCard onClick={handleModal} {...ingredient} key={ingredient._id}/>
                        ))}
                </ul>
            </div>
        </div>
    )
}
export default BurgerIngredients;

