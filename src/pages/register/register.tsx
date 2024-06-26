import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './register.module.css';
import {Link, useNavigate} from "react-router-dom";
import React, {FC, FormEvent, useState} from "react";
import { IRegister } from "../../utils/types/types-api";
import {useAppDispatch, useAppSelector} from "../../services/selectors/use-typed-selector";
import {registerUserFetch} from "../../services/slice/profile-slice";


const Register: FC = () => {

    //Use name
    const [name, setName] = useState('');
    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

    //Use e-mail
    const [email, setEmail] = useState('');
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

    //Use password
    const [password, setPassword] = useState('');
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    //Use hide the password
    const [passwordHide, setPasswordHide] = useState(true);
    const clickHidePassword = () => setPasswordHide(!passwordHide);

    //Error
    const errorRegister = useAppSelector((state) => state.profile.isError);

    //Register
    const dispatch = useAppDispatch();
    const isRegisterProfile = async (data: IRegister) => {
        return dispatch(registerUserFetch(data));
    }

    const navigate = useNavigate();
    const toSendProfile = async (e: FormEvent) => {
        e.preventDefault();
        isRegisterProfile({name, email, password}).then(() =>
            registerUserFetch.fulfilled.match(isRegisterProfile) ? navigate('/', {replace: true}) : errorRegister
        );
    };

    return (
        <div className={style.registration}>
            <div className={style.textRegistration}>
                <p className="text text_type_main-medium">
                    Регистрация
                </p>

                {/*Форма регистрации*/}
                <form onSubmit={toSendProfile}>
                    <Input
                        placeholder='Имя'
                        type='text'
                        onChange={onChangeName}
                        value={name}
                        name='name'
                        error={false}
                        errorText='Ошибка'
                        size='default'
                        extraClass="mb-5"
                    />
                    <EmailInput
                        placeholder='E-mail'
                        onChange={onChangeEmail}
                        value={email}
                        name='name'
                        // @ts-ignore
                        errorText='Ошибка'
                        size='default'
                        extraClass="mb-5"
                    />
                    <Input
                        placeholder='Пароль'
                        type={passwordHide ? 'password' : 'text'}
                        icon={passwordHide ? 'ShowIcon' : 'HideIcon'}
                        onIconClick={clickHidePassword}
                        onChange={onChangePassword}
                        value={password}
                        name='password'
                        size='default'
                        extraClass="mb-5"
                    />
                    <Button htmlType="submit" type="primary" size="medium" extraClass="mb-10">
                        Зарегистрироваться
                    </Button>
                </form>

                <p className="text text_type_main-small">
                    Уже зарегистрированы? {' '}
                    <Link to='/login' className={style.link}>
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;