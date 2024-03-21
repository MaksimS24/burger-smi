import React, {useMemo} from "react";
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import {useSelector} from "react-redux";
import BurgerConstructorElement from "./burger-constructor-element/burger-constructor-element";
import {useDrop} from "react-dnd";
import {useAppDispatch} from "../../hooks/use-app-redux";
import {addIngredients} from "../../services/slice/constructor-slice";
import {orderCloseModal} from "../../services/slice/order-slice";
import {fetchOrders} from "../../utils/api";
import DragElement from "./drag-element/drag-element";

const BurgerConstructor = () => {

    const dispatch = useAppDispatch();
    const {isOrderOpen} = useSelector((state) => state.order);
    const bun = useSelector((state) => state.constructorIngredients.bun);
    const mainAndSauce = useSelector((state) => state.constructorIngredients.mainAndSauce);
    const ingredientsAdd = useSelector((state) => state.constructorIngredients.ingredientsAdd);
    const number = useSelector((state) => state.order.dataOrder.order.number);
    const plug = useSelector((state) => state.constructorIngredients.plug)

    // DND (drop)
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
    const sendOrder = () => {
        const ingredients = [...mainAndSauce, {...bun}, {...bun}].map((ingredientId) => ingredientId._id);
        const dataIngredientsId = {ingredients};
        dispatch(fetchOrders(dataIngredientsId));
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
                        disabled={buttonWork}
                        htmlType="button"
                        type="primary"
                        size="large"
                        onClick={sendOrder}
                    >
                        {statusOrder}
                    </Button>
                </div>
            </div>

            {/*Модальное окно с номером заказа*/}
            {isOrderOpen && <Modal
                children={<OrderDetails number={number}/>}
                closeModal={closeModalOrder}
            />}
        </div>
    );
}

export default BurgerConstructor;