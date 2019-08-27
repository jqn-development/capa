import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Font, Icon } from 'expo';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-native-elements';
import { NavigationContainerComponent } from 'react-navigation';
import AppNavigator from './navigation/AppNavigator';
import NavigationService from './navigation/service';
import capaStore from './store';
import theme from './styles/theme';
import SpaceMono from './assets/fonts/SpaceMono-Regular.ttf';

interface State {
    isLoadingComplete: boolean;
    skipLoadingScreen?: boolean;
}

interface Props {
    skipLoadingScreen?: boolean;
}

export const store = capaStore();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});

export default class App extends React.Component<Props, State> {
    public state = {
        isLoadingComplete: false,
        skipLoadingScreen: false,
    };

    public loadResourcesAsync = async (): Promise<Font> =>
        Promise.all([
            Font.loadAsync({
                ...Icon.Ionicons.font,
                'space-mono': SpaceMono,
            }),
        ]);

    public handleFinishLoading = (): void => {
        this.setState({ isLoadingComplete: true });
    };

    public handleLoadingError = (error: Error): void => {
        console.warn(error);
    };

    public render(): JSX.Element {
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
                            ref={(navigatorRef: NavigationContainerComponent): void => {
                                NavigationService.setTopLevelNavigator(navigatorRef);
                            }}
                        />
                    </View>
                </Provider>
            </ThemeProvider>
        );
    }
}
