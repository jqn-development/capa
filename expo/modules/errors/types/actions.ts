export const ASYNC_ERROR = 'ASYNC_ERROR';
export const CONNECTION_ERROR = 'CONNECTION_ERROR';
export const SHOW_ERROR = 'SHOW_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

export interface AsyncError {
    type: typeof ASYNC_ERROR;
    error: string | null;
}

export interface ConnectionError {
    type: typeof CONNECTION_ERROR;
    error: string | null;
}

export interface ShowError {
    type: typeof SHOW_ERROR;
    error: string | null;
}

export interface RemoveEror {
    type: typeof REMOVE_ERROR;
}

export type ErrorsActionTypes = AsyncError | ConnectionError | ShowError | RemoveEror;
