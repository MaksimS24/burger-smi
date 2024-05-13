import style from './loader.module.css';
import {ReactSVG} from "react-svg";
import React from "react";
import loader from '../../images/loader.svg'

const Loader = () => {
    return (
        <div className={style.backgroundLoader}>
            <div className={style.loader}>
                <ReactSVG
                    beforeInjection={(svg) => {
                        svg.classList.add('loader')
                    }}
                    src={loader}
                />
            </div>
        </div>
    );
};

export default Loader;