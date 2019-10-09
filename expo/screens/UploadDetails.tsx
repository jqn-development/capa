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
// @ts-ignore
import { vw } from 'react-native-expo-viewport-units';
import { Formik, Field } from 'formik';
import { ThunkDispatch } from 'redux-thunk';
import CapaAutoComplete from '../components/CapaAutoComplete';
import {
    CapaAutoCompleteProvider,
    useAutoCompleteContext,
} from '../components/CapaAutoCompleteProvider';
import { S3ActionTypes } from '../modules/s3/types/actions';
import { Colors, Container, InputField } from '../styles';

const styles = StyleSheet.create({
    container: {
        ...Container.flexVerticalTop,
        ...Colors.background,
        paddingLeft: vw(5),
        paddingRight: vw(5),
        paddingTop: 20,
    },
    errorMessage: {
        ...Colors.errorText,
        paddingTop: 20,
        paddingLeft: 10,
        margin: 0,
        fontSize: 10,
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
}

interface FormValues {
    film: string;
    gear: string;
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
    const handleInput = (e: string, type: string) => {
        suggestionsContext.setInput(e);
        suggestionsContext.setEditMode(true);
        suggestionsContext.setEditType(type);
    };
    return (
        <View>
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
                                    handleInput(e, 'film');
                                }}
                                value={values.film}
                                label="FILM"
                                name="Film"
                                component={renderField}
                                placeholder=""
                            />
                            <Field
                                onChangeText={(e: string) => {
                                    handleInput(e, 'gear');
                                }}
                                value={values.gear}
                                label="GEAR"
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

export const UploadDetails: NavigationScreenComponent<Props> = () => {
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
