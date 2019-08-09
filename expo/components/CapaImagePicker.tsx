import React from 'react';
import { View, Image, FlatList, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    flatListContainer: {
        justifyContent: 'flex-end',
        height: 120,
    },
    galleryImage: {
        width: 120,
        height: 120,
    },
});
interface CameraRollImage {
    uri: string;
    height: number;
    width: number;
    playableDuration: number;
    isStored?: boolean;
}

interface Photo {
    uri: string;
}

interface State {
    isLoadingComplete?: boolean;
    skipLoadingScreen?: boolean;
    selectedPhoto?: Photo | null;
    bounceValue: any;
}

interface Props {
    onChange: (photo: Photo) => void;
    photos: CameraRollImage[];
}

export default class CapaImagePicker extends React.Component<Props, State> {
    state: State = { selectedPhoto: null, bounceValue: new Animated.Value(100) };

    componentDidMount(): void {
        const { photos } = this.props;
        this.pickPhoto({ uri: photos[0].uri });
    }

    pickPhoto(photo: Photo): void {
        const { onChange } = this.props;
        this.setState({ selectedPhoto: photo });
        onChange(photo);
    }

     renderPhoto = (photo: any) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.pickPhoto(photo.item);
                }}
            >
                <Image source={{ uri: photo.item.uri }} style={styles.galleryImage} />
            </TouchableOpacity>
        );
    };

    toggleGallery() {
        const { bounceValue } = this.state;
        Animated.spring(bounceValue, {
            toValue: 220,
            velocity: 3,
            tension: 2,
            friction: 8,
            useNativeDriver: true,
        }).start();
    }

    render() {
        const { selectedPhoto, bounceValue } = this.state;
        const { photos } = this.props;
        return (
            <View style={styles.flexContainer}>
                <View style={styles.flexContainer}>
                    {selectedPhoto && (
                        <Image
                            resizeMode="contain"
                            source={{ uri: selectedPhoto.uri }}
                            style={{ flex: 1 }}
                        />
                    )}
                </View>
                <View style={styles.flatListContainer}>
                    {photos ? (
                        <Animated.View
                            style={[{ height: 220 }, { transform: [{ translateY: bounceValue }] }]}
                        >
                            <FlatList
                                testID="flatListGallery"
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={photo => {
                                    return this.renderPhoto(photo);
                                }}
                                keyExtractor={(photo, index) => index.toString()}
                                data={photos}
                            />
                        </Animated.View>
                    ) : (
                        <Text>Fetching photos...</Text>
                    )}
                </View>
            </View>
        );
    }
}
