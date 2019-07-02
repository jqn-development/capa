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
        // screen will be unmounted and thrown away.
        let { dispatch, navigation } = this.props;
        const authToken = dispatch(checkAuthStatus());
        navigation.navigate(authToken ? 'App' : 'Auth');
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

export default connect()(AuthLoadingScreen);
