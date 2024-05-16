import {initialState} from "../slice/profile-slice";

export const registerUser = {
    ...initialState,
    authUser: true,
    user: {
        email: 'sam@example.com',
        name: 'Sam',
    },
};

export const loginUser = {
    ...initialState,
    authChecked: true,
    authUser: true,
    user: {
        email: 'sam@example.com',
        name: 'Sam',
    },
};

export const authUser = {
    ...initialState,
    authUser: false,
    user: {
        email: 'sam@example.com',
        name: 'Sam',
    },
};

export const logoutUser = {
    ...initialState,
    authUser: false,
    user: {
        email: '',
        name: '',
    },
};