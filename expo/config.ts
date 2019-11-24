import { API_URL, GOOGLE_API } from 'react-native-dotenv';

export default {
    url: API_URL,
    googleApi: GOOGLE_API,
    configHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};
