import styles from "../burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useCallback, useRef} from "react";
import {useDrag, useDrop} from 'react-dnd';
import {useAppDispatch} from "../../../hooks/use-app-redux";
import {deleteIngredients, sortIngredients} from "../../../services/slice/constructor-slice";

const BurgerConstructorElement = ({name, price, image_mobile, _id, index}) => {

    const dispatch = useAppDispatch();

    const deleteMainAndSauce = useCallback(() => {
        dispatch(deleteIngredients())
    })

    return (
        <li className={styles.liConstructorElement}
            key={_id}
        >
            <DragIcon type='primary'/>
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image_mobile}
                handleClose={deleteMainAndSauce}
            />
        </li>
    );
};

export default BurgerConstructorElement;