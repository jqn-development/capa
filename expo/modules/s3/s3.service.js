import S3Api from './s3.api';
import * as S3Reducer from './s3.reducer';

export const storePhoto = (photo, body) => async (dispatch, getState) => {
    const state = getState();
    const flag = [];
    const progressCallback = progressEvent => {
        const percentFraction = progressEvent.loaded / progressEvent.total;
        const percent = Math.floor(percentFraction * 100);
        if (percent % 10 === 0 && !flag.includes(percent)) {
            flag.push(percent);
            dispatch(S3Reducer.setUploadProgress(percentFraction));
        }
    };

    return S3Api.store(state.auth.authToken, photo, body, progressCallback).catch(error => {
        throw error;
    });
};

export const deletePhoto = uri => {
    return S3Api.delete(uri);
};
