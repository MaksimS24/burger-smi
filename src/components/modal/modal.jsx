import React from "react";
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import DetailsIngredient from "../burger-ingredients/ingredients/details-ingredient/details-ingredient";

const Modal = ({setIsOpen}) => {

    const children = <DetailsIngredient/>

    return (
        <>
            <div className={styles.backgroundModal} onClick={() => setIsOpen(false)}/>
            <div className={styles.centeredModal}>
                <div className={styles.modal}>
                    <div className={styles.headerModal}>
                        <h1 className={'text text_type_main-large'}>Детали ингредиента</h1>
                        <button className={styles.closeButton}>
                            <CloseIcon onClick={() => setIsOpen(false)} type="primary"/>
                        </button>
                    </div>
                    <div className={styles.childrenModal}>
                        {children}
                    </div>

                </div>
            </div>
        </>
    );
}

export default Modal;