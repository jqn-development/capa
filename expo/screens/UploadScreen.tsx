import React from 'react';
import { CameraRoll, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import uuidv4 from 'uuid/v4';
import {
    NavigationScreenProp,
    NavigationScreenOptions,
    NavigationState,
    NavigationParams,
} from 'react-navigation';
import CapaUploadProgress from '../components/CapaUploadProgress';
import CapaImagePicker from '../components/CapaImagePicker';
import CapaCheckBoxIcon from '../components/CapaCheckBoxIcon';
import { storePhoto } from '../modules/s3/s3.service';
import { AppState } from '../store/rootReducer';
import { ThunkDispatch } from 'redux-thunk';

interface selectedPhoto  {
    filename: string;
    uri: string;
} 

interface UploadScreenState {
    photos: object;
    selectedPhoto: object;
}

interface UploadScreenProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    dispatchStorePhoto: Dispatch;
    uploadProgress: number;
    uploadFilename: string;
    uploadFileSize: number;
}

interface DispatchProps {
    dispatchStorePhoto: (photo: selectedPhoto) => void;
}

class UploadScreen extends React.Component<UploadScreenProps, UploadScreenState> {
    public static navigationOptions = ({ navigation }: NavigationParams): NavigationScreenOptions => ({
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
        headerRight: (
            <CapaCheckBoxIcon
                hide={navigation.getParam('uploadProgress', 0)}
                onPress={navigation.getParam('upload')}
            />
        ),
    });

    public state = { photos: null, selectedPhoto: null };

    public imagePicker = null;

    public constructor(props: UploadScreenProps) {
        super(props);
        this.imagePicker = React.createRef();
    }

    public componentDidMount(): void {
        const { navigation } = this.props;
        navigation.setParams({ upload: this.upload });
        this.getPhotosAsync({ first: 100, groupTypes: 'All', assetType: 'Photos' });
    }

    public async getPhotosAsync(params: any): Promise<any> {
        return new Promise(
            (res, rej): Promise<any> =>
                CameraRoll.getPhotos(params)
                    .then((data): void => {
                        const assets = data.edges;
                        const photos = assets.map((asset): object => asset.node.image);
                        this.setState({ photos });
                        res({ photos });
                    })
                    .catch(rej)
        );
    }

    public upload = (): void => {
        const { navigation } = this.props;
        const { dispatchStorePhoto } = this.props;
        const { selectedPhoto } = this.state;
        navigation.setParams({ uploadProgress: 1 });
        this.imagePicker.current.toggleGallery();
        dispatchStorePhoto(selectedPhoto);
    };

    public imagePickerChange(photo: selectedPhoto): void {
        const selectedPhoto: selectedPhoto = photo;
        if (!selectedPhoto.filename) {
            selectedPhoto.filename = uuidv4();
        }
        this.setState({ selectedPhoto });
    }

    public render(): JSX.Element {
        const { photos } = this.state;
        const { uploadProgress, uploadFilename, uploadFileSize } = this.props;
        const progressProps = { uploadProgress, uploadFilename, uploadFileSize };
        return (
            <View style={{ flex: 1 }}>
                {uploadProgress && <CapaUploadProgress {...progressProps} />}
                {photos && (
                    <CapaImagePicker
                        ref={this.imagePicker}
                        onChange={ (photo: selectedPhoto): void => this.imagePickerChange(photo)}
                        photos={photos}
                    />
                )}
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

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
    return {
        dispatchStorePhoto: (photo: selectedPhoto): void => {
            dispatch(
                storePhoto(photo, {
                    userId: 1,
                })
            );
        },
    };
}

const UploadConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadScreen);

export default UploadConnect;
