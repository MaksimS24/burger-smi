import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './login.module.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../utils/api";

const Login = () => {

    //Use e-mail
    const [email, setEmail] = useState('');
    const onChangeEmail = e => setEmail(e.target.value);

    //Use password
    const [password, setPassword] = useState('');
    const onChangePassword = (e) => setPassword(e.target.value);

    //Use hide the password
    const [passwordHide, setPasswordHide] = useState(true);
    const clickHidePassword = () => setPasswordHide(!passwordHide);

    //Error
    const errorLogin = useSelector((state) => state.profile.isError);

    const navigate = useNavigate();
    const {locationState} = useLocation();

    //Login
    const dispatch = useDispatch();

    const sendLogin = async (e) => {
        e.preventDefault();
        const loginProfile = await dispatch(loginUser({email, password}));
        if (loginUser.fulfilled.match(loginProfile)) {
            navigate(`${locationState ? locationState.pathname : '/'}`, {replace: true});
        } else {
            errorLogin('');
        }
    };

    return (
        <>
            <div className={style.signIn}>
                <div className={style.formSignIn}>
                    <p className="text text_type_main-medium">
                        Вход
                    </p>

                    {/*Форма входа */}
                    <form onSubmit={sendLogin}>
                        <EmailInput
                            placeholder='E-mail'
                            type='email'
                            onChange={onChangeEmail}
                            value={email}
                            name='login'
                            error={false}
                            errorText='Ошибка. Введите E-mail.'
                            size='default'
                            extraClass="mb-5"
                            autoComplete='email'
                        />
                        <Input
                            placeholder='Пароль'
                            type={passwordHide ? 'password' : 'text'}
                            icon={passwordHide ? 'ShowIcon' : 'HideIcon'}
                            onIconClick={clickHidePassword}
                            onChange={onChangePassword}
                            value={password}
                            name='password'
                            error={false}
                            errorText='Ошибка'
                            size='default'
                            extraClass="mb-5"
                            autoComplete='current-password'
                        />
                        <Button htmlType="submit" type="primary" size="medium" extraClass="mb-10">
                            Войти
                        </Button>
                    </form>

                    <p className="text text_type_main-small">
                        Вы - новый пользователь? {' '}
                        <Link to='/register' className={style.link}>
                            Зарегистрироваться
                        </Link>
                    </p>

                    <p className="text text_type_main-small">
                        Забыли пароль? {' '}
                        <Link to='/forgot-password' className={style.link}>
                            Восстановить пароль
                        </Link>
                    </p>

                </div>

            </div>

        </>
    );
};

export default Login;