import style from './not-found.module.css';
import {ReactSVG} from "react-svg";
import React from "react";
import error404 from "../../images/error-404.svg";

const NotFound = () => {
    return (
        <>
        <div className={style.notFound}>
            <ReactSVG
                beforeInjection={(svg) => {
                    svg.classList.add('error404')
                }}
                className="error404 mt-7 mb-15"
                src={error404}
            />
            <p className="text text_type_main-large">
                Опаньки
                <br/>
                <span className="text text_type_main-small">
                    Такой страницы нет. Ошибка 404!
                </span>

            </p>

        </div>
        </>
    )
}

export default NotFound;