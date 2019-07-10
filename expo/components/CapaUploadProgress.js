import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import { vw } from 'react-native-expo-viewport-units';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10,
    },
    itemAlignStart: {
        flexDirection: 'row',
    },
    itemAlignEnd: {
        marginLeft: 'auto',
    },
    progressText: {
        paddingTop: 3,
        color: '#fff',
        paddingLeft: 10,
    },
    progressContainer: {
        color: '#fff',
        backgroundColor: '#000',
        paddingLeft: vw(5),
        paddingRight: vw(5),
        position: 'absolute',
        zIndex: 2,
    },
});

const CapaUploadProgress = props => {
    const { uploadFilename, uploadFileSize, uploadProgress } = props;
    return (
        <View style={styles.progressContainer}>
            <View style={styles.container}>
                <View style={styles.itemAlignStart}>
                    <Icon name="camera" color="#fff" />
                    <Text style={styles.progressText}>
                        {uploadFilename} ({uploadFileSize})
                    </Text>
                </View>
                <View style={styles.itemAlignEnd}>
                    <AnimatedEllipsis style={{
                            color: '#fff',
                            fontSize: 30,
                            letterSpacing: 0,
                            marginTop: -15,
                        }}
                    />
                </View>
            </View>
            <Progress.Bar
                unfilledColor="#000"
                borderRadius={0}
                borderWidth={0}
                height={1}
                color="white"
                progress={uploadProgress}
                width={vw(90)}
            />
        </View>
    );
};

export default CapaUploadProgress;