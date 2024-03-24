import React, {FC, useMemo} from "react";
import styles from "./ingredient-card.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../hooks/use-app-redux";
import {Ingredient} from "../../../utils/types/types-ingredients";

interface IngredientCardInterface {
    ingredientData: Ingredient,
}

const IngredientCard: FC<IngredientCardInterface> = ({ingredientData}) => {

    const {name, price, image} = ingredientData;

    const [{opacity}, dragTarget] = useDrag(() => ({
        type: 'ingredients',
        item: ingredientData,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.2 : 1
        }),
    }));

    const mainAndSauce = useAppSelector((state) => state.constructorIngredients.mainAndSauce);
    const bun = useAppSelector((state) => state.constructorIngredients.bun);

    // @ts-ignore
    let allIngredients = [].concat(mainAndSauce, bun, bun);
    const counter = useMemo( () => {
        // @ts-ignore
        return allIngredients.filter((ingredient) => ingredient._id === ingredientData._id).length
    }, [allIngredients]);

    const navigate = useNavigate();
    const viewModal = () => {
        navigate(`/ingredients/${ingredientData._id}`, {state: {modal: true, id: ingredientData._id}})
    }

    return (
        <li className={styles.liIngredients}
            onClick={viewModal}
            style={{opacity}}
        >
            {counter ? <Counter count={counter} size={"default"} extraClass={styles.count}/> : null}
            <img src={image}
                 alt={'burger-ingredient-card'}
                 ref={dragTarget}
            />
            <div className={'text text_type_digits-default'}>
                {price}
                <CurrencyIcon type={"primary"}/>
            </div>
            <div className={'text text_type_main-default'}>
                {name}
            </div>
        </li>
    );

};

export default IngredientCard;
