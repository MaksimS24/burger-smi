import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import style from "./forgot-password.module.css";
import React, {FC, FormEvent, useState} from "react";
import {forgotPasswordEmail} from "../../utils/api";
import {useAppDispatch} from "../../hooks/use-app-redux";


const ForgotPassword: FC = () => {

    const [login, setLogin] = useState('');
    const ForgotSignIn = (e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const sendEmail = (e: FormEvent) => {
        e.preventDefault();
        dispatch(forgotPasswordEmail(login)).then(() => navigate('/reset-password', {replace: true, state: true}));
    };
    return (
        <>
            <div className={style.passwordRecover}>
                <div className={style.formPasswordRecover}>

                    <p className="text text_type_main-medium">
                        Восстановление пароля
                    </p>

                    <form onSubmit={sendEmail}>
                        <EmailInput
                            placeholder='E-mail'
                            onChange={ForgotSignIn}
                            value={login}
                            name='email'
                            //@ts-ignore
                            errorText='Ошибка'
                            size='default'
                            extraClass="mb-5"
                        />
                        <Button htmlType="submit" type="primary" size="medium" extraClass="mb-10">
                            Восстановить
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

export default ForgotPassword;