import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    flatListContainer: {
        justifyContent: 'flex-end',
        height: 120,
    },
});

export default class CapaImagePicker extends React.Component {
    state = { selectedPhoto: null };

    componentDidMount() {
        const { photos } = this.props;
        this.pickPhoto(photos[0]);
    }

    pickPhoto(photo) {
        const { onChange } = this.props;
        this.setState({ selectedPhoto: photo });
        onChange(photo);
    }

    renderPhoto = photo => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.pickPhoto(photo.item);
                }}
            >
                <Image source={{ uri: photo.item.uri }} style={{ width: 120, height: 120 }} />
            </TouchableOpacity>
        );
    };

    render() {
        const { selectedPhoto } = this.state;
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
                        <Text>Fetching photos...</Text>
                    )}
                </View>
            </View>
        );
    }
}

CapaImagePicker.propTypes = {
    onChange: PropTypes.func.isRequired,
    photos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
