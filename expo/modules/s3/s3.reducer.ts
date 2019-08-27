import { S3ActionTypes } from './types/actions';
import { S3State } from './types/state';

export const setUploadProgress = (progress: number | null): S3ActionTypes => {
    return {
        type: 'SET_UPLOAD_PROGRESS',
        progress,
    };
};

export const setUploadFilename = (filename: string | null): S3ActionTypes => {
    return {
        type: 'SET_UPLOAD_FILENAME',
        filename,
    };
};

export const setUploadStatus = (status: string | null): S3ActionTypes => {
    return {
        type: 'SET_UPLOAD_STATUS',
        status,
    };
};

export const setUploadFileSize = (filesize: number): S3ActionTypes => {
    return {
        type: 'SET_UPLOAD_FILE_SIZE',
        filesize,
    };
};

// Reducer

const initialState: S3State = {
    uploadProgress: null,
    uploadFilename: null,
    uploadStatus: null,
    uploadFileSize: null,
};

export default function(state = initialState, action: S3ActionTypes) {
    switch (action.type) {
        case 'SET_UPLOAD_PROGRESS':
            return {
                ...state,
                uploadProgress: action.progress,
            };
        case 'SET_UPLOAD_FILENAME':
            return {
                ...state,
                uploadFilename: action.filename,
            };

        case 'SET_UPLOAD_STATUS':
            return {
                ...state,
                uploadStatus: action.status,
            };
        case 'SET_UPLOAD_FILE_SIZE':
            return {
                ...state,
                uploadFileSize: action.filesize,
            };
        default:
            return state;
    }
}
