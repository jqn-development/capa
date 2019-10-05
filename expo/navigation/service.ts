import { NavigationContainerComponent, NavigationActions } from 'react-navigation';

let _navigator: NavigationContainerComponent;

function setTopLevelNavigator(navigatorRef: NavigationContainerComponent) {
    _navigator = navigatorRef;
}

function navigate(routeName: string, params?: object) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

// add other navigation functions that you need and export them

export default {
    navigate,
    setTopLevelNavigator,
};
