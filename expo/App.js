import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Font, Icon } from 'expo';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-native-elements';
import AppNavigator from './navigation/AppNavigator';
import NavigationService from './navigation/service';
import configureStore from './store/configureStore';
import theme from './styles/theme';
import spaceMono from './assets/fonts/SpaceMono-Regular.ttf';

export const store = configureStore();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };

    startAppLoggedIn = () => {
        this.navigation.navigate('App');
    };

    loadResourcesAsync = async () => {
        return Promise.all([
            Font.loadAsync({
                ...Icon.Ionicons.font,
                'space-mono': spaceMono,
            }),
        ]);
    };

    handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };

    render() {
        const { isLoadingComplete, skipLoadingScreen } = this.state;
        if (!isLoadingComplete && !skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this.loadResourcesAsync}
                    onError={this.handleLoadingError}
                    onFinish={this.handleFinishLoading}
                />
            );
        }
        return (
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <View style={styles.container}>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                        <AppNavigator
                            ref={navigatorRef => {
                                NavigationService.setTopLevelNavigator(navigatorRef);
                            }}
                        />
                    </View>
                </Provider>
            </ThemeProvider>
        );
    }
}
