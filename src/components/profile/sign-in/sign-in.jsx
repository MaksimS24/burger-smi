import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './sign-in.module.css';
import {Link} from "react-router-dom";

const SignIn = () => {
    return (
        <>
            <div className={style.signIn}>
                <div className={style.formSignIn}>
                    <p className="text text_type_main-medium">
                        Вход
                    </p>

                    <form>
                        <EmailInput
                            type={'email'}
                            placeholder={'E-mail'}
                            // onChange={e => setValue(e.target.value)}
                            // value={value}
                            name={'name'}
                            error={false}
                            // ref={inputRef}
                            // onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="mb-5"
                        />
                        <Input
                            type={'password'}
                            placeholder={'Пароль'}
                            // onChange={e => setValue(e.target.value)}
                            // value={password}
                            name={'password'}
                            error={false}
                            // ref={inputRef}
                            // onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="mb-5"
                        />
                    </form>
                    <Button htmlType="button" type="primary" size="medium" extraClass="mb-10">
                        Войти
                    </Button>

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

export default SignIn;