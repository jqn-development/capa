import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { register, login } from '../modules/auth/auth.service';
import EmailField from '../components/fields/emailField';
import PasswordField from '../components/fields/passwordField';
import GenericField from '../components/fields/genericField';
import { Colors, Container } from '../styles';

const registerGfx = require('../assets/images/register.jpg');

const styles = StyleSheet.create({
    container: {
        ...Container.flexVerticalTop,
        ...Colors.background,
    },
    input: {
        marginLeft: 0,
        paddingLeft: 0,
        marginBottom: 20,
        width: 250,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },
    text: {
        fontSize: 11,
        ...Colors.whiteText,
    },
    headerSmallText: {
        fontSize: 15,
        marginTop: 45,
        marginLeft: 10,
        letterSpacing: 8,
        flex: 1,
        alignSelf: 'flex-start',
        ...Colors.whiteText,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 0,
        justifyContent: 'space-between',
    },
    nextstep: {
        ...Container.flexVerticalBottom,
        marginBottom: 60,
        paddingRight: 80,
    },
    fieldsView: {
        paddingLeft: 60,
    },
    registerSplash: {
        height: 300,
        paddingLeft: 40,
        paddingTop: 40,
    },
    fieldLabel: {
        paddingLeft: 5,
        ...Colors.whiteText,
    },
    closeButtonView: {
        alignSelf: 'flex-end',
        marginTop: 35,
        marginRight: 15,
    },
});

class RegistrationScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const { handleSubmit, navigation, dispatchRegister, dispatchLogin } = this.props;
        const submitForm = e => {
            dispatchRegister(e.name, e.email, e.password);
        };
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerSmallText}>CAPA</Text>
                    <View style={styles.closeButtonView}>
                        <Button
                            icon={<Ionicons name="md-close" size={26} color="white" />}
                            style={styles.closeButtonPos}
                            testID="close"
                            onPress={() => navigation.navigate('SignIn')}
                        />
                    </View>
                </View>
                <View style={styles.registerSplash}>
                    <Image style={{ width: 280, height: 198 }} source={registerGfx} />
                </View>
                <View style={styles.fieldsView}>
                    <GenericField label="NAME" name="name" inputContainerStyle={styles.input} />
                    <EmailField inputContainerStyle={styles.input} />
                    <PasswordField inputContainerStyle={styles.input} />
                </View>
                <View style={styles.nextstep}>
                    <Button
                        type="clear"
                        buttonStyle={[styles.clearButton]}
                        testID="nextstep"
                        title="NEXT STEP"
                        onPress={handleSubmit(submitForm)}
                    />
                </View>
            </View>
        );
    }
}

function mapStateToProps(store) {
    return {
        errorMessage: store.auth.registrationError,
        // loggedIn: store.auth.loggedIn,
        // authToken: store.auth.authToken,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchRegister: (name, email, password) => {
            dispatch(register(name, email, password)).then(() => {
                    console.log('success register');
                    console.log(email + "/"+ password);
                    dispatch(login(email, password)).then(
                        () => {},
                        error => {
                            console.log(error);
                        }
                    );
                },
                error => {
                    console.log(error);
                }
            );
        },
    };
}

const RegistrationConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationScreen);

export default reduxForm({
    form: 'registrationForm',
})(RegistrationConnect);
