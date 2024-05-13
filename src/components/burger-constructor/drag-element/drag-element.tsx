import React, {FC} from "react";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../burger-constructor.module.css';
import chevron from '../../../images/chevron.png'

const DragElement: FC = () => {
    return (
        // Заглушка начального состояния "Начинки и соусы"
        <div className={styles.constructorElement}>
            <ConstructorElement
                text={'Добавьте начинки и соусы'}
                price={0}
                thumbnail={chevron}
            />
        </div>
    )
}
export default DragElement;