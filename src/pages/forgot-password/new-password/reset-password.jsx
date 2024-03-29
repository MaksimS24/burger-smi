import style from './reset-password.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {passwordSend} from "../../../utils/api";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../../components/loader/loader";

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const onChangePassword = (e) => setPassword(e.target.value);
    const [hidePassword, setHidePassword] = useState(true);
    const visionPassword = () => setHidePassword(!hidePassword);

    const [emailWithCode, setEmailWithCode] = useState('');
    const onChangeEmail = (e) => setEmailWithCode(e.target.value);

    const navigate = useNavigate();
    const {state} = useLocation();

    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.profile.isLoading)

    const sendPassword = (e) => {
        e.preventDefault();
        dispatch(passwordSend(password, emailWithCode)).then((data) => data.success ? navigate('/login', {replace: true}) : null)
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

                    <form onSubmit={sendPassword}>
                        <Input
                            placeholder='Введите новый пароль'
                            type={hidePassword ? 'password' : 'text'}
                            icon={hidePassword ? 'ShowIcon' : 'HideIcon'}
                            onChange={onChangePassword}
                            onIconClick={visionPassword}
                            value={password}
                            name='password'
                            size='default'
                            extraClass="mb-5"
                        />
                        <Input
                            placeholder='Введите код из письма'
                            type='text'
                            onChange={onChangeEmail}
                            value={emailWithCode}
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