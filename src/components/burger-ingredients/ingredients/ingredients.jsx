import React, {useState} from "react";
import styles from "./ingredients.module.css";
import {ingredients} from "../../../utils/data";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../modal/modal";
import DetailsIngredient from "./details-ingredient/details-ingredient";

const Ingredients = ({name, price, image}) => {


    // const bun = ingredients.filter(bun =>
    //     bun.type === 'bun');
    // const main = ingredients.filter(main =>
    //     main.type === 'main');
    // const sauce = ingredients.filter(sauce =>
    //     sauce.type === 'sauce');

    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className={styles.mainIngredient}>
            <div className={styles.ingredients}>
                <div onClick={() => setIsOpen(true)}>
                    <div className={styles.array}>
                        {ingredients.map(ingredient =>
                            <ul className={styles.ulIngredients} key={ingredient._id}>
                                <img src={ingredient.image} alt={'burger-ingredients'}/>
                                <li className={'text text_type_digits-default'}>{ingredient.price}
                                    <CurrencyIcon type={"primary"}/>
                                </li>
                                <li className={'text text_type_main-default'}>{ingredient.name}</li>
                            </ul>
                        )}
                    </div>

                </div>
                {isOpen && <Modal title="Детали ингредиента" children={<DetailsIngredient/>} setIsOpen={setIsOpen}/>}
            </div>
        </div>
    );
}

export default Ingredients;