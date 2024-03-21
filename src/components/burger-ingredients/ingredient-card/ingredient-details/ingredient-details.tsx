import React, {useMemo} from "react";
import styles from './ingredient-details.module.css'
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../hooks/use-app-redux";
import {useEffect} from "react";
import {fetchIngredients} from "../../../../utils/api";

const IngredientDetails = () => {

    const {id} = useParams();

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    const ingredients = useAppSelector((state) => state.ingredients.ingredients);

    const details = useMemo(() =>
        ingredients.find((ingredient: any) => ingredient?._id === id), [id, ingredients]
    );

    return (
        <div className={styles.ulDetailsIngredient}>
            <img src={details?.image_large} alt={'img'}/>
            <h2 className={"text text_type_main-medium mt-4 mb-8"}>{details?.name}</h2>
            <ul className={styles.ulDetails}>
                <li className={styles.liCalories}>
                    <div className="text text_type_main-default">Калории, ккал</div>
                    <span className="text text_type_digits-default">{details?.calories}</span>
                </li>
                <li className={styles.liProteins}>
                    <div className="text text_type_main-default">Белки, г</div>
                    <span className="text text_type_digits-default">{details?.proteins}</span>
                </li>
                <li className={styles.liFat}>
                    <div className="text text_type_main-default">Жиры, г</div>
                    <span className="text text_type_digits-default">{details?.fat}</span>
                </li>
                <li className={styles.liCarbohydrates}>
                    <div className="text text_type_main-default">Углеводы, г</div>
                    <span className="text text_type_digits-default">{details?.carbohydrates}</span>
                </li>
            </ul>
        </div>
    )
}

export default IngredientDetails;