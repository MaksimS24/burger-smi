import React, {useCallback, useEffect} from "react";
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../../services/slice/ingredients-slice";

const Modal = ({title, children}) => {

    const {isOpen} = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    //Закрытие модального окна по Esc
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && isOpen) {
                return dispatch(closeModal());
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
            <div className={styles.backgroundModal} onClick={() => {
                dispatch(closeModal())
            }}/>

            <div className={styles.centeredModal}>
                <div className={styles.modal}>

                    <div className={styles.headerModal}>

                        <h1 className={'text text_type_main-large'}>
                            {title}
                        </h1>
                        <button className={styles.closeButton}>
                            <CloseIcon onClick={() => {
                                dispatch(closeModal())
                            }} type="primary"/>
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