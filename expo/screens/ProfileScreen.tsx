import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
    SafeAreaView,
    NavigationScreenProp,
    NavigationScreenOptions,
    NavigationState,
    NavigationParams,
} from 'react-navigation';
// @ts-ignore
import { vw, vh } from 'react-native-expo-viewport-units';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { withFormik, FormikProps, Formik } from 'formik';
import { Avatar, Icon } from 'react-native-elements';
import { profileUpdate } from '../modules/user/user.service';
import GenericField from '../components/fields/genericField';
import { AppState } from '../store/rootReducer';
import { AuthActionTypes } from '../modules/auth/types/actions';
import { Colors, Container, InputField } from '../styles';

const styles = StyleSheet.create({
    clearButton: {
        borderColor: "#fff",
        margin: 0,
        padding: 0,
        width: 110,
    },
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
    fieldsView: {
        padding: 0,
        width: vw(80),
        marginLeft: vw(10),
        marginRight: vw(10),
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
    avatarView: {
        marginTop: vh(10),
        marginBottom: vh(10),
        flex: 0.5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    squareButton: {
        width: vw(100),
        borderColor: '#fff',
    },
});
interface UserState {
    id: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    bio: string | null;
    link: string | null;
}
interface ScreenProps {
    handleSubmit: SubmitForm;
    profile: UserState;
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
    dispatchUpdateProfile: (profile: object) => void;
    //dispatchClearErrors: () => void;
}

type Props = DispatchProps & ScreenProps;

const ProfileScreen = (props: Props & FormikProps<FormValues>) => {
    const { errorMessage, profile, dispatchUpdateProfile } = props;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.avatarView}>
                <Avatar
                    size="xlarge"
                    rounded
                    source={{
                        uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
                />
            </View>
            <Formik
                initialValues={{
                    email: profile.email,
                    username: profile.username,
                    name: profile.firstName + " " + profile.lastName,
                    link: profile.link,
                    bio: profile.bio,
                }}
                onSubmit={values => {
                    dispatchUpdateProfile(values);
                }}
            >
                {({ handleSubmit, handleChange }) => (
                    <View style={{widht: vw(100)}}>
                        <View style={styles.fieldsView}>
                            <GenericField
                                label="NAME"
                                name="name"
                                inputContainerStyle={styles.input}
                                onChangeText={handleChange('name')}
                            />
                            <GenericField
                                label="EMAIL"
                                name="email"
                                onChangeText={handleChange('email')}
                                inputContainerStyle={styles.input}
                            />
                            <GenericField onChangeText={handleChange('username')} label="USERNAME" name="username" inputContainerStyle={styles.input} />
                            <GenericField onChangeText={handleChange('bio')} label="BIO" name="bio" inputContainerStyle={styles.input} />
                            <GenericField onChangeText={handleChange('link')} label="LINK" name="link" inputContainerStyle={styles.input} />
                            <Text style={styles.errorMessage}>{errorMessage}</Text>
                            
                        </View>
                    
                        <TouchableOpacity
                                    style={{
                                        width: vw(80),
                                        marginLeft: vw(10),
                                        marginRight: vw(10),
                                        height: 50,
                                        borderColor: '#fff',
                                        padding: 0,
                                        borderWidth: 1,
                                        borderRadius: 0,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    onPress={handleSubmit}
                                >
                                    <Text style={{color:'#fff', fontSize: 19,}}>Save</Text>
                                </TouchableOpacity>
                    </View>
            )}
            </Formik>
        </SafeAreaView>
    );
};

ProfileScreen.navigationOptions = (screenProps: ScreenProps): NavigationScreenOptions => ({
    headerStyle: {
        backgroundColor: '#000',
        borderBottomWidth: 0,
    },
    headerLeft: (
        <Icon
            name="close"
            color="#fff"
            onPress={(): void => {
                screenProps.navigation.goBack();
            }}
            Component={TouchableOpacity}
        />
    ),
});

function mapStateToProps(store: AppState) {
    return {
        profile: store.user,
        errorMessage: store.auth.regError,
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AuthActionTypes>): DispatchProps => ({
    dispatchUpdateProfile: profile => {
        dispatch(profileUpdate(profile))
            .then(() => {
                //dispatch(login(email, password));
            })
            .catch(() => {
                // console.log(err);
            });
    },
    dispatchClearErrors: () => {
        //dispatch(clearRegError());
    },
});

const formikEnhancer = withFormik<Props, FormValues>({
    displayName: 'ProfileUpdateForm',
})(ProfileScreen);

export default connect(mapStateToProps, mapDispatchToProps)(formikEnhancer);
