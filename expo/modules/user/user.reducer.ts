import { UserActionTypes } from './types/actions';
import { UserState } from './types/state';

export const setUserDetails = (
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    username: string | null,
    bio: string | null,
    link: string | null
): UserActionTypes => {
    return {
        type: 'SET_USER_DETAILS',
        id,
        email,
        firstName,
        lastName,
        username,
        bio,
        link,
    };
};

const initialState: UserState = {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    username: null,
    bio: null,
    link: null,
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
                username: action.username,
                bio: action.bio,
                link: action.link,
            };
        default:
            return state;
    }
}
