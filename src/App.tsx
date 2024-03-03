import React from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import Main from "./components/main/main";
import {Routes, Route} from "react-router-dom";
import NotFound from "./components/not-found/not-found";
import Registration from "./components/profile/registration/registration";
import SignIn from "./components/profile/sign-in/sign-in";
import PasswordRecover from "./components/profile/password-recover/password-recover";
import ResetPassword from "./components/profile/password-recover/new-password/reset-password";
import ProfileInfo from "./components/profile/profile-info/profile-info";
import ProfileEdit from "./components/profile/profile-info/profile-edit/profile-edit";

function App() {

    return (
        <div className="App">
            <AppHeader/>
            <main>
                <Routes>
                    <Route path='/' element={<Main/>}/>
                    <Route path='/error' element={<NotFound/>}/>
                    <Route path='/register' element={<Registration/>}/>
                    <Route path='/login' element={<SignIn/>}/>
                    <Route path='/forgot-password' element={<PasswordRecover/>}/>
                    <Route path='/reset-password' element={<ResetPassword/>}/>
                    <Route path='/profile/*' element={<ProfileInfo/>}>
                        <Route path='profile-edit' element={<ProfileEdit/>}/>
                    </Route>
                </Routes>
            </main>
        </div>
    );
}

export default App;
