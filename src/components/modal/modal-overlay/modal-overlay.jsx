import React from "react";
import styles from './modal-overlay.css'
import Modal from "../modal";
import PropTypes from "prop-types";

const ModalOverlay = ({closeModal}) => {

    return (
        <div className={styles.backgroundModal} onClick={closeModal}/>
    )
}

export default ModalOverlay;

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired
}