import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

interface CheckBoxIconProps {
    hide: boolean;
    onPress: () => void;
}

const CapaCheckBoxIcon: React.FunctionComponent<CheckBoxIconProps> = (props: CheckBoxIconProps) => {
    const { hide, onPress } = props;
    return !hide ? (
        <View testID="uploadImage">
            <Icon name="done" color="#fff" onPress={onPress} Component={TouchableOpacity} />
        </View>
    ) : null;
};

export default CapaCheckBoxIcon;
