import React, {FC, PropsWithChildren, useEffect} from "react";
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface ModalInterface {
    title?: string,
    children: React.ReactNode,
    closeModal: () => void,
}

const Modal: FC<PropsWithChildren<ModalInterface>> = ({title, children, closeModal}) => {

    //Закрытие модального окна по Esc и по клику  
    useEffect(() => {
        const keyPress = (e: KeyboardEvent) => {
            e.key === 'Escape' && closeModal()
        };
        document.addEventListener('keyup', keyPress, false);
        document.getElementById('root')?.classList.add('overflow');
        return () => {
            document.removeEventListener('keyup', keyPress, false);
            document.getElementById('root')?.classList.remove('overflow');
        }
        // eslint-disable-next-line
    }, []);


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
