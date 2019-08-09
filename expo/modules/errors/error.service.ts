import { connectionError, removeError } from './error.reducer';
import { Dispatch } from 'redux';

export const removeErrors = () => (dispatch: Dispatch ) => {
    dispatch(removeError());
    return false;
};

// token errors handled here to keep out of service files
export const handleTokenErrors = ( response: object ) => ( dispatch: Dispatch ) => {
    if (!response.success) {
        if (response.code && response.code === 'invalidToken') {
            dispatch({ type: 'INVALID_TOKEN' });
        }
        if (response.code && response.code === 'refreshExpired') {
            dispatch({ type: 'REFRESH_EXPIRED' });
            dispatch(connectionError('Refresh token expired.'));
        }
    }
    return response;
};

// general errors are for non-request specific problems that can occur with
// many requests, such as network errors and app specific, general errors
export const generalError = response => dispatch => {
    if (response === 'TypeError: Network request failed') {
        return dispatch(connectionError('Network request failed'));
        // other checks for connection issues
    }
    return false;
};

export const asyncError = response => dispatch => {
    if (response === 'TypeError: Network request failed') {
        return dispatch(connectionError('Async Network request failed'));
    }
    return false;
};
