import S3Api from './s3.api';
import { handleTokenErrors } from '../errors/error.service';
import * as S3Reducer from './s3.reducer';
import { Photo } from './types/photo' 
import { ErrorsActionTypes } from '../errors/types/actions';
import { S3ActionTypes } from './types/actions';
import { ThunkDispatch } from 'redux-thunk'

interface ProgressEvent {
    loaded: number;
    total: number;
}

export const storePhoto = (photo: Photo, body: object) => (dispatch: ThunkDispatch<{}, {}, ErrorsActionTypes | S3ActionTypes>, getState: Function) => {
    const state = getState();
    const progressFlag: any = [];
    const progressCallback = ( progressEvent: ProgressEvent ) => {
        const percentFraction = progressEvent.loaded / progressEvent.total;
        const percent = Math.floor(percentFraction * 100);
        if (!progressFlag.includes('size')) {
            progressFlag.push('size');
            dispatch(S3Reducer.setUploadFileSize(progressEvent.total / 1000));
        }
        if (percent % 10 === 0 && !progressFlag.includes(percent)) {
            progressFlag.push(percent);
            dispatch(S3Reducer.setUploadProgress(percentFraction));
        }
        if (percentFraction === 1) {
            dispatch(S3Reducer.setUploadStatus('processing'));
        }
    };
    dispatch(S3Reducer.setUploadFilename(photo.filename));
    dispatch(S3Reducer.setUploadStatus('uploading'));
    return S3Api.store(state.auth.authToken, photo, body, progressCallback)
        .then(() => {
            dispatch(S3Reducer.setUploadProgress(null));
            dispatch(S3Reducer.setUploadStatus(null));
            dispatch(S3Reducer.setUploadFilename(null));
            dispatch(S3Reducer.setUploadFileSize(null));
        })
        .catch(error => {
            // If JWT token is expired, let's refresh it
            dispatch(handleTokenErrors(error.response.data));
        });
};