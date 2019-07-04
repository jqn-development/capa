import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { login } from '../modules/auth/auth.service';
import EmailField from '../components/fields/emailField';
import PasswordField from '../components/fields/passwordField';
import { Colors, Container } from '../styles';

const signInGfx = require('../assets/images/signIn.jpg');

const styles = StyleSheet.create({
    container: {
        ...Container.flexVerticalCenter,
        ...Colors.background,
    },
    header: {
        flex: 0.5,
        justifyContent: 'flex-end',
    },
    body: {
        ...Container.flexVerticalBottom,
        paddingLeft: 0,
    },
    headerText: {
        fontSize: 54,
        marginLeft: 20,
        letterSpacing: 20,
        ...Colors.whiteText,
    },
    subheaderText: {
        marginBottom: 15,
        fontSize: 10,
        marginLeft: 20,
        ...Colors.whiteText,
    },
    text: {
        fontSize: 11,
        ...Colors.whiteText,
    },
    input: {
        width: 150,
        borderBottomWidth: 0,
        marginBottom: 10,
    },
    squareButtonPos: {
        marginTop: '-30%',
        marginLeft: '75%',
    },
    squareButton: {
        height: 70,
        width: 70,
    },
    imageContainer: {
        ...Container.flexVerticalBottom,
        flex: 1,
        paddingRight: 0,
        margin: 0,
        paddingBottom: '10%',
    },
    clearButton: {
        width: 110,
    },
    errorMessage: {
        ...Colors.errorText,
        width: 200,
        padding: 10,
        fontSize: 10,
    },
    inputView: {
        paddingHorizontal: '10%',
        alignContent: 'flex-end',
    },
});

class SignInScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const { handleSubmit, dispatchLogin, errorMessage, navigation } = this.props;
        const submitForm = e => {
            dispatchLogin(e.email, e.password);
        };

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>CAPA</Text>
                    <Text style={styles.subheaderText}>#analog #nofilter #filmsnotdead</Text>
                </View>
                <View style={styles.body}>
                    <ImageBackground
                        resizeMode="cover" // or cover
                        style={styles.imageContainer}
                        source={signInGfx}
                    >
                        <View style={styles.inputView}>
                            <EmailField
                                placeholder="example@email.com"
                                label="email"
                                inputContainerStyle={styles.input}
                            />
                            <PasswordField
                                placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                                label="password"
                                inputContainerStyle={styles.input}
                            />
                            <Text style={styles.errorMessage}>{errorMessage}</Text>
                            <Button
                                icon={
                                    <Ionicons name="md-arrow-dropright" size={26} color="white" />
                                }
                                style={styles.squareButtonPos}
                                buttonStyle={styles.squareButton}
                                testID="login"
                                onPress={handleSubmit(submitForm)}
                            />
                            <Button
                                type="clear"
                                buttonStyle={[styles.clearButton]}
                                testID="newaccount"
                                title="NEW ACCOUNT"
                                onPress={() => navigation.navigate('SignUp')}
                            />
                        </View>
                    </ImageBackground>
                </View>
            </View>
        );
    }
}

SignInScreen.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    dispatchLogin: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
};

SignInScreen.defaultProps = {
    errorMessage: null,
};

function mapStateToProps(store) {
    return {
        errorMessage: store.auth.loginError,
        // loggedIn: store.auth.loggedIn,
        // authToken: store.auth.authToken,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatchLogin: (email, password) => {
            dispatch(login(email, password));
        },
    };
}

const LoginConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInScreen);

export default reduxForm({
    form: 'loginForm',
})(LoginConnect);
