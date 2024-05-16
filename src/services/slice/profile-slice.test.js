import profileReducer, {
    forgotPasswordEmailFetch,
    initialState,
    loginUserFetch, logoutUserFetch, passwordSendFetch,
    profileInfoFetch,
    registerUserFetch,
    requestForEditingFetch
} from "./profile-slice";
import {authUser, loginUser, logoutUser, registerUser} from "../test-utils/for-profile-slice";

//Slice
describe('Profile Slice', () => {

    it('Should return the initial state', () => {
        const result = profileReducer(undefined, {type: ''});
        expect(result).toEqual(initialState);
    });

    //Register
    it('Register pending', () => {
        const result = profileReducer({...initialState, isError: true}, registerUserFetch.pending());
        expect(result.isLoading).toBe(true);
        expect(result.isError).toEqual(false);
    });

    it('Register fulfilled', () => {
        const result = profileReducer({...initialState, isLoading: true}, registerUserFetch.fulfilled(registerUser));
        expect(result.isLoading).toBe(false);
        expect(result).toEqual(registerUser);
    });

    it('Register rejected', () => {
        const result = profileReducer({...initialState, isLoading: true}, registerUserFetch.rejected());
        expect(result.isLoading).toBe(false);
        expect(result.isError).toBe(true);
    });

    //Login
    it('Login pending', () => {
        const result = profileReducer({...initialState, isError: true}, loginUserFetch.pending());
        expect(result.isLoading).toBe(true);
        expect(result.isError).toBe(false);
    });

    it('Login fulfilled', () => {
        const result = profileReducer({...initialState, isLoading: true}, loginUserFetch.fulfilled(registerUser));
        expect(result.isLoading).toBe(false);
        expect(result).toEqual(registerUser);
    });

    it('Login rejected', () => {
        const result = profileReducer({...initialState, isLoading: true}, loginUserFetch.rejected());
        expect(result.isLoading).toBe(false);
        expect(result.isError).toBe(true);
    });

    //Auth
    it('Auth pending', () => {
        const result = profileReducer({...initialState, isError: true}, profileInfoFetch.pending());
        expect(result.isLoading).toBe(true);
        expect(result.isError).toBe(false);
    });

    it('Auth fulfilled', () => {
        const result = profileReducer({...initialState, isLoading: true}, profileInfoFetch.fulfilled(loginUser));
        expect(result.isLoading).toBe(false);
        expect(result.authChecked).toBe(true);
        expect(result).toEqual(loginUser);
    });

    it('Auth rejected', () => {
        const result = profileReducer({...initialState, isLoading: true}, profileInfoFetch.rejected());
        expect(result.isLoading).toBe(false);
        expect(result.authChecked).toBe(true);
        expect(result.isError).toBe(true);
    });

    //Request for edit
    it('Request for edit pending', () => {
        const result = profileReducer({...initialState, isError: true}, requestForEditingFetch.pending());
        expect(result.isLoading).toBe(true);
        expect(result.isError).toBe(false);
    });

    it('Request for edit fulfilled', () => {
        const result = profileReducer({...initialState, isLoading: true}, requestForEditingFetch.fulfilled(authUser));
        expect(result.isLoading).toBe(false);
        expect(result).toEqual(authUser);
    });

    it('Request for edit rejected', () => {
        const result = profileReducer({...initialState, isLoading: true}, requestForEditingFetch.rejected());
        expect(result.isLoading).toBe(false);
        expect(result.isError).toBe(true);
    });

    //Logout
    it('Logout pending', () => {
        const result = profileReducer({...initialState, isError: true}, logoutUserFetch.pending());
        expect(result.isLoading).toBe(true);
        expect(result.isError).toBe(false);
    });

    it('Logout fulfilled', () => {
        const result = profileReducer({...initialState, isLoading: true}, logoutUserFetch.fulfilled(logoutUser));
        expect(result.isLoading).toBe(false);
        expect(result).toEqual(logoutUser);
    });

    it('Logout rejected', () => {
        const result = profileReducer({...initialState, isLoading: true}, logoutUserFetch.rejected());
        expect(result.isLoading).toBe(false);
        expect(result.isError).toBe(true);
    });

    //Email password
    it('Email password pending', () => {
        const result = profileReducer({...initialState, isError: true}, passwordSendFetch.pending());
        expect(result.isLoading).toBe(true);
        expect(result.isError).toBe(false);
    });

    it('Email password fulfilled', () => {
        const result = profileReducer({...initialState, isLoading: true}, passwordSendFetch.fulfilled());
        expect(result.isLoading).toBe(false);
        expect(result.send).toBe(false);
    });

    it('Email password rejected', () => {
        const result = profileReducer({...initialState, isLoading: true}, passwordSendFetch.rejected());
        expect(result.isLoading).toBe(false);
        expect(result.isError).toBe(true);
    });

    //Forgot password
    it('Forgot password pending', () => {
        const result = profileReducer({...initialState, isError: true}, forgotPasswordEmailFetch.pending());
        expect(result.isLoading).toBe(true);
        expect(result.isError).toBe(false);
    });

    it('Forgot password fulfilled', () => {
        const result = profileReducer({...initialState, isLoading: true}, forgotPasswordEmailFetch.fulfilled());
        expect(result.isLoading).toBe(false);
        expect(result.send).toBe(true);
    });

    it('Forgot password rejected', () => {
        const result = profileReducer({...initialState, isLoading: true}, forgotPasswordEmailFetch.rejected());
        expect(result.isLoading).toBe(false);
        expect(result.isError).toBe(true);
    });

});

