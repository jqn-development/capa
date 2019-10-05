import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import UploadScreen from '../screens/UploadScreen';
import AutoComplete from '../screens/AutoComplete';
import UploadDetails from '../screens/UploadDetails';

const HomeStack = createStackNavigator({
    Home: UploadDetails,
    Upload: UploadScreen,
    UploadDetails: UploadDetails,
    AutoComplete: AutoComplete,
});

export default createStackNavigator(
    {
        HomeStack,
    },
    {
        headerMode: 'none',
    }
);
