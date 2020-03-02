import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import UploadScreen from '../screens/UploadScreen';
import UploadDetails from '../screens/UploadDetails';
import PhotoScreen from '../screens/PhotoScreen';

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        Upload: UploadScreen,
        UploadDetails: UploadDetails,
        PhotoScreen: PhotoScreen,
    },
    {}
);

export default createStackNavigator(
    {
        HomeStack,
    },
    {
        headerMode: 'none',
    }
);
