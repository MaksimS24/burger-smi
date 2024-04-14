import React, {useEffect} from "react";
import styles from '../modal.module.css';
import {FC} from "react";

interface ModalOverlayInterface {
    onCloseModal: () => void,
}
const ModalOverlay: FC<ModalOverlayInterface> = ({onCloseModal}) => {

    //Закрытие модального окна по Esc и по клику
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            e.key === 'Escape' && onCloseModal()
        };
        document.addEventListener('keyup', handleKeyPress, false);
        document.getElementById('root')?.classList.add('overflow');
        return () => {
            document.removeEventListener('keyup', handleKeyPress, false);
            document.getElementById('root')?.classList.remove('overflow');
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className={styles.backgroundModal} onClick={onCloseModal}/>
    )
}

export default ModalOverlay;
