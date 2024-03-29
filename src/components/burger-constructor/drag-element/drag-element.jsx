import React from "react";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../burger-constructor.module.css';

const DragElement = () => {
    return (
        // Заглушка начального состояния "Начинки и соусы"
        <div className={styles.constructorElement}>
            <ConstructorElement
                text={'Добавьте начинки и соусы'}
                price={'0'}
                thumbnail={'/chevron.png'}
            />
        </div>
    )
}
export default DragElement;