//Async Thunks
global.fetch = jest.fn();

describe('Profile Thunk', () => {

    it('Successfully registered', async () => {
        const mockRes = {
            success: true,
            user: {email: 'test@test.com', name: 'test', password: 'test123'},
        };
        fetch.mockResolvedValue({ok: true, json: () => Promise.resolve(mockRes)});

        const dispatchSpy = jest.fn();
        const thunkSpy = registerUserFetch({email: 'test@test.com', name: 'test', password: 'test123'});

        await thunkSpy(dispatchSpy);

        const {calls} = dispatchSpy.mock;
        expect(calls).toHaveLength(2);

        const [first, last] = calls;
        expect(first[0].type).toBe(registerUserFetch.pending().type);
        expect(last[0].type).toBe(registerUserFetch.fulfilled().type);
        expect(last[0].payload).toBe(mockRes);
    });

    it('Error registering the profile', async () => {
        fetch.mockResolvedValue({ok: false, json: () => Promise.reject()});
        const dispatchSpy = jest.fn();
        const thunkSpy = registerUserFetch({email: 'test@test.com', name: 'test', password: 'test123'});

        await thunkSpy(dispatchSpy);
        const {calls} = dispatchSpy.mock;
        expect(calls).toHaveLength(2);

        const [first, last] = calls;
        expect(first[0].type).toBe(registerUserFetch.pending().type);
        expect(last[0].type).toBe(registerUserFetch.rejected().type);
    });

    it('Successfully login', async () => {
        const mockRes = {
            success: true,
            user: {email: 'test@test.com', name: 'test'},
        };
        fetch.mockResolvedValue({ok: true, json: () => Promise.resolve(mockRes)});
        const dispatchSpy = jest.fn();
        const thunkSpy = loginUserFetch({email: 'test@test.com', name: 'test', password: 'test123'});

        await thunkSpy(dispatchSpy);

        const {calls} = dispatchSpy.mock;
        expect(calls).toHaveLength(2);

        const [first, last] = calls;
        expect(first[0].type).toBe(loginUserFetch.pending().type);
        expect(last[0].type).toBe(loginUserFetch.fulfilled().type);
        expect(last[0].payload).toBe(mockRes);
    });

    it('Error login the profile', async () => {
        fetch.mockResolvedValue({ok: false, json: () => Promise.reject()});
        const dispatchSpy = jest.fn();
        const thunkSpy = loginUserFetch({email: 'test@test.com', name: 'test', password: 'test123'});

        await thunkSpy(dispatchSpy);

        const {calls} = dispatchSpy.mock;
        expect(calls).toHaveLength(2);

        const [first, last] = calls;
        expect(first[0].type).toBe(loginUserFetch.pending().type);
        expect(last[0].type).toBe(loginUserFetch.rejected().type);
    });

    it('Successfully completed request for profile information', async () => {
        const mockRes = {
            user: {email: 'test@test.com', name: 'test'},
            success: true,
        };
        fetch.mockResolvedValue({ok: true, json: () => Promise.resolve(mockRes)});
        const dispatchSpy = jest.fn();
        const thunkSpy = profileInfoFetch();

        await thunkSpy(dispatchSpy);

        const {calls} = dispatchSpy.mock;
        expect(calls).toHaveLength(2);

        const [first, last] = calls;
        expect(first[0].type).toBe(profileInfoFetch.pending().type);
        expect(last[0].type).toBe(profileInfoFetch.fulfilled().type);
        expect(last[0].payload).toBe(mockRes);
    });

    it('Error when receiving user information', async () => {
        fetch.mockResolvedValue({ok: false, json: () => Promise.reject()});
        const dispatchSpy = jest.fn();
        const thunkSpy = profileInfoFetch();

        await thunkSpy(dispatchSpy);

        const {calls} = dispatchSpy.mock;
        expect(calls).toHaveLength(2);

        const [first, last] = calls;
        expect(first[0].type).toBe(profileInfoFetch.pending().type);
        expect(last[0].type).toBe(profileInfoFetch.rejected().type);
    });

    it('Successful editing request', async () => {
        const mockRes = {
            user: {email: 'test@test.com', name: 'test'},
            success: true,
        };
        fetch.mockResolvedValue({ok: true, json: () => Promise.resolve(mockRes)});
        const dispatchSpy = jest.fn();
        const thunkSpy = requestForEditingFetch({
            email: 'test@test.com',
            name: 'test',
            password: 'test123',
        });

        await thunkSpy(dispatchSpy);

        const {calls} = dispatchSpy.mock;
        expect(calls).toHaveLength(2);

        const [first, last] = calls;
        expect(first[0].type).toBe(requestForEditingFetch.pending().type);
        expect(last[0].type).toBe(requestForEditingFetch.fulfilled().type);
        expect(last[0].payload).toBe(mockRes);
    });

    it('Error get editing info', async() => {
        fetch.mockResolvedValue({ok: false, json: () => Promise.reject()});
        const dispatchSpy = jest.fn();
        const thunkSpy = requestForEditingFetch({
            email: 'test@test.com',
            name: 'test',
            password: 'test123',
        });

        await thunkSpy(dispatchSpy);

        const {calls} = dispatchSpy.mock;
        expect(calls).toHaveLength(2);

        const [first, last] = calls;
        expect(first[0].type).toBe(requestForEditingFetch.pending().type);
        expect(last[0].type).toBe(requestForEditingFetch.rejected().type);
    });

    it('Success logout', async() => {
        const mockRes = {
            message: 'Logout successful',
            success: true,
        };
        fetch.mockResolvedValue({ok: true, json: () => Promise.resolve(mockRes)});
        const dispatchSpy = jest.fn();
        const thunkSpy = logoutUserFetch();

        await thunkSpy(dispatchSpy);

        const {calls} = dispatchSpy.mock;
        expect(calls).toHaveLength(2);

        const [first, last] = calls;
        expect(first[0].type).toBe(logoutUserFetch.pending().type);
        expect(last[0].type).toBe(logoutUserFetch.fulfilled().type);
        expect(last[0].payload).toBe(mockRes);
    });

    it('Error logout', async() => {
        fetch.mockResolvedValue({ok: false, json: () => Promise.reject()});
        const dispatchSpy = jest.fn();
        const thunkSpy = logoutUserFetch();

        await thunkSpy(dispatchSpy);

        const {calls} = dispatchSpy.mock;
        expect(calls).toHaveLength(2);

        const [first, last] = calls;
        expect(first[0].type).toBe(logoutUserFetch.pending().type);
        expect(last[0].type).toBe(logoutUserFetch.rejected().type);
    });

    it('Successfully forgot password', async() => {
        const mockRes = {
            success: true,
            message: 'Reset email sent',
        };
        fetch.mockResolvedValue({ok: true, json: () => Promise.resolve(mockRes)});
        const dispatchSpy = jest.fn();
        const thunkSpy = forgotPasswordEmailFetch({
            email: 'test@test.com',
        });

        await thunkSpy(dispatchSpy);

        const {calls} = dispatchSpy.mock;
        expect(calls).toHaveLength(2);

        const [first, last] = calls;
        expect(first[0].type).toBe(forgotPasswordEmailFetch.pending().type);
        expect(last[0].type).toBe(forgotPasswordEmailFetch.fulfilled().type);
        expect(last[0].payload).toBe(mockRes);
    });

    it('Error forgot password', async() => {
        fetch.mockResolvedValue({ok: false, json: () => Promise.reject()});
        const dispatchSpy = jest.fn();
        const thunkSpy = forgotPasswordEmailFetch();

        await thunkSpy(dispatchSpy);

        const {calls} = dispatchSpy.mock;
        expect(calls).toHaveLength(2);

        const [first, last] = calls;
        expect(first[0].type).toBe(forgotPasswordEmailFetch.pending().type);
        expect(last[0].type).toBe(forgotPasswordEmailFetch.rejected().type);
    });

    it('Successfully reset password', async() => {
        const mockRes = {
            success: true,
            message: 'Password reset',
        };
        fetch.mockResolvedValue({ok: true, json: () => Promise.resolve(mockRes)});
        const dispatchSpy = jest.fn();
        const thunkSpy = passwordSendFetch({
            password: 'test123',
            token: 'Bearer123...'
        });

        await thunkSpy(dispatchSpy);

        const {calls} = dispatchSpy.mock;
        expect(calls).toHaveLength(2);

        const [first, last] = calls;
        expect(first[0].type).toBe(passwordSendFetch.pending().type);
        expect(last[0].type).toBe(passwordSendFetch.fulfilled().type);
        expect(last[0].payload).toBe(mockRes);
    });

    it('Error reset password', async() => {
        fetch.mockResolvedValue({ok: false, json: () => Promise.reject()});
        const dispatchSpy = jest.fn();
        const thunkSpy = passwordSendFetch();

        await thunkSpy(dispatchSpy);

        const {calls} = dispatchSpy.mock;
        expect(calls).toHaveLength(2);

        const [first, last] = calls;
        expect(first[0].type).toBe(passwordSendFetch.pending().type);
        expect(last[0].type).toBe(passwordSendFetch.rejected().type);
    });

});
