import style from './profile-edit.module.css';
import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, FormEvent, useEffect, useState} from "react";
import {getCookie} from "../../../utils/cookie";
import { IEditProfile } from '../../../utils/types/types-api';
import {useAppDispatch, useAppSelector} from "../../../services/selectors/use-typed-selector";
import {requestForEditingFetch} from "../../../services/slice/profile-slice";

const ProfileEdit: FC = () => {

    //Cookie
    const accessToken = getCookie('accessToken') as string;

    const {name, email} = useAppSelector((state) => state.profile.user);

    //Use name
    const [nameProfile, setNameProfile] = useState(name);
    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setNameProfile(e.target.value);

    //Use e-mail
    const [emailProfile, setEmailProfile] = useState(email);
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmailProfile(e.target.value);

    //Use password
    const [password, setPassword] = useState('');
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    //Undo profile info
    const undoInfo = () => {
        setNameProfile(name);
        setEmailProfile(email);
        setPassword('')
    }

    //Profile editing
    const dispatch = useAppDispatch();
    const isEditProfile = async (data: IEditProfile) => {
        dispatch(requestForEditingFetch(data))
    }

    const toEditingProfile = async (e: FormEvent) => {
        e.preventDefault();
        await isEditProfile({name: nameProfile, email: emailProfile, password, accessToken})
    }

    //Active buttons
    const [activeButton, setActiveButton] = useState(false);
    useEffect(() => {
        if (nameProfile !== name || emailProfile !== email || password !== '') {
            setActiveButton(true);
        } else {
            setActiveButton(false);
        }
    }, [nameProfile, emailProfile, password, name, email]);

    return (
        <>
            <div className={style.profileEdit}>

                <form className={style.formProfileEdit} onSubmit={toEditingProfile}>

                    <Input
                        placeholder='Имя'
                        type='text'
                        onChange={onChangeName}
                        value={nameProfile}
                        name='name'
                        size='default'
                        extraClass="mb-6"
                        icon="EditIcon"
                    />
                    <EmailInput
                        placeholder='Логин'
                        // @ts-ignore
                        type='email'
                        onChange={onChangeEmail}
                        value={emailProfile}
                        name='login'
                        extraClass="mb-6"
                        icon="EditIcon"
                    />
                    <Input
                        placeholder='Пароль'
                        onChange={onChangePassword}
                        value={password}
                        name='password'
                        extraClass="mt-6"
                        icon='EditIcon'
                    />
                    {activeButton && (
                        <div className='mt-6'>
                            <Button htmlType='submit' type='primary' size='medium'>
                                Сохранить
                            </Button>
                            <Button htmlType='button' type='secondary' size='medium' onClick={undoInfo}>
                                Отмена
                            </Button>
                        </div>
                    )
                    }
                </form>

            </div>
        </>
    );
};

export default ProfileEdit;