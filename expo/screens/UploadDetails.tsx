import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import {
    NavigationScreenProps,
    NavigationScreenOptions,
    NavigationScreenComponent,
    NavigationParams,
} from 'react-navigation';
import FullWidthImage from 'react-native-fullwidth-image';
// @ts-ignore
import { vw } from 'react-native-expo-viewport-units';
import { Formik, Field } from 'formik';
import { ThunkDispatch } from 'redux-thunk';
import config from '../config';
import CapaAutoComplete from '../components/CapaAutoComplete';
import {
    CapaAutoCompleteProvider,
    useAutoCompleteContext,
} from '../components/CapaAutoCompleteProvider';
import { S3ActionTypes } from '../modules/s3/types/actions';
import { Colors, Container, InputField } from '../styles';
import registerGfx from '../assets/images/bp.jpg';

const styles = StyleSheet.create({
    container: {
        ...Container.flexVerticalTop,
        ...Colors.background,
        paddingLeft: vw(10),
        paddingRight: vw(10),
    },
    errorMessage: {
        ...Colors.errorText,
        paddingTop: 20,
        paddingLeft: 10,
        fontSize: 10,
    },
    imageView: {
        marginBottom: 30,
    },
});

interface Props extends NavigationScreenProps {
    errorMessage: string;
    details: Record<string, string>;
}

interface DispatchProps {
    dispatchSaveDetails: (Gear: Item, Film: Item) => void;
}

interface Item {
    id: string;
    name: string;
    avatar?: string;
}

interface FormValues {
    [key: string]: string;
}

interface NavStatelessComponent extends React.StatelessComponent {
    navigationOptions?: NavigationScreenOptions;
}

const renderField = ({
    field, // { name, value, onChange, onBlur }
    ...props
}: {
    field: object;
}) => {
    return (
        <Input
            placeholderTextColor="white"
            inputContainerStyle={[InputField.input, InputField.inputUnderline]}
            containerStyle={[InputField.inputContainer]}
            inputStyle={[Colors.whiteText, InputField.inputText]}
            {...field}
            {...props}
        />
    );
};

export const UploadDetailsForm = () => {
    const suggestionsContext = useAutoCompleteContext();
    const details = suggestionsContext.form;
    const handleInput = (e: string, type: string, apiUrl: string) => {
        suggestionsContext.setActiveUrl(apiUrl);
        suggestionsContext.setEditMode(true);
        suggestionsContext.setActive(type);
        const formState = {
            ...suggestionsContext.form,
            [type as string]: e,
        };
        suggestionsContext.setForm(formState);
    };
    return (
        <View>
            {!suggestionsContext.editMode ? (
                <View style={styles.imageView}>
                    <FullWidthImage source={registerGfx} />
                </View>
            ) : null}
            {!suggestionsContext.editMode ? (
                <Formik<FormValues | {}>
                    enableReinitialize
                    initialValues={details}
                    onSubmit={values => console.log(values)}
                >
                    {({ values }: { values: FormValues }) => (
                        <View style={Container.flexVerticalTop}>
                            <Field
                                onChangeText={(e: string) => {
                                    handleInput(e, 'film', `${config.url}/api/film/suggestions`);
                                }}
                                value={values.film}
                                label="FILM"
                                name="Film"
                                component={renderField}
                                placeholder=""
                            />
                            <Field
                                onChangeText={(e: string) => {
                                    handleInput(e, 'gear', `${config.url}/api/camera/suggestions`);
                                }}
                                value={values.gear}
                                label="CAMERA"
                                name="Gear"
                                component={renderField}
                                placeholder=""
                            />
                        </View>
                    )}
                </Formik>
            ) : null}
        </View>
    );
};

export const UploadDetails: NavigationScreenComponent = () => {
    return (
        <View style={styles.container}>
            <CapaAutoCompleteProvider>
                <UploadDetailsForm />
                <CapaAutoComplete />
            </CapaAutoCompleteProvider>
        </View>
    );
};

UploadDetails.navigationOptions = ({ navigation }: NavigationParams): NavigationScreenOptions => ({
    headerStyle: {
        backgroundColor: '#000',
        marginLeft: 15,
        marginRight: 15,
        borderBottomWidth: 0,
    },
    headerLeft: (
        <Icon
            name="close"
            color="#fff"
            onPress={(): void => {
                navigation.goBack();
            }}
            Component={TouchableOpacity}
        />
    ),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, S3ActionTypes>): DispatchProps => ({
    dispatchSaveDetails: () => {
        console.log(dispatch);
    },
});

export default connect(
    null,
    mapDispatchToProps
)(UploadDetails);
