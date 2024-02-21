import React, {forwardRef, useEffect, useMemo, useState} from "react";
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import {useSelector} from "react-redux";
import BurgerConstructorElement from "./burger-constructor-element/burger-constructor-element";
import {useDrop} from "react-dnd";
import {useAppDispatch} from "../../hooks/use-app-redux";
import {addIngredients} from "../../services/slice/constructor-slice";
import {orderCloseModal, orderOpenModal} from "../../services/slice/order-slice";

const BurgerConstructor = () => {

    const dispatch = useAppDispatch();
    const {isOrderOpen} = useSelector((state) => state.order);
    const bun = useSelector((state) => state.constructorIngredients.bun);
    const mainAndSauce = useSelector((state) => state.constructorIngredients.mainAndSauce);
    const ingredientsAdd = useSelector((state) => state.constructorIngredients.ingredientsAdd);


    const [{isHover}, dropIngredients] = useDrop({
        accept: 'ingredients',
        item: {},
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop: (item) => {
            dispatch(addIngredients(item));
        },
    });

    const buttonWork = mainAndSauce && ingredientsAdd ? null : styles.buttonOn;
    const statusButton = null
        ? 'Оформляем заказ'
        : buttonWork ? 'Добавьте ингредиент' : 'Оформить заказ'

    const calculate = useMemo(() =>
            [...mainAndSauce, {...bun}, {...bun}].reduce((total, amount) =>
                total + (amount.price === undefined ? 0 : amount.price), 0),
        [mainAndSauce, bun]);

    const openModalOrder = () => {
        dispatch(orderOpenModal())
    }
    const closeModalOrder = () => {
        dispatch(orderCloseModal())
    }

    return (
        <div className={styles.mainBurgerConstructor}
             ref={dropIngredients}
             style={{isHover}}
        >
            <div className={styles.burgerConstructor}>

                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun?.name} (верх)`}
                    price={bun?.price}
                    thumbnail={bun?.image_mobile || '/up-chevron.png'}
                />

                <ul className={styles.constructorElement}>
                    {mainAndSauce?.map((ingredient, index) =>
                        <BurgerConstructorElement
                            {...ingredient}
                            key={ingredient._uuid}
                            index={index}
                        />
                    )}
                </ul>

                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun?.name} (низ)`}
                    price={bun?.price}
                    thumbnail={bun?.image_mobile || '/down-chevron.png'}
                />
            </div>

            {isOrderOpen && <Modal
                children={<OrderDetails/>}
                closeModal={closeModalOrder}
            />}

            <div className={styles.check}>
                <div className={styles.pay}>
                    <p className="text text_type_digits-medium mr-2">{calculate ? calculate : 0}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <div onClick={openModalOrder}>
                    <Button
                        disabled={buttonWork}
                        htmlType="button"
                        type="primary"
                        size="large"
                    >
                        {statusButton}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BurgerConstructor;