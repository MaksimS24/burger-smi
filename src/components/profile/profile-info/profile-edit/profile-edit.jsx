import style from './profile-edit.module.css';
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

const ProfileEdit = () => {
    return (
        <>
            <div className={style.profileEdit}>
                <form className={style.formProfileEdit}>

                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        // onChange={''}
                        value={'text'}
                        name={'name'}
                        error={'error'}
                        size={'default'}
                        extraClass={"mb-6"}
                        icon="EditIcon"
                        onIconClick={''}
                        disabled={''}
                    />
                    <EmailInput
                        // onChange={''}
                        value={'email'}
                        name={'email'}
                        placeholder={'Логин'}
                        isIcon={true}
                        extraClass={"mb-6"}
                        error={''}
                    />
                    <PasswordInput
                        // onChange={''}
                        value={'password'}
                        name={'password'}
                        extraClass={"mt-6"}
                        icon="EditIcon"
                        error={''}
                    />
                </form>

            </div>
        </>
    );
};

export default ProfileEdit;