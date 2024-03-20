import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './register.module.css';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../utils/api";


const Register = () => {

    //Use name
    const [name, setName] = useState('');
    const onChangeName = (e) => setName(e.target.value);

    //Use e-mail
    const [email, setEmail] = useState('');
    const onChangeEmail = (e) => setEmail(e.target.value);

    //Use password
    const [password, setPassword] = useState('');
    const onChangePassword = (e) => setPassword(e.target.value);

    //Use hide the password
    const [passwordHide, setPasswordHide] = useState(true);
    const clickHidePassword = () => setPasswordHide(!passwordHide);

    //Error
    const errorRegister = useSelector((state) => state.profile.isError);

    //Register
    const dispatch = useDispatch();
    const registerProfile = async (data) => {
        return dispatch(registerUser(data));
    }

    const navigate = useNavigate();
    const sendProfile = async (e) => {
        e.preventDefault();
        registerProfile({name, email, password}).then((data) =>
            data?.payload.success ? navigate('/', {replace: true}) : errorRegister()
        );
    };


    return (
        <div className={style.registration}>
            <div className={style.textRegistration}>
                <p className="text text_type_main-medium">
                    Регистрация
                </p>

                {/*Форма регистрации*/}
                <form onSubmit={sendProfile}>
                    <Input
                        placeholder={'Имя'}
                        type={'text'}
                        onChange={onChangeName}
                        value={name}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mb-5"
                    />
                    <EmailInput
                        placeholder={'E-mail'}
                        type={'email'}
                        onChange={onChangeEmail}
                        value={email}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mb-5"
                    />
                    <Input
                        placeholder={'Пароль'}
                        type={passwordHide ? 'password' : 'text'}
                        icon={passwordHide ? 'ShowIcon' : 'HideIcon'}
                        onIconClick={clickHidePassword}
                        onChange={onChangePassword}
                        value={password}
                        name={'password'}
                        size={'default'}
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