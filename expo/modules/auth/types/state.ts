export interface AuthState {
    authPending: boolean;
    loggedIn: boolean;
    registered: boolean;
    loginError: string | null;
    regError: boolean | null;
    authToken: string | null;
    refreshToken: string | null | undefined;
    tokenIsValid: boolean | null;
    pendingRefreshingToken: boolean | null;
}
