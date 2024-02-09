import React, {useMemo, useState} from "react";
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import {useSelector} from "react-redux";
import BurgerConstructorElement from "./burger-constructor-element/burger-constructor-element";
import {useDrop} from "react-dnd";
import {useAppDispatch} from "../../hooks/use-app-redux";
import {addIngredients} from "../../services/slice/constructor-slice";
import {Ingredient} from "../../utils/types/types-ingredients";


const BurgerConstructor = () => {

    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useAppDispatch();
    const ingredients = useSelector((state) => state.ingredients.ingredients);
    const bun = useSelector((state) => state.constructorIngredients.bun);
    const bunArray = useMemo(() =>
        ingredients.data?.filter((ingredientsId) => ingredientsId.type === 'bun'), [ingredients]);
    console.log(bunArray);

    const [{isHover}, dropIngredients] = useDrop(() => ({
        accept: "ingredients",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(_item) {
            dispatch(addIngredients(bunArray));
        },
    }));

    return (
        <div className={styles.mainBurgerConstructor} ref={dropIngredients} style={{isHover}}>
            {isOpen &&
                <Modal
                    children={<OrderDetails/>}
                    closeModal={setIsOpen}
                />
            }

            <div className={styles.burgerConstructor}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun?.name} (верх)`}
                    price={bun?.price}
                    thumbnail={bun?.image_mobile}
                />

                <ul className={styles.constructorElement}>
                    {ingredients?.data?.map((ingredient, i) =>
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
            <div className={styles.check}>
                <div className={styles.pay}>
                    <p className="text text_type_digits-medium mr-2">0</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <div onClick={() => setIsOpen(true)}>
                    <Button htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BurgerConstructor;