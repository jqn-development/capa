import React from 'react';
import { CameraRoll, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import CapaUploadProgress from '../components/CapaUploadProgress';
import CapaImagePicker from '../components/CapaImagePicker';
import { storePhoto } from '../modules/s3/s3.service';

class UploadScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
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
                onPress={() => {
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

    state = { photos: null, selectedPhoto: null };

    constructor() {
        super();
        this.imagePicker = React.createRef();
    }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.setParams({ upload: this.upload });
        this.getPhotosAsync({ first: 100, groupTypes: 'All', assetType: 'Photos' });
    }

    async getPhotosAsync(params) {
        return new Promise((res, rej) =>
            CameraRoll.getPhotos(params)
                .then(data => {
                    const assets = data.edges;
                    const photos = assets.map(asset => asset.node.image);
                    this.setState({ photos });
                    res({ photos });
                })
                .catch(rej)
        );
    }

    upload = () => {
        const { navigation } = this.props;
        const { dispatchStorePhoto } = this.props;
        const { selectedPhoto } = this.state;
        navigation.setParams({ uploadProgress: 1 });
        this.imagePicker.current.toggleGallery();
        dispatchStorePhoto(selectedPhoto);
    };

    imagePickerChange(photo) {
        const selectedPhoto = photo;
        if (!selectedPhoto.filename) {
            selectedPhoto.filename = uuidv4();
        }
        this.setState({ selectedPhoto });
    }

    render() {
        const { photos } = this.state;
        const { uploadProgress, uploadFilename, uploadFileSize } = this.props;
        const progressProps = { uploadProgress, uploadFilename, uploadFileSize };
        return (
            <View style={{ flex: 1 }}>
                {uploadProgress && <CapaUploadProgress {...progressProps} />}
                {photos && (
                    <CapaImagePicker
                        ref={this.imagePicker}
                        onChange={photo => this.imagePickerChange(photo)}
                        photos={photos}
                    />
                )}
            </View>
        );
    }
}

UploadScreen.propTypes = {
    uploadProgress: PropTypes.number,
    uploadFileSize: PropTypes.number,
    uploadFilename: PropTypes.string,
    dispatchStorePhoto: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        setParams: PropTypes.func.isRequired,
    }).isRequired,
};

UploadScreen.defaultProps = {
    uploadProgress: null,
    uploadFileSize: null,
    uploadFilename: null,
};

function mapStateToProps(store) {
    return {
        uploadProgress: store.s3.uploadProgress,
        uploadFilename: store.s3.uploadFilename,
        uploadFileSize: store.s3.uploadFileSize,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchStorePhoto: photo => {
            dispatch(
                storePhoto(photo, {
                    userId: 1,
                    caption: 'caption',
                    lat: 5,
                    long: 8,
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
