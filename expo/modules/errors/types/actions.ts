export const ASYNC_ERROR = "ASYNC_ERROR";
export const CONNECTION_ERROR = "CONNECTION_ERROR";
export const SHOW_ERROR = "SHOW_ERROR";
export const REMOVE_ERROR = "REMOVE_ERROR";

export interface asyncError {
    type: typeof ASYNC_ERROR;
    error: string | null;
}


export type ErrorsActionTypes = asyncError;