import React, {useState} from "react";
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import Order from "./order/order";


const BurgerConstructor = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.mainBurgerConstructor}>
            <div className={styles.burgerConstructor}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={'img'}
                />
                <div className={styles.constructorElement}>
                    <DragIcon type='primary'/>
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={'img'}
                    />
                </div>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={'img'}
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
                {isOpen && <Modal children={<Order/>} setIsOpen={setIsOpen}/>}
            </div>
        </div>
    );
}

export default BurgerConstructor;