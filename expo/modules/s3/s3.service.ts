import { ThunkDispatch } from 'redux-thunk';
import S3Api from './s3.api';
import { handleTokenErrors } from '../errors/error.service';
import * as S3Reducer from './s3.reducer';
import { Photo } from './types/photo';
import { ErrorsActionTypes } from '../errors/types/actions';
import { S3ActionTypes } from './types/actions';
import { FormDataBody, ProgressEvent } from './types/upload';
import { ResponseObject } from '../errors/types/error';
import NavigationService from '../../navigation/service';

export const storePhoto = (photo: Photo) => (
    dispatch: ThunkDispatch<{}, {}, ErrorsActionTypes | S3ActionTypes>,
    getState: Function
) => {
    const state = getState();
    const body: FormDataBody = { userId: state.user.id };
    const progressFlag: (string | number)[] = [];
    const progressCallback = (progressEvent: ProgressEvent) => {
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
        .then(response => {
            dispatch(S3Reducer.setUploadProgress(null));
            dispatch(S3Reducer.setUploadStatus(null));
            dispatch(S3Reducer.setUploadFilename(null));
            dispatch(S3Reducer.setUploadFileSize(null));
            NavigationService.navigate('UploadDetails', {
                photo: response.data.photoPath,
                id: response.data.id,
            });
        })
        .catch((error: { response: { data: ResponseObject } }) => {
            // If JWT token is expired, let's refresh it
            if (error.response) {
                dispatch(handleTokenErrors(error.response.data));
            } else {
                console.log(error);
            }
        });
};
