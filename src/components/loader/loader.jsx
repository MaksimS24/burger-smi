import style from './loader.module.css';
import {ReactSVG} from "react-svg";
import React from "react";

const Loader = () => {
    return (
        <div className={style.loader}>
            <ReactSVG
                beforeInjection={(svg) => {
                    svg.classList.add('loader')
                }}
                src={'./loader.svg'}
            />
    </div>
    );
};

export default Loader;