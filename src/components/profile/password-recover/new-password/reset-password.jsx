import style from './reset-password.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

const ResetPassword = () => {
    return (
        <>
            <div className={style.resetPassword}>
                <div className={style.formResetPassword}>
                    <p className="text text_type_main-medium">
                        Восстановление пароля
                    </p>

                    <form>
                        <Input
                            type={'password'}
                            placeholder={'Введите новый пароль'}
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
                        <Input
                            type={'text'}
                            placeholder={'Введите код из письма'}
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
                        Сохранить
                    </Button>

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