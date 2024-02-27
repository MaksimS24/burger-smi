import React from "react";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './drag-element.module.css';

const DragElement = () => {
    return (
        <div className={styles.dragElement}>
            <ConstructorElement
                text={'Добавьте начинки и соусы'}
                price={'0'}
                thumbnail={'/chevron.png'}
            />
        </div>
    )
}
export default DragElement;