import { ErrorsActionTypes } from './types/actions';

// Actions
export const asyncError = (error: string): ErrorsActionTypes => {
    return {
        type: 'ASYNC_ERROR',
        error,
    };
};

export const connectionError = (error: string): ErrorsActionTypes => {
    return {
        type: 'CONNECTION_ERROR',
        error,
    };
};
export const showError = (error: string): ErrorsActionTypes => {
    return {
        type: 'SHOW_ERROR',
        error,
    };
};
export const removeError = (): ErrorsActionTypes => {
    return {
        type: 'REMOVE_ERROR',
    };
};

// Reducer
const initialState = {
    error: false,
    errorMessage: null,
};

export default function(state = initialState, action: ErrorsActionTypes) {
    switch (action.type) {
        case 'ASYNC_ERROR':
            return {
                ...state,
                error: true,
                errorMessage: action.error,
            };
        case 'CONNECTION_ERROR':
            return {
                ...state,
                error: true,
                errorMessage: action.error,
            };
        case 'SHOW_ERROR':
            return {
                ...state,
                error: true,
                errorMessage: action.error,
            };
        case 'REMOVE_ERROR':
            return {
                ...state,
                error: false,
                errorMessage: null,
            };
        default:
            return state;
    }
}
