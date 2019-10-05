import React from 'react';
import { connect } from 'react-redux';
import {
    NavigationScreenProp,
    NavigationScreenOptions,
    NavigationParams,
    NavigationState,
} from 'react-navigation';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon, Input } from 'react-native-elements';
// @ts-ignore
import { vw } from 'react-native-expo-viewport-units';
import { Formik, withFormik, Field } from 'formik';
import { ThunkDispatch } from 'redux-thunk';
import NavigationService from '../navigation/service';
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

const data = {
    camera: [
        {
            id: 'test',
            name: 'CANON F1',
        },
    ],
    film: [
        {
            id: 'test',
            name: 'ILFORD DELTA 100',
            avatar: 'http://i.imgur.com/9Ttuw8c.jpg',
        },
        {
            id: 'ilf12',
            name: 'ILFORD HP5',
            avatar: 'http://i.imgur.com/9Ttuw8c.jpg',
        },
        {
            id: 'kodak232',
            name: 'KODAK PORTRA 100',
            avatar: 'http://i.imgur.com/9Ttuw8c.jpg',
        },
    ],
};

class UploadDetails extends React.Component<Props, State> {
    public static navigationOptions = ({
        navigation,
    }: NavigationParams): NavigationScreenOptions => ({
        headerStyle: {
            backgroundColor: '#000',
            marginLeft: 15,
            marginRight: 15,
            borderBottomWidth: 0,
        },
        animationEnabled: false,
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

    public render(): JSX.Element {
        const { details } = this.props;
        return (
            <View style={styles.container}>
                <Formik initialValues={details} onSubmit={values => console.log(values)}>
                    {({ handleChange, values }) => (
                        <View style={Container.flexVerticalTop}>
                            <Field
                                onChangeText={handleChange('Film')}
                                value={values.Film}
                                label="FILM"
                                name="Film"
                                component={renderField}
                                placeholder=""
                                onFocus={() =>
                                    NavigationService.navigate('AutoComplete', {
                                        suggestions: data.film,
                                    })
                                }
                            />
                            <Field
                                onChangeText={handleChange('Gear')}
                                value={values.Gear}
                                label="GEAR"
                                name="Gear"
                                component={renderField}
                                placeholder=""
                                onFocus={() =>
                                    NavigationService.navigate('AutoComplete', {
                                        suggestions: data.camera,
                                    })
                                }
                            />
                        </View>
                    )}
                </Formik>
            </View>
        );
    }
}

function mapStateToProps(state: AppState): object {
    return {
        details: { Film: 'Ilford HP5', Gear: 'Canon F1 New' },
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
)(withFormik({ mapPropsToValues: (props) => ({ details: props.details })})(UploadDetails));
