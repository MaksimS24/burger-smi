import React, {useMemo} from "react";
import styles from "./ingredient-card.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";
import {ingredientPropsTypes} from "../../../utils/types/props-types";
import PropTypes from "prop-types";

const IngredientCard = ({ingredientData, onClick}) => {

    IngredientCard.propTypes = {
        ingredientData: ingredientPropsTypes.isRequired,
        onClick: PropTypes.func.isRequired
    }

    const {name, price, image} = ingredientData;

    const [{isDrag}, dragTarget] = useDrag(() => ({
        type: 'ingredients',
        item: ingredientData,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        }),
    }));

    const mainAndSauce = useSelector((state) => state.constructorIngredients.mainAndSauce);
    const bun = useSelector((state) => state.constructorIngredients.bun);

    let allIngredients = [].concat(mainAndSauce, bun, bun);
    const counter = useMemo( () => {
        return allIngredients.filter((ingredient) => ingredient._id === ingredientData._id).length
    }, [allIngredients]);

    const handleClick = () => {
        onClick(ingredientData._id);
    };

    return (
        <li className={styles.liIngredients}
            onClick={handleClick}
            style={{isDrag}}
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