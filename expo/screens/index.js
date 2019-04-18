import { Navigation } from 'react-native-navigation';

import Home from './HomeScreen';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('testapp.Home', () => Home, store, Provider);
}
