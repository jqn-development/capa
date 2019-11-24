import React, { useState } from 'react';
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
import { vw, vh } from 'react-native-expo-viewport-units';
import { Formik, Field } from 'formik';
import { ThunkDispatch } from 'redux-thunk';
import config from '../config';
import CapaAutoComplete from '../components/CapaAutoComplete';
import CapaPhotoSettingsFooter from '../components/CapaPhotoSettingsFooter';
import {
    CapaAutoCompleteProvider,
    useAutoCompleteContext,
} from '../components/CapaAutoCompleteProvider';
import { S3ActionTypes } from '../modules/s3/types/actions';
import { Colors, Container, InputField } from '../styles';
import registerGfx from '../assets/images/bp.jpg';

const styles = StyleSheet.create({
    container: {
        paddingLeft: vw(10),
        paddingRight: vw(10),
        marginBottom: vh(10),
    },
    containerNoPadding: {
        ...Container.flexVerticalTop,
        ...Colors.background,
    },
    errorMessage: {
        ...Colors.errorText,
        paddingTop: 20,
        paddingLeft: 10,
        fontSize: 10,
    },
    imageView: {
        flex: 1,
        width: vw(90),
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: vw(5),
        marginLeft: vw(5),
    },
});

interface Props extends NavigationScreenProps {
    errorMessage: string;
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
            keyboardAppearance="dark"
            {...field}
            {...props}
        />
    );
};

export const UploadDetailsForm = () => {
    const suggestionsContext = useAutoCompleteContext();
    const [activeTab, setActiveTab] = useState(null);
    const onFocusHandle = (type: string, apiUrl: string) => {
        suggestionsContext.setActiveUrl(apiUrl);
        suggestionsContext.setEditMode(true);
        if (type === 'location') {
            suggestionsContext.setMapMode(true);
        } else {
            suggestionsContext.setMapMode(false);
        }
        suggestionsContext.setActive(type);
        // push input value on form state
        if (!suggestionsContext.form[type]) {
            const formState = {
                ...suggestionsContext.form,
                [type as string]: '',
            };
            suggestionsContext.setForm(formState);
        }
    };
    return !suggestionsContext.editMode ? (
        <View>
            <View style={styles.imageView}>
                <FullWidthImage source={registerGfx} ratio={10 / 16} />
            </View>
            <Formik<FormValues | {}>
                enableReinitialize
                initialValues={suggestionsContext.form}
                onSubmit={values => console.log(values)}
            >
                {({ values }: { values: FormValues }) => (
                    <View style={[styles.container]}>
                        {activeTab === 'Film' && (
                            <Field
                                onFocus={() => {
                                    onFocusHandle('film', `${config.url}/api/film/suggestions`);
                                }}
                                value={values.film}
                                label="FILM"
                                name="Film"
                                component={renderField}
                                placeholder=""
                            />
                        )}
                        {activeTab === 'Camera' && (
                            <Field
                                onFocus={() => {
                                    onFocusHandle('gear', `${config.url}/api/camera/suggestions`);
                                }}
                                value={values.gear}
                                label="CAMERA"
                                name="Gear"
                                component={renderField}
                                placeholder=""
                            />
                        )}
                        {activeTab === 'Location' && (
                            <Field
                                onFocus={() => {
                                    onFocusHandle('location', `${config.url}/api/location`);
                                }}
                                value={values.location}
                                label="LOCATION"
                                name="Location"
                                component={renderField}
                                placeholder=""
                            />
                        )}
                    </View>
                )}
            </Formik>
            <CapaPhotoSettingsFooter changeActiveTab={tab => setActiveTab(tab)} />
        </View>
    ) : null;
};

export const UploadDetails: NavigationScreenComponent = () => {
    return (
        <View style={styles.containerNoPadding}>
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
    headerLeft: false && (
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
