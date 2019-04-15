import { Navigation } from 'react-native-navigation';

import Home from './HomeScreen';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('testapp.Home', () => Home, store, Provider);
	/*Navigation.registerComponent(
		'testapp.Register',
		() => Register,
		store,
		Provider
	);
	Navigation.registerComponent('testapp.Login', () => Login, store, Provider);

	Navigation.registerComponent(
		'testapp.LoggedIn',
		() => LoggedIn,
		store,
		Provider
	);
	Navigation.registerComponent('testapp.About', () => About, store, Provider);
    */
}
