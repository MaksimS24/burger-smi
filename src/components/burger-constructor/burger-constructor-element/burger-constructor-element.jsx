import styles from "./burger-constructor-element.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useCallback, useRef} from "react";
import {useDrag, useDrop} from 'react-dnd';
import {useAppDispatch} from "../../../hooks/use-app-redux";
import {deleteIngredients, sortIngredients} from "../../../services/slice/constructor-slice";
import {ingredientConstructorPropsTypes} from "../../../utils/types/props-types";
import IngredientCard from "../../burger-ingredients/ingredient-card/ingredient-card";

const BurgerConstructorElement = ({ingredientData, index}) => {

    IngredientCard.propTypes = {
        ingredientData: ingredientConstructorPropsTypes.isRequired,
    }

    const {name, price, image_mobile, _uuid} = ingredientData;

    const dispatch = useAppDispatch();
    const refConstructorElement = useRef(null);

    const deleteMainAndSauce = useCallback(() => {
        dispatch(deleteIngredients(_uuid))
    })

    const cardDrop = {_uuid, index};

    const [, drag] = useDrag({
        type: 'burgerConstructor',
        item: cardDrop,
        collect: (monitor) => {
            const result = {
                dataId: monitor.getHandlerId(),
                isDragging: monitor.isDragging() ? 1 : 1,
            }
            return result
        },
    });

    const [{dataId}, drop] = useDrop({
        accept: 'burgerConstructor',
        collect(monitor) {
            return {
                dataId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!refConstructorElement.current) {
                return
            }
            const dragIndex = item.index
            const dropIndex = index
            if (dragIndex === dropIndex) {
                return
            }
            const hoverBoundingRect = refConstructorElement.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < dropIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > dropIndex && hoverClientY > hoverMiddleY) {
                return
            }

            dispatch(sortIngredients({dragIndex, dropIndex}))
            item.index = dropIndex
        },
    })
    drag(drop(refConstructorElement));

    return (
        <li className={styles.liConstructorElement}
            key={_uuid}
            data-handler-id={dataId}
        >
            <div ref={refConstructorElement}>
                <DragIcon type='primary'/>
                <ConstructorElement
                    text={name || 'Начинки, соусы'}
                    price={price}
                    thumbnail={image_mobile}
                    handleClose={deleteMainAndSauce}
                    extraClass={drop}
                />
            </div>
        </li>
    );
};

export default BurgerConstructorElement;