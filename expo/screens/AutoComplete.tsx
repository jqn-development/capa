import React from 'react';
import { StyleSheet, View } from 'react-native';
// @ts-ignore
import { vw } from 'react-native-expo-viewport-units';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import CapaHeader from '../components/header';
import { Colors, Container } from '../styles';
import CapaAutoComplete from '../components/CapaAutoComplete';
import { CapaAutoCompleteProvider } from '../components/CapaAutoCompleteProvider';

const styles = StyleSheet.create({
    container: {
        ...Container.flexVerticalTop,
        ...Colors.background,
        paddingLeft: vw(5),
        paddingRight: vw(5),
        paddingTop: 20,
    },
    loggedInDesc: {
        ...Colors.whiteText,
    },
});

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class AutoCompleteScreen extends React.Component<Props> {
    static navigationOptions = {
        header: null,
        headerStyle: {
            backgroundColor: '#000',
            borderBottomWidth: 0,
        },
    };

    render() {
        return (
            <View style={styles.container}>
                <CapaHeader />
                <CapaAutoCompleteProvider>
                    <CapaAutoComplete/>
                </CapaAutoCompleteProvider>
            </View>
        );
    }
}

export default AutoCompleteScreen;
