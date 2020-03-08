import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import {
    NavigationScreenOptions,
    NavigationScreenComponent,
    NavigationParams,
} from 'react-navigation';
import { CapaPhotoScreenDetail } from '../components/CapaPhotoScreenDetail';
// @ts-ignore
import { vw, vh } from 'react-native-expo-viewport-units';
import { Colors, Container } from '../styles';

const styles = StyleSheet.create({
    container: {
        ...Container.flexVerticalTop,
        ...Colors.background,
    },
    imageView: {
        flex: 1,
        width: vw(100),
        flexDirection: 'column',
        marginTop: vh(10),
    },
});

export const PhotoScreen: NavigationScreenComponent = ({ navigation }: NavigationParams) => {
    const { photo } = navigation.state.params;
    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                <CapaPhotoScreenDetail data={photo.item}></CapaPhotoScreenDetail>
                <Image source={{ uri: photo.item.path }} style={{ aspectRatio: 3 / 2 }} />
            </View>
        </View>
    );
};

PhotoScreen.navigationOptions = (screenProps): NavigationScreenOptions => ({
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
                screenProps.navigation.goBack();
            }}
            Component={TouchableOpacity}
        />
    ),
});

export default PhotoScreen;