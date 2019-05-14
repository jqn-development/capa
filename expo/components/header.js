import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const capaHeader = props => {
    const { navigation } = props;
    return (
        <Header
            barStyle="light-content"
            leftComponent={{ text: 'CAPA', style: { color: '#fff' } }}
            rightComponent={
                <View style={{ flexDirection: 'row' }}>
                    <Icon
                        name="search"
                        color="#fff"
                        onPress={() => {
                            navigation.navigate('SignIn');
                        }}
                        Component={TouchableOpacity}
                    />
                    <Icon
                        name="add"
                        color="#fff"
                        onPress={this.goForward}
                        Component={TouchableOpacity}
                    />
                </View>
            }
            containerStyle={{
                backgroundColor: 'black',
                justifyContent: 'space-around',
            }}
        />
    );
};

export default withNavigation(capaHeader);
