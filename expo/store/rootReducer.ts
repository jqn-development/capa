import { combineReducers } from 'redux';
import { reducer as formReducer, FormStateMap } from 'redux-form';
import auth from '../modules/auth/auth.reducer';
import s3 from '../modules/s3/s3.reducer';
import error from '../modules/errors/error.reducer';
import { AuthState } from '../modules/auth/types/state';
import { S3State } from '../modules/s3/types/state';
import { ErrorsState } from '../modules/errors/types/state';

export interface RootState {
    auth: AuthState;
    s3: S3State;
    error: ErrorsState;
    form: FormStateMap;
}

export const rootReducer = combineReducers<RootState>({
    auth,
    s3: s3,
    error,
    form: formReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
