import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './registration.module.css';
import {Link} from "react-router-dom";

const Registration = () => {
    return (
        <div className={style.registration}>
            <div className={style.textRegistration}>
                <p className="text text_type_main-medium">
                    Регистрация
                </p>

                <form>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
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
                    Зарегистрироваться
                </Button>

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

export default Registration;