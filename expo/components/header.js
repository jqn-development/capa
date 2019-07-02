import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

const capaHeader = props => {
    const { navigation, search, add } = props;
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
                            color="#fff"
                            onPress={() => {
                                navigation.navigate('Upload');
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
    search: PropTypes.bool.isRequired,
    add: PropTypes.bool.isRequired,
};

export default withNavigation(capaHeader);
