import React from 'react';
import { StyleSheet, View } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';
import CapaHeader from '../components/header';
import { Colors, Container } from '../styles';
import CapaAutoComplete from '../components/CapaAutoComplete';

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
    navigation: any,
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
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <CapaHeader />
                <CapaAutoComplete suggestions={navigation.state.params.suggestions} />
            </View>
        );
    }
}

export default AutoCompleteScreen;
