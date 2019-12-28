import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
    NavigationScreenProps,
    NavigationScreenOptions,
    NavigationScreenComponent,
    NavigationParams,
} from 'react-navigation';
// @ts-ignore
import { vw, vh } from 'react-native-expo-viewport-units';
import { CapaAutoCompleteProvider } from '../components/CapaAutoCompleteProvider';
import CapaAutoComplete from '../components/CapaAutoComplete';
import PhotoDetailsForm from '../components/CapaPhotoDetailsForm';
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

interface Item {
    id: string;
    name: string;
    avatar?: string;
}

interface NavStatelessComponent extends React.StatelessComponent {
    navigationOptions?: NavigationScreenOptions;
}

export const UploadDetails: NavigationScreenComponent = ({ navigation }: NavigationParams) => {
    const { photo } = navigation.state.params;
    return (
        <View style={styles.containerNoPadding}>
            <CapaAutoCompleteProvider>
                <PhotoDetailsForm photo={photo} />
                <CapaAutoComplete />
            </CapaAutoCompleteProvider>
        </View>
    );
};

UploadDetails.navigationOptions = (): NavigationScreenOptions => ({
    header: null,
    headerStyle: {
        backgroundColor: '#000',
    },
});

export default UploadDetails;
