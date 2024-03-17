import React, {useEffect} from "react";
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Modal = ({title, children, closeModal}) => {

    //Закрытие модального окна по Esc и по клику  
    useEffect(() => {
        const keyPress = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };
        document.addEventListener('keyup', keyPress, false);
        document.getElementById('root').classList.add('overflow');
        return () => {
            document.removeEventListener('keydown', keyPress, false);
            document.getElementById('root').classList.remove('overflow');
        }
    });


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

Modal.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.node
    ]).isRequired,
    closeModal: PropTypes.func.isRequired,
    title: PropTypes.string,
}