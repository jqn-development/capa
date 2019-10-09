import { Dispatch } from 'redux';
import * as S3Reducer from './photo.reducer';

export const storePhoto = (photo: Photo) => (
    dispatch: ThunkDispatch<{}, {}, ErrorsActionTypes | S3ActionTypes>,
    getState: Function
) => {