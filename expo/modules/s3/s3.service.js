import S3Api from './s3.api';

export const storePhoto = (photo, body) => (dispatch, getState) => {
    const state = getState();
    return S3Api.store(state.auth.authToken, photo, body).catch(error => {
        throw error;
    });
};

export const deletePhoto = uri => {
    return S3Api.delete(uri);
};
