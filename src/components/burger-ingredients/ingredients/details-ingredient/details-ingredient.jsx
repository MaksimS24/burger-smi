import React from "react";
import styles from './details-ingredient.module.css'
import {data} from "../../../../utils/data";

const DetailsIngredient = () => {

    const details = data.find((ingredient) =>
        ingredient._id === data._id);

    return (
        <>

                <li className={styles.liDetailsIngredient}>
                    <img src={details?.image} alt={'img'}/>
                    <h2>{details?.name}</h2>
                    {/*<ul>*/}
                    {/*    <li>*/}
                    {/*        <p>Калории, ккал</p>*/}
                    {/*        <span>{data.calories}</span>*/}
                    {/*    </li>*/}
                    {/*    <li>*/}
                    {/*        <p>Белки, г</p>*/}
                    {/*        <span>{data.proteins}</span>*/}
                    {/*    </li>*/}
                    {/*    <li>*/}
                    {/*        <p>Жиры, г</p>*/}
                    {/*        <span>{data.fat}</span>*/}
                    {/*    </li>*/}
                    {/*    <li>*/}
                    {/*        <p>Углеводы, г</p>*/}
                    {/*        <span>{data.carbohydrates}</span>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </li>
        </>
    )
}

export default DetailsIngredient;