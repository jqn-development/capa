import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import UploadScreen from '../screens/UploadScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        Upload: UploadScreen,
    },
    {
        headerStyle: {
            backgroundColor: 'black',
        },
    }
);

const LinksStack = createStackNavigator(
    {
        Links: LinksScreen,
    },
    {
        headerStyle: {
            backgroundColor: 'black',
        },
    }
);

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
});

export default createStackNavigator(
    {
        HomeStack,
        LinksStack,
        SettingsStack,
    },
    {
        headerMode: 'none',
    }
);
