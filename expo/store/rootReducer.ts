import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from '../modules/auth/auth.reducer';
import s3 from '../modules/s3/s3.reducer';
import error from '../modules/errors/error.reducer';

export const rootReducer = combineReducers({
    auth,
    s3,
    error,
    form: formReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
