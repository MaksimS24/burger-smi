import React, {useMemo} from "react";
import styles from './ingredient-details.module.css'
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

const IngredientDetails = () => {

    const {id} = useParams();
    const ingredients = useSelector((state) => state.ingredients.ingredients);

    const details = useMemo(() =>
        ingredients.find(
            (ingredient) => ingredient._id === id), [id, ingredients]
    );

    return (
        <>
            <ul className={styles.ulDetailsIngredient}>
                <li>
                    <img src={details.image_large} alt={'img'}/>
                    <h2 className={"text text_type_main-medium mt-4 mb-8"}>{details.name}</h2>
                    <ul className={styles.ulDetails}>
                        <li className={styles.liCalories}>
                            <div className="text text_type_main-default">Калории, ккал</div>
                            <span className="text text_type_digits-default">{details.calories}</span>
                        </li>
                        <li className={styles.liProteins}>
                            <div className="text text_type_main-default">Белки, г</div>
                            <span className="text text_type_digits-default">{details.proteins}</span>
                        </li>
                        <li className={styles.liFat}>
                            <div className="text text_type_main-default">Жиры, г</div>
                            <span className="text text_type_digits-default">{details.fat}</span>
                        </li>
                        <li className={styles.liCarbohydrates}>
                            <div className="text text_type_main-default">Углеводы, г</div>
                            <span className="text text_type_digits-default">{details.carbohydrates}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </>
    )
}

export default IngredientDetails;