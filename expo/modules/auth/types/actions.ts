export const SET_AUTH_PENDING = 'SET_AUTH_PENDING';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const SET_REGISTER_SUCCESS = 'SET_REGISTER_SUCCESS';
export const SET_REGISTER_ERROR = 'SET_REGISTER_ERROR';
export const SET_LOGOUT = 'SET_LOGOUT';
export const SAVE_APP_TOKEN = 'SAVE_APP_TOKEN';
export const INVALID_TOKEN = 'INVALID_TOKEN';
export const REFRESHING_TOKEN = 'REFRESHING_TOKEN';
export const TOKEN_REFRESHED = 'TOKEN_REFRESHED';

export interface SetAuthPending {
    type: typeof SET_AUTH_PENDING;
    authPending?: boolean;
}

export interface SetLoginSuccess {
    type: typeof SET_LOGIN_SUCCESS;
    authPending?: boolean | null;
    loggedIn?: boolean | null;
    loginError?: string | null;
    authToken: string;
    refreshToken: string;
}

export interface SetLoginError {
    type: typeof SET_LOGIN_ERROR;
    authPending?: boolean;
    loggedIn?: boolean;
    loginError: string | null;
}
export interface SetRegisterError {
    type: typeof SET_REGISTER_ERROR;
    regError: string | null;
}

export interface SetRegisterSuccess {
    type: typeof SET_REGISTER_SUCCESS;
    authPending?: boolean | null;
    regError?: boolean | null;
    registered?: boolean | null;
}

export interface SetLogout {
    type: typeof SET_LOGOUT;
    authToken?: boolean;
    refreshToken?: boolean;
    loggedIn?: boolean;
}

export interface SetInvalidToken {
    type: typeof INVALID_TOKEN;
    tokenIsValid: boolean;
}

export interface SetRefreshingToken {
    type: typeof REFRESHING_TOKEN;
    pendingRefreshingToken: boolean;
    tokenIsValid: boolean;
}

export interface SetTokenRefreshed {
    type: typeof TOKEN_REFRESHED;
}

export interface SaveAppToken {
    type: typeof SAVE_APP_TOKEN;
    authToken: string;
}

export type AuthActionTypes =
    | SetAuthPending
    | SetLoginSuccess
    | SetLoginError
    | SetRegisterError
    | SetRegisterSuccess
    | SetLogout
    | SetInvalidToken
    | SetRefreshingToken
    | SetTokenRefreshed
    | SaveAppToken;
