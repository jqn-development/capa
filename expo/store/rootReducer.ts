import { combineReducers } from 'redux';
import auth from '../modules/auth/auth.reducer';
import user from '../modules/user/user.reducer';
import s3 from '../modules/s3/s3.reducer';
import error from '../modules/errors/error.reducer';
import { AuthState } from '../modules/auth/types/state';
import { UserState } from '../modules/user/types/state';
import { S3State } from '../modules/s3/types/state';
import { ErrorsState } from '../modules/errors/types/state';

export interface RootState {
    auth: AuthState;
    user: UserState;
    s3: S3State;
    error: ErrorsState;
}

export const rootReducer = combineReducers<RootState>({
    auth,
    user,
    s3,
    error,
});

export type AppState = ReturnType<typeof rootReducer>;
