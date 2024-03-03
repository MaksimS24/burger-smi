import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import style from "./password-recover.module.css";


const PasswordRecover = () => {
    return (
        <>
            <div className={style.passwordRecover}>
                <div className={style.formPasswordRecover}>

                    <p className="text text_type_main-medium">
                        Восстановление пароля
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
                    </form>

                    <Button htmlType="button" type="primary" size="medium" extraClass="mb-10">
                        Восстановить
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

export default PasswordRecover;