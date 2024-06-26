import styles from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, NavLink, useLocation} from "react-router-dom";
import {FC} from "react";

const AppHeader: FC = () => {

    const {pathname} = useLocation();

    return (
        <header>
            <div className={styles.containerHeader}>
                <nav>
                    {/*Конструктор*/}
                    <span className={styles.lineOrder}>
                    <NavLink
                        to='/'
                        className={({isActive}) => isActive ? `${styles.aLink} ${styles.active}` : styles.aLink}
                    >
                        <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'}/>
                        <p className={`ml-2`}>Конструктор</p>
                    </NavLink>
                    </span>

                    {/*Лента заказов*/}
                    <span className={styles.lineOrder}>
                    <NavLink
                        to='/feed'
                        className={({isActive}) => isActive ? `${styles.aLink} ${styles.active}` : styles.aLink}
                    >
                        <ListIcon type={pathname === '/feed' ? 'primary' : 'secondary'}/>
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
                    to='/profile/profile-edit'
                    className={({isActive}) => isActive ? `${styles.lkContainer} ${styles.active}` : styles.lkContainer}
                >
                    <ProfileIcon type={pathname === '/profile' ? 'primary' : 'secondary'}/>
                    <p className={`ml-2`}>Личный кабинет</p>
                </NavLink>
                </span>
            </div>
        </header>
    );
}

export default AppHeader;