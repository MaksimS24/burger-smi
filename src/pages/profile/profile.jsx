import style from './profile.module.css';
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../utils/api";
import NotFound from "../not-found/not-found";

const Profile = () => {

    const dispatch = useDispatch();
    const logout = async () => {
        dispatch(logoutUser());
    }

    const navigate = useNavigate();
    const exitProfile = async (e) => {
        e.preventDefault();
        logout().then((data) => (data.payload?.success ? navigate('/login') : <NotFound/>));
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
                        <NavLink end to='sign-out'
                                 className={({isActive}) => isActive ? `${style.link} ${style.active}` : style.link}
                        >
                            <p className="text text_type_main-medium"
                               onClick={exitProfile}>
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