import { ThunkDispatch } from 'redux-thunk';
import { Dispatch } from 'redux';
import { ErrorsActionTypes } from '../errors/types/actions';
import { ResponseObject } from '../errors/types/error';
import * as ErrorReducer from './error.reducer';

export const removeErrors = () => (dispatch: Dispatch) => {
    dispatch(ErrorReducer.removeError());
    return false;
};

// token errors handled here to keep out of service files
export const handleTokenErrors = (response: ResponseObject) => (dispatch: Dispatch) => {
    if (!response.success) {
        if (response.code && response.code === 'invalidToken') {
            dispatch({ type: 'INVALID_TOKEN' });
        }
        if (response.code && response.code === 'refreshExpired') {
            dispatch({ type: 'REFRESH_EXPIRED' });
            dispatch(ErrorReducer.connectionError('Refresh token expired.'));
        }
    }
    return response;
};

// general errors are for non-request specific problems that can occur with
// many requests, such as network errors and app specific, general errors
export const generalError = (response: ResponseObject) => (
    dispatch: ThunkDispatch<{}, {}, ErrorsActionTypes>
) => {
    // eslint-disable-next-line
    if (response === 'TypeError: Network request failed') {
        return dispatch(ErrorReducer.connectionError('Network request failed'));
        // other checks for connection issues
    }
    return false;
};

export const asyncError = (response: ResponseObject) => (
    dispatch: ThunkDispatch<{}, {}, ErrorsActionTypes>
) => {
    // eslint-disable-next-line
    if (response === 'TypeError: Network request failed') {
        return dispatch(ErrorReducer.connectionError('Async Network request failed'));
    }
    return false;
};
