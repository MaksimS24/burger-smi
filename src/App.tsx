import React, {FC, useEffect} from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import Main from "./components/main/main";
import {Routes, Route, useLocation} from "react-router-dom";
import NotFound from "./pages/not-found/not-found";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import ForgotPassword from "./pages/forgot-password/forgot-password";
import ResetPassword from "./pages/forgot-password/new-password/reset-password";
import Profile from "./pages/profile/profile";
import ProfileEdit from "./pages/profile/profile-edit/profile-edit";
import ProtectedRouteElement from "./components/protected-route-element/protected-route-element";
import {useDispatch} from "react-redux";
import {profileInfo} from "./utils/api";

function App() {

    const location = useLocation();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(profileInfo())
    // }, [dispatch]);


    return (
        <div className="App">
            <AppHeader/>
            <main>
                <Routes location={location}>
                    <Route path='/' element={<Main/>}/>
                    <Route path='/error' element={<NotFound/>}/>
                    <Route path='/register' element={<ProtectedRouteElement element={<Register/>} onlyUnAuth={true}/>}/>
                    <Route path='/login' element={<ProtectedRouteElement element={<Login/>} onlyUnAuth={true}/> }/>
                    <Route path='/forgot-password' element={<ProtectedRouteElement element={<ForgotPassword/>} onlyUnAuth={true}/> }/>
                    <Route path='/reset-password' element={<ProtectedRouteElement element={<ResetPassword/>} onlyUnAuth={true}/> }/>
                    <Route path='/profile/*' element={<ProtectedRouteElement element={<Profile/>} onlyUnAuth={true}/>}>
                        <Route path='profile-edit' element={<ProfileEdit/>}/>
                    </Route>
                </Routes>
            </main>
        </div>
    );
}

export default App;
