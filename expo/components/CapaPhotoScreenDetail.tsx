import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { vw, vh } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingBottom: 20,
        paddingLeft: 20,
    },
});

export class CapaPhotoScreenDetail extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Avatar
                    rounded
                    icon={{ name: 'user', type: 'font-awesome'}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                />
                <View style={{height: 30, justifyContent: 'center', marginLeft: 15}}>
                  <Text style={{ color: 'white'}}>Istvan Keri</Text>
                </View>
            </View>

        );
    }
}
