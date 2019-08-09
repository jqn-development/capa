import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import CapaHeader from '../components/header';
import { Colors, Container } from '../styles';

const styles = StyleSheet.create({
    container: {
        ...Container.flexVerticalTop,
        ...Colors.background,
    },
    loggedInDesc: {
        ...Colors.whiteText,
    },
});
class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
        headerStyle: {
            backgroundColor: '#000',
        },
    };

    render() {
        const { loggedIn, authToken } = this.props;
        return (
            <View style={styles.container}>
                <CapaHeader add search />
                {loggedIn ? (
                    <Text style={styles.loggedInDesc}>
                        You are logged in with token: {authToken}
                    </Text>
                ) : null}
            </View>
        );
    }
}

function mapStateToProps(store) {
    return {
        errorMessage: store.auth.loginError,
        loggedIn: store.auth.loggedIn,
        authToken: store.auth.authToken,
    };
}

export default connect(mapStateToProps)(HomeScreen);
