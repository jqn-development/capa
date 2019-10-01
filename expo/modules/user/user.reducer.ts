import { UserActionTypes } from './types/actions';
import { UserState } from './types/state';

export const setUserDetails = (
    id: number,
    email: string,
    firstName: string,
    lastName: string
): UserActionTypes => {
    return {
        type: 'SET_USER_DETAILS',
        id,
        email,
        firstName,
        lastName,
    };
};

const initialState: UserState = {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
};

export default function(state = initialState, action: UserActionTypes) {
    switch (action.type) {
        case 'SET_USER_DETAILS':
            return {
                ...state,
                id: action.id,
                email: action.email,
                firstName: action.firstName,
                lastName: action.lastName,
            };
        default:
            return state;
    }
}
