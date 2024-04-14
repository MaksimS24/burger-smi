import React, {FC, PropsWithChildren} from "react";
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";
import {createPortal} from "react-dom";

const modalRoot = document.getElementById('modal') as HTMLElement;

interface ModalInterface {
    title?: string,
    children: React.ReactNode,
    onCloseModal: () => void,
}

const Modal: FC<PropsWithChildren<ModalInterface>> = ({title, children, onCloseModal}) => {

    return createPortal (
        <>
            <ModalOverlay onCloseModal={onCloseModal}/>

            <div className={styles.centeredModal}>
                <div className={styles.modal}>

                    <div className={styles.headerModal}>

                        <h1 className={'text text_type_main-large'}>
                            {title}
                        </h1>
                        <button className={styles.closeButton}>
                            <CloseIcon onClick={onCloseModal} type="primary"/>
                        </button>

                    </div>

                    <div className={styles.childrenModal}>
                        {children}
                    </div>

                </div>
            </div>
        </>,
        modalRoot
    );
}

export default Modal;
