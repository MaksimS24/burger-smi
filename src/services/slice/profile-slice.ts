import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
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
import {IApiLogout, IEditProfile, IForProfileEdit, ILoginUserInfo, ISignInUser} from "../../utils/types/types-api";

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

export const registerUserFetch = createAsyncThunk(
    'auth/register',
    registerUser,
);

export const loginUserFetch = createAsyncThunk<ISignInUser, ILoginUserInfo>(
    'user/login',
    loginUser,
);

export const profileInfoFetch = createAsyncThunk<IForProfileEdit>(
    'user/authentication',
    profileInfo,
);

export const requestForEditingFetch = createAsyncThunk<IForProfileEdit, IEditProfile>(
    'user/auth',
    requestForEditing,
);

export const logoutUserFetch = createAsyncThunk<IApiLogout>(
    'auth/logout',
    logoutUser,
);

export const passwordSendFetch = createAsyncThunk(
    'user/password-reset/reset',
    passwordSend,
);

export const forgotPasswordEmailFetch = createAsyncThunk(
    'user/password-reset',
    forgotPasswordEmail,
);

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            // Register user
            .addCase(registerUserFetch.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(registerUserFetch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.authUser = true;
                state.user = {
                    email: action.payload.user.email,
                    name: action.payload.user.name,
                };
                setCookie('accessToken', action.payload.accessToken);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
            .addCase(registerUserFetch.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            //Login
            .addCase(loginUserFetch.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(loginUserFetch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = {
                    email: action.payload.user.email,
                    name: action.payload.user.name,
                };
                state.authUser = true;
                setCookie('accessToken', action.payload.accessToken);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
            .addCase(loginUserFetch.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            //Auth
            .addCase(profileInfoFetch.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(profileInfoFetch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = {
                    email: action.payload.user.email,
                    name: action.payload.user.name,
                };
                state.authChecked = true;
                state.authUser = true;
            })
            .addCase(profileInfoFetch.rejected, (state) => {
                state.isLoading = false;
                state.authChecked = true;
            })

            //Request for edit
            .addCase(requestForEditingFetch.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(requestForEditingFetch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = {
                    email: action.payload.user.email,
                    name: action.payload.user.name,
                };
            })
            .addCase(requestForEditingFetch.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            //Logout
            .addCase(logoutUserFetch.pending, (state) => {
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(logoutUserFetch.fulfilled, (state) => {
                state.user = {
                    email: '',
                    name: '',
                };
                state.authUser = false;
                deleteCookie('accessToken');
                localStorage.removeItem('refreshToken');
            })
            .addCase(logoutUserFetch.rejected, (state) => {
                state.isLoading = true;
                state.isError = true;
            })

            //Email password
            .addCase(passwordSendFetch.pending, state => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(passwordSendFetch.fulfilled, (state) => {
                state.isLoading = false;
                state.send = true;
            })
            .addCase(passwordSendFetch.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            //Forgot password
            .addCase(forgotPasswordEmailFetch.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(forgotPasswordEmailFetch.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(forgotPasswordEmailFetch.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })


})

export default profileSlice.reducer;