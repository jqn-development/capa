import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import UploadScreen from '../screens/UploadScreen';

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Upload: UploadScreen,
});

export default createStackNavigator(
    {
        HomeStack,
    },
    {
        headerMode: 'none',
    }
);
