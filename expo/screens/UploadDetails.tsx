import React from 'react';
import { connect } from 'react-redux';
import {
    NavigationScreenProp,
    NavigationScreenOptions,
    NavigationParams,
} from 'react-navigation';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { vw } from 'react-native-expo-viewport-units';
import { reduxForm } from 'redux-form';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store/rootReducer';
import { S3ActionTypes } from '../modules/s3/types/actions';
import GenericField from '../components/fields/genericField';
import { Colors, Container, InputField } from '../styles';

const styles = StyleSheet.create({
    container: {
        ...Container.flexVerticalTop,
        ...Colors.background,
        paddingLeft: vw(5),
        paddingRight: vw(5),
    },
    errorMessage: {
        ...Colors.errorText,
        paddingTop: 20,
        paddingLeft: 10,
        margin: 0,
        fontSize: 10,
    },
    input: {
        ...InputField.input,
        ...InputField.inputUnderline,
    },
});

interface UploadDetailsProps {
}

class UploadDetails extends React.Component<UploadDetailsProps, UploadDetailsState> {
    public static navigationOptions = ({
        navigation,
    }: NavigationParams): NavigationScreenOptions => ({
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

    public render(): JSX.Element {
        return (
            <View style={styles.container}>
                <View>
                    <GenericField label="FILM" name="name" inputContainerStyle={styles.input} />
                    <GenericField label="Camera" name="name" inputContainerStyle={styles.input} />
                    <GenericField label="Location" name="name" inputContainerStyle={styles.input} />
                    <Text style={styles.errorMessage}>Error</Text>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state: AppState): object {
    return {
        uploadProgress: state.s3.uploadProgress,
        uploadFilename: state.s3.uploadFilename,
        uploadFileSize: state.s3.uploadFileSize,
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, S3ActionTypes>): object => ({
});

const UploadDetailsConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadDetails);

export default reduxForm({
    form: 'registrationForm',
})(UploadDetailsConnect);
