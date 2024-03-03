import style from './profile-info.module.css';
import {NavLink, Outlet} from "react-router-dom";

const ProfileInfo = () => {
    return (
        <>
            <div className={style.profileInfo}>
                <ul className={style.ulProfileInfo}>
                    <li>
                        <NavLink end to='profile-edit'
                                 className={({isActive}) => isActive ? `${style.link} ${style.active}` : style.link}
                        >
                            <p className="text text_type_main-medium">
                                Профиль
                            </p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink end to='orders'
                                 className={({isActive}) => isActive ? `${style.link} ${style.active}` : style.link}
                        >
                            <p className="text text_type_main-medium">
                                История заказов
                            </p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink end to='sign-out'
                                 className={({isActive}) => isActive ? `${style.link} ${style.active}` : style.link}
                        >
                            <p className="text text_type_main-medium">
                                Выход
                            </p>
                        </NavLink>
                    </li>
                </ul>
                <div className={`${style.textProfileInfo} text text_type_main-default text_color_inactive`}>
                    В этом разделе вы можете изменить свои персональные данные
                </div>
            </div>
            <Outlet/>
        </>
    );
};

export default ProfileInfo;