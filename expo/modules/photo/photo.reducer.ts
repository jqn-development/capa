import { string } from "prop-types";

export const setPhotoProperty = (name: string | null, value: string | null): PhotoActionTypes => {
    return {
        type: 'SET_PHOTO_PROPERTY',
        name,
        value,
    };
};

// Reducer

const initialState: PhotoState = {
    id: null,
    url: null,
    film: null,
    camera: null,
};

export default function(state = initialState, action: PhotoActionTypes) {
    switch (action.type) {
        case 'SET_PHOTO_PROPERTY':
            return {
                ...state,
                uploadProgress: action.progress,
            };
        default:
            return state;
    }
}

