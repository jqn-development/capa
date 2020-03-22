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
        type: "image/jpeg",
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
        console.log(photo);
        const formData = createFormData(photo, body);
        console.log('form data2:');
        console.log(formData);
        console.log(config.url);
        return axios.post(`${config.url}/api/photo/photos`, formData, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                authorization: `Bearer ${token}`,
            },
            onUploadProgress: callback,
        });
    }
}
