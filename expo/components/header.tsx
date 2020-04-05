import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';
// @ts-ignore
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

const capaHeader = (props: any ) => {
    const { navigation, search, add, profile } = props;
    return (
        <Header
            barStyle="light-content"
            leftComponent={{ text: 'CAPA', style: { color: '#fff' } }}
            rightComponent={
                <View style={{ flexDirection: 'row' }}>
                    {search && (
                        <Icon
                            name="search"
                            color="#fff"
                            onPress={() => {
                                navigation.navigate('SignIn');
                            }}
                            Component={TouchableOpacity}
                        />
                    )}
                    {add && (
                        <Icon
                            name="add"
                            testID="upload"
                            color="#fff"
                            onPress={() => {
                                navigation.navigate('Upload');
                            }}
                            Component={TouchableOpacity}
                        />
                    )}
                    {profile && (
                        <Icon
                            name="user"
                            testID="profile"
                            type="font-awesome"
                            color="#fff"
                            onPress={() => {
                                navigation.navigate('ProfileScreen');
                            }}
                            Component={TouchableOpacity}
                        />
                    )}
                </View>
            }
            containerStyle={{
                backgroundColor: 'black',
                justifyContent: 'space-around',
                borderBottomWidth: 0,
            }}
        />
    );
};

capaHeader.propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    search: PropTypes.bool,
    add: PropTypes.bool,
};

export default withNavigation(capaHeader);
