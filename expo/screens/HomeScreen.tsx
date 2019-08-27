import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import CapaHeader from '../components/header';
import { Colors, Container } from '../styles';
import { AppState } from '../store/rootReducer';

const styles = StyleSheet.create({
    container: {
        ...Container.flexVerticalTop,
        ...Colors.background,
    },
    loggedInDesc: {
        ...Colors.whiteText,
    },
});

interface HomeScreenProps {
    loggedIn: boolean;
    authToken: string;
}

class HomeScreen extends React.Component<HomeScreenProps> {
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

function mapStateToProps(state: AppState) {
    return {
        errorMessage: state.auth.loginError,
        loggedIn: state.auth.loggedIn,
        authToken: state.auth.authToken,
    };
}

export default connect(mapStateToProps)(HomeScreen);
