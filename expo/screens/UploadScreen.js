import React from 'react';
import { CameraRoll, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import { vw } from 'react-native-expo-viewport-units';
import * as S3Reducer from '../modules/s3/s3.reducer';
import CapaImagePicker from '../components/CapaImagePicker';
import { storePhoto } from '../modules/s3/s3.service';

class UploadScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: 'black',
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
        headerRight: (
            <Icon
                name="done"
                color="#fff"
                onPress={navigation.getParam('upload')}
                Component={TouchableOpacity}
            />
        ),
    });

    state = { photos: null, selectedPhoto: null };

    componentDidMount() {
        const { navigation } = this.props;
        navigation.setParams({ upload: this.upload });
        this.getPhotosAsync({ first: 10 });
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
        const { dispatchStorePhoto } = this.props;
        const { selectedPhoto } = this.state;
        dispatchStorePhoto(selectedPhoto);
    };

    imagePickerChange(photo) {
        this.setState({ selectedPhoto: photo });
    }

    render() {
        const { photos } = this.state;
        const { uploadProgress } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                {uploadProgress &&
                    <View>
                        <Progress.Bar
                            unfilledColor="black"
                            borderRadius={0}
                            borderWidth={0}
                            height={1}
                            color="white"
                            progress={uploadProgress}
                            width={vw(100)}
                        />
                    </View>
                }
                {photos && (
                    <CapaImagePicker
                        onChange={photo => this.imagePickerChange(photo)}
                        photos={photos}
                    />
                )}
            </View>
        );
    }
}
function mapStateToProps(store) {
    return {
        uploadProgress: store.s3.uploadProgress,
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
            )
                .then(() => {
                    dispatch(S3Reducer.setUploadProgress(null));
                })
                .catch(error => {
                    console.log(error);
                });
        },
    };
}

const UploadConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadScreen);

export default UploadConnect;
