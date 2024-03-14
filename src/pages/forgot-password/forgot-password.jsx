import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import style from "./forgot-password.module.css";
import {useState} from "react";
import {forgotPasswordEmail} from "../../utils/api";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../components/loader/loader";


const ForgotPassword = () => {

    const [login, setLogin] = useState('');
    const ForgotSignIn = (e) => setLogin(e.target.value);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const sendEmail = (e) => {
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
                            placeholder={'E-mail'}
                            onChange={ForgotSignIn}
                            value={login}
                            name={'email'}
                            errorText={'Ошибка'}
                            size={'default'}
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
                    {/*<div>{resetPassword}</div>*/}
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;