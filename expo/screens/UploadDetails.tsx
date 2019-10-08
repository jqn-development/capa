import React from 'react';
import { connect } from 'react-redux';
import {
    NavigationScreenProp,
    NavigationScreenOptions,
    NavigationParams,
    NavigationState,
} from 'react-navigation';
import { StyleSheet, View } from 'react-native';
import { Icon, Input } from 'react-native-elements';
// @ts-ignore
import { vw } from 'react-native-expo-viewport-units';
import { Formik, Field } from 'formik';
import { ThunkDispatch } from 'redux-thunk';
import CapaAutoComplete from '../components/CapaAutoComplete';
import {
    CapaAutoCompleteProvider,
    AutoCompleteContext,
} from '../components/CapaAutoCompleteProvider';
import { AppState } from '../store/rootReducer';
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

interface Props {
    errorMessage: string;
    details: Record<string, string>;
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface DispatchProps {
    dispatchSaveDetails: (Gear: Gear, Film: Film) => void;
}

interface Film {
    id: string;
    name: string;
}

interface Gear {
    id: string;
    name: string;
}

interface State {
    Film: Film | null;
    Gear: Gear | null;
}

interface SubmitFormData {
    Film: string;
    Gear: string;
}

interface SubmitForm {
    (e: SubmitFormData): void;
}

interface MyFormProps {
    film: string;
    gear: string;
}

interface FormValues {
    film: string;
    gear: string;
}

const renderField = ({
    field, // { name, value, onChange, onBlur }
    ...props
}: any) => {
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

export const Form = props => {
    const suggestionsContext: any = React.useContext(AutoCompleteContext);
    const details = suggestionsContext.form;
    const handleInput = (e, type) => {
        suggestionsContext.setInput(e);
        suggestionsContext.setEditMode(true);
        suggestionsContext.setEditType(type);
    };
    return (
        <View>
            {!suggestionsContext.editMode ? (
                <Formik
                    enableReinitialize
                    initialValues={details}
                    onSubmit={values => console.log(values)}
                >
                    {({ values }) => (
                        <View style={Container.flexVerticalTop}>
                            <Field
                                onChangeText={(e) => { handleInput(e, 'film')}}
                                value={values.film}
                                label="FILM"
                                name="Film"
                                component={renderField}
                                placeholder=""
                            />
                            <Field
                                onChangeText={(e) => { handleInput(e, 'gear')}}
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
}

export const UploadDetails: React.FunctionComponent<Props> = props => {
    return (
        <View style={styles.container}>
            <CapaAutoCompleteProvider>
                <Form/>
                <CapaAutoComplete />
            </CapaAutoCompleteProvider>
        </View>
    );
}

function mapStateToProps(state: AppState): object {
    return {
        //details: { film: 'Test', gear: 'Canon F1 New' },
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, S3ActionTypes>): DispatchProps => ({
    dispatchSaveDetails: () => {
        console.log(dispatch);
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadDetails);
