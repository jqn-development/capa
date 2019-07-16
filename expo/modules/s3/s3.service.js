import S3Api from './s3.api';
import { handleTokenErrors } from '../errors/error.service';
import * as S3Reducer from './s3.reducer';

export const storePhoto = (photo, body) => async (dispatch, getState) => {
    const state = getState();
    const progressFlag = [];
    const progressCallback = progressEvent => {
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
    return S3Api.store(state.auth.authToken, photo, body, progressCallback)
        .then(() => {
            dispatch(S3Reducer.setUploadProgress(null));
        })
        .catch(error => {
            dispatch(handleTokenErrors(error.response.data));
        });
};

export const deletePhoto = uri => {
    return S3Api.delete(uri);
};
