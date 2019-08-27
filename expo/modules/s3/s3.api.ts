import FormData from 'form-data';
import { Platform } from 'react-native';
import axios from 'axios';
import { Photo } from './types/photo';
import config from '../../config';
import { FormDataBody, ProgressEvent } from './types/upload';

const createFormData = (photo: Photo, body: FormDataBody) => {
    const data = new FormData();
    data.append('file', {
        name: photo.filename,
        uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach((key): void => {
        data.append(key, body[key]);
    });

    return data;
};

export default class S3Api {
    static store(
        token: string,
        photo: Photo,
        body: FormDataBody,
        callback: (e: ProgressEvent) => void
    ) {
        const formData = createFormData(photo, body);
        return axios
            .post(`${config.url}/api/photo/photos`, formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    authorization: `Bearer ${token}`,
                },
                onUploadProgress: callback,
            })
            .catch(error => {
                throw error;
            });
    }
}
