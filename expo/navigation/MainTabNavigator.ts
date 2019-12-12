import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import UploadScreen from '../screens/UploadScreen';
import UploadDetails from '../screens/UploadDetails';

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        Upload: UploadScreen,
        UploadDetails: UploadDetails,
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
