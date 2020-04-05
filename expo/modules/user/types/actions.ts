export const SET_USER_DETAILS = 'SET_USER_DETAILS';

export interface SetUserDetails {
    type: typeof SET_USER_DETAILS;
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    username: string | null;
    bio: string | null;
    link: string | null;
}

export type UserActionTypes = SetUserDetails;
