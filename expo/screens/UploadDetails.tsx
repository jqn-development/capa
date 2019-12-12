import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import {
    NavigationScreenProps,
    NavigationScreenOptions,
    NavigationScreenComponent,
    NavigationParams,
} from 'react-navigation';
// @ts-ignore
import { vw, vh } from 'react-native-expo-viewport-units';
import { ThunkDispatch } from 'redux-thunk';
import { CapaAutoCompleteProvider } from '../components/CapaAutoCompleteProvider';
import CapaAutoComplete from '../components/CapaAutoComplete';
import PhotoDetailsForm from '../components/CapaPhotoDetailsForm';
import { S3ActionTypes } from '../modules/s3/types/actions';
import { Colors, Container, InputField } from '../styles';

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
    avatarContainerStyle: {
        marginTop: 10,
        marginRight: 10,
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

interface NavStatelessComponent extends React.StatelessComponent {
    navigationOptions?: NavigationScreenOptions;
}

export const UploadDetails: NavigationScreenComponent = ({
    navigation,
    dispatchSaveDetails,
}: NavigationParams) => {
    const { photo } = navigation.state.params;
    return (
        <View style={styles.containerNoPadding}>
            <CapaAutoCompleteProvider>
                <PhotoDetailsForm photo={photo} handleSave={dispatchSaveDetails} />
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
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, S3ActionTypes>): DispatchProps => ({
    dispatchSaveDetails: data => {
        console.log(data);
    },
});

export default connect(
    null,
    mapDispatchToProps
)(UploadDetails);
