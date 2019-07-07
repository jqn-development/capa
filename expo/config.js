import { API_URL } from 'react-native-dotenv';

export default {
    url: API_URL,
    configHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};
