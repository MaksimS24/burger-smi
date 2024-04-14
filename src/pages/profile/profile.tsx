import style from './profile.module.css';
import {NavLink, Outlet} from "react-router-dom";
import {FC} from "react";
import {useAppDispatch} from "../../services/selectors/use-typed-selector";
import {logoutUserFetch} from "../../services/slice/profile-slice";

const Profile: FC = () => {

    const dispatch = useAppDispatch();
    const isLogout = () => {
        dispatch(logoutUserFetch());
    }

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
                        <NavLink end to='/login'
                                 className={({isActive}) => isActive ? `${style.link} ${style.active}` : style.link}
                        >
                            <p className="text text_type_main-medium"
                               onClick={isLogout}>
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

export default Profile;