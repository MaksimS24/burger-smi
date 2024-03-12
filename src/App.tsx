import React from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import Main from "./components/main/main";
import {Routes, Route} from "react-router-dom";
import NotFound from "./pages/not-found/not-found";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import ForgotPassword from "./pages/forgot-password/forgot-password";
import ResetPassword from "./pages/forgot-password/new-password/reset-password";
import Profile from "./pages/profile/profile";
import ProfileEdit from "./pages/profile/profile-edit/profile-edit";

function App() {

    return (
        <div className="App">
            <AppHeader/>
            <main>
                <Routes>
                    <Route path='/' element={<Main/>}/>
                    <Route path='/error' element={<NotFound/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/forgot-password' element={<ForgotPassword/>}/>
                    <Route path='/reset-password' element={<ResetPassword/>}/>
                    <Route path='/profile/*' element={<Profile/>}>
                        <Route path='profile-edit' element={<ProfileEdit/>}/>
                    </Route>
                </Routes>
            </main>
        </div>
    );
}

export default App;
