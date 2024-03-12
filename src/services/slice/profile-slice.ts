import {createSlice} from "@reduxjs/toolkit";
import {
    forgotPasswordEmail,
    loginUser,
    logoutUser,
    passwordSend,
    profileInfo,
    registerUser,
    requestForEditing
} from "../../utils/api";
import {deleteCookie, setCookie} from "../../utils/cookie";

export interface User {
    user: {
        email: string,
        name: string,
    }
    isLoading: boolean,
    isError: boolean,
    authUser: boolean,
    authChecked: boolean,
    send: boolean,
}

const initialState: User = {
    user: {
        email: '',
        name: ''
    },
    isLoading: false,
    isError: false,
    authUser: false,
    authChecked: false,
    send: false
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            // Register user
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = {
                    email: action.payload.user.email,
                    name: action.payload.user.name,
                };
                state.authChecked = true;
                state.authUser = true;
                setCookie('accessToken', action.payload.accessToken);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            //Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = {
                    email: action.payload.user.email,
                    name: action.payload.user.name,
                };
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            //Auth
            .addCase(profileInfo.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(profileInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = {
                    email: action.payload.user.email,
                    name: action.payload.user.name,
                };
                state.authChecked = true;
                state.authUser = true;
            })
            .addCase(profileInfo.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            //Request for edit
            .addCase(requestForEditing.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(requestForEditing.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = {
                    email: action.payload.user.email,
                    name: action.payload.user.name,
                };
            })
            .addCase(requestForEditing.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            //Logout
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = {
                    email: '',
                    name: '',
                };
                state.authUser = false;
                deleteCookie('accessToken');
                localStorage.removeItem('refreshToken');
            })
            .addCase(logoutUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            .addCase(passwordSend.pending, state => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(passwordSend.fulfilled, (state)=> {
                state.isLoading = false;
                state.send = true;
            })
            .addCase(passwordSend.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            //Forgot password
            .addCase(forgotPasswordEmail.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(forgotPasswordEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(forgotPasswordEmail.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })


})

export default profileSlice.reducer;