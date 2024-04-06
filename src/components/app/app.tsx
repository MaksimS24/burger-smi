import React, {useCallback, useEffect} from 'react';
import style from './app.module.css';
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";
import NotFound from "../../pages/not-found/not-found";
import Register from "../../pages/register/register";
import Login from "../../pages/login/login";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/forgot-password/new-password/reset-password";
import Profile from "../../pages/profile/profile";
import ProfileEdit from "../../pages/profile/profile-edit/profile-edit";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import {profileInfo} from "../../utils/api";
import Loader from "../loader/loader";
import IngredientDetails from "../burger-ingredients/ingredient-card/ingredient-details/ingredient-details";
import {useAppDispatch, useAppSelector} from "../../hooks/use-app-redux";
import Modal from "../modal/modal";
import Feed from "../feed/feed";

function App() {

    const isLoading = useAppSelector((state) => state.profile.isLoading);
    const location = useLocation();
    const background = location.state && location.state.modal;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(profileInfo())
    }, [dispatch]);

    const navigate = useNavigate();
    const onCloseModal = useCallback(() => {
        navigate(-1)
    }, [navigate])

    return (
        <div className={style.app}>
            <AppHeader/>
            <main>
                <Routes location={background || location}>
                    <Route path='/' element={<Main/>}/>
                    <Route path='/ingredients/:id' element={<IngredientDetails/>}/>
                    <Route path='/register' element={<ProtectedRouteElement element={<Register/>} onlyUnAuth/>}/>
                    <Route path='/login' element={<ProtectedRouteElement element={<Login/>} onlyUnAuth/>}/>
                    <Route path='/forgot-password'
                           element={<ProtectedRouteElement element={<ForgotPassword/>} onlyUnAuth/>}/>
                    <Route path='/reset-password'
                           element={<ProtectedRouteElement element={<ResetPassword/>} onlyUnAuth/>}/>
                    <Route path='/profile/*' element={<ProtectedRouteElement element={<Profile/>}/>}>
                        <Route path='profile-edit' element={<ProfileEdit/>}/>
                        <Route path='profile/orders' element={''}></Route>
                    </Route>
                    <Route path='/feed' element={<Feed/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
                {background && (
                    <Routes>
                        <Route path='/ingredients/:id'
                               element={
                                   <Modal title={'Детали ингредиента'} onCloseModal={onCloseModal}>
                                       <IngredientDetails/>
                                   </Modal>
                               }/>
                    </Routes>
                )}
                {isLoading ? (<Loader/>) : null}
            </main>
        </div>
    );
}

export default App;
