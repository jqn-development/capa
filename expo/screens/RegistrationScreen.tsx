import React from 'react';
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
import { ThunkDispatch } from 'redux-thunk';
import { withFormik, FormikProps } from 'formik';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import FullWidthImage from 'react-native-fullwidth-image';
import { register, login, clearRegError } from '../modules/auth/auth.service';
import GenericField from '../components/fields/genericField';
import { AppState } from '../store/rootReducer';
import { AuthActionTypes } from '../modules/auth/types/actions';
import { Colors, Container, InputField } from '../styles';
import registerGfx from '../assets/images/register.jpg';

const styles = StyleSheet.create({
    container: {
        ...Container.flexVerticalTop,
        ...Colors.background,
    },
    input: {
        ...InputField.input,
        ...InputField.inputUnderline,
        ...InputField.inputContainerSmall,
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
        paddingLeft: 0,
        margin: 0,
        fontSize: 10,
    },
});

interface ScreenProps {
    handleSubmit: SubmitForm;
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    errorMessage: boolean | null;
}
interface FormValues {
    name: string;
    email: string;
    password: string;
}

interface SubmitForm {
    (e: FormValues): void;
}

interface DispatchProps {
    dispatchRegister: (name: string, email: string, password: string) => void;
    dispatchClearErrors: () => void;
}

type Props = DispatchProps & ScreenProps;

class RegistrationScreen extends React.Component<Props & FormikProps<FormValues>> {
    static navigationOptions = {
        header: null,
    };

    render() {
        const { values, handleSubmit, navigation, dispatchClearErrors, errorMessage } = this.props;

        const navigateToHome = () => {
            dispatchClearErrors();
            navigation.navigate('SignIn');
        };

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerSmallText}>CAPA</Text>
                    <View style={styles.closeButtonView}>
                        <Button
                            icon={<Ionicons name="md-close" size={26} color="white" />}
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
                    <GenericField label="EMAIL" name="name" inputContainerStyle={styles.input} />
                    <GenericField label="PASSWORD" name="name" inputContainerStyle={styles.input} />
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
                <View style={styles.nextstep}>
                    <Button
                        type="clear"
                        testID="nextstep"
                        title="NEXT STEP"
                        onPress={() => handleSubmit(values)}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(store: AppState) {
    return {
        errorMessage: store.auth.regError,
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AuthActionTypes>): DispatchProps => ({
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
});

const formikEnhancer = withFormik<Props, FormValues>({
    displayName: 'LoginForm',
    handleSubmit: (payload, { props }) => {
        props.dispatchRegister(payload.name, payload.email, payload.password);
    },
})(RegistrationScreen);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(formikEnhancer);
