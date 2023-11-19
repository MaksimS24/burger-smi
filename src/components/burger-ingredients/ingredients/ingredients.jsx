import React, {useState} from "react";
import styles from "./ingredients.module.css";
import {data} from "../../../utils/data";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../modal/modal";

const Ingredients = () => {

    const [isOpen, setIsOpen] = useState(false);

        // const bun = data.filter(bun =>
        //     bun.type === 'bun');
        // const main = data.filter(main =>
        //     main.type === 'main');
        // const sauce = data.filter(sauce =>
        //     sauce.type === 'sauce');


    return (
        <div className={styles.mainIngredient}>
            <div className={styles.ingredients}>
                <div onClick={() => setIsOpen(true)}>
                    <li className={styles.liArray} >
                        {data.map(data => (
                            <li className={styles.liIngredients} key={data._id}>
                                <img src={data.image} alt={'img'}/>
                                <li className={'text text_type_digits-default'}>{data.price}
                                    <CurrencyIcon type={"primary"}/>
                                </li>
                                <li className={'text text_type_main-default'}>{data.name}</li>
                            </li>
                        ))}
                    </li>
                </div>
            </div>
            {isOpen && <Modal setIsOpen={setIsOpen}/>}
        </div>
    );
}

export default Ingredients;