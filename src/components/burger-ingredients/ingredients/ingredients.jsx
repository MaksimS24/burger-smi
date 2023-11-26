import React, {useState} from "react";
import styles from "./ingredients.module.css";
import {ingredients} from "../../../utils/data";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../modal/modal";
import DetailsIngredient from "./details-ingredient/details-ingredient";

const Ingredients = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.mainIngredient}>
            <div className={styles.ingredients}>
                <div onClick={() => setIsOpen(true)}>
                    <ul className={styles.array}>
                            {ingredients.map(ingredient =>
                                <li className={styles.ulIngredients} key={ingredient._id}>
                                    <img src={ingredient.image} alt={'burger-ingredients'}/>
                                    <div className={'text text_type_digits-default'}>{ingredient.price}
                                        <CurrencyIcon type={"primary"}/>
                                    </div>
                                    <div className={'text text_type_main-default'}>{ingredient.name}</div>
                                </li>
                            )}
                    </ul>
                </div>
                {isOpen && <Modal title="Детали ингредиента" children={<DetailsIngredient/>}
                                  setIsOpen={setIsOpen}/>
                }
            </div>
        </div>
    );
}

export default Ingredients;