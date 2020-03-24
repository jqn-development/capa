import * as React from 'react';
import { StyleSheet, Text, View, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { ThunkDispatch } from 'redux-thunk';
import { withFormik, FormikProps } from 'formik';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { login } from '../modules/auth/auth.service';
import GenericField from '../components/fields/genericField';
import { Colors, Container, InputField } from '../styles';
import { AppState } from '../store/rootReducer';
import { vw, vh } from 'react-native-expo-viewport-units';
import signInGfx from '../assets/images/signIn.jpg';
import { AuthActionTypes } from '../modules/auth/types/actions';

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
        flexGrow: 1,
    },
    headerText: {
        fontSize: 54,
        marginLeft: 20,
        letterSpacing: 20,
        ...Colors.whiteText,
    },
    subheaderText: {
        marginBottom: 15,
        fontSize: 14,
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
        paddingLeft: 10,
        paddingBottom: '10%',
    },
    clearButton: {
        margin: 0,
        padding: 0,
        width: 110,
    },
    errorMessage: {
        ...Colors.errorText,
        width: 200,
        padding: 10,
        fontSize: 10,
    },
    inputView: {
        marginTop: 300,
        flex: 1,
    },
});

interface FormValues {
    email: string;
    password: string;
}

interface SubmitForm {
    (e: FormValues): void;
}

interface ScreenProps {
    handleSubmit: SubmitForm;
    errorMessage: string;
    form: FormValues;
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface DispatchProps {
    dispatchLogin: (username: string, password: string) => void;
}

type Props = DispatchProps & ScreenProps;

const SignInScreen = (props: Props & FormikProps<FormValues>) => {
    const { handleSubmit, errorMessage, navigation, values, handleChange } = props;
    return (
        <KeyboardAvoidingView behavior="padding" enabled style={{flex:1, backgroundColor: "#000"}}>
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
                        <GenericField
                            onChangeText={handleChange('email')}
                            name="email"
                            label="EMAIL"
                            placeholder="example@email.com"
                            value={values.email}
                            inputContainerStyle={[
                                InputField.input,
                                InputField.inputNoUnderline,
                                { marginBottom: 20 },
                            ]}
                        />
                        <GenericField
                            onChangeText={handleChange('password')}
                            name="password"
                            label="PASSWORD"
                            secureTextEntry
                            placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                            value={values.password}
                            inputContainerStyle={[InputField.input, InputField.inputNoUnderline]}
                        />
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                        <Button
                            icon={<Ionicons name="md-arrow-dropright" size={26} color="white" />}
                            style={styles.squareButtonPos}
                            buttonStyle={styles.squareButton}
                            testID="login"
                            onPress={() => {
                                handleSubmit(values);
                            }}
                        />
                        <Button
                            type="clear"
                            buttonStyle={[styles.clearButton]}
                            testID="newaccount"
                            title="NEW ACCOUNT"
                            onPress={() => navigation.navigate('SignUp')}
                        />
                </ImageBackground>
            </View>
        </KeyboardAvoidingView>
    );
};

SignInScreen.navigationOptions = () => ({
    header: null,
});

function mapStateToProps(state: AppState): object {
    return {
        errorMessage: state.auth.loginError,
    };
}
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AuthActionTypes>): DispatchProps => ({
    dispatchLogin: (email, password) => {
        dispatch(login(email, password));
    },
});

const formikEnhancer = withFormik<Props, FormValues>({
    displayName: 'LoginForm',
    handleSubmit: (payload, { props }) => {
        props.dispatchLogin(payload.email, payload.password);
    },
})(SignInScreen);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(formikEnhancer);
