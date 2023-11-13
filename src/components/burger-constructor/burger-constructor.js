import React from "react";
import styles from './burger-constructor.module.css';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = () => {
    return (
        <div className={styles.mainBurgerConstructor}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={'img'}
                />
                <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail={'img'}
                />
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={'img'}
                />
            </div>
        </div>
    );
}

export default BurgerConstructor;