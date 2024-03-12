import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import style from "./forgot-password.module.css";
import {useState} from "react";
import {forgotPasswordEmail} from "../../utils/api";
import {useDispatch} from "react-redux";


const ForgotPassword = () => {

    const [resetPassword, setResetPassword] = useState('');
    const [login, setLogin] = useState('');
    const ForgotSignIn = (e) => setLogin(e.target.value);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const sendEmail = () => {
        dispatch(forgotPasswordEmail());
    };
    const inEmail = async (e) => {
        e.preventDefault();
        await sendEmail(login).then((data) => {
            if (data.success) {
                setResetPassword();
                navigate('/reset-password', {replace: true, state: true});
            } else {
                setResetPassword(data.message)
            }
        });
    };

    return (
        <>
            <div className={style.passwordRecover}>
                <div className={style.formPasswordRecover}>

                    <p className="text text_type_main-medium">
                        Восстановление пароля
                    </p>

                    <form onSubmit={inEmail}>
                        <EmailInput
                            placeholder={'E-mail'}
                            onChange={ForgotSignIn}
                            value={login}
                            name={'login'}
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
                    <div>{resetPassword}</div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;