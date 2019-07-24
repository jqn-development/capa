import Types from 'MyTypes';
import * as React from 'react';
import { CameraRoll, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import uuidv4 from 'uuid/v4';
import {
    NavigationScreenProp,
    NavigationScreenOptions,
    NavigationState,
    NavigationParams,
} from 'react-navigation';
import CapaUploadProgress from '../components/CapaUploadProgress';
import CapaImagePicker from '../components/CapaImagePicker';
import { storePhoto } from '../modules/s3/s3.service';

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface selectedPhoto {
    filename: string;
}

interface UploadScreenProps {
    navigation: Navigation;
    dispatchStorePhoto: Dispatch<Types.RootAction>;
    uploadProgress: number;
    uploadFilename: string;
    uploadFileSize: number;
}

class UploadScreen extends React.Component<UploadScreenProps> {
    public static navigationOptions = ({ navigation }): NavigationScreenOptions => ({
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
        headerRight: !navigation.getParam('uploadProgress', 0) && (
            <Icon
                name="done"
                color="#fff"
                testID="uploadImage"
                onPress={navigation.getParam('upload')}
                Component={TouchableOpacity}
            />
        ),
    });

    public state = { photos: null, selectedPhoto: null };

    public imagePicker = null;

    public constructor(UploadScreenProps: any) {
        super(UploadScreenProps);
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
                        onChange={(photo): void => this.imagePickerChange(photo)}
                        photos={photos}
                    />
                )}
            </View>
        );
    }
}

function mapStateToProps(store: Types.RootState): any {
    return {
        uploadProgress: store.s3.uploadProgress,
        uploadFilename: store.s3.uploadFilename,
        uploadFileSize: store.s3.uploadFileSize,
    };
}

function mapDispatchToProps(dispatch: Dispatch<Types.RootAction>): any {
    return {
        dispatchStorePhoto: (photo): void => {
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
