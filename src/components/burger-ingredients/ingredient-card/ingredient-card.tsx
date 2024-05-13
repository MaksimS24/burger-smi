import React, {FC, useMemo} from "react";
import styles from "./ingredient-card.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {useNavigate} from "react-router-dom";
import {IIngredient} from "../../../utils/types/types-ingredients";
import {useAppSelector} from "../../../services/selectors/use-typed-selector";

interface IIngredientCardInterface {
    ingredientData: IIngredient,
}

const IngredientCard: FC<IIngredientCardInterface> = ({ingredientData}) => {

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
    }, [ingredientData._id, allIngredients]);

    const navigate = useNavigate();
    const toViewModal = () => {
        navigate(`/ingredients/${ingredientData._id}`, {state: {modal: true, id: ingredientData._id}})
    }

    return (
        <li className={styles.liIngredients}
            onClick={toViewModal}
            style={{opacity}}
            ref={dragTarget}
            data-cy={`ingredients-${ingredientData._id}`}
        >
            {counter ? <Counter count={counter} size={"default"} extraClass={styles.count}/> : null}
            <img src={image}
                 alt={'burger-ingredient-card'}
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
