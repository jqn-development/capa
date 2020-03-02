import React, { useState } from 'react';
import { Formik, Field } from 'formik';
// @ts-ignore
import { vw, vh } from 'react-native-expo-viewport-units';
import axios from 'axios';
import { connect } from 'react-redux';
import { Icon, Input, Header } from 'react-native-elements';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Colors, InputField } from '../styles';
import {
    useAutoCompleteContext,
    AutoCompleteContext,
} from '../components/CapaAutoCompleteProvider';
import { AppState } from '../store/rootReducer';
import CapaPhotoSettingsFooter from '../components/CapaPhotoSettingsFooter';
// @ts-ignore
import { withNavigation } from 'react-navigation';
import config from '../config';

const styles = StyleSheet.create({
    inputContainerStyle: {
        ...InputField.input,
        ...InputField.inputUnderline,
        marginTop: 20,
    },
    container: {
        paddingLeft: vw(10),
        paddingRight: vw(10),
        marginBottom: vh(10),
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

interface FormValues {
    [key: string]: Item;
}

interface Item {
    id: string;
    name: string;
    avatar?: string;
}

const renderField = ({
    field, // { name, value, onChange, onBlur }
    ...props
}: {
    field: object;
}) => {
    // @ts-ignore
    const { value } = props;
    return (
        <Input
            placeholderTextColor="white"
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={[InputField.inputContainer]}
            inputStyle={[Colors.whiteText, InputField.inputText]}
            keyboardAppearance="dark"
            leftIcon={<Icon name="search" color="#fff" />}
            leftIconContainerStyle={{
                marginLeft: 0,
                paddingRight: 5,
                display: value ? 'none' : 'flex',
            }}
            {...field}
            {...props}
        />
    );
};

const PhotoDetailsForm = (props: { navigation: any; photo: string; token: string; id: string; userId: string }) => {
    const suggestionsContext = useAutoCompleteContext();
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const { photo, token, id, userId, navigation } = props;
    const onFocusHandle = (type: string, apiUrl: string) => {
        suggestionsContext.setActiveUrl(apiUrl);
        suggestionsContext.setEditMode(true);
        if (type === 'location') {
            suggestionsContext.setMapMode(true);
        } else {
            suggestionsContext.setMapMode(false);
        }
        suggestionsContext.setActive(type);
    };
    const handleSave = (data: AutoCompleteContext) => {
        const jsondata = {
            id: id,
            body: JSON.stringify({ ...data.form, userId: userId }),
        };
        return axios.put(`${config.url}/api/photo/photos`, jsondata, {
            headers: {
                Accept: 'application/json',
                authorization: `Bearer ${token}`,
            },
        });
    };
    return !suggestionsContext.editMode ? (
        <View>
            <Header
                barStyle="light-content"
                leftComponent={{ text: 'CAPA', style: { color: '#fff' } }}
                rightComponent={
                    <Icon
                        name="check"
                        color="#fff"
                        onPress={(): void => {
                            handleSave(suggestionsContext).then(() => {
                                navigation.navigate('Home');
                            });;
                        }}
                        Component={TouchableOpacity}
                    />
                }
                containerStyle={{
                    backgroundColor: 'black',
                    justifyContent: 'space-around',
                    borderBottomWidth: 0,
                }}
            />
            <View style={styles.imageView}>
                {
                    // @ts-ignore
                    <Image source={{ uri: photo }} style={{ aspectRatio: 3 / 2 }} />
                }
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
                                value={values.film.name}
                                label="FILM"
                                name="Film"
                                component={renderField}
                                placeholder=""
                            />
                        )}
                        {activeTab === 'Camera' && (
                            <Field
                                onFocus={() => {
                                    onFocusHandle('camera', `${config.url}/api/camera/suggestions`);
                                }}
                                value={values.camera.name}
                                label="CAMERA"
                                name="Camera"
                                component={renderField}
                                placeholder=""
                            />
                        )}
                        {activeTab === 'Location' && (
                            <Field
                                onFocus={() => {
                                    onFocusHandle('location', `${config.url}/api/location`);
                                }}
                                value={values.location.name}
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

function mapStateToProps(state: AppState): object {
    return {
        token: state.auth.authToken,
        userId: state.user.id,
    };
}

export default connect(
    mapStateToProps,
    null
)(withNavigation(PhotoDetailsForm));
