import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Colors, Container } from '../styles';
import { Icon, colors } from 'react-native-elements';
import { absolute, flexVerticalBottom } from '../styles/container';
import { whiteText } from '../styles/colors';

interface PhotoSettingsProps {
    changeActiveTab: (tab: string | null) => void;
}

const tabs = [
    { name: 'Film', icon: 'film' },
    { name: 'Camera', icon: 'camera' },
    { name: 'Location', icon: 'map-marker' },
];

const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        zIndex: 999,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tabItem: {
        width: '33%',
        alignItems: 'center',
        padding: 20,
    },
    tabText: {
        marginTop: 10,
        marginBottom: 10,
    },
});

const PhotoSettingsFooter: React.FunctionComponent<PhotoSettingsProps> = props => {
    const { changeActiveTab } = props;
    return (
        <View style={styles.bottom}>
            {tabs.map(item => {
                return (
                    <TouchableOpacity key={item.name} style={styles.tabItem} onPress={()=> {changeActiveTab(item.name)}}>
                        <Icon type="font-awesome" name={item.icon} color="#fff" />
                        <Text style={[Colors.whiteText, styles.tabText]}>{item.name}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default PhotoSettingsFooter;
