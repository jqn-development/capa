import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import {
    SafeAreaView,
    NavigationScreenProp,
    NavigationState,
    NavigationParams,
} from 'react-navigation';
// @ts-ignore
import { vw, vh } from 'react-native-expo-viewport-units';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import FullWidthImage from 'react-native-fullwidth-image';
import { register, login, clearRegError } from '../modules/auth/auth.service';
import EmailField from '../components/fields/emailField';
import PasswordField from '../components/fields/passwordField';
import GenericField from '../components/fields/genericField';
import { Colors, Container, InputField } from '../styles';

const registerGfx = require('../assets/images/register.jpg');

const styles = StyleSheet.create({
    container: {
        ...Container.flexVerticalTop,
        ...Colors.background,
    },
    input: {
        ...InputField.input,
        ...InputField.inputUnderline,
    },
    text: {
        fontSize: 12,
        ...Colors.whiteText,
    },
    headerSmallText: {
        fontSize: 13,
        marginTop: vh(2),
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
        marginBottom: vh(3),
        justifyContent: 'space-between',
    },
    nextstep: {
        ...Container.flexVerticalBottom,
        marginBottom: vh(8),
        paddingRight: vw(20),
    },
    fieldsView: {
        padding: 0,
        marginLeft: vw(15),
        marginRight: vw(13),
    },
    registerSplash: {
        width: vw(75),
        marginTop: vh(2),
        marginLeft: vw(10),
        marginBottom: vh(3),
    },
    closeButtonView: {
        alignSelf: 'flex-end',
        marginTop: vh(2),
        marginRight: vw(4),
    },
    errorMessage: {
        ...Colors.errorText,
        paddingTop: 20,
        paddingLeft: 10,
        margin: 0,
        fontSize: 10,
    },
});

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    handleSubmit: any;
}

class RegistrationScreen extends React.Component<Props> {
    static navigationOptions = {
        header: null,
    };

    render() {
        const {
            handleSubmit,
            navigation,
            dispatchRegister,
            dispatchClearErrors,
            errorMessage,
        } = this.props;

        const navigateToHome = () => {
            dispatchClearErrors();
            navigation.navigate('SignIn');
        };

        const submitForm = e => {
            dispatchRegister(e.name, e.email, e.password);
        };

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerSmallText}>CAPA</Text>
                    <View style={styles.closeButtonView}>
                        <Button
                            icon={<Ionicons name="md-close" size={26} color="white" />}
                            style={styles.closeButtonPos}
                            testID="close"
                            onPress={() => navigateToHome()}
                        />
                    </View>
                </View>
                <View style={styles.registerSplash}>
                    <FullWidthImage source={registerGfx} ratio={10 / 16} />
                </View>
                <View style={styles.fieldsView}>
                    <GenericField label="NAME" name="name" inputContainerStyle={styles.input} />
                    <EmailField inputContainerStyle={styles.input} />
                    <PasswordField inputContainerStyle={styles.input} />
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
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
            </SafeAreaView>
        );
    }
}

RegistrationScreen.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    dispatchRegister: PropTypes.func.isRequired,
    dispatchClearErrors: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
    errorMessage: PropTypes.string,
};

RegistrationScreen.defaultProps = {
    errorMessage: null,
};

function mapStateToProps(store) {
    return {
        errorMessage: store.auth.regError,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchRegister: (name, email, password) => {
            dispatch(register(name, email, password))
                .then(() => {
                    dispatch(login(email, password));
                })
                .catch(() => {
                    // console.log(err);
                });
        },
        dispatchClearErrors: () => {
            dispatch(clearRegError());
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
