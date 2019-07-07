import React from 'react';
import { CameraRoll, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
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
        this.props.navigation.setParams({ upload: this.upload });
        this.getPhotosAsync({ first: 10 });
    }

    async getPhotosAsync(params) {
        return new Promise((res, rej) =>
            CameraRoll.getPhotos(params)
                .then(data => {
                    console.log(data);
                    const assets = data.edges;
                    const photos = assets.map(asset => asset.node.image);
                    this.setState({ photos });
                    res({ photos });
                })
                .catch(rej)
        );
    }

    upload = () => {
        this.props.dispatchStorePhoto(this.state.selectedPhoto);
    };

    imagePickerChange(photo) {
        this.setState({ selectedPhoto: photo });
    }

    render() {
        const { photos } = this.state;
        return (
            <View style={{ flex: 1 }}>
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
            ).catch(error => {
                console.log(error);
            });
        },
    };
}

const UploadConnect = connect(
    null,
    mapDispatchToProps
)(UploadScreen);

export default UploadConnect;
