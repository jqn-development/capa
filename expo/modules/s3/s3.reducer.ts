export const setUploadProgress = progress => {
    return {
        type: 'SET_UPLOAD_PROGRESS',
        progress,
    };
};

export const setUploadFilename = filename => {
    return {
        type: 'SET_UPLOAD_FILENAME',
        filename,
    };
};

export const setUploadStatus = status => {
    return {
        type: 'SET_UPLOAD_STATUS',
        status,
    };
};

export const setUploadFileSize = size => {
    return {
        type: 'SET_UPLOAD_FILE_SIZE',
        size,
    };
};

// Reducer

const initialState = {
    uploadProgress: null,
    uploadFilename: null,
    uploadStatus: null,
    uploadFileSize: null,
};

export default function(state = initialState, action) {
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
                uploadFileSize: action.size,
            };
        default:
            return state;
    }
}
