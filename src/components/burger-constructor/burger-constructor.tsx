import React, {FC, useMemo} from "react";
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import BurgerConstructorElement from "./burger-constructor-element/burger-constructor-element";
import {useDrop} from "react-dnd";
import {useAppDispatch, useAppSelector} from "../../hooks/use-app-redux";
import {addIngredients} from "../../services/slice/constructor-slice";
import {orderCloseModal} from "../../services/slice/order-slice";
import {fetchOrders} from "../../utils/api";
import DragElement from "./drag-element/drag-element";
import {IIngredient} from '../../utils/types/types-ingredients';

const BurgerConstructor: FC = () => {

    const dispatch = useAppDispatch();
    const {isOrderOpen} = useAppSelector((state) => state.order);
    const bun = useAppSelector((state) => state.constructorIngredients.bun);
    const mainAndSauce = useAppSelector((state) => state.constructorIngredients.mainAndSauce);
    const ingredientsAdd = useAppSelector((state) => state.constructorIngredients.ingredientsAdd);
    const number = useAppSelector((state) => state.order.dataOrder.order.number);
    const isLoading = useAppSelector((state) => state.order.isLoading);
    const plug = useAppSelector((state) => state.constructorIngredients.plug)

    // DND (drop)
    // @ts-ignore
    const [{background}, dropIngredients] = useDrop<IIngredient, unknown, {background: string}>({
        accept: 'ingredients',
        collect: (monitor) => ({
            background: monitor.isOver() ? '#131316' : "",
        }),
        drop: (item) => {
            dispatch(addIngredients(item));
        },
    });

    // Начальное состояние кнопки "Оформить заказ"
    const buttonWork = mainAndSauce && ingredientsAdd ? null : styles.buttonOn;
    const statusOrder = null
        ? 'Оформляем Ваш заказ'
        : buttonWork ? 'Соберите бургер' : 'Оформить заказ'

    // Калькулятор суммы
    const calculate = useMemo(() =>
            [...mainAndSauce, {...bun}, {...bun}].reduce((total, amount) =>
                total + (amount.price === undefined ? 0 : amount.price), 0),
        [mainAndSauce, bun]);

    // Отправка заказа и отображение его номера
    const isSendOrder = () => {
        const ingredients = [...mainAndSauce, {...bun}, {...bun}].map((ingredientId) => ingredientId._id);
        const dataIngredientsId: {ingredients: string[]} = {ingredients};
        dispatch(fetchOrders(dataIngredientsId));
    }

    const toCloseModalOrder = () => {
        dispatch(orderCloseModal())
    }

    return (
        <div className={styles.mainBurgerConstructor}
             ref={dropIngredients}
             style={{background}}
        >
            <div className={styles.burgerConstructor}>

                {/*Булка верх*/}
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun?.name} (верх)`}
                    price={bun?.price}
                    thumbnail={bun?.image_mobile || '/up-chevron.png'}
                />

                {/*Начинки и соусы*/}
                <ul className={styles.constructorElement}>
                    {plug ?
                        (
                            <DragElement/>
                        ) : (

                            mainAndSauce.map((ingredient, index) =>
                                <BurgerConstructorElement
                                    ingredientData={ingredient}
                                    key={ingredient._uuid}
                                    index={index}
                                />
                            )
                        )}
                </ul>

                {/*Булка низ*/}
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun?.name} (низ)`}
                    price={bun?.price}
                    thumbnail={bun?.image_mobile || '/down-chevron.png'}
                />
            </div>

            {/*Кнопка "Оформить заказ"*/}
            <div className={styles.check}>
                <div className={styles.pay}>
                    <p className="text text_type_digits-medium mr-2">{calculate ? calculate : 0}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <div>
                    <Button
                        disabled={plug || isLoading}
                        htmlType="button"
                        type="primary"
                        size="large"
                        onClick={isSendOrder}
                    >
                        {statusOrder}
                    </Button>
                </div>
            </div>

            {/*Модальное окно с номером заказа*/}
            {isOrderOpen && number && <Modal
                children={<OrderDetails number={number}/>}
                onCloseModal={toCloseModalOrder}
            />}
        </div>
    );
}

export default BurgerConstructor;