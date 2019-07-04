import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkAuthStatus } from '../modules/auth/auth.service';

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.bootstrap();
    }

    // Fetch the token from storage then navigate to our appropriate place
    bootstrap = () => {
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

AuthLoadingScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
    authToken: PropTypes.string,
};

AuthLoadingScreen.defaultProps = {
    authToken: null,
};

function mapStateToProps(store) {
    return {
        authToken: store.auth.authToken,
    };
}

export default connect(mapStateToProps)(AuthLoadingScreen);
