import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Input, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { login } from '../modules/auth/auth.service';
import { Colors, InputField, Container } from '../styles';

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
        ...Container.flexVerticalCenter,
        paddingTop: 20,
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
        marginLeft: 40,
        fontSize: 11,
        ...Colors.whiteText,
    },
    input: {
        marginLeft: 30,
        marginBottom: 40,
        width: 150,
        borderBottomWidth: 0,
    },
    squareButtonPos: {
        marginTop: -50,
        marginLeft: '75%',
    },
    squareButton: {
        height: 70,
        width: 70,
    },
    imageContainer: {
        ...Container.flexVerticalCenter,
        paddingTop: 130,
        width: '100%',
    },
    clearButton: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    newaccount: {
        marginTop: 50,
        marginLeft: 30,
    },
});

const renderEmail = ({ input: { onChange, ...restInput } }) => {
    return (
        <Input
            testID="email"
            placeholder="example@email.com"
            placeholderTextColor="white"
            inputContainerStyle={styles.input}
            inputStyle={[Colors.whiteText, InputField.inputText]}
            onChangeText={onChange}
            {...restInput}
        />
    );
};

renderEmail.propTypes = {
    input: PropTypes.shape({}).isRequired,
};

const renderPassword = ({ input: { onChange, ...restInput } }) => {
    return (
        <Input
            testID="password"
            name="password"
            placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
            placeholderTextColor="white"
            inputContainerStyle={styles.input}
            inputStyle={[Colors.whiteText, InputField.inputText]}
            onChangeText={onChange}
            secureTextEntry
            {...restInput}
        />
    );
};

renderPassword.propTypes = {
    input: PropTypes.shape({}).isRequired,
};

class SignInScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const { handleSubmit, dispatchLogin, errorMessage } = this.props;
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
                    <ImageBackground  resizeMode="cover" // or cover
                        style={styles.imageContainer}
                        source={require('../assets/images/signIn.jpg')}
                    >
                        <Text style={styles.text}>{'Email'.toUpperCase()}</Text>
                        <Field label="Email" name="email" component={renderEmail} />
                        <Text style={styles.text}>{'Password'.toUpperCase()}</Text>
                        <Field name="password" component={renderPassword} />
                        <View>
                            <Text>{errorMessage}</Text>
                        </View>
                        <View>
                            <Button
                                icon={
                                    <Ionicons name="md-arrow-dropright" size={26} color="white" />
                                }
                                style={styles.squareButtonPos}
                                buttonStyle={styles.squareButton}
                                testID="login"
                                onPress={handleSubmit(submitForm)}
                            />
                        </View>
                        <Button
                            type="clear"
                            buttonStyle={[styles.clearButton, styles.newaccount]}
                            testID="newaccount"
                            title="NEW ACCOUNT"
                            //onPress={handleSubmit(submitForm)}
                        />
                    </ImageBackground>
                </View>
            </View>
        );
    }
}

SignInScreen.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    dispatchLogin: PropTypes.func.isRequired,
    errorMessage: PropTypes.bool.isRequired,
};

function mapStateToProps(store) {
    return {
        errorMessage: store.auth.loginError,
        loggedIn: store.auth.loggedIn,
        authToken: store.auth.authToken,
    };
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        dispatchLogin: (email, password) => {
            dispatch(login(email, password)).then(() => {
                ownProps.navigation.navigate('App');
            });
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
