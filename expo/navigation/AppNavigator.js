import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

// import HomeScreen from '../screens/HomeScreen';
// import OtherScreen from '../screens/LinksScreen';
import SignInScreen from '../screens/SignInScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import MainTabNavigator from './MainTabNavigator';

const AuthStack = createStackNavigator({ SignIn: SignInScreen, SignUp: RegistrationScreen });

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: MainTabNavigator,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'AuthLoading',
            headerTransparent: true,
        }
    )
);
