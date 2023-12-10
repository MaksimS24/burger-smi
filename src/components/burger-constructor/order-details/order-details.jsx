import React from "react";
import styles from "./order-details.module.css";
import {ReactSVG} from "react-svg";

// Image
import imageDone from '../../../images/image-done.svg'


const OrderDetails = () => {
    return(
        <div className={styles.mainOrder}>

            <h2 className='text text_type_digits-large mt-10'>034536</h2>

            <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>

            <ReactSVG
                beforeInjection={(svg) => {
                    svg.classList.add('image-done')
                }}
                className="image-done mt-15 mb-15"
                src={imageDone}
            />

            <div>
                <p className='text text_type_main-default'>
                    Ваш заказ начали готовить
                </p>
                <p className='text text_type_main-default text_color_inactive mt-2 mb-10'>
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </div>
    )
}

export default OrderDetails;