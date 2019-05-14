import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import CapaHeader from '../components/header';

import { Colors, Container } from '../styles';

const styles = StyleSheet.create({
    container: {
        ...Container.flexVerticalTop,
        ...Colors.background,
    },
});
class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const { loggedIn, authToken } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <CapaHeader />
                {loggedIn ? (
                    <Text style={styles.loggedInDesc}>
                        You are logged in with token: {authToken}
                    </Text>
                ) : null}
            </SafeAreaView>
        );
    }
}

HomeScreen.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    authToken: PropTypes.string.isRequired,
};

function mapStateToProps(store) {
    return {
        errorMessage: store.auth.loginError,
        loggedIn: store.auth.loggedIn,
        authToken: store.auth.authToken,
    };
}

export default connect(mapStateToProps)(HomeScreen);
