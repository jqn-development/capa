import React from 'react';
import {
    CameraRoll,
    TouchableOpacity,
    View,
    GetPhotosReturnType,
    GetPhotosParamType,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import {
    NavigationScreenProp,
    NavigationScreenOptions,
    NavigationState,
    NavigationParams,
} from 'react-navigation';
import { ThunkDispatch } from 'redux-thunk';
import CapaUploadProgress from '../components/CapaUploadProgress';
import CapaImagePicker from '../components/CapaImagePicker';
import CapaCheckBoxIcon from '../components/CapaCheckBoxIcon';
import { storePhoto } from '../modules/s3/s3.service';
import { AppState } from '../store/rootReducer';
import { S3ActionTypes } from '../modules/s3/types/actions';

interface CameraRollImage {
    uri: string;
    height: number;
    width: number;
    playableDuration: number;
    isStored?: boolean;
}

interface SelectedPhoto {
    filename: string;
    uri: string;
}

interface UploadScreenState {
    photos: CameraRollImage[] | null;
    selectedPhoto: SelectedPhoto | null;
}

interface UploadScreenProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    dispatchStorePhoto: (photo: SelectedPhoto) => void;
    uploadProgress: number | undefined;
    uploadFilename: string | null;
    uploadFileSize: number;
}

interface DispatchProps {
    return: { dispatchStorePhoto: (photo: SelectedPhoto) => void };
}

class UploadScreen extends React.Component<UploadScreenProps, UploadScreenState> {
    public static navigationOptions = ({
        navigation,
    }: NavigationParams): NavigationScreenOptions => ({
        headerStyle: {
            backgroundColor: '#000',
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

    public state: UploadScreenState = { photos: null, selectedPhoto: null };

    public imagePicker: React.RefObject<CapaImagePicker>;

    public constructor(props: UploadScreenProps) {
        super(props);
        this.imagePicker = React.createRef();
    }

    public componentDidMount(): void {
        const { navigation } = this.props;
        navigation.setParams({ upload: this.upload });
        this.getPhotosAsync({ first: 100, assetType: 'Photos' });
    }

    // fetches camera roll images
    public async getPhotosAsync(params: GetPhotosParamType): Promise<CameraRollImage[]> {
        return new Promise(
            (res, rej): Promise<void> =>
                CameraRoll.getPhotos(params)
                    .then((data: GetPhotosReturnType): void => {
                        let photos: CameraRollImage[];
                        if (data.edges.length > 0) {
                            const assets = data.edges;
                            photos = assets.map((asset): CameraRollImage => asset.node.image);
                            this.imagePickerChange(photos[0].uri);
                            this.setState({ photos });
                            res(photos);
                        }
                    })
                    .catch(rej)
        );
    }

    public upload = (): void => {
        const { navigation } = this.props;
        const { dispatchStorePhoto } = this.props;
        const { selectedPhoto } = this.state;
        const pickerRef = this.imagePicker.current;
        navigation.setParams({ uploadProgress: 1 });
        if (pickerRef) {
            pickerRef.toggleGallery();
        }
        if (selectedPhoto) {
            dispatchStorePhoto(selectedPhoto);
        }
    };

    public imagePickerChange(uri: string): void {
        this.setState({ selectedPhoto: { uri, filename: uuidv4() } });
    }

    public render(): JSX.Element {
        const { photos } = this.state;
        const { uploadProgress, uploadFilename, uploadFileSize } = this.props;
        const progressProps = { uploadProgress, uploadFilename, uploadFileSize };
        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}>
                {uploadProgress && <CapaUploadProgress {...progressProps} />}
                {photos && (
                    <CapaImagePicker
                        ref={this.imagePicker}
                        onChange={(photo: { uri: string }): void =>
                            this.imagePickerChange(photo.uri)
                        }
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

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, S3ActionTypes>): object => ({
    dispatchStorePhoto: (photo: SelectedPhoto): void => {
        dispatch(storePhoto(photo));
    },
});

const UploadConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadScreen);

export default UploadConnect;
