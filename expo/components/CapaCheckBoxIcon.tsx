import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

const CapaCheckBoxIcon = (props) => {
    return (
        !props.hide ?
        <View testID="uploadImage">
            <Icon
                name="done"
                color="#fff"
                onPress={props.onPress}
                Component={TouchableOpacity}
            />
        </View>
        : null
    );
}

export default CapaCheckBoxIcon;