import style from './not-found.module.css';
import {ReactSVG} from "react-svg";
import React from "react";

const NotFound = () => {
    return (
        <>
        <div className={style.notFound}>
            <ReactSVG
                beforeInjection={(svg) => {
                    svg.classList.add('image-done')
                }}
                className="image-done mt-15 mb-15"
                src={'./error-404.svg'}
            />
            <p className="text text_type_main-large">
                Опаньки
                <br/>
                <p className="text text_type_main-small">
                    Такой страницы нет. Ошибка 404!
                </p>

            </p>

        </div>
        </>
    )
}

export default NotFound;