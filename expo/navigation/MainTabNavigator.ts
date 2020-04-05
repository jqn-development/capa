import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import UploadScreen from '../screens/UploadScreen';
import UploadDetails from '../screens/UploadDetails';
import PhotoScreen from '../screens/PhotoScreen';
import ProfileScreen from '../screens/ProfileScreen';

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        Upload: UploadScreen,
        UploadDetails: UploadDetails,
        PhotoScreen: PhotoScreen,
        ProfileScreen: ProfileScreen,
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
