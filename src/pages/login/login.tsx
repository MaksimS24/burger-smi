import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './login.module.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {FC, FormEvent, useState} from "react";
import { ILoginUserInfo } from "../../utils/types/types-api";
import {useAppDispatch, useAppSelector} from "../../services/selectors/use-typed-selector";
import {loginUserFetch} from "../../services/slice/profile-slice";

const Login: FC = () => {

    //Use e-mail
    const [emailLogin, setEmailLogin] = useState('');
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmailLogin(e.target.value);

    //Use password
    const [passwordLogin, setPasswordLogin] = useState('');
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPasswordLogin(e.target.value);

    //Use hide the password
    const [passwordHide, setPasswordHide] = useState(true);
    const clickHidePassword = () => setPasswordHide(!passwordHide);

    //Error
    const errorLogin = useAppSelector((state) => state.profile.isError);

    const navigate = useNavigate();
    const {state} = useLocation();

    //Login
    const dispatch = useAppDispatch();
    const isLoginProfile = async (data: ILoginUserInfo) => {
        return dispatch(loginUserFetch(data));
    }

    const toSendLogin = async (e: FormEvent) => {
        e.preventDefault();
        isLoginProfile({email: emailLogin, password: passwordLogin}).then(() =>
            loginUserFetch.fulfilled.match(isLoginProfile) ? navigate(`${state ? state.pathname : '/'}`, {replace: true})
                :
                errorLogin
        );
    };

    return (
        <>
            <div className={style.signIn}>
                <div className={style.formSignIn}>
                    <p className="text text_type_main-medium">
                        Вход
                    </p>

                    {/*Форма входа */}
                    <form onSubmit={toSendLogin}>
                        <EmailInput
                            placeholder='E-mail'
                            // @ts-ignore
                            type='email'
                            onChange={onChangeEmail}
                            value={emailLogin}
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
                            value={passwordLogin}
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