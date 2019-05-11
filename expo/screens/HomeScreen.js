import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { MonoText } from '../components/StyledText';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'capa',
        headerTitleStyle: {
            textAlign: 'left',
            flexGrow: 1,
            alignSelf: 'left',
            fontWeight: 'bold',
            color: '#fff',
        },
        headerStyle: {
            backgroundColor: '#000',
            fontFamily: 'space-mono',
        },
    };

    render() {
        const { handleSubmit, loggedIn, authToken } = this.props;
        return (
            <View>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});
