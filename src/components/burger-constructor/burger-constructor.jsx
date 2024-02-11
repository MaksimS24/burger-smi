import React, {forwardRef, useMemo, useState} from "react";
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
    const ingredients = useSelector((state) => state.ingredients.ingredients);
    const {isOrderOpen} = useSelector((state) => state.order);
    const bun = useSelector((state) => state.constructorIngredients.bun);
    const mainAndSauce = useSelector((state) => state.constructorIngredients.mainAndSauce);

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
                    thumbnail={bun?.image_mobile}
                />

                <ul className={styles.constructorElement}>
                    {mainAndSauce?.map((ingredient, i) =>
                        <BurgerConstructorElement
                            {...ingredient}
                            key={ingredient._id}
                            index={i}
                        />
                    )}
                </ul>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun?.name} (низ)`}
                    price={bun?.price}
                    thumbnail={bun?.image_mobile}
                />
            </div>

            {isOrderOpen && <Modal
                children={<OrderDetails/>}
                closeModal={closeModalOrder}
            />}

            <div className={styles.check}>
                <div className={styles.pay}>
                    <p className="text text_type_digits-medium mr-2">0</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <div onClick={openModalOrder}>
                    <Button htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BurgerConstructor;