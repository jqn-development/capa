import { ThunkDispatch } from 'redux-thunk';
import { Dispatch } from 'react';
import { AsyncStorage } from 'react-native';
import AuthApi from './auth.api';
import * as ErrorReducer from '../errors/error.reducer';
import * as AuthReducer from './auth.reducer';
import * as UserReducer from '../user/user.reducer';
import NavigationService from '../../navigation/service';
import { AuthActionTypes } from './types/actions';
import { UserActionTypes } from '../user/types/actions';
import { ErrorsActionTypes } from '../errors/types/actions';

const saveItem = async (item: string, selectedValue: string) => {
    try {
        await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
        throw error;
    }
};

export const saveRefreshToken = (refreshToken: string) => (
    dispatch: Dispatch<AuthActionTypes | ErrorsActionTypes>
) => {
    return AuthApi.refreshToken(refreshToken)
        .then(response => {
            if (response.success) {
                dispatch(AuthReducer.saveAppToken(response.authToken));
                saveItem('authToken', response.authToken).catch(error => {
                    dispatch(ErrorReducer.asyncError(error));
                });
            }
        })
        .catch(error => {
            dispatch(ErrorReducer.showError(error));
        });
};

// used on app startup
export const checkAuthStatus = () => async (
    dispatch: ThunkDispatch<{}, {}, ErrorsActionTypes | AuthActionTypes>
) => {
    try {
        const authToken = await AsyncStorage.getItem('authToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (authToken != null && refreshToken != null) {
            dispatch(AuthReducer.setLoginSuccess(authToken, refreshToken));
        }
        // return authToken;
    } catch (error) {
        dispatch(ErrorReducer.asyncError(error));
        // return false;
    }
};

export const logout = () => async (
    dispatch: ThunkDispatch<{}, {}, ErrorsActionTypes | AuthActionTypes>
) => {
    dispatch(AuthReducer.setLogout());
    try {
        await AsyncStorage.removeItem('authToken');
        // App.startApp();
    } catch (error) {
        dispatch(ErrorReducer.asyncError(error));
    }
};

export const clearRegError = () => (
    dispatch: ThunkDispatch<{}, {}, ErrorsActionTypes | AuthActionTypes>
) => {
    dispatch(AuthReducer.setRegisterError(null));
};

export const register = (name: string, email: string, password: string) => async (
    dispatch: ThunkDispatch<{}, {}, ErrorsActionTypes | AuthActionTypes>
) => {
    const first = name;
    const last = name;
    dispatch(AuthReducer.setAuthPending());
    return AuthApi.register(first, last, email, password)
        .then(response => {
            if (response.success) {
                dispatch(AuthReducer.setRegisterSuccess());
                return Promise.resolve(true);
            }
            dispatch(AuthReducer.setRegisterError(response.message));
            return Promise.reject(new Error('fail'));
        })
        .catch(error => {
            dispatch(ErrorReducer.showError(error));
            return Promise.reject(new Error('fail'));
        });
};

export const login = (email: string, password: string) => (
    dispatch: ThunkDispatch<{}, {}, ErrorsActionTypes | AuthActionTypes | UserActionTypes>
) => {
    dispatch(AuthReducer.setAuthPending());
    return AuthApi.login(email, password)
        .then(response => {
            if (response.success) {
                dispatch(AuthReducer.setLoginSuccess(response.authToken, response.refreshToken));
                dispatch(
                    UserReducer.setUserDetails(
                        response.id,
                        response.email,
                        response.firstName,
                        response.lastName
                    )
                );
                // Save Tokens
                saveItem('authToken', response.authToken)
                    .then(() => {
                        saveItem('refreshToken', response.refreshToken)
                            .then(() => {
                                NavigationService.navigate('Home', {});
                                //NavigationService.navigate('UploadDetail', {});
                            })
                            .catch(error => {
                                dispatch(ErrorReducer.asyncError(error));
                            });
                    })
                    .catch(error => {
                        dispatch(ErrorReducer.asyncError(error));
                    });
            } else {
                dispatch(AuthReducer.setLoginError(response.message));
            }
        })
        .catch(error => {
            dispatch(ErrorReducer.showError(error));
        });
};

// test function on the login and logged in areas to show the JWT is working
export const checkAuthTest = () => async (
    dispatch: ThunkDispatch<{}, {}, ErrorsActionTypes | AuthActionTypes>
) => {
    try {
        const token: string | null = await AsyncStorage.getItem('authToken');
        return AuthApi.checkAuthTest(token).then(response => {
            if (response.success) {
                // console.log('Success: ', response.message);
            } else {
                // console.log('Error: ', response);
            }
        });
    } catch (error) {
        dispatch(ErrorReducer.asyncError(error));
        return false;
    }
};
