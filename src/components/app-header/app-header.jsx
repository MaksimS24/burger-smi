import styles from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {Link, NavLink} from "react-router-dom";


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
                    <span className={styles.constructor}>
                    <NavLink
                        to='/'
                        className={styles.aConstructor}
                        onMouseOver={() => setOpen('burgerIcon')}
                        onMouseOut={unHover}>
                        <BurgerIcon type={open === 'burgerIcon' ? 'primary' : 'secondary'}/>
                        <p className={`ml-2`}>Конструктор</p>
                    </NavLink>
                    </span>

                    {/*Лента заказов*/}
                    <span className={styles.lineOrder}>
                    <NavLink
                        to='/'
                        className={styles.aLineOrder}
                        onMouseOver={() => setOpen('listIcon')}
                        onMouseOut={unHover}
                    >
                        <ListIcon type={open === 'listIcon' ? 'primary' : 'secondary'}/>
                        <p className={`ml-2`}>Лента заказов</p>
                    </NavLink>
                    </span>
                </nav>

                {/*Лого*/}
                <Link to='/' className={styles.logo}>
                    <Logo/>
                </Link>

                {/*Личный кабинет*/}
                <span className={styles.lk}>
                <NavLink
                    to='/profile'
                    className={styles.lkContainer}
                    onMouseOver={() => setOpen('profileIcon')}
                    onMouseOut={unHover}
                >
                    <ProfileIcon type={open === 'profileIcon' ? 'primary' : 'secondary'}/>
                    <p className={`ml-2`}>Личный кабинет</p>
                </NavLink>
                </span>
            </div>
        </header>
    );
}

export default AppHeader;