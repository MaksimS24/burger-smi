import React, {useCallback, useEffect, useState} from "react";
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";

const Modal = ({title, children, setIsOpen}) => {

    //Закрытие модального окна по Esc
    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && setIsOpen) {
                setIsOpen(false);
            }
        },
        [setIsOpen]
    );

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );


    return (
        <>
            <div className={styles.backgroundModal} onClick={() => setIsOpen(false)}/>

            <div className={styles.centeredModal}>
                <div className={styles.modal}>

                    <div className={styles.headerModal}>

                        <h1 className={'text text_type_main-large'}>
                            {title}
                        </h1>
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