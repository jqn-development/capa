import FormData from 'form-data';
import { Platform } from 'react-native';
import config from '../../config';

const createFormData = (photo, body) => {
    const data = new FormData();
    data.append('file', {
        name: photo.filename,
        uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach(key => {
        data.append(key, body[key]);
    });

    return data;
};

export default class S3Api {
    static store(token, uri, body) {
        const formData = createFormData(uri, body);
        return fetch(`${config.url}/api/photo/photos`, {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        }).then( res => {
            console.log(res);
        }).catch(error => {
            console.log(error);
            throw error;
        });
    }
}
