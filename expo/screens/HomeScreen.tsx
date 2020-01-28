import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
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
        width: 140,
        height: 140,
    },
});

interface HomeScreenProps {
    loggedIn: boolean;
    authToken: string | null;
    userId: string;
}

const HomeScreen = (props: HomeScreenProps) => {
    const { authToken, userId } = props;
    const [userPhotos, setUserPhotos] = useState(null);
    const getPhotos = () => {
        return axios.get(`${config.url}/api/user/${userId}/photos`, {
            headers: {
                Accept: 'application/json',
                authorization: `Bearer ${authToken}`,
            },
        });
    };
    const renderPhoto = (ListItem) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    // on press handler
                }}
            >
                <Image
                    resizeMode="contain"
                    source={{ uri: ListItem.item.path }}
                    style={styles.galleryImage}
                />
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        getPhotos()
            .then(function(data) {
                setUserPhotos(data.data.user);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <View style={styles.container}>
            <CapaHeader add search />
            {userPhotos ? (
                <FlatList
                    testID="flatListGallery"
                    numColumns={3}
                    renderItem={photo => {
                        return renderPhoto(photo);
                    }}
                    keyExtractor={(photo, index) => index.toString()}
                    data={userPhotos}
                />
            ) : null}
        </View>
    );
};

HomeScreen.navigationOptions = () => ({
    header: null,
});

function mapStateToProps(state: AppState) {
    return {
        errorMessage: state.auth.loginError,
        loggedIn: state.auth.loggedIn,
        authToken: state.auth.authToken,
        userId: state.user.id,
    };
}

export default connect(mapStateToProps)(HomeScreen);
