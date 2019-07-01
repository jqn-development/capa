import React from 'react';
import {
    FlatList,
    Image,
    View,
    CameraRoll,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Colors, Container } from '../styles';

const styles = StyleSheet.create({
    container: {
        ...Colors.background,
        ...Container.flexVerticalCenter,
    },
    image: {
        flex: 1,
        margin: 1,
    },
});

export default class UploadScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
            ...Colors.background,
        },
    };

    state = { photos: null, selectedPhoto: null };

    constructor(props) {
        super(props);
        this.pickPhoto = this.pickPhoto.bind(this);
        this.renderPhoto = this.renderPhoto.bind(this);
    }

    componentDidMount() {
        this.getPhotosAsync({ first: 10 });
    }

    async getPhotosAsync(params) {
        return new Promise((res, rej) =>
            CameraRoll.getPhotos(params)
                .then(data => {
                    const assets = data.edges;
                    const photos = assets.map(asset => asset.node.image);
                    const selectedPhoto = photos[0];
                    this.setState({ photos });
                    this.setState({ selectedPhoto });
                    res({ photos });
                })
                .catch(rej)
        );
    }

    pickPhoto(selectedPhoto) {
        this.setState({ selectedPhoto });
    }

    renderPhoto(photo) {
        return (
            <TouchableOpacity onPress={() => this.pickPhoto(photo.item)}>
                <Image source={{ uri: photo.item.uri }} style={{ width: 120, height: 120 }} />
            </TouchableOpacity>
        );
    }

    render() {
        const { photos, selectedPhoto } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <View style={{ flex: 1, backgroundColor: 'black' }}>
                    {selectedPhoto && (
                        <Image
                            resizeMode="contain"
                            source={{ uri: selectedPhoto.uri }}
                            style={{ flex: 1 }}
                        />
                    )}
                </View>
                <View style={{ justifyContent: 'flex-end', height: 120 }}>
                    {photos ? (
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={photo => {
                                return this.renderPhoto(photo);
                            }}
                            keyExtractor={(photo, index) => index.toString()}
                            data={photos}
                        />
                    ) : (
                        <Text style={styles.paragraph}>Fetching photos...</Text>
                    )}
                </View>
            </View>
        );
    }
}
