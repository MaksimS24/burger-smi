import React, {useCallback, useEffect} from "react";
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({title, children, closeModal}) => {

    //Закрытие модального окна по Esc
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape') {
                closeModal();
            }
        }
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
            <div className={styles.backgroundModal} onClick={closeModal}/>

            <div className={styles.centeredModal}>
                <div className={styles.modal}>

                    <div className={styles.headerModal}>

                        <h1 className={'text text_type_main-large'}>
                            {title}
                        </h1>
                        <button className={styles.closeButton}>
                            <CloseIcon onClick={closeModal} type="primary"/>
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