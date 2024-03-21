import styles from "./burger-constructor-element.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, useCallback, useRef} from "react";
import {useDrag, useDrop} from 'react-dnd';
import {useAppDispatch} from "../../../hooks/use-app-redux";
import {deleteIngredients, sortIngredients} from "../../../services/slice/constructor-slice";
import {ingredientConstructorPropsTypes} from "../../../utils/types/props-types";
import PropTypes from "prop-types";
import {BurgerConstructor} from "../../../utils/types/types-ingredients";
import type { Identifier, XYCoord } from 'dnd-core';

interface BurgerConstructorElement {
    ingredientData: BurgerConstructor,
    index: number,
}

interface DndConstructor {
    _uuid: string,
    index: number,
    type: string,
}

const BurgerConstructorElement: FC<BurgerConstructorElement> = ({ingredientData, index}) => {

    const {name, price, image_mobile, _uuid} = ingredientData;

    const dispatch = useAppDispatch();
    const refConstructorElement = useRef<HTMLDivElement>(null);

    const deleteMainAndSauce = useCallback(() => {
        dispatch(deleteIngredients(_uuid))
    }, [dispatch, _uuid])

    // DND (drag, перемещение ингредиентов внутри списка)
    const cardDrop = {_uuid, index};

    const [{drop}, drag] = useDrag({
        type: 'burgerConstructor',
        item: cardDrop,
        collect: (monitor) => {
            const result = {
                dataId: monitor.getHandlerId(),
                isDragging: monitor.isDragging() ? 1 : 1,
                drop: monitor.isDragging() ? styles.drop : ""
            }
            return result
        },
    });

    // DND (drop, перемещение ингредиентов внутри списка)
    const [{dataId}, dropElement] = useDrop<DndConstructor, void, {dataId: Identifier | null}>({
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
            const clientOffset = monitor.getClientOffset() as XYCoord
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
    drag(dropElement(refConstructorElement));

    return (
        <li className={styles.liConstructorElement}
            key={_uuid}
            data-handler-id={dataId}
        >
            {/*Начинки и соусы*/}
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

BurgerConstructorElement.propTypes = {
    ingredientData: ingredientConstructorPropsTypes.isRequired,
    index: PropTypes.number.isRequired,
}
