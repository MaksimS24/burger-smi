import React from "react";
import styles from './modal-overlay.css'

const ModalOverlay = ({setIsOpen}) => {
    return(
        <div className={styles.backgroundModal} onClick={() => setIsOpen(false)}/>
    )
}

