export const SET_USER_DETAILS = 'SET_USER_DETAILS';

export interface SetUserDetails {
    type: typeof SET_USER_DETAILS;
    id: number;
    email: string;
    firstName: string;
    lastName: string;
}

export type UserActionTypes = SetUserDetails;
