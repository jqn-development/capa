import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import {
    NavigationScreenProps,
    NavigationScreenOptions,
    NavigationScreenComponent,
    NavigationParams,
} from 'react-navigation';
// @ts-ignore
import { vw, vh } from 'react-native-expo-viewport-units';
import CapaCheckBoxIcon from '../components/CapaCheckBoxIcon';
import { Colors, Container } from '../styles';

const styles = StyleSheet.create({
    container: {
        paddingLeft: vw(10),
        paddingRight: vw(10),
        marginBottom: vh(0),
        ...Container.flexVerticalTop,
        ...Colors.background,
    },
    imageView: {
        flex: 1,
        width: vw(80),
        flexDirection: 'column',
        justifyContent: 'center',
    },
});

export const PhotoScreen: NavigationScreenComponent = ({ navigation }: NavigationParams) => {
    const { photo } = navigation.state.params;
    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                {
                    // @ts-ignore
                    <Image source={{ uri: photo.item.path }} style={{ aspectRatio: 3 / 2 }} />
                }
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
