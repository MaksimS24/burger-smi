import style from './reset-password.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import React, {FC, FormEvent, useState} from "react";
import {passwordSend} from "../../../utils/api";
import Loader from "../../../components/loader/loader";
import {useAppDispatch, useAppSelector} from "../../../hooks/use-app-redux";
import { IApiSendPassword } from '../../../utils/types/types-api';

const ResetPassword: FC = () => {

    const [password, setPassword] = useState('');
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const [hidePassword, setHidePassword] = useState(true);
    const isVisionPassword = () => setHidePassword(!hidePassword);

    const [token, setToken] = useState('');
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value);

    const navigate = useNavigate();
    const {state} = useLocation();

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.profile.isLoading);

    const isEmailToken = async (data: IApiSendPassword) => {
        return dispatch(passwordSend(data));
    }

    const toSendPassword = async (e: FormEvent) => {
        e.preventDefault();
        isEmailToken({password, token})
            .then((data: any) => data.success ? navigate('/login', {replace: true}) : null)
    };

    if (isLoading) {
        return <Loader/>
    }

    if (!state) {
        return <Navigate to='/' replace/>;
    }
    return (
        <>
            <div className={style.resetPassword}>
                <div className={style.formResetPassword}>
                    <p className="text text_type_main-medium">
                        Восстановление пароля
                    </p>

                    <form onSubmit={toSendPassword}>
                        <Input
                            placeholder='Введите новый пароль'
                            type={hidePassword ? 'password' : 'text'}
                            icon={hidePassword ? 'ShowIcon' : 'HideIcon'}
                            onChange={onChangePassword}
                            onIconClick={isVisionPassword}
                            value={password}
                            name='password'
                            size='default'
                            extraClass="mb-5"
                        />
                        <Input
                            placeholder='Введите код из письма'
                            type='text'
                            onChange={onChangeEmail}
                            value={token}
                            name='emailWithCode'
                            errorText='Ошибка'
                            size='default'
                            extraClass="mb-5"
                        />

                        <Button htmlType="submit" type="primary" size="medium" extraClass="mb-10">
                            Сохранить
                        </Button>

                    </form>

                    <p className="text text_type_main-small">
                        Вспомнили пароль? {' '}
                        <Link to='/login' className={style.link}>
                            Войти
                        </Link>
                    </p>

                </div>
            </div>
        </>
    );
};

export default ResetPassword;