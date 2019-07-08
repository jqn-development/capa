export const setUploadProgress = progress => {
    return {
        type: 'SET_UPLOAD_PROGRESS',
        progress,
    };
};

// Reducer

const initialState = {
    uploadProgress: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'SET_UPLOAD_PROGRESS':
            return {
                ...state,
                uploadProgress: action.progress,
            };
        default:
            return state;
    }
}
