import React from "react";
import styles from './details-ingredient.module.css'
import {ingredients} from "../../../../utils/data";

const DetailsIngredient = () => {

    const details = ingredients.find((ingredient) =>
        ingredient._id === ingredient._id);

    return (
        <>
            <ul className={styles.ulDetailsIngredient} key={details._id}>
                <li>
                    <img src={details.image_large} alt={'img'}/>
                    <h2 className={"text text_type_main-medium mt-4 mb-8"}>{details.name}</h2>
                    <ul className={styles.ulDetails}>
                        <li className={styles.liCalories}>
                            <p className="text text_type_main-default">Калории, ккал</p>
                            <span className="text text_type_digits-default">{details.calories}</span>
                        </li>
                        <li className={styles.liProteins}>
                            <p className="text text_type_main-default">Белки, г</p>
                            <span className="text text_type_digits-default">{details.proteins}</span>
                        </li>
                        <li className={styles.liFat}>
                            <p className="text text_type_main-default">Жиры, г</p>
                            <span className="text text_type_digits-default">{details.fat}</span>
                        </li>
                        <li className={styles.liCarbohydrates}>
                            <p className="text text_type_main-default">Углеводы, г</p>
                            <span className="text text_type_digits-default">{details.carbohydrates}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </>
    )
}

export default DetailsIngredient;