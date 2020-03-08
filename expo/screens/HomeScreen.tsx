import React from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
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

const USER_PHOTOS = gql`
    {
        photoMany(filter: { userId: "5c755cec4eb80249186a90ef" }, limit: 30, sort: _ID_ASC) {
            _id
            user {
                first
                last
            }
            userRef
            path
            location {
                coord {
                    lat
                    lng
                }
            }
        }
    }
`;

interface HomeScreenProps {
    loggedIn: boolean;
    authToken: string | null;
    userId: string;
    navigation: any;
}

const HomeScreen = (props: HomeScreenProps) => {
    const { navigation } = props;
    const { loading, error, data, refetch } = useQuery(USER_PHOTOS);
    if (error) {
        console.log(error);
    }
    navigation.addListener('willFocus', () => {
        // eslint-disable-next-line no-unused-expressions
        refetch && refetch().catch(e => e && console.log(e));
    });
    const renderPhoto = ListItem => {
        return (
            <TouchableOpacity
                onPress={() => {
                    // on press handler
                    navigation.navigate('PhotoScreen', { photo: ListItem });
                }}
            >
                <Image
                    resizeMode="cover"
                    source={{ uri: ListItem.item.path }}
                    style={styles.galleryImage}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <CapaHeader add search />
            {data ? (
                <FlatList
                    testID="flatListGallery"
                    numColumns={3}
                    renderItem={photo => {
                        return renderPhoto(photo);
                    }}
                    keyExtractor={(photo, index) => index.toString()}
                    data={data.photoMany}
                />
            ) : null}
        </View>
    );
};

HomeScreen.navigationOptions = () => ({
    header: null,
    headerStyle: {
        backgroundColor: '#000',
        borderBottomWidth: 0,
    },
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
