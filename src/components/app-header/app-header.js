import styles from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";


const AppHeader = () => {

    const [open, setOpen] = useState('');

    const unHover = () => {
        setOpen('')
    }

    return (
        <header>
            <div className={styles.containerHeader}>
                <nav>
                    {/*Конструктор*/}
                    <a className={styles.aConstructor} onMouseOver={() => setOpen('burgerIcon')} onMouseOut={unHover}>
                        <BurgerIcon type={open === 'burgerIcon' ? 'primary' : 'secondary'}/>
                        <p className={`ml-2`}>Конструктор</p>
                    </a>

                    {/*Лента заказов*/}
                    <a className={styles.aLineOrder} onMouseOver={() => setOpen('listIcon')} onMouseOut={unHover}>
                        <ListIcon type={open === 'listIcon' ? 'primary' : 'secondary'}/>
                        <p className={`ml-2`}>Лента заказов</p>
                    </a>
                </nav>

                {/*Лого*/}
                <a className={styles.logo}>
                    <Logo/>
                </a>

                {/*Личный кабинет*/}
                <span className={styles.lk}>
                <a className={styles.lkContainer} onMouseOver={() => setOpen('profileIcon')} onMouseOut={unHover}>
                    <ProfileIcon type={open === 'profileIcon' ? 'primary' : 'secondary'}/>
                    <p className={`ml-2`}>Личный кабинет</p>
                </a>
                </span>
            </div>
        </header>
    );
}

export default AppHeader;