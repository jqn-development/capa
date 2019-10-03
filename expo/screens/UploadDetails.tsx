import React from 'react';
import { connect } from 'react-redux';
import {
    NavigationScreenProp,
    NavigationScreenOptions,
    NavigationState,
    NavigationParams,
} from 'react-navigation';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store/rootReducer';
import { S3ActionTypes } from '../modules/s3/types/actions';

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
        return <View style={{ flex: 1 }}></View>;
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

export default UploadDetailsConnect;
