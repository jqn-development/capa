import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import { checkAuthStatus } from '../modules/auth/auth.service';

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    bootstrapAsync = async () => {
        // This will switch to the App screen or Auth screen and this loading
        const { dispatch, navigation } = this.props;
        dispatch(checkAuthStatus()).then(() => {
            const { authToken } = this.props;
            navigation.navigate(authToken ? 'App' : 'Auth');
        });
    };

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

function mapStateToProps(store) {
    return {
        authToken: store.auth.authToken,
    };
}

export default connect(mapStateToProps)(AuthLoadingScreen);
