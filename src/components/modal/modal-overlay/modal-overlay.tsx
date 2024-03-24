import React from "react";
import styles from '../modal.module.css';
import {FC} from "react";

interface ModalOverlayInterface {
    closeModal: () => void,
}
const ModalOverlay: FC<ModalOverlayInterface> = ({closeModal}) => {

    return (
        <div className={styles.backgroundModal} onClick={closeModal}/>
    )
}

export default ModalOverlay;
