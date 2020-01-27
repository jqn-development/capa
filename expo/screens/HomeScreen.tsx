import React, { useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import CapaHeader from '../components/header';
import { Colors, Container } from '../styles';
import { AppState } from '../store/rootReducer';
import config from '../config';

const styles = StyleSheet.create({
    container: {
        ...Container.flexVerticalTop,
        ...Colors.background,
    },
    loggedInDesc: {
        ...Colors.whiteText,
    },
    galleryImage: {
        width: 120,
        height: 120,
    },
});

interface HomeScreenProps {
    loggedIn: boolean;
    authToken: string | null;
    userId: string;
}

const HomeScreen: NavigationScreenComponent = (props: HomeScreenProps) => {
    const { loggedIn, authToken, userId } = props;
    let userPhotos = null;
    const getPhotos = () => {
        return axios.get(`${config.url}/api/user/${userId}/photos`, {
            headers: {
                Accept: 'application/json',
                authorization: `Bearer ${authToken}`,
            },
        });
    };
    const renderPhoto = (ListItem: ListRenderItemInfo<CameraRollImage>) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    //test
                }}
            >
                <Image source={{ uri: ListItem.path }} style={styles.galleryImage} />
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        // Setup a timer to reset our session_token every 3 minutes.
        getPhotos()
            .then(function(data) {
                userPhotos = data.user;
            })
            .catch(error => {
                console.log(error);
            });
        // Cleanup clearInterval and abort any http calls on unmount.
    }, []);
    return (
        <View style={styles.container}>
            <CapaHeader add search />
            <FlatList
                testID="flatListGallery"
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={photo => {
                    return renderPhoto(photo);
                }}
                keyExtractor={(photo, index) => index.toString()}
                data={userPhotos}
            />
            {loggedIn ? (
                <Text style={styles.loggedInDesc}>You are logged in with token: {authToken}</Text>
            ) : null}
        </View>
    );
};

function mapStateToProps(state: AppState) {
    return {
        errorMessage: state.auth.loginError,
        loggedIn: state.auth.loggedIn,
        authToken: state.auth.authToken,
        userId: state.user.id,
    };
}

export default connect(mapStateToProps)(HomeScreen);